import React from 'react';

// Fake IE/Win7-era browser chrome (address bar only — no real navigation).
export default function BrowserChrome({ url }) {
    return (
        <div className="browser-chrome">
            <div className="browser-chrome__nav">
                <button type="button" className="browser-chrome__btn" aria-label="Back">←</button>
                <button type="button" className="browser-chrome__btn" aria-label="Forward">→</button>
                <button type="button" className="browser-chrome__btn" aria-label="Refresh">⟳</button>
            </div>
            <div className="browser-chrome__address">
                <span className="browser-chrome__lock" aria-hidden>🔒</span>
                <span className="browser-chrome__url">{url}</span>
            </div>
        </div>
    );
}
