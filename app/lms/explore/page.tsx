"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Link from "next/link";
import PaymentCheckoutModal, { type CheckoutCourse } from "@/components/lms/PaymentCheckoutModal";
import CoursePreviewModal from "@/components/lms/CoursePreviewModal";
import { CourseCatalogSkeletonGrid } from "@/components/lms/CourseSkeleton";
import { LMS_COURSES, type LMSCourse } from "@/data/lms-courses";
import { api } from "@/lib/api";

export type CourseItem = LMSCourse;

const FLAGSHIP_TRACK: CheckoutCourse = {
  slug: "devops-cloud-architect",
  title: "DevOps & Cloud Architect Career Track (AWS + Kubernetes + Terraform)",
  price: 499,
  originalPrice: 999,
  image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800",
  instructor: "Netcoder Senior Engineering Faculty & FAANG Mentors",
  duration: "6 Months • 12 Production Projects",
  level: "Flagship Bootcamp",
};

const CATEGORY_TABS = [
  { id: "all", label: "All IT Courses", count: 48 },
  { id: "cloud", label: "Cloud & DevOps", count: 14 },
  { id: "fullstack", label: "Full-Stack Development", count: 12 },
  { id: "ai", label: "AI & Machine Learning", count: 8 },
  { id: "cyber", label: "Cybersecurity", count: 6 },
  { id: "systems", label: "System Architecture", count: 8 },
] as const;

const TECH_STACK = [
  "Kubernetes",
  "Docker",
  "AWS Architecture",
  "Terraform",
  "Next.js 15",
  "Go (Golang)",
  "Python AI",
  "PostgreSQL",
  "Kafka",
] as const;

const HIRING_PARTNERS = ["Google", "amazon", "Microsoft", "Uber", "stripe", "NETFLIX"] as const;

const VALUE_PROPS = [
  {
    icon: "terminal",
    title: "Interactive Cloud Sandboxes",
    description:
      "Zero tedious local configurations. Launch multi-node Kubernetes clusters, PostgreSQL instances, and Redis setups straight from your browser in 3 seconds.",
    footer: "> 0% Local Dependency Hell",
  },
  {
    icon: "dataset",
    title: "Real Production Architectures",
    description:
      "Say goodbye to elementary to-do apps. You will build microservice meshes, distributed cache layers, zero-trust firewalls, and resilient CI/CD pipelines.",
    footer: "> 100% Industry Parity",
  },
  {
    icon: "rate_review",
    title: "1-on-1 Senior Code Reviews",
    description:
      "Every capstone submission receives granular line-by-line pull request audits from principal engineers at top tech companies. Refactor like a true senior.",
    footer: "> Line-by-Line PR Feedback",
  },
  {
    icon: "verified",
    title: "Verified GitHub Credentials",
    description:
      "Walk away with verified tamper-proof certificates and public GitHub repositories demonstrating your real cloud architecture implementations to recruiters.",
    footer: "> Recruiter Verified Proof",
  },
] as const;

const TESTIMONIALS = [
  {
    quote:
      "I spent 3 years in QA automation feeling stuck. The Cloud Architect career track gave me the deep hands-on Kubernetes and Terraform reps I needed. During interviews, my capstone project was the main topic of conversation.",
    name: "Liam Gallagher",
    role: "Cloud Architect • $145,000 Offer",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBmmmiqEkhCyXr6G1xve0_RGc30XJz7Wz1LSgz8id3wKkwajb6SHbgcPTQ2BoMcl1FNspRIRO15P424ICndHXs6-DUXAHSLA12xmMi2-vP4ThWGNy76bCWFIdEuvwKP6osrGBUWgfLZJdMn9edRrF1V9KuWrmOl1op4dMqqvTR9OXe0zhxM3sZusRDMNCe3dxA-_9KZNCW_Tz0om3n31W2RqseVtlf3mY4b_MqZW0rNjSlAG9-rSvQu",
  },
  {
    quote:
      "The code reviews here are brutal in the best way possible. Instead of superficial thumbs-up, instructors commented on concurrency traps, memory leaks, and distributed race conditions. Worth every single dollar.",
    name: "Mei-Ling Zhou",
    role: "Senior Backend Engineer @ FinTech",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD6MsuRb6PYe40tJuwLm2cL92gvu-x0941jdv7K10zhX2baaHZc0b056ntFrK0wlRMccj_tzfTDuEPZiE5TLGgmQMaLl42y0QdFNaGqqoXoaX1Be9qb-eVO129CWYP5GBmOEdb2USBzcjjEpA4yAbw7Og3p0OOS8XjfsJ1cWaotQnDmrdYhbG5o-fRLVrcNyT_JO7wu6o2aAmxl55uzDjy_BqRlnuuFwFafO0qmO2yl4X8iG32pXkge",
  },
  {
    quote:
      "The browser-based cloud terminal is pure magic. I was able to stand up a Kafka cluster and multi-region failover right from my iPad while traveling. Landed my dream SRE role within 4 months of graduation.",
    name: "Darius Adebayo",
    role: "Site Reliability Engineer @ CloudTech",
    avatar:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCsKq9DVhoJPg5AaD_87CGu3OwysOnPTqrCViRoF8UCwQWVYJHFbaZQ8_e9gTxvgSIcxARAYEV9ZZ0_wVzi2UXWZsX7Dp08ECM4tWObUTpWNDpYAPu-F92kddev-nXEMATa-hYg8YmfeFNd1cf66BKo9AGwUtCJWj3pvx-hG3Xa0-Jg-0qTd6hhtpU_iUjZoOLa_I8Z3Zusx3oXAgUDXJGq3tyMtBxlsDmKmZbdS6DZMfzP0xQ-m9YK",
  },
] as const;

// ─── Sub Components ───────────────────────────────────────────────────────

function StarRating({ rating, count }: { rating: number; count: number }) {
  return (
    <div className="flex items-center gap-1.5 text-amber-500 mb-1.5 text-xs">
      <span className="material-symbols-outlined text-[16px]">star</span>
      <span className="font-bold text-slate-800">{rating}</span>
      <span className="text-slate-400 font-medium">
        ({count.toLocaleString()} ratings)
      </span>
    </div>
  );
}

function CourseCard({
  course,
  onPreview,
  onEnroll,
}: {
  course: CourseItem;
  onPreview: (c: CourseItem) => void;
  onEnroll: (c: CourseItem) => void;
}) {
  return (
    <article className="group flex flex-col bg-white rounded-2xl shadow-md hover:shadow-2xl hover:shadow-orange-500/10 hover:-translate-y-1.5 transition-all duration-300 overflow-hidden border border-slate-200 hover:border-orange-200">
      {/* Image & Badges */}
      <div className="relative h-48 w-full bg-slate-900 overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
          src={course.image}
          alt={course.title}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/images/full-stact-development.png";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent" />
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="bg-orange-600 text-white text-[10px] px-2.5 py-1 rounded-full font-bold uppercase tracking-wider shadow-lg">
            {course.badge}
          </span>
          <span className="bg-white/95 backdrop-blur-sm text-slate-800 text-[10px] px-2.5 py-1 rounded-full font-semibold">
            {course.tagline}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <span className="text-[11px] bg-slate-950/80 backdrop-blur-sm px-2.5 py-1 rounded-md font-medium flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">schedule</span>
            {course.hours}
          </span>
          <span className="material-symbols-outlined text-[22px] text-orange-400 drop-shadow-lg">
            {course.icon}
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <StarRating rating={course.rating} count={course.ratingCount} />

          <h3 className="font-bold text-base text-slate-900 tracking-tight mb-2 line-clamp-2 leading-snug group-hover:text-orange-600 transition-colors">
            {course.title}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 mb-4 leading-relaxed">
            {course.overview}
          </p>

          <div className="flex items-center gap-2 mb-4">
            <img
              className="w-7 h-7 rounded-full object-cover border-2 border-orange-100"
              src={course.instructorAvatar}
              alt={course.instructor}
              loading="lazy"
            />
            <span className="text-xs text-slate-700 font-medium truncate">
              {course.instructor}
            </span>
          </div>
        </div>

        {/* Price and CTA */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-slate-900">
              ${course.price}
            </span>
            <span className="text-xs text-slate-400 line-through">
              ${course.originalPrice}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPreview(course)}
              className="text-xs text-slate-600 hover:text-orange-600 hover:bg-orange-50 font-bold px-3 py-2 rounded-lg transition-all cursor-pointer"
              type="button"
              aria-label={`Preview ${course.title}`}
            >
              Preview
            </button>
            <button
              onClick={() => onEnroll(course)}
              className="text-xs bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md hover:shadow-orange-500/30 cursor-pointer"
              type="button"
              aria-label={`Enroll in ${course.title}`}
            >
              Enroll
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
  centered = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  centered?: boolean;
}) {
  return (
    <div className={centered ? "text-center max-w-2xl mx-auto" : ""}>
      <span className="text-xs text-orange-600 font-bold uppercase tracking-wider">
        {eyebrow}
      </span>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight mt-1">
        {title}
      </h2>
      {subtitle && (
        <p className="text-sm text-slate-600 mt-2 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────

export default function ExploreCoursesPage() {
  const [courses, setCourses] = useState<CourseItem[]>(LMS_COURSES);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("all");
  const [previewCourse, setPreviewCourse] = useState<CheckoutCourse | null>(null);
  const [checkoutCourse, setCheckoutCourse] = useState<CheckoutCourse | null>(null);

  // ─── Data Fetching ──────────────────────────────────────────────────────
  useEffect(() => {
    let isMounted = true;
    async function loadCourses() {
      setIsLoading(true);
      try {
        const res = await api.getCourses();
        if (
          isMounted &&
          res &&
          res.data &&
          Array.isArray(res.data) &&
          res.data.length > 0
        ) {
          const formatted: CourseItem[] = res.data.map((item: any) => {
            const fallback =
              LMS_COURSES.find((c) => c.slug === item.slug) || LMS_COURSES[0];
            return {
              slug:
                item.slug ||
                (item.title
                  ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")
                  : fallback.slug),
              title: item.title,
              category: (
                item.category ||
                fallback.category ||
                "fullstack"
              ).toLowerCase() as CourseItem["category"],
              price: Number(item.price ?? item.fee ?? fallback.price ?? 79),
              originalPrice: Number(
                item.originalPrice ??
                item.original_price ??
                fallback.originalPrice ??
                180
              ),
              rating:
                typeof item.rating === "number" ? item.rating : fallback.rating,
              ratingCount: Number(
                item.ratingCount ??
                item.reviews_count ??
                fallback.ratingCount ??
                1200
              ),
              duration: item.duration || fallback.duration || "40 hrs",
              level: item.level || fallback.level || "Intermediate",
              badge: item.badge || fallback.badge || "Featured",
              tagline: item.tagline || fallback.tagline || "Industry Certified",
              icon: item.icon || fallback.icon || "code",
              hours: item.hours || item.duration || fallback.hours || "40 hrs",
              instructor:
                item.instructor || fallback.instructor || "Netcoder Faculty",
              instructorAvatar:
                item.instructorAvatar ||
                item.instructor_avatar ||
                fallback.instructorAvatar,
              image:
                item.image ||
                fallback.image ||
                "/images/full-stact-development.png",
              overview: item.overview || fallback.overview,
              syllabus: item.syllabus || fallback.syllabus,
            };
          });
          setCourses(formatted);
        }
      } catch (err) {
        console.warn("[LMS Explore] Using local curriculum data:", err);
      } finally {
        if (isMounted) {
          setTimeout(() => {
            if (isMounted) setIsLoading(false);
          }, 400);
        }
      }
    }

    loadCourses();
    return () => {
      isMounted = false;
    };
  }, []);

  // ─── Filtering ──────────────────────────────────────────────────────────
  const filteredCourses = useMemo(() => {
    return courses.filter((course) => {
      const matchCat =
        selectedCategory === "all" ||
        course.category === selectedCategory ||
        (selectedTrack !== "all" && course.category === selectedTrack);

      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        course.title.toLowerCase().includes(q) ||
        course.overview.toLowerCase().includes(q) ||
        course.instructor?.toLowerCase().includes(q);

      return matchCat && matchSearch;
    });
  }, [courses, selectedCategory, selectedTrack, searchQuery]);

  // ─── Handlers ───────────────────────────────────────────────────────────
  const scrollToCourses = useCallback(() => {
    const el = document.getElementById("course-cards-container");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedCategory("all");
    setSelectedTrack("all");
    setSearchQuery("");
  }, []);

  const handlePreview = useCallback((course: CourseItem) => {
    setPreviewCourse(course as unknown as CheckoutCourse);
  }, []);

  const handleEnroll = useCallback((course: CourseItem | CheckoutCourse) => {
    setCheckoutCourse(course as CheckoutCourse);
  }, []);

  return (
    <div className="bg-[#faf8ff] text-slate-900 antialiased min-h-screen font-sans selection:bg-orange-500 selection:text-white">
      {/* Scoped CSS for custom effects */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .hero-gradient {
          background:
            radial-gradient(ellipse 80% 50% at 50% -10%, rgba(249,115,22,0.15) 0%, transparent 60%),
            radial-gradient(ellipse 60% 40% at 80% 20%, rgba(251,191,36,0.10) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 20% 30%, rgba(249,115,22,0.08) 0%, transparent 50%),
            linear-gradient(180deg, #faf8ff 0%, #ffffff 100%);
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .text-gradient-orange {
          background: linear-gradient(135deg, #ea580c 0%, #f97316 50%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section className="relative w-full overflow-hidden hero-gradient py-16 lg:py-24 border-b border-orange-100/50">
        {/* Ambient glow orbs */}
        <div className="absolute -top-32 right-1/4 w-[500px] h-[500px] bg-orange-400/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 -left-32 w-[400px] h-[400px] bg-amber-400/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center">
          {/* Announcement Pill */}
          <button
            onClick={() => handleEnroll(FLAGSHIP_TRACK)}
            className="group inline-flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-2 rounded-full shadow-md hover:shadow-lg mb-8 transition-all hover:scale-[1.02] cursor-pointer border border-orange-200"
            aria-label="View flagship bootcamp"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-600" />
            </span>
            <span className="text-xs text-slate-800 uppercase tracking-wider font-bold">
              NEW: AI-Driven Cloud &amp; DevOps Masterclass 2025
            </span>
            <span className="material-symbols-outlined text-[18px] text-orange-600 transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </button>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-slate-900 max-w-4xl tracking-tight mb-6 leading-[1.05]">
            Master Modern IT, Cloud &amp;{" "}
            <span className="text-gradient-orange">Full-Stack Engineering</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mb-10 leading-relaxed">
            Accelerate your tech trajectory with production-grade architectures,
            browser-based cloud sandboxes, and rigorous 1-on-1 code reviews from
            senior FAANG engineers.
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-3xl bg-white/95 backdrop-blur p-2 rounded-2xl shadow-xl mb-12 flex flex-col md:flex-row items-stretch gap-2 border border-orange-100 ring-1 ring-orange-500/5">
            <div className="flex items-center flex-1 px-4 py-2.5">
              <span className="material-symbols-outlined text-orange-600 text-[22px] mr-3 select-none">
                search
              </span>
              <input
                className="w-full bg-transparent text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                id="hero-search-input"
                placeholder="What technology do you want to learn?"
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search courses"
              />
            </div>
            <div className="hidden md:block w-px bg-slate-200 my-2" />
            <div className="flex items-center px-3">
              <select
                value={selectedTrack}
                onChange={(e) => {
                  setSelectedTrack(e.target.value);
                  setSelectedCategory(e.target.value);
                }}
                className="w-full md:w-44 bg-transparent text-xs font-bold text-slate-800 focus:outline-none cursor-pointer py-2"
                aria-label="Filter by track"
              >
                <option value="all">All Tracks</option>
                <option value="cloud">Cloud &amp; DevOps</option>
                <option value="fullstack">Full-Stack Dev</option>
                <option value="ai">AI Engineering</option>
                <option value="cyber">Cybersecurity</option>
                <option value="systems">System Architecture</option>
              </select>
            </div>
            <button
              onClick={scrollToCourses}
              className="text-xs bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white font-bold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center justify-center gap-1.5 shrink-0 cursor-pointer"
              type="button"
            >
              <span>Find Courses</span>
              <span className="material-symbols-outlined text-[18px]">bolt</span>
            </button>
          </div>

          {/* Trust Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl pt-4 mb-10">
            {[
              { value: "45,000+", label: "Engineers Placed" },
              { value: "4.9/5", label: "12,400+ Reviews", star: true },
              { value: "120+", label: "Hands-on Cloud Labs" },
              { value: "94%", label: "Placement Success" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center">
                <div className="flex items-center gap-1">
                  <span className="text-3xl font-black text-slate-900">
                    {stat.value}
                  </span>
                  {stat.star && (
                    <span className="material-symbols-outlined text-orange-500 text-[24px]">
                      star
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-500 uppercase tracking-wider mt-1 font-semibold">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* Tech Pills */}
          <div className="w-full flex flex-col items-center gap-3 pt-2">
            <span className="text-[11px] text-slate-500 uppercase tracking-widest font-bold">
              Standard Tooling Practiced in Sandboxes
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl">
              {TECH_STACK.map((tool) => (
                <span
                  key={tool}
                  className="px-3.5 py-1.5 bg-white text-slate-800 rounded-full text-xs font-semibold shadow-sm border border-slate-200 flex items-center gap-1.5 hover:border-orange-300 hover:shadow-md transition-all"
                >
                  <span className="w-2 h-2 rounded-full bg-orange-500" />
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURED FLAGSHIP BANNER ═══════════════ */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <div className="relative rounded-3xl bg-white overflow-hidden shadow-xl p-6 md:p-10 border border-slate-200">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -top-20 -left-20 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left details */}
            <div className="lg:col-span-7 flex flex-col gap-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-gradient-to-r from-orange-600 to-orange-500 text-white text-[11px] px-3 py-1 rounded-full font-bold uppercase tracking-wide shadow-md shadow-orange-500/20">
                  ⚡ Featured Flagship Bootcamp
                </span>
                <span className="bg-slate-100 text-slate-700 text-[11px] px-3 py-1 rounded-full font-semibold">
                  6 Months • 12 Production Projects
                </span>
                <span className="bg-orange-50 text-orange-700 text-[11px] px-3 py-1 rounded-full font-bold border border-orange-100">
                  1-on-1 Capstone Review
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight leading-tight">
                DevOps &amp; Cloud Architect Career Track{" "}
                <span className="text-orange-600">
                  (AWS + Kubernetes + Terraform)
                </span>
              </h2>

              <p className="text-sm text-slate-600 leading-relaxed">
                Transition from standard sysadmin or software engineer to
                high-compensation Infrastructure Architect. Build zero-downtime
                multi-region clusters, GitOps pipelines with ArgoCD, and
                Infrastructure-as-Code setups ready for production.
              </p>

              {/* Curriculum blocks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-2">
                {[
                  { n: "01", title: "Linux & Containers", sub: "Docker Internals" },
                  { n: "02", title: "Kubernetes (K8s)", sub: "Production Clusters" },
                  { n: "03", title: "Terraform & AWS", sub: "Enterprise IaC" },
                  { n: "04", title: "GitOps & Observability", sub: "Prometheus & Grafana" },
                ].map((m) => (
                  <div
                    key={m.n}
                    className="bg-orange-50/70 hover:bg-orange-100/70 p-3 rounded-xl flex flex-col transition-colors border border-orange-100/50"
                  >
                    <span className="text-[10px] text-orange-600 font-bold uppercase">
                      Module {m.n}
                    </span>
                    <span className="text-xs text-slate-900 font-bold mt-0.5">
                      {m.title}
                    </span>
                    <span className="text-[11px] text-slate-500">{m.sub}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => handleEnroll(FLAGSHIP_TRACK)}
                  className="text-xs bg-orange-600 hover:bg-orange-700 active:scale-[0.98] text-white font-bold px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg hover:shadow-orange-500/30 transition-all flex items-center gap-2 cursor-pointer"
                  type="button"
                >
                  <span>Enroll in Track • $499</span>
                  <span className="material-symbols-outlined text-[18px]">
                    verified
                  </span>
                </button>
                <button
                  onClick={() => setPreviewCourse(FLAGSHIP_TRACK)}
                  className="text-xs bg-slate-100 text-slate-800 hover:bg-slate-200 font-bold px-5 py-3.5 rounded-xl transition-colors flex items-center gap-2 cursor-pointer"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    download
                  </span>
                  <span>View Curriculum &amp; Syllabus</span>
                </button>
              </div>
            </div>

            {/* Right Terminal Mockup */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="bg-[#0f172a] rounded-2xl overflow-hidden shadow-2xl p-4 font-mono text-xs border border-slate-800 ring-1 ring-orange-500/10">
                <div className="flex items-center justify-between pb-3 border-b border-slate-700/50 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-500" />
                    <span className="w-3 h-3 rounded-full bg-amber-500" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[11px] text-slate-400 font-sans font-medium hidden sm:inline">
                    pulseit-cloud-sandbox-k8s:~/prod-cluster
                  </span>
                  <span className="text-[11px] text-orange-400 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                    Live AWS Node
                  </span>
                </div>
                <div className="space-y-2 text-slate-200">
                  <p>
                    <span className="text-orange-400">user@pulseit</span>:
                    <span className="text-emerald-400">~</span>${" "}
                    kubectl get nodes -o wide
                  </p>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    NAME &nbsp;&nbsp;&nbsp;&nbsp; STATUS &nbsp; ROLES &nbsp; AGE
                    &nbsp; VERSION &nbsp; OS-IMAGE
                    <br />
                    ip-10-0-14-22.ec2.internal &nbsp; Ready &nbsp; master &nbsp;
                    42d &nbsp; v1.31.1 &nbsp; Ubuntu 24.04 LTS
                    <br />
                    ip-10-0-14-89.ec2.internal &nbsp; Ready &nbsp; worker &nbsp;
                    42d &nbsp; v1.31.1 &nbsp; Ubuntu 24.04 LTS
                  </p>
                  <p>
                    <span className="text-orange-400">user@pulseit</span>:
                    <span className="text-emerald-400">~</span>${" "}
                    terraform apply -auto-approve
                  </p>
                  <p className="text-[11px] text-orange-300">
                    Plan: 14 to add, 0 to change, 0 to destroy.
                    <br />
                    aws_eks_cluster.prod: Creating...
                    <br />
                    Apply complete! Resources: 14 added, 0 changed.
                  </p>
                  <p className="text-[10px] text-slate-500 pt-1">
                    # Real AWS infrastructure provisioned via curriculum labs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ CATEGORY TABS ═══════════════ */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <SectionHeading
            eyebrow="Course Catalog"
            title="Explore Production-Grade Courses"
          />
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>
              Showing <strong className="text-slate-800">{filteredCourses.length}</strong>{" "}
              {filteredCourses.length === 1 ? "Course" : "Courses"}
            </span>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORY_TABS.map((tab) => {
            const isSelected = selectedCategory === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${isSelected
                  ? "bg-orange-600 text-white shadow-md shadow-orange-500/30 scale-[1.02]"
                  : "bg-white text-slate-700 hover:bg-orange-50 hover:text-orange-700 hover:border-orange-200 border border-slate-200"
                  }`}
                type="button"
              >
                {tab.label}
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${isSelected
                    ? "bg-white/25 text-white"
                    : "bg-slate-100 text-slate-500"
                    }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ═══════════════ COURSE GRID ═══════════════ */}
      <section
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20"
        id="course-cards-container"
      >
        {isLoading ? (
          <CourseCatalogSkeletonGrid count={6} />
        ) : filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center max-w-md mx-auto shadow-sm">
            <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[36px]">
                search_off
              </span>
            </div>
            <h3 className="font-bold text-slate-800 text-lg mb-1">
              No courses found
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Try clearing filters or search query to see more courses.
            </p>
            <button
              onClick={resetFilters}
              className="text-xs bg-orange-600 hover:bg-orange-700 active:scale-95 text-white font-bold px-5 py-2.5 rounded-xl transition-all cursor-pointer shadow-md hover:shadow-lg"
              type="button"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.slug}
                course={course}
                onPreview={handlePreview}
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        )}
      </section>

      {/* ═══════════════ VALUE PROPOSITIONS ═══════════════ */}
      <section className="w-full bg-gradient-to-b from-orange-50/50 to-[#faf8ff] py-20 border-y border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14">
            <SectionHeading
              centered
              eyebrow="The Netcoder Advantage"
              title="Engineered for Real Engineering Craft"
              subtitle="We eliminated static video tutorials and trivial homework assignments. Every syllabus is built around actual cloud infrastructure and verified production code."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUE_PROPS.map((prop) => (
              <div
                key={prop.title}
                className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-all flex flex-col border border-slate-200 hover:border-orange-200 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 text-orange-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-[28px]">
                    {prop.icon}
                  </span>
                </div>
                <h3 className="text-base text-slate-900 mb-2 font-bold">
                  {prop.title}
                </h3>
                <p className="text-xs text-slate-500 flex-1 leading-relaxed">
                  {prop.description}
                </p>
                <div className="mt-4 pt-3 text-xs font-mono text-orange-600 font-bold border-t border-slate-100">
                  {prop.footer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HIRING PARTNERS & TESTIMONIALS ═══════════════ */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-12">
          <SectionHeading
            centered
            eyebrow="Hiring Network"
            title="Where Netcoder Graduates Get Hired"
            subtitle="Over 45,000 engineers have transformed their careers and joined leading global software companies."
          />
        </div>

        {/* Partner Logos */}
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 py-4 opacity-60 hover:opacity-90 transition-opacity mb-16">
          {HIRING_PARTNERS.map((brand) => (
            <span
              key={brand}
              className="text-xl sm:text-2xl font-black text-slate-800 tracking-tighter uppercase hover:text-orange-600 transition-colors cursor-default"
            >
              {brand}
            </span>
          ))}
        </div>

        {/* Testimonials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow border border-slate-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-3 text-sm">
                  {"★★★★★"}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 italic mb-4 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 flex items-center gap-3">
                <img
                  className="w-10 h-10 rounded-full object-cover border-2 border-orange-100"
                  src={t.avatar}
                  alt={t.name}
                  loading="lazy"
                />
                <div>
                  <h4 className="text-xs font-bold text-slate-900">{t.name}</h4>
                  <p className="text-[11px] text-orange-600 font-semibold">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ FINAL CTA BANNER ═══════════════ */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="bg-gradient-to-br from-orange-600 via-orange-500 to-amber-500 rounded-3xl p-8 lg:p-16 text-center text-white shadow-2xl shadow-orange-500/20 relative overflow-hidden">
          {/* Decorative orbs */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-black/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <span className="bg-white/20 text-white text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider mb-5 backdrop-blur-sm border border-white/20">
              ⚡ Accelerate Your Tech Journey
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
              Ready to Build the Future of Software &amp; Cloud Infrastructure?
            </h2>
            <p className="text-sm sm:text-base text-white/90 max-w-2xl mb-8 leading-relaxed">
              Join 100,000+ engineers leveling up today. Get instant access to
              terminal sandboxes, comprehensive curricula, and industry-recognized
              certifications.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center">
              <button
                onClick={scrollToCourses}
                className="w-full sm:w-auto text-xs bg-white text-orange-600 hover:bg-slate-50 active:scale-95 font-extrabold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                type="button"
              >
                <span>Explore All 48+ IT Courses</span>
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </button>
              <a
                href="https://api.whatsapp.com/send?phone=919816732055&text=Hello%20Netcoder%20Technology,%20I%20am%20interested%20in%20courses."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-xs bg-black/20 hover:bg-black/30 text-white font-bold px-6 py-4 rounded-xl border border-white/20 backdrop-blur-md transition-colors flex items-center justify-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">
                  support_agent
                </span>
                <span>Talk to a Career Advisor</span>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-white/80 mt-8 pt-4 border-t border-white/20">
              {[
                "14-Day Money Back Guarantee",
                "Instant Sandbox Access",
                "Verified Certificate",
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm">
                    check_circle
                  </span>
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ MODALS ═══════════════ */}
      <CoursePreviewModal
        course={previewCourse}
        isOpen={!!previewCourse}
        onClose={() => setPreviewCourse(null)}
        onEnroll={(c) => {
          setPreviewCourse(null);
          setCheckoutCourse(c);
        }}
      />

      <PaymentCheckoutModal
        course={checkoutCourse}
        isOpen={!!checkoutCourse}
        onClose={() => setCheckoutCourse(null)}
      />
    </div>
  );
}