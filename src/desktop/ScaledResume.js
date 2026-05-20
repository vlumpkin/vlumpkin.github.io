import React, { useEffect, useRef, useState } from 'react';
import Resume from '../components/Resume.js';
import { vResumeContent } from '../data.js';

// Resume hardcodes its paper width to 80rem (=1280px) and uses vw/rem throughout.
// Rather than rewrite those styles, scale the whole tree with a CSS transform so it
// fits the current window width. The wrapper height tracks scaled content so the
// outer .win__body scrolls naturally.
const BASE_WIDTH = 1480;

export default function ScaledResume() {
    const outerRef = useRef(null);
    const innerRef = useRef(null);
    const [scale, setScale] = useState(1);
    const [offsetX, setOffsetX] = useState(0);
    const [innerH, setInnerH] = useState(0);

    useEffect(() => {
        if (!outerRef.current || !innerRef.current) return;
        const update = () => {
            if (!outerRef.current || !innerRef.current) return;
            const w = outerRef.current.clientWidth;
            const s = Math.min(1, w / BASE_WIDTH);
            setScale(s);
            // Center horizontally once the window is wider than the scaled resume.
            setOffsetX(Math.max(0, (w - BASE_WIDTH * s) / 2));
            setInnerH(innerRef.current.scrollHeight);
        };
        update();
        const ro = new ResizeObserver(update);
        ro.observe(outerRef.current);
        ro.observe(innerRef.current);
        // Resume animates content in over ~2s — keep polling briefly so the wrapper
        // catches the final scrollHeight after the staged useEffect chain settles.
        const tickers = [200, 500, 1000, 2000, 3500].map((t) => setTimeout(update, t));
        return () => {
            ro.disconnect();
            tickers.forEach(clearTimeout);
        };
    }, []);

    return (
        <div
            ref={outerRef}
            className="scaled-resume"
            style={{ height: innerH ? innerH * scale : '100%' }}
        >
            <div
                ref={innerRef}
                className="scaled-resume__inner"
                style={{
                    width: BASE_WIDTH,
                    transform: `translateX(${offsetX}px) scale(${scale})`,
                    transformOrigin: 'top left',
                }}
            >
                <Resume editing={false} source={vResumeContent} state="Resume" />
            </div>
        </div>
    );
}
