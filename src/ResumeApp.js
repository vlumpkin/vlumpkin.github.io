import React, { useState } from 'react';
import Resume from './components/Resume.js';

export default function ResumeApp() {
    const [editing, setEditing] = useState(false);


    return (
        <div className='resumeEditor'>
            <div style={{ fontSize: '20px' }}>
            <input type="checkbox" id="toggle-it" className="toggle-switch" onClick={() => setEditing(!editing)}/>
            <label htmlFor="toggle-it"></label>
        </div>
            {editing ? null : (<Resume />)}
        </div>
    )
}
