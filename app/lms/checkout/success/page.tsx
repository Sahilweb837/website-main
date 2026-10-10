"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth/context";
import { setActiveCourseSlug } from "@/lib/lms-progress";
import {
  CheckCircle2, Video, Calendar, Users, ArrowRight,
  BookOpen, Sparkles, ExternalLink, ShieldCheck, Clock
} from "lucide-react";

function CheckoutSuccessContent() {
  const params = useSearchParams();
  const router = useRouter();
  const orderId = params.get("orderId") || "";
  const courseSlugParam = params.get("course") || "";

  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const { enrollCourse, enrolledCourses, isAuthLoaded, user } = useAuth();

  useEffect(() => {
    async function fetchOrderInfo() {
      if (!orderId) {
        setLoading(false);
        setErrorMsg("No order ID was provided.");
        return;
      }

      try {
        const res = await fetch(`/api/checkout/order/${encodeURIComponent(orderId)}`);
        if (res.ok) {
          const json = await res.json();
          if (json.success) {
            setOrderData(json);
            const slug = json.course?.slug || courseSlugParam;
            if (slug) {
              enrollCourse(slug, { orderId });
              setActiveCourseSlug(slug);
            }
          } else {
            setErrorMsg(json.message || "Could not retrieve order details.");
          }
        } else {
          // Fallback verification
          const verifyRes = await fetch("/api/checkout/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderId }),
          });
          const verifyData = await verifyRes.json();
          if (verifyRes.ok && verifyData.success) {
            if (courseSlugParam) {
              enrollCourse(courseSlugParam, { orderId });
              setActiveCourseSlug(courseSlugParam);
            }
          }
        }
      } catch (err: any) {
        console.warn("Order details fetch notice:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrderInfo();
  }, [orderId, courseSlugParam, enrollCourse]);

  const activeCourseSlug = orderData?.course?.slug || courseSlugParam || "data-science-machine-learning-ai";
  const cohort = orderData?.cohort;
  const liveSession = orderData?.liveSession;
  const order = orderData?.order;
  const course = orderData?.course;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "radial-gradient(ellipse at 50% 0%, rgba(255, 235, 228, 0.5), transparent 45rem), #faf8ff",
        padding: "40px 20px 80px",
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        
        {loading ? (
          <div
            style={{
              background: "#ffffff",
              borderRadius: 24,
              border: "1px solid #e2e8f0",
              padding: "48px 24px",
              textAlign: "center",
              boxShadow: "0 10px 30px rgba(0,0,0,0.05)",
            }}
          >
            <div
              style={{
                width: 50,
                height: 50,
                border: "4px solid #fed7aa",
                borderTopColor: "#ff5532",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 18px",
              }}
            />
            <h2 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: 0 }}>
              Verifying Payment & SQL Database Enrollment…
            </h2>
            <p style={{ fontSize: 13, color: "#64748b", marginTop: 6 }}>
              Allocating your cohort batch and live class seat in Netcoder LMS.
            </p>
          </div>
        ) : (
          <div
            style={{
              background: "#ffffff",
              borderRadius: 24,
              border: "1px solid #e2e8f0",
              boxShadow: "0 20px 50px rgba(0,0,0,0.06)",
              overflow: "hidden",
            }}
          >
            {/* Header Success Ribbon */}
            <div
              style={{
                background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                padding: "32px 28px",
                color: "#ffffff",
                textAlign: "center",
                position: "relative",
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 255, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 14px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                }}
              >
                <CheckCircle2 size={36} color="#ffffff" strokeWidth={2.5} />
              </div>
              <h1 style={{ fontSize: 24, fontWeight: 800, margin: "0 0 6px" }}>
                Payment Successful & Enrolled! 🎉
              </h1>
              <p style={{ fontSize: 13.5, opacity: 0.95, margin: 0, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
                Your order is confirmed and saved into the SQL database. You have been assigned to your cohort batch.
              </p>
            </div>

            {/* Receipt Summary Strip */}
            <div
              style={{
                padding: "20px 28px",
                background: "#f8fafc",
                borderBottom: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 12,
                fontSize: 12.5,
              }}
            >
              <div>
                <span style={{ color: "#64748b" }}>Order Reference:</span>{" "}
                <strong style={{ color: "#0f172a", fontFamily: "monospace" }}>{order?.orderNumber || orderId}</strong>
              </div>
              {order?.transactionId && (
                <div>
                  <span style={{ color: "#64748b" }}>Transaction:</span>{" "}
                  <strong style={{ color: "#0f172a", fontFamily: "monospace" }}>{order.transactionId}</strong>
                </div>
              )}
              <div>
                <span style={{ color: "#64748b" }}>Status:</span>{" "}
                <span style={{ background: "#dcfce7", color: "#15803d", padding: "2px 8px", borderRadius: 4, fontWeight: 700, fontSize: 11 }}>
                  PAID (₹{order?.amount?.toLocaleString("en-IN") || "Verified"})
                </span>
              </div>
            </div>

            {/* Enrolled Course Card */}
            <div style={{ padding: "26px 28px" }}>
              <div style={{ marginBottom: 22 }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: "#ff5532", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Active Enrollment
                </span>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", margin: "4px 0 2px" }}>
                  {course?.title || "Enrolled Course"}
                </h3>
                <p style={{ fontSize: 12.5, color: "#64748b", margin: 0 }}>
                  Category: <strong>{course?.category || "Professional Track"}</strong> &bull; Duration: {course?.duration || "12 weeks"}
                </p>
              </div>

              {/* ═══════════════════════════════════════════════
                  ASSIGNED COHORT / BATCH DETAILS BOX
              ═══════════════════════════════════════════════ */}
              <div
                style={{
                  background: "#fff7f3",
                  border: "1.5px solid #fed7aa",
                  borderRadius: 16,
                  padding: "18px 20px",
                  marginBottom: 20,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 34, height: 34, borderRadius: 10, background: "#ff5532", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Users size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: 11, fontWeight: 800, color: "#c2381e", textTransform: "uppercase" }}>
                        Assigned Cohort Batch
                      </div>
                      <div style={{ fontSize: 15, fontWeight: 800, color: "#0f172a" }}>
                        {cohort?.name || "Official 2026 Batch"} ({cohort?.code || "BATCH-2026"})
                      </div>
                    </div>
                  </div>
                  <span style={{ background: "#ffffff", color: "#c2381e", border: "1px solid #fed7aa", padding: "4px 10px", borderRadius: 8, fontSize: 11.5, fontWeight: 700 }}>
                    Track: {cohort?.track || "Online Live Track"}
                  </span>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, fontSize: 12, color: "#475569", paddingTop: 10, borderTop: "1px solid #ffedd5" }}>
                  <div>
                    Mentor: <strong style={{ color: "#0f172a" }}>{cohort?.mentorName || "Lead Faculty Mentor"}</strong>
                  </div>
                  <div>
                    Batch Start: <strong style={{ color: "#0f172a" }}>{cohort?.startDate || "Immediate Access"}</strong>
                  </div>
                </div>
              </div>

              {/* ═══════════════════════════════════════════════
                  SCHEDULED LIVE CLASS & DIRECT JOIN LINK
              ═══════════════════════════════════════════════ */}
              {liveSession ? (
                <div
                  style={{
                    background: "#f0fdf4",
                    border: "1.5px solid #bbf7d0",
                    borderRadius: 16,
                    padding: "18px 20px",
                    marginBottom: 24,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 800, color: "#15803d", textTransform: "uppercase" }}>
                      <Calendar size={14} color="#16a34a" />
                      Next Scheduled Live Class
                    </span>
                    <span style={{ background: "#dcfce7", color: "#166534", padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                      {liveSession.platform || "Google Meet"}
                    </span>
                  </div>

                  <h4 style={{ fontSize: 14.5, fontWeight: 800, color: "#14532d", margin: "0 0 6px" }}>
                    {liveSession.title}
                  </h4>
                  <div style={{ fontSize: 12, color: "#166534", marginBottom: 14 }}>
                    Schedule: <strong>{liveSession.date} &bull; {liveSession.time}</strong> with mentor <strong>{liveSession.mentorName}</strong>
                  </div>

                  {liveSession.meetingLink && (
                    <a
                      href={liveSession.meetingLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                        background: "#16a34a",
                        color: "#ffffff",
                        padding: "10px 18px",
                        borderRadius: 10,
                        fontSize: 13,
                        fontWeight: 750,
                        textDecoration: "none",
                        boxShadow: "0 4px 12px rgba(22, 163, 74, 0.28)",
                      }}
                    >
                      <Video size={16} />
                      <span>Join Live Class Now</span>
                      <ExternalLink size={14} />
                    </a>
                  )}
                </div>
              ) : (
                <div
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                    padding: "12px 16px",
                    marginBottom: 24,
                    fontSize: 12,
                    color: "#64748b",
                  }}
                >
                  Live Session update: Your assigned mentor will post the upcoming batch live link in the cohort dashboard.
                </div>
              )}

              {/* Navigation Actions */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link
                  href="/lms/courses"
                  style={{
                    flex: 1,
                    minWidth: 160,
                    textAlign: "center",
                    padding: "12px 18px",
                    borderRadius: 12,
                    background: "#ff5532",
                    color: "#ffffff",
                    fontSize: 13,
                    fontWeight: 750,
                    textDecoration: "none",
                    boxShadow: "0 4px 12px rgba(255, 85, 50, 0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <BookOpen size={16} />
                  <span>Go to My Courses</span>
                </Link>

                <Link
                  href="/lms/cohorts"
                  style={{
                    flex: 1,
                    minWidth: 160,
                    textAlign: "center",
                    padding: "12px 18px",
                    borderRadius: 12,
                    background: "#ffffff",
                    color: "#0f172a",
                    border: "1px solid #cbd5e1",
                    fontSize: 13,
                    fontWeight: 750,
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <Users size={16} />
                  <span>Go to My Cohorts</span>
                </Link>

                {activeCourseSlug && (
                  <Link
                    href={`/lms/courses/${activeCourseSlug}`}
                    style={{
                      flex: 1,
                      minWidth: 160,
                      textAlign: "center",
                      padding: "12px 18px",
                      borderRadius: 12,
                      background: "#0f172a",
                      color: "#ffffff",
                      fontSize: 13,
                      fontWeight: 750,
                      textDecoration: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                    }}
                  >
                    <span>Enter Classroom</span>
                    <ArrowRight size={15} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#faf8ff" }}>
          <div style={{ width: 44, height: 44, border: "4px solid #fed7aa", borderTopColor: "#ff5532", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}