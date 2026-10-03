import { NextResponse } from "next/server";
import { INITIAL_MENTORS, type MentorProfile } from "@/data/lms-mentor-data";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "Email and password are required" },
        { status: 400 }
      );
    }

    const mentor = INITIAL_MENTORS.find(
      (m) => m.email.toLowerCase() === email.toLowerCase().trim()
    );

    // Accept master mentor credentials or demo password
    if (mentor && (mentor.password === password || password === "mentor123" || password === "admin123")) {
      const { password: _, ...mentorSafe } = mentor;
      return NextResponse.json({
        success: true,
        message: "Mentor authenticated successfully",
        token: `nc_mentor_${mentor.id}_${Date.now()}`,
        data: mentorSafe,
      });
    }

    // Also support any @netcoder.in email with mentor123 for flexibility
    if (email.endsWith("@netcoder.in") && (password === "mentor123" || password === "admin123")) {
      const name = email.split("@")[0].replace(/\b\w/g, (c: string) => c.toUpperCase());
      const customMentor: MentorProfile = {
        id: `mentor-${Date.now()}`,
        name: `Mentor ${name}`,
        email,
        specialization: "Full Stack & Cloud Architecture",
        courses: ["fullstack-web-development", "data-science-machine-learning"],
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
        phone: "+91 98765 00000",
        rating: 4.9,
        totalBatches: 5,
        totalStudents: 150,
      };
      return NextResponse.json({
        success: true,
        message: "Mentor authenticated successfully",
        token: `nc_mentor_${customMentor.id}_${Date.now()}`,
        data: customMentor,
      });
    }

    return NextResponse.json(
      { success: false, message: "Invalid mentor credentials. Tip: use mentor@netcoder.in / mentor123" },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Login failed", error: String(error) },
      { status: 500 }
    );
  }
}
