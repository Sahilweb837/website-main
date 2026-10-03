import Link from "next/link";

export default function CourseCard({ course }) {
  return (
    <div
      className="course-card"
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        overflow: "hidden",
        border: "1px solid #f1f5f9",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease, box-shadow 0.3s ease"
      }}
    >
      <div style={{ position: "relative", height: "180px", overflow: "hidden", background: "#f8fafc" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={course.image || "/images/course.png"}
          alt={course.title}
          style={{ width: "100%", height: "100%", objectFit: "contain", padding: "15px", transition: "transform 0.4s ease" }}
        />
        <span
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
            background: "rgba(255, 85, 50, 0.9)",
            color: "#ffffff",
            padding: "4px 10px",
            borderRadius: "20px",
            fontSize: "0.75rem",
            fontWeight: 600,
            textTransform: "uppercase"
          }}
        >
          {course.type === "online" ? "Online Live" : "On-Campus"}
        </span>
      </div>

      <div style={{ padding: "20px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px" }}>
          <span style={{ fontSize: "0.75rem", color: "#ff5532", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px" }}>
            {course.category}
          </span>
          <span style={{ color: "#cbd5e1" }}>•</span>
          <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
            ⏱ {course.duration}
          </span>
        </div>

        <h3 style={{ fontSize: "1.15rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px", lineHeight: 1.35 }}>
          <Link href={`/${course.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
            {course.title}
          </Link>
        </h3>

        <p style={{ color: "#64748b", fontSize: "0.88rem", lineHeight: 1.5, marginBottom: "18px", flex: 1 }}>
          {course.overview.length > 110 ? `${course.overview.substring(0, 110)}...` : course.overview}
        </p>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: "14px", borderTop: "1px solid #f1f5f9" }}>
          <span style={{ fontSize: "0.8rem", color: "#10b981", fontWeight: 600 }}>
            ✓ Placement Support
          </span>
          <Link
            href={`/${course.slug}`}
            className="color-btn"
            style={{
              padding: "7px 16px",
              fontSize: "0.85rem",
              borderRadius: "20px",
              textDecoration: "none"
            }}
          >
            Explore Syllabus →
          </Link>
        </div>
      </div>
    </div>
  );
}
