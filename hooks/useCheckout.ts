// hooks/useCheckout.ts
"use client";

import { useCallback, useMemo, useState } from "react";
import {
    applyCoupon,
    computeTotals,
    type CheckoutCourse,
    type CheckoutCustomer,
    type PaymentMethod,
} from "@/lib/payments";

export function useCheckout(course: CheckoutCourse | null) {
    const [customer, setCustomer] = useState<CheckoutCustomer>({
        fullName: "",
        email: "",
        phone: "",
        country: "India",
        state: "",
        city: "",
        pincode: "",
    });
    const [method, setMethod] = useState<PaymentMethod>("upi");
    const [couponInput, setCouponInput] = useState("");
    const [couponApplied, setCouponApplied] = useState<{
        valid: boolean;
        message: string;
        discountPct: number;
    }>({ valid: false, message: "", discountPct: 0 });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const totals = useMemo(() => {
        if (!course) return null;
        return computeTotals(course.price, couponApplied.discountPct);
    }, [course, couponApplied.discountPct]);

    const onApplyCoupon = useCallback(() => {
        if (!course || !totals) return;
        const res = applyCoupon(couponInput, totals.subtotalINR);
        if (res.valid) {
            setCouponApplied({
                valid: true,
                message: res.message,
                discountPct: (res.discountINR / totals.subtotalINR) * 100,
            });
        } else {
            setCouponApplied({ valid: false, message: res.message, discountPct: 0 });
        }
    }, [couponInput, course, totals]);

    const resetCoupon = useCallback(() => {
        setCouponApplied({ valid: false, message: "", discountPct: 0 });
        setCouponInput("");
    }, []);

    const submit = useCallback(async () => {
        if (!course || !totals) return null;
        setIsSubmitting(true);
        setErrorMsg("");
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    courseSlug: course.slug,
                    customer,
                    method,
                    couponCode: couponApplied.valid ? couponInput : undefined,
                }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || "Checkout failed.");
            return data.order;
        } catch (e: any) {
            setErrorMsg(e?.message || "Something went wrong.");
            return null;
        } finally {
            setIsSubmitting(false);
        }
    }, [course, totals, customer, method, couponApplied.valid, couponInput]);

    return {
        customer,
        setCustomer,
        method,
        setMethod,
        couponInput,
        setCouponInput,
        couponApplied,
        onApplyCoupon,
        resetCoupon,
        totals,
        isSubmitting,
        errorMsg,
        submit,
    };
}