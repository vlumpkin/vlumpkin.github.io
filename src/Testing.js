import React from 'react';

export default function Testing({ formData, setFormData }) {

    return (
        <div className='resumeForm'>
            {resumeFormHeader("Personal Info")}
            {personalInfo(formData, setFormData)}
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