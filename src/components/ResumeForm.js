import React from 'react';

export default function ResumeForm({ formData, setFormData }) {

    return (
        <div className='resumeForm'>
            {resumeFormHeader("Personal Info")}
            {personalInfo(formData, setFormData)}
            {resumeFormHeader("Education")}
            {education(formData, setFormData)}
            {resumeFormHeader("Technical Skills")}
            {technicalSkills(formData, setFormData)}
            {resumeFormHeader("Personal Projects")}
            {projects(formData, setFormData)}
            {resumeFormHeader("Experience")}
            {experience(formData, setFormData)}
            {resumeFormHeader("Activities")}
            {activities(formData, setFormData)}
            {resumeFormHeader("Volunteerism")}
            {volunteerism(formData, setFormData)}
            {resumeFormHeader("Interpersonal Skills")}
            {interpersonalSkills(formData, setFormData)}
            {resumeFormHeader("JSON OBJECT")}
            {resumeInfoButton(setFormData)}
        </div>
    )
}

// Returns section headers
function resumeFormHeader(text) {
    return (
        <div className='resumeFormHeader'>
            <p>{text.toUpperCase()}</p>
            <hr />
        </div>
    )
}

// Returns the input elements for personal info
function personalInfo(formData, setFormData) {

    // Function to handle changes in the input fields
    function handleChange(field, value) {
        setFormData(prevState => ({
            ...prevState,
            personalInfo: {
                ...prevState.personalInfo,
                [field]: value
            }
        }));
    }

    return (
        <div className='resumeFormSectionDetails'>
            <div className='resumeFormSectionDetailsEntry'>
                <div className='resumeFormRow'>
                    <div>
                        <p>FIRST NAME</p>
                        <input
                            className='singleLine'
                            placeholder='Vernon'
                            onChange={e => handleChange("firstName", e.target.value)}
                            value={formData.personalInfo.firstName}
                        />
                    </div>
                    <div>
                        <p>LAST NAME</p>
                        <input
                            className='singleLine'
                            placeholder='Lumpkin'
                            onChange={e => handleChange("lastName", e.target.value)}
                            value={formData.personalInfo.lastName}
                        />
                    </div>
                </div>
                <div className='resumeFormRow'>
                    <div>
                        <p>EMAIL</p>
                        <input
                            className='singleLine'
                            placeholder='Email'
                            onChange={e => handleChange("email", e.target.value)}
                            value={formData.personalInfo.email}
                        />
                    </div>
                    <div>
                        <p>PHONE NUMBER</p>
                        <input
                            className='singleLine'
                            placeholder='Phone Number'
                            onChange={e => handleChange("phone", e.target.value)}
                            value={formData.personalInfo.phone}
                        />
                    </div>
                </div>
                <div className='resumeFormRow'>
                    <div>
                        <p>LINKEDIN URL</p>
                        <input
                            className='singleLine'
                            placeholder='linkedin.com/in/vernonlumpkin/'
                            onChange={e => handleChange("linkedin", e.target.value)}
                            value={formData.personalInfo.linkedin}
                        />
                    </div>
                    <div>
                        <p>PORTFOLIO/WEBSITE</p>
                        <input
                            className='singleLine'
                            placeholder='vlumpkin.github.io'
                            onChange={e => handleChange("portfolio", e.target.value)}
                            value={formData.personalInfo.portfolio}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

// Returns the input elements for education entries
function education(formData, setFormData) {

    // Function to handle adding a new education entry
    function addEntry() {
        const newEntries = [...formData.educationEntries, { school: '', degree: '', major: '', secondMajor: '', gpa: '', schoolDate1: '', schoolDate2: '', schoolDetails: '' }];
        setFormData(prevState => ({
            ...prevState,
            educationEntries: newEntries
        }));
    }

    // Function to handle removing an education entry
    function removeEntry(index) {
        const newEntries = formData.educationEntries.filter((_, i) => i !== index);
        setFormData(prevState => ({
            ...prevState,
            educationEntries: newEntries
        }));
    }

    // Function to handle changes in the input fields
    function handleChange(index, field, value) {
        const newEntries = [...formData.educationEntries];
        newEntries[index][field] = value;
        setFormData(prevState => ({
            ...prevState,
            educationEntries: newEntries
        }));
    }


    return (
        <div className='resumeFormSectionDetails'>
            {formData.educationEntries.map((entry, index) => (
                <div key={index} className='resumeFormSectionDetailsEntry'>
                    <div className='resumeFormSectionDetailsEntryHeader'>
                        <hr />
                        <p>{'Entry ' + (index + 1)}</p>
                        <hr />
                    </div>
                    <div className='resumeFormRow'>
                        <div>
                            <p>SCHOOL</p>
                            <input
                                className='singleLine'
                                placeholder='School'
                                value={entry.school}
                                onChange={e => handleChange(index, 'school', e.target.value)}
                            />
                        </div>
                        <div>
                            <p>DEGREE ABBREVIATION (BA, BS, MS, etc.)</p>
                            <input
                                className='singleLine'
                                placeholder='BA/BS/MA/etc.'
                                value={entry.degree}
                                onChange={e => handleChange(index, 'degree', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='resumeFormRow'>
                        <div>
                            <p>MAJOR</p>
                            <input
                                className='singleLine'
                                placeholder='Major'
                                value={entry.major}
                                onChange={e => handleChange(index, 'major', e.target.value)}
                            />
                        </div>
                        <div>
                            <p>SECOND MAJOR/MINOR</p>
                            <input
                                className='singleLine'
                                placeholder='Second major'
                                value={entry.secondMajor}
                                onChange={e => handleChange(index, 'secondMajor', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='resumeFormRow'>
                        <div>
                            <p>GPA</p>
                            <input
                                className='singleLine'
                                placeholder='3.87/4.0'
                                value={entry.gpa}
                                onChange={e => handleChange(index, 'gpa', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='resumeFormRow'>
                        <div>
                            <p>DATE PERIOD 1</p>
                            <input
                                className='singleLine'
                                placeholder='April 1992'
                                value={entry.date1}
                                onChange={e => handleChange(index, 'date1', e.target.value)}
                            />
                        </div>
                        <div>
                            <p>DATE PERIOD 2</p>
                            <input
                                className='singleLine'
                                placeholder='Present'
                                value={entry.date2}
                                onChange={e => handleChange(index, 'date2', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='resumeFormDetails'>
                        <p>
                            DETAILS, press enter for a new line/bullet point, <b> Bold</b> text between asterisks (*), <u>Underlined</u> text between quotes (")
                        </p>
                        <textarea
                            className='details'
                            placeholder='*Activities:* Student body president, soccer team'
                            value={entry.details}
                            onChange={e => handleChange(index, 'details', e.target.value)}
                        />
                    </div>
                    <div className='resumeFormEntryOptions'>
                        <button
                            onClick={() => removeEntry(index)}
                            className='resumeFormRemoveButton'
                        >Remove Education</button>
                    </div>
                </div>
            ))}
            <button
                onClick={addEntry}
                className='resumeFormAddButton'
            >Add Education</button>
        </div>
    );
}

// Returns the input element for technical skills
function technicalSkills(formData, setFormData) {

    // Function to handle changes in the input field
    function handleChange(value) {
        setFormData(prevState => ({
            ...prevState,
            technicalSkills: value
        }))
    }

    return (
        <div className='resumeFormSectionDetails'>
            <div className='resumeFormSectionDetailsEntry'>
                <div className='resumeFormDetails'>
                    <p>
                        DETAILS, press enter for a new line/bullet point, <b> Bold</b> text between asterisks (*), <u>Underlined</u> text between quotes (")
                    </p>
                    <textarea
                        className='details'
                        placeholder='*Software:* Canva, Adobe Illustrator, Photoshop
*Skills:* Gradients, Color Theory, Depth Design'
                        value={formData.technicalSkills}
                        onChange={e => handleChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

// Returns the input elements for project entries
function projects(formData, setFormData) {

    // Funciton to handle adding a new project entry
    function addEntry() {
        const newEntries = [...formData.projectEntries, { title: '', organization: '', date1: '', details: '', code: '' }];
        setFormData(prevState => ({
            ...prevState,
            projectEntries: newEntries
        }))
    }

    // Funciton to handle removing an project entry
    function removeEntry(index) {
        const newEntries = formData.projectEntries.filter((_, i) => i !== index);
        setFormData(prevState => ({
            ...prevState,
            projectEntries: newEntries
        }));
    }

    // Function to handle changes in the input fields
    function handleChange(index, field, value) {
        const newEntries = [...formData.projectEntries];
        newEntries[index][field] = value;
        setFormData(prevState => ({
            ...prevState,
            projectEntries: newEntries
        }));
    }

    return (
        <div className='resumeFormSectionDetails'>
            {formData.projectEntries.map((entry, index) => (
                <div key={index} className='resumeFormSectionDetailsEntry'>
                    <div className='resumeFormSectionDetailsEntryHeader'>
                        <hr />
                        <p>{'Entry ' + (index + 1)}</p>
                        <hr />
                    </div>
                    <div className='resumeFormRow'>
                        <div>
                            <p>PROJECT TITLE</p>
                            <input
                                className='singleLine'
                                placeholder='Project title'
                                value={entry.title}
                                onChange={e => handleChange(index, 'title', e.target.value)}
                            />
                        </div>
                        <div>
                            <p>Organization (or put "personal")</p>
                            <input
                                className='singleLine'
                                placeholder='Company Incorporated'
                                value={entry.organization}
                                onChange={e => handleChange(index, 'organization', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='resumeFormRow'>
                        <div>
                            <p>DATE COMPLETED</p>
                            <input
                                className='singleLine'
                                placeholder='June 2023'
                                value={entry.date1}
                                onChange={e => handleChange(index, 'date1', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='resumeFormDetails'>
                        <p>
                            DETAILS, press enter for a new line/bullet point, <b> Bold</b> text between asterisks (*), <u>Underlined</u> text between quotes (")
                        </p>
                        <textarea
                            className='details'
                            placeholder='Painted the Mona Lisa from scratch using clay I gather from the Mariana Trench
Achieved Nirvana'
                            value={entry.details}
                            onChange={e => handleChange(index, 'details', e.target.value)}
                        />
                    </div>
                    <div className='resumeFormDetails'>
                        <p>CODE (paste in any code you'd like to be featured below the details)</p>
                        <textarea
                            className='details'
                            placeholder="<div  style='margin-top: 0.52vw; margin-bottom: 0.52vw; width: 100%; display: flex; justify-content: center; overflow: visible;'>
<div style='width: fit-content; height: auto; text-align: center; border-color: #000;'>
<iframe 
src='https://app.powerbi.com/view?r=eyJrIjoiMDMxNzA5MGUtZWNhYy00YWQxLThjMTktN2M5ZWNjYWJhZmUzIiwidCI6IjA5YzU1ZWU4LTAxZWQtNGE0My1iOWVlLTFmZWMzMDAxN2RlNiJ9'
allowFullScreen='true' style='border: none; width: 54.69vw; height: 29.18vw; align-items: center; border-color: #000; border-radius: 0.78vw; box-shadow: 0 0.1vw 0.26vw 0.21vw rgba(0, 0, 0, 0.3);'></iframe>
</div>
</div>"
                            value={entry.code}
                            onChange={e => handleChange(index, 'code', e.target.value)}
                        />
                    </div>
                    <div className='resumeFormEntryOptions'>
                        <button
                            onClick={() => removeEntry(index)}
                            className='resumeFormRemoveButton'
                        >Remove Project</button>
                    </div>
                </div>
            ))}
            <button
                onClick={addEntry}
                className='resumeFormAddButton'
            >Add Project</button>
        </div>
    )
}

// Returns the input elements for experience entries
function experience(formData, setFormData) {

    // Funciton to handle adding a new experience entry
    function addEntry() {
        const newEntries = [...formData.experienceEntries, { organization: '', position: '', date1: '', date2: '', details: '', code: '' }];
        setFormData(prevState => ({
            ...prevState,
            experienceEntries: newEntries
        }))
    }

    // Funciton to handle removing a experience entry
    function removeEntry(index) {
        const newEntries = formData.experienceEntries.filter((_, i) => i !== index);
        setFormData(prevState => ({
            ...prevState,
            experienceEntries: newEntries
        }));
    }

    // Funciton to handle changes in the input fields
    function handleChange(index, field, value) {
        const newEntries = [...formData.experienceEntries];
        newEntries[index][field] = value;
        setFormData(prevState => ({
            ...prevState,
            experienceEntries: newEntries
        }));
    }

    return (
        <div className='resumeFormSectionDetails'>
            {formData.experienceEntries.map((entry, index) => (
                <div key={index} className='resumeFormSectionDetailsEntry'>
                    <div className='resumeFormSectionDetailsEntryHeader'>
                        <hr />
                        <p>{'Entry ' + (index + 1)}</p>
                        <hr />
                    </div>
                    <div className='resumeFormRow'>
                        <div>
                            <p>EMPLOYER/ORGANIZATION</p>
                            <input
                                className='singleLine'
                                placeholder='Company Incorporated'
                                value={entry.organization}
                                onChange={e => handleChange(index, 'organization', e.target.value)}
                            />
                        </div>
                        <div>
                            <p>POSITION</p>
                            <input
                                className='singleLine'
                                placeholder='Boss man'
                                value={entry.position}
                                onChange={e => handleChange(index, 'position', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='resumeFormRow'>
                        <div>
                            <p>DATE PERIOD 1</p>
                            <input
                                className='singleLine'
                                placeholder='April 1992'
                                value={entry.date1}
                                onChange={e => handleChange(index, 'date1', e.target.value)}
                            />
                        </div>
                        <div>
                            <p>DATE PERIOD 2</p>
                            <input
                                className='singleLine'
                                placeholder='Present'
                                value={entry.date2}
                                onChange={e => handleChange(index, 'date2', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='resumeFormDetails'>
                        <p>
                            DETAILS, press enter for a new line/bullet point, <b> Bold</b> text between asterisks (*), <u>Underlined</u> text between quotes (")
                        </p>
                        <textarea
                            className='details'
                            placeholder='Did a thing for a thing with a thing that achieved a thing
Helped pipeline more money into the company&apos;s bank account'
                            value={entry.details}
                            onChange={e => handleChange(index, 'details', e.target.value)}
                        />
                    </div>
                    <div className='resumeFormDetails'>
                        <p>CODE (paste in any code you'd like to be featured below the details)</p>
                        <textarea
                            className='details'
                            placeholder="<div  style='margin-top: 0.52vw; margin-bottom: 0.52vw; width: 100%; display: flex; justify-content: center; overflow: visible;'>
<div style='width: fit-content; height: auto; text-align: center; border-color: #000;'>
<iframe 
src='https://app.powerbi.com/view?r=eyJrIjoiMDMxNzA5MGUtZWNhYy00YWQxLThjMTktN2M5ZWNjYWJhZmUzIiwidCI6IjA5YzU1ZWU4LTAxZWQtNGE0My1iOWVlLTFmZWMzMDAxN2RlNiJ9'
allowFullScreen='true' style='border: none; width: 54.69vw; height: 29.18vw; align-items: center; border-color: #000; border-radius: 0.78vw; box-shadow: 0 0.1vw 0.26vw 0.21vw rgba(0, 0, 0, 0.3);'></iframe>
</div>
</div>"
                            value={entry.code}
                            onChange={e => handleChange(index, 'code', e.target.value)}
                        />
                    </div>
                    <div className='resumeFormEntryOptions'>
                        <button
                            onClick={() => removeEntry(index)}
                            className='resumeFormRemoveButton'
                        >Remove Experience</button>
                    </div>
                </div>
            ))}
            <button
                onClick={addEntry}
                className='resumeFormAddButton'
            >Add Experience</button>
        </div>
    )
}

// Returns the input elements for activity entries
function activities(formData, setFormData) {
    
    // Funciton to handle adding a new activity entry
    function addEntry() {
        const newEntries = [...formData.activityEntries, { organization: '', position: '', date1: '', date2: '', details: '', code: '' }];
        setFormData(prevState => ({
            ...prevState,
            activityEntries: newEntries
        }))
    }

    // Funciton to handle removing an activity entry
    function removeEntry(index) {
        const newEntries = formData.activityEntries.filter((_, i) => i !== index);
        setFormData(prevState => ({
            ...prevState,
            activityEntries: newEntries
        }));
    }

    // Funciton to handle changes in the input fields
    function handleChange(index, field, value) {
        const newEntries = [...formData.activityEntries];
        newEntries[index][field] = value;
        setFormData(prevState => ({
            ...prevState,
            activityEntries: newEntries
        }));
    }

    return (
        <div className='resumeFormSectionDetails'>
            {formData.activityEntries.map((entry, index) => (
                <div key={index} className='resumeFormSectionDetailsEntry'>
                    <div className='resumeFormSectionDetailsEntryHeader'>
                        <hr />
                        <p>{'Entry ' + (index + 1)}</p>
                        <hr />
                    </div>
                    <div className='resumeFormRow'>
                        <div>
                            <p>ORGANIZATION</p>
                            <input
                                className='singleLine'
                                placeholder='Company Incorporated'
                                value={entry.organization}
                                onChange={e => handleChange(index, 'organization', e.target.value)}
                            />
                        </div>
                        <div>
                            <p>POSITION</p>
                            <input
                                className='singleLine'
                                placeholder='Boss man'
                                value={entry.position}
                                onChange={e => handleChange(index, 'position', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='resumeFormRow'>
                        <div>
                            <p>DATE PERIOD 1</p>
                            <input
                                className='singleLine'
                                placeholder='April 1992'
                                value={entry.date1}
                                onChange={e => handleChange(index, 'date1', e.target.value)}
                            />
                        </div>
                        <div>
                            <p>DATE PERIOD 2</p>
                            <input
                                className='singleLine'
                                placeholder='Present'
                                value={entry.date2}
                                onChange={e => handleChange(index, 'date2', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='resumeFormDetails'>
                        <p>
                            DETAILS, press enter for a new line/bullet point, <b> Bold</b> text between asterisks (*), <u>Underlined</u> text between quotes (")
                        </p>
                        <textarea
                            className='details'
                            placeholder='Did a thing for a thing with a thing that achieved a thing
Helped pipeline more money into the company&apos;s bank account'
                            value={entry.details}
                            onChange={e => handleChange(index, 'details', e.target.value)}
                        />
                    </div>
                    <div className='resumeFormDetails'>
                        <p>CODE (paste in any code you'd like to be featured below the details)</p>
                        <textarea
                            className='details'
                            placeholder="<div  style='margin-top: 0.52vw; margin-bottom: 0.52vw; width: 100%; display: flex; justify-content: center; overflow: visible;'>
<div style='width: fit-content; height: auto; text-align: center; border-color: #000;'>
<iframe 
src='https://app.powerbi.com/view?r=eyJrIjoiMDMxNzA5MGUtZWNhYy00YWQxLThjMTktN2M5ZWNjYWJhZmUzIiwidCI6IjA5YzU1ZWU4LTAxZWQtNGE0My1iOWVlLTFmZWMzMDAxN2RlNiJ9'
allowFullScreen='true' style='border: none; width: 54.69vw; height: 29.18vw; align-items: center; border-color: #000; border-radius: 0.78vw; box-shadow: 0 0.1vw 0.26vw 0.21vw rgba(0, 0, 0, 0.3);'></iframe>
</div>
</div>"
                            value={entry.code}
                            onChange={e => handleChange(index, 'code', e.target.value)}
                        />
                    </div>
                    <div className='resumeFormEntryOptions'>
                        <button
                            onClick={() => removeEntry(index)}
                            className='resumeFormRemoveButton'
                        >Remove Activity</button>
                    </div>
                </div>
            ))}
            <button
                onClick={addEntry}
                className='resumeFormAddButton'
            >Add Activity</button>
        </div>
    )
}

// Returns the input elements for volunteer entries
function volunteerism(formData, setFormData) {
    // Funciton to handle adding a new volunteer entry
    function addEntry() {
        const newEntries = [...formData.volunteerEntries, { organization: '', position: '', date1: '', date2: '', details: '', code: '' }];
        setFormData(prevState => ({
            ...prevState,
            volunteerEntries: newEntries
        }))
    }

    // Funciton to handle removing a volunteer entry
    function removeEntry(index) {
        const newEntries = formData.volunteerEntries.filter((_, i) => i !== index);
        setFormData(prevState => ({
            ...prevState,
            volunteerEntries: newEntries
        }));
    }

    // Funciton to handle changes in the input fields
    function handleChange(index, field, value) {
        const newEntries = [...formData.volunteerEntries];
        newEntries[index][field] = value;
        setFormData(prevState => ({
            ...prevState,
            volunteerEntries: newEntries
        }));
    }

    return (
        <div className='resumeFormSectionDetails'>
            {formData.volunteerEntries.map((entry, index) => (
                <div key={index} className='resumeFormSectionDetailsEntry'>
                    <div className='resumeFormSectionDetailsEntryHeader'>
                        <hr />
                        <p>{'Entry ' + (index + 1)}</p>
                        <hr />
                    </div>
                    <div className='resumeFormRow'>
                        <div>
                            <p>ORGANIZATION</p>
                            <input
                                className='singleLine'
                                placeholder='Company Incorporated'
                                value={entry.organization}
                                onChange={e => handleChange(index, 'organization', e.target.value)}
                            />
                        </div>
                        <div>
                            <p>POSITION</p>
                            <input
                                className='singleLine'
                                placeholder='Boss man'
                                value={entry.position}
                                onChange={e => handleChange(index, 'position', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='resumeFormRow'>
                        <div>
                            <p>DATE PERIOD 1</p>
                            <input
                                className='singleLine'
                                placeholder='April 1992'
                                value={entry.date1}
                                onChange={e => handleChange(index, 'date1', e.target.value)}
                            />
                        </div>
                        <div>
                            <p>DATE PERIOD 2</p>
                            <input
                                className='singleLine'
                                placeholder='Present'
                                value={entry.date2}
                                onChange={e => handleChange(index, 'date2', e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='resumeFormDetails'>
                        <p>
                            DETAILS, press enter for a new line/bullet point, <b> Bold</b> text between asterisks (*), <u>Underlined</u> text between quotes (")
                        </p>
                        <textarea
                            className='details'
                            placeholder='Did a thing for a thing with a thing that achieved a thing
Didn&apos;t get paid haha'
                            value={entry.details}
                            onChange={e => handleChange(index, 'details', e.target.value)}
                        />
                    </div>
                    <div className='resumeFormDetails'>
                        <p>CODE (paste in any code you'd like to be featured below the details)</p>
                        <textarea
                            className='details'
                            placeholder="<div  style='margin-top: 0.52vw; margin-bottom: 0.52vw; width: 100%; display: flex; justify-content: center; overflow: visible;'>
<div style='width: fit-content; height: auto; text-align: center; border-color: #000;'>
<iframe 
src='https://app.powerbi.com/view?r=eyJrIjoiMDMxNzA5MGUtZWNhYy00YWQxLThjMTktN2M5ZWNjYWJhZmUzIiwidCI6IjA5YzU1ZWU4LTAxZWQtNGE0My1iOWVlLTFmZWMzMDAxN2RlNiJ9'
allowFullScreen='true' style='border: none; width: 54.69vw; height: 29.18vw; align-items: center; border-color: #000; border-radius: 0.78vw; box-shadow: 0 0.1vw 0.26vw 0.21vw rgba(0, 0, 0, 0.3);'></iframe>
</div>
</div>"
                            value={entry.code}
                            onChange={e => handleChange(index, 'code', e.target.value)}
                        />
                    </div>
                    <div className='resumeFormEntryOptions'>
                        <button
                            onClick={() => removeEntry(index)}
                            className='resumeFormRemoveButton'
                        >Remove Activity</button>
                    </div>
                </div>
            ))}
            <button
                onClick={addEntry}
                className='resumeFormAddButton'
            >Add Activity</button>
        </div>
    )
}

// Returns the input element for interpersonal skills
function interpersonalSkills(formData, setFormData) {
    // Funciton to handle changes in the field
    function handleChange(value) {
        setFormData(prevState => ({
            ...prevState,
            interpersonalSkills: value
        }))
    }

    return (
        <div className='resumeFormSectionDetails'>
            <div className='resumeFormSectionDetailsEntry'>
                <div className='resumeFormDetails'>
                    <p>
                        DETAILS, press enter for a new line/bullet point, <b> Bold</b> text between asterisks (*), <u>Underlined</u> text between quotes (")
                    </p>
                    <textarea
                        className='details'
                        placeholder='Communication, Problem-Solving, Talking, Talking-Nonsense, Rambling, Distracting-From-Having-No-Interpersonal-Skills'
                        value={formData.interpersonalSkills}
                        onChange={e => handleChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}

// Returns the input element for resume JSON Objects
function resumeInfoButton(setFormData) {
    // Funciton to handle changes in the input field
    function handleChange(value) {
        if (value) {
            setFormData(JSON.parse(value));
        }
    }

    return (

        <div className='resumeFormSectionDetails'>
            <div className='resumeFormSectionDetailsEntry'>
                <div className='resumeFormDetails'>
                    <p>
                        If you have built and saved a previous resume's JSON, you can paste it here!
                    </p>
                    <textarea
                        className='details'
                        placeholder='JSON Object'
                        onChange={e => handleChange(e.target.value)}
                    />
                </div>
            </div>
        </div>

    )
}