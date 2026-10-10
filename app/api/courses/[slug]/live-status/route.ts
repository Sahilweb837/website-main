// app/api/courses/[slug]/live-status/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await context.params;
        if (!slug) {
            return NextResponse.json({ success: false, message: "Course slug required" }, { status: 400 });
        }

        const laravelBase = process.env.LARAVEL_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${laravelBase}/api/courses/${slug}/live-status`, {
            cache: "no-store",
            headers: { Accept: "application/json" },
        });

        if (res.ok) {
            const data = await res.json();
            return NextResponse.json(data);
        }

        return NextResponse.json({
            success: true,
            hasLiveClass: false,
            isLiveNow: false,
            status: "no_live_session",
            message: "No Live Class Available right now. Next batch session will be scheduled soon by your mentor.",
        });
    } catch (err: any) {
        return NextResponse.json({
            success: true,
            hasLiveClass: false,
            isLiveNow: false,
            status: "no_live_session",
            message: "No Live Class Available right now. Next batch session will be scheduled soon by your mentor.",
        });
    }
}
