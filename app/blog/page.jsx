import Link from "next/link";
import PageInteractiveHandler from "@/components/PageInteractiveHandler";

export const metadata = {
  "title": "Netcoder Technology Blog | Insights on IT Training, Trends, and Tips",
  "description": "Explore the Netcoder Technology blog for expert insights on IT training, industry trends, programming, ethical hacking, digital marketing, and more.",
  "openGraph": {
    "title": "Netcoder Technology Blog | Insights on IT Training, Trends, and Tips",
    "description": "Explore the Netcoder Technology blog for expert insights on IT training, industry trends, programming, ethical hacking, digital marketing, and more.",
    "url": "{{ url(",
    "siteName": "Netcoder Technology",
    "type": "website"
  },
  "alternates": {
    "canonical": "{{ url("
  }
};

export default function BlogArchivePage() {
  return (
    <>
      <PageInteractiveHandler pageSlug="blog" />

      <section className="page-hero">
                <ul className="circles">
                    <li></li>          <li></li>          <li></li>          <li></li>          <li></li>
                    <li></li>          <li></li>          <li></li>          <li></li>          <li></li>
          </ul>
                <div className="page-title">
                    <div>BLOGS &amp; ARTICLES</div>
                    <p>            <a href="/" style={{"color":"#fff","textDecoration":"none"}}>HOME</a> /             <b>BLOGS</b></p>
          </div>
        </section>

      
      <section className="blogs-section">
                <div className="container">
                    <div className="blog-grid-layout">
            
            {/* MAIN BLOG CARDS COLUMN */}

                        <div className="blog-main-content">
                            <div className="blog-col">
                                <article className="blog-card">
                                    <div className="blog-card-thumb">
                                        <a href="/graphics-trend-blog" title="Graphics Design Trends in 2026: The Rise of AI and 3D Visuals">
                                            <img src="/images/Graphic-Design-Trend-2025-netcoder.jpg" alt="Graphics Design Trends in 2026: The Rise of AI and 3D Visuals" loading="lazy" decoding="async" />
                      </a>
                                        <span className="blog-card-badge">Design</span>
                    </div>
                                    <div className="blog-card-content">
                                        <div className="blog-card-meta">
                                            <span>                        <i className="fa-regular fa-user"></i> Netcoder Team</span>
                                            <span>                        <i className="fa-regular fa-calendar-days"></i> Jan 15, 2026</span>
                                            <span>                        <i className="fa-regular fa-clock"></i> 5 min read</span>
                      </div>
                                        <h3 className="blog-card-title">
                                            <a href="/graphics-trend-blog" title="Graphics Design Trends in 2026: The Rise of AI and 3D Visuals">
                    Graphics Design Trends in 2026: The Rise of AI and 3D Visuals
                </a>
                      </h3>
                                        <p className="blog-card-excerpt">
                Explore the modern design movements shaping brand identities, generative AI visual tooling, spatial 3D elements, and hyper-minimalist typography in 2026.
            </p>
                                        <div className="blog-card-footer">
                                            <a href="/graphics-trend-blog" className="blog-card-read" title="Read more: Graphics Design Trends in 2026: The Rise of AI and 3D Visuals">
                                                <span>Read Article</span>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="5" y1="12" x2="19" y2="12" />
                                                    <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </article>
                                <article className="blog-card">
                                    <div className="blog-card-thumb">
                                        <a href="/typography-blog" title="Typography in Modern Web Design: Fonts That Convert">
                                            <img src="/images/typography.jpg" alt="Typography in Modern Web Design: Fonts That Convert" loading="lazy" decoding="async" />
                      </a>
                                        <span className="blog-card-badge">UI/UX</span>
                    </div>
                                    <div className="blog-card-content">
                                        <div className="blog-card-meta">
                                            <span>                        <i className="fa-regular fa-user"></i> Netcoder Team</span>
                                            <span>                        <i className="fa-regular fa-calendar-days"></i> Feb 02, 2026</span>
                                            <span>                        <i className="fa-regular fa-clock"></i> 4 min read</span>
                      </div>
                                        <h3 className="blog-card-title">
                                            <a href="/typography-blog" title="Typography in Modern Web Design: Fonts That Convert">
                    Typography in Modern Web Design: Fonts That Convert
                </a>
                      </h3>
                                        <p className="blog-card-excerpt">
                How font pairings, variable typography, readability contrast, and fluid font scales dramatically improve user engagement and retention across mobile interfaces.
            </p>
                                        <div className="blog-card-footer">
                                            <a href="/typography-blog" className="blog-card-read" title="Read more: Typography in Modern Web Design: Fonts That Convert">
                                                <span>Read Article</span>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="5" y1="12" x2="19" y2="12" />
                                                    <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </article>
                                <article className="blog-card">
                                    <div className="blog-card-thumb">
                                        <a href="/web-dev-blog" title="Full Stack Web Development in 2026: Roadmap and Key Skills">
                                            <img src="/images/web-dev-blog.jpg" alt="Full Stack Web Development in 2026: Roadmap and Key Skills" loading="lazy" decoding="async" />
                      </a>
                                        <span className="blog-card-badge">Development</span>
                    </div>
                                    <div className="blog-card-content">
                                        <div className="blog-card-meta">
                                            <span>                        <i className="fa-regular fa-user"></i> Netcoder Team</span>
                                            <span>                        <i className="fa-regular fa-calendar-days"></i> Feb 20, 2026</span>
                                            <span>                        <i className="fa-regular fa-clock"></i> 6 min read</span>
                      </div>
                                        <h3 className="blog-card-title">
                                            <a href="/web-dev-blog" title="Full Stack Web Development in 2026: Roadmap and Key Skills">
                    Full Stack Web Development in 2026: Roadmap and Key Skills
                </a>
                      </h3>
                                        <p className="blog-card-excerpt">
                A complete step-by-step developer roadmap covering Next.js App Router, TypeScript, server actions, PostgreSQL, microservices, and AI integrations.
            </p>
                                        <div className="blog-card-footer">
                                            <a href="/web-dev-blog" className="blog-card-read" title="Read more: Full Stack Web Development in 2026: Roadmap and Key Skills">
                                                <span>Read Article</span>
                                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                    <line x1="5" y1="12" x2="19" y2="12" />
                                                    <polyline points="12 5 19 12 12 19" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            
            {/* RIGHT SIDEBAR */}

                        <div className="blog-sidebar">
              
              {/* Search Widget */}

                            <div className="sidebar-widget">
                                <h4>                  <i className="fa-solid fa-magnifying-glass" style={{"color":"#ff5532"}}></i> Search Articles</h4>
                                <form action="/blog" method="GET" className="search-widget-form">
                                    <input type="text" name="search" placeholder="Type keywords..." defaultValue="" />
                                    <button type="submit" title="Search">                    <i className="fa-solid fa-magnifying-glass"></i></button>
                  </form>
                </div>
              
              {/* Categories Widget */}

                            <div className="sidebar-widget">
                                <h4>                  <i className="fa-solid fa-folder-open" style={{"color":"#ff5532"}}></i> Categories</h4>
                                <ul className="category-list">
                                    <li>                    <a href="/blog" className="active">                      <span>All Categories</span>                      <i className="fa-solid fa-chevron-right" style={{"fontSize":"0.75rem"}}></i></a></li>
                                    <li>                    <a href="/blog">                      <span>Development</span>                      <i className="fa-solid fa-chevron-right" style={{"fontSize":"0.75rem"}}></i></a></li>
                                    <li>                    <a href="/blog">                      <span>UI/UX Design</span>                      <i className="fa-solid fa-chevron-right" style={{"fontSize":"0.75rem"}}></i></a></li>
                                    <li>                    <a href="/blog">                      <span>Data Science</span>                      <i className="fa-solid fa-chevron-right" style={{"fontSize":"0.75rem"}}></i></a></li>
                                    <li>                    <a href="/blog">                      <span>Cyber Security</span>                      <i className="fa-solid fa-chevron-right" style={{"fontSize":"0.75rem"}}></i></a></li>
                                    <li>                    <a href="/blog">                      <span>Digital Marketing</span>                      <i className="fa-solid fa-chevron-right" style={{"fontSize":"0.75rem"}}></i></a></li>
                  </ul>
                </div>
                        @endforeach
                    
                </div>
                @endif

                
            {/* Recent Posts Widget */}

                        <div className="sidebar-widget">
                            <h4>                <i className="fa-solid fa-fire" style={{"color":"#ff5532"}}></i> Recent Articles</h4>
                            <div className="recent-posts-list">
                                <div className="recent-post-item">
                                    <div className="recent-post-thumb">
                                        <a href="/graphics-trend-blog">                      <img src="/images/Graphic-Design-Trend-2025-netcoder.jpg" alt="Graphics Design Trends in 2026: The Rise of AI and 3D Visuals" loading="lazy" decoding="async" /></a>
                    </div>
                                    <div>
                                        <h5 className="recent-post-title">                      <a href="/graphics-trend-blog">Graphics Design Trends in 2026: The Rise of AI and 3D Visuals</a></h5>
                                        <span className="recent-post-date">                      <i className="fa-regular fa-calendar-days"></i> Jan 15, 2026</span>
                    </div>
                  </div>
                                <div className="recent-post-item">
                                    <div className="recent-post-thumb">
                                        <a href="/typography-blog">                      <img src="/images/typography.jpg" alt="Typography in Modern Web Design: Fonts That Convert" loading="lazy" decoding="async" /></a>
                    </div>
                                    <div>
                                        <h5 className="recent-post-title">                      <a href="/typography-blog">Typography in Modern Web Design: Fonts That Convert</a></h5>
                                        <span className="recent-post-date">                      <i className="fa-regular fa-calendar-days"></i> Feb 02, 2026</span>
                    </div>
                  </div>
                                <div className="recent-post-item">
                                    <div className="recent-post-thumb">
                                        <a href="/web-dev-blog">                      <img src="/images/web-dev-blog.jpg" alt="Full Stack Web Development in 2026: Roadmap and Key Skills" loading="lazy" decoding="async" /></a>
                    </div>
                                    <div>
                                        <h5 className="recent-post-title">                      <a href="/web-dev-blog">Full Stack Web Development in 2026: Roadmap and Key Skills</a></h5>
                                        <span className="recent-post-date">                      <i className="fa-regular fa-calendar-days"></i> Feb 20, 2026</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
                        @endforeach
                    
                
                @endif

                
        {/* CTA Banner Widget */}

                <div className="sidebar-widget" style={{"background":"linear-gradient(135deg, #0f172a 0%, #1e293b 100%)","color":"#fff","textAlign":"center","borderColor":"#334155"}}>
                    <div style={{"width":"50px","height":"50px","background":"rgba(255, 85, 50, 0.15)","borderRadius":"50%","display":"flex","alignItems":"center","justifyContent":"center","margin":"0 auto 12px","color":"#ff5532","fontSize":"1.3rem"}}>
                        <i className="fa-solid fa-headset"></i>
            </div>
                    <h4 style={{"color":"#fff","borderBottom":"none","paddingBottom":"0","justifyContent":"center","marginBottom":"8px"}}>Need Career Guidance?</h4>
                    <p style={{"fontSize":"0.88rem","color":"#cbd5e1","lineHeight":"1.6","marginBottom":"20px"}}>
                        Talk with our expert mentors to choose the right IT course for your career growth.
                    </p>
                    <a href="/contact" className="color-btn" style={{"display":"block","width":"100%","textDecoration":"none","borderRadius":"10px","textAlign":"center","padding":"12px"}}>Contact Tech Advisor</a>
          </div>
        </section>

      
    </>
  );
}
