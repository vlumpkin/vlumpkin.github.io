import React, { useState, useRef, useEffect } from 'react';
import { resumeBasic, resumeContent } from './data.js'

export default function ResumeRebuild() {
    const [triggerStep, setTriggerStep] = useState(1);
    const [collapsedSections, setCollapsedSections] = useState({});

    const toggleCollapse = (section) => {
        setCollapsedSections({
            ...collapsedSections,
            [section]: !collapsedSections[section]
        });
    };

    const TestPaperRef = useRef(null);
    const TestPaperContentRef = useRef(null);
    const TestTopContainerRef = useRef(null);
    const TestPaperNameRef = useRef(null);
    const TestContactsRef = useRef(null);
    const TestContacts1Ref = useRef(null);
    const TestContacts2Ref = useRef(null);
    const TestContacts3Ref = useRef(null);

    const TestHR1Ref = useRef(null);
    const TestHR2Ref = useRef(null);
    const TestHR3Ref = useRef(null);
    const TestHR4Ref = useRef(null);
    const TestHR5Ref = useRef(null);
    const TestHR6Ref = useRef(null);

    const TestSection1Ref = useRef(null);
    const TestSection2Ref = useRef(null);
    const TestSection3Ref = useRef(null);
    const TestSection4Ref = useRef(null);
    const TestSection5Ref = useRef(null);
    const TestSection6Ref = useRef(null);

    const TestDetails1Ref = useRef(null);
    const TestDetails2Ref = useRef(null);
    const TestDetails3Ref = useRef(null);
    const TestDetails4Ref = useRef(null);
    const TestDetails5Ref = useRef(null);
    const TestDetails6Ref = useRef(null);

    const TestItem00Ref = useRef(null);
    const TestItem01Ref = useRef(null);
    const TestItem10Ref = useRef(null);
    const TestItem11Ref = useRef(null);
    const TestItem20Ref = useRef(null);
    const TestItem21Ref = useRef(null);
    const TestItem22Ref = useRef(null);
    const TestItem30Ref = useRef(null);
    const TestItem31Ref = useRef(null);
    const TestItem32Ref = useRef(null);
    const TestItem40Ref = useRef(null);
    const TestItem50Ref = useRef(null);

    const TestArrow00Ref = useRef(null);
    const TestArrow01Ref = useRef(null);
    const TestArrow20Ref = useRef(null);
    const TestArrow21Ref = useRef(null);
    const TestArrow22Ref = useRef(null);
    const TestArrow30Ref = useRef(null);
    const TestArrow31Ref = useRef(null);
    const TestArrow32Ref = useRef(null);
    const TestArrow40Ref = useRef(null);

    const delay = 300;

    // Step 1: Transition Paper Width and Padding
    useEffect(() => {
        if (triggerStep === 1) {
            const timer = setTimeout(() => {
                TestPaperRef.current.style.width = `1100px`;
                TestPaperRef.current.style.padding = "45px";
                setTriggerStep(2);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Step 2: Expand the Paper Content to Full Height
    useEffect(() => {
        if (triggerStep === 2) {
            const timer = setTimeout(() => {
                const fullHeight = TestTopContainerRef.current.scrollHeight;
                TestPaperContentRef.current.style.height = `${fullHeight}px`;
                setTriggerStep(3);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Step 3: Expand Name and Contacts
    useEffect(() => {
        if (triggerStep === 3) {
            const timer = setTimeout(() => {
                TestPaperNameRef.current.style.width = `100%`;
                TestContactsRef.current.style.width = `100%`;
                setTriggerStep(4);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Step 4: Expand Individual Contacts
    useEffect(() => {
        if (triggerStep === 4) {
            const timer = setTimeout(() => {
                const contact1Width = TestContacts1Ref.current.scrollWidth;
                const contact2Width = TestContacts2Ref.current.scrollWidth;
                const contact3Width = TestContacts3Ref.current.scrollWidth;

                TestContacts1Ref.current.style.width = `${contact1Width}px`;
                TestContacts2Ref.current.style.width = `${contact2Width}px`;
                TestContacts3Ref.current.style.width = `${contact3Width}px`;
                setTriggerStep(5);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Step 5: Expand Page for the Headers
    useEffect(() => {
        if (triggerStep === 5) {
            const timer = setTimeout(() => {
                const fullHeight = TestPaperContentRef.current.scrollHeight;
                TestPaperContentRef.current.style.height = `${fullHeight}px`;
                setTriggerStep(6);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Step 6: Expand the HR lines for each header
    useEffect(() => {
        if (triggerStep === 6) {
            const timer = setTimeout(() => {
                TestHR1Ref.current.style.flexGrow = `1`;
                TestHR2Ref.current.style.flexGrow = `1`;
                TestHR3Ref.current.style.flexGrow = `1`;
                TestHR4Ref.current.style.flexGrow = `1`;
                TestHR5Ref.current.style.flexGrow = `1`;
                TestHR6Ref.current.style.flexGrow = `1`;
                setTriggerStep(7);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Step 7: Expand page for the section details and expand sections
    useEffect(() => {
        if (triggerStep === 7) {
            const timer = setTimeout(() => {
                const details1Height = TestDetails1Ref.current.scrollHeight;
                const details2Height = TestDetails2Ref.current.scrollHeight;
                const details3Height = TestDetails3Ref.current.scrollHeight;
                const details4Height = TestDetails4Ref.current.scrollHeight;
                const details5Height = TestDetails5Ref.current.scrollHeight;
                const details6Height = TestDetails6Ref.current.scrollHeight;

                TestPaperRef.current.style.height = `fit-content`;
                TestPaperContentRef.current.style.height = `fit-content`;

                const subDelay = 100;

                setTimeout(() => {
                    TestDetails1Ref.current.style.height = `${details1Height}px`;
                    setTimeout(() => {
                        TestDetails2Ref.current.style.height = `${details2Height}px`;
                        setTimeout(() => {
                            TestDetails3Ref.current.style.height = `${details3Height}px`;
                            setTimeout(() => {
                                TestDetails4Ref.current.style.height = `${details4Height}px`;
                                setTimeout(() => {
                                    TestDetails5Ref.current.style.height = `${details5Height}px`;
                                    setTimeout(() => {
                                        TestDetails6Ref.current.style.height = `${details6Height}px`;
                                        setTriggerStep(8);
                                    }, subDelay);
                                }, subDelay);
                            }, subDelay);
                        }, subDelay);
                    }, subDelay);
                }, 0);

                setTriggerStep(8);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Step 8: Expand each item in the section
    useEffect(() => {
        if (triggerStep === 8) {
            const timer = setTimeout(() => {
                const subDelay = 50;

                setTimeout(() => {
                    TestItem00Ref.current.style.width = `100%`;
                    setTimeout(() => {
                        TestItem01Ref.current.style.width = `100%`;
                        setTimeout(() => {
                            TestItem10Ref.current.style.width = `100%`;
                            setTimeout(() => {
                                TestItem11Ref.current.style.width = `100%`;
                                setTimeout(() => {
                                    TestItem20Ref.current.style.width = `100%`;
                                    setTimeout(() => {
                                        TestItem21Ref.current.style.width = `100%`;
                                        setTimeout(() => {
                                            TestItem22Ref.current.style.width = `100%`;
                                            setTimeout(() => {
                                                TestItem30Ref.current.style.width = `100%`;
                                                setTimeout(() => {
                                                    TestItem31Ref.current.style.width = `100%`;
                                                    setTimeout(() => {
                                                        TestItem32Ref.current.style.width = `100%`;
                                                        setTimeout(() => {
                                                            TestItem40Ref.current.style.width = `100%`;
                                                            setTimeout(() => {
                                                                TestItem50Ref.current.style.width = `100%`;
                                                            }, subDelay);
                                                        }, subDelay);
                                                    }, subDelay);
                                                }, subDelay);
                                            }, subDelay);
                                        }, subDelay);
                                    }, subDelay);
                                }, subDelay);
                            }, subDelay);
                        }, subDelay);
                    }, subDelay);
                }, 0);
                setTriggerStep(9);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Step 9: Expand each arrow
    useEffect(() => {
        if (triggerStep === 9) {
            const timer = setTimeout(() => {
                const temp00 = TestArrow00Ref.current.scrollHeight;

                const subDelay = 100;

                setTimeout(() => {
                    TestArrow00Ref.current.style.height = `${temp00}px`;
                    setTimeout(() => {
                        TestArrow01Ref.current.style.height = `${temp00}px`;
                        setTimeout(() => {
                            TestArrow20Ref.current.style.height = `${temp00}px`;
                            setTimeout(() => {
                                TestArrow21Ref.current.style.height = `${temp00}px`;
                                setTimeout(() => {
                                    TestArrow22Ref.current.style.height = `${temp00}px`;
                                    setTimeout(() => {
                                        TestArrow30Ref.current.style.height = `${temp00}px`;
                                        setTimeout(() => {
                                            TestArrow31Ref.current.style.height = `${temp00}px`;
                                            setTimeout(() => {
                                                TestArrow32Ref.current.style.height = `${temp00}px`;
                                                setTimeout(() => {
                                                    TestArrow40Ref.current.style.height = `${temp00}px`;
                                                }, subDelay);
                                            }, subDelay);
                                        }, subDelay);
                                    }, subDelay);
                                }, subDelay);
                            }, subDelay);
                        }, subDelay);
                    }, subDelay);
                }, 0);
                setTriggerStep(10);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Step 10: fix details style for buttons
    useEffect(() => {
        if (triggerStep === 10) {
            const timer = setTimeout(() => {

                const visible = [
                    TestPaperContentRef,
                    TestDetails1Ref,
                    TestDetails3Ref,
                    TestDetails4Ref,
                    TestDetails5Ref,
                    TestItem00Ref,
                    TestItem01Ref,
                    TestItem10Ref,
                    TestItem11Ref,
                    TestItem20Ref,
                    TestItem21Ref,
                    TestItem22Ref,
                    TestItem30Ref,
                    TestItem31Ref,
                    TestItem32Ref,
                    TestItem40Ref,
                    TestItem50Ref,
                ]

                visible.forEach(ref => {
                    if (ref.current) {
                        ref.current.style.overflow = 'visible';
                    }
                });

                setTriggerStep(11);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Step 11: 
    useEffect(() => {
        if (triggerStep === 11) {
            const timer = setTimeout(() => {
                const fitContent = [
                    TestDetails1Ref,
                    TestDetails3Ref,
                    TestDetails4Ref,
                    TestDetails5Ref,
                ]

                fitContent.forEach(ref => {
                    if (ref.current) {
                        ref.current.style.height = 'fit-content';
                        console.log('thing');
                    }
                })
                setTriggerStep(12);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);



    const header = (title) => {
        return (
            <div className='TestHeader'>
                <p>{title}</p>
                <hr ref={getHRRef(title)} />
            </div>
        )
    }

    const getHRRef = (section) => {
        switch (section) {
            case ("EDUCATION"):
                return TestHR1Ref;
            case ("TECHNICAL SKILLS"):
                return TestHR2Ref;
            case ("PERSONAL PROJECTS"):
                return TestHR3Ref;
            case ("EXPERIENCE"):
                return TestHR4Ref;
            case ("ACTIVITIES"):
                return TestHR5Ref;
            case ("INTERPERSONAL SKILLS"):
                return TestHR6Ref;
        }
    }

    const getSectionRef = (section) => {
        switch (section) {
            case ("EDUCATION"):
                return TestSection1Ref;
            case ("TECHNICAL SKILLS"):
                return TestSection2Ref;
            case ("PERSONAL PROJECTS"):
                return TestSection3Ref;
            case ("EXPERIENCE"):
                return TestSection4Ref;
            case ("ACTIVITIES"):
                return TestSection5Ref;
            case ("INTERPERSONAL SKILLS"):
                return TestSection6Ref;
        }
    }

    const getDetailsRef = (section) => {
        switch (section) {
            case ("EDUCATION"):
                return TestDetails1Ref;
            case ("TECHNICAL SKILLS"):
                return TestDetails2Ref;
            case ("PERSONAL PROJECTS"):
                return TestDetails3Ref;
            case ("EXPERIENCE"):
                return TestDetails4Ref;
            case ("ACTIVITIES"):
                return TestDetails5Ref;
            case ("INTERPERSONAL SKILLS"):
                return TestDetails6Ref;
            default:
                console.log(`${section} DETAILS NOT ASSIGNED`);
        }
    }

    const getItemRef = (index, itemIndex) => {
        switch (index) {
            case (0):
                switch (itemIndex) {
                    case (0):
                        return TestItem00Ref;
                    case (1):
                        return TestItem01Ref;
                }
            case (1):
                switch (itemIndex) {
                    case (0):
                        return TestItem10Ref;
                    case (1):
                        return TestItem11Ref;
                }
            case (2):
                switch (itemIndex) {
                    case (0):
                        return TestItem20Ref;
                    case (1):
                        return TestItem21Ref;
                    case (2):
                        return TestItem22Ref;
                }
            case (3):
                switch (itemIndex) {
                    case (0):
                        return TestItem30Ref;
                    case (1):
                        return TestItem31Ref;
                    case (2):
                        return TestItem32Ref;
                }
            case (4):
                switch (itemIndex) {
                    case (0):
                        return TestItem40Ref;
                }
            case (5):
                switch (itemIndex) {
                    case (0):
                        return TestItem50Ref;
                }
            default:
                console.log(`ITEM REF NOT ASSIGNED`);
        }
    }

    const getArrowRef = (index, itemIndex) => {
        switch (index) {
            case (0):
                switch (itemIndex) {
                    case (0):
                        return TestArrow00Ref;
                    case (1):
                        return TestArrow01Ref;
                }
            case (2):
                switch (itemIndex) {
                    case (0):
                        return TestArrow20Ref;
                    case (1):
                        return TestArrow21Ref;
                    case (2):
                        return TestArrow22Ref;
                }
            case (3):
                switch (itemIndex) {
                    case (0):
                        return TestArrow30Ref;
                    case (1):
                        return TestArrow31Ref;
                    case (2):
                        return TestArrow32Ref;
                }
            case (4):
                switch (itemIndex) {
                    case (0):
                        return TestArrow40Ref;
                }
            default:
                console.log(`ITEM REF NOT ASSIGNED`);
        }
    }

    const itemHeader = (item, index, itemIndex) => {
        return (
            <button
                type='button'
                className='collapsible'
                onClick={() => toggleCollapse(`${index}_${itemIndex}`)}
            >
                <div className='item-title'>
                    <p><b>{item.title1} {item.title2 && (<>&mdash; {item.title2}</>)}</b></p>
                    <p className='date'><i>{item.date1} {item.date2 && (<>&ndash; {item.date2}</>)}</i></p>
                </div>
                <span className='button_arrow' ref={getArrowRef(index, itemIndex)} style={{ transition: 'height 1.2s ease', height: '0', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
                    {collapsedSections[`${index}_${itemIndex}`] ? "\u25B4" : "\u25BE"}
                </span>
            </button>
        )
    }

    const itemDetails = (item, index, itemIndex) => {
        return (
            <div
                className='item-description'
                style={{
                    maxHeight: collapsedSections[`${index}_${itemIndex}`] ? `${calculateHeight(item)}px` : '0', // maxHeight set to an arbitrary 900px to make transition work
                    overflow: collapsedSections[`${index}_${itemIndex}`] ? 'visible' : 'hidden',
                    transition: 'max-height 0.6s ease',
                }}
            >
                <ul>
                    {item.details.map((subpoint, subIndex) => (
                        typeof subpoint === 'string' ? (
                            <li key={subIndex}><p>{subpoint}</p></li>
                        ) : (
                            <li key={subIndex}>
                                <p><b>{subpoint.title}</b> {subpoint.details}</p>
                            </li>
                        )
                    ))}
                    {item.tech && (
                        <li><p><u>Technologies Used:</u>
                            {item.tech.join(', ')}
                        </p></li>
                    )}
                    {item.extra && item.extra}
                </ul>
            </div>
        )
    }

    const formattedTestSection = () => {
        return (
            <>
                {resumeContent.map((section, index) => (
                    <div className='TestSection' key={index} ref={getSectionRef(section.title.toUpperCase())}>
                        {header(section.title.toUpperCase())}
                        <div className='TestDetails' ref={getDetailsRef(section.title.toUpperCase())}>
                            {(section.details.type === 'normal') && // Sections with collapsible buttons
                                section.details.details.map((item, itemIndex) => (
                                    <div className='TestItem' key={itemIndex} ref={getItemRef(index, itemIndex)}>
                                        {itemHeader(item, index, itemIndex)}
                                        {item.details && (
                                            itemDetails(item, index, itemIndex)
                                        )}
                                    </div>
                                ))
                            }
                            {(section.details.type === 'techSkills') && // Technical skills section
                                section.details.details.map((item, itemIndex) => (
                                    <div className="TestItem" key={itemIndex} ref={getItemRef(index, itemIndex)}>
                                        <div className="item-title">
                                            <p><b>{item.title}: </b>
                                                {item.skills.join(', ')}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }
                            {(section.details.type === 'interSkills') && // Interpersonal skills section
                                (<><div className='item-title'></div>
                                    <div className='skills' ref={getItemRef(index, 0)} style={{ width: '0', transition: 'width 1.2s ease', textWrap: 'nowrap', overflow: 'hidden' }}>
                                        <p>{section.details.details.join(" | ")}</p>
                                    </div>
                                </>)
                            }
                        </div>
                    </div>

                ))}
            </>
        )
    }

    // Helper function to calculate height based on content
    const calculateHeight = (item) => {
        let baseHeight = 200; // Adjust based on average item size
        if (item.extra) {
            baseHeight += 550; // Adjust based on the size of the iframe or additional content
        }
        return baseHeight;
    }

    return (
        <div className='TestDisplay'>
            <div
                className='TestPaper'
                ref={TestPaperRef}
            >
                <div
                    className='TestPaperContent'
                    ref={TestPaperContentRef}
                    style={{ height: '0' }}
                >
                    <div className='TestTopContainer'
                        ref={TestTopContainerRef}>
                        <div
                            className='TestPaperName'
                            ref={TestPaperNameRef}
                            style={{ width: '0' }}
                        >
                            {resumeBasic.name}
                        </div>
                        <div
                            className='TestContacts'
                            ref={TestContactsRef}
                            style={{ width: '0' }}
                        >
                            <a
                                href={"mailto:" + resumeBasic.email}
                                ref={TestContacts1Ref}
                            >
                                {resumeBasic.email}
                            </a>
                            <span> | </span>
                            <a
                                href={resumeBasic.linkedin}
                                ref={TestContacts2Ref}
                            >
                                LinkedIn
                            </a>
                            <span> | </span>
                            <a
                                href={resumeBasic.portfolio}
                                ref={TestContacts3Ref}
                            >
                                Portfolio
                            </a>
                        </div>
                    </div>
                    <div className='TestBottomContainer'>
                        {formattedTestSection()}
                    </div>
                </div>
            </div>
        </div>
    );
}
