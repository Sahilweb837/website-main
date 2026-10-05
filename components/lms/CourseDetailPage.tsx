"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/context";
import { LMS_COURSES, type LMSCourse } from "@/data/lms-courses";
import { api } from "@/lib/api";
import PaymentCheckoutModal, { type CheckoutCourse } from "@/components/lms/PaymentCheckoutModal";
import styles from "./CourseDetailPage.module.css";
import {
  Star,
  Clock,
  Globe,
  Subtitles,
  Award,
  ShieldCheck,
  Play,
  PlayCircle,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  ShoppingCart,
  Zap,
  Tag,
  Share2,
  Lock,
  Tv,
  FileText,
  Download,
  Smartphone,
  Infinity as InfinityIcon,
  X,
  AlertCircle,
  HelpCircle,
  Users,
} from "lucide-react";

interface CourseDetailPageProps {
  slug: string;
}

export default function CourseDetailPage({ slug }: CourseDetailPageProps) {
  const router = useRouter();
  const { user, isAuthenticated, isEnrolled, loginAsDemo } = useAuth();
  const [dynamicCourse, setDynamicCourse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [openSections, setOpenSections] = useState<Record<number, boolean>>({ 0: true, 1: true });
  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string>("MT261005G1");
  const [couponMessage, setCouponMessage] = useState<string>("MT261005G1 is applied");
  const [isInCart, setIsInCart] = useState(false);
  const [purchaseSidebarHost, setPurchaseSidebarHost] = useState<HTMLElement | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);

  // Fetch course details from API with fallback
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

  useEffect(() => {
    const previousOverflowX = document.body.style.overflowX;
    document.body.style.overflowX = "clip";
    return () => {
      document.body.style.overflowX = previousOverflowX;
    };
  }, []);

  // Merge dynamic course with fallback
  const course = useMemo(() => {
    const fallback =
      LMS_COURSES.find((c) => c.slug === slug) ||
      LMS_COURSES.find((c) => c.slug === "the-complete-agentic-ai-engineering-course") ||
      LMS_COURSES[0];

    const base = dynamicCourse
      ? {
          slug: dynamicCourse.slug || fallback.slug,
          title: dynamicCourse.title || fallback.title,
          subtitle: dynamicCourse.subtitle || dynamicCourse.tagline || fallback.subtitle || fallback.tagline,
          category: dynamicCourse.category || fallback.category || "ai",
          price: Number(dynamicCourse.price ?? dynamicCourse.fee ?? fallback.price ?? 459),
          originalPrice: Number(dynamicCourse.originalPrice ?? dynamicCourse.original_price ?? fallback.originalPrice ?? 799),
          rating: Number(dynamicCourse.rating || fallback.rating || 4.7),
          ratingCount: Number(dynamicCourse.ratingCount || dynamicCourse.reviews_count || fallback.ratingCount || 49182),
          learnersCount: Number(dynamicCourse.learnersCount || fallback.learnersCount || 403098),
          duration: dynamicCourse.duration || fallback.duration || "34.5 hrs • 248 lectures",
          level: dynamicCourse.level || fallback.level || "All Levels",
          badge: dynamicCourse.badge || fallback.badge || "Bestseller",
          image: dynamicCourse.image || fallback.image || "/images/full-stact-development.png",
          instructor: dynamicCourse.instructor || fallback.instructor || "Ed Donner, Ligency",
          instructorAvatar: dynamicCourse.instructorAvatar || dynamicCourse.instructor_avatar || fallback.instructorAvatar,
          overview: dynamicCourse.overview || fallback.overview || "Master this technology through hands-on labs and projects.",
          breadcrumbs: dynamicCourse.breadcrumbs || fallback.breadcrumbs || [
            "Development",
            fallback.category === "cloud"
              ? "Cloud & DevOps"
              : fallback.category === "cyber"
              ? "Cyber Security"
              : fallback.category === "systems"
              ? "Data Engineering"
              : fallback.category === "ai"
              ? "Data Science"
              : "Web Development",
            fallback.title.split(":")[0],
          ],
          lastUpdated: dynamicCourse.lastUpdated || fallback.lastUpdated || "9/2026",
          language: dynamicCourse.language || fallback.language || "English",
          subtitles: dynamicCourse.subtitles || fallback.subtitles || "Arabic [Auto], Bulgarian [Auto], 32 more",
          couponCode: dynamicCourse.couponCode || fallback.couponCode || "MT261005G1",
          previewVideoUrl: dynamicCourse.previewVideoUrl || fallback.previewVideoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
          previewVideos: fallback.previewVideos || [
            {
              title: "Course Overview & Learning Roadmap",
              duration: "05:14",
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            },
            {
              title: "Introduction to Model Context Protocol (MCP)",
              duration: "08:42",
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
            },
            {
              title: "Building your First Autonomous Agent",
              duration: "14:20",
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
            },
          ],
          whatYouWillLearn: fallback.whatYouWillLearn || [
            "Build real-world multi-agent architectures using modern agent frameworks & SDKs",
            "Connect LLMs with real tools, APIs, and databases via the Model Context Protocol (MCP)",
            "Design autonomous agent workflows with memory, reflection, planning, and tool orchestration",
            "Deploy production-ready agents with tracing, observability, latency evaluation, and security guardrails",
            "Create deterministic state machines with LangGraph for human-in-the-loop validation",
            "Implement multi-turn autonomous coding agents and conversational customer support systems",
          ],
          requirements: fallback.requirements || [
            "Basic understanding of programming (functions, loops, classes)",
            "Curiosity about artificial intelligence, prompt engineering, and LLMs",
            "No prior machine learning or agentic AI background needed — we start from first principles",
          ],
          description: fallback.description || fallback.overview,
          syllabus: fallback.syllabus || [
            {
              module: "Section 1: Foundations of Agentic AI & The MCP Architecture",
              lessons: [
                "1. Welcome & Complete Agentic AI Roadmap (Preview available)",
                "2. From Simple Prompts to Autonomous Reasoning Loops",
                "3. The Model Context Protocol (MCP) Specification Deep Dive (Preview available)",
                "4. Setting up Environment: Python 3.12, UV, and API Keys",
              ],
            },
            {
              module: "Section 2: Agents SDK & Tool Calling in Practice",
              lessons: [
                "5. Agents SDK Architecture & Core Primitives",
                "6. Function Calling vs Tool Orchestration",
                "7. Building our First Agent with Custom File I/O Tools",
                "8. Error Recovery & Fallback Strategies",
              ],
            },
            {
              module: "Section 3: Multi-Agent Collaborative Systems",
              lessons: [
                "9. Designing Specialized Agent Personas & Goals",
                "10. Sequential vs Hierarchical Delegation Processes",
                "11. Project: Autonomous Market Research & Lead Generation Crew",
                "12. Connecting External MCP Server to Workers",
              ],
            },
            {
              module: "Section 4: State Graphs & Human-in-the-Loop",
              lessons: [
                "13. Nodes, Edges, State Reducers, and Conditional Routing",
                "14. Persisting Agent State with Memory & Checkpointers",
                "15. Implementing Human-in-the-Loop Approval Checkpoints",
                "16. Project: Code Review & Automated GitHub PR Agent",
              ],
            },
            {
              module: "Section 5: Production Deployment, Tracing & Guardrails",
              lessons: [
                "17. Tracing with Langfuse & Arize Phoenix",
                "18. Preventing Infinite Loops and Hallucination Guardrails",
                "19. Dockerizing and Deploying Agents to Cloud Run / Kubernetes",
                "20. Capstone Presentation & Certificate Verification",
              ],
            },
          ],
        }
      : fallback;

    return base;
  }, [slug, dynamicCourse]);

  const enrolled = isEnrolled(course.slug);

  const discountPercent = useMemo(() => {
    if (!course.originalPrice || course.originalPrice <= course.price) return 43;
    return Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100);
  }, [course]);

  const checkoutCourseData: CheckoutCourse = useMemo(
    () => ({
      slug: course.slug,
      title: course.title,
      price: course.price,
      originalPrice: course.originalPrice,
      image: course.image,
      instructor: course.instructor,
      duration: course.duration,
      level: course.level,
    }),
    [course]
  );

  const handleEnrollClick = () => {
    if (!isAuthenticated) {
      router.push(`/login?redirect=/lms/courses/${course.slug}`);
      return;
    }
    setShowCheckoutModal(true);
  };

  const handleAddToCart = () => {
    setIsInCart(true);
    window.dispatchEvent(new CustomEvent("lms:course-cart-count", { detail: 1 }));
  };

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setAppliedCoupon(couponInput.toUpperCase());
    setCouponMessage(`${couponInput.toUpperCase()} is applied`);
    setCouponInput("");
  };

  const toggleSection = (index: number) => {
    setOpenSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleAllSections = () => {
    const allOpen = Object.values(openSections).every(Boolean);
    if (allOpen) {
      setOpenSections({});
    } else {
      const newOpen: Record<number, boolean> = {};
      course.syllabus?.forEach((_, i) => {
        newOpen[i] = true;
      });
      setOpenSections(newOpen);
    }
  };

  const sampleVideos = useMemo(() => {
    if (course.previewVideos && course.previewVideos.length > 0) {
      return course.previewVideos;
    }
    return [
      {
        title: "1. Course Overview & What We Will Build",
        duration: "05:14",
        videoUrl: course.previewVideoUrl || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      },
      {
        title: "2. Architecture & Model Context Protocol (MCP)",
        duration: "08:42",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      },
      {
        title: "3. Tool Calling & First Live Agent Demo",
        duration: "14:20",
        videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      },
    ];
  }, [course]);

  const activeVideo = sampleVideos[currentVideoIndex] || sampleVideos[0];

  const handlePlayPreview = (index = 0) => {
    setCurrentVideoIndex(index);
    setShowVideoModal(true);
    setIsPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }, 100);
  };

  return (
    <div className={`${styles.coursePage} min-h-screen bg-[#ffffff] text-[#1c1d1f] font-sans antialiased selection:bg-[#ff5532]/20 selection:text-[#c63c22]`}>
      <div className={`${styles.pageGrid} max-w-[1340px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-x-8 lg:gap-x-12`}>
      {/* ─── TOP DARK HERO SECTION (UDEMY SIGNATURE #1c1d1f) ─── */}
        <header className={`${styles.hero} lg:col-span-12 lg:col-start-1 lg:row-start-1 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-[#1c1d1f] text-[#ffffff] py-8 sm:py-10 lg:py-12 border-b border-[#2d2f31]`}>
          <div className={`${styles.heroInner} lg:w-2/3 space-y-5 sm:space-y-6`}>
            
            {/* Left 8 Columns: Breadcrumbs, Title, Subtitle, Badges, Social Proof, Stats Ribbon */}
            <div className={styles.heroContent}>
              
              {/* Breadcrumb Navigation */}
              <nav aria-label="Breadcrumbs" className="flex items-center flex-wrap gap-2 text-xs font-semibold text-[#ffb199]">
                {course.breadcrumbs?.map((crumb: string, idx: number) => (
                  <React.Fragment key={idx}>
                    <Link
                      href={idx === 0 ? "/lms/select-course" : `/lms/select-course?category=${course.category}`}
                      className="hover:text-white hover:underline transition"
                    >
                      {crumb}
                    </Link>
                    {idx < (course.breadcrumbs?.length || 0) - 1 && (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                    )}
                  </React.Fragment>
                ))}
              </nav>

              {/* Course Title */}
              <h1 className={`${styles.heroTitle} max-w-4xl text-3xl sm:text-4xl lg:text-[42px] font-bold text-white leading-[1.15]`}>
                {course.title}
              </h1>

              {/* Subtitle / Tagline */}
              <p className={`${styles.heroSubtitle} text-base sm:text-lg text-[#d1d7dc] leading-relaxed max-w-3xl`}>
                {course.subtitle || course.overview}
              </p>

              {/* Badge & Social Proof Row */}
              <div className="flex items-center flex-wrap gap-3 pt-1 text-sm">
                {/* Bestseller Badge */}
                {course.badge && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-xs text-xs font-black uppercase tracking-wider bg-[#eceb98] text-[#2d2f31]">
                    {course.badge}
                  </span>
                )}

                {/* Rating */}
                <div className="flex items-center gap-1.5 font-bold text-[#f69c08]">
                  <span>{course.rating.toFixed(1)}</span>
                  <div className="flex items-center text-[#f69c08]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#f69c08]" />
                    ))}
                  </div>
                  <a href="#reviews" className="text-[#ffb199] hover:underline font-normal text-xs sm:text-sm">
                    ({course.ratingCount.toLocaleString()} ratings)
                  </a>
                </div>

                <span className="text-white text-xs sm:text-sm font-normal">
                  {(course.learnersCount || 403098).toLocaleString()} learners
                </span>
              </div>

              {/* Instructor Line */}
              <div className="text-xs sm:text-sm text-slate-300">
                Created by{" "}
                <a href="#instructor" className="text-[#ffb199] hover:underline font-medium">
                  {course.instructor}
                </a>
              </div>

              {/* Meta Info Line */}
              <div className="flex items-center flex-wrap gap-x-5 gap-y-2 text-xs text-slate-300 pt-1">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Last updated {course.lastUpdated}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span>{course.language}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Subtitles className="w-3.5 h-3.5 text-slate-400" />
                  <span className="truncate max-w-[280px] sm:max-w-md">{course.subtitles}</span>
                </div>
              </div>

              {/* ─── Premium / Personal Plan Stats Strip (Exact Match to User Screenshot) ─── */}
              <div className="pt-4">
                <div className={`${styles.planCard} bg-[#ffffff] text-[#1c1d1f] rounded-lg border border-slate-200 shadow-md p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4`}>
                  {/* Left Column: Premium box */}
                  <div className="flex items-center gap-3 w-full md:w-auto">
                    <div className="bg-[#ff5532] text-white px-3 py-2 rounded-md font-bold text-xs flex flex-col items-center justify-center shrink-0 shadow-sm">
                      <Zap className="w-4 h-4 mb-0.5 text-amber-300" />
                      <span>Premium</span>
                    </div>
                    <div className="text-xs sm:text-sm text-slate-700">
                      Access 28,000+ top-rated courses with Netcoder{" "}
                      <span className="text-[#ff5532] font-bold hover:underline cursor-pointer">
                        Personal Plan.
                      </span>
                    </div>
                  </div>

                  {/* Middle Column: Rating */}
                  <div className={`${styles.planStats} flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-6 text-center`}>
                    <div>
                      <div className="text-lg font-black text-[#1c1d1f] flex items-center justify-center gap-1">
                        <span>{course.rating.toFixed(1)}</span>
                        <div className="flex items-center text-[#f69c08]">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[#f69c08]" />
                          ))}
                        </div>
                      </div>
                      <div className="text-[11px] text-[#ff5532] hover:underline cursor-pointer">
                        {course.ratingCount.toLocaleString()} ratings
                      </div>
                    </div>

                    {/* Right Column: Learners */}
                    <div>
                      <div className="text-lg font-black text-[#1c1d1f]">
                        {(course.learnersCount || 403098).toLocaleString()}
                      </div>
                      <div className="text-[11px] text-slate-500 font-medium">learners</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right 4 Columns: Sticky Purchase & Video Card Placeholder for Desktop alignment */}
            {purchaseSidebarHost && createPortal(
              <div className={`${styles.purchaseCard} sticky top-20 z-30 bg-[#ffffff] text-[#1c1d1f] rounded-xl border border-slate-200 shadow-xl`}>
                
                {/* Video Preview Thumbnail Area */}
                <div
                  onClick={() => handlePlayPreview(0)}
                  className={`${styles.previewImage} relative aspect-[2/1] w-full rounded-t-xl bg-slate-900 cursor-pointer group overflow-hidden`}
                >
                  <img
                    src={course.image || "/images/full-stact-development.png"}
                    alt={course.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "/images/full-stact-development.png";
                    }}
                  />
                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20 group-hover:bg-black/50 transition-colors" />

                  {/* Play Button & "Preview this course" label */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-white text-[#1c1d1f] flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play className="w-7 h-7 fill-[#1c1d1f] ml-1" />
                    </div>
                    <span className="text-sm font-extrabold text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wide">
                      Preview this course
                    </span>
                  </div>
                </div>

                {/* Card Content & Pricing Section */}
                <div className={`${styles.purchaseBody} p-4 sm:p-5 space-y-4`}>
                  
                  {/* Radio option: Buy individual course */}
                  <div className={styles.purchaseOption}>
                    <div className="w-5 h-5 rounded-full border-2 border-[#ff5532] flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5532]" />
                    </div>
                    <span className="whitespace-nowrap text-xs font-extrabold text-[#1c1d1f]">Buy individual course</span>
                  </div>

                  {/* Price display: ₹459.00  ₹799.00  43% off */}
                  <div>
                    <div className="flex items-baseline gap-2.5 flex-wrap">
                      <span className="text-3xl font-extrabold text-[#1c1d1f] tracking-tight">
                        ₹{course.price.toLocaleString("en-IN")}.00
                      </span>
                      <span className="text-base text-slate-500 line-through">
                        ₹{course.originalPrice.toLocaleString("en-IN")}.00
                      </span>
                      <span className="text-sm font-bold text-[#1c1d1f]">
                        {discountPercent}% off
                      </span>
                    </div>

                    {/* Urgency indicator: 2 days left at this price! */}
                    <p className="flex items-center gap-1.5 text-xs font-bold text-[#b32d0f] mt-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>2 days left at this price!</span>
                    </p>
                  </div>

                  {/* Guarantees */}
                  <div className={`${styles.guarantees} space-y-1.5 text-xs text-[#2d2f31] pt-1`}>
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-slate-700 shrink-0" />
                      <span>30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <InfinityIcon className="w-4 h-4 text-slate-700 shrink-0" />
                      <span>Full lifetime access</span>
                    </div>
                  </div>

                  {/* Action CTA Buttons */}
                  <div className={`${styles.purchaseActions} space-y-2.5 pt-2`}>
                    {enrolled ? (
                      <div className="space-y-2">
                        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-md text-emerald-800 text-xs font-bold flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>You are enrolled! Classroom access is ready.</span>
                        </div>
                        <Link
                          href={`/lms/classroom/${course.slug}`}
                          className={`${styles.primaryAction} w-full min-h-12 px-2 sm:px-5 py-3.5 rounded-md bg-[#10b981] hover:bg-[#059669] text-white font-extrabold text-sm flex items-center justify-center gap-2 whitespace-nowrap transition`}
                        >
                          <PlayCircle className="w-5 h-5 shrink-0" /> Go to course
                        </Link>
                      </div>
                    ) : (
                      <>
                        {/* Go to Cart / Add to Cart */}
                        <button
                          type="button"
                          onClick={handleAddToCart}
                          className={`${styles.primaryAction} w-full min-h-12 px-2 sm:px-5 py-3.5 rounded-md bg-[#ff5532] hover:bg-[#e64020] text-white font-bold text-sm flex items-center justify-center gap-2 whitespace-nowrap shadow-sm transition active:scale-[0.99] cursor-pointer`}
                        >
                          <ShoppingCart className="w-4 h-4 shrink-0" />
                          {isInCart ? "Go to cart" : "Add to cart"}
                        </button>

                        {/* Buy Now Button */}
                        <button
                          type="button"
                          onClick={handleEnrollClick}
                          className={`${styles.secondaryAction} w-full min-h-12 px-2 sm:px-5 py-3.5 rounded-md bg-white hover:bg-orange-50 text-[#1c1d1f] border border-[#ff5532] font-bold text-sm flex items-center justify-center gap-2 whitespace-nowrap transition cursor-pointer`}
                        >
                          Buy now
                        </button>

                        {/* Demo Student Mode */}
                        <button
                          type="button"
                          onClick={() => loginAsDemo(`/lms/classroom/${course.slug}`)}
                          className={`${styles.demoAction} w-full min-h-10 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-[#e64020] hover:bg-orange-50 rounded transition flex items-center justify-center gap-1.5`}
                        >
                          <Zap className="w-3.5 h-3.5 text-amber-500" />
                          <span>Try Instant Demo Student Mode</span>
                        </button>
                      </>
                    )}
                  </div>

                  {/* Coupon Code Section */}
                  <div className={`${styles.couponSection} pt-3 border-t border-slate-200 space-y-2`}>
                    {appliedCoupon ? (
                      <div className="flex items-center justify-between text-xs bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5">
                        <div className="flex items-center gap-1.5 text-emerald-700 font-bold">
                          <Check className="w-3.5 h-3.5" />
                          <span>{couponMessage}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setAppliedCoupon("")}
                          className="text-slate-400 hover:text-slate-700"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <form onSubmit={handleApplyCoupon} className="flex gap-2">
                        <input
                          type="text"
                          value={couponInput}
                          onChange={(e) => setCouponInput(e.target.value)}
                          placeholder="Enter Coupon"
                          className={`${styles.couponInput} flex-1 px-3 py-1.5 text-xs border border-slate-300 rounded focus:outline-none focus:border-[#ff5532]`}
                        />
                        <button
                          type="submit"
                          className={`${styles.couponButton} min-h-10 px-4 py-2 text-xs font-bold bg-[#ff5532] hover:bg-[#e64020] text-white rounded transition`}
                        >
                          Apply
                        </button>
                      </form>
                    )}
                  </div>

                </div>

              </div>,
              purchaseSidebarHost
            )}

          </div>
      </header>

      <aside
        ref={setPurchaseSidebarHost}
        className={`${styles.purchaseColumn} lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:row-span-2`}
        aria-label="Course enrollment and pricing"
      />

      {/* ─── BELOW HERO MAIN CONTENT (LEFT 8 COLS, ACCORDIONS, INSTRUCTOR) ─── */}
        <main className={`${styles.courseMain} lg:col-span-8 lg:col-start-1 lg:row-start-2 py-8 sm:py-12`}>
          <div className={`${styles.contentStack} space-y-10 sm:space-y-12`}>
            
            {/* ── Section: What you'll learn (Udemy Signature Box) ── */}
            <section className={`${styles.learnSection} bg-white border border-slate-300 rounded-sm p-6 sm:p-7 space-y-4`}>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1c1d1f]">
                What you&apos;ll learn
              </h2>
              <div className={`${styles.learnGrid} grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-1`}>
                {course.whatYouWillLearn?.map((item: string, i: number) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-4 h-4 text-[#1c1d1f] shrink-0 mt-1" />
                    <span className="text-sm text-[#2d2f31] leading-6">{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className={`${styles.courseSection} space-y-4 border-t border-slate-200 pt-8`}>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1c1d1f]">This course includes</h2>
              <div className={`${styles.includesGrid} grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm text-[#2d2f31]`}>
                <div className="flex items-start gap-3">
                  <Tv className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <span>34.5 hours on-demand video</span>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <span>12 coding exercises and live sandbox labs</span>
                </div>
                <div className="flex items-start gap-3">
                  <Download className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <span>24 articles and 150 downloadable resources</span>
                </div>
                <div className="flex items-start gap-3">
                  <Smartphone className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <span>Access on mobile and TV</span>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-4 h-4 text-slate-700 shrink-0 mt-0.5" />
                  <span>Certificate of completion</span>
                </div>
              </div>
            </section>

            {/* ── Explore Related Topics ── */}
            <div className={`${styles.courseSection} space-y-3`}>
              <h3 className="text-base font-bold text-[#1c1d1f]">Explore related topics</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "AI Agents",
                  "OpenAI Agents SDK",
                  "Model Context Protocol (MCP)",
                  "LangGraph",
                  "CrewAI",
                  "Python",
                  "Generative AI",
                ].map((tag) => (
                  <span
                    key={tag}
                    className={`${styles.topicChip} px-3.5 py-1.5 rounded-full border border-[#1c1d1f] text-xs font-bold text-[#1c1d1f] hover:bg-slate-100 transition cursor-pointer`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Section: Course Content / Curriculum ── */}
            <section className={`${styles.courseSection} space-y-4 border-t border-slate-200 pt-8`}>
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-bold text-[#1c1d1f]">
                  Course content
                </h2>
                <div className={`${styles.courseSummary} flex items-center justify-between text-xs sm:text-sm text-[#2d2f31] pt-1`}>
                  <span>
                    {course.syllabus?.length || 5} sections • 20 lectures • 34h 42m total length
                  </span>
                  <button
                    type="button"
                    onClick={toggleAllSections}
                    className="min-h-10 px-2 text-left text-[#ff5532] font-bold hover:text-[#e64020] transition"
                  >
                    {Object.values(openSections).every(Boolean) ? "Collapse all sections" : "Expand all sections"}
                  </button>
                </div>
              </div>

              {/* Curriculum Accordion */}
              <div className="border border-slate-300 rounded-sm divide-y divide-slate-200">
                {course.syllabus?.map((sec: any, secIdx: number) => {
                  const isOpen = Boolean(openSections[secIdx]);
                  const lessons = sec.lessons || [];

                  return (
                    <div key={secIdx} className="bg-white">
                      <button
                        type="button"
                        onClick={() => toggleSection(secIdx)}
                        className={`${styles.accordionHeader} w-full px-4 sm:px-5 py-4 flex items-center justify-between gap-3 bg-[#f7f9fa] hover:bg-slate-100 transition text-left cursor-pointer`}
                      >
                        <div className="flex items-center gap-3">
                          {isOpen ? (
                            <ChevronUp className="w-4 h-4 text-slate-700" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-700" />
                          )}
                          <span className="text-sm font-bold text-[#1c1d1f]">
                            {sec.module}
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 font-normal">
                          {lessons.length} lectures • 45m
                        </div>
                      </button>

                      {isOpen && (
                        <div className="divide-y divide-slate-100 bg-white">
                          {lessons.map((les: string, lIdx: number) => {
                            const isPreviewable = lIdx === 0 || les.includes("Preview");
                            return (
                              <div
                                key={lIdx}
                                className={`${styles.lessonRow} px-4 sm:px-5 py-3 flex items-center justify-between gap-3 text-sm text-[#2d2f31]`}
                              >
                                <div className="flex items-center gap-3">
                                  <PlayCircle className="w-4 h-4 text-slate-500 shrink-0" />
                                  <span className="hover:text-[#ff5532] cursor-pointer">
                                    {les}
                                  </span>
                                </div>
                                <div className="flex items-center gap-4 text-xs">
                                  {isPreviewable && (
                                    <button
                                      type="button"
                                      onClick={() => handlePlayPreview(secIdx % sampleVideos.length)}
                                      className="min-h-10 px-2 text-[#ff5532] underline font-bold hover:text-[#e64020] cursor-pointer"
                                    >
                                      Preview
                                    </button>
                                  )}
                                  <span className="text-slate-500 font-mono">08:15</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ── Requirements ── */}
            <section className={`${styles.courseSection} ${styles.requirements} space-y-3 border-t border-slate-200 pt-8`}>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1c1d1f]">Requirements</h2>
              <ul className="list-disc list-inside space-y-2 text-sm leading-6 text-[#2d2f31]">
                {course.requirements?.map((req: string, i: number) => (
                  <li key={i}>{req}</li>
                ))}
              </ul>
            </section>

            {/* ── Description ── */}
            <section className={`${styles.courseSection} space-y-3 border-t border-slate-200 pt-8`}>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1c1d1f]">Description</h2>
              <div className={`${styles.bodyCopy} text-sm text-[#2d2f31] leading-7 space-y-4`}>
                <p>{course.description}</p>
                <p>
                  You will learn how to design, test, trace, and deploy full agentic workflows.
                  Starting with OpenAI Agents SDK fundamentals and tool definitions, moving
                  directly into the breakthrough Model Context Protocol (MCP) standard for securely
                  connecting local and cloud toolkits, before building deterministic pipelines with
                  LangGraph and team collaboration with CrewAI.
                </p>
                <p className="font-bold text-[#1c1d1f]">Who this course is for:</p>
                <ul className="list-disc list-inside space-y-1 pl-2">
                  <li>Software Engineers wanting to master Autonomous Agent Architecture</li>
                  <li>Data Scientists &amp; AI Engineers transitioning to Production LLM Systems</li>
                  <li>Founders and builders looking to automate enterprise processes with MCP</li>
                </ul>
              </div>
            </section>

            {/* ── Instructor Profile ── */}
            <section id="instructor" className={`${styles.courseSection} space-y-4 pt-4 border-t border-slate-200`}>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1c1d1f]">Instructor</h2>
              <div className="space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-[#ff5532] underline cursor-pointer">
                    {course.instructor}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Lead AI Architect, Best-Selling Instructor &amp; Tech Speaker
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden bg-slate-200 border-2 border-slate-300 shrink-0">
                    <img
                      src={course.instructorAvatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200"}
                      alt={course.instructor}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-1 text-xs sm:text-sm text-[#2d2f31]">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-[#f69c08] text-[#f69c08]" />
                      <span>{course.rating.toFixed(1)} Instructor Rating</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-slate-700" />
                      <span>49,182 Reviews</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-slate-700" />
                      <span>403,098 Students</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PlayCircle className="w-4 h-4 text-slate-700" />
                      <span>12 Courses</span>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-[#2d2f31] leading-7 pt-2">
                  Ed Donner is an experienced software engineer, entrepreneur, and author with over 20 years in software architecture and artificial intelligence. Having coached hundreds of thousands of engineers across the globe, Ed focuses on production-ready engineering patterns rather than toy examples.
                </p>
              </div>
            </section>

            {/* ── Student Feedback / Rating Breakdown ── */}
            <section id="reviews" className={`${styles.courseSection} space-y-5 pt-4 border-t border-slate-200`}>
              <h2 className="text-xl sm:text-2xl font-bold text-[#1c1d1f]">Student feedback</h2>
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="text-center sm:text-left space-y-1">
                  <div className="text-5xl font-black text-[#b32d0f]">
                    {course.rating.toFixed(1)}
                  </div>
                  <div className="flex items-center justify-center sm:justify-start text-[#f69c08]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#f69c08]" />
                    ))}
                  </div>
                  <div className="text-xs font-bold text-[#b32d0f]">Course Rating</div>
                </div>

                {/* Rating Distribution Bars */}
                <div className="flex-1 w-full space-y-2">
                  {[
                    { stars: 5, pct: 76 },
                    { stars: 4, pct: 18 },
                    { stars: 3, pct: 4 },
                    { stars: 2, pct: 1 },
                    { stars: 1, pct: 1 },
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-3 text-xs text-[#2d2f31]">
                      <div className="w-20 bg-slate-200 rounded-full h-2 overflow-hidden flex-1">
                        <div
                          className="bg-slate-700 h-full rounded-full"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                      <div className="flex items-center gap-1 text-[#f69c08]">
                        {[...Array(row.stars)].map((_, idx) => (
                          <Star key={idx} className="w-3 h-3 fill-[#f69c08]" />
                        ))}
                      </div>
                      <span className="w-8 text-right text-slate-500 font-mono">{row.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

          </div>

      </main>
      </div>

      {/* ─── INTERACTIVE COURSE DEMO VIDEO PREVIEW MODAL ─── */}
      {showVideoModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-3 sm:p-6 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setShowVideoModal(false)}
        >
          <div
            className="bg-[#1c1d1f] text-white w-full max-w-4xl rounded-lg overflow-hidden shadow-2xl border border-slate-700 flex flex-col max-h-[92vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-5 py-3.5 bg-[#2d2f31] flex items-center justify-between border-b border-slate-700">
              <div>
                <p className="text-[11px] uppercase tracking-wider font-extrabold text-[#ffb199]">
                  Course Preview
                </p>
                <h3 className="text-sm sm:text-base font-bold text-white truncate max-w-lg">
                  {course.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowVideoModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center transition"
                aria-label="Close preview"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body: Video Player + Playlist */}
            <div className="grid grid-cols-1 md:grid-cols-12 flex-1 overflow-hidden">
              
              {/* Video Player Column */}
              <div className="md:col-span-8 bg-black flex flex-col justify-center items-center relative aspect-video md:aspect-auto">
                <video
                  ref={videoRef}
                  src={activeVideo.videoUrl}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-full object-contain max-h-[55vh]"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                />
              </div>

              {/* Sample Videos Playlist Column */}
              <div className="md:col-span-4 bg-[#1c1d1f] border-t md:border-t-0 md:border-l border-slate-700 flex flex-col max-h-[35vh] md:max-h-[55vh]">
                <div className="p-3 bg-[#2d2f31] text-xs font-bold text-slate-200 border-b border-slate-700">
                  Free Sample Videos ({sampleVideos.length})
                </div>
                <div className="overflow-y-auto flex-1 divide-y divide-slate-800 p-2">
                  {sampleVideos.map((vid, idx) => {
                    const isSelected = idx === currentVideoIndex;
                    return (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setCurrentVideoIndex(idx);
                          setIsPlaying(true);
                          setTimeout(() => {
                            if (videoRef.current) {
                              videoRef.current.currentTime = 0;
                              videoRef.current.play().catch(() => {});
                            }
                          }, 100);
                        }}
                        className={`w-full text-left p-2.5 rounded transition flex items-start gap-2.5 ${
                          isSelected ? "bg-[#3e4143] text-white" : "text-slate-300 hover:bg-slate-800"
                        }`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isSelected ? (
                            <Play className="w-4 h-4 fill-[#ff5532] text-[#ff5532]" />
                          ) : (
                            <PlayCircle className="w-4 h-4 text-slate-400" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold leading-tight line-clamp-2">
                            {vid.title}
                          </p>
                          <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                            {vid.duration}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>

            {/* Modal Footer CTA */}
            <div className="p-4 bg-[#2d2f31] border-t border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-slate-300">Ready to unlock all 248 lectures?</span>
                <span className="text-lg font-black text-white">
                  ₹{course.price.toLocaleString("en-IN")}.00
                </span>
                <span className="text-xs text-slate-400 line-through">
                  ₹{course.originalPrice.toLocaleString("en-IN")}.00
                </span>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setShowVideoModal(false);
                    handleAddToCart();
                  }}
                  className="flex-1 sm:flex-none min-h-11 px-5 py-2.5 rounded bg-[#ff5532] hover:bg-[#e64020] text-white font-bold text-xs transition"
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowVideoModal(false);
                    handleEnrollClick();
                  }}
                  className="flex-1 sm:flex-none px-5 py-2.5 rounded bg-white hover:bg-slate-200 text-[#1c1d1f] font-bold text-xs transition"
                >
                  Buy now
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ─── PAYMENT CHECKOUT MODAL ─── */}
      <PaymentCheckoutModal
        course={checkoutCourseData}
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
      />
    </div>
  );
}
