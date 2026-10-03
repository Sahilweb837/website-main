import { NextResponse } from "next/server";
import { INITIAL_FEEDBACK } from "@/data/feedback";

// In-memory persistent storage for feedback responses during runtime
let feedbacks = [...INITIAL_FEEDBACK];

export async function GET() {
  return NextResponse.json({
    success: true,
    count: feedbacks.length,
    data: feedbacks
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newEntry = {
      id: Date.now(),
      student_name: body.student_name || "Anonymous Student",
      contact_number: body.contact_number || "",
      email: body.email || null,
      course: body.course || "General",
      semester: body.semester || "1st",
      heard_about: body.heard_about || "Seminar",
      overall_assessment: body.overall_assessment || "Very Satisfied",
      seminar_length: body.seminar_length || "Satisfied",
      recommend: body.recommend || "Very Likely",
      team_experience: body.team_experience || "Excellent",
      session_interest: body.session_interest || "Excellent",
      suggestions: body.suggestions || "",
      interested_courses: body.interested_courses || [],
      created_at: new Date().toISOString().replace("T", " ").substring(0, 19)
    };

    feedbacks.unshift(newEntry);

    return NextResponse.json({
      success: true,
      message: "Feedback submitted successfully!",
      data: newEntry
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Failed to save feedback",
      error: error.message
    }, { status: 400 });
  }
}
