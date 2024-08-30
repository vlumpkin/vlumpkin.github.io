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

    const PaperRef = useRef(null);
    const PaperContentRef = useRef(null);
    const TopContainerRef = useRef(null);
    const BottomContainerRef = useRef(null);
    const PaperNameRef = useRef(null);

    const ContactsRef = useRef(null);
    const Contacts1Ref = useRef(null);
    const Contacts2Ref = useRef(null);
    const Contacts3Ref = useRef(null);
    const Contacts4Ref = useRef(null);

    const HR1Ref = useRef(null);
    const HR2Ref = useRef(null);
    const HR3Ref = useRef(null);
    const HR4Ref = useRef(null);
    const HR5Ref = useRef(null);
    const HR6Ref = useRef(null);

    const Section1Ref = useRef(null);
    const Section2Ref = useRef(null);
    const Section3Ref = useRef(null);
    const Section4Ref = useRef(null);
    const Section5Ref = useRef(null);
    const Section6Ref = useRef(null);

    const Details1Ref = useRef(null);
    const Details2Ref = useRef(null);
    const Details3Ref = useRef(null);
    const Details4Ref = useRef(null);
    const Details5Ref = useRef(null);
    const Details6Ref = useRef(null);

    const Item00Ref = useRef(null);
    const Item01Ref = useRef(null);
    const Item10Ref = useRef(null);
    const Item11Ref = useRef(null);
    const Item20Ref = useRef(null);
    const Item21Ref = useRef(null);
    const Item22Ref = useRef(null);
    const Item23Ref = useRef(null);
    const Item30Ref = useRef(null);
    const Item31Ref = useRef(null);
    const Item32Ref = useRef(null);
    const Item40Ref = useRef(null);
    const Item50Ref = useRef(null);

    const Arrow00Ref = useRef(null);
    const Arrow01Ref = useRef(null);
    const Arrow20Ref = useRef(null);
    const Arrow21Ref = useRef(null);
    const Arrow22Ref = useRef(null);
    const Arrow23Ref = useRef(null);
    const Arrow30Ref = useRef(null);
    const Arrow31Ref = useRef(null);
    const Arrow32Ref = useRef(null);
    const Arrow40Ref = useRef(null);

    // Variable responsible for the amount of time between transitions
    const delay = 150;

    // Step 1: Transition Paper Width and Padding
    useEffect(() => {
        if (triggerStep === 1) {
            const timer = setTimeout(() => {
                PaperRef.current.style.width = `1100px`;
                PaperRef.current.style.padding = "45px";
                TopContainerRef.current.style.height = `${41+17+25}px`;
                setTriggerStep(2);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep])

    // Step 2: Expand Name and Contacts
    useEffect(() => {
        if (triggerStep === 2) {
            const timer = setTimeout(() => {

                
                PaperNameRef.current.style.width = `100%`;
                PaperNameRef.current.style.height = `${PaperNameRef.current.scrollHeight}px`;
                ContactsRef.current.style.width = `100%`;
                setTriggerStep(3)
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep])

    // Step 3: Expand Individual Contacts
    useEffect(() => {
        if (triggerStep === 3) {
            const timer = setTimeout(() => {
                const refs = [
                    Contacts1Ref,
                    Contacts2Ref,
                    Contacts3Ref,
                    Contacts4Ref,
                ]

                refs.forEach(ref => {
                    const contactWidth = ref.current.scrollWidth;
                    ref.current.style.width = `${contactWidth}px`
                })

                setTriggerStep(4);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Step 4: Expand Page for the Headers
    useEffect(() => {
        if (triggerStep === 4) {
            const timer = setTimeout(() => {
                const subDelay = 100;
                const refs = [
                    Section1Ref,
                    Section2Ref,
                    Section3Ref,
                    Section4Ref,
                    Section5Ref,
                    Section6Ref,
                ]

                refs.forEach((ref, index) => {
                    setTimeout(() => {
                        if (ref.current) {
                            ref.current.style.height = `${ref.current.scrollHeight}px`;
                        }
                    }, subDelay * index);
                })
                setTriggerStep(5);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Step 5: Expand the HR lines for each header
    useEffect(() => {
        if (triggerStep === 5) {
            const timer = setTimeout(() => {
                const subDelay = 100;
                const refs = [
                    HR1Ref,
                    HR2Ref,
                    HR3Ref,
                    HR4Ref,
                    HR5Ref,
                    HR6Ref,
                ]

                refs.forEach((ref, index) => {
                    if (ref.current) {
                        setTimeout(() => {
                            ref.current.style.flexGrow = '1';
                        }, subDelay * index)

                    }
                })

                setTriggerStep(6);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Step 6: Expand page for the section details and expand sections
    useEffect(() => {
        if (triggerStep === 6) {
            const timer = setTimeout(() => {
                const subDelay = 100;
                const refs = [
                    Details1Ref,
                    Details2Ref,
                    Details3Ref,
                    Details4Ref,
                    Details5Ref,
                    Details6Ref,
                ]

                refs.forEach((ref, index) => {
                    setTimeout(() => {
                        if (ref.current) {
                            const detailsHeight = ref.current.scrollHeight;
                            ref.current.style.height = `${detailsHeight}px`;
                        }
                    }, subDelay * index);
                });

                setTriggerStep(7);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Step 7: Expand each item in the section
    useEffect(() => {
        if (triggerStep === 7) {
            const timer = setTimeout(() => {
                const subDelay = 50;
                const refs = [
                    Item00Ref,
                    Item01Ref,
                    Item10Ref,
                    Item11Ref,
                    Item20Ref,
                    Item21Ref,
                    Item22Ref,
                    Item23Ref,
                    Item30Ref,
                    Item31Ref,
                    Item32Ref,
                    Item40Ref,
                    Item50Ref,
                ]

                refs.forEach((ref, index) => {
                    setTimeout(() => {
                        if (ref.current) {
                            ref.current.style.width = `100%`;
                        }
                    }, subDelay * index);
                });

                setTriggerStep(8);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Step 8: Expand each arrow
    useEffect(() => {
        if (triggerStep === 8) {
            const timer = setTimeout(() => {
                const arrowHeight = Arrow00Ref.current.scrollHeight;
                const subDelay = 100;
                const refs = [
                    Arrow00Ref,
                    Arrow01Ref,
                    Arrow20Ref,
                    Arrow21Ref,
                    Arrow22Ref,
                    Arrow23Ref,
                    Arrow30Ref,
                    Arrow31Ref,
                    Arrow32Ref,
                    Arrow40Ref,
                ]

                refs.forEach((ref, index) => {
                    setTimeout(() => {
                        if (ref.current) {
                            ref.current.style.height = `${arrowHeight}px`;
                        }
                    }, subDelay * index);
                });

                setTriggerStep(9);
            }, delay + 100);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Step 9: set details, items, and paper content to 'visible' for the PowerBI Iframes,
    // set detail heights to "fit-content" so that they respond to when items are collapse-toggled
    useEffect(() => {
        if (triggerStep === 9) {
            const timer = setTimeout(() => {

                const visible = [
                    PaperContentRef,
                    BottomContainerRef,
                    Details1Ref,
                    Details3Ref,
                    Details4Ref,
                    Details5Ref,
                    Item00Ref,
                    Item01Ref,
                    Item10Ref,
                    Item11Ref,
                    Item20Ref,
                    Item21Ref,
                    Item22Ref,
                    Item23Ref,
                    Item30Ref,
                    Item31Ref,
                    Item32Ref,
                    Item40Ref,
                    Item50Ref,
                ]

                visible.forEach(ref => {
                    if (ref.current) {
                        ref.current.style.overflow = 'visible';
                    }
                });

                const fitContent = [
                    Details1Ref,
                    Details3Ref,
                    Details4Ref,
                    Details5Ref,
                ]

                fitContent.forEach(ref => {
                    if (ref.current) {
                        ref.current.style.height = 'fit-content';
                        console.log('thing');
                    }
                })

                setTriggerStep(10);
            }, delay * 10);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Helper function for header() that returns a unique reference for each section's hr
    const getHRRef = (section) => {
        switch (section) {
            case ("EDUCATION"):
                return HR1Ref;
            case ("TECHNICAL SKILLS"):
                return HR2Ref;
            case ("PERSONAL PROJECTS"):
                return HR3Ref;
            case ("EXPERIENCE"):
                return HR4Ref;
            case ("ACTIVITIES"):
                return HR5Ref;
            case ("INTERPERSONAL SKILLS"):
                return HR6Ref;
        }
    }

    // Helper function for formattedSection() that returns a unique reference for each section
    const getSectionRef = (section) => {
        switch (section) {
            case ("EDUCATION"):
                return Section1Ref;
            case ("TECHNICAL SKILLS"):
                return Section2Ref;
            case ("PERSONAL PROJECTS"):
                return Section3Ref;
            case ("EXPERIENCE"):
                return Section4Ref;
            case ("ACTIVITIES"):
                return Section5Ref;
            case ("INTERPERSONAL SKILLS"):
                return Section6Ref;
        }
    }

    // Helper function for formattedSection() that returns a unique reference for each section's details
    const getDetailsRef = (section) => {
        switch (section) {
            case ("EDUCATION"):
                return Details1Ref;
            case ("TECHNICAL SKILLS"):
                return Details2Ref;
            case ("PERSONAL PROJECTS"):
                return Details3Ref;
            case ("EXPERIENCE"):
                return Details4Ref;
            case ("ACTIVITIES"):
                return Details5Ref;
            case ("INTERPERSONAL SKILLS"):
                return Details6Ref;
            default:
                console.log(`${section} DETAILS NOT ASSIGNED`);
        }
    }

    // Helper function for formattedSection() that returns a unique reference for each item
    const getItemRef = (index, itemIndex) => {
        switch (index) {
            case (0):
                switch (itemIndex) {
                    case (0):
                        return Item00Ref;
                    case (1):
                        return Item01Ref;
                }
            case (1):
                switch (itemIndex) {
                    case (0):
                        return Item10Ref;
                    case (1):
                        return Item11Ref;
                }
            case (2):
                switch (itemIndex) {
                    case (0):
                        return Item20Ref;
                    case (1):
                        return Item21Ref;
                    case (2):
                        return Item22Ref;
                    case (3):
                        return Item23Ref;
                }
            case (3):
                switch (itemIndex) {
                    case (0):
                        return Item30Ref;
                    case (1):
                        return Item31Ref;
                    case (2):
                        return Item32Ref;
                }
            case (4):
                switch (itemIndex) {
                    case (0):
                        return Item40Ref;
                }
            case (5):
                switch (itemIndex) {
                    case (0):
                        return Item50Ref;
                }
            default:
                console.log(`ITEM REF NOT ASSIGNED`);
        }
    }

    // Helper function to itemHeader() that returns a unique reference for each arrow
    const getArrowRef = (index, itemIndex) => {
        switch (index) {
            case (0):
                switch (itemIndex) {
                    case (0):
                        return Arrow00Ref;
                    case (1):
                        return Arrow01Ref;
                }
            case (2):
                switch (itemIndex) {
                    case (0):
                        return Arrow20Ref;
                    case (1):
                        return Arrow21Ref;
                    case (2):
                        return Arrow22Ref;
                    case (3):
                        return Arrow23Ref;
                }
            case (3):
                switch (itemIndex) {
                    case (0):
                        return Arrow30Ref;
                    case (1):
                        return Arrow31Ref;
                    case (2):
                        return Arrow32Ref;
                }
            case (4):
                switch (itemIndex) {
                    case (0):
                        return Arrow40Ref;
                }
            default:
                console.log(`ITEM REF NOT ASSIGNED`);
        }
    }

    // Helper function for formattedSection() that returns each section's header
    const header = (title) => {
        return (
            <div className='header' ref={getSectionRef(title)}>
                <p>{title}</p>
                <hr ref={getHRRef(title)} />
            </div>
        )
    }

    // Helper function to formattedSection() that returns item headers
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
                <span className='button_arrow' ref={getArrowRef(index, itemIndex)}>
                    {collapsedSections[`${index}_${itemIndex}`] ? "\u25B4" : "\u25BE"}
                </span>
            </button>
        )
    }

    // Helper function to formattedSection() that returns item details
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

    // Returns all content below name and contacts
    const formattedSection = () => {
        return (
            <>
                {resumeContent.map((section, index) => (
                    <div className='section' key={index}>
                        {header(section.title.toUpperCase())}
                        <div className='details' ref={getDetailsRef(section.title.toUpperCase())}>
                            {(section.details.type === 'normal') && // Sections with collapsible buttons
                                section.details.details.map((item, itemIndex) => (
                                    <div className='item' key={itemIndex} ref={getItemRef(index, itemIndex)}>
                                        {itemHeader(item, index, itemIndex)}
                                        {item.details && (
                                            itemDetails(item, index, itemIndex)
                                        )}
                                    </div>
                                ))
                            }
                            {(section.details.type === 'techSkills') && // Technical skills section
                                section.details.details.map((item, itemIndex) => (
                                    <div className="item" key={itemIndex} ref={getItemRef(index, itemIndex)}>
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
        <div className='Display'>
            <div
                className='paper'
                ref={PaperRef}
            >
                <div
                    className='paperContent'
                    ref={PaperContentRef}
                >
                    <div className='topContainer'
                        ref={TopContainerRef}>
                        <div
                            className='paperName'
                            ref={PaperNameRef}
                        >
                            {resumeBasic.name}
                        </div>
                        <div
                            className='contacts'
                            ref={ContactsRef}
                        >
                            <a
                                href={"mailto:" + resumeBasic.email}
                                ref={Contacts1Ref}
                            >
                                {resumeBasic.email}
                            </a>
                            <span> | </span>
                            <a
                                href={resumeBasic.linkedin}
                                ref={Contacts2Ref}
                            >
                                LinkedIn
                            </a>
                            <span> | </span>
                            <a
                                href={resumeBasic.portfolio}
                                ref={Contacts3Ref}
                            >
                                Portfolio
                            </a>
                            <span> | </span>
                            <a
                                href={null}
                                ref={Contacts4Ref}
                            >
                                425.900.8344
                            </a>
                        </div>
                    </div>
                    <div className='bottomContainer' ref={BottomContainerRef}>
                        {formattedSection()}
                    </div>
                </div>
            </div>
        </div>
    );
}
