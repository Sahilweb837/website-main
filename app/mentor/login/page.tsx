"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Sparkles, Shield, User, ArrowRight, Zap, CheckCircle2, Video, FileText, CheckSquare, GraduationCap } from "lucide-react";
import { INITIAL_MENTORS, type MentorProfile } from "@/data/lms-mentor-data";

export default function MentorLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("mentor@netcoder.in");
  const [password, setPassword] = useState("mentor123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const found = INITIAL_MENTORS.find(
        (m) => m.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (found && (password === "mentor123" || password === "admin123" || found.password === password)) {
        if (typeof window !== "undefined") {
          localStorage.setItem("mentor_auth", "true");
          localStorage.setItem("mentor_user", JSON.stringify(found));
        }
        router.push("/mentor/dashboard");
      } else if (email.trim() && password.trim()) {
        const customMentor: MentorProfile = {
          id: `mentor-${Date.now()}`,
          name: email.split("@")[0].replace(/\b\w/g, (c) => c.toUpperCase()),
          email,
          specialization: "Full Stack & Cloud Architecture",
          courses: ["fullstack-web-development", "data-science-machine-learning"],
          avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
          phone: "+91 98765 00000",
          rating: 4.95,
          totalBatches: 10,
          totalStudents: 250,
        };
        if (typeof window !== "undefined") {
          localStorage.setItem("mentor_auth", "true");
          localStorage.setItem("mentor_user", JSON.stringify(customMentor));
        }
        router.push("/mentor/dashboard");
      } else {
        setError("Please enter your mentor credentials.");
        setLoading(false);
      }
    }, 350);
  };

  const handleDemoMentor = (mentor: MentorProfile) => {
    setLoading(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("mentor_auth", "true");
      localStorage.setItem("mentor_user", JSON.stringify(mentor));
    }
    router.push("/mentor/dashboard");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px 16px",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "#ffffff",
          borderRadius: "28px",
          padding: "36px 32px",
          boxShadow: "0 20px 50px rgba(255, 85, 50, 0.08)",
          border: "2px solid #fed7aa",
        }}
      >
        {/* Brand / Logo */}
        <div style={{ textAlign: "center", marginBottom: "24px" }}>
          <Link href="/" style={{ textDecoration: "none", display: "inline-block" }}>
            <img
              src="/images/logo.png"
              alt="Netcoder Technology"
              style={{ height: "48px", margin: "0 auto 12px", objectFit: "contain" }}
            />
          </Link>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 12px",
              borderRadius: "999px",
              background: "#fff5f2",
              border: "1px solid #ffd8cf",
              color: "#ff5532",
              fontSize: "0.75rem",
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            <Sparkles size={13} color="#ff5532" />
            Mentor &amp; Faculty Portal
          </div>
          <h1 style={{ fontSize: "1.75rem", fontWeight: 800, color: "#0f172a", margin: "10px 0 4px" }}>
            Mentor Dashboard Login
          </h1>
          <p style={{ fontSize: "0.88rem", color: "#64748b", margin: 0 }}>
            Publish notes, schedule live class links, assign tasks &amp; manage cohort progress.
          </p>
        </div>

        {/* 1-Click Instant Demo Mentor Buttons */}
        <div
          style={{
            background: "#fffaf7",
            borderRadius: "18px",
            border: "1px solid #ffd8cf",
            padding: "16px",
            marginBottom: "22px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
            <span style={{ fontSize: "0.75rem", fontWeight: 800, color: "#ff5532", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              ⚡ Quick Testing Mentors (1-Click)
            </span>
            <span style={{ fontSize: "0.7rem", background: "#ff5532", color: "#ffffff", padding: "2px 8px", borderRadius: "10px", fontWeight: 700 }}>
              Instant Access
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
            {INITIAL_MENTORS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => handleDemoMentor(m)}
                disabled={loading}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 10px",
                  borderRadius: "12px",
                  border: "1px solid #fed7aa",
                  background: "#ffffff",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all 0.15s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "#ff5532";
                  e.currentTarget.style.background = "#fff5f2";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "#fed7aa";
                  e.currentTarget.style.background = "#ffffff";
                }}
              >
                <img
                  src={m.avatar}
                  alt={m.name}
                  style={{ width: "28px", height: "28px", borderRadius: "50%", objectFit: "cover" }}
                />
                <div style={{ minWidth: 0, overflow: "hidden" }}>
                  <div style={{ fontSize: "0.78rem", fontWeight: 800, color: "#0f172a", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
                    {m.name}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "#ff5532", fontWeight: 600 }}>
                    {m.courses[0]?.split("-")[0]?.toUpperCase() || "Faculty"}
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div
            style={{
              padding: "10px 14px",
              borderRadius: "12px",
              background: "#fef2f2",
              border: "1px solid #fecaca",
              color: "#b91c1c",
              fontSize: "0.82rem",
              fontWeight: 600,
              marginBottom: "16px",
            }}
          >
            {error}
          </div>
        )}

        {/* Credentials Form */}
        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Mentor Email ID
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="mentor@netcoder.in"
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "12px",
                border: "1px solid #fed7aa",
                outline: "none",
                fontSize: "0.9rem",
                color: "#0f172a",
                background: "#ffffff",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#ff5532")}
              onBlur={(e) => (e.target.style.borderColor = "#fed7aa")}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="mentor123"
              style={{
                width: "100%",
                padding: "12px 14px",
                borderRadius: "12px",
                border: "1px solid #fed7aa",
                outline: "none",
                fontSize: "0.9rem",
                color: "#0f172a",
                background: "#ffffff",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#ff5532")}
              onBlur={(e) => (e.target.style.borderColor = "#fed7aa")}
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", fontSize: "0.75rem", color: "#64748b" }}>
              <span>Default credentials: <strong>mentor123</strong></span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px",
              borderRadius: "14px",
              background: "#ff5532",
              color: "#ffffff",
              border: "none",
              fontWeight: 800,
              fontSize: "0.95rem",
              cursor: "pointer",
              boxShadow: "0 6px 20px rgba(255, 85, 50, 0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              transition: "transform 0.15s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-1px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {loading ? "Signing In..." : "Sign In to Mentor Portal"} <ArrowRight size={16} />
          </button>
        </form>

        {/* Feature summary highlights */}
        <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid #fed7aa", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.78rem", color: "#475569" }}>
            <Video size={16} color="#ff5532" />
            <span>Schedule Live Classes</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.78rem", color: "#475569" }}>
            <FileText size={16} color="#ff5532" />
            <span>Upload Study Notes</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.78rem", color: "#475569" }}>
            <CheckSquare size={16} color="#ff5532" />
            <span>Assign Coding Tasks</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.78rem", color: "#475569" }}>
            <GraduationCap size={16} color="#ff5532" />
            <span>Enrolled Cohorts Sync</span>
          </div>
        </div>

        {/* Bottom Navigation Switcher */}
        <div style={{ marginTop: "24px", textAlign: "center", fontSize: "0.8rem", color: "#64748b", display: "flex", justifyContent: "center", gap: "16px" }}>
          <Link href="/lms" style={{ color: "#ff5532", fontWeight: 700, textDecoration: "none" }}>
            🎓 Student LMS
          </Link>
          <span>&bull;</span>
          <Link href="/admin/login" style={{ color: "#334155", fontWeight: 600, textDecoration: "none" }}>
            🛡️ Admin Control Panel
          </Link>
          <span>&bull;</span>
          <Link href="/" style={{ color: "#64748b", textDecoration: "none" }}>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
