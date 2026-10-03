import { NextResponse } from "next/server";

export interface LMSDpaAssignment {
  id: string;
  courseSlug: string;
  title: string;
  deadline: string;
  points: number;
  status: "pending" | "submitted" | "graded";
  grade?: string;
  feedback?: string;
  submissionUrl?: string;
  taskDescription: string;
}

let dpaDatabase: LMSDpaAssignment[] = [
  {
    id: "dpa-101",
    courseSlug: "fullstack-web-development",
    title: "DPA #12: Build Responsive Modern Hero Section with Tailwind & Flexbox",
    deadline: "Tomorrow, 11:59 PM",
    points: 100,
    status: "submitted",
    grade: "96 / 100 (A+)",
    feedback: "Exceptional typography choice and clean mobile responsiveness. Great semantic HTML tags!",
    submissionUrl: "https://github.com/netcoder-student/dpa-12-hero",
    taskDescription: "Create a pixel-perfect, responsive hero section with call-to-action buttons, glassmorphic stat card, and fluid container.",
  },
  {
    id: "dpa-102",
    courseSlug: "fullstack-web-development",
    title: "DPA #13: Implement JWT Authentication & Session Middleware in Express.js",
    deadline: "In 3 Days",
    points: 100,
    status: "pending",
    taskDescription: "Write a Node/Express middleware that validates Bearer JWT tokens, handles token expiration, and signs refresh tokens.",
  },
  {
    id: "dpa-103",
    courseSlug: "fullstack-web-development",
    title: "DPA #14: Fullstack CRUD with React Query & MongoDB Aggregation",
    deadline: "Oct 12, 2026",
    points: 150,
    status: "pending",
    taskDescription: "Connect React frontend with Express backend using TanStack Query for optimistic UI updates.",
  },
  {
    id: "dpa-104",
    courseSlug: "data-science-machine-learning",
    title: "DPA #08: Clean Real-World Sales Dataset with Pandas & Impute Missing Data",
    deadline: "In 2 Days",
    points: 100,
    status: "pending",
    taskDescription: "Handle nulls, categorical encoding, and generate pairplot visualizations with Seaborn.",
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseSlug = searchParams.get("courseSlug");

    let result = dpaDatabase;
    if (courseSlug) {
      result = dpaDatabase.filter((d) => d.courseSlug === courseSlug);
    }

    return NextResponse.json({
      success: true,
      count: result.length,
      data: result,
      source: "Netcoder LMS / Laravel Bridge",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch DPA assignments", error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { dpaId, submissionUrl, notes } = body;

    const assignment = dpaDatabase.find((d) => d.id === dpaId);
    if (!assignment) {
      return NextResponse.json(
        { success: false, message: "Assignment not found" },
        { status: 404 }
      );
    }

    assignment.status = "submitted";
    assignment.submissionUrl = submissionUrl || "https://github.com/student/dpa-solution";
    assignment.feedback = "Submitted for mentor review. Evaluation within 24 hours.";

    return NextResponse.json({
      success: true,
      message: "DPA Assignment submitted successfully for evaluation",
      data: assignment,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to submit DPA", error: String(error) },
      { status: 400 }
    );
  }
}
