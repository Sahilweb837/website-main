// app/lms/checkout/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import CheckoutForm from "@/components/lms/payment/CheckoutForm";
import PaymentProcessingOverlay from "@/components/lms/payment/PaymentProcessingOverlay";
import { useCheckout } from "@/hooks/useCheckout";
import { LMS_COURSES } from "@/data/lms-courses";
import type { CheckoutCourse } from "@/lib/payments";
import { CheckoutPageSkeleton } from "@/components/lms/CourseSkeleton";
import { api } from "@/lib/api";
import {
    PhoneCall,
    ShieldCheck,
    MapPin,
    Laptop,
    Sparkles,
    CheckCircle2,
    MessageCircle,
    ArrowLeft,
    Users,
    Clock,
    Star,
    ChevronRight,
} from "lucide-react";

/* ─────────────────────────────────────────────
   SUB‑COMPONENTS
   ───────────────────────────────────────────── */

function TrackCard({
    active,
    onClick,
    icon: Icon,
    title,
    price,
    description,
    badge,
    badgeColor = "text-emerald-600",
}: {
    active: boolean;
    onClick: () => void;
    icon: React.ElementType;
    title: string;
    price: string;
    description: string;
    badge: string;
    badgeColor?: string;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`relative w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 ${active
                ? "border-orange-500 bg-orange-50/60 shadow-md shadow-orange-500/10"
                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                }`}
        >
            {active && (
                <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                    <CheckCircle2 size={12} className="text-white" />
                </span>
            )}
            <div className="flex items-center gap-2.5 mb-2">
                <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${active ? "bg-orange-500 text-white" : "bg-slate-100 text-slate-500"
                        }`}
                >
                    <Icon size={17} />
                </div>
                <h4 className="font-bold text-slate-900 text-sm leading-tight pr-6">{title}</h4>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed mb-3">{description}</p>
            <div className="flex items-center justify-between">
                <span className={`text-[11px] font-semibold flex items-center gap-1 ${badgeColor}`}>
                    <Sparkles size={12} /> {badge}
                </span>
                <span className="text-sm font-black text-slate-900">{price}</span>
            </div>
        </button>
    );
}

function AdvisorModal({
    open,
    onClose,
    submitted,
    onSubmit,
    name,
    setName,
    phone,
    setPhone,
}: {
    open: boolean;
    onClose: () => void;
    submitted: boolean;
    onSubmit: (e: React.FormEvent) => void;
    name: string;
    setName: (v: string) => void;
    phone: string;
    setPhone: (v: string) => void;
}) {
    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Panel */}
            <div className="relative w-full sm:max-w-md bg-white rounded-t-3xl sm:rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
                <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                            <PhoneCall size={18} />
                        </div>
                        <h3 className="font-extrabold text-slate-900 text-base sm:text-lg">
                            Talk to an Advisor
                        </h3>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition"
                    >
                        <span className="text-lg leading-none">&times;</span>
                    </button>
                </div>

                {submitted ? (
                    <div className="text-center py-8">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 size={34} />
                        </div>
                        <h4 className="font-bold text-slate-900 text-base">Callback Requested!</h4>
                        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                            Our Senior Course Advisor will call you within 15 minutes at{" "}
                            <strong className="text-slate-700">{phone}</strong>.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={onSubmit} className="space-y-4">
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Have questions about the syllabus, placement assistance, or fee
                            structure? Get free personalised 1-on-1 career guidance.
                        </p>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                Full Name
                            </label>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Rahul Sharma"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-700 mb-1.5">
                                Phone Number (with WhatsApp)
                            </label>
                            <input
                                type="tel"
                                required
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="e.g. 98765 43210"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:border-orange-500 transition"
                            />
                        </div>
                        <div className="pt-2 flex flex-col-reverse sm:flex-row gap-2 sm:justify-end">
                            <button
                                type="button"
                                onClick={onClose}
                                className="px-5 py-3 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-xs font-bold text-white shadow-md shadow-orange-600/20 transition"
                            >
                                Connect Me with Advisor
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────
   MAIN CONTENT
   ───────────────────────────────────────────── */

function CheckoutContent() {
    const router = useRouter();
    const params = useSearchParams();
    const slug = params.get("course");
    const initialCoupon = params.get("coupon") || "";

    const [course, setCourse] = useState<CheckoutCourse | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [trackMode, setTrackMode] = useState<"online" | "offline">("online");

    // Advisor modal state
    const [advisorModalOpen, setAdvisorModalOpen] = useState(false);
    const [advisorPhone, setAdvisorPhone] = useState("");
    const [advisorName, setAdvisorName] = useState("");
    const [advisorSubmitted, setAdvisorSubmitted] = useState(false);

    // Processing state
    const [isProcessing, setIsProcessing] = useState(false);
    const [createdOrder, setCreatedOrder] = useState<any>(null);

    /* ── Fetch course ── */
    useEffect(() => {
        let isMounted = true;
        async function fetchCourse() {
            if (!slug) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                const res = await api.getCourseBySlug(slug);
                if (isMounted && res?.data) {
                    const item = res.data;
                    const fallback =
                        LMS_COURSES.find((c) => c.slug === item.slug) || LMS_COURSES[0];
                    setCourse({
                        slug: item.slug,
                        title: item.title,
                        price: Number(item.price ?? item.fee ?? fallback.price ?? 79),
                        originalPrice: Number(
                            item.originalPrice ?? item.original_price ?? fallback.originalPrice ?? 180
                        ),
                        image: item.image || fallback.image || "/images/full-stact-development.png",
                        instructor: item.instructor || fallback.instructor || "Netcoder Expert Faculty",
                        duration: item.duration || fallback.duration || "40 hrs",
                        level: item.level || fallback.level || "Intermediate",
                    });
                    setIsLoading(false);
                    return;
                }
            } catch (err) {
                console.warn("[Checkout] Backend fetch failed, using local cache:", err);
            }

            if (isMounted) {
                const local = LMS_COURSES.find((x) => x.slug === slug);
                if (local) {
                    setCourse({
                        slug: local.slug,
                        title: local.title,
                        price: local.price,
                        originalPrice: local.originalPrice,
                        image: local.image,
                        instructor: local.instructor,
                        duration: local.duration,
                        level: local.level,
                    });
                }
                setIsLoading(false);
            }
        }

        fetchCourse();
        return () => {
            isMounted = false;
        };
    }, [slug]);

    const checkout = useCheckout(course);

    /* ── Apply initial coupon from URL ── */
    useEffect(() => {
        if (initialCoupon && checkout) {
            checkout.setCouponInput(initialCoupon.toUpperCase());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialCoupon]);

    /* ── Handlers ── */
    const handleSubmit = async () => {
        const order = await checkout.submit();
        if (!order) return;
        setCreatedOrder(order);
        setIsProcessing(true);
    };

    const handleProcessingComplete = () => {
        if (!createdOrder || !course) return;
        router.push(
            `/lms/checkout/success?orderId=${encodeURIComponent(
                createdOrder.orderId
            )}&course=${encodeURIComponent(course.slug)}`
        );
    };

    const handleAdvisorSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setAdvisorSubmitted(true);
        setTimeout(() => {
            setAdvisorSubmitted(false);
            setAdvisorModalOpen(false);
            setAdvisorPhone("");
            setAdvisorName("");
        }, 3000);
    };

    /* ── Loading skeleton ── */
    if (isLoading) return <CheckoutPageSkeleton />;

    /* ── Course not found ── */
    if (!course) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center p-6 bg-[#faf8ff]">
                <div className="max-w-md w-full text-center bg-white border border-slate-200 rounded-3xl p-10 shadow-sm">
                    <span className="material-symbols-outlined text-orange-600 text-[56px]">
                        search_off
                    </span>
                    <h1 className="text-xl font-black text-[#131b2e] mt-3">Course not found</h1>
                    <p className="text-sm text-slate-500 mt-2 leading-relaxed">
                        The course you&apos;re trying to purchase doesn&apos;t exist or has been
                        modified.
                    </p>
                    <Link
                        href="/lms/courses"
                        className="inline-block mt-6 text-xs bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all"
                    >
                        Explore All Courses
                    </Link>
                </div>
            </div>
        );
    }

    const offlinePrice = "₹12,999";

    /* ── Render ── */
    return (
        <div className="min-h-screen bg-[#faf8ff]">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">

                {/* ═══════════════════════════════════════════
            TOP BANNER – Talk to Advisor
        ═══════════════════════════════════════════ */}
                <div className="bg-gradient-to-r from-orange-50 via-white to-amber-50 border border-orange-200/70 rounded-2xl p-4 sm:p-5 mb-6 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="flex items-start sm:items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-orange-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-orange-600/20">
                                <PhoneCall size={18} />
                            </div>
                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-2 mb-0.5">
                                    <span className="text-[11px] font-black uppercase tracking-wider text-orange-600">
                                        Need Guidance?
                                    </span>
                                    <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                                        Advisors Online
                                    </span>
                                </div>
                                <p className="text-xs sm:text-sm text-slate-700 font-semibold leading-snug">
                                    Speak with a Senior Course Counselor &bull; Call{" "}
                                    <strong className="text-slate-900">+91 98765 43210</strong>
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                            <button
                                type="button"
                                onClick={() => setAdvisorModalOpen(true)}
                                className="flex-1 sm:flex-none bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
                            >
                                <MessageCircle size={14} /> Request Callback
                            </button>
                            <a
                                href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20information%20about%20Netcoder%20courses%20and%20enrollment."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 sm:flex-none bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow-sm flex items-center justify-center gap-1.5"
                            >
                                WhatsApp
                            </a>
                        </div>
                    </div>
                </div>

                {/* ═══════════════════════════════════════════
            BREADCRUMB
        ═══════════════════════════════════════════ */}
                <nav className="text-[11px] text-slate-500 mb-6 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
                    <Link
                        href="/lms/courses"
                        className="hover:text-orange-600 flex items-center gap-1 flex-shrink-0"
                    >
                        <ArrowLeft size={12} /> My Courses
                    </Link>
                    <ChevronRight size={10} className="text-slate-400 flex-shrink-0" />
                    <span className="text-slate-700 font-semibold truncate max-w-[180px] sm:max-w-[300px]">
                        {course.title}
                    </span>
                    <ChevronRight size={10} className="text-slate-400 flex-shrink-0" />
                    <span className="text-orange-600 font-semibold flex-shrink-0">
                        Payment &amp; Checkout
                    </span>
                </nav>

                {/* ═══════════════════════════════════════════
            MAIN GRID – Left: form, Right: course card
        ═══════════════════════════════════════════ */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">

                    {/* ─── LEFT COLUMN ─── */}
                    <div className="lg:col-span-7 xl:col-span-8 space-y-6">

                        {/* ── Track selector ── */}
                        <section className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-sm">
                            <div className="flex items-center gap-2 mb-4">
                                <Star size={14} className="text-orange-500" />
                                <span className="text-xs font-bold uppercase text-slate-500 tracking-wider">
                                    Choose Your Learning Format
                                </span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                                <TrackCard
                                    active={trackMode === "online"}
                                    onClick={() => setTrackMode("online")}
                                    icon={Laptop}
                                    title="Online Interactive Track"
                                    price={`₹${course.price}`}
                                    description="Live Zoom/Meet sessions, recorded archive, 1-on-1 mentor code reviews, 24/7 community support."
                                    badge="Instant access after checkout"
                                />
                                <TrackCard
                                    active={trackMode === "offline"}
                                    onClick={() => setTrackMode("offline")}
                                    icon={MapPin}
                                    title="Offline Campus & Lab (Dharamshala)"
                                    price={offlinePrice}
                                    description="In-person classroom, dual-monitor workstation, daily mentor guidance, mountain campus, PG assistance."
                                    badge="100% Placement Guarantee"
                                    badgeColor="text-orange-600"
                                />
                            </div>
                        </section>

                        {/* ── Checkout form ── */}
                        <section className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 px-6 sm:px-8 py-5 sm:py-6">
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                    <div>
                                        <h1 className="text-xl sm:text-2xl font-black text-[#131b2e]">
                                            Complete your enrollment
                                        </h1>
                                        <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                                            Secure checkout &middot; Instant access &middot; 7‑day money‑back
                                            guarantee
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-1.5 rounded-xl text-[11px] font-bold self-start sm:self-auto">
                                        <ShieldCheck size={15} /> 256‑Bit SSL Encrypted
                                    </div>
                                </div>
                            </div>

                            {/* Form body */}
                            <div className="px-6 sm:px-8 py-6 sm:py-8">
                                <CheckoutForm
                                    course={course}
                                    customer={checkout.customer}
                                    setCustomer={checkout.setCustomer}
                                    method={checkout.method}
                                    setMethod={checkout.setMethod}
                                    couponInput={checkout.couponInput}
                                    setCouponInput={checkout.setCouponInput}
                                    couponApplied={checkout.couponApplied}
                                    onApplyCoupon={checkout.onApplyCoupon}
                                    resetCoupon={checkout.resetCoupon}
                                    totals={checkout.totals}
                                    onSubmit={handleSubmit}
                                    isSubmitting={checkout.isSubmitting}
                                    errorMsg={checkout.errorMsg}
                                    submitLabel="Pay Securely & Enroll Now"
                                />
                            </div>
                        </section>
                    </div>

                    {/* ─── RIGHT COLUMN – Course summary (sticky on desktop) ─── */}
                    <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-8 space-y-4">
                        <div className="bg-white rounded-3xl border border-slate-200 shadow-lg overflow-hidden">
                            {/* Course image */}
                            <div className="relative aspect-video bg-slate-100">
                                <img
                                    src={course.image}
                                    alt={course.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                                <span className="absolute bottom-3 left-3 bg-orange-600 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-lg">
                                    {course.level}
                                </span>
                            </div>

                            {/* Course meta */}
                            <div className="p-5 sm:p-6">
                                <h3 className="font-extrabold text-slate-900 text-base sm:text-lg leading-snug mb-3">
                                    {course.title}
                                </h3>

                                <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 mb-4">
                                    <span className="flex items-center gap-1">
                                        <Users size={12} /> {course.instructor}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={12} /> {course.duration}
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="flex items-end gap-3 pb-4 border-b border-slate-100">
                                    <span className="text-3xl font-black text-[#131b2e]">
                                        ₹{course.price}
                                    </span>
                                    <span className="text-sm text-slate-400 line-through mb-1">
                                        ₹{course.originalPrice}
                                    </span>
                                    <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full mb-1.5">
                                        Save{" "}
                                        {Math.round(
                                            ((course.originalPrice - course.price) / course.originalPrice) * 100
                                        )}
                                        %
                                    </span>
                                </div>

                                {/* Includes */}
                                <ul className="mt-4 space-y-2.5">
                                    {[
                                        "Full lifetime access",
                                        "Certificate of completion",
                                        "Downloadable resources",
                                        "1‑on‑1 mentor sessions",
                                    ].map((item) => (
                                        <li
                                            key={item}
                                            className="flex items-center gap-2 text-xs text-slate-600"
                                        >
                                            <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Trust strip */}
                        <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm">
                            <div className="grid grid-cols-3 gap-3 text-center">
                                {[
                                    { icon: ShieldCheck, label: "Secure Payment" },
                                    { icon: CheckCircle2, label: "Money‑Back" },
                                    { icon: PhoneCall, label: "24/7 Support" },
                                ].map(({ icon: Icon, label }) => (
                                    <div key={label} className="flex flex-col items-center gap-1.5">
                                        <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center">
                                            <Icon size={15} />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-500 leading-tight">
                                            {label}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>

            {/* ═══════════════════════════════════════════
          ADVISOR MODAL
      ═══════════════════════════════════════════ */}
            <AdvisorModal
                open={advisorModalOpen}
                onClose={() => setAdvisorModalOpen(false)}
                submitted={advisorSubmitted}
                onSubmit={handleAdvisorSubmit}
                name={advisorName}
                setName={setAdvisorName}
                phone={advisorPhone}
                setPhone={setAdvisorPhone}
            />

            {/* ═══════════════════════════════════════════
          PAYMENT PROCESSING OVERLAY
      ═══════════════════════════════════════════ */}
            {isProcessing && (
                <PaymentProcessingOverlay
                    isProcessing={isProcessing}
                    courseTitle={course.title}
                    amountINR={checkout.totals?.totalINR || course.price}
                    method={checkout.method}
                    orderId={createdOrder?.orderId}
                    onComplete={handleProcessingComplete}
                />
            )}
        </div>
    );
}

/* ─────────────────────────────────────────────
   PAGE EXPORT
   ───────────────────────────────────────────── */

export default function CheckoutPage() {
    return (
        <Suspense fallback={<CheckoutPageSkeleton />}>
            <CheckoutContent />
        </Suspense>
    );
}