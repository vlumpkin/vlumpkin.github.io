import React, { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { photoStore, downloadPhoto } from './photoStore.js';

// Intentionally low-res capture for a chunky webcam-photo feel.
const CAPTURE_W = 320;
const CAPTURE_H = 240;

export default function Camera() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const streamRef = useRef(null);
    const [status, setStatus] = useState('idle'); // idle | live | denied | error
    const [error, setError] = useState(null);
    const [flash, setFlash] = useState(false);
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

    const capture = () => {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        if (!video || !canvas || status !== 'live') return;
        canvas.width = CAPTURE_W;
        canvas.height = CAPTURE_H;
        const ctx = canvas.getContext('2d');
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(video, 0, 0, CAPTURE_W, CAPTURE_H);
        const dataUrl = canvas.toDataURL('image/png');
        // Approximate byte size from base64 length.
        const b64 = dataUrl.split(',')[1] || '';
        const approxBytes = Math.floor(b64.length * 0.75);
        photoStore.add(dataUrl, approxBytes);
        setFlash(true);
        setTimeout(() => setFlash(false), 140);
    };

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
