import { NextResponse } from "next/server";

let studentsList = [
  {
    id: "demo-001",
    studentCode: "NC-STU-2026-001",
    name: "Sahil Sandhu",
    email: "sahil@netcoder.in",
    phone: "9876543210",
    course: "Full Stack Web Development",
    courseSlug: "fullstack-web-development",
    enrolledDate: "2026-09-20",
    progress: 35,
    completedLessons: 2,
    totalLessons: 10,
    drmStatus: "Protected",
    lastActive: "Today, 18:40",
  },
  {
    id: "stu-002",
    studentCode: "NC-STU-2026-002",
    name: "Priya Sharma",
    email: "priya.sharma@gmail.com",
    phone: "9812345678",
    course: "Data Science & Machine Learning",
    courseSlug: "data-science-machine-learning",
    enrolledDate: "2026-09-18",
    progress: 60,
    completedLessons: 6,
    totalLessons: 8,
    drmStatus: "Protected",
    lastActive: "Yesterday",
  },
  {
    id: "stu-003",
    studentCode: "NC-STU-2026-003",
    name: "Amit Patel",
    email: "amit.dev@outlook.com",
    phone: "9845612378",
    course: "Cyber Security & Ethical Hacking",
    courseSlug: "cyber-security",
    enrolledDate: "2026-09-22",
    progress: 20,
    completedLessons: 1,
    totalLessons: 6,
    drmStatus: "Protected",
    lastActive: "3 days ago",
  },
  {
    id: "stu-004",
    studentCode: "NC-STU-2026-004",
    name: "Neha Thakur",
    email: "neha.uiux@gmail.com",
    phone: "9871234560",
    course: "UI/UX & Product Design",
    courseSlug: "ui-ux-design",
    enrolledDate: "2026-09-25",
    progress: 45,
    completedLessons: 4,
    totalLessons: 8,
    drmStatus: "Protected",
    lastActive: "Today, 14:15",
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const query = searchParams.get("q");

    if (id) {
      const student = studentsList.find((s) => s.id === id);
      if (!student) {
        return NextResponse.json(
          { success: false, message: "Student not found" },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: student });
    }

    let results = studentsList;
    if (query) {
      const q = query.toLowerCase();
      results = results.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.course.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch students", error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.email || !body.course) {
      return NextResponse.json(
        { success: false, message: "name, email and course are required" },
        { status: 400 }
      );
    }

    const newStudent = {
      id: `stu-${Date.now()}`,
      studentCode: `NC-STU-2026-${Math.floor(100 + Math.random() * 900)}`,
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      course: body.course,
      courseSlug: (body.courseSlug || body.course).toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      enrolledDate: new Date().toISOString().split("T")[0],
      progress: 0,
      completedLessons: 0,
      totalLessons: body.totalLessons || 10,
      drmStatus: "Protected",
      lastActive: "Just now",
    };

    studentsList.unshift(newStudent);

    return NextResponse.json(
      {
        success: true,
        message: "Student enrolled successfully",
        data: newStudent,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error enrolling student", error: String(error) },
      { status: 400 }
    );
  }
}
