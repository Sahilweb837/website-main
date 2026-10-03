import { NextResponse } from "next/server";
import { COURSES } from "@/data/courses";
import { BLOGS } from "@/data/blogs";
import { INITIAL_FEEDBACK } from "@/data/feedback";
import { DEFAULT_ENROLLMENTS } from "@/data/lms-data";

export async function GET() {
  try {
    const stats = {
      totalCourses: COURSES.length,
      publishedBlogs: BLOGS.length,
      seminarFeedbacks: INITIAL_FEEDBACK.length,
      enrolledStudents: 4, // Sahil Sandhu, Priya Sharma, Amit Patel, Neha Thakur
      totalEnrollments: DEFAULT_ENROLLMENTS.length,
      averageRating: 4.9,
      drmEngine: {
        status: "Armed & Guarded",
        antiScreenshot: true,
        antiDownload: true,
        dynamicWatermark: true,
        focusShield: true,
        strictMode: true,
      },
      systemHealth: "Optimal",
      dbStatus: "Connected",
      lastBackup: "Today at 04:00 AM",
    };

    return NextResponse.json({
      success: true,
      data: stats,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch stats", error: String(error) },
      { status: 500 }
    );
  }
}
