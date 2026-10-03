import { NextResponse } from "next/server";

// In-memory store (resets on server restart; hook to DB/email if needed)
let inquiries = [];

export async function GET() {
  return NextResponse.json({ success: true, count: inquiries.length, data: inquiries });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const entry = {
      id: Date.now(),
      name: body.name || "Unknown",
      phone: body.phone || "",
      email: body.email || "",
      course: body.course || "",
      mode: body.mode || "",
      created_at: new Date().toISOString().replace("T", " ").substring(0, 19),
    };
    inquiries.unshift(entry);
    return NextResponse.json({ success: true, message: "Inquiry submitted!", data: entry }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 400 });
  }
}
