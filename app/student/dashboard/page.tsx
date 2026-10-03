"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/context";
import { LMS_COURSES, type LMSCourse } from "@/data/lms-courses";
import {
  GraduationCap,
  BookOpen,
  Clock,
  Trophy,
  Play,
  PlayCircle,
  CheckCircle2,
  Calendar,
  CreditCard,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  ExternalLink,
  Video,
  FileText,
  UserCheck,
  Layers,
} from "lucide-react";

export default function StudentDashboardPage() {
  const { user } = useAuth();

  // Fallback demo student if not logged in
  const student = {
    name: user?.name || "Aarav Patel",
    email: user?.email || "aarav@netcoder.in",
    id: user?.id || "NC-STU-2026-084",
    phone: user?.phone || "+91 98765 43210",
    cohort: "Full Stack & Cloud Cohort 2026",
    attendance: "94%",
    totalHours: "42.5 hrs",
    feesPaid: "₹18,000",
    feePending: "₹4,999",
    feeDueDate: "15 Oct 2026",
  };

  const [sessionHash, setSessionHash] = useState("DRM-NC-8372-VERIFIED");
  useEffect(() => {
    setSessionHash(`DRM-NC-${Math.floor(1000 + Math.random() * 9000)}-${student.id.slice(-4)}`);
  }, [student.id]);

  // Active courses for student
  const activeCourses = LMS_COURSES.slice(0, 3).map((course, idx) => {
    const progressValues = [78, 45, 20];
    const nextLessons = [
      "Next.js 15 Server Actions & Prisma Integration",
      "Building RESTful Microservices with Node.js & Docker",
      "Vector Embeddings & RAG with LangChain",
    ];
    return {
      ...course,
      progress: progressValues[idx] || 35,
      nextLesson: nextLessons[idx] || "Upcoming Module Lecture",
      lastActive: idx === 0 ? "Today, 10:15 AM" : idx === 1 ? "Yesterday" : "3 days ago",
    };
  });

  const featuredCourse = activeCourses[0];

  const upcomingClasses = [
    {
      id: "live-1",
      title: "Real-time WebSockets & Redis Pub/Sub in Node.js",
      instructor: "Er. Sahil Sandhu (Principal Architect)",
      time: "Today at 06:30 PM IST",
      type: "Live Interactive Masterclass",
      link: "/lms/classroom?course=" + featuredCourse.slug,
      isToday: true,
    },
    {
      id: "live-2",
      title: "Full-Stack Mock Technical Interview & Resume Reviews",
      instructor: "Vikram Malhotra (Lead Mentor)",
      time: "Tomorrow at 05:00 PM IST",
      type: "Doubt Clearance & 1:1 Review",
      link: "/lms/classroom?course=" + featuredCourse.slug,
      isToday: false,
    },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* Top Student Welcome Header */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#ff5532]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ff5532]/20 text-[#ff5532] border border-[#ff5532]/30 text-xs font-bold tracking-wide">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>{student.cohort}</span>
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>DRM Protected: {sessionHash}</span>
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Welcome back, {student.name}! 👋
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-xl">
                Student ID: <span className="font-mono text-amber-300 font-bold">{student.id}</span> • Ready to continue your hands-on coding curriculum today.
              </p>
            </div>
          </div>

          {/* Header Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href={`/lms/classroom?course=${featuredCourse.slug}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#ff5532] hover:bg-[#e04524] text-white font-bold text-sm shadow-lg shadow-[#ff5532]/30 transition-all hover:scale-102"
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Resume Current Lesson</span>
            </Link>
            <Link
              href="/student/payment"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/15 transition-colors"
            >
              <CreditCard className="w-4 h-4 text-amber-300" />
              <span>Fee Invoices</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 Core Student KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Active Courses */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Active Courses</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{activeCourses.length}</p>
            <Link
              href="/student/courses"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#ff5532] hover:underline mt-1"
            >
              <span>View enrolled tracks</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <BookOpen className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2: Curriculum Completion */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Avg. Completion</p>
            <p className="text-2xl font-extrabold text-emerald-600 mt-1">64%</p>
            <p className="text-[11px] text-slate-400 mt-1">18 of 28 Modules cleared</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3: Live Class Attendance */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Class Attendance</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-1">{student.attendance}</p>
            <p className="text-[11px] text-slate-400 mt-1">29 of 31 Sessions attended</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4: Fee Ledger Status */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-slate-500">Fee Ledger</p>
            <p className="text-xl font-extrabold text-slate-900 mt-1">{student.feesPaid}</p>
            <Link
              href="/student/payment"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 hover:underline mt-1"
            >
              <span>Due: {student.feePending}</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
            <CreditCard className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Featured Ongoing Course (Resume Learning Banner) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-[#ff5532]/10 text-[#ff5532] text-xs font-bold uppercase tracking-wider">
                In-Progress Track
              </span>
              <span className="text-xs text-slate-400">• Last watched {featuredCourse.lastActive}</span>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">{featuredCourse.title}</h2>
              <p className="text-xs text-slate-600 mt-1">
                Next Lesson: <span className="font-semibold text-slate-800">{featuredCourse.nextLesson}</span>
              </p>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 max-w-lg">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>Course Progress</span>
                <span className="text-[#ff5532]">{featuredCourse.progress}% Completed</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#ff5532] to-[#ff7a5c] rounded-full transition-all duration-500"
                  style={{ width: `${featuredCourse.progress}%` }}
                />
              </div>
            </div>
          </div>

          <div className="shrink-0 flex items-center gap-3">
            <Link
              href={`/lms/classroom?course=${featuredCourse.slug}`}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#ff5532] hover:bg-[#e04524] text-white font-bold text-sm shadow-md shadow-[#ff5532]/25 transition-all"
            >
              <PlayCircle className="w-5 h-5" />
              <span>Resume Lesson</span>
            </Link>
            <Link
              href="/student/courses"
              className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-colors"
            >
              <span>Course Outline</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 2-Column Section: Enrolled Tracks & Scheduled Live Masterclasses */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Enrolled Courses (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Enrolled Learning Tracks</h3>
              <p className="text-xs text-slate-500">Your registered cohorts and modular syllabi</p>
            </div>
            <Link
              href="/student/courses"
              className="text-xs font-bold text-[#ff5532] hover:underline flex items-center gap-1"
            >
              <span>All Courses</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {activeCourses.map((c) => (
              <div
                key={c.slug}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs hover:border-slate-300 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200 text-slate-700">
                    <BookOpen className="w-6 h-6 text-[#ff5532]" />
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">{c.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {c.instructor} • {c.duration}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-24 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#ff5532] rounded-full"
                          style={{ width: `${c.progress}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-600">{c.progress}%</span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2 w-full sm:w-auto justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <Link
                    href={`/lms/classroom?course=${c.slug}`}
                    className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                  >
                    <Play className="w-3 h-3 fill-white" />
                    <span>Watch</span>
                  </Link>
                  <Link
                    href={`/student/courses`}
                    className="px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors"
                  >
                    Syllabus
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Classes & Mentor Doubts (1 Col) */}
        <div className="space-y-4">
          <div>
            <h3 className="text-base font-bold text-slate-900">Upcoming Live Sessions</h3>
            <p className="text-xs text-slate-500">Live cohort interactions & doubt clearing</p>
          </div>

          <div className="space-y-3">
            {upcomingClasses.map((cls) => (
              <div
                key={cls.id}
                className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs space-y-3 relative"
              >
                {cls.isToday && (
                  <span className="absolute top-4 right-4 px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-bold uppercase tracking-wider animate-pulse">
                    Live Today
                  </span>
                )}
                <div className="flex items-center gap-2 text-xs font-semibold text-[#ff5532]">
                  <Video className="w-4 h-4" />
                  <span>{cls.type}</span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 leading-snug">{cls.title}</h4>
                  <p className="text-[11px] text-slate-500 mt-1">{cls.instructor}</p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-slate-500 font-medium text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{cls.time}</span>
                  </div>
                  <Link
                    href={cls.link}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#ff5532] text-white font-bold text-xs hover:bg-[#e04524] transition-colors"
                  >
                    <span>Join Class</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            ))}

            {/* Quick Fee Reminder Card */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/90 text-amber-900 space-y-2">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold">Upcoming Installment Reminder</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Next fee installment of <span className="font-bold">{student.feePending}</span> is scheduled on {student.feeDueDate}.
              </p>
              <div className="pt-1">
                <Link
                  href="/student/payment"
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 hover:text-amber-900 underline"
                >
                  <span>Open Fee & Payment Portal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
