"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@netcoder.in");
  const [password, setPassword] = useState("admin123");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (email.trim() && password.trim()) {
        if (typeof window !== "undefined") {
          localStorage.setItem("admin_auth", "true");
          localStorage.setItem("admin_user", "Administrator (Netcoder Faculty)");
        }
        router.push("/admin/dashboard");
      } else {
        setError("Please enter valid credentials.");
        setLoading(false);
      }
    }, 400);
  };

  const handleInstantDemoAdmin = () => {
    setLoading(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("admin_auth", "true");
      localStorage.setItem("admin_user", "Admin Nitin Kapoor");
    }
    router.push("/admin/dashboard");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div className="w-full max-w-md bg-white rounded-3xl p-8 md:p-10 shadow-2xl border border-slate-200">
        {/* Header Logo */}
        <div className="text-center mb-6">
          <Link href="/">
            <img
              src="/images/logo.png"
              alt="Netcoder Technology"
              className="h-14 mx-auto mb-3 object-contain"
            />
          </Link>
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2"
            style={{ background: "rgba(255, 85, 50, 0.1)", color: "#ff5532" }}
          >
            Faculty &amp; Admin Gateway
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Admin Control Panel</h1>
          <p className="text-xs text-slate-500 mt-1">Manage LMS students, courses, blogs &amp; feedback</p>
        </div>

        {/* Instant 1-Click Demo Admin Button */}
        <div
          className="mb-6 p-4 rounded-2xl border flex flex-col gap-2.5 shadow-sm"
          style={{
            background: "linear-gradient(135deg, rgba(255, 85, 50, 0.08) 0%, rgba(255, 115, 84, 0.05) 100%)",
            borderColor: "rgba(255, 85, 50, 0.3)",
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "#ff5532" }}>
              ⚡ Quick Testing Access
            </span>
            <span className="text-[11px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-bold">
              Instant
            </span>
          </div>
          <p className="text-xs text-slate-600">
            Log in directly as Administrator with pre-filled full permissions.
          </p>
          <button
            type="button"
            onClick={handleInstantDemoAdmin}
            disabled={loading}
            className="w-full py-2.5 rounded-xl font-bold text-xs text-white shadow-md transition hover:opacity-95 cursor-pointer flex items-center justify-center gap-2"
            style={{
              background: "linear-gradient(135deg, #ff5532 0%, #ff7354 100%)",
              boxShadow: "0 4px 14px rgba(255, 85, 50, 0.35)",
            }}
          >
            <i className="fa-solid fa-key"></i>
            <span>1-Click Launch Admin Dashboard</span>
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
            {error}
          </div>
        )}

        {/* Standard Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">ADMINISTRATOR EMAIL</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="admin@netcoder.in"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">PASSWORD</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl font-bold text-sm text-white bg-slate-900 hover:bg-slate-800 transition cursor-pointer shadow-md"
          >
            {loading ? "Signing in..." : "Sign In to Admin Panel"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <Link href="/" className="hover:text-orange-600 transition">
            ← Return to Website
          </Link>
          <Link href="/lms" className="hover:text-orange-600 transition">
            Student LMS Portal →
          </Link>
        </div>
      </div>
    </div>
  );
}
