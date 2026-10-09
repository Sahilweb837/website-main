import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const courseSlug = searchParams.get("courseSlug");
    const category = searchParams.get("category");
    const type = searchParams.get("type");

    // 1. Attempt to fetch from Laravel REST backend
    try {
      const laravelUrl = `http://localhost:8000/api/lms/resources${searchParams.toString() ? `?${searchParams.toString()}` : ""}`;
      const laravelRes = await fetch(laravelUrl, {
        headers: { Accept: "application/json" },
        cache: "no-store",
      });
      if (laravelRes.ok) {
        const json = await laravelRes.json();
        if (json.success && Array.isArray(json.data)) {
          return NextResponse.json(json);
        }
      }
    } catch {
      // Graceful fallback below
    }

    // 2. Fallback seed data
    let resources = [
      {
        id: 1,
        courseId: 1,
        courseSlug: "fullstack-web-development",
        courseTitle: "Full Stack Web & Cloud Engineering",
        title: "React 19 & Next.js 16 Production Architecture Cheat Sheet",
        description: "Comprehensive reference sheet covering React 19 Actions, useActionState, Next.js Server Components, and Turbopack optimizations.",
        filePath: "https://www.netcoder.in/docs/react19-nextjs-cheat-sheet.pdf",
        fileType: "pdf",
        fileSize: "3.8 MB",
        category: "Cheat Sheet",
        isDownloadable: true,
        downloadsCount: 1420,
        createdAt: new Date().toISOString(),
      },
      {
        id: 2,
        courseId: 2,
        courseSlug: "the-complete-agentic-ai-engineering-course",
        courseTitle: "Agentic AI & LLM Systems",
        title: "Model Context Protocol (MCP) & LangGraph Swarm Architecture Guide",
        description: "Complete engineering manual on MCP protocol specification, JSON-RPC transport layers, tool schemas, and LangGraph multi-agent supervisors.",
        filePath: "https://www.netcoder.in/docs/mcp-langgraph-swarm-guide.pdf",
        fileType: "pdf",
        fileSize: "5.2 MB",
        category: "Architecture Blueprint",
        isDownloadable: true,
        downloadsCount: 980,
        createdAt: new Date().toISOString(),
      },
      {
        id: 3,
        courseId: 3,
        courseSlug: "production-kubernetes",
        courseTitle: "DevSecOps & Multi-Cloud Clusters",
        title: "Zero-Trust Kubernetes Cluster Hardening & Istio mTLS Checklist",
        description: "Step-by-step security audit checklist covering Pod Security Standards (PSS), Network Policies, Trivy scanning, and ArgoCD pipelines.",
        filePath: "https://www.netcoder.in/docs/k8s-security-hardening-handbook.pdf",
        fileType: "pdf",
        fileSize: "4.1 MB",
        category: "Production Checklist",
        isDownloadable: true,
        downloadsCount: 760,
        createdAt: new Date().toISOString(),
      },
      {
        id: 4,
        courseId: 1,
        courseSlug: "fullstack-web-development",
        courseTitle: "Full Stack Web & Cloud Engineering",
        title: "Full-Stack System Design 100 Interview Questions & Diagrams",
        description: "Curated handbook containing high-frequency system design case studies: Rate limiters, URL shorteners, distributed caching, and chat engines.",
        filePath: "https://www.netcoder.in/docs/fullstack-system-design-interview-kit.pdf",
        fileType: "pdf",
        fileSize: "8.5 MB",
        category: "Interview Kit",
        isDownloadable: true,
        downloadsCount: 2150,
        createdAt: new Date().toISOString(),
      },
      {
        id: 5,
        courseId: 2,
        courseSlug: "the-complete-agentic-ai-engineering-course",
        courseTitle: "Agentic AI & LLM Systems",
        title: "Autonomous Multi-Agent Starter Template & Docker Swarm Repo",
        description: "Production-ready Python repository with UV setup, Langfuse tracing configs, and sample MCP weather/database connectors.",
        filePath: "https://github.com/netcoder-community/ai-swarm-starter/archive/main.zip",
        fileType: "code",
        fileSize: "1.9 MB",
        category: "Starter Code",
        isDownloadable: true,
        downloadsCount: 640,
        createdAt: new Date().toISOString(),
      },
    ];

    if (courseSlug && courseSlug !== "all") {
      resources = resources.filter((r) => r.courseSlug === courseSlug);
    }
    if (category && category !== "all") {
      resources = resources.filter((r) => r.category === category);
    }
    if (type && type !== "all") {
      resources = resources.filter((r) => r.fileType === type);
    }

    return NextResponse.json({
      success: true,
      count: resources.length,
      data: resources,
      source: "Next.js Fallback Store",
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch resources" },
      { status: 500 }
    );
  }
}
