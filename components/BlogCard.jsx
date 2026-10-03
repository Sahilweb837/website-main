import Link from "next/link";

export default function BlogCard({ blog }) {
  return (
    <article
      className="blog-card"
      style={{
        background: "#ffffff",
        borderRadius: "18px",
        overflow: "hidden",
        border: "1px solid #f1f5f9",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
        display: "flex",
        flexDirection: "column",
        transition: "transform 0.3s ease, box-shadow 0.3s ease"
      }}
    >
      <div style={{ height: "200px", overflow: "hidden", position: "relative", background: "#f8fafc" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={blog.image || "/images/trend-blog.jpg"}
          alt={blog.title}
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease" }}
        />
        <span
          style={{
            position: "absolute",
            bottom: "12px",
            left: "12px",
            background: "rgba(15, 23, 42, 0.8)",
            backdropFilter: "blur(4px)",
            color: "#ffffff",
            padding: "4px 10px",
            borderRadius: "6px",
            fontSize: "0.75rem",
            fontWeight: 600
          }}
        >
          {blog.category}
        </span>
      </div>

      <div style={{ padding: "22px", flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.8rem", color: "#94a3b8", marginBottom: "10px" }}>
          <span>📅 {blog.date}</span>
          <span>•</span>
          <span>⏱ {blog.readTime}</span>
        </div>

        <h3 style={{ fontSize: "1.2rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px", lineHeight: 1.4 }}>
          <Link href={`/blog/${blog.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
            {blog.title}
          </Link>
        </h3>

        <p style={{ color: "#64748b", fontSize: "0.9rem", lineHeight: 1.55, marginBottom: "16px", flex: 1 }}>
          {blog.excerpt}
        </p>

        <div style={{ paddingTop: "14px", borderTop: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "0.8rem", color: "#475569", fontWeight: 500 }}>
            By {blog.author}
          </span>
          <Link
            href={`/blog/${blog.slug}`}
            style={{ color: "#ff5532", fontWeight: 700, fontSize: "0.88rem", textDecoration: "none" }}
          >
            Read Article →
          </Link>
        </div>
      </div>
    </article>
  );
}
