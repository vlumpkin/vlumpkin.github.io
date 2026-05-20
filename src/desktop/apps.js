import React, { useState } from 'react';
import ScaledResume from './ScaledResume.js';
import ScaledIframe from './ScaledIframe.js';

// App registry. Each entry defines how a desktop icon launches into a window.
// `kind: 'browser'` wraps content in a fake browser chrome (URL bar).
// `kind: 'app'`     is a plain application window.
// `render` returns the content body inside the window.

// Each view = one "folder" in the sidebar. Items support:
//   open: <appId>      → openApp(appId)   (double-click)
//   href: <url>        → window.open in new tab
//   goto: <viewName>   → switch to another explorer view
const explorerViews = {
    Desktop: {
        path: 'Desktop',
        items: [
            { name: 'My Computer', kind: 'folder', open: 'myComputer', modified: '5/19/2026 8:00 AM' },
            { name: 'Documents', kind: 'folder', open: 'fileExplorer', modified: '5/02/2026 4:18 PM' },
            { name: 'Resume.lnk', kind: 'doc', open: 'resume', size: '4 KB', modified: '5/10/2026 10:21 AM' },
            { name: 'KirklandSMP.lnk', kind: 'doc', open: 'kirklandSMP', size: '2 KB', modified: '4/22/2026 3:14 PM' },
            { name: 'CollegeAdmissions.lnk', kind: 'doc', open: 'collegeAdmissions', size: '2 KB', modified: '3/30/2026 6:51 PM' },
            { name: 'PrimaryBackup.lnk', kind: 'doc', open: 'primaryBackup', size: '2 KB', modified: '5/05/2026 10:02 AM' },
            { name: 'Recycle Bin', kind: 'folder', open: 'recycleBin', modified: '5/19/2026 8:00 AM' },
        ],
    },
    Downloads: { path: 'Downloads', items: [] },
    'Recent Places': { path: 'Recent Places', items: [] },
    Documents: {
        path: 'Libraries › Documents',
        items: [
            { name: 'Resume.lnk', kind: 'doc', open: 'resume', size: '4 KB', modified: '5/10/2026 10:21 AM' },
            { name: 'README.txt', kind: 'doc', size: '2 KB', modified: '5/17/2026 1:09 PM' },
        ],
    },
    Music: { path: 'Libraries › Music', items: [] },
    Pictures: { path: 'Libraries › Pictures', items: [] },
    Videos: {
        path: 'Libraries › Videos',
        items: [
            { name: 'top.secret', kind: 'doc', href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', size: '1 KB', modified: '5/18/2026 11:59 PM' },
        ],
    },
    Projects: {
        path: 'Libraries › Projects',
        items: [
            { name: 'KirklandSMP.lnk', kind: 'doc', open: 'kirklandSMP', size: '2 KB', modified: '4/22/2026 3:14 PM' },
            { name: 'CollegeAdmissions.lnk', kind: 'doc', open: 'collegeAdmissions', size: '2 KB', modified: '3/30/2026 6:51 PM' },
            { name: 'PrimaryBackup.lnk', kind: 'doc', open: 'primaryBackup', size: '2 KB', modified: '5/05/2026 10:02 AM' },
        ],
    },
    'Local Disk (C:)': {
        path: 'Computer › Local Disk (C:)',
        items: [
            { name: 'Documents', kind: 'folder', goto: 'Documents', items: 3, modified: '5/02/2026 4:18 PM' },
            { name: 'Music', kind: 'folder', goto: 'Music', items: 0, modified: '3/19/2026 7:55 PM' },
            { name: 'Pictures', kind: 'folder', goto: 'Pictures', items: 0, modified: '4/28/2026 11:03 AM' },
            { name: 'Videos', kind: 'folder', goto: 'Videos', items: 0, modified: '4/01/2026 2:20 PM' },
            { name: 'Projects', kind: 'folder', goto: 'Projects', items: 3, modified: '5/14/2026 9:42 AM' },
        ],
    },
    'Projects (D:)': {
        path: 'Computer › Projects (D:)',
        goto: 'Projects',
    },
};

const FolderRowIcon = () => (
    <svg viewBox="0 0 24 20" width="20" height="17" aria-hidden>
        <defs>
            <linearGradient id="rowFolderBody" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffdc7a" />
                <stop offset="55%" stopColor="#f6b836" />
                <stop offset="100%" stopColor="#c98712" />
            </linearGradient>
            <linearGradient id="rowFolderTab" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffe79a" />
                <stop offset="100%" stopColor="#e7a82a" />
            </linearGradient>
            <linearGradient id="rowFolderFlap" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fff4c8" />
                <stop offset="100%" stopColor="#f3c248" />
            </linearGradient>
        </defs>
        <path d="M1 4 q0 -1.5 1.5 -1.5 h6 l2 2 h12 q1.5 0 1.5 1.5 v3 H1 z" fill="url(#rowFolderTab)" stroke="#8a5a0a" strokeWidth="0.4" />
        <path d="M1 6 h22 v11 q0 1.5 -1.5 1.5 H2.5 q-1.5 0 -1.5 -1.5 z" fill="url(#rowFolderBody)" stroke="#8a5a0a" strokeWidth="0.4" />
        <path d="M1 8 q0 -1 1 -1 h20 q1 0 1 1 l-1.5 8 q-0.3 1.5 -1.7 1.5 H3.2 q-1.4 0 -1.7 -1.5 z" fill="url(#rowFolderFlap)" opacity="0.85" stroke="#a66c10" strokeWidth="0.3" />
    </svg>
);

const DocRowIcon = () => (
    <svg viewBox="0 0 20 24" width="16" height="20" aria-hidden>
        <defs>
            <linearGradient id="rowDocPaper" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="100%" stopColor="#dde6f1" />
            </linearGradient>
            <linearGradient id="rowDocFold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f4f8fd" />
                <stop offset="100%" stopColor="#a9bbd2" />
            </linearGradient>
        </defs>
        <path d="M3 1.5 h10 l4 4 v16 q0 1.2 -1.2 1.2 H3 q-1.2 0 -1.2 -1.2 V2.7 q0 -1.2 1.2 -1.2 z" fill="url(#rowDocPaper)" stroke="#6b7d95" strokeWidth="0.5" />
        <path d="M13 1.5 v3 q0 1 1 1 h3 z" fill="url(#rowDocFold)" stroke="#6b7d95" strokeWidth="0.5" />
        <rect x="4.5" y="9" width="10" height="0.9" fill="#7d92ad" />
        <rect x="4.5" y="11.5" width="11" height="0.9" fill="#7d92ad" />
        <rect x="4.5" y="14" width="9" height="0.9" fill="#7d92ad" />
        <rect x="4.5" y="16.5" width="11" height="0.9" fill="#7d92ad" />
        <rect x="4.5" y="19" width="7" height="0.9" fill="#7d92ad" />
    </svg>
);

const rowIcons = { folder: <FolderRowIcon />, doc: <DocRowIcon /> };

function ExplorerSidebar({ current, onNavigate }) {
    const item = (name, modifier) => (
        <li
            key={name}
            className={`explorer__item ${modifier || ''} ${current === name ? 'is-active' : ''}`}
            onClick={() => onNavigate(name)}
        >
            {name}
        </li>
    );
    return (
        <div className="explorer__sidebar">
            <div className="explorer__group">Favorites</div>
            <ul>
                {item('Desktop', 'explorer__item--star')}
                {item('Downloads', 'explorer__item--star')}
                {item('Recent Places', 'explorer__item--star')}
            </ul>
            <div className="explorer__group">Libraries</div>
            <ul>
                {item('Documents')}
                {item('Music')}
                {item('Pictures')}
                {item('Videos')}
                {item('Projects')}
            </ul>
            <div className="explorer__group">Computer</div>
            <ul>
                {item('Local Disk (C:)')}
                {item('Projects (D:)')}
            </ul>
            <div className="explorer__group">Network</div>
        </div>
    );
}

function FileExplorerBody({ openApp }) {
    const [view, setView] = useState('Documents');
    const [history, setHistory] = useState([]);
    const [future, setFuture] = useState([]);
    const [selected, setSelected] = useState(null);

    const navigate = (name) => {
        const target = explorerViews[name];
        if (!target) return;
        // Resolve aliases (e.g. Projects (D:) → Projects)
        const resolved = target.goto ? target.goto : name;
        if (resolved === view) return;
        setHistory((h) => [...h, view]);
        setFuture([]);
        setView(resolved);
        setSelected(null);
    };
    const back = () => {
        if (!history.length) return;
        const prev = history[history.length - 1];
        setHistory((h) => h.slice(0, -1));
        setFuture((f) => [view, ...f]);
        setView(prev);
        setSelected(null);
    };
    const forward = () => {
        if (!future.length) return;
        const next = future[0];
        setFuture((f) => f.slice(1));
        setHistory((h) => [...h, view]);
        setView(next);
        setSelected(null);
    };

    const activate = (it) => {
        if (it.open) openApp(it.open);
        else if (it.href) window.open(it.href, '_blank', 'noopener,noreferrer');
        else if (it.goto) navigate(it.goto);
    };

    const current = explorerViews[view] || { path: view, items: [] };
    const items = current.items || [];

    return (
        <div className="explorer">
            <ExplorerSidebar current={view} onNavigate={navigate} />
            <div className="explorer__main">
                <div className="explorer__navbar">
                    <button
                        type="button"
                        className="explorer__navbtn"
                        onClick={back}
                        disabled={!history.length}
                        title="Back"
                    >←</button>
                    <button
                        type="button"
                        className="explorer__navbtn"
                        onClick={forward}
                        disabled={!future.length}
                        title="Forward"
                    >→</button>
                    <div className="explorer__address">{current.path}</div>
                </div>
                <div className="explorer__toolbar">
                    <button type="button" className="explorer__tbtn">Organize</button>
                    <button type="button" className="explorer__tbtn">Share with ▾</button>
                    <button type="button" className="explorer__tbtn">New folder</button>
                    <div className="explorer__tspacer" />
                    <button type="button" className="explorer__tbtn explorer__tbtn--icon" title="Change view">▦</button>
                </div>
                <div className="explorer__header">
                    <span>Name</span>
                    <span>Date modified</span>
                    <span>Type</span>
                    <span>Size</span>
                </div>
                {items.length === 0 ? (
                    <div className="explorer__empty">This folder is empty.</div>
                ) : (
                    <ul className="explorer__list">
                        {items.map((f) => (
                            <li
                                key={f.name}
                                className={`explorer__row ${selected === f.name ? 'is-selected' : ''}`}
                                onClick={() => setSelected(f.name)}
                                onDoubleClick={() => activate(f)}
                                title={f.href ? f.href : (f.open ? `Open ${f.open}` : '')}
                            >
                                <span className="explorer__icon" aria-hidden>{rowIcons[f.kind]}</span>
                                <span className="explorer__name">{f.name}</span>
                                <span>{f.modified || ''}</span>
                                <span>{f.kind === 'folder' ? 'File folder' : 'Document'}</span>
                                <span>{f.kind === 'folder' ? (f.items != null ? `${f.items} items` : '') : (f.size || '')}</span>
                            </li>
                        ))}
                    </ul>
                )}
                <div className="explorer__statusbar">
                    <span>{items.length} item{items.length === 1 ? '' : 's'}</span>
                </div>
            </div>
        </div>
    );
}

export const apps = {
    fileExplorer: {
        id: 'fileExplorer',
        label: 'Documents',
        icon: 'folder',
        kind: 'app',
        width: 820,
        height: 520,
        render: ({ openApp }) => <FileExplorerBody openApp={openApp} />,
    },
    resume: {
        id: 'resume',
        label: 'Resume.lnk',
        icon: 'doc',
        kind: 'browser',
        url: 'https://vlumpkin.github.io/resume',
        width: 900,
        height: 640,
        render: () => <ScaledResume />,
    },
    kirklandSMP: {
        id: 'kirklandSMP',
        label: 'KirklandSMP.project',
        icon: 'project',
        kind: 'app',
        width: 1000,
        height: 640,
        render: () => (
            <ScaledIframe
                title="KirklandSMP"
                src="https://app.powerbi.com/view?r=eyJrIjoiYjk3YzYxMGQtYmEyNC00YjRkLWE0OGEtMThiYTBlZDIwZGRlIiwidCI6IjA5YzU1ZWU4LTAxZWQtNGE0My1iOWVlLTFmZWMzMDAxN2RlNiJ9&pageName=ReportSection982a249f7c63ee9a307b"
                baseWidth={1232}
                baseHeight={657}
            />
        ),
    },
    collegeAdmissions: {
        id: 'collegeAdmissions',
        label: 'CollegeAdmissions.project',
        icon: 'project',
        kind: 'app',
        width: 1000,
        height: 640,
        render: () => (
            <ScaledIframe
                title="CollegeAdmissions"
                src="https://app.powerbi.com/view?r=eyJrIjoiMDMxNzA5MGUtZWNhYy00YWQxLThjMTktN2M5ZWNjYWJhZmUzIiwidCI6IjA5YzU1ZWU4LTAxZWQtNGE0My1iOWVlLTFmZWMzMDAxN2RlNiJ9"
                baseWidth={1232}
                baseHeight={657}
            />
        ),
    },
    primaryBackup: {
        id: 'primaryBackup',
        label: 'PrimaryBackup.project',
        icon: 'project',
        kind: 'app',
        width: 1040,
        height: 720,
        render: () => (
            <ScaledIframe
                title="PrimaryBackup"
                src="https://observablehq.com/embed/b94ac1f36a2d4447@4512?cells=controls3%2CcreateDashboard"
                baseWidth={1232}
                baseHeight={970}
            />
        ),
    },
    myComputer: {
        id: 'myComputer',
        label: 'My Computer',
        icon: 'computer',
        kind: 'app',
        width: 560,
        height: 380,
        render: () => (
            <div className="mycomputer">
                <h3>Drives</h3>
                <ul>
                    <li>Local Disk (C:)</li>
                    <li>Projects (D:)</li>
                    <li>Network</li>
                </ul>
            </div>
        ),
    },
    recycleBin: {
        id: 'recycleBin',
        label: 'Recycle Bin',
        icon: 'recycle',
        kind: 'app',
        width: 480,
        height: 320,
        render: () => (
            <div className="recyclebin">
                <p>The Recycle Bin is empty.</p>
            </div>
        ),
    },
};

// Order shown on desktop (top-to-bottom, left column).
export const desktopLayout = [
    'myComputer',
    'fileExplorer',
    'resume',
    'kirklandSMP',
    'collegeAdmissions',
    'primaryBackup',
    'recycleBin',
];
