"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/context";

export default function LMSLandingPage() {
  const router = useRouter();
  const { user, isAuthenticated, loginAsDemo, isLoading } = useAuth();
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  // If already authenticated, redirect after a brief moment or allow instant click
  useEffect(() => {
    if (isAuthenticated && user) {
      const timer = setTimeout(() => {
        router.push("/lms/explore");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated, user, router]);

  const handleDemoAccess = async () => {
    setIsDemoLoading(true);
    try {
      await loginAsDemo();
      router.push("/lms/explore");
    } finally {
      setIsDemoLoading(false);
    }
  };

  return (
    <div className="lms-page-wrapper">
      <div className="lms-container">
        {/* Top Bar / Breadcrumb */}
        <div className="lms-top-bar">
          <div className="lms-brand-badge">
            <div className="lms-brand-icon">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div className="lms-brand-text">
              <span>Netcoder Technology</span>
              <h1>Student Learning Portal (LMS)</h1>
            </div>
          </div>

          <div className="lms-nav-links">
            <Link href="/">← Back to Main Website</Link>
            <span>•</span>
            <Link href="/courses">All Courses</Link>
            <span>•</span>
            <Link href="/login" className="active-link">
              Student Sign In
            </Link>
          </div>
        </div>

        {/* Authenticated Banner */}
        {isAuthenticated && user && (
          <div className="lms-session-banner">
            <div className="lms-session-left">
              <div className="lms-session-avatar">
                {user.name ? user.name.charAt(0) : "S"}
              </div>
              <div className="lms-session-meta">
                <h3>Welcome back, {user.name}!</h3>
                <p>You are logged in. Redirecting to your LMS student dashboard...</p>
              </div>
            </div>
            <Link href="/lms/dashboard" className="lms-session-btn">
              Go to LMS Dashboard <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        )}

        {/* Hero Section */}
        <div className="lms-hero-box">
          <div className="lms-pill-tag">
            <i className="fa-solid fa-bolt" style={{ color: "#ff5532" }}></i>
            Official Netcoder Student Portal
          </div>
          <h2 className="lms-hero-heading">
            Learn By Doing with <span className="highlight">Netcoder </span>
          </h2>
          <p className="lms-hero-desc">
            Access your course roadmap, watch recorded lessons, submit practical
            assignments, track milestone XP, and claim verified certifications
            built for the tech industry.
          </p>
        </div>

        {/* Action Cards (Demo Student Login & Registered Student Login) */}
        <div className="lms-action-grid">
          {/* Card 1: Instant Demo Student Login (Highlighted in Netcoder #ff5532 Theme) */}
          <div className="lms-card-demo">
            <div className="lms-card-badge">⚡ Instant 1-Click Access</div>

            <div>
              <div className="lms-card-head">
                <div className="lms-card-icon-orange">
                  <i className="fa-solid fa-rocket"></i>
                </div>
                <div>
                  <h3 className="lms-card-title">Instant Demo Student</h3>
                  <p className="lms-card-sub">No Password or Registration Required</p>
                </div>
              </div>

              <p className="lms-card-body-text">
                Experience the complete Netcoder student experience right away.
                Preloaded with active course enrollments, real progress bars,
                completed lesson checklists, and milestone badges.
              </p>

              <div className="lms-demo-details">
                <div className="lms-demo-row">
                  <span className="lms-demo-label">Demo Student:</span>
                  <span className="lms-demo-val">Sahil Sandhu</span>
                </div>
                <div className="lms-demo-row">
                  <span className="lms-demo-label">Active Tracks:</span>
                  <span className="lms-demo-val" style={{ color: "#ff5532" }}>
                    Full Stack &amp; Data Science
                  </span>
                </div>
                <div className="lms-demo-row">
                  <span className="lms-demo-label">Access Level:</span>
                  <span className="lms-demo-val" style={{ color: "#10b981" }}>
                    Full LMS Access
                  </span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDemoAccess}
              disabled={isDemoLoading || isLoading}
              className="lms-btn-primary-orange"
            >
              {isDemoLoading ? (
                <>
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                  <span>Launching Dashboard...</span>
                </>
              ) : (
                <>
                  <i className="fa-solid fa-bolt"></i>
                  <span>Launch Demo Student Dashboard</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </>
              )}
            </button>
          </div>

          {/* Card 2: Registered Student Login */}
          <div className="lms-card-login">
            <div>
              <div className="lms-card-head">
                <div className="lms-card-icon-dark">
                  <i className="fa-solid fa-lock"></i>
                </div>
                <div>
                  <h3 className="lms-card-title">Registered Student Login</h3>
                  <p className="lms-card-sub" style={{ color: "#64748b" }}>
                    Enrolled Netcoder Students
                  </p>
                </div>
              </div>

              <p className="lms-card-body-text">
                Already studying at Netcoder Technology in Dharamshala or online?
                Log in to resume your active modules, assignments, and test schedules.
              </p>

              <div className="lms-card-check-list">
                <div className="lms-check-item">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Mobile OTP login with registered phone number</span>
                </div>
                <div className="lms-check-item">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>One-click Google or Institutional Email Sign In</span>
                </div>
                <div className="lms-check-item">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>Cloud progress sync across laptop, tablet &amp; mobile</span>
                </div>
              </div>
            </div>

            <Link href="/login" className="lms-btn-dark-outline">
              <span>Sign In to Student Account</span>
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="lms-features-section">
          <div className="lms-section-title-box">
            <h3>Designed for True Industry Mastery</h3>
            <p>Every feature is crafted to take you from fundamentals to employment.</p>
          </div>

          <div className="lms-grid-4">
            <div className="lms-feature-card">
              <div className="lms-feature-icon orange">
                <i className="fa-solid fa-book-open"></i>
              </div>
              <h4>Modular Syllabi</h4>
              <p>
                Structured lesson sequences covering HTML5, CSS3, JavaScript, React,
                Next.js, Node.js, Python, and Cyber Security.
              </p>
            </div>

            <div className="lms-feature-card">
              <div className="lms-feature-icon emerald">
                <i className="fa-solid fa-chart-line"></i>
              </div>
              <h4>Real-Time Progress</h4>
              <p>
                Track your syllabus milestones, completed projects, and time invested
                with interactive visual dashboards.
              </p>
            </div>

            <div className="lms-feature-card">
              <div className="lms-feature-icon blue">
                <i className="fa-solid fa-laptop-code"></i>
              </div>
              <h4>Project Sandboxes</h4>
              <p>
                Hands-on code challenges, capstone briefs, and direct repository reviews
                from senior industry instructors.
              </p>
            </div>

            <div className="lms-feature-card">
              <div className="lms-feature-icon amber">
                <i className="fa-solid fa-award"></i>
              </div>
              <h4>Verified Certificates</h4>
              <p>
                Earn verifiable completion credentials trusted by leading tech employers
                across Himachal Pradesh and India.
              </p>
            </div>
          </div>
        </div>

        {/* LMS Footer */}
        <div className="lms-footer-box">
          <p>© {new Date().getFullYear()} Netcoder Technology LMS. All rights reserved.</p>
          <div className="lms-footer-links">
            <Link href="/">Main Website</Link>
            <Link href="/courses">Courses</Link>
            <Link href="/career">Careers</Link>
            <Link href="/contact">Support</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
