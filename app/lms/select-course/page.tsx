"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth/context";
import { api } from "@/lib/api";
import { LMS_COURSES, type LMSCourse } from "@/data/lms-courses";
import PaymentCheckoutModal, { type CheckoutCourse } from "@/components/lms/PaymentCheckoutModal";
import {
  Sparkles,
  CheckCircle2,
  Lock,
  ArrowRight,
  Search,
  BookOpen,
  Clock,
  Award,
  ShieldCheck,
  Star,
  Users,
  Compass,
  Zap,
} from "lucide-react";

type CourseCardData = {
  id: string | number;
  slug: string;
  title: string;
  category?: string;
  duration?: string;
  level?: string;
  overview?: string;
  price: number;
  originalPrice: number;
  image?: string;
  instructor?: string;
  rating?: number;
  ratingCount?: number;
  badge?: string;
  highlights?: string[];
};

function SelectCourseContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isAuthenticated, isAuthLoaded, enrolledCourses } = useAuth();

  const [courses, setCourses] = useState<CourseCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeCheckoutCourse, setActiveCheckoutCourse] = useState<CheckoutCourse | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Check if a course was pre-selected in URL param (e.g. ?course=nextjs-fullstack)
  useEffect(() => {
    const preCourse = searchParams.get("course");
    if (preCourse && courses.length > 0) {
      const match = courses.find(
        (c) => c.slug.toLowerCase() === preCourse.toLowerCase()
      );
      if (match) {
        handleSelectCourse(match);
      }
    }
  }, [searchParams, courses]);

  // Fetch courses from Laravel REST API / local Next.js API
  useEffect(() => {
    let isMounted = true;
    async function loadCourses() {
      try {
        setLoading(true);
        const res = await api.getCourses();
        if (isMounted && res && res.data && Array.isArray(res.data) && res.data.length > 0) {
          const mapped: CourseCardData[] = res.data.map((c: any) => ({
            id: c.id || c.slug,
            slug: c.slug,
            title: c.title,
            category: c.category || "fullstack",
            duration: c.duration || c.hours || "40 hrs",
            level: c.level || "Intermediate",
            overview: c.overview || "",
            price: Number(c.price ?? c.fee ?? 79),
            originalPrice: Number(c.originalPrice ?? c.original_price ?? 180),
            image: c.image || "/images/full-stact-development.png",
            instructor: c.instructor || "Netcoder Senior Faculty",
            rating: Number(c.rating ?? 4.95),
            ratingCount: Number(c.ratingCount ?? c.reviews_count ?? 120),
            badge: c.badge || "Featured Track",
            highlights: c.highlights || [
              "Industry Capstone Projects",
              "1-on-1 Mentor Code Reviews",
              "Verified Certificate of Mastery",
            ],
          }));
          setCourses(mapped);
          return;
        }
      } catch (err) {
        console.warn("Could not load from API, falling back to LMS catalog:", err);
      }

      // Fallback to local LMS_COURSES
      if (isMounted) {
        const fallbackList: CourseCardData[] = LMS_COURSES.map((c: any) => ({
          id: c.id || c.slug,
          slug: c.slug,
          title: c.title,
          category: c.category || "fullstack",
          duration: c.duration || "40 hrs",
          level: c.level || "Intermediate",
          overview: c.overview || "",
          price: c.price || 79,
          originalPrice: c.originalPrice || 180,
          image: c.image || "/images/full-stact-development.png",
          instructor: c.instructor || "Netcoder Senior Faculty",
          rating: c.rating || 4.95,
          ratingCount: c.ratingCount || 120,
          badge: c.badge || "Popular",
          highlights: c.highlights || [
            "Real Client Projects",
            "Job Placement Assistance",
            "Verified Certificate",
          ],
        }));
        setCourses(fallbackList);
      }
    }

    loadCourses().finally(() => {
      if (isMounted) setLoading(false);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectCourse = (course: CourseCardData) => {
    const checkoutItem: CheckoutCourse = {
      slug: course.slug,
      title: course.title,
      price: course.price,
      originalPrice: course.originalPrice,
      duration: course.duration,
      level: course.level,
      image: course.image,
      instructor: course.instructor,
    };
    setActiveCheckoutCourse(checkoutItem);
    setIsCheckoutOpen(true);
  };

  const categories = [
    { id: "all", label: "All Career Tracks" },
    { id: "fullstack", label: "Full-Stack Development" },
    { id: "cloud", label: "Cloud & DevOps" },
    { id: "ai", label: "AI & Machine Learning" },
    { id: "cyber", label: "Cyber Security" },
  ];

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchCat =
        selectedCategory === "all" ||
        (c.category && c.category.toLowerCase().includes(selectedCategory.toLowerCase()));
      const q = searchQuery.toLowerCase();
      const matchQuery =
        !searchQuery ||
        c.title.toLowerCase().includes(q) ||
        (c.overview && c.overview.toLowerCase().includes(q));
      return matchCat && matchQuery;
    });
  }, [courses, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-[#f8fafc] font-sans antialiased pb-24 selection:bg-[#ff5532] selection:text-white">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-[#ff5532]/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 right-10 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top Breadcrumb & User status */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-6 mb-8">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 text-slate-400 hover:text-white text-xs font-semibold transition"
            >
              <Compass className="w-4 h-4 text-[#ff5532]" />
              Netcoder Portal
            </Link>
            <span className="text-slate-600">/</span>
            <span className="text-xs font-bold text-[#ff5532] bg-[#ff5532]/10 px-2.5 py-1 rounded-full border border-[#ff5532]/20">
              Track Onboarding Step 1
            </span>
          </div>

          <div className="flex items-center gap-3">
            {isAuthLoaded && user ? (
              <div className="flex items-center gap-3 bg-slate-900/90 border border-slate-800 rounded-full px-4 py-1.5 shadow-inner">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#ff5532] to-amber-500 flex items-center justify-center text-xs font-black text-white">
                  {user.name ? user.name[0].toUpperCase() : "S"}
                </div>
                <div className="text-xs">
                  <span className="font-semibold text-slate-200">
                    {user.name || "Student"}
                  </span>
                  {enrolledCourses.length > 0 && (
                    <span className="ml-2 text-[10px] bg-emerald-500/20 text-emerald-400 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                      {enrolledCourses.length} Enrolled
                    </span>
                  )}
                </div>
                {enrolledCourses.length > 0 && (
                  <Link
                    href="/lms/dashboard"
                    className="text-xs font-bold text-[#ff5532] hover:text-white hover:underline transition ml-1"
                  >
                    Dashboard →
                  </Link>
                )}
              </div>
            ) : (
              <Link
                href="/login"
                className="text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 px-4 py-2 rounded-xl transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>

        {/* Hero Onboarding Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#ff5532]/20 to-orange-500/10 border border-[#ff5532]/30 text-[#ff5532] text-xs font-bold uppercase tracking-wider mb-4 shadow-[0_0_20px_rgba(255,85,50,0.2)]">
            <Sparkles className="w-3.5 h-3.5" />
            Select Your Learning Track
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Choose Your Career Path &amp;{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5532] via-orange-400 to-amber-300">
              Unlock Your Classroom
            </span>
          </h1>
          <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
            Welcome to Netcoder Technology! Select your high-impact specialization below.
            Enrolling unlocks your live terminal workspace, DRM video lessons, mentor code reviews,
            and placement-ready portfolio credentials.
          </p>
        </div>

        {/* Search & Category Filter Pills */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 border border-slate-800/80 p-3 sm:p-4 rounded-2xl backdrop-blur-xl mb-10 shadow-2xl">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#ff5532] text-white shadow-lg shadow-[#ff5532]/30 scale-[1.02]"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tracks, skills, tech..."
              className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff5532] transition"
            />
          </div>
        </div>

        {/* Courses Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6 h-96 animate-pulse flex flex-col justify-between"
              >
                <div className="w-full h-44 bg-slate-800 rounded-2xl" />
                <div className="space-y-3 mt-4">
                  <div className="h-4 bg-slate-800 rounded w-3/4" />
                  <div className="h-3 bg-slate-800 rounded w-full" />
                  <div className="h-3 bg-slate-800 rounded w-2/3" />
                </div>
                <div className="h-10 bg-slate-800 rounded-xl mt-4" />
              </div>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/30 border border-slate-800 rounded-3xl">
            <BookOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white">No Learning Tracks Found</h3>
            <p className="text-xs text-slate-400 mt-1">
              Try adjusting your search query or select "All Career Tracks".
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-800 text-xs font-bold text-slate-200 hover:bg-slate-700 transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCourses.map((c) => {
              const isUserEnrolled = enrolledCourses.includes(c.slug);

              return (
                <div
                  key={c.id}
                  className={`group relative flex flex-col justify-between bg-slate-900/80 border rounded-3xl overflow-hidden backdrop-blur-xl transition-all duration-300 hover:translate-y-[-4px] hover:shadow-2xl ${
                    isUserEnrolled
                      ? "border-emerald-500/40 hover:border-emerald-500/70 hover:shadow-emerald-950/40"
                      : "border-slate-800 hover:border-[#ff5532]/50 hover:shadow-[#ff5532]/10"
                  }`}
                >
                  {/* Card Thumbnail Top */}
                  <div className="relative h-52 w-full overflow-hidden bg-slate-950">
                    <img
                      src={c.image || "/images/full-stact-development.png"}
                      alt={c.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "/images/full-stact-development.png";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/30" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 flex flex-wrap gap-2 items-center">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-black/60 text-white backdrop-blur-md border border-white/10">
                        {c.category}
                      </span>
                      {c.badge && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide bg-[#ff5532] text-white shadow-lg shadow-[#ff5532]/30">
                          {c.badge}
                        </span>
                      )}
                    </div>

                    {/* Enrolled Indicator on Image */}
                    {isUserEnrolled && (
                      <div className="absolute top-3.5 right-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-xs font-black shadow-lg shadow-emerald-500/30">
                        <CheckCircle2 className="w-3.5 h-3.5 text-slate-950" />
                        Unlocked
                      </div>
                    )}

                    {/* Bottom Metadata inside Image */}
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs text-slate-300">
                      <div className="flex items-center gap-1.5 bg-black/50 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                        <Clock className="w-3.5 h-3.5 text-[#ff5532]" />
                        <span className="font-semibold text-[11px]">{c.duration}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-black/50 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="font-bold text-white text-[11px]">{c.rating}</span>
                        <span className="text-[10px] text-slate-400">
                          ({c.ratingCount})
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Body */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#ff5532] transition-colors leading-snug">
                        {c.title}
                      </h3>

                      <p className="mt-2.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {c.overview}
                      </p>

                      {/* Highlights */}
                      <div className="mt-4 space-y-1.5 border-t border-slate-800/80 pt-3">
                        {c.highlights?.slice(0, 3).map((hl, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-2 text-[11px] text-slate-300"
                          >
                            <Zap className="w-3 h-3 text-[#ff5532] shrink-0" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Pricing & CTA */}
                    <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          Full Specialization
                        </div>
                        <div className="flex items-baseline gap-2 mt-0.5">
                          <span className="text-2xl font-black text-white tracking-tight">
                            ${c.price}
                          </span>
                          <span className="text-xs text-slate-500 line-through">
                            ${c.originalPrice}
                          </span>
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                            Save 56%
                          </span>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div>
                        {isUserEnrolled ? (
                          <Link
                            href={`/lms/classroom/${c.slug}`}
                            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all shadow-lg shadow-emerald-500/20"
                          >
                            Open Class
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        ) : (
                          <button
                            onClick={() => handleSelectCourse(c)}
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#ff5532] hover:bg-[#e04422] text-white text-xs font-extrabold transition-all shadow-lg shadow-[#ff5532]/30 hover:scale-[1.03]"
                          >
                            Enroll Track
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Trust Badges Footer */}
        <div className="mt-20 border-t border-slate-800/80 pt-10 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
            <Award className="w-6 h-6 text-[#ff5532] mx-auto mb-2" />
            <h4 className="text-xs font-bold text-white">Verified Certification</h4>
            <p className="text-[11px] text-slate-400 mt-1">
              Accredited Netcoder Industry Diploma
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
            <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
            <h4 className="text-xs font-bold text-white">DRM Security Shield</h4>
            <p className="text-[11px] text-slate-400 mt-1">
              Continuous Anti-Piracy Watermarking
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
            <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
            <h4 className="text-xs font-bold text-white">1-on-1 Mentor Reviews</h4>
            <p className="text-[11px] text-slate-400 mt-1">
              Production Code Inspections
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-slate-900/40 border border-slate-800">
            <Sparkles className="w-6 h-6 text-amber-400 mx-auto mb-2" />
            <h4 className="text-xs font-bold text-white">Placement Support</h4>
            <p className="text-[11px] text-slate-400 mt-1">
              Resume Audits &amp; Mock Technical Interviews
            </p>
          </div>
        </div>
      </div>

      {/* Embedded Payment Modal */}
      <PaymentCheckoutModal
        course={activeCheckoutCourse}
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setActiveCheckoutCourse(null);
        }}
      />
    </div>
  );
}

export default function SelectCoursePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center text-slate-400 text-sm">
          Loading learning pathways...
        </div>
      }
    >
      <SelectCourseContent />
    </Suspense>
  );
}
