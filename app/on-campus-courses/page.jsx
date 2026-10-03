import Link from "next/link";
import PageInteractiveHandler from "@/components/PageInteractiveHandler";

export const metadata = {
  "title": "On-Campus Courses & 6-Month Bootcamp in Dharamshala | Netcoder Technology",
  "description": "Explore 26+ career-focused On-Campus courses and 6-Month Accelerator Bootcamps in Dharamshala at Netcoder Technology. Practical training, live projects, 1-on-1 mentorship & 100% placement support.",
  "openGraph": {
    "title": "On-Campus Courses & 6-Month Bootcamp in Dharamshala | Netcoder Technology",
    "description": "Explore 26+ career-focused On-Campus courses and 6-Month Accelerator Bootcamps in Dharamshala at Netcoder Technology. Practical training, live projects, 1-on-1 mentorship & 100% placement support.",
    "url": "https://www.netcoder.in/on-campus-courses",
    "siteName": "Netcoder Technology",
    "type": "website"
  },
  "alternates": {
    "canonical": "https://www.netcoder.in/on-campus-courses"
  }
};

export default function OnCampusCoursesPage() {
  return (
    <>
      <PageInteractiveHandler pageSlug="on-campus-courses" />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"ItemList\",\"name\":\"Netcoder Technology On-Campus Courses & 6-Month Bootcamp\",\"description\":\"Comprehensive list of professional on-campus training programs and career accelerator bootcamps offered by Netcoder Technology in Dharamshala, HP.\",\"url\":\"https://www.netcoder.in/on-campus-courses/\",\"numberOfItems\":26,\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Graphic Designing\",\"url\":\"https://www.netcoder.in/foundation-graphic/\"},{\"@type\":\"ListItem\",\"position\":2,\"name\":\"Web Designing\",\"url\":\"https://www.netcoder.in/web-designing/\"},{\"@type\":\"ListItem\",\"position\":3,\"name\":\"UI & UX Design\",\"url\":\"https://www.netcoder.in/ui-ux/\"},{\"@type\":\"ListItem\",\"position\":4,\"name\":\"2D/3D Animation\",\"url\":\"https://www.netcoder.in/animation/\"},{\"@type\":\"ListItem\",\"position\":5,\"name\":\"Motion Graphics\",\"url\":\"https://www.netcoder.in/motion-graphics/\"},{\"@type\":\"ListItem\",\"position\":6,\"name\":\"Graphics & Web Designing\",\"url\":\"https://www.netcoder.in/graphic-and-web-designing/\"},{\"@type\":\"ListItem\",\"position\":7,\"name\":\"Digital Content Creator\",\"url\":\"https://www.netcoder.in/digital-content-creator/\"},{\"@type\":\"ListItem\",\"position\":8,\"name\":\"Auto CAD\",\"url\":\"https://www.netcoder.in/autocad/\"},{\"@type\":\"ListItem\",\"position\":9,\"name\":\"Web Development\",\"url\":\"https://www.netcoder.in/web-development/\"},{\"@type\":\"ListItem\",\"position\":10,\"name\":\"Full Stack Development\",\"url\":\"https://www.netcoder.in/fullstack-web-development/\"},{\"@type\":\"ListItem\",\"position\":11,\"name\":\"MERN Stack Development\",\"url\":\"https://www.netcoder.in/mern-stack/\"},{\"@type\":\"ListItem\",\"position\":12,\"name\":\"MEAN Stack Development\",\"url\":\"https://www.netcoder.in/mean-stack/\"},{\"@type\":\"ListItem\",\"position\":13,\"name\":\"PHP Training\",\"url\":\"https://www.netcoder.in/php-training/\"},{\"@type\":\"ListItem\",\"position\":14,\"name\":\"WordPress Development\",\"url\":\"https://www.netcoder.in/wordpress/\"},{\"@type\":\"ListItem\",\"position\":15,\"name\":\"Digital Marketing\",\"url\":\"https://www.netcoder.in/digital-marketing/\"},{\"@type\":\"ListItem\",\"position\":16,\"name\":\"Social Media Marketing\",\"url\":\"https://www.netcoder.in/social-media-marketing/\"},{\"@type\":\"ListItem\",\"position\":17,\"name\":\"SEO Course\",\"url\":\"https://www.netcoder.in/seo-course/\"},{\"@type\":\"ListItem\",\"position\":18,\"name\":\"Data Science & Business Analytics\",\"url\":\"https://www.netcoder.in/business-analytics/\"},{\"@type\":\"ListItem\",\"position\":19,\"name\":\"Data Science & Machine Learning\",\"url\":\"https://www.netcoder.in/data-science-machine-learning/\"},{\"@type\":\"ListItem\",\"position\":20,\"name\":\"Data Analytics\",\"url\":\"https://www.netcoder.in/data-analytics/\"},{\"@type\":\"ListItem\",\"position\":21,\"name\":\"Cyber Security Course\",\"url\":\"https://www.netcoder.in/cyber-security/\"},{\"@type\":\"ListItem\",\"position\":22,\"name\":\"Ethical Hacking\",\"url\":\"https://www.netcoder.in/ethical-hacking/\"},{\"@type\":\"ListItem\",\"position\":23,\"name\":\"Software Engineering With Python\",\"url\":\"https://www.netcoder.in/software-engineering/\"},{\"@type\":\"ListItem\",\"position\":24,\"name\":\"System Design & Operating Systems\",\"url\":\"https://www.netcoder.in/system-design/\"},{\"@type\":\"ListItem\",\"position\":25,\"name\":\"Data Structures & Algorithms\",\"url\":\"https://www.netcoder.in/data-structures/\"},{\"@type\":\"ListItem\",\"position\":26,\"name\":\"DevOps Course\",\"url\":\"https://www.netcoder.in/devops-course/\"}]}" }}
      />
      <section className="oncampus-hero">
                <div className="container">
                    <span className="oncampus-badge">
                        <i className="fa-solid fa-graduation-cap"></i> 100% Practical On-Campus Training &amp; 6-Month Bootcamp • Dharamshala
        </span>
                    <h1>Master Practical Tech &amp; Design Skills             <span>On-Campus</span></h1>
                    <p>Gain job-ready engineering, design, data, and digital marketing skills with live practical projects, 1-on-1 expert mentorship, and 100% placement assistance at Netcoder Technology Institute.</p>
                    <div className="hero-stats-ribbon">
                        <div className="stat-pill">              <i className="fa-solid fa-book-open"></i> 26+ Practical Courses</div>
                        <div className="stat-pill">              <i className="fa-solid fa-user-tie"></i> 1-on-1 Mentor Guidance</div>
                        <div className="stat-pill">              <i className="fa-solid fa-briefcase"></i> 100% Placement Support</div>
                        <div className="stat-pill">              <i className="fa-solid fa-desktop"></i> Modern Computer Labs</div>
            </div>
                    <div className="search-filter-wrapper">
                        <i className="fa-solid fa-magnifying-glass search-icon"></i>
                        <input type="text" id="courseSearchInput" placeholder="Search course by title, stack, or topic (e.g. Python, Figma, React, Cyber)..." />
                        <button type="button">              <i className="fa-solid fa-search"></i> Search</button>
            </div>
          </div>
        </section>

      

      {/* 2. Trust Stats Bar */}


      
      <section id="trustbar">
                <div className="container trust-grid">
                    <div className="trust-stat">            <div className="num" data-count="500" data-suffix="+">0</div>            <div className="lbl">Students Trained</div></div>
                    <div className="trust-stat">            <div className="num" data-count="50" data-suffix="+">0</div>            <div className="lbl">Projects Delivered</div></div>
                    <div className="trust-stat">            <div className="num" data-count="120" data-suffix="+">0</div>            <div className="lbl">Internship Placements</div></div>
                    <div className="trust-stat">            <div className="num" data-count="10" data-suffix="+">0</div>            <div className="lbl">Industry Mentors</div></div>
                    <div className="trust-stat">            <div className="num" data-count="300" data-suffix="+">0</div>            <div className="lbl">Portfolios Built</div></div>
                    <div className="trust-stat">            <div className="num" data-count="100" data-suffix="%">0</div>            <div className="lbl">Placement Support Rate</div></div>
          </div>
        </section>

      

      {/* 3. Category Filter Pills */}


      
      <div className="category-tabs-container">
                <div className="category-tabs">
                    <button className="cat-btn active">            <i className="fa-solid fa-border-all"></i> All Courses (26)</button>
                    <button className="cat-btn">            <i className="fa-solid fa-palette"></i> Design &amp; Multimedia (8)</button>
                    <button className="cat-btn">            <i className="fa-solid fa-code"></i> CMS &amp; Web Tech (6)</button>
                    <button className="cat-btn">            <i className="fa-solid fa-bullhorn"></i> Digital Marketing (3)</button>
                    <button className="cat-btn">            <i className="fa-solid fa-shield-halved"></i> Data &amp; Security (6)</button>
                    <button className="cat-btn">            <i className="fa-solid fa-server"></i> CS &amp; DevOps (3)</button>
          </div>
        </div>

      

      {/* 4. Course Grid Section (26 Courses) */}


      
      <section className="course-grid-section">
                <div className="container">
          
          {/* 1. Design & Multimedia Courses */}

                    <div className="category-block" data-category="design">
                        <h3 className="courses-category-title">              <i className="fa-solid fa-palette"></i> Design &amp; Multimedia Courses</h3>
                        <div className="campus-cards-grid">
                            <div className="campus-card" data-title="graphic designing foundation photoshop illustrator typography logo branding" data-category="design">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-solid fa-paint-brush"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">Graphic Designing</h4>
                                            <span className="duration-badge">3 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Master visual branding, vector graphics, typography, social banners, logo design, and photo manipulation in Photoshop &amp; Illustrator.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">Photoshop</span>
                                        <span className="tag-item">Illustrator</span>
                                        <span className="tag-item">Branding</span>
                                        <span className="tag-item">Print &amp; Digital</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/foundation-graphic" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
                            <div className="campus-card" data-title="web designing UI frontend HTML CSS responsive bootstrap flexbox grid javascript" data-category="design">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-solid fa-laptop-code"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">Web Designing</h4>
                                            <span className="duration-badge">3 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Build modern, responsive websites using HTML5, CSS3, Flexbox, CSS Grid, JavaScript ES6, and Bootstrap layout frameworks.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">HTML5 &amp; CSS3</span>
                                        <span className="tag-item">JavaScript</span>
                                        <span className="tag-item">Bootstrap 5</span>
                                        <span className="tag-item">Responsive UI</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/web-designing" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
                            <div className="campus-card" data-title="UI UX design user experience user interface figma wireframing prototyping mobile app" data-category="design">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-solid fa-figma"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">UI &amp; UX Design</h4>
                                            <span className="duration-badge">3 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">User research, wireframing, interactive prototyping, design systems, usability testing, and mobile app UI creation with Figma.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">Figma</span>
                                        <span className="tag-item">Wireframing</span>
                                        <span className="tag-item">Prototyping</span>
                                        <span className="tag-item">Design Systems</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/ui-ux" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
                            <div className="campus-card" data-title="2D 3D animation motion graphics premiere after effects blender character rigging modeling" data-category="design">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-solid fa-film"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">2D/3D Animation</h4>
                                            <span className="duration-badge">6 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Comprehensive animation training covering character rigging, 3D modeling, lighting, keyframing, rendering, and video editing.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">After Effects</span>
                                        <span className="tag-item">Blender</span>
                                        <span className="tag-item">Character Rigging</span>
                                        <span className="tag-item">3D Modeling</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/animation" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
                            <div className="campus-card" data-title="motion graphics visual effects vfx video editing premiere pro kinetic typography" data-category="design">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-solid fa-clapperboard"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">Motion Graphics</h4>
                                            <span className="duration-badge">3 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Create dynamic kinetic typography, promo videos, logo animations, video intros, transitions, and visual effects (VFX).</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">After Effects</span>
                                        <span className="tag-item">Premiere Pro</span>
                                        <span className="tag-item">VFX</span>
                                        <span className="tag-item">Video Editing</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/motion-graphics" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
                            <div className="campus-card" data-title="graphic and web designing combo layout branding website frontend" data-category="design">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-solid fa-wand-magic-sparkles"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">Graphics &amp; Web Designing</h4>
                                            <span className="duration-badge">6 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Dual-specialization master program combining graphic design principles with frontend web engineering and UI layout creation.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">Photoshop</span>
                                        <span className="tag-item">Illustrator</span>
                                        <span className="tag-item">HTML/CSS</span>
                                        <span className="tag-item">UI Design</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/graphic-and-web-designing" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
                            <div className="campus-card" data-title="digital content creator video editing social media youtube reels shorts thumbnails podcast" data-category="design">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-solid fa-photo-film"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">Digital Content Creator</h4>
                                            <span className="duration-badge">3 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Learn short-form video editing, thumbnail design, script writing, YouTube channel optimization, and social media branding.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">Premiere Pro</span>
                                        <span className="tag-item">Canva/Photoshop</span>
                                        <span className="tag-item">YouTube SEO</span>
                                        <span className="tag-item">Reels Editing</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/digital-content-creator" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
                            <div className="campus-card" data-title="autocad 2D 3D drafting architectural mechanical interior design CAD" data-category="design">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-solid fa-compass-drafting"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">Auto CAD (2D &amp; 3D)</h4>
                                            <span className="duration-badge">3 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Master 2D precision drafting, 3D modeling, architectural floor plans, elevation views, and mechanical CAD engineering drawings.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">AutoCAD 2D</span>
                                        <span className="tag-item">AutoCAD 3D</span>
                                        <span className="tag-item">Architectural</span>
                                        <span className="tag-item">Drafting</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/autocad" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
              </div>
            </div>
          
          {/* 2. CMS & Web Technologies Courses */}

                    <div className="category-block" data-category="web">
                        <h3 className="courses-category-title">              <i className="fa-solid fa-code"></i> CMS &amp; Web Technologies Courses</h3>
                        <div className="campus-cards-grid">
                            <div className="campus-card" data-title="web development frontend backend javascript html css database apis git" data-category="web">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-solid fa-code"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">Web Development</h4>
                                            <span className="duration-badge">4 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Build dynamic interactive web applications with HTML5, CSS3, JavaScript ES6+, REST APIs, Git, and SQL database integration.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">JavaScript ES6</span>
                                        <span className="tag-item">REST APIs</span>
                                        <span className="tag-item">Git / GitHub</span>
                                        <span className="tag-item">Databases</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/web-development" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
                            <div className="campus-card" data-title="fullstack full stack web development frontend backend react node express mongodb sql deployment" data-category="web">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-solid fa-layer-group"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">Full Stack Development</h4>
                                            <span className="duration-badge">6 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Complete end-to-end full stack web engineering covering frontend UI, server-side APIs, database architecture, authentication, and cloud deployment.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">Frontend &amp; Backend</span>
                                        <span className="tag-item">SQL &amp; NoSQL</span>
                                        <span className="tag-item">Auth &amp; Security</span>
                                        <span className="tag-item">Cloud Hosting</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/fullstack-web-development" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
                            <div className="campus-card" data-title="MERN stack mongodb express react node javascript fullstack web app" data-category="web">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-brands fa-react"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">MERN Stack Development</h4>
                                            <span className="duration-badge">6 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Build modern single-page applications (SPAs) and SaaS platforms with MongoDB, Express.js, React.js, and Node.js.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">React.js</span>
                                        <span className="tag-item">Node.js</span>
                                        <span className="tag-item">Express.js</span>
                                        <span className="tag-item">MongoDB</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/mern-stack" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
                            <div className="campus-card" data-title="MEAN stack mongodb express angular node javascript fullstack enterprise" data-category="web">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-brands fa-angular"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">MEAN Stack Development</h4>
                                            <span className="duration-badge">6 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Enterprise full-stack training with MongoDB, Express.js, Angular TypeScript framework, and Node.js backend services.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">Angular</span>
                                        <span className="tag-item">TypeScript</span>
                                        <span className="tag-item">Node.js</span>
                                        <span className="tag-item">MongoDB</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/mean-stack" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
                            <div className="campus-card" data-title="PHP training laravel mysql backend web development server database" data-category="web">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-brands fa-php"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">PHP &amp; Frameworks Training</h4>
                                            <span className="duration-badge">3 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Learn server-side backend programming with PHP, OOP concepts, MySQL databases, sessions, authentication, and MVC frameworks.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">PHP 8</span>
                                        <span className="tag-item">MySQL</span>
                                        <span className="tag-item">OOP PHP</span>
                                        <span className="tag-item">MVC Architecture</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/php-training" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
                            <div className="campus-card" data-title="wordpress development elementor woocommerce custom themes plugins cms blog website" data-category="web">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-brands fa-wordpress"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">WordPress Development</h4>
                                            <span className="duration-badge">2 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Create custom blogs, business portals, and WooCommerce e-commerce stores with Elementor, custom themes, and plugins.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">WordPress CMS</span>
                                        <span className="tag-item">Elementor Pro</span>
                                        <span className="tag-item">WooCommerce</span>
                                        <span className="tag-item">Theme Customization</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/wordpress" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
              </div>
            </div>
          
          {/* 3. Digital Marketing Courses */}

                    <div className="category-block" data-category="marketing">
                        <h3 className="courses-category-title">              <i className="fa-solid fa-bullhorn"></i> Digital Marketing Courses</h3>
                        <div className="campus-cards-grid">
                            <div className="campus-card" data-title="digital marketing seo sem ppc google ads social media analytics email marketing" data-category="marketing">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-solid fa-bullhorn"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">Digital Marketing</h4>
                                            <span className="duration-badge">3 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Comprehensive digital growth strategy covering SEO, Google Ads (PPC), Meta Ads, email campaigns, content strategy, and Web Analytics.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">SEO</span>
                                        <span className="tag-item">Google Ads</span>
                                        <span className="tag-item">Social Media Ads</span>
                                        <span className="tag-item">GA4 Analytics</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/digital-marketing" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
                            <div className="campus-card" data-title="social media marketing instagram facebook linkedin ads branding content creation" data-category="marketing">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-solid fa-share-nodes"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">Social Media Marketing</h4>
                                            <span className="duration-badge">2 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Master Instagram Reels, Meta Ads Manager, LinkedIn marketing, brand community management, and paid viral advertising.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">Meta Ads</span>
                                        <span className="tag-item">Instagram Growth</span>
                                        <span className="tag-item">LinkedIn B2B</span>
                                        <span className="tag-item">Content Plan</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/social-media-marketing" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
                            <div className="campus-card" data-title="SEO course search engine optimization on page off page technical google ranking" data-category="marketing">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-solid fa-magnifying-glass-chart"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">SEO Master Course</h4>
                                            <span className="duration-badge">2 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">In-depth On-Page SEO, Off-Page backlink strategies, Technical SEO audits, keyword research, and Google Search Console optimization.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">On-Page SEO</span>
                                        <span className="tag-item">Technical Audits</span>
                                        <span className="tag-item">Backlinks</span>
                                        <span className="tag-item">Keyword Research</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/seo-course" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
              </div>
            </div>
          
          {/* 4. Data & Security Courses */}

                    <div className="category-block" data-category="data">
                        <h3 className="courses-category-title">              <i className="fa-solid fa-shield-halved"></i> Data &amp; Security Courses</h3>
                        <div className="campus-cards-grid">
                            <div className="campus-card" data-title="data science machine learning python pandas numpy scikit learn AI statistics" data-category="data">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-solid fa-brain"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">Data Science &amp; ML</h4>
                                            <span className="duration-badge">6 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Python for Data Science, data wrangling with Pandas/NumPy, machine learning algorithms, predictive modeling, and AI workflows.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">Python</span>
                                        <span className="tag-item">Pandas &amp; NumPy</span>
                                        <span className="tag-item">Scikit-Learn</span>
                                        <span className="tag-item">ML Models</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/data-science-machine-learning" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
                            <div className="campus-card" data-title="data analytics power bi tableau sql excel python data visualization dashboards" data-category="data">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-solid fa-chart-pie"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">Data Analytics</h4>
                                            <span className="duration-badge">4 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Transform raw data into business insights with Advanced Excel, SQL queries, Power BI interactive reports, and Tableau dashboards.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">Power BI</span>
                                        <span className="tag-item">SQL Queries</span>
                                        <span className="tag-item">Advanced Excel</span>
                                        <span className="tag-item">Tableau</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/data-analytics" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
                            <div className="campus-card" data-title="business analytics data analytics BI strategy reporting forecasting excel sql" data-category="data">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-solid fa-chart-line"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">Business Analytics</h4>
                                            <span className="duration-badge">4 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Data-driven business decision making, KPI tracking, financial forecasting models, executive dashboarding, and SQL analytics.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">Business Intelligence</span>
                                        <span className="tag-item">SQL Analytics</span>
                                        <span className="tag-item">KPI Modeling</span>
                                        <span className="tag-item">Power BI</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/business-analytics" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
                            <div className="campus-card" data-title="cyber security network security ethical hacking penetration testing firewalls cryptography" data-category="data">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-solid fa-shield-cat"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">Cyber Security</h4>
                                            <span className="duration-badge">6 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Network fundamentals, system hardening, vulnerability assessments, security operations (SOC), Wireshark, and threat analysis.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">Network Security</span>
                                        <span className="tag-item">Wireshark</span>
                                        <span className="tag-item">Vulnerability Assessment</span>
                                        <span className="tag-item">SOC Fundamentals</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/cyber-security" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
                            <div className="campus-card" data-title="ethical hacking kali linux pentesting nmap burp suite web security bug bounty" data-category="data">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-solid fa-user-ninja"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">Ethical Hacking</h4>
                                            <span className="duration-badge">6 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Offensive security techniques, penetration testing, Kali Linux tools, Nmap scanning, Burp Suite web testing, and bug bounty basics.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">Kali Linux</span>
                                        <span className="tag-item">Burp Suite</span>
                                        <span className="tag-item">Metasploit</span>
                                        <span className="tag-item">Penetration Testing</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/ethical-hacking" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
                            <div className="campus-card" data-title="software engineering python programming OOP automation scripts APIs backend" data-category="data">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-brands fa-python"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">Software Engineering with Python</h4>
                                            <span className="duration-badge">6 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Core software development lifecycle, Python OOP, automated scripting, web scraping, API development, and software architecture.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">Python OOP</span>
                                        <span className="tag-item">Automation</span>
                                        <span className="tag-item">FastAPI / Flask</span>
                                        <span className="tag-item">Clean Architecture</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/software-engineering" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
              </div>
            </div>
          
          {/* 5. CS & DevOps Courses */}

                    <div className="category-block" data-category="cs">
                        <h3 className="courses-category-title">              <i className="fa-solid fa-server"></i> Computer Science &amp; DevOps</h3>
                        <div className="campus-cards-grid">
                            <div className="campus-card" data-title="data structures algorithms DSA C++ Java problem solving interviewing coding" data-category="cs">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-solid fa-network-wired"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">Data Structures &amp; Algorithms</h4>
                                            <span className="duration-badge">4 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Arrays, Linked Lists, Trees, Graphs, Sorting, Dynamic Programming, and algorithmic problem-solving for technical interviews.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">Arrays &amp; Lists</span>
                                        <span className="tag-item">Trees &amp; Graphs</span>
                                        <span className="tag-item">Dynamic Programming</span>
                                        <span className="tag-item">C++ / Java / Python</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/data-structures" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
                            <div className="campus-card" data-title="devops docker kubernetes CI CD jenkins linux aws cloud infrastructure" data-category="cs">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-brands fa-docker"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">DevOps &amp; Cloud Engineering</h4>
                                            <span className="duration-badge">6 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">Containerization with Docker, orchestration with Kubernetes, Linux administration, AWS cloud deployment, and CI/CD pipelines.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">Docker</span>
                                        <span className="tag-item">Kubernetes</span>
                                        <span className="tag-item">AWS Cloud</span>
                                        <span className="tag-item">CI/CD Pipelines</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/devops-course" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
                            <div className="campus-card" data-title="system design operating systems OS scalability distributed systems architecture" data-category="cs">
                                <div>
                                    <div className="campus-card-header">
                                        <div className="campus-card-icon">                      <i className="fa-solid fa-microchip"></i></div>
                                        <div>
                                            <h4 className="campus-card-title">System Design &amp; Operating Systems</h4>
                                            <span className="duration-badge">4 Months Duration</span>
                      </div>
                    </div>
                                    <p className="campus-card-desc">High-level architecture, load balancing, caching strategies, database sharding, OS memory management, and concurrency.</p>
                                    <div className="campus-card-tags">
                                        <span className="tag-item">System Design</span>
                                        <span className="tag-item">Load Balancing</span>
                                        <span className="tag-item">Caching &amp; Redis</span>
                                        <span className="tag-item">OS Internals</span>
                    </div>
                  </div>
                                <div className="campus-card-footer">
                                    <a href="/system-design" className="btn-view-course">View Course Details</a>
                                    <button className="btn-demo-course" data-modal-trigger="demo">Book Demo</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      

      {/* 5. Who Can Join Section */}


      
      <section className="why-oncampus" style={{"background":"#ffffff"}}>
                <div className="container text-center">
                    <h2 style={{"fontWeight":"800","fontSize":"2.2rem","color":"#0f172a"}}>Who Can Join Netcoder Bootcamps?</h2>
                    <p style={{"maxWidth":"720px","margin":"12px auto 0","color":"#64748b","fontSize":"1.05rem"}}>No matter your background, our structured curriculum and mentorship guide you step-by-step from foundations to a high-paying tech career.</p>
                    <div className="why-grid">
                        <div className="why-item">
                            <div className="why-icon-box">                <i className="fa-solid fa-graduation-cap"></i></div>
                            <h4>College Students</h4>
                            <p>Gain industry-standard practical skills and build real portfolio projects alongside your regular degree.</p>
              </div>
                        <div className="why-item">
                            <div className="why-icon-box">                <i className="fa-solid fa-user-graduate"></i></div>
                            <h4>Fresh Graduates</h4>
                            <p>Bridge the gap between college theory and corporate requirements to secure your first job.</p>
              </div>
                        <div className="why-item">
                            <div className="why-icon-box">                <i className="fa-solid fa-repeat"></i></div>
                            <h4>Career Switchers</h4>
                            <p>Transition smoothly into IT, Software Development, UI/UX, or Marketing with zero prior coding experience required.</p>
              </div>
                        <div className="why-item">
                            <div className="why-icon-box">                <i className="fa-solid fa-briefcase"></i></div>
                            <h4>Freelancers &amp; Business Owners</h4>
                            <p>Acquire high-demand technical and digital skills to build your own agency or scale your business.</p>
              </div>
            </div>
          </div>
        </section>

      

      {/* 6. 6-Month Learning Journey Timeline */}


      
      <section style={{"background":"#f8fafc","padding":"70px 20px"}}>
                <div className="container text-center">
                    <h2 style={{"fontWeight":"800","fontSize":"2.2rem","color":"#0f172a","marginBottom":"12px"}}>Your 6-Month Learning Journey</h2>
                    <p style={{"maxWidth":"700px","margin":"0 auto 50px","color":"#64748b","fontSize":"1.05rem"}}>A structured, hands-on roadmap that builds skills, confidence, and a standout portfolio.</p>
                    <div className="timeline" id="timeline">
                        <div className="timeline-fill" id="timelineFill"></div>
                        <div className="tl-item">              <div className="tl-dot">01</div>              <span className="m">Month 01</span>              <h4>Foundations &amp; Career Planning</h4>              <p>Core programming &amp; design fundamentals, version control with Git, and a personalized career roadmap.</p></div>
                        <div className="tl-item">              <div className="tl-dot">02</div>              <span className="m">Month 02</span>              <h4>Core Skills &amp; Frontend UI</h4>              <p>Interactive UI development, design principles, and building responsive client projects.</p></div>
                        <div className="tl-item">              <div className="tl-dot">03</div>              <span className="m">Month 03</span>              <h4>Backend &amp; Data Architecture</h4>              <p>Server-side logic, database management, REST APIs, and system integration.</p></div>
                        <div className="tl-item">              <div className="tl-dot">04</div>              <span className="m">Month 04</span>              <h4>Specialization &amp; Industry Tools</h4>              <p>Deep dive into your chosen track — AI, Data, Security, Full Stack, or Design.</p></div>
                        <div className="tl-item">              <div className="tl-dot">05</div>              <span className="m">Month 05</span>              <h4>Live Client Projects &amp; Internship Prep</h4>              <p>Build 2+ complete industry projects, refine your portfolio, and handle client briefs.</p></div>
                        <div className="tl-item">              <div className="tl-dot">06</div>              <span className="m">Month 06</span>              <h4>Capstone, Internship &amp; Placements</h4>              <p>Ship your capstone project, complete a live internship, and clear technical mock interviews.</p></div>
            </div>
          </div>
        </section>

      

      {/* 7. Stack & Tools Marquee */}


      
      <section style={{"padding":"60px 0","background":"#ffffff"}}>
                <div className="container text-center" style={{"marginBottom":"30px"}}>
                    <h2 style={{"fontWeight":"800","fontSize":"2.2rem","color":"#0f172a"}}>Tools &amp; Technologies You'll Master</h2>
          </div>
                <div className="marquee-wrap">
                    <div className="marquee-track" id="toolsTrack"></div>
          </div>
        </section>

      

      {/* 8. Meet Your Mentors */}


      
      <section style={{"padding":"70px 20px","background":"#f8fafc"}}>
                <div className="container">
                    <div className="text-center" style={{"marginBottom":"45px"}}>
                        <h2 style={{"fontWeight":"800","fontSize":"2.2rem","color":"#0f172a"}}>Meet Your Industry Mentors</h2>
                        <p style={{"color":"#64748b","fontSize":"1.05rem","maxWidth":"600px","margin":"10px auto 0"}}>Learn directly from experienced practitioners with real industry track records.</p>
            </div>
                    <div className="mentors-grid" id="mentorsGrid"></div>
          </div>
        </section>

      

      {/* 9. Student Placement Hiring Partners Marquee */}


      
      <section className="hiring-section" style={{"padding":"70px 0","background":"#ffffff"}}>
                <div className="container text-center">
                    <div className="section-badge" style={{"background":"rgba(255,85,50,0.1)","color":"var(--primary-orange)","padding":"6px 18px","borderRadius":"50px","fontWeight":"700","fontSize":"12px","textTransform":"uppercase","marginBottom":"15px","display":"inline-block"}}>
            Student Placements
        </div>
                    <h2 style={{"fontWeight":"800","fontSize":"2.2rem","color":"#0f172a","marginBottom":"12px"}}>Where Our Students Work</h2>
                    <p style={{"maxWidth":"700px","margin":"0 auto 40px","color":"#64748b","fontSize":"1.05rem"}}>Our alumni work at top software companies, creative agencies, and growing startups.</p>
                    <div className="logo-row row-1">
                        <div className="logo-track">
                            <div className="logo-card">                <img src="/images/app_mechanic_logo.png" alt="App Mechanic" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/social_gtm.avif" alt="Social GTM" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/cubix_technology_logo.png" alt="Cubix Technology" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/Development_logics_logo.png" alt="Development Logics" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/richest_soft_logo.svg" alt="Richest Soft" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/social_Simba.png" alt="Social Simba" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/swiftedge_solutions_logo.webp" alt="Swiftedge Solutions" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/cubeinfotech_logo.png" alt="Cube Infotech" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/unmeteredtechnologies_logo.png" alt="Unmetered Technologies" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/vagabond_logo.png" alt="Vagabond" loading="lazy" decoding="async" /></div>
                            <div className="logo-card">                <img src="/images/signore_black.png" alt="Signore" loading="lazy" decoding="async" /></div>
              </div>
            </div>
          </div>
        </section>

      

      {/* 10. Student Testimonials / Success Stories */}


      
      <section style={{"padding":"70px 20px","background":"#f8fafc"}}>
                <div className="container text-center">
                    <span style={{"color":"var(--primary-orange)","fontSize":"14px","fontWeight":"700","letterSpacing":"2px","textTransform":"uppercase"}}>Success Stories</span>
                    <h2 style={{"fontWeight":"800","fontSize":"2.2rem","color":"#0f172a","margin":"10px 0 35px"}}>Hear It From Our Students</h2>
                    <div className="testimonials-grid" id="testimonialsGrid" style={{"display":"grid","gridTemplateColumns":"repeat(auto-fit, minmax(280px, 1fr))","gap":"24px","maxWidth":"900px","margin":"0 auto 35px"}}></div>
                    <div>
                        <a className="btn-view-course" style={{"display":"inline-block","maxWidth":"280px"}} href="https://www.youtube.com/@netcodertechnology/videos" target="_blank" rel="noopener">View Video Testimonials               <i className="fa-brands fa-youtube"></i></a>
            </div>
          </div>
        </section>

      

      {/* 11. Urgency & Countdown Timer */}


      
      <section id="urgency">
                <div className="container">
                    <div className="urgency-badge">            <span className="blip"></span> Limited Seats — Next Batch Starting Soon</div>
                    <h2 style={{"fontSize":"clamp(24px, 3.5vw, 38px)","fontWeight":"800","maxWidth":"750px","margin":"0 auto 15px"}}>Transform Your Career in 6 Months. Secure Your Seat Today.</h2>
                    <p style={{"color":"rgba(255,255,255,0.9)","maxWidth":"600px","margin":"0 auto"}}>Batches filling fast for Dharamshala campus. Book a free demo class or career counseling session now.</p>
                    <div className="countdown" id="countdown">
                        <div className="cd-box">              <div className="n" id="cd-d">00</div>              <div className="l">Days</div></div>
                        <div className="cd-box">              <div className="n" id="cd-h">00</div>              <div className="l">Hours</div></div>
                        <div className="cd-box">              <div className="n" id="cd-m">00</div>              <div className="l">Mins</div></div>
                        <div className="cd-box">              <div className="n" id="cd-s">00</div>              <div className="l">Secs</div></div>
            </div>
                    <button type="button" data-modal-trigger="demo" style={{"background":"#ffffff","color":"var(--primary-dark)","fontWeight":"700","padding":"15px 36px","borderRadius":"50px","border":"none","cursor":"pointer","fontSize":"1rem","boxShadow":"0 10px 30px rgba(0,0,0,0.2)"}}>
            Book Free Demo Class             <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </section>

      

      {/* 12. Lead Capture Form */}


      
      <section id="leadform">
                <div className="container lead-grid">
                    <div>
                        <span style={{"color":"var(--primary-orange)","fontSize":"13px","fontWeight":"700","letterSpacing":"2px","textTransform":"uppercase"}}>Get Started</span>
                        <h2 style={{"fontSize":"2.2rem","fontWeight":"800","color":"#0f172a","margin":"10px 0 16px"}}>Get Your Free Personal Career Roadmap</h2>
                        <p style={{"color":"#64748b","fontSize":"1.05rem","lineHeight":"1.7"}}>Talk to our senior career counselors in Dharamshala to find the best course path based on your background and goals.</p>
                        <ul style={{"marginTop":"24px","display":"flex","flexDirection":"column","gap":"12px"}}>
                            <li style={{"display":"flex","alignItems":"center","gap":"10px","color":"#334155","fontWeight":"600"}}>                <i className="fa-solid fa-circle-check" style={{"color":"var(--primary-orange)"}}></i> Free 1-on-1 career counselling session</li>
                            <li style={{"display":"flex","alignItems":"center","gap":"10px","color":"#334155","fontWeight":"600"}}>                <i className="fa-solid fa-circle-check" style={{"color":"var(--primary-orange)"}}></i> Custom course &amp; internship roadmap</li>
                            <li style={{"display":"flex","alignItems":"center","gap":"10px","color":"#334155","fontWeight":"600"}}>                <i className="fa-solid fa-circle-check" style={{"color":"var(--primary-orange)"}}></i> Modern computer lab tour &amp; demo class</li>
              </ul>
            </div>
                    <div className="lead-card">
                        <h3 style={{"fontSize":"1.5rem","fontWeight":"700","color":"#0f172a","marginBottom":"8px"}}>Book Demo / Request Callback</h3>
                        <p style={{"color":"#64748b","fontSize":"0.9rem","marginBottom":"20px"}}>We'll reach out within 2 hours.</p>
                        <form>
                            <div style={{"marginBottom":"15px"}}>
                                <label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"#334155","marginBottom":"6px"}}>FULL NAME</label>
                                <input type="text" placeholder="Your Full Name" required style={{"width":"100%","padding":"12px 16px","borderRadius":"10px","border":"1px solid #cbd5e1","outline":"none"}} />
                </div>
                            <div style={{"marginBottom":"15px"}}>
                                <label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"#334155","marginBottom":"6px"}}>PHONE NUMBER</label>
                                <input type="tel" placeholder="+91 00000 00000" required style={{"width":"100%","padding":"12px 16px","borderRadius":"10px","border":"1px solid #cbd5e1","outline":"none"}} />
                </div>
                            <div style={{"marginBottom":"20px"}}>
                                <label style={{"display":"block","fontSize":"12px","fontWeight":"700","color":"#334155","marginBottom":"6px"}}>SELECT COURSE INTEREST</label>
                                <select required style={{"width":"100%","padding":"12px 16px","borderRadius":"10px","border":"1px solid #cbd5e1","outline":"none","background":"#fff"}}>
                                    <option value="">Select a Course</option>
                                    <option>Full Stack Web Development</option>
                                    <option>UI/UX Design</option>
                                    <option>Graphic &amp; Web Designing</option>
                                    <option>Python &amp; Data Science</option>
                                    <option>Cyber Security &amp; Hacking</option>
                                    <option>Digital Marketing</option>
                                    <option>DevOps &amp; Cloud</option>
                                    <option>AutoCAD</option>
                  </select>
                </div>
                            <button type="submit" className="btn-view-course" style={{"width":"100%","padding":"14px","border":"none","fontSize":"1rem","cursor":"pointer"}}>
                    Submit &amp; Book Free Demo                 <i className="fa-solid fa-arrow-right"></i>
                </button>
              </form>
            </div>
          </div>
        </section>

      

      {/* Interactive Scripts */}


      


      
    </>
  );
}
