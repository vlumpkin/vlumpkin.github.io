import React, { useRef, useState, useEffect } from 'react';

const MIN_W = 320;
const MIN_H = 200;
const DIRS = ['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'];

export default function Window({
    app,
    win,
    onClose,
    onMinimize,
    onToggleMax,
    onFocus,
    children,
    chrome,
}) {
    const [pos, setPos] = useState({ x: win.x, y: win.y });
    const [size, setSize] = useState({ w: app.width, h: app.height });
    const drag = useRef(null);
    const resize = useRef(null);

    useEffect(() => {
        const move = (e) => {
            if (drag.current) {
                setPos({
                    x: e.clientX - drag.current.dx,
                    y: e.clientY - drag.current.dy,
                });
            } else if (resize.current) {
                const r = resize.current;
                const dx = e.clientX - r.startX;
                const dy = e.clientY - r.startY;

                let { x, y } = r;
                let w = r.startW;
                let h = r.startH;

                if (r.dir.includes('e')) w = r.startW + dx;
                if (r.dir.includes('s')) h = r.startH + dy;
                if (r.dir.includes('w')) {
                    w = r.startW - dx;
                    if (w < MIN_W) { w = MIN_W; x = r.x + (r.startW - MIN_W); }
                    else { x = r.x + dx; }
                }
                if (r.dir.includes('n')) {
                    h = r.startH - dy;
                    if (h < MIN_H) { h = MIN_H; y = r.y + (r.startH - MIN_H); }
                    else { y = r.y + dy; }
                }

                w = Math.max(MIN_W, w);
                h = Math.max(MIN_H, h);
                setSize({ w, h });
                setPos({ x, y });
            }
        };
        const up = () => { drag.current = null; resize.current = null; };
        window.addEventListener('mousemove', move);
        window.addEventListener('mouseup', up);
        return () => {
            window.removeEventListener('mousemove', move);
            window.removeEventListener('mouseup', up);
        };
    }, []);

    const startDrag = (e) => {
        if (win.maximized) return;
        drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
        onFocus();
    };

    const startResize = (dir) => (e) => {
        if (win.maximized) return;
        e.stopPropagation();
        e.preventDefault();
        resize.current = {
            dir,
            startX: e.clientX,
            startY: e.clientY,
            startW: size.w,
            startH: size.h,
            x: pos.x,
            y: pos.y,
        };
        onFocus();
    };

    const style = win.maximized
        ? { left: 0, top: 0, width: '100%', height: 'calc(100% - 40px)', zIndex: win.z }
        : { left: pos.x, top: pos.y, width: size.w, height: size.h, zIndex: win.z };

    if (win.minimized) return null;

    return (
        <div
            className={`win ${win.maximized ? 'is-max' : ''}`}
            style={style}
            onMouseDown={onFocus}
        >
            <div className="win__titlebar" onMouseDown={startDrag} onDoubleClick={onToggleMax}>
                <span className="win__title">{app.label}</span>
                <div className="win__controls">
                    <button type="button" className="win__btn win__btn--min" onClick={onMinimize} aria-label="Minimize">_</button>
                    <button type="button" className="win__btn win__btn--max" onClick={onToggleMax} aria-label="Maximize">▢</button>
                    <button type="button" className="win__btn win__btn--close" onClick={onClose} aria-label="Close">✕</button>
                </div>
            </div>
            {chrome}
            <div className="win__body">{children}</div>
            {!win.maximized && DIRS.map((d) => (
                <div
                    key={d}
                    className={`win__handle win__handle--${d}`}
                    onMouseDown={startResize(d)}
                    aria-hidden
                />
            ))}
        </div>
    );
}
