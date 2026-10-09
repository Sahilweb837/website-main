"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowRight,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Code2,
  ExternalLink,
  Eye,
  FileCode2,
  FileText,
  Filter,
  Flame,
  FolderDown,
  Layers,
  Search,
  Share2,
  Sparkles,
  Zap,
} from "lucide-react";
import { api } from "@/lib/api";
import { LMS_COURSES } from "@/data/lms-courses";

interface ResourceItem {
  id: number;
  courseId: number;
  courseSlug: string;
  courseTitle: string;
  title: string;
  description: string;
  filePath: string;
  fileType: string;
  fileSize: string;
  category: string;
  isDownloadable: boolean;
  downloadsCount: number;
  createdAt: string;
}

export default function FreeResourcesPage() {
  const [resources, setResources] = useState<ResourceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCourse, setSelectedCourse] = useState("all");
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const [previewItem, setPreviewItem] = useState<ResourceItem | null>(null);

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const res = await api.getResources();
        if (active && res && Array.isArray(res.data)) {
          setResources(res.data);
        }
      } catch (err) {
        console.error("Failed to load study resources:", err);
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadData();
    const timer = setTimeout(() => {
      if (active) setLoading(false);
    }, 1200);

    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, []);

  const categories = [
    { id: "all", label: "All Assets" },
    { id: "Cheat Sheet", label: "Cheat Sheets" },
    { id: "Architecture Blueprint", label: "Architecture Blueprints" },
    { id: "Interview Kit", label: "Interview Kits" },
    { id: "Production Checklist", label: "Production Checklists" },
    { id: "Starter Code", label: "Starter Code & Repos" },
  ];

  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      const matchesSearch =
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.courseTitle.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      const matchesCourse =
        selectedCourse === "all" || item.courseSlug === selectedCourse;

      return matchesSearch && matchesCategory && matchesCourse;
    });
  }, [resources, searchQuery, selectedCategory, selectedCourse]);

  const handleDownload = async (item: ResourceItem) => {
    setDownloadingId(item.id);
    try {
      await api.trackResourceDownload(item.id);
      setResources((prev) =>
        prev.map((r) =>
          r.id === item.id ? { ...r, downloadsCount: r.downloadsCount + 1 } : r
        )
      );
    } catch {
      // Ignored
    } finally {
      setTimeout(() => setDownloadingId(null), 1000);
      window.open(item.filePath, "_blank");
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "radial-gradient(ellipse at 10% 0%, rgba(255, 235, 228, 0.44), transparent 34rem), #f7f8fc",
      padding: "32px 24px 80px",
      fontFamily: "'Plus Jakarta Sans', sans-serif",
      color: "#172033",
    }}>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        {/* Header Breadcrumbs & Eyebrow */}
        <div style={{ marginBottom: "26px" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "5px 12px",
            background: "#fff2ef",
            borderRadius: "20px",
            color: "#ff5532",
            fontSize: "11px",
            fontWeight: 800,
            letterSpacing: "0.8px",
            marginBottom: "12px",
          }}>
            <Sparkles size={13} />
            <span>FREE DEVELOPER RESOURCES & PDF GUIDES</span>
          </div>
          <h1 style={{
            fontSize: "clamp(26px, 3.5vw, 36px)",
            fontWeight: 800,
            letterSpacing: "-1.2px",
            color: "#172033",
            margin: "0 0 8px",
          }}>
            Free Learning Library & Cheat Sheets
          </h1>
          <p style={{
            fontSize: "14px",
            color: "#64748b",
            margin: 0,
            maxWidth: "680px",
            lineHeight: 1.6,
          }}>
            Download production-ready reference sheets, system design interview kits, and architecture blueprints curated by senior faculty. Completely free for all learners.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div style={{
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "18px",
          padding: "16px 20px",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "14px",
          boxShadow: "0 4px 20px rgba(15, 23, 42, 0.03)",
          marginBottom: "24px",
        }}>
          {/* Search Box */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            padding: "8px 14px",
            flex: "1 1 280px",
            maxWidth: "420px",
          }}>
            <Search size={16} color="#94a3b8" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search cheat sheets, system design, LangGraph..."
              style={{
                border: "none",
                background: "transparent",
                outline: "none",
                fontSize: "13px",
                width: "100%",
                color: "#1e293b",
                fontFamily: "inherit",
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "12px",
                  color: "#94a3b8",
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Course Track Select */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "12px", fontWeight: 700, color: "#64748b" }}>
              Track:
            </span>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              style={{
                padding: "8px 12px",
                borderRadius: "10px",
                border: "1px solid #e2e8f0",
                background: "#ffffff",
                fontSize: "12px",
                fontWeight: 600,
                color: "#334155",
                outline: "none",
                cursor: "pointer",
              }}
            >
              <option value="all">All Tracks</option>
              {LMS_COURSES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.title.split(":")[0]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div style={{
          display: "flex",
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "8px",
          marginBottom: "28px",
        }}>
          {categories.map((cat) => {
            const active = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "20px",
                  border: active ? "1px solid #ff5532" : "1px solid #e2e8f0",
                  background: active ? "#ff5532" : "#ffffff",
                  color: active ? "#ffffff" : "#475569",
                  fontSize: "12px",
                  fontWeight: active ? 750 : 600,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  transition: "all 160ms ease",
                  boxShadow: active ? "0 4px 12px rgba(255, 85, 50, 0.25)" : "none",
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Resources Cards Grid */}
        {loading ? (
          /* SKELETON PRELOADER */
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "20px",
          }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                style={{
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: "18px",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <div className="sk-box" style={{ width: "42px", height: "42px", borderRadius: "12px" }} />
                  <div className="sk-box" style={{ width: "100px", height: "22px", borderRadius: "10px" }} />
                </div>
                <div className="sk-box" style={{ width: "85%", height: "22px" }} />
                <div className="sk-box" style={{ width: "100%", height: "40px" }} />
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "12px" }}>
                  <div className="sk-box" style={{ width: "90px", height: "16px" }} />
                  <div className="sk-box" style={{ width: "120px", height: "36px", borderRadius: "10px" }} />
                </div>
              </div>
            ))}
          </div>
        ) : filteredResources.length === 0 ? (
          <div style={{
            background: "#ffffff",
            border: "1.5px dashed #cbd5e1",
            borderRadius: "20px",
            padding: "50px 24px",
            textAlign: "center",
          }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "16px",
              background: "#fff2ef",
              color: "#ff5532",
              display: "grid",
              placeItems: "center",
              margin: "0 auto 16px",
            }}>
              <FolderDown size={28} />
            </div>
            <h3 style={{ fontSize: "17px", fontWeight: 800, color: "#1e293b", margin: "0 0 6px" }}>
              No matching resources found
            </h3>
            <p style={{ fontSize: "13px", color: "#64748b", margin: "0 auto 16px", maxWidth: "420px" }}>
              Try adjusting your search query or selecting a different category filter.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
                setSelectedCourse("all");
              }}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                background: "#ff5532",
                color: "#ffffff",
                border: "none",
                fontWeight: 700,
                fontSize: "12px",
                cursor: "pointer",
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
            gap: "20px",
          }}>
            {filteredResources.map((item) => {
              const isPdf = item.fileType === "pdf";
              const isCode = item.fileType === "code";

              return (
                <article
                  key={item.id}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: "18px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
                    boxShadow: "0 4px 20px rgba(15, 23, 42, 0.04)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.borderColor = "#ff9a82";
                    e.currentTarget.style.boxShadow = "0 12px 30px rgba(255, 85, 50, 0.12)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                    e.currentTarget.style.boxShadow = "0 4px 20px rgba(15, 23, 42, 0.04)";
                  }}
                >
                  <div>
                    {/* Top Row: File Icon & Category Badge */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: "14px",
                    }}>
                      <div style={{
                        width: "44px",
                        height: "44px",
                        borderRadius: "12px",
                        background: isPdf ? "#fff1f2" : isCode ? "#f0fdf4" : "#eff6ff",
                        color: isPdf ? "#e11d48" : isCode ? "#16a34a" : "#2563eb",
                        border: isPdf ? "1px solid #ffe4e6" : isCode ? "1px solid #dcfce7" : "1px solid #dbeafe",
                        display: "grid",
                        placeItems: "center",
                      }}>
                        {isPdf ? <FileText size={22} /> : isCode ? <Code2 size={22} /> : <FileCode2 size={22} />}
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <span style={{
                          fontSize: "10px",
                          fontWeight: 800,
                          padding: "3px 8px",
                          borderRadius: "6px",
                          background: "#f1f5f9",
                          color: "#475569",
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}>
                          {item.category}
                        </span>
                        <span style={{
                          fontSize: "10px",
                          fontWeight: 700,
                          padding: "3px 7px",
                          borderRadius: "6px",
                          background: "#f8fafc",
                          color: "#94a3b8",
                          border: "1px solid #e2e8f0",
                        }}>
                          {item.fileSize}
                        </span>
                      </div>
                    </div>

                    {/* Course Tag */}
                    <div style={{
                      fontSize: "10px",
                      fontWeight: 750,
                      color: "#ff5532",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      marginBottom: "6px",
                    }}>
                      {item.courseTitle}
                    </div>

                    {/* Title */}
                    <h3 style={{
                      fontSize: "16px",
                      fontWeight: 800,
                      color: "#1e293b",
                      margin: "0 0 8px",
                      lineHeight: 1.35,
                      letterSpacing: "-0.3px",
                    }}>
                      {item.title}
                    </h3>

                    {/* Description */}
                    <p style={{
                      fontSize: "12px",
                      color: "#64748b",
                      margin: "0 0 16px",
                      lineHeight: 1.5,
                    }}>
                      {item.description}
                    </p>
                  </div>

                  {/* Bottom Row */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: "14px",
                    borderTop: "1px solid #f1f5f9",
                    marginTop: "10px",
                  }}>
                    <span style={{
                      fontSize: "11px",
                      fontWeight: 650,
                      color: "#64748b",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "5px",
                    }}>
                      <FolderDown size={14} color="#10b981" />
                      {item.downloadsCount.toLocaleString()} downloads
                    </span>

                    <div style={{ display: "flex", gap: "8px" }}>
                      {isPdf && (
                        <button
                          onClick={() => setPreviewItem(item)}
                          style={{
                            padding: "8px 12px",
                            borderRadius: "10px",
                            border: "1px solid #e2e8f0",
                            background: "#ffffff",
                            color: "#475569",
                            fontSize: "11px",
                            fontWeight: 700,
                            cursor: "pointer",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          <Eye size={13} /> Preview
                        </button>
                      )}

                      <button
                        onClick={() => void handleDownload(item)}
                        disabled={downloadingId === item.id}
                        style={{
                          padding: "8px 14px",
                          borderRadius: "10px",
                          background: "linear-gradient(135deg, #ff5532 0%, #ff7354 100%)",
                          color: "#ffffff",
                          border: "none",
                          fontSize: "11px",
                          fontWeight: 750,
                          cursor: "pointer",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          boxShadow: "0 4px 12px rgba(255, 85, 50, 0.25)",
                        }}
                      >
                        <ArrowDownToLine size={13} />
                        {downloadingId === item.id ? "Opening..." : "Download Free"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Quick FAQ / Community Nudge */}
        <div style={{
          marginTop: "48px",
          background: "linear-gradient(135deg, #111728 0%, #1c2438 100%)",
          borderRadius: "22px",
          padding: "32px 36px",
          color: "#ffffff",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px",
        }}>
          <div>
            <span style={{
              fontSize: "11px",
              fontWeight: 800,
              color: "#ff8c72",
              letterSpacing: "0.8px",
              textTransform: "uppercase",
            }}>
              NEED MORE SPECIFIC INTERVIEW ASSETS?
            </span>
            <h3 style={{ fontSize: "20px", fontWeight: 800, margin: "6px 0 8px" }}>
              Request study materials directly from your mentors
            </h3>
            <p style={{ fontSize: "13px", color: "#94a3b8", margin: 0, maxWidth: "560px", lineHeight: 1.5 }}>
              Senior faculty upload new PDF cheat sheets, Docker files, and LangGraph architectures weekly. Join the community to request topics.
            </p>
          </div>
          <Link
            href="/lms/community"
            style={{
              padding: "12px 22px",
              background: "linear-gradient(135deg, #ff5532 0%, #ff7354 100%)",
              color: "#ffffff",
              borderRadius: "12px",
              fontSize: "13px",
              fontWeight: 750,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 16px rgba(255, 85, 50, 0.35)",
            }}
          >
            Ask in Community Hub <ArrowRight size={15} />
          </Link>
        </div>
      </div>

      {/* PDF Quick Preview Modal */}
      {previewItem && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10, 16, 35, 0.75)",
            backdropFilter: "blur(6px)",
            zIndex: 9999,
            display: "grid",
            placeItems: "center",
            padding: "20px",
          }}
          onClick={() => setPreviewItem(null)}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "20px",
              width: "min(800px, 95vw)",
              maxHeight: "85vh",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
              boxShadow: "0 25px 60px rgba(0, 0, 0, 0.35)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "18px 24px",
              borderBottom: "1px solid #e2e8f0",
            }}>
              <div>
                <strong style={{ fontSize: "15px", color: "#1e293b", display: "block" }}>
                  {previewItem.title}
                </strong>
                <small style={{ color: "#64748b", fontSize: "11px" }}>
                  {previewItem.courseTitle} &bull; {previewItem.fileSize}
                </small>
              </div>
              <button
                onClick={() => setPreviewItem(null)}
                style={{
                  background: "#f1f5f9",
                  border: "none",
                  borderRadius: "8px",
                  width: "32px",
                  height: "32px",
                  cursor: "pointer",
                  fontSize: "16px",
                  color: "#475569",
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: "24px", overflowY: "auto", flex: 1, textAlign: "center" }}>
              <div style={{
                width: "68px",
                height: "68px",
                borderRadius: "18px",
                background: "#fff1f2",
                color: "#e11d48",
                display: "grid",
                placeItems: "center",
                margin: "0 auto 16px",
              }}>
                <FileText size={36} />
              </div>
              <h4 style={{ fontSize: "18px", fontWeight: 800, margin: "0 0 8px" }}>
                Ready to download: {previewItem.title}
              </h4>
              <p style={{ fontSize: "13px", color: "#64748b", maxWidth: "520px", margin: "0 auto 20px" }}>
                {previewItem.description}
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
                <a
                  href={previewItem.filePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: "12px 24px",
                    background: "linear-gradient(135deg, #ff5532 0%, #ff7354 100%)",
                    color: "#ffffff",
                    borderRadius: "12px",
                    fontSize: "13px",
                    fontWeight: 750,
                    textDecoration: "none",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <ArrowDownToLine size={16} /> Open & Download PDF File
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
