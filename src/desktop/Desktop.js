import React, { useEffect, useRef, useState } from 'react';
import { apps, desktopLayout } from './apps.js';
import DesktopIcon from './DesktopIcon.js';
import Window from './Window.js';
import BrowserChrome from './BrowserChrome.js';
import Taskbar from './Taskbar.js';
import GestureController from './GestureController.js';
import Wordmark from './Wordmark.js';

let nextId = 1;
const nextZ = (() => { let z = 10; return () => ++z; })();

const ICON_W = 92;
const ICON_H = 84;
const ICON_X0 = 16;
const ICON_Y0 = 16;
const DRAG_THRESHOLD = 4;

function initialIconPositions() {
    const positions = {};
    desktopLayout.forEach((appId, i) => {
        positions[appId] = { x: ICON_X0, y: ICON_Y0 + i * ICON_H };
    });
    return positions;
}

const rectsOverlap = (a, b) => (
    a.x < b.x + ICON_W && a.x + ICON_W > b.x &&
    a.y < b.y + ICON_H && a.y + ICON_H > b.y
);

export default function Desktop() {
    const [windows, setWindows] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const [iconPositions, setIconPositions] = useState(initialIconPositions);
    const [selection, setSelection] = useState(() => new Set());
    const [marquee, setMarquee] = useState(null);
    const [dialog, setDialog] = useState(null);
    const [gesturesOn, setGesturesOn] = useState(false);
    const [gestureStatus, setGestureStatus] = useState('off');

    // Ref-mirrored so the global mousemove/up handlers can read current values
    // without re-binding on every state change.
    const dragRef = useRef(null);
    const windowRefs = useRef(new Map());
    const iconPositionsRef = useRef(iconPositions);
    useEffect(() => { iconPositionsRef.current = iconPositions; }, [iconPositions]);

    useEffect(() => {
        const onMove = (e) => {
            const d = dragRef.current;
            if (!d) return;
            const dx = e.clientX - d.startX;
            const dy = e.clientY - d.startY;
            if (!d.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
            d.moved = true;

            if (d.mode === 'icons') {
                setIconPositions((p) => {
                    const next = { ...p };
                    Object.entries(d.anchors).forEach(([id, anchor]) => {
                        next[id] = {
                            x: Math.max(0, Math.min(window.innerWidth - ICON_W, anchor.x + dx)),
                            y: Math.max(0, Math.min(window.innerHeight - 40 - ICON_H, anchor.y + dy)),
                        };
                    });
                    return next;
                });
            } else if (d.mode === 'marquee') {
                const x = Math.min(d.startX, e.clientX);
                const y = Math.min(d.startY, e.clientY);
                const w = Math.abs(e.clientX - d.startX);
                const h = Math.abs(e.clientY - d.startY);
                setMarquee({ x, y, w, h });
                const next = new Set(d.baseSelection);
                const positions = iconPositionsRef.current;
                desktopLayout.forEach((appId) => {
                    const p = positions[appId];
                    if (!p) return;
                    if (p.x < x + w && p.x + ICON_W > x && p.y < y + h && p.y + ICON_H > y) {
                        next.add(appId);
                    }
                });
                setSelection(next);
            }
        };

        const onUp = () => {
            const d = dragRef.current;
            if (!d) return;
            if (d.mode === 'icons' && d.moved) {
                const positions = iconPositionsRef.current;
                const bin = positions.recycleBin;
                if (bin) {
                    let snap = false;
                    let label = null;
                    Object.keys(d.anchors).forEach((id) => {
                        if (id === 'recycleBin') return;
                        const pos = positions[id];
                        if (pos && rectsOverlap(pos, bin)) {
                            snap = true;
                            label = label || apps[id]?.label;
                        }
                    });
                    if (snap) {
                        setIconPositions((p) => {
                            const next = { ...p };
                            Object.entries(d.anchors).forEach(([id, anchor]) => { next[id] = anchor; });
                            return next;
                        });
                        setDialog({
                            title: 'Recycle Bin',
                            message: `Please don't do that.`,
                            detail: label ? `“${label}” is not going anywhere.` : null,
                        });
                    }
                }
            }
            dragRef.current = null;
            setMarquee(null);
        };

        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
    }, []);

    const onIconMouseDown = (appId) => (e) => {
        if (e.button !== 0) return;
        e.stopPropagation();
        const additive = e.shiftKey || e.ctrlKey || e.metaKey;
        let nextSel = selection;
        if (additive) {
            nextSel = new Set(selection);
            if (nextSel.has(appId)) nextSel.delete(appId);
            else nextSel.add(appId);
        } else if (!selection.has(appId)) {
            nextSel = new Set([appId]);
        }
        setSelection(nextSel);

        const anchors = {};
        nextSel.forEach((id) => {
            const p = iconPositionsRef.current[id];
            if (p) anchors[id] = { ...p };
        });
        dragRef.current = {
            mode: 'icons',
            startX: e.clientX,
            startY: e.clientY,
            anchors,
            moved: false,
        };
    };

    const onDesktopMouseDown = (e) => {
        if (e.button !== 0) return;
        // Only start a marquee when clicking empty desktop, not on a window/icon/taskbar/dialog.
        if (e.target.closest('.win, .taskbar, .desktop-icon, .dialog-overlay')) return;
        const additive = e.shiftKey || e.ctrlKey || e.metaKey;
        const base = additive ? new Set(selection) : new Set();
        if (!additive) setSelection(new Set());
        dragRef.current = {
            mode: 'marquee',
            startX: e.clientX,
            startY: e.clientY,
            baseSelection: base,
            moved: false,
        };
        setMarquee({ x: e.clientX, y: e.clientY, w: 0, h: 0 });
    };

    const openApp = (appId) => {
        const app = apps[appId];
        if (!app) return;

        const existing = windows.find((w) => w.appId === appId);
        if (existing) {
            focus(existing.id);
            setWindows((ws) => ws.map((w) => w.id === existing.id ? { ...w, minimized: false } : w));
            return;
        }

        const id = nextId++;
        const offset = (windows.length % 6) * 28;
        setWindows((ws) => [...ws, {
            id,
            appId,
            x: 80 + offset,
            y: 60 + offset,
            z: nextZ(),
            minimized: false,
            maximized: false,
        }]);
        setActiveId(id);
    };

    const close = (id) => {
        setWindows((ws) => ws.filter((w) => w.id !== id));
        if (activeId === id) setActiveId(null);
    };

    const minimize = (id) => {
        setWindows((ws) => ws.map((w) => w.id === id ? { ...w, minimized: true } : w));
        if (activeId === id) setActiveId(null);
    };

    const toggleMax = (id) => {
        setWindows((ws) => ws.map((w) => w.id === id ? { ...w, maximized: !w.maximized } : w));
    };

    const focus = (id) => {
        setWindows((ws) => ws.map((w) => w.id === id ? { ...w, z: nextZ() } : w));
        setActiveId(id);
    };

    const taskClick = (id) => {
        const w = windows.find((x) => x.id === id);
        if (!w) return;
        if (w.minimized || activeId !== id) {
            setWindows((ws) => ws.map((x) => x.id === id ? { ...x, minimized: false, z: nextZ() } : x));
            setActiveId(id);
        } else {
            minimize(id);
        }
    };

    const renderBody = (app) => {
        if (app.render) return app.render({ openApp });
        if (app.iframeSrc) {
            return (
                <iframe
                    title={app.label}
                    src={app.iframeSrc}
                    className="win__iframe"
                />
            );
        }
        return <div style={{ padding: 16 }}>{app.description || 'Empty application.'}</div>;
    };

    return (
        <div className="desktop" onMouseDown={onDesktopMouseDown}>
            {/* Wallpaper wordmark — purely decorative, sits under the icon layer. */}
            <Wordmark />

            <div className="desktop__icons">
                {desktopLayout.map((appId) => {
                    const app = apps[appId];
                    if (!app) return null;
                    return (
                        <DesktopIcon
                            key={appId}
                            app={app}
                            position={iconPositions[appId]}
                            isSelected={selection.has(appId)}
                            onMouseDown={onIconMouseDown(appId)}
                            onOpen={() => openApp(appId)}
                        />
                    );
                })}
            </div>

            {marquee && (
                <div
                    className="desktop__marquee"
                    style={{
                        left: marquee.x,
                        top: marquee.y,
                        width: marquee.w,
                        height: marquee.h,
                    }}
                />
            )}

            {windows.map((w) => {
                const app = apps[w.appId];
                if (!app) return null;
                const chrome = app.kind === 'browser' ? <BrowserChrome url={app.url || ''} /> : null;
                return (
                    <Window
                        key={w.id}
                        ref={(r) => {
                            if (r) windowRefs.current.set(w.id, r);
                            else windowRefs.current.delete(w.id);
                        }}
                        app={app}
                        win={w}
                        onClose={() => close(w.id)}
                        onMinimize={() => minimize(w.id)}
                        onToggleMax={() => toggleMax(w.id)}
                        onFocus={() => focus(w.id)}
                        chrome={chrome}
                    >
                        {renderBody(app)}
                    </Window>
                );
            })}

            {dialog && (
                <div className="dialog-overlay" onMouseDown={() => setDialog(null)}>
                    <div className="dialog" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
                        <div className="dialog__titlebar">
                            <span className="dialog__title">{dialog.title}</span>
                            <button
                                type="button"
                                className="win__btn win__btn--close"
                                onClick={() => setDialog(null)}
                                aria-label="Close"
                            >✕</button>
                        </div>
                        <div className="dialog__body">
                            <div className="dialog__icon" aria-hidden>!</div>
                            <div className="dialog__text">
                                <div className="dialog__message">{dialog.message}</div>
                                {dialog.detail && <div className="dialog__detail">{dialog.detail}</div>}
                            </div>
                        </div>
                        <div className="dialog__footer">
                            <button
                                type="button"
                                className="dialog__ok"
                                onClick={() => setDialog(null)}
                                autoFocus
                            >OK</button>
                        </div>
                    </div>
                </div>
            )}

            <button
                type="button"
                className={`gesture-toggle ${gesturesOn ? 'is-on' : ''}`}
                onClick={() => setGesturesOn((v) => !v)}
                onMouseDown={(e) => e.stopPropagation()}
                title="Toggle hand-gesture control"
            >
                <span className="gesture-toggle__icon" aria-hidden>✋</span>
                <span className="gesture-toggle__label">
                    {gestureStatus === 'loading' ? 'Loading…' :
                     gestureStatus === 'failed' ? 'Failed' :
                     gesturesOn ? 'Hands on' : 'Hands off'}
                </span>
            </button>

            <GestureController
                enabled={gesturesOn}
                onStatusChange={setGestureStatus}
                onSwipeClose={() => { if (activeId != null) close(activeId); }}
                onFrameResizeStart={() => {
                    if (activeId == null) return null;
                    const ref = windowRefs.current.get(activeId);
                    if (!ref || ref.isMaximized()) return null;
                    return { id: activeId, bounds: ref.getBounds() };
                }}
                onFrameResizeUpdate={({ id, x, y, w, h }) => {
                    const ref = windowRefs.current.get(id);
                    if (ref) ref.setBounds({ x, y, w, h });
                }}
            />

            <Taskbar
                windows={windows}
                apps={apps}
                activeId={activeId}
                onTaskClick={taskClick}
                onStart={() => { /* TODO: start menu */ }}
            />
        </div>
    );
}
