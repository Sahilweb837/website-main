"use client";

import { useState } from "react";
import Link from "next/link";
import { getCourseBySlug, COURSES } from "@/data/courses";
import { notFound } from "next/navigation";

export default function CoursePageContent({ slug }) {
  const course = getCourseBySlug(slug);
  const [activeModule, setActiveModule] = useState(0);

  if (!course) {
    notFound();
  }

  const handleOpenDemo = (e) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-demo-modal"));
    }
  };

  const otherCourses = COURSES.filter((c) => c.slug !== course.slug).slice(0, 3);

  return (
    <>
      {/* PAGE HERO */}
      <section className="page-hero">
        <ul className="circles">
          <li></li><li></li><li></li><li></li><li></li>
          <li></li><li></li><li></li><li></li><li></li>
        </ul>
        <div className="page-title">
          <div>{course.title.toUpperCase()}</div>
          <p>
            <Link href="/">HOME</Link> / <b>{course.category.toUpperCase()}</b>
          </p>
        </div>
      </section>

      {/* COURSE HEADER / SUMMARY */}
      <section style={{ padding: "70px 0 50px" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "50px", alignItems: "center" }}>
          <div>
            <div style={{ display: "flex", gap: "10px", alignItems: "center", marginBottom: "15px" }}>
              <span
                style={{
                  background: "rgba(255, 85, 50, 0.1)",
                  color: "#ff5532",
                  padding: "6px 14px",
                  borderRadius: "20px",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  textTransform: "uppercase"
                }}
              >
                {course.type === "online" ? "Online Live Interactive" : "On-Campus Dharamshala"}
              </span>
              <span style={{ fontSize: "0.9rem", color: "#64748b" }}>⏱ {course.duration}</span>
              <span style={{ color: "#cbd5e1" }}>•</span>
              <span style={{ fontSize: "0.9rem", color: "#64748b" }}>🎯 {course.level}</span>
            </div>

            <h1 style={{ fontSize: "clamp(2.2rem, 4vw, 3rem)", fontWeight: 800, color: "#0f172a", lineHeight: 1.2, marginBottom: "20px" }}>
              {course.title}
            </h1>

            <p style={{ color: "#475569", fontSize: "1.08rem", lineHeight: 1.7, marginBottom: "30px" }}>
              {course.overview}
            </p>

            <div style={{ display: "flex", gap: "15px", flexWrap: "wrap", marginBottom: "35px" }}>
              <button
                onClick={handleOpenDemo}
                className="color-btn"
                style={{
                  border: "none",
                  cursor: "pointer",
                  padding: "14px 30px",
                  borderRadius: "30px",
                  fontWeight: 700,
                  fontSize: "1rem",
                  boxShadow: "0 8px 25px rgba(255, 85, 50, 0.35)"
                }}
              >
                Book Free Demo Class →
              </button>
              <a
                href={`https://api.whatsapp.com/send?phone=919816732055&text=Hello%20Netcoder,%20please%20send%20fees%20and%20syllabus%20for%20${encodeURIComponent(course.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "14px 24px",
                  borderRadius: "30px",
                  border: "2px solid #e2e8f0",
                  fontWeight: 600,
                  color: "#334155",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px"
                }}
              >
                💬 WhatsApp Syllabus &amp; Fees
              </a>
            </div>

            {/* HIGHLIGHT BADGES */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px" }}>
              {course.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "#334155", fontWeight: 600 }}>
                  <span style={{ color: "#10b981", fontSize: "16px" }}>✓</span> {h}
                </div>
              ))}
            </div>
          </div>

          <div style={{ textAlign: "center" }}>
            <div style={{ background: "#ffffff", padding: "30px", borderRadius: "24px", border: "1px solid #f1f5f9", boxShadow: "0 10px 40px rgba(0,0,0,0.06)" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={course.image || "/images/course.png"}
                alt={course.title}
                style={{ width: "100%", maxHeight: "300px", objectFit: "contain", margin: "0 auto 20px" }}
              />
              <div style={{ textAlign: "left", background: "#f8fafc", padding: "18px", borderRadius: "14px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.9rem" }}>
                  <span style={{ color: "#64748b" }}>Duration:</span>
                  <strong style={{ color: "#0f172a" }}>{course.duration}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px", fontSize: "0.9rem" }}>
                  <span style={{ color: "#64748b" }}>Training Mode:</span>
                  <strong style={{ color: "#ff5532" }}>{course.type === "online" ? "Online Live" : "Offline / On-Campus"}</strong>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.9rem" }}>
                  <span style={{ color: "#64748b" }}>Placement Support:</span>
                  <strong style={{ color: "#10b981" }}>100% Guaranteed</strong>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SYLLABUS CURRICULUM ACCORDION */}
      <section style={{ background: "#f8fafc", padding: "80px 0", borderTop: "1px solid #e2e8f0" }}>
        <div className="container" style={{ maxWidth: "860px" }}>
          <div style={{ textAlign: "center", marginBottom: "45px" }}>
            <span style={{ color: "#ff5532", fontWeight: 700, textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "1px" }}>
              In-Depth Modules
            </span>
            <h2 style={{ fontSize: "2.4rem", fontWeight: 800, color: "#0f172a", marginTop: "8px" }}>
              Detailed Course <span style={{ color: "#ff5532" }}>Syllabus</span>
            </h2>
            <p style={{ color: "#64748b", fontSize: "0.98rem", marginTop: "8px" }}>
              Everything you need to master this domain and become industry-ready.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {course.syllabus.map((s, idx) => (
              <div
                key={idx}
                style={{
                  background: "#ffffff",
                  borderRadius: "14px",
                  border: "1px solid #e2e8f0",
                  overflow: "hidden"
                }}
              >
                <button
                  onClick={() => setActiveModule(activeModule === idx ? null : idx)}
                  style={{
                    width: "100%",
                    padding: "20px 24px",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <div>
                    <span style={{ fontSize: "0.8rem", color: "#ff5532", fontWeight: 700, display: "block", textTransform: "uppercase" }}>
                      {s.module}
                    </span>
                    <strong style={{ fontSize: "1.1rem", color: "#0f172a" }}>{s.title}</strong>
                  </div>
                  <span style={{ color: "#ff5532", fontSize: "1.4rem", fontWeight: "bold" }}>
                    {activeModule === idx ? "−" : "+"}
                  </span>
                </button>
                {activeModule === idx && (
                  <div style={{ padding: "0 24px 22px", color: "#475569", fontSize: "0.98rem", lineHeight: 1.6, borderTop: "1px solid #f1f5f9", paddingTop: "12px" }}>
                    {s.desc}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS & CAREERS */}
      <section style={{ padding: "80px 0" }}>
        <div className="container" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px" }}>
          {/* Tools */}
          <div style={{ background: "#ffffff", padding: "35px", borderRadius: "20px", border: "1px solid #f1f5f9", boxShadow: "0 4px 25px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
              🛠️ Tools &amp; Technologies You Will Learn
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {course.tools.map((t) => (
                <span
                  key={t}
                  style={{
                    background: "rgba(255, 85, 50, 0.08)",
                    color: "#ff5532",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    fontWeight: 700,
                    fontSize: "0.9rem"
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Careers */}
          <div style={{ background: "#ffffff", padding: "35px", borderRadius: "20px", border: "1px solid #f1f5f9", boxShadow: "0 4px 25px rgba(0,0,0,0.04)" }}>
            <h3 style={{ fontSize: "1.4rem", fontWeight: 800, color: "#0f172a", marginBottom: "16px" }}>
              💼 Target Job Roles &amp; Careers
            </h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
              {course.careers.map((c) => (
                <span
                  key={c}
                  style={{
                    background: "#f1f5f9",
                    color: "#334155",
                    padding: "8px 16px",
                    borderRadius: "20px",
                    fontWeight: 600,
                    fontSize: "0.9rem"
                  }}
                >
                  ✓ {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE OTHER COURSES */}
      <section style={{ background: "#f8fafc", padding: "80px 0", borderTop: "1px solid #e2e8f0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "40px" }}>
            <h3 style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a" }}>
              Related <span style={{ color: "#ff5532" }}>Training Programs</span>
            </h3>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "25px" }}>
            {otherCourses.map((c) => (
              <div
                key={c.slug}
                style={{
                  background: "#ffffff",
                  padding: "25px",
                  borderRadius: "18px",
                  border: "1px solid #e2e8f0",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.03)"
                }}
              >
                <span style={{ fontSize: "0.75rem", color: "#ff5532", fontWeight: 700 }}>{c.category}</span>
                <h4 style={{ fontSize: "1.15rem", fontWeight: 700, margin: "6px 0 10px" }}>
                  <Link href={`/${c.slug}`} style={{ color: "inherit", textDecoration: "none" }}>
                    {c.title}
                  </Link>
                </h4>
                <p style={{ color: "#64748b", fontSize: "0.88rem", marginBottom: "15px" }}>
                  {c.duration} • {c.level}
                </p>
                <Link href={`/${c.slug}`} style={{ color: "#ff5532", fontWeight: 700, fontSize: "0.88rem" }}>
                  View Course →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
