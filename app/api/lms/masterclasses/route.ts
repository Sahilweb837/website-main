import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");

    // Fetch masterclasses directly from Laravel REST Backend
    const laravelUrl = `http://localhost:8000/api/lms/masterclasses${status ? `?status=${encodeURIComponent(status)}` : ""}`;
    const laravelRes = await fetch(laravelUrl, {
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (laravelRes.ok) {
      const json = await laravelRes.json();
      return NextResponse.json(json);
    }

    return NextResponse.json(
      { success: false, message: ` backend error ${laravelRes.status}` },
      { status: laravelRes.status }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ success: false, message }, { status: 500 });
  }
}
