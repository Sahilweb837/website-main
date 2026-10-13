import { NextResponse } from "next/server";

export interface OnlineCourseItem {
  id: string | number;
  slug: string;
  title: string;
  subtitle: string;
  programming_language: string;
  category: string;
  description: string;
  thumbnail: string;
  video_url: string;
  price: number;
  original_price: number;
  is_free: boolean;
  duration: string;
  lessons_count: number;
  level: string;
  instructor: string;
  has_live_option: boolean;
  created_at?: string;
}

export const DEFAULT_ONLINE_COURSES: OnlineCourseItem[] = [
  {
    id: 1,
    title: "Python Full-Stack & Agentic AI Masterclass",
    slug: "python-fullstack-agentic-ai-masterclass",
    programming_language: "Python",
    category: "Data Science & AI",
    subtitle: "Master Python 3.12, FastAPI, LangChain, OpenAI Agents SDK and Autonomous Workflows with Hands-on Projects.",
    description: "Comprehensive masterclass covering Python from scratch to enterprise AI applications. Build LLM agents, REST APIs, and database-backed services.",
    thumbnail: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
    video_url: "https://www.youtube.com/watch?v=_uQrJ0TkZlc",
    price: 0,
    original_price: 4999,
    is_free: true,
    duration: "24 Hours",
    lessons_count: 32,
    level: "Beginner to Advanced",
    instructor: "Dr. Sahil Sharma (AI Lead)",
    has_live_option: true,
  },
  {
    id: 2,
    title: "Full-Stack Next.js 15 & Modern React 19",
    slug: "nextjs-15-react-19-fullstack",
    programming_language: "JavaScript",
    category: "Web Development",
    subtitle: "Build high-performance web applications with Next.js App Router, Server Actions, TailwindCSS and TypeScript.",
    description: "Complete modern fullstack web development guide. Learn full stack React 19, Node.js integration, PostgreSQL, and production cloud deployments.",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
    video_url: "https://www.youtube.com/watch?v=wm5gMKuwSYk",
    price: 2999,
    original_price: 7999,
    is_free: false,
    duration: "28 Hours",
    lessons_count: 45,
    level: "All Levels",
    instructor: "Vivek Rana (Principal Engineer)",
    has_live_option: true,
  },
  {
    id: 3,
    title: "Java Enterprise Architecture & Spring Boot 3",
    slug: "java-enterprise-spring-boot",
    programming_language: "Java",
    category: "Enterprise Backend",
    subtitle: "Microservices, Docker, Kafka, Hibernate and Cloud-Native Java Development for High-Scale Systems.",
    description: "Industry-standard Java course covering Core Java, OOP design patterns, Spring Boot 3, RESTful APIs, Spring Security, and distributed caching.",
    thumbnail: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    video_url: "https://www.youtube.com/watch?v=A74TOX803D0",
    price: 0,
    original_price: 5999,
    is_free: true,
    duration: "30 Hours",
    lessons_count: 38,
    level: "Intermediate",
    instructor: "Er. Rajesh Kumar",
    has_live_option: true,
  },
  {
    id: 4,
    title: "C++ Systems Programming & Advanced DSA",
    slug: "cpp-systems-programming-dsa",
    programming_language: "C++",
    category: "Systems & Algorithms",
    subtitle: "Master low-level memory management, pointers, STL, and algorithmic problem solving for Top Tech Interviews.",
    description: "Comprehensive C++ training for high-performance computing, game engines, and competitive programming. Includes 250+ DSA problems solved.",
    thumbnail: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&q=80",
    video_url: "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
    price: 1999,
    original_price: 4999,
    is_free: false,
    duration: "22 Hours",
    lessons_count: 28,
    level: "Beginner to Advanced",
    instructor: "Aarav Patel (Systems Architect)",
    has_live_option: true,
  },
  {
    id: 5,
    title: "Modern PHP 8.3 & Laravel 11 Full-Stack",
    slug: "modern-php-laravel-fullstack",
    programming_language: "PHP",
    category: "Web Development",
    subtitle: "Build robust SaaS applications, REST APIs, Livewire components, and payment gateways with Laravel 11.",
    description: "From PHP foundations to production Laravel architecture. Learn Eloquent ORM, MVC pattern, Queue workers, and multi-tenant systems.",
    thumbnail: "https://images.unsplash.com/photo-1599507593499-a3f7f7d97f66?w=800&q=80",
    video_url: "https://www.youtube.com/watch?v=MYyJ4PuL4pY",
    price: 0,
    original_price: 3999,
    is_free: true,
    duration: "20 Hours",
    lessons_count: 26,
    level: "All Levels",
    instructor: "Nitin Kapoor (Founder & CTO)",
    has_live_option: true,
  },
  {
    id: 6,
    title: "Cloud DevOps with Go (Golang) & Kubernetes",
    slug: "cloud-devops-go-kubernetes",
    programming_language: "Go",
    category: "Cloud & DevOps",
    subtitle: "Build ultra-fast microservices, cloud CLI tools, Docker orchestration, and CI/CD pipelines in Go.",
    description: "Practical Go for backend and cloud engineers. Concurrency patterns, goroutines, channels, Kubernetes operators, and gRPC communication.",
    thumbnail: "https://images.unsplash.com/photo-1516116211227-bbc04294a896?w=800&q=80",
    video_url: "https://www.youtube.com/watch?v=yyUHQIec83I",
    price: 3499,
    original_price: 8499,
    is_free: false,
    duration: "26 Hours",
    lessons_count: 35,
    level: "Intermediate to Advanced",
    instructor: "Siddharth Rana (Cloud DevOps Lead)",
    has_live_option: true,
  },
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const language = url.searchParams.get("language");
  const pricing = url.searchParams.get("pricing");
  const search = url.searchParams.get("search");

  // Attempt to fetch from Laravel backend if available
  const LARAVEL_API = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000/api";
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    const backendRes = await fetch(`${LARAVEL_API}/online-courses?${url.searchParams.toString()}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
      cache: "no-store",
    });
    clearTimeout(timeout);

    if (backendRes.ok) {
      const data = await backendRes.json();
      if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
        return NextResponse.json(data);
      }
    }
  } catch {
    // Backend offline -> fallback to local verified dataset
  }

  // Filter local dataset
  let result = [...DEFAULT_ONLINE_COURSES];

  if (language && language !== "all") {
    result = result.filter(
      (c) => c.programming_language.toLowerCase() === language.toLowerCase()
    );
  }

  if (pricing === "free") {
    result = result.filter((c) => c.is_free);
  } else if (pricing === "paid") {
    result = result.filter((c) => !c.is_free);
  }

  if (search && search.trim()) {
    const q = search.toLowerCase();
    result = result.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q) ||
        c.programming_language.toLowerCase().includes(q)
    );
  }

  return NextResponse.json({
    success: true,
    total: result.length,
    data: result,
  });
}
