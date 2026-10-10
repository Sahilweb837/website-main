// app/api/placement/apply/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const name = body.name || body.full_name;
        const email = body.email;
        const phone = body.phone;

        if (!name || !email || !phone) {
            return NextResponse.json(
                { success: false, message: "Name, email, and phone number are required." },
                { status: 400 }
            );
        }

        const laravelBase = process.env.LARAVEL_API_URL || "http://127.0.0.1:8000";
        const laravelRes = await fetch(`${laravelBase}/api/placement/apply`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                phone: phone,
                qualification: body.qualification || body.highest_qualification || "Graduate",
                course_slug: body.course_slug || body.courseSlug || "fullstack-web-development",
                target_role: body.target_role || body.targetRole || "Full Stack Developer",
                track_preference: body.track_preference || body.preferred_track || "online",
                notes: body.notes || body.linkedin_or_github || "",
            }),
        });

        if (!laravelRes.ok) {
            const errData = await laravelRes.json().catch(() => ({}));
            return NextResponse.json(
                { success: false, message: errData.message || "Failed to submit application to database." },
                { status: laravelRes.status }
            );
        }

        const data = await laravelRes.json();
        return NextResponse.json(data);
    } catch (err: any) {
        console.error("[placement/apply] Proxy error:", err);
        return NextResponse.json(
            { success: false, message: err?.message || "Internal server error" },
            { status: 500 }
        );
    }
}
