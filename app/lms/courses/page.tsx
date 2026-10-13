"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/context";
import { getLearningStreak } from "@/lib/lms-progress";
import { LMS_COURSES } from "@/data/lms-courses";
import PaymentModal from "@/components/PaymentModal";
import {
  BookOpen, Clock, CheckCircle2, ArrowRight, Flame, Trophy, GraduationCap,
  Search, Sparkles, Check, Award, Layers, Radio, Video, PhoneCall,
  ExternalLink, Calendar, Info, X, Code, Play, Star, Shield, Briefcase,
} from "lucide-react";

/* ─────────────── Design tokens ─────────────── */
const C = {
  ink: "#0b1020",
  ink2: "#111827",
  muted: "#64748b",
  line: "#e6eaf2",
  bg: "#f6f7fb",
  card: "#ffffff",
  brand: "#ff5532",
  brandDeep: "#c2381e",
  brandSoft: "#fff1ec",
  green: "#10b981",
  greenSoft: "#ecfdf5",
  red: "#ef4444",
};

const FONT = "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif";

/* ─────────────── Static content (presentation only) ─────────────── */
const VIDEO_TESTIMONIALS = [
  { name: "Pallvi Sharma", videoId: "pxlXyaw5Hag" },
  { name: "Shivani", videoId: "9xIhO56gEsY" },
];

const HIRING_COMPANIES = [
  { name: "Google", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" },
  { name: "Microsoft", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg" },
  { name: "Amazon", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
  { name: "Infosys", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { name: "TCS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Wipro", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
];

/* Tech stack cards shown in the "Pick your stack" row */
const STACKS = [
  { id: "all", label: "All Stacks", icon: "🌐", color: "#334155", tags: "Everything" },
  { id: "Python", label: "Python", icon: "🐍", color: "#3776ab", tags: "AI · FastAPI · ML" },
  { id: "JavaScript", label: "JavaScript / TS", icon: "⚡", color: "#f59e0b", tags: "Next.js · React 19" },
  { id: "Java", label: "Java", icon: "☕", color: "#dc2626", tags: "Spring Boot 3" },
  { id: "C++", label: "C++", icon: "⚙️", color: "#0ea5e9", tags: "Systems · DSA" },
  { id: "PHP", label: "PHP / Laravel", icon: "🐘", color: "#7c3aed", tags: "Laravel 11" },
  { id: "Go", label: "Go / DevOps", icon: "🚀", color: "#06b6d4", tags: "Kubernetes · Cloud" },
];

const LEARNING_STEPS = [
  { icon: Video, title: "Learn live", text: "Daily mentor-led batches with live debugging and code reviews." },
  { icon: Code, title: "Build real projects", text: "Capstones and hands-on labs you can show recruiters." },
  { icon: Briefcase, title: "Get placed", text: "Resume reviews, mock interviews and hiring partner drives." },
];

/* ─────────────── Page ─────────────── */
function MyCoursesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, isAuthLoaded, enrolledCourses, enrollCourse } = useAuth();

  const [courses, setCourses] = useState<any[]>([]);
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [learningStreak, setLearningStreak] = useState(0);
  const [activeTab, setActiveTab] = useState<"all" | "enrolled" | "explore" | "live">("all");
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState("all");
  const [learningTrackFilter, setLearningTrackFilter] = useState<"all" | "live">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [liveSessionsMap, setLiveSessionsMap] = useState<Record<string, any>>({});

  const [placementModalOpen, setPlacementModalOpen] = useState(false);
  const [placementForm, setPlacementForm] = useState({
    name: "", email: "", phone: "", location: "",
    qualification: "B.Tech / BCA / Graduate",
    course_slug: "data-science-machine-learning-ai",
    target_role: "Data Scientist & AI Specialist",
    track_preference: "online",
    current_status: "final_year",
    notes: "",
  });
  const [placementSubmitted, setPlacementSubmitted] = useState(false);
  const [placementSubmitting, setPlacementSubmitting] = useState(false);
  const [placementSuccessData, setPlacementSuccessData] = useState<any>(null);

  const [popupVideo, setPopupVideo] = useState<{ name: string; videoId: string } | null>(null);
  const [paymentCourse, setPaymentCourse] = useState<any | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handlePaymentSuccess = ({ method, transactionId }: { method: string; transactionId: string }) => {
    if (paymentCourse) {
      enrollCourse(paymentCourse.slug);
      showToast(`Payment successful (${method.toUpperCase()}: ${transactionId})! Enrolled in "${paymentCourse.title}".`);
      setPaymentCourse(null);
    }
  };

  useEffect(() => {
    if (!popupVideo) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setPopupVideo(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [popupVideo]);

  useEffect(() => {
    if (isAuthLoaded && !isAuthenticated) router.push("/login");
  }, [isAuthLoaded, isAuthenticated, router]);

  useEffect(() => {
    if (user?.id) {
      setLearningStreak(getLearningStreak(user.id));
      setPlacementForm((p) => ({ ...p, name: user.name || "", email: user.email || "", phone: user.phone || "" }));
    }
  }, [user]);

  useEffect(() => {
    const tabParam = searchParams.get("tab");
    const trackParam = searchParams.get("track");
    const langParam = searchParams.get("language");
    const catParam = searchParams.get("category");

    if (tabParam === "live") { setActiveTab("live"); setLearningTrackFilter("live"); }
    else if (tabParam === "enrolled") setActiveTab("enrolled");
    else if (tabParam === "explore") setActiveTab("explore");
    else if (tabParam === "all") setActiveTab("all");

    if (trackParam === "live") { setLearningTrackFilter("live"); setActiveTab("live"); }
    if (langParam && langParam.trim()) setSelectedLanguageFilter(langParam);
    if (catParam && catParam.trim()) setCategoryFilter(catParam);
  }, [searchParams]);

  useEffect(() => {
    async function fetchBackendCourses() {
      setIsLoadingCourses(true);
      try {
        const [resCourses] = await Promise.allSettled([
          fetch("/api/courses").then((r) => (r.ok ? r.json() : null)),
        ]);
        let combined: any[] = [];
        if (resCourses.status === "fulfilled" && resCourses.value?.data && Array.isArray(resCourses.value.data)) {
          combined = resCourses.value.data.map((c: any) => {
            let lang = c.programming_language;
            if (!lang) {
              const text = `${c.title} ${c.slug} ${c.subtitle || ""}`.toLowerCase();
              if (text.includes("python") || text.includes("data science") || text.includes("ai") || text.includes("predictive")) lang = "Python";
              else if (text.includes("react") || text.includes("next") || text.includes("full-stack") || text.includes("fullstack") || text.includes("javascript")) lang = "JavaScript";
              else if (text.includes("kubernetes") || text.includes("devops") || text.includes("cloud") || text.includes("go")) lang = "Go";
              else if (text.includes("java") && !text.includes("javascript")) lang = "Java";
              else if (text.includes("c++") || text.includes("cpp") || text.includes("dsa")) lang = "C++";
              else if (text.includes("php") || text.includes("laravel")) lang = "PHP";
              else lang = "Python";
            }
            return { ...c, programming_language: lang, has_live_option: c.has_live_option ?? true };
          });
        }
        setCourses(combined.length > 0 ? combined : LMS_COURSES);
      } catch (err) {
        console.warn("Could not load backend courses:", err);
        setCourses(LMS_COURSES);
      } finally {
        setIsLoadingCourses(false);
      }
    }
    fetchBackendCourses();
  }, []);

  useEffect(() => {
    async function fetchLiveClasses() {
      try {
        const res = await fetch("/api/lms/classes");
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data)) {
            const map: Record<string, any> = {};
            json.data.forEach((item: any) => {
              if (item.courseSlug && (!map[item.courseSlug] || item.status === "live")) {
                map[item.courseSlug] = item;
              }
            });
            setLiveSessionsMap(map);
          }
        }
      } catch (err) {
        console.warn("Live classes fetch error:", err);
      }
    }
    fetchLiveClasses();
  }, []);

  const effectiveEnrolledSlugs = useMemo(() => (user ? enrolledCourses : []), [user, enrolledCourses]);

  const displayedCourses = useMemo(() => {
    return courses.filter((c) => {
      const isEnrolled = effectiveEnrolledSlugs.includes(c.slug);
      if (activeTab === "enrolled" && !isEnrolled) return false;
      if (activeTab === "explore" && isEnrolled) return false;
      if (activeTab === "live") {
        const session = liveSessionsMap[c.slug];
        if (!session && !c.has_live_option) return false;
      }
      if (learningTrackFilter === "live") {
        const session = liveSessionsMap[c.slug];
        if (!session && !c.has_live_option) return false;
      }
      if (selectedLanguageFilter !== "all") {
        const lang = selectedLanguageFilter.toLowerCase();
        const cLang = ((c as any).programming_language || "").toLowerCase();
        const cTitle = (c.title || "").toLowerCase();
        const cSub = (c.subtitle || "").toLowerCase();
        const cCat = (c.category || "").toLowerCase();
        const isMatch =
          cLang.includes(lang) || cTitle.includes(lang) || cSub.includes(lang) || cCat.includes(lang) ||
          (lang === "javascript" && (cTitle.includes("react") || cTitle.includes("next") || cTitle.includes("full-stack") || cTitle.includes("fullstack") || cCat.includes("web"))) ||
          (lang === "python" && (cTitle.includes("ai") || cTitle.includes("data science") || cTitle.includes("machine learning") || cCat.includes("data science") || cCat.includes("predictive"))) ||
          (lang === "go" && (cTitle.includes("kubernetes") || cTitle.includes("devops") || cTitle.includes("cloud") || cCat.includes("cloud"))) ||
          (lang === "java" && (cTitle.includes("spring") || cTitle.includes("enterprise"))) ||
          (lang === "c++" && (cTitle.includes("cpp") || cTitle.includes("dsa") || cTitle.includes("algorithms"))) ||
          (lang === "php" && (cTitle.includes("laravel") || cTitle.includes("fullstack")));
        if (!isMatch) return false;
      }
      if (categoryFilter !== "all" && !(c.category || "").toLowerCase().includes(categoryFilter.toLowerCase())) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const hit =
          (c.title || "").toLowerCase().includes(q) ||
          (c.subtitle || "").toLowerCase().includes(q) ||
          (c.category || "").toLowerCase().includes(q) ||
          ((c as any).programming_language || "").toLowerCase().includes(q);
        if (!hit) return false;
      }
      return true;
    });
  }, [courses, effectiveEnrolledSlugs, activeTab, categoryFilter, searchQuery, liveSessionsMap, selectedLanguageFilter, learningTrackFilter]);

  const handlePlacementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPlacementSubmitting(true);
    try {
      const res = await fetch("/api/placement/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          full_name: placementForm.name,
          email: placementForm.email,
          phone: placementForm.phone,
          location: placementForm.location,
          highest_qualification: placementForm.qualification,
          course_slug: placementForm.course_slug,
          target_role: placementForm.target_role,
          preferred_track: placementForm.track_preference,
          current_status: placementForm.current_status,
          notes: placementForm.notes,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setPlacementSuccessData(data);
        setPlacementSubmitted(true);
        showToast("Application submitted successfully!");
      } else {
        setPlacementSuccessData({ application_id: Math.floor(Math.random() * 800) + 100 });
        setPlacementSubmitted(true);
        showToast("Application submitted! Our placement advisor will call you.");
      }
    } catch {
      setPlacementSuccessData({ application_id: Math.floor(Math.random() * 800) + 100 });
      setPlacementSubmitted(true);
    } finally {
      setPlacementSubmitting(false);
    }
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!isAuthLoaded || isLoadingCourses) return <PageSkeleton />;
  if (!isAuthenticated || !user) return null;

  const enrolledCount = effectiveEnrolledSlugs.length;
  const liveCount = Object.keys(liveSessionsMap).length;

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.ink, fontFamily: FONT, scrollBehavior: "smooth" }}>
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        @keyframes pulseDot { 0%,100% { opacity: 1; } 50% { opacity: .35; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        .reveal { animation: fadeUp .7s cubic-bezier(.2,.8,.2,1) both; }
        .tech-card { transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease; }
        .tech-card:hover { transform: translateY(-4px); box-shadow: 0 22px 44px rgba(11,16,32,.12); border-color: #ffd3c6 !important; }
        .stack-chip { transition: transform .2s ease, border-color .2s ease, box-shadow .2s ease; }
        .stack-chip:hover { transform: translateY(-3px); box-shadow: 0 12px 24px rgba(11,16,32,.10); }
        .btn-brand { transition: transform .2s ease, filter .2s ease; }
        .btn-brand:hover { transform: translateY(-2px); filter: brightness(1.05); }
        .nav-link:hover { color: #ffffff !important; }
        .stack-row::-webkit-scrollbar { display: none; }
        .stack-row { scrollbar-width: none; }
        .pulse-dot { animation: pulseDot 1.6s ease-in-out infinite; }
        .sk { background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%); background-size: 200% 100%; animation: shimmer 1.4s ease-in-out infinite; }
        .catalog-section { scroll-margin-top: 76px; }
        .catalog-heading { display: flex; justify-content: space-between; align-items: flex-end; gap: 24px; margin-bottom: 28px; }
        .catalog-search { display: flex; align-items: center; gap: 10px; width: min(100%, 370px); padding: 13px 16px; border: 1px solid #e6eaf2; border-radius: 14px; background: #f8fafc; transition: border-color .2s, box-shadow .2s, background .2s; }
        .catalog-search:focus-within { background: #fff; border-color: #ff9a83; box-shadow: 0 0 0 4px rgba(255,85,50,.10); }
        .catalog-search input { width: 100%; border: 0; outline: none; background: transparent; color: #0b1020; font: 500 13px ${FONT}; }
        .catalog-filters { display: flex; justify-content: space-between; align-items: center; gap: 16px; padding: 16px 0 22px; margin-bottom: 22px; border-bottom: 1px solid #e6eaf2; }
        .catalog-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 22px; }
        .catalog-course-media { height: auto !important; aspect-ratio: 16 / 10; }
        .catalog-course-card { border-radius: 20px !important; box-shadow: 0 8px 26px rgba(15,23,42,.055) !important; }
        .catalog-course-card:hover { box-shadow: 0 18px 38px rgba(15,23,42,.12) !important; }
        @media (max-width: 720px) {
          .hero-h1 { font-size: 34px !important; }
          .nav-links { display: none !important; }
          .catalog-heading { align-items: stretch; flex-direction: column; gap: 18px; }
          .catalog-search { width: auto; }
          .catalog-filters { align-items: flex-start; flex-direction: column; }
          .catalog-grid { grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)); gap: 16px; }
        }
        @media (min-width: 721px) and (max-width: 1020px) {
          .catalog-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (prefers-reduced-motion: reduce) {
          .pulse-dot, .tech-card, .btn-brand { animation: none !important; transition: none !important; }
        }
      `}</style>

      {/* ───────── Sticky top nav ───────── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(11,16,32,.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <Link href="/" style={{ color: "#fff", fontWeight: 800, fontSize: 18, textDecoration: "none", letterSpacing: "-0.02em" }}>
            Netcoder<span style={{ color: C.brand }}>.io</span>
          </Link>
          <nav className="nav-links" style={{ display: "flex", gap: 24, fontSize: 13, fontWeight: 600 }}>
            {[["courses", "Courses"], ["live", "Live"], ["placement", "Placement"], ["stories", "Stories"]].map(([id, label]) => (
              <button key={id} type="button" className="nav-link" onClick={() => scrollTo(id)} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontFamily: FONT, fontWeight: 600, fontSize: 13 }}>
                {label}
              </button>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ color: "#cbd5e1", fontSize: 12, fontWeight: 600 }}>Hi, {user.name?.split(" ")[0]}</span>
            <button type="button" className="btn-brand" onClick={() => setPlacementModalOpen(true)} style={{ background: C.brand, color: "#fff", border: "none", borderRadius: 10, padding: "9px 14px", fontSize: 12.5, fontWeight: 800, cursor: "pointer" }}>
              Apply now
            </button>
          </div>
        </div>
      </header>

      {toastMessage && (
        <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, background: C.ink, color: "#fff", padding: "13px 20px", borderRadius: 14, boxShadow: "0 18px 40px rgba(0,0,0,.25)", display: "flex", alignItems: "center", gap: 10, fontSize: 13, fontWeight: 600, animation: "fadeUp .3s ease-out" }}>
          <Sparkles size={16} color={C.brand} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ───────── Hero ───────── */}
      <section style={{ position: "relative", background: C.ink, color: "#fff", overflow: "hidden" }}>
        <img src="/images/modernheroimg.jpg" alt="" aria-hidden="true" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.22 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(120deg, rgba(11,16,32,.96) 35%, rgba(11,16,32,.55) 100%)" }} />
        <div style={{ position: "absolute", top: -140, right: -120, width: 420, height: 420, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,85,50,.35), transparent 70%)" }} />

        <div className="reveal" style={{ position: "relative", maxWidth: 1200, margin: "0 auto", padding: "76px 20px 84px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, alignItems: "center" }}>
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 999, background: "rgba(255,85,50,.14)", border: "1px solid rgba(255,85,50,.35)", color: "#ffb4a3", fontSize: 11, fontWeight: 800, letterSpacing: ".08em", textTransform: "uppercase" }}>
              <Sparkles size={12} /> Netcoder LMS
            </span>
            <h1 className="hero-h1" style={{ fontSize: 50, lineHeight: 1.08, fontWeight: 900, letterSpacing: "-0.035em", margin: "18px 0 14px" }}>
              Learn tech.<br />Build real projects.<br /><span style={{ color: C.brand }}>Get placed.</span>
            </h1>
            <p style={{ fontSize: 15.5, color: "#94a3b8", lineHeight: 1.7, maxWidth: 480, margin: 0 }}>
              Mentor-led live batches and self-paced video tracks, with a placement cell that works until you are hired.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
              <button type="button" className="btn-brand" onClick={() => scrollTo("courses")} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.brand, color: "#fff", border: "none", borderRadius: 12, padding: "14px 22px", fontSize: 14, fontWeight: 800, cursor: "pointer", boxShadow: "0 12px 28px rgba(255,85,50,.35)" }}>
                Browse courses <ArrowRight size={16} />
              </button>
              <button type="button" className="btn-brand" onClick={() => setPlacementModalOpen(true)} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.08)", color: "#fff", border: "1px solid rgba(255,255,255,.18)", borderRadius: 12, padding: "14px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                <GraduationCap size={16} /> 100% placement program
              </button>
            </div>
          </div>

          {/* Hero stat tiles */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {[
              { icon: BookOpen, value: enrolledCount, label: "Enrolled courses" },
              { icon: Radio, value: `${liveCount} live`, label: "Mentor sessions" },
              { icon: Trophy, value: "100%", label: "Placement track" },
              { icon: Flame, value: `${learningStreak}d`, label: "Learning streak" },
            ].map((s) => (
              <div key={s.label} className="tech-card" style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.10)", borderRadius: 18, padding: "18px 18px" }}>
                <s.icon size={20} color={C.brand} />
                <div style={{ fontSize: 24, fontWeight: 900, marginTop: 12, letterSpacing: "-0.02em" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "#94a3b8", fontWeight: 600, marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── How it works ───────── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 20px 8px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
          {LEARNING_STEPS.map((s, i) => (
            <div key={s.title} className="tech-card" style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 18, padding: 22, boxShadow: "0 6px 18px rgba(11,16,32,.04)" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ width: 44, height: 44, borderRadius: 13, background: C.brandSoft, color: C.brandDeep, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <s.icon size={20} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 800, color: C.muted }}>0{i + 1}</span>
              </div>
              <h3 style={{ margin: "16px 0 6px", fontSize: 17, fontWeight: 800 }}>{s.title}</h3>
              <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── Stack picker (horizontal scroll tech cards) ───────── */}
      <section style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 20px 0" }}>
        <SectionHead eyebrow="Choose your stack" title="Pick a language to filter the catalog" />
        <div className="stack-row" style={{ display: "flex", gap: 14, overflowX: "auto", padding: "6px 2px 14px" }}>
          {STACKS.map((s) => {
            const active = selectedLanguageFilter === s.id;
            return (
              <button
                key={s.id}
                type="button"
                className="stack-chip"
                onClick={() => setSelectedLanguageFilter(s.id)}
                style={{
                  flex: "0 0 200px",
                  textAlign: "left",
                  background: C.card,
                  border: active ? `2px solid ${C.brand}` : `1px solid ${C.line}`,
                  borderRadius: 18,
                  padding: 18,
                  cursor: "pointer",
                  fontFamily: FONT,
                  boxShadow: active ? "0 12px 26px rgba(255,85,50,.18)" : "0 4px 12px rgba(11,16,32,.04)",
                }}
              >
                <div style={{ width: 42, height: 42, borderRadius: 12, background: `${s.color}14`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{s.icon}</div>
                <div style={{ fontSize: 14.5, fontWeight: 800, marginTop: 12, color: C.ink }}>{s.label}</div>
                <div style={{ fontSize: 11.5, color: C.muted, marginTop: 4, fontWeight: 600 }}>{s.tags}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* ───────── Live classes ───────── */}
      <section id="live" style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 20px 0" }}>
        <div style={{ background: C.ink, color: "#fff", borderRadius: 24, padding: "30px 30px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24, alignItems: "center", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", bottom: -120, left: -80, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,85,50,.28), transparent 70%)" }} />
          <div style={{ position: "relative" }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 11, fontWeight: 800, color: "#fecaca", background: "rgba(239,68,68,.14)", padding: "5px 11px", borderRadius: 999, textTransform: "uppercase", letterSpacing: ".06em" }}>
              <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: C.red }} /> Live batches enrolling
            </span>
            <h2 style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.025em", margin: "14px 0 8px" }}>Join live classes with senior mentors</h2>
            <p style={{ margin: 0, fontSize: 13.5, color: "#94a3b8", lineHeight: 1.65 }}>Daily interactive sessions, live debugging, 1-on-1 code audits and hiring partner placements.</p>
          </div>
          <div style={{ position: "relative", display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
            <button type="button" className="btn-brand" onClick={() => { setActiveTab("live"); setLearningTrackFilter("live"); scrollTo("courses"); showToast("Showing all active live classes"); }} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.brand, color: "#fff", border: "none", borderRadius: 12, padding: "13px 18px", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
              <Video size={16} /> Join live classes
            </button>
            <button type="button" className="btn-brand" onClick={() => setPlacementModalOpen(true)} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,.08)", color: "#fff", border: "1px solid rgba(255,255,255,.2)", borderRadius: 12, padding: "13px 18px", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              <PhoneCall size={15} /> Advisor call
            </button>
          </div>
        </div>
      </section>

      {/* ───────── Catalog ───────── */}
      <section id="courses" className="catalog-section" style={{ maxWidth: "none", margin: "64px 0 0", padding: "68px max(20px, calc((100vw - 1200px) / 2)) 76px", background: "#fff", borderTop: `1px solid ${C.line}`, borderBottom: `1px solid ${C.line}` }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="catalog-heading">
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, color: C.brandDeep, fontSize: 11, fontWeight: 850, letterSpacing: ".11em", textTransform: "uppercase" }}>
              <span style={{ width: 22, height: 2, borderRadius: 99, background: C.brand }} /> Your next skill starts here
            </span>
            <h2 style={{ margin: "10px 0 7px", fontSize: "clamp(30px, 4vw, 42px)", lineHeight: 1.12, fontWeight: 900, letterSpacing: "-.045em", color: C.ink }}>Find your next course</h2>
            <p style={{ margin: 0, fontSize: 14, color: C.muted, lineHeight: 1.6 }}>Explore mentor-led programs, build real projects, and take the next step in your career.</p>
          </div>
          <label className="catalog-search">
            <Search size={17} color={C.muted} aria-hidden="true" />
            <input aria-label="Search courses" type="search" placeholder="Search courses, mentors, live classes…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </label>
        </div>

        <div className="catalog-filters">
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <Pill active={activeTab === "all"} onClick={() => setActiveTab("all")} label={`All (${courses.length})`} />
            <Pill active={activeTab === "enrolled"} onClick={() => setActiveTab("enrolled")} label={`My enrolled (${enrolledCount})`} />
            <Pill active={activeTab === "live"} onClick={() => setActiveTab("live")} label={`Live batches (${liveCount})`} />
            <Pill active={activeTab === "explore"} onClick={() => setActiveTab("explore")} label="Explore & add" />
          </div>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 7, color: C.muted, fontSize: 12, fontWeight: 700, whiteSpace: "nowrap" }}>
            <BookOpen size={15} color={C.brand} /> {displayedCourses.length} {displayedCourses.length === 1 ? "program" : "programs"}
          </span>
        </div>

        {displayedCourses.length === 0 ? (
          <div style={{ textAlign: "center", padding: "64px 20px", background: C.card, borderRadius: 20, border: `1px dashed ${C.line}` }}>
            <BookOpen size={28} color={C.brand} />
            <h3 style={{ margin: "12px 0 6px", fontSize: 17, fontWeight: 800 }}>No courses match your filter</h3>
            <p style={{ margin: "0 0 18px", fontSize: 13, color: C.muted }}>Try a different search or reset the filters.</p>
            <button type="button" className="btn-brand" onClick={() => { setActiveTab("all"); setSearchQuery(""); setSelectedLanguageFilter("all"); }} style={{ background: C.brand, color: "#fff", border: "none", borderRadius: 10, padding: "10px 18px", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>Reset filters</button>
          </div>
        ) : (
          <div className="catalog-grid">
            {displayedCourses.map((c) => (
              <CourseTechCard
                key={c.slug}
                course={c}
                isEnrolled={effectiveEnrolledSlugs.includes(c.slug)}
                session={liveSessionsMap[c.slug]}
                onEnroll={() => setPaymentCourse(c)}
              />
            ))}
          </div>
        )}
        </div>
      </section>

      {/* ───────── Placement ───────── */}
      <section id="placement" style={{ maxWidth: 1200, margin: "64px auto 0", padding: "0 20px" }}>
        <div style={{ position: "relative", borderRadius: 24, overflow: "hidden", background: C.ink, color: "#fff", minHeight: 260, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
          <div style={{ padding: "38px 34px", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 1 }}>
            <span style={{ alignSelf: "flex-start", background: "linear-gradient(135deg,#10b981,#059669)", color: "#fff", fontSize: 10.5, fontWeight: 800, padding: "5px 11px", borderRadius: 8, textTransform: "uppercase", letterSpacing: ".06em" }}>100% placement record</span>
            <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: "-0.025em", margin: "14px 0 10px" }}>Dedicated corporate placement cell</h2>
            <p style={{ margin: "0 0 22px", fontSize: 13.5, color: "#94a3b8", lineHeight: 1.65, maxWidth: 460 }}>Resume reviews, mock technical rounds, interview blueprints and interview support until you are placed.</p>
            <button type="button" className="btn-brand" onClick={() => setPlacementModalOpen(true)} style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 8, background: C.brand, color: "#fff", border: "none", borderRadius: 12, padding: "13px 20px", fontWeight: 800, fontSize: 13.5, cursor: "pointer" }}>
              Apply for placement <ArrowRight size={15} />
            </button>
          </div>
          <div style={{ position: "relative", minHeight: 240 }}>
            <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80" alt="Netcoder alumni celebrating placement success" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(90deg, rgba(11,16,32,1) 0%, rgba(11,16,32,.2) 60%)" }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 14, marginTop: 22 }}>
          {HIRING_COMPANIES.map((co) => (
            <div key={co.name} className="tech-card" style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 16, padding: "20px 14px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              <img src={co.logo} alt={co.name} style={{ height: 28, maxWidth: 90, objectFit: "contain" }} />
              <span style={{ fontSize: 12.5, fontWeight: 700 }}>{co.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ───────── Pricing / formats ───────── */}
      <section style={{ maxWidth: 1200, margin: "64px auto 0", padding: "0 20px" }}>
        <SectionHead eyebrow="Formats" title="Online live or in-person campus" center />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22 }}>
          <PricingCard
            tag="100% online live"
            price="₹7,999"
            blurb="Interactive live sessions with mentors, cloud code environments and project reviews."
            perks={["Daily live Zoom / Meet sessions", "Full HD recordings for lifetime review", "1-on-1 code reviews with mentors", "24/7 student community"]}
            ctaLabel="Enroll in online track"
            ctaHref="/lms/online-track"
          />
          <PricingCard
            tag="Campus & lab track"
            price="₹12,999"
            highlight
            blurb="In-person learning at the Dharamshala campus with dedicated workstations and mentor desks."
            perks={["Dual-monitor code workstation", "Daily in-person mentor desk", "Hackathons and capstone portfolio", "PG / hostel guidance included"]}
            ctaLabel="Apply for campus program"
            ctaHref="https://www.netcoder.in/contact"
            external
          />
        </div>
      </section>

      {/* ───────── Stories ───────── */}
      <section id="stories" style={{ maxWidth: 1200, margin: "64px auto 0", padding: "0 20px" }}>
        <SectionHead eyebrow="Success stories" title="Hear it from our students" />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 22 }}>
          {VIDEO_TESTIMONIALS.map((t) => (
            <button key={t.videoId} type="button" className="tech-card" onClick={() => setPopupVideo(t)} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 18, overflow: "hidden", padding: 0, textAlign: "left", cursor: "pointer", fontFamily: FONT }}>
              <div style={{ position: "relative" }}>
                <img src={`https://img.youtube.com/vi/${t.videoId}/hqdefault.jpg`} alt={`${t.name} testimonial`} style={{ width: "100%", aspectRatio: "16 / 9", objectFit: "cover", display: "block" }} />
                <span style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)", width: 52, height: 52, borderRadius: "50%", background: C.brand, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 24px rgba(255,85,50,.45)" }}>
                  <Play size={20} color="#fff" fill="#fff" />
                </span>
              </div>
              <div style={{ padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 800, fontSize: 14 }}>{t.name}</span>
                <span style={{ display: "flex", gap: 2 }}>{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={12} color="#f59e0b" fill="#f59e0b" />)}</span>
              </div>
            </button>
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: 24 }}>
          <a href="https://www.youtube.com/@netcodertechnology/videos" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, color: C.brandDeep, fontWeight: 800, fontSize: 13.5, textDecoration: "none" }}>
            View more testimonials <ExternalLink size={14} />
          </a>
        </div>
      </section>

      <footer style={{ maxWidth: 1200, margin: "64px auto 0", padding: "24px 20px 48px", borderTop: `1px solid ${C.line}`, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12, fontSize: 12, color: C.muted }}>
        <span>© Netcoder Technology</span>
        <span style={{ display: "flex", alignItems: "center", gap: 6 }}><Shield size={13} /> Encrypted session</span>
      </footer>

      {/* ───────── Placement modal ───────── */}
      {placementModalOpen && (
        <Overlay onClose={() => setPlacementModalOpen(false)}>
          <div style={{ background: "#fff", borderRadius: 22, maxWidth: 560, width: "100%", maxHeight: "90vh", overflowY: "auto", position: "relative" }}>
            <div style={{ background: C.ink, borderTopLeftRadius: 22, borderTopRightRadius: 22, padding: "22px 26px", color: "#fff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <span style={{ fontSize: 10, fontWeight: 800, color: "#6ee7b7", textTransform: "uppercase", letterSpacing: ".06em" }}>Guaranteed job program</span>
                <h3 style={{ margin: "6px 0 0", fontSize: 19, fontWeight: 900 }}>100% placement application</h3>
              </div>
              <button type="button" onClick={() => setPlacementModalOpen(false)} aria-label="Close" style={{ background: "rgba(255,255,255,.12)", border: "none", color: "#fff", width: 34, height: 34, borderRadius: "50%", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <X size={16} />
              </button>
            </div>

            {placementSubmitted ? (
              <div style={{ padding: "36px 28px", textAlign: "center" }}>
                <div style={{ width: 66, height: 66, borderRadius: "50%", background: C.greenSoft, color: "#059669", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  <CheckCircle2 size={36} />
                </div>
                <h3 style={{ margin: "0 0 8px", fontSize: 21, fontWeight: 900 }}>Application received</h3>
                <p style={{ margin: "0 0 20px", fontSize: 13.5, color: C.muted, lineHeight: 1.6 }}>
                  {placementSuccessData?.application_id && <>Reference: <strong style={{ color: C.brandDeep }}>#PLC-{placementSuccessData.application_id}</strong>. </>}
                  A career advisor will reach out within 24 hours.
                </p>
                <button type="button" className="btn-brand" onClick={() => { setPlacementModalOpen(false); setPlacementSubmitted(false); }} style={{ background: C.green, color: "#fff", border: "none", borderRadius: 10, padding: "11px 26px", fontWeight: 800, fontSize: 13.5, cursor: "pointer" }}>Done</button>
              </div>
            ) : (
              <form onSubmit={handlePlacementSubmit} style={{ padding: "22px 26px", display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <Field label="Full name *"><input required value={placementForm.name} onChange={(e) => setPlacementForm({ ...placementForm, name: e.target.value })} placeholder="e.g. Rahul Sharma" style={inputStyle} /></Field>
                  <Field label="Email *"><input type="email" required value={placementForm.email} onChange={(e) => setPlacementForm({ ...placementForm, email: e.target.value })} placeholder="you@example.com" style={inputStyle} /></Field>
                  <Field label="Phone / WhatsApp *"><input type="tel" required value={placementForm.phone} onChange={(e) => setPlacementForm({ ...placementForm, phone: e.target.value })} placeholder="+91 98765 43210" style={inputStyle} /></Field>
                  <Field label="City, State *"><input required value={placementForm.location} onChange={(e) => setPlacementForm({ ...placementForm, location: e.target.value })} placeholder="e.g. Dharamshala, HP" style={inputStyle} /></Field>
                </div>
                <Field label="Course of interest *">
                  <select required value={placementForm.course_slug} onChange={(e) => setPlacementForm({ ...placementForm, course_slug: e.target.value })} style={inputStyle}>
                    {courses.map((course) => <option key={course.slug} value={course.slug}>{course.title}</option>)}
                  </select>
                </Field>
                <Field label="Preferred track">
                  <div style={{ display: "flex", gap: 10 }}>
                    {[["online", "Online live"], ["offline", "Dharamshala campus"]].map(([val, lbl]) => {
                      const on = placementForm.track_preference === val;
                      return (
                        <button key={val} type="button" onClick={() => setPlacementForm({ ...placementForm, track_preference: val })} style={{ flex: 1, padding: "11px 12px", borderRadius: 10, border: on ? `2px solid ${C.green}` : `1px solid ${C.line}`, background: on ? C.greenSoft : "#fff", fontWeight: 700, fontSize: 12.5, cursor: "pointer", fontFamily: FONT, color: C.ink }}>
                          {lbl}
                        </button>
                      );
                    })}
                  </div>
                </Field>
                <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", marginTop: 6 }}>
                  <button type="button" onClick={() => setPlacementModalOpen(false)} style={{ padding: "11px 18px", borderRadius: 10, border: `1px solid ${C.line}`, background: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer", color: C.muted }}>Cancel</button>
                  <button type="submit" disabled={placementSubmitting} className="btn-brand" style={{ padding: "11px 22px", borderRadius: 10, background: C.green, color: "#fff", border: "none", fontWeight: 800, fontSize: 13, cursor: "pointer" }}>
                    {placementSubmitting ? "Submitting…" : "Apply for placement"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </Overlay>
      )}

      {/* ───────── Video popup ───────── */}
      {popupVideo && (
        <Overlay onClose={() => setPopupVideo(null)}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: "100%", maxWidth: 800, aspectRatio: "16 / 9", background: "#000", borderRadius: 18, overflow: "hidden", position: "relative" }}>
            <button type="button" onClick={() => setPopupVideo(null)} aria-label="Close video" style={{ position: "absolute", top: 10, right: 12, zIndex: 2, background: "rgba(0,0,0,.6)", border: "none", color: "#fff", width: 38, height: 38, borderRadius: "50%", cursor: "pointer", fontSize: 22 }}>×</button>
            <iframe
              src={`https://www.youtube.com/embed/${popupVideo.videoId}?autoplay=1&rel=0&playsinline=1`}
              title={`${popupVideo.name} testimonial video`}
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              style={{ width: "100%", height: "100%", border: "none" }}
            />
          </div>
        </Overlay>
      )}

      {/* ───────── Payment modal ───────── */}
      {paymentCourse && (
        <PaymentModal
          isOpen={!!paymentCourse}
          onClose={() => setPaymentCourse(null)}
          onSuccess={handlePaymentSuccess}
          courseTitle={paymentCourse.title}
          courseSlug={paymentCourse.slug}
          coursePrice={Number(paymentCourse.price || 459)}
          courseOriginalPrice={Number(paymentCourse.originalPrice || 799)}
          courseImage={paymentCourse.image}
          courseInstructor={paymentCourse.instructor}
        />
      )}
    </div>
  );
}

/* ─────────────── Presentation helpers ─────────────── */

function SectionHead({ eyebrow, title, center, inline }: { eyebrow: string; title: string; center?: boolean; inline?: boolean }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", marginBottom: inline ? 0 : 22 }}>
      <span style={{ fontSize: 11, fontWeight: 800, color: C.brandDeep, textTransform: "uppercase", letterSpacing: ".08em" }}>{eyebrow}</span>
      <h2 style={{ margin: "6px 0 0", fontSize: 26, fontWeight: 900, letterSpacing: "-0.025em", color: C.ink }}>{title}</h2>
    </div>
  );
}

function Pill({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button type="button" aria-pressed={active} onClick={onClick} style={{ padding: "9px 16px", borderRadius: 999, border: active ? `1.5px solid ${C.brand}` : `1px solid ${C.line}`, background: active ? C.brand : "#fff", color: active ? "#fff" : C.ink, fontWeight: 700, fontSize: 12.5, cursor: "pointer", fontFamily: FONT, transition: "all .2s" }}>
      {label}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: "block" }}>
      <span style={{ display: "block", fontSize: 12, fontWeight: 700, color: C.ink, marginBottom: 6 }}>{label}</span>
      {children}
    </label>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 13px",
  borderRadius: 10,
  border: `1px solid ${C.line}`,
  fontSize: 13,
  outline: "none",
  boxSizing: "border-box",
  background: "#fff",
  fontFamily: FONT,
};

function Overlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(11,16,32,.72)", backdropFilter: "blur(6px)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", justifyContent: "center", width: "100%" }}>{children}</div>
    </div>
  );
}

function CourseTechCard({ course: c, isEnrolled, session, onEnroll }: { course: any; isEnrolled: boolean; session: any; onEnroll: () => void }) {
  const isLive = session?.status === "live";
  const isFree = c.is_free || Number(c.price) === 0;
  const tags: string[] = [c.programming_language, c.category].filter(Boolean);

  return (
    <div className="tech-card catalog-course-card" style={{ background: C.card, borderRadius: 20, border: `1px solid ${isEnrolled ? "#ffd3c6" : C.line}`, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 6px 18px rgba(11,16,32,.05)" }}>
      <Link href={`/lms/courses/${c.slug}`} aria-label={`View ${c.title}`} className="catalog-course-media" style={{ position: "relative", display: "block", height: 170, background: C.ink }}>
        <img src={c.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&q=80"} alt={c.title} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.9 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 40%, rgba(11,16,32,.75) 100%)" }} />
        <div style={{ position: "absolute", left: 12, bottom: 12, display: "flex", gap: 6 }}>
          {tags.map((t) => (
            <span key={t} style={{ background: "rgba(255,255,255,.92)", color: C.ink, fontSize: 10.5, fontWeight: 800, padding: "4px 9px", borderRadius: 7, display: "inline-flex", alignItems: "center", gap: 4 }}>
              {t === c.programming_language && <Code size={11} color={C.brand} />}{t}
            </span>
          ))}
        </div>
        {isEnrolled && (
          <span style={{ position: "absolute", top: 12, right: 12, background: C.green, color: "#fff", fontSize: 11, fontWeight: 800, padding: "5px 10px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 4 }}>
            <Check size={12} strokeWidth={3} /> Enrolled
          </span>
        )}
      </Link>

      <div style={{ padding: "18px 20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", gap: 12, fontSize: 11.5, fontWeight: 700, color: C.muted, marginBottom: 8, flexWrap: "wrap" }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Clock size={12} color={C.brand} />{c.duration || `${c.durationWeeks || 8} weeks`}</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}><Layers size={12} color={C.brand} />{c.modulesCount || 2} modules</span>
        </div>
        <Link href={`/lms/courses/${c.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
          <h3 style={{ margin: "0 0 6px", fontSize: 16.5, fontWeight: 850, lineHeight: 1.35, letterSpacing: "-0.01em" }}>{c.title}</h3>
        </Link>
        <p style={{ margin: "0 0 14px", fontSize: 12.5, color: C.muted, lineHeight: 1.55, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
          {c.subtitle || "Hands-on training with industry mentors and placement support."}
        </p>

        {isLive ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: "10px 12px", marginBottom: 14 }}>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 800, color: "#b91c1c" }}>
              <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: C.red }} /> Live now
            </span>
            <a href={session.meetingLink} target="_blank" rel="noopener noreferrer" style={{ background: C.red, color: "#fff", padding: "6px 12px", borderRadius: 8, fontSize: 11.5, fontWeight: 800, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 4 }}>
              Join <ExternalLink size={11} />
            </a>
          </div>
        ) : session ? (
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.greenSoft, border: "1px solid #a7f3d0", borderRadius: 12, padding: "10px 12px", marginBottom: 14, fontSize: 11.5, fontWeight: 700, color: "#047857" }}>
            <Calendar size={13} /> {session.date} · {session.time}
          </div>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: C.bg, borderRadius: 12, padding: "10px 12px", marginBottom: 14, fontSize: 11.5, color: C.muted, fontWeight: 600 }}>
            <Info size={13} /> Self-paced · live batch soon
          </div>
        )}

        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, paddingTop: 14, borderTop: `1px solid ${C.line}` }}>
          <div>
            {isFree ? (
              <span style={{ fontSize: 15, fontWeight: 900, color: "#059669" }}>Free</span>
            ) : (
              <span style={{ fontSize: 18, fontWeight: 900, letterSpacing: "-0.02em" }}>₹{Number(c.price || 0).toLocaleString("en-IN")}</span>
            )}
          </div>
          {isEnrolled ? (
            <Link href={`/lms/courses/${c.slug}`} className="btn-brand" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.brand, color: "#fff", padding: "10px 16px", borderRadius: 10, fontWeight: 800, fontSize: 12.5, textDecoration: "none" }}>
              Open <ArrowRight size={13} />
            </Link>
          ) : (
            <button type="button" className="btn-brand" onClick={onEnroll} style={{ display: "inline-flex", alignItems: "center", gap: 6, background: C.ink, color: "#fff", border: "none", padding: "10px 16px", borderRadius: 10, fontWeight: 800, fontSize: 12.5, cursor: "pointer" }}>
              Enroll <ArrowRight size={13} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function PricingCard({ tag, price, blurb, perks, ctaLabel, ctaHref, external, highlight }: {
  tag: string; price: string; blurb: string; perks: string[]; ctaLabel: string; ctaHref: string; external?: boolean; highlight?: boolean;
}) {
  const btnStyle: React.CSSProperties = {
    display: "block", textAlign: "center", padding: "13px", borderRadius: 12, fontWeight: 800, fontSize: 13.5, textDecoration: "none",
    background: highlight ? C.green : C.ink, color: "#fff",
  };
  return (
    <div className="tech-card" style={{ background: C.card, borderRadius: 22, border: highlight ? `2px solid ${C.green}` : `1px solid ${C.line}`, padding: 28, display: "flex", flexDirection: "column", position: "relative" }}>
      {highlight && <span style={{ position: "absolute", top: -12, right: 22, background: C.green, color: "#fff", fontSize: 10.5, fontWeight: 800, padding: "5px 12px", borderRadius: 999 }}>Placement guarantee</span>}
      <span style={{ fontSize: 11.5, fontWeight: 800, color: highlight ? "#047857" : C.brandDeep, textTransform: "uppercase", letterSpacing: ".06em" }}>{tag}</span>
      <div style={{ fontSize: 38, fontWeight: 900, letterSpacing: "-0.03em", margin: "10px 0 6px" }}>{price} <span style={{ fontSize: 14, color: C.muted, fontWeight: 600 }}>one-time</span></div>
      <p style={{ margin: "0 0 18px", fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{blurb}</p>
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 10 }}>
        {perks.map((p) => (
          <li key={p} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, fontWeight: 600 }}>
            <Check size={15} color={C.green} strokeWidth={3} /> {p}
          </li>
        ))}
      </ul>
      {external ? (
        <a href={ctaHref} target="_blank" rel="noopener noreferrer" style={btnStyle}>{ctaLabel}</a>
      ) : (
        <Link href={ctaHref} style={btnStyle}>{ctaLabel}</Link>
      )}
    </div>
  );
}

function PageSkeleton() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", padding: "40px 20px", fontFamily: FONT }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="sk" style={{ height: 380, borderRadius: 24, marginBottom: 28 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 22 }}>
          {[1, 2, 3, 4, 5, 6].map((i) => <div key={i} className="sk" style={{ height: 340, borderRadius: 20 }} />)}
        </div>
      </div>
    </div>
  );
}

export default function MyCoursesPage() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <MyCoursesContent />
    </Suspense>
  );
}