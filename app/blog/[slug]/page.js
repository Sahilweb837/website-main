import Link from "next/link";
import { notFound } from "next/navigation";
import { BLOGS, getBlogBySlug } from "@/data/blogs";

export async function generateStaticParams() {
  return BLOGS.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return { title: "Blog Not Found" };

  return {
    title: `${blog.title} | Netcoder Technology`,
    description: blog.excerpt,
    openGraph: {
      title: `${blog.title} | Netcoder Technology`,
      description: blog.excerpt,
      images: [blog.image || "/images/web-dev-blog.jpg"],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);

  if (!blog) {
    notFound();
  }

  const relatedBlogs = BLOGS.filter((b) => b.slug !== blog.slug).slice(0, 4);

  return (
    <div className="blog-detail-wrapper-page">
      <div className="blog-inner-container">
        {/* MAIN ARTICLE CARD */}
        <article className="blog-article-card">
          <div className="blog-nav-header-bar">
            <ul className="blog-breadcrumb-trail">
              <li>
                <Link href="/">
                  <i className="fa-solid fa-house" style={{ fontSize: "0.8rem" }}></i> Home
                </Link>
              </li>
              <li className="crumb-sep">/</li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li className="crumb-sep">/</li>
              <li className="crumb-active">{blog.title}</li>
            </ul>
            <Link href="/blog" className="back-to-blogs-pill">
              <span className="btn-arrow-icon">
                <i className="fa-solid fa-arrow-left"></i>
              </span>
              <span>All Articles</span>
            </Link>
          </div>

          <header className="article-header">
            <span className="article-category-badge">
              <i className="fa-solid fa-tag"></i> {blog.category}
            </span>
            <h1 className="article-main-title">{blog.title}</h1>
            <div className="article-meta-row">
              <span className="article-meta-item">
                <i className="fa-regular fa-user"></i> By {blog.author}
              </span>
              <span className="article-meta-item">
                <i className="fa-regular fa-calendar-days"></i> {blog.date}
              </span>
              <span className="article-meta-item">
                <i className="fa-regular fa-clock"></i> {blog.readTime || 5} min read
              </span>
            </div>
          </header>

          {blog.image && (
            <div className="article-featured-image-box" style={{ marginBottom: "32px", borderRadius: "16px", overflow: "hidden" }}>
              <img
                src={blog.image}
                alt={blog.title}
                style={{ width: "100%", height: "auto", maxHeight: "480px", objectFit: "cover", display: "block" }}
              />
            </div>
          )}

          <div
            className="article-content-body-flow"
            style={{ fontSize: "1.05rem", lineHeight: 1.85, color: "#334155" }}
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />

          <div
            style={{
              marginTop: "45px",
              paddingTop: "25px",
              borderTop: "1px solid #e2e8f0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "15px",
            }}
          >
            <div>
              <span style={{ fontWeight: 600, color: "#64748b", marginRight: "10px" }}>Share this article:</span>
              <a
                href={`https://wa.me/?text=${encodeURIComponent(blog.title + " https://www.netcoder.in/blog/" + blog.slug)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#25D366", marginRight: "14px", fontSize: "1.2rem" }}
                title="Share on WhatsApp"
              >
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent("https://www.netcoder.in/blog/" + blog.slug)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#0077b5", marginRight: "14px", fontSize: "1.2rem" }}
                title="Share on LinkedIn"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent("https://www.netcoder.in/blog/" + blog.slug)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "#1DA1F2", fontSize: "1.2rem" }}
                title="Share on Twitter"
              >
                <i className="fa-brands fa-twitter"></i>
              </a>
            </div>
            <Link href="/blog" className="color-btn" style={{ padding: "8px 22px", borderRadius: "30px", fontSize: "0.9rem" }}>
              Explore More Articles
            </Link>
          </div>
        </article>

        {/* SIDEBAR */}
        <aside className="blog-sidebar">
          {/* SEARCH WIDGET */}
          <div className="sidebar-widget">
            <h4>
              <i className="fa-solid fa-magnifying-glass" style={{ color: "#ff5532" }}></i> Search Articles
            </h4>
            <form action="/blog" method="GET" className="search-widget-form">
              <input type="text" name="search" placeholder="Type keywords..." />
              <button type="submit" title="Search">
                <i className="fa-solid fa-magnifying-glass"></i>
              </button>
            </form>
          </div>

          {/* CATEGORIES WIDGET */}
          <div className="sidebar-widget">
            <h4>
              <i className="fa-solid fa-folder-open" style={{ color: "#ff5532" }}></i> Categories
            </h4>
            <ul className="category-list">
              <li>
                <Link href="/blog" className="active">
                  <span>All Categories</span>
                  <i className="fa-solid fa-chevron-right" style={{ fontSize: "0.75rem" }}></i>
                </Link>
              </li>
              <li>
                <Link href="/blog?category=Development">
                  <span>Development</span>
                  <i className="fa-solid fa-chevron-right" style={{ fontSize: "0.75rem" }}></i>
                </Link>
              </li>
              <li>
                <Link href="/blog?category=Design">
                  <span>Design &amp; UI/UX</span>
                  <i className="fa-solid fa-chevron-right" style={{ fontSize: "0.75rem" }}></i>
                </Link>
              </li>
              <li>
                <Link href="/blog?category=Data">
                  <span>Data Science &amp; AI</span>
                  <i className="fa-solid fa-chevron-right" style={{ fontSize: "0.75rem" }}></i>
                </Link>
              </li>
              <li>
                <Link href="/blog?category=Marketing">
                  <span>Digital Marketing</span>
                  <i className="fa-solid fa-chevron-right" style={{ fontSize: "0.75rem" }}></i>
                </Link>
              </li>
            </ul>
          </div>

          {/* RECENT ARTICLES WIDGET */}
          <div className="sidebar-widget">
            <h4>
              <i className="fa-solid fa-fire" style={{ color: "#ff5532" }}></i> Recent Articles
            </h4>
            <div className="recent-posts-list">
              {relatedBlogs.map((b) => (
                <div key={b.slug} className="recent-post-item">
                  <div className="recent-post-thumb">
                    <Link href={`/blog/${b.slug}`}>
                      <img src={b.image || "/images/web-dev-blog.jpg"} alt={b.title} loading="lazy" />
                    </Link>
                  </div>
                  <div>
                    <h5 className="recent-post-title">
                      <Link href={`/blog/${b.slug}`}>{b.title}</Link>
                    </h5>
                    <span className="recent-post-date">
                      <i className="fa-regular fa-calendar-days"></i> {b.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA CARD */}
          <div
            className="sidebar-widget"
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              color: "#fff",
              textAlign: "center",
              borderColor: "#334155",
            }}
          >
            <div
              style={{
                width: "50px",
                height: "50px",
                background: "rgba(255, 85, 50, 0.15)",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 12px",
                color: "#ff5532",
                fontSize: "1.3rem",
              }}
            >
              <i className="fa-solid fa-headset"></i>
            </div>
            <h4 style={{ color: "#fff", borderBottom: "none", paddingBottom: 0, justifyContent: "center", marginBottom: "8px" }}>
              Need Career Guidance?
            </h4>
            <p style={{ fontSize: "0.88rem", color: "#cbd5e1", lineHeight: 1.6, marginBottom: "20px" }}>
              Talk with our expert mentors to choose the right IT course for your career growth.
            </p>
            <Link
              href="/contact"
              className="color-btn"
              style={{ display: "block", width: "100%", textDecoration: "none", borderRadius: "10px", textAlign: "center", padding: "12px" }}
            >
              Contact Tech Advisor
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
