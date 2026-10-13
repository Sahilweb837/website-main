"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/context";
import { LMS_COURSES } from "@/data/lms-courses";
import { DEFAULT_ENROLLMENTS, DEFAULT_LESSONS } from "@/data/lms-data";
import { getProgressPercent, readCourseProgress } from "@/lib/lms-progress";
import {
  ArrowLeft, BadgeCheck, Camera, Trash2, Edit, X, Save,
  User as UserIcon, Award, Settings, LifeBuoy, Shield,
  BookOpen, Clock, Flame, Trophy, School, LayoutDashboard,
  Share2, Download, Copy, Lock, KeyRound, LogOut,
  MessageCircle, Headphones, CheckCircle2,
  Sparkles, Radio, PlayCircle,
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

function ProfileContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "profile";

  const { user, isAuthenticated, isAuthLoaded, enrolledCourses, updateUser, logout } = useAuth();

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
  const [learningPreferences, setLearningPreferences] = useState({
    classReminders: true,
    assignmentReminders: true,
    communityUpdates: false,
  });
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);
  const [preferencesError, setPreferencesError] = useState("");
  const [courseProgress, setCourseProgress] = useState<Record<string, number>>({});
  const [certificateMessage, setCertificateMessage] = useState("");
  const [learningMode, setLearningMode] = useState<"live" | "buy_online">("live");
  const [programmingLanguage, setProgrammingLanguage] = useState<string>("Python");
  const [registeredLiveClasses, setRegisteredLiveClasses] = useState<string[]>([]);
  const [autoEnrolledCourses, setAutoEnrolledCourses] = useState<{ slug: string; title: string; track?: string }[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("student_learning_mode") as "live" | "buy_online" | null;
      if (savedMode) setLearningMode(savedMode);

      const savedLang = localStorage.getItem("student_programming_language");
      if (savedLang) setProgrammingLanguage(savedLang);

      try {
        const live = JSON.parse(localStorage.getItem("lms_registered_live_classes") || "[]");
        setRegisteredLiveClasses(Array.isArray(live) ? live : []);
      } catch {}

      try {
        const auto = JSON.parse(localStorage.getItem("student_auto_enrolled_courses") || "[]");
        setAutoEnrolledCourses(Array.isArray(auto) ? auto : []);
      } catch {}
    }
  }, []);

  const handleSwitchMode = (mode: "live" | "buy_online") => {
    setLearningMode(mode);
    if (typeof window !== "undefined") {
      localStorage.setItem("student_learning_mode", mode);
    }
  };

  const handleSwitchLanguage = (lang: string) => {
    setProgrammingLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("student_programming_language", lang);
    }
  };

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

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab === "settings" || tab === "help" || tab === "certificates" || tab === "profile") {
      setActiveTab(tab);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!user) {
      setCourseProgress({});
      return;
    }
    const userEnrollments = DEFAULT_ENROLLMENTS.filter((enrollment) => enrollment.userId === user.id);
    const slugs = Array.from(new Set([...enrolledCourses, ...userEnrollments.map((enrollment) => enrollment.courseSlug)]));
    const progress = Object.fromEntries(slugs.map((slug) => {
      const course = LMS_COURSES.find((item) => item.slug === slug);
      const seeded = userEnrollments.find((enrollment) => enrollment.courseSlug === slug);
      const totalLessons = course?.syllabus?.reduce((count, module) => count + module.lessons.length, 0)
        || DEFAULT_LESSONS[slug]?.length
        || seeded?.course?.syllabus?.length
        || 0;
      const saved = readCourseProgress(user.id, slug);
      const percent = saved
        ? getProgressPercent(saved.completedLessons, totalLessons)
        : seeded?.progress ?? 0;
      return [slug, percent];
    }));
    setCourseProgress(progress);
  }, [enrolledCourses, user]);

  useEffect(() => {
    if (!user) return;
    try {
      const stored = localStorage.getItem(`lms_preferences_${user.id}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setLearningPreferences((current) => ({
          ...current,
          classReminders: parsed.classReminders ?? current.classReminders,
          assignmentReminders: parsed.assignmentReminders ?? current.assignmentReminders,
          communityUpdates: parsed.communityUpdates ?? current.communityUpdates,
        }));
      }
    } catch (error) {
      console.error("Unable to load student learning preferences.", error);
      setPreferencesError("We couldn’t load your saved preferences. You can still update them in this session.");
    } finally {
      setPreferencesLoaded(true);
    }
  }, [user]);

  const updateLearningPreference = (
    preference: keyof typeof learningPreferences,
    enabled: boolean,
  ) => {
    if (!user) return;
    const updated = { ...learningPreferences, [preference]: enabled };
    setLearningPreferences(updated);
    try {
      localStorage.setItem(`lms_preferences_${user.id}`, JSON.stringify(updated));
      setPreferencesError("");
    } catch (error) {
      console.error("Unable to save student learning preferences.", error);
      setPreferencesError("Your browser couldn’t save this preference. Please check available storage and try again.");
    }
  };

  const selectTab = (tab: typeof activeTab) => {
    setActiveTab(tab);
    router.replace(tab === "profile" ? "/lms/profile" : `/lms/profile?tab=${tab}`, {
      scroll: false,
    });
  };

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

  const studentEnrollments = DEFAULT_ENROLLMENTS.filter((enrollment) => enrollment.userId === user?.id);
  const autoEnrolledSlugs = autoEnrolledCourses.map((c) => c.slug);
  const certificateRecords = Array.from(new Set([
    ...enrolledCourses,
    ...autoEnrolledSlugs,
    ...studentEnrollments.map((enrollment) => enrollment.courseSlug),
  ])).map((slug) => {
    const course = LMS_COURSES.find((item) => item.slug === slug);
    const seeded = studentEnrollments.find((enrollment) => enrollment.courseSlug === slug);
    const progress = courseProgress[slug] ?? 0;
    return {
      id: `LOCAL-${slug}`,
      slug,
      title: course?.title ?? seeded?.course?.title ?? slug,
      grade: `${progress}% complete`,
      skills: (course?.tools ?? seeded?.course?.tools ?? []).slice(0, 4),
      status: progress === 100 ? "Completed · local preview" : "In progress",
      progress,
    };
  });
  const completedCertificates = certificateRecords.filter((certificate) => certificate.progress === 100);

  const downloadCertificate = (certificate: (typeof certificateRecords)[number]) => {
    const escapeXml = (value: string) => value.replace(/[<>&'"]/g, (character) => ({
      "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;",
    } as Record<string, string>)[character] ?? character);
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="840" viewBox="0 0 1200 840"><rect width="1200" height="840" fill="#fffaf8"/><rect x="35" y="35" width="1130" height="770" rx="28" fill="none" stroke="#ff5532" stroke-width="4"/><text x="600" y="190" text-anchor="middle" fill="#ff5532" font-family="Arial,sans-serif" font-size="30" font-weight="700">NETCODER TECHNOLOGY</text><text x="600" y="300" text-anchor="middle" fill="#172033" font-family="Arial,sans-serif" font-size="48" font-weight="700">Course Completion Preview</text><text x="600" y="395" text-anchor="middle" fill="#637083" font-family="Arial,sans-serif" font-size="24">Completion recorded on this device for</text><text x="600" y="465" text-anchor="middle" fill="#172033" font-family="Arial,sans-serif" font-size="38" font-weight="700">${escapeXml(user?.name ?? "Student")}</text><text x="600" y="540" text-anchor="middle" fill="#637083" font-family="Arial,sans-serif" font-size="22">Course</text><text x="600" y="600" text-anchor="middle" fill="#172033" font-family="Arial,sans-serif" font-size="28" font-weight="700">${escapeXml(certificate.title)}</text><text x="600" y="700" text-anchor="middle" fill="#637083" font-family="Arial,sans-serif" font-size="16">Local milestone ID: ${escapeXml(certificate.id)} · Not an issued or verified credential</text></svg>`;
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${certificate.slug}-certificate.svg`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const shareTranscript = async () => {
    if (!completedCertificates.length) {
      setCertificateMessage("Complete a course to earn and share your first certificate.");
      return;
    }
    try {
      await navigator.clipboard.writeText(
        completedCertificates.map(({ title, id }) => `${title} — ${id}`).join("\n"),
      );
      setCertificateMessage("Your earned certificate details have been copied.");
    } catch (error) {
      console.error("Unable to copy the certificate transcript.", error);
      setCertificateMessage("Clipboard access is unavailable. Please copy your certificate ID from its card.");
    }
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
        label: `Certificates & Milestones (${certificateRecords.length})`,
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
            href="/lms/courses"
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
              Student learning profile
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
              <BookOpen size={14} color={T.primary} />
              Course progress and certificates
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
                Netcoder Technology • Student
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
                <BadgeCheck size={14} /> Student ID: {user?.id ?? "—"}
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
              Your courses, progress, and certificates in one place.
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
            value={`${certificateRecords.length}`}
            label="Enrolled Courses"
          />
          <MiniStat
            icon={<Clock size={20} />}
            tint={T.successSoft}
            color={T.success}
            value="—"
            label="Study Hours Tracked"
          />
          <MiniStat
            icon={<Flame size={20} />}
            tint={T.warningSoft}
            color={T.warning}
            value="—"
            label="Learning Streak"
          />
          <MiniStat
            icon={<Trophy size={20} />}
            tint={T.primarySoft}
            color={T.primary}
            value={`${completedCertificates.length}`}
            label="Certificates Earned"
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
                onClick={() => selectTab(tab.key)}
                className="pf-tab"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "12px 16px",
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
              {/* ─── TAILORED LEARNING TRACK & LIVE BATCH CARD ─── */}
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
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Accent ribbon */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 4,
                    background:
                      learningMode === "live"
                        ? "linear-gradient(90deg, #ff5532, #ff8a65)"
                        : "linear-gradient(90deg, #0284c7, #38bdf8)",
                  }}
                />

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
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
                    <Sparkles size={18} color={T.primary} />
                    Tailored Learning Track
                  </h3>
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      padding: "3px 8px",
                      borderRadius: 99,
                      background: learningMode === "live" ? "#fee2e2" : "#e0f2fe",
                      color: learningMode === "live" ? "#dc2626" : "#0369a1",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {learningMode === "live" ? (
                      <>
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "#dc2626",
                          }}
                        />
                        Live Interactive
                      </>
                    ) : (
                      <>
                        <PlayCircle size={10} />
                        On-Demand Course
                      </>
                    )}
                  </span>
                </div>

                {/* Track Mode Switcher (Live vs Buy Online) */}
                <div>
                  <div
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: T.textMuted,
                      marginBottom: 8,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Learning Mode
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 8,
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleSwitchMode("live")}
                      style={{
                        padding: "10px 12px",
                        borderRadius: T.radiusSm,
                        border:
                          learningMode === "live"
                            ? `2px solid ${T.primary}`
                            : `1px solid ${T.border}`,
                        background:
                          learningMode === "live" ? T.primarySoft : T.bg,
                        color:
                          learningMode === "live" ? T.primary : T.textMuted,
                        fontWeight: 700,
                        fontSize: 12,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        justifyContent: "center",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <Radio
                        size={14}
                        color={learningMode === "live" ? T.primary : T.textMuted}
                      />
                      Live Classes
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSwitchMode("buy_online")}
                      style={{
                        padding: "10px 12px",
                        borderRadius: T.radiusSm,
                        border:
                          learningMode === "buy_online"
                            ? "2px solid #0284c7"
                            : `1px solid ${T.border}`,
                        background:
                          learningMode === "buy_online" ? "#f0f9ff" : T.bg,
                        color:
                          learningMode === "buy_online"
                            ? "#0284c7"
                            : T.textMuted,
                        fontWeight: 700,
                        fontSize: 12,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        justifyContent: "center",
                        transition: "all 0.15s ease",
                      }}
                    >
                      <PlayCircle
                        size={14}
                        color={
                          learningMode === "buy_online"
                            ? "#0284c7"
                            : T.textMuted
                        }
                      />
                      Online Course
                    </button>
                  </div>
                </div>

                {/* Programming Language Preference */}
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: T.textMuted,
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Selected Language
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: T.primary,
                      }}
                    >
                      {programmingLanguage}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {[
                      { name: "Python", icon: "🐍" },
                      { name: "JavaScript", icon: "⚡" },
                      { name: "Java", icon: "☕" },
                      { name: "C++", icon: "⚙️" },
                      { name: "PHP", icon: "🐘" },
                      { name: "Go", icon: "🔷" },
                    ].map((lang) => {
                      const isActive =
                        programmingLanguage.toLowerCase() ===
                        lang.name.toLowerCase();
                      return (
                        <button
                          key={lang.name}
                          type="button"
                          onClick={() => handleSwitchLanguage(lang.name)}
                          style={{
                            padding: "6px 10px",
                            borderRadius: 8,
                            border: isActive
                              ? `1.5px solid ${T.primary}`
                              : `1px solid ${T.border}`,
                            background: isActive ? T.primarySoft : "#ffffff",
                            color: isActive ? T.primary : T.text,
                            fontSize: 12,
                            fontWeight: isActive ? 800 : 600,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                            transition: "all 0.15s ease",
                          }}
                        >
                          <span>{lang.icon}</span>
                          <span>{lang.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Learning Mode Specific Card */}
                {learningMode === "live" ? (
                  <div
                    style={{
                      padding: 16,
                      borderRadius: T.radiusSm,
                      background:
                        "linear-gradient(135deg, #fff5f2 0%, #fff0ea 100%)",
                      border: "1px solid #ffd8cf",
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
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          color: "#c2410c",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        Active Live Cohort
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#15803d",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 4,
                        }}
                      >
                        <span
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            background: "#15803d",
                          }}
                        />
                        Daily 8:00 PM IST
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
                      1-on-1 Interactive {programmingLanguage} Masterclass
                    </div>

                    <div style={{ fontSize: 12, color: T.textMuted }}>
                      Real-time live debugging, cohort mentor reviews & Zoom/Meet link active.
                    </div>

                    <Link
                      href="/lms/courses?tab=live"
                      className="pf-btn-hover"
                      style={{
                        marginTop: 4,
                        width: "100%",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        height: 40,
                        borderRadius: T.radiusSm,
                        background: T.primary,
                        color: "#fff",
                        fontSize: 13,
                        fontWeight: 700,
                        textDecoration: "none",
                        boxShadow: "0 4px 12px rgba(255, 85, 50, 0.25)",
                      }}
                    >
                      <Radio size={15} /> Join Live Classroom Now
                    </Link>
                  </div>
                ) : (
                  <div
                    style={{
                      padding: 16,
                      borderRadius: T.radiusSm,
                      background:
                        "linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)",
                      border: "1px solid #bae6fd",
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
                      }}
                    >
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          color: "#0369a1",
                          textTransform: "uppercase",
                          letterSpacing: "0.05em",
                        }}
                      >
                        On-Demand Video Track
                      </span>
                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: "#0284c7",
                        }}
                      >
                        Full HD 1080p
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
                      Complete {programmingLanguage} Self-Paced Video Curriculum
                    </div>

                    <div style={{ fontSize: 12, color: T.textMuted }}>
                      Curated video lectures, cloud code sandboxes, and lifetime updates.
                    </div>

                    <Link
                      href="/lms/courses"
                      className="pf-btn-hover"
                      style={{
                        marginTop: 4,
                        width: "100%",
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 8,
                        height: 40,
                        borderRadius: T.radiusSm,
                        background: "#0284c7",
                        color: "#fff",
                        fontSize: 13,
                        fontWeight: 700,
                        textDecoration: "none",
                        boxShadow: "0 4px 12px rgba(2, 132, 199, 0.25)",
                      }}
                    >
                      <PlayCircle size={15} /> Browse & Watch Online Courses
                    </Link>
                  </div>
                )}

                {/* Auto-Enrolled Courses section */}
                {autoEnrolledCourses.length > 0 && (
                  <div
                    style={{
                      borderTop: `1px solid ${T.border}`,
                      paddingTop: 12,
                      display: "flex",
                      flexDirection: "column",
                      gap: 8,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 11,
                        fontWeight: 800,
                        color: T.textMuted,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                      }}
                    >
                      Auto-Enrolled in Your Profile ({autoEnrolledCourses.length})
                    </div>
                    {autoEnrolledCourses.map((c, i) => (
                      <div
                        key={c.slug || i}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          padding: "8px 10px",
                          borderRadius: 8,
                          background: T.bg,
                          border: `1px solid ${T.border}`,
                          fontSize: 12,
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                            minWidth: 0,
                            flex: 1,
                          }}
                        >
                          <CheckCircle2 size={14} color="#16a34a" />
                          <span
                            style={{
                              fontWeight: 700,
                              color: T.text,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {c.title || c.slug}
                          </span>
                        </div>
                        <Link
                          href={`/lms/courses/${c.slug}`}
                          style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: T.primary,
                            textDecoration: "none",
                            marginLeft: 8,
                            flexShrink: 0,
                          }}
                        >
                          View →
                        </Link>
                      </div>
                    ))}
                  </div>
                )}
              </div>

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
                  href="/lms/courses"
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
                  Certificates & course milestones
                </h2>
                <p
                  style={{
                    fontSize: 13,
                    color: T.textMuted,
                    margin: "4px 0 0",
                  }}
                >
                  Progress is saved on this device. Completion downloads are previews until the course issuing service is connected.
                </p>
              </div>
              <button
                type="button"
                onClick={shareTranscript}
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
              {certificateMessage && (
                <p role="status" style={{ width: "100%", margin: 0, color: T.textMuted, fontSize: 12 }}>
                  {certificateMessage}
                </p>
              )}
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
                gap: 20,
              }}
            >
              {certificateRecords.length === 0 && (
                <div style={{ gridColumn: "1 / -1", padding: 28, border: `1px solid ${T.border}`, borderRadius: T.radius, background: T.surface, textAlign: "center" }}>
                  <BookOpen size={28} color={T.primary} />
                  <h3 style={{ margin: "12px 0 6px", color: T.text }}>Your first milestone starts with a course</h3>
                  <p style={{ margin: "0 0 16px", color: T.textMuted, fontSize: 13 }}>Explore the catalog and enroll to see course progress and milestones here.</p>
                  <Link href="/lms/catalog" style={{ color: T.primary, fontWeight: 700, textDecoration: "none" }}>Explore courses <ArrowLeft size={14} style={{ transform: "rotate(180deg)", verticalAlign: "middle" }} /></Link>
                </div>
              )}
              {certificateRecords.map((cert) => (
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
                          background: cert.progress === 100 ? T.successSoft : T.primarySoft,
                          color: cert.progress === 100 ? T.success : T.primaryDeep,
                          fontSize: 10,
                          fontWeight: 800,
                          textTransform: "uppercase",
                          letterSpacing: ".05em",
                        }}
                      >
                        {cert.progress === 100 ? <CheckCircle2 size={12} style={{ verticalAlign: "middle" }} /> : <Lock size={11} style={{ verticalAlign: "middle" }} />} {cert.status}
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
                      <span>{cert.progress === 100 ? "Course completed" : "Progress"}: {cert.progress}%</span>
                      <span>•</span>
                      <span style={{ color: cert.progress === 100 ? T.success : T.textMuted, fontWeight: 700 }}>
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
                    {cert.progress === 100 ? (
                      <>
                        <button type="button" onClick={() => downloadCertificate(cert)} className="pf-btn-hover" style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, height: 40, borderRadius: T.radiusSm, background: T.primary, color: "#fff", border: "none", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                          <Download size={15} /> Download certificate preview
                        </button>
                        <button type="button" onClick={async () => {
                          try {
                            await navigator.clipboard.writeText(cert.id);
                            setCertificateMessage("Certificate ID copied.");
                          } catch (error) {
                            console.error("Unable to copy the certificate ID.", error);
                            setCertificateMessage("Clipboard access is unavailable.");
                          }
                        }} style={{ height: 40, padding: "0 16px", borderRadius: T.radiusSm, background: T.surface, color: T.text, border: `1px solid ${T.border}`, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "inline-flex", alignItems: "center", gap: 6 }}>
                          <Copy size={14} /> Copy ID
                        </button>
                      </>
                    ) : (
                      <Link href={`/lms/courses/${cert.slug}`} style={{ flex: 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 6, height: 40, borderRadius: T.radiusSm, background: T.primarySoft, color: T.primaryDeep, textDecoration: "none", fontSize: 13, fontWeight: 700 }}>
                        <BookOpen size={15} /> Continue course
                      </Link>
                    )}
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
                Manage your learning reminders and account access.
              </p>
            </div>

            <SettingsRow
              icon={<Lock size={20} />}
              iconColor={T.success}
              iconBg={T.successSoft}
              title="DRM Zero-Leak Device Certificate"
              sub="Your course sessions are protected on this browser."
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
              title="Sign-in account"
              sub={user?.email || user?.phone || "Your student sign-in account"}
              action={
                <a
                  href={`mailto:hello@netcoder.in?subject=${encodeURIComponent("Help with my student account")}`}
                  style={{
                    height: 36,
                    padding: "0 16px",
                    borderRadius: T.radiusSm,
                    background: T.bg,
                    color: T.text,
                    border: `1px solid ${T.border}`,
                    fontSize: 12,
                    fontWeight: 700,
                    fontFamily: "inherit",
                    display: "inline-flex",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                >
                  Contact support
                </a>
              }
            />

            <div
              style={{
                padding: 16,
                borderRadius: T.radiusSm,
                background: T.bg,
                border: `1px solid ${T.border}`,
                display: "flex",
                flexDirection: "column",
                gap: 16,
              }}
            >
              <div>
                <h3 style={{ margin: 0, color: T.text, fontSize: 14, fontWeight: 800 }}>
                  Learning reminders
                </h3>
                <p style={{ margin: "4px 0 0", color: T.textMuted, fontSize: 12 }}>
                  Choose which updates you want to see in your learning hub.
                </p>
              </div>
              {preferencesLoaded && (
                <>
                  <SettingsToggle
                    label="Live class reminders"
                    description="Keep upcoming mentor sessions on your radar."
                    checked={learningPreferences.classReminders}
                    onChange={(enabled) => updateLearningPreference("classReminders", enabled)}
                  />
                  <SettingsToggle
                    label="Assignment reminders"
                    description="Get a nudge when a course task is coming up."
                    checked={learningPreferences.assignmentReminders}
                    onChange={(enabled) => updateLearningPreference("assignmentReminders", enabled)}
                  />
                  <SettingsToggle
                    label="Community updates"
                    description="Hear about discussions and study groups."
                    checked={learningPreferences.communityUpdates}
                    onChange={(enabled) => updateLearningPreference("communityUpdates", enabled)}
                  />
                </>
              )}
              {preferencesError && (
                <p role="alert" style={{ margin: 0, color: T.danger, fontSize: 12 }}>
                  {preferencesError}
                </p>
              )}
            </div>

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
                padding: 18,
                borderRadius: 14,
                border: `1px solid ${T.border}`,
                background: "#fafafa",
              }}
            >
              <h3 style={{ margin: "0 0 12px", fontSize: 14, fontWeight: 800, color: T.text }}>
                Quick guide to your learning dashboard
              </h3>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 12 }}>
                {[
                  {
                    title: "Courses and progress",
                    detail: "Open My Courses to continue lessons, review your learning progress, and explore available learning tracks.",
                  },
                  {
                    title: "Live masterclasses",
                    detail: "Find upcoming sessions, join a class from its session card, and open the details page for its agenda.",
                  },
                  {
                    title: "Attendance and streak",
                    detail: "Use the attendance card in the sidebar to mark today. The weekly row reflects your recorded activity.",
                  },
                ].map((item) => (
                  <div key={item.title} style={{ padding: 13, borderRadius: 11, background: "#fff", border: `1px solid ${T.border}` }}>
                    <div style={{ marginBottom: 5, color: T.text, fontSize: 12, fontWeight: 800 }}>{item.title}</div>
                    <p style={{ margin: 0, color: T.textMuted, fontSize: 11.5, lineHeight: 1.55 }}>{item.detail}</p>
                  </div>
                ))}
              </div>
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

function SettingsToggle({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
      <div>
        <div style={{ color: T.text, fontSize: 12, fontWeight: 700 }}>{label}</div>
        <div style={{ marginTop: 3, color: T.textMuted, fontSize: 11 }}>{description}</div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        style={{
          width: 44,
          height: 25,
          flex: "0 0 auto",
          padding: 3,
          border: "none",
          borderRadius: 99,
          background: checked ? T.primary : "#cbd0d9",
          cursor: "pointer",
          transition: "background .18s ease",
        }}
      >
        <span
          style={{
            display: "block",
            width: 19,
            height: 19,
            borderRadius: "50%",
            background: "#fff",
            boxShadow: "0 1px 3px rgba(0,0,0,.2)",
            transform: checked ? "translateX(19px)" : "translateX(0)",
            transition: "transform .18s ease",
          }}
        />
      </button>
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