"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  Copy,
  Check,
  ExternalLink,
  Flame,
  Globe,
  GraduationCap,
  Layers,
  Linkedin,
  Play,
  Radio,
  Share2,
  ShieldCheck,
  Sparkles,
  Tv,
  Users,
  Video,
  Zap,
} from "lucide-react";
import { api } from "@/lib/api";

interface MasterclassDetail {
  id: string;
  rawId: number;
  title: string;
  topic: string;
  category: string;
  mentorId: number | null;
  mentorName: string;
  mentorAvatar: string;
  mentorBio: string;
  mentorSpecialization: string;
  mentorRating: number;
  mentorLinkedIn?: string | null;
  sessionDate: string;
  sessionTime: string;
  formattedDate: string;
  platform: string;
  meetingLink: string;
  recordingLink?: string | null;
  recordingUrl?: string | null;
  bannerImage: string;
  status: "upcoming" | "live" | "completed";
  agenda: string[];
  maxAttendees: number;
  registeredCount: number;
  seatsLeft: number;
  durationMinutes: number;
  perks: string[];
  prerequisites: string[];
}

export default function MasterclassDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [masterclass, setMasterclass] = useState<MasterclassDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    let active = true;

    async function fetchMasterclass() {
      if (!id) return;
      setLoading(true);
      setError(null);

      try {
        const res = await api.getMasterclassById(id);
        if (active) {
          if (res && res.success && res.data) {
            setMasterclass(res.data);
          } else {
            setError(res?.message || "Masterclass not found in database.");
          }
        }
      } catch (err: unknown) {
        if (active) {
          const msg = err instanceof Error ? err.message : "Failed to load masterclass details.";
          setError(msg);
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    void fetchMasterclass();

    return () => {
      active = false;
    };
  }, [id]);

  const handleCopyLink = () => {
    if (!masterclass?.meetingLink && typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
      return;
    }

    if (masterclass?.meetingLink) {
      navigator.clipboard.writeText(masterclass.meetingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  const handleRSVP = async () => {
    if (!masterclass) return;
    setRegistering(true);
    try {
      await api.registerMasterclass(masterclass.id);
      setRegistered(true);
    } catch {
      setRegistered(true);
    } finally {
      setRegistering(false);
    }
  };

  // SKELETON PRELOADER
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 10% 0%, rgba(255, 235, 228, 0.44), transparent 34rem), #f7f8fc",
        padding: "32px 24px 120px",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          {/* Skeleton Back button */}
          <div style={{ width: 140, height: 36, background: "#e2e8f0", borderRadius: 10, marginBottom: 24 }} />

          {/* Skeleton Banner Hero */}
          <div style={{
            width: "100%",
            height: "360px",
            background: "linear-gradient(90deg, #e2e8f0 25%, #f1f5f9 50%, #e2e8f0 75%)",
            backgroundSize: "200% 100%",
            borderRadius: "24px",
            marginBottom: "32px",
            animation: "shimmer 1.6s infinite",
          }} />

          {/* Skeleton 2-column layout */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "28px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ width: "60%", height: 32, background: "#e2e8f0", borderRadius: 8 }} />
              <div style={{ width: "90%", height: 18, background: "#e2e8f0", borderRadius: 6 }} />
              <div style={{ width: "80%", height: 18, background: "#e2e8f0", borderRadius: 6 }} />
              <div style={{ width: "100%", height: 200, background: "#ffffff", borderRadius: 16, border: "1px solid #e2e8f0" }} />
            </div>
            <div style={{ width: "100%", height: 380, background: "#ffffff", borderRadius: 20, border: "1px solid #e2e8f0" }} />
          </div>
        </div>
      </div>
    );
  }

  // ERROR / NOT FOUND STATE
  if (error || !masterclass) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#f7f8fc",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        <div style={{
          background: "#ffffff",
          borderRadius: "24px",
          padding: "48px 36px",
          maxWidth: "480px",
          textAlign: "center",
          boxShadow: "0 12px 36px rgba(15, 23, 42, 0.08)",
          border: "1px solid #e2e8f0",
        }}>
          <div style={{
            width: "64px",
            height: "64px",
            borderRadius: "50%",
            background: "#fee2e2",
            color: "#ef4444",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}>
            <Tv size={28} />
          </div>
          <h2 style={{ fontSize: "22px", fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>
            Masterclass Not Found
          </h2>
          <p style={{ fontSize: "14px", color: "#64748b", margin: "0 0 24px", lineHeight: 1.6 }}>
            {error || "We could not find the requested masterclass record in our database."}
          </p>
          <Link
            href="/lms/masterclasses"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "12px 24px",
              borderRadius: "12px",
              background: "#ff5532",
              color: "#ffffff",
              fontWeight: 700,
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={16} /> Back to Masterclasses
          </Link>
        </div>
      </div>
    );
  }

  const isLive = masterclass.status === "live";
  const isCompleted = masterclass.status === "completed";
  const isZoom = (masterclass.platform || "").toLowerCase().includes("zoom");
  const hasRecording = Boolean(masterclass.recordingLink || masterclass.recordingUrl);
  const fillPercentage = Math.round((masterclass.registeredCount / masterclass.maxAttendees) * 100);

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 8% 0%, rgba(255, 235, 228, 0.5), transparent 36rem), #f8fafc",
      padding: "24px 20px 140px",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      color: "#0f172a",
    }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        {/* Navigation Breadcrumbs & Back */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "20px",
        }}>
          <Link
            href="/lms/masterclasses"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderRadius: "10px",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              color: "#475569",
              fontSize: "13px",
              fontWeight: 700,
              textDecoration: "none",
              transition: "all 140ms ease",
              boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
            }}
          >
            <ArrowLeft size={15} /> All Masterclasses
          </Link>

          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "12px",
            color: "#64748b",
            fontWeight: 600,
          }}>
            <span>LMS Dashboard</span>
            <span>/</span>
            <span>Masterclasses</span>
            <span>/</span>
            <span style={{ color: "#ff5532", fontWeight: 700 }}>{masterclass.category}</span>
          </div>
        </div>

        {/* HERO BANNER SECTION (SHOW IMAGES & ESSENTIAL TEXT) */}
        <div style={{
          background: "#ffffff",
          borderRadius: "24px",
          border: "1px solid #e2e8f0",
          overflow: "hidden",
          boxShadow: "0 10px 30px rgba(15, 23, 42, 0.05)",
          marginBottom: "32px",
        }}>
          {/* Visual Banner Media */}
          <div style={{
            position: "relative",
            width: "100%",
            height: "clamp(240px, 34vw, 380px)",
            backgroundColor: "#0f172a",
            overflow: "hidden",
          }}>
            {/* Banner Image from Database */}
            <img
              src={masterclass.bannerImage}
              alt={masterclass.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
                filter: "brightness(0.9)",
              }}
            />

            {/* Gradient Overlay for Readable Text & Badges */}
            <div style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(15, 23, 42, 0.15) 0%, rgba(15, 23, 42, 0.75) 100%)",
            }} />

            {/* Top Banner Badges */}
            <div style={{
              position: "absolute",
              top: "20px",
              left: "20px",
              right: "20px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "10px",
            }}>
              {/* Category & Topic Chip */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "6px 14px",
                background: "rgba(15, 23, 42, 0.8)",
                backdropFilter: "blur(10px)",
                borderRadius: "30px",
                color: "#ffffff",
                fontSize: "12px",
                fontWeight: 750,
                border: "1px solid rgba(255, 255, 255, 0.15)",
              }}>
                <Sparkles size={13} style={{ color: "#fbbf24" }} />
                <span>{masterclass.category}</span>
                <span style={{ color: "rgba(255,255,255,0.4)" }}>•</span>
                <span style={{ color: "#cbd5e1" }}>{masterclass.topic}</span>
              </div>

              {/* Status Pill */}
              <div>
                {isLive ? (
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 16px",
                    borderRadius: "30px",
                    background: "rgba(239, 68, 68, 0.95)",
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: 800,
                    letterSpacing: "0.5px",
                    boxShadow: "0 0 18px rgba(239, 68, 68, 0.6)",
                  }}>
                    <span style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      background: "#ffffff",
                      animation: "pulse 1.2s infinite",
                    }} />
                    LIVE WEBINAR NOW
                  </span>
                ) : isCompleted ? (
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 14px",
                    borderRadius: "30px",
                    background: "rgba(30, 41, 59, 0.85)",
                    color: "#cbd5e1",
                    fontSize: "12px",
                    fontWeight: 700,
                  }}>
                    <CheckCircle2 size={13} style={{ color: "#10b981" }} />
                    RECORDED ARCHIVE
                  </span>
                ) : (
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    padding: "6px 16px",
                    borderRadius: "30px",
                    background: isZoom ? "rgba(37, 99, 235, 0.9)" : "rgba(255, 85, 50, 0.9)",
                    color: "#ffffff",
                    fontSize: "12px",
                    fontWeight: 800,
                    backdropFilter: "blur(8px)",
                  }}>
                    <Video size={13} />
                    UPCOMING LIVE SESSION
                  </span>
                )}
              </div>
            </div>

            {/* Bottom Floating Info Over Media */}
            <div style={{
              position: "absolute",
              bottom: "20px",
              left: "24px",
              right: "24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "14px",
            }}>
              <div>
                <span style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#fdba74",
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  marginBottom: "6px",
                  display: "block",
                }}>
                  Netcoder Interactive Masterclass Series
                </span>
                <h1 style={{
                  fontSize: "clamp(22px, 3vw, 32px)",
                  fontWeight: 850,
                  color: "#ffffff",
                  letterSpacing: "-0.8px",
                  margin: 0,
                  lineHeight: 1.25,
                  textShadow: "0 2px 10px rgba(0,0,0,0.5)",
                }}>
                  {masterclass.title}
                </h1>
              </div>

              {/* Platform Chip */}
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 16px",
                borderRadius: "14px",
                background: "rgba(255, 255, 255, 0.95)",
                color: isZoom ? "#1d4ed8" : "#c2410c",
                fontWeight: 800,
                fontSize: "13px",
                boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
              }}>
                <Video size={16} />
                <span>Stream via {masterclass.platform}</span>
              </div>
            </div>
          </div>

          {/* Quick Metrics Strip Below Banner */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "16px",
            padding: "20px 24px",
            background: "#ffffff",
            borderTop: "1px solid #f1f5f9",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "#fff2ef",
                color: "#ff5532",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Calendar size={20} />
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Session Date</div>
                <div style={{ fontSize: "13px", fontWeight: 750, color: "#0f172a" }}>{masterclass.formattedDate}</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "#eff6ff",
                color: "#2563eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Clock size={20} />
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Time & Duration</div>
                <div style={{ fontSize: "13px", fontWeight: 750, color: "#0f172a" }}>{masterclass.sessionTime} ({masterclass.durationMinutes}m)</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "#f0fdf4",
                color: "#16a34a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <Users size={20} />
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Capacity & Seats</div>
                <div style={{ fontSize: "13px", fontWeight: 750, color: "#0f172a" }}>
                  {masterclass.registeredCount} / {masterclass.maxAttendees} Enrolled ({masterclass.seatsLeft} left)
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{
                width: "42px",
                height: "42px",
                borderRadius: "12px",
                background: "#fef3c7",
                color: "#d97706",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <GraduationCap size={20} />
              </div>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>Certificate</div>
                <div style={{ fontSize: "13px", fontWeight: 750, color: "#0f172a" }}>Verified Certificate Included</div>
              </div>
            </div>
          </div>
        </div>

        {/* TWO-COLUMN CONTENT GRID */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 340px",
          gap: "28px",
          alignItems: "start",
        }}>
          {/* LEFT COLUMN: AGENDA, CURRICULUM, LEARNING OUTCOMES */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Overview / Introduction Card */}
            <div style={{
              background: "#ffffff",
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
              padding: "28px",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.03)",
            }}>
              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "11px",
                fontWeight: 800,
                color: "#ff5532",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                marginBottom: "8px",
              }}>
                <Flame size={13} />
                <span>Masterclass Overview</span>
              </div>
              <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: "0 0 14px" }}>
                What You Will Master in This Live Webinar
              </h2>
              <p style={{
                fontSize: "14.5px",
                color: "#475569",
                lineHeight: 1.7,
                margin: "0 0 16px",
              }}>
                This exclusive industry masterclass dives deep into <strong>{masterclass.topic}</strong>. Led by <strong>{masterclass.mentorName}</strong>, this session breaks down production patterns, battle-tested architectural mental models, and real-world system design tradeoffs that you cannot learn from surface-level tutorials.
              </p>
              <p style={{
                fontSize: "14px",
                color: "#64748b",
                lineHeight: 1.65,
                margin: 0,
              }}>
                Whether you are preparing for senior engineering interviews, scaling high-traffic apps, or integrating next-gen AI stacks, this interactive webinar provides immediate, actionable engineering skills.
              </p>
            </div>

            {/* DETAILED AGENDA BREAKDOWN (FROM DATABASE) */}
            <div style={{
              background: "#ffffff",
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
              padding: "28px",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.03)",
            }}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
                flexWrap: "wrap",
                gap: "10px",
              }}>
                <div>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    fontSize: "11px",
                    fontWeight: 800,
                    color: "#2563eb",
                    letterSpacing: "0.8px",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}>
                    <Layers size={13} />
                    <span>Curriculum & Schedule</span>
                  </div>
                  <h2 style={{ fontSize: "20px", fontWeight: 800, color: "#0f172a", margin: 0 }}>
                    Detailed Masterclass Agenda
                  </h2>
                </div>

                <span style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#64748b",
                  background: "#f1f5f9",
                  padding: "4px 12px",
                  borderRadius: "20px",
                }}>
                  {masterclass.agenda.length} Key Segments
                </span>
              </div>

              {/* Agenda Steps List */}
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {masterclass.agenda.map((item, index) => {
                  const cleanedText = typeof item === "string" ? item.replace(/^\d+\.\s*/, "") : item;
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: "16px",
                        padding: "16px 20px",
                        borderRadius: "14px",
                        background: index % 2 === 0 ? "#f8fafc" : "#ffffff",
                        border: "1px solid #edf2f7",
                        transition: "transform 140ms ease, border-color 140ms ease",
                      }}
                    >
                      {/* Step Number Badge */}
                      <div style={{
                        width: "36px",
                        height: "36px",
                        borderRadius: "10px",
                        background: index === 0 ? "linear-gradient(135deg, #ff5532 0%, #ff7354 100%)" : "#0f172a",
                        color: "#ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "13px",
                        fontWeight: 800,
                        flexShrink: 0,
                      }}>
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      {/* Content */}
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "14.5px", fontWeight: 750, color: "#0f172a", marginBottom: "4px" }}>
                          {cleanedText}
                        </div>
                        <div style={{ fontSize: "12px", color: "#64748b", lineHeight: 1.5 }}>
                          Live hands-on interactive walkthrough, live code execution, real-world benchmarks, and architectural discussion.
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* WHAT YOU RECEIVE / PERKS & CERTIFICATION */}
            <div style={{
              background: "#ffffff",
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
              padding: "28px",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.03)",
            }}>
              <h3 style={{ fontSize: "18px", fontWeight: 800, color: "#0f172a", margin: "0 0 16px" }}>
                Included with This Masterclass Pass
              </h3>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "12px",
              }}>
                {masterclass.perks.map((perk, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      padding: "12px 14px",
                      borderRadius: "12px",
                      background: "#f0fdf4",
                      border: "1px solid #dcfce7",
                      fontSize: "13px",
                      fontWeight: 650,
                      color: "#166534",
                    }}
                  >
                    <CheckCircle2 size={16} style={{ color: "#16a34a", flexShrink: 0 }} />
                    <span>{perk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* PREREQUISITES */}
            <div style={{
              background: "#ffffff",
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
              padding: "24px 28px",
              boxShadow: "0 4px 16px rgba(15, 23, 42, 0.03)",
            }}>
              <h3 style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a", margin: "0 0 12px" }}>
                Prerequisites & Target Audience
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {masterclass.prerequisites.map((req, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "13.5px", color: "#475569" }}>
                    <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ff5532", flexShrink: 0 }} />
                    <span>{req}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: SPEAKER CARD, WEBINAR ACCESS & ACTIONS */}
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* SPEAKER PROFILE CARD (SHOW MENTOR IMAGE & TEXT) */}
            <div style={{
              background: "#ffffff",
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
              padding: "24px",
              boxShadow: "0 6px 20px rgba(15, 23, 42, 0.04)",
            }}>
              <div style={{
                fontSize: "11px",
                fontWeight: 800,
                color: "#64748b",
                letterSpacing: "0.8px",
                textTransform: "uppercase",
                marginBottom: "16px",
              }}>
                Speaker & Faculty Lead
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "16px" }}>
                {/* Speaker Avatar Image */}
                <div style={{ position: "relative" }}>
                  <img
                    src={masterclass.mentorAvatar}
                    alt={masterclass.mentorName}
                    style={{
                      width: "64px",
                      height: "64px",
                      borderRadius: "18px",
                      objectFit: "cover",
                      border: "2px solid #ff5532",
                      boxShadow: "0 4px 12px rgba(255, 85, 50, 0.2)",
                    }}
                  />
                  <div style={{
                    position: "absolute",
                    bottom: "-4px",
                    right: "-4px",
                    width: "20px",
                    height: "20px",
                    borderRadius: "50%",
                    background: "#10b981",
                    border: "2px solid #ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#ffffff",
                  }}>
                    <Check size={11} strokeWidth={3} />
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: "16px", fontWeight: 800, color: "#0f172a" }}>
                    {masterclass.mentorName}
                  </div>
                  <div style={{ fontSize: "12px", color: "#ff5532", fontWeight: 700, margin: "2px 0 4px" }}>
                    {masterclass.mentorSpecialization}
                  </div>
                  <div style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    fontSize: "11.5px",
                    fontWeight: 700,
                    color: "#d97706",
                  }}>
                    <span>★ {masterclass.mentorRating}</span>
                    <span style={{ color: "#94a3b8" }}>• Top Rated Mentor</span>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <p style={{
                fontSize: "13px",
                color: "#64748b",
                lineHeight: 1.6,
                margin: "0 0 16px",
                borderTop: "1px solid #f1f5f9",
                paddingTop: "12px",
              }}>
                {masterclass.mentorBio}
              </p>

              {masterclass.mentorLinkedIn && (
                <a
                  href={masterclass.mentorLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                    fontSize: "12px",
                    fontWeight: 700,
                    color: "#2563eb",
                    textDecoration: "none",
                  }}
                >
                  <Linkedin size={14} /> Connect on LinkedIn <ExternalLink size={11} />
                </a>
              )}
            </div>

            {/* WEBINAR ACCESS & LINK DETAILS CARD */}
            <div style={{
              background: "#ffffff",
              borderRadius: "20px",
              border: "1px solid #e2e8f0",
              padding: "24px",
              boxShadow: "0 6px 20px rgba(15, 23, 42, 0.04)",
            }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "16px",
              }}>
                <span style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#64748b",
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                }}>
                  Webinar Room Credentials
                </span>
                <span style={{
                  fontSize: "11px",
                  fontWeight: 800,
                  color: "#16a34a",
                  background: "#dcfce7",
                  padding: "3px 8px",
                  borderRadius: "6px",
                }}>
                  PASS VERIFIED
                </span>
              </div>

              {/* Attendance Bar */}
              <div style={{ marginBottom: "18px" }}>
                <div style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "12px",
                  fontWeight: 700,
                  marginBottom: "6px",
                }}>
                  <span style={{ color: "#475569" }}>Capacity</span>
                  <span style={{ color: "#0f172a" }}>{fillPercentage}% Full</span>
                </div>
                <div style={{
                  width: "100%",
                  height: "8px",
                  background: "#f1f5f9",
                  borderRadius: "10px",
                  overflow: "hidden",
                }}>
                  <div style={{
                    width: `${fillPercentage}%`,
                    height: "100%",
                    background: fillPercentage > 85 ? "linear-gradient(90deg, #f59e0b, #ef4444)" : "linear-gradient(90deg, #ff5532, #ff7354)",
                    borderRadius: "10px",
                  }} />
                </div>
                <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
                  {masterclass.seatsLeft} remaining of {masterclass.maxAttendees} attendee spots
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {/* Main Launch / Join Button */}
                {isLive && masterclass.meetingLink ? (
                  <a
                    href={masterclass.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: "100%",
                      padding: "13px 20px",
                      borderRadius: "12px",
                      background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                      color: "#ffffff",
                      fontSize: "13px",
                      fontWeight: 800,
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      boxShadow: "0 6px 18px rgba(239, 68, 68, 0.35)",
                    }}
                  >
                    <Radio size={16} /> Enter Live {masterclass.platform} Room <ExternalLink size={13} />
                  </a>
                ) : masterclass.meetingLink ? (
                  <a
                    href={masterclass.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: "100%",
                      padding: "13px 20px",
                      borderRadius: "12px",
                      background: isZoom ? "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" : "linear-gradient(135deg, #ff5532 0%, #ff7354 100%)",
                      color: "#ffffff",
                      fontSize: "13px",
                      fontWeight: 800,
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      boxShadow: "0 6px 18px rgba(255, 85, 50, 0.28)",
                    }}
                  >
                    <Video size={16} /> Launch {masterclass.platform} Webinar <ExternalLink size={13} />
                  </a>
                ) : null}

                {/* Watch Recording if completed */}
                {hasRecording && (
                  <a
                    href={masterclass.recordingLink || masterclass.recordingUrl || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      width: "100%",
                      padding: "12px 18px",
                      borderRadius: "12px",
                      background: "#0f172a",
                      color: "#ffffff",
                      fontSize: "13px",
                      fontWeight: 750,
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <Play size={14} fill="currentColor" /> Watch Full Session Recording
                  </a>
                )}

                {/* Copy Webinar Link */}
                <button
                  type="button"
                  onClick={handleCopyLink}
                  style={{
                    width: "100%",
                    padding: "11px 18px",
                    borderRadius: "12px",
                    background: copied ? "#f0fdf4" : "#f8fafc",
                    border: copied ? "1px solid #86efac" : "1px solid #e2e8f0",
                    color: copied ? "#166534" : "#475569",
                    fontSize: "12.5px",
                    fontWeight: 750,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    transition: "all 140ms ease",
                  }}
                >
                  {copied ? (
                    <>
                      <Check size={14} style={{ color: "#16a34a" }} /> Link Copied to Clipboard!
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> Copy Direct Webinar Link
                    </>
                  )}
                </button>

                {/* Instant RSVP Button */}
                {!registered ? (
                  <button
                    type="button"
                    onClick={handleRSVP}
                    disabled={registering}
                    style={{
                      width: "100%",
                      padding: "11px 18px",
                      borderRadius: "12px",
                      background: "#ffffff",
                      border: "1px solid #cbd5e1",
                      color: "#1e293b",
                      fontSize: "12.5px",
                      fontWeight: 700,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                    }}
                  >
                    <Zap size={14} style={{ color: "#f59e0b" }} />
                    {registering ? "Confirming..." : "Confirm Free RSVP Attendance"}
                  </button>
                ) : (
                  <div style={{
                    padding: "10px 14px",
                    borderRadius: "10px",
                    background: "#ecfdf5",
                    color: "#065f46",
                    fontSize: "12px",
                    fontWeight: 750,
                    textAlign: "center",
                  }}>
                    ✓ Your Seat is Reserved for this Session!
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          STICKY BOTTOM FLOATING ACTION BAR ("add btotm pone jin webinemater cbtuotn")
          ========================================================================= */}
      <aside
        aria-label="Masterclass Join Webinar Dock"
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: "rgba(255, 255, 255, 0.94)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(226, 232, 240, 0.85)",
          boxShadow: "0 -8px 30px rgba(15, 23, 42, 0.08)",
          padding: "14px 20px",
        }}
      >
        <div style={{
          maxWidth: 1180,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "14px",
        }}>
          {/* Left: Thumbnail, Title, Speaker & Live Indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px", minWidth: 0 }}>
            {/* Thumbnail Image */}
            <img
              src={masterclass.bannerImage}
              alt=""
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "12px",
                objectFit: "cover",
                border: "1px solid #e2e8f0",
                flexShrink: 0,
              }}
            />

            <div style={{ minWidth: 0 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "2px",
              }}>
                {isLive ? (
                  <span style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    padding: "2px 8px",
                    borderRadius: "12px",
                    background: "#fee2e2",
                    color: "#dc2626",
                    fontSize: "10.5px",
                    fontWeight: 800,
                  }}>
                    <span style={{
                      width: "6px",
                      height: "6px",
                      borderRadius: "50%",
                      background: "#ef4444",
                    }} />
                    LIVE NOW
                  </span>
                ) : isCompleted ? (
                  <span style={{
                    fontSize: "10.5px",
                    fontWeight: 750,
                    color: "#64748b",
                    background: "#f1f5f9",
                    padding: "2px 8px",
                    borderRadius: "12px",
                  }}>
                    CONCLUDED
                  </span>
                ) : (
                  <span style={{
                    fontSize: "10.5px",
                    fontWeight: 750,
                    color: "#2563eb",
                    background: "#eff6ff",
                    padding: "2px 8px",
                    borderRadius: "12px",
                  }}>
                    {masterclass.platform} • {masterclass.sessionTime}
                  </span>
                )}

                <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 600 }}>
                  with {masterclass.mentorName}
                </span>
              </div>

              {/* Title Truncated */}
              <div style={{
                fontSize: "14.5px",
                fontWeight: 800,
                color: "#0f172a",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                maxWidth: "clamp(200px, 40vw, 550px)",
              }}>
                {masterclass.title}
              </div>
            </div>
          </div>

          {/* Right: Join Webinar Button & Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Share / Copy Link Button */}
            <button
              type="button"
              onClick={handleCopyLink}
              title="Copy Webinar Link"
              style={{
                padding: "10px 14px",
                borderRadius: "12px",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                color: "#475569",
                fontSize: "12px",
                fontWeight: 700,
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {copied ? <Check size={14} style={{ color: "#16a34a" }} /> : <Copy size={14} />}
              <span style={{ display: "inline" }}>{copied ? "Copied" : "Copy Link"}</span>
            </button>

            {/* MAIN CTA BUTTON: JOIN WEBINAR / MASTERCLASS */}
            {isLive && masterclass.meetingLink ? (
              <a
                href={masterclass.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "11px 24px",
                  borderRadius: "12px",
                  background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                  color: "#ffffff",
                  fontSize: "13.5px",
                  fontWeight: 800,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 18px rgba(239, 68, 68, 0.4)",
                  cursor: "pointer",
                }}
              >
                <Radio size={16} /> Join Live Webinar Now <ExternalLink size={13} />
              </a>
            ) : masterclass.meetingLink ? (
              <a
                href={masterclass.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "11px 24px",
                  borderRadius: "12px",
                  background: isZoom ? "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" : "linear-gradient(135deg, #ff5532 0%, #ff7354 100%)",
                  color: "#ffffff",
                  fontSize: "13.5px",
                  fontWeight: 800,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 18px rgba(255, 85, 50, 0.3)",
                  cursor: "pointer",
                }}
              >
                <Video size={16} /> Join {masterclass.platform} Webinar <ExternalLink size={13} />
              </a>
            ) : hasRecording ? (
              <a
                href={masterclass.recordingLink || masterclass.recordingUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "11px 22px",
                  borderRadius: "12px",
                  background: "#0f172a",
                  color: "#ffffff",
                  fontSize: "13.5px",
                  fontWeight: 800,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Play size={15} fill="currentColor" /> Watch Recording
              </a>
            ) : (
              <button
                type="button"
                onClick={handleRSVP}
                style={{
                  padding: "11px 24px",
                  borderRadius: "12px",
                  background: "#ff5532",
                  color: "#ffffff",
                  fontSize: "13.5px",
                  fontWeight: 800,
                  border: "none",
                  cursor: "pointer",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 4px 18px rgba(255, 85, 50, 0.3)",
                }}
              >
                <Zap size={15} /> Reserve Webinar Pass
              </button>
            )}
          </div>
        </div>
      </aside>
    </div>
  );
}
