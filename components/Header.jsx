"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/context";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [campusOpen, setCampusOpen] = useState(false);
  const [onlineOpen, setOnlineOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();

  // Scroll listener for is-scrolled state (matches Laravel main.js)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sync index-page body class & close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
    setCampusOpen(false);
    setOnlineOpen(false);

    if (pathname === "/") {
      document.body.classList.add("index-page");
    } else {
      document.body.classList.remove("index-page");
    }
  }, [pathname]);

  // Handle escape key to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Exclude from admin, feedback, standalone bootcamp, login, register, mentor, or full-screen LMS dashboard sub-pages
  if (
    pathname &&
    (pathname.startsWith("/admin") ||
      pathname === "/feedback" ||
      pathname === "/bootcamp" ||
      pathname === "/login" ||
      pathname === "/register" ||
      pathname.startsWith("/mentor") ||
      pathname.startsWith("/lms"))
  ) {
    return null;
  }

  return (
    <>
      <header className="main-header">
        <nav className={`main-nav ${isScrolled ? "is-scrolled" : ""}`}>
          {/* LOGO */}
          <div className="brand-logo">
            <Link href="/" title="Netcoder Technology">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/logo.png"
                alt="Netcoder Technology"
                loading="eager"
              />
            </Link>
          </div>

          {/* MENU */}
          <div className="menu-wrapper">
            {/* ON CAMPUS */}
            <div className="menu-item">
              <div className="menu-link">
                <i className="fa-solid fa-building-columns"></i>
                On-Campus Courses <span className="icon-arrow"></span>
              </div>

              <div className="mega-box">
                <div className="mega-grid">
                  {/* COL 1 */}
                  <div className="mega-col">
                    <h4>Design & Multimedia Courses</h4>
                    <Link href="/foundation-graphic">Graphic Designing</Link>
                    <Link href="/web-designing">Web Designing</Link>
                    <Link href="/ui-ux">UI & UX Design</Link>
                    <Link href="/animation">2D/3D Animation</Link>
                    <Link href="/motion-graphics">Motion Graphics</Link>
                    <Link href="/graphic-and-web-designing">
                      Graphics & Web Designing
                    </Link>
                    <Link href="/digital-content-creator">
                      Digital Content Creator
                    </Link>
                    <Link href="/autocad">Auto CAD</Link>
                  </div>

                  {/* COL 2 */}
                  <div className="mega-col">
                    <h4>CMS & Web Technologies Courses</h4>
                    <Link href="/web-development">Web Development</Link>
                    <Link href="/fullstack-web-development">
                      Full Stack Development
                    </Link>
                    <Link href="/mern-stack">MERN Stack</Link>
                    <Link href="/mean-stack">MEAN Stack</Link>
                    <Link href="/php-training">PHP Training</Link>
                    <Link href="/wordpress">WordPress</Link>

                    <h4>Digital Marketing Courses</h4>
                    <Link href="/digital-marketing">Digital Marketing</Link>
                    <Link href="/social-media-marketing">
                      Social Media Marketing
                    </Link>
                    <Link href="/seo-course">SEO Course</Link>
                  </div>

                  {/* COL 3 */}
                  <div className="mega-col">
                    <h4>Professional Training Courses</h4>
                    <Link href="/business-analytics">
                      Data Science & Business Analytics
                    </Link>
                    <Link href="/data-science-machine-learning">
                      Data Science & Machine Learning
                    </Link>
                    <Link href="/data-analytics">Data Analytics</Link>
                    <Link href="/cyber-security">
                      Complete Cyber Security Course
                    </Link>
                    <Link href="/ethical-hacking">Ethical Hacking</Link>
                    <Link href="/software-engineering">
                      Software Engineering With Python
                    </Link>

                    <h4>Additional Courses</h4>
                    <Link href="/system-design">
                      System Design & Operating Systems
                    </Link>
                    <Link href="/data-structures">
                      Algorithm & Data Structures In Python
                    </Link>
                    <Link href="/devops-course">DevOps Course</Link>
                  </div>
                </div>
              </div>
            </div>

            {/* ONLINE */}
            <div className="menu-item">
              <div className="menu-link">
                <i className="fa-solid fa-laptop"></i>
                Online Courses<span className="icon-arrow"></span>
              </div>

              <div className="mega-box small">
                <h4 className="underlineheading">
                  Online Professional Courses
                </h4>

                <div className="mega-grid small-grid">
                  <div className="mega-col">
                    <Link href="/web-app-online">Full Stack & Apps</Link>
                    <Link href="/digital-marketing-online">
                      Digital Marketing
                    </Link>
                    <Link href="/data-science-online">Data Science</Link>
                  </div>

                  <div className="mega-col">
                    <Link href="/data-analytics-online">Data Analytics</Link>
                    <Link href="/ethical-hacking-online">Ethical Hacking</Link>
                  </div>
                </div>
              </div>
            </div>

            <Link href="/services" className="menu-link">
              Services
            </Link>
          </div>

          {/* RIGHT */}
          <div className="right-menu">
            {isAuthenticated && user ? (
              <Link
                href="/lms/dashboard"
                className="header-lms-btn logged-in"
                title={`Logged in as ${user.name} - Open LMS Dashboard`}
              >
                <i className="fa-solid fa-graduation-cap"></i>
                <span>LMS Portal</span>
                <span className="lms-btn-dot"></span>
              </Link>
            ) : (
              <Link
                href="/lms"
                className="header-lms-btn"
                title="Student LMS & Login Portal"
              >
                <i className="fa-solid fa-graduation-cap"></i>
                <span>LMS Login</span>
              </Link>
            )}

            <div
              className="menu-toggle"
              id="openMenu"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              role="button"
              tabIndex={0}
              style={{ cursor: "pointer" }}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
            <Link href="/contact" className="color-btn">
              Contact
            </Link>
          </div>
        </nav>
      </header>

      {/* side menu */}
      <div
        className={`side-menu ${mobileOpen ? "active" : ""}`}
        id="mobileMenu"
      >
        {/* Side Menu Header (Logo & Close) */}
        <div className="side-menu-header">
          <Link
            href="/"
            className="side-menu-logo"
            title="Netcoder Technology"
            onClick={() => setMobileOpen(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo.png"
              alt="Netcoder Technology"
              loading="lazy"
              decoding="async"
            />
          </Link>
          <div
            className="close-icon"
            id="closeMenu"
            aria-label="Close Menu"
            role="button"
            tabIndex={0}
            onClick={() => setMobileOpen(false)}
          >
            ✕
          </div>
        </div>

        {/* Dedicated Student LMS Box in Sidebar */}
        <div className="side-lms-card">
          {isAuthenticated && user ? (
            <div className="side-lms-inner">
              <div className="side-lms-user-row">
                <div className="side-lms-avatar">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <div className="side-lms-user-meta">
                  <span className="side-lms-badge">Active Student</span>
                  <strong className="side-lms-name">{user.name}</strong>
                </div>
              </div>
              <div className="side-lms-btn-row">
                <Link
                  href="/lms/dashboard"
                  className="side-lms-primary-btn"
                  onClick={() => setMobileOpen(false)}
                >
                  <i className="fa-solid fa-gauge-high"></i> My Dashboard
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className="side-lms-logout-btn"
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="side-lms-inner">
              <div className="side-lms-header-row">
                <div className="side-lms-icon">
                  <i className="fa-solid fa-graduation-cap"></i>
                </div>
                <div>
                  <h4 className="side-lms-heading">Student LMS Portal</h4>
                  <p className="side-lms-sub">Video lessons, notes & progress</p>
                </div>
              </div>
              <div className="side-lms-btn-row">
                <Link
                  href="/lms"
                  className="side-lms-primary-btn"
                  onClick={() => setMobileOpen(false)}
                >
                  ⚡ Instant Demo / Access
                </Link>
                <Link
                  href="/login"
                  className="side-lms-secondary-btn"
                  onClick={() => setMobileOpen(false)}
                >
                  🔑 Student Login
                </Link>
              </div>
            </div>
          )}
        </div>

        <div className="side-links">
          <Link
            href="/lms"
            className="side-link-lms"
            onClick={() => setMobileOpen(false)}
          >
            <i className="fa-solid fa-graduation-cap"></i> Student LMS Portal
          </Link>
          <Link href="/" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link href="/about" onClick={() => setMobileOpen(false)}>
            About
          </Link>

          <div
            className={`side-item course-campus ${campusOpen ? "active" : ""}`}
            onClick={(e) => {
              if (e.target.tagName !== "A") {
                setCampusOpen(!campusOpen);
                if (!campusOpen) setOnlineOpen(false);
              }
            }}
          >
            <div className="menu-link">
              <i className="fa-solid fa-building-columns"></i>
              On-Campus Courses <span className="icon-arrow"></span>
            </div>

            {/* side dropdown */}
            <div className="side-dropdown">
              {/* COL 1 */}
              <div className="side-col">
                <h4>Design & Multimedia</h4>
                <Link
                  href="/foundation-graphic"
                  onClick={() => setMobileOpen(false)}
                >
                  Graphic Designing
                </Link>
                <Link
                  href="/web-designing"
                  onClick={() => setMobileOpen(false)}
                >
                  Web Designing
                </Link>
                <Link href="/ui-ux" onClick={() => setMobileOpen(false)}>
                  UI & UX Design
                </Link>
                <Link href="/animation" onClick={() => setMobileOpen(false)}>
                  2D/3D Animation
                </Link>
                <Link
                  href="/motion-graphics"
                  onClick={() => setMobileOpen(false)}
                >
                  Motion Graphics
                </Link>
                <Link
                  href="/graphic-and-web-designing"
                  onClick={() => setMobileOpen(false)}
                >
                  Graphics & Web Designing
                </Link>
                <Link
                  href="/digital-content-creator"
                  onClick={() => setMobileOpen(false)}
                >
                  Digital Content Creator
                </Link>
                <Link href="/autocad" onClick={() => setMobileOpen(false)}>
                  Auto Cad
                </Link>
              </div>

              {/* COL 2 */}
              <div className="mega-col">
                <h4>CMS & Web Tech</h4>
                <Link
                  href="/web-development"
                  onClick={() => setMobileOpen(false)}
                >
                  Web Development
                </Link>
                <Link
                  href="/fullstack-web-development"
                  onClick={() => setMobileOpen(false)}
                >
                  Full Stack Development
                </Link>
                <Link href="/mern-stack" onClick={() => setMobileOpen(false)}>
                  MERN Stack
                </Link>
                <Link href="/mean-stack" onClick={() => setMobileOpen(false)}>
                  MEAN Stack
                </Link>
                <Link href="/php-training" onClick={() => setMobileOpen(false)}>
                  PHP Training
                </Link>
                <Link href="/wordpress" onClick={() => setMobileOpen(false)}>
                  WordPress
                </Link>
              </div>

              {/* COL 3 */}
              <div className="mega-col">
                <h4>Professional Courses</h4>
                <Link
                  href="/business-analytics"
                  onClick={() => setMobileOpen(false)}
                >
                  Data Science & Business Analytics
                </Link>
                <Link
                  href="/data-science-machine-learning"
                  onClick={() => setMobileOpen(false)}
                >
                  Data Science & Machine Learning
                </Link>
                <Link href="/data-analytics" onClick={() => setMobileOpen(false)}>
                  Data Analytics
                </Link>
                <Link
                  href="/cyber-security"
                  onClick={() => setMobileOpen(false)}
                >
                  Complete Cyber Security Course
                </Link>
                <Link
                  href="/ethical-hacking"
                  onClick={() => setMobileOpen(false)}
                >
                  Ethical Hacking
                </Link>
                <Link
                  href="/software-engineering"
                  onClick={() => setMobileOpen(false)}
                >
                  Software Engineering With Python
                </Link>
              </div>

              {/* COL 4 */}
              <div className="mega-col">
                <h4 className="bottomh4">Additional Courses</h4>
                <Link
                  href="/system-design"
                  onClick={() => setMobileOpen(false)}
                >
                  System Design & Operating Systems
                </Link>
                <Link
                  href="/data-structures"
                  onClick={() => setMobileOpen(false)}
                >
                  Algorithm & Data Structures In Python
                </Link>
                <Link href="/devops-course" onClick={() => setMobileOpen(false)}>
                  DevOps Course
                </Link>

                <h4 className="mt">Digital Marketing</h4>
                <Link
                  href="/digital-marketing"
                  onClick={() => setMobileOpen(false)}
                >
                  Digital Marketing
                </Link>
                <Link
                  href="/social-media-marketing"
                  onClick={() => setMobileOpen(false)}
                >
                  Social Media Marketing
                </Link>
                <Link href="/seo-course" onClick={() => setMobileOpen(false)}>
                  SEO Course
                </Link>
              </div>
            </div>
          </div>

          {/* ONLINE */}
          <div
            className={`side-item course-online ${onlineOpen ? "active" : ""}`}
            onClick={(e) => {
              if (e.target.tagName !== "A") {
                setOnlineOpen(!onlineOpen);
                if (!onlineOpen) setCampusOpen(false);
              }
            }}
          >
            <div className="side-title">
              <i className="fa-solid fa-laptop"></i>
              Online Courses<span className="icon-arrow"></span>
            </div>
            <div className="side-dropdown">
              <Link
                href="/web-app-online"
                onClick={() => setMobileOpen(false)}
              >
                Full Stack & Apps
              </Link>
              <Link
                href="/digital-marketing-online"
                onClick={() => setMobileOpen(false)}
              >
                Digital Marketing
              </Link>
              <Link
                href="/data-science-online"
                onClick={() => setMobileOpen(false)}
              >
                Data Science
              </Link>
              <Link
                href="/data-analytics-online"
                onClick={() => setMobileOpen(false)}
              >
                Data Analytics
              </Link>
              <Link
                href="/ethical-hacking-online"
                onClick={() => setMobileOpen(false)}
              >
                Ethical Hacking
              </Link>
            </div>
          </div>

          <Link
            href="/services"
            className="mobile-only-link"
            onClick={() => setMobileOpen(false)}
          >
            Services
          </Link>
          <Link
            href="/industrial-training"
            onClick={() => setMobileOpen(false)}
          >
            Industrial Training
          </Link>
          <Link href="/gallery" onClick={() => setMobileOpen(false)}>
            Gallery
          </Link>
          <Link href="/blog" onClick={() => setMobileOpen(false)}>
            Blog
          </Link>
          <Link href="/career" onClick={() => setMobileOpen(false)}>
            Career
          </Link>
          <Link href="/contact" onClick={() => setMobileOpen(false)}>
            Contact
          </Link>
        </div>
      </div>

      {/* side menu overlay backdrop */}
      <div
        className={`side-overlay ${mobileOpen ? "active" : ""}`}
        id="sideOverlay"
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
      ></div>
    </>
  );
}
