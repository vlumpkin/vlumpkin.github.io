import React from 'react';

const glyphs = {
    doc: '📄',
    project: '📦',
    computer: '🖥️',
    recycle: '🗑️',
    camera: (
        <svg viewBox="0 0 48 40" width="40" height="34" aria-hidden>
            <defs>
                <linearGradient id="camBody" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6b7785" />
                    <stop offset="55%" stopColor="#3b424b" />
                    <stop offset="100%" stopColor="#1d2127" />
                </linearGradient>
                <linearGradient id="camLensRim" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#9aa4b2" />
                    <stop offset="100%" stopColor="#2a2f36" />
                </linearGradient>
                <radialGradient id="camLensGlass" cx="0.4" cy="0.35" r="0.7">
                    <stop offset="0%" stopColor="#9ec9ff" />
                    <stop offset="55%" stopColor="#1d3a66" />
                    <stop offset="100%" stopColor="#0a1422" />
                </radialGradient>
            </defs>
            <path d="M5 11 h10 l3 -4 h12 l3 4 h10 q3 0 3 3 v18 q0 3 -3 3 H5 q-3 0 -3 -3 V14 q0 -3 3 -3 z" fill="url(#camBody)" stroke="#0c1014" strokeWidth="0.6" />
            <circle cx="24" cy="23" r="9" fill="url(#camLensRim)" stroke="#0c1014" strokeWidth="0.6" />
            <circle cx="24" cy="23" r="6.5" fill="url(#camLensGlass)" />
            <circle cx="21.5" cy="20.5" r="1.6" fill="#dfeeff" opacity="0.85" />
            <rect x="37" y="14" width="3" height="2" rx="0.5" fill="#ff5151" />
            <rect x="6" y="14" width="6" height="1.5" rx="0.5" fill="#9aa4b2" opacity="0.6" />
        </svg>
    ),
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
