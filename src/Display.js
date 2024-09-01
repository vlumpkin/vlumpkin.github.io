import React from 'react';
import Menu from './components/Menu.js';
import About from './components/About.js';
import ResumeApp from './ResumeApp.js';

import MovingBar from './testing/MovingBar.js';

export default function Display(props) {
    const { state, setState } = props;
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
                <ResumeApp />
            );
            break;
        case ("Portfolio"):
            code = (
                <p style={{ marginTop: '40vh', fontSize: '1.3em' }}>i might make this, might not</p>
            );
            break;
        case ("Testing..."):
            code = (
                <>
                    <MovingBar />
                    <ResumeApp />
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