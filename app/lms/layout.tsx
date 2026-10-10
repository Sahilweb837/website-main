"use client";

import { useEffect, useState, type ReactNode, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/context";
import { api } from "@/lib/api";
import { calculateAutomatedClassStatus, getLiveClassStartAt, INITIAL_CLASSES, type LiveClass } from "@/data/lms-mentor-data";
import { LMS_COURSES } from "@/data/lms-courses";
import {
  getActiveCourseSlug,
  setActiveCourseSlug,
  isTodayAttended,
  markTodayAttendance,
  getLearningStreak,
  getWeeklyAttendance,
} from "@/lib/lms-progress";

const ACCENT = "#ff6b1a";    
const ACCENT_SOFT = "#fff3ea";    
const ACCENT_DARK = "#c94f0e";    

interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
  matchExact?: boolean;
}

const navItems: NavItem[] = [
  { label: "My Courses", href: "/lms/courses", icon: "school" },
  { label: "My Cohorts", href: "/lms/cohorts", icon: "groups" },
  { label: "My Masterclasses", href: "/lms/masterclasses", icon: "video_library" },
  { label: "Live Masterclasses", href: "/lms/live-masterclasses", icon: "sensors", badge: "LIVE" },
  { label: "Free Resources", href: "/lms/resources", icon: "menu_book", badge: "PDF" },
  { label: "Coding Challenges", href: "/lms/challenges", icon: "code", matchExact: true },
  { label: "Community Hub", href: "/lms/community", icon: "forum", matchExact: true },
  { label: "Certificates & Milestones", href: "/lms/profile?tab=certificates", icon: "workspace_premium", matchExact: true },
];

 const S: Record<string, CSSProperties> = {
  root: {
    minHeight: "100vh",
    background: "#ffffff",
    color: "#1a1c1e",
    fontFamily:
      "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    WebkitFontSmoothing: "antialiased",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.45)",
    zIndex: 90,
    backdropFilter: "blur(2px)",
  },

  sidebar: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    width: "280px",
    background: "#ffffff",
    borderRight: "1px solid #e5eeff",
    boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
    zIndex: 100,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
  },

  sidebarInner: {
    display: "flex",
    flexDirection: "column",
    flex: 1,
    overflowY: "auto",
    padding: "20px 16px 10px",
  },

  brandRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px",
    marginBottom: "16px",
  },

  brandLink: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    textDecoration: "none",
    color: "inherit",
  },

  logo: {
    width: 144,
    height: 44,
    objectFit: "contain",
    objectPosition: "left center",
  },

  brandName: {
    fontSize: "1.15rem",
    fontWeight: 700,
    letterSpacing: "-0.01em",
    color: "#1a1c1e",
  },

  closeBtn: {
    padding: 6,
    borderRadius: 8,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#43474e",
  },

  loginBtn: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    width: "100%",
    padding: "10px 12px",
    marginBottom: 16,
    borderRadius: 10,
    background: ACCENT,
    color: "#ffffff",
    fontWeight: 600,
    fontSize: "0.9rem",
    textDecoration: "none",
    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
    transition: "background 0.2s",
  },

  nav: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    flex: "0 0 auto",
  },

  navLink: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "12px 12px",
    borderRadius: 10,
    fontSize: "0.9rem",
    fontWeight: 500,
    textDecoration: "none",
    color: "#43474e",
    transition: "background 0.15s, color 0.15s",
  },

  navLinkActive: {
    background: ACCENT_SOFT,
    color: ACCENT_DARK,
    fontWeight: 600,
  },

  bottomBox: {
    padding: "12px 16px 16px",
    borderTop: "1px solid #f1f4fe",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
    gap: 6,
  },

  bottomLink: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    borderRadius: 10,
    fontSize: "0.9rem",
    fontWeight: 500,
    color: "#43474e",
    textDecoration: "none",
  },

  logoutBtn: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
    borderRadius: 10,
    fontSize: "0.9rem",
    fontWeight: 500,
    color: "#ba1a1a",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    width: "100%",
    marginTop: 4,
  },

  mainWrap: {
    transition: "padding 0.3s",
  },

  header: {
    position: "fixed",
    top: 0,
    right: 0,
    height: 64,
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(16px)",
    borderBottom: "1px solid #e5eeff",
    boxShadow: "0 1px 8px rgba(0,0,0,0.04)",
    zIndex: 40,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 0,
  },

  headerInner: {
    width: "100%",
    maxWidth: 1152,
    height: "100%",
    margin: "0 auto",
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: 12,
  },

  liveBtn: {
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    height: 40,
    padding: "0 16px",
    borderRadius: 10,
    background: ACCENT,
    color: "#ffffff",
    fontWeight: 600,
    fontSize: "0.875rem",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 1px 2px rgba(0,0,0,0.06)",
  },

  notifBtn: {
    position: "relative",
    padding: 8,
    borderRadius: 10,
    background: "transparent",
    border: "none",
    cursor: "pointer",
    color: "#43474e",
  },

  notifDot: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: "50%",
    background: "#ba1a1a",
    border: "2px solid #ffffff",
  },

  divider: {
    width: 1,
    height: 24,
    background: "#f1f4fe",
  },

  profile: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
    color: "inherit",
  },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #c3c6cf",
  },

  profileText: {
    display: "flex",
    flexDirection: "column",
    lineHeight: 1.2,
  },

  profileName: {
    fontSize: "0.875rem",
    fontWeight: 700,
    color: "#1a1c1e",
  },

  profileLevel: {
    fontSize: "0.7rem",
    fontWeight: 600,
    color: ACCENT_DARK,
  },

  main: {
    position: "relative",
    paddingTop: 64,
    minHeight: "100vh",
    background: "#ffffff",
  },
};

/* ─── COMPONENT ───────────────────────────────────────── */
export default function LMSLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState("");
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>(INITIAL_CLASSES);
  const [now, setNow] = useState(0);
  const [clockReady, setClockReady] = useState(false);
  const pathname = usePathname();
  const { user, isAuthLoaded, logout, enrolledCourses } = useAuth();

  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string>("fullstack-web-development");
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [weeklyAttendance, setWeeklyAttendance] = useState<{ day: string; date: string; attended: boolean; isToday: boolean }[]>([]);

  // Synchronize Active Course with localStorage & events
  useEffect(() => {
    const active = getActiveCourseSlug();
    if (active) setSelectedCourseSlug(active);

    const handleCourseChange = (e: any) => {
      if (e.detail && typeof e.detail === "string") {
        setSelectedCourseSlug(e.detail);
      }
    };
    window.addEventListener("lms_course_change", handleCourseChange);
    return () => window.removeEventListener("lms_course_change", handleCourseChange);
  }, []);

  // Synchronize Attendance & Streak
  useEffect(() => {
    if (!user) {
      setAttendanceMarked(false);
      setCurrentStreak(0);
      setWeeklyAttendance([]);
      return;
    }

    setAttendanceMarked(isTodayAttended(user.id));
    setCurrentStreak(getLearningStreak(user.id));
    setWeeklyAttendance(getWeeklyAttendance(user.id));

    const handleAttendanceChange = () => {
      setAttendanceMarked(isTodayAttended(user.id));
      setCurrentStreak(getLearningStreak(user.id));
      setWeeklyAttendance(getWeeklyAttendance(user.id));
    };

    window.addEventListener("lms_attendance_marked", handleAttendanceChange);
    return () => window.removeEventListener("lms_attendance_marked", handleAttendanceChange);
  }, [user]);

  const handleMarkAttendance = () => {
    if (!user) return;
    const res = markTodayAttendance(user.id);
    setAttendanceMarked(true);
    setCurrentStreak(res.streak);
    setWeeklyAttendance(getWeeklyAttendance(user.id));
  };

  const activeCourse = LMS_COURSES.find((c) => c.slug === selectedCourseSlug)
    || (enrolledCourses.length > 0 ? LMS_COURSES.find((c) => enrolledCourses.includes(c.slug)) : null)
    || LMS_COURSES.find((c) => c.slug === "fullstack-web-development")
    || LMS_COURSES[0];

  const studentEnrolledList = enrolledCourses.length > 0
    ? LMS_COURSES.filter((c) => enrolledCourses.includes(c.slug))
    : [activeCourse];

  // Initialize desktop sidebar open state
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024) {
      setSidebarOpen(true);
    }
  }, []);

  useEffect(() => {
    const syncProfileTab = () => {
      setActiveProfileTab(new URLSearchParams(window.location.search).get("tab") ?? "");
    };
    syncProfileTab();
    window.addEventListener("popstate", syncProfileTab);
    return () => window.removeEventListener("popstate", syncProfileTab);
  }, [pathname]);

  // Auto-close drawer on mobile when navigating
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  }, [pathname]);

  useEffect(() => {
    const updateClock = () => {
      setNow(Date.now());
      setClockReady(true);
    };
    updateClock();
    const interval = window.setInterval(updateClock, 30_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    let active = true;
    api.getLiveClasses().then((result) => {
      if (active && Array.isArray(result?.data) && result.data.length > 0) {
        setLiveClasses(result.data);
      }
    }).catch((error) => {
      console.error("Unable to load sidebar live-class schedule.", error);
    });
    return () => {
      active = false;
    };
  }, []);

  const featuredClass = liveClasses
    .map((session) => ({
      ...session,
      status: clockReady ? calculateAutomatedClassStatus(session) : session.status,
    }))
    .filter((session) => session.status !== "completed")
    .sort((a, b) => {
      if (a.status === "live") return -1;
      if (b.status === "live") return 1;
      return new Date(`${a.date}T${a.startTime}:00`).getTime()
        - new Date(`${b.date}T${b.startTime}:00`).getTime();
    })[0];
  const featuredClassCountdown = featuredClass
    ? (() => {
      if (!clockReady) return "Loading schedule…";
      if (featuredClass.status === "live") return "Live now";
        const start = getLiveClassStartAt(featuredClass, new Date(now));
        if (!start) return "Schedule to be confirmed";
        const remainingMinutes = Math.max(0, Math.floor((start.getTime() - now) / 60_000));
        const days = Math.floor(remainingMinutes / 1440);
        const hours = Math.floor((remainingMinutes % 1440) / 60);
        const minutes = remainingMinutes % 60;
        return days > 0 ? `In ${days}d ${hours}h` : hours > 0 ? `In ${hours}h ${minutes}m` : `In ${minutes}m`;
      })()
    : clockReady ? "No class scheduled" : "Loading schedule…";

  if (pathname === "/lms") return <>{children}</>;

  const currentUser = user || {
    name: "Student",
    email: "",
    avatar:
      "https://api.dicebear.com/7.x/bottts/svg?seed=student",
  };

  return (
    <div style={S.root}>
      <style>{`
        .lms-sidebar-resp {
          transform: translateX(-100%);
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          z-index: 100 !important;
        }
        .lms-sidebar-resp.open {
          transform: translateX(0) !important;
        }
        .lms-header-resp {
          left: 0 !important;
          transition: left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .lms-mainwrap-resp {
          padding-left: 0 !important;
          transition: padding-left 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .lms-menu-btn {
          flex-shrink: 0 !important;
          width: 40px !important;
          height: 40px !important;
          min-width: 40px !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          cursor: pointer !important;
        }
        .lms-header-brand {
          display: inline-flex;
          align-items: center;
          flex: 0 1 auto;
          min-width: 0;
        }
        .lms-header-brand img {
          display: block;
          width: 148px;
          height: 40px;
          object-fit: contain;
          object-position: left center;
        }
        .lms-header-inner { padding-left: 16px; padding-right: 16px; }
        @media (min-width: 640px) {
          .lms-header-inner { padding-left: 24px; padding-right: 24px; }
        }
        @media (min-width: 1024px) {
          .lms-header-inner { padding-left: 32px; padding-right: 32px; }
        }
        .lms-profile-name {
          max-width: 160px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        @media (min-width: 1024px) {
          .lms-header-resp.sidebar-open {
            left: 280px !important;
          }
          .lms-mainwrap-resp.sidebar-open {
            padding-left: 280px !important;
          }
          .lms-overlay-resp {
            display: none !important;
          }
        }
        @media (max-width: 1023px) {
          .lms-header-resp {
            left: 0 !important;
          }
          .lms-mainwrap-resp {
            padding-left: 0 !important;
          }
        }
        @media (max-width: 700px) {
          .lms-header-inner {
            gap: 6px !important;
            padding: 0 10px !important;
          }
          .lms-header-right {
            gap: 5px !important;
          }
          .lms-header-notification {
            display: none !important;
          }
          .lms-header-profile {
            gap: 6px !important;
          }
          .lms-header-brand img {
            width: 120px;
            height: 36px;
          }
          .lms-profile-text {
            display: flex !important;
            max-width: 100px;
          }
          .lms-profile-level {
            display: none !important;
          }
          .lms-live-label {
            display: none !important;
          }
          .lms-header-live {
            width: 40px !important;
            min-width: 40px !important;
            padding: 0 !important;
          }
        }
        @media (max-width: 430px) {
          .lms-header-brand img {
            width: 92px;
          }
          .lms-profile-text {
            max-width: 76px;
          }
          .lms-header-profile img {
            display: none;
          }
          .lms-header-resp {
            padding: 0 !important;
          }
          .lms-header-inner {
            padding: 0 8px !important;
          }
        }
      `}</style>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        rel="stylesheet"
      />

      {sidebarOpen && (
        <div className="lms-overlay-resp" style={S.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* SIDEBAR */}
      <aside className={`lms-sidebar-resp ${sidebarOpen ? "open" : ""}`} style={S.sidebar}>
        <div style={S.sidebarInner}>
          {/* Brand row with LOGO */}
          <div style={S.brandRow}>
            <Link href="/lms/courses" style={S.brandLink}>
              <img
                src="https://www.netcoder.in/images/logo.png"
                alt="NetCoder"
                style={S.logo}
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  el.style.display = "none";
                  const parent = el.parentElement;
                  if (parent && !parent.querySelector(".logo-fallback")) {
                    const div = document.createElement("div");
                    div.className = "logo-fallback";
                    div.style.cssText = `width:40px;height:40px;flex:0 0 40px;border-radius:8px;background:${ACCENT};display:flex;align-items:center;justify-content:center;color:#fff;`;
                    div.innerHTML = `<span class="material-symbols-outlined" style="font-size:20px">school</span>`;
                    parent.insertBefore(div, parent.firstChild);
                  }
                }}
              />
              <span style={S.brandName}></span>
            </Link>
            <button
              type="button"
              style={{
                ...S.closeBtn,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                cursor: "pointer",
              }}
              onClick={() => setSidebarOpen(false)}
              aria-label="Close side menu"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>

          {/* LOGIN LINK — visible only when not signed in and auth has hydrated */}
          {isAuthLoaded && !user && (
            <Link href="/login" style={S.loginBtn}>
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                login
              </span>
              <span>Log In</span>
            </Link>
          )}

          {/* 1. SELECT COURSE / ACTIVE PROGRAM WIDGET */}
          <div style={{ marginBottom: 12 }}>
            <div
              style={{
                position: "relative",
                background: "#f8fafc",
                border: "1px solid #e2e8f0",
                borderRadius: "14px",
                padding: "8px 10px",
                transition: "all 0.15s ease",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  userSelect: "none",
                }}
                onClick={() => setCourseDropdownOpen(!courseDropdownOpen)}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
                  <div
                    style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "8px",
                      background: "#fff2ef",
                      color: ACCENT,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>
                      school
                    </span>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontSize: "9px", fontWeight: 800, color: ACCENT, letterSpacing: "0.6px", textTransform: "uppercase" }}>
                      Active Course
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: 750,
                        color: "#0f172a",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "145px",
                      }}
                      title={activeCourse.title}
                    >
                      {activeCourse.title}
                    </div>
                  </div>
                </div>

                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: "20px",
                    color: "#64748b",
                    transform: courseDropdownOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  expand_more
                </span>
              </div>

              {/* DROPDOWN MENU */}
              {courseDropdownOpen && (
                <div
                  style={{
                    marginTop: "8px",
                    paddingTop: "8px",
                    borderTop: "1px solid #e2e8f0",
                    display: "flex",
                    flexDirection: "column",
                    gap: "4px",
                  }}
                >
                  <div style={{ fontSize: "10px", fontWeight: 700, color: "#64748b", padding: "2px 4px", textTransform: "uppercase" }}>
                    Switch Enrolled Course
                  </div>

                  {studentEnrolledList.map((c) => {
                    const isSelected = c.slug === activeCourse.slug;
                    return (
                      <button
                        type="button"
                        key={c.slug}
                        onClick={() => {
                          setActiveCourseSlug(c.slug);
                          setSelectedCourseSlug(c.slug);
                          setCourseDropdownOpen(false);
                          router.push(`/lms/courses`);
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "6px 8px",
                          borderRadius: "8px",
                          border: isSelected ? "1px solid #ff795b" : "1px solid transparent",
                          background: isSelected ? "#fff2ef" : "#ffffff",
                          color: isSelected ? ACCENT : "#334155",
                          fontSize: "11px",
                          fontWeight: isSelected ? 750 : 600,
                          textAlign: "left",
                          cursor: "pointer",
                          width: "100%",
                        }}
                      >
                        <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "160px" }}>
                          {c.title}
                        </span>
                        {isSelected && (
                          <span className="material-symbols-outlined" style={{ fontSize: "15px", color: ACCENT }}>
                            check
                          </span>
                        )}
                      </button>
                    );
                  })}

                  {/* Preview Other Courses */}
                  {LMS_COURSES.filter((c) => !studentEnrolledList.some((e) => e.slug === c.slug)).length > 0 && (
                    <>
                      <div style={{ fontSize: "9.5px", fontWeight: 750, color: "#94a3b8", padding: "6px 4px 2px", textTransform: "uppercase" }}>
                        Preview Other Courses
                      </div>
                      {LMS_COURSES.filter((c) => !studentEnrolledList.some((e) => e.slug === c.slug)).slice(0, 3).map((c) => {
                        const isSelected = c.slug === activeCourse.slug;
                        return (
                          <button
                            type="button"
                            key={c.slug}
                            onClick={() => {
                              setActiveCourseSlug(c.slug);
                              setSelectedCourseSlug(c.slug);
                              setCourseDropdownOpen(false);
                              router.push(`/lms/courses`);
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              padding: "6px 8px",
                              borderRadius: "8px",
                              border: isSelected ? "1px solid #ff795b" : "1px dashed #cbd5e1",
                              background: isSelected ? "#fff2ef" : "#fafafa",
                              color: isSelected ? ACCENT : "#64748b",
                              fontSize: "11px",
                              fontWeight: isSelected ? 750 : 600,
                              textAlign: "left",
                              cursor: "pointer",
                              width: "100%",
                            }}
                          >
                            <span style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", maxWidth: "140px" }}>
                              🔒 {c.title}
                            </span>
                            <span style={{ fontSize: "10px", fontWeight: 800, color: ACCENT }}>
                              ₹{c.price ?? 79}
                            </span>
                          </button>
                        );
                      })}
                    </>
                  )}

                  <Link
                    href="/lms/select-course"
                    onClick={() => {
                      setCourseDropdownOpen(false);
                      setSidebarOpen(false);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "7px 8px",
                      marginTop: "4px",
                      borderRadius: "8px",
                      background: "#fff2ef",
                      color: ACCENT,
                      fontSize: "11px",
                      fontWeight: 750,
                      textDecoration: "none",
                      justifyContent: "center",
                      border: "1px dashed #ffb4a2",
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: "15px" }}>
                      add_circle
                    </span>
                    <span>Explore &amp; Enroll More</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* 2. DAILY ATTENDANCE & LOGIN STREAK WIDGET */}
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #fee2e2",
              borderRadius: "14px",
              padding: "10px 10px",
              marginBottom: "14px",
              boxShadow: "0 2px 8px rgba(255, 85, 50, 0.04)",
            }}
          >
            {/* Top row: Date & Streak */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
              <div style={{ fontSize: "10.5px", fontWeight: 700, color: "#64748b" }}>
                {new Intl.DateTimeFormat("en-IN", { weekday: "short", day: "numeric", month: "short" }).format(new Date())}
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "3px",
                  padding: "2px 7px",
                  borderRadius: "10px",
                  background: "#fff2ef",
                  color: "#ea580c",
                  fontSize: "10.5px",
                  fontWeight: 800,
                }}
              >
                <span>🔥</span>
                <span>{currentStreak > 0 ? `${currentStreak}d Streak` : "Daily Streak"}</span>
              </div>
            </div>

            {/* Attendance Status */}
            <div style={{ marginBottom: "6px" }}>
              {attendanceMarked ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    padding: "5px",
                    borderRadius: "8px",
                    background: "#ecfdf5",
                    color: "#065f46",
                    fontSize: "10.5px",
                    fontWeight: 750,
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "14px", color: "#10b981" }}>
                    verified
                  </span>
                  <span>Attendance Marked ✓</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleMarkAttendance}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "5px",
                    padding: "6px 8px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #ff5532 0%, #ff7354 100%)",
                    color: "#ffffff",
                    fontSize: "11px",
                    fontWeight: 750,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 2px 8px rgba(255, 85, 50, 0.2)",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
                    how_to_reg
                  </span>
                  <span>Mark Today&apos;s Attendance</span>
                </button>
              )}
            </div>

            {/* Weekly 7-day mini attendance dots */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "5px", borderTop: "1px solid #f1f5f9" }}>
              {(weeklyAttendance.length > 0 ? weeklyAttendance : [
                { day: "M", attended: true, isToday: false },
                { day: "T", attended: true, isToday: false },
                { day: "W", attended: true, isToday: false },
                { day: "T", attended: true, isToday: false },
                { day: "F", attended: attendanceMarked, isToday: true },
                { day: "S", attended: false, isToday: false },
                { day: "S", attended: false, isToday: false },
              ]).map((w, idx) => (
                <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
                  <span style={{ fontSize: "8.5px", color: w.isToday ? ACCENT : "#94a3b8", fontWeight: w.isToday ? 800 : 600 }}>
                    {typeof w.day === "string" ? w.day.slice(0, 1) : "•"}
                  </span>
                  <div
                    style={{
                      width: "13px",
                      height: "13px",
                      borderRadius: "50%",
                      background: w.attended ? "#10b981" : "#f1f5f9",
                      border: w.isToday ? `1.5px solid ${ACCENT}` : "1px solid #e2e8f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#ffffff",
                      fontSize: "8.5px",
                      fontWeight: 800,
                    }}
                  >
                    {w.attended && "✓"}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NAV */}
          <nav style={S.nav}>
            {navItems.map((item) => {
              const [itemPath] = item.href.split("#");
              const isCertificates = item.href.includes("?tab=certificates");
              const isActive = isCertificates
                ? pathname === "/lms/profile" && activeProfileTab === "certificates"
                : item.matchExact
                  ? pathname === itemPath
                  : pathname.startsWith(itemPath);

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setActiveProfileTab(new URLSearchParams(item.href.split("?")[1] ?? "").get("tab") ?? "");
                    setSidebarOpen(false);
                  }}
                  style={{
                    ...S.navLink,
                    ...(isActive ? S.navLinkActive : {}),
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                    {item.icon}
                  </span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && (
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 800,
                        letterSpacing: "0.5px",
                        padding: "2px 7px",
                        borderRadius: "6px",
                        background: item.badge === "LIVE" ? "#ff3b14" : ACCENT_SOFT,
                        color: item.badge === "LIVE" ? "#ffffff" : ACCENT_DARK,
                        boxShadow: item.badge === "LIVE" ? "0 0 8px rgba(255, 59, 20, 0.4)" : "none",
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
          <Link
            href="/lms/live-masterclasses"
            onClick={() => setSidebarOpen(false)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              margin: "14px 4px 10px",
              padding: "12px 14px",
              border: "1px solid #fed7c9",
              borderRadius: 14,
              background: "linear-gradient(135deg, #fff7f3, #fff)",
              color: "#34303a",
              textDecoration: "none",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 800 }}>
              <span className="material-symbols-outlined" style={{ color: ACCENT, fontSize: 20 }}>school</span>
              Masterclass
            </span>
            <span style={{ paddingLeft: 28, color: ACCENT_DARK, fontSize: 12, fontWeight: 700 }}>
              {featuredClassCountdown}
            </span>
          </Link>

        </div>

        {/* BOTTOM */}
        <div style={S.bottomBox}>
          <Link href="/lms/profile?tab=help" style={S.bottomLink} onClick={() => { setActiveProfileTab("help"); setSidebarOpen(false); }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              help_outline
            </span>
            <span>Help &amp; Support</span>
          </Link>
          <Link href="/lms/profile?tab=settings" style={S.bottomLink} onClick={() => { setActiveProfileTab("settings"); setSidebarOpen(false); }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              settings
            </span>
            <span>Settings</span>
          </Link>
          {isAuthLoaded && user && (
            <button
              style={S.logoutBtn}
              onClick={() => {
                logout();
                setSidebarOpen(false);
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                logout
              </span>
              <span>Sign Out</span>
            </button>
          )}
        </div>
      </aside>

      {/* MAIN */}
      <div className={`lms-mainwrap-resp ${sidebarOpen ? "sidebar-open" : ""}`} style={S.mainWrap}>
        <header className={`lms-header-resp ${sidebarOpen ? "sidebar-open" : ""}`} style={S.header}>
          <div className="lms-header-inner" style={S.headerInner}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
              {!sidebarOpen && (
                <button
                  type="button"
                  onClick={() => setSidebarOpen(true)}
                  className="lms-menu-btn"
                  style={{
                    ...S.notifBtn,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    width: 40,
                    height: 40,
                    minWidth: 40,
                    cursor: "pointer",
                  }}
                  aria-label="Open side menu"
                  aria-expanded={false}
                >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                </button>
              )}

              <Link href="/lms/courses" className="lms-header-brand" aria-label="NetCoder LMS home">
                <img src="/images/logo.png" alt="NetCoder" />
              </Link>
            </div>

          <div className="lms-header-right" style={S.headerRight}>
            <button
              type="button"
              className="lms-header-live"
              style={S.liveBtn}
              onClick={() => {
                const meetingUrl = featuredClass?.meetingLink;
                if (featuredClass?.status === "live" && meetingUrl) {
                  try {
                    const parsedUrl = new URL(meetingUrl);
                    if (parsedUrl.protocol === "https:") {
                      window.open(parsedUrl.toString(), "_blank", "noopener,noreferrer");
                      return;
                    }
                  } catch (error) {
                    console.error("The live-class meeting link is invalid.", error);
                  }
                }
                router.push("/lms/live-masterclasses");
              }}
              aria-label={featuredClass?.status === "live" ? "Join the live masterclass" : "View upcoming masterclasses"}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                videocam
              </span>
              <span className="lms-live-label">
                {featuredClass?.status === "live" ? "Join Live Class" : "Upcoming Classes"}
              </span>
            </button>

            <button className="lms-header-notification" style={S.notifBtn} title="Notifications">
              <span className="material-symbols-outlined">notifications</span>
              <span style={S.notifDot} />
            </button>

            <div style={S.divider} />
            <Link
              href={user ? "/lms/profile" : "/login"}
              className="lms-header-profile"
              style={S.profile}
              aria-label={user ? `Open ${currentUser.name}'s profile` : "Sign in"}
            >
              <img
                alt=""
                style={S.avatar}
                src={
                  currentUser.avatar ||
                  "https://api.dicebear.com/7.x/bottts/svg?seed=student"
                }
              />
              <div className="lms-profile-text" style={S.profileText}>
                <span className="lms-profile-name" style={S.profileName}>{currentUser.name}</span>
                <span className="lms-profile-level" style={S.profileLevel}>My learning</span>
              </div>
            </Link>
            </div>
          </div>
        </header>

        <main style={S.main}>{children}</main>
      </div>
    </div>
  );
}