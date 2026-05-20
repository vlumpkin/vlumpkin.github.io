import React, { useState, useRef, useEffect } from 'react';

const DRAG_THRESHOLD = 4;

const glyphs = {
    doc: '📄',
    project: '📦',
    computer: '🖥️',
    recycle: '🗑️',
    folder: (
        <svg viewBox="0 0 48 40" width="40" height="34" aria-hidden>
            <defs>
                <linearGradient id="folderBody" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffdc7a" />
                    <stop offset="55%" stopColor="#f6b836" />
                    <stop offset="100%" stopColor="#c98712" />
                </linearGradient>
                <linearGradient id="folderTab" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#ffe79a" />
                    <stop offset="100%" stopColor="#e7a82a" />
                </linearGradient>
                <linearGradient id="folderFlap" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fff4c8" />
                    <stop offset="100%" stopColor="#f3c248" />
                </linearGradient>
            </defs>
            {/* back tab */}
            <path d="M2 8 q0 -3 3 -3 h12 l4 4 h24 q3 0 3 3 v6 H2 z" fill="url(#folderTab)" stroke="#8a5a0a" strokeWidth="0.6" />
            {/* body */}
            <path d="M2 12 h44 v22 q0 3 -3 3 H5 q-3 0 -3 -3 z" fill="url(#folderBody)" stroke="#8a5a0a" strokeWidth="0.6" />
            {/* front flap (translucent) */}
            <path d="M2 16 q0 -2 2 -2 h40 q2 0 2 2 l-3 16 q-0.5 3 -3.5 3 H6 q-3 0 -3.5 -3 z" fill="url(#folderFlap)" opacity="0.85" stroke="#a66c10" strokeWidth="0.4" />
        </svg>
    ),
};

export default function DesktopIcon({ app, position, onOpen, onMove }) {
    const [selected, setSelected] = useState(false);
    const [dragging, setDragging] = useState(false);
    const dragRef = useRef(null); // { startX, startY, originX, originY, moved }

    useEffect(() => {
        const handleMove = (e) => {
            const d = dragRef.current;
            if (!d) return;
            const dx = e.clientX - d.startX;
            const dy = e.clientY - d.startY;
            if (!d.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
            d.moved = true;
            setDragging(true);
            const nx = Math.max(0, Math.min(window.innerWidth - 92, d.originX + dx));
            const ny = Math.max(0, Math.min(window.innerHeight - 40 - 84, d.originY + dy));
            onMove({ x: nx, y: ny });
        };
        const handleUp = () => {
            if (dragRef.current) {
                dragRef.current = null;
                setDragging(false);
            }
        };
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('mouseup', handleUp);
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('mouseup', handleUp);
        };
    }, [onMove]);

    const onMouseDown = (e) => {
        if (e.button !== 0) return;
        dragRef.current = {
            startX: e.clientX,
            startY: e.clientY,
            originX: position.x,
            originY: position.y,
            moved: false,
        };
        setSelected(true);
    };

    const onClick = (e) => {
        // Suppress click if we actually dragged.
        if (dragRef.current && dragRef.current.moved) {
            e.preventDefault();
            e.stopPropagation();
        }
    };

    return (
        <button
            type="button"
            className={`desktop-icon ${selected ? 'is-selected' : ''} ${dragging ? 'is-dragging' : ''}`}
            style={{ left: position.x, top: position.y }}
            onMouseDown={onMouseDown}
            onClick={onClick}
            onDoubleClick={onOpen}
            onBlur={() => setSelected(false)}
        >
            <span className="desktop-icon__glyph" aria-hidden>
                {glyphs[app.icon] || '📁'}
            </span>
            <span className="desktop-icon__label">{app.label}</span>
        </button>
    );
}
