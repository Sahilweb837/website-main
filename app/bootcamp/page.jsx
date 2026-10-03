import Link from "next/link";
import PageInteractiveHandler from "@/components/PageInteractiveHandler";

export const metadata = {
  "title": "Frontend Developer Bootcamp | Netcoder Technology",
  "description": "Professional IT training and digital services in Dharamshala at Netcoder Technology.",
  "openGraph": {
    "title": "Frontend Developer Bootcamp | Netcoder Technology",
    "description": "Professional IT training and digital services in Dharamshala at Netcoder Technology.",
    "url": "https://www.netcoder.in/bootcamp",
    "siteName": "Netcoder Technology",
    "type": "website"
  }
};

export default function BootcampPage() {
  return (
    <>
      <PageInteractiveHandler pageSlug="bootcamp" />
      <link rel="stylesheet" href="/css/bootcamp.css" />

      <nav id="nav">
                <div className="nav-inner">
                    <a href="#hero" className="logo">            <img src="/bootcampimages/logo.png" alt="Netcoder Technology" /></a>
                    <div className="nav-cta">
                        <a href="/contact" className="btn btn-primary btn-sm">Contact Us               <i className="fa-solid fa-arrow-right"></i></a>
            </div>
          </div>
        </nav>

      

      {/* ===== HERO ===== */}


      
      <section id="hero">
                <div className="container hero-grid">
                    <div className="hero-copy">
                        <span className="eyebrow">Frontend Developer Bootcamp</span>
                        <h1>Build Interfaces People               <em>Love to Use</em></h1>
                        <p className="sub">Learn to turn ideas into fast, responsive websites and React products through guided practice,
          real client briefs, code reviews, a portfolio you can show recruiters, and dedicated career support.</p>
                        <div className="hero-ctas">
                            <a href="#" className="btn btn-primary" id="applyNowBtn">Apply Now                 <i className="fa-solid fa-arrow-right"></i></a>
                            <a href="https://wa.me/917590832055?text=Hi%20Netcoder%2C%20I%20want%20to%20book%20free%20career%20counselling" target="_blank" rel="noopener" className="btn btn-ghost">Book Free Career Counselling</a>
              </div>
                        <div className="avatar-proof">
                            <div className="avatar-stack">
                                <img src="/bootcampimages/abhishek.png" alt="Student" loading="lazy" />
                                <img src="/bootcampimages/sapna.jpg" alt="Student" loading="lazy" />
                                <img src="/bootcampimages/shivdeep.png" alt="Student" loading="lazy" />
                                <img src="/bootcampimages/muskan.png" alt="Student" loading="lazy" />
                </div>
                            <div className="ap-text">
                                <b>500+ students trained</b>
                                <span>                  <i className="fa-solid fa-star"></i>                  <i className="fa-solid fa-star"></i>                  <i className="fa-solid fa-star"></i>                  <i className="fa-solid fa-star"></i>                  <i className="fa-solid fa-star"></i> 4.9/5 average rating</span>
                </div>
              </div>
                        <div className="trust-row">
                            <div className="trust-item">                <i className="fa-solid fa-layer-group"></i> Responsive UI Systems</div>
                            <div className="trust-item">                <i className="fa-solid fa-code-branch"></i> Git-Based Workflows</div>
                            <div className="trust-item">                <i className="fa-solid fa-briefcase"></i> Portfolio &amp; Placement Support</div>
              </div>
            </div>
                    <div className="hero-visual">
                        <div className="browser-mock">
                            <div className="browser-topbar">
                                <span className="dot"></span>                <span className="dot"></span>                <span className="dot"></span>
                                <div className="browser-url" id="heroPortfolioUrl">                  <i className="fa-solid fa-lock"></i> netcoder.in/portfolio/aditya</div>
                </div>
                            <div className="hero-slider" aria-live="polite">
                                <div className="hero-slide is-active" data-name="Aditya Thakur" data-url="netcoder.in/portfolio/aditya">
                                    <div className="browser-body">
                                        <div className="bb-profile">
                                            <img src="/bootcampimages/aditya.jpg" alt="Aditya Thakur portfolio" loading="lazy" />
                                            <div>
                                                <h5>Aditya  THAKUR</h5>
                                                <p>Full Stack Developer - Batch of 2026</p>
                        </div>
                                            <span className="bb-badge">                        <i className="fa-solid fa-check"></i> Hired</span>
                      </div>
                                        <div className="bb-skills">
                                            <div className="bb-skill-row">                        <span>React</span>
                                                <div className="bb-bar">                          <i style={{"--w":"92%"}}></i></div>                        <span className="bb-label">92%</span>
                        </div>
                                            <div className="bb-skill-row">                        <span>JavaScript</span>
                                                <div className="bb-bar">                          <i style={{"--w":"88%"}}></i></div>                        <span className="bb-label">88%</span>
                        </div>
                                            <div className="bb-skill-row">                        <span>Responsive UI</span>
                                                <div className="bb-bar">                          <i style={{"--w":"80%"}}></i></div>                        <span className="bb-label">80%</span>
                        </div>
                      </div>
                                        <div className="bb-projects">
                                            <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=300&h=180&q=80" alt="Aditya's React storefront project" loading="lazy" />
                                            <img src="https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=300&h=180&q=80" alt="Aditya's responsive landing page" loading="lazy" />
                                            <img src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=300&h=180&q=80" alt="Aditya's developer portfolio" loading="lazy" />
                      </div>
                    </div>
                  </div>
                                <div className="hero-slide" data-name="Sapna" data-url="netcoder.in/portfolio/sapna">
                                    <div className="browser-body">
                                        <div className="bb-profile">
                                            <img src="/bootcampimages/sapna.jpg" alt="Sapna portfolio" loading="lazy" />
                                            <div>
                                                <h5>Sapna</h5>
                                                <p>Frontend Developer - Batch of 2026</p>
                        </div>
                                            <span className="bb-badge">                        <i className="fa-solid fa-check"></i> Hired</span>
                      </div>
                                        <div className="bb-skills">
                                            <div className="bb-skill-row">                        <span>HTML</span>
                                                <div className="bb-bar">                          <i style={{"--w":"90%"}}></i></div>                        <span className="bb-label">90%</span>
                        </div>
                                            <div className="bb-skill-row">                        <span>JavaScript</span>
                                                <div className="bb-bar">                          <i style={{"--w":"85%"}}></i></div>                        <span className="bb-label">85%</span>
                        </div>
                                            <div className="bb-skill-row">                        <span>Design Systems</span>
                                                <div className="bb-bar">                          <i style={{"--w":"87%"}}></i></div>                        <span className="bb-label">87%</span>
                        </div>
                      </div>
                                        <div className="bb-projects">
                                            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=300&h=180&q=80" alt="Sapna's analytics dashboard project" loading="lazy" />
                                            <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=300&h=180&q=80" alt="Sapna's collaborative web app" loading="lazy" />
                                            <img src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=300&h=180&q=80" alt="Sapna's product interface project" loading="lazy" />
                      </div>
                    </div>
                  </div>
                                <div className="hero-slide" data-name="Shivdeep singh" data-url="netcoder.in/portfolio/shivdeep">
                                    <div className="browser-body">
                                        <div className="bb-profile">
                                            <img src="/bootcampimages/Shivdeep.png" alt="Shivdeep singh portfolio" loading="lazy" />
                                            <div>
                                                <h5>Shivdeep singh</h5>
                                                <p>Full Stack Developer - Batch of 2026</p>
                        </div>
                                            <span className="bb-badge">                        <i className="fa-solid fa-check"></i> Hired</span>
                      </div>
                                        <div className="bb-skills">
                                            <div className="bb-skill-row">                        <span>HTML &amp; CSS</span>
                                                <div className="bb-bar">                          <i style={{"--w":"94%"}}></i></div>                        <span className="bb-label">94%</span>
                        </div>
                                            <div className="bb-skill-row">                        <span>Technical Support</span>
                                                <div className="bb-bar">                          <i style={{"--w":"89%"}}></i></div>                        <span className="bb-label">89%</span>
                        </div>
                                            <div className="bb-skill-row">                        <span>Issue Resolution</span>
                                                <div className="bb-bar">                          <i style={{"--w":"86%"}}></i></div>                        <span className="bb-label">86%</span>
                        </div>
                      </div>
                                        <div className="bb-projects">
                                            <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=300&h=180&q=80" alt="Shivdeep's infrastructure monitoring project" loading="lazy" />
                                            <img src="https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=300&h=180&q=80" alt="Shivdeep's service operations workspace" loading="lazy" />
                                            <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=300&h=180&q=80" alt="Shivdeep's technical support dashboard" loading="lazy" />
                      </div>
                    </div>
                  </div>
                </div>
                            <div className="hero-slider-dots" aria-label="Student Profile Slider">
                                <button className="hero-dot is-active" type="button" aria-label="Show Aditya Thakur profile"></button>
                                <button className="hero-dot" type="button" aria-label="Show Sapna profile"></button>
                                <button className="hero-dot" type="button" aria-label="Show Shivdeep Singh profile"></button>
                </div>
              </div>
                        <div className="float-chip chip-offer">
                            <div className="ico">                <i className="fa-solid fa-file-signature"></i></div>
                            <div className="txt">                <b>Offer Received</b>                <span>₹6.2 LPA - Frontend Dev</span></div>
              </div>
                        <div className="float-chip chip-mentor">
                            <img className="ico" src="https://i.pravatar.cc/80?img=14" alt="Mentor" loading="lazy" />
                            <div className="txt">                <b>1:1 Mentorship</b>                <span>Live doubt-clearing</span></div>
              </div>
                        <div className="float-chip chip-progress">
                            <div className="ico">                <i className="fa-solid fa-chart-line"></i></div>
                            <div className="txt">                <b>Career Readiness</b>                <span>92% portfolio complete</span></div>
              </div>
            </div>
          </div>
        </section>

      

      {/* ===== TRUST BAR ===== */}


      
      <section id="trustbar">
                <div className="container trust-grid">
                    <div className="trust-stat">
                        <div className="num" data-count="500" data-suffix="+">0</div>
                        <div className="lbl">Students Trained</div>
            </div>
                    <div className="trust-stat">
                        <div className="num" data-count="50" data-suffix="+">0</div>
                        <div className="lbl">Projects Delivered</div>
            </div>
                    <div className="trust-stat">
                        <div className="num" data-count="120" data-suffix="+">0</div>
                        <div className="lbl">Internship Placements</div>
            </div>
                    <div className="trust-stat">
                        <div className="num" data-count="10" data-suffix="+">0</div>
                        <div className="lbl">Industry Mentors</div>
            </div>
                    <div className="trust-stat">
                        <div className="num" data-count="300" data-suffix="+">0</div>
                        <div className="lbl">Portfolios Built</div>
            </div>
                    <div className="trust-stat">
                        <div className="num" data-count="100" data-suffix="%">0</div>
                        <div className="lbl">Placement Support Rate</div>
            </div>
          </div>
        </section>

      

      {/* ===== WHO CAN JOIN ===== */}


      
      <section className="section" id="who">
                <div className="container">
                    <div className="section-head reveal">
                        <div>              <span className="eyebrow">eligibility</span>
                            <h2 className="section-title">Who Can                 <b>Join</b> the Bootcamp</h2>
              </div>
                        <p className="section-sub">No matter where you're starting from, there's a track built for your background and your
          goals.</p>
            </div>
                    <div className="who-grid stagger">
                        <div className="who-card card reveal" style={{"--i":"0"}}>
                            <div className="ic">                <i className="fa-solid fa-graduation-cap"></i></div>
                            <h4>Students</h4>
                            <p>Build job-ready skills alongside your degree.</p>
              </div>
                        <div className="who-card card reveal" style={{"--i":"1"}}>
                            <div className="ic">                <i className="fa-solid fa-user-tie"></i></div>
                            <h4>Fresh Graduates</h4>
                            <p>Turn your degree into a portfolio recruiters notice.</p>
              </div>
                        <div className="who-card card reveal" style={{"--i":"2"}}>
                            <div className="ic">                <i className="fa-solid fa-users"></i></div>
                            <h4>Job Seekers &amp; Career Switchers</h4>
                            <p>Stand out with real projects and a mentored path into tech.</p>
              </div>
            </div>
          </div>
        </section>

      

      {/* ===== PROGRAMS ===== */}


      
      <section className="section" id="programs">
                <div className="container">
                    <div className="section-head reveal">
                        <div>              <span className="eyebrow">choose your track</span>
                            <h2 className="section-title">Frontend                 <b>Learning Tracks</b></h2>
              </div>
                        <p className="section-sub">A focused path from your first semantic page to a deployed React portfolio, with
          mentorship and placement support at every stage.</p>
            </div>
                    <div className="programs-grid stagger" id="programsGrid"></div>
          </div>
        </section>

      

      {/* ===== WHY NETCODER ===== */}


      
      <section className="section" id="why">
                <div className="container">
                    <div className="section-head reveal">
                        <div>              <span className="eyebrow">the difference</span>
                            <h2 className="section-title">Why Students Choose                 <b>Netcoder</b></h2>
              </div>
            </div>
                    <div className="benefits-grid stagger">
                        <div className="benefit-card card reveal" style={{"--i":"0"}}>
                            <div className="ic">                <i className="fa-solid fa-display"></i></div>
                            <h4>Live Practical Training</h4>
              </div>
                        <div className="benefit-card card reveal" style={{"--i":"1"}}>
                            <div className="ic">                <i className="fa-solid fa-user-graduate"></i></div>
                            <h4>Industry Mentors</h4>
              </div>
                        <div className="benefit-card card reveal" style={{"--i":"2"}}>
                            <div className="ic">                <i className="fa-solid fa-handshake"></i></div>
                            <h4>Real Client Projects</h4>
              </div>
                        <div className="benefit-card card reveal" style={{"--i":"3"}}>
                            <div className="ic">                <i className="fa-solid fa-building"></i></div>
                            <h4>Internship Opportunities</h4>
              </div>
                        <div className="benefit-card card reveal" style={{"--i":"4"}}>
                            <div className="ic">                <i className="fa-solid fa-folder-open"></i></div>
                            <h4>Portfolio Development</h4>
              </div>
                        <div className="benefit-card card reveal" style={{"--i":"0"}}>
                            <div className="ic">                <i className="fa-solid fa-file-lines"></i></div>
                            <h4>Resume Building</h4>
              </div>
                        <div className="benefit-card card reveal" style={{"--i":"1"}}>
                            <div className="ic">                <i className="fa-solid fa-comments"></i></div>
                            <h4>Mock Interviews</h4>
              </div>
                        <div className="benefit-card card reveal" style={{"--i":"2"}}>
                            <div className="ic">                <i className="fa-solid fa-compass"></i></div>
                            <h4>Career Guidance</h4>
              </div>
                        <div className="benefit-card card reveal" style={{"--i":"3"}}>
                            <div className="ic">                <i className="fa-solid fa-people-arrows"></i></div>
                            <h4>Freelancing Support</h4>
              </div>
                        <div className="benefit-card card reveal" style={{"--i":"4"}}>
                            <div className="ic">                <i className="fa-brands fa-linkedin"></i></div>
                            <h4>LinkedIn Optimization</h4>
              </div>
            </div>
          </div>
        </section>

      

      {/* ===== CAREER ACCELERATOR JOURNEY ===== */}


      
      <section className="section" id="journey">
                <div className="container">
                    <div className="section-head reveal">
                        <div>
                            <span className="eyebrow">Career Roadmap</span>
                            <h2 className="section-title">
          Your 6-Month Career                 <b>Transformation Journey</b>
                </h2>
              </div>
                        <p className="section-sub">
        Go from beginner to industry-ready professional through structured learning,
        real-world projects, resume building, interview preparation, internship experience,
        and placement support.
      </p>
            </div>
                    <div className="timeline" id="timeline">
                        <div className="timeline-fill" id="timelineFill"></div>
                        <div className="tl-item">
                            <div className="tl-dot">01</div>
                            <span className="m">Month 01</span>
                            <h4>Career Foundation &amp; Professional Growth</h4>
                            <p>
          Start your journey with career planning, industry orientation, communication
          skills, Git &amp; GitHub, LinkedIn profile setup, and professional mindset development.
          Build a strong foundation for long-term success in the tech industry.
        </p>
              </div>
                        <div className="tl-item">
                            <div className="tl-dot">02</div>
                            <span className="m">Month 02</span>
                            <h4>Skill Development &amp; Portfolio Projects</h4>
                            <p>
          Learn industry-relevant technologies and begin creating practical projects.
          Understand modern development workflows, responsive design principles,
          and collaborative project practices used in real companies.
        </p>
              </div>
                        <div className="tl-item">
                            <div className="tl-dot">03</div>
                            <span className="m">Month 03</span>
                            <h4>Advanced Development &amp; Real-World Applications</h4>
                            <p>
          Build complete applications using modern tools and frameworks.
          Work with databases, APIs, authentication systems, deployment platforms,
          and real-world business requirements to strengthen your technical expertise.
        </p>
              </div>
                        <div className="tl-item">
                            <div className="tl-dot">04</div>
                            <span className="m">Month 04</span>
                            <h4>Resume Building &amp; Interview Preparation</h4>
                            <p>
          Create an ATS-friendly resume, optimize your LinkedIn profile,
          build a professional portfolio website, and prepare for HR and technical interviews
          through expert-led mock interview sessions.
        </p>
              </div>
                        <div className="tl-item">
                            <div className="tl-dot">05</div>
                            <span className="m">Month 05</span>
                            <h4>Live Projects &amp; Internship Experience</h4>
                            <p>
          Work on industry-level projects, collaborate with mentors,
          gain hands-on internship experience, understand professional workflows,
          and build confidence by solving real business challenges.
        </p>
              </div>
                        <div className="tl-item">
                            <div className="tl-dot">06</div>
                            <span className="m">Month 06</span>
                            <h4>Placement Support &amp; Career Launch</h4>
                            <p>
          Participate in placement-focused training, advanced mock interviews,
          aptitude preparation, company-specific interview rounds, and career guidance.
          Graduate with a strong portfolio, internship experience, and job-ready skills.
        </p>
              </div>
            </div>
          </div>
        </section>

      

      {/* ===== TOOLS ===== */}


      
      <section className="section" id="tools">
                <div className="container">
                    <div className="section-head reveal section-head--compact">
                        <div>              <span className="eyebrow">the stack</span>
                            <h2 className="section-title">Tools &amp;                 <b>Technologies</b> You'll Master</h2>
              </div>
            </div>
          </div>
                <div className="marquee-wrap">
                    <div className="marquee-track" id="toolsTrack"></div>
          </div>
        </section>

      

      {/* ===== PROJECTS ===== */}


      
      <section className="section" id="projects">
                <div className="container">
                    <div className="section-head reveal">
                        <div>              <span className="eyebrow">build real things</span>
                            <h2 className="section-title">Real Projects You'll                 <b>Build</b></h2>
              </div>
                        <p className="section-sub">Every build solves a believable product problem. Ship polished, responsive work that
          proves you can think in components, work with APIs, and care about the details recruiters notice.</p>
            </div>
                    <div className="projects-grid stagger" id="projectsGrid"></div>
          </div>
        </section>

      

      {/* ===== INTERNSHIP ===== */}


      
      <section className="section" id="internship">
                <div className="container">
                    <div className="section-head reveal">
                        <div>              <span className="eyebrow">applied experience</span>
                            <h2 className="section-title">Internship                 <b>Experience</b></h2>
              </div>
                        <p className="section-sub">Work like you already have the job, before you get it.</p>
            </div>
                    <div className="intern-grid stagger">
                        <div className="intern-card card reveal" style={{"--i":"0"}}>              <i className="fa-solid fa-building-columns"></i>
                            <div>
                                <h4>Real Company Projects</h4>
                                <p>Contribute to live briefs from partner businesses.</p>
                </div>
              </div>
                        <div className="intern-card card reveal" style={{"--i":"1"}}>              <i className="fa-solid fa-people-group"></i>
                            <div>
                                <h4>Team Collaboration</h4>
                                <p>Work in pods with shared ownership and deadlines.</p>
                </div>
              </div>
                        <div className="intern-card card reveal" style={{"--i":"2"}}>              <i className="fa-solid fa-headset"></i>
                            <div>
                                <h4>Client Communication</h4>
                                <p>Practice presenting work and handling feedback.</p>
                </div>
              </div>
                        <div className="intern-card card reveal" style={{"--i":"0"}}>              <i className="fa-solid fa-arrows-spin"></i>
                            <div>
                                <h4>Agile Workflow</h4>
                                <p>Sprints, stand-ups, and ticketed tasks - the real way work runs.</p>
                </div>
              </div>
                        <div className="intern-card card reveal" style={{"--i":"1"}}>              <i className="fa-solid fa-industry"></i>
                            <div>
                                <h4>Industry Experience</h4>
                                <p>Leave with genuine, verifiable project experience.</p>
                </div>
              </div>
                        <div className="intern-card card reveal" style={{"--i":"2"}}>              <i className="fa-solid fa-certificate"></i>
                            <div>
                                <h4>Internship Certificate</h4>
                                <p>A certificate that documents exactly what you shipped.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      

      {/* ===== MENTORS ===== */}


      
      <section className="section" id="mentors">
                <div className="container">
                    <div className="section-head reveal">
                        <div>              <span className="eyebrow">learn from the field</span>
                            <h2 className="section-title">Meet Your                 <b>Mentors</b></h2>
              </div>
            </div>
                    <div className="mentors-grid stagger" id="mentorsGrid"></div>
          </div>
        </section>

      

      {/* ===== SUCCESS STORIES ===== */}


      
      <div className="testimonials-wrap container">
                <span className="section-eyebrow">Success Stories</span>
                <h2 className="section-title">Hear it from our students</h2>
                <div className="testimonials-grid" id="testimonialsGrid"></div>
                <div className="more-wrap">
                    <a className="color-btn" href="https://www.youtube.com/@netcodertechnology/videos" target="_blank" rel="noopener">View
        more testimonials</a>
          </div>
        </div>

      

      {/* Video Popup */}


      
      <div className="popup-overlay" id="popupOverlay">
                <div className="popup-box" id="popupBox">
                    <button className="popup-close" id="popupClose" aria-label="Close video">×</button>
          </div>
        </div>

      

      {/* ===== PLACEMENT SUPPORT ===== */}


      
      <section className="section" id="support">
                <div className="container">
                    <div className="section-head reveal">
                        <div>              <span className="eyebrow">beyond the classroom</span>
                            <h2 className="section-title">Placement &amp; Career                 <b>Support</b></h2>
              </div>
            </div>
                    <div className="support-grid stagger">
                        <div className="support-card reveal" style={{"--i":"0"}}>              <i className="fa-solid fa-file-lines"></i>
                            <h4>Resume Optimization</h4>
              </div>
                        <div className="support-card reveal" style={{"--i":"1"}}>              <i className="fa-brands fa-linkedin"></i>
                            <h4>LinkedIn Profile Building</h4>
              </div>
                        <div className="support-card reveal" style={{"--i":"2"}}>              <i className="fa-solid fa-comments"></i>
                            <h4>Mock Interviews</h4>
              </div>
                        <div className="support-card reveal" style={{"--i":"3"}}>              <i className="fa-solid fa-microphone"></i>
                            <h4>Communication Skills</h4>
              </div>
                        <div className="support-card reveal" style={{"--i":"0"}}>              <i className="fa-solid fa-star"></i>
                            <h4>Personal Branding</h4>
              </div>
                        <div className="support-card reveal" style={{"--i":"1"}}>              <i className="fa-solid fa-briefcase"></i>
                            <h4>Internship Assistance</h4>
              </div>
                        <div className="support-card reveal" style={{"--i":"2"}}>              <i className="fa-solid fa-handshake-angle"></i>
                            <h4>Placement Support</h4>
              </div>
                        <div className="support-card reveal" style={{"--i":"3"}}>              <i className="fa-solid fa-compass"></i>
                            <h4>Career Mentorship</h4>
              </div>
            </div>
          </div>
        </section>

      

      {/* ===== CERTIFICATIONS ===== */}


      
      <section className="section" id="certifications">
                <div className="container">
                    <div className="section-head reveal">
                        <div>              <span className="eyebrow">proof of work</span>
                            <h2 className="section-title">Certifications You'll                 <b>Earn</b></h2>
              </div>
            </div>
                    <div className="cert-grid stagger">
                        <div className="cert-card card reveal" style={{"--i":"0"}}>
                            <div className="cert-face cert-face--training" style={{"backgroundImage":"url('/bootcampimages/traning.png')"}}>
                
                {/* <i className="fa-solid fa-award"></i><span className="ct">Certificate</span><span className="cn">Training Completion</span> */}

                </div>
                            <div className="cert-info">
                                <h4>Training Certificate</h4>
                                <p>Issued on completion of your core 6-month curriculum.</p>
                </div>
              </div>
                        <div className="cert-card card reveal" style={{"--i":"1"}}>
                            <div className="cert-face cert-face--internship" style={{"backgroundImage":"url('/bootcampimages/internship.png')"}}>
                
                {/* <i className="fa-solid fa-briefcase"></i><span className="ct">Certificate</span><span className="cn">Internship Experience</span> */}

                </div>
                            <div className="cert-info">
                                <h4>Internship Certificate</h4>
                                <p>Documents your real project work and internship hours.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

      

      {/* Hiring Partners */}


      
      <section className="hiring-section">
                <div className="container">
                    <div className="section-header">
                        <span className="section-badge">Student Placements</span>
                        <h2>
          Where Our Students Are Placed
        </h2>
                        <p>
          Our students are building careers with technology companies, digital agencies, and ambitious startups
          across a range of industries.
        </p>
            </div>
                    <div className="placement-note" aria-label="Placement partners">
                        <i className="fa-solid fa-arrow-trend-up"></i>
                        <span>From first opportunity to long-term growth</span>
            </div>
          
          {/* ROW 1 */}

                    <div className="logo-row row-1">
                        <div className="logo-track">
                            <div className="logo-card">                <img src="/bootcampimages/app_mechanic_logo.png" alt="App Mechanic" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/social_gtm.avif" alt="Social GTM" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/cubix_technology_logo.png" alt="Cubix Technology" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/Development_logics_logo.png" alt="Development Logics" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/richest_soft_logo.svg" alt="Richest Soft" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/social_Simba.png" alt="Social Simba" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/app_mechanic_logo.png" alt="App Mechanic" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/social_gtm.avif" alt="Social GTM" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/cubix_technology_logo.png" alt="Cubix Technology" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/Development_logics_logo.png" alt="Development Logics" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/richest_soft_logo.svg" alt="Richest Soft" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/swiftedge_solutions_logo.webp" alt="Swiftedge Solutions" />
                </div>
                            <div className="logo-card">                <img src="/bootcampimages/cubeinfotech_logo.png" alt="Cube Infotech" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/unmeteredtechnologies_logo.png" alt="Unmetered Technologies" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/cubix_technology_logo.png" alt="Cubix Technology" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/Development_logics_logo.png" alt="Development Logics" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/richest_soft_logo.svg" alt="Richest Soft" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/social_Simba.png" alt="Social Simba" /></div>
              </div>
            </div>
          
          {/* ROW 2 */}

                    <div className="logo-row row-2">
                        <div className="logo-track">
                            <div className="logo-card">                <img src="/bootcampimages/vagabond_logo.png" alt="Vagabond" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/swiftedge_solutions_logo.webp" alt="Swiftedge Solutions" />
                </div>
                            <div className="logo-card">                <img src="/bootcampimages/cubeinfotech_logo.png" alt="Cube Infotech" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/unmeteredtechnologies_logo.png" alt="Unmetered Technologies" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/signore_black.png" alt="Signore Technologies" />
                </div>
                            <div className="logo-card">                <img src="/bootcampimages/app_mechanic_logo.png" alt="App Mechanic" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/social_gtm.avif" alt="Social GTM" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/cubix_technology_logo.png" alt="Cubix Technology" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/Development_logics_logo.png" alt="Development Logics" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/richest_soft_logo.svg" alt="Richest Soft" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/vagabond_logo.png" alt="Vagabond" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/swiftedge_solutions_logo.webp" alt="Swiftedge Solutions" />
                </div>
                            <div className="logo-card">                <img src="/bootcampimages/cubeinfotech_logo.png" alt="Cube Infotech" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/unmeteredtechnologies_logo.png" alt="Unmetered Technologies" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/signore_black.png" alt="Signore Technologies" />
                </div>
                            <div className="logo-card">                <img src="/bootcampimages/cubeinfotech_logo.png" alt="Cube Infotech" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/unmeteredtechnologies_logo.png" alt="Unmetered Technologies" /></div>
                            <div className="logo-card">                <img src="/bootcampimages/signore_black.png" alt="Signore Technologies" />
                </div>
              </div>
            </div>
          </div>
        </section>

      

      {/* ===== GOOGLE REVIEWS ===== */}


      
      <section className="section" id="testimonials">
                <div className="container">
                    <div className="section-head reveal section-head--compact">
                        <div>              <span className="eyebrow">in their words</span>
                            <h2 className="section-title">Student                 <b>Testimonials</b></h2>
              </div>
                        <a href="https://www.google.com/search?q=netcoder&rlz=1C1CHBF_enIN1134IN1135&oq=netcoder&gs_lcrp=EgZjaHJvbWUyBggAEEUYOTIGCAEQRRg8MhAIAhAuGK8BGMcBGIAEGI4FMgYIAxBFGDwyBggEEEUYPDIGCAUQRRg8MgYIBhBFGDwyBggHEEUYQdIBCDE4MDRqMGo0qAIAsAIB&sourceid=chrome&source=chrome.ob&ie=UTF-8#lrd=0x391b5103c6cf2421:0x13d20e093af94db9,1,,," target="_blank" rel="noopener" className="btn-text">              <i className="fa-brands fa-google google-icon"></i> See all
          reviews on Google               <i className="fa-solid fa-arrow-up-right-from-square small-icon"></i></a>
            </div>
                    <div className="testimonials-slider-wrap">
                        <div className="testimonials-slider-track" id="testimonialsSliderTrack"></div>
            </div>
                    <div className="testimonials-nav">
                        <button id="testPrev" aria-label="Previous">              <i className="fa-solid fa-arrow-left"></i></button>
                        <button id="testNext" aria-label="Next">              <i className="fa-solid fa-arrow-right"></i></button>
            </div>
          </div>
        </section>

      

      {/* ===== COMPARISON ===== */}


      
      <section className="section" id="compare">
                <div className="container">
                    <div className="section-head reveal">
                        <div>              <span className="eyebrow">the honest comparison</span>
                            <h2 className="section-title">Why                 <b>Netcoder?</b></h2>
              </div>
            </div>
                    <div className="compare-wrap reveal">
                        <table className="compare-table">
                            <thead>
                                <tr>
                                    <th>Feature</th>
                                    <th className="col-net">Netcoder</th>
                                    <th>Traditional Institutes</th>
                  </tr>
                </thead>
                            <tbody>
                                <tr>
                                    <td>Live Projects</td>
                                    <td className="col-net yes">                    <i className="fa-solid fa-check"></i></td>
                                    <td className="no">                    <i className="fa-solid fa-xmark"></i></td>
                  </tr>
                                <tr>
                                    <td>Internship Support</td>
                                    <td className="col-net yes">                    <i className="fa-solid fa-check"></i></td>
                                    <td className="no">                    <i className="fa-solid fa-xmark"></i></td>
                  </tr>
                                <tr>
                                    <td>Portfolio Development</td>
                                    <td className="col-net yes">                    <i className="fa-solid fa-check"></i></td>
                                    <td className="no">                    <i className="fa-solid fa-xmark"></i></td>
                  </tr>
                                <tr>
                                    <td>Career Guidance</td>
                                    <td className="col-net yes">                    <i className="fa-solid fa-check"></i></td>
                                    <td className="no">                    <i className="fa-solid fa-xmark"></i></td>
                  </tr>
                                <tr>
                                    <td>Industry Mentors</td>
                                    <td className="col-net yes">                    <i className="fa-solid fa-check"></i></td>
                                    <td className="no">                    <i className="fa-solid fa-xmark"></i></td>
                  </tr>
                                <tr>
                                    <td>AI Tools Training</td>
                                    <td className="col-net yes">                    <i className="fa-solid fa-check"></i></td>
                                    <td className="no">                    <i className="fa-solid fa-xmark"></i></td>
                  </tr>
                                <tr>
                                    <td>Placement Support</td>
                                    <td className="col-net yes">                    <i className="fa-solid fa-check"></i></td>
                                    <td className="no">                    <i className="fa-solid fa-xmark"></i></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

      

      {/* ===== FAQ ===== */}


      
      <section className="section" id="faq">
                <div className="container">
                    <div className="section-head reveal section-head--centered">
                        <span className="eyebrow">good questions</span>
                        <h2 className="section-title">Frequently Asked               <b>Questions</b></h2>
            </div>
                    <div className="faq-list reveal" id="faqList"></div>
          </div>
        </section>

      

      {/* ===== URGENCY ===== */}


      
      <section className="section" id="urgency">
                <div className="container">
                    <div className="urgency-badge">            <span className="blip"></span> Limited Seats - Next Batch Starting Soon</div>
                    <h2>Every Week You Wait Is a Week a Peer Spends Building Their Portfolio.</h2>
                    <p className="sub">Applications for the next cohort close soon. Secure your seat and start your 6-month accelerator on
        schedule.</p>
                    <div className="countdown" id="countdown">
                        <div className="cd-box">
                            <div className="n" id="cd-d">00</div>
                            <div className="l">Days</div>
              </div>
                        <div className="cd-box">
                            <div className="n" id="cd-h">00</div>
                            <div className="l">Hours</div>
              </div>
                        <div className="cd-box">
                            <div className="n" id="cd-m">00</div>
                            <div className="l">Mins</div>
              </div>
                        <div className="cd-box">
                            <div className="n" id="cd-s">00</div>
                            <div className="l">Secs</div>
              </div>
            </div>
                    <a href="#leadform" className="btn">Reserve My Seat             <i className="fa-solid fa-arrow-right"></i></a>
                    <div className="urgency-metas">
                        <div>              <i className="fa-solid fa-users"></i> Only a few seats left this batch</div>
                        <div>              <i className="fa-solid fa-calendar-days"></i> Rolling admissions, weekly cohorts</div>
            </div>
          </div>
        </section>

      

      {/* ===== LEAD FORM ===== */}


      
      <section className="section" id="leadform">
                <div className="container lead-grid">
                    <div className="reveal">
                        <span className="eyebrow">next step</span>
                        <h2 className="section-title">Get Your Free, Personalised               <b>Career Roadmap</b></h2>
                        <p className="section-sub">Tell us a little about you - we'll map the right track, timeline, and outcome for your
          goals.</p>
                        <ul className="lead-points">
                            <li>                <i className="fa-solid fa-circle-check"></i> A 15-minute call with a career counsellor</li>
                            <li>                <i className="fa-solid fa-circle-check"></i> A custom track and month-by-month plan</li>
                            <li>                <i className="fa-solid fa-circle-check"></i> No obligation - completely free</li>
              </ul>
            </div>
                    <form className="lead-card reveal" id="contact">
                        <input type="hidden" name="form_type" value="Career Roadmap Request" />
                        <h3>Get Free Career Roadmap</h3>
                        <p className="sub2">We'll reach out within 24 hours.</p>
                        <div className="field">              <label htmlFor="contactName">Full Name</label>              <input id="contactName" name="full_name" type="text" placeholder="Your full name" required /></div>
                        <div className="field">              <label htmlFor="contactPhone">Phone Number</label>              <input id="contactPhone" name="phone" type="tel" placeholder="+91 00000 00000" required /></div>
                        <div className="field">              <label htmlFor="contactEmail">Email Address</label>              <input id="contactEmail" name="email" type="email" placeholder="you@example.com" required /></div>
                        <div className="field">              <label htmlFor="contactCity">City</label>              <input id="contactCity" name="city" type="text" placeholder="Your city" required /></div>
                        <div className="field">              <label htmlFor="contactProgram">Interested Program</label>
                            <select id="contactProgram" name="program" required>
                                <option value="">Select a program</option>
                                <option>Frontend Developer Bootcamp</option>
                                <option>React Application Development</option>
                                <option>UI Engineering</option>
                                <option>Portfolio &amp; Career Launch</option>
                                <option>Other</option>
                </select>
              </div>
                        <button type="submit" className="btn btn-primary btn-block">Get Free Career Roadmap               <i className="fa-solid fa-arrow-right"></i></button>
                        <p className="lead-note">By submitting, you agree to be contacted by Netcoder Technology.</p>
            </form>
          </div>
        </section>

      

      {/* ===== FINAL CTA ===== */}


      
      <section className="section" id="finalcta">
                <div className="container">
                    <span className="eyebrow on-dark">your move</span>
                    <h2>Your Front-End Career Starts With What You Build.</h2>
                    <p className="sub">Join the 6-month Frontend Developer Bootcamp and leave with polished interfaces, real project
        experience, a portfolio recruiters can explore, and the confidence to ship your next idea.</p>
                    <div className="finalcta-ctas">
                        <a href="#" className="btn btn-primary" id="applyNowBtn2">Apply Now               <i className="fa-solid fa-arrow-right"></i></a>
                        <a href="https://wa.me/917590832055?text=Hi%20Netcoder%2C%20I%20want%20to%20book%20free%20frontend%20developer%20career%20counselling" target="_blank" rel="noopener" className="btn btn-ghost on-dark">Book Free Career Counselling</a>
            </div>
                    <div className="finalcta-badges">
                        <div>              <i className="fa-solid fa-shield-halved"></i> Mentorship-backed curriculum</div>
                        <div>              <i className="fa-solid fa-user-group"></i> 500+ students trained</div>
                        <div>              <i className="fa-solid fa-star"></i> 4.9/5 average rating</div>
            </div>
          </div>
        </section>

      

      {/* ===== FOOTER ===== */}


      
      <footer>
                <div className="container">
                    <div className="foot-grid">
                        <div className="foot-about">
                            <p>Netcoder Technology runs a 6-month career accelerator bootcamp helping students, graduates, and career
            switchers build real skills, real projects, and real careers in tech.</p>
                            <div className="foot-social">
                                <a href="https://www.linkedin.com/school/netcodertechnology/" aria-label="LinkedIn">                  <i className="fa-brands fa-linkedin-in"></i></a>
                                <a href="https://www.instagram.com/netcodertechnology/" aria-label="Instagram">                  <i className="fa-brands fa-instagram"></i></a>
                                <a href="https://www.facebook.com/netcodertechnology/" aria-label="YouTube">                  <i className="fa-brands fa-facebook-f"></i></a>
                </div>
              </div>
                        <div>
                            <h5>Courses</h5>
                            <ul>
                                <li>                  <a href="#programs">Full Stack Development</a></li>
                                <li>                  <a href="#programs">UI/UX Design</a></li>
                                <li>                  <a href="#programs">Python Development</a></li>
                                <li>                  <a href="#programs">Data Science</a></li>
                                <li>                  <a href="#programs">Artificial Intelligence</a></li>
                </ul>
              </div>
                        <div>
                            <h5>Quick Links</h5>
                            <ul>
                                <li>                  <a href="#journey">Curriculum</a></li>
                                <li>                  <a href="#projects">Projects</a></li>
                                <li>                  <a href="#testimonials">Testimonials</a></li>
                                <li>                  <a href="#faq">FAQ</a></li>
                </ul>
              </div>
                        <div>
                            <h5>Contact</h5>
                            <ul className="foot-contact">
                                <li>                  <i className="fa-solid fa-location-dot"></i>Dharamshala Branch Office                   <br />1st Floor, above Gramin Bank,
              near Govt. ITI, Dari                  <br />Dharamshala (176057)</li>
                                <li>                  <i className="fa-solid fa-phone"></i> +91 7590832055</li>
                                <li>                  <i className="fa-solid fa-envelope"></i> info@netcoder.in</li>
                                <li>                  <i className="fa-solid fa-globe"></i> www.netcoder.in</li>
                </ul>
              </div>
            </div>
                    <div className="foot-bottom">
                        <span>©               <span id="year"></span> Netcoder Technology. All rights reserved.</span>
                        <span>Designed for the next generation of builders.</span>
            </div>
          </div>
        </footer>

      

      {/* ===== BACK TO TOP ===== */}


      
      <button id="toTop" aria-label="Back to top">        <i className="fa-solid fa-arrow-up"></i></button>

      

      {/* ===== APPLY POPUP ===== */}


      
      <div className="popup-form-overlay" id="applyPopup">
                <div className="popup-form-box">
                    <button className="popup-form-close" id="applyPopupClose">×</button>
                    <h3>Apply Now</h3>
                    <p className="sub">Fill in your details and we'll get back to you within 24 hours.</p>
                    <form id="applyForm">
                        <input type="hidden" name="form_type" value="Apply Now Request" />
                        <div className="field">              <label htmlFor="applyName">Full Name</label>              <input type="text" name="full_name" placeholder="Your full name" required id="applyName" /></div>
                        <div className="field">              <label htmlFor="applyPhone">Phone Number</label>              <input type="tel" name="phone" placeholder="+91 00000 00000" required id="applyPhone" /></div>
                        <div className="field">              <label htmlFor="applyEmail">Email Address</label>              <input type="email" name="email" placeholder="you@example.com" required id="applyEmail" /></div>
                        <div className="field">              <label htmlFor="applyCity">City</label>              <input type="text" name="city" placeholder="Your city" required id="applyCity" /></div>
                        <div className="field">              <label htmlFor="applyProgram">Interested Program</label>
                            <select required name="program" id="applyProgram">
                                <option value="">Select a program</option>
                                <option>Full Stack Web Development</option>
                                <option>UI/UX Design</option>
                                <option>Python Development</option>
                                <option>Data Science</option>
                                <option>Artificial Intelligence &amp; ML</option>
                                <option>Digital Marketing</option>
                                <option>Video Editing &amp; Motion Graphics</option>
                                <option>Gen AI &amp; Creative Tools</option>
                                <option>Other</option>
                </select>
              </div>
                        <button type="submit" className="btn btn-primary" id="applySubmit">Submit Application               <i className="fa-solid fa-arrow-right"></i></button>
                        <p className="lead-note">We'll reach out to you shortly. Your data is safe with us.</p>
            </form>
          </div>
        </div>

      

      {/* ============================================================ */}


      

      {/* ===== JAVASCRIPT (all internal, no inline) ===== */}


      

      {/* ============================================================ */}


      


      
    </>
  );
}
