import Link from "next/link";
import PageInteractiveHandler from "@/components/PageInteractiveHandler";

export const metadata = {
  "title": "MEAN Stack Development Course in Dharamshala",
  "description": "Professional IT training and digital services in Dharamshala at Netcoder Technology.",
  "openGraph": {
    "title": "MEAN Stack Development Course in Dharamshala",
    "description": "Professional IT training and digital services in Dharamshala at Netcoder Technology.",
    "url": "https://www.netcoder.in/mean-stack",
    "siteName": "Netcoder Technology",
    "type": "website"
  },
  "alternates": {
    "canonical": "https://www.netcoder.in/mean-stack"
  }
};

export default function MeanStackPage() {
  return (
    <>
      <PageInteractiveHandler pageSlug="mean-stack" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"Course\",\"name\":\"MEAN Stack Development Training Program\",\"description\":\"Professional MEAN Stack Development training covering MongoDB, Express.js, Angular, Node.js, REST APIs, frontend development, backend development, and practical full-stack web application projects.\",\"provider\":{\"@type\":\"Organization\",\"name\":\"Netcoder Technology\",\"sameAs\":\"https://www.netcoder.in/\"}}" }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"What Is The Difference Between MEAN Stack & Traditional Web Development?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"MEAN Stack uses modern JavaScript technologies like MongoDB, Express.js, Angular, and Node.js to build fast, scalable, and dynamic web applications with frontend and backend integration.\"}},{\"@type\":\"Question\",\"name\":\"Why Is MEAN Stack Popular In Modern Web Development?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"MEAN Stack allows developers to use JavaScript for both frontend and backend development, making application development faster, scalable, and efficient for modern businesses and startups.\"}},{\"@type\":\"Question\",\"name\":\"Will I Build Real Full Stack Applications During Training?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Yes, students work on practical web applications, REST APIs, database integration projects, and responsive frontend-backend development assignments for real-world experience.\"}},{\"@type\":\"Question\",\"name\":\"Is This Course Suitable For Beginners In Programming?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Absolutely. The training starts from web development fundamentals and gradually moves towards advanced frontend and backend technologies used in MEAN Stack development.\"}},{\"@type\":\"Question\",\"name\":\"What Career Opportunities Are Available After Learning MEAN Stack?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"After completing this program, learners can explore opportunities in Full Stack Development, Web Application Development, Frontend Development, Backend Development, and Software Engineering roles.\"}}]}" }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://www.netcoder.in/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Courses\",\"item\":\"https://www.netcoder.in/courses/\"},{\"@type\":\"ListItem\",\"position\":3,\"name\":\"MEAN Stack Development Course\",\"item\":\"https://www.netcoder.in/mean-stack.html\"}]}" }}
      />
      <div className="course-single">
                <div>
                    <img src="/images/mean-stack.png" alt="MEAN Stack" loading="lazy" decoding="async" />
          </div>
                <div>
                    <h2>            <span>MEAN Stack Development Course</span></h2>
                    <p>MEAN Stack Development is one of the fastest-growing technologies in modern web development. Netcoder Technology’s MEAN Stack Development Course in Dharamshala is designed for students and aspiring developers who want practical frontend and backend development skills using modern JavaScript technologies. Our program is ideal for learners searching for professional MEAN Stack Training in Himachal Pradesh with real project experience and practical coding exposure.             <br />

The training covers             <strong>MongoDB, Express.js, Angular, Node.js, REST APIs, responsive web development, database management, Git &amp; GitHub, and real-world web application development</strong> through practical assignments and live projects. Students gain hands-on experience with modern full-stack technologies used in the software industry.
            <br />
Through practical coding and industry-focused mentorship, learners understand how modern web applications are developed, connected with databases, and deployed using full-stack technologies. Netcoder Technology’s MEAN Stack Training in Himachal Pradesh helps students build coding confidence, development skills, and career readiness for opportunities in web development, software engineering, frontend development, and backend development.
            </p>
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
                                <h4>Introduction to MEAN Stack</h4>
                                <small>Express.js, Angular, Node.js, and MongoDB comprise the MEAN Stack. MongoDB is the database, Express.js is used for web apps, Node.js is used for the server, and Angular is used for the client side. Benefits include speed, scalability, unified JavaScript, and data communication in JSON. Perfect for contemporary web applications.</small>
                </div>
              </li>
            
            {/*  */}

                        <li>
                            <h4>2.</h4>
                            <div>
                                <h4>MongoDB</h4>
                                <small>NoSQL database MongoDB is renowned for its scalability and versatility. It facilitates CRUD actions (Create, Read, Update, Delete), is simple to install and set up, groups data into collections and documents, and provides indexing and aggregation for effective data searching and analysis.</small>
                </div>
              </li>
            
            {/*  */}

                        <li>
                            <h4>3.</h4>
                            <div>
                                <h4>Express.js</h4>
                                <small>A simple web application framework for Node.js is called Express.js. By offering a comprehensive set of functionality for managing HTTP requests, routing, middleware integration, and other tasks, it streamlines the process of developing web applications. With Express.js, developers can easily design server-side apps that are scalable and efficient.</small>
                </div>
              </li>
            
            {/*  */}

                        <li>
                            <h4>4.</h4>
                            <div>
                                <h4>Angular</h4>
                                <small>Google maintains the client-side JavaScript framework Angular. It makes it easier to create dynamic, interactive web application user interfaces. With capabilities like dependency injection, modular development, and two-way data binding, Angular improves front-end development productivity and scalability.</small>
                </div>
              </li>
            
            {/*  */}

                        <li>
                            <h4>5.</h4>
                            <div>
                                <h4>Node.js</h4>
                                <small>A server-side JavaScript runtime called Node.js makes non-blocking, event-driven architecture possible. It uses modules and packages for increased functionality and is simple to set up. The foundation of asynchronous programming is the use of async/await, promises, and callbacks to handle I/O activities efficiently. Because Node.js is so good at creating RESTful APIs, developers can construct web services that are both scalable and performant.</small>
                </div>
              </li>
            
            {/*  */}

                        <li>
                            <h4>6.</h4>
                            <div>
                                <h4>Integrating the MEAN Stack</h4>
                                <small>Node.js with MongoDB integration allows for easy data storing and retrieval. Building RESTful APIs for smooth client-server interactions is made easier using Express.js. These APIs are consumed by Angular, enabling dynamic data rendering and interaction. Efficient development and deployment of full-stack apps are made possible by the MEAN Stack, which offers a uniform JavaScript environment.</small>
                </div>
              </li>
            
            {/*  */}

                        <li>
                            <h4>7.</h4>
                            <div>
                                <h4>Authentication and Authorization</h4>
                                <small>Encrypted tokens and secure user authentication are ensured by using JWT. Users are authenticated for resource access through user registration and login features. To improve security, role-based access control, or RBAC, limits resource access according to user roles. By preventing unwanted access, routes and resources are secured, protecting sensitive data inside the application.</small>
                </div>
              </li>
            
            {/*  */}

                        <li>
                            <h4>8.</h4>
                            <div>
                                <h4>Deployment and Optimization</h4>
                                <small>Scalable hosting is made easy for MEAN Stack apps with platforms like Heroku and AWS. By improving performance, optimization techniques guarantee a seamless user experience. To maintain consistent performance, load balancing and scalability techniques efficiently handle growing traffic. Whereas debugging tools effectively resolve problems and guarantee app dependability, monitoring tools keep tabs on an application's performance.</small>
                </div>
              </li>
            
            {/*  */}

                        <li>
                            <h4>9.</h4>
                            <div>
                                <h4>Project Work (Music Streaming Service)</h4>
                                <small>
                            Develop a platform for streaming and sharing music. Users can create playlists, follow artists, discover new music, and interact with other users through comments and likes.
                        </small>
                </div>
              </li>
            
            {/*  */}

            </ul>
          
          {/* brochure form */}

                    <div className="brochure-form">
                        <div className="form">
                            <h4>Eligibility</h4>
                            <p>12th , equivalent and above</p>
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
                                    <span>Master MongoDB, Express.js, Angular, and Node.js</span>
                  </li>
                                <li>
                                    <i className="fa-solid fa-circle-check"></i>
                                    <span>Build scalable, enterprise-grade web applications</span>
                  </li>
                                <li>
                                    <i className="fa-solid fa-circle-check"></i>
                                    <span>Create robust RESTful APIs and database schemas</span>
                  </li>
                                <li>
                                    <i className="fa-solid fa-circle-check"></i>
                                    <span>Understand frontend architecture &amp; routing</span>
                  </li>
                                <li>
                                    <i className="fa-solid fa-circle-check"></i>
                                    <span>Build a professional MEAN stack portfolio</span>
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
                Get hands-on experience with the MEAN stack through real-world enterprise projects at Netcoder Technology, Dharamshala.
            </p>
          </header>
        
        {/* TOOLS GRID */}

                <div className="tools-grid">
                    <div className="tool-card">
                        <div className="app-avatar id-theme">
                            <i className="fa-solid fa-database"></i>
              </div>
                        <h3>MongoDB</h3>
                        <p>NoSQL Database</p>
            </div>
                    <div className="tool-card">
                        <div className="app-avatar ps-theme">
                            <i className="fa-solid fa-server"></i>
              </div>
                        <h3>Express.js</h3>
                        <p>Backend Framework</p>
            </div>
                    <div className="tool-card">
                        <div className="app-avatar ai-theme">
                            <i className="fa-brands fa-angular"></i>
              </div>
                        <h3>Angular</h3>
                        <p>Frontend Framework</p>
            </div>
                    <div className="tool-card">
                        <div className="app-avatar ai-theme">
                            <i className="fa-brands fa-node-js"></i>
              </div>
                        <h3>Node.js</h3>
                        <p>Server Runtime</p>
            </div>
                    <div className="tool-card">
                        <div className="app-avatar figma-theme">
                            <i className="fa-solid fa-code"></i>
              </div>
                        <h3>TypeScript</h3>
                        <p>Typed JavaScript</p>
            </div>
                    <div className="tool-card">
                        <div className="app-avatar canva-theme">
                            <i className="fa-brands fa-js"></i>
              </div>
                        <h3>JavaScript ES6+</h3>
                        <p>Core Language</p>
            </div>
                    <div className="tool-card">
                        <div className="app-avatar canva-theme">
                            <i className="fa-brands fa-git-alt"></i>
              </div>
                        <h3>Git &amp; GitHub</h3>
                        <p>Version Control</p>
            </div>
                    <div className="tool-card">
                        <div className="app-avatar id-theme">
                            <i className="fa-solid fa-paper-plane"></i>
              </div>
                        <h3>Postman</h3>
                        <p>API Testing</p>
            </div>
                    <div className="tool-card">
                        <div className="app-avatar ps-theme">
                            <i className="fa-solid fa-arrows-rotate"></i>
              </div>
                        <h3>RxJS</h3>
                        <p>Reactive Programming</p>
            </div>
                    <div className="tool-card">
                        <div className="app-avatar figma-theme">
                            <i className="fa-solid fa-key"></i>
              </div>
                        <h3>REST APIs</h3>
                        <p>API Development</p>
            </div>
          </div>
        </div>

      

      {/* industry demand */}


      
      <section className="industry-demand">
                <div className="container">
                    <div className="industry-header">
                        <span>INDUSTRY DEMAND</span>
                        <h2>
                    MEAN Stack Developers are highly valued in enterprise and large-scale web application development.
                </h2>
                        <p>
                    Enterprises, tech companies, and agencies rely on MEAN stack developers for scalable, maintainable, and enterprise-grade web applications.
                </p>
            </div>
                    <div className="stats-grid">
                        <div className="stat-card">
                            <h3>35%</h3>
                            <p>Growth in MEAN stack careers over the next few years</p>
              </div>
                        <div className="stat-card">
                            <h3>55K+</h3>
                            <p>MEAN stack job opportunities available across India</p>
              </div>
                        <div className="stat-card">
                            <h3>₹5L-15L</h3>
                            <p>Average annual salary range for MEAN developers</p>
              </div>
                        <div className="stat-card">
                            <h3>7 in 10</h3>
                            <p>Enterprises choose Angular for large-scale apps</p>
              </div>
            </div>
                    <div className="industry-footer">
                MEAN stack skills are valuable for enterprise development — Angular's structured framework combined with Node.js creates powerful, scalable applications.
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
                    <small>Find answers about our MEAN Stack Development training, Angular and Node.js technologies, full-stack coding skills, practical projects, and career opportunities in modern web development.</small>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header active">            <h5>What Is The Difference Between MEAN Stack &amp; Traditional Web Development?</h5></div>
                    <div className="accordion-content show">
                        <p>MEAN Stack uses modern JavaScript technologies like MongoDB, Express.js, Angular, and Node.js to build fast, scalable, and dynamic web applications with both frontend and backend integration.</p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">            <h5>Why Is MEAN Stack Popular In Modern Web Development?</h5></div>
                    <div className="accordion-content">
                        <p>MEAN Stack allows developers to use JavaScript for both frontend and backend development, making application development faster, scalable, and more efficient for modern businesses and startups.</p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">            <h5>Will I Build Real Full Stack Applications During Training?</h5></div>
                    <div className="accordion-content">
                        <p>Yes, students work on practical web applications, REST APIs, database integration projects, and responsive frontend-backend development assignments for real-world experience.</p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">            <h5>Is This Course Suitable For Beginners In Programming?</h5></div>
                    <div className="accordion-content">
                        <p>Absolutely. The training starts from web development fundamentals and gradually moves towards advanced frontend and backend technologies used in MEAN Stack development.</p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">            <h5>What Career Opportunities Are Available After Learning MEAN Stack?</h5></div>
                    <div className="accordion-content">
                        <p>After completing this program, learners can explore opportunities in Full Stack Development, Web Application Development, Frontend Development, Backend Development, and Software Engineering roles.</p>
            </div>
          </div>
        </div>

      

      {/* <PopUp Form */}

    </>
  );
}
