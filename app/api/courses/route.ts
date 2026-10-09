import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { COURSES } from "@/data/courses";
import { LMS_COURSES } from "@/data/lms-courses";
import { filterApprovedCourses } from "@/lib/approved-courses";

// Base local fallback list
export let defaultCoursesList: any[] = filterApprovedCourses([
  ...LMS_COURSES,
  ...COURSES.filter((c) => !LMS_COURSES.some((l) => l.slug === c.slug)),
]);

const storagePath = path.join(process.cwd(), "laravel-backend", "database", "storage.json");

function getStorageData() {
  try {
    if (fs.existsSync(storagePath)) {
      const content = fs.readFileSync(storagePath, "utf-8");
      return JSON.parse(content);
    }
  } catch (e) {
    console.error("[Storage] Error reading storage.json:", e);
  }
  return null;
}

function saveStorageData(data: any) {
  try {
    const dir = path.dirname(storagePath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(storagePath, JSON.stringify(data, null, 2), "utf-8");
  } catch (e) {
    console.error("[Storage] Error saving storage.json:", e);
  }
}

export function getAllCourses(): any[] {
  const db = getStorageData();
  if (db && Array.isArray(db.courses) && db.courses.length > 0) {
    const approvedDbCourses = filterApprovedCourses(db.courses);
    // Merge database courses with rich metadata if available
    const mergedDbCourses = approvedDbCourses.map((pc: any) => {
      const matched = defaultCoursesList.find(
        (dc) => dc.slug?.toLowerCase() === (pc.slug || "").toLowerCase()
      );
      return {
        ...matched,
        ...pc,
        id: pc.id || pc.slug,
        title: pc.title,
        slug: pc.slug,
        category: pc.category || matched?.category || "fullstack",
        price: Number(pc.price ?? pc.fee ?? matched?.price ?? 79),
        originalPrice: Number(pc.originalPrice ?? pc.original_price ?? matched?.originalPrice ?? 180),
        image: pc.image || matched?.image || "/images/full-stact-development.png",
        duration: pc.duration || matched?.duration || "40 hrs",
        instructor: pc.instructor || matched?.instructor || "Netcoder Senior Faculty",
        overview: pc.overview || matched?.overview || "",
        rating: Number(pc.rating ?? matched?.rating ?? 4.95),
        ratingCount: Number(pc.ratingCount ?? pc.reviews_count ?? matched?.ratingCount ?? 120),
      };
    });

    // Add any default LMS courses that are not yet in storage
    const extraCourses = defaultCoursesList.filter(
      (dc) => !mergedDbCourses.some((mc: any) => mc.slug?.toLowerCase() === dc.slug?.toLowerCase())
    );

    return [...mergedDbCourses, ...extraCourses];
  }

  return defaultCoursesList;
}

export function getAuthoritativeCourse(slug: string) {
  if (!slug) return null;
  const all = getAllCourses();
  return all.find((c) => c.slug?.toLowerCase() === slug.toLowerCase()) || null;
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const query = searchParams.get("q");
    const slug = searchParams.get("slug");
    const level = searchParams.get("level");

    const all = getAllCourses();

    if (slug) {
      const course = all.find(
        (c) => c.slug?.toLowerCase() === slug.toLowerCase()
      );
      if (!course) {
        return NextResponse.json(
          { success: false, message: `Course '${slug}' not found` },
          { status: 404 }
        );
      }
      return NextResponse.json({ success: true, data: course });
    }

    let results = all;

    if (results.length === 0) {
      return NextResponse.json({ success: true, count: 0, data: [] });
    }

    if (category && category !== "All" && category !== "all") {
      results = results.filter(
        (c) => c.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (level && level !== "All" && level !== "all") {
      results = results.filter(
        (c) => c.level?.toLowerCase() === level.toLowerCase()
      );
    }

    if (query) {
      const q = query.toLowerCase();
      results = results.filter(
        (c) =>
          c.title?.toLowerCase().includes(q) ||
          c.overview?.toLowerCase().includes(q) ||
          c.tools?.some((t: string) => t.toLowerCase().includes(q))
      );
    }

    return NextResponse.json({
      success: true,
      count: results.length,
      data: results,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error fetching courses", error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.title || !body.overview) {
      return NextResponse.json(
        { success: false, message: "Course title and overview are required" },
        { status: 400 }
      );
    }

    const price = Number(body.price ?? body.fee ?? 79);
    const originalPrice = Number(body.originalPrice ?? body.original_price ?? Math.round(price * 2));
    const slug = (body.slug || body.title)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    if (!body.slug && !body.title) {
      return NextResponse.json(
        { success: false, message: "Course slug or title is required" },
        { status: 400 }
      );
    }

    const newCourse = {
      id: Date.now(),
      slug,
      title: body.title,
      category: body.category || "fullstack",
      price,
      originalPrice,
      duration: body.duration || "40 hrs • 8 Projects",
      level: body.level || "Beginner to Advanced",
      overview: body.overview,
      instructor: body.instructor || "Netcoder Faculty & Industry Mentors",
      instructorAvatar: body.instructorAvatar || body.instructor_avatar || "/images/instructor-default.png",
      image: body.image || "/images/full-stact-development.png",
      rating: Number(body.rating ?? 4.95),
      ratingCount: Number(body.ratingCount ?? body.reviews_count ?? 120),
      badge: body.badge || "Featured",
      tagline: body.tagline || "Industry Certified",
      hours: body.hours || body.duration || "40 hrs",
      icon: body.icon || "code",
      syllabus: body.syllabus || [
        {
          module: "Module 1: Industry Foundation",
          lessons: ["Core Principles & Standards", "Environment Setup & Tooling", "Architecture Walkthrough"]
        },
        {
          module: "Module 2: Advanced Production Implementation",
          lessons: ["Deep-dive Code Implementation", "Enterprise Testing & Optimization", "Final Project Deployment"]
        }
      ],
      highlights: body.highlights || ["Live Terminal Sandbox", "1-on-1 Code Review", "Verified Certificate"],
      tags: body.tags || ["Next.js", "React", "Node.js"],
      createdAt: new Date().toISOString(),
    };

    // Save to database/storage.json so Laravel backend immediately has it
    const db = getStorageData() || { courses: [], students: [], blogs: [], feedbacks: [] };
    if (!Array.isArray(db.courses)) db.courses = [];
    const approvedNewCourse = filterApprovedCourses([newCourse]);
    if (approvedNewCourse.length === 0) {
      return NextResponse.json(
        { success: false, message: "Course is not in the approved public catalog." },
        { status: 403 }
      );
    }

    db.courses.unshift(newCourse);
    saveStorageData(db);

    return NextResponse.json(
      {
        success: true,
        message: "Course created successfully and synced with Laravel backend",
        data: newCourse,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error creating course", error: String(error) },
      { status: 400 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    const slug = searchParams.get("slug");

    if (!id && !slug) {
      return NextResponse.json(
        { success: false, message: "Course id or slug is required" },
        { status: 400 }
      );
    }

    const db = getStorageData();
    if (db && Array.isArray(db.courses)) {
      db.courses = db.courses.filter((c: any) => {
        if (id && String(c.id) === String(id)) return false;
        if (slug && (c.slug === slug || String(c.id) === String(slug))) return false;
        return true;
      });
      saveStorageData(db);
    }

    return NextResponse.json({
      success: true,
      message: "Course deleted successfully from Laravel storage",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Error deleting course", error: String(error) },
      { status: 500 }
    );
  }
}
