"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth/context";

function CheckoutSuccessContent() {
    const params = useSearchParams();
    const router = useRouter();
    const orderId = params.get("orderId") || "";
    const courseSlug = params.get("course") || "";
    const [verifying, setVerifying] = useState(true);
    const [ok, setOk] = useState(false);
    const [paymentVerified, setPaymentVerified] = useState(false);
    const [message, setMessage] = useState("");
    const { enrollCourse, enrolledCourses, isAuthLoaded, user } = useAuth();

    useEffect(() => {
        async function verify() {
            let paymentWasVerified = false;
            try {
                const res = await fetch("/api/checkout/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ orderId }),
                });
                const data = await res.json();
                if (res.ok && data.success) {
                    paymentWasVerified = true;
                    setPaymentVerified(true);
                    setMessage(data.message || "Course activated.");
                } else {
                    setOk(false);
                    setMessage(data?.error || "Verification failed.");
                }
            } catch {
                setOk(false);
                setMessage("Network error.");
            } finally {
                if (!paymentWasVerified) setVerifying(false);
            }
        }
        if (orderId) verify();
        else {
            setVerifying(false);
            setOk(false);
            setMessage("Missing order ID.");
        }
    }, [orderId]);

    useEffect(() => {
        if (!paymentVerified || !isAuthLoaded) return;
        if (!courseSlug) {
            setMessage("Payment was verified, but the course could not be identified. Please contact support with your order ID.");
            setVerifying(false);
            return;
        }
        if (!user) {
            setMessage("Payment was verified. Sign in to finish activating your course.");
            setVerifying(false);
            return;
        }

        const enrollmentSaved = enrolledCourses.includes(courseSlug)
            || enrollCourse(courseSlug, { orderId });
        if (enrollmentSaved) {
            setOk(true);
        } else {
            setMessage("Payment was verified, but enrollment could not be saved. Please try again or contact support.");
        }
        setVerifying(false);
    }, [courseSlug, enrolledCourses, enrollCourse, isAuthLoaded, orderId, paymentVerified, user]);

    useEffect(() => {
        if (!ok || !courseSlug || !enrolledCourses.includes(courseSlug)) return;
        const redirectTimer = window.setTimeout(() => {
            router.replace("/lms/dashboard");
        }, 900);
        return () => window.clearTimeout(redirectTimer);
    }, [courseSlug, enrolledCourses, ok, router]);

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-6 bg-[#faf8ff]">
            <div className="max-w-lg w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 text-center">
                {verifying ? (
                    <>
                        <div className="w-14 h-14 mx-auto border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                        <p className="text-sm text-slate-500 mt-4">
                            Verifying your payment...
                        </p>
                    </>
                ) : ok ? (
                    <>
                        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[36px]">
                                check_circle
                            </span>
                        </div>
                        <h1 className="text-2xl font-black text-[#131b2e] mt-4">
                            Enrollment Successful 🎉
                        </h1>
                        <p className="text-sm text-slate-500 mt-2">{message}</p>
                        <p className="text-xs text-slate-400 mt-2">Opening your learning dashboard…</p>
                        <p className="text-[11px] text-slate-400 mt-1">
                            Order ID: <span className="font-mono">{orderId}</span>
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <Link
                                href="/lms/dashboard"
                                className="flex-1 text-xs bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-3 rounded-xl"
                            >
                                Go to Dashboard
                            </Link>
                            {courseSlug && (
                                <Link
                                    href={`/lms/classroom/${courseSlug}`}
                                    className="flex-1 text-xs bg-slate-900 hover:bg-slate-800 text-white font-bold px-5 py-3 rounded-xl transition flex items-center justify-center gap-1.5"
                                >
                                    Enter Classroom →
                                </Link>
                            )}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-16 h-16 mx-auto rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                            <span className="material-symbols-outlined text-[36px]">
                                error
                            </span>
                        </div>
                        <h1 className="text-xl font-black text-[#131b2e] mt-4">
                            {paymentVerified ? "Finish activating your course" : "Payment could not be verified"}
                        </h1>
                        <p className="text-sm text-slate-500 mt-2">{message}</p>
                        {paymentVerified && !user ? (
                            <Link
                                href={`/login?redirect=${encodeURIComponent(`/lms/checkout/success?orderId=${orderId}&course=${courseSlug}`)}`}
                                className="inline-block mt-6 text-xs bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-3 rounded-xl"
                            >
                                Sign in to activate
                            </Link>
                        ) : (
                            <Link
                                href="/lms/courses"
                                className="inline-block mt-6 text-xs bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-3 rounded-xl"
                            >
                                Back to Courses
                            </Link>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-[70vh] flex items-center justify-center p-6 bg-[#faf8ff]">
                <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin" />
            </div>
        }>
            <CheckoutSuccessContent />
        </Suspense>
    );
}