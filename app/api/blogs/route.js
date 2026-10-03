import { NextResponse } from "next/server";
import { BLOGS } from "@/data/blogs";

let blogs = [...BLOGS];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const query = searchParams.get("q");

  let result = blogs;

  if (category && category !== "All") {
    result = result.filter(b => b.category.toLowerCase() === category.toLowerCase());
  }

  if (query) {
    result = result.filter(b => 
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(query.toLowerCase())
    );
  }

  return NextResponse.json({
    success: true,
    count: result.length,
    data: result
  });
}

export async function POST(request) {
  try {
    const body = await request.json();
    const newBlog = {
      id: Date.now(),
      slug: (body.title || "new-article").toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: body.title || "Untitled Article",
      excerpt: body.excerpt || "",
      main_content: body.content || "",
      author: body.author || "Admin Team",
      category: body.category || "Web Development",
      tags: body.tags || [],
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: body.readTime || "4 min read",
      image: body.image || "/images/full-stact-development.png"
    };

    blogs.unshift(newBlog);

    return NextResponse.json({
      success: true,
      message: "Blog post published successfully",
      data: newBlog
    }, { status: 201 });
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Error creating blog",
      error: error.message
    }, { status: 400 });
  }
}
