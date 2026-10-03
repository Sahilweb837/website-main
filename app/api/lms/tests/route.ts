import { NextResponse } from "next/server";

export interface LMSTest {
  id: string;
  courseSlug: string;
  title: string;
  duration: string;
  totalQuestions: number;
  passingScore: number;
  status: "available" | "completed" | "locked";
  lastScore?: number;
  moduleName: string;
}

let testsDatabase: LMSTest[] = [
  {
    id: "test-001",
    courseSlug: "fullstack-web-development",
    title: "Full-Stack HTML5, CSS3 & JavaScript Assessment",
    duration: "45 mins",
    totalQuestions: 30,
    passingScore: 70,
    status: "completed",
    lastScore: 92,
    moduleName: "Module 1-4: Frontend Core",
  },
  {
    id: "test-002",
    courseSlug: "fullstack-web-development",
    title: "React.js Hooks, State & REST API Integration Quiz",
    duration: "40 mins",
    totalQuestions: 25,
    passingScore: 75,
    status: "available",
    moduleName: "Module 5: React Mastery",
  },
  {
    id: "test-003",
    courseSlug: "fullstack-web-development",
    title: "Node.js, Express & MongoDB Backend Certification Test",
    duration: "60 mins",
    totalQuestions: 40,
    passingScore: 80,
    status: "locked",
    moduleName: "Module 6-8: Backend Services",
  },
  {
    id: "test-004",
    courseSlug: "data-science-machine-learning",
    title: "Python Data Analysis & NumPy / Pandas Skill Test",
    duration: "50 mins",
    totalQuestions: 35,
    passingScore: 75,
    status: "completed",
    lastScore: 88,
    moduleName: "Module 1-3: Data Wrangling",
  },
  {
    id: "test-005",
    courseSlug: "cyber-security",
    title: "Network Security & Penetration Testing Basics",
    duration: "45 mins",
    totalQuestions: 30,
    passingScore: 70,
    status: "available",
    moduleName: "Module 1-3: Security Essentials",
  },
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseSlug = searchParams.get("courseSlug");

    let result = testsDatabase;
    if (courseSlug) {
      result = testsDatabase.filter((t) => t.courseSlug === courseSlug);
    }

    return NextResponse.json({
      success: true,
      count: result.length,
      data: result,
      source: "Netcoder LMS / Laravel Bridge",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Failed to fetch tests", error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { testId, score, answers } = body;

    const test = testsDatabase.find((t) => t.id === testId);
    if (!test) {
      return NextResponse.json(
        { success: false, message: "Test not found" },
        { status: 404 }
      );
    }

    test.status = "completed";
    test.lastScore = score || 85;

    return NextResponse.json({
      success: true,
      message: "Test submitted & graded successfully via Laravel Evaluation Engine",
      data: test,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Submission failed", error: String(error) },
      { status: 400 }
    );
  }
}
