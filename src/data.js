export const vResumeContent = {
    personalInfo: {
        firstName: 'Vernon',
        lastName: 'Lumpkin',
        email: 'vernonlumpkin@outlook.com',
        linkedin: 'https://linkedin.com/in/vernonlumpkin/',
        portfolio: 'https://vlumpkin.github.io',
        phone: '425.900.8344',
    },
    educationEntries: [
        {
            school: "University of Washington",
            degree: "BS",
            major: 'Computer Science',
            titleBold: true,
            secondMajor: '',
            gpa: '',
            date1: "2023",
            date2: "2027",
            details:
                "*Direct Admission:* Paul G. Allen School of Computer Science, Dean's List \n" +
                "*Activities:* Student Advisory Council (CSE) Chair, Club Soccer Co-Captain, Soccer Club, Fraternity: Pi Kappa Phi, Dean's List\n"
        },
        {
            school: "Lake Washington High School",
            date1: "2019",
            date2: "2023",
            details:
                "ASB VP, Junior VP, Key Club President, DECA VP, NHS, Varsity Soccer Captain, Varsity Tennis\n" +
                "Coursework: 11 AP's, 4 dual-enrollment, 5 honors\n"
        }
    ],
    technicalSkills:
        "*Learning:* React, Java, JavaScript, TypeScript, C++, Python, HTML/CSS, Linux\n" +
        "*Development Tools:* Git, GitHub, GitLab, VSCode, jGrasp, Bash, PowerShell, PowerBI\n",
    projectEntries: [
        {
            title: "STF Grant Dashboard", 
            organization: "University of Washington", 
            titleBold: true,
            date1: "April 2025", 
            date2: "June 2025",
            details:
                "Grant dashboard assembled for UW's Student Technology Fee (STF) \n" +
                "Fetch data through submittable API \n" +
                "Optimized performance via dynamic parsing: questions, forms, labels, submissions, reviews \n" +
                "Leverages pre-built *XLSM file* to generate final report with *injected dynamic VBA* \n" +
                "\"Technologies Used:\" Github, JavaScript, Python, Submittable API, VBA \n"
            ,
        },
        {
            title: "Ignite Robotics Admin Dashboard",
            organization: "Ignite Robotics",
            titleBold: true,
            date1: "In-Progress",
            details:
                "Integrating all of Ignite’s software operations into a secure admin platform\n" +
                "Implemented features include roster management, success tracking for the *250 students*, payment processing for *$550k+* in revenue, org messaging platform, automated parts ordering system\n" +
                "\"Technologies Used:\" Github, React, JavaScript, HTML/CSS, DocuSign API, Stripe API\n"
            ,
        },
        {
            title: "Resume Builder",
            organization: "Personal Project",
            date1: "September 2024",
            details:
                "Developed interactive no-code resume generator based on my own digital resume\n" +
                "Dynamically generate elements and element references to replicate transitions and structure\n" +
                'Click the *Resume Builder* tab to try it out!\n' + 
                "\"Technologies Used:\" Github, React, JavaScript, HTML/CSS\n"
            ,
            
        },
        {
            title: "Bias Buster News",
            organization: "Dub Hacks Hackathon",
            date1: "October 2023",
            details:
                "Pipelined current news from 50+ politically diverse news sources using 20 different keywords to display a range of articles offering politically opposite perspectives to the user input \n" +
                "\"Technologies Used:\" Java, JavaScript, HTML/CSS, News API\n"
            ,
        },
        {
            title: "College Admission Dashboard",
            organization: "Personal Project",
            titleBold: true,
            date1: "December 2022",
            details:
                "Built an interactive dashboard that centralized admission data from colleges’ Common Data Sets (CDS)\n" +
                "The dataset visualizes 200 measures for the top 60 schools during the 2020-2021 school year for a total of 12,000 observations\n" +
                "Python scraper used to extract the data from 60 pdfs which was then cleaned and formatted\n" +
                "*40,000 views* on the dashboard over a period of 4 months\n" +
                "\"Technologies Used:\" Power BI, Excel, some Python, minimal DAX\n"
            ,
            code:
                "<div  style='margin-top: 0.52vw; margin-bottom: 0.52vw; width: 100%; display: flex; justify-content: center; overflow: visible;'>" +
                "<div style='width: fit-content; height: auto; text-align: center; border-color: #000;'>" +
                "<iframe " +
                "src='https://app.powerbi.com/view?r=eyJrIjoiMDMxNzA5MGUtZWNhYy00YWQxLThjMTktN2M5ZWNjYWJhZmUzIiwidCI6IjA5YzU1ZWU4LTAxZWQtNGE0My1iOWVlLTFmZWMzMDAxN2RlNiJ9'" +
                "allowFullScreen='true' style='border: none; width: 77rem; height: 41.1rem; align-items: center; border-color: #000; border-radius: 0.78vw; box-shadow: 0 0.1vw 0.26vw 0.21vw rgba(0, 0, 0, 0.3);'></iframe>" +
                "</div>" +
                "</div>"

        },
        {
            title: "Kirkland Sustainability Master Plan Dashboard",
            organization: "City of Kirkland",
            titleBold: true,
            date1: "September 2022",
            details:
                "Visualized a PDF table into a navigable dashboard, increasing transparency around funding and resource allocation for stakeholders, taxpayers, community members, and interested parties\n" +
                "\"Technologies Used:\" Power BI, Excel\n"
            ,
            code: (
                "<p style='color: #199b0f; font-weight: bold; line-height: 1.09vw; width: 100%; display: flex; justify-content: center;'>The entire dashboard is interactive," +
                "even the graphs, try selecting and unselecting different categories, hold ctrl for multiple!</p>" +
                "<div style='margin-top: 0.52vw; margin-bottom: 0.52vw; width: 100%; display: flex; justify-content: center; overflow: visible;'>" +
                "<div style='width: fit-content; height: auto; text-align: center; border-color: #000;'>" +
                "<iframe " +
                "src='https://app.powerbi.com/view?r=eyJrIjoiYjk3YzYxMGQtYmEyNC00YjRkLWE0OGEtMThiYTBlZDIwZGRlIiwidCI6IjA5YzU1ZWU4LTAxZWQtNGE0My1iOWVlLTFmZWMzMDAxN2RlNiJ9&pageName=ReportSection982a249f7c63ee9a307b'" +
                "allowFullScreen='true' style='border: none; width: 77rem; height: 41.1rem; align-items: center; border-color: #000; border-radius: 0.78vw; box-shadow: 0 0.1vw 0.26vw 0.21vw rgba(0, 0, 0, 0.3);'></iframe>" +
                "</div>" +
                "</div>"
            )
        },
    ],
    experienceEntries: [
        {
            organization: "Amazon",
            position: "Jr. Software Developer",
            titleBold: true,
            date1: "June 2025",
            date2: "Present",
            details: "Selection Gap Monitoring (OASIS) \n",
        },
        {
            organization: "Ignite Robotics",
            position: "Independent Contractor, ex. Managing Director",
            titleBold: true,
            date1: "October 2021",
            date2: "Present",
            details:
                "Managed Financials *($550k in revenue)*, budget forecasts, and fundraising *(secured $50k in funding)*\n" +
                "Partnered with *Microsoft* to host the first PNW Vex Signature event, bringing together 150 teams, 300 volunteers, and 2,000 attendees from around North America to compete\n" +
                "Partnered with *Google* to host GirlPowered and co-sponsored financial scholarships with CIE\n"
            ,
            code:
                "<div style='margin-top: 0.26vw; display: flex; flex-direction: row;'>" +
                "<div style='display: flex; flex-direction: row; padding-right: 20px;'>" +
                "<a target='_blank' href='https://www.youtube.com/watch?v=ivU9kgOav4w' rel='noopener noreferrer'>" +
                "<img src='https://i.ytimg.com/vi/ivU9kgOav4w/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDtFSJ4TO0OASO6rYrQC0YafYiW-w' alt='Ignite the Northwest Signature Event' style='width: 180px; height: 110px; border-radius: 0.52vw; border-color: #9a1010; border-width: 0.16vw; box-shadow: 0px 0.1vw 0.26vw 4px rgba(0, 0, 0, 0.3); margin-top: 0.26vw; margin-bottom: 0.52vw;' />" +
                "</a>" +
                "<p style='margin-top: 41px; font-family: Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif; font-weight: bold; color: #000; font-size: 1em; width: 160px; margin-left: 0.52vw; text-wrap: pretty;'>Ignite the Northwest Signature Event</p>" +
                "</div>" +
                "<div style='display: flex; flex-direction: row; padding-right: 20px;'>" +
                "<a target='_blank' href='https://igniterobotics.org' rel='noopener noreferrer'>" +
                "<img src='https://images.squarespace-cdn.com/content/v1/629451c50408713849a8c3df/4e7f4a8a-539b-40e1-bf0d-f4bda5611371/8Q7A8721.jpg?format=2500w' alt='Ignite Robotics' style='width: 180px; height: 110px; border-radius: 0.52vw; border-color: #9a1010; border-width: 0.16vw; box-shadow: 0px 0.1vw 0.26vw 4px rgba(0, 0, 0, 0.3); margin-top: 0.26vw; margin-bottom: 0.52vw;' />" +
                "</a>" +
                "<p style='margin-top: 48px; font-family: Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif; font-weight: bold; color: #000; font-size: 1em; width: 160px; margin-left: 0.52vw; text-wrap: pretty;'>Ignite Robotics</p>" +
                "</div>" +
                "</div>"
            ,
        },
        {
            organization: "University of Washington",
            position: "Independent Consultant",
            titleBold: true,
            date1: "April 2025",
            date2: "June 2025",
            details: 
                "Contracted by UW's Student Technology Fee (STF)\n" +
                "Automated their grant-approval system *(overseeing $10M)* via an intake rubric, low-level data transformation/formatting, and visualization templates \n",
        },
        {
            organization: "NO 2117",
            position: "Youth Advocate",
            date1: "May 2024",
            date2: "November 2024",
            details: "Personally recruited by Washington's Governor Inslee to campaign against I-2117 \n",
        },
        {
            organization: "MathGPT",
            position: "Lead Data Analyst",
            titleBold: true,
            date1: "May 2024",
            date2: "July 2024",
            details:
                "Headed MathGPT's data analysis efforts to increase user retention, usage, and conversion rate\n" + 
                "Employed *5 million event observations* to discern factors that impact conversion rate and other valuable insights\n" + 
                "Implemented UX decisions for *350k users* with TypeScript and A/B testing, *improved conversion rate by 43%*\n"
            ,
            code:
                "<div style='margin-top: 0.26vw; display: flex; flex-direction: row;'>" +
                "<div style='display: flex; flex-direction: row; padding-right: 20px;'>" +
                "<a target='_blank' href='https://math-gpt.org'>" +
                "<img src='https://math-gpt.org/newlogo.png' alt='MathGPT' style='width: 170px; height: 80px; border-radius: 0.52vw; border-color: #9a1010; border-width: 0.16vw; box-shadow: 0px 0.1vw 0.26vw 4px rgba(0, 0, 0, 0.3); margin-top: 0.26vw; margin-bottom: 0.52vw;' />" +
                "</a>" +
                "<p style='font-family: Gill Sans, Gill Sans MT, Calibri, Trebuchet MS, sans-serif; font-weight: bold; color: #000; font-size: 1em; width: 160px; margin-left: 0.52vw; margin-top: 35px; text-wrap: pretty;'>MathGPT</p>" +
                "</div>" +
                "</div>"
            ,
        },
        {
            organization: "City of Kirkland",
            position: "Climate Justice Intern",
            date1: "April 2022",
            date2: "September 2023",
            details:
                "Collaborated with councilmembers to further the impact of the Sustainability Master Plan (SMP)\n" +
                "Built out a Power BI dashboard to visualize the SMP\n"
            ,
        },
        {
            organization: "Starbucks",
            position: "Barista",
            date1: "July 2023",
            date2: "September 2023",
            details:
                "Thought this would work better than dating apps\n"
            ,
        },
        {
            organization: "ACE Hardware",
            position: "General Associate",
            date1: "July 2021",
            date2: "October 2021",
            details:
                "Getting in touch with hardware before I become a pro in software \n"
            ,
        },
        {
            organization: "Dunn Lumber",
            position: "General Associate",
            date1: "June 2021",
            date2: "July 2021",
            details:
                "Lifting heavy wood with cool old dudes\n"
            ,
        },
    ],
    activityEntries: [
        {
            organization: "UW Computer Science Student Advisory Council",
            position: "Chair",
            titleBold: true,
            date1: "October 2023",
            date2: "Present",
            details:
                "Work directly with the Dean, Director, and Vice Director in maintain/developing the success of the Allen School\n" +
                "Collaborate with faculty to review and develop curriculum and class policies to ensure an effective and equitable learning environment\n" +
                "Represent student voice by hosting town halls, connecting with students, and managing online resources\n"
            ,
        }
    ],
    volunteerEntries: [],
    interpersonalSkills:
        "Learning | Leadership | Creativity | Public Speaking | Teamwork | Communication | Collaboration",
}
