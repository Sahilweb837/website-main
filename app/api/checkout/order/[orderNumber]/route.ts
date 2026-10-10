// app/api/checkout/order/[orderNumber]/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ orderNumber: string }> }
) {
    try {
        const { orderNumber } = await context.params;
        if (!orderNumber) {
            return NextResponse.json({ success: false, message: "Order number required" }, { status: 400 });
        }

        const laravelBase = process.env.LARAVEL_API_URL || "http://127.0.0.1:8000";
        const res = await fetch(`${laravelBase}/api/checkout/order/${orderNumber}`, {
            cache: "no-store",
            headers: { Accept: "application/json" },
        });

        if (res.ok) {
            const data = await res.json();
            return NextResponse.json(data);
        }

        return NextResponse.json({
            success: false,
            message: "Order details not found in database",
        }, { status: res.status });
    } catch (err: any) {
        return NextResponse.json({
            success: false,
            message: err?.message || "Internal server error",
        }, { status: 500 });
    }
}
