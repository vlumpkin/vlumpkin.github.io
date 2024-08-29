import React from 'react';
import Menu from './Menu.js';
import Resume from './Resume.js';

export default function Display(props) {
    const { state, setState } = props;


    if (state === "Resume") {
        return (
            <div className='Display'>
                <Resume />
            </div>

        )
    }

    return (
        <p>Set Yo State Foo</p>
    )
}