import Link from "next/link";
import PageInteractiveHandler from "@/components/PageInteractiveHandler";

export const metadata = {
  "title": "Online Ethical Hacking Course in India | Netcoder Technology",
  "description": "Join Netcoder Technology’s Online Ethical Hacking Course and learn cyber security, penetration testing, Linux, network security, vulnerability assessment, and ethical hacking through live practical training.",
  "openGraph": {
    "title": "Online Ethical Hacking Course in India | Netcoder Technology",
    "description": "Join Netcoder Technology’s Online Ethical Hacking Course and learn cyber security, penetration testing, Linux, network security, vulnerability assessment, and ethical hacking through live practical training.",
    "url": "https://www.netcoder.in/Ethical-hacking-online",
    "siteName": "Netcoder Technology",
    "type": "website"
  },
  "alternates": {
    "canonical": "https://www.netcoder.in/Ethical-hacking-online"
  }
};

export default function EthicalHackingOnlinePage() {
  return (
    <>
      <PageInteractiveHandler pageSlug="ethical-hacking-online" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"Course\",\"name\":\"Online Ethical Hacking & Cyber Security Training Program\",\"description\":\"Professional online Ethical Hacking and Cyber Security training covering penetration testing, Linux, vulnerability assessment, network security, and cyber defense with practical labs.\",\"provider\":{\"@type\":\"Organization\",\"name\":\"Netcoder Technology\",\"sameAs\":\"https://www.netcoder.in/\"}}" }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Home\",\"item\":\"https://www.netcoder.in/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Online Courses\",\"item\":\"https://www.netcoder.in/online-courses/\"},{\"@type\":\"ListItem\",\"position\":3,\"name\":\"Online Ethical Hacking Course\",\"item\":\"https://www.netcoder.in/Ethical-hacking-online.php\"}]}" }}
      />
      <section className="hero-section-custom">
                <div className="container">
                    <div className="row">
            
            {/* IMAGE */}

                        <div className="col hero-image-box-wrapper">
                            <div className="hero-image-box">
                                <div className="image-holder">
                                    <img src="/images/Cyber attack-pana.png" className="main-hero-img" alt="" loading="lazy" decoding="async" />
                  </div>
                
                {/* FLOATING TAGS */}

                                <div className="floating-tag tag1">Kali Linux </div>
                                <div className="floating-tag tag2">Pen Testing </div>
                                <div className="floating-tag tag3">Networking </div>
                                <div className="floating-tag tag4">Google Ads </div>
                                <div className="floating-tag tag5">Exploits </div>
                </div>
              </div>
            
            {/* TEXT */}

                        <div className="col">
                            <div className="hero-content-box">
                                <h5>Online Ethical Hacking </h5>
                                <h2>Mentorship Program</h2>
                                <p>Build practical cyber security and ethical hacking skills with Netcoder Technology’s Online Ethical Hacking course. Learn penetration testing, Linux, network security, cyber defense techniques, and vulnerability assessment through live online classes, practical labs, and industry-focused training from anywhere in India.</p>
                                <ul>
                                    <li>
                                        <img src="/images/Group 643.svg" loading="lazy" decoding="async" />
                                20-Week Structured Program
                            </li>
                                    <li>
                                        <img src="/images/Group 643.svg" loading="lazy" decoding="async" />
                                Hands-on Cyber Security Labs
                            </li>
                                    <li>
                                        <img src="/images/Group 643.svg" loading="lazy" decoding="async" />
                                Real-Time Hacking Simulations
                            </li>
                                    <li>
                                        <img src="/images/Group 643.svg" loading="lazy" decoding="async" />
                                Placement &amp; Certification Support
                            </li>
                  </ul>
                                <div className="campus-hero-actions">
                                    <a href="/contact" className="color-btn" aria-label="Get started with ethical hacking online course">
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
            <h2><span>Ethical Hacking Course?</span></h2>

          <p>This course is ideal for students, IT professionals, and tech enthusiasts who want to build a career in
                cyber security.</p>

            <p>If you are curious about how hackers think, want to secure systems, or aim to work in ethical hacking,
                penetration testing, or security analysis, this program is for you.</p>
        </div>
    </div> */}


      
      <section className="internship-section container">
                <div className="wrapper">
          
          {/* Heading */}

                    <div className="section-heading">
                        <h2>
                    Ethical Hacking:
                                  <span>Highlights</span>
              </h2>
                        <p>
                    Discover the key features that make this Ethical Hacking course practical,
                    interactive, and career-focused.
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
                                <h3>hands-on hacking labs</h3>
                </div>
                            <p className="card-desc">Practice real hacking techniques in a safe environment.</p>
                            <ul className="custom-list">
                                <li>Live attack simulations</li>
                                <li>Capture The Flag (CTF) challenges</li>
                </ul>
              </div>
            
            {/* Card 2 */}

                        <div className="intern-card">
                            <div className="card-top">
                                <div className="icon-box">
                                    <i className="fa-solid fa-laptop-code"></i>
                  </div>
                                <h3>industry tools &amp; techniques</h3>
                </div>
                            <p className="card-desc">Work with tools used by security professionals.</p>
                            <ul className="custom-list">
                                <li>Kali Linux, Metasploit</li>
                                <li>Wireshark, Burp Suite</li>
                </ul>
              </div>
            
            {/* Card 3 */}

                        <div className="intern-card">
                            <div className="card-top">
                                <div className="icon-box">
                                    <i className="fa-solid fa-users"></i>
                  </div>
                                <h3>real-world scenarios</h3>
                </div>
                            <p className="card-desc">Understand real cyber attack cases.</p>
                            <ul className="custom-list">
                                <li>Vulnerability assessment</li>
                                <li>Security auditing</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

      
      <div className="container break left">
                <img src="/images/which-course.png" alt="Need guidance" loading="lazy" decoding="async" />
                <div>
                    <h2>Want To Become An Ethical Hacker?</h2>
                    <p>Build practical cybersecurity and ethical hacking skills with Netcoder Technology’s Online Ethical Hacking Mentorship Program. Learn network security, penetration testing, Kali Linux, vulnerability assessment, and modern cyber defense techniques through live mentorship, practical assignments, and real-world security learning designed for aspiring cybersecurity professionals.</p>
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
        
        {/* ITEM 1 */}

                <div className="timeline-item">
                    <div className="circle">1</div>
                    <div className="timeline-card">
                        <h3>Networking               <span>Fundamentals</span></h3>
                        <p>Learn how networks work, protocols, IP addressing, and security basics.</p>
            </div>
          </div>
        
        {/* ITEM 2 */}

                <div className="timeline-item">
                    <div className="circle">2</div>
                    <div className="timeline-card">
                        <h3>System               <span>Security</span></h3>
                        <p>Understand operating systems, vulnerabilities, and system hardening.</p>
            </div>
          </div>
        
        {/* ITEM 3 */}

                <div className="timeline-item">
                    <div className="circle">3</div>
                    <div className="timeline-card">
                        <h3>Ethical               <span>Hacking</span></h3>
                        <p>Learn penetration testing, scanning, and exploitation techniques.</p>
            </div>
          </div>
        
        {/* ITEM 4 */}

                <div className="timeline-item">
                    <div className="circle">4</div>
                    <div className="timeline-card">
                        <h3>Web App               <span>Security</span></h3>
                        <p>Identify vulnerabilities like XSS, SQL Injection, CSRF.</p>
            </div>
          </div>
        
        {/* ITEM 5 */}

                <div className="timeline-item">
                    <div className="circle">5</div>
                    <div className="timeline-card">
                        <h3>Advanced               <span>Security</span></h3>
                        <p>Work on real-world cyber attacks and defense strategies.</p>
            </div>
          </div>
        
        {/* ITEM 6 */}

                <div className="timeline-item">
                    <div className="circle">6</div>
                    <div className="timeline-card">
                        <h3>Career               <span>Preparation</span></h3>
                        <p>Prepare for interviews, certifications, and job roles.</p>
            </div>
          </div>
        </section>

      
      <div className="container">
        
        {/* Header */}

                <div className="container courseCurriculum">
                    <div>
                        <h2 className="dm-heading">
                    Ethical Hacking               <span>Course Curriculum</span>
              </h2>
                        <p className="dm-desc">
                    A complete overview of our Ethical Hacking program, covering cybersecurity fundamentals, network
                    security,
                    penetration testing, vulnerability assessment, tools, and real-world security projects.
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
                        <span>Networking &amp; Cyber Security Basics</span>
                        <span className="text-muted">• 6 Live Sessions</span>
                        <span className="text-muted">• 2 Projects</span>
                        <span className="text-muted">• 2 Case Studies</span>
            </div>
                    <p className="summary-text">
                This milestone builds a strong foundation in cyber security and networking by introducing core concepts
                such as network architecture, protocols, system security, and ethical hacking fundamentals. You will
                understand how systems communicate, how vulnerabilities arise, and how attackers think, setting the base
                for advanced penetration testing and security practices.
            </p>
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
                                <h3 className="card-title">Networking Fundamentals &amp;
                                              <span className="highlight-orange">Security Basics</span>
                  </h3>
                                <ul className="course-list">
                                    <li>Introduction to Cyber Security &amp; Ethical Hacking</li>
                                    <li>Types of Hackers (White Hat, Black Hat, Grey Hat)</li>
                                    <li>Networking Basics (LAN, WAN, TCP/IP, OSI Model)</li>
                                    <li>IP Addressing, DNS, DHCP &amp; Ports</li>
                                    <li>Common Network Attacks (MITM, DoS, Phishing)</li>
                  </ul>
                </div>
              </div>
            
            {/* WEEK 2 */}

                        <div className="card-1">
                            <div className="week-card">
                                <div className="week-label">Week                   <span>2</span></div>
                                <h3 className="card-title">Linux &amp;
                                              <span className="highlight-orange">Hacking Environment</span>
                  </h3>
                                <ul className="course-list">
                                    <li>Introduction to Linux for Hackers</li>
                                    <li>Kali Linux Installation &amp; Setup</li>
                                    <li>Linux Commands &amp; File System Navigation</li>
                                    <li>Setting up Virtual Lab (VirtualBox / VMware)</li>
                                    <li>Introduction to Ethical Hacking Tools</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      

      {/* Milestone 2 */}


      
      <div className="container milestone-container">
                <div className="milestone-header">
                    <h2>Milestone 2 - Duration:             <span className="duration-text">5 weeks</span></h2>
                    <div className="feature-bar mt-3">
                        <span>Ethical Hacking &amp; Penetration Testing</span>
                        <span className="text-muted">• 6 Live Sessions</span>
                        <span className="text-muted">• 2 Projects</span>
            </div>
                    <p className="summary-text">
                This milestone introduces core ethical hacking techniques and penetration testing methodologies. You
                will learn how attackers gather information, scan systems, and identify vulnerabilities using
                industry-standard tools and techniques.
            </p>
                    <button className="toggle-btn" type="button" aria-expanded="false">
                        <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
                <div className="collapse" id="weekContent2">
                    <div className="milestonecards row">
            
            {/* WEEK 1 */}

                        <div className="card-1">
                            <div className="week-card">
                                <div className="week-label">Week                   <span>1</span></div>
                                <h3 className="card-title">Reconnaissance &amp;                   <span className="highlight-orange">Footprinting</span></h3>
                                <ul className="course-list">
                                    <li>Passive &amp; active reconnaissance techniques</li>
                                    <li>Information gathering using OSINT tools</li>
                                    <li>Domain, DNS &amp; IP intelligence analysis</li>
                                    <li>Understanding attack surface mapping</li>
                                    <li>Target profiling techniques</li>
                  </ul>
                </div>
              </div>
            
            {/* WEEK 2 */}

                        <div className="card-1">
                            <div className="week-card">
                                <div className="week-label">Week                   <span>2</span></div>
                                <h3 className="card-title">Scanning &amp;                   <span className="highlight-orange">Vulnerability Analysis</span>
                  </h3>
                                <ul className="course-list">
                                    <li>Network scanning using Nmap</li>
                                    <li>Identifying open ports &amp; services</li>
                                    <li>Vulnerability scanning tools</li>
                                    <li>Analyzing system weaknesses</li>
                                    <li>Introduction to exploitation</li>
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
                        <span>Web Application Security</span>
                        <span className="text-muted">• 12 Live Sessions</span>
            </div>
                    <p className="summary-text">
                This milestone focuses on web application security and common vulnerabilities. You will learn how
                attackers exploit websites and how to secure applications using best security practices.
            </p>
                    <button className="toggle-btn" type="button" aria-expanded="false">
                        <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
                <div className="collapse" id="weekContent3">
                    <div className="milestonecards row">
            
            {/* WEEK 1 */}

                        <div className="card-1">
                            <div className="week-card">
                                <div className="week-label">Week                   <span>2</span></div>
                                <h3 className="card-title">XSS, CSRF &amp;                   <span className="highlight-orange">Web Attacks</span></h3>
                                <ul className="course-list">
                                    <li>Cross-Site Scripting (XSS)</li>
                                    <li>Cross-Site Request Forgery (CSRF)</li>
                                    <li>Session hijacking basics</li>
                                    <li>Client-side vulnerabilities</li>
                                    <li>Secure coding practices</li>
                  </ul>
                </div>
              </div>
            
            {/* WEEK 2 */}

                        <div className="card-1">
                            <div className="week-card">
                                <div className="week-label">Week                   <span>1</span></div>
                                <h3 className="card-title">OWASP Top 10 &amp;                   <span className="highlight-orange">SQL Injection</span></h3>
                                <ul className="course-list">
                                    <li>Understanding OWASP Top 10</li>
                                    <li>SQL Injection attacks</li>
                                    <li>Database exploitation basics</li>
                                    <li>Input validation techniques</li>
                                    <li>Preventing SQL vulnerabilities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      

      {/* Milestone 4 */}


      
      <div className="container milestone-container">
                <div className="milestone-header">
                    <h2>Milestone 4 - Duration:             <span className="duration-text">4 weeks</span></h2>
                    <div className="feature-bar mt-3">
                        <span>Advanced Hacking Techniques</span>
                        <span className="text-muted">• 12 Live Sessions</span>
            </div>
                    <p className="summary-text">
                This milestone dives into advanced ethical hacking techniques including exploitation, wireless attacks,
                and social engineering strategies used in real-world cyber attacks.
            </p>
                    <button className="toggle-btn" type="button" aria-expanded="false">
                        <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
                <div className="collapse" id="weekContent4">
                    <div className="milestonecards row">
            
            {/* WEEK 1 */}

                        <div className="card-1">
                            <div className="week-card">
                                <div className="week-label">Week                   <span>1</span></div>
                                <h3 className="card-title">Exploitation &amp;                   <span className="highlight-orange">Metasploit Framework</span>
                  </h3>
                                <ul className="course-list">
                                    <li>Introduction to exploitation</li>
                                    <li>Working with Metasploit</li>
                                    <li>Payloads &amp; reverse shells</li>
                                    <li>Privilege escalation basics</li>
                                    <li>Post-exploitation techniques</li>
                  </ul>
                </div>
              </div>
            
            {/* WEEK 2 */}

                        <div className="card-1">
                            <div className="week-card">
                                <div className="week-label">Week                   <span>2</span></div>
                                <h3 className="card-title">Wireless Hacking &amp;                   <span className="highlight-orange">Social
                                Engineering</span></h3>
                                <ul className="course-list">
                                    <li>Wi-Fi security vulnerabilities</li>
                                    <li>Password cracking techniques</li>
                                    <li>Wireless attack tools</li>
                                    <li>Social engineering attacks</li>
                                    <li>Human psychology in hacking</li>
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
                        <span>Security Analyst &amp; Career Readiness</span>
                        <span className="text-muted">• 6 Live Sessions</span>
            </div>
                    <p className="summary-text">
                This final milestone prepares you for real-world cyber security roles. You will learn threat analysis,
                incident response, and build your career profile for ethical hacking jobs.
            </p>
                    <button className="toggle-btn" type="button" aria-expanded="false">
                        <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
                <div className="collapse" id="weekContent5">
                    <div className="milestonecards row">
                        <div className="card-1">
                            <div className="week-card">
                                <div className="week-label">Week                   <span>1</span></div>
                                <h3 className="card-title">Security Monitoring &amp;                   <span className="highlight-orange">Incident
                                Response</span></h3>
                                <ul className="course-list">
                                    <li>Threat detection basics</li>
                                    <li>Incident response lifecycle</li>
                                    <li>Log analysis &amp; monitoring</li>
                                    <li>SIEM introduction</li>
                                    <li>Security reporting</li>
                  </ul>
                </div>
              </div>
            
            {/* WEEK 2 */}

                        <div className="card-1">
                            <div className="week-card">
                                <div className="week-label">Week                   <span>2</span></div>
                                <h3 className="card-title">Career Preparation &amp;                   <span className="highlight-orange">Certifications</span>
                  </h3>
                                <ul className="course-list">
                                    <li>Resume building</li>
                                    <li>Portfolio creation</li>
                                    <li>Mock interviews</li>
                                    <li>CEH &amp; Security+ guidance</li>
                                    <li>Cyber security career roadmap</li>
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
                            <p className="track-desc">Perfect for beginners, freelancers &amp; business owners to grow digitally</p>
                            <p className="old-price">₹4,999 Per Month</p>
                            <h3 className="new-price">
                        ₹2,999 Per Month
                                        <span className="tax">Inclusive of all taxes</span>
                </h3>
                            <ul className="track-list">
                                <li>20 Weeks Ethical Hacking Mentorship Program</li>
                                <li>20+ Real-World Security Projects &amp; Certification</li>
                                <li>Hands-on Practice with Kali Linux &amp; Tools</li>
                                <li>Community Access &amp; Expert Mentorship</li>
                                <li>Bug Bounty &amp; Freelancing Guidance</li>
                </ul>
                            <div className="btn-wrap">
                
                {/* <button className="color-btn">Read More</button> */}

                </div>
              </div>
            
            {/* Career Track */}

                        <div className="track-card">
                            <h4 className="track-title">Career Track</h4>
                            <p className="track-desc">Job-focused program with placement support &amp; advanced training</p>
                            <p className="old-price">₹6,999 Per Month</p>
                            <h3 className="new-price">
                        ₹3,999 Per Month
                                        <span className="tax">Inclusive of all taxes</span>
                </h3>
                            <ul className="track-list">
                                <li>20 Weeks Advanced Ethical Hacking Program</li>
                                <li>30+ Industry-Level Projects &amp; Certification</li>
                                <li>100% Placement Assistance Program</li>
                                <li>Advanced Penetration Testing Training</li>
                                <li>Resume, LinkedIn &amp; Interview Preparation</li>
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
                                    <td>                    <strong>₹2,999 Per Month</strong></td>
                                    <td>                    <strong>₹3,999 Per Month</strong></td>
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
                    <small>Get answers about our Online Ethical Hacking Course, cybersecurity training, penetration testing,
                network security, and career opportunities in ethical hacking.</small>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header active">
                        <h5>Who can join Online Ethical Hacking course?</h5>
            </div>
                    <div className="accordion-content show">
                        <p>This Online Ethical Hacking course is ideal for beginners, students, IT professionals, cybersecurity
                    enthusiasts, and anyone who wants to learn how to protect systems and networks from cyber attacks.
                </p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">
                        <h5>Do I need any experience for Ethical Hacking training?</h5>
            </div>
                    <div className="accordion-content">
                        <p>No prior experience is required. We start with basics like networking, Linux fundamentals, and
                    cybersecurity concepts, then move to advanced ethical hacking and penetration testing techniques.
                </p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">
                        <h5>What will I learn in Ethical Hacking course online?</h5>
            </div>
                    <div className="accordion-content">
                        <p>You will learn network security, penetration testing, vulnerability assessment, web application
                    security, Kali Linux tools, password cracking, and real-world cyber attack prevention techniques.
                </p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">
                        <h5>Is Ethical Hacking a good career option?</h5>
            </div>
                    <div className="accordion-content">
                        <p>Yes, Ethical Hacking is a high-demand career in cybersecurity. Organizations need ethical hackers to
                    secure their systems, prevent data breaches, and protect sensitive information from cyber threats.
                </p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">
                        <h5>Will I work on real projects during training?</h5>
            </div>
                    <div className="accordion-content">
                        <p>Yes, you will work on real-world scenarios such as penetration testing labs, vulnerability scanning,
                    network security analysis, and simulated cyber attack environments for practical experience.</p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">
                        <h5>Will I get a certificate after completion?</h5>
            </div>
                    <div className="accordion-content">
                        <p>Yes, you will receive an Ethical Hacking certification after completing the course, which helps in
                    job opportunities, freelancing, and building a strong cybersecurity career.</p>
            </div>
          </div>
                <div className="accordion-item">
                    <div className="accordion-header">
                        <h5>Do you provide internship or job assistance?</h5>
            </div>
                    <div className="accordion-content">
                        <p>Yes, we provide internship opportunities, resume building, interview preparation, and job assistance
                    for roles like Ethical Hacker, Security Analyst, and Penetration Tester.</p>
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
