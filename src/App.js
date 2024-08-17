import React, { useState } from 'react';
import Display from './Display.js';

export default function App() {
    const [ state, setState ] = useState("Resume");

    return (
        <Display 
            state={state}
            setState={setState}
        />
    )
}