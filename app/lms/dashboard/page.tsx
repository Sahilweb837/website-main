"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/context";
import { getUserProgress, DEFAULT_ENROLLMENTS } from "@/data/lms-data";
import { COURSES } from "@/data/courses";
import { LMS_COURSES } from "@/data/lms-courses";
import {
  BookOpen, Clock, Trophy, Play, PlayCircle, CheckCircle2,
  Sparkles, ArrowRight, Code2, Terminal, Star, Flame,
  Video, Rocket, User, Award, TrendingUp, Zap, Layers,
  Atom, Braces, Database, Cloud, Shield, Cpu, Brain,
  Smartphone, Globe, GitBranch, Server, Calendar, Radio,
  Copy, Check, ExternalLink, FileDown, AlertCircle
} from "lucide-react";
import {
  INITIAL_CLASSES, INITIAL_NOTES, INITIAL_TASKS, calculateAutomatedClassStatus,
  type LiveClass, type MentorNote, type MentorTask
} from "@/data/lms-mentor-data";
import { api } from "@/lib/api";

/* ─────────────────────────────────────────────────────────
   FALLBACK USER (matches your existing demo user)
───────────────────────────────────────────────────────── */
const DEMO_FALLBACK_USER = {
  id: "demo-001",
  name: "Aarav Patel",
  email: "aarav@netcoder.in",
  phone: "9876543210",
  role: "student" as const,
  avatar: null as string | null,
};

/* ─────────────────────────────────────────────────────────
   TECH‑STACK ICON MAP
───────────────────────────────────────────────────────── */
type TechIcon = { Icon: React.ComponentType<{ size?: number; color?: string; strokeWidth?: number }>; color: string; label: string };

const TECH_ICONS: Record<string, TechIcon> = {
  react: { Icon: Atom, color: "#61dafb", label: "React" },
  typescript: { Icon: Braces, color: "#3178c6", label: "TypeScript" },
  javascript: { Icon: Braces, color: "#f7df1e", label: "JavaScript" },
  node: { Icon: Server, color: "#68a063", label: "Node.js" },
  python: { Icon: Code2, color: "#3776ab", label: "Python" },
  data: { Icon: Database, color: "#00758f", label: "Data" },
  cloud: { Icon: Cloud, color: "#4285f4", label: "Cloud" },
  aws: { Icon: Cloud, color: "#ff9900", label: "AWS" },
  docker: { Icon: Layers, color: "#2496ed", label: "Docker" },
  kubernetes: { Icon: Layers, color: "#326ce5", label: "Kubernetes" },
  security: { Icon: Shield, color: "#e11d48", label: "Security" },
  ai: { Icon: Brain, color: "#a855f7", label: "AI/ML" },
  ml: { Icon: Brain, color: "#a855f7", label: "ML" },
  mobile: { Icon: Smartphone, color: "#22c55e", label: "Mobile" },
  web: { Icon: Globe, color: "#ff5532", label: "Web" },
  git: { Icon: GitBranch, color: "#f05033", label: "Git" },
  algorithms: { Icon: Cpu, color: "#744800", label: "Algorithms" },
  default: { Icon: BookOpen, color: "#ff5532", label: "Course" },
};

function getTechIcon(course: any): TechIcon {
  const hay = `${course?.title ?? ""} ${course?.category ?? ""} ${course?.overview ?? ""}`.toLowerCase();
  for (const key of Object.keys(TECH_ICONS)) {
    if (key === "default") continue;
    if (hay.includes(key)) return TECH_ICONS[key];
  }
  return TECH_ICONS.default;
}

/* ─────────────────────────────────────────────────────────
   ROOT CSS VARIABLES (injected globally)
───────────────────────────────────────────────────────── */
const ROOT_VARS = `
  :root {
    --header-height: 3.5rem;
    --first-color: #ff5532;
    --second-color: #575757;
    --text-color: #111;
    --body-color: #fff;
    --shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    --normal-font-size: .938rem;
    --small-font-size: .813rem;
    --smaller-font-size: .75rem;
    --z-tooltip: 10;
    --z-fixed: 100;
  }
`;

/* ─────────────────────────────────────────────────────────
   SHARED STYLE TOKENS — mapped to :root variables
───────────────────────────────────────────────────────── */
const T = {
  bg: "#fafafa",
  surface: "#ffffff",
  text: "#111111",
  textMuted: "#575757",
  primary: "#ff5532",
  primarySoft: "#fff1ee",
  border: "#f0f0f0",
  borderLight: "#f1f5f9",
  success: "#006c49",
  successSoft: "#e6f8f0",
  warning: "#744800",
  warningSoft: "#ffddb8",
  danger: "#ba1a1a",
  dangerSoft: "#ffdad6",
  radius: 16,
  radiusSm: 10,
  shadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
  shadowHover: "0 12px 24px -8px rgba(255, 85, 50, 0.18)",
};

/* ─────────────────────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────────────────────── */
export default function LMSDashboardPage() {
  const { user, isAuthLoaded, loginAsDemo, enrolledCourses } = useAuth();
  const currentUser = user;
  const progress = currentUser ? getUserProgress(currentUser.id) : null;

  const enrollments = useMemo(() => {
    if (!currentUser) return [];
    if (enrolledCourses && enrolledCourses.length > 0) {
      return enrolledCourses.map((slug) => {
        const match = COURSES.find((c: any) => c.slug === slug) || LMS_COURSES.find((c: any) => c.slug === slug) || {
          slug,
          title: slug.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
          category: "Development",
          level: "Intermediate",
          duration: "40 hrs",
        };
        return {
          id: `en-${slug}`,
          course: match,
          progress: 35,
        };
      });
    }
    return [];
  }, [currentUser, enrolledCourses]);

  // LIVE CLASSES & MENTOR MATERIALS
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>(INITIAL_CLASSES);
  const [mentorNotes, setMentorNotes] = useState<MentorNote[]>(INITIAL_NOTES);
  const [mentorTasks, setMentorTasks] = useState<MentorTask[]>(INITIAL_TASKS);
  const [copiedClassId, setCopiedClassId] = useState<string | null>(null);
  const [classFilter, setClassFilter] = useState<"enrolled" | "all">("enrolled");

  // Dynamic fetch from API
  useEffect(() => {
    let isMounted = true;
    async function loadLiveClassData() {
      try {
        const [clsRes, notesRes, tasksRes] = await Promise.allSettled([
          api.getLiveClasses(),
          api.getNotes(),
          api.getTasks(),
        ]);
        if (isMounted) {
          if (clsRes.status === "fulfilled" && clsRes.value?.data && Array.isArray(clsRes.value.data) && clsRes.value.data.length > 0) {
            setLiveClasses(clsRes.value.data);
          }
          if (notesRes.status === "fulfilled" && notesRes.value?.data && Array.isArray(notesRes.value.data) && notesRes.value.data.length > 0) {
            setMentorNotes(notesRes.value.data);
          }
          if (tasksRes.status === "fulfilled" && tasksRes.value?.data && Array.isArray(tasksRes.value.data) && tasksRes.value.data.length > 0) {
            setMentorTasks(tasksRes.value.data);
          }
        }
      } catch (e) {
        console.warn("Live classes API load fallback", e);
      }
    }
    loadLiveClassData();
    return () => { isMounted = false; };
  }, []);

  // Filter classes for courses this student purchased / enrolled in
  const enrolledSlugs = useMemo(() => {
    return enrollments.map((e: any) => e.course?.slug || e.courseSlug || "").filter(Boolean);
  }, [enrollments]);

  const activeEnrolledClasses = useMemo(() => {
    return liveClasses.map((c) => ({
      ...c,
      status: calculateAutomatedClassStatus(c),
      isEnrolledInCourse: enrolledSlugs.length === 0 || enrolledSlugs.includes(c.courseSlug),
    }));
  }, [liveClasses, enrolledSlugs]);

  const userEnrolledSlugs = enrolledSlugs;
  const enrolledLiveClasses = useMemo(() => {
    return activeEnrolledClasses.filter((c) => enrolledSlugs.includes(c.courseSlug));
  }, [activeEnrolledClasses, enrolledSlugs]);

  const displayedClasses = useMemo(() => {
    if (classFilter === "enrolled" && enrolledSlugs.length > 0) {
      const match = activeEnrolledClasses.filter((c) => enrolledSlugs.includes(c.courseSlug));
      return match.length > 0 ? match : activeEnrolledClasses;
    }
    return activeEnrolledClasses;
  }, [activeEnrolledClasses, classFilter, enrolledSlugs]);

  // Featured live class (either one currently live, or next upcoming)
  const featuredClass = useMemo(() => {
    const ongoing = displayedClasses.find((c) => c.status === "live");
    if (ongoing) return ongoing;
    const upcoming = displayedClasses.find((c) => c.status === "upcoming");
    return upcoming || displayedClasses[0] || INITIAL_CLASSES[0];
  }, [displayedClasses]);

  const copyClassLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedClassId(id);
    setTimeout(() => setCopiedClassId(null), 2000);
  };

  /* Live countdown (24:50) */
  const [timeLeft, setTimeLeft] = useState(24 * 60 + 50);
  useEffect(() => {
    const t = setInterval(() => setTimeLeft((p) => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const fmt = (s: number) => ({
    h: String(Math.floor(s / 3600)).padStart(2, "0"),
    m: String(Math.floor((s % 3600) / 60)).padStart(2, "0"),
    s: String(s % 60).padStart(2, "0"),
  });
  const timer = fmt(timeLeft);

  // If auth is loaded and user is NOT logged in, show student login gate
  if (isAuthLoaded && !user) {
    return (
      <div style={{ background: T.bg, minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div style={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 24, padding: "40px 32px", maxWidth: 460, width: "100%", textAlign: "center", boxShadow: T.shadow }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: T.primarySoft, color: T.primary, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <Shield size={32} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: T.primary, textTransform: "uppercase", letterSpacing: "1px" }}>Netcoder LMS</span>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: T.text, margin: "8px 0 10px" }}>Student Portal Access</h2>
          <p style={{ fontSize: 14, color: T.textMuted, lineHeight: 1.6, marginBottom: 24 }}>
            Please log in with your enrolled student account to access your live courses, cloud labs, and certificates.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Link
              href="/login?redirect=/lms/dashboard"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, background: T.primary, color: "#fff", padding: "14px 20px", borderRadius: 12, fontWeight: 700, textDecoration: "none", fontSize: 14, boxShadow: "0 4px 14px rgba(255,85,50,0.3)" }}
            >
              Log In as Student <ArrowRight size={16} />
            </Link>
            <button
              type="button"
              onClick={() => loginAsDemo("/lms/dashboard")}
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, background: "#f8fafc", color: "#334155", border: "1px solid #e2e8f0", padding: "12px 20px", borderRadius: 12, fontWeight: 600, fontSize: 13, cursor: "pointer" }}
            >
              <Zap size={15} color="#ff5532" /> Continue with Demo Student Account
            </button>
            <Link
              href="/lms/explore"
              style={{ fontSize: 13, color: T.textMuted, textDecoration: "none", marginTop: 8 }}
            >
              Browse Course Catalog →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!currentUser || !progress) {
    return (
      <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ width: 40, height: 40, border: `3px solid ${T.primary}`, borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
      </div>
    );
  }

  return (
    <div style={{ background: T.bg, minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', 'Sora', sans-serif", color: T.text }}>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />

      {/* Inject :root CSS variables + component styles */}
      <style>{ROOT_VARS}</style>
      <style>{`
        .ep-card-hover { transition: all .25s cubic-bezier(.16,1,.3,1); }
        .ep-card-hover:hover { transform: translateY(-3px); box-shadow: ${T.shadowHover}; }
        .ep-btn-hover { transition: all .2s cubic-bezier(.16,1,.3,1); }
        .ep-btn-hover:hover { transform: translateY(-2px); box-shadow: 0 4px 14px rgba(255,85,50,.25); }
        @keyframes ep-ping { 0%{transform:scale(1);opacity:1;} 75%,100%{transform:scale(2.2);opacity:0;} }
        .ep-grid-3 { display:grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap:16px; }
        .ep-grid-2 { display:grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap:16px; }
        .ep-grid-main { display:grid; grid-template-columns: 1fr; gap:24px; }
        @media (min-width: 1024px) {
          .ep-grid-main { grid-template-columns: 2fr 1fr; }
        }
      `}</style>

      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "16px 16px 48px" }}>

        {/* ═══════════════════════════════════════════════
            SECTION 1 — MOBILE PROFILE HERO CARD
        ═══════════════════════════════════════════════ */}
        <section style={{ marginBottom: 24 }}>
          <div style={{ background: T.surface, borderRadius: T.radius, boxShadow: T.shadow, padding: "20px 20px", border: `1px solid ${T.border}` }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>

              {/* Avatar + name + level */}
              <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 260 }}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: `linear-gradient(135deg, ${T.primary}, #ff8a6e)`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "#fff", fontSize: 26, fontWeight: 800,
                    border: "3px solid #fff", boxShadow: "0 4px 12px rgba(255,85,50,.25)",
                  }}>
                    {currentUser.avatar ? (
                      <img src={currentUser.avatar} alt="" style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover" }} />
                    ) : (
                      currentUser.name.charAt(0)
                    )}
                  </div>
                  <span style={{
                    position: "absolute", bottom: -2, right: -2,
                    background: T.success, color: "#fff",
                    fontSize: 10, fontWeight: 800,
                    padding: "2px 6px", borderRadius: 999,
                    border: "2px solid #fff",
                  }}>LV4</span>
                </div>

                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", color: T.primary }}>
                    Cohort 14 &bull; Advanced Track
                  </div>
                  <h1 style={{ fontSize: 20, fontWeight: 800, margin: "2px 0", color: T.text, lineHeight: 1.2 }}>
                    {currentUser.name}
                  </h1>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: T.textMuted, flexWrap: "wrap" }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <Award size={13} color={T.primary} /> Level 4 Explorer
                    </span>
                    <span>&bull;</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <Flame size={13} color={T.warning} /> 14‑day streak
                    </span>
                  </div>
                </div>
              </div>

              {/* Quick actions row — mobile friendly */}
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Link href="/lms/profile" className="ep-btn-hover" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "8px 14px", borderRadius: T.radiusSm,
                  background: T.primarySoft, color: T.primary,
                  fontSize: 13, fontWeight: 700, textDecoration: "none",
                }}>
                  <User size={14} /> My Profile
                </Link>
                <Link href="/lms/dashboard#arena" className="ep-btn-hover" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  padding: "8px 14px", borderRadius: T.radiusSm,
                  background: T.text, color: "#fff",
                  fontSize: 13, fontWeight: 700, textDecoration: "none",
                }}>
                  <Terminal size={14} /> Practice Arena
                </Link>
              </div>
            </div>

            {/* Stats ribbon */}
            <div className="ep-grid-2" style={{ marginTop: 20 }}>
              <MiniStat icon={<BookOpen size={20} />} tint={T.primarySoft} color={T.primary} value={`${enrollments.length} Courses`} label="Active Programs" />
              <MiniStat icon={<Clock size={20} />} tint={T.successSoft} color={T.success} value={`${progress.totalHours || 18.4} hrs`} label="This Week" />
              <MiniStat icon={<Flame size={20} />} tint={T.warningSoft} color={T.warning} value="14 Days" label="Unbroken Streak" />
              <MiniStat icon={<Trophy size={20} />} tint="#fff1ee" color={T.primary} value="87%" label="Milestone Met" />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 2 — AUTOMATED LIVE BROADCAST & DAILY SCHEDULE
        ═══════════════════════════════════════════════ */}
        <section style={{
          position: "relative", overflow: "hidden",
          borderRadius: T.radius, background: T.surface,
          boxShadow: T.shadow, border: `1px solid ${T.border}`,
          marginBottom: 24,
        }}>
          {/* Orange left border strip */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 6, background: T.primary }} />

          {/* Featured Live Session Banner */}
          {featuredClass && (
            <div style={{ padding: "22px 24px", borderBottom: `1px solid ${T.borderLight}`, background: featuredClass.status === "live" ? "linear-gradient(90deg, #fff7f5 0%, #ffffff 100%)" : "#fff" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 20, alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ flex: "1 1 360px", display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 10 }}>
                    {featuredClass.status === "live" ? (
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        padding: "5px 12px", borderRadius: 999,
                        background: "#ff5532", color: "#fff",
                        fontSize: 11, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.5px",
                        boxShadow: "0 2px 10px rgba(255,85,50,0.35)",
                      }}>
                        <span style={{ position: "relative", display: "flex", width: 8, height: 8 }}>
                          <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "#fff", animation: "ep-ping 1.5s infinite", opacity: .85 }} />
                          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#fff" }} />
                        </span>
                        🔴 Live Now Broadcast
                      </span>
                    ) : (
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 6,
                        padding: "5px 12px", borderRadius: 999,
                        background: T.primarySoft, color: T.primary,
                        fontSize: 11, fontWeight: 800, textTransform: "uppercase",
                      }}>
                        <Clock size={13} /> Next Session in 25 mins
                      </span>
                    )}

                    <span style={{
                      display: "inline-flex", alignItems: "center", gap: 5,
                      padding: "4px 10px", borderRadius: 6,
                      background: "#fff5f2", color: "#c2410c",
                      fontSize: 11, fontWeight: 700, border: "1px solid #fed7aa",
                    }}>
                      🎓 {featuredClass.courseTitle}
                    </span>

                    {featuredClass.isAutomatedDaily && (
                      <span style={{
                        display: "inline-flex", alignItems: "center", gap: 4,
                        padding: "3px 8px", borderRadius: 6,
                        background: "#f8fafc", color: "#64748b",
                        fontSize: 11, fontWeight: 600, border: "1px solid #e2e8f0",
                      }}>
                        🔁 Automated Daily Class
                      </span>
                    )}
                  </div>

                  <h2 style={{ fontSize: 20, fontWeight: 800, margin: 0, color: T.text, letterSpacing: "-.01em" }}>
                    {featuredClass.title}
                  </h2>
                  <p style={{ fontSize: 13, color: T.textMuted, margin: 0, lineHeight: 1.5 }}>
                    {featuredClass.agenda?.join(" • ") || "Live interactive coding & mentorship session with faculty."}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14, fontSize: 12, color: T.textMuted }}>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontWeight: 700, color: T.text }}>
                      <span style={{ width: 22, height: 22, borderRadius: "50%", background: T.primarySoft, color: T.primary, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800 }}>
                        {featuredClass.mentorName.charAt(0)}
                      </span>
                      {featuredClass.mentorName}
                    </span>
                    <span>&bull;</span>
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                      <Calendar size={13} color={T.primary} /> {featuredClass.date} ({featuredClass.startTime} - {featuredClass.endTime} IST)
                    </span>
                    <span>&bull;</span>
                    <span style={{ fontWeight: 700, color: "#ea580c" }}>
                      Platform: {featuredClass.platform}
                    </span>
                    {featuredClass.passcode && (
                      <span style={{ background: "#f8fafc", padding: "2px 6px", borderRadius: 4, border: "1px solid #e2e8f0", fontFamily: "monospace", fontSize: 11 }}>
                        Passcode: <strong>{featuredClass.passcode}</strong>
                      </span>
                    )}
                  </div>
                </div>

                {/* Right Action buttons & countdown */}
                <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
                  <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    fontSize: 16, fontWeight: 800, color: T.primary,
                    background: T.primarySoft, padding: "8px 14px",
                    borderRadius: T.radiusSm, fontFamily: "monospace", border: `1px solid ${T.border}`,
                  }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: T.textMuted, textTransform: "uppercase" }}>Countdown</span>
                    <span>{timer.h}:{timer.m}:{timer.s}</span>
                  </div>

                  <a
                    href={featuredClass.meetingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ep-btn-hover"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      padding: "12px 22px", borderRadius: T.radiusSm,
                      background: T.primary, color: "#fff",
                      fontSize: 14, fontWeight: 800, textDecoration: "none",
                      boxShadow: "0 4px 14px rgba(255,85,50,.3)",
                    }}
                  >
                    <Video size={18} /> Join Meeting Direct <ExternalLink size={14} />
                  </a>

                  <button
                    type="button"
                    onClick={() => copyClassLink(featuredClass.meetingLink, featuredClass.id)}
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      padding: "11px 16px", borderRadius: T.radiusSm,
                      background: "#fff", color: T.text,
                      border: `1px solid ${T.border}`,
                      fontSize: 13, fontWeight: 700, cursor: "pointer",
                    }}
                  >
                    {copiedClassId === featuredClass.id ? (
                      <>
                        <Check size={14} color="#16a34a" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy size={14} /> Copy Link
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Daily Schedule List & Course Switcher */}
          <div style={{ padding: "18px 24px", background: "#fff" }}>
            <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 14, marginBottom: 16 }}>
              <div>
                <h3 style={{ fontSize: 15, fontWeight: 800, margin: 0, color: T.text, display: "flex", alignItems: "center", gap: 8 }}>
                  <Radio size={16} color={T.primary} /> Daily Cohort Live Classes &amp; Mentor Schedule
                </h3>
                <p style={{ fontSize: 12, color: T.textMuted, margin: "2px 0 0" }}>
                  Automated schedules updated daily. Links connect directly to Zoom &amp; Google Meet rooms.
                </p>
              </div>

              {/* Course filter pill switch */}
              <div style={{ display: "inline-flex", background: "#fff5f2", padding: 3, borderRadius: 10, border: "1px solid #fed7aa" }}>
                <button
                  type="button"
                  onClick={() => setClassFilter("enrolled")}
                  style={{
                    padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: "none",
                    background: classFilter === "enrolled" ? T.primary : "transparent",
                    color: classFilter === "enrolled" ? "#fff" : "#9a3412",
                    transition: "all .15s ease",
                  }}
                >
                  🎓 My Enrolled Courses ({enrolledLiveClasses.length})
                </button>
                <button
                  type="button"
                  onClick={() => setClassFilter("all")}
                  style={{
                    padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", border: "none",
                    background: classFilter === "all" ? T.primary : "transparent",
                    color: classFilter === "all" ? "#fff" : "#9a3412",
                    transition: "all .15s ease",
                  }}
                >
                  🌐 All Live Batches ({liveClasses.length})
                </button>
              </div>
            </div>

            {/* List of displayed classes */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {displayedClasses.length === 0 ? (
                <div style={{ padding: "24px", textAlign: "center", background: "#fffaf7", borderRadius: 12, border: "1px dashed #fed7aa" }}>
                  <Calendar size={28} color={T.primary} style={{ margin: "0 auto 8px" }} />
                  <div style={{ fontSize: 14, fontWeight: 700, color: T.text }}>No live classes currently scheduled for this filter.</div>
                  <div style={{ fontSize: 12, color: T.textMuted, marginTop: 4 }}>
                    Switch to &ldquo;All Live Batches&rdquo; to browse other scheduled mentor sessions.
                  </div>
                </div>
              ) : (
                displayedClasses.map((cls) => {
                  const isLive = cls.status === "live";
                  const isEnrolled = userEnrolledSlugs.includes(cls.courseSlug);

                  return (
                    <div
                      key={cls.id}
                      style={{
                        padding: "14px 18px", borderRadius: 12,
                        background: isLive ? "#fff7f5" : "#ffffff",
                        border: isLive ? "1px solid #ff5532" : `1px solid ${T.borderLight}`,
                        display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 14,
                        transition: "all .2s ease",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 260, flex: "1 1 300px" }}>
                        <div style={{
                          width: 44, height: 44, borderRadius: 12,
                          background: isLive ? "#ff5532" : T.primarySoft,
                          color: isLive ? "#fff" : T.primary,
                          display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                          fontWeight: 800, fontSize: 16,
                        }}>
                          {isLive ? <Radio size={20} /> : <Video size={20} />}
                        </div>

                        <div>
                          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            {isLive ? (
                              <span style={{ background: "#ff5532", color: "#fff", fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 999, textTransform: "uppercase" }}>
                                ● Live Now
                              </span>
                            ) : cls.status === "upcoming" ? (
                              <span style={{ background: "#fff5f2", color: T.primary, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 999, border: "1px solid #fed7aa" }}>
                                Upcoming
                              </span>
                            ) : (
                              <span style={{ background: "#f1f5f9", color: "#64748b", fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 999 }}>
                                Completed
                              </span>
                            )}

                            <span style={{ fontSize: 11, fontWeight: 700, color: "#c2410c" }}>
                              {cls.courseTitle}
                            </span>

                            {isEnrolled && (
                              <span style={{ fontSize: 10, fontWeight: 700, background: "#ecfdf5", color: "#047857", padding: "1px 6px", borderRadius: 4 }}>
                                ✓ Your Course
                              </span>
                            )}
                          </div>

                          <div style={{ fontSize: 14, fontWeight: 800, color: T.text, lineHeight: 1.3 }}>
                            {cls.title}
                          </div>

                          <div style={{ fontSize: 12, color: T.textMuted, marginTop: 4, display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8 }}>
                            <span>Mentor: <strong>{cls.mentorName}</strong></span>
                            <span>&bull;</span>
                            <span>{cls.date}</span>
                            <span>&bull;</span>
                            <span>{cls.startTime} - {cls.endTime}</span>
                            <span>&bull;</span>
                            <span style={{ color: "#ea580c", fontWeight: 600 }}>{cls.platform}</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                        <button
                          type="button"
                          onClick={() => copyClassLink(cls.meetingLink, cls.id)}
                          title="Copy Meeting Link"
                          style={{
                            padding: "8px 12px", borderRadius: 8,
                            background: "#fff", color: T.text, border: `1px solid ${T.border}`,
                            fontSize: 12, fontWeight: 600, cursor: "pointer",
                            display: "inline-flex", alignItems: "center", gap: 4,
                          }}
                        >
                          {copiedClassId === cls.id ? <Check size={13} color="#16a34a" /> : <Copy size={13} />}
                          {copiedClassId === cls.id ? "Copied" : "Copy"}
                        </button>

                        <a
                          href={cls.meetingLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            padding: "8px 16px", borderRadius: 8,
                            background: isLive ? T.primary : T.primarySoft,
                            color: isLive ? "#fff" : T.primary,
                            fontSize: 12, fontWeight: 800, textDecoration: "none",
                            display: "inline-flex", alignItems: "center", gap: 6,
                            boxShadow: isLive ? "0 2px 8px rgba(255,85,50,0.3)" : "none",
                          }}
                        >
                          <Video size={14} /> Join Class <ExternalLink size={12} />
                        </a>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════
            SECTION 3 — MAIN GRID: courses (left) + side (right)
        ═══════════════════════════════════════════════ */}
        <div className="ep-grid-main">

          {/* ─────────── LEFT: COURSE CATALOG ─────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Resume Learning */}
            <section>
              <SectionHeader
                icon={<PlayCircle size={22} color={T.primary} />}
                title="Resume Your Learning"
                action={
                  <Link href="/lms/select-course" style={{ color: T.primary, fontWeight: 700, fontSize: 13, textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                    Choose Career Track <ArrowRight size={15} />
                  </Link>
                }
              />
              <div className="ep-grid-2">
                {enrollments.length === 0 ? (
                  <div style={{ gridColumn: "1 / -1", background: "#fff", border: `1px dashed ${T.border}`, borderRadius: T.radius, padding: "32px 20px", textAlign: "center" }}>
                    <BookOpen size={32} color={T.primary} style={{ margin: "0 auto 10px" }} />
                    <h4 style={{ fontSize: 15, fontWeight: 700, margin: "0 0 4px" }}>No Courses Enrolled Yet</h4>
                    <p style={{ fontSize: 13, color: T.textMuted, margin: "0 0 14px" }}>Select your career specialization track and enroll to unlock full classroom access.</p>
                    <Link href="/lms/select-course" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: T.primary, color: "#fff", padding: "10px 20px", borderRadius: 10, fontWeight: 700, fontSize: 13, textDecoration: "none" }}>
                      Select Your Course Track <ArrowRight size={14} />
                    </Link>
                  </div>
                ) : (
                  enrollments.map((en: any) => (
                    <CourseCard key={en.id} course={en.course} progress={en.progress ?? 35} enrolled />
                  ))
                )}
              </div>
            </section>

            {/* Full Catalog with tech icons */}
            <section style={{ background: T.surface, borderRadius: T.radius, padding: 24, boxShadow: T.shadow }}>
              <SectionHeader
                icon={<Sparkles size={22} color={T.primary} />}
                title="Explore All Netcoder Career Tracks"
                subtitle={`${COURSES.length} programs &bull; ISO 9001:2015 verified`}
              />
              <div className="ep-grid-3">
                {COURSES.map((c: any) => (
                  <CourseCard key={c.slug} course={c} showTech />
                ))}
              </div>
            </section>
          </div>

          {/* ─────────── RIGHT: MILESTONES + COMMUNITY ─────────── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

            {/* Mentor Study Notes & Handbooks */}
            <section style={{ background: T.surface, borderRadius: T.radius, padding: 22, boxShadow: T.shadow, border: `1px solid ${T.border}` }}>
              <SectionHeader
                icon={<BookOpen size={20} color={T.primary} />}
                title="Mentor Study Notes & Handbooks"
                subtitle="Published directly by your faculty mentors"
                action={
                  <span style={{ fontSize: 11, fontWeight: 800, padding: "2px 8px", borderRadius: 999, background: T.primarySoft, color: T.primary }}>
                    {mentorNotes.length} Guides
                  </span>
                }
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {mentorNotes.slice(0, 4).map((note) => {
                  const isUserCourse = userEnrolledSlugs.includes(note.courseSlug);
                  return (
                    <div
                      key={note.id}
                      style={{
                        padding: "12px 14px", borderRadius: 10,
                        background: isUserCourse ? "#fffaf7" : "#fff",
                        border: isUserCourse ? "1px solid #fed7aa" : `1px solid ${T.borderLight}`,
                        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10,
                      }}
                    >
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}>
                          <span style={{ fontSize: 10, fontWeight: 700, background: T.primarySoft, color: T.primary, padding: "1px 6px", borderRadius: 4 }}>
                            {note.courseTitle}
                          </span>
                          {note.fileSize && (
                            <span style={{ fontSize: 10, color: T.textMuted }}>{note.fileSize}</span>
                          )}
                        </div>
                        <h4 style={{ fontSize: 13, fontWeight: 700, margin: 0, color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {note.title}
                        </h4>
                        <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>
                          By <strong>{note.mentorName}</strong> &bull; {note.publishedAt}
                        </div>
                      </div>

                      <a
                        href={note.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                        style={{
                          padding: "6px 12px", borderRadius: 8,
                          background: T.primary, color: "#fff",
                          fontSize: 11, fontWeight: 700, textDecoration: "none",
                          display: "inline-flex", alignItems: "center", gap: 4, flexShrink: 0,
                        }}
                      >
                        <FileDown size={13} /> PDF
                      </a>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Mentor Assigned Tasks & Project Deadlines */}
            <section style={{ background: T.surface, borderRadius: T.radius, padding: 22, boxShadow: T.shadow, border: `1px solid ${T.border}` }}>
              <SectionHeader
                icon={<Sparkles size={20} color={T.primary} />}
                title="Assigned Tasks & Projects"
                subtitle="Practical code tests graded by faculty"
                action={
                  <span style={{ fontSize: 11, fontWeight: 800, padding: "2px 8px", borderRadius: 999, background: "#ecfdf5", color: "#047857" }}>
                    {mentorTasks.length} Active
                  </span>
                }
              />
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {mentorTasks.slice(0, 3).map((task) => (
                  <div
                    key={task.id}
                    style={{
                      padding: "12px 14px", borderRadius: 10,
                      background: "#fff", border: `1px solid ${T.borderLight}`,
                      display: "flex", flexDirection: "column", gap: 6,
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, background: "#fff5f2", color: "#c2410c", padding: "1px 6px", borderRadius: 4 }}>
                        {task.courseTitle}
                      </span>
                      <span style={{ fontSize: 11, fontWeight: 800, color: T.primary }}>
                        +{task.points} XP
                      </span>
                    </div>

                    <h4 style={{ fontSize: 13, fontWeight: 700, margin: 0, color: T.text }}>
                      {task.title}
                    </h4>

                    <p style={{ fontSize: 11, color: T.textMuted, margin: 0, lineHeight: 1.4 }}>
                      {task.description}
                    </p>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4, fontSize: 11, color: T.textMuted }}>
                      <span>Due: <strong>{task.dueDate}</strong></span>
                      <span style={{ color: T.primary, fontWeight: 700, cursor: "pointer" }}>
                        Submit Work &rarr;
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Weekly Milestones */}
            <section style={{ background: T.surface, borderRadius: T.radius, padding: 24, boxShadow: T.shadow }}>
              <SectionHeader
                icon={<Trophy size={20} color={T.primary} />}
                title="Weekly Milestones"
                action={<span style={{ padding: "2px 8px", borderRadius: 999, background: "#ffd9cf", color: "#8a1f0a", fontSize: 11, fontWeight: 800 }}>Week 4</span>}
              />
              <div style={{ background: T.primarySoft, padding: 16, borderRadius: T.radiusSm, display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                <div style={{ position: "relative", width: 64, height: 64 }}>
                  <svg viewBox="0 0 36 36" style={{ width: 64, height: 64, transform: "rotate(-90deg)" }}>
                    <path stroke="#ffd9cf" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.5" />
                    <path stroke={T.primary} strokeDasharray="80, 100" strokeLinecap="round" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" strokeWidth="3.5" />
                  </svg>
                  <span style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800 }}>80%</span>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800 }}>4 / 5 Challenges</div>
                  <div style={{ fontSize: 12, color: T.textMuted }}>10 hrs study &amp; 5 challenges per week</div>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <Milestone done text="Complete Recursion Mastery module" sub="+150 XP &bull; Verified" />
                <Milestone done text="Submit React Final Project" sub="Score 98/100" />
                <Milestone text="Solve Hard DP challenge" sub="Due Sunday, 11:59 PM" warn />
                <Milestone locked text="Mastery Certificate unlocked" sub="Requires 100% weekly completion" />
              </div>
            </section>

            {/* Community Hub */}
            <section style={{ background: T.surface, borderRadius: T.radius, padding: 24, boxShadow: T.shadow }}>
              <SectionHeader icon={<Zap size={20} color={T.primary} />} title="Community Hub" />
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <CommunityItem tag="React 19" tagColor={T.primary} time="25m ago" title="Best practice for React Query caching in large apps?" meta="14 replies &bull; mentor replied" />
                <CommunityItem tag="Study Groups" tagColor={T.warning} time="2h ago" title="Study group forming for System Design mock interviews" meta="8 engineers joined" />
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SUB‑COMPONENTS
═══════════════════════════════════════════════════════ */

function MiniStat({ icon, tint, color, value, label }: { icon: React.ReactNode; tint: string; color: string; value: string; label: string }) {
  return (
    <div style={{ background: T.surface, padding: "14px 16px", borderRadius: T.radiusSm, boxShadow: "0 1px 4px rgba(0,0,0,.04)", display: "flex", alignItems: "center", gap: 14, border: `1px solid ${T.border}` }}>
      <div style={{ width: 42, height: 42, borderRadius: T.radiusSm, background: tint, display: "flex", alignItems: "center", justifyContent: "center", color, flexShrink: 0 }}>
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 17, fontWeight: 800, color: T.text, lineHeight: 1.1 }}>{value}</div>
        <div style={{ fontSize: 12, fontWeight: 600, color: T.textMuted }}>{label}</div>
      </div>
    </div>
  );
}

function SectionHeader({ icon, title, subtitle, action }: { icon: React.ReactNode; title: string; subtitle?: string; action?: React.ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16, gap: 12, flexWrap: "wrap" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {icon}
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: T.text }}>{title}</h2>
          {subtitle && <div style={{ fontSize: 12, color: T.textMuted, marginTop: 2 }} dangerouslySetInnerHTML={{ __html: subtitle }} />}
        </div>
      </div>
      {action}
    </div>
  );
}

/* ─── COURSE CARD WITH TECH ICON ──────────────────────── */
function CourseCard({ course, progress, enrolled, showTech }: { course: any; progress?: number; enrolled?: boolean; showTech?: boolean }) {
  const tech = getTechIcon(course);
  const pct = progress ?? 0;

  return (
    <div className="ep-card-hover" style={{
      background: T.surface, borderRadius: T.radius,
      boxShadow: T.shadow, overflow: "hidden",
      display: "flex", flexDirection: "column",
      border: `1px solid ${T.border}`, height: "100%",
    }}>
      {/* Top color band with tech icon */}
      <div style={{
        position: "relative", height: 96,
        background: `linear-gradient(135deg, ${tech.color}22, ${tech.color}0a)`,
        display: "flex", alignItems: "center", justifyContent: "center",
        borderBottom: `1px solid ${T.border}`,
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          background: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 12px rgba(0,0,0,.06)",
        }}>
          <tech.Icon size={28} color={tech.color} strokeWidth={2} />
        </div>

        {enrolled && (
          <span style={{
            position: "absolute", top: 10, left: 10,
            padding: "3px 8px", borderRadius: 999,
            background: T.primary, color: "#fff",
            fontSize: 10, fontWeight: 800, textTransform: "uppercase",
          }}>Enrolled</span>
        )}

        {showTech && (
          <span style={{
            position: "absolute", top: 10, right: 10,
            padding: "3px 8px", borderRadius: 6,
            background: "#fff", color: tech.color,
            fontSize: 10, fontWeight: 800, textTransform: "uppercase",
            border: `1px solid ${tech.color}44`,
          }}>{tech.label}</span>
        )}
      </div>

      <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 8, flex: 1 }}>
        <div style={{ fontSize: 11, fontWeight: 800, textTransform: "uppercase", color: T.primary }}>
          {course.category || "Professional Track"}
        </div>
        <h3 style={{ fontSize: 15, fontWeight: 700, color: T.text, margin: 0, lineHeight: 1.3 }}>
          {course.title}
        </h3>
        <p style={{
          fontSize: 12, color: T.textMuted, margin: 0, lineHeight: 1.5,
          display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {course.overview}
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: T.textMuted, marginTop: 2 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 3, color: T.warning, fontWeight: 700 }}>
            <Star size={12} fill="#ffb759" color="#ffb759" /> 4.9
          </span>
          <span>&bull;</span>
          <span>{course.duration || "12 weeks"}</span>
        </div>

        {enrolled && (
          <div style={{ marginTop: 4 }}>
            <div style={{ width: "100%", height: 6, background: T.border, borderRadius: 999, overflow: "hidden", marginBottom: 6 }}>
              <div style={{ width: `${pct}%`, height: "100%", background: T.primary, borderRadius: 999 }} />
            </div>
            <div style={{ fontSize: 11, color: T.textMuted }}>{pct}% completed</div>
          </div>
        )}
      </div>

      <div style={{ padding: 16, paddingTop: 0 }}>
        <Link href={`/lms/courses/${course.slug}`} className="ep-btn-hover" style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6,
          width: "100%", padding: "10px 14px", borderRadius: T.radiusSm,
          background: enrolled ? T.primarySoft : T.primary,
          color: enrolled ? T.primary : "#fff",
          fontSize: 13, fontWeight: 700, textDecoration: "none",
        }}>
          {enrolled ? <><Play size={14} /> Resume</> : <><Rocket size={14} /> Enroll Now</>}
        </Link>
      </div>
    </div>
  );
}

/* ─── MILESTONE ROW ───────────────────────────────────── */
function Milestone({ done, locked, warn, text, sub }: { done?: boolean; locked?: boolean; warn?: boolean; text: string; sub?: string }) {
  const bg = done ? "#fafafa" : warn ? "#fff8ee" : "transparent";
  const Icon = done ? CheckCircle2 : locked ? Award : TrendingUp;
  const iconColor = done ? T.success : locked ? "#777586" : T.warning;

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: 8, borderRadius: 8, background: bg, opacity: locked ? 0.55 : 1 }}>
      <Icon size={18} color={iconColor} style={{ flexShrink: 0, marginTop: 2 }} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 13, fontWeight: done ? 600 : 700, color: done ? T.textMuted : T.text, textDecoration: done ? "line-through" : "none" }}>{text}</div>
        {sub && <div style={{ fontSize: 11, color: done ? T.success : T.textMuted, fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: sub }} />}
      </div>
    </div>
  );
}

/* ─── COMMUNITY ITEM ──────────────────────────────────── */
function CommunityItem({ tag, tagColor, time, title, meta }: { tag: string; tagColor: string; time: string; title: string; meta: string }) {
  return (
    <div style={{ padding: 12, borderRadius: T.radiusSm, background: T.primarySoft, display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11 }}>
        <span style={{ padding: "1px 6px", borderRadius: 4, background: "#fff", color: tagColor, fontWeight: 700 }}>{tag}</span>
        <span style={{ color: T.textMuted }}>{time}</span>
      </div>
      <h4 style={{ fontSize: 13, fontWeight: 700, margin: 0, color: T.text, lineHeight: 1.4 }}>{title}</h4>
      <div style={{ fontSize: 11, color: T.textMuted }} dangerouslySetInnerHTML={{ __html: meta }} />
    </div>
  );
}