// app/lms/checkout/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import CheckoutForm from "@/components/lms/payment/CheckoutForm";
import { useCheckout } from "@/hooks/useCheckout";
import { LMS_COURSES } from "@/data/lms-courses";
import type { CheckoutCourse } from "@/lib/payments";
import { CheckoutPageSkeleton } from "@/components/lms/CourseSkeleton";
import { api } from "@/lib/api";

function CheckoutContent() {
    const router = useRouter();
    const params = useSearchParams();
    const slug = params.get("course");
    const initialCoupon = params.get("coupon") || "";

    const [course, setCourse] = useState<CheckoutCourse | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        async function fetchCourse() {
            if (!slug) {
                setIsLoading(false);
                return;
            }

            setIsLoading(true);
            try {
                // 1. Fetch dynamically from Laravel Backend / Next.js REST API
                const res = await api.getCourseBySlug(slug);
                if (isMounted && res && res.data) {
                    const item = res.data;
                    const fallback = LMS_COURSES.find((c) => c.slug === item.slug) || LMS_COURSES[0];
                    setCourse({
                        slug: item.slug,
                        title: item.title,
                        price: Number(item.price ?? item.fee ?? fallback.price ?? 79),
                        originalPrice: Number(item.originalPrice ?? item.original_price ?? fallback.originalPrice ?? 180),
                        image: item.image || fallback.image || "/images/full-stact-development.png",
                        instructor: item.instructor || fallback.instructor || "Netcoder Expert Faculty",
                        duration: item.duration || fallback.duration || "40 hrs",
                        level: item.level || fallback.level || "Intermediate",
                    });
                    setIsLoading(false);
                    return;
                }
            } catch (err) {
                console.warn("[Checkout] Error fetching course from backend, checking local cache:", err);
            }

            // 2. Fallback to local curriculum if API unavailable
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

    useEffect(() => {
        if (initialCoupon && checkout) {
            checkout.setCouponInput(initialCoupon.toUpperCase());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialCoupon]);

    // Show high-end skeleton shimmer while API data is being fetched
    if (isLoading) {
        return <CheckoutPageSkeleton />;
    }

    if (!course) {
        return (
            <div className="min-h-[70vh] flex items-center justify-center p-6 bg-[#faf8ff]">
                <div className="max-w-md text-center bg-white border border-slate-200 rounded-3xl p-10 shadow-sm">
                    <span className="material-symbols-outlined text-orange-600 text-[56px]">
                        search_off
                    </span>
                    <h1 className="text-xl font-black text-[#131b2e] mt-3">
                        Course not found
                    </h1>
                    <p className="text-sm text-slate-500 mt-2">
                        The course you're trying to purchase doesn't exist or has been modified.
                    </p>
                    <Link
                        href="/lms/explore"
                        className="inline-block mt-6 text-xs bg-orange-600 hover:bg-orange-700 text-white font-bold px-6 py-3 rounded-xl shadow-md transition-all"
                    >
                        Explore All Courses
                    </Link>
                </div>
            </div>
        );
    }

    const handleSubmit = async () => {
        const order = await checkout.submit();
        if (!order) return;

        // Redirect to success confirmation
        router.push(
            `/lms/checkout/success?orderId=${encodeURIComponent(order.orderId)}&course=${encodeURIComponent(course.slug)}`
        );
    };

    return (
        <div className="min-h-screen bg-[#faf8ff] py-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Breadcrumb */}
                <nav className="text-[11px] text-slate-500 mb-6 flex items-center gap-1.5">
                    <Link href="/lms/explore" className="hover:text-orange-600">
                        Courses
                    </Link>
                    <span>/</span>
                    <span className="text-slate-700 font-semibold truncate max-w-[240px]">
                        {course.title}
                    </span>
                    <span>/</span>
                    <span className="text-orange-600 font-semibold">Checkout</span>
                </nav>

                <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10">
                    <header className="mb-8">
                        <h1 className="text-2xl sm:text-3xl font-black text-[#131b2e]">
                            Complete your enrollment
                        </h1>
                        <p className="text-sm text-slate-500 mt-1">
                            Secure checkout · Instant course access after payment
                        </p>
                    </header>

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
                        submitLabel="Pay Securely & Enroll"
                    />
                </div>
            </div>
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<CheckoutPageSkeleton />}>
            <CheckoutContent />
        </Suspense>
    );
}