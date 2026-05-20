import React, { useState } from 'react';
import { apps, desktopLayout } from './apps.js';
import DesktopIcon from './DesktopIcon.js';
import Window from './Window.js';
import BrowserChrome from './BrowserChrome.js';
import Taskbar from './Taskbar.js';

let nextId = 1;
const nextZ = (() => { let z = 10; return () => ++z; })();

const ICON_W = 92;
const ICON_H = 84;
const ICON_X0 = 16;
const ICON_Y0 = 16;

function initialIconPositions() {
    const positions = {};
    desktopLayout.forEach((appId, i) => {
        positions[appId] = { x: ICON_X0, y: ICON_Y0 + i * ICON_H };
    });
    return positions;
}

export default function Desktop() {
    const [windows, setWindows] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const [iconPositions, setIconPositions] = useState(initialIconPositions);

    const moveIcon = (appId, pos) => {
        setIconPositions((p) => ({ ...p, [appId]: pos }));
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
        <div className="desktop">
            <div className="desktop__icons">
                {desktopLayout.map((appId) => {
                    const app = apps[appId];
                    if (!app) return null;
                    return (
                        <DesktopIcon
                            key={appId}
                            app={app}
                            position={iconPositions[appId]}
                            onOpen={() => openApp(appId)}
                            onMove={(pos) => moveIcon(appId, pos)}
                        />
                    );
                })}
            </div>

            {windows.map((w) => {
                const app = apps[w.appId];
                if (!app) return null;
                const chrome = app.kind === 'browser' ? <BrowserChrome url={app.url || ''} /> : null;
                return (
                    <Window
                        key={w.id}
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
