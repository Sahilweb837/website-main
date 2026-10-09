"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CalendarDays,
  Clock,
  Clock3,
  ExternalLink,
  Flame,
  Play,
  Radio,
  Sparkles,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { api } from "@/lib/api";
import { calculateAutomatedClassStatus, type LiveClass } from "@/data/lms-mentor-data";

export default function MasterclassesPage() {
  const [classes, setClasses] = useState<LiveClass[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterTab, setFilterTab] = useState<"all" | "live" | "upcoming" | "recording">("all");

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const res = await api.getLiveClasses();
        if (active && res && Array.isArray(res.data)) {
          setClasses(res.data);
        }
      } catch (err) {
        console.error("Failed to load masterclasses:", err);
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

  const computedClasses = useMemo(() => {
    return classes.map((c) => ({
      ...c,
      status: calculateAutomatedClassStatus(c),
    }));
  }, [classes]);

  const filtered = useMemo(() => {
    if (filterTab === "live") {
      return computedClasses.filter((c) => c.status === "live");
    }
    if (filterTab === "upcoming") {
      return computedClasses.filter((c) => c.status === "upcoming");
    }
    if (filterTab === "recording") {
      return computedClasses.filter((c) => Boolean(c.recordingUrl || c.recordingLink));
    }
    return computedClasses;
  }, [computedClasses, filterTab]);

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
            <Video size={13} />
            <span>INDUSTRY MASTERCLASSES & SESSIONS</span>
          </div>
          <h1 style={{
            fontSize: "clamp(26px, 3.5vw, 36px)",
            fontWeight: 800,
            letterSpacing: "-1.2px",
            color: "#172033",
            margin: "0 0 8px",
          }}>
            My Masterclasses & Live Workshops
          </h1>
          <p style={{
            fontSize: "14px",
            color: "#64748b",
            margin: 0,
            maxWidth: "680px",
            lineHeight: 1.6,
          }}>
            Direct interactive masterclasses with staff engineers and architects from top tech companies. Access live sessions, Zoom meeting links, and recorded archives.
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "8px",
          marginBottom: "26px",
        }}>
          {[
            { id: "all", label: "All Masterclasses" },
            { id: "live", label: "🔴 Happening Live" },
            { id: "upcoming", label: "Upcoming Zoom Labs" },
            { id: "recording", label: "Recorded Sessions" },
          ].map((tab) => {
            const active = filterTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id as any)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "20px",
                  border: active ? "1px solid #ff5532" : "1px solid #e2e8f0",
                  background: active ? "#ff5532" : "#ffffff",
                  color: active ? "#ffffff" : "#475569",
                  fontSize: "12px",
                  fontWeight: active ? 750 : 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 160ms ease",
                  boxShadow: active ? "0 4px 12px rgba(255, 85, 50, 0.25)" : "none",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Masterclasses Grid */}
        {loading ? (
          /* SKELETON PRELOADER */
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "22px",
          }}>
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "20px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div className="sk-box" style={{ width: "90px", height: "22px", borderRadius: "10px" }} />
                  <div className="sk-box" style={{ width: "120px", height: "20px" }} />
                </div>
                <div className="sk-box" style={{ width: "85%", height: "24px" }} />
                <div className="sk-box" style={{ width: "60%", height: "16px" }} />
                <div className="sk-box" style={{ height: "42px", borderRadius: "10px", marginTop: "12px" }} />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div style={{
            background: "#ffffff",
            border: "1.5px dashed #cbd5e1",
            borderRadius: "20px",
            padding: "50px 24px",
            textAlign: "center",
          }}>
            <Video size={32} color="#ff5532" style={{ margin: "0 auto 12px" }} />
            <h3 style={{ fontSize: "17px", fontWeight: 800, margin: "0 0 6px" }}>
              No Masterclasses in this Category
            </h3>
            <p style={{ fontSize: "13px", color: "#64748b", margin: "0 auto 16px", maxWidth: "420px" }}>
              Check back soon for new masterclasses announced weekly by Netcoder faculty.
            </p>
            <button
              onClick={() => setFilterTab("all")}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                background: "#ff5532",
                color: "#ffffff",
                border: "none",
                fontWeight: 700,
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              View All Masterclasses
            </button>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
            gap: "22px",
          }}>
            {filtered.map((item) => {
              const isLive = item.status === "live";
              const hasRec = Boolean(item.recordingUrl || item.recordingLink);
              const isZoom = item.platform === "Zoom";

              return (
                <article
                  key={item.id}
                  style={{
                    background: "#ffffff",
                    border: isLive ? "1.5px solid #ff5532" : "1px solid #e2e8f0",
                    borderRadius: "20px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    boxShadow: isLive
                      ? "0 10px 30px rgba(255, 85, 50, 0.15)"
                      : "0 4px 20px rgba(15, 23, 42, 0.04)",
                    transition: "transform 180ms ease, box-shadow 180ms ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 14px 32px rgba(15, 23, 42, 0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = isLive
                      ? "0 10px 30px rgba(255, 85, 50, 0.15)"
                      : "0 4px 20px rgba(15, 23, 42, 0.04)";
                  }}
                >
                  <div>
                    {/* Top Row: Status badge & Time */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "14px",
                    }}>
                      <span style={{
                        padding: "3px 10px",
                        borderRadius: "20px",
                        fontSize: "11px",
                        fontWeight: 800,
                        letterSpacing: "0.5px",
                        background: isLive ? "#fee2e2" : isZoom ? "#eff6ff" : "#f1f5f9",
                        color: isLive ? "#ef4444" : isZoom ? "#2563eb" : "#475569",
                        border: isLive ? "1px solid #fca5a5" : isZoom ? "1px solid #bfdbfe" : "1px solid #e2e8f0",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "5px",
                      }}>
                        {isLive ? (
                          <><Radio size={12} /> LIVE NOW</>
                        ) : (
                          <><Video size={12} /> {item.platform.toUpperCase()}</>
                        )}
                      </span>

                      <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 650 }}>
                        <Clock3 size={13} style={{ verticalAlign: "middle", marginRight: "3px" }} />
                        {item.date}
                      </span>
                    </div>

                    {/* Course / Program Title */}
                    <div style={{
                      fontSize: "10px",
                      fontWeight: 750,
                      color: "#ff5532",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      marginBottom: "6px",
                    }}>
                      {item.courseTitle}
                    </div>

                    {/* Title */}
                    <h3 style={{
                      fontSize: "17px",
                      fontWeight: 800,
                      color: "#172033",
                      margin: "0 0 12px",
                      lineHeight: 1.35,
                      letterSpacing: "-0.3px",
                    }}>
                      {item.title}
                    </h3>

                    {/* Speaker Info */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      marginBottom: "16px",
                    }}>
                      <img
                        src={item.mentorAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150"}
                        alt={item.mentorName}
                        style={{
                          width: "34px",
                          height: "34px",
                          borderRadius: "50%",
                          objectFit: "cover",
                          border: "1.5px solid #ff795b",
                        }}
                      />
                      <div>
                        <strong style={{ fontSize: "12px", color: "#1e293b", display: "block" }}>
                          {item.mentorName}
                        </strong>
                        <span style={{ fontSize: "10px", color: "#64748b" }}>
                          {item.time}
                        </span>
                      </div>
                    </div>

                    {/* Agenda chips */}
                    {item.agenda && item.agenda.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "18px" }}>
                        {item.agenda.slice(0, 2).map((a, idx) => (
                          <span
                            key={idx}
                            style={{
                              fontSize: "10px",
                              fontWeight: 600,
                              color: "#475569",
                              background: "#f1f5f9",
                              padding: "3px 8px",
                              borderRadius: "6px",
                            }}
                          >
                            ✦ {typeof a === "string" ? a.replace(/^\d+\.\s*/, "") : a}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div style={{ paddingTop: "14px", borderTop: "1px solid #f1f5f9" }}>
                    {isLive && item.meetingLink ? (
                      <a
                        href={item.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: "100%",
                          padding: "10px 16px",
                          borderRadius: "10px",
                          background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                          color: "#ffffff",
                          fontSize: "12px",
                          fontWeight: 750,
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          boxShadow: "0 4px 14px rgba(239, 68, 68, 0.3)",
                        }}
                      >
                        <Radio size={14} /> Join Live {item.platform} Room <ExternalLink size={12} />
                      </a>
                    ) : item.meetingLink ? (
                      <a
                        href={item.meetingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: "100%",
                          padding: "10px 16px",
                          borderRadius: "10px",
                          background: isZoom ? "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" : "linear-gradient(135deg, #ff5532 0%, #ff7354 100%)",
                          color: "#ffffff",
                          fontSize: "12px",
                          fontWeight: 750,
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                          boxShadow: "0 4px 14px rgba(255, 85, 50, 0.25)",
                        }}
                      >
                        <Video size={14} /> Launch {item.platform} Class <ExternalLink size={12} />
                      </a>
                    ) : hasRec ? (
                      <a
                        href={item.recordingUrl || item.recordingLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          width: "100%",
                          padding: "10px 16px",
                          borderRadius: "10px",
                          background: "#0f172a",
                          color: "#ffffff",
                          fontSize: "12px",
                          fontWeight: 750,
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                        }}
                      >
                        <Play size={14} fill="currentColor" /> Watch Recording
                      </a>
                    ) : (
                      <Link
                        href={`/lms/courses/${item.courseSlug}`}
                        style={{
                          width: "100%",
                          padding: "10px 16px",
                          borderRadius: "10px",
                          background: "#f1f5f9",
                          color: "#334155",
                          fontSize: "12px",
                          fontWeight: 750,
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                        }}
                      >
                        Session Syllabus <ArrowRight size={13} />
                      </Link>
                    )}
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
