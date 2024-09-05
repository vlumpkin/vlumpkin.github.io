import React, { useState, useRef, useEffect } from 'react';

export default function Resume(props) {
    const { editing, source } = props;
    const [triggerStep, setTriggerStep] = useState(1);
    const [collapsedSections, setCollapsedSections] = useState({});

    const { firstName, lastName, email, phone, linkedin, portfolio } = source.personalInfo;
    const sections = [
        {
            title: 'Education',
            details: source.educationEntries,
        },
        {
            title: 'Technical Skills',
            details: source.technicalSkills,
        },
        {
            title: 'Projects',
            details: source.projectEntries,
        },
        {
            title: 'Experience',
            details: source.experienceEntries,
        },
        {
            title: 'Activities',
            details: source.activityEntries,
        },
        {
            title: 'Volunteerism',
            details: source.volunteerEntries,
        },
        {
            title: 'Interpersonal Skills',
            details: source.interpersonalSkills
        },
    ];

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
    
    const contactRefs = useRef([]);
    const sectionHeaderRefs = useRef([]);
    const sectionHRRefs = useRef([]);
    const sectionDetailsRefs = useRef([]);
    const sectionItemRefs = useRef([]);

    useEffect(() => {
        sectionHeaderRefs.current = [];
        sectionHRRefs.current = [];
        sectionDetailsRefs.current = [];
        sectionItemRefs.current = [];

        sections.forEach((section, index) => {
            const valid = section.details.length > 0;
            if (valid) {
                sectionHeaderRefs.current[index] = React.createRef();
                sectionHRRefs.current[index] = React.createRef();
                sectionDetailsRefs.current[index] = React.createRef();

                if (section.title !== 'Technical Skills' && section.title !== 'Interpersonal Skills') {
                    sectionItemRefs.current[index] = [];  // Initialize the section array
                    section.details.forEach((_, itemIndex) => {
                        sectionItemRefs.current[index][itemIndex] = [];  // Initialize the item array
                        sectionItemRefs.current[index][itemIndex][0] = React.createRef();  // Item ref
                        sectionItemRefs.current[index][itemIndex][1] = React.createRef();  // Arrow ref
                        sectionItemRefs.current[index][itemIndex][2] = React.createRef();  // Description ref
                    });
                } else {
                    const lines = section.details.split('\n');
                    sectionItemRefs.current[index] = [];  // Initialize the section array
                    for (let i = 0; i < lines.length; i++) {
                        sectionItemRefs.current[index][i] = [];  // Initialize the item array
                        sectionItemRefs.current[index][i][0] = React.createRef();  // Item ref
                    }

                }
            } else {
                sectionHeaderRefs.current[index] = null;
                sectionHRRefs.current[index] = null;
                sectionDetailsRefs.current[index] = null;
                sectionItemRefs.current[index] = [null];
            }
        });
    }, []);

    useEffect(() => {
        contactRefs.current = [];
        const contacts = [
            email, 
            linkedin, 
            portfolio, 
            phone,
        ]

        contacts.forEach((contact, index) => {
            contactRefs.current[index] = (contact.length > 0 ? React.createRef() : null);
        })
    }, [])

    // Variable responsible for the amount of time between transitions
    const delay = 120;

    // Step 1: Transition Paper Width and Padding
    useEffect(() => {
        if (!editing && triggerStep === 1) {
            const timer = setTimeout(() => {
                if(PaperRef && PaperRef.current) {
                    PaperRef.current.style.width = `57.29vw`;
                }
                if(TopContainerRef && TopContainerRef.current) {
                    TopContainerRef.current.style.height = `8vh`;
                }
                setTriggerStep(2);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep])

    // Step 2: Expand Name and Contacts
    useEffect(() => {
        if (!editing && triggerStep === 2) {
            const timer = setTimeout(() => {

                if (PaperNameRef && PaperNameRef.current) {
                    PaperNameRef.current.style.width = `100%`;
                    PaperNameRef.current.style.height = `${PaperNameRef.current.scrollHeight}px`;
                }

                if (ContactsRef && ContactsRef.current) {
                    ContactsRef.current.style.width = `100%`;
                }

                setTriggerStep(3)
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep])

    // Step 3: Expand Individual Contacts
    useEffect(() => {
        if (!editing && triggerStep === 3) {
            const timer = setTimeout(() => {

                contactRefs.current.forEach(ref => {
                    if (ref && ref.current) {
                        const contactWidth = ref.current.scrollWidth;
                        ref.current.style.width = `${contactWidth}px`
                    }
                })

                setTriggerStep(4);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Step 4: Expand Page for the Headers
    useEffect(() => {
        if (!editing && triggerStep === 4) {
            const timer = setTimeout(() => {
                const subDelay = 100;
                sectionHeaderRefs.current.forEach((ref, index) => {
                    setTimeout(() => {
                        if (ref && ref.current) {
                            ref.current.style.height = `${ref.current.scrollHeight}px`;
                        }
                    }, subDelay * index);
                });
                setTriggerStep(5);
            }, delay);

            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Step 5: Expand the HR lines for each header
    useEffect(() => {
        if (!editing && triggerStep === 5) {
            const timer = setTimeout(() => {
                const subDelay = 100;

                sectionHRRefs.current.forEach((ref, index) => {
                    setTimeout(() => {
                        if (ref && ref.current) {
                            ref.current.style.flexGrow = '1';
                        }
                    }, subDelay * index)
                })

                setTriggerStep(6);
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Step 6: Expand page for the section details and expand sections
    useEffect(() => {
        if (!editing && triggerStep === 6) {
            const timer = setTimeout(() => {
                const subDelay = 100;

                sectionDetailsRefs.current.forEach((ref, index) => {
                    setTimeout(() => {
                        if (ref && ref.current) {
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
        if (!editing && triggerStep === 7) {
            const timer = setTimeout(() => {
                const subDelay = 50;

                let count = 0; // Initialize a counter for delays

                sectionItemRefs.current.forEach((sectionArray, sectionIndex) => {
                    if (sectionArray) {  // Ensure the section array is valid
                        sectionArray.forEach((itemArray, itemIndex) => {
                            if (itemArray && itemArray[0] && itemArray[0].current) {  // Check that the item ref exists
                                const ref = itemArray[0];  // Item ref (the first one)

                                setTimeout(() => {
                                    if (ref && ref.current) {
                                        ref.current.style.width = '100%';  // Apply the width style
                                    }
                                }, subDelay * count);  // Delay based on the counter
                                count++;  // Increment the delay counter
                            }
                        });
                    }
                });

                setTriggerStep(8);  // Move to the next step
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Step 8: Expand each arrow
    useEffect(() => {
        if (!editing && triggerStep === 8) {
            const timer = setTimeout(() => {
                const subDelay = 100;

                let count = 0; // Initialize a counter for delays

                sectionItemRefs.current.forEach((sectionArray, sectionIndex) => {
                    if (sectionArray) {  // Ensure the section array is valid
                        sectionArray.forEach((itemArray, itemIndex) => {
                            if (itemArray && itemArray[1] && itemArray[1].current) {  // Check that the item ref exists
                                const ref = itemArray[1];  // Item ref (the first one)

                                setTimeout(() => {
                                    if (ref && ref.current) {
                                        const arrowHeight = ref.current.scrollHeight;
                                        ref.current.style.height = `${arrowHeight}px`;
                                    }
                                }, subDelay * count);  // Delay based on the counter
                                count++;  // Increment the delay counter
                            }
                        });
                    }
                });

                setTriggerStep(9);
            }, delay + 100);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Step 9: set details, items, and paper content to 'visible' for the PowerBI Iframes,
    // set detail heights to "fit-content" so that they respond to when items are collapse-toggled
    useEffect(() => {
        if (!editing && triggerStep === 9) {
            const timer = setTimeout(() => {

                const visible = [
                    PaperContentRef,
                    BottomContainerRef,
                    ...sectionDetailsRefs.current,
                    sectionItemRefs.current.map((section, index) => {
                        if (sectionItemRefs.current[index]) {
                            section.map((item, itemIndex) => {
                                if (sectionItemRefs.current[index] && sectionItemRefs.current[index][itemIndex]) {
                                    item[0];
                                }
                            })
                        }
                    })
                ]

                visible.forEach(ref => {
                    if (ref && ref.current) {
                        ref.current.style.overflow = 'hidden';
                    }
                });

                sectionDetailsRefs.current.forEach(ref => {
                    if (ref) {
                        ref.current.style.height = 'fit-content';
                    }
                })

                setTriggerStep(10);
            }, delay * 10);
            return () => clearTimeout(timer);
        }
    }, [triggerStep]);

    // Helper function for contacts() that returns a unique reference for each contact
    const getContactsRef = (index) => {
        return contactRefs.current[index];
    }

    // Helper function for header() that returns a unique reference for each section's hr
    const getHRRef = (index) => {
        return sectionHRRefs.current[index];
    }

    // Helper function for formattedSection() that returns a unique reference for each section
    const getSectionHeaderRef = (index) => {
        return sectionHeaderRefs.current[index];
    }

    // Helper function for formattedSection() that returns a unique reference for each section's details
    const getDetailsRef = (index) => {
        return sectionDetailsRefs.current[index];
    }

    // Helper function for formattedSection() that returns a unique reference for each item
    const getItemRef = (index, itemIndex) => {
        if (sectionItemRefs.current[index] && sectionItemRefs.current[index][itemIndex]) {
            return sectionItemRefs.current[index][itemIndex][0];  // Access the item ref safely
        }
        return null;
    }

    // Helper function to itemHeader() that returns a unique reference for each arrow
    const getArrowRef = (index, itemIndex) => {
        if (sectionItemRefs.current[index] && sectionItemRefs.current[index][itemIndex]) {
            return sectionItemRefs.current[index][itemIndex][1];  // Access the item ref safely
        }
        return null;
    }

    // Helper function to itemDetails() that returns a unique reference for each item's details
    const getItemDescRef = (index, itemIndex) => {
        if (sectionItemRefs.current[index] && sectionItemRefs.current[index][itemIndex]) {
            return sectionItemRefs.current[index][itemIndex][2];  // Access the item ref safely
        }
        return null;
    }

    // Helper function for formattedSection() that returns each section's header
    const header = (title, index) => {
        return (
            <div className='header' ref={getSectionHeaderRef(index)} key={'header' + index}>
                <p>{title.toUpperCase()}</p>
                <hr ref={getHRRef(index)} />
            </div>
        )
    }

    // Helper function to formattedSection() that returns item headers
    const itemHeader = (section, item, index, itemIndex) => {
        let title1;
        let title2;
        switch (section) {
            case ('Education'):
                title1 = item.school;
                const temp = [];
                (item.degree) ? temp.push(item.degree) : undefined;
                (item.major) ? temp.push(item.major) : undefined;
                (item.secondMajor) ? temp.push(item.secondMajor) : undefined;
                (item.gpa) ? temp.push(item.gpa) : undefined;
                title2 = temp.join(', ');
                break;
            case ('Projects'):
                title1 = item.title;
                title2 = item.organization;
                break;
            case ('Experience'):
            case ('Activities'):
            case ('Volunteerism'):
                title1 = item.organization;
                title2 = item.position;
                break;
            default:
                console.log(`titles weren't assigned for ${section.title}, ${index, itemIndex}`);
        }


        return (
            <button
                type='button'
                className='collapsible'
                onClick={() => toggleCollapse(`${index}_${itemIndex}`)}
            >
                <div className='item-title'>
                    <p><b>{title1} {(title1 && title2) && (<>&mdash;</>)} {title2}</b></p>
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
                    height: collapsedSections[`${index}_${itemIndex}`] ? `${calculateHeight(index, itemIndex)}px` : '0',
                    overflow: collapsedSections[`${index}_${itemIndex}`] ? 'visible' : 'hidden',
                }}
                ref={getItemDescRef(index, itemIndex)}
            >
                <ul>
                    {formatStringGeneral(item.details)}
                    {item.tech && (
                        <li key={index}><p><u>Technologies Used: </u>
                            {item.tech.join(', ')}
                        </p></li>
                    )}
                </ul>
                {item.code && (
                    <div dangerouslySetInnerHTML={{ __html: item.code }}>
                    </div>
                )}
            </div>
        );
    }

    // Helper function for itemDetails returns the bullet points for each item's details
    const formatStringGeneral = (tempString) => {
        // Split the input string by lines
        const lines = tempString.split('\n');

        // Map through each line
        return lines.map((line, index) => {
            if (line.length === 0) {
                return null;
            }
            const parts = line.split(/(\*[^*]+\*|\"[^\"]+\")/); // Split by asterisks or quotes

            return (
                <li key={index}>
                    {parts.map((part, i) => {
                        if (part.startsWith('*') && part.endsWith('*')) {
                            // Remove the asterisks and return bold text
                            return <strong key={i}>{part.slice(1, -1)}</strong>;
                        } else if (part.startsWith('"') && part.endsWith('"')) {
                            // Remove the quotes and return underlined text
                            return <u key={i}>{part.slice(1, -1)}</u>;
                        }
                        // Return normal text
                        return part;
                    })}
                </li>
            );
        });
    };

    // Helper function for itemDetails returns the bullet points for each item's details
    const formatStringTechnicalSkills = (tempString, index) => {
        // Split the input string by lines
        const lines = tempString.split('\n');

        // Map through each line
        return lines.map((line, itemIndex) => {
            if (line.length === 0) {
                return null;
            }

            const parts = line.split(/(\*[^*]+\*|\"[^\"]+\")/); // Split by asterisks or quotes

            return (
                <div className="item" key={itemIndex} ref={getItemRef(index, itemIndex)}>
                    <div className="item-title" style={{ marginLeft: `4.36vw`, marginRight: `4.36vw` }}>
                        <p>
                            {parts.map((part, i) => {
                                if (part.startsWith('*') && part.endsWith('*')) {
                                    // Remove the asterisks and return bold text
                                    return <strong key={i}>{part.slice(1, -1)}</strong>;
                                } else if (part.startsWith('"') && part.endsWith('"')) {
                                    // Remove the quotes and return underlined text
                                    return <u key={i}>{part.slice(1, -1)}</u>;
                                }
                                // Return normal text
                                return part;
                            })}
                        </p>
                    </div>
                </div>
            );
        });
    };

    const formatStringInterpersonalSkills = (tempString) => {
        // Split the input string by lines
        const lines = tempString.split('\n');

        // Map through each line
        return lines.map((line, index) => {
            if (line.length === 0) {
                return null;
            }

            const parts = line.split(/(\*[^*]+\*|\"[^\"]+\")/); // Split by asterisks or quotes

            return (
                <p key={index}>
                    {parts.map((part, i) => {
                        if (part.startsWith('*') && part.endsWith('*')) {
                            // Remove the asterisks and return bold text
                            return <strong key={i}>{part.slice(1, -1)}</strong>;
                        } else if (part.startsWith('"') && part.endsWith('"')) {
                            // Remove the quotes and return underlined text
                            return <u key={i}>{part.slice(1, -1)}</u>;
                        }
                        // Return normal text
                        return part;
                    })}
                </p>
            );
        });
    };

    // Returns all content below name and contacts
    const formattedSection = () => {
        return (
            <>
                {sections.map((section, index) => (
                    (section.details.length > 0) &&
                    <div className='section' key={index}>
                        {header(section.title, index)}
                        <div
                            className='details'
                            ref={getDetailsRef(index)}
                            style={
                                (section.title === 'Technical Skills')
                                    ? { marginBottom: '1.1vh' }
                                    : {}
                            }
                            key={'details' + index}
                        >
                            {(section.title !== 'Technical Skills' && section.title !== 'Interpersonal Skills') && // Sections with collapsible buttons
                                section.details.map((item, itemIndex) => (
                                    <div className='item' key={index + ' ' + itemIndex} ref={getItemRef(index, itemIndex)}>
                                        {itemHeader(section.title, item, index, itemIndex)}
                                        {item.details && (
                                            itemDetails(item, index, itemIndex)
                                        )}
                                    </div>
                                ))
                            }
                            {(section.title === 'Technical Skills') && // Technical skills section
                                formatStringTechnicalSkills(section.details, index)
                            }
                            {(section.title === 'Interpersonal Skills') && // Interpersonal skills section
                                (<><div className='item-title'></div>
                                    <div className='skills' ref={getItemRef(index, 0)} style={{ width: '0', transition: 'width 1.2s ease', textWrap: 'nowrap', overflow: 'hidden' }}>
                                        {formatStringInterpersonalSkills(section.details)}
                                    </div>
                                </>)
                            }
                        </div >
                    </div >

                ))
                }
            </>
        )
    }

    // Helper function to calculate height based on content
    const calculateHeight = (index, itemIndex) => {
        const ref = getItemDescRef(index, itemIndex);
        return ref.current.scrollHeight;
    }

    const contacts = () => {
        let code = [
        ]

        if (email.length > 0) {
            code.push(
                <a
                    href={"mailto:" + email}
                    ref={getContactsRef(0)}
                    key={'email'}
                >
                    {email}
                </a>
            )
        }

        if (linkedin.length > 0) {
            code.push(
                <a
                    href={linkedin}
                    ref={getContactsRef(1)}
                    key={'linkedin'}
                >
                    LinkedIn
                </a>
            )
        }

        if (portfolio.length > 0) {
            code.push(
                <a
                    href={portfolio}
                    ref={getContactsRef(2)}
                    key={'portfolio'}
                >
                    Portfolio
                </a>
            )
        }

        if (phone.length > 0) {
            code.push(
                <a
                    href={"tel:" + phone}
                    ref={getContactsRef(3)}
                    key={'phone'}
                >
                    {phone}
                </a>
            )
        }

        return (
            <>
                {(firstName.length > 0 || lastName.length > 0) && (
                    <div
                        className='paperName'
                        ref={PaperNameRef}
                    >
                        {firstName + ((firstName.length > 0 && lastName.length > 0) ? ' ' : '') + lastName}
                    </div>)
                }
                {(phone.length > 0 || email.length > 0 || linkedin.length > 0 || portfolio.length > 0) && (
                    <div
                        className='contacts'
                        ref={ContactsRef}
                    >
                        {code.reduce((prev, curr) => [prev, <span key={curr.key + "-separator"}> | </span>, curr])}
                    </div>
                )
                }
            </>
        )
    }

    return (
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
                    {contacts()}
                </div>
                <div className='bottomContainer' ref={BottomContainerRef}>
                    {formattedSection()}
                </div>
            </div>
        </div>
    );
}