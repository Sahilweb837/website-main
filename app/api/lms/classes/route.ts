import { NextResponse } from "next/server";
import { INITIAL_CLASSES, calculateAutomatedClassStatus, type LiveClass } from "@/data/lms-mentor-data";

// In-memory store initialized with rich seed data
let liveClassesDatabase: LiveClass[] = [...INITIAL_CLASSES];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseSlug = searchParams.get("courseSlug");
    const mentorEmail = searchParams.get("mentorEmail");
    const status = searchParams.get("status");

    // Automatically recalculate status based on current time
    let result = liveClassesDatabase.map((cls) => ({
      ...cls,
      status: calculateAutomatedClassStatus(cls),
    }));

    if (courseSlug) {
      result = result.filter((c) => c.courseSlug === courseSlug);
    }

    if (mentorEmail) {
      result = result.filter((c) => c.mentorEmail === mentorEmail);
    }

    if (status) {
      result = result.filter((c) => c.status === status);
    }

    return NextResponse.json({
      success: true,
      count: result.length,
      data: result,
      timestamp: new Date().toISOString(),
      source: "Netcoder LMS Classes Engine",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch live classes", error: String(error) },
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
      mentorName,
      mentorEmail,
      date,
      startTime,
      endTime,
      time,
      platform,
      meetingLink,
      meetingId,
      passcode,
      agenda,
      isAutomatedDaily,
      batch,
    } = body;

    if (!courseSlug || !title || !meetingLink) {
      return NextResponse.json(
        { success: false, message: "Missing required fields: courseSlug, title, and meetingLink are mandatory" },
        { status: 400 }
      );
    }

    const newClass: LiveClass = {
      id: `cls-${Date.now()}`,
      courseSlug,
      courseTitle: courseTitle || courseSlug.replace(/-/g, " ").replace(/\b\w/g, (c: string) => c.toUpperCase()),
      title,
      mentorName: mentorName || "Netcoder Faculty Mentor",
      mentorEmail: mentorEmail || "mentor@netcoder.in",
      mentorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      date: date || new Date().toISOString().split("T")[0],
      startTime: startTime || "18:00",
      endTime: endTime || "19:30",
      time: time || `${startTime || "18:00"} - ${endTime || "19:30"} IST`,
      platform: platform || "Google Meet",
      meetingLink,
      meetingId: meetingId || "netcoder-class-" + Math.floor(Math.random() * 900 + 100),
      passcode: passcode || "NET" + Math.floor(Math.random() * 9000 + 1000),
      status: "upcoming",
      agenda: Array.isArray(agenda) && agenda.length > 0 ? agenda : ["Live lecture & practical walkthrough", "Doubt clarification & live coding"],
      isAutomatedDaily: Boolean(isAutomatedDaily),
      batch: batch || "Batch 2026",
      createdAt: new Date().toISOString(),
    };

    // Recalculate status in case the class is happening now
    newClass.status = calculateAutomatedClassStatus(newClass);

    liveClassesDatabase.unshift(newClass);

    return NextResponse.json(
      {
        success: true,
        message: "Live class link created and published successfully to enrolled students",
        data: newClass,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to create live class", error: String(error) },
      { status: 400 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, ...updates } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Class id is required for updates" },
        { status: 400 }
      );
    }

    const index = liveClassesDatabase.findIndex((c) => c.id === id);
    if (index === -1) {
      return NextResponse.json(
        { success: false, message: "Live class not found" },
        { status: 404 }
      );
    }

    liveClassesDatabase[index] = {
      ...liveClassesDatabase[index],
      ...updates,
    };

    return NextResponse.json({
      success: true,
      message: "Live class updated successfully",
      data: liveClassesDatabase[index],
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to update live class", error: String(error) },
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
        { success: false, message: "Class id is required to delete" },
        { status: 400 }
      );
    }

    liveClassesDatabase = liveClassesDatabase.filter((c) => c.id !== id);

    return NextResponse.json({
      success: true,
      message: "Live class removed successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to delete live class", error: String(error) },
      { status: 500 }
    );
  }
}
