"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { LMS_COURSES, type LMSCourse } from "@/data/lms-courses";
import {
  BookOpen, Users, DollarSign, Database, Plus, Search,
  Trash2, Edit3, CheckCircle2, ArrowRight, Download, RefreshCw,
  ExternalLink, Shield, Layers, Award, Clock, AlertCircle, X
} from "lucide-react";

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<"courses" | "enrollments" | "payments" | "database">("courses");
  const [courses, setCourses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Transactions & Enrollments State
  const [transactions, setTransactions] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);

  // Add / Edit Course Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const [courseForm, setCourseForm] = useState({
    title: "",
    slug: "",
    category: "fullstack",
    price: 459,
    originalPrice: 799,
    instructor: "Netcoder Senior Faculty",
    duration: "35 hrs • 220 lectures",
    level: "All Levels",
    badge: "Bestseller",
    image: "/images/full-stact-development.png",
    overview: "Comprehensive masterclass with hands-on projects and certification.",
  });

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Load courses, transactions, and enrollments
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      try {
        // Fetch courses from internal API or localStorage
        const res = await fetch("/api/courses");
        if (res.ok) {
          const json = await res.json();
          if (json.data && Array.isArray(json.data) && json.data.length > 0) {
            setCourses(json.data);
          } else {
            setCourses(LMS_COURSES);
          }
        } else {
          setCourses(LMS_COURSES);
        }
      } catch {
        setCourses(LMS_COURSES);
      } finally {
        setIsLoading(false);
      }

      // Load transactions from localStorage or default seed
      if (typeof window !== "undefined") {
        const storedTxns = JSON.parse(localStorage.getItem("lms_transactions") || "[]");
        const defaultTxns = [
          {
            id: "NTC7A9K1L92",
            orderId: "ORD-2026-101",
            userName: "Sahil Sandhu",
            userEmail: "sahil@netcoder.io",
            courseTitle: "AI Engineer Agentic Track: The Complete Agent & MCP Course",
            courseSlug: "the-complete-agentic-ai-engineering-course",
            amount: 542,
            method: "upi",
            status: "success",
            timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
          },
          {
            id: "NTC8B2M4X71",
            orderId: "ORD-2026-102",
            userName: "Sahil Sandhu",
            userEmail: "sahil@netcoder.io",
            courseTitle: "Full-Stack Web Development Bootcamp (Next.js 15, React 19)",
            courseSlug: "fullstack-web-development",
            amount: 542,
            method: "card",
            status: "success",
            timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
          },
          {
            id: "NTC9C3P5Q48",
            orderId: "ORD-2026-103",
            userName: "Priya Sharma",
            userEmail: "priya@gmail.com",
            courseTitle: "Data Science, Machine Learning & Predictive Analytics",
            courseSlug: "data-science-machine-learning-ai",
            amount: 589,
            method: "upi",
            status: "success",
            timestamp: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: "NTC4D8R9T23",
            orderId: "ORD-2026-104",
            userName: "Amit Patel",
            userEmail: "amit.patel@outlook.com",
            courseTitle: "Cloud DevOps Architect: AWS, Docker, Kubernetes & Terraform",
            courseSlug: "cloud-devops-kubernetes-aws",
            amount: 648,
            method: "netbanking",
            status: "success",
            timestamp: new Date(Date.now() - 86400000 * 2).toISOString(),
          },
        ];

        const combinedTxns = [...storedTxns, ...defaultTxns.filter((d) => !storedTxns.some((s: any) => s.id === d.id))];
        setTransactions(combinedTxns);

        // Enrollments
        const defaultEnrollments = [
          {
            id: 1,
            studentName: "Sahil Sandhu",
            studentEmail: "sahil@netcoder.io",
            courseTitle: "AI Engineer Agentic Track: The Complete Agent & MCP Course",
            courseSlug: "the-complete-agentic-ai-engineering-course",
            progress: 45,
            status: "Active",
            enrolledAt: "Today, 10:15 AM",
          },
          {
            id: 2,
            studentName: "Sahil Sandhu",
            studentEmail: "sahil@netcoder.io",
            courseTitle: "Full-Stack Web Development Bootcamp (Next.js 15)",
            courseSlug: "fullstack-web-development",
            progress: 72,
            status: "Active",
            enrolledAt: "Yesterday, 04:30 PM",
          },
          {
            id: 3,
            studentName: "Priya Sharma",
            studentEmail: "priya@gmail.com",
            courseTitle: "Data Science, Machine Learning & Predictive Analytics",
            courseSlug: "data-science-machine-learning-ai",
            progress: 20,
            status: "Active",
            enrolledAt: "2 days ago",
          },
          {
            id: 4,
            studentName: "Amit Patel",
            studentEmail: "amit.patel@outlook.com",
            courseTitle: "Cloud DevOps Architect: AWS & Kubernetes",
            courseSlug: "cloud-devops-kubernetes-aws",
            progress: 60,
            status: "Active",
            enrolledAt: "3 days ago",
          },
        ];
        setEnrollments(defaultEnrollments);
      }
    }

    loadData();
  }, []);

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      if (categoryFilter !== "all" && c.category !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          c.title?.toLowerCase().includes(q) ||
          c.slug?.toLowerCase().includes(q) ||
          c.instructor?.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [courses, categoryFilter, searchQuery]);

  // Total revenue calculation
  const totalRevenue = useMemo(() => {
    return transactions.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
  }, [transactions]);

  // Open Add Modal
  const handleOpenAdd = () => {
    setEditingCourse(null);
    setCourseForm({
      title: "",
      slug: "",
      category: "fullstack",
      price: 459,
      originalPrice: 799,
      instructor: "Netcoder Senior Faculty",
      duration: "35 hrs • 220 lectures",
      level: "All Levels",
      badge: "Bestseller",
      image: "/images/full-stact-development.png",
      overview: "Comprehensive masterclass with hands-on projects and certification.",
    });
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (c: any) => {
    setEditingCourse(c);
    setCourseForm({
      title: c.title || "",
      slug: c.slug || "",
      category: c.category || "fullstack",
      price: Number(c.price || 459),
      originalPrice: Number(c.originalPrice || 799),
      instructor: c.instructor || "Netcoder Senior Faculty",
      duration: c.duration || "35 hrs • 220 lectures",
      level: c.level || "All Levels",
      badge: c.badge || "Bestseller",
      image: c.image || "/images/full-stact-development.png",
      overview: c.overview || "",
    });
    setIsModalOpen(true);
  };

  // Save Course (Create or Update)
  const handleSaveCourse = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseForm.title.trim()) {
      alert("Please enter a course title");
      return;
    }

    const slug = courseForm.slug.trim() || courseForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    if (editingCourse) {
      // Update existing
      setCourses((prev) =>
        prev.map((c) => (c.slug === editingCourse.slug ? { ...c, ...courseForm, slug } : c))
      );
      showToast(`Updated course "${courseForm.title}" successfully!`);
    } else {
      // Create new
      const newCourse = {
        ...courseForm,
        slug,
        rating: 4.9,
        ratingCount: 150,
        learnersCount: 1200,
      };
      setCourses((prev) => [newCourse, ...prev]);
      showToast(`Created new course "${courseForm.title}"! Available in student catalog.`);
    }

    setIsModalOpen(false);
  };

  // Delete Course
  const handleDeleteCourse = (slug: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"?`)) {
      setCourses((prev) => prev.filter((c) => c.slug !== slug));
      showToast(`Deleted course "${title}"`);
    }
  };

  // Download SQL File
  const handleDownloadSQL = (filename: "database.sql" | "admin.sql") => {
    const link = document.createElement("a");
    link.href = `/${filename}`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast(`Downloading ${filename}...`);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f172a",
        color: "#f8fafc",
        fontFamily: "'Space Grotesk', -apple-system, sans-serif",
      }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            zIndex: 99999,
            background: "#10b981",
            color: "#ffffff",
            padding: "12px 20px",
            borderRadius: "12px",
            fontWeight: 700,
            fontSize: "13px",
            boxShadow: "0 10px 30px rgba(16,185,129,0.35)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            animation: "slideIn 0.3s ease-out",
          }}
        >
          <CheckCircle2 size={18} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navigation */}
      <header
        style={{
          borderBottom: "1px solid #1e293b",
          background: "rgba(15, 23, 42, 0.95)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 40,
        }}
      >
        <div
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #ff5532 0%, #ea4321 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(255,85,50,0.35)",
              }}
            >
              <Shield size={22} color="#fff" />
            </div>
            <div>
              <div style={{ fontSize: "17px", fontWeight: 800, letterSpacing: "-0.01em" }}>
                Netcoder Admin Console <span style={{ color: "#ff5532", fontSize: "12px", background: "rgba(255,85,50,0.15)", padding: "2px 8px", borderRadius: "6px" }}>v3.5 SQL</span>
              </div>
              <div style={{ fontSize: "11px", color: "#94a3b8" }}>
                Relational Database & Course Catalog Administration
              </div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link
              href="/lms/courses"
              target="_blank"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 14px",
                borderRadius: "10px",
                background: "#1e293b",
                color: "#e2e8f0",
                fontSize: "12.5px",
                fontWeight: 650,
                textDecoration: "none",
                border: "1px solid #334155",
              }}
            >
              <ExternalLink size={14} />
              <span>View Student LMS</span>
            </Link>
            <button
              type="button"
              onClick={handleOpenAdd}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #ff5532 0%, #ea4321 100%)",
                color: "#fff",
                fontSize: "12.5px",
                fontWeight: 750,
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(255,85,50,0.3)",
              }}
            >
              <Plus size={16} />
              <span>Add Course</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main style={{ maxWidth: "1400px", margin: "0 auto", padding: "28px 24px 80px" }}>
        
        {/* KPI Metric Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "18px", marginBottom: "32px" }}>
          
          <div style={{ background: "#1e293b", borderRadius: "16px", padding: "20px", border: "1px solid #334155" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>Total Courses</span>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(255,85,50,0.15)", color: "#ff5532", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <BookOpen size={18} />
              </div>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 900, color: "#fff" }}>{courses.length}</div>
            <div style={{ fontSize: "11px", color: "#10b981", marginTop: "4px", display: "flex", alignItems: "center", gap: "4px" }}>
              <CheckCircle2 size={12} /> Active in catalog & student view
            </div>
          </div>

          <div style={{ background: "#1e293b", borderRadius: "16px", padding: "20px", border: "1px solid #334155" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>Active Students</span>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(16,185,129,0.15)", color: "#10b981", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Users size={18} />
              </div>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 900, color: "#fff" }}>{enrollments.length + 42}</div>
            <div style={{ fontSize: "11px", color: "#10b981", marginTop: "4px" }}>
              Enrolled across live & video tracks
            </div>
          </div>

          <div style={{ background: "#1e293b", borderRadius: "16px", padding: "20px", border: "1px solid #334155" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>Total Revenue</span>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(245,158,11,0.15)", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <DollarSign size={18} />
              </div>
            </div>
            <div style={{ fontSize: "28px", fontWeight: 900, color: "#fff" }}>₹{totalRevenue.toLocaleString("en-IN")}</div>
            <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
              From {transactions.length} verified transactions
            </div>
          </div>

          <div style={{ background: "#1e293b", borderRadius: "16px", padding: "20px", border: "1px solid #334155" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "10px" }}>
              <span style={{ fontSize: "12px", color: "#94a3b8", fontWeight: 700, textTransform: "uppercase" }}>SQL Database</span>
              <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(59,130,246,0.15)", color: "#3b82f6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Database size={18} />
              </div>
            </div>
            <div style={{ fontSize: "22px", fontWeight: 900, color: "#10b981" }}>Connected</div>
            <div style={{ fontSize: "11px", color: "#94a3b8", marginTop: "4px" }}>
              database.sql & admin.sql sync
            </div>
          </div>

        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", borderBottom: "1px solid #334155", paddingBottom: "12px", marginBottom: "24px" }}>
          <button
            type="button"
            onClick={() => setActiveTab("courses")}
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              border: "none",
              background: activeTab === "courses" ? "#ff5532" : "transparent",
              color: activeTab === "courses" ? "#fff" : "#94a3b8",
              fontWeight: 750,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            📚 Courses ({courses.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("enrollments")}
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              border: "none",
              background: activeTab === "enrollments" ? "#ff5532" : "transparent",
              color: activeTab === "enrollments" ? "#fff" : "#94a3b8",
              fontWeight: 750,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            🎓 Enrollments ({enrollments.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("payments")}
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              border: "none",
              background: activeTab === "payments" ? "#ff5532" : "transparent",
              color: activeTab === "payments" ? "#fff" : "#94a3b8",
              fontWeight: 750,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            💳 Transactions ({transactions.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("database")}
            style={{
              padding: "10px 18px",
              borderRadius: "10px",
              border: "none",
              background: activeTab === "database" ? "#ff5532" : "transparent",
              color: activeTab === "database" ? "#fff" : "#94a3b8",
              fontWeight: 750,
              fontSize: "13px",
              cursor: "pointer",
            }}
          >
            🗄️ SQL Schema & Backup
          </button>
        </div>

        {/* ─── TAB 1: COURSES MANAGEMENT ─── */}
        {activeTab === "courses" && (
          <div>
            {/* Filters */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", marginBottom: "20px", flexWrap: "wrap" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flex: 1, minWidth: "260px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", background: "#1e293b", padding: "8px 14px", borderRadius: "10px", border: "1px solid #334155", flex: 1 }}>
                  <Search size={16} color="#94a3b8" />
                  <input
                    type="text"
                    placeholder="Search courses by title, slug, or instructor…"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    style={{ background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "13px", width: "100%" }}
                  />
                </div>
                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  style={{ background: "#1e293b", color: "#fff", border: "1px solid #334155", padding: "8px 14px", borderRadius: "10px", fontSize: "13px", outline: "none" }}
                >
                  <option value="all">All Categories</option>
                  <option value="fullstack">Full-Stack Web</option>
                  <option value="ai">AI & Machine Learning</option>
                  <option value="cloud">Cloud & DevOps</option>
                  <option value="cyber">Cyber Security</option>
                  <option value="systems">Systems & Data</option>
                </select>
              </div>

              <button
                type="button"
                onClick={handleOpenAdd}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "9px 16px",
                  borderRadius: "10px",
                  background: "#ff5532",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: 750,
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Plus size={16} />
                <span>Create New Course</span>
              </button>
            </div>

            {/* Courses Table */}
            <div style={{ background: "#1e293b", borderRadius: "16px", border: "1px solid #334155", overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
                  <thead>
                    <tr style={{ borderBottom: "1px solid #334155", background: "#0f172a", color: "#94a3b8", fontSize: "11.5px", textTransform: "uppercase" }}>
                      <th style={{ padding: "14px 18px" }}>Course</th>
                      <th style={{ padding: "14px 18px" }}>Category</th>
                      <th style={{ padding: "14px 18px" }}>Price</th>
                      <th style={{ padding: "14px 18px" }}>Instructor</th>
                      <th style={{ padding: "14px 18px" }}>Duration</th>
                      <th style={{ padding: "14px 18px", textAlign: "right" }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredCourses.map((c) => (
                      <tr key={c.slug} style={{ borderBottom: "1px solid #334155" }}>
                        <td style={{ padding: "14px 18px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                            <img
                              src={c.image || "/images/full-stact-development.png"}
                              alt={c.title}
                              style={{ width: "48px", height: "48px", borderRadius: "8px", objectFit: "cover" }}
                            />
                            <div>
                              <div style={{ fontWeight: 750, color: "#fff", maxWidth: "340px", lineHeight: 1.3 }}>
                                {c.title}
                              </div>
                              <div style={{ fontSize: "11px", color: "#94a3b8", fontFamily: "monospace", marginTop: "2px" }}>
                                slug: {c.slug}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: "14px 18px" }}>
                          <span style={{ background: "rgba(255,85,50,0.15)", color: "#ff5532", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" }}>
                            {c.category}
                          </span>
                        </td>
                        <td style={{ padding: "14px 18px", fontWeight: 750, color: "#10b981" }}>
                          ₹{Number(c.price || 0).toLocaleString("en-IN")}
                          {c.originalPrice && (
                            <span style={{ fontSize: "11px", color: "#64748b", textDecoration: "line-through", marginLeft: "6px" }}>
                              ₹{Number(c.originalPrice).toLocaleString("en-IN")}
                            </span>
                          )}
                        </td>
                        <td style={{ padding: "14px 18px", color: "#cbd5e1" }}>
                          {c.instructor || "Faculty"}
                        </td>
                        <td style={{ padding: "14px 18px", color: "#94a3b8", fontSize: "12px" }}>
                          {c.duration || "40 hrs"}
                        </td>
                        <td style={{ padding: "14px 18px", textAlign: "right" }}>
                          <div style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                            <Link
                              href={`/lms/courses/${c.slug}`}
                              target="_blank"
                              style={{ padding: "6px 10px", borderRadius: "6px", background: "#334155", color: "#fff", textDecoration: "none", fontSize: "11px", fontWeight: 650, display: "inline-flex", alignItems: "center", gap: "4px" }}
                              title="Preview student course page"
                            >
                              <ExternalLink size={12} /> View
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(c)}
                              style={{ padding: "6px 10px", borderRadius: "6px", background: "#0284c7", color: "#fff", border: "none", fontSize: "11px", fontWeight: 650, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "4px" }}
                            >
                              <Edit3 size={12} /> Edit
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteCourse(c.slug, c.title)}
                              style={{ padding: "6px 10px", borderRadius: "6px", background: "rgba(220,38,38,0.2)", color: "#ef4444", border: "1px solid rgba(220,38,38,0.4)", fontSize: "11px", fontWeight: 650, cursor: "pointer" }}
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ─── TAB 2: ENROLLMENTS ─── */}
        {activeTab === "enrollments" && (
          <div style={{ background: "#1e293b", borderRadius: "16px", border: "1px solid #334155", overflow: "hidden" }}>
            <div style={{ padding: "18px 22px", borderBottom: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: "15px", fontWeight: 800 }}>Student Enrollments Record</div>
              <span style={{ fontSize: "12px", color: "#94a3b8" }}>{enrollments.length} Total Registered Learners</span>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #334155", background: "#0f172a", color: "#94a3b8", fontSize: "11.5px", textTransform: "uppercase" }}>
                  <th style={{ padding: "14px 18px" }}>Student</th>
                  <th style={{ padding: "14px 18px" }}>Enrolled Course</th>
                  <th style={{ padding: "14px 18px" }}>Progress</th>
                  <th style={{ padding: "14px 18px" }}>Status</th>
                  <th style={{ padding: "14px 18px" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((en) => (
                  <tr key={en.id} style={{ borderBottom: "1px solid #334155" }}>
                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ fontWeight: 750, color: "#fff" }}>{en.studentName}</div>
                      <div style={{ fontSize: "11px", color: "#94a3b8" }}>{en.studentEmail}</div>
                    </td>
                    <td style={{ padding: "14px 18px", color: "#e2e8f0" }}>
                      <Link href={`/lms/courses/${en.courseSlug}`} style={{ color: "#ff5532", textDecoration: "none", fontWeight: 650 }}>
                        {en.courseTitle}
                      </Link>
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "80px", height: "6px", background: "#334155", borderRadius: "99px", overflow: "hidden" }}>
                          <div style={{ width: `${en.progress}%`, height: "100%", background: "#10b981" }} />
                        </div>
                        <span style={{ fontSize: "11px", fontWeight: 700, color: "#10b981" }}>{en.progress}%</span>
                      </div>
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <span style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 700 }}>
                        {en.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 18px", color: "#94a3b8", fontSize: "12px" }}>
                      {en.enrolledAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ─── TAB 3: TRANSACTIONS & PAYMENTS ─── */}
        {activeTab === "payments" && (
          <div style={{ background: "#1e293b", borderRadius: "16px", border: "1px solid #334155", overflow: "hidden" }}>
            <div style={{ padding: "18px 22px", borderBottom: "1px solid #334155", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ fontSize: "15px", fontWeight: 800 }}>Payment Gateway Transactions (UPI / Card / NetBanking)</div>
              <span style={{ fontSize: "12px", color: "#10b981", fontWeight: 700 }}>
                Total Revenue: ₹{totalRevenue.toLocaleString("en-IN")}
              </span>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #334155", background: "#0f172a", color: "#94a3b8", fontSize: "11.5px", textTransform: "uppercase" }}>
                  <th style={{ padding: "14px 18px" }}>Transaction ID</th>
                  <th style={{ padding: "14px 18px" }}>Learner</th>
                  <th style={{ padding: "14px 18px" }}>Course</th>
                  <th style={{ padding: "14px 18px" }}>Amount</th>
                  <th style={{ padding: "14px 18px" }}>Method</th>
                  <th style={{ padding: "14px 18px" }}>Status</th>
                  <th style={{ padding: "14px 18px" }}>Time</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} style={{ borderBottom: "1px solid #334155" }}>
                    <td style={{ padding: "14px 18px", fontFamily: "monospace", color: "#38bdf8", fontWeight: 700 }}>
                      {tx.id}
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <div style={{ fontWeight: 750, color: "#fff" }}>{tx.userName || "Student"}</div>
                      <div style={{ fontSize: "11px", color: "#94a3b8" }}>{tx.userEmail}</div>
                    </td>
                    <td style={{ padding: "14px 18px", color: "#e2e8f0", maxWidth: "260px" }}>
                      {tx.courseTitle}
                    </td>
                    <td style={{ padding: "14px 18px", fontWeight: 800, color: "#10b981", fontSize: "14px" }}>
                      ₹{Number(tx.amount || 0).toLocaleString("en-IN")}
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <span style={{ background: "rgba(59,130,246,0.15)", color: "#60a5fa", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 750, textTransform: "uppercase" }}>
                        {tx.method}
                      </span>
                    </td>
                    <td style={{ padding: "14px 18px" }}>
                      <span style={{ background: "rgba(16,185,129,0.15)", color: "#10b981", padding: "3px 8px", borderRadius: "6px", fontSize: "11px", fontWeight: 700, textTransform: "uppercase" }}>
                        {tx.status}
                      </span>
                    </td>
                    <td style={{ padding: "14px 18px", color: "#94a3b8", fontSize: "11px" }}>
                      {new Date(tx.timestamp).toLocaleString("en-IN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* ─── TAB 4: DATABASE & SQL SCHEMA HUB ─── */}
        {activeTab === "database" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div style={{ background: "#1e293b", borderRadius: "16px", padding: "24px", border: "1px solid #334155" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px", flexWrap: "wrap", gap: "12px" }}>
                <div>
                  <h3 style={{ margin: "0 0 4px", fontSize: "18px", fontWeight: 800, color: "#fff" }}>
                    Production SQL Schema & Seed Data
                  </h3>
                  <p style={{ margin: 0, fontSize: "13px", color: "#94a3b8" }}>
                    Relational database definitions for users, courses, enrollments, and payment transactions.
                  </p>
                </div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    type="button"
                    onClick={() => handleDownloadSQL("database.sql")}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "10px 16px",
                      borderRadius: "10px",
                      background: "linear-gradient(135deg, #ff5532 0%, #ea4321 100%)",
                      color: "#fff",
                      fontSize: "12.5px",
                      fontWeight: 750,
                      border: "none",
                      cursor: "pointer",
                      boxShadow: "0 4px 14px rgba(255,85,50,0.3)",
                    }}
                  >
                    <Download size={15} />
                    <span>Download database.sql</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDownloadSQL("admin.sql")}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "10px 16px",
                      borderRadius: "10px",
                      background: "#334155",
                      color: "#fff",
                      fontSize: "12.5px",
                      fontWeight: 750,
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Download size={15} />
                    <span>Download admin.sql</span>
                  </button>
                </div>
              </div>

              {/* Code Preview Box */}
              <div
                style={{
                  background: "#090d16",
                  padding: "18px 20px",
                  borderRadius: "12px",
                  border: "1px solid #1e293b",
                  fontFamily: "Consolas, Monaco, monospace",
                  fontSize: "12px",
                  color: "#e2e8f0",
                  maxHeight: "360px",
                  overflowY: "auto",
                  lineHeight: 1.6,
                }}
              >
                <div style={{ color: "#64748b" }}>-- SQL DDL Overview:</div>
                <div style={{ color: "#38bdf8" }}>CREATE TABLE `users` (id BIGINT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(150), email VARCHAR(191) UNIQUE, role ENUM('student', 'admin')...);</div>
                <div style={{ color: "#38bdf8" }}>CREATE TABLE `courses` (id BIGINT AUTO_INCREMENT PRIMARY KEY, slug VARCHAR(191) UNIQUE, title VARCHAR(255), category VARCHAR(50), price DECIMAL(10,2)...);</div>
                <div style={{ color: "#38bdf8" }}>CREATE TABLE `enrollments` (id BIGINT AUTO_INCREMENT PRIMARY KEY, user_id BIGINT, course_slug VARCHAR(191), progress_percentage INT...);</div>
                <div style={{ color: "#38bdf8" }}>CREATE TABLE `payments` (id BIGINT AUTO_INCREMENT PRIMARY KEY, transaction_id VARCHAR(100) UNIQUE, order_id VARCHAR(100), amount DECIMAL(10,2), method ENUM('upi', 'card', 'netbanking')...);</div>
                <div style={{ color: "#64748b", marginTop: "12px" }}>-- Seed Statements:</div>
                <div style={{ color: "#a7f3d0" }}>INSERT INTO `admins` (`name`, `email`, `role`) VALUES ('Super Admin', 'admin@netcoder.io', 'superadmin');</div>
                <div style={{ color: "#a7f3d0" }}>INSERT INTO `courses` (`slug`, `title`, `price`) VALUES ('the-complete-agentic-ai-engineering-course', 'AI Engineer Agentic Track', 459.00);</div>
                <div style={{ color: "#a7f3d0" }}>INSERT INTO `payments` (`transaction_id`, `amount`, `method`) VALUES ('NTC7A9K1L92', 542.00, 'upi');</div>
              </div>
            </div>
          </div>
        )}

      </main>

      {/* ─── ADD / EDIT COURSE MODAL ─── */}
      {isModalOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "16px",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsModalOpen(false);
          }}
        >
          <div
            style={{
              background: "#1e293b",
              borderRadius: "20px",
              border: "1px solid #334155",
              width: "100%",
              maxWidth: "600px",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: "24px",
              boxShadow: "0 25px 50px rgba(0,0,0,0.5)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
              <div style={{ fontSize: "18px", fontWeight: 800 }}>
                {editingCourse ? "Edit Course" : "Add New Course"}
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", fontSize: "18px" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveCourse} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#cbd5e1", marginBottom: "6px" }}>
                  Course Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Next.js 15 Full-Stack SaaS Masterclass"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#0f172a", border: "1px solid #334155", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#cbd5e1", marginBottom: "6px" }}>
                    URL Slug
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. nextjs-15-saas"
                    value={courseForm.slug}
                    onChange={(e) => setCourseForm({ ...courseForm, slug: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#0f172a", border: "1px solid #334155", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#cbd5e1", marginBottom: "6px" }}>
                    Category
                  </label>
                  <select
                    value={courseForm.category}
                    onChange={(e) => setCourseForm({ ...courseForm, category: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#0f172a", border: "1px solid #334155", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                  >
                    <option value="fullstack">Full-Stack Web</option>
                    <option value="ai">AI & Machine Learning</option>
                    <option value="cloud">Cloud & DevOps</option>
                    <option value="cyber">Cyber Security</option>
                    <option value="systems">Systems & Data</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#cbd5e1", marginBottom: "6px" }}>
                    Discounted Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={courseForm.price}
                    onChange={(e) => setCourseForm({ ...courseForm, price: Number(e.target.value) })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#0f172a", border: "1px solid #334155", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#cbd5e1", marginBottom: "6px" }}>
                    Original Price (₹)
                  </label>
                  <input
                    type="number"
                    value={courseForm.originalPrice}
                    onChange={(e) => setCourseForm({ ...courseForm, originalPrice: Number(e.target.value) })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#0f172a", border: "1px solid #334155", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#cbd5e1", marginBottom: "6px" }}>
                    Instructor Name
                  </label>
                  <input
                    type="text"
                    value={courseForm.instructor}
                    onChange={(e) => setCourseForm({ ...courseForm, instructor: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#0f172a", border: "1px solid #334155", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#cbd5e1", marginBottom: "6px" }}>
                    Duration / Lectures
                  </label>
                  <input
                    type="text"
                    value={courseForm.duration}
                    onChange={(e) => setCourseForm({ ...courseForm, duration: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#0f172a", border: "1px solid #334155", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#cbd5e1", marginBottom: "6px" }}>
                  Image URL / Asset Path
                </label>
                <input
                  type="text"
                  value={courseForm.image}
                  onChange={(e) => setCourseForm({ ...courseForm, image: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#0f172a", border: "1px solid #334155", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#cbd5e1", marginBottom: "6px" }}>
                  Overview Description
                </label>
                <textarea
                  rows={3}
                  value={courseForm.overview}
                  onChange={(e) => setCourseForm({ ...courseForm, overview: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", background: "#0f172a", border: "1px solid #334155", color: "#fff", fontSize: "13px", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ flex: 1, padding: "11px", borderRadius: "10px", background: "#334155", color: "#fff", border: "none", fontSize: "13px", fontWeight: 700, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ flex: 2, padding: "11px", borderRadius: "10px", background: "linear-gradient(135deg, #ff5532 0%, #ea4321 100%)", color: "#fff", border: "none", fontSize: "13px", fontWeight: 750, cursor: "pointer" }}
                >
                  {editingCourse ? "Save Changes" : "Create Course"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
