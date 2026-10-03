"use client";

import { useState, type ReactNode, type CSSProperties } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth/context";

 
const ACCENT = "#ff6b1a";    
const ACCENT_SOFT = "#fff3ea";    
const ACCENT_DARK = "#c94f0e";    

const navItems = [
  { label: "Dashboard", href: "/lms/dashboard", icon: "dashboard", matchExact: true },
  { label: "My Courses", href: "/lms/courses", icon: "menu_book", matchExact: false },
  { label: "Explore Catalog", href: "/lms/catalog", icon: "explore", matchExact: false },
  { label: "Practice Arena", href: "/lms/dashboard#arena", icon: "terminal", matchExact: false },
  { label: "Coding Challenges", href: "/lms/dashboard#challenges", icon: "code", matchExact: false },
  { label: "Community Hub", href: "/lms/dashboard#community", icon: "forum", matchExact: false },
  { label: "Certificates & Milestones", href: "/lms/profile", icon: "workspace_premium", matchExact: true },
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
    background: "rgba(0,0,0,0.4)",
    zIndex: 50,
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
    zIndex: 50,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    transition: "transform 0.3s ease",
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
    width: 36,
    height: 36,
    borderRadius: 8,
    objectFit: "contain",
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

  streakCard: {
    margin: "16px 0",
    padding: 16,
    borderRadius: 12,
    background: "#f8f9ff",
    border: "1px solid #e5eeff",
    boxShadow: "0 1px 3px rgba(15,23,42,0.04)",
  },

  streakTop: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  streakTitle: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontWeight: 700,
    fontSize: "0.9rem",
  },

  streakBadge: {
    padding: "2px 8px",
    borderRadius: 999,
    background: "#d9f2dd",
    color: "#004d1f",
    fontSize: "0.65rem",
    fontWeight: 700,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
  },

  streakText: {
    fontSize: "0.75rem",
    color: "#5c6169",
    marginBottom: 10,
  },

  streakBar: {
    width: "100%",
    height: 6,
    borderRadius: 999,
    background: "#eef1f8",
    overflow: "hidden",
  },

  streakFill: {
    height: "100%",
    width: "80%",
    background: "#22a34a",
    borderRadius: 999,
    transition: "width 0.3s",
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
    padding: "0 16px",
    gap: 12,
  },

  searchWrap: {
    position: "relative",
    flex: 1,
    maxWidth: 520,
  },

  searchInput: {
    width: "100%",
    height: 40,
    paddingLeft: 40,
    paddingRight: 90,
    borderRadius: 10,
    border: "1px solid #c3c6cf",
    background: "#ffffff",
    fontSize: "0.875rem",
    color: "#1a1c1e",
    outline: "none",
  },

  searchIcon: {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
    color: "#73777f",
    fontSize: 20,
  },

  kbd: {
    position: "absolute",
    right: 12,
    top: "50%",
    transform: "translateY(-50%)",
    padding: "2px 6px",
    borderRadius: 4,
    background: "#f1f4fe",
    border: "1px solid #c3c6cf",
    fontSize: "0.65rem",
    color: "#43474e",
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const { user, isAuthLoaded, logout } = useAuth();

  if (pathname === "/lms") return <>{children}</>;

  const currentUser = user || {
    name: "Sahil Sandhu",
    email: "sahil@netcoder.in",
    avatar:
      "https://api.dicebear.com/7.x/bottts/svg?seed=student",
  };

  return (
    <div style={S.root}>
      <style>{`
        .lms-sidebar-resp {
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }
        .lms-sidebar-resp.open {
          transform: translateX(0) !important;
        }
        .lms-header-resp {
          left: 0 !important;
          transition: left 0.3s ease;
        }
        .lms-mainwrap-resp {
          padding-left: 0 !important;
          transition: padding-left 0.3s ease;
        }
        @media (min-width: 1024px) {
          .lms-sidebar-resp {
            transform: translateX(0) !important;
          }
          .lms-header-resp {
            left: 280px !important;
          }
          .lms-mainwrap-resp {
            padding-left: 280px !important;
          }
          .lms-overlay-resp {
            display: none !important;
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
                    div.style.cssText = `width:36px;height:36px;border-radius:8px;background:${ACCENT};display:flex;align-items:center;justify-content:center;color:#fff;`;
                    div.innerHTML = `<span class="material-symbols-outlined" style="font-size:20px">school</span>`;
                    parent.insertBefore(div, parent.firstChild);
                  }
                }}
              />
              <span style={S.brandName}>NetCoder LMS</span>
            </Link>
            <button
              style={S.closeBtn}
              onClick={() => setSidebarOpen(false)}
              aria-label="Close"
            >
              <span className="material-symbols-outlined">close</span>
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
              const isActive = item.matchExact
                ? pathname === item.href
                : pathname.startsWith(item.href.split("#")[0]) &&
                item.href !== "/lms/dashboard";

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
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

          {/* STREAK CARD */}
          <div style={S.streakCard}>
            <div style={S.streakTop}>
              <div style={S.streakTitle}>
                <span style={{ fontSize: 18 }}>🔥</span>
                <span>14 Days Streak</span>
              </div>
              <span style={S.streakBadge}>Active</span>
            </div>
            <p style={S.streakText}>Next milestone in 3 days</p>
            <div style={S.streakBar}>
              <div style={S.streakFill} />
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div style={S.bottomBox}>
          <Link href="/lms/profile?tab=help" style={S.bottomLink} onClick={() => setSidebarOpen(false)}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
              help_outline
            </span>
            <span>Help &amp; Support</span>
          </Link>
          <Link href="/lms/profile?tab=settings" style={S.bottomLink} onClick={() => setSidebarOpen(false)}>
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
      <div className="lms-mainwrap-resp" style={S.mainWrap}>
        <header className="lms-header-resp" style={S.header}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flex: 1, maxWidth: 520 }}>
            <button
              onClick={() => setSidebarOpen(true)}
              className="lms-menu-btn"
              style={{ ...S.notifBtn }}
              aria-label="Open menu"
            >
              <span className="material-symbols-outlined">menu</span>
            </button>

            <div style={S.searchWrap}>
              <span className="material-symbols-outlined" style={S.searchIcon}>
                search
              </span>
              <input
                style={S.searchInput}
                placeholder="Search courses, topics, or code problems..."
                type="text"
              />
              <kbd style={S.kbd}>Ctrl + K</kbd>
            </div>
          </div>

          <div style={S.headerRight}>
            <button
              style={S.liveBtn}
              onClick={() => {
                const el = document.getElementById("countdown-timer");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: 18 }}>
                videocam
              </span>
              <span>Join Live Room</span>
            </button>

            <button style={S.notifBtn} title="Notifications">
              <span className="material-symbols-outlined">notifications</span>
              <span style={S.notifDot} />
            </button>

            <div style={S.divider} />

            <Link href="/lms/profile" style={S.profile}>
              <img
                alt="Profile"
                style={S.avatar}
                src={
                  currentUser.avatar ||
                  "https://api.dicebear.com/7.x/bottts/svg?seed=student"
                }
              />
              <div style={S.profileText}>
                <span style={S.profileName}>{currentUser.name}</span>
                <span style={S.profileLevel}>Level 4 Explorer</span>
              </div>
            </Link>
          </div>
        </header>

        <main style={S.main}>{children}</main>
      </div>
    </div>
  );
}