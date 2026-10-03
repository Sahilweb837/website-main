import { NextResponse } from "next/server";
import { INITIAL_NOTES, type MentorNote } from "@/data/lms-mentor-data";

let notesDatabase: MentorNote[] = [...INITIAL_NOTES];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseSlug = searchParams.get("courseSlug");

    let result = notesDatabase;
    if (courseSlug) {
      result = notesDatabase.filter((n) => n.courseSlug === courseSlug);
    }

    return NextResponse.json({
      success: true,
      count: result.length,
      data: result,
      source: "Netcoder LMS Notes Engine",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch mentor notes", error: String(error) },
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
      topic,
      module,
      mentorName,
      fileUrl,
      fileType,
      fileSize,
      contentSnippet,
    } = body;

    if (!courseSlug || !title) {
      return NextResponse.json(
        { success: false, message: "courseSlug and title are required" },
        { status: 400 }
      );
    }

    const newNote: MentorNote = {
      id: `note-${Date.now()}`,
      courseSlug,
      courseTitle: courseTitle || courseSlug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
      title,
      topic: topic || "Course Notes",
      module: module || "Module Resource",
      mentorName: mentorName || "Netcoder Faculty Mentor",
      fileUrl: fileUrl || "https://netcoder.in/downloads/study-material.pdf",
      fileType: fileType || "pdf",
      fileSize: fileSize || "3.5 MB",
      contentSnippet: contentSnippet || "Key notes and architectural summary uploaded by course mentor.",
      publishedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      downloadsCount: 1,
    };

    notesDatabase.unshift(newNote);

    return NextResponse.json(
      {
        success: true,
        message: "Study note published successfully",
        data: newNote,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to publish note", error: String(error) },
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
        { success: false, message: "Note id is required" },
        { status: 400 }
      );
    }

    notesDatabase = notesDatabase.filter((n) => n.id !== id);

    return NextResponse.json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete note", error: String(error) },
      { status: 500 }
    );
  }
}
