import React, { useEffect, useRef } from 'react';

// Decorative wallpaper name. Drawn into a low-resolution canvas in bold italic,
// alpha-thresholded so nothing is antialiased, then upscaled with nearest-neighbour
// scaling by CSS — which is what gives it chunky, bitmap-font pixels.

// dx staggers each line horizontally, as a fraction of the viewport width.
const LINES = [
    { text: 'Vernon', dx: -0.05 },
    { text: 'Lumpkin', dx: 0.05 },
];
const PIXEL = 5;          // css pixels per drawn pixel
const WIDTH_RATIO = 0.26; // fraction of the viewport the longest line fills
const VERTICAL = 0.42;    // where the block sits vertically; 0.5 is dead centre
const ALPHA = 200;        // 0-255; how brightly the glyphs sit on the wallpaper
const CUTOFF = 105;       // alpha threshold — higher erodes strokes thinner, but
                          // too high and light stems break into dots at this size
const SHADOW_ALPHA = 110; // the 1px offset shadow XP draws under title-bar text
const SHADOW = '#0a2340';
// XP's title bar is set in Trebuchet MS Bold — same face the pixel recreations copy.
const FONT = 'italic 700 100px "Trebuchet MS", Tahoma, "Franklin Gothic Medium", sans-serif';

export default function Wordmark() {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const draw = () => {
            const cssW = canvas.clientWidth;
            const cssH = canvas.clientHeight;
            if (!cssW || !cssH) return;

            const w = Math.max(1, Math.round(cssW / PIXEL));
            const h = Math.max(1, Math.round(cssH / PIXEL));
            canvas.width = w;
            canvas.height = h;

            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            ctx.clearRect(0, 0, w, h);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            // Measure at a reference size, then scale so the widest line fits.
            ctx.font = FONT;
            const widest = Math.max(...LINES.map((l) => ctx.measureText(l.text).width));
            const size = Math.round((100 * (w * WIDTH_RATIO)) / widest);
            ctx.font = FONT.replace('100px', `${size}px`);

            const lineH = Math.round(size * 0.95);
            const top = h * VERTICAL - ((LINES.length - 1) * lineH) / 2;
            const at = (line, i) => [w / 2 + w * line.dx, top + i * lineH];

            // Shadow pass one drawn-pixel down-right, then the white glyphs over it.
            ctx.fillStyle = SHADOW;
            LINES.forEach((line, i) => {
                const [x, y] = at(line, i);
                ctx.fillText(line.text, x + 1, y + 1);
            });
            ctx.fillStyle = '#fff';
            LINES.forEach((line, i) => ctx.fillText(line.text, ...at(line, i)));

            // Hard-edge the glyphs: every pixel is either on or fully transparent.
            // Dark pixels are shadow, so they get their own (lower) opacity.
            const img = ctx.getImageData(0, 0, w, h);
            const d = img.data;
            for (let i = 3; i < d.length; i += 4) {
                if (d[i] <= CUTOFF) { d[i] = 0; continue; }
                d[i] = d[i - 3] > 128 ? ALPHA : SHADOW_ALPHA;
            }
            ctx.putImageData(img, 0, 0);
        };

        draw();
        // Fonts can land after first paint; redraw so the metrics are right.
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
        window.addEventListener('resize', draw);
        return () => window.removeEventListener('resize', draw);
    }, []);

    return <canvas ref={canvasRef} className="desktop__wordmark" aria-hidden="true" />;
}
