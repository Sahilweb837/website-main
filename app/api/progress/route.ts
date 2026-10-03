import { NextResponse } from "next/server";

interface ProgressEntry {
  userId: string;
  courseSlug: string;
  lessonId: string;
  completed: boolean;
  timestamp: string;
}

const progressStore: ProgressEntry[] = [];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const courseSlug = searchParams.get("courseSlug");

    let result = progressStore;
    if (userId) {
      result = result.filter((p) => p.userId === userId);
    }
    if (courseSlug) {
      result = result.filter((p) => p.courseSlug === courseSlug);
    }

    return NextResponse.json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch progress", error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, courseSlug, lessonId, completed } = body;

    if (!userId || !courseSlug || !lessonId) {
      return NextResponse.json(
        { success: false, message: "userId, courseSlug, and lessonId are required" },
        { status: 400 }
      );
    }

    const existingIndex = progressStore.findIndex(
      (p) =>
        p.userId === userId &&
        p.courseSlug === courseSlug &&
        p.lessonId === lessonId
    );

    if (existingIndex !== -1) {
      progressStore[existingIndex].completed = completed ?? true;
      progressStore[existingIndex].timestamp = new Date().toISOString();
    } else {
      progressStore.push({
        userId,
        courseSlug,
        lessonId,
        completed: completed ?? true,
        timestamp: new Date().toISOString(),
      });
    }

    return NextResponse.json({
      success: true,
      message: "Progress updated",
      data: progressStore.filter((p) => p.userId === userId),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update progress", error: String(error) },
      { status: 400 }
    );
  }
}
