"use client";

import { useState, useEffect, useMemo, Suspense, type CSSProperties } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth/context";
import { api } from "@/lib/api";
import { LMS_COURSES } from "@/data/lms-courses";
import PaymentCheckoutModal, { type CheckoutCourse } from "@/components/lms/PaymentCheckoutModal";
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Search,
  BookOpen,
  Clock,
  Award,
  ShieldCheck,
  Star,
  Users,
  Zap,
  ShoppingCart,
  PhoneCall,
  GraduationCap,
  X,
  Trash2,
  Briefcase,
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

const COMPANY_ROWS = [
  [
    { name: "Flipkart", color: "#2874f0" },
    { name: "Amazon", color: "#ff9900" },
    { name: "Swiggy", color: "#fc8019" },
    { name: "Zomato", color: "#e23744" },
    { name: "Samsung", color: "#1428a0" },
    { name: "Google", color: "#4285f4" },
  ],
  [
    { name: "Microsoft", color: "#00a1f1" },
    { name: "Netflix", color: "#e50914" },
    { name: "Goldman Sachs", color: "#0a4595" },
    { name: "PayPal", color: "#003087" },
    { name: "TCS", color: "#3b5998" },
    { name: "Infosys", color: "#007cc3" },
  ],
];

const TRUST_BADGES = [
  {
    icon: Award,
    iconColor: "#ff5532",
    bg: "#fff7f5",
    border: "#ffe0d9",
    title: "Verified Certification",
    desc: "Accredited Netcoder Industry Diploma",
  },
  {
    icon: ShieldCheck,
    iconColor: "#10b981",
    bg: "#f0fdf4",
    border: "#bbf7d0",
    title: "DRM Security Shield",
    desc: "Continuous Anti-Piracy Watermarking",
  },
  {
    icon: Users,
    iconColor: "#3b82f6",
    bg: "#eff6ff",
    border: "#bfdbfe",
    title: "1-on-1 Mentor Reviews",
    desc: "Production Code Inspections",
  },
  {
    icon: Briefcase,
    iconColor: "#f59e0b",
    bg: "#fffbeb",
    border: "#fde68a",
    title: "Placement Support",
    desc: "Resume Audits & Mock Technical Interviews",
  },
];

const FAQ_ITEMS = [
  {
    question: "How do I choose the right course?",
    answer: "Use the category filters and search to narrow the catalog. Compare each course's overview, duration, highlights, and fee, or call our course advisors for guidance.",
  },
  {
    question: "Can I add more than one course to my cart?",
    answer: "Yes. Add multiple courses to your cart and review them in the cart drawer. Checkout is completed one course at a time.",
  },
  {
    question: "Where can I see the course fee?",
    answer: "The listed fee appears on each course card. Review the final amount and applicable payment details in checkout before placing your order.",
  },
  {
    question: "Are these courses suitable for working professionals?",
    answer: "The catalog includes career-focused tracks for working professionals as well as college students. Check each course overview to see whether it fits your goals.",
  },
  {
    question: "Do I need prior experience to enroll?",
    answer: "Prerequisites vary by course. Review the course information and contact an advisor if you are unsure which level is right for you.",
  },
  {
    question: "How long does a course take?",
    answer: "Course duration varies by track. The duration is shown on each course card; ask an advisor for details about the expected learning schedule.",
  },
  {
    question: "What topics are covered in each course?",
    answer: "Topics and project work depend on the selected track. Contact our course team for the latest syllabus and curriculum details before enrolling.",
  },
  {
    question: "Are classes online or in person?",
    answer: "The format can vary by course and cohort. Contact our team to confirm the available learning format for the track you are considering.",
  },
  {
    question: "Will I get help from instructors or mentors?",
    answer: "Mentor and instructor support depends on the course structure. The course team can explain the guidance and review options available for a specific track.",
  },
  {
    question: "Do courses include a certificate?",
    answer: "Certificate eligibility and completion requirements depend on the program. Confirm the details with the course team before enrolling.",
  },
  {
    question: "Does enrolling guarantee a job?",
    answer: "No course can guarantee employment. Some programs may offer career or placement support; ask the team what is included in your selected course.",
  },
  {
    question: "Where can I ask about payment or refund terms?",
    answer: "Review the terms shown during checkout before paying. For questions about payment, cancellation, or refunds, contact our team before completing your enrollment.",
  },
];

function SelectCourseContent() {
  const searchParams = useSearchParams();
  const { enrolledCourses } = useAuth();

  const [courses, setCourses] = useState<CourseCardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activeCheckoutCourse, setActiveCheckoutCourse] = useState<CheckoutCourse | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartCourses, setCartCourses] = useState<CheckoutCourse[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    const openCart = () => setIsCartOpen(true);
    window.addEventListener("lms:open-course-cart", openCart);
    return () => window.removeEventListener("lms:open-course-cart", openCart);
  }, []);

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("lms:course-cart-count", { detail: cartCourses.length })
    );
  }, [cartCourses.length]);

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
          setCourses(Array.from(new Map(mapped.map((course) => [course.slug, course])).values()));
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

  const toCheckoutCourse = (course: CourseCardData): CheckoutCourse => ({
      slug: course.slug,
      title: course.title,
      price: course.price,
      originalPrice: course.originalPrice,
      duration: course.duration,
      level: course.level,
      image: course.image,
      instructor: course.instructor,
    });

  const handleSelectCourse = (course: CourseCardData) => {
    setActiveCheckoutCourse(toCheckoutCourse(course));
    setIsCheckoutOpen(true);
  };

  const handleAddToCart = (course: CourseCardData) => {
    setCartCourses((current) =>
      current.some((item) => item.slug === course.slug)
        ? current
        : [...current, toCheckoutCourse(course)]
    );
    setIsCartOpen(true);
  };

  const handleCartCheckout = (course: CheckoutCourse) => {
    setActiveCheckoutCourse(course);
    setIsCheckoutOpen(true);
    setIsCartOpen(false);
  };

  const categories = [
    { id: "all", label: "All Tracks" },
    { id: "fullstack", label: "Full-Stack Dev" },
    { id: "cloud", label: "Cloud & DevOps" },
    { id: "ai", label: "AI & ML" },
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
    <div className="sc-page">
      <div className="sc-container">

        {/* ── Learning Hero ── */}
        <section className="sc-hero" aria-labelledby="learning-hero-title">
          <div className="sc-hero-copy">
            <div className="sc-hero-badge">
              <span className="sc-live-dot" />
              Live classes + recorded lessons
            </div>
            <h1 id="learning-hero-title" className="sc-hero-title">
              Build skills that move your <span>career forward.</span>
            </h1>
            <p className="sc-hero-sub">
              Learn with expert-led live sessions, revisit lessons on your schedule, and build real projects that take you from core concepts to advanced skills.
            </p>
            <div className="sc-hero-actions">
              <a href="#course-catalog" className="sc-btn sc-btn--primary sc-btn--lg">
                Explore courses <ArrowRight className="sc-btn-icon" />
              </a>
              <a href="tel:+917590832055" className="sc-hero-advisor">
                <PhoneCall className="sc-hero-advisor-icon" />
                Talk to an advisor
              </a>
            </div>
            <div className="sc-hero-benefits">
              <span>Instructor-led live sessions</span>
              <span>Recorded lessons, on your time</span>
              <span>Hands-on project practice</span>
            </div>
          </div>
          <div className="sc-hero-visual">
            <img
              src="/images/modernheroimg.jpg"
              alt="Student exploring interactive programming and coding tools"
              className="sc-hero-image"
            />
            <div className="sc-hero-image-caption">
              <span className="sc-hero-image-live"><span className="sc-live-dot" /> LIVE LEARNING</span>
              <span>Learn together. Build together.</span>
            </div>
          </div>
        </section>

        {/* ── Filter Row Header ── */}
        <div className="sc-filter-header" id="course-catalog">
          <h2 className="sc-filter-label">For working professionals</h2>
          <a href="tel:+917590832055" className="sc-advisor-link">
            <PhoneCall className="sc-advisor-icon" />
            Talk to an advisor
          </a>
        </div>

        {/* ── Filter Bar ── */}
        <div className="sc-filter-bar">
          <div className="sc-cat-scroll">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`sc-cat-pill${selectedCategory === cat.id ? " sc-cat-pill--active" : ""}`}
              >
                {cat.label}
              </button>
            ))}
          </div>
          <div className="sc-search-wrap">
            <Search className="sc-search-icon" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search courses, skills, or technologies"
              placeholder="Search courses or skills…"
              className="sc-search-input"
            />
          </div>
        </div>

        {/* ── Courses Grid ── */}
        {loading ? (
          <div className="sc-grid">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="sc-skeleton">
                <div className="sc-skel-img" />
                <div className="sc-skel-body">
                  <div className="sc-skel-line sc-skel-line--lg" />
                  <div className="sc-skel-line" />
                  <div className="sc-skel-line sc-skel-line--sm" />
                </div>
                <div className="sc-skel-btn" />
              </div>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <div className="sc-empty">
            <BookOpen className="sc-empty-icon" />
            <h3 className="sc-empty-title">No Learning Tracks Found</h3>
            <p className="sc-empty-sub">
              Try adjusting your search or select &quot;All Tracks&quot;.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedCategory("all"); }}
              className="sc-empty-btn"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="sc-grid">
            {filteredCourses.map((c) => {
              const isUserEnrolled = enrolledCourses.includes(c.slug);
              const isInCart = cartCourses.some((item) => item.slug === c.slug);
              return (
                <div
                  key={c.slug}
                  className={`sc-card${isUserEnrolled ? " sc-card--enrolled" : ""}`}
                >
                  {/* Thumbnail */}
                  <div className="sc-thumb">
                    <img
                      src={c.image || "/images/full-stact-development.png"}
                      alt={c.title}
                      className="sc-thumb-img"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = "/images/full-stact-development.png";
                      }}
                    />
                    <div className="sc-thumb-overlay" />
                    <div className="sc-thumb-badges">
                      <span className="sc-chip sc-chip--dark">{c.category}</span>
                      {c.badge && <span className="sc-chip sc-chip--accent">{c.badge}</span>}
                    </div>
                    {isUserEnrolled && (
                      <div className="sc-enrolled-pill">
                        <CheckCircle2 className="sc-enrolled-icon" />
                        Unlocked
                      </div>
                    )}
                    <div className="sc-thumb-meta">
                      <div className="sc-meta-chip">
                        <Clock className="sc-meta-icon sc-meta-icon--red" />
                        <span>{c.duration}</span>
                      </div>
                      <div className="sc-meta-chip">
                        <Star className="sc-meta-icon sc-meta-icon--star" />
                        <span className="sc-meta-rating">{c.rating}</span>
                        <span className="sc-meta-count">({c.ratingCount})</span>
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="sc-body">
                    <div>
                      <h3 className="sc-card-title">{c.title}</h3>
                      <p className="sc-card-overview">{c.overview}</p>
                      <div className="sc-highlights">
                        {c.highlights?.slice(0, 3).map((hl, idx) => (
                          <div key={idx} className="sc-highlight-row">
                            <Zap className="sc-hl-icon" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="sc-card-footer">
                      <div>
                        <div className="sc-price-label">Course fee</div>
                        <div className="sc-price-row">
                          <span className="sc-price-main">₹{c.price.toLocaleString("en-IN")}</span>
                          <span className="sc-price-orig">₹{c.originalPrice.toLocaleString("en-IN")}</span>
                          <span className="sc-save-tag">Save 56%</span>
                        </div>
                      </div>
                      <div className="sc-card-actions">
                        <button
                          type="button"
                          onClick={() => handleAddToCart(c)}
                          disabled={isInCart || isUserEnrolled}
                          className="sc-btn sc-btn--ghost"
                        >
                          {isInCart || isUserEnrolled
                            ? <CheckCircle2 className="sc-btn-icon sc-btn-icon--green" />
                            : <ShoppingCart className="sc-btn-icon" />
                          }
                          {isUserEnrolled ? "Enrolled" : isInCart ? "In cart" : "Add to cart"}
                        </button>
                        {isUserEnrolled ? (
                          <Link href={`/lms/classroom/${c.slug}`} className="sc-btn sc-btn--green">
                            Open Class <ArrowRight className="sc-btn-icon" />
                          </Link>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSelectCourse(c)}
                            className="sc-btn sc-btn--primary"
                          >
                            Enroll now <ArrowRight className="sc-btn-icon" />
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

        {/* ── Companies / Build Skills Section ── */}
        <section className="sc-companies" aria-labelledby="company-skills-heading">
          <div className="sc-companies-hd">
            <h2 id="company-skills-heading" className="sc-companies-title">
              Build skills for opportunities at leading companies
            </h2>
            <p className="sc-companies-sub">
              Learn practical skills used across today&apos;s technology and business teams.
            </p>
          </div>
          <div className="sc-marquee" aria-label="Companies our learners aspire to work with">
            {COMPANY_ROWS.map((row, rowIdx) => (
              <div className="sc-mq-viewport" key={rowIdx}>
                <div className={`sc-mq-track ${rowIdx === 0 ? "sc-mq-track--right" : "sc-mq-track--left"}`}>
                  {[0, 1].map((copy) => (
                    <div className="sc-mq-group" key={copy} aria-hidden={copy === 1}>
                      {row.map((co) => (
                        <div className="sc-logo-tile" key={co.name}>
                          <span className="sc-logo-name" style={{ color: co.color }}>{co.name}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Talk to a Real Person ── */}
        <section className="sc-contact" aria-labelledby="contact-heading">
          <div className="sc-contact-text">
            <p className="sc-contact-eyebrow">Talk to a real person</p>
            <h2 id="contact-heading" className="sc-contact-title">Meet our industry experts</h2>
            <p className="sc-contact-sub">
              Get course guidance or ask about teaching with Netcoder.
            </p>
          </div>
          <div className="sc-contact-actions">
            <a href="tel:+917590832055" className="sc-btn sc-btn--primary sc-btn--lg">
              <PhoneCall className="sc-btn-icon" />
              Request a callback
            </a>
            <a href="mailto:teach@netcoder.in" className="sc-btn sc-btn--ghost sc-btn--lg">
              <GraduationCap className="sc-btn-icon" />
              Apply to teach
            </a>
          </div>
        </section>

        {/* ── Frequently Asked Questions ── */}
        <section className="sc-faq" aria-labelledby="faq-heading">
          <div className="sc-faq-heading">
            <p className="sc-faq-eyebrow">Course questions</p>
            <h2 id="faq-heading" className="sc-faq-title">Frequently asked questions</h2>
            <p className="sc-faq-subtitle">
              Helpful details for choosing a course and getting started.
            </p>
          </div>
          <div className="sc-faq-list">
            {FAQ_ITEMS.map((item) => (
              <details className="sc-faq-item" key={item.question}>
                <summary className="sc-faq-question">
                  <span>{item.question}</span>
                  <span className="sc-faq-toggle" aria-hidden="true" />
                </summary>
                <div className="sc-faq-answer-wrap">
                  <p className="sc-faq-answer">{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ── Trust Badges (ACRT) ── */}
        <section className="sc-trust" aria-label="Why Netcoder">
          {TRUST_BADGES.map((badge) => {
            const Icon = badge.icon;
            return (
              <div
                key={badge.title}
                className="sc-trust-card"
                style={{ background: badge.bg, borderColor: badge.border }}
              >
                <div
                  className="sc-trust-icon-wrap"
                  style={{ background: badge.bg, border: `1.5px solid ${badge.border}` }}
                >
                  <Icon className="sc-trust-icon" style={{ color: badge.iconColor } as CSSProperties} />
                </div>
                <h4 className="sc-trust-title">{badge.title}</h4>
                <p className="sc-trust-desc">{badge.desc}</p>
              </div>
            );
          })}
        </section>

      </div>{/* /sc-container */}

      {/* ── Cart Drawer ── */}
      {isCartOpen && (
        <>
          <button
            type="button"
            aria-label="Close cart"
            onClick={() => setIsCartOpen(false)}
            className="sc-cart-overlay"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-labelledby="course-cart-title"
            className="sc-cart-drawer"
          >
            <div className="sc-cart-hd">
              <div>
                <h2 id="course-cart-title" className="sc-cart-title">Your cart</h2>
                <p className="sc-cart-count">
                  {cartCourses.length === 1 ? "1 course" : `${cartCourses.length} courses`}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart"
                className="sc-cart-close"
              >
                <X className="sc-cart-close-icon" />
              </button>
            </div>
            <div className="sc-cart-items">
              {cartCourses.length === 0 ? (
                <div className="sc-cart-empty">
                  <ShoppingCart className="sc-cart-empty-icon" />
                  <p className="sc-cart-empty-title">Your cart is empty</p>
                  <p className="sc-cart-empty-sub">Add a course to see it here.</p>
                </div>
              ) : (
                cartCourses.map((course) => (
                  <div key={course.slug} className="sc-cart-item">
                    {course.image && (
                      <img src={course.image} alt="" className="sc-cart-item-img" />
                    )}
                    <div className="sc-cart-item-info">
                      <h3 className="sc-cart-item-title">{course.title}</h3>
                      <p className="sc-cart-item-price">₹{course.price.toLocaleString("en-IN")}</p>
                      <button
                        type="button"
                        onClick={() => handleCartCheckout(course)}
                        className="sc-btn sc-btn--primary sc-btn--sm"
                      >
                        Checkout <ArrowRight className="sc-btn-icon" />
                      </button>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${course.title} from cart`}
                      onClick={() =>
                        setCartCourses((current) =>
                          current.filter((item) => item.slug !== course.slug)
                        )
                      }
                      className="sc-cart-remove"
                    >
                      <Trash2 className="sc-cart-remove-icon" />
                    </button>
                  </div>
                ))
              )}
            </div>
            {cartCourses.length > 0 && (
              <div className="sc-cart-ft">
                <div className="sc-cart-total-row">
                  <span className="sc-cart-total-label">Cart total</span>
                  <span className="sc-cart-total-val">
                    ₹{cartCourses.reduce((t, c) => t + c.price, 0).toLocaleString("en-IN")}
                  </span>
                </div>
                <p className="sc-cart-ft-note">Checkout is completed one course at a time.</p>
              </div>
            )}
          </aside>
        </>
      )}

      <PaymentCheckoutModal
        course={activeCheckoutCourse}
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setActiveCheckoutCourse(null);
        }}
      />

      {/* ── Scoped Styles ── */}
      <style>{`
        /* PAGE */
        .sc-page {
          min-height: 100vh;
          background: #fff;
          color: #0f172a;
          font-family: 'Poppins', serif;
          -webkit-font-smoothing: antialiased;
          padding-bottom: 5rem;
        }
        .sc-container {
          max-width: 1152px;
          margin: 0 auto;
          padding: 2rem 1rem 0;
        }
        @media (min-width: 640px) { .sc-container { padding: 2.5rem 1.5rem 0; } }
        @media (min-width: 1024px) { .sc-container { padding: 3rem 2rem 0; } }

        /* HERO */
        .sc-hero {
          display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
          align-items: center; gap: clamp(1.5rem, 4vw, 3.25rem);
          margin-bottom: 3rem; width: 100%;
        }
        @media (max-width: 760px) { .sc-hero { grid-template-columns: 1fr; gap: 1.75rem; margin-bottom: 2.5rem; } }
        .sc-hero-copy { min-width: 0; }

        .sc-hero-badge {
          display: inline-flex; align-items: center; gap: 9px;
          padding: 7px 12px; border-radius: 999px;
          border: 1px solid #fed7aa; background: #fff7ed;
          font-size: 0.6875rem; font-weight: 800;
          letter-spacing: 0; text-transform: uppercase;
          color: #9a3412; margin-bottom: 1.125rem;
        }
        .sc-live-dot { width: 8px; height: 8px; display: inline-block; flex: 0 0 8px; border-radius: 50%; background: #ff5532; box-shadow: 0 0 0 3px rgba(255,85,50,0.12); }

        .sc-hero-title {
          max-width: 620px; font-size: clamp(2.125rem, 4.5vw, 3.75rem);
          font-weight: 600; line-height: 1.12;
          letter-spacing: 0; color: #0f172a; margin: 0 0 1rem;
        }
        .sc-hero-title span { color: #ff5532; }
        .sc-hero-sub { max-width: 580px; font-size: 0.9375rem; line-height: 1.75; color: #475569; margin: 0; }
        .sc-hero-actions { display: flex; align-items: center; flex-wrap: wrap; gap: 0.75rem 1rem; margin-top: 1.5rem; }
        .sc-hero-advisor { display: inline-flex; align-items: center; gap: 7px; min-height: 46px; padding: 0 8px; color: #334155; font-size: 0.8125rem; font-weight: 700; text-decoration: none; transition: color 0.2s ease; }
        .sc-hero-advisor:hover { color: #ff5532; }
        .sc-hero-advisor-icon { width: 16px; height: 16px; color: #ff5532; }
        .sc-hero-benefits { display: flex; flex-wrap: wrap; gap: 8px 16px; margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; color: #475569; font-size: 0.6875rem; font-weight: 600; line-height: 1.5; }
        .sc-hero-benefits span { display: inline-flex; align-items: center; gap: 7px; }
        .sc-hero-benefits span::before { width: 5px; height: 5px; content: ""; border-radius: 50%; background: #ff5532; }
        .sc-hero-visual { position: relative; min-width: 0; overflow: hidden; aspect-ratio: 1.38; border-radius: 8px; background: #e2e8f0; box-shadow: 0 14px 38px rgba(15,23,42,0.13); }
        .sc-hero-image { display: block; width: 100%; height: 100%; object-fit: cover; object-position: center 45%; }
        .sc-hero-visual::after { position: absolute; inset: 35% 0 0; content: ""; pointer-events: none; background: linear-gradient(transparent, rgba(15,23,42,0.72)); }
        .sc-hero-image-caption { position: absolute; z-index: 1; right: 1rem; bottom: 1rem; left: 1rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 8px; color: #fff; font-size: 0.75rem; font-weight: 700; }
        .sc-hero-image-live { display: inline-flex; align-items: center; gap: 8px; padding: 7px 10px; border-radius: 6px; background: rgba(15,23,42,0.72); font-size: 0.625rem; letter-spacing: 0.06em; }
        .sc-hero-image-live .sc-live-dot { width: 7px; height: 7px; flex-basis: 7px; background: #fb4f43; }
        @media (max-width: 760px) { .sc-hero-visual { aspect-ratio: 1.55; } }
        @media (max-width: 480px) { .sc-hero-title { font-size: clamp(1.875rem, 9vw, 2.375rem); } .sc-hero-visual { aspect-ratio: 1.15; } .sc-hero-image-caption { right: 0.75rem; bottom: 0.75rem; left: 0.75rem; font-size: 0.6875rem; } .sc-hero-benefits { flex-direction: column; gap: 7px; } }

        /* FILTER HEADER */
        .sc-filter-header {
          display: flex; flex-wrap: wrap; align-items: center;
          justify-content: space-between; gap: 8px; margin-bottom: 0.75rem;
        }
        .sc-filter-label { font-size: 1rem; font-weight: 700; color: #0f172a; margin: 0; }
        @media (min-width: 640px) { .sc-filter-label { font-size: 1.0625rem; } }

        .sc-advisor-link {
          display: inline-flex; align-items: center; gap: 6px;
          padding: 8px 12px; border-radius: 8px;
          font-size: 0.8125rem; font-weight: 600; color: #c2410c;
          text-decoration: none; transition: background 0.2s; white-space: nowrap;
        }
        .sc-advisor-link:hover { background: #fff7ed; }
        .sc-advisor-icon { width: 15px; height: 15px; flex-shrink: 0; }

        /* FILTER BAR */
        .sc-filter-bar {
          display: flex; flex-direction: column; gap: 10px;
          background: #fff; border: 1px solid #e2e8f0;
          border-radius: 14px; padding: 14px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          margin-bottom: 2rem;
        }
        @media (min-width: 768px) {
          .sc-filter-bar {
            flex-direction: row; align-items: center;
            justify-content: space-between; padding: 14px 18px;
            margin-bottom: 2.5rem;
          }
        }

        .sc-cat-scroll {
          display: flex; align-items: center; gap: 6px;
          overflow-x: auto; padding-bottom: 2px;
          -webkit-overflow-scrolling: touch; scrollbar-width: none;
        }
        .sc-cat-scroll::-webkit-scrollbar { display: none; }

        .sc-cat-pill {
          flex-shrink: 0; display: inline-flex; align-items: center;
          height: 36px; padding: 0 14px; border-radius: 8px;
          font-size: 0.75rem; font-weight: 700; white-space: nowrap;
          border: none; background: transparent; color: #475569;
          cursor: pointer;
          transition: background 0.15s, color 0.15s, transform 0.15s, box-shadow 0.15s;
        }
        .sc-cat-pill:hover { background: #f1f5f9; color: #0f172a; }
        .sc-cat-pill--active {
          background: #ff5532; color: #fff;
          box-shadow: 0 4px 12px rgba(255,85,50,0.3);
          transform: scale(1.02);
        }
        .sc-cat-pill--active:hover { background: #e04422; color: #fff; }

        .sc-search-wrap { position: relative; width: 100%; }
        @media (min-width: 768px) { .sc-search-wrap { width: 272px; flex-shrink: 0; } }
        .sc-search-icon {
          position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          width: 15px; height: 15px; color: #94a3b8; pointer-events: none;
        }
        .sc-search-input {
          width: 100%; height: 40px; padding: 0 14px 0 38px;
          border: 1px solid #cbd5e1; border-radius: 8px;
          background: #fff; font-size: 0.8125rem; color: #0f172a;
          outline: none; transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .sc-search-input::placeholder { color: #94a3b8; }
        .sc-search-input:focus {
          border-color: #ff5532; box-shadow: 0 0 0 3px rgba(255,85,50,0.1);
        }

        /* GRID */
        .sc-grid { display: grid; grid-template-columns: 1fr; gap: 1.25rem; }
        @media (min-width: 580px) { .sc-grid { grid-template-columns: repeat(2,1fr); gap: 1.375rem; } }
        @media (min-width: 1024px) { .sc-grid { grid-template-columns: repeat(3,1fr); gap: 1.5rem; } }

        /* SKELETON */
        .sc-skeleton {
          background: #fff; border: 1px solid #e2e8f0; border-radius: 14px;
          padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem;
          animation: sc-pulse 1.5s ease-in-out infinite;
        }
        .sc-skel-img { height: 176px; background: #e2e8f0; border-radius: 10px; }
        .sc-skel-body { display: flex; flex-direction: column; gap: 10px; }
        .sc-skel-line { height: 12px; background: #e2e8f0; border-radius: 6px; width: 100%; }
        .sc-skel-line--lg { width: 75%; height: 16px; }
        .sc-skel-line--sm { width: 55%; }
        .sc-skel-btn { height: 40px; background: #e2e8f0; border-radius: 8px; }
        @keyframes sc-pulse {
          0%,100% { opacity: 1; } 50% { opacity: 0.55; }
        }

        /* EMPTY */
        .sc-empty {
          text-align: center; padding: 5rem 1.5rem;
          background: #fff; border: 1px solid #e2e8f0; border-radius: 14px;
        }
        .sc-empty-icon { width: 48px; height: 48px; color: #94a3b8; margin: 0 auto 12px; }
        .sc-empty-title { font-size: 1rem; font-weight: 700; color: #0f172a; margin: 0 0 6px; }
        .sc-empty-sub { font-size: 0.8125rem; color: #475569; margin: 0 0 1rem; }
        .sc-empty-btn {
          display: inline-flex; align-items: center; height: 38px;
          padding: 0 18px; border-radius: 8px; background: #ff5532;
          border: 1px solid #ff5532; font-size: 0.8125rem; font-weight: 700;
          color: #fff; cursor: pointer;
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.25s ease;
        }
        .sc-empty-btn:hover { background: #fff; color: #000; border-color: #ff5532; transform: translateY(-1px); }

        /* CARD */
        .sc-card {
          display: flex; flex-direction: column; background: #fff;
          border: 1px solid #e2e8f0; border-radius: 16px;
          overflow: hidden; box-shadow: 0 2px 10px rgba(0,0,0,0.04);
          transition: transform 0.25s, box-shadow 0.25s, border-color 0.25s;
        }
        .sc-card:hover { transform: translateY(-4px); box-shadow: 0 10px 28px rgba(0,0,0,0.09); border-color: #cbd5e1; }
        .sc-card--enrolled { border-color: #6ee7b7; }
        .sc-card--enrolled:hover { border-color: #34d399; }

        .sc-thumb { position: relative; height: 180px; width: 100%; overflow: hidden; background: #e2e8f0; flex-shrink: 0; }
        .sc-thumb-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s; }
        .sc-card:hover .sc-thumb-img { transform: scale(1.05); }
        .sc-thumb-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(15,23,42,0.75) 0%, transparent 55%, rgba(0,0,0,0.18) 100%);
        }
        .sc-thumb-badges { position: absolute; top: 12px; left: 12px; display: flex; flex-wrap: wrap; gap: 6px; }

        .sc-chip {
          display: inline-flex; align-items: center; padding: 4px 10px;
          border-radius: 999px; font-size: 10px; font-weight: 800;
          letter-spacing: 0.05em; text-transform: uppercase; line-height: 1;
        }
        .sc-chip--dark {
          background: rgba(0,0,0,0.55); color: #fff;
          border: 1px solid rgba(255,255,255,0.1); backdrop-filter: blur(6px);
        }
        .sc-chip--accent { background: #ff5532; color: #fff; box-shadow: 0 2px 8px rgba(255,85,50,0.35); }

        .sc-enrolled-pill {
          position: absolute; top: 12px; right: 12px;
          display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 12px; border-radius: 999px; background: #10b981;
          color: #022c22; font-size: 11px; font-weight: 900;
          box-shadow: 0 2px 8px rgba(16,185,129,0.4);
        }
        .sc-enrolled-icon { width: 13px; height: 13px; }

        .sc-thumb-meta {
          position: absolute; bottom: 10px; left: 12px; right: 12px;
          display: flex; align-items: center; justify-content: space-between; gap: 6px;
        }
        .sc-meta-chip {
          display: inline-flex; align-items: center; gap: 5px;
          padding: 5px 10px; border-radius: 8px;
          background: rgba(0,0,0,0.5); backdrop-filter: blur(4px);
          font-size: 11px; color: #e2e8f0; font-weight: 600;
        }
        .sc-meta-icon { width: 13px; height: 13px; flex-shrink: 0; }
        .sc-meta-icon--red { color: #ff5532; }
        .sc-meta-icon--star { color: #fbbf24; fill: #fbbf24; }
        .sc-meta-rating { font-weight: 700; color: #fff; }
        .sc-meta-count { font-size: 10px; color: #94a3b8; }

        .sc-body {
          display: flex; flex-direction: column; justify-content: space-between;
          flex: 1; padding: 1.125rem 1.25rem 1.25rem; gap: 1rem;
        }
        @media (min-width: 640px) { .sc-body { padding: 1.25rem 1.375rem 1.375rem; } }

        .sc-card-title {
          font-size: 0.9375rem; font-weight: 800; line-height: 1.35;
          color: #0f172a; margin: 0 0 0.5rem;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
          transition: color 0.2s;
        }
        .sc-card:hover .sc-card-title { color: #c2410c; }
        @media (min-width: 640px) { .sc-card-title { font-size: 1rem; } }

        .sc-card-overview {
          font-size: 0.8125rem; line-height: 1.55; color: #475569; margin: 0;
          display: -webkit-box; -webkit-line-clamp: 2;
          -webkit-box-orient: vertical; overflow: hidden;
        }

        .sc-highlights {
          display: flex; flex-direction: column; gap: 7px;
          margin-top: 1rem; padding-top: 0.875rem;
          border-top: 1px solid #f1f5f9;
        }
        .sc-highlight-row { display: flex; align-items: flex-start; gap: 7px; font-size: 0.75rem; line-height: 1.5; color: #334155; }
        .sc-hl-icon { width: 12px; height: 12px; color: #ff5532; flex-shrink: 0; margin-top: 2px; }

        .sc-card-footer { display: flex; flex-direction: column; gap: 0.875rem; padding-top: 0.875rem; border-top: 1px solid #f1f5f9; }

        .sc-price-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #94a3b8; margin-bottom: 4px; }
        .sc-price-row { display: flex; align-items: baseline; gap: 8px; flex-wrap: wrap; }
        .sc-price-main { font-size: 1.375rem; font-weight: 900; letter-spacing: -0.02em; color: #0f172a; }
        .sc-price-orig { font-size: 0.8125rem; color: #94a3b8; text-decoration: line-through; }
        .sc-save-tag {
          display: inline-flex; align-items: center; padding: 3px 8px;
          border-radius: 6px; border: 1px solid #bbf7d0; background: #f0fdf4;
          font-size: 10px; font-weight: 800; color: #15803d;
        }

        .sc-card-actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }

        /* BUTTONS */
        .sc-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 6px;
          height: 40px; padding: 0 16px; border-radius: 9px;
          font-size: 0.8125rem; font-weight: 700; border: 1px solid #ff5532; cursor: pointer;
          text-decoration: none; white-space: nowrap; box-sizing: border-box;
          background: #ff5532; color: #fff;
          transition: background 0.25s ease, color 0.25s ease, border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
          letter-spacing: 0.01em;
        }
        .sc-btn:active { transform: scale(0.97); }
        .sc-btn:disabled { opacity: 0.6; cursor: default; pointer-events: none; }
        .sc-btn:hover:not(:disabled) { background: #fff; color: #000; border-color: #ff5532; box-shadow: 0 4px 12px rgba(255,85,50,0.16); }
        .sc-btn--primary { box-shadow: 0 2px 8px rgba(255,85,50,0.25); }
        .sc-btn--ghost, .sc-btn--green { background: #ff5532; color: #fff; border-color: #ff5532; }
        .sc-btn--sm { height: 34px; padding: 0 12px; font-size: 0.75rem; border-radius: 7px; }
        .sc-btn--lg { height: 46px; padding: 0 24px; font-size: 0.9375rem; }
        .sc-btn-icon { width: 15px; height: 15px; flex-shrink: 0; }
        .sc-btn-icon--green { color: #10b981; }

        /* COMPANIES / BUILD SKILLS */
        .sc-companies {
          margin-top: 4rem; padding: 3rem 0;
          border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;
        }
        @media (min-width: 640px) { .sc-companies { margin-top: 5rem; padding: 3.5rem 0; } }

        .sc-companies-hd { text-align: center; padding: 0 0.5rem; margin-bottom: 2.5rem; }
        .sc-companies-title {
          font-size: clamp(1.125rem, 2.5vw, 1.4375rem);
          font-weight: 800; color: #0f172a; margin: 0 0 0.625rem; line-height: 1.3;
        }
        .sc-companies-sub { font-size: 0.875rem; color: #64748b; margin: 0; line-height: 1.6; }

        .sc-marquee { display: flex; flex-direction: column; gap: 14px; }
        .sc-mq-viewport { width: 100%; overflow: hidden; padding: 4px 0 6px; }
        .sc-mq-track { display: flex; width: max-content; }
        .sc-mq-track--right { animation: sc-scroll-right 32s linear infinite; }
        .sc-mq-track--left { animation: sc-scroll-left 32s linear infinite; }
        .sc-marquee:hover .sc-mq-track,
        .sc-marquee:focus-within .sc-mq-track { animation-play-state: paused; }
        .sc-mq-group { display: flex; flex: none; gap: 12px; padding-right: 12px; }
        @media (min-width: 640px) { .sc-mq-group { gap: 16px; padding-right: 16px; } }

        .sc-logo-tile {
          flex: 0 0 180px; height: 68px;
          display: flex; align-items: center; justify-content: center;
          background: #fff; border: 1px solid #e2e8f0; border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: transform 0.25s, border-color 0.25s, box-shadow 0.25s;
        }
        @media (min-width: 640px) { .sc-logo-tile { flex-basis: 215px; height: 74px; } }
        .sc-logo-tile:hover { transform: translateY(-3px); border-color: #cbd5e1; box-shadow: 0 6px 16px rgba(0,0,0,0.08); }
        .sc-logo-name { font-size: 1rem; font-weight: 800; letter-spacing: -0.01em; }
        @media (min-width: 640px) { .sc-logo-name { font-size: 1.0625rem; } }

        @keyframes sc-scroll-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes sc-scroll-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }
        @media (prefers-reduced-motion: reduce) { .sc-mq-track { animation: none !important; } }

        /* CONTACT */
        .sc-contact {
          display: flex; flex-direction: column; gap: 1.5rem;
          background: #fff; border: 1px solid #e2e8f0; border-radius: 18px;
          padding: 1.75rem 1.5rem; margin-top: 2.5rem;
          box-shadow: 0 2px 12px rgba(0,0,0,0.05);
        }
        @media (min-width: 640px) {
          .sc-contact {
            flex-direction: row; align-items: center;
            justify-content: space-between; padding: 2rem 2.25rem; gap: 2rem;
          }
        }
        .sc-contact-text { flex: 1; min-width: 0; }
        .sc-contact-eyebrow {
          font-size: 11px; font-weight: 800; text-transform: uppercase;
          letter-spacing: 0.1em; color: #c2410c; margin: 0 0 6px;
        }
        .sc-contact-title {
          font-size: clamp(1.125rem, 2.5vw, 1.375rem);
          font-weight: 800; color: #0f172a; margin: 0 0 6px; line-height: 1.25;
        }
        .sc-contact-sub { font-size: 0.875rem; color: #475569; margin: 0; line-height: 1.55; }
        .sc-contact-actions { display: flex; flex-direction: column; gap: 10px; flex-shrink: 0; }
        @media (min-width: 400px) { .sc-contact-actions { flex-direction: row; flex-wrap: wrap; } }
        @media (min-width: 640px) { .sc-contact-actions { flex-direction: column; } }
        @media (min-width: 800px) { .sc-contact-actions { flex-direction: row; flex-wrap: nowrap; } }

        /* FAQ */
        .sc-faq { width: min(100%, 900px); margin: 3rem auto 0; padding-top: 2.5rem; border-top: 1px solid #e2e8f0; }
        @media (min-width: 640px) { .sc-faq { margin-top: 4rem; padding-top: 3rem; } }
        .sc-faq-heading { max-width: 680px; margin: 0 auto 1.5rem; text-align: center; }
        .sc-faq-eyebrow { margin: 0 0 0.5rem; color: #c2410c; font-size: 0.6875rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; }
        .sc-faq-title { margin: 0; color: #0f172a; font-size: clamp(1.5rem, 3vw, 2rem); font-weight: 800; line-height: 1.3; }
        .sc-faq-subtitle { margin: 0.625rem 0 0; color: #64748b; font-size: 0.875rem; line-height: 1.6; }
        .sc-faq-list { display: grid; grid-template-columns: 1fr; gap: 0.75rem; }
        .sc-faq-item { align-self: start; overflow: hidden; border: 1px solid #e2e8f0; border-radius: 10px; background: #fff; transition: border-color 0.2s ease, box-shadow 0.2s ease; }
        .sc-faq-item[open] { border-color: #ffb5a5; box-shadow: 0 4px 14px rgba(15,23,42,0.05); }
        .sc-faq-question { display: flex; align-items: center; justify-content: space-between; gap: 1rem; min-height: 58px; padding: 0.875rem 1rem; color: #1e293b; font-size: 16px; font-weight: 700; line-height: 1.5; cursor: pointer; list-style: none; }
        .sc-faq-question::-webkit-details-marker { display: none; }
        .sc-faq-toggle { position: relative; width: 16px; height: 16px; flex: 0 0 16px; }
        .sc-faq-toggle::before, .sc-faq-toggle::after { position: absolute; top: 50%; left: 50%; width: 12px; height: 2px; background: #ff5532; content: ""; transform: translate(-50%, -50%); transition: transform 0.2s ease; }
        .sc-faq-toggle::after { transform: translate(-50%, -50%) rotate(90deg); }
        .sc-faq-item[open] .sc-faq-toggle::after { transform: translate(-50%, -50%) rotate(0); }
        .sc-faq-answer-wrap { padding: 0 1rem 1rem; animation: sc-faq-reveal 0.22s ease both; }
        .sc-faq-answer { margin: 0; color: #475569; font-size: 16px; line-height: 1.7; }
        @keyframes sc-faq-reveal { from { opacity: 0; transform: translateY(-4px); } to { opacity: 1; transform: translateY(0); } }
        @media (prefers-reduced-motion: reduce) { .sc-btn, .sc-empty-btn, .sc-faq-item, .sc-faq-toggle::before, .sc-faq-toggle::after { transition: none; } .sc-faq-answer-wrap { animation: none; } }

        /* TRUST / ACRT */
        .sc-trust {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 0.875rem; margin-top: 2rem; padding-top: 2rem;
          border-top: 1px solid #f1f5f9;
          margin-bottom: 1rem;
        }
        @media (min-width: 768px) { .sc-trust { grid-template-columns: repeat(4,1fr); gap: 1rem; } }

        .sc-trust-card {
          display: flex; flex-direction: column; align-items: flex-start; gap: 10px;
          padding: 1.125rem 1rem; border-radius: 14px; border: 1px solid transparent;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        @media (min-width: 640px) { .sc-trust-card { padding: 1.25rem 1.125rem; gap: 12px; } }
        .sc-trust-card:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.07); }

        .sc-trust-icon-wrap {
          display: flex; align-items: center; justify-content: center;
          width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
        }
        .sc-trust-icon { width: 20px; height: 20px; }
        .sc-trust-title { font-size: 0.8125rem; font-weight: 800; color: #0f172a; margin: 0; line-height: 1.3; }
        @media (min-width: 640px) { .sc-trust-title { font-size: 0.875rem; } }
        .sc-trust-desc { font-size: 0.75rem; color: #64748b; line-height: 1.5; margin: 0; }

        /* CART */
        .sc-cart-overlay {
          position: fixed; inset: 0; z-index: 60;
          background: rgba(0,0,0,0.65); backdrop-filter: blur(2px);
          border: none; cursor: pointer;
        }
        .sc-cart-drawer {
          position: fixed; inset-block: 0; right: 0; z-index: 61;
          display: flex; flex-direction: column;
          width: min(100vw, 420px); background: #fff;
          border-left: 1px solid #e2e8f0; box-shadow: -4px 0 24px rgba(0,0,0,0.1);
        }
        .sc-cart-hd {
          display: flex; align-items: center; justify-content: space-between;
          padding: 1.125rem 1.25rem; border-bottom: 1px solid #e2e8f0;
        }
        .sc-cart-title { font-size: 1.0625rem; font-weight: 800; color: #0f172a; margin: 0; }
        .sc-cart-count { font-size: 0.75rem; color: #64748b; margin: 3px 0 0; }
        .sc-cart-close {
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px; border-radius: 8px;
          background: transparent; border: none; color: #64748b;
          cursor: pointer; transition: background 0.15s, color 0.15s;
        }
        .sc-cart-close:hover { background: #f1f5f9; color: #0f172a; }
        .sc-cart-close-icon { width: 18px; height: 18px; }
        .sc-cart-items {
          flex: 1; overflow-y: auto; padding: 1.125rem;
          display: flex; flex-direction: column; gap: 0.75rem;
        }
        .sc-cart-empty { text-align: center; padding: 3.5rem 1rem; }
        .sc-cart-empty-icon { width: 40px; height: 40px; color: #94a3b8; margin: 0 auto 12px; }
        .sc-cart-empty-title { font-size: 0.9375rem; font-weight: 700; color: #0f172a; margin: 0 0 5px; }
        .sc-cart-empty-sub { font-size: 0.8125rem; color: #64748b; margin: 0; }
        .sc-cart-item {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 0.875rem; border: 1px solid #e2e8f0; border-radius: 10px; background: #fff;
        }
        .sc-cart-item-img { width: 64px; height: 56px; object-fit: cover; border-radius: 8px; flex-shrink: 0; }
        .sc-cart-item-info { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 5px; }
        .sc-cart-item-title {
          font-size: 0.8125rem; font-weight: 600; color: #0f172a; margin: 0;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
        }
        .sc-cart-item-price { font-size: 0.875rem; font-weight: 700; color: #c2410c; margin: 0; }
        .sc-cart-remove {
          display: flex; align-items: center; justify-content: center;
          width: 32px; height: 32px; border-radius: 7px;
          background: transparent; border: none; color: #94a3b8;
          cursor: pointer; flex-shrink: 0; transition: background 0.15s, color 0.15s;
        }
        .sc-cart-remove:hover { background: #fef2f2; color: #ef4444; }
        .sc-cart-remove-icon { width: 15px; height: 15px; }
        .sc-cart-ft { padding: 1rem 1.25rem; border-top: 1px solid #e2e8f0; }
        .sc-cart-total-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px; }
        .sc-cart-total-label { font-size: 0.875rem; color: #475569; }
        .sc-cart-total-val { font-size: 0.9375rem; font-weight: 800; color: #0f172a; }
        .sc-cart-ft-note { font-size: 11px; color: #94a3b8; margin: 0; }
      `}</style>
    </div>
  );
}

export default function SelectCoursePage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#fff", fontSize: "0.875rem", color: "#64748b" }}>
          Loading learning pathways…
        </div>
      }
    >
      <SelectCourseContent />
    </Suspense>
  );
}
