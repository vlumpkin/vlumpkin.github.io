import React from 'react';

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
            <path d="M2 8 q0 -3 3 -3 h12 l4 4 h24 q3 0 3 3 v6 H2 z" fill="url(#folderTab)" stroke="#8a5a0a" strokeWidth="0.6" />
            <path d="M2 12 h44 v22 q0 3 -3 3 H5 q-3 0 -3 -3 z" fill="url(#folderBody)" stroke="#8a5a0a" strokeWidth="0.6" />
            <path d="M2 16 q0 -2 2 -2 h40 q2 0 2 2 l-3 16 q-0.5 3 -3.5 3 H6 q-3 0 -3.5 -3 z" fill="url(#folderFlap)" opacity="0.85" stroke="#a66c10" strokeWidth="0.4" />
        </svg>
    ),
};

// Presentational only — Desktop owns selection + drag state.
export default function DesktopIcon({ app, position, isSelected, onMouseDown, onOpen }) {
    return (
        <button
            type="button"
            className={`desktop-icon ${isSelected ? 'is-selected' : ''}`}
            style={{ left: position.x, top: position.y }}
            onMouseDown={onMouseDown}
            onDoubleClick={onOpen}
        >
            <span className="desktop-icon__glyph" aria-hidden>
                {glyphs[app.icon] || '📁'}
            </span>
            <span className="desktop-icon__label">{app.label}</span>
        </button>
    );
}
