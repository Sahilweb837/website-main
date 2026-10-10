// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
    isEmail,
    isPhone,
    computeTotals,
    applyCoupon,
    USD_TO_INR,
    type PaymentMethod,
} from "@/lib/payments";
import { LMS_COURSES } from "@/data/lms-courses";
import { getAuthoritativeCourse } from "@/app/api/courses/route";

interface Body {
    courseSlug: string;
    customer: {
        fullName: string;
        email: string;
        phone: string;
        country: string;
        state?: string;
        city?: string;
        pincode?: string;
    };
    method: PaymentMethod;
    couponCode?: string;
}

export async function POST(req: NextRequest) {
    try {
        const body = (await req.json()) as Body;

        /* ---------- Server-side validation ---------- */
        if (!body?.courseSlug)
            return NextResponse.json({ error: "Missing course." }, { status: 400 });
        if (!body?.customer?.fullName?.trim())
            return NextResponse.json({ error: "Name is required." }, { status: 400 });
        if (!isEmail(body.customer.email))
            return NextResponse.json({ error: "Invalid email." }, { status: 400 });
        if (!isPhone(body.customer.phone))
            return NextResponse.json({ error: "Invalid phone." }, { status: 400 });
        if (!body.customer.country)
            return NextResponse.json({ error: "Country is required." }, { status: 400 });

        /* ---------- Look up authoritative price ---------- */
        const course = getAuthoritativeCourse(body.courseSlug) || LMS_COURSES.find((c) => c.slug === body.courseSlug);
        if (!course)
            return NextResponse.json({ error: "Course not found." }, { status: 404 });

        /* ---------- Recompute totals ---------- */
        let discountPct = 0;
        if (body.couponCode) {
            const subtotalINR = Math.round(course.price * USD_TO_INR);
            const res = applyCoupon(body.couponCode, subtotalINR);
            if (res.valid) discountPct = (res.discountINR / subtotalINR) * 100;
        }
        const totals = computeTotals(course.price, discountPct);

        /* ---------- Create order ID ---------- */
        const orderId = `NC-${Date.now()}-${Math.random()
            .toString(36)
            .slice(2, 8)
            .toUpperCase()}`;

        const order = {
            orderId,
            courseSlug: course.slug,
            courseTitle: course.title,
            customer: body.customer,
            method: body.method,
            couponCode: body.couponCode || null,
            currency: "INR" as const,
            amountINR: totals.totalINR,
            amountUSD: totals.totalUSD,
            taxINR: totals.taxINR,
            discountINR: totals.discountINR,
            status: "pending" as const,
            createdAt: new Date().toISOString(),
        };

        /* ---------- Persist order & enrollment to Laravel SQL DB ---------- */
        try {
            const laravelBase = process.env.LARAVEL_API_URL || "http://127.0.0.1:8000";
            const laravelRes = await fetch(`${laravelBase}/api/checkout/process`, {
                method: "POST",
                headers: { "Content-Type": "application/json", "Accept": "application/json" },
                body: JSON.stringify({
                    course_slug: course.slug,
                    name: body.customer.fullName,
                    email: body.customer.email,
                    phone: body.customer.phone,
                    amount: totals.totalINR,
                    payment_method: body.method,
                    track_type: "online",
                }),
            });
            if (laravelRes.ok) {
                const laravelData = await laravelRes.json();
                if (laravelData?.orderId) {
                    order.orderId = laravelData.orderId;
                }
            }
        } catch (dbErr) {
            console.warn("[checkout] Laravel SQL persistence error:", dbErr);
        }

        return NextResponse.json({ order });
    } catch (err: any) {
        console.error("[checkout] error:", err);
        return NextResponse.json(
            { error: err?.message || "Server error." },
            { status: 500 }
        );
    }
}