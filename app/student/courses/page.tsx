"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { LMS_COURSES, type LMSCourse } from "@/data/lms-courses";
import { useAuth } from "@/lib/auth/context";
import {
  BookOpen,
  Search,
  Play,
  PlayCircle,
  Clock,
  Star,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Layers,
  ArrowRight,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  CreditCard,
  User,
  X,
} from "lucide-react";

export default function StudentCoursesPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<"enrolled" | "all">("enrolled");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedSyllabusSlug, setExpandedSyllabusSlug] = useState<string | null>(null);

  // Mock enrolled course slugs for the student
  const enrolledSlugs = ["production-kubernetes", "fullstack-architect-mastery", "agentic-ai-engineering"];

  const categories = [
    { id: "all", label: "All Categories" },
    { id: "fullstack", label: "Full Stack Web" },
    { id: "cloud", label: "Cloud & DevOps" },
    { id: "ai", label: "AI & Data Science" },
    { id: "cyber", label: "Cyber Security" },
  ];

  const filteredCourses = useMemo(() => {
    return LMS_COURSES.filter((course) => {
      // Tab filter
      if (activeTab === "enrolled" && !enrolledSlugs.includes(course.slug)) {
        return false;
      }
      // Category filter
      if (selectedCategory !== "all" && course.category !== selectedCategory) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          course.title.toLowerCase().includes(q) ||
          course.overview.toLowerCase().includes(q) ||
          course.instructor.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeTab, selectedCategory, searchQuery]);

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-8 shadow-xl">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#ff5532]/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-semibold text-emerald-400 mb-2 border border-white/10">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Netcoder Academic Syllabus</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              My Courses & Learning Tracks
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
              Access lesson recordings with DRM protection, download practice code sandboxes, and monitor curriculum completion.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/student/payment"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/15 transition-colors"
            >
              <CreditCard className="w-4 h-4 text-amber-300" />
              <span>Enroll / Pay Fees</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Tabs & Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Tabs: Enrolled vs All */}
        <div className="flex items-center p-1 rounded-xl bg-white border border-slate-200 shadow-xs text-xs font-bold text-slate-600">
          <button
            onClick={() => setActiveTab("enrolled")}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "enrolled"
                ? "bg-[#ff5532] text-white shadow-xs"
                : "hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>My Enrolled Tracks ({enrolledSlugs.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              activeTab === "all"
                ? "bg-[#ff5532] text-white shadow-xs"
                : "hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore All Tracks ({LMS_COURSES.length})</span>
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by topic, instructor, skill..."
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-white border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#ff5532] text-xs text-slate-800 shadow-xs"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === cat.id
                ? "bg-slate-900 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      {filteredCourses.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto my-8">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">No courses match your criteria</h3>
          <p className="text-xs text-slate-500 mt-1 mb-4">
            Try adjusting your search terms or switch to "Explore All Tracks" to browse the full curriculum.
          </p>
          <button
            onClick={() => {
              setActiveTab("all");
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="px-4 py-2 rounded-xl bg-[#ff5532] text-white text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course, idx) => {
            const isEnrolled = enrolledSlugs.includes(course.slug);
            const progress = isEnrolled ? (idx === 0 ? 78 : idx === 1 ? 45 : 20) : 0;
            const isSyllabusOpen = expandedSyllabusSlug === course.slug;

            return (
              <div
                key={course.slug}
                className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                <div>
                  {/* Course Thumbnail */}
                  <div className="relative h-44 w-full bg-slate-900 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={course.image || "/images/full-stact-development.png"}
                      alt={course.title}
                      className="w-full h-full object-cover opacity-90 hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />
                    
                    {/* Badge */}
                    <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold border border-white/20">
                      {course.level}
                    </span>

                    {isEnrolled && (
                      <span className="absolute top-3 right-3 px-2.5 py-0.5 rounded-full bg-emerald-500 text-white text-[11px] font-bold shadow-xs">
                        Enrolled
                      </span>
                    )}

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-300" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{course.rating} ({course.ratingCount})</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-base font-bold text-slate-900 line-clamp-1 leading-snug">
                      {course.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {course.overview}
                    </p>

                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{course.instructor}</span>
                    </div>

                    {/* Progress Bar (if enrolled) */}
                    {isEnrolled && (
                      <div className="pt-2 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold text-slate-600">
                          <span>Progress</span>
                          <span className="text-[#ff5532]">{progress}%</span>
                        </div>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[#ff5532] rounded-full"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Interactive Syllabus Toggle */}
                    {course.syllabus && course.syllabus.length > 0 && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() =>
                            setExpandedSyllabusSlug(isSyllabusOpen ? null : course.slug)
                          }
                          className="w-full flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors"
                        >
                          <span className="flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-[#ff5532]" />
                            <span>{course.syllabus.length} Curriculum Modules</span>
                          </span>
                          {isSyllabusOpen ? (
                            <ChevronUp className="w-4 h-4 text-slate-400" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-400" />
                          )}
                        </button>

                        {isSyllabusOpen && (
                          <div className="mt-2 p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs text-slate-600 animate-in fade-in duration-200">
                            {course.syllabus.slice(0, 3).map((mod, mi) => (
                              <div key={mi} className="border-b border-slate-200/60 pb-1.5 last:border-0 last:pb-0">
                                <p className="font-bold text-slate-800 text-[11px]">
                                  {mod.module}
                                </p>
                                <p className="text-[10px] text-slate-500 mt-0.5">
                                  {mod.lessons.length} video lectures & coding exercises
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Bottom Action Footer */}
                <div className="p-5 pt-0">
                  {isEnrolled ? (
                    <Link
                      href={`/lms/classroom?course=${course.slug}`}
                      className="w-full py-2.5 px-4 rounded-xl bg-[#ff5532] hover:bg-[#e04524] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      <span>Continue Video Classroom</span>
                    </Link>
                  ) : (
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[11px] text-slate-400 line-through">
                          ${course.originalPrice || 199}
                        </span>
                        <p className="text-base font-extrabold text-slate-900 leading-tight">
                          ${course.price || 79}
                        </p>
                      </div>
                      <Link
                        href={`/student/payment?course=${course.slug}`}
                        className="py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                      >
                        <CreditCard className="w-3.5 h-3.5 text-amber-400" />
                        <span>Enroll Now</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
