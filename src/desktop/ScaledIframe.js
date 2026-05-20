import React, { useEffect, useRef, useState } from 'react';

// Some embeds (Observable, PowerBI dashboards) have a fixed natural size and don't
// respond to container width. Render them at their authored dimensions and CSS-scale
// the whole iframe to fit the window — "contain" style, scaling by both axes so the
// entire embed stays visible.
export default function ScaledIframe({ src, baseWidth, baseHeight, title }) {
    const outerRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!outerRef.current) return;
        const update = () => {
            if (!outerRef.current) return;
            const w = outerRef.current.clientWidth;
            const h = outerRef.current.clientHeight;
            const s = Math.min(w / baseWidth, h / baseHeight);
            setScale(s);
            setOffset({
                x: Math.max(0, (w - baseWidth * s) / 2),
                y: Math.max(0, (h - baseHeight * s) / 2),
            });
        };
        update();
        const ro = new ResizeObserver(update);
        ro.observe(outerRef.current);
        return () => ro.disconnect();
    }, [baseWidth, baseHeight]);

    return (
        <div ref={outerRef} className="scaled-iframe">
            <div
                className="scaled-iframe__stage"
                style={{
                    width: baseWidth,
                    height: baseHeight,
                    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
                    transformOrigin: 'top left',
                    willChange: 'transform',
                }}
            >
                <iframe
                    title={title}
                    src={src}
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 0,
                        display: 'block',
                    }}
                    allowFullScreen
                />
            </div>
        </div>
    );
}
