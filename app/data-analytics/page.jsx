import Link from "next/link";
import PageInteractiveHandler from "@/components/PageInteractiveHandler";

export const metadata = {
  "title": "Data Analytics Training in Dharamshala, Kangra, H.P | Power BI & SQL Training",
  "description": "Join Netcoder Technology’s Data Analytics Course in Dharamshala, Kangra, H.P and learn Power BI, SQL, Excel, dashboard creation, data visualization, and business analytics with practical training.",
  "openGraph": {
    "title": "Data Analytics Training in Dharamshala, Kangra, H.P | Power BI & SQL Training",
    "description": "Join Netcoder Technology’s Data Analytics Course in Dharamshala, Kangra, H.P and learn Power BI, SQL, Excel, dashboard creation, data visualization, and business analytics with practical training.",
    "url": "https://www.netcoder.in/data-analytics",
    "siteName": "Netcoder Technology",
    "type": "website"
  },
  "alternates": {
    "canonical": "https://www.netcoder.in/data-analytics"
  }
};

export default function DataAnalyticsPage() {
  return (
    <>
      <PageInteractiveHandler pageSlug="data-analytics" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"Course\",\"name\":\"Data Analytics Training Program\",\"description\":\"Professional Data Analytics training covering Excel, Power BI, SQL, dashboard creation, data visualization, and reporting with practical learning.\",\"provider\":{\"@type\":\"Organization\",\"name\":\"Netcoder Technology\",\"sameAs\":\"https://www.netcoder.in/\"}}" }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://www.netcoder.in/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Courses\",\"item\":\"https://www.netcoder.in/courses/\"},{\"@type\":\"ListItem\",\"position\":3,\"name\":\"Data Analytics Course\",\"item\":\"https://www.netcoder.in/data-analytics.html\"}]}" }}
      />
      <div className="course-single">
                <div>
                    <img src="/images/DataScience-BusinessAnalytics.png" alt="Data Science & Business Analytics" loading="lazy" decoding="async" />
          </div>
                <div>
                    <h1>            <span>Data Analytics Course &amp; Training</span></h1>
                    <p>Learn industry-focused Data Analytics skills with practical training in Power BI, SQL, Excel, dashboard creation, data visualization, and business reporting. Netcoder Technology helps students and professionals build real-world analytical skills through live projects and hands-on learning.</p>
                    <a href="#" data-modal-trigger="demo" className="color-btn">Book Demo class</a>
          </div>
        </div>

      

      {/* Course Outline */}


      
      <div className="course-outline container">
                <div className="headings">
                    <h2>            <span>Course outline</span></h2>
                    <small>This is our course outline you can check below</small>
          </div>
                <div className="col">
          
          {/* course outline main */}

                    <ul>
                        <li>
                            <h4>1.</h4>
                            <div>
                                <h4>Introduction to Data Analytics</h4>
                                <small>Understand the basics of data analytics, types of data, data lifecycle, and the role of a data analyst in organizations.</small>
                </div>
              </li>
            
            {/*  */}

                        <li>
                            <h4>2.</h4>
                            <div>
                                <h4>Excel for Data Analysis</h4>
                                <small>Learn how to use Excel for data cleaning, sorting, filtering, pivot tables, and data visualization using charts and graphs.</small>
                </div>
              </li>
            
            {/*  */}

                        <li>
                            <h4>3.</h4>
                            <div>
                                <h4>SQL for Data Analysis </h4>
                                <small>Work with databases using SQL. Learn to write queries, use joins, subqueries, and perform data extraction and manipulation.</small>
                </div>
              </li>
            
            {/*  */}

                        <li>
                            <h4>4.</h4>
                            <div>
                                <h4>Python for Data Science</h4>
                                <small>Learn Python fundamentals and libraries like NumPy and Pandas to perform data analysis, data manipulation, and automation tasks.</small>
                </div>
              </li>
            
            {/*  */}

                        <li>
                            <h4>5.</h4>
                            <div>
                                <h4>Data Cleaning &amp; Preprocessing</h4>
                                <small>Understand how to handle missing values, remove duplicates, and prepare raw data for analysis.</small>
                </div>
              </li>
            
            {/*  */}

                        <li>
                            <h4>6.</h4>
                            <div>
                                <h4>Exploratory Data Analysis (EDA)</h4>
                                <small>Analyze datasets using statistical techniques and visualization tools to discover patterns and trends.</small>
                </div>
              </li>
            
            {/*  */}

                        <li>
                            <h4>7.</h4>
                            <div>
                                <h4>Data Visualization</h4>
                                <small>Create impactful visualizations using tools like Matplotlib, Seaborn, and Power BI to present insights clearly.</small>
                </div>
              </li>
            
            {/*  */}

                        <li>
                            <h4>8.</h4>
                            <div>
                                <h4>Introduction to Machine Learning</h4>
                                <small>Learn basic machine learning concepts and simple models like Linear Regression for predictive analysis.</small>
                </div>
              </li>
            
            {/*  */}

                        <li>
                            <h4>9.</h4>
                            <div>
                                <h4>Real-World Projects</h4>
                                <small>Work on real datasets to apply your skills and build a strong portfolio for job opportunities.</small>
                </div>
              </li>
            
            {/*  */}

            </ul>
          
          {/* brochure form */}

                    <div className="brochure-form">
                        <div className="form">
                            <h4>Eligibility</h4>
                            <p>12th , Equivalent and Above (1 year &amp; 6 months course)</p>
              </div>
            
            {/*  */}

                        <form className="form">
                            <h4>Download Course Brochure</h4>
                            <div>
                                <div className="inputs">
                                    <label htmlFor="name">
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 0C9.06087 0 10.0783 0.421427 10.8284 1.17157C11.5786 1.92172 12 2.93913 12 4C12 5.06087 11.5786 6.07828 10.8284 6.82843C10.0783 7.57857 9.06087 8 8 8C6.93913 8 5.92172 7.57857 5.17157 6.82843C4.42143 6.07828 4 5.06087 4 4C4 2.93913 4.42143 1.92172 5.17157 1.17157C5.92172 0.421427 6.93913 0 8 0ZM8 10C12.42 10 16 11.79 16 14V16H0V14C0 11.79 3.58 10 8 10Z" fill="#ff5532" />
                                            <defs>
                                                <linearGradient id="paint0_linear_219_95" x1="8" y1="0" x2="8" y2="16" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#FF8552" />
                                                    <stop offset="1" stopColor="#FF4E4E" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </label>
                                    <input type="text" name="name" id="name" placeholder="enter Your name" />
                  </div>
                
                {/*  */}

                                <div className="inputs">
                                    <label htmlFor="number">                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.8205 15.9999C12.1233 15.9999 11.1438 15.7477 9.67704 14.9284C7.89346 13.9284 6.5139 13.0052 4.73996 11.2362C3.02961 9.52728 2.1973 8.42084 1.03242 6.30153C-0.283565 3.90864 -0.0592336 2.65434 0.191532 2.11827C0.490164 1.47754 0.930969 1.09432 1.50073 0.713963C1.82435 0.501973 2.16682 0.32025 2.52379 0.171099C2.55952 0.155742 2.59274 0.141099 2.62239 0.127884C2.79921 0.0482406 3.06712 -0.0721179 3.40648 0.056455C3.63295 0.141456 3.83513 0.315387 4.15163 0.627891C4.80069 1.2679 5.68766 2.69327 6.01486 3.39328C6.23455 3.86507 6.37994 4.1765 6.3803 4.52579C6.3803 4.93473 6.17454 5.25009 5.92485 5.59045C5.87805 5.65438 5.83161 5.71545 5.7866 5.77474C5.51476 6.13189 5.45511 6.2351 5.4944 6.41939C5.57406 6.78975 6.16811 7.89226 7.14438 8.8662C8.12065 9.84015 9.19159 10.3966 9.56345 10.4759C9.75563 10.5169 9.86101 10.4548 10.2297 10.1734C10.2825 10.133 10.3368 10.0912 10.3936 10.0494C10.7744 9.76622 11.0752 9.56586 11.4746 9.56586H11.4767C11.8243 9.56586 12.1218 9.71657 12.6148 9.96515C13.2578 10.2894 14.7263 11.1648 15.3703 11.8145C15.6836 12.1302 15.8583 12.3316 15.9437 12.5577C16.0723 12.898 15.9512 13.1648 15.8722 13.3434C15.859 13.373 15.8444 13.4055 15.829 13.4416C15.6787 13.7979 15.4958 14.1396 15.2828 14.4623C14.9031 15.0302 14.5184 15.4699 13.8761 15.7688C13.5463 15.9248 13.1854 16.0038 12.8205 15.9999Z" fill="#ff5532" />
                                            <defs>
                                                <linearGradient id="paint0_linear_219_97" x1="8" y1="0" x2="8" y2="16" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#FF8552" />
                                                    <stop offset="1" stopColor="#FF4E4E" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </label>
                                    <input type="tel" name="number" id="number" placeholder="enter mobile number" />
                  </div>
                
                {/*  */}

                                <div className="inputs">
                                    <label htmlFor="email">                    <svg width="16" height="13" viewBox="0 0 16 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16 2.828V10.4C16 11.0122 15.7661 11.6012 15.3462 12.0466C14.9262 12.492 14.3519 12.7601 13.7408 12.796L13.6 12.8H2.4C1.78783 12.8 1.19879 12.5661 0.753391 12.1462C0.307994 11.7262 0.039914 11.1519 0.00400009 10.5408L0 10.4V2.828L7.556 7.8656L7.6488 7.9184C7.75816 7.97184 7.87828 7.99961 8 7.99961C8.12172 7.99961 8.24184 7.97184 8.3512 7.9184L8.444 7.8656L16 2.828Z" fill="#ff5532" />
                                            <path d="M13.6004 0C14.4644 0 15.222 0.456 15.6444 1.1416L8.00044 6.2376L0.356445 1.1416C0.557029 0.815814 0.832616 0.542721 1.16021 0.345106C1.48781 0.147491 1.85791 0.031085 2.23965 0.00559998L2.40045 0H13.6004Z" fill="#ff5532" />
                                            <defs>
                                                <linearGradient id="paint0_linear_219_99" x1="8" y1="2.828" x2="8" y2="12.8" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#FF8552" />
                                                    <stop offset="1" stopColor="#FF4E4E" />
                          </linearGradient>
                                                <linearGradient id="paint1_linear_219_99" x1="8.00045" y1="0" x2="8.00045" y2="6.2376" gradientUnits="userSpaceOnUse">
                                                    <stop stopColor="#FF8552" />
                                                    <stop offset="1" stopColor="#FF4E4E" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </label>
                                    <input type="email" name="email" id="email" placeholder="Enter Email Address" autoCapitalize="none" autoCorrect="off" spellCheck="false" autoComplete="email" style={{"textTransform":"lowercase"}} inputMode="email" />
                  </div>
                                <button className="color-btn">Download Brochure</button>
                </div>
              </form>
                        <div className="form learn-card">
                            <h4>What You'll Learn</h4>
                            <ol>
                                <li>
                                    <i className="fa-solid fa-circle-check"></i>
                                    <span>Master Python, SQL, and data manipulation tools</span>
                  </li>
                                <li>
                                    <i className="fa-solid fa-circle-check"></i>
                                    <span>Perform advanced statistical data analysis</span>
                  </li>
                                <li>
                                    <i className="fa-solid fa-circle-check"></i>
                                    <span>Create reports &amp; visual insights in Power BI</span>
                  </li>
                                <li>
                                    <i className="fa-solid fa-circle-check"></i>
                                    <span>Build a professional data analytics portfolio</span>
                  </li>
                                <li>
                                    <i className="fa-solid fa-circle-check"></i>
                                    <span>Prepare for real-world analyst roles</span>
                  </li>
                </ol>
              </div>
                        <div className="form highlights-card">
                            <h4>Course Highlights</h4>
                            <div className="highlights-grid">
                                <div className="highlight-item">
                                    <div className="highlight-icon-wrapper">
                                        <i className="fa-solid fa-book-open"></i>
                    </div>
                                    <div className="highlight-text-group">
                                        <div className="highlight-number">40+</div>
                                        <div className="highlight-label">Lessons</div>
                    </div>
                  </div>
                                <div className="highlight-item">
                                    <div className="highlight-icon-wrapper">
                                        <i className="fa-solid fa-briefcase"></i>
                    </div>
                                    <div className="highlight-text-group">
                                        <div className="highlight-number">10+</div>
                                        <div className="highlight-label">Projects</div>
                    </div>
                  </div>
                                <div className="highlight-item">
                                    <div className="highlight-icon-wrapper">
                                        <i className="fa-solid fa-screwdriver-wrench"></i>
                    </div>
                                    <div className="highlight-text-group">
                                        <div className="highlight-number">10+</div>
                                        <div className="highlight-label">Tools Covered</div>
                    </div>
                  </div>
                                <div className="highlight-item">
                                    <div className="highlight-icon-wrapper">
                                        <i className="fa-solid fa-award"></i>
                    </div>
                                    <div className="highlight-text-group">
                                        <div className="highlight-number">Certificate</div>
                                        <div className="highlight-label">Included</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      

      {/* tools you learn */}


      
      <div className="container tools-section">
        
        {/* Ambient Blur Lighting */}

                <div className="orb orb-1"></div>
                <div className="orb orb-2"></div>
        
        {/* SECTION HEADER */}

                <header className="tools-header">
                    <span className="section-tag">TOOLS &amp; TECHNOLOGIES</span>
                    <h2>Software &amp; Tools             <span>You'll Master</span></h2>
                    <p>
                Get hands-on experience with data analytics tools through real-world data projects at Netcoder Technology, Dharamshala.
            </p>
          </header>
        
        {/* TOOLS GRID */}

                <div className="tools-grid">
                    <div className="tool-card">
                        <div className="app-avatar ps-theme">
                            <i className="fa-brands fa-python"></i>
              </div>
                        <h3>Python</h3>
                        <p>Data Processing</p>
            </div>
                    <div className="tool-card">
                        <div className="app-avatar ai-theme">
                            <i className="fa-solid fa-database"></i>
              </div>
                        <h3>SQL</h3>
                        <p>Data Querying</p>
            </div>
                    <div className="tool-card">
                        <div className="app-avatar id-theme">
                            <i className="fa-solid fa-chart-bar"></i>
              </div>
                        <h3>Tableau</h3>
                        <p>Data Visualization</p>
            </div>
                    <div className="tool-card">
                        <div className="app-avatar figma-theme">
                            <i className="fa-solid fa-chart-pie"></i>
              </div>
                        <h3>Power BI</h3>
                        <p>Business Dashboards</p>
            </div>
                    <div className="tool-card">
                        <div className="app-avatar canva-theme">
                            <i className="fa-solid fa-table"></i>
              </div>
                        <h3>Excel</h3>
                        <p>Spreadsheet Analytics</p>
            </div>
                    <div className="tool-card">
                        <div className="app-avatar ps-theme">
                            <i className="fa-solid fa-cubes"></i>
              </div>
                        <h3>Pandas &amp; NumPy</h3>
                        <p>Data Manipulation</p>
            </div>
                    <div className="tool-card">
                        <div className="app-avatar ai-theme">
                            <i className="fa-solid fa-laptop-code"></i>
              </div>
                        <h3>Jupyter Notebook</h3>
                        <p>Interactive Analysis</p>
            </div>
                    <div className="tool-card">
                        <div className="app-avatar id-theme">
                            <i className="fa-solid fa-chart-line"></i>
              </div>
                        <h3>Google Analytics</h3>
                        <p>Web Data Insights</p>
            </div>
                    <div className="tool-card">
                        <div className="app-avatar canva-theme">
                            <i className="fa-solid fa-chart-area"></i>
              </div>
                        <h3>Matplotlib</h3>
                        <p>Data Plotting</p>
            </div>
                    <div className="tool-card">
                        <div className="app-avatar figma-theme">
                            <i className="fa-solid fa-brain"></i>
              </div>
                        <h3>Statistics</h3>
                        <p>Data-Driven Insights</p>
            </div>
          </div>
        </div>

      

      {/* industry demand */}


      
      <section className="industry-demand">
                <div className="container">
                    <div className="industry-header">
                        <span>INDUSTRY DEMAND</span>
                        <h2>
                    Data Analysts are among the most in-demand professionals across every industry globally.
                </h2>
                        <p>
                    Companies, banks, consulting firms, and tech startups rely on data analysts for business insights, reporting, trend analysis, and data-driven strategies.
                </p>
            </div>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <h3>35%</h3>
                            <p>Growth in data analytics careers over the next few years</p>
              </div>
                        <div className="stat-card">
                            <h3>80K+</h3>
                            <p>Data analytics job opportunities available across India</p>
              </div>
                        <div className="stat-card">
                            <h3>₹4L-14L</h3>
                            <p>Average annual salary range for data analysts</p>
              </div>
                        <div className="stat-card">
                            <h3>9 in 10</h3>
                            <p>Organizations rely on data analytics for decisions</p>
              </div>
            </div>
                    <div className="industry-footer">
                Data analytics skills are essential across all industries — every organization needs professionals who can turn data into actionable business insights.
            </div>
          </div>
        </section>

      

      {/* Hiring Partners */}


      
      <section className="hiring-section">
                <div className="containers">
                    <div className="section-header">
                        <div className="section-badge">
                    Student Placements
                </div>
                        <h2>
                    Where Our Students Are Placed
                </h2>
                        <p>
                    Our students have successfully launched their careers with growing technology companies, digital
                    agencies, and innovative startups across different industries.
                </p>
            </div>
          
          {/* ROW 1 */}

                    <div className="logo-row row-1">
                        <div className="logo-track">
                            <div className="logo-card">                <img src="/images/app_mechanic_logo.png" alt="App Mechanic" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/social_gtm.avif" alt="Social GTM" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/cubix_technology_logo.png" alt="Cubix Technology" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/Development_logics_logo.png" alt="Development Logics" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/richest_soft_logo.svg" alt="Richest Soft" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/social_Simba.png" alt="Social Simba" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/app_mechanic_logo.png" alt="App Mechanic" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/social_gtm.avif" alt="Social GTM" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/cubix_technology_logo.png" alt="Cubix Technology" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/Development_logics_logo.png" alt="Development Logics" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/richest_soft_logo.svg" alt="Richest Soft" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/swiftedge_solutions_logo.webp" alt="Swiftedge Solutions" loading="lazy" decoding="async" />
                </div>
                            <div className="logo-card">                <img src="/images/cubeinfotech_logo.png" alt="Cube Infotech" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/unmeteredtechnologies_logo.png" alt="Unmetered Technologies" loading="lazy" decoding="async" /></div>
              </div>
            </div>
          
          {/* ROW 2 */}

                    <div className="logo-row row-2">
                        <div className="logo-track">
                            <div className="logo-card">                <img src="/images/vagabond_logo.png" alt="Vagabond" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/swiftedge_solutions_logo.webp" alt="Swiftedge Solutions" loading="lazy" decoding="async" />
                </div>
                            <div className="logo-card">                <img src="/images/cubeinfotech_logo.png" alt="Cube Infotech" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/unmeteredtechnologies_logo.png" alt="Unmetered Technologies" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/signore_black.png" alt="Signore Technologies" loading="lazy" decoding="async" />
                </div>
                            <div className="logo-card">                <img src="/images/vagabond_logo.png" alt="Vagabond" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/swiftedge_solutions_logo.webp" alt="Swiftedge Solutions" loading="lazy" decoding="async" />
                </div>
                            <div className="logo-card">                <img src="/images/cubeinfotech_logo.png" alt="Cube Infotech" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/unmeteredtechnologies_logo.png" alt="Unmetered Technologies" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/signore_black.png" alt="Signore Technologies" loading="lazy" decoding="async" />
                </div>
                            <div className="logo-card">                <img src="/images/cubeinfotech_logo.png" alt="Cube Infotech" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/unmeteredtechnologies_logo.png" alt="Unmetered Technologies" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/signore_black.png" alt="Signore Technologies" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
        </section>

      

      {/* hiring section 2 */}


      
      <section className="hiring-section">
                <div className="containers">
                    <div className="section-header">
                        <div className="section-badge">
                    Industry Demand
                </div>
                        <h2>
                    Companies with High Demand for Skilled Professionals
                </h2>
                        <p>
                    These leading organizations consistently seek talented professionals with strong technical, design,
                    marketing, and business skills.
                </p>
            </div>
          
          {/* ROW 1 */}

                    <div className="logo-row row-1">
                        <div className="logo-track">
                            <div className="logo-card">                <img src="/images/samsung_logo.png" alt="Samsung" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/google_PNG1.png" alt="Google" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/apple-logo-logo-icons-31.png" alt="Apple" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/Flipkart-logo.png" alt="Flipkart" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/amazon-logo-amazon-icon.webp" alt="Amazon" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/swiggy.webp" alt="Swiggy" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/Zomato-logo.png" alt="Zomato" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/samsung_logo.png" alt="Samsung" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/google_PNG1.png" alt="Google" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/apple-logo-logo-icons-31.png" alt="Apple" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/Flipkart-logo.png" alt="Flipkart" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/amazon-logo-amazon-icon.webp" alt="Amazon" loading="lazy" decoding="async" /></div>
              </div>
            </div>
          </div>
        </section>

      

      {/* ========== SUCCESS STORIES ========== */}


      
      <div className="testimonials-wrap container">
                <span className="section-eyebrow">Success Stories</span>
                <h2 className="section-title">Hear it from our students</h2>
                <div className="testimonials-grid" id="testimonialsGrid"></div>
                <div className="more-wrap">
                    <a className="color-btn" href="https://www.youtube.com/@netcodertechnology/videos" target="_blank" rel="noopener">View more testimonials</a>
          </div>
        </div>

      

      {/* popup */}


      
      <div className="popup-overlay" id="popupOverlay">
                <div className="popup-box" id="popupBox">
                    <button className="popup-close" id="popupClose" aria-label="Close video">×</button>
          </div>
        </div>

      

      {/* Google reviews */}


      
      <section className="nc-reviews">
                <div className="nc-container">
                    <div className="nc-heading">
                        <h2>What Our Students Say</h2>
                        <p>
                    Real experiences from students who learned industry-ready skills
                    through practical training at Netcoder Technology.
                </p>
            </div>
                    <div className="nc-slider-wrapper">
                        <div className="nc-slider">
              
              {/* 1 */}

                            <div className="nc-card">
                                <div className="nc-user">
                                    <div className="nc-avatar">M</div>
                                    <div>
                                        <h4>Muskan Choudhary</h4>
                                        <span>Web &amp; Graphic Designing</span>
                    </div>
                  </div>
                                <div className="nc-stars">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                  </div>
                                <p>
                            I have been studying at Netcoder Technology for the last 12 months.
                            The trainers are knowledgeable, supportive, and always ready to help.
                        </p>
                </div>
              
              {/* 2 */}

                            <div className="nc-card">
                                <div className="nc-user">
                                    <div className="nc-avatar">A</div>
                                    <div>
                                        <h4>Arushi Dhiman</h4>
                                        <span>Graphic Designing</span>
                    </div>
                  </div>
                                <div className="nc-stars">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                  </div>
                                <p>
                            Learned Photoshop, Illustrator, branding, logo design,
                            typography and social media creatives through practical projects.
                        </p>
                </div>
              
              {/* 3 */}

                            <div className="nc-card">
                                <div className="nc-user">
                                    <div className="nc-avatar">E</div>
                                    <div>
                                        <h4>Elite Modeling Agency</h4>
                                        <span>Digital Marketing</span>
                    </div>
                  </div>
                                <div className="nc-stars">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                  </div>
                                <p>
                            Excellent Digital Marketing course covering SEO, PPC,
                            Social Media Marketing and Google Analytics.
                        </p>
                </div>
              
              {/* 4 */}

                            <div className="nc-card">
                                <div className="nc-user">
                                    <div className="nc-avatar">K</div>
                                    <div>
                                        <h4>Kritika Rihalia</h4>
                                        <span>Web &amp; Graphic Designing</span>
                    </div>
                  </div>
                                <div className="nc-stars">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                  </div>
                                <p>
                            Even from a Humanities background, learning was easy because
                            of the supportive trainers and practical approach.
                        </p>
                </div>
              
              {/* 5 */}

                            <div className="nc-card">
                                <div className="nc-user">
                                    <div className="nc-avatar">A</div>
                                    <div>
                                        <h4>Abhishek</h4>
                                        <span>Data Science</span>
                    </div>
                  </div>
                                <div className="nc-stars">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                  </div>
                                <p>
                            The Data Science program is well-structured and builds
                            strong theoretical and practical skills.
                        </p>
                </div>
              
              {/* 6 */}

                            <div className="nc-card">
                                <div className="nc-user">
                                    <div className="nc-avatar">A</div>
                                    <div>
                                        <h4>Amaan Sam</h4>
                                        <span>Digital Marketing</span>
                    </div>
                  </div>
                                <div className="nc-stars">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                  </div>
                                <p>
                            Practical Digital Marketing training with SEO, Google Ads,
                            Social Media Marketing and real-world projects.
                        </p>
                </div>
              </div>
            </div>
                    <div className="nc-btn-wrap">
                        <a href="https://www.google.com/search?sca_esv=dde3a9518543860a&rlz=1C1CHBF_enIN1134IN1135&sxsrf=APpeQnvW1gr9W_ag_pZCfy2tg59a17X6Lw:1785141581641&si=APenkKm7iecQ4G6P-TsbSMFKIQtv3EFIqRAFw-i8uEbk55Z-_yXoL3TLisELXlaWMufxL6LqPS7DWdqLHdatbinZgSlwcFK9hNfJJaDbljF0Huenx0MGgMSgWRJjaH7DyqMImn7kdB9AGWnyEFprd4hF_XS5ozWPeaWBJFcl0xRnL2T6LCFvr6Q%3D&q=Netcoder+Technology+-+Dharamshala+Reviews&sa=X" target="_blank" className="color-btn">
                    View All Reviews
                </a>
            </div>
          </div>
        </section>

      

      {/* FAQs */}


      
      <div className="accordion container">
                <div className="headings">
                    <h2>Frequently Asked             <span>Questions</span></h2>
                    <small>Find answers about our Data Analytics training program, Power BI and SQL tools, practical projects, certification, and career opportunities in analytics and business intelligence.</small>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header active">            <h5>What will I learn in this Data Analytics course?</h5></div>
                    <div className="accordion-content show">
                        <p>You will learn Excel, Power BI, SQL, dashboard creation, data visualization, reporting, and practical analytics skills through hands-on projects.</p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">            <h5>Is this course suitable for beginners?</h5></div>
                    <div className="accordion-content">
                        <p>Yes, the training program is designed for beginners, students, graduates, and professionals interested in analytics and data-driven careers.</p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">            <h5>Which tools are covered in the training?</h5></div>
                    <div className="accordion-content">
                        <p>The course covers Excel, Power BI, SQL, reporting tools, dashboard development, and data visualization techniques used in industries.</p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">            <h5>Are practical projects included?</h5></div>
                    <div className="accordion-content">
                        <p>Yes, students work on live assignments, dashboards, case studies, and practical analytics projects for real-world experience.</p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">            <h5>What career opportunities are available after this course?</h5></div>
                    <div className="accordion-content">
                        <p>Students can explore roles such as Data Analyst, Reporting Analyst, Business Analyst, Dashboard Developer, and Analytics Associate.</p>
            </div>
          </div>
        
        {/* <PopUp Form */}
</div>
    </>
  );
}
