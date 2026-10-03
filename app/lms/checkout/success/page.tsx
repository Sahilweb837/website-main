"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth/context";

function CheckoutSuccessContent() {
    const params = useSearchParams();
    const orderId = params.get("orderId") || "";
    const courseSlug = params.get("course") || "";
    const [verifying, setVerifying] = useState(true);
    const [ok, setOk] = useState(false);
    const [message, setMessage] = useState("");
    const { enrollCourse } = useAuth();

    useEffect(() => {
        async function verify() {
            try {
                const res = await fetch("/api/checkout/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ orderId }),
                });
                const data = await res.json();
                if (res.ok && data.success) {
                    setOk(true);
                    setMessage(data.message || "Course activated.");
                    if (courseSlug) {
                        enrollCourse(courseSlug, { orderId });
                    }
                } else {
                    setOk(false);
                    setMessage(data?.error || "Verification failed.");
                }
            } catch {
                setOk(false);
                setMessage("Network error.");
            } finally {
                setVerifying(false);
            }
        }
        if (orderId) verify();
        else {
            setVerifying(false);
            setOk(false);
            setMessage("Missing order ID.");
        }
    }, [orderId]);

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
                            Payment could not be verified
                        </h1>
                        <p className="text-sm text-slate-500 mt-2">{message}</p>
                        <Link
                            href="/lms/courses"
                            className="inline-block mt-6 text-xs bg-orange-600 hover:bg-orange-700 text-white font-bold px-5 py-3 rounded-xl"
                        >
                            Back to Courses
                        </Link>
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