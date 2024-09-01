import React, { useState, useRef, useEffect } from 'react';

export default function MovingBar() {
    const [widthStep, setWidthStep] = useState(1);
    const [positionStep, setPositionStep] = useState(1);

    const MovingBarRef1 = useRef(null);
    const MovingBarRef2 = useRef(null);
    const MovingBarRef3 = useRef(null);
    const MovingBarRef4 = useRef(null);
    const MovingBarRef5 = useRef(null);
    const MovingBarRef6 = useRef(null);

    const style1 = {
        width: '100%',
        height: '1200px',
        overflow: 'visible',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    };

    const style2 = {
        width: '10px',
        height: '50px',
        backgroundColor: 'green',
        transition: 'height 1.8s linear, transform 2.4s linear',
        position: 'absolute',
        top: 0,
    };

    const widthDelay = 1800;
    const positionDelay = 2400;

    useEffect(() => {
        if (widthStep === 1) {
            const timer = setTimeout(() => {
                MovingBarRef1.current.style.height = `200px`;
                setWidthStep(2);
            }, widthDelay);
            return () => clearTimeout(timer);
        }
    }, [widthStep]);

    useEffect(() => {
        if (widthStep === 2) {
            const timer = setTimeout(() => {
                MovingBarRef1.current.style.height = `50px`;
                setWidthStep(1);
            }, widthDelay);
            return () => clearTimeout(timer);
        }
    }, [widthStep]);

    useEffect(() => {
        if (positionStep === 1) {
            const timer = setTimeout(() => {
                MovingBarRef1.current.style.transform = `translateY(1150px)`; 
                setPositionStep(2);
            }, positionDelay);
            return () => clearTimeout(timer);
        }
    }, [positionStep]);

    useEffect(() => {
        if (positionStep === 2) {
            const timer = setTimeout(() => {
                MovingBarRef1.current.style.transform = `translateY(0px)`;
                setPositionStep(1);
            }, positionDelay);
            return () => clearTimeout(timer);
        }
    }, [positionStep]);

    return (
        <div className='temp' style={style1}>
            <div className='MovingBar' ref={MovingBarRef1} style={{...style2, left: '50px'}}></div>
            <div className='MovingBar' ref={MovingBarRef2} style={{...style2, left: '80px'}}></div>
            <div className='MovingBar' ref={MovingBarRef3} style={{...style2, left: '110px'}}></div>
            <div className='MovingBar' ref={MovingBarRef4} style={{...style2, left: '140px'}}></div>
            <div className='MovingBar' ref={MovingBarRef5} style={{...style2, left: '170px'}}></div>
            <div className='MovingBar' ref={MovingBarRef6} style={{...style2, left: '200px'}}></div>
        </div>
    );
}
