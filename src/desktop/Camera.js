import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { photoStore, downloadPhoto } from './photoStore.js';
import { getHandLandmarker, HAND_CONNECTIONS } from './handTracking.js';

// Intentionally low-res capture for a chunky webcam-photo feel.
const CAPTURE_W = 320;
const CAPTURE_H = 240;

export default function Camera() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const overlayRef = useRef(null);
    const streamRef = useRef(null);
    const rafRef = useRef(null);
    const landmarkerRef = useRef(null);
    const [status, setStatus] = useState('idle'); // idle | live | denied | error
    const [error, setError] = useState(null);
    const [flash, setFlash] = useState(false);
    const [tracking, setTracking] = useState(false);
    const [trackingStatus, setTrackingStatus] = useState('off'); // off | loading | on | failed
    const photos = useSyncExternalStore(photoStore.subscribe, photoStore.getSnapshot);

    useEffect(() => {
        let cancelled = false;
        async function start() {
            if (!navigator.mediaDevices?.getUserMedia) {
                setStatus('error');
                setError('Camera API not available in this browser.');
                return;
            }
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: { width: { ideal: CAPTURE_W }, height: { ideal: CAPTURE_H }, facingMode: 'user' },
                    audio: false,
                });
                if (cancelled) {
                    stream.getTracks().forEach((t) => t.stop());
                    return;
                }
                streamRef.current = stream;
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setStatus('live');
            } catch (err) {
                if (err && (err.name === 'NotAllowedError' || err.name === 'SecurityError')) {
                    setStatus('denied');
                } else {
                    setStatus('error');
                    setError(err?.message || String(err));
                }
            }
        }
        start();
        return () => {
            cancelled = true;
            if (streamRef.current) {
                streamRef.current.getTracks().forEach((t) => t.stop());
                streamRef.current = null;
            }
        };
    }, []);

    // Hand tracking loop.
    useEffect(() => {
        if (!tracking || status !== 'live') return;

        let active = true;
        let lastTs = -1;

        const loop = () => {
            if (!active) return;
            const video = videoRef.current;
            const overlay = overlayRef.current;
            const lm = landmarkerRef.current;
            if (video && overlay && lm && video.readyState >= 2 && video.videoWidth > 0) {
                const w = video.videoWidth;
                const h = video.videoHeight;
                if (overlay.width !== w) overlay.width = w;
                if (overlay.height !== h) overlay.height = h;
                const ctx = overlay.getContext('2d');
                ctx.clearRect(0, 0, w, h);
                const ts = performance.now();
                if (ts !== lastTs) {
                    lastTs = ts;
                    let result;
                    try {
                        result = lm.detectForVideo(video, ts);
                    } catch (e) { /* one bad frame shouldn't kill the loop */ }
                    if (result?.landmarks) {
                        for (const hand of result.landmarks) {
                            // Connectors.
                            ctx.lineWidth = 3;
                            ctx.strokeStyle = '#39d97a';
                            ctx.beginPath();
                            for (const [a, b] of HAND_CONNECTIONS) {
                                const pa = hand[a]; const pb = hand[b];
                                if (!pa || !pb) continue;
                                ctx.moveTo(pa.x * w, pa.y * h);
                                ctx.lineTo(pb.x * w, pb.y * h);
                            }
                            ctx.stroke();
                            // Joints.
                            ctx.fillStyle = '#ff5151';
                            for (const p of hand) {
                                ctx.beginPath();
                                ctx.arc(p.x * w, p.y * h, 4, 0, Math.PI * 2);
                                ctx.fill();
                            }
                        }
                    }
                }
            }
            rafRef.current = requestAnimationFrame(loop);
        };

        (async () => {
            setTrackingStatus('loading');
            try {
                landmarkerRef.current = await getHandLandmarker();
                if (!active) return;
                setTrackingStatus('on');
                rafRef.current = requestAnimationFrame(loop);
            } catch (e) {
                if (!active) return;
                setTrackingStatus('failed');
            }
        })();

        return () => {
            active = false;
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
            const overlay = overlayRef.current;
            if (overlay) {
                const ctx = overlay.getContext('2d');
                ctx.clearRect(0, 0, overlay.width, overlay.height);
            }
        };
    }, [tracking, status]);

    const capture = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas || status !== 'live') return;
        canvas.width = CAPTURE_W;
        canvas.height = CAPTURE_H;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(video, 0, 0, CAPTURE_W, CAPTURE_H);
        // If tracking is on, bake the overlay into the snapshot too.
        const overlay = overlayRef.current;
        if (tracking && overlay && overlay.width > 0) {
            ctx.drawImage(overlay, 0, 0, CAPTURE_W, CAPTURE_H);
        }
        const dataUrl = canvas.toDataURL('image/png');
        const b64 = dataUrl.split(',')[1] || '';
        const approxBytes = Math.floor(b64.length * 0.75);
        photoStore.add(dataUrl, approxBytes);
        setFlash(true);
        setTimeout(() => setFlash(false), 140);
    };

    const trackingLabel = (
        trackingStatus === 'loading' ? 'Loading…' :
        trackingStatus === 'failed' ? 'Hands: failed' :
        tracking ? 'Hands: on' : 'Hands: off'
    );

    return (
        <div className="camera">
            <div className="camera__stage">
                <div className="camera__viewport">
                    <video
                        ref={videoRef}
                        className="camera__video"
                        autoPlay
                        playsInline
                        muted
                    />
                    <canvas ref={overlayRef} className="camera__overlay-canvas" />
                    {flash && <div className="camera__flash" />}
                    {status !== 'live' && (
                        <div className="camera__overlay">
                            {status === 'idle' && 'Starting camera…'}
                            {status === 'denied' && 'Camera permission denied. Allow it in your browser to take photos.'}
                            {status === 'error' && (error || 'Camera error.')}
                        </div>
                    )}
                </div>
                <canvas ref={canvasRef} style={{ display: 'none' }} />
                <div className="camera__controls">
                    <button
                        type="button"
                        className="camera__shutter"
                        onClick={capture}
                        disabled={status !== 'live'}
                        title="Take photo"
                    >
                        <span className="camera__shutter-dot" />
                    </button>
                    <button
                        type="button"
                        className={`camera__toggle ${tracking ? 'is-on' : ''}`}
                        onClick={() => setTracking((t) => !t)}
                        disabled={status !== 'live'}
                        title="Toggle hand tracking"
                    >{trackingLabel}</button>
                    <span className="camera__count">
                        {photos.length} photo{photos.length === 1 ? '' : 's'} · saved to Pictures
                    </span>
                </div>
            </div>
            <div className="camera__gallery">
                {photos.length === 0 ? (
                    <div className="camera__empty">No photos yet. Tap the shutter to capture one.</div>
                ) : (
                    photos.slice().reverse().map((p) => (
                        <div key={p.id} className="camera__thumb">
                            <img src={p.dataUrl} alt={p.name} />
                            <div className="camera__thumb-row">
                                <span className="camera__thumb-name">{p.name}</span>
                                <button
                                    type="button"
                                    className="camera__thumb-btn"
                                    onClick={() => downloadPhoto(p)}
                                >Download</button>
                                <button
                                    type="button"
                                    className="camera__thumb-btn camera__thumb-btn--ghost"
                                    onClick={() => photoStore.remove(p.id)}
                                    title="Delete"
                                >✕</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
