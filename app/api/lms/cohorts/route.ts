// app/api/lms/cohorts/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const laravelBase = process.env.LARAVEL_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${laravelBase}/api/lms/cohorts`, {
            cache: "no-store",
            headers: { Accept: "application/json" },
        });

        if (res.ok) {
            const data = await res.json();
            return NextResponse.json(data);
        }

        return NextResponse.json({ success: true, count: 0, data: [] });
    } catch (err: any) {
        console.warn("[lms/cohorts] Proxy error:", err);
        return NextResponse.json({ success: true, count: 0, data: [] });
    }
}
