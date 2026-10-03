import { NextResponse } from "next/server";
import { DEFAULT_ENROLLMENTS } from "@/data/lms-data";
import type { Enrollment } from "@/data/lms-data";

let enrollments: Enrollment[] = [...DEFAULT_ENROLLMENTS];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    let result = enrollments;
    if (userId) {
      result = enrollments.filter((e) => e.userId === userId);
    }

    return NextResponse.json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch enrollments", error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, courseSlug } = body;

    if (!userId || !courseSlug) {
      return NextResponse.json(
        { success: false, message: "userId and courseSlug are required" },
        { status: 400 }
      );
    }

    const existing = enrollments.find(
      (e) => e.userId === userId && e.courseSlug === courseSlug
    );

    if (existing) {
      return NextResponse.json({
        success: true,
        message: "Already enrolled",
        data: existing,
      });
    }

    const newEnrollment: Enrollment = {
      id: `enroll-${Date.now()}`,
      userId,
      courseSlug,
      course: null as any,
      enrollmentDate: new Date().toISOString().split("T")[0],
      progress: 0,
      completedLessons: [],
      currentLessonId: null,
    };

    enrollments.unshift(newEnrollment);

    return NextResponse.json(
      { success: true, message: "Enrolled successfully", data: newEnrollment },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to enroll", error: String(error) },
      { status: 400 }
    );
  }
}
