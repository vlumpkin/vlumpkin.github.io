import React, { useState } from 'react';
import { resumeContent, resumeBasic } from './data.js'

export default function Resume() {
    const [collapsedSections, setCollapsedSections] = useState({});

    const toggleCollapse = (section) => {
        setCollapsedSections({
            ...collapsedSections,
            [section]: !collapsedSections[section]
        });
    };

    // Helper function to construct the header for each section
    const header = (title) => {
        return (
            <div className='header'>
                <p>{title.toUpperCase()}</p>
                <hr />
            </div>
        )
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
                <span className='button_arrow'>
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
                    transition: 'max-height 0.37s ease-in-out',
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

    const formattedTest = () => {
        return (
            <>
                {resumeContent.map((section, index) => (
                    section.details && section.details.details.length > 0 && (
                        <div className='section' key={index}>
                            {header(section.title.toUpperCase())}
                            <div className='details'>
                                {(section.details.type === 'normal') && // Sections with collapsible buttons
                                    section.details.details.map((item, itemIndex) => (
                                        <div className='item' key={itemIndex}>
                                            {itemHeader(item, index, itemIndex)}
                                            {item.details && (
                                                itemDetails(item, index, itemIndex)
                                            )}
                                        </div>
                                    ))}
                                {(section.details.type === 'techSkills') && // Technical skills section
                                    section.details.details.map((item, itemIndex) => (
                                        <div className="item" key={itemIndex}>
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
                                        <div className='skills'>
                                            <p>{section.details.details.join(" | ")}</p>
                                        </div>
                                    </>)
                                }
                            </div>
                        </div>
                    )
                ))}
            </>
        );
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
        <div className='paper'>
            <div className='paper-content'>
                <div className='paper-name'>{resumeBasic.name}</div>
                <div className='contacts'>
                    <a href={"mailto:" + resumeBasic.email}>{resumeBasic.email}</a>
                    <span> | </span>
                    <a href={resumeBasic.linkedin}>LinkedIn</a>
                    <span> | </span>
                    <a href={resumeBasic.portfolio}>Portfolio</a>
                </div>
                {formattedTest()}
            </div>
        </div>
    )
}