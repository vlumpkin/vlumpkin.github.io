import React from 'react';

export const resumeContent = [
    // Education
    {
        title: "Education",
        collapse: "education",
        details: {
            type: "normal",
            details: [
                {
                    title1: "University of Washington",
                    title2: "BS Computer Science",
                    date1: "2023",
                    date2: "2027",
                    details: [
                        {
                            title: "Direct Admission: ",
                            details: "Paul G. Allen School of Computer Science, Dean's List"
                        },
                        {
                            title: "Activities: ",
                            details: "Student Advisory Council (CSE), Club Soccer, Soccer Club, Fraternity: Pi Kappa Phi, Dean's List"
                        }
                    ]
                },
                {
                    title1: "Lake Washington High School",
                    date1: "2019",
                    date2: "2023",
                    details: [
                        {
                            details: "ASB VP, Junior VP, Key Club President, DECA VP, NHS, Varsity Soccer Captain, Varsity Tennis"
                        },
                        {
                            details: "Coursework: 11 AP's, 4 dual-enrollment, 5 honors"
                        }
                    ]
                }
            ]
        }
    },
    // Technical Skills
    {
        title: "Technical Skills",
        collapse: "technicalSkills",
        details: {
            type: "techSkills",
            details: [
                {
                    title: "Learning",
                    skills: [
                        "Java",
                        "JavaScript",
                        "TypeScript",
                        "C++",
                        "Python",
                        "HTML/CSS",
                        "Linux",
                    ]
                },
                {
                    title: "Development Tools",
                    skills: [
                        "Git",
                        "GitHub",
                        "GitLab",
                        "VSCode",
                        "jGrasp",
                        "Bash",
                        "PowerShell",
                        "PowerBI",
                    ]
                }
            ]
        }

    },
    // Personal Projects
    {
        title: "Personal Projects",
        collapse: "personalProjects",
        details: {
            type: "normal",
            details: [
                {
                    title1: "Bias Buster News",
                    title2: "Dub Hacks Hackathon",
                    date1: "October 2023",
                    details: [
                        "Pipelined current news from 50+ politically diverse news sources using 20 different keywords to display a range of articles offering politically opposite perspectives to the user input",
                    ],
                    tech: [
                        "Java",
                        "JavaScript",
                        "HTML/CSS",
                        "News API",
                    ],
                },
                {
                    title1: "College Admission Dashboard",
                    title2: "Personal Project",
                    date1: "December 2022",
                    details: [
                        "Built an interactive dashboard that centralized admission data from colleges’ Common Data Sets (CDS)",
                        "The dataset visualizes 200 measures for the top 60 schools during the 2020-2021 school year for a total of 12,000 observations",
                        "Python scraper used to extract the data from 60 pdfs which was then cleaned and formatted",
                    ],
                    tech: [
                        "Power BI",
                        "Excel",
                        "some Python",
                        "minimal DAX",
                    ],
                    extra: (
                        <>
                            <div className="extended-content-container">
                                <div className="extended-content">
                                    <iframe className="dashboard"
                                        src="https://app.powerbi.com/view?r=eyJrIjoiMDMxNzA5MGUtZWNhYy00YWQxLThjMTktN2M5ZWNjYWJhZmUzIiwidCI6IjA5YzU1ZWU4LTAxZWQtNGE0My1iOWVlLTFmZWMzMDAxN2RlNiJ9"
                                        allowFullScreen={true}></iframe>
                                </div>
                            </div>
                        </>
                    )
                },
                {
                    title1: "Kirkland Sustainability Master Plan Dashboard",
                    title2: "City of Kirkland",
                    date1: "September 2022",
                    details: [
                        "Visualized a PDF table into a navigable dashboard, increasing transparency around funding and resource allocation for stakeholders, taxpayers, community members, and interested parties",
                    ],
                    tech: [
                        "Power BI",
                        "Excel",
                    ],
                    extra: (
                        <>
                            <li><p style={{ color: "#199b0f", fontWeight: "bold" }}>The entire dashboard is interactive,
                                even the graphs, try selecting and unselecting different categories, hold ctrl for multiple!</p></li>
                            <div className="extended-content-container">
                                <div className="extended-content">
                                    <iframe className="dashboard"
                                        src="https://app.powerbi.com/view?r=eyJrIjoiYjk3YzYxMGQtYmEyNC00YjRkLWE0OGEtMThiYTBlZDIwZGRlIiwidCI6IjA5YzU1ZWU4LTAxZWQtNGE0My1iOWVlLTFmZWMzMDAxN2RlNiJ9&pageName=ReportSection982a249f7c63ee9a307b"
                                        allowFullScreen={true}></iframe>
                                </div>
                            </div>
                        </>
                    )
                },
            ]
        }
    },
    // Experience
    {
        title: "Experience",
        collapse: "experience",
        details: {
            type: "normal",
            details: [
                {
                    title1: "Ignite Robotics",
                    title2: "Independent Contractor, ex. Managing Director",
                    date1: "October 2021",
                    date2: "Present",
                    details: [
                        "Managed Financials ($450k in revenue), budget forecasts, and fundraising (secured $30k in funding)",
                        "Partnered with Microsoft to host the first PNW Vex Signature event, bringing together 150 teams, 300 volunteers, and 2,000 attendees from around North America to compete",
                        "Partnered with Google to host GirlPowered and co-sponsored financial scholarships with CIE",
                    ],
                    extra: (
                        <>
                            <div className="links">
                                <div className="thumbnail">
                                    <a target="_blank" href="https://www.youtube.com/watch?v=ivU9kgOav4w">
                                        <img src="https://i.ytimg.com/vi/ivU9kgOav4w/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtFSJ4TO0OASO6rYrQC0YafYiW-w" alt="Ignite the Northwest Signature Event" />
                                    </a>
                                    <p style={{marginTop: "41px"}}>Ignite the Northwest Signature Event</p>
                                </div>
                                <div className="thumbnail">
                                    <a target="_blank" href="https://igniterobotics.org">
                                        <img src="https://images.squarespace-cdn.com/content/v1/629451c50408713849a8c3df/4e7f4a8a-539b-40e1-bf0d-f4bda5611371/8Q7A8721.jpg?format=2500w" alt="Ignite Robotics" />
                                    </a>
                                    <p style={{marginTop: "48px"}}>Ignite Robotics</p>
                                </div>
                            </div>
                        </>
                    )
                },
                {
                    title1: "MathGPT",
                    title2: "Lead Data Analyst",
                    date1: "May 2024",
                    date2: "July 2024",
                    details: [
                        "Employed 5 million event observations to discern factors that impact conversion rate and other valuable insights",
                        "Implemented UX decisions for 350k users with TypeScript and A/B testing, improved conversion rate by 43%",
                    ],
                    extra: (
                        <>
                            <div className="links">
                                <div className="thumbnail">
                                    <a target="_blank" href="https://math-gpt.org">
                                        <img src="https://math-gpt.org/newlogo.png" alt="MathGPT" style={{ width: "170px", height: "80px" }} />
                                    </a>
                                    <p style={{ marginTop: "35px" }}>MathGPT</p>
                                </div>
                            </div>
                        </>
                    )
                },
                {
                    title1: "City of Kirkland",
                    title2: "Climate Justice Intern",
                    date1: "April 2022",
                    date2: "April 2023",
                    details: [
                        "Collaborated with councilmembers to further the impact of the Sustainability Master Plan (SMP)",
                        "Built out a Power BI dashboard to visualize the SMP",
                    ]
                },
            ]
        }
    },
    // Activities
    {
        title: "Activities",
        collapse: "activities",
        details: {
            type: "normal",
            details: [
                {
                    title1: "UW Computer Science Student Advisory Council",
                    title2: "Director of Community Engagement",
                    date1: "October 2023",
                    date2: "Present",
                    details: [
                        "Collaborate with faculty to review and develop curriculum and class policies to ensure an effective and equitable learning environment",
                        "Represent student voice by hosting town halls, connecting with students, and managing online resources",
                    ]
                }
            ]
        }
    },
    // Interpersonal Skills
    {
        title: "Interpersonal Skills",
        collapse: "interpersonalSkills",
        details: {
            type: "interSkills",
            details: [
                "Learning",
                "Leadership",
                "Creativity",
                "Public Speaking",
                "Teamwork",
                "Communication",
                "Collaboration",
            ]
        }
    }
]

export const resumeBasic = {
    name: 'VERNON LUMPKIN', 
    email: 'vlumpkin@uw.edu', 
    linkedin: 'https://linkedin.com/in/vernonlumpkin/',
    portfolio: 'https://vlumpkin.github.io', 
}