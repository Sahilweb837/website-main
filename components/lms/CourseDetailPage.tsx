"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/context";
import { LMS_COURSES, type LMSCourse } from "@/data/lms-courses";
import { api } from "@/lib/api";
import PaymentCheckoutModal, { type CheckoutCourse } from "@/components/lms/PaymentCheckoutModal";
import {
  CheckCircle2, Clock, BookOpen, Award, Users, Star,
  ShieldCheck, Lock, PlayCircle, ArrowRight, Sparkles,
  Zap, Laptop, FileText, HelpCircle, ChevronDown, ChevronUp,
} from "lucide-react";

interface CourseDetailPageProps {
  slug: string;
}

export default function CourseDetailPage({ slug }: CourseDetailPageProps) {
  const router = useRouter();
  const { user, isAuthenticated, isAuthLoaded, isEnrolled, enrollCourse, loginAsDemo } = useAuth();
  const [dynamicCourse, setDynamicCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "curriculum" | "instructor" | "faq">("overview");
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);

  // Fetch course details from Laravel API with fallback
  useEffect(() => {
    let isMounted = true;
    async function fetchCourse() {
      setIsLoading(true);
      try {
        const res = await api.getCourseBySlug(slug);
        if (isMounted && res && res.data) {
          setDynamicCourse(res.data);
        }
      } catch (err) {
        console.warn("[CourseDetail] API fallback:", err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchCourse();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  // Merge dynamic course with fallback
  const course = useMemo(() => {
    const fallback = LMS_COURSES.find((c) => c.slug === slug) || LMS_COURSES[0];
    if (dynamicCourse) {
      return {
        slug: dynamicCourse.slug || fallback.slug,
        title: dynamicCourse.title || fallback.title,
        category: dynamicCourse.category || fallback.category || "Full Stack",
        price: Number(dynamicCourse.price ?? dynamicCourse.fee ?? fallback.price ?? 79),
        originalPrice: Number(dynamicCourse.originalPrice ?? dynamicCourse.original_price ?? fallback.originalPrice ?? 199),
        rating: dynamicCourse.rating || fallback.rating || 4.9,
        ratingCount: dynamicCourse.ratingCount || dynamicCourse.reviews_count || fallback.ratingCount || 3420,
        duration: dynamicCourse.duration || fallback.duration || "40 hrs • 12 Projects",
        level: dynamicCourse.level || fallback.level || "Intermediate to Advanced",
        badge: dynamicCourse.badge || fallback.badge || "Best Seller",
        image: dynamicCourse.image || fallback.image || "/images/full-stact-development.png",
        instructor: dynamicCourse.instructor || fallback.instructor || "Netcoder Senior Faculty & Mentors",
        instructorAvatar: dynamicCourse.instructorAvatar || dynamicCourse.instructor_avatar || fallback.instructorAvatar,
        overview: dynamicCourse.overview || fallback.overview || "Master this technology through hands-on labs and client-ready projects.",
        syllabus: dynamicCourse.syllabus || fallback.syllabus || [
          { module: "Module 1: Foundations & Architecture", lessons: ["Environment Setup & Tooling", "Core Language Fundamentals", "Architectural Patterns"] },
          { module: "Module 2: Deep Dive & Live Labs", lessons: ["State & Data Management", "API Integrations & Pipelines", "Security & Error Handling"] },
          { module: "Module 3: Capstone Deployment & Audits", lessons: ["Performance Tuning", "Production Deployment", "Industry Code Review"] },
        ],
      };
    }
    return fallback;
  }, [slug, dynamicCourse]);

  const enrolled = isEnrolled(slug);

  const checkoutCourseData: CheckoutCourse = useMemo(() => ({
    slug: course.slug,
    title: course.title,
    price: course.price,
    originalPrice: course.originalPrice,
    image: course.image,
    instructor: course.instructor,
    duration: course.duration,
    level: course.level,
  }), [course]);

  const handleEnrollClick = () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/lms/courses/${slug}`);
      return;
    }
    setShowCheckoutModal(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#0f172a] font-sans selection:bg-[#ff5532]/20 selection:text-[#ff5532]" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
      
      {/* ─── BREADCRUMBS & TOP BAR ─── */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-[#ff5532] transition">Home</Link>
            <span>/</span>
            <Link href="/lms/explore" className="hover:text-[#ff5532] transition">LMS Catalog</Link>
            <span>/</span>
            <span className="text-slate-800 font-bold truncate max-w-[200px] sm:max-w-md">{course.title}</span>
          </div>
          <span className="hidden sm:inline-flex items-center gap-1.5 text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full text-[11px]">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Live Enrollments Open
          </span>
        </div>
      </div>

      {/* ─── HERO SECTION ─── */}
      <section className="bg-gradient-to-b from-white via-orange-50/20 to-slate-50 border-b border-slate-200 py-10 lg:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* Left Details */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-[#ff5532] text-white shadow-sm">
                  {course.badge || "Featured Track"}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 capitalize">
                  {course.category}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200">
                  {course.level}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0f172a] tracking-tight leading-[1.18]">
                {course.title}
              </h1>

              {/* Subtitle / Overview */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
                {course.overview}
              </p>

              {/* Social Proof & Metrics */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600 pt-2 border-t border-slate-200/80">
                <div className="flex items-center gap-1.5 text-amber-500 font-black">
                  <Star size={18} fill="currentColor" />
                  <span className="text-[#0f172a] font-bold text-base">{course.rating}</span>
                  <span className="text-slate-400 font-normal">({course.ratingCount.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-[#ff5532]" />
                  <span><strong>{course.ratingCount + 480}</strong> Students Enrolled</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-[#ff5532]" />
                  <span>{course.duration}</span>
                </div>
              </div>

              {/* Instructor snippet */}
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {course.instructor.charAt(0)}
                </div>
                <div className="text-xs">
                  <span className="text-slate-400 uppercase tracking-wider font-semibold">Taught by</span>
                  <div className="font-extrabold text-sm text-[#0f172a]">{course.instructor}</div>
                </div>
              </div>

            </div>

            {/* Right Sticky Purchase / Action Card */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xl shadow-slate-200/60 space-y-6">
                
                {/* Thumbnail Preview */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-900 group">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.currentTarget.src = "/images/full-stact-development.png"; }}
                  />
                  <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center group-hover:bg-slate-950/40 transition">
                    <div className="w-12 h-12 rounded-full bg-[#ff5532] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition">
                      <PlayCircle size={28} />
                    </div>
                  </div>
                </div>

                {/* Price Display */}
                <div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-[#0f172a]">${course.price}</span>
                    <span className="text-base text-slate-400 line-through">${course.originalPrice}</span>
                    <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">
                      60% OFF
                    </span>
                  </div>
                  <p className="text-xs text-rose-500 font-semibold mt-1">
                    ⏳ Limited Seats: Early bird pricing ends this week
                  </p>
                </div>

                {/* Main Action Button */}
                <div>
                  {enrolled ? (
                    <div className="space-y-3">
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-bold flex items-center gap-2">
                        <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
                        <span>You are enrolled! Classroom access is unlocked.</span>
                      </div>
                      <Link
                        href={`/lms/classroom/${course.slug}`}
                        className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition transform hover:-translate-y-0.5"
                      >
                        <PlayCircle size={18} /> Resume in Classroom →
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <button
                        type="button"
                        onClick={handleEnrollClick}
                        className="w-full py-4 rounded-2xl bg-[#ff5532] hover:bg-[#e04422] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-xl shadow-[#ff5532]/30 hover:shadow-2xl transition transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
                      >
                        <Zap size={18} /> Enroll Now &amp; Unlock (${course.price}) →
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          loginAsDemo(`/lms/classroom/${slug}`);
                        }}
                        className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-2 transition"
                      >
                        ⚡ Try Demo Student Access
                      </button>
                    </div>
                  )}
                </div>

                {/* Guarantees Checklist */}
                <div className="pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-600">
                  <div className="font-bold text-[#0f172a] text-[13px] mb-2">This course includes:</div>
                  <div className="flex items-center gap-2.5">
                    <Laptop size={15} className="text-[#ff5532]" />
                    <span>{course.duration} on-demand video modules</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <BookOpen size={15} className="text-[#ff5532]" />
                    <span>18 Production labs &amp; portfolio projects</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <Award size={15} className="text-[#ff5532]" />
                    <span>Industry-recognized verifiable certificate</span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <ShieldCheck size={15} className="text-[#ff5532]" />
                    <span>Full lifetime access with future updates</span>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── COURSE CONTENT TABS ─── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          <div className="lg:col-span-8 space-y-12">
            
            {/* Tab Navigation */}
            <div className="flex items-center gap-4 border-b border-slate-200 pb-3">
              {(["overview", "curriculum", "instructor", "faq"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`text-sm font-bold capitalize pb-2 border-b-2 transition cursor-pointer ${
                    activeTab === tab
                      ? "border-[#ff5532] text-[#ff5532]"
                      : "border-transparent text-slate-500 hover:text-[#0f172a]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* TAB 1: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-8 animate-in fade-in duration-200">
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                  <h3 className="text-xl font-extrabold text-[#0f172a]">What You&apos;ll Master</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "End-to-end production architecture and deployment pipelines",
                      "Hands-on development using industry-standard tooling & frameworks",
                      "Real client projects suitable for high-tier portfolio showcase",
                      "1-on-1 code reviews and architectural audits from senior faculty",
                      "Preparation for technical interviews and system design rounds",
                      "Verifiable credential recognized by tech companies across India & globally",
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm text-slate-700 leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-xl font-extrabold text-[#0f172a]">Course Prerequisites</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm text-slate-600">
                    <li>Basic computer literacy and enthusiasm to build software or digital assets.</li>
                    <li>No mandatory prior programming experience required for beginner tracks.</li>
                    <li>Laptop or desktop with minimum 8GB RAM recommended for cloud labs.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* TAB 2: CURRICULUM */}
            {activeTab === "curriculum" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-extrabold text-[#0f172a]">Curriculum &amp; Syllabus</h3>
                    <p className="text-xs text-slate-500 mt-1">{course.syllabus.length} comprehensive learning modules</p>
                  </div>
                  <span className="text-xs font-bold text-slate-500">
                    {enrolled ? "🔓 Full Access Unlocked" : "🔒 Enrolled Students Only"}
                  </span>
                </div>

                {course.syllabus.map((mod: any, idx: number) => {
                  const isOpen = openModuleIndex === idx;
                  const moduleTitle = mod.module || mod.title || `Module ${idx + 1}`;
                  const lessonList: string[] = mod.lessons || [
                    "Core Fundamentals & Concepts",
                    "Deep Dive Implementation",
                    "Practical Assignment & Lab",
                  ];

                  return (
                    <div key={idx} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                      <button
                        type="button"
                        onClick={() => setOpenModuleIndex(isOpen ? null : idx)}
                        className="w-full px-6 py-4 flex items-center justify-between bg-slate-50/70 hover:bg-slate-100/70 transition text-left cursor-pointer"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-[#ff5532]/10 text-[#ff5532] text-xs font-extrabold flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="text-sm font-extrabold text-[#0f172a]">{moduleTitle}</span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 font-semibold">
                          <span>{lessonList.length} Lessons</span>
                          {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="p-4 sm:p-6 divide-y divide-slate-100">
                          {lessonList.map((les, lIdx) => (
                            <div key={lIdx} className="py-2.5 flex items-center justify-between text-xs text-slate-700">
                              <div className="flex items-center gap-3">
                                {enrolled || (idx === 0 && lIdx === 0) ? (
                                  <PlayCircle size={16} className="text-emerald-600 shrink-0" />
                                ) : (
                                  <Lock size={15} className="text-slate-400 shrink-0" />
                                )}
                                <span className={enrolled || (idx === 0 && lIdx === 0) ? "font-semibold text-slate-900" : ""}>
                                  {les}
                                </span>
                              </div>
                              <span className="text-slate-400 font-mono">25 mins</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* TAB 3: INSTRUCTOR */}
            {activeTab === "instructor" && (
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6 animate-in fade-in duration-200">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 text-white flex items-center justify-center font-bold text-2xl">
                    {course.instructor.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-extrabold text-[#0f172a]">{course.instructor}</h3>
                    <p className="text-xs text-[#ff5532] font-bold">Principal Instructor &amp; Industry Mentor</p>
                    <p className="text-xs text-slate-500 mt-0.5">10+ Years Experience • Netcoder Technology</p>
                  </div>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Our instructors are seasoned software engineers, creative directors, and industry consultants who have built scalable backends, high-impact consumer UI, and distributed cloud systems. Every lesson focuses on production realities rather than purely theoretical academic examples.
                </p>
              </div>
            )}

            {/* TAB 4: FAQ */}
            {activeTab === "faq" && (
              <div className="space-y-4 animate-in fade-in duration-200">
                {[
                  { q: "How do I access the classroom after paying?", a: "Immediately upon checkout verification, this course is activated in your account. You can click 'Enter Classroom' to start learning right away." },
                  { q: "Is the certificate verifiable?", a: "Yes, every graduate receives an on-chain digital certificate with a unique verification code that can be added to LinkedIn and resumes." },
                  { q: "Can I ask doubts if I get stuck?", a: "Yes, our classroom includes an interactive doubt panel where mentors respond directly to your technical and conceptual questions." },
                  { q: "What if I miss a live lab?", a: "All video recordings, code sandboxes, and assignments remain accessible forever in your student dashboard." },
                ].map((faq, i) => (
                  <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
                    <h4 className="font-bold text-sm text-[#0f172a] mb-2">{faq.q}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Right Column Additional Trust Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h4 className="text-sm font-extrabold text-[#0f172a] flex items-center gap-2">
                <Sparkles size={16} className="text-[#ff5532]" /> Netcoder Guarantee
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                Join over 35,000 learners who have leveled up their technical careers through our mentorship-first curriculum.
              </p>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span>Placement Assistance</span>
                <span className="font-bold text-emerald-600">Included</span>
              </div>
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span>Live Mentorship</span>
                <span className="font-bold text-emerald-600">1-on-1 Sessions</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Payment Checkout Modal */}
      <PaymentCheckoutModal
        course={checkoutCourseData}
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
      />

    </div>
  );
}
