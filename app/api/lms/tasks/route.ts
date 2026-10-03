import { NextResponse } from "next/server";
import { INITIAL_TASKS, type MentorTask } from "@/data/lms-mentor-data";

let tasksDatabase: MentorTask[] = [...INITIAL_TASKS];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseSlug = searchParams.get("courseSlug");

    let result = tasksDatabase;
    if (courseSlug) {
      result = tasksDatabase.filter((t) => t.courseSlug === courseSlug);
    }

    return NextResponse.json({
      success: true,
      count: result.length,
      data: result,
      source: "Netcoder LMS Tasks Engine",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch tasks", error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      courseSlug,
      courseTitle,
      title,
      description,
      dueDate,
      points,
      starterRepo,
      submissionType,
      mentorName,
    } = body;

    if (!courseSlug || !title) {
      return NextResponse.json(
        { success: false, message: "courseSlug and title are required" },
        { status: 400 }
      );
    }

    const newTask: MentorTask = {
      id: `task-${Date.now()}`,
      courseSlug,
      courseTitle: courseTitle || courseSlug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
      title,
      description: description || "Complete this practical assignment and submit your GitHub repository or project link.",
      dueDate: dueDate || new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      points: Number(points) || 100,
      status: "open",
      starterRepo: starterRepo || "",
      submissionType: submissionType || "github",
      mentorName: mentorName || "Netcoder Faculty Mentor",
      submissionsCount: 0,
    };

    tasksDatabase.unshift(newTask);

    return NextResponse.json(
      {
        success: true,
        message: "Assignment task published successfully to enrolled cohort",
        data: newTask,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to publish task", error: String(error) },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Task id is required" },
        { status: 400 }
      );
    }

    tasksDatabase = tasksDatabase.filter((t) => t.id !== id);

    return NextResponse.json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete task", error: String(error) },
      { status: 500 }
    );
  }
}
