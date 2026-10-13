"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth/context";
import ForgotPasswordModal from "@/components/ForgotPasswordModal";

type Mode = "login" | "register";

// Icon helper: Material Symbols (same icon set as the original page)
function Icon({ name, size = 18, color, fill = false, style }: {
  name: string;
  size?: number;
  color?: string;
  fill?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className="material-symbols-outlined"
      aria-hidden="true"
      style={{
        fontSize: size,
        color,
        lineHeight: 1,
        fontVariationSettings: fill ? "'FILL' 1" : "'FILL' 0",
        ...style,
      }}
    >
      {name}
    </span>
  );
}

function useParallax(strength = 1) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: MouseEvent) => {
      setPos({
        x: (e.clientX / window.innerWidth - 0.5) * strength,
        y: (e.clientY / window.innerHeight - 0.5) * strength,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength]);

  return pos;
}

function ParallaxBackground() {
  const pos = useParallax(1);

  const layer = (depth: number): React.CSSProperties => ({
    position: "absolute",
    transform: `translate3d(${pos.x * depth * 60}px, ${pos.y * depth * 60}px, 0)`,
    transition: "transform 0.5s ease-out",
    pointerEvents: "none",
  });

  return (
    <div aria-hidden="true" style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      {/* Far layer: dotted grid */}
      <div
        style={{
          ...layer(0.2),
          inset: -40,
          backgroundImage: "radial-gradient(rgba(255,85,50,0.18) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(circle at center, #000 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(circle at center, #000 30%, transparent 75%)",
        }}
      />
      {/* Mid layer: large blurred orbs */}
      <div style={{ ...layer(0.6), top: -120, left: -80, width: 340, height: 340, borderRadius: "50%", background: "rgba(255,85,50,0.22)", filter: "blur(80px)" }} />
      <div style={{ ...layer(0.6), bottom: -120, right: -80, width: 360, height: 360, borderRadius: "50%", background: "rgba(251,191,36,0.25)", filter: "blur(90px)" }} />
      {/* Near layer: floating icon chips */}
      <div style={{ ...layer(1.4), top: "12%", left: "8%", width: 44, height: 44, borderRadius: 14, background: "#fff", boxShadow: "0 10px 25px rgba(15,23,42,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="code" size={22} color="#ff5532" />
      </div>
      <div style={{ ...layer(1.8), top: "20%", right: "10%", width: 44, height: 44, borderRadius: 14, background: "#fff", boxShadow: "0 10px 25px rgba(15,23,42,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="cloud" size={22} color="#0284c7" />
      </div>
      <div style={{ ...layer(1.1), bottom: "14%", left: "12%", width: 44, height: 44, borderRadius: 14, background: "#fff", boxShadow: "0 10px 25px rgba(15,23,42,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="psychology" size={22} color="#8b5cf6" />
      </div>
      <div style={{ ...layer(1.6), bottom: "18%", right: "12%", width: 44, height: 44, borderRadius: 14, background: "#fff", boxShadow: "0 10px 25px rgba(15,23,42,0.10)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Icon name="security" size={22} color="#10b981" />
      </div>
    </div>
  );
}

function AuthForm({ initialMode = "login" }: { initialMode?: Mode }) {
  const searchParams = useSearchParams();
  const { loginWithGithub, loginWithCredentials, loginAsDemo, isLoading } = useAuth();

  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [showForgotModal, setShowForgotModal] = useState(false);

  const redirect = searchParams.get("redirect") || searchParams.get("return_to") || "/lms/courses";
  const busy = isSubmitting || isLoading;

  useEffect(() => {
    const q = searchParams.get("mode");
    if (q === "register") setMode("register");
    if (q === "login") setMode("login");
  }, [searchParams]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (mode === "register" && !name)) {
      setErrorMessage("Please fill in all required fields.");
      return;
    }
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      await loginWithCredentials(
        { name: name || email.split("@")[0], email, password, remember: rememberMe },
        redirect
      );
    } catch (err: any) {
      setErrorMessage(err?.message || "Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  // Apple isn't in the current auth context. Wire loginWithApple here once it exists.
  const handleApple = () => setErrorMessage("Apple sign-in is not configured yet.");

  return (
    <div style={styles.page}>
      <ParallaxBackground />

      <main style={styles.card}>
        <div style={styles.topRow}>
          <Link href="/" style={styles.brand}>
            <Icon name="terminal" size={20} color="#ff5532" fill />
            Netcoder<span style={{ color: "#ff5532" }}>.io</span>
          </Link>
          <Link href="/guide" style={styles.guideLink}>
            <Icon name="menu_book" size={16} color="#ff5532" />
            Guide
          </Link>
        </div>

        <h1 style={styles.title}>{mode === "login" ? "Welcome back" : "Create your account"}</h1>
        <p style={styles.subtitle}>
          {mode === "login"
            ? "Sign in to continue to your dashboard."
            : "Start learning with hands-on projects."}
        </p>

        {/* Mode toggle */}
        <div style={styles.toggle} role="tablist">
          {(["login", "register"] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => {
                setMode(m);
                setErrorMessage(null);
              }}
              style={{ ...styles.toggleBtn, ...(mode === m ? styles.toggleBtnActive : {}) }}
            >
              <Icon name={m === "login" ? "login" : "person_add"} size={16} color={mode === m ? "#ff5532" : "#6b7280"} />
              {m === "login" ? "Sign In" : "Register"}
            </button>
          ))}
        </div>

        {/* Quick sign-in options */}
        <div style={styles.quickGrid}>
          <button type="button" onClick={() => loginWithGithub(redirect)} disabled={busy} style={styles.quickBtn}>
            <Icon name="code" size={18} color="#111" />
            GitHub
          </button>
          <button type="button" onClick={handleApple} disabled={busy} style={styles.quickBtn}>
            <Icon name="phone_iphone" size={18} color="#111" />
            Apple
          </button>
          <button type="button" onClick={() => document.getElementById("auth-email")?.focus()} disabled={busy} style={styles.quickBtn}>
            <Icon name="mail" size={18} color="#111" />
            Email
          </button>
        </div>

        <div style={styles.divider}>
          <span style={styles.dividerLine} />
          <span style={styles.dividerText}>or continue with email</span>
          <span style={styles.dividerLine} />
        </div>

        {errorMessage && (
          <div style={styles.error}>
            <Icon name="error" size={16} color="#dc2626" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={submit} style={styles.form}>
          {mode === "register" && (
            <div style={styles.inputWrap}>
              <Icon name="badge" size={18} color="#9ca3af" style={styles.inputIcon} />
              <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={styles.input}
                required
              />
            </div>
          )}

          <div style={styles.inputWrap}>
            <Icon name="alternate_email" size={18} color="#9ca3af" style={styles.inputIcon} />
            <input
              id="auth-email"
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.inputWrap}>
            <Icon name="lock" size={18} color="#9ca3af" style={styles.inputIcon} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder={mode === "register" ? "Create password (8+ characters)" : "Password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ ...styles.input, paddingRight: 44 }}
              required
            />
            <button type="button" onClick={() => setShowPassword((s) => !s)} style={styles.eyeBtn} aria-label="Toggle password visibility">
              <Icon name={showPassword ? "visibility_off" : "visibility"} size={18} color="#6b7280" />
            </button>
          </div>

          <div style={styles.rowBetween}>
            <label style={styles.toggleRow}>
              <span
                role="switch"
                aria-checked={rememberMe}
                onClick={() => setRememberMe((r) => !r)}
                style={{ ...styles.switchTrack, background: rememberMe ? "#ff5532" : "#d1d5db" }}
              >
                <span style={{ ...styles.switchThumb, transform: rememberMe ? "translateX(16px)" : "translateX(0)" }} />
              </span>
              <span style={styles.smallText}>Remember me</span>
            </label>

            {mode === "login" && (
              <button type="button" onClick={() => setShowForgotModal(true)} style={styles.linkBtn}>
                Forgot password?
              </button>
            )}
          </div>

          <button type="submit" disabled={busy} style={styles.submit}>
            <Icon name={busy ? "progress_activity" : mode === "login" ? "login" : "how_to_reg"} size={18} color="#fff" />
            {busy ? "Please wait..." : mode === "login" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button type="button" onClick={() => loginAsDemo(redirect)} disabled={busy} style={styles.demoBtn}>
          <Icon name="play_circle" size={18} color="#c2410c" />
          Try a demo account
        </button>

        <div style={styles.footerRow}>
          <Link href="/book-demo" style={styles.footerLink}>
            <Icon name="event" size={16} color="#ff5532" />
            Book a demo
          </Link>
          <span style={styles.dot}>•</span>
          <Link href="/guide" style={styles.footerLink}>
            <Icon name="school" size={16} color="#ff5532" />
            Getting started
          </Link>
        </div>

        <div style={styles.secureRow}>
          <Icon name="verified_user" size={14} color="#9ca3af" />
          Encrypted session · TLS 1.3
        </div>
      </main>

      <ForgotPasswordModal isOpen={showForgotModal} onClose={() => setShowForgotModal(false)} defaultEmail={email} />
    </div>
  );
}

export default function AuthView({ initialMode = "login" }: { initialMode?: Mode }) {
  return (
    <Suspense fallback={<div style={styles.page} />}>
      <AuthForm initialMode={initialMode} />
    </Suspense>
  );
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    background: "linear-gradient(160deg, #fff7f5 0%, #ffffff 55%, #fffbeb 100%)",
    fontFamily: "'Sora', -apple-system, sans-serif",
    position: "relative",
    overflow: "hidden",
  },
  card: {
    position: "relative",
    zIndex: 1,
    width: "100%",
    maxWidth: 420,
    background: "rgba(255,255,255,0.96)",
    backdropFilter: "blur(6px)",
    borderRadius: 20,
    padding: "28px 26px",
    boxShadow: "0 20px 50px rgba(15,23,42,0.12)",
    border: "1px solid #f1f5f9",
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 6,
    fontSize: 17,
    fontWeight: 800,
    color: "#111",
    textDecoration: "none",
    fontFamily: "'Space Grotesk', sans-serif",
  },
  guideLink: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    fontWeight: 700,
    color: "#ff5532",
    textDecoration: "none",
  },
  title: {
    margin: 0,
    fontSize: 26,
    fontWeight: 800,
    color: "#111",
    fontFamily: "'Space Grotesk', sans-serif",
    letterSpacing: "-0.02em",
  },
  subtitle: {
    margin: "6px 0 20px",
    fontSize: 13,
    color: "#6b7280",
  },
  toggle: {
    display: "flex",
    background: "#f3f4f6",
    borderRadius: 12,
    padding: 4,
    marginBottom: 18,
  },
  toggleBtn: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    padding: "9px 0",
    border: "none",
    borderRadius: 9,
    background: "transparent",
    color: "#6b7280",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
  },
  toggleBtnActive: {
    background: "#ffffff",
    color: "#111",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
  },
  quickGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: 8,
  },
  quickBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 4,
    padding: "10px 6px",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    background: "#fff",
    fontSize: 12,
    fontWeight: 700,
    color: "#111",
    cursor: "pointer",
  },
  divider: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    margin: "18px 0",
  },
  dividerLine: { flex: 1, height: 1, background: "#e5e7eb" },
  dividerText: {
    fontSize: 11,
    color: "#9ca3af",
    textTransform: "uppercase",
    letterSpacing: "0.06em",
    whiteSpace: "nowrap",
  },
  error: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    padding: "10px 12px",
    borderRadius: 10,
    background: "#fef2f2",
    border: "1px solid #fecaca",
    color: "#b91c1c",
    fontSize: 12,
    marginBottom: 12,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  inputWrap: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    left: 12,
    top: "50%",
    transform: "translateY(-50%)",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "12px 14px 12px 40px",
    borderRadius: 12,
    border: "1px solid #e5e7eb",
    background: "#f9fafb",
    fontSize: 14,
    color: "#111",
    boxSizing: "border-box",
    outline: "none",
  },
  eyeBtn: {
    position: "absolute",
    right: 10,
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: 4,
    display: "flex",
  },
  rowBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  toggleRow: {
    display: "flex",
    alignItems: "center",
    gap: 8,
    cursor: "pointer",
  },
  switchTrack: {
    width: 36,
    height: 20,
    borderRadius: 999,
    padding: 2,
    display: "inline-flex",
    alignItems: "center",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  switchThumb: {
    width: 16,
    height: 16,
    borderRadius: "50%",
    background: "#fff",
    transition: "transform 0.2s",
    boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
  },
  smallText: { fontSize: 12, color: "#6b7280" },
  linkBtn: {
    background: "none",
    border: "none",
    color: "#ff5532",
    fontSize: 12,
    fontWeight: 700,
    cursor: "pointer",
    padding: 0,
  },
  submit: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "13px",
    borderRadius: 12,
    border: "none",
    background: "#ff5532",
    color: "#fff",
    fontSize: 14,
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 10px 25px rgba(255,85,50,0.28)",
    marginTop: 4,
  },
  demoBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 12,
    padding: "11px",
    borderRadius: 12,
    border: "1px dashed #fdba74",
    background: "#fffaf0",
    color: "#c2410c",
    fontSize: 13,
    fontWeight: 700,
    cursor: "pointer",
  },
  footerRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    marginTop: 18,
  },
  footerLink: {
    display: "flex",
    alignItems: "center",
    gap: 4,
    fontSize: 12,
    fontWeight: 700,
    color: "#ff5532",
    textDecoration: "none",
  },
  dot: { color: "#d1d5db" },
  secureRow: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
    marginTop: 16,
    fontSize: 11,
    color: "#9ca3af",
  },
};