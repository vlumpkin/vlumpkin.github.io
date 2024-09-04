import React from 'react';
import Menu from './components/Menu.js';
import About from './components/About.js';
import Resume from './Components/Resume.js';
import ResumeApp from './ResumeApp.js';
import { vResumeContent } from './data.js';

import MovingBar from './testing/MovingBar.js';

export default function Display(props) {
    const { state, setState, formData, setFormData } = props;
    let code;

    switch (state) {
        case ("About"):
            code = (
                <>
                    <About />
                </>
            );
            break;
        case ("Resume"):
            code = (
                <Resume 
                    editing={false}
                    source={vResumeContent}
                />
            );
            break;
        case ("Resume Builder"):
            code = (
                <ResumeApp 
                        formData={formData}
                        setFormData={setFormData}
                    />
            )
            break;
        case ("Testing..."):
            code = (
                <>
                    <MovingBar />
                    <ResumeApp 
                        formData={formData}
                        setFormData={setFormData}
                    />
                    <MovingBar />
                </>
            );
            break;
        default:
            code = (
                <p>Set Yo State Foo</p>
            );
            break;
    }

    return (
        <div className='display'>
            <Menu
                state={state}
                setState={setState}
            />
            {code}
        </div>
    )
}