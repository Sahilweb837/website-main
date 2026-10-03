import Link from "next/link";
import PageInteractiveHandler from "@/components/PageInteractiveHandler";

export const metadata = {
  "title": "Online Data Analytics Course | Power BI & SQL Training",
  "description": "Join Netcoder Technology’s Online Data Analytics Course and learn Power BI, SQL, Excel, dashboard creation, reporting, and data visualization through live online training and practical projects.",
  "openGraph": {
    "title": "Online Data Analytics Course | Power BI & SQL Training",
    "description": "Join Netcoder Technology’s Online Data Analytics Course and learn Power BI, SQL, Excel, dashboard creation, reporting, and data visualization through live online training and practical projects.",
    "url": "https://www.netcoder.data-analytics-online",
    "siteName": "Netcoder Technology",
    "type": "website"
  },
  "alternates": {
    "canonical": "https://www.netcoder.data-analytics-online"
  }
};

export default function DataAnalyticsOnlinePage() {
  return (
    <>
      <PageInteractiveHandler pageSlug="data-analytics-online" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"Course\",\"name\":\"Online Data Analytics Training Program\",\"description\":\"Professional online Data Analytics training covering Power BI, SQL, Excel, dashboard creation, reporting, and data visualization with practical learning.\",\"provider\":{\"@type\":\"Organization\",\"name\":\"Netcoder Technology\",\"sameAs\":\"https://www.netcoder.in/\"}}" }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://www.netcoder.in/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Online Courses\",\"item\":\"https://www.netcoder.in/online-courses/\"},{\"@type\":\"ListItem\",\"position\":3,\"name\":\"Online Data Analytics Course\",\"item\":\"https://www.netcoder.in/data-analytics-online.php/\"}]}" }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"How Are Online Data Analytics Classes Conducted?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Our online classes are conducted through live interactive sessions with expert mentors, practical demonstrations, assignments, and real-time doubt support to ensure an effective learning experience.\"}},{\"@type\":\"Question\",\"name\":\"Is This Online Course Beginner Friendly?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Yes, this training program is designed for beginners, students, graduates, and working professionals who want to build practical skills in analytics, reporting, and data visualization.\"}},{\"@type\":\"Question\",\"name\":\"Which Analytics Tools Will I Learn?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"The course covers Excel, Power BI, SQL, dashboard creation, reporting tools, and data visualization techniques used in modern analytics and business environments.\"}},{\"@type\":\"Question\",\"name\":\"Are Live Projects Included In Training?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Yes, students work on practical assignments, case studies, dashboards, and real-world analytics projects to gain hands-on industry experience.\"}},{\"@type\":\"Question\",\"name\":\"Can I Access Recorded Sessions Later?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Yes, recorded sessions and learning resources are provided so students can revise concepts and continue learning at their own pace.\"}},{\"@type\":\"Question\",\"name\":\"What Career Roles Can I Apply For?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"After completing the program, learners can explore opportunities such as Data Analyst, Business Analyst, Reporting Analyst, Dashboard Developer, and Analytics Associate.\"}},{\"@type\":\"Question\",\"name\":\"Do You Provide Certification & Career Support?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Yes, Netcoder Technology provides certification, project guidance, portfolio support, interview preparation, and career assistance for learners.\"}}]}" }}
      />
      <section className="hero-section-custom">
                <div className="container">
                    <div className="row">
            
            {/* IMAGE */}

                        <div className="col hero-image-box-wrapper">
                            <div className="hero-image-box">
                                <div className="image-holder">
                                    <img src="/images/Data analysis-pana.png" className="main-hero-img" alt="" loading="lazy" decoding="async" />
                  </div>
                
                {/* FLOATING TAGS */}

                                <div className="floating-tag tag1">Excel</div>
                                <div className="floating-tag tag2">SQL</div>
                                <div className="floating-tag tag3">Power BI</div>
                                <div className="floating-tag tag4">Python</div>
                                <div className="floating-tag tag5">Tableau</div>
                </div>
              </div>
            
            {/* TEXT */}

                        <div className="col">
                            <div className="hero-content-box">
                                <h5>Online Data Analytics </h5>
                                <h2>Mentorship Training Program</h2>
                                <p>
                            Build practical analytics and reporting skills through Netcoder Technology’s online Data Analytics training program. Learn Power BI, SQL, Excel, dashboard creation, reporting, and data visualization with live mentorship, practical assignments, and real-world projects from anywhere in India.
                        </p>
                                <ul>
                                    <li>
                                        <img src="/images/Group 643.svg" loading="lazy" decoding="async" />
                                16-Week Structured Program
                            </li>
                                    <li>
                                        <img src="/images/Group 643.svg" loading="lazy" decoding="async" />
                                1-on-1 Mentorship Support
                            </li>
                                    <li>
                                        <img src="/images/Group 643.svg" loading="lazy" decoding="async" />
                                Real-World Data Projects
                            </li>
                                    <li>
                                        <img src="/images/Group 643.svg" loading="lazy" decoding="async" />
                                Placement Assistance
                            </li>
                  </ul>
                                <div className="campus-hero-actions">
                                    <a href="/contact" className="color-btn" aria-label="Get started with data analytics online course">
                                        <i className="fa-solid fa-paper-plane" style={{"marginRight":"6px"}}></i> Get Started
                            </a>
                                    <a href="tel:+919816732055" className="color-btn outline advisor-btn" aria-label="Call +91 9816732055 to talk to advisor">
                                        <i className="fa-solid fa-phone" style={{"marginRight":"6px"}}></i> Talk to Advisor
                            </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      

      {/* who should join */}


      

      {/* <div className="container about about-2 section-height">
        <div><img src="/images/mission.png" alt loading="lazy" decoding="async"></div>
        <div>
            <h3>Who Should Join Our </h3>
            <h2><span>Data Analytics Course?</span></h2>

            <p>You can join this data analytics course online if you want to build a strong career in data-driven fields. If you're a student or fresher, this course helps you enter high-demand roles by learning practical skills and tools.</p>

            <p>Working professionals, business owners, and aspiring analysts can use data to make smarter decisions, uncover insights, and grow their career or business with confidence.</p>
        </div>
    </div> */}


      
      <section className="internship-section container">
                <div className="wrapper">
          
          {/* Heading */}

                    <div className="section-heading">
                        <h2>
                    Data Analytics Course:
                                  <span>Highlights</span>
              </h2>
                        <p>
                    Explore what this online data analytics course is powered with.
                </p>
            </div>
          
          {/* Cards */}

                    <div className="card-grid">
            
            {/* Card 1 */}

                        <div className="intern-card">
                            <div className="card-top">
                                <div className="icon-box">
                                    <i className="fa-solid fa-code"></i>
                  </div>
                                <h3>Cohort-Based Coding</h3>
                </div>
                            <p className="card-desc">
                        Learn development in a collaborative cohort where you build, debug, and grow together.
                    </p>
                            <ul className="custom-list">
                                <li>Work on real-world coding projects with peers</li>
                                <li>Learn faster through collaboration and teamwork</li>
                </ul>
              </div>
            
            {/* Card 2 */}

                        <div className="intern-card">
                            <div className="card-top">
                                <div className="icon-box">
                                    <i className="fa-solid fa-laptop-code"></i>
                  </div>
                                <h3>Hands-on Project Building</h3>
                </div>
                            <p className="card-desc">
                        Build real websites, APIs, and mobile apps using modern technologies.
                    </p>
                            <ul className="custom-list">
                                <li>Create full stack applications from scratch</li>
                                <li>Deploy live projects and build your portfolio</li>
                </ul>
              </div>
            
            {/* Card 3 */}

                        <div className="intern-card">
                            <div className="card-top">
                                <div className="icon-box">
                                    <i className="fa-solid fa-users"></i>
                  </div>
                                <h3>Developer Community &amp; Support</h3>
                </div>
                            <p className="card-desc">
                        Be part of a strong developer ecosystem with continuous support and guidance.
                    </p>
                            <ul className="custom-list">
                                <li>Get mentorship, doubt solving &amp; code reviews</li>
                                <li>Connect with developers, alumni &amp; hiring partners</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      
      <div className="container break left">
                <img src="/images/which-course.png" alt="Need guidance" loading="lazy" decoding="async" />
                <div>
                    <h2>Need Guidance To Start In Data Analytics?</h2>
                    <p>Learn practical data analysis and business intelligence skills with Netcoder Technology’s Online Data Analytics Mentorship Program. Get live guidance in Excel, SQL, Power BI, dashboards, reporting, and data visualization through practical assignments and real-world analytics projects designed for beginners and aspiring data professionals.</p>
                    <a href="/contact" className="white-btn">Contact Us</a>
          </div>
        </div>

      

      {/* Not Sure */}


      

      {/* <div className="container break mt-3">
        <img src="/images/query.png" alt="Have any query" loading="lazy" decoding="async">
        <div>
            <h2>How Our Full Stack Course Works?</h2>
            <p>Learn step-by-step from basics to advanced development with hands-on projects, live sessions, and
                mentorship support. Get guidance from industry experts and build real applications.</p>
            <a href="/contact" className="white-btn">Contact Us</a>
        </div>
    </div> */}


      

      {/* roadmap */}


      
      <section className="timeline container">
                <h1 className="mb-5">          <span>Training Roadmap</span></h1>
                <div className="timeline-line">
                    <div className="timeline-progress"></div>
          </div>
        
        {/* ITEM */}

                <div className="timeline-item">
                    <div className="circle">1</div>
                    <div className="timeline-card">
                        <h3>Data               <span>Fundamentals</span></h3>
                        <p>Understand the basics of data analytics, data types, and how data is used in real-world business
                    decisions.</p>
            </div>
          </div>
                <div className="timeline-item">
                    <div className="circle">2</div>
                    <div className="timeline-card">
                        <h3>Excel               <span>&amp; Data Handling</span></h3>
                        <p>Learn Excel for data cleaning, analysis, and visualization using formulas, pivot tables, and
                    charts.
                </p>
            </div>
          </div>
                <div className="timeline-item">
                    <div className="circle">3</div>
                    <div className="timeline-card">
                        <h3>SQL               <span>for Data Analysis</span></h3>
                        <p>Master SQL to extract, filter, and analyze data from databases using real-world queries.</p>
            </div>
          </div>
                <div className="timeline-item">
                    <div className="circle">4</div>
                    <div className="timeline-card">
                        <h3>Python               <span>Analytics</span></h3>
                        <p>Use Python libraries to analyze data, perform calculations, and automate data tasks efficiently.
                </p>
            </div>
          </div>
                <div className="timeline-item">
                    <div className="circle">5</div>
                    <div className="timeline-card">
                        <h3>Data               <span>Visualization</span></h3>
                        <p>Create dashboards and reports using tools like Power BI and Tableau to present insights clearly.
                </p>
            </div>
          </div>
                <div className="timeline-item">
                    <div className="circle">6</div>
                    <div className="timeline-card">
                        <h3>Projects               <span>&amp; Placement</span></h3>
                        <p>Work on real-world projects, build your portfolio, and prepare for interviews to start your data
                    analytics career.</p>
            </div>
          </div>
        </section>

      
      <div className="container">
        
        {/* Header */}

                <div className="container courseCurriculum">
                    <div>
                        <h2 className="dm-heading">
                    Data Analytics               <span>Course Curriculum</span>
              </h2>
                        <p className="dm-desc">
                    A complete overview of our Data Analytics program, covering data visualization, Excel, SQL,
                    Power
                    BI, Python,
                    statistical analysis, dashboards, and real-world business insights projects.
                </p>
            </div>
          
          {/* <button className="color-btn mt-3 mt-md-0">
                Download Curriculum
            </button> */}

          </div>
        
        {/* Info Box */}

                <div className="dm-box">
                    <div className="row align-items-center text-center text-md-start">
                        <div className="col-md-2 mb-3 mb-md-0">
                            <ul className="dm-list">
                                <li>Duration</li>
                                <li>20 Weeks</li>
                </ul>
              </div>
                        <div className="col-md-2 mb-3 mb-md-0">
                            <ul className="dm-list">
                                <li>Mode</li>
                                <li>Online</li>
                </ul>
              </div>
                        <div className="col-md-2 mb-3 mb-md-0">
                            <ul className="dm-list">
                                <li>Live Sessions</li>
                                <li>120+ hrs</li>
                </ul>
              </div>
                        <div className="col-md-2 mb-3 mb-md-0">
                            <ul className="dm-list">
                                <li>Projects</li>
                                <li>21+</li>
                </ul>
              </div>
            
            {/* Divider */}

                        <div className="col-md-1 d-none d-md-flex justify-content-center">
                            <div className="dm-line"></div>
              </div>
            
            {/* Highlight */}

                        <div className="col-md-3 text-center text-md-start">
                            <span className="dm-highlight">• Placement Support</span>
              </div>
            </div>
          </div>
        </div>

      

      {/* Milestone 1 */}


      
      <div className="container milestone-container">
                <div className="milestone-header">
                    <h2>Milestone 1 - Duration:             <span className="duration-text">2 weeks</span></h2>
                    <div className="feature-bar">
                        <span>Data Analytics Fundamentals &amp; Tools</span>
                        <span className="text-muted">• 6 Live Sessions</span>
                        <span className="text-muted">• 2 Projects</span>
                        <span className="text-muted">• 2 Case Studies</span>
            </div>
                    <p className="summary-text">This milestone builds a strong foundation in data analytics by covering basic
                concepts, data handling, and introduction to essential tools.</p>
                    <button className="toggle-btn" type="button" aria-expanded="false">
                        <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
                <div className="collapse" id="weekContent1">
                    <div className="milestonecards row">
            
            {/* WEEK 1 */}

                        <div className="card-1">
                            <div className="week-card">
                                <div className="week-label">Week                   <span>1</span></div>
                                <h3 className="card-title">Data Analytics                   <span className="highlight-orange">Foundation</span></h3>
                                <ul className="course-list">
                                    <li>Introduction to data analytics &amp; lifecycle</li>
                                    <li>Types of data &amp; data sources</li>
                                    <li>Basic statistics for data analysis</li>
                                    <li>Data cleaning &amp; preprocessing basics</li>
                                    <li>Understanding business problems using data</li>
                  </ul>
                </div>
              </div>
            
            {/* WEEK 2 */}

                        <div className="card-1">
                            <div className="week-card">
                                <div className="week-label">Week                   <span>2</span></div>
                                <h3 className="card-title">Excel &amp; Data                   <span className="highlight-orange">Analysis</span></h3>
                                <ul className="course-list">
                                    <li>Excel basics &amp; formulas</li>
                                    <li>Data cleaning &amp; formatting</li>
                                    <li>Pivot tables &amp; charts</li>
                                    <li>Data visualization in Excel</li>
                                    <li>Real-world data analysis tasks</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      

      {/* Milestone 2 */}


      
      <div className="container milestone-container">
                <div className="milestone-header">
                    <h2>Milestone 2 - Duration:             <span className="duration-text">4 weeks</span></h2>
                    <div className="feature-bar mt-3">
                        <span>SQL &amp; Database Management</span>
                        <span className="text-muted">• 8 Live Sessions</span>
                        <span className="text-muted">• 2 Projects</span>
            </div>
                    <p className="summary-text">Learn how to work with databases using SQL. Extract, filter, and analyze
                structured
                data to generate meaningful insights.</p>
                    <button className="toggle-btn" type="button" aria-expanded="false">
                        <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
                <div className="collapse" id="weekContent2">
                    <div className=" milestonecards row">
            
            {/* WEEK 1 */}

                        <div className="card-1">
                            <div className="week-card">
                                <div className="week-label">Week                   <span>1</span></div>
                                <h3 className="card-title">SQL Basics &amp;                   <span className="highlight-orange">Queries</span></h3>
                                <ul className="course-list">
                                    <li>Introduction to databases</li>
                                    <li>Basic SQL queries (SELECT, WHERE)</li>
                                    <li>Filtering and sorting data</li>
                                    <li>Aggregate functions</li>
                                    <li>Working with real datasets</li>
                  </ul>
                </div>
              </div>
            
            {/* WEEK 2 */}

                        <div className="card-1">
                            <div className="week-card">
                                <div className="week-label">Week                   <span>2</span></div>
                                <h3 className="card-title">Advanced SQL &amp;                   <span className="highlight-orange">Joins</span></h3>
                                <ul className="course-list">
                                    <li>Joins (INNER, LEFT, RIGHT)</li>
                                    <li>Subqueries &amp; nested queries</li>
                                    <li>Data grouping &amp; aggregation</li>
                                    <li>Database design basics</li>
                                    <li>Real-world query practice</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      

      {/* Milestone 3 */}


      
      <div className="container milestone-container">
                <div className="milestone-header">
                    <h2>Milestone 3 - Duration:             <span className="duration-text">4 weeks</span></h2>
                    <div className="feature-bar mt-3">
                        <span>Python for Data Analysis</span>
                        <span className="text-muted">• 10 Live Sessions</span>
            </div>
                    <p className="summary-text">Use Python to clean, process, and analyze data. Learn powerful libraries for
                efficient data handling.</p>
                    <button className="toggle-btn" type="button" aria-expanded="false">
                        <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
                <div className="collapse" id="weekContent3">
                    <div className=" milestonecards row">
            
            {/* WEEK 1 */}

                        <div className="card-1">
                            <div className="week-card">
                                <div className="week-label">Week                   <span>1</span></div>
                                <h3 className="card-title">Python Basics &amp;                   <span className="highlight-orange">Data Handling</span>
                  </h3>
                                <ul className="course-list">
                                    <li>Python fundamentals</li>
                                    <li>Working with datasets</li>
                                    <li>Data cleaning using pandas</li>
                                    <li>Handling missing data</li>
                                    <li>Basic data analysis</li>
                  </ul>
                </div>
              </div>
            
            {/* WEEK 2 */}

                        <div className="card-1">
                            <div className="week-card">
                                <div className="week-label">Week                   <span>2</span></div>
                                <h3 className="card-title">Data Analysis &amp;                   <span className="highlight-orange">Visualization</span>
                  </h3>
                                <ul className="course-list">
                                    <li>Data visualization libraries</li>
                                    <li>Charts and graphs</li>
                                    <li>Exploratory data analysis</li>
                                    <li>Insights generation</li>
                                    <li>Mini projects</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      

      {/* Milestone 4 */}


      
      <div className="container milestone-container">
                <div className="milestone-header">
                    <h2>Milestone 4 - Duration:             <span className="duration-text">3 weeks</span></h2>
                    <div className="feature-bar mt-3">
                        <span>Power BI &amp; Data Visualization</span>
                        <span className="text-muted">• 8 Live Sessions</span>
            </div>
                    <p className="summary-text">Create powerful dashboards and visualize data insights using industry tools like
                Power BI.</p>
                    <button className="toggle-btn" type="button" aria-expanded="false">
                        <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
                <div className="collapse" id="weekContent4">
                    <div className=" milestonecards row">
            
            {/* WEEK 1 */}

                        <div className="card-1">
                            <div className="week-card">
                                <div className="week-label">Week                   <span>1</span></div>
                                <h3 className="card-title">Power BI                   <span className="highlight-orange">Basics</span></h3>
                                <ul className="course-list">
                                    <li>Power BI interface &amp; setup</li>
                                    <li>Data import &amp; transformation</li>
                                    <li>Basic dashboard creation</li>
                                    <li>Charts &amp; visuals</li>
                                    <li>Publishing reports</li>
                  </ul>
                </div>
              </div>
            
            {/* WEEK 2 */}

                        <div className="card-1">
                            <div className="week-card">
                                <div className="week-label">Week                   <span>2</span></div>
                                <h3 className="card-title">Advanced Dashboards &amp;                   <span className="highlight-orange">Insights</span></h3>
                                <ul className="course-list">
                                    <li>Advanced visualizations</li>
                                    <li>DAX basics</li>
                                    <li>Interactive dashboards</li>
                                    <li>Business insights reporting</li>
                                    <li>Case study dashboards</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      

      {/* Milestone 5 */}


      
      <div className="container milestone-container">
                <div className="milestone-header">
                    <h2>Milestone 5 - Duration:             <span className="duration-text">2 weeks</span></h2>
                    <div className="feature-bar mt-3">
                        <span>Projects &amp; Career Preparation</span>
                        <span className="text-muted">• 6 Live Sessions</span>
            </div>
                    <p className="summary-text">Build your portfolio with real projects and prepare for job interviews in data
                analytics.</p>
                    <button className="toggle-btn" type="button" aria-expanded="false">
                        <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
                <div className="collapse" id="weekContent5">
                    <div className="milestonecards row">
                        <div className="card-1">
                            <div className="week-card">
                                <div className="week-label">Week                   <span>1</span></div>
                                <h3 className="card-title">Final Projects &amp;                   <span className="highlight-orange">Portfolio</span></h3>
                                <ul className="course-list">
                                    <li>End-to-end data project</li>
                                    <li>Dashboard creation</li>
                                    <li>Case study documentation</li>
                                    <li>Portfolio building</li>
                                    <li>Project presentation</li>
                  </ul>
                </div>
              </div>
            
            {/* WEEK 2 */}

                        <div className="card-1">
                            <div className="week-card">
                                <div className="week-label">Week                   <span>2</span></div>
                                <h3 className="card-title">Career Support &amp;                   <span className="highlight-orange">Placement</span></h3>
                                <ul className="course-list">
                                    <li>Resume &amp; LinkedIn optimization</li>
                                    <li>Mock interviews</li>
                                    <li>Interview preparation</li>
                                    <li>Job assistance</li>
                                    <li>Career guidance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      

      {/* Fees Structure */}


      
      <section className="growth-track">
                <div className="container-custom">
                    <h2 className="section-title">
                Choose Your             <span>Learning Track</span>
            </h2>
                    <div className="track-wrapper">
            
            {/* Growth Track */}

                        <div className="track-card">
                            <h4 className="track-title">Growth Track</h4>
                            <p className="track-desc">Perfect for beginners to build strong foundations in data analytics</p>
                            <p className="old-price">₹5,999 Per Month</p>
                            <h3 className="new-price">
                        ₹3,999 Per Month
                                        <span className="tax">Inclusive of all taxes</span>
                </h3>
                            <ul className="track-list">
                                <li>16 Weeks Data Analytics Program</li>
                                <li>10+ Real-World Data Projects</li>
                                <li>Live Classes + Recorded Access</li>
                                <li>Excel, SQL &amp; Python Training</li>
                                <li>Mentor &amp; Community Support</li>
                                <li>Certification Included</li>
                </ul>
                            <div className="btn-wrap">
                
                {/* <button className="color-btn">Read More</button> */}

                </div>
              </div>
            
            {/* Career Track */}

                        <div className="track-card">
                            <h4 className="track-title">Career Track</h4>
                            <p className="track-desc">Advanced job-focused program with placement support</p>
                            <p className="old-price">₹6990 Per Month</p>
                            <h3 className="new-price">
                        ₹4,999 Per Month
                                        <span className="tax">Inclusive of all taxes</span>
                </h3>
                            <ul className="track-list">
                                <li>16 Weeks Advanced Program</li>
                                <li>20+ Industry Projects &amp; Case Studies</li>
                                <li>Hands-on Dashboard &amp; Analytics Tools</li>
                                <li>1:1 Mentorship &amp; Doubt Support</li>
                                <li>Placement Assistance</li>
                                <li>Interview Preparation &amp; Portfolio</li>
                </ul>
                            <div className="btn-wrap">
                
                {/* <button className="color-btn">Read More</button> */}

                </div>
              </div>
            </div>
          </div>
        </section>

      

      {/* Table */}


      
      <div className="container my-5">
                <h2 className="text-center fw-bold mb-4">Choose Your           <span>Learning Track</span></h2>
                <div className="online-page-table">
                    <div className="table-responsive">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>Program Features</th>
                                    <th>Growth Track</th>
                                    <th>Career Track</th>
                  </tr>
                </thead>
                            <tbody>
                                <tr>
                                    <td>Primary Goal</td>
                                    <td>Upskill for Career, Freelancing, Business &amp; Marketing Growth</td>
                                    <td>Land a Full-Time Digital Marketing Job</td>
                  </tr>
                                <tr>
                                    <td>Ideal For</td>
                                    <td>Students, Business Owners, Freelancers &amp; Professionals</td>
                                    <td>Students, Job Seekers &amp; Career Switchers</td>
                  </tr>
                                <tr>
                                    <td>Placement Support</td>
                                    <td>Guidance &amp; Mentorship Support</td>
                                    <td>Dedicated Placement Team</td>
                  </tr>
                                <tr>
                                    <td>Job Guarantee</td>
                                    <td>Not Included</td>
                                    <td>Included</td>
                  </tr>
                                <tr>
                                    <td>Program Duration</td>
                                    <td>                    <strong>20 Weeks</strong></td>
                                    <td>                    <strong>20 Weeks</strong></td>
                  </tr>
                                <tr>
                                    <td>Hours of Learning</td>
                                    <td>                    <strong>120+ Hours</strong></td>
                                    <td>                    <strong>150+ Hours</strong></td>
                  </tr>
                                <tr>
                                    <td>1:1 Mock Interviews</td>
                                    <td>1 Mock Interviews</td>
                                    <td>2 Mock Interviews</td>
                  </tr>
                                <tr>
                                    <td>LOR from Company</td>
                                    <td>Not Applicable</td>
                                    <td>                    <strong>Available</strong></td>
                  </tr>
                                <tr>
                                    <td>Learner Success Team</td>
                                    <td>                    <strong>Included</strong></td>
                                    <td>                    <strong>Included</strong></td>
                  </tr>
                                <tr>
                                    <td>Certification</td>
                                    <td>                    <strong>Included</strong></td>
                                    <td>                    <strong>Included</strong></td>
                  </tr>
                                <tr>
                                    <td>Program Fee</td>
                                    <td>                    <strong>₹3999 Per Month</strong></td>
                                    <td>                    <strong>₹4999 Per Month</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      

      {/* FAQs */}


      
      <div className="accordion container">
                <div className="headings">
                    <h2>Frequently Asked             <span>Questions</span></h2>
                    <small>Find answers about our online Data Analytics training, live classes, Power BI and SQL tools, practical projects, certification, and flexible learning experience.</small>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header active">
                        <h5>How Are Online Data Analytics Classes Conducted?</h5>
            </div>
                    <div className="accordion-content show">
                        <p>Our online classes are conducted through live interactive sessions with expert mentors, practical demonstrations, assignments, and real-time doubt support to ensure an effective learning experience.</p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">
                        <h5>Is This Online Course Beginner Friendly?</h5>
            </div>
                    <div className="accordion-content">
                        <p>Yes, this training program is designed for beginners, students, graduates, and working professionals who want to build practical skills in analytics, reporting, and data visualization.</p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">
                        <h5>Which Analytics Tools Will I Learn?</h5>
            </div>
                    <div className="accordion-content">
                        <p>The course covers Excel, Power BI, SQL, dashboard creation, reporting tools, and data visualization techniques used in modern analytics and business environments.</p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">
                        <h5>Are Live Projects Included In Training?</h5>
            </div>
                    <div className="accordion-content">
                        <p>Yes, students work on practical assignments, case studies, dashboards, and real-world analytics projects to gain hands-on industry experience.</p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">
                        <h5>Can I Access Recorded Sessions Later?</h5>
            </div>
                    <div className="accordion-content">
                        <p>Yes, recorded sessions and learning resources are provided so students can revise concepts and continue learning at their own pace.</p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">
                        <h5>What Career Roles Can I Apply For?</h5>
            </div>
                    <div className="accordion-content">
                        <p>After completing the program, learners can explore opportunities such as Data Analyst, Business Analyst, Reporting Analyst, Dashboard Developer, and Analytics Associate.</p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">
                        <h5>Do You Provide Certification &amp; Career Support?</h5>
            </div>
                    <div className="accordion-content">
                        <p>Yes, Netcoder Technology provides certification, project guidance, portfolio support, interview preparation, and career assistance for learners.</p>
            </div>
          </div>
        </div>

      

      {/* Blogs */}


      
      <div className="blogs container">
                <div className="headings container">
                    <h2>Latest             <span>Blogs</span></h2>          <small>Visit our blog to discover comprehensive information</small>
          </div>
                <div className="blog-col">
                    <div className="blog-card">
                        <a href="/graphics-trend-blog">
                            <img src="/images/Graphic-Design-Trend-2025-netcoder.jpg" alt="Graphics Design Trends in 2026: The Rise of AI and 3D Visuals" loading="lazy" decoding="async" />
              </a>
                        <a href="/graphics-trend-blog">
                            <h5>Graphics Design Trends in 2026: The Rise of AI and 3D Visuals</h5>
              </a>
                        <div>
                            <small>#Design</small>
              </div>
            </div>
                    <div className="blog-card">
                        <a href="/typography-blog">
                            <img src="/images/typography.jpg" alt="Typography in Modern Web Design: Fonts That Convert" loading="lazy" decoding="async" />
              </a>
                        <a href="/typography-blog">
                            <h5>Typography in Modern Web Design: Fonts That Convert</h5>
              </a>
                        <div>
                            <small>#UI/UX</small>
              </div>
            </div>
                    <div className="blog-card">
                        <a href="/web-dev-blog">
                            <img src="/images/web-dev-blog.jpg" alt="Full Stack Web Development in 2026: Roadmap and Key Skills" loading="lazy" decoding="async" />
              </a>
                        <a href="/web-dev-blog">
                            <h5>Full Stack Web Development in 2026: Roadmap and Key Skills</h5>
              </a>
                        <div>
                            <small>#Development</small>
              </div>
            </div>
                    <a href="blog-details.php?slug=">
                        <h5></h5>
            </a>
                    <div>
                        <small>#</small>
                        <small>#Uncategorized</small>
            </div>
          </div>
                <p>No blogs found.</p>
        </div>

      
      <div className="button">        <a href="/blog" className="color-btn">Read All Blogs</a></div>

      
    </>
  );
}
