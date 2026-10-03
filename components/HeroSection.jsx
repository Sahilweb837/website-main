"use client";

import React, { useState } from "react";

/* ============================================================
   NETCODER VIBRANT MODERN HERO SECTION — Fixed React Component
   - Buttons aligned properly on mobile
   - Responsive layout with proper stacking
   - Inline styles instead of Tailwind for compatibility
   - All orbit elements and floating pills preserved
   ============================================================ */

export default function HeroSection() {
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    course: "Full Stack Web Development",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/demo-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (_) { }
    setSubmitting(false);
    setSubmitted(true);
  };

  /* ---------- INLINE STYLES ---------- */
  const styles = {
    section: {
      position: "relative",
      overflow: "hidden",
      background: "#ffffff",
      color: "#111111",
      paddingTop: "1.5rem",
      paddingBottom: "3rem",
      fontFamily:
        "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
    container: {
      maxWidth: "80rem",
      margin: "0 auto",
      padding: "0 1.5rem",
      position: "relative",
      zIndex: 10,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "1fr",
      gap: "2.5rem",
      alignItems: "center",
    },
    badge: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.5rem",
      padding: "0.375rem 0.875rem",
      borderRadius: "9999px",
      background: "rgba(255, 85, 50, 0.1)",
      border: "1px solid rgba(255, 85, 50, 0.2)",
      color: "#ff5532",
      fontWeight: 600,
      fontSize: "0.813rem",
    },
    headline: {
      fontSize: "clamp(2.25rem, 6vw, 3.75rem)",
      fontWeight: 800,
      letterSpacing: "-0.025em",
      lineHeight: 1.14,
      color: "#111111",
      margin: "1.75rem 0 0 0",
    },
    highlight: {
      color: "#ff5532",
      position: "relative",
      display: "inline-block",
    },
    subtitle: {
      fontSize: "1.125rem",
      color: "#575757",
      lineHeight: 1.7,
      maxWidth: "36rem",
      marginTop: "1.75rem",
      fontWeight: 400,
    },
    trendingRow: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "0.5rem",
      marginTop: "1.5rem",
    },
    trendingLabel: {
      fontSize: "0.75rem",
      fontWeight: 700,
      color: "#a3a3a3",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      marginRight: "0.25rem",
    },
    trendPill: {
      display: "inline-flex",
      alignItems: "center",
      gap: "0.375rem",
      padding: "0.25rem 0.75rem",
      borderRadius: "9999px",
      fontSize: "0.75rem",
      fontWeight: 600,
      background: "#ffffff",
      border: "1px solid #e5e5e5",
      color: "#575757",
      textDecoration: "none",
      transition: "all 0.2s",
    },
    trendBadgeHot: {
      fontSize: "10px",
      padding: "0.125rem 0.375rem",
      borderRadius: "9999px",
      background: "#ffedd5",
      color: "#ff5532",
      fontWeight: 700,
    },
    ctaRow: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "1rem",
      marginTop: "1.75rem",
    },
    ctaPrimary: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.625rem",
      background: "#ff5532",
      color: "#ffffff",
      fontWeight: 700,
      fontSize: "0.938rem",
      padding: "0.875rem 2rem",
      borderRadius: "9999px",
      textDecoration: "none",
      boxShadow: "0 10px 15px -3px rgba(255, 85, 50, 0.3)",
      transition: "all 0.2s",
    },
    ctaSecondary: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.5rem",
      padding: "0.875rem 1.5rem",
      borderRadius: "9999px",
      border: "1px solid #e5e5e5",
      background: "#ffffff",
      color: "#111111",
      fontWeight: 600,
      fontSize: "0.938rem",
      cursor: "pointer",
      transition: "all 0.2s",
    },
    statsRow: {
      display: "flex",
      alignItems: "center",
      gap: "2rem",
      paddingTop: "1.5rem",
      borderTop: "1px solid #f5f5f5",
      marginTop: "1.5rem",
      flexWrap: "wrap",
    },
    statValue: {
      fontSize: "1.5rem",
      fontWeight: 700,
      color: "#111111",
    },
    statLabel: {
      fontSize: "0.813rem",
      color: "#575757",
      fontWeight: 500,
    },
    statDivider: {
      width: "1px",
      height: "2.25rem",
      background: "#e5e5e5",
    },
    rightCol: {
      position: "relative",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "31.25rem",
      userSelect: "none",
    },
    image: {
      position: "relative",
      zIndex: 10,
      width: "100%",
      height: "auto",
      objectFit: "contain",
      pointerEvents: "none",
      mixBlendMode: "multiply",
    },
    fingerPulse: {
      position: "absolute",
      top: "7.5%",
      left: "26.5%",
      transform: "translate(-50%, -50%)",
      zIndex: 20,
      pointerEvents: "none",
    },
    partnerBar: {
      marginTop: "3.5rem",
      paddingTop: "1.5rem",
      borderTop: "1px solid #f5f5f5",
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "1.5rem",
      color: "#575757",
    },
    partnerLabel: {
      fontSize: "0.75rem",
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      color: "#a3a3a3",
    },
    partnerLogos: {
      display: "flex",
      flexWrap: "wrap",
      alignItems: "center",
      gap: "2rem",
      fontWeight: 700,
      fontSize: "0.875rem",
      color: "#a3a3a3",
      filter: "grayscale(1)",
      opacity: 0.8,
    },
    modalOverlay: {
      position: "fixed",
      inset: 0,
      zIndex: 120,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(4px)",
      padding: "1rem",
    },
    modalCard: {
      position: "relative",
      width: "100%",
      maxWidth: "28rem",
      background: "#ffffff",
      borderRadius: "1.5rem",
      padding: "2rem",
      boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)",
      border: "1px solid #f5f5f5",
    },
  };

  /* ---------- RESPONSIVE STYLES INJECTED ---------- */
  const responsiveCSS = `
    @media (min-width: 1024px) {
      .hero-grid { grid-template-columns: repeat(12, 1fr) !important; }
      .hero-left { grid-column: span 6 !important; }
      .hero-right { grid-column: span 6 !important; }
      .hero-section { padding-top: 2.5rem !important; padding-bottom: 4rem !important; }
    }
    @media (max-width: 640px) {
      .cta-row { flex-direction: column !important; align-items: stretch !important; }
      .cta-row a, .cta-row button { width: 100% !important; justify-content: center !important; }
      .stats-row { gap: 1.25rem !important; }
      .stat-divider { display: none !important; }
      .finger-pulse { display: none !important; }
    }
    @keyframes floatSlow {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-6px); }
    }
    .animate-float-1 { animation: floatSlow 4.5s ease-in-out infinite; }
    .animate-float-2 { animation: floatSlow 5.2s ease-in-out infinite 0.7s; }
    .animate-float-3 { animation: floatSlow 4.8s ease-in-out infinite 1.4s; }
    .animate-float-4 { animation: floatSlow 5.5s ease-in-out infinite 2s; }
    .pill-link { text-decoration: none; }
    .pill-link:hover { transform: translateY(-2px); }
  `;

  return (
    <>
      <style>{responsiveCSS}</style>
      <section id="hero" style={styles.section} className="hero-section">
        {/* ========== AMBIENT ORBIT CIRCLES & GLOW ========== */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              right: "1rem",
              top: "50%",
              transform: "translateY(-50%)",
              width: "540px",
              height: "540px",
              background:
                "linear-gradient(to top right, rgba(255,85,50,0.15), rgba(255,120,73,0.1), transparent)",
              borderRadius: "50%",
              filter: "blur(64px)",
              opacity: 0.75,
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "3rem",
              top: "50%",
              transform: "translateY(-50%)",
              width: "380px",
              height: "380px",
              background: "rgba(255,85,50,0.1)",
              borderRadius: "50%",
              filter: "blur(40px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              width: "560px",
              height: "560px",
              borderRadius: "50%",
              border: "1px solid rgba(224,242,254,0.7)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "-60px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "760px",
              height: "760px",
              borderRadius: "50%",
              border: "1px solid rgba(255,237,213,0.5)",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "-140px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "980px",
              height: "980px",
              borderRadius: "50%",
              border: "1px solid rgba(241,245,249,0.6)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "28%",
              right: "44%",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "rgba(45,212,191,0.4)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "24%",
              right: "48%",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "rgba(251,146,60,0.3)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "36%",
              right: "12%",
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "rgba(165,180,252,0.4)",
            }}
          />
        </div>

        <div style={styles.container}>
          <div style={styles.grid} className="hero-grid">
            {/* ================= LEFT CONTENT COLUMN ================= */}
            <div className="hero-left" style={{ zIndex: 20 }}>
              {/* Badge */}
              <div style={styles.badge}>
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: "#ff5532",
                  }}
                />
                <span>✦ Next-Gen Spatial Tech &amp; Coding Courses</span>
              </div>

              {/* Main Headline */}
              <h1 style={styles.headline}>
                Master In-Demand{" "}
                <span style={styles.highlight}>
                  Tech &amp; Design
                  <svg
                    style={{
                      position: "absolute",
                      bottom: "-8px",
                      left: 0,
                      width: "100%",
                    }}
                    height="8"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 8"
                  >
                    <path
                      d="M0,5 Q50,0 100,5"
                      fill="none"
                      stroke="#ff5532"
                      strokeLinecap="round"
                      strokeWidth="3"
                    />
                  </svg>
                </span>{" "}
                in Immersive 3D
              </h1>

              {/* Subtitle */}
              <p style={styles.subtitle}>
                Learn hands-on courses designed for real-world mastery. Build
                future-ready projects across VS Code, Web Dev, Figma, and Adobe
                Creative Suite inside an interactive VR learning workspace.
              </p>

              {/* Trending Quick Links */}
              <div style={styles.trendingRow}>
                <span style={styles.trendingLabel}>Trending:</span>
                <a href="/lms/explore?category=development" style={styles.trendPill}>
                  <span>Full Stack Web</span>
                  <span style={styles.trendBadgeHot}>Hot</span>
                </a>
                <a href="/lms/explore?category=data" style={styles.trendPill}>
                  <span>Python &amp; AI / ML</span>
                  <span
                    style={{
                      ...styles.trendBadgeHot,
                      background: "#fef3c7",
                      color: "#b45309",
                    }}
                  >
                    Trending
                  </span>
                </a>
                <a href="/lms/explore?category=design" style={styles.trendPill}>
                  <span>Figma UI/UX</span>
                  <span
                    style={{
                      ...styles.trendBadgeHot,
                      background: "#ccfbf1",
                      color: "#0f766e",
                    }}
                  >
                    Pro
                  </span>
                </a>
                <a href="/lms/explore?category=security" style={styles.trendPill}>
                  <span>Cyber Security</span>
                  <span
                    style={{
                      ...styles.trendBadgeHot,
                      background: "#ffe4e6",
                      color: "#be123c",
                    }}
                  >
                    New
                  </span>
                </a>
              </div>

              {/* CTAs */}
              <div style={styles.ctaRow} className="cta-row">
                <a href="/lms/explore" style={styles.ctaPrimary}>
                  <span>Explore All Courses →</span>
                </a>
                <button
                  type="button"
                  onClick={() => setDemoModalOpen(true)}
                  style={styles.ctaSecondary}
                >
                  <svg
                    style={{ width: "16px", height: "16px", color: "#ff5532" }}
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  <span>Book Free Demo</span>
                </button>
              </div>

              {/* Social Proof & Stats */}
              <div style={styles.statsRow} className="stats-row">
                <div>
                  <div style={styles.statValue}>40+ Pro Courses</div>
                  <div style={styles.statLabel}>Industry-standard tracks</div>
                </div>
                <div style={styles.statDivider} className="stat-divider" />
                <div>
                  <div style={styles.statValue}>98% Completion Rate</div>
                  <div style={styles.statLabel}>Over 35,000 active learners</div>
                </div>
              </div>
            </div>

            {/* ================= RIGHT COLUMN ================= */}
            <div style={styles.rightCol} className="hero-right">
              {/* Orbital SVG Guides */}
              <svg
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  pointerEvents: "none",
                  zIndex: 10,
                }}
                fill="none"
                viewBox="0 0 600 620"
              >
                <ellipse
                  cx="300"
                  cy="330"
                  opacity="0.6"
                  rx="240"
                  ry="240"
                  stroke="#fed7aa"
                  strokeDasharray="4 6"
                  strokeWidth="1.5"
                />
                <ellipse
                  cx="300"
                  cy="330"
                  opacity="0.6"
                  rx="180"
                  ry="180"
                  stroke="#e0e7ff"
                  strokeDasharray="3 5"
                  strokeWidth="1.2"
                />
                <path
                  d="M 160 110 C 230 60, 380 40, 470 70"
                  opacity="0.75"
                  stroke="#7dd3fc"
                  strokeDasharray="3 4"
                  strokeWidth="1.2"
                />
                <path
                  d="M 160 110 C 270 140, 420 180, 500 240"
                  opacity="0.75"
                  stroke="#5eead4"
                  strokeDasharray="3 4"
                  strokeWidth="1.2"
                />
                <path
                  d="M 160 110 C 130 180, 80 250, 45 310"
                  opacity="0.75"
                  stroke="#fbcfe8"
                  strokeDasharray="3 4"
                  strokeWidth="1.2"
                />
                <path
                  d="M 320 370 C 400 390, 460 430, 490 480"
                  opacity="0.75"
                  stroke="#fdba74"
                  strokeDasharray="3 4"
                  strokeWidth="1.2"
                />
              </svg>

              {/* Cutout VR Girl Image */}
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "440px",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  alt="Woman wearing VR headset in vibrant orange jacket pointing upwards"
                  style={styles.image}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5LPUEoVEjPMFJE0AsVjnTNJnwcq4fv_X4PEmx_P_RnEU95P_eUDRShtKT0Mps9pljhkyyKbkTVVk7w9v3nRgt6m1iDABJZgSqh20jArfTFBa899hx1KZKTCRG3wFP8K9nHqjqgzVbhZyAZk2CTmq5vrIjnPgxjtR3lkMge25L9DSHp8iVpFKOgMfs1gLVaW9yXNL8t_k8FCFoGKTf4FXtzhAUx8bWYYCE8vG52k70_zGuwFbmHhHm2g"
                  loading="eager"
                />

                {/* Finger Target Glow Pulse */}
                <div style={styles.fingerPulse} className="finger-pulse">
                  <span
                    style={{
                      position: "relative",
                      display: "flex",
                      width: "32px",
                      height: "32px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        position: "absolute",
                        inset: 0,
                        borderRadius: "50%",
                        background: "#ff5532",
                        opacity: 0.4,
                        animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                      }}
                    />
                    <span
                      style={{
                        position: "relative",
                        display: "inline-flex",
                        width: "14px",
                        height: "14px",
                        borderRadius: "50%",
                        background: "#ff5532",
                        boxShadow: "0 0 0 4px #ffffff, 0 2px 6px rgba(0,0,0,0.15)",
                      }}
                    />
                  </span>
                </div>
              </div>

              {/* ===== FLOATING PILLS & TOOL BADGES ===== */}

              {/* Pill 1: UI/UX & Design */}
              <div
                className="animate-float-1"
                style={{
                  position: "absolute",
                  top: "4%",
                  right: "4%",
                  zIndex: 30,
                }}
              >
                <a
                  href="/lms/explore?category=design"
                  className="pill-link"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(8px)",
                    padding: "0.375rem 1rem 0.375rem 0.375rem",
                    borderRadius: "9999px",
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.07), 0 8px 10px -6px rgba(0,0,0,0.04)",
                    border: "1px solid #f5f5f5",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "#f0fdfa",
                      color: "#0d9488",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "12px",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 19l7-7 3 3-7 7-3-3z" />
                      <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                      <path d="M2 2l7.586 7.586" />
                      <circle cx="11" cy="11" r="2" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: "0.84rem",
                      fontWeight: 700,
                      color: "#262626",
                      whiteSpace: "nowrap",
                    }}
                  >
                    UI/UX &amp; Design
                  </span>
                </a>
              </div>

              {/* Tool: Adobe Illustrator */}
              <div
                className="animate-float-3"
                style={{
                  position: "absolute",
                  top: "17%",
                  right: "24%",
                  zIndex: 30,
                }}
              >
                <a
                  href="/lms/explore?category=design"
                  className="pill-link"
                  title="Adobe Illustrator"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "0.75rem",
                    background: "#fff7ed",
                    border: "1px solid #fed7aa",
                    color: "#ea580c",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: "12px",
                    boxShadow: "0 4px 6px -1px rgba(234,88,12,0.1)",
                    cursor: "pointer",
                  }}
                >
                  Ai
                </a>
              </div>

              {/* Pill 2: Web & App Dev */}
              <div
                className="animate-float-2"
                style={{
                  position: "absolute",
                  top: "34%",
                  right: "1%",
                  zIndex: 30,
                }}
              >
                <a
                  href="/lms/explore?category=development"
                  className="pill-link"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(8px)",
                    padding: "0.375rem 1rem 0.375rem 0.375rem",
                    borderRadius: "9999px",
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.07), 0 8px 10px -6px rgba(0,0,0,0.04)",
                    border: "1px solid #f5f5f5",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "#ecfeff",
                      color: "#0891b2",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "12px",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: "0.84rem",
                      fontWeight: 700,
                      color: "#262626",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Web &amp; App Dev
                  </span>
                </a>
              </div>

              {/* Tool: VS Code */}
              <div
                className="animate-float-4"
                style={{
                  position: "absolute",
                  top: "47%",
                  right: "12%",
                  zIndex: 30,
                }}
              >
                <a
                  href="/lms/explore?category=development"
                  className="pill-link"
                  title="VS Code"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "0.75rem",
                    background: "#f0f9ff",
                    border: "1px solid #bae6fd",
                    color: "#0284c7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: "12px",
                    boxShadow: "0 4px 6px -1px rgba(2,132,199,0.1)",
                    cursor: "pointer",
                  }}
                >
                  <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.5 2.5L7.8 10.3 3.5 7 1.5 8.2v7.6l2 1.2 4.3-3.3 9.7 7.8 5-2.5V5l-5-2.5zm-.5 13.9L10.3 12 17 7.6v8.8z" />
                  </svg>
                </a>
              </div>

              {/* Pill 3: AI & Machine Learning */}
              <div
                className="animate-float-3"
                style={{
                  position: "absolute",
                  bottom: "16%",
                  right: "4%",
                  zIndex: 30,
                }}
              >
                <a
                  href="/lms/explore?category=data"
                  className="pill-link"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(8px)",
                    padding: "0.375rem 1rem 0.375rem 0.375rem",
                    borderRadius: "9999px",
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.07), 0 8px 10px -6px rgba(0,0,0,0.04)",
                    border: "1px solid #f5f5f5",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "rgba(255,85,50,0.1)",
                      color: "#ff5532",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "12px",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <circle cx="12" cy="12" r="3" />
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: "0.84rem",
                      fontWeight: 700,
                      color: "#262626",
                      whiteSpace: "nowrap",
                    }}
                  >
                    AI &amp; Machine Learning
                  </span>
                </a>
              </div>

              {/* Tool: Adobe Premiere Pro */}
              <div
                className="animate-float-1"
                style={{
                  position: "absolute",
                  bottom: "6%",
                  right: "26%",
                  zIndex: 30,
                }}
              >
                <a
                  href="/lms/explore?category=multimedia"
                  className="pill-link"
                  title="Adobe Premiere Pro"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "0.75rem",
                    background: "#faf5ff",
                    border: "1px solid #e9d5ff",
                    color: "#7e22ce",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: "12px",
                    boxShadow: "0 4px 6px -1px rgba(126,34,206,0.1)",
                    cursor: "pointer",
                  }}
                >
                  Pr
                </a>
              </div>

              {/* Pill 4: Spatial 3D Design */}
              <div
                className="animate-float-4"
                style={{
                  position: "absolute",
                  top: "46%",
                  left: "-1.5rem",
                  zIndex: 30,
                }}
              >
                <a
                  href="/lms/explore?category=design"
                  className="pill-link"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.625rem",
                    background: "rgba(255,255,255,0.95)",
                    backdropFilter: "blur(8px)",
                    padding: "0.375rem 1rem 0.375rem 0.375rem",
                    borderRadius: "9999px",
                    boxShadow: "0 10px 25px -5px rgba(0,0,0,0.07), 0 8px 10px -6px rgba(0,0,0,0.04)",
                    border: "1px solid #f5f5f5",
                    cursor: "pointer",
                  }}
                >
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "#faf5ff",
                      color: "#9333ea",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 700,
                      fontSize: "12px",
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      <polyline points="2 17 12 22 22 17" />
                      <polyline points="2 12 12 17 22 12" />
                    </svg>
                  </div>
                  <span
                    style={{
                      fontSize: "0.84rem",
                      fontWeight: 700,
                      color: "#262626",
                      whiteSpace: "nowrap",
                    }}
                  >
                    Spatial 3D Design
                  </span>
                </a>
              </div>

              {/* Tool: Adobe Photoshop */}
              <div
                className="animate-float-2"
                style={{
                  position: "absolute",
                  top: "22%",
                  left: "6%",
                  zIndex: 30,
                }}
              >
                <a
                  href="/lms/explore?category=design"
                  className="pill-link"
                  title="Adobe Photoshop"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "0.75rem",
                    background: "#eff6ff",
                    border: "1px solid #bfdbfe",
                    color: "#2563eb",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 900,
                    fontSize: "12px",
                    boxShadow: "0 4px 6px -1px rgba(37,99,235,0.1)",
                    cursor: "pointer",
                  }}
                >
                  Ps
                </a>
              </div>

              {/* Floating Interactive Sandbox Badge */}
              <div
                style={{
                  position: "absolute",
                  bottom: "0.5rem",
                  left: "1.5rem",
                  zIndex: 30,
                  background: "rgba(255,255,255,0.95)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "1rem",
                  padding: "0.75rem",
                  boxShadow: "0 10px 25px -5px rgba(0,0,0,0.08)",
                  border: "1px solid #f5f5f5",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                }}
              >
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "0.75rem",
                    background: "#ff5532",
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: 700,
                    fontSize: "12px",
                    boxShadow: "0 4px 6px -1px rgba(255,85,50,0.3)",
                  }}
                >
                  ★
                </div>
                <div>
                  <p
                    style={{
                      fontSize: "12px",
                      fontWeight: 700,
                      color: "#111111",
                      lineHeight: 1.2,
                      margin: 0,
                    }}
                  >
                    Interactive Sandbox
                  </p>
                  <p
                    style={{
                      fontSize: "11.5px",
                      color: "#575757",
                      margin: 0,
                    }}
                  >
                    Real-time Spatial Coding
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ===== PARTNER LOGOS BAR ===== */}
          <div style={styles.partnerBar}>
            <span style={styles.partnerLabel}>
              Featured across global innovators
            </span>
            <div style={styles.partnerLogos}>
              <span style={{ cursor: "pointer" }}>VOLT STUDIO</span>
              <span style={{ cursor: "pointer" }}>HYPERTECH</span>
              <span style={{ cursor: "pointer" }}>NEXUS LABS</span>
              <span style={{ cursor: "pointer" }}>PULSE GEAR</span>
              <span style={{ cursor: "pointer" }}>NETCODER LABS</span>
            </div>
          </div>
        </div>

        {/* ===== FREE DEMO MODAL ===== */}
        {demoModalOpen && (
          <div style={styles.modalOverlay}>
            <div style={styles.modalCard}>
              <button
                onClick={() => setDemoModalOpen(false)}
                style={{
                  position: "absolute",
                  top: "1.25rem",
                  right: "1.25rem",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "#f5f5f5",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#737373",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                ✕
              </button>

              {submitted ? (
                <div style={{ textAlign: "center", padding: "1.5rem 0" }}>
                  <div
                    style={{
                      width: "64px",
                      height: "64px",
                      margin: "0 auto 1rem",
                      borderRadius: "50%",
                      background: "#d1fae5",
                      color: "#059669",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "1.5rem",
                      fontWeight: 700,
                    }}
                  >
                    ✓
                  </div>
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 800,
                      color: "#171717",
                      margin: "0 0 0.5rem",
                    }}
                  >
                    Demo Scheduled!
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#737373",
                      marginBottom: "1rem",
                    }}
                  >
                    Our mentor will call you back shortly to coordinate your
                    personalized 1-on-1 demo session.
                  </p>
                  <a
                    href="https://wa.me/917590832055?text=Hi%20Netcoder%2C%20I%20want%20to%20confirm%20my%20free%20demo"
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      background: "#25D366",
                      color: "#ffffff",
                      fontWeight: 600,
                      fontSize: "0.875rem",
                      padding: "0.625rem 1.5rem",
                      borderRadius: "9999px",
                      textDecoration: "none",
                    }}
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: "1rem" }}>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: "#ff5532",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Netcoder LMS
                    </span>
                    <h3
                      style={{
                        fontSize: "1.25rem",
                        fontWeight: 800,
                        color: "#171717",
                        margin: "0.25rem 0",
                      }}
                    >
                      Book Your Free Demo
                    </h3>
                    <p style={{ fontSize: "0.75rem", color: "#737373" }}>
                      Get 1-on-1 career counselling &amp; trial access.
                    </p>
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#404040",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="e.g. Rahul Sharma"
                      style={{
                        width: "100%",
                        padding: "0.625rem 0.875rem",
                        fontSize: "0.875rem",
                        borderRadius: "0.75rem",
                        border: "1px solid #e5e5e5",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#404040",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Mobile / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="10-digit mobile number"
                      style={{
                        width: "100%",
                        padding: "0.625rem 0.875rem",
                        fontSize: "0.875rem",
                        borderRadius: "0.75rem",
                        border: "1px solid #e5e5e5",
                        outline: "none",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <div style={{ marginBottom: "1rem" }}>
                    <label
                      style={{
                        display: "block",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        color: "#404040",
                        marginBottom: "0.25rem",
                      }}
                    >
                      Select Course Track
                    </label>
                    <select
                      value={formData.course}
                      onChange={(e) =>
                        setFormData({ ...formData, course: e.target.value })
                      }
                      style={{
                        width: "100%",
                        padding: "0.625rem 0.875rem",
                        fontSize: "0.875rem",
                        borderRadius: "0.75rem",
                        border: "1px solid #e5e5e5",
                        outline: "none",
                        background: "#ffffff",
                        boxSizing: "border-box",
                      }}
                    >
                      <option value="Full Stack Web Development">
                        Full Stack Web Development
                      </option>
                      <option value="Python, AI & Data Science">
                        Python, AI &amp; Data Science
                      </option>
                      <option value="UI/UX & Figma Design">
                        UI/UX &amp; Figma Design
                      </option>
                      <option value="Cyber Security & Ethical Hacking">
                        Cyber Security &amp; Ethical Hacking
                      </option>
                      <option value="Digital Marketing & Content">
                        Digital Marketing &amp; Content
                      </option>
                      <option value="Animation & VFX">
                        Animation &amp; VFX
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: "100%",
                      padding: "0.75rem",
                      borderRadius: "9999px",
                      background: submitting ? "#e04422" : "#ff5532",
                      color: "#ffffff",
                      fontWeight: 700,
                      fontSize: "0.875rem",
                      border: "none",
                      cursor: submitting ? "not-allowed" : "pointer",
                      boxShadow: "0 10px 15px -3px rgba(255,85,50,0.3)",
                      opacity: submitting ? 0.5 : 1,
                    }}
                  >
                    {submitting ? "Booking..." : "Confirm Free Demo Spot"}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </section>
    </>
  );
}