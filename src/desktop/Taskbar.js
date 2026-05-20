import React, { useEffect, useState } from 'react';

export default function Taskbar({ windows, apps, activeId, onTaskClick, onStart }) {
    const [time, setTime] = useState(() => new Date());

    useEffect(() => {
        const t = setInterval(() => setTime(new Date()), 30000);
        return () => clearInterval(t);
    }, []);

    const fmt = time.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const date = time.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });

    return (
        <div className="taskbar">
            <button type="button" className="taskbar__start" onClick={onStart}>
                <span className="taskbar__orb" aria-hidden />
                <span className="taskbar__startlabel">Start</span>
            </button>
            <div className="taskbar__tasks">
                {windows.map((w) => {
                    const app = apps[w.appId];
                    if (!app) return null;
                    return (
                        <button
                            key={w.id}
                            type="button"
                            className={`taskbar__task ${activeId === w.id && !w.minimized ? 'is-active' : ''}`}
                            onClick={() => onTaskClick(w.id)}
                        >
                            {app.label}
                        </button>
                    );
                })}
            </div>
            <div className="taskbar__tray">
                <div className="taskbar__clock">
                    <div>{fmt}</div>
                    <div>{date}</div>
                </div>
            </div>
        </div>
    );
}
