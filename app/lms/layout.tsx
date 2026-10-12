"use client";

import { useEffect, useState, type ReactNode, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarDays,
  faCheck,
  faCircleCheck,
  faFire,
  faUserCheck,
  faCircleInfo,
  faXmark,
  faPhone,
  faEnvelope,
  faLocationDot,
  faGraduationCap,
  faArrowRight,
  faHeadset,
  faVideo,
  faShieldHalved,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
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

interface NavGroup {
  id: string;
  title: string;
  icon: string;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    id: "learning",
    title: "My Learning",
    icon: "school",
    items: [
      { label: "My Courses", href: "/lms/courses", icon: "school" },
      { label: "My Cohorts", href: "/lms/cohorts", icon: "groups" },
      { label: "My Masterclasses", href: "/lms/masterclasses", icon: "video_library" },
      { label: "Live Masterclasses", href: "/lms/live-masterclasses", icon: "sensors", badge: "LIVE" },
    ],
  },
  {
    id: "resources",
    title: "Resources & Practice",
    icon: "menu_book",
    items: [
      { label: "Free Resources", href: "/lms/resources", icon: "menu_book", badge: "PDF" },
      { label: "Coding Challenges", href: "/lms/challenges", icon: "code", matchExact: true },
      { label: "Community Hub", href: "/lms/community", icon: "forum", matchExact: true },
    ],
  },
  {
    id: "achievements",
    title: "Achievements",
    icon: "workspace_premium",
    items: [
      { label: "Certificates & Milestones", href: "/lms/profile?tab=certificates", icon: "workspace_premium", matchExact: true },
    ],
  },
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
  const [helpModalOpen, setHelpModalOpen] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState("");
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>(INITIAL_CLASSES);
  const [now, setNow] = useState(0);
  const [clockReady, setClockReady] = useState(false);
  const pathname = usePathname();
  const { user, isAuthLoaded, logout, enrolledCourses } = useAuth();

  const [selectedCourseSlug, setSelectedCourseSlug] = useState<string>("fullstack-web-development");
  const [courseDropdownOpen, setCourseDropdownOpen] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(1);
  const [weeklyAttendance, setWeeklyAttendance] = useState<{ day: string; date: string; attended: boolean; isToday: boolean }[]>([]);

  // Collapsible dropdown state for sidebar nav groups
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});

  // Determine if student has any enrolled courses
  const hasEnrolledCourses = enrolledCourses.length > 0;

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
    const studentId = user?.id || "student_user";
    const attended = isTodayAttended(studentId);
    const streak = getLearningStreak(studentId);
    setAttendanceMarked(attended);
    setCurrentStreak(Math.max(1, streak));
    setWeeklyAttendance(getWeeklyAttendance(studentId));

    const handleAttendanceChange = () => {
      const isAttended = isTodayAttended(studentId);
      const curStreak = getLearningStreak(studentId);
      setAttendanceMarked(isAttended);
      setCurrentStreak(Math.max(1, curStreak));
      setWeeklyAttendance(getWeeklyAttendance(studentId));
    };

    window.addEventListener("lms_attendance_marked", handleAttendanceChange);
    return () => window.removeEventListener("lms_attendance_marked", handleAttendanceChange);
  }, [user]);

  const handleMarkAttendance = () => {
    const studentId = user?.id || "student_user";
    const res = markTodayAttendance(studentId);
    if (!res.success) return;
    setAttendanceMarked(true);
    setCurrentStreak(Math.max(1, res.streak));
    setWeeklyAttendance(getWeeklyAttendance(studentId));
  };

  const activeCourse = LMS_COURSES.find((c) => c.slug === selectedCourseSlug)
    || (enrolledCourses.length > 0 ? LMS_COURSES.find((c) => enrolledCourses.includes(c.slug)) : null)
    || LMS_COURSES.find((c) => c.slug === "fullstack-web-development")
    || LMS_COURSES[0];

  const studentEnrolledList = enrolledCourses.length > 0
    ? LMS_COURSES.filter((c) => enrolledCourses.includes(c.slug))
    : [activeCourse];

  // Initialize desktop sidebar open state (only if enrolled)
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 1024 && hasEnrolledCourses) {
      setSidebarOpen(true);
    }
  }, [hasEnrolledCourses]);

  // Auto-expand the dropdown group that contains the active page
  useEffect(() => {
    const newExpanded: Record<string, boolean> = {};
    for (const group of navGroups) {
      const hasActive = group.items.some((item) => {
        const [itemPath] = item.href.split("#");
        const isCertificates = item.href.includes("?tab=certificates");
        if (isCertificates) return pathname === "/lms/profile" && activeProfileTab === "certificates";
        if (item.matchExact) return pathname === itemPath;
        return pathname.startsWith(itemPath);
      });
      if (hasActive) newExpanded[group.id] = true;
    }
    setExpandedGroups((prev) => ({ ...prev, ...newExpanded }));
  }, [pathname, activeProfileTab]);

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

      {sidebarOpen && hasEnrolledCourses && (
        <div className="lms-overlay-resp" style={S.overlay} onClick={() => setSidebarOpen(false)} />
      )}

      {/* SIDEBAR — only shown when student has enrolled courses */}
      {hasEnrolledCourses && (
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

          {/* DAILY ATTENDANCE & LOGIN STREAK WIDGET */}
          <div
            style={{
              background: "linear-gradient(145deg, #ffffff 0%, #fffaf7 100%)",
              border: "1px solid #f4d8ca",
              borderRadius: "16px",
              padding: "13px 12px",
              marginBottom: "14px",
              boxShadow: "0 8px 22px rgba(147, 74, 39, 0.06)",
            }}
          >
            {/* Row 1: Date & Streak Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 11 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#475569", fontSize: 11.5, fontWeight: 750 }}>
                <FontAwesomeIcon icon={faCalendarDays} style={{ color: ACCENT, fontSize: 13 }} />
                <span>on, {new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short" }).format(new Date())}</span>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "4px 9px",
                  borderRadius: 999,
                  background: "#fff0e8",
                  color: "#c94f0e",
                  fontSize: 11,
                  fontWeight: 800,
                  boxShadow: "0 2px 6px rgba(255, 107, 26, 0.12)",
                }}
              >
                <FontAwesomeIcon icon={faFire} style={{ color: "#ff5532" }} />
                <span>{currentStreak > 0 ? `${currentStreak}d Streak` : "1d Streak"}</span>
              </div>
            </div>

            {/* Row 2: Attendance Action / Verified State */}
            <div style={{ marginBottom: 11 }}>
              {attendanceMarked ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 10px",
                    borderRadius: 10,
                    background: "#ecfdf5",
                    border: "1px solid #a7f3d0",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6, color: "#065f46", fontSize: 11.5, fontWeight: 750 }}>
                    <FontAwesomeIcon icon={faCircleCheck} style={{ color: "#10b981", fontSize: 13 }} />
                    <span>Attendance Marked ✓</span>
                  </div>
                  <span
                    style={{
                      fontSize: 9.5,
                      fontWeight: 800,
                      color: "#059669",
                      background: "#d1fae5",
                      padding: "2px 7px",
                      borderRadius: 999,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    verified
                  </span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={handleMarkAttendance}
                  aria-label="Mark today's attendance"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 7,
                    padding: "8.5px 12px",
                    borderRadius: 10,
                    background: "linear-gradient(135deg, #ff5532 0%, #ff7354 100%)",
                    color: "#ffffff",
                    fontSize: 11.5,
                    fontWeight: 750,
                    border: "none",
                    cursor: "pointer",
                    boxShadow: "0 5px 14px rgba(255, 85, 50, 0.25)",
                    transition: "transform 0.15s ease",
                  }}
                >
                  <FontAwesomeIcon icon={faUserCheck} />
                  <span>Mark Today&apos;s Attendance</span>
                </button>
              )}
            </div>

            {/* Row 3: 7-Day Attendance Strip (T W T ✓ F ✓ S S M ✓) */}
            <div
              aria-label="Attendance for the last seven days"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(7, minmax(0, 1fr))",
                gap: 4,
                paddingTop: 10,
                borderTop: "1px solid #f1e6e1",
              }}
            >
              {weeklyAttendance.map((day) => {
                const isAttended = day.attended || (day.isToday && attendanceMarked);
                return (
                  <div
                    key={day.date}
                    title={`${day.day}, ${day.date}${isAttended ? " — attended" : " — not marked"}`}
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}
                  >
                    <span
                      style={{
                        fontSize: 9.5,
                        color: day.isToday ? ACCENT_DARK : "#64748b",
                        fontWeight: day.isToday ? 800 : 700,
                      }}
                    >
                      {day.day.slice(0, 1)}
                    </span>
                    <div
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: "50%",
                        background: isAttended ? "#10b981" : day.isToday ? "#fff1ec" : "#f1f5f9",
                        border: day.isToday ? `1.5px solid ${ACCENT}` : "1px solid #e2e8f0",
                        display: "grid",
                        placeItems: "center",
                        color: isAttended ? "#ffffff" : day.isToday ? ACCENT : "#94a3b8",
                        fontSize: 9.5,
                        fontWeight: 800,
                        transition: "all 0.2s ease",
                      }}
                    >
                      {isAttended ? <FontAwesomeIcon icon={faCheck} /> : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* NAV — Collapsible Dropdown Groups */}
          <nav style={S.nav}>
            {navGroups.map((group) => {
              const isExpanded = expandedGroups[group.id] ?? false;
              const groupHasActive = group.items.some((item) => {
                const [itemPath] = item.href.split("#");
                const isCertificates = item.href.includes("?tab=certificates");
                if (isCertificates) return pathname === "/lms/profile" && activeProfileTab === "certificates";
                if (item.matchExact) return pathname === itemPath;
                return pathname.startsWith(itemPath);
              });

              return (
                <div key={group.id}>
                  {/* Dropdown Heading */}
                  <button
                    type="button"
                    onClick={() => setExpandedGroups((prev) => ({ ...prev, [group.id]: !prev[group.id] }))}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 12px",
                      borderRadius: 10,
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      color: groupHasActive ? ACCENT_DARK : "#64748b",
                      background: groupHasActive ? "rgba(255,107,26,0.06)" : "transparent",
                      border: "none",
                      cursor: "pointer",
                      width: "100%",
                      textAlign: "left",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      transition: "all 0.15s",
                    }}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 18, color: groupHasActive ? ACCENT : "#94a3b8" }}>
                      {group.icon}
                    </span>
                    <span style={{ flex: 1 }}>{group.title}</span>
                    <span
                      className="material-symbols-outlined"
                      style={{
                        fontSize: 18,
                        color: "#94a3b8",
                        transition: "transform 0.2s",
                        transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    >
                      expand_more
                    </span>
                  </button>

                  {/* Dropdown Children */}
                  {isExpanded && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 2, paddingLeft: 12, marginTop: 2, marginBottom: 6 }}>
                      {group.items.map((item) => {
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
                              padding: "9px 12px",
                              fontSize: "0.85rem",
                              borderRadius: 8,
                            }}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
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
                    </div>
                  )}
                </div>
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
          <button
            type="button"
            onClick={() => {
              setHelpModalOpen(true);
              setSidebarOpen(false);
            }}
            style={{
              ...S.bottomLink,
              background: "transparent",
              border: "none",
              cursor: "pointer",
              width: "100%",
              textAlign: "left",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              help_outline
            </span>
            <span>Help &amp; Support</span>
          </button>
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
      )}

      {/* MAIN */}
      <div className={`lms-mainwrap-resp ${sidebarOpen && hasEnrolledCourses ? "sidebar-open" : ""}`} style={S.mainWrap}>
        <header className={`lms-header-resp ${sidebarOpen && hasEnrolledCourses ? "sidebar-open" : ""}`} style={S.header}>
          <div className="lms-header-inner" style={S.headerInner}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
              {(!sidebarOpen || !hasEnrolledCourses) && hasEnrolledCourses && (
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

      {/* ═══════════════════════════════════════════════
          HELP & SUPPORT DETAILED INFO MODAL
      ═══════════════════════════════════════════════ */}
      {helpModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.72)",
            backdropFilter: "blur(8px)",
            zIndex: 10000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 16,
          }}
          onClick={() => setHelpModalOpen(false)}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: 22,
              maxWidth: 620,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.35)",
              padding: "26px 28px",
              position: "relative",
              border: "1px solid #e2e8f0",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 14, marginBottom: 16, borderBottom: "1px solid #f1f5f9", paddingBottom: 14 }}>
              <div>
                <span
                  style={{
                    display: "inline-block",
                    background: "#fff2ef",
                    color: ACCENT,
                    fontSize: 10.5,
                    fontWeight: 800,
                    padding: "3px 9px",
                    borderRadius: 6,
                    textTransform: "uppercase",
                    letterSpacing: "0.6px",
                    marginBottom: 6,
                  }}
                >
                  Page Guide &amp; Student Helpdesk
                </span>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0f172a", margin: "2px 0 4px" }}>
                  {getPageDetailedInfo(pathname).title}
                </h2>
                <p style={{ fontSize: 12.5, color: "#64748b", margin: 0, fontWeight: 600 }}>
                  {getPageDetailedInfo(pathname).subtitle}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setHelpModalOpen(false)}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: "50%",
                  width: 34,
                  height: 34,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "#475569",
                  fontSize: 18,
                  fontWeight: 700,
                  flexShrink: 0,
                }}
                aria-label="Close help modal"
              >
                &times;
              </button>
            </div>

            {/* Current Page Explanation */}
            <div style={{ background: "#f8fafc", borderRadius: 14, padding: "14px 16px", marginBottom: 18, border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 11, fontWeight: 800, color: "#334155", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 5 }}>
                About This Page
              </div>
              <p style={{ fontSize: 13, color: "#475569", lineHeight: 1.6, margin: "0 0 10px" }}>
                {getPageDetailedInfo(pathname).desc}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {getPageDetailedInfo(pathname).highlights.map((h, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 12, color: "#1e293b", fontWeight: 600 }}>
                    <FontAwesomeIcon icon={faCheck} style={{ color: "#10b981", fontSize: 11 }} />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Mentorship & Contact Channels */}
            <div style={{ marginBottom: 18 }}>
              <div style={{ fontSize: 11.5, fontWeight: 800, color: "#0f172a", textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: 10 }}>
                Direct Faculty Mentors &amp; Assistance
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
                {/* WhatsApp */}
                <a
                  href="https://wa.me/919876543210"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: "#ecfdf5",
                    border: "1px solid #a7f3d0",
                    textDecoration: "none",
                    color: "#065f46",
                  }}
                >
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: "#10b981", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 800 }}>WhatsApp Mentor Desk</div>
                    <div style={{ fontSize: 11, color: "#047857" }}>+91 98765 43210 • 9am - 9pm</div>
                  </div>
                </a>

                {/* Email Support */}
                <a
                  href="mailto:hello@netcoder.in"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "12px 14px",
                    borderRadius: 12,
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    textDecoration: "none",
                    color: "#1e293b",
                  }}
                >
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: ACCENT, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12.5, fontWeight: 800 }}>Email Helpdesk</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>hello@netcoder.in</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Offline Campus Address */}
            <div style={{ padding: "12px 14px", borderRadius: 12, background: "#fff7ed", border: "1px solid #fed7aa", marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
              <FontAwesomeIcon icon={faLocationDot} style={{ color: "#ea580c", fontSize: 16 }} />
              <div style={{ fontSize: 12, color: "#9a3412" }}>
                <strong>Dharamshala Mountain Campus:</strong> Netcoder Technology Lab, Kangra Valley, Himachal Pradesh. In-person workstations &amp; faculty 1-on-1 desks available daily.
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, borderTop: "1px solid #f1f5f9", paddingTop: 14 }}>
              <Link
                href="/lms/profile?tab=help"
                onClick={() => setHelpModalOpen(false)}
                style={{
                  fontSize: 12.5,
                  fontWeight: 750,
                  color: ACCENT,
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <span>Open Full Student Help &amp; FAQs</span>
                <FontAwesomeIcon icon={faArrowRight} style={{ fontSize: 11 }} />
              </Link>

              <button
                type="button"
                onClick={() => setHelpModalOpen(false)}
                style={{
                  padding: "9px 20px",
                  borderRadius: 8,
                  background: ACCENT,
                  color: "#ffffff",
                  fontSize: 12.5,
                  fontWeight: 750,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function getPageDetailedInfo(path: string) {
  if (path.startsWith("/lms/courses")) {
    return {
      title: "My Courses & Career Tracks",
      subtitle: "Full-Stack Web Development, AI Engineering, Cloud & Security",
      desc: "This page shows all your enrolled courses, active progress bars, video lectures, and live cohort tracks. You can also explore and compare the 100% Online Live Track and the Offline Dharamshala Mountain Campus Track with dedicated workstations and 1-on-1 mentor desks.",
      highlights: [
        "Track individual module & lecture completion",
        "Switch between Online Live & In-Person Campus learning tracks",
        "Watch video testimonials from students who landed 12+ LPA offers",
        "Directly enroll or request advisory calls for upcoming batches",
      ],
    };
  }
  if (path.startsWith("/lms/live-masterclasses") || path.startsWith("/lms/masterclasses")) {
    return {
      title: "Industry Masterclasses & Workshops",
      subtitle: "Interactive Zoom & Google Meet webinars with tech leads",
      desc: "Live masterclasses give you direct access to staff engineers and architects from top tech companies. You can join happening live webinars, view upcoming agendas, or access full HD recorded archives.",
      highlights: [
        "One-click 'Join Class' to enter live Zoom / Google Meet rooms",
        "Lifetime access to high-definition session recordings",
        "Interactive Q&A and code architecture walkthroughs",
        "Detailed session syllabus, speaker profiles, and prerequisites",
      ],
    };
  }
  if (path.startsWith("/lms/cohorts")) {
    return {
      title: "Active Learning Cohorts",
      subtitle: "Batch schedules, weekend labs & peer project reviews",
      desc: "Your cohort groups you with fellow engineers for daily accountability, collaborative git repos, and weekly code reviews with faculty mentors.",
      highlights: [
        "Track upcoming cohort deadlines and weekly deliverables",
        "Sync with your dedicated cohort faculty mentor",
        "Collaborate in peer study groups and sprint retrospectives",
      ],
    };
  }
  if (path.startsWith("/lms/challenges")) {
    return {
      title: "Coding Challenges & Labs",
      subtitle: "Hands-on algorithmic challenges and system design drills",
      desc: "Sharpen your problem-solving skills with practical coding exercises, test cases, and real interview challenges designed for top product firms.",
      highlights: [
        "Multi-language code runner with instant test feedback",
        "Curated challenges from Easy to Hard",
        "Points, badges, and ranking on the global student leaderboard",
      ],
    };
  }
  if (path.startsWith("/lms/online-track")) {
    return {
      title: "100% Online Live Track",
      subtitle: "Remote, flexible mentor-led cohort program",
      desc: "Comprehensive roadmap from fundamentals to production capstones and placement preparation, with daily live Zoom/Meet sessions, lifetime recordings, and code reviews.",
      highlights: [
        "Structured 4-phase engineering roadmap",
        "Dedicated mentor desk assistance & code reviews",
        "Online cloud coding environments",
        "Direct inquiry form to talk with an admissions advisor",
      ],
    };
  }
  return {
    title: "Netcoder Learning Management Platform",
    subtitle: "Your comprehensive portal for modern software engineering",
    desc: "Welcome to the Netcoder student portal. Here you can access all your enrolled courses, live mentor masterclasses, coding sandboxes, daily attendance streaks, and verified certificates.",
    highlights: [
      "Access interactive courses and practice challenges",
      "Attend live masterclasses and review recorded sessions",
      "Keep up your daily attendance streak to unlock milestones",
      "Connect with faculty mentors via WhatsApp and Discord",
    ],
  };
}