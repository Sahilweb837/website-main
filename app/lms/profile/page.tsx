"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/context";
import {
  ArrowLeft, BadgeCheck, Camera, Trash2, Edit, X, Save,
  User as UserIcon, Award, Settings, LifeBuoy, Shield,
  BookOpen, Clock, Flame, Trophy, School, LayoutDashboard,
  Share2, Download, Copy, Lock, KeyRound, LogOut,
  MessageCircle, Headphones, CheckCircle2, Verified,
} from "lucide-react";

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
  primaryDeep: "#8a1f0a",
  border: "#f0f0f0",
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

const AVATAR_PRESETS = [
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDrusYS49vhCgKf7oUBA9gu6lRwqoo6nWO-PNY-gNJJs5biWTAsMoCavOfGL8kKluwvxP0mbFIyKzYJJ_Ejx--cx94Hvj1sDNiZSmxLALIBfPBsEExy4FZ5hwylWlIrqijF6tKapzBlJrNA7sj8LPHDrPM8wIM78IMfvm74TbrTeuKaY-VDPcwdHRnJTDabqskryXIp5ON-Ius1wFzn1q2wNEKWXR59KUHsimY0w1zQdmt3OlIf93zW",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80",
  "https://api.dicebear.com/7.x/bottts/svg?seed=netcoder-scholar",
  "https://api.dicebear.com/7.x/fun-emoji/svg?seed=engineer-aarav",
];

const CERTIFICATES = [
  {
    id: "CERT-NC-8821",
    title: "Docker & Kubernetes Cloud Architecture (Production Ready)",
    issuedDate: "Sept 20, 2026",
    grade: "Grade A+ (Distinction)",
    skills: ["Docker", "Kubernetes", "Helm", "Multi-zone HA"],
    status: "Verified On-Chain",
  },
  {
    id: "CERT-NC-7419",
    title: "Full-Stack React 19 & Next.js Server Components",
    issuedDate: "Aug 14, 2026",
    grade: "Score: 98/100",
    skills: ["React 19", "Server Actions", "Streaming SSR", "Tailwind"],
    status: "Verified On-Chain",
  },
];

function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "profile";

  const { user, isAuthenticated, isAuthLoaded, updateUser, logout } = useAuth();

  const [activeTab, setActiveTab] = useState<
    "profile" | "certificates" | "settings" | "help"
  >(
    initialTab === "settings"
      ? "settings"
      : initialTab === "help"
        ? "help"
        : initialTab === "certificates"
          ? "certificates"
          : "profile"
  );

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState(
    "Full-Stack Software Engineer & Distributed Systems Explorer at EduPulse."
  );
  const [github, setGithub] = useState("https://github.com/aaravpatel-dev");
  const [goal, setGoal] = useState(
    "Master Distributed Systems, CQRS, and Kubernetes Orchestration"
  );
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (user) {
      setName(user.name ?? "Aarav Patel");
      setEmail(user.email ?? "aarav@netcoder.in");
      setPhone(user.phone ?? "+91 98765 43210");
      setAvatarPreview(user.avatar ?? null);
    } else {
      setName("Aarav Patel");
      setEmail("aarav@netcoder.in");
      setPhone("+91 98765 43210");
    }
  }, [user]);

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size should be less than 5MB");
      return;
    }

    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setAvatarPreview(result);
      updateUser({ avatar: result });
      setIsUploading(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPresetAvatar = (url: string) => {
    setAvatarPreview(url);
    updateUser({ avatar: url });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview(null);
    updateUser({ avatar: null });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      name: name.trim() || user?.name || "Aarav Patel",
      email: email.trim() || null,
      phone: phone.trim() || null,
      avatar: avatarPreview,
    });
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3500);
  };

  const TABS: {
    key: typeof activeTab;
    label: string;
    icon: React.ReactNode;
  }[] = [
      {
        key: "profile",
        label: "Student Credentials",
        icon: <UserIcon size={16} />,
      },
      {
        key: "certificates",
        label: "Certificates & Milestones (2)",
        icon: <Award size={16} />,
      },
      {
        key: "settings",
        label: "Account & Security",
        icon: <Settings size={16} />,
      },
      {
        key: "help",
        label: "Support & Mentorship",
        icon: <LifeBuoy size={16} />,
      },
    ];

  const inputStyle: React.CSSProperties = {
    width: "100%",
    height: 44,
    padding: "0 14px",
    borderRadius: T.radiusSm,
    background: T.surface,
    border: `1px solid ${T.border}`,
    color: T.text,
    fontSize: 14,
    fontFamily: "inherit",
    boxSizing: "border-box",
    transition: "all .2s ease",
  };

  if (isAuthLoaded && !user) {
    return (
      <div style={{ background: T.bg, minHeight: "85vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        <div style={{ background: "#fff", border: `1px solid ${T.border}`, borderRadius: 24, padding: "40px 32px", maxWidth: 460, width: "100%", textAlign: "center", boxShadow: T.shadow }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: T.primarySoft, color: T.primary, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
            <UserIcon size={32} />
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: T.primary, textTransform: "uppercase", letterSpacing: "1px" }}>Netcoder LMS</span>
          <h2 style={{ fontSize: 24, fontWeight: 800, color: T.text, margin: "8px 0 10px" }}>Student Login Required</h2>
          <p style={{ fontSize: 14, color: T.textMuted, lineHeight: 1.6, marginBottom: 24 }}>
            Please log in with your student credentials to view and manage your profile and earned certificates.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <Link
              href="/login?redirect=/lms/profile"
              style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8, background: T.primary, color: "#fff", padding: "14px 20px", borderRadius: 12, fontWeight: 700, textDecoration: "none", fontSize: 14, boxShadow: "0 4px 14px rgba(255,85,50,0.3)" }}
            >
              Log In to Continue
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: T.bg,
        minHeight: "100vh",
        fontFamily: "'Plus Jakarta Sans', 'Sora', sans-serif",
        color: T.text,
      }}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      <style>{ROOT_VARS}</style>
      <style>{`
        .pf-card-hover { transition: all .25s cubic-bezier(.16,1,.3,1); }
        .pf-card-hover:hover { transform: translateY(-3px); box-shadow: ${T.shadowHover}; }
        .pf-btn-hover { transition: all .2s cubic-bezier(.16,1,.3,1); }
        .pf-btn-hover:hover { transform: translateY(-2px); box-shadow: 0 4px 14px rgba(255,85,50,.25); }
        .pf-input:focus { outline: none; border-color: ${T.primary}; box-shadow: 0 0 0 3px ${T.primary}22; }
        .pf-input:disabled { background: ${T.bg}; color: ${T.textMuted}; cursor: not-allowed; }
        .pf-avatar-tile { transition: all .2s ease; }
        .pf-avatar-tile:hover { transform: scale(1.06); border-color: ${T.primary}; }
        .pf-tab { transition: all .18s ease; }
        .pf-tab:hover { color: ${T.primary}; }
        @keyframes pf-fade { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .pf-fade { animation: pf-fade .3s ease both; }
      `}</style>

      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "24px 16px 64px",
        }}
      >
        {/* ═══════════════════════════════════════════════
            BREADCRUMB + STATUS CHIPS
        ═══════════════════════════════════════════════ */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 20,
          }}
        >
          <Link
            href="/lms/dashboard"
            className="pf-btn-hover"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 16px",
              borderRadius: T.radiusSm,
              background: T.surface,
              color: T.text,
              border: `1px solid ${T.border}`,
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={15} /> Back to Dashboard
          </Link>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "5px 12px",
                borderRadius: 999,
                background: T.primarySoft,
                color: T.primaryDeep,
                fontSize: 11,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: ".04em",
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: T.primary,
                }}
              />
              DRM Encrypted Student Account
            </span>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                fontSize: 12,
                color: T.textMuted,
                fontWeight: 600,
              }}
            >
              <Verified size={14} color={T.primary} />
              Laravel API Synchronized
            </span>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════
            SAVE SUCCESS BANNER
        ═══════════════════════════════════════════════ */}
        {saveSuccess && (
          <div
            className="pf-fade"
            style={{
              marginBottom: 20,
              padding: 16,
              borderRadius: T.radiusSm,
              background: T.successSoft,
              border: `1px solid ${T.success}33`,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                fontSize: 14,
                fontWeight: 700,
                color: T.success,
              }}
            >
              <CheckCircle2 size={18} />
              Profile and avatar preferences updated successfully!
            </div>
            <button
              onClick={() => setSaveSuccess(false)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                color: T.success,
                padding: 4,
                display: "flex",
              }}
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* ═══════════════════════════════════════════════
            HERO PROFILE CARD
        ═══════════════════════════════════════════════ */}
        <div
          style={{
            background: T.surface,
            borderRadius: T.radius,
            border: `1px solid ${T.border}`,
            boxShadow: T.shadow,
            overflow: "hidden",
            marginBottom: 28,
          }}
        >
          {/* Banner */}
          <div
            style={{
              position: "relative",
              height: 180,
              background: `linear-gradient(120deg, ${T.primaryDeep} 0%, ${T.primary} 55%, #ff8a6e 100%)`,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                right: -40,
                top: -40,
                width: 220,
                height: 220,
                borderRadius: "50%",
                background: "rgba(255,255,255,.14)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                left: -60,
                bottom: -60,
                width: 200,
                height: 200,
                borderRadius: "50%",
                background: "rgba(255,255,255,.08)",
                pointerEvents: "none",
              }}
            />

            <div
              style={{
                position: "relative",
                zIndex: 10,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 10,
              }}
            >
              <span
                style={{
                  padding: "5px 12px",
                  borderRadius: 999,
                  background: "rgba(255,255,255,.18)",
                  backdropFilter: "blur(8px)",
                  color: "#fff",
                  fontSize: 11,
                  fontWeight: 800,
                  textTransform: "uppercase",
                  letterSpacing: ".05em",
                  border: "1px solid rgba(255,255,255,.25)",
                }}
              >
                Cohort 14 • Advanced Track
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  color: "rgba(255,255,255,.9)",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                <BadgeCheck size={14} /> Pass ID: #NC-STU-4912
              </span>
            </div>

            <div
              style={{
                position: "relative",
                zIndex: 10,
                color: "rgba(255,255,255,.85)",
                fontSize: 13,
              }}
            >
              Enrolled Since August 2026 • Verified Engineering Candidate
            </div>
          </div>

          {/* Profile details */}
          <div style={{ padding: 24 }}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 16,
                marginTop: -80,
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  gap: 18,
                  flexWrap: "wrap",
                }}
              >
                {/* Avatar */}
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div
                    style={{
                      width: 120,
                      height: 120,
                      borderRadius: 20,
                      background: T.primarySoft,
                      border: `4px solid ${T.surface}`,
                      boxShadow: T.shadow,
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                    }}
                  >
                    {avatarPreview ? (
                      <img
                        src={avatarPreview}
                        alt={name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span
                        style={{
                          fontSize: 44,
                          fontWeight: 800,
                          color: T.primary,
                        }}
                      >
                        {name.charAt(0).toUpperCase()}
                      </span>
                    )}
                    {isUploading && (
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "rgba(0,0,0,.6)",
                          color: "#fff",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          fontWeight: 700,
                        }}
                      >
                        Uploading...
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    title="Upload Custom Photo"
                    className="pf-btn-hover"
                    style={{
                      position: "absolute",
                      bottom: 4,
                      right: 4,
                      width: 36,
                      height: 36,
                      borderRadius: T.radiusSm,
                      background: T.primary,
                      color: "#fff",
                      border: `2px solid ${T.surface}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Camera size={16} />
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleImageFileChange}
                    style={{ display: "none" }}
                  />
                </div>

                {/* Meta */}
                <div style={{ paddingBottom: 8, minWidth: 0 }}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <h1
                      style={{
                        fontSize: 22,
                        fontWeight: 800,
                        margin: 0,
                        color: T.text,
                        letterSpacing: "-.01em",
                      }}
                    >
                      {name}
                    </h1>
                    <Verified size={20} color={T.primary} />
                  </div>
                  <p
                    style={{
                      fontSize: 13,
                      color: T.textMuted,
                      margin: "4px 0 0",
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <span>{email}</span>
                    <span>•</span>
                    <span style={{ color: T.primary, fontWeight: 700 }}>
                      Level 4 Explorer
                    </span>
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div
                style={{
                  display: "flex",
                  gap: 8,
                  flexWrap: "wrap",
                  alignSelf: "flex-start",
                }}
              >
                {!isEditing ? (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="pf-btn-hover"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      height: 40,
                      padding: "0 18px",
                      borderRadius: T.radiusSm,
                      background: T.primary,
                      color: "#fff",
                      border: "none",
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    <Edit size={15} /> Edit Profile
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      height: 40,
                      padding: "0 18px",
                      borderRadius: T.radiusSm,
                      background: T.bg,
                      color: T.text,
                      border: `1px solid ${T.border}`,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    <X size={15} /> Cancel
                  </button>
                )}

                {avatarPreview && (
                  <button
                    type="button"
                    onClick={handleRemoveAvatar}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      height: 40,
                      padding: "0 14px",
                      borderRadius: T.radiusSm,
                      background: T.surface,
                      color: T.danger,
                      border: `1px solid ${T.danger}44`,
                      fontSize: 13,
                      fontWeight: 700,
                      cursor: "pointer",
                      fontFamily: "inherit",
                    }}
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                )}
              </div>
            </div>

            {/* Preset avatars */}
            <div
              style={{
                paddingTop: 16,
                borderTop: `1px solid ${T.border}`,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  letterSpacing: ".06em",
                  textTransform: "uppercase",
                  color: T.textMuted,
                }}
              >
                Or Choose A Preset Student Avatar
              </span>
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  overflowX: "auto",
                  padding: "4px 0",
                }}
              >
                {AVATAR_PRESETS.map((presetUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSelectPresetAvatar(presetUrl)}
                    className="pf-avatar-tile"
                    style={{
                      width: 46,
                      height: 46,
                      borderRadius: T.radiusSm,
                      overflow: "hidden",
                      border: `2px solid ${avatarPreview === presetUrl
                        ? T.primary
                        : T.border
                        }`,
                      boxShadow:
                        avatarPreview === presetUrl
                          ? `0 0 0 3px ${T.primary}33`
                          : "none",
                      flexShrink: 0,
                      cursor: "pointer",
                      padding: 0,
                      background: "transparent",
                    }}
                  >
                    <img
                      src={presetUrl}
                      alt="Preset"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════════════
            4 QUICK METRICS
        ═══════════════════════════════════════════════ */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <MiniStat
            icon={<BookOpen size={20} />}
            tint={T.primarySoft}
            color={T.primary}
            value="3"
            label="Active Courses"
          />
          <MiniStat
            icon={<Clock size={20} />}
            tint={T.successSoft}
            color={T.success}
            value="18.4 hrs"
            label="Dedicated This Week"
          />
          <MiniStat
            icon={<Flame size={20} />}
            tint={T.warningSoft}
            color={T.warning}
            value="14 Days"
            label="Unbroken Streak"
          />
          <MiniStat
            icon={<Trophy size={20} />}
            tint={T.primarySoft}
            color={T.primary}
            value="2 Certified"
            label="Micro-Credentials"
          />
        </div>

        {/* ═══════════════════════════════════════════════
            TABS
        ═══════════════════════════════════════════════ */}
        <div
          style={{
            display: "flex",
            gap: 4,
            borderBottom: `1px solid ${T.border}`,
            marginBottom: 24,
            overflowX: "auto",
          }}
        >
          {TABS.map((tab) => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className="pf-tab"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 16px",
                  borderBottom: `2px solid ${active ? T.primary : "transparent"
                    }`,
                  background: "transparent",
                  border: "none",
                  borderBottomWidth: 2,
                  borderBottomStyle: "solid",
                  borderBottomColor: active ? T.primary : "transparent",
                  color: active ? T.primary : T.textMuted,
                  fontSize: 13,
                  fontWeight: 800,
                  cursor: "pointer",
                  fontFamily: "inherit",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* ═══════════════════════════════════════════════
            TAB 1 — STUDENT CREDENTIALS
        ═══════════════════════════════════════════════ */}
        {activeTab === "profile" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: 24,
            }}
            className="pf-cols"
          >
            <style>{`
              @media (min-width: 1024px) {
                .pf-cols { grid-template-columns: 2fr 1fr; }
              }
            `}</style>

            {/* Form */}
            <div
              style={{
                background: T.surface,
                borderRadius: T.radius,
                border: `1px solid ${T.border}`,
                boxShadow: T.shadow,
                padding: 24,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap",
                  paddingBottom: 16,
                  borderBottom: `1px solid ${T.border}`,
                  marginBottom: 20,
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: 18,
                      fontWeight: 800,
                      margin: 0,
                      color: T.text,
                    }}
                  >
                    Personal Information & Track
                  </h2>
                  <p
                    style={{
                      fontSize: 13,
                      color: T.textMuted,
                      margin: "4px 0 0",
                    }}
                  >
                    Update your official student record for certificates and
                    mentor communication.
                  </p>
                </div>
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: 6,
                    background: T.bg,
                    color: T.textMuted,
                    fontSize: 11,
                    fontWeight: 800,
                  }}
                >
                  Cohort 14 Active
                </span>
              </div>

              <form
                onSubmit={handleSaveProfile}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: 16,
                  }}
                  className="pf-two"
                >
                  <style>{`
                    @media (min-width: 640px) {
                      .pf-two { grid-template-columns: 1fr 1fr; }
                    }
                  `}</style>

                  <Field label="Full Student Name">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={!isEditing}
                      required
                      className="pf-input"
                      style={inputStyle}
                    />
                  </Field>

                  <Field label="Registered Email Address">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={!isEditing}
                      required
                      className="pf-input"
                      style={inputStyle}
                    />
                  </Field>

                  <Field label="Phone / WhatsApp Number">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      disabled={!isEditing}
                      className="pf-input"
                      style={inputStyle}
                    />
                  </Field>

                  <Field label="GitHub / Portfolio Profile URL">
                    <input
                      type="url"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      disabled={!isEditing}
                      className="pf-input"
                      style={inputStyle}
                    />
                  </Field>
                </div>

                <Field label="Current Engineering Goal">
                  <input
                    type="text"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    disabled={!isEditing}
                    className="pf-input"
                    style={inputStyle}
                  />
                </Field>

                <Field label="Bio & Research Interests">
                  <textarea
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    disabled={!isEditing}
                    className="pf-input"
                    style={{
                      ...inputStyle,
                      height: "auto",
                      padding: 14,
                      resize: "vertical",
                      lineHeight: 1.55,
                    }}
                  />
                </Field>

                {isEditing && (
                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      paddingTop: 4,
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      type="submit"
                      className="pf-btn-hover"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        height: 44,
                        padding: "0 22px",
                        borderRadius: T.radiusSm,
                        background: T.primary,
                        color: "#fff",
                        border: "none",
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      <Save size={16} /> Save All Changes
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      style={{
                        height: 44,
                        padding: "0 20px",
                        borderRadius: T.radiusSm,
                        background: T.bg,
                        color: T.text,
                        border: `1px solid ${T.border}`,
                        fontSize: 14,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </form>
            </div>

            {/* Right column */}
            <div
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div
                style={{
                  background: T.surface,
                  borderRadius: T.radius,
                  border: `1px solid ${T.border}`,
                  boxShadow: T.shadow,
                  padding: 24,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    margin: 0,
                    color: T.text,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <School size={18} color={T.primary} />
                  Enrolled Cohort Track
                </h3>

                <div
                  style={{
                    padding: 16,
                    borderRadius: T.radiusSm,
                    background: T.primarySoft,
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        textTransform: "uppercase",
                        letterSpacing: ".05em",
                        color: T.primary,
                      }}
                    >
                      Program
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: T.success,
                      }}
                    >
                      Verified Student
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 14,
                      fontWeight: 800,
                      color: T.text,
                      lineHeight: 1.35,
                    }}
                  >
                    Advanced Full-Stack Engineering & Distributed Systems
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: T.textMuted,
                    }}
                  >
                    Instructor: Dr. Sarah Vance & Netcoder Faculty
                  </div>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                    fontSize: 13,
                    color: T.textMuted,
                  }}
                >
                  <Row label="Student ID">
                    <span
                      style={{
                        fontFamily: "monospace",
                        fontWeight: 700,
                        color: T.text,
                      }}
                    >
                      NC-STU-4912
                    </span>
                  </Row>
                  <Row label="Access Tier">
                    <span style={{ fontWeight: 700, color: T.success }}>
                      Full Lifetime Access
                    </span>
                  </Row>
                  <Row label="DRM Device Shield">
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 4,
                        fontWeight: 700,
                        color: T.success,
                      }}
                    >
                      <Shield size={13} /> Active
                    </span>
                  </Row>
                  <Row label="Laravel Sync">
                    <span style={{ fontWeight: 700, color: T.text }}>
                      Auto-Synced
                    </span>
                  </Row>
                </div>

                <Link
                  href="/lms/dashboard"
                  className="pf-btn-hover"
                  style={{
                    width: "100%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 8,
                    height: 44,
                    borderRadius: T.radiusSm,
                    background: T.primary,
                    color: "#fff",
                    fontSize: 14,
                    fontWeight: 700,
                    textDecoration: "none",
                  }}
                >
                  <LayoutDashboard size={16} /> Open Learning Dashboard
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════
            TAB 2 — CERTIFICATES
        ═══════════════════════════════════════════════ */}
        {activeTab === "certificates" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div
              style={{
                background: T.surface,
                borderRadius: T.radius,
                border: `1px solid ${T.border}`,
                boxShadow: T.shadow,
                padding: 20,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap",
              }}
            >
              <div>
                <h2
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    margin: 0,
                    color: T.text,
                  }}
                >
                  Verified Micro-Credentials & Course Certifications
                </h2>
                <p
                  style={{
                    fontSize: 13,
                    color: T.textMuted,
                    margin: "4px 0 0",
                  }}
                >
                  Credentials issued upon 100% completion of course curriculum
                  and capstone defense.
                </p>
              </div>
              <button
                type="button"
                className="pf-btn-hover"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  height: 40,
                  padding: "0 18px",
                  borderRadius: T.radiusSm,
                  background: T.primary,
                  color: "#fff",
                  border: "none",
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                <Share2 size={15} /> Share Transcript
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: 20,
              }}
            >
              {CERTIFICATES.map((cert) => (
                <div
                  key={cert.id}
                  className="pf-card-hover"
                  style={{
                    background: T.surface,
                    borderRadius: T.radius,
                    border: `1px solid ${T.border}`,
                    boxShadow: T.shadow,
                    padding: 22,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: 16,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 10,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 8,
                      }}
                    >
                      <span
                        style={{
                          padding: "4px 10px",
                          borderRadius: 999,
                          background: T.successSoft,
                          color: T.success,
                          fontSize: 10,
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: ".05em",
                        }}
                      >
                        {cert.status}
                      </span>
                      <span
                        style={{
                          fontFamily: "monospace",
                          fontSize: 11,
                          color: T.textMuted,
                        }}
                      >
                        {cert.id}
                      </span>
                    </div>

                    <h3
                      style={{
                        fontSize: 16,
                        fontWeight: 800,
                        color: T.text,
                        margin: "4px 0 0",
                        lineHeight: 1.35,
                      }}
                    >
                      {cert.title}
                    </h3>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        flexWrap: "wrap",
                        fontSize: 12,
                        color: T.textMuted,
                      }}
                    >
                      <span>Issued: {cert.issuedDate}</span>
                      <span>•</span>
                      <span style={{ color: T.success, fontWeight: 700 }}>
                        {cert.grade}
                      </span>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 6,
                        marginTop: 4,
                      }}
                    >
                      {cert.skills.map((skill) => (
                        <span
                          key={skill}
                          style={{
                            padding: "3px 8px",
                            borderRadius: 6,
                            background: T.bg,
                            color: T.textMuted,
                            fontSize: 11,
                            fontWeight: 700,
                            border: `1px solid ${T.border}`,
                          }}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      gap: 10,
                      paddingTop: 16,
                      borderTop: `1px solid ${T.border}`,
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      type="button"
                      onClick={() =>
                        alert(`Certificate #${cert.id} opened for verification.`)
                      }
                      className="pf-btn-hover"
                      style={{
                        flex: 1,
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        height: 40,
                        borderRadius: T.radiusSm,
                        background: T.primary,
                        color: "#fff",
                        border: "none",
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "inherit",
                      }}
                    >
                      <Download size={15} /> Download PDF
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        alert(
                          `Copy credential URL: https://netcoder.in/verify/${cert.id}`
                        )
                      }
                      style={{
                        height: 40,
                        padding: "0 16px",
                        borderRadius: T.radiusSm,
                        background: T.surface,
                        color: T.text,
                        border: `1px solid ${T.border}`,
                        fontSize: 13,
                        fontWeight: 700,
                        cursor: "pointer",
                        fontFamily: "inherit",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      <Copy size={14} /> Verify
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ═══════════════════════════════════════════════
            TAB 3 — SETTINGS
        ═══════════════════════════════════════════════ */}
        {activeTab === "settings" && (
          <div
            style={{
              maxWidth: 800,
              background: T.surface,
              borderRadius: T.radius,
              border: `1px solid ${T.border}`,
              boxShadow: T.shadow,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  margin: 0,
                  color: T.text,
                }}
              >
                Account Security & DRM Shield
              </h2>
              <p
                style={{
                  fontSize: 13,
                  color: T.textMuted,
                  margin: "4px 0 0",
                }}
              >
                Manage your password, active login sessions, and DRM device
                certificates.
              </p>
            </div>

            <SettingsRow
              icon={<Lock size={20} />}
              iconColor={T.success}
              iconBg={T.successSoft}
              title="DRM Zero-Leak Device Certificate"
              sub="Authorized hardware: Windows NT 10.0 • Browser ID #8841-NETC"
              action={
                <span
                  style={{
                    padding: "4px 10px",
                    borderRadius: 6,
                    background: T.successSoft,
                    color: T.success,
                    fontSize: 11,
                    fontWeight: 800,
                  }}
                >
                  Active & Protected
                </span>
              }
            />

            <SettingsRow
              icon={<KeyRound size={20} />}
              iconColor={T.primary}
              iconBg={T.primarySoft}
              title="Student Login Password"
              sub="Last updated 14 days ago. Strong password recommended."
              action={
                <button
                  type="button"
                  onClick={() =>
                    alert("Password reset link sent to your registered email.")
                  }
                  style={{
                    height: 36,
                    padding: "0 16px",
                    borderRadius: T.radiusSm,
                    background: T.bg,
                    color: T.text,
                    border: `1px solid ${T.border}`,
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Change Password
                </button>
              }
            />

            <SettingsRow
              icon={<LogOut size={20} />}
              iconColor={T.danger}
              iconBg={T.dangerSoft}
              title="Sign Out From Current Session"
              sub="Logs out this browser. You can log back in with your student credentials."
              action={
                <button
                  type="button"
                  onClick={() => logout()}
                  style={{
                    height: 36,
                    padding: "0 16px",
                    borderRadius: T.radiusSm,
                    background: T.danger,
                    color: "#fff",
                    border: "none",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    fontFamily: "inherit",
                  }}
                >
                  Sign Out
                </button>
              }
            />
          </div>
        )}

        {/* ═══════════════════════════════════════════════
            TAB 4 — HELP
        ═══════════════════════════════════════════════ */}
        {activeTab === "help" && (
          <div
            style={{
              maxWidth: 800,
              background: T.surface,
              borderRadius: T.radius,
              border: `1px solid ${T.border}`,
              boxShadow: T.shadow,
              padding: 24,
              display: "flex",
              flexDirection: "column",
              gap: 20,
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  margin: 0,
                  color: T.text,
                }}
              >
                Student Helpdesk & Faculty Support
              </h2>
              <p
                style={{
                  fontSize: 13,
                  color: T.textMuted,
                  margin: "4px 0 0",
                }}
              >
                Have doubts in code problems or system architecture? Reach out
                to our mentors.
              </p>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 16,
              }}
            >
              <HelpCard
                icon={<MessageCircle size={20} />}
                iconColor={T.primary}
                iconBg={T.primarySoft}
                title="Student Community Discord"
                desc="Connect with 1,200+ engineers, join code reviews, and mock interview rooms."
                actionLabel="Join Server →"
                actionColor={T.primary}
                onAction={() =>
                  alert("Redirecting to Netcoder Discord Community...")
                }
              />
              <HelpCard
                icon={<Headphones size={20} />}
                iconColor={T.success}
                iconBg={T.successSoft}
                title="Direct WhatsApp Mentor Desk"
                desc="Priority helpdesk for lab issues, DRM player troubleshooting, and assignment grading."
                actionLabel="Chat on WhatsApp →"
                actionColor={T.success}
                href="https://wa.me/919876543210"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SUB‑COMPONENTS
═══════════════════════════════════════════════════════ */

function MiniStat({
  icon,
  tint,
  color,
  value,
  label,
}: {
  icon: React.ReactNode;
  tint: string;
  color: string;
  value: string;
  label: string;
}) {
  return (
    <div
      style={{
        background: T.surface,
        padding: "14px 16px",
        borderRadius: T.radiusSm,
        boxShadow: "0 1px 4px rgba(0,0,0,.04)",
        display: "flex",
        alignItems: "center",
        gap: 14,
        border: `1px solid ${T.border}`,
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: T.radiusSm,
          background: tint,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 17,
            fontWeight: 800,
            color: T.text,
            lineHeight: 1.1,
          }}
        >
          {value}
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: T.textMuted }}>
          {label}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        style={{
          display: "block",
          fontSize: 12,
          fontWeight: 800,
          color: T.text,
          marginBottom: 6,
        }}
      >
        {label}
      </label>
      {children}
    </div>
  );
}

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
      }}
    >
      <span>{label}</span>
      {children}
    </div>
  );
}

function SettingsRow({
  icon,
  iconColor,
  iconBg,
  title,
  sub,
  action,
}: {
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
  title: string;
  sub: string;
  action: React.ReactNode;
}) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: T.radiusSm,
        background: T.bg,
        border: `1px solid ${T.border}`,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <div
          style={{
            width: 42,
            height: 42,
            borderRadius: T.radiusSm,
            background: iconBg,
            color: iconColor,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <div>
          <h4
            style={{
              fontSize: 14,
              fontWeight: 800,
              margin: 0,
              color: T.text,
            }}
          >
            {title}
          </h4>
          <p
            style={{
              fontSize: 12,
              color: T.textMuted,
              margin: "2px 0 0",
            }}
          >
            {sub}
          </p>
        </div>
      </div>
      {action}
    </div>
  );
}

function HelpCard({
  icon,
  iconColor,
  iconBg,
  title,
  desc,
  actionLabel,
  actionColor,
  onAction,
  href,
}: {
  icon: React.ReactNode;
  iconColor: string;
  iconBg: string;
  title: string;
  desc: string;
  actionLabel: string;
  actionColor: string;
  onAction?: () => void;
  href?: string;
}) {
  const actionNode = href ? (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        marginTop: 8,
        color: actionColor,
        fontSize: 13,
        fontWeight: 800,
        textDecoration: "none",
      }}
    >
      {actionLabel}
    </a>
  ) : (
    <button
      type="button"
      onClick={onAction}
      style={{
        marginTop: 8,
        background: "transparent",
        border: "none",
        color: actionColor,
        fontSize: 13,
        fontWeight: 800,
        cursor: "pointer",
        padding: 0,
        fontFamily: "inherit",
        textAlign: "left",
      }}
    >
      {actionLabel}
    </button>
  );

  return (
    <div
      style={{
        padding: 18,
        borderRadius: T.radiusSm,
        background: T.bg,
        border: `1px solid ${T.border}`,
        display: "flex",
        flexDirection: "column",
        gap: 8,
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: T.radiusSm,
          background: iconBg,
          color: iconColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {icon}
      </div>
      <h4
        style={{
          fontSize: 15,
          fontWeight: 800,
          margin: "4px 0 0",
          color: T.text,
        }}
      >
        {title}
      </h4>
      <p
        style={{
          fontSize: 13,
          color: T.textMuted,
          margin: 0,
          lineHeight: 1.55,
        }}
      >
        {desc}
      </p>
      {actionNode}
    </div>
  );
}

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fafafa" }}>
          <div style={{ width: 40, height: 40, border: "3px solid #ff5532", borderTopColor: "transparent", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        </div>
      }
    >
      <ProfileContent />
    </Suspense>
  );
}