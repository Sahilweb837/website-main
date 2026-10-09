"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth/context";

interface AuthViewProps {
  initialMode?: "login" | "register";
}

function AuthForm({ initialMode = "login" }: AuthViewProps) {
  const searchParams = useSearchParams();
  const {
    user,
    logout,
    loginWithGoogle,
    loginAsDemo,
    loginWithCredentials,
    isLoading,
    enrolledCourses,
    isAuthLoaded,
  } = useAuth();

  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState("Full Stack Web Development");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [showSso, setShowSso] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successText, setSuccessText] = useState<string | null>(null);

  const redirectParam = searchParams.get("redirect") || searchParams.get("return_to");
  const targetRedirect =
    redirectParam || (isAuthLoaded && enrolledCourses.length > 0 ? "/lms/dashboard" : "/lms/select-course");

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 350);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const qMode = searchParams.get("mode");
    if (qMode === "register") setMode("register");
    else if (qMode === "login") setMode("login");
  }, [searchParams]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessText("Authenticating session…");
    try {
      await new Promise((r) => setTimeout(r, 600));
      setSuccessText("Welcome back! Redirecting to course track…");
      await loginWithCredentials({ email, phone }, targetRedirect);
    } catch {
      setIsSubmitting(false);
      setSuccessText(null);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccessText("Creating your workspace…");
    try {
      await new Promise((r) => setTimeout(r, 700));
      setSuccessText("Account created! Selecting specialization track…");
      await loginWithCredentials({ name, email, phone }, targetRedirect);
    } catch {
      setIsSubmitting(false);
      setSuccessText(null);
    }
  };

  if (!mounted) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", fontFamily: "'Sora', sans-serif" }}>
        <style>{`
          .sk-box { background: linear-gradient(90deg,#f0f0f0 25%,#e8e8e8 50%,#f0f0f0 75%); background-size:200% 100%; animation:sk-shimmer 1.4s ease-in-out infinite; border-radius:10px; }
          @keyframes sk-shimmer { 0%{background-position:200% 0} 100%{background-position:-200% 0} }
        `}</style>
        <div style={{ width: "100%", maxWidth: 440, padding: "0 24px" }}>
          <div style={{ display:"flex", gap:6, marginBottom:28 }}><div className="sk-box" style={{flex:1,height:40}}/><div className="sk-box" style={{flex:1,height:40}}/></div>
          <div className="sk-box" style={{height:16,width:"45%",marginBottom:12}}/>
          <div className="sk-box" style={{height:36,width:"70%",marginBottom:10}}/>
          <div className="sk-box" style={{height:14,width:"90%",marginBottom:24}}/>
          <div className="sk-box" style={{height:64,marginBottom:20}}/>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}><div className="sk-box" style={{height:44}}/><div className="sk-box" style={{height:44}}/></div>
          <div className="sk-box" style={{height:44,marginBottom:20}}/>
          <div className="sk-box" style={{height:14,width:"40%",margin:"0 auto 20px"}}/>
          <div className="sk-box" style={{height:46,marginBottom:16}}/>
          <div className="sk-box" style={{height:46,marginBottom:16}}/>
          <div className="sk-box" style={{height:50,marginTop:8}}/>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: "#ffffff", fontFamily: "'Sora', -apple-system, sans-serif" }}>

      {/* ─── LEFT VISUAL PANEL ─── */}
      <div style={{
        position: "relative",
        overflow: "hidden",
        background: "#ff5532",
        flex: "0 0 42%",
      }} className="auth-left-panel">

        {/* Glow orbs */}
        <div style={{
          position: "absolute", top: "-80px", left: "-60px",
          width: "320px", height: "320px",
          borderRadius: "50%", background: "rgba(255,255,255,0.12)",
          filter: "blur(60px)", animation: "pulse-glow 5s ease-in-out infinite alternate"
        }} />
        <div style={{
          position: "absolute", bottom: "40px", right: "-40px",
          width: "380px", height: "380px",
          borderRadius: "50%", background: "rgba(251,191,36,0.18)",
          filter: "blur(70px)", animation: "pulse-glow 6s ease-in-out 2s infinite alternate"
        }} />

        {/* Hero image – fills the full panel */}
        <img
          src="/images/vr-tech-girl-hd.jpg"
          alt="VR Tech Experience at Netcoder"
          onError={(e) => {
            e.currentTarget.src = "https://lh3.googleusercontent.com/aida/AEtjO1Wvn8VsnpZOdBylQ56CoBD4j_t9UuTzaWsacGoKcg7P-Je9hcOBmo7ILNEyduhzdgvjygbJWGDm73GP5GR-bSlgyW9veDpXU8ZqT3eJNrCN_RoDh0CqoQVavOQPl07iZkDgpEEpDWMAEH743StdIcnoDtTVVs_Bp8_khUBw6lRJNz4dJ2DbFsSg_NuqnbXmbrXnWcAaAsWxy1vzCEYcqGfTkTrqiGcKD9GsfFZ7xwt1h_SoBpZDj6n2Bd8";
          }}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            userSelect: "none",
            pointerEvents: "none",
            zIndex: 5,
          }}
        />

        {/* Floating VS Code Badge */}
        <div style={{
          position: "absolute", top: "56px", left: "24px", zIndex: 20,
          animation: "float-1 6s ease-in-out infinite",
          display: "flex", alignItems: "center", gap: "10px",
          padding: "10px 14px", borderRadius: "16px",
          background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.35)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)"
        }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "rgba(0,122,204,0.9)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
              <path d="M17.58 2.01L7.54 10.42 3.1 7.03.87 8.35v7.3l2.23 1.32 4.44-3.39 10.04 8.41 5.55-2.69V4.7zm-2.08 13.9l-6.22-4.91 6.22-4.91v9.82zM4 14.07v-4.14l2.71 2.07zm14-8.08l2.13-1.03v14.08l-2.13-1.03z"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif" }}>VS Code</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.8)", display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "pulse 1.5s ease-in-out infinite" }} />
              v1.98 Linked
            </div>
          </div>
        </div>

        {/* AI Badge */}
        <div style={{
          position: "absolute", top: "72px", right: "24px", zIndex: 20,
          animation: "float-2 7.5s ease-in-out 0.7s infinite",
          display: "flex", alignItems: "center", gap: "10px",
          padding: "10px 14px", borderRadius: "16px",
          background: "rgba(0,0,0,0.25)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.25)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.22)"
        }}>
          <div style={{ width: "34px", height: "34px", borderRadius: "10px", background: "linear-gradient(135deg, #fbbf24, #ff5532, #ec4899)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "18px", color: "#fff", fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif" }}>AI Intelligence</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.8)", marginTop: "2px" }}>Neural Agent 4.5</div>
          </div>
        </div>

        {/* Photoshop Badge */}
        <div style={{
          position: "absolute", top: "50%", left: "16px", transform: "translateY(-32px)", zIndex: 20,
          animation: "float-3 8s ease-in-out 1.4s infinite",
          display: "flex", alignItems: "center", gap: "8px",
          padding: "8px 12px", borderRadius: "14px",
          background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.3)",
          boxShadow: "0 8px 28px rgba(0,0,0,0.18)"
        }}>
          <div style={{ width: "30px", height: "30px", borderRadius: "8px", background: "#001E36", border: "1px solid rgba(49,168,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 900, color: "#31A8FF", fontSize: "12px" }}>Ps</div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif" }}>Photoshop</div>
            <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.75)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Creative Cloud</div>
          </div>
        </div>

        {/* TensorFlow Badge */}
        <div style={{
          position: "absolute", top: "46%", right: "16px", zIndex: 20,
          animation: "float-4 6.8s ease-in-out 2.1s infinite",
          display: "flex", alignItems: "center", gap: "8px",
          padding: "10px 14px", borderRadius: "16px",
          background: "rgba(255,255,255,0.18)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.35)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.18)"
        }}>
          <div style={{ width: "30px", height: "30px", borderRadius: "10px", background: "linear-gradient(135deg, #f59e0b, #ea580c)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "17px", color: "#fff" }}>hub</span>
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", display: "flex", alignItems: "center", gap: "4px" }}>
              TensorFlow <span style={{ fontSize: "9px", background: "rgba(255,255,255,0.25)", borderRadius: "4px", padding: "0 4px", color: "#fff" }}>py</span>
            </div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.8)" }}>Deep Learning Node</div>
          </div>
        </div>

        {/* Spatial Badge */}
        <div style={{
          position: "absolute", bottom: "40px", left: "24px", zIndex: 20,
          animation: "float-5 7.2s ease-in-out 1s infinite",
          display: "flex", alignItems: "center", gap: "10px",
          padding: "10px 16px", borderRadius: "16px",
          background: "rgba(0,0,0,0.30)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.28)",
          boxShadow: "0 12px 32px rgba(0,0,0,0.25)"
        }}>
          <div style={{ width: "30px", height: "30px", borderRadius: "10px", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.38)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "17px", color: "#fff" }}>view_in_ar</span>
          </div>
          <div>
            <div style={{ fontSize: "11px", fontWeight: 700, color: "#fff", letterSpacing: "0.08em", textTransform: "uppercase", fontFamily: "'Space Grotesk', sans-serif" }}>Spatial Node</div>
            <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.75)", display: "flex", alignItems: "center", gap: "4px", marginTop: "2px" }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#ffb95f", display: "inline-block" }} />
              Cluster Sync 99.9%
            </div>
          </div>
        </div>
      </div>

      {/* ─── RIGHT FORM PANEL ─── */}
      <div style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        minHeight: "100vh",
        padding: "20px",
        background: "#fff",
        overflowY: "auto",
      }} className="auth-right-panel">

        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "8px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{
              width: "38px", height: "38px", borderRadius: "10px",
              background: "#ff5532", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 4px 14px rgba(255,85,50,0.35)"
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "#fff", fontVariationSettings: "'FILL' 1" }}>terminal</span>
            </div>
            <span style={{ fontSize: "18px", fontWeight: 800, color: "#111111", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "-0.02em" }}>
              Netcoder<span style={{ color: "#ff5532" }}>.io</span>
            </span>
          </Link>

          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "6px",
              padding: "6px 14px", borderRadius: "999px",
              border: "1px solid #e5e7eb", background: "#f9fafb",
              fontSize: "12px", fontWeight: 500, color: "#575757",
              fontFamily: "'Space Grotesk', sans-serif"
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#22c55e", display: "inline-block", animation: "pulse 2s ease-in-out infinite" }} />
              System Healthy
            </div>
            <Link href="/" style={{ fontSize: "12px", fontWeight: 600, color: "#ff5532", textDecoration: "none", fontFamily: "'Space Grotesk', sans-serif", display: "inline-flex", alignItems: "center", gap: "4px" }}>
              <i className="fa-solid fa-arrow-left" style={{ fontSize: "10px" }}></i> Back to Home
            </Link>
          </div>
        </div>

        {/* Form container */}
        <div style={{ maxWidth: "440px", width: "100%", margin: "0 auto", paddingTop: "16px", paddingBottom: "16px" }}>

          {/* Active Session Card if user is already logged in */}
          {user && isAuthLoaded && (
            <div style={{
              background: "linear-gradient(135deg, #f0fdf4 0%, #ffffff 100%)",
              border: "1.5px solid #86efac",
              borderRadius: "16px",
              padding: "18px 20px",
              marginBottom: "24px",
              boxShadow: "0 4px 15px rgba(34,197,94,0.08)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div style={{
                  width: "42px", height: "42px", borderRadius: "50%",
                  background: "linear-gradient(135deg, #22c55e 0%, #16a34a 100%)",
                  color: "#fff", display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "17px", fontWeight: 700,
                  boxShadow: "0 2px 8px rgba(34,197,94,0.3)"
                }}>
                  {user.name ? user.name[0].toUpperCase() : "U"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#15803d", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Active Student Session
                  </div>
                  <div style={{ fontSize: "15px", fontWeight: 700, color: "#0f172a", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {user.name}
                  </div>
                  <div style={{ fontSize: "12px", color: "#64748b" }}>
                    {user.email || user.phone || "Logged in"}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                <Link
                  href={targetRedirect}
                  style={{
                    flex: "1 1 auto",
                    padding: "9px 14px",
                    background: "#22c55e",
                    color: "#fff",
                    borderRadius: "10px",
                    fontSize: "12.5px",
                    fontWeight: 700,
                    textDecoration: "none",
                    textAlign: "center",
                    boxShadow: "0 2px 8px rgba(34,197,94,0.3)"
                  }}
                >
                  Open LMS Dashboard →
                </Link>
                <Link
                  href="/"
                  style={{
                    padding: "9px 12px",
                    background: "#f1f5f9",
                    color: "#334155",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: 600,
                    textDecoration: "none",
                    textAlign: "center"
                  }}
                >
                  Home Page
                </Link>
                <button
                  type="button"
                  onClick={() => logout()}
                  style={{
                    padding: "9px 12px",
                    background: "#fef2f2",
                    color: "#dc2626",
                    border: "1px solid #fecaca",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* Mode tabs */}
          <div style={{
            display: "flex", padding: "4px", borderRadius: "14px",
            background: "#f3f4f6", marginBottom: "28px",
            border: "1px solid #e5e7eb"
          }}>
            {(["login", "register"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => { setMode(m); setSuccessText(null); }}
                style={{
                  flex: 1, padding: "10px 0",
                  borderRadius: "10px", border: "none",
                  fontSize: "13px", fontWeight: 700,
                  fontFamily: "'Space Grotesk', sans-serif",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: mode === m ? "#fff" : "transparent",
                  color: mode === m ? "#111111" : "#6b7280",
                  boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,0.10)" : "none",
                }}
              >
                {m === "login" ? "Sign In" : "Create Account"}
              </button>
            ))}
          </div>

          {/* Title */}
          <div style={{ marginBottom: "24px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: "6px",
              padding: "4px 12px", borderRadius: "999px",
              background: "rgba(255,85,50,0.08)", border: "1px solid rgba(255,85,50,0.22)",
              fontSize: "11px", fontWeight: 700, color: "#ff5532",
              letterSpacing: "0.07em", textTransform: "uppercase",
              fontFamily: "'Space Grotesk', sans-serif",
              marginBottom: "10px"
            }}>
              <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>shield</span>
              {mode === "login" ? "Authenticate Workspace" : "Student Registration"}
            </div>
            <h1 style={{
              margin: 0, fontSize: "clamp(26px, 4vw, 36px)", fontWeight: 800,
              color: "#111111", letterSpacing: "-0.03em",
              fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.15
            }}>
              {mode === "login" ? "Welcome back" : "Get started free"}
            </h1>
            <p style={{ margin: "8px 0 0", fontSize: "14px", color: "#6b7280", lineHeight: 1.6 }}>
              {mode === "login"
                ? "Sign in to access your Netcoder workspace and LMS dashboard."
                : "Create your student account to access courses and hands-on projects."}
            </p>
          </div>

          {/* Demo card */}
          <div style={{
            marginBottom: "20px", padding: "14px 16px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, rgba(255,85,50,0.07) 0%, rgba(255,115,84,0.02) 100%)",
            border: "1px solid rgba(255,85,50,0.28)",
            display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px"
          }}>
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#ff5532", fontFamily: "'Space Grotesk', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}>⚡ 1-Click Demo</span>
                <span style={{ fontSize: "10px", background: "#dcfce7", color: "#166534", fontWeight: 700, padding: "1px 6px", borderRadius: "5px", fontFamily: "'Space Grotesk', sans-serif" }}>Sahil Sandhu</span>
              </div>
              <p style={{ margin: 0, fontSize: "11px", color: "#6b7280" }}>Full student LMS access — zero credentials needed.</p>
            </div>
            <button
              type="button"
              onClick={() => loginAsDemo(targetRedirect)}
              disabled={isLoading || isSubmitting}
              style={{
                flexShrink: 0, padding: "8px 16px",
                borderRadius: "10px", border: "none",
                background: "#ff5532", color: "#fff",
                fontSize: "12px", fontWeight: 700,
                fontFamily: "'Space Grotesk', sans-serif",
                cursor: "pointer",
                boxShadow: "0 6px 20px rgba(255,85,50,0.38)",
                display: "flex", alignItems: "center", gap: "4px",
                transition: "all 0.2s",
                opacity: isLoading || isSubmitting ? 0.7 : 1,
              }}
            >
              Demo
              <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>arrow_forward</span>
            </button>
          </div>

          {/* OAuth buttons */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "12px" }}>
            {[
              {
                label: "Google", onClick: () => loginWithGoogle(targetRedirect),
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24">
                    <path d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z" fill="#4285F4"/>
                    <path d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z" fill="#34A853"/>
                    <path d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z" fill="#FBBC05"/>
                    <path d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z" fill="#EA4335"/>
                  </svg>
                )
              },
              {
                label: "GitHub", onClick: () => loginAsDemo(targetRedirect),
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/>
                  </svg>
                )
              }
            ].map(({ label, onClick, icon }) => (
              <button
                key={label}
                type="button"
                onClick={onClick}
                disabled={isLoading || isSubmitting}
                style={{
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                  padding: "11px 16px", borderRadius: "12px",
                  border: "1px solid #e5e7eb", background: "#fff",
                  fontSize: "13px", fontWeight: 600,
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "#111111", cursor: "pointer",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
                  transition: "all 0.2s",
                  opacity: isLoading || isSubmitting ? 0.7 : 1,
                }}
              >
                {icon} {label}
              </button>
            ))}
          </div>

          {/* SSO button */}
          <button
            type="button"
            onClick={() => setShowSso(!showSso)}
            style={{
              width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
              padding: "11px 16px", borderRadius: "12px",
              border: "1px solid #e5e7eb", background: "#fff",
              fontSize: "13px", fontWeight: 600, color: "#575757",
              fontFamily: "'Space Grotesk', sans-serif",
              cursor: "pointer", marginBottom: "20px",
              transition: "all 0.2s",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span className="material-symbols-outlined" style={{ fontSize: "16px", color: "#ff5532" }}>domain</span>
              Single Sign-On (SAML / Okta / Azure AD)
            </div>
            <span className="material-symbols-outlined" style={{ fontSize: "14px", color: "#ff5532", transform: showSso ? "rotate(90deg)" : "none", transition: "transform 0.2s" }}>arrow_forward</span>
          </button>

          {showSso && (
            <div style={{
              marginTop: "-16px", marginBottom: "20px",
              padding: "16px", borderRadius: "12px",
              border: "1px solid #e5e7eb", background: "#f9fafb",
              fontSize: "12px", color: "#575757"
            }}>
              <p style={{ margin: "0 0 10px", fontWeight: 700, color: "#111", fontFamily: "'Space Grotesk', sans-serif" }}>Corporate SSO Configuration</p>
              <p style={{ margin: "0 0 10px", lineHeight: 1.6 }}>Enter your company domain to authenticate via Okta, Azure AD, or SAML 2.0.</p>
              <div style={{ display: "flex", gap: "8px" }}>
                <input type="text" placeholder="your-company.com" style={{
                  flex: 1, padding: "8px 12px", borderRadius: "8px",
                  border: "1px solid #e5e7eb", fontSize: "12px",
                  fontFamily: "'Sora', sans-serif", outline: "none"
                }} />
                <button type="button" onClick={() => loginAsDemo(targetRedirect)} style={{
                  padding: "8px 16px", borderRadius: "8px", border: "none",
                  background: "#ff5532", color: "#fff", fontSize: "12px",
                  fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", cursor: "pointer"
                }}>SSO Login</button>
              </div>
            </div>
          )}

          {/* Divider */}
          <div style={{ position: "relative", display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
            <span style={{
              padding: "0 12px", fontSize: "11px", fontWeight: 600,
              color: "#9ca3af", textTransform: "uppercase", letterSpacing: "0.08em",
              fontFamily: "'Space Grotesk', sans-serif", background: "#fff"
            }}>
              {mode === "login" ? "or email" : "or register with email"}
            </span>
            <div style={{ flex: 1, height: "1px", background: "#e5e7eb" }} />
          </div>

          {/* ── SIGN IN FORM ── */}
          {mode === "login" && (
            <form onSubmit={handleLoginSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label htmlFor="email" style={labelStyle}>Work Email</label>
                <div style={{ position: "relative" }}>
                  <span className="material-symbols-outlined" style={inputIconStyle}>alternate_email</span>
                  <input
                    id="email" type="email" required
                    placeholder="dev.alex@company.com"
                    value={email} onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = "#ff5532"; e.target.style.boxShadow = "0 0 0 3px rgba(255,85,50,0.12)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }}
                  />
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <label htmlFor="password" style={{ ...labelStyle, margin: 0 }}>Password</label>
                  <button type="button" onClick={(e) => { e.preventDefault(); alert("Password reset link has been sent to your email."); }} style={{ fontSize: "12px", fontWeight: 600, color: "#ff5532", background: "none", border: "none", cursor: "pointer", fontFamily: "'Space Grotesk', sans-serif" }}>
                    Forgot password?
                  </button>
                </div>
                <div style={{ position: "relative" }}>
                  <span className="material-symbols-outlined" style={inputIconStyle}>lock</span>
                  <input
                    id="password" type={showPassword ? "text" : "password"} required
                    placeholder="••••••••••••"
                    value={password} onChange={(e) => setPassword(e.target.value)}
                    style={{ ...inputStyle, paddingRight: "44px" }}
                    onFocus={(e) => { e.target.style.borderColor = "#ff5532"; e.target.style.boxShadow = "0 0 0 3px rgba(255,85,50,0.12)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }}
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", lineHeight: 1 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                  <input type="checkbox" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} style={{ width: "16px", height: "16px", accentColor: "#ff5532", cursor: "pointer" }} />
                  <span style={{ fontSize: "12px", color: "#6b7280" }}>Remember me 30 days</span>
                </label>
                <div style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "11px", color: "#6b7280", fontFamily: "'Space Grotesk', sans-serif" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "14px", color: "#ff5532" }}>enhanced_encryption</span>
                  Encrypted
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                style={submitBtnStyle}
                onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.background = "#ea4321"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#ff5532"; }}
              >
                <span>{successText || (isSubmitting ? "Authenticating…" : "Sign in to account")}</span>
                {isSubmitting
                  ? <span className="material-symbols-outlined" style={{ fontSize: "18px", animation: "spin 1s linear infinite" }}>progress_activity</span>
                  : <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
                }
              </button>

              <p style={{ textAlign: "center", fontSize: "12px", color: "#6b7280", margin: "4px 0 0" }}>
                Don't have an account?{" "}
                <button type="button" onClick={() => { setMode("register"); setSuccessText(null); }} style={{ color: "#ff5532", fontWeight: 700, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px" }}>
                  Sign up free
                </button>
              </p>
            </form>
          )}

          {/* ── REGISTER FORM ── */}
          {mode === "register" && (
            <form onSubmit={handleRegisterSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label htmlFor="regName" style={labelStyle}>Full Name</label>
                <div style={{ position: "relative" }}>
                  <span className="material-symbols-outlined" style={inputIconStyle}>badge</span>
                  <input id="regName" type="text" required placeholder="e.g. Sahil Sandhu" value={name} onChange={(e) => setName(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = "#ff5532"; e.target.style.boxShadow = "0 0 0 3px rgba(255,85,50,0.12)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }} />
                </div>
              </div>

              <div>
                <label htmlFor="regEmail" style={labelStyle}>Email Address</label>
                <div style={{ position: "relative" }}>
                  <span className="material-symbols-outlined" style={inputIconStyle}>alternate_email</span>
                  <input id="regEmail" type="email" required placeholder="student@netcoder.in" value={email} onChange={(e) => setEmail(e.target.value)}
                    style={inputStyle}
                    onFocus={(e) => { e.target.style.borderColor = "#ff5532"; e.target.style.boxShadow = "0 0 0 3px rgba(255,85,50,0.12)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }} />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "min(100%,180px) 1fr", gap: "12px" }} className="auth-reg-grid">
                <div>
                  <label htmlFor="regPhone" style={labelStyle}>Mobile</label>
                  <div style={{ position: "relative" }}>
                    <span className="material-symbols-outlined" style={inputIconStyle}>call</span>
                    <input id="regPhone" type="tel" required placeholder="+91 98167 32055" value={phone} onChange={(e) => setPhone(e.target.value)}
                      style={inputStyle}
                      onFocus={(e) => { e.target.style.borderColor = "#ff5532"; e.target.style.boxShadow = "0 0 0 3px rgba(255,85,50,0.12)"; }}
                      onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }} />
                  </div>
                </div>
                <div>
                  <label htmlFor="regCourse" style={labelStyle}>Program</label>
                  <select id="regCourse" value={course} onChange={(e) => setCourse(e.target.value)}
                    style={{ ...inputStyle, paddingLeft: "12px", cursor: "pointer" }}>
                    <option value="Full Stack Web Development">Full Stack Web Dev</option>
                    <option value="Python Data Science & AI">Data Science & AI</option>
                    <option value="Cyber Security & Ethical Hacking">Cyber Security</option>
                    <option value="Digital Marketing Mastery">Digital Marketing</option>
                    <option value="UI/UX Product Design">UI/UX Design</option>
                    <option value="Cloud Computing & DevOps">Cloud & DevOps</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="regPassword" style={labelStyle}>Create Password</label>
                <div style={{ position: "relative" }}>
                  <span className="material-symbols-outlined" style={inputIconStyle}>lock</span>
                  <input id="regPassword" type={showPassword ? "text" : "password"} required placeholder="At least 8 characters" value={password} onChange={(e) => setPassword(e.target.value)}
                    style={{ ...inputStyle, paddingRight: "44px" }}
                    onFocus={(e) => { e.target.style.borderColor = "#ff5532"; e.target.style.boxShadow = "0 0 0 3px rgba(255,85,50,0.12)"; }}
                    onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }} />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>{showPassword ? "visibility_off" : "visibility"}</span>
                  </button>
                </div>
              </div>

              <label style={{ display: "flex", alignItems: "flex-start", gap: "8px", cursor: "pointer" }}>
                <input type="checkbox" id="agreeTerms" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} required style={{ width: "16px", height: "16px", marginTop: "2px", accentColor: "#ff5532", cursor: "pointer", flexShrink: 0 }} />
                <span style={{ fontSize: "12px", color: "#6b7280", lineHeight: 1.6 }}>
                  I agree to Netcoder's{" "}
                  <a href="#terms" style={{ color: "#ff5532", fontWeight: 700 }}>Terms of Service</a> and{" "}
                  <a href="#privacy" style={{ color: "#ff5532", fontWeight: 700 }}>Privacy Policy</a>.
                </span>
              </label>

              <button
                type="submit"
                disabled={isSubmitting || isLoading}
                style={submitBtnStyle}
                onMouseEnter={(e) => { if (!isSubmitting) e.currentTarget.style.background = "#ea4321"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#ff5532"; }}
              >
                <span>{successText || (isSubmitting ? "Creating workspace…" : "Create Student Account")}</span>
                {isSubmitting
                  ? <span className="material-symbols-outlined" style={{ fontSize: "18px", animation: "spin 1s linear infinite" }}>progress_activity</span>
                  : <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>arrow_forward</span>
                }
              </button>

              <p style={{ textAlign: "center", fontSize: "12px", color: "#6b7280", margin: "4px 0 0" }}>
                Already have an account?{" "}
                <button type="button" onClick={() => { setMode("login"); setSuccessText(null); }} style={{ color: "#ff5532", fontWeight: 700, background: "none", border: "none", cursor: "pointer", textDecoration: "underline", fontFamily: "'Space Grotesk', sans-serif", fontSize: "12px" }}>
                  Sign in
                </button>
              </p>
            </form>
          )}
        </div>

        {/* Footer */}
        <div style={{
          display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between",
          gap: "10px", paddingTop: "20px",
          borderTop: "1px solid #f3f4f6",
          fontSize: "11px", color: "#9ca3af",
          fontFamily: "'Space Grotesk', sans-serif"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span className="material-symbols-outlined" style={{ fontSize: "13px", color: "#ff5532" }}>lock_clock</span>
            End-to-End TLS 1.3
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            {["Privacy Policy", "Terms", "Security"].map((l) => (
              <a key={l} href="#" style={{ color: "#9ca3af", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.color = "#111"}
                onMouseLeave={(e) => e.currentTarget.style.color = "#9ca3af"}>
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Inline CSS for animations & responsive left panel */}
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes float-1 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-14px) rotate(2deg)} }
        @keyframes float-2 { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-18px) rotate(-3deg)} }
        @keyframes float-3 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(12px)} }
        @keyframes float-4 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes float-5 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(14px)} }
        @keyframes pulse-glow { 0%,100%{opacity:0.6;transform:scale(1)} 50%{opacity:0.9;transform:scale(1.08)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        @keyframes fade-up { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }

        /* Left panel: hidden on mobile, flex on desktop */
        .auth-left-panel { display: none !important; }
        @media (min-width: 1024px) {
          .auth-left-panel { display: block !important; }
          .auth-right-panel { padding: 40px 64px !important; }
        }
        @media (min-width: 640px) and (max-width: 1023px) {
          .auth-right-panel { padding: 32px 40px !important; }
        }

        /* Register phone/course grid collapses below 420px */
        @media (max-width: 420px) {
          .auth-reg-grid { grid-template-columns: 1fr !important; }
        }

        /* Inputs */
        .auth-right-panel input:focus,
        .auth-right-panel select:focus {
          outline: none !important;
          border-color: #ff5532 !important;
          box-shadow: 0 0 0 3px rgba(255,85,50,0.12) !important;
          background: #fff !important;
        }

        /* Form fade-in after skeleton */
        .auth-form-inner { animation: fade-up 0.35s ease both; }
      `}</style>
    </div>
  );
}

// Shared style objects
const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  fontWeight: 700,
  color: "#111111",
  fontFamily: "'Space Grotesk', sans-serif",
  letterSpacing: "0.03em",
  marginBottom: "6px",
};

const inputIconStyle: React.CSSProperties = {
  position: "absolute",
  left: "12px",
  top: "50%",
  transform: "translateY(-50%)",
  fontSize: "18px",
  color: "#9ca3af",
  pointerEvents: "none",
  lineHeight: 1,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  paddingLeft: "40px",
  paddingRight: "14px",
  paddingTop: "11px",
  paddingBottom: "11px",
  borderRadius: "12px",
  border: "1px solid #e5e7eb",
  background: "#f9fafb",
  fontSize: "14px",
  fontFamily: "'Sora', sans-serif",
  color: "#111111",
  transition: "all 0.2s",
  boxSizing: "border-box",
  boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
};

const submitBtnStyle: React.CSSProperties = {
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "8px",
  padding: "14px 24px",
  borderRadius: "12px",
  border: "none",
  background: "#ff5532",
  color: "#fff",
  fontSize: "14px",
  fontWeight: 700,
  fontFamily: "'Space Grotesk', sans-serif",
  cursor: "pointer",
  boxShadow: "0 10px 30px rgba(255,85,50,0.30)",
  transition: "all 0.2s",
  letterSpacing: "0.02em",
  marginTop: "4px",
};

export default function AuthView({ initialMode = "login" }: AuthViewProps) {
  return (
    <Suspense fallback={
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "14px", color: "#6b7280" }}>
          <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#ff5532", display: "inline-block", animation: "ping 1s cubic-bezier(0,0,0.2,1) infinite" }} />
          Loading Netcoder…
        </div>
      </div>
    }>
      <AuthForm initialMode={initialMode} />
    </Suspense>
  );
}
