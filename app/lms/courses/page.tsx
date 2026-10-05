"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/context";
import { DEFAULT_ENROLLMENTS, DEFAULT_LESSONS } from "@/data/lms-data";
import type { Lesson } from "@/data/lms-data";
import {
  BookOpen, Clock, CheckCircle2, PlayCircle, Lock,
  ArrowRight, Flame, Trophy, GraduationCap,
} from "lucide-react";

/* ─────────────────────────────────────────────────────────
   ROOT CSS VARIABLES (injected globally)
───────────────────────────────────────────────────────── */
const ROOT_VARS = `
  :root {
    --header-height: 3.5rem;
    --first-color: #ff5532;
    --second-color: #575757;
    --text-color: #111;
    --body-color: #fff;
    --shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
    --normal-font-size: .938rem;
    --small-font-size: .813rem;
    --smaller-font-size: .75rem;
    --z-tooltip: 10;
    --z-fixed: 100;
  }
`;

/* ─────────────────────────────────────────────────────────
   SHARED STYLE TOKENS — mapped to :root variables
───────────────────────────────────────────────────────── */
const T = {
  bg: "#fafafa",
  surface: "#ffffff",
  text: "#111111",
  textMuted: "#575757",
  primary: "#ff5532",
  primarySoft: "#fff1ee",
  primaryDeep: "#8a1f0a",
  border: "#f0f0f0",
  success: "#006c49",
  successSoft: "#e6f8f0",
  warning: "#744800",
  warningSoft: "#ffddb8",
  radius: 16,
  radiusSm: 10,
  shadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px",
  shadowHover: "0 12px 24px -8px rgba(255, 85, 50, 0.18)",
};

export default function MyCoursesPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  const enrollments = DEFAULT_ENROLLMENTS.filter((e) => e.userId === user.id);

  /* Aggregate stats for the hero */
  const totalLessons = enrollments.reduce((acc, en) => {
    const lessons = DEFAULT_LESSONS[en.courseSlug] || [];
    return acc + (lessons.length || en.course?.syllabus.length || 0);
  }, 0);
  const completedLessons = enrollments.reduce(
    (acc, en) => acc + en.completedLessons.length,
    0
  );
  const overallPct = totalLessons
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0;

  return (
    <div
      style={{
        background: T.bg,
        minHeight: "100vh",
        fontFamily: "'Plus Jakarta Sans', 'Sora', sans-serif",
        color: T.text,
      }}
    >
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {/* Inject :root CSS variables + component styles */}
      <style>{ROOT_VARS}</style>
      <style>{`
        .mc-card-hover { transition: all .25s cubic-bezier(.16,1,.3,1); }
        .mc-card-hover:hover { transform: translateY(-3px); box-shadow: ${T.shadowHover}; }
        .mc-btn-hover { transition: all .2s cubic-bezier(.16,1,.3,1); }
        .mc-btn-hover:hover { transform: translateY(-2px); box-shadow: 0 4px 14px rgba(255,85,50,.25); }
        .mc-lesson-hover { transition: all .18s ease; }
        .mc-lesson-hover:hover { background: ${T.primarySoft}; border-color: ${T.primary}44; }
      `}</style>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "24px 16px 64px" }}>

        {/* ═══════════════════════════════════════════════
            HEADER ROW
        ═══════════════════════════════════════════════ */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            marginBottom: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: T.radiusSm,
                background: T.primarySoft,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: T.primary,
                flexShrink: 0,
              }}
            >
              <GraduationCap size={22} />
            </div>
            <div>
              <h1
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  margin: 0,
                  color: T.text,
                  letterSpacing: "-.02em",
                }}
              >
                My Courses
              </h1>
              <p
                style={{
                  fontSize: 13,
                  color: T.textMuted,
                  margin: "2px 0 0",
                }}
              >
                {enrollments.length} active program
                {enrollments.length === 1 ? "" : "s"} &bull; keep the streak alive
              </p>
            </div>
          </div>

          <Link
            href="/lms/catalog"
            className="mc-btn-hover"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "10px 18px",
              borderRadius: T.radiusSm,
              background: T.primary,
              color: "#fff",
              fontSize: 13,
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            Browse more courses <ArrowRight size={15} />
          </Link>
        </div>

        {/* ═══════════════════════════════════════════════
            STATS RIBBON
        ═══════════════════════════════════════════════ */}
        {enrollments.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
              marginBottom: 28,
            }}
          >
            <MiniStat
              icon={<BookOpen size={20} />}
              tint={T.primarySoft}
              color={T.primary}
              value={`${enrollments.length}`}
              label="Active Courses"
            />
            <MiniStat
              icon={<CheckCircle2 size={20} />}
              tint={T.successSoft}
              color={T.success}
              value={`${completedLessons}`}
              label="Lessons Completed"
            />
            <MiniStat
              icon={<Trophy size={20} />}
              tint="#fff1ee"
              color={T.primary}
              value={`${overallPct}%`}
              label="Overall Progress"
            />
            <MiniStat
              icon={<Flame size={20} />}
              tint={T.warningSoft}
              color={T.warning}
              value="14 Days"
              label="Unbroken Streak"
            />
          </div>
        )}

        {/* ═══════════════════════════════════════════════
            EMPTY STATE
        ═══════════════════════════════════════════════ */}
        {enrollments.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "64px 24px",
              background: T.surface,
              borderRadius: T.radius,
              border: `1px solid ${T.border}`,
              boxShadow: T.shadow,
            }}
          >
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: T.primarySoft,
                color: T.primary,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <BookOpen size={28} />
            </div>
            <p
              style={{
                color: T.text,
                fontWeight: 700,
                fontSize: 16,
                margin: "0 0 6px",
              }}
            >
              You have not enrolled in any courses yet
            </p>
            <p
              style={{
                color: T.textMuted,
                fontSize: 13,
                margin: "0 0 20px",
              }}
            >
              Pick a career track and start building today.
            </p>
            <Link
              href="/lms/catalog"
              className="mc-btn-hover"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 20px",
                borderRadius: T.radiusSm,
                background: T.primary,
                color: "#fff",
                fontSize: 14,
                fontWeight: 700,
                textDecoration: "none",
              }}
            >
              Browse Course Catalog <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {enrollments.map((enrollment) => {
              if (!enrollment.course) return null;
              const lessons = DEFAULT_LESSONS[enrollment.courseSlug] || [];
              const completedCount = enrollment.completedLessons.length;
              const totalCount =
                lessons.length || enrollment.course.syllabus.length;
              const pct = Math.round(
                (completedCount / Math.max(totalCount, 1)) * 100
              );

              return (
                <div
                  key={enrollment.id}
                  className="mc-card-hover"
                  style={{
                    background: T.surface,
                    borderRadius: T.radius,
                    border: `1px solid ${T.border}`,
                    boxShadow: T.shadow,
                    overflow: "hidden",
                  }}
                >
                  {/* ── Course header ── */}
                  <div
                    style={{
                      padding: 24,
                      borderBottom: `1px solid ${T.border}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "space-between",
                        gap: 16,
                        flexWrap: "wrap",
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            letterSpacing: ".06em",
                            textTransform: "uppercase",
                            color: T.primary,
                            marginBottom: 4,
                          }}
                        >
                          {enrollment.course.category || "Career Track"}
                        </div>
                        <h2
                          style={{
                            fontSize: 20,
                            fontWeight: 800,
                            color: T.text,
                            margin: 0,
                            lineHeight: 1.25,
                          }}
                        >
                          <Link
                            href={`/lms/courses/${enrollment.courseSlug}`}
                            style={{
                              color: "inherit",
                              textDecoration: "none",
                              transition: "color .2s",
                            }}
                            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = T.primary)}
                            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = T.text)}
                          >
                            {enrollment.course.title}
                          </Link>
                        </h2>
                        <p
                          style={{
                            fontSize: 13,
                            color: T.textMuted,
                            margin: "6px 0 0",
                            display: "flex",
                            alignItems: "center",
                            gap: 6,
                          }}
                        >
                          <Clock size={13} />
                          Enrolled on {enrollment.enrollmentDate}
                        </p>
                      </div>

                      <span
                        style={{
                          fontSize: 11,
                          fontWeight: 800,
                          textTransform: "uppercase",
                          padding: "4px 10px",
                          borderRadius: 999,
                          background:
                            enrollment.course.type === "online"
                              ? T.primarySoft
                              : T.warningSoft,
                          color:
                            enrollment.course.type === "online"
                              ? T.primaryDeep
                              : T.warning,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {enrollment.course.type}
                      </span>
                    </div>

                    {/* ── Progress bar ── */}
                    <div style={{ marginTop: 18 }}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          fontSize: 13,
                          fontWeight: 600,
                          marginBottom: 8,
                        }}
                      >
                        <span style={{ color: T.text }}>
                          Progress: {pct}%
                        </span>
                        <span style={{ color: T.textMuted }}>
                          {completedCount}/{totalCount} lessons completed
                        </span>
                      </div>
                      <div
                        style={{
                          width: "100%",
                          height: 10,
                          background: T.border,
                          borderRadius: 999,
                          overflow: "hidden",
                        }}
                      >
                        <div
                          style={{
                            width: `${pct}%`,
                            height: "100%",
                            background: `linear-gradient(90deg, ${T.primary}, #ff8a6e)`,
                            borderRadius: 999,
                            transition: "width .4s cubic-bezier(.16,1,.3,1)",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* ── Lessons list ── */}
                  <div style={{ padding: 16 }}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 12,
                      }}
                    >
                      <h3
                        style={{
                          fontSize: 14,
                          fontWeight: 800,
                          color: T.text,
                          margin: "4px 8px",
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                        }}
                      >
                        <PlayCircle size={16} color={T.primary} /> Lessons
                      </h3>
                      <Link
                        href={`/lms/courses/${enrollment.courseSlug}`}
                        className="mc-btn-hover"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 12,
                          fontWeight: 700,
                          color: T.primary,
                          textDecoration: "none",
                          padding: "5px 12px",
                          borderRadius: T.radiusSm,
                          border: `1px solid ${T.primary}33`,
                          background: T.primarySoft,
                          marginRight: 8,
                        }}
                      >
                        <ArrowRight size={13} /> View Details
                      </Link>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 8,
                      }}
                    >
                      {lessons.map((lesson: Lesson) => {
                        const isCurrent =
                          enrollment.currentLessonId === lesson.id;
                        const isCompleted =
                          enrollment.completedLessons.includes(lesson.id);

                        /* state styling */
                        const ringBg = isCompleted
                          ? T.successSoft
                          : isCurrent
                            ? T.primarySoft
                            : "#f4f4f4";
                        const ringColor = isCompleted
                          ? T.success
                          : isCurrent
                            ? T.primary
                            : T.textMuted;
                        const borderColor = isCurrent
                          ? `${T.primary}66`
                          : T.border;
                        const cardBg = isCurrent
                          ? T.primarySoft
                          : T.surface;
                        const badgeBg = isCompleted
                          ? T.successSoft
                          : isCurrent
                            ? T.primarySoft
                            : "#f4f4f4";
                        const badgeColor = isCompleted
                          ? T.success
                          : isCurrent
                            ? T.primary
                            : T.textMuted;

                        const StatusIcon = isCompleted
                          ? CheckCircle2
                          : isCurrent
                            ? PlayCircle
                            : Lock;

                        const lessonNumber =
                          lesson.id.split("-")[1] || "•";

                        return (
                          <Link
                            key={lesson.id}
                            href={`/lms/courses/${enrollment.courseSlug}/${lesson.id}`}
                            className="mc-lesson-hover"
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              gap: 12,
                              padding: "12px 14px",
                              borderRadius: T.radiusSm,
                              border: `1px solid ${borderColor}`,
                              background: cardBg,
                              textDecoration: "none",
                              color: "inherit",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 12,
                                minWidth: 0,
                              }}
                            >
                              <div
                                style={{
                                  width: 32,
                                  height: 32,
                                  borderRadius: "50%",
                                  background: ringBg,
                                  color: ringColor,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: 12,
                                  fontWeight: 800,
                                  flexShrink: 0,
                                }}
                              >
                                {isCompleted ? (
                                  <CheckCircle2 size={16} />
                                ) : (
                                  lessonNumber
                                )}
                              </div>
                              <div style={{ minWidth: 0 }}>
                                <p
                                  style={{
                                    fontSize: 14,
                                    fontWeight: 700,
                                    color: isCurrent
                                      ? T.primaryDeep
                                      : T.text,
                                    margin: 0,
                                    lineHeight: 1.3,
                                  }}
                                >
                                  {lesson.title}
                                </p>
                                <p
                                  style={{
                                    fontSize: 12,
                                    color: T.textMuted,
                                    margin: "2px 0 0",
                                  }}
                                >
                                  {lesson.duration}
                                </p>
                              </div>
                            </div>

                            <span
                              style={{
                                display: "inline-flex",
                                alignItems: "center",
                                gap: 5,
                                fontSize: 11,
                                fontWeight: 800,
                                padding: "4px 10px",
                                borderRadius: 999,
                                background: badgeBg,
                                color: badgeColor,
                                flexShrink: 0,
                                whiteSpace: "nowrap",
                              }}
                            >
                              <StatusIcon size={12} />
                              {isCompleted
                                ? "Completed"
                                : isCurrent
                                  ? "In Progress"
                                  : "Locked"}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   SUB‑COMPONENTS
═══════════════════════════════════════════════════════ */

function MiniStat({
  icon,
  tint,
  color,
  value,
  label,
}: {
  icon: React.ReactNode;
  tint: string;
  color: string;
  value: string;
  label: string;
}) {
  return (
    <div
      style={{
        background: T.surface,
        padding: "14px 16px",
        borderRadius: T.radiusSm,
        boxShadow: "0 1px 4px rgba(0,0,0,.04)",
        display: "flex",
        alignItems: "center",
        gap: 14,
        border: `1px solid ${T.border}`,
      }}
    >
      <div
        style={{
          width: 42,
          height: 42,
          borderRadius: T.radiusSm,
          background: tint,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          style={{
            fontSize: 17,
            fontWeight: 800,
            color: T.text,
            lineHeight: 1.1,
          }}
        >
          {value}
        </div>
        <div style={{ fontSize: 12, fontWeight: 600, color: T.textMuted }}>
          {label}
        </div>
      </div>
    </div>
  );
}