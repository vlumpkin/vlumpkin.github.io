import React, { useRef, useEffect, useState } from 'react';

export default function Menu(props) {
    const { state, setState } = props;
    const [step, setStep] = useState(1);

    const page1Ref = useRef(null);
    const page2Ref = useRef(null);
    const page3Ref = useRef(null);
    const page4Ref = useRef(null);

    const tab1Ref = useRef(null);
    const tab2Ref = useRef(null);
    const tab3Ref = useRef(null);
    const tab4Ref = useRef(null);

    const pages = [
        "About",
        "Resume",
        "Resume Builder",
    ]

    const delay = 800;

    useEffect(() => {
        if (step === 1) {
            const timer = setTimeout(() => {
                const subDelay = 70;
                pages.forEach((page, index) => {
                    setTimeout(() => {
                        const ref = getPageRef(page.toUpperCase());
                        ref.current.style.width = `13rem`;
                    }, subDelay * index)
                })
                setStep(2);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [step]);

    useEffect(() => {
        if (step === 2) {
            const timer = setTimeout(() => {
                const tabRef = getTabRef(state.toUpperCase());
                const pageRef = getPageRef(state.toUpperCase());
                tabRef.current.style.height = `${(pageRef.current.scrollHeight) * .8}px`;
                setStep(3);
            }, delay / 2)
            return () => clearTimeout(timer);
        }
    }, [step, state])

    useEffect(() => {
        if (step === 3) {
            const timer = setTimeout(() => {
                pages.forEach((page) => {
                    getTabRef(page.toUpperCase()).current.style.height = `0`;
                })
                const ref = getTabRef(state.toUpperCase());
                ref.current.style.height = `${(getPageRef(state.toUpperCase()).current.scrollHeight) * .8}px`;
            })
            return () => clearTimeout(timer);
        }
    }, [state])

    const getPageRef = (page) => {
        switch (page) {
            case ("ABOUT"):
                return page1Ref;
            case ("RESUME"):
                return page2Ref;
            case ("RESUME BUILDER"):
                return page3Ref;
            case ("TESTING..."):
                return page4Ref;
            default:
                console.log(`PageTabRef ${page} invalid`)
        }
    }

    const getTabRef = (page) => {
        switch (page) {
            case ("ABOUT"):
                return tab1Ref;
            case ("RESUME"):
                return tab2Ref;
            case ("RESUME BUILDER"):
                return tab3Ref;
            case ("TESTING..."):
                return tab4Ref;
            default:
                console.log(`TabRef ${page} invalid`)
        }
    }

    return (
        <div className='menuContainer'>
            <div className='menu'>
                {pages.map((page, index) => {
                    return (
                        <div
                            key={index}
                            className='menuTab'
                            onClick={() => setState(page)}
                            ref={getPageRef(page.toUpperCase())}
                        >
                            <p>{page.toUpperCase()}</p>
                            <div
                                className='menuTabFlag'
                                ref={getTabRef(page.toUpperCase())}
                            ></div>
                        </div>
                    )
                })}
            </div>
        </div >
    )
}
