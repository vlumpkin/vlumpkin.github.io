import React, { useEffect, useRef, useState } from 'react';
import { getHandLandmarker } from './handTracking.js';

// Gesture thresholds (in normalized landmark space — width/height of hand bbox).
const PINCH_ON  = 0.055;   // thumb-tip ↔ index-tip distance to *enter* a pinch
const PINCH_OFF = 0.085;   // hysteresis to *exit* a pinch
const TRIPOD_ON  = 0.075;  // thumb+index+middle all clustered → "hold"
const TRIPOD_OFF = 0.11;   // hysteresis to *exit* the hold
const TAP_COOLDOWN = 140;  // ms between consecutive single-pinch taps
const FIST_HOLD_MS = 350;  // how long a fist must persist before maximizing
const POST_FRAME_FIST_LOCKOUT = 1200;  // ms after frame-resize before fist may fire
const SMOOTHING = 0.35;    // EMA smoothing factor for cursor position
const DBLCLICK_MS = 450;   // max gap between two pinches to fire dblclick
const DBLCLICK_PX = 40;    // max distance between the two pinches
const SWIPE_WINDOW_MS = 200;   // how far back to measure swipe velocity
const SWIPE_MIN_VX    = 1800;  // px/sec horizontal velocity to count as swipe
const SWIPE_MIN_DX    = 220;   // total horizontal distance required (px)
const SWIPE_COOLDOWN  = 700;   // ms before another swipe can fire

// Landmark indices.
const THUMB_TIP = 4;
const INDEX_TIP = 8;
const INDEX_MCP = 5;   // base of index — the corner of the finger-gun L
const MIDDLE_TIP = 12;
const FINGER_TIPS = [8, 12, 16, 20];
const FINGER_PIPS = [6, 10, 14, 18];
const FINGER_MCPS = [5, 9, 13, 17];

// "Finger gun" / L-shape, rotation-invariant. One hand will be upside-down in
// the frame gesture, so we compare each fingertip's distance to the wrist
// against the PIP joint's distance to the wrist: extended fingers reach further
// from the wrist than their PIP, curled fingers don't.
function isFingerGun(hand) {
    const wrist = hand[0];
    const indexExt   = dist(hand[8],  wrist) > dist(hand[6],  wrist) + 0.04;
    const middleCur  = dist(hand[12], wrist) < dist(hand[10], wrist) + 0.015;
    const ringCur    = dist(hand[16], wrist) < dist(hand[14], wrist) + 0.015;
    const pinkyCur   = dist(hand[20], wrist) < dist(hand[18], wrist) + 0.015;
    const thumbExt   = dist(hand[4],  wrist) > dist(hand[3],  wrist) + 0.01;
    return indexExt && middleCur && ringCur && pinkyCur && thumbExt;
}

function dist(a, b) {
    const dx = a.x - b.x, dy = a.y - b.y;
    return Math.hypot(dx, dy);
}

// Open palm: every fingertip is meaningfully above its PIP joint (in image y).
// Fist: every fingertip is at-or-below its PIP joint.
function classifyGrip(hand) {
    let openCount = 0;
    for (let i = 0; i < FINGER_TIPS.length; i++) {
        const tip = hand[FINGER_TIPS[i]];
        const pip = hand[FINGER_PIPS[i]];
        if (tip.y < pip.y - 0.02) openCount++;
    }
    if (openCount === 0) return 'fist';
    if (openCount >= 3) return 'open';
    return 'partial';
}

function synth(type, target, x, y) {
    const evt = new MouseEvent(type, {
        bubbles: true,
        cancelable: true,
        view: window,
        clientX: x,
        clientY: y,
        screenX: x,
        screenY: y,
        button: 0,
        buttons: type === 'mouseup' ? 0 : 1,
    });
    (target || window).dispatchEvent(evt);
}

export default function GestureController({
    enabled,
    onStatusChange,
    onSwipeClose,
    onFrameResizeStart,
    onFrameResizeUpdate,
}) {
    const onSwipeCloseRef = useRef(onSwipeClose);
    const onFrameStartRef = useRef(onFrameResizeStart);
    const onFrameUpdateRef = useRef(onFrameResizeUpdate);
    useEffect(() => { onSwipeCloseRef.current = onSwipeClose; }, [onSwipeClose]);
    useEffect(() => { onFrameStartRef.current = onFrameResizeStart; }, [onFrameResizeStart]);
    useEffect(() => { onFrameUpdateRef.current = onFrameResizeUpdate; }, [onFrameResizeUpdate]);
    const frameRectRef = useRef(null);
    const videoRef = useRef(null);
    const streamRef = useRef(null);
    const rafRef = useRef(null);
    const cursorRef = useRef(null);
    const initialState = () => ({
        smoothX: null,
        smoothY: null,
        // Tripod (thumb+index+middle) = click-and-hold for dragging.
        holding: false,
        holdTarget: null,
        // Single-pinch tap edge tracking.
        pinchActive: false,
        lastTapTime: 0,
        lastTapX: 0,
        lastTapY: 0,
        // Fist = maximize.
        fistStart: null,
        fistFired: false,
        // Swipe to close.
        swipeBuf: [],
        lastSwipeAt: 0,
        // Two-hand frame resize.
        frameActive: false,
        frameInit: null,
        frameEndedAt: 0,
        lastVisible: false,
    });
    const stateRef = useRef(initialState());

    useEffect(() => {
        if (!enabled) {
            onStatusChange?.('off');
            return;
        }

        let cancelled = false;
        let landmarker = null;

        async function setup() {
            onStatusChange?.('loading');
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { width: { ideal: 320 }, height: { ideal: 240 }, facingMode: 'user' },
                    audio: false,
                });
                if (cancelled) { stream.getTracks().forEach(t => t.stop()); return; }
                streamRef.current = stream;
                const v = videoRef.current;
                v.srcObject = stream;
                await v.play().catch(() => {});
                landmarker = await getHandLandmarker();
                if (cancelled) return;
                onStatusChange?.('on');
                rafRef.current = requestAnimationFrame(loop);
            } catch (e) {
                if (!cancelled) onStatusChange?.('failed');
            }
        }

        const mapTip = (lm) => ({
            x: (1 - lm.x) * window.innerWidth,
            y: lm.y * window.innerHeight,
        });

        const updateFrameOverlay = (rect) => {
            const el = frameRectRef.current;
            if (!el) return;
            if (!rect) { el.style.opacity = '0'; return; }
            el.style.opacity = '1';
            el.style.left = `${rect.x}px`;
            el.style.top = `${rect.y}px`;
            el.style.width = `${rect.w}px`;
            el.style.height = `${rect.h}px`;
        };

        const loop = () => {
            if (cancelled) return;
            const v = videoRef.current;
            const s = stateRef.current;
            if (v && v.readyState >= 2 && v.videoWidth > 0 && landmarker) {
                let result;
                try { result = landmarker.detectForVideo(v, performance.now()); } catch (_) {}
                const hands = result?.landmarks ?? [];

                // ---- Two-hand "picture frame" resize ----
                const bothFG = hands.length >= 2 && isFingerGun(hands[0]) && isFingerGun(hands[1]);
                if (bothFG) {
                    // Anchor on the corner of the L (where index meets the palm).
                    const t0 = mapTip(hands[0][INDEX_MCP]);
                    const t1 = mapTip(hands[1][INDEX_MCP]);
                    if (!s.frameActive) {
                        const init = onFrameStartRef.current?.();
                        if (init) {
                            // Each hand independently controls one horizontal edge
                            // (the closer one to it) and one vertical edge. This works
                            // for both the TL/BR and TR/BL diagonals.
                            const roleA = {
                                xEdge: t0.x < t1.x ? 'left' : 'right',
                                yEdge: t0.y < t1.y ? 'top'  : 'bottom',
                            };
                            const roleB = {
                                xEdge: roleA.xEdge === 'left' ? 'right'  : 'left',
                                yEdge: roleA.yEdge === 'top'  ? 'bottom' : 'top',
                            };
                            s.frameActive = true;
                            s.frameInit = {
                                id: init.id,
                                initWin: init.bounds,
                                initA: t0,
                                initB: t1,
                                roleA,
                                roleB,
                            };
                            if (cursorRef.current) cursorRef.current.style.opacity = '0';
                        }
                    }
                    if (s.frameActive && s.frameInit) {
                        const { id, initWin, initA, initB, roleA, roleB } = s.frameInit;
                        const dA = { x: t0.x - initA.x, y: t0.y - initA.y };
                        const dB = { x: t1.x - initB.x, y: t1.y - initB.y };

                        let left   = initWin.x;
                        let right  = initWin.x + initWin.w;
                        let top    = initWin.y;
                        let bottom = initWin.y + initWin.h;

                        if (roleA.xEdge === 'left') left  += dA.x; else right  += dA.x;
                        if (roleA.yEdge === 'top')  top   += dA.y; else bottom += dA.y;
                        if (roleB.xEdge === 'left') left  += dB.x; else right  += dB.x;
                        if (roleB.yEdge === 'top')  top   += dB.y; else bottom += dB.y;

                        onFrameUpdateRef.current?.({
                            id,
                            x: left,
                            y: top,
                            w: right - left,
                            h: bottom - top,
                        });
                        updateFrameOverlay({
                            x: Math.min(t0.x, t1.x),
                            y: Math.min(t0.y, t1.y),
                            w: Math.abs(t1.x - t0.x),
                            h: Math.abs(t1.y - t0.y),
                        });
                    }
                    rafRef.current = requestAnimationFrame(loop);
                    return;
                } else if (s.frameActive) {
                    s.frameActive = false;
                    s.frameInit = null;
                    s.frameEndedAt = performance.now();
                    updateFrameOverlay(null);
                }

                const hand = hands[0];
                if (hand) {
                    // Map index tip to viewport coords (video is mirrored).
                    const tip = hand[INDEX_TIP];
                    const rawX = (1 - tip.x) * window.innerWidth;
                    const rawY = tip.y * window.innerHeight;
                    s.smoothX = s.smoothX == null ? rawX : s.smoothX + (rawX - s.smoothX) * SMOOTHING;
                    s.smoothY = s.smoothY == null ? rawY : s.smoothY + (rawY - s.smoothY) * SMOOTHING;
                    const x = s.smoothX, y = s.smoothY;
                    if (cursorRef.current) {
                        cursorRef.current.style.transform = `translate(${x}px, ${y}px)`;
                        cursorRef.current.style.opacity = '1';
                    }

                    const dIndex  = dist(hand[THUMB_TIP], hand[INDEX_TIP]);
                    const dMiddle = dist(hand[THUMB_TIP], hand[MIDDLE_TIP]);
                    const grip = classifyGrip(hand);
                    const now = performance.now();

                    // ---- Tripod (thumb + index + middle clustered) = click-and-hold ----
                    const tripodNow = dIndex < TRIPOD_ON && dMiddle < TRIPOD_ON;
                    const tripodReleased = dIndex > TRIPOD_OFF || dMiddle > TRIPOD_OFF;
                    if (!s.holding && tripodNow && grip !== 'fist') {
                        s.holding = true;
                        const target = document.elementFromPoint(x, y);
                        const winEl = target?.closest?.('.win');
                        const tbar = winEl?.querySelector?.('.win__titlebar');
                        s.holdTarget = tbar || target;
                        if (s.holdTarget) synth('mousedown', s.holdTarget, x, y);
                        cursorRef.current?.classList.add('is-hold');
                        // Cancel any pending single-tap so release-from-hold doesn't dblclick.
                        s.pinchActive = true;
                        s.lastTapTime = 0;
                    } else if (s.holding && tripodReleased) {
                        s.holding = false;
                        s.holdTarget = null;
                        synth('mouseup', window, x, y);
                        cursorRef.current?.classList.remove('is-hold');
                    } else if (s.holding) {
                        synth('mousemove', window, x, y);
                    }

                    // ---- Single index pinch = transient click, with dblclick detection ----
                    // Only fires when NOT in a tripod hold and NOT fisting.
                    if (!s.holding && grip !== 'fist') {
                        const indexTouching = dIndex < PINCH_ON;
                        const indexReleased = dIndex > PINCH_OFF;
                        if (!s.pinchActive && indexTouching) {
                            s.pinchActive = true;
                            const target = document.elementFromPoint(x, y);
                            if (target && now - s.lastTapTime > TAP_COOLDOWN) {
                                const elapsed = now - s.lastTapTime;
                                const near = Math.hypot(x - s.lastTapX, y - s.lastTapY) < DBLCLICK_PX;
                                const icon = target.closest?.('.desktop-icon');
                                if (icon) {
                                    // Icons always open on a single tap.
                                    synth('mousedown', icon, x, y);
                                    synth('mouseup', icon, x, y);
                                    synth('click', icon, x, y);
                                    synth('dblclick', icon, x, y);
                                    s.lastTapTime = 0;
                                } else if (elapsed < DBLCLICK_MS && near) {
                                    synth('mousedown', target, x, y);
                                    synth('mouseup', target, x, y);
                                    synth('click', target, x, y);
                                    synth('dblclick', target, x, y);
                                    s.lastTapTime = 0;
                                    cursorRef.current?.classList.add('is-dbl');
                                    setTimeout(() => cursorRef.current?.classList.remove('is-dbl'), 200);
                                } else {
                                    synth('mousedown', target, x, y);
                                    synth('mouseup', target, x, y);
                                    synth('click', target, x, y);
                                    s.lastTapTime = now;
                                    s.lastTapX = x;
                                    s.lastTapY = y;
                                    cursorRef.current?.classList.add('is-tap');
                                    setTimeout(() => cursorRef.current?.classList.remove('is-tap'), 160);
                                }
                            }
                        } else if (s.pinchActive && indexReleased) {
                            s.pinchActive = false;
                        }
                    } else {
                        s.pinchActive = s.holding; // keep latched while holding
                    }

                    // ---- Fist (held) = maximize window under cursor ----
                    // Suppressed briefly after a frame-resize so the hand un-clenching
                    // doesn't read as a deliberate fist.
                    const fistLocked = now - s.frameEndedAt < POST_FRAME_FIST_LOCKOUT;
                    if (grip === 'fist' && !fistLocked) {
                        if (!s.fistStart) { s.fistStart = now; s.fistFired = false; }
                        else if (!s.fistFired && now - s.fistStart > FIST_HOLD_MS) {
                            s.fistFired = true;
                            const el = document.elementFromPoint(x, y);
                            const winEl = el?.closest?.('.win');
                            const titlebar = winEl?.querySelector?.('.win__titlebar');
                            if (titlebar) {
                                const r = titlebar.getBoundingClientRect();
                                synth('dblclick', titlebar, r.left + r.width / 2, r.top + r.height / 2);
                                cursorRef.current?.classList.add('is-fist');
                                setTimeout(() => cursorRef.current?.classList.remove('is-fist'), 220);
                            }
                        }
                    } else {
                        s.fistStart = null;
                        s.fistFired = false;
                    }

                    // ---- Open-palm horizontal swipe = close active window ----
                    if (grip === 'open' && !s.holding && !s.pinchActive) {
                        s.swipeBuf.push({ x, y, t: now });
                        while (s.swipeBuf.length && now - s.swipeBuf[0].t > SWIPE_WINDOW_MS) {
                            s.swipeBuf.shift();
                        }
                        if (s.swipeBuf.length >= 2 && now - s.lastSwipeAt > SWIPE_COOLDOWN) {
                            const oldest = s.swipeBuf[0];
                            const dt = (now - oldest.t) / 1000;
                            const dx = x - oldest.x;
                            const dy = y - oldest.y;
                            if (dt > 0.08 && Math.abs(dx) > SWIPE_MIN_DX) {
                                const vx = dx / dt;
                                if (Math.abs(vx) > SWIPE_MIN_VX && Math.abs(dx) > 2.5 * Math.abs(dy)) {
                                    s.lastSwipeAt = now;
                                    s.swipeBuf.length = 0;
                                    onSwipeCloseRef.current?.(vx > 0 ? 'right' : 'left');
                                    cursorRef.current?.classList.add('is-swipe');
                                    setTimeout(() => cursorRef.current?.classList.remove('is-swipe'), 260);
                                }
                            }
                        }
                    } else {
                        s.swipeBuf.length = 0;
                    }

                    s.lastVisible = true;
                } else {
                    if (s.lastVisible) {
                        if (s.holding) {
                            s.holding = false;
                            s.holdTarget = null;
                            synth('mouseup', window, s.smoothX ?? 0, s.smoothY ?? 0);
                        }
                        s.pinchActive = false;
                        s.fistStart = null;
                        s.fistFired = false;
                    }
                    if (cursorRef.current) cursorRef.current.style.opacity = '0';
                    s.lastVisible = false;
                }
            }
            rafRef.current = requestAnimationFrame(loop);
        };

        setup();

        return () => {
            cancelled = true;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(t => t.stop());
                streamRef.current = null;
            }
            // Release any latched hold.
            if (stateRef.current.holding) {
                synth('mouseup', window, stateRef.current.smoothX ?? 0, stateRef.current.smoothY ?? 0);
            }
            stateRef.current = initialState();
            onStatusChange?.('off');
        };
    }, [enabled]);

    return (
        <>
            <video
                ref={videoRef}
                style={{ position: 'fixed', width: 1, height: 1, opacity: 0, pointerEvents: 'none', left: 0, top: 0 }}
                autoPlay
                playsInline
                muted
            />
            {enabled && (
                <>
                    <div ref={cursorRef} className="gesture-cursor" style={{ opacity: 0 }}>
                        <div className="gesture-cursor__dot" />
                        <div className="gesture-cursor__ring" />
                    </div>
                    <div ref={frameRectRef} className="gesture-frame" style={{ opacity: 0 }} />
                </>
            )}
        </>
    );
}
