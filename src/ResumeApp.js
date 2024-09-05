import React, { useState } from 'react';
import Resume from './Components/Resume.js';
import ResumeForm from './components/ResumeForm.js';

export default function ResumeApp(props) {
    const { formData, setFormData, state } = props;
    const [editing, setEditing] = useState(false);

    return (
        <div className='resumeEditor'>
            <div className='resumeToggle'>
                <p style={{ textAlign: 'right' }}>View</p>
                <div style={{ fontSize: '14px' }}>
                    <input type="checkbox" id="toggle-it" className="toggle-switch" onClick={() => setEditing(!editing)} />
                    <label htmlFor="toggle-it"></label>
                </div>
                <p style={{ textAlign: 'left' }}>Edit</p>
            </div>
            {editing ? (
                <ResumeForm formData={formData} setFormData={setFormData} />
            ) : (
                <Resume editing={editing} source={formData} state={state} />
            )}
        </div>
    )
}