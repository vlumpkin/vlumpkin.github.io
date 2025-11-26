import React, { useState, useRef, useEffect } from 'react';
import Menu from './components/Menu.js';
import About from './components/About.js';
import Resume from './Components/Resume.js'; // Fixed path
import ResumeApp from './ResumeApp.js';
import { vResumeContent } from './data.js';
import MovingBar from './testing/MovingBar.js';

export default function Display(props) {
    const { state, setState, formData, setFormData } = props;
    let code;

    switch (state) {
        case "About":
            code = (
                <About />
            );
            break;
        case "Resume":
            code = (
                <Resume
                    editing={false}
                    source={vResumeContent}
                    state={state}
                />
            );
            break;
        case "Resume Builder":
            code = (
                <ResumeApp
                    formData={formData}
                    setFormData={setFormData}
                    state={state}
                />
            );
            break;
        case "Testing...":
            code = (
                <>
                    <MovingBar key="bar-top" />
                    <ResumeApp
                        formData={formData}
                        setFormData={setFormData}
                        state={state}
                    />
                    <MovingBar key="bar-bottom" />
                </>
            );
            break;
        default:
            code = (
                <p>Set Yo State Foo</p>
            );
            break;
    }
    
    const bgRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 100;
            const y = (e.clientY / window.innerHeight - 0.5) * 100;
            if (bgRef.current) {
                bgRef.current.style.transform = `translate(${x}px, ${y}px)`;
            }
        };

        document.addEventListener("mousemove", handler);

        return () => document.removeEventListener("mousemove", handler);
    }, []);

    return (
        <>
            <div id="bg" ref={bgRef}></div>
            <div className='display'>
                <Menu state={state} setState={setState} />
                {code}
            </div>
        </>
    );
}
