"use client";

import { usePathname } from "next/navigation";

export default function FloatingCTA() {
  const pathname = usePathname();

  if (
    pathname &&
    (pathname.startsWith("/admin") ||
      pathname.startsWith("/lms") ||
      pathname.startsWith("/mentor") ||
      pathname === "/bootcamp" ||
      pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/feedback")
  ) {
    return null;
  }

  const handleOpenDemo = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-demo-modal"));
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "25px",
        right: "25px",
        zIndex: 9990,
        display: "flex",
        flexDirection: "column",
        gap: "12px",
        alignItems: "flex-end"
      }}
    >
      {/* Floating Demo CTA */}
      <button
        onClick={handleOpenDemo}
        title="Book Free Demo Class"
        style={{
          background: "linear-gradient(135deg, #ff5532 0%, #ff8568 100%)",
          color: "#ffffff",
          border: "none",
          padding: "12px 20px",
          borderRadius: "30px",
          fontWeight: 700,
          fontSize: "0.9rem",
          display: "flex",
          alignItems: "center",
          gap: "8px",
          boxShadow: "0 8px 25px rgba(255, 85, 50, 0.4)",
          cursor: "pointer",
          transition: "transform 0.25s ease"
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        <span>🎓 Book Demo</span>
      </button>

      {/* Floating WhatsApp */}
      <a
        href="https://api.whatsapp.com/send?phone=919816732055&text=Hello%20Netcoder%20Technology,%20I%20want%20to%20know%20more%20about%20your%20courses."
        target="_blank"
        rel="noopener noreferrer"
        title="Chat on WhatsApp"
        style={{
          width: "52px",
          height: "52px",
          borderRadius: "50%",
          background: "#25d366",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 6px 20px rgba(37, 211, 102, 0.4)",
          color: "#ffffff",
          textDecoration: "none",
          fontSize: "26px",
          transition: "transform 0.25s ease"
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        💬
      </a>
    </div>
  );
}
