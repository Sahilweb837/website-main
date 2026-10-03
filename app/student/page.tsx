"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth/context";
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  CreditCard,
  LogIn,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  FileCode,
} from "lucide-react";

export default function StudentHubPage() {
  const { user } = useAuth();

  const portalSections = [
    {
      title: "Student Dashboard",
      route: "/student/dashboard",
      icon: LayoutDashboard,
      badge: "Primary Hub",
      badgeColor: "bg-blue-100 text-blue-800",
      description:
        "Access your real-time attendance, DRM watermark shield status, enrolled tracks, and resume ongoing lessons.",
      actionText: "Open Dashboard",
      color: "from-blue-500/10 to-indigo-500/10",
      accent: "text-blue-600",
    },
    {
      title: "My Courses & Tracks",
      route: "/student/courses",
      icon: BookOpen,
      badge: "Curriculum",
      badgeColor: "bg-emerald-100 text-emerald-800",
      description:
        "Browse all active cohorts, track syllabus completion percentages, and launch HD video classroom sessions.",
      actionText: "Explore Courses",
      color: "from-emerald-500/10 to-teal-500/10",
      accent: "text-emerald-600",
    },
    {
      title: "Fees & Payment Ledger",
      route: "/student/payment",
      icon: CreditCard,
      badge: "Accounts & Billing",
      badgeColor: "bg-amber-100 text-amber-800",
      description:
        "Manage installment dues, verify transaction history, download printable tax invoice receipts, or pay tuition fees online.",
      actionText: "View Payments",
      color: "from-amber-500/10 to-orange-500/10",
      accent: "text-amber-600",
    },
    {
      title: "Student Authentication",
      route: "/student/login",
      icon: LogIn,
      badge: "Auth & SSO",
      badgeColor: "bg-rose-100 text-rose-800",
      description:
        "Dedicated sign-in page with Google SSO, Student Mobile OTP / Email verification, and 1-Click Demo student access.",
      actionText: "Go to Login",
      color: "from-rose-500/10 to-[#ff5532]/10",
      accent: "text-[#ff5532]",
    },
  ];

  return (
    <div className="space-y-8 py-2">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 translate-x-8 -translate-y-8 w-64 h-64 bg-[#ff5532]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-emerald-400 border border-white/10">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Netcoder Dynamic DRM & Student Engine Ready</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome to the Student Portal
            </h1>
            <p className="text-slate-300 text-sm max-w-xl">
              {user
                ? `Logged in as ${user.name} (${user.email}). Select a module below to manage your learning journey, attend classes, or review your fee invoices.`
                : "Your unified gateway for class attendance, DRM-secured video lectures, fee payments, and verified certificate milestones."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/student/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#ff5532] hover:bg-[#e04524] text-white font-bold text-sm shadow-lg shadow-[#ff5532]/30 transition-all hover:scale-102"
            >
              <span>Launch Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/folder.txt"
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/15 transition-colors"
            >
              <FileCode className="w-4 h-4 text-amber-400" />
              <span>View folder.txt</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Grid of the 4 Main Student Folders / Routes */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Student Modules Directory</h2>
            <p className="text-xs text-slate-500">
              Structured folder endpoints configured under <code className="font-mono text-[#ff5532] bg-slate-100 px-1 py-0.5 rounded">app/student/</code>
            </p>
          </div>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
            4 Core Subfolders
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {portalSections.map((sec) => {
            const Icon = sec.icon;
            return (
              <div
                key={sec.route}
                className="group relative bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <div
                      className={`w-11 h-11 rounded-xl bg-gradient-to-br ${sec.color} flex items-center justify-center ${sec.accent}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${sec.badgeColor}`}>
                      {sec.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-[#ff5532] transition-colors flex items-center gap-1.5">
                    {sec.title}
                  </h3>
                  <code className="text-[11px] font-mono text-slate-400 block mt-0.5 mb-2">
                    {sec.route}
                  </code>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {sec.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-500">
                    Route: <span className="font-mono text-slate-700">{sec.route.replace("/student/", "")}</span>
                  </span>
                  <Link
                    href={sec.route}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#ff5532] hover:text-[#c94f0e] transition-colors"
                  >
                    <span>{sec.actionText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Highlights */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Student Portal Capabilities</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900">Dynamic DRM Watermarking</p>
              <p className="text-slate-500 mt-0.5">Automated student identification overlay across video players to prevent screen recording.</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900">Direct Classroom Telemetry</p>
              <p className="text-slate-500 mt-0.5">Synchronized course milestones, quiz submissions, and live code sandboxes.</p>
            </div>
          </div>
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-100">
            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold text-slate-900">GST Invoices & Fee Ledger</p>
              <p className="text-slate-500 mt-0.5">Automated fee receipts, installment schedule, and instant UPI / card checkout.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
