"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/context";
import {
  GraduationCap,
  ShieldCheck,
  Lock,
  Mail,
  User,
  Phone,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  Zap,
} from "lucide-react";

function StudentLoginContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginAsDemo, loginWithCredentials, loginWithGoogle, isLoading, user } = useAuth();

  const redirectUrl = searchParams.get("redirect") || "/student/dashboard";

  const [mode, setMode] = useState<"login" | "register">("login");
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("Full Stack Web Development");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // If already logged in, show quick resume prompt
  if (user) {
    return (
      <div className="max-w-md mx-auto my-12 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Already Authenticated</h2>
        <p className="text-sm text-slate-500 mt-1 mb-6">
          You are currently signed in as <span className="font-semibold text-slate-800">{user.name}</span> ({user.email}).
        </p>
        <div className="space-y-3">
          <button
            onClick={() => router.push(redirectUrl)}
            className="w-full py-3 px-4 rounded-xl bg-[#ff5532] text-white font-bold text-sm hover:bg-[#e04524] transition-all shadow-md shadow-[#ff5532]/25 flex items-center justify-center gap-2"
          >
            <span>Proceed to Student Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <Link
            href="/student/courses"
            className="block w-full py-2.5 px-4 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
          >
            Browse Enrolled Courses
          </Link>
        </div>
      </div>
    );
  }

  const handleDemoLogin = async () => {
    setIsSubmitting(true);
    setErrorMsg(null);
    setSuccessMsg("Authorizing Demo Student session (Aarav Patel)...");
    try {
      await loginAsDemo(redirectUrl);
    } catch {
      setErrorMsg("Demo login failed. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsSubmitting(true);
    setErrorMsg(null);
    try {
      await loginWithGoogle(redirectUrl);
    } catch {
      setErrorMsg("Google Sign-In failed or was closed. Please try again.");
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    if (mode === "login") {
      if (!emailOrPhone.trim()) {
        setErrorMsg("Please enter your registered email or phone number.");
        setIsSubmitting(false);
        return;
      }

      setSuccessMsg("Verifying student credentials...");
      try {
        const isEmail = emailOrPhone.includes("@");
        await loginWithCredentials(
          {
            email: isEmail ? emailOrPhone.trim() : undefined,
            phone: !isEmail ? emailOrPhone.trim() : undefined,
            name: emailOrPhone.split("@")[0] || "Student",
          },
          redirectUrl
        );
      } catch {
        setErrorMsg("Invalid credentials. Please verify or try Demo Login.");
        setIsSubmitting(false);
      }
    } else {
      if (!name.trim() || !emailOrPhone.trim() || !phone.trim()) {
        setErrorMsg("Please fill in your name, email, and phone number.");
        setIsSubmitting(false);
        return;
      }

      setSuccessMsg("Creating student enrollment profile...");
      try {
        await loginWithCredentials(
          {
            name: name.trim(),
            email: emailOrPhone.trim(),
            phone: phone.trim(),
          },
          redirectUrl
        );
      } catch {
        setErrorMsg("Registration failed. Please try again.");
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto my-6 sm:my-10">
      {/* Top Card */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Header Accent Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#ff5532]/25 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#ff5532] to-[#ff7a5c] text-white flex items-center justify-center mx-auto mb-3 shadow-lg shadow-[#ff5532]/40">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight">Student Portal Login</h1>
            <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
              Access your classes, video lectures with active DRM protection, and fee invoices.
            </p>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-2 p-1 rounded-xl bg-slate-100 text-xs font-bold text-slate-600">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setErrorMsg(null);
              }}
              className={`py-2 rounded-lg transition-all ${
                mode === "login"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "hover:text-slate-900"
              }`}
            >
              Sign In (Existing Learner)
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setErrorMsg(null);
              }}
              className={`py-2 rounded-lg transition-all ${
                mode === "register"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "hover:text-slate-900"
              }`}
            >
              New Student Registration
            </button>
          </div>

          {/* 1-Click Instant Demo Login Button */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-amber-900 leading-tight">Instant Demo Student</p>
                  <p className="text-[11px] text-amber-700 leading-tight">Aarav Patel (Full Stack Cohort)</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={isSubmitting || isLoading}
                className="px-3.5 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-xs transition-colors shrink-0 disabled:opacity-50"
              >
                1-Click Demo
              </button>
            </div>
          </div>

          {/* Messages */}
          {errorMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
              <span>{errorMsg}</span>
            </div>
          )}
          {successMsg && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* Standard Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Aarav Sharma"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#ff5532] text-sm text-slate-800"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                {mode === "login" ? "Registered Email or Mobile No. *" : "Email Address *"}
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={emailOrPhone}
                  onChange={(e) => setEmailOrPhone(e.target.value)}
                  placeholder={mode === "login" ? "student@netcoder.in or 9876543210" : "you@example.com"}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#ff5532] text-sm text-slate-800"
                />
              </div>
            </div>

            {mode === "register" && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mobile Number (WhatsApp) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#ff5532] text-sm text-slate-800"
                  />
                </div>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                {mode === "login" && (
                  <button
                    type="button"
                    onClick={() => alert("Please contact your Netcoder batch mentor or use 1-Click Demo Login.")}
                    className="text-[11px] font-medium text-[#ff5532] hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={mode === "login" ? "Enter your password (or leave blank for OTP)" : "Create a secure password"}
                  className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#ff5532] text-sm text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {mode === "register" && (
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Interested Learning Track
                </label>
                <select
                  value={selectedCourse}
                  onChange={(e) => setSelectedCourse(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#ff5532] text-sm text-slate-800 bg-white"
                >
                  <option value="Full Stack Web Development">Full Stack Web Development (MERN / Next.js)</option>
                  <option value="Python Data Science & AI">Python Data Science & AI</option>
                  <option value="Cyber Security & Ethical Hacking">Cyber Security & Ethical Hacking</option>
                  <option value="React & React Native Mastery">React & React Native Mastery</option>
                  <option value="Cloud DevOps & Docker">Cloud DevOps & Docker</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full py-3 px-4 rounded-xl bg-[#ff5532] hover:bg-[#e04524] text-white font-bold text-sm shadow-md shadow-[#ff5532]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <span>{mode === "login" ? "Sign In to Dashboard" : "Register & Start Learning"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider relative">
              Or continue with
            </span>
          </div>

          {/* Google SSO */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isSubmitting || isLoading}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs flex items-center justify-center gap-2.5 transition-colors disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.13C3.26 21.39 7.36 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.57H1.25C.45 8.16 0 9.99 0 12s.45 3.84 1.25 5.43l4.03-3.14z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.61 1.25 6.57l4.03 3.14c.95-2.83 3.6-4.96 6.72-4.96z"
              />
            </svg>
            <span>Google Account</span>
          </button>

          {/* Security & DRM Compliance Footer */}
          <div className="pt-2 border-t border-slate-100 flex items-start gap-2 text-[11px] text-slate-500">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              Protected by Netcoder Dynamic DRM Watermark. Accessing proprietary lecture videos records your authenticated session hash to deter illegal redistribution.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StudentLoginPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-[60vh] flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span className="w-3 h-3 rounded-full bg-[#ff5532] animate-ping" />
            <span>Loading Student Portal Authentication...</span>
          </div>
        </div>
      }
    >
      <StudentLoginContent />
    </Suspense>
  );
}
