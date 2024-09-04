import React, { useState } from 'react';
import Display from './Display.js';

export default function App() {
    const [ state, setState ] = useState("Resume");
    const [formData, setFormData] = useState({
        personalInfo: {
            firstName: 'Toggle the slider to edit!', 
            lastName: '', 
            email: '',
            phone: '',
            linkedin: '',
            portfolio: '',
        },
        educationEntries: [], 
        technicalSkills: '',
        projectEntries: [], 
        experienceEntries: [],
        activityEntries: [],
        volunteerEntries: [],
        interpersonalSkills: '',
    });

    return (
        <Display 
            state={state}
            setState={setState}
            formData={formData}
            setFormData={setFormData}
        />
    )
}