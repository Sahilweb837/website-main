"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CalendarDays,
  CheckCircle2,
  Clock,
  ExternalLink,
  Flame,
  GraduationCap,
  Layers,
  MapPin,
  Play,
  Sparkles,
  UserCheck,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { api } from "@/lib/api";

interface CohortItem {
  id: number;
  name: string;
  code: string;
  courseSlug: string;
  mentorName: string;
  mentorAvatar?: string;
  mentorEmail?: string;
  track: string;
  startDate: string;
  endDate: string;
  capacity: number;
  enrolledCount: number;
  status: string;
  roadmapNotes?: string;
  nextSession?: {
    title: string;
    date: string;
    time: string;
    platform: string;
    meetingLink: string;
  };
}

export default function MyCohortsPage() {
  const [cohorts, setCohorts] = useState<CohortItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const res = await api.getCohorts();
        if (active && res && Array.isArray(res.data)) {
          setCohorts(res.data);
        }
      } catch (err) {
        console.error("Failed to load cohorts:", err);
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadData();
    const timer = setTimeout(() => {
      if (active) setLoading(false);
    }, 1200);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 10% 0%, rgba(255, 235, 228, 0.44), transparent 34rem), #f7f8fc",
      padding: "32px 24px 80px",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      color: "#172033",
    }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        {/* Header Breadcrumbs & Eyebrow */}
        <div style={{ marginBottom: "26px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "5px 12px",
            background: "#fff2ef",
            borderRadius: "20px",
            color: "#ff5532",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "0.8px",
            marginBottom: "12px",
          }}>
            <Users size={13} />
            <span>DEVELOPMENT PROGRAMS & BATCHES</span>
          </div>
          <h1 style={{
            fontSize: "clamp(26px, 3.5vw, 36px)",
            fontWeight: 800,
            letterSpacing: "-1.2px",
            color: "#172033",
            margin: "0 0 8px",
          }}>
            My Cohorts & Learning Batches
          </h1>
          <p style={{
            fontSize: "14px",
            color: "#64748b",
            margin: 0,
            maxWidth: "680px",
            lineHeight: 1.6,
          }}>
            Collaborative development programs with dedicated senior mentors, weekly sprint reviews, and peer code discussions.
          </p>
        </div>

        {/* Cohort Cards */}
        {loading ? (
          /* SKELETON PRELOADER */
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "20px",
                  padding: "28px",
                  display: "grid",
                  gridTemplateColumns: "1.2fr 0.8fr",
                  gap: "24px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                  <div className="sk-box" style={{ width: "120px", height: "20px", borderRadius: "10px" }} />
                  <div className="sk-box" style={{ width: "70%", height: "28px" }} />
                  <div className="sk-box" style={{ width: "90%", height: "40px" }} />
                  <div className="sk-box" style={{ width: "200px", height: "36px", borderRadius: "10px" }} />
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "12px", justifyContent: "center" }}>
                  <div className="sk-box" style={{ height: "100px", borderRadius: "14px" }} />
                </div>
              </div>
            ))}
          </div>
        ) : cohorts.length === 0 ? (
          <div style={{
            background: "#ffffff",
            border: "1.5px dashed #cbd5e1",
            borderRadius: "20px",
            padding: "50px 24px",
            textAlign: "center",
          }}>
            <Users size={32} color="#ff5532" style={{ margin: "0 auto 12px" }} />
            <h3 style={{ fontSize: "17px", fontWeight: 800, margin: "0 0 6px" }}>
              No Cohorts Assigned Yet
            </h3>
            <p style={{ fontSize: "13px", color: "#64748b", margin: "0 auto 16px", maxWidth: "420px" }}>
              Enroll in a course track to get automatically matched with a development cohort and mentor.
            </p>
            <Link
              href="/lms/select-course"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "10px 18px",
                background: "#ff5532",
                color: "#ffffff",
                borderRadius: "10px",
                fontSize: "12px",
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Browse Course Tracks <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "22px" }}>
            {cohorts.map((coh) => {
              const isActive = coh.status === "active";

              return (
                <article
                  key={coh.id}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "20px",
                    padding: "28px 32px",
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1.25fr) minmax(280px, 0.75fr)",
                    gap: "28px",
                    boxShadow: "0 6px 24px rgba(15, 23, 42, 0.04)",
                    transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-3px)";
                    e.currentTarget.style.borderColor = "#ff9a82";
                    e.currentTarget.style.boxShadow = "0 12px 30px rgba(255, 85, 50, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.boxShadow = "0 6px 24px rgba(15, 23, 42, 0.04)";
                  }}
                >
                  {/* Left Column: Cohort Details */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
                      <span style={{
                        padding: "3px 10px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: 800,
                        letterSpacing: "0.5px",
                        background: isActive ? "#ecfdf5" : "#f1f5f9",
                        color: isActive ? "#059669" : "#475569",
                        border: isActive ? "1px solid #a7f3d0" : "1px solid #e2e8f0",
                      }}>
                        {isActive ? "ACTIVE COHORT" : "UPCOMING COHORT"}
                      </span>

                      <span style={{
                        fontSize: "11px",
                        fontWeight: 800,
                        color: "#ff5532",
                        background: "#fff2ef",
                        padding: "3px 9px",
                        borderRadius: "8px",
                        letterSpacing: "0.5px",
                      }}>
                        {coh.code}
                      </span>

                      <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 600 }}>
                        {coh.track}
                      </span>
                    </div>

                    <h2 style={{
                      fontSize: "20px",
                      fontWeight: 800,
                      color: "#172033",
                      margin: "0 0 10px",
                      letterSpacing: "-0.4px",
                    }}>
                      {coh.name}
                    </h2>

                    {/* Mentor Info */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "16px",
                    }}>
                      <img
                        src={coh.mentorAvatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150"}
                        alt={coh.mentorName}
                        style={{
                          width: "36px",
                          height: "36px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "1.5px solid #ff795b",
                        }}
                      />
                      <div>
                        <strong style={{ fontSize: "13px", color: "#1e293b", display: "block" }}>
                          Lead Mentor: {coh.mentorName}
                        </strong>
                        <span style={{ fontSize: "11px", color: "#64748b" }}>
                          Office hours & 1:1 code review available
                        </span>
                      </div>
                    </div>

                    {/* Roadmap notes */}
                    {coh.roadmapNotes && (
                      <div style={{
                        background: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        borderRadius: "12px",
                        padding: "12px 16px",
                        fontSize: "12px",
                        color: "#475569",
                        lineHeight: 1.5,
                        marginBottom: "18px",
                      }}>
                        <strong style={{ color: "#1e293b", display: "block", marginBottom: "4px" }}>
                          Sprint Milestone & Roadmap:
                        </strong>
                        {coh.roadmapNotes}
                      </div>
                    )}

                    {/* Capacity & Dates */}
                    <div style={{ display: "flex", gap: "18px", fontSize: "12px", color: "#64748b" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                        <Users size={14} color="#64748b" /> {coh.enrolledCount} / {coh.capacity} Learners
                      </span>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: "5px" }}>
                        <CalendarDays size={14} color="#64748b" /> {coh.startDate} to {coh.endDate}
                      </span>
                    </div>
                  </div>

                  {/* Right Column: Live Sprint Lab Box */}
                  <div style={{
                    background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
                    borderRadius: "16px",
                    padding: "22px",
                    color: "#ffffff",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}>
                    <div>
                      <div style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        padding: "3px 8px",
                        borderRadius: "6px",
                        background: "rgba(255, 85, 50, 0.25)",
                        border: "1px solid rgba(255, 85, 50, 0.6)",
                        color: "#ff9179",
                        fontSize: "10px",
                        fontWeight: 800,
                        letterSpacing: "0.5px",
                        marginBottom: "10px",
                      }}>
                        <Video size={12} /> NEXT LIVE LAB
                      </div>
                      <h4 style={{ fontSize: "15px", fontWeight: 750, margin: "0 0 6px", lineHeight: 1.35 }}>
                        {coh.nextSession?.title || `${coh.name} Sprint Review`}
                      </h4>
                      <p style={{ fontSize: "11px", color: "#94a3b8", margin: 0, lineHeight: 1.4 }}>
                        Bring your questions and pull requests for live review with {coh.mentorName}.
                      </p>
                    </div>

                    <div style={{ marginTop: "18px" }}>
                      <a
                        href={coh.nextSession?.meetingLink || "https://meet.google.com/netcoder-lab-" + coh.code.toLowerCase()}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: "100%",
                          padding: "10px 16px",
                          borderRadius: "10px",
                          background: "linear-gradient(135deg, #ff5532 0%, #ff7354 100%)",
                          color: "#ffffff",
                          fontSize: "12px",
                          fontWeight: 750,
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          boxShadow: "0 4px 14px rgba(255, 85, 50, 0.35)",
                        }}
                      >
                        <Video size={14} /> Join Cohort Sprint Room <ExternalLink size={12} />
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
