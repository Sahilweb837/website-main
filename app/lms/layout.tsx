"use client";

import { useEffect, useState, type ReactNode, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/context";
import { api } from "@/lib/api";
import { calculateAutomatedClassStatus, getLiveClassStartAt, INITIAL_CLASSES, type LiveClass } from "@/data/lms-mentor-data";
import { readLmsCart } from "@/lib/lms-cart";

 
const ACCENT = "#ff6b1a";    
const ACCENT_SOFT = "#fff3ea";    
const ACCENT_DARK = "#c94f0e";    

const navItems = [
  { label: "Dashboard", href: "/lms/dashboard", icon: "dashboard", matchExact: true },
  { label: "My Courses", href: "/lms/courses", icon: "menu_book", matchExact: false },
  { label: "Practice Arena", href: "/lms/practice", icon: "terminal", matchExact: true },
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
    padding: "24px 16px 0",
  },

  brandRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 8px",
    marginBottom: "24px",
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
    gap: 4,
    flex: 1,
  },

  navLink: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "10px 12px",
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
    padding: 16,
    borderTop: "1px solid #f1f4fe",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
    gap: 4,
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

  cartBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    height: 40,
    padding: "0 11px",
    borderRadius: 10,
    background: "#ffffff",
    color: "#43474e",
    fontWeight: 600,
    fontSize: "0.875rem",
    border: "1px solid #dfe2eb",
    cursor: "pointer",
    boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
  },

  cartCount: {
    minWidth: 18,
    height: 18,
    padding: "0 5px",
    borderRadius: 999,
    background: ACCENT,
    color: "#ffffff",
    fontSize: 11,
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
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
  const [courseCartCount, setCourseCartCount] = useState(0);
  const [activeProfileTab, setActiveProfileTab] = useState("");
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>(INITIAL_CLASSES);
  const [now, setNow] = useState(0);
  const [clockReady, setClockReady] = useState(false);
  const pathname = usePathname();
  const { user, isAuthLoaded, logout } = useAuth();

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
    setCourseCartCount(readLmsCart().length);
    const updateCartCount = (event: Event) => {
      const count = (event as CustomEvent<number>).detail;
      setCourseCartCount(typeof count === "number" ? count : 0);
    };

    window.addEventListener("lms:course-cart-count", updateCartCount);
    return () => window.removeEventListener("lms:course-cart-count", updateCartCount);
  }, []);

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
          .lms-live-label,
          .lms-cart-label {
            display: none !important;
          }
          .lms-header-live,
          .lms-header-cart {
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
            <Link href="/lms/dashboard" style={S.brandLink}>
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
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <Link
            href="/lms/dashboard#upcoming-classes"
            onClick={() => setSidebarOpen(false)}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              margin: "12px 4px 16px",
              padding: "13px 14px",
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

              <Link href="/lms/dashboard" className="lms-header-brand" aria-label="NetCoder LMS home">
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
                router.push("/lms/dashboard#upcoming-classes");
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

            {pathname === "/lms/select-course" && (
              <button
                type="button"
                className="lms-header-cart"
                style={S.cartBtn}
                aria-label={`Open course cart with ${courseCartCount} items`}
                onClick={() => window.dispatchEvent(new Event("lms:open-course-cart"))}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 19 }}>
                  shopping_cart
                </span>
                <span className="lms-cart-label">Cart</span>
                <span style={S.cartCount}>{courseCartCount}</span>
              </button>
            )}

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