"use client";

import { useEffect, useState } from "react";

export default function SplashAd() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show once per browser tab session
    if (typeof window !== "undefined" && sessionStorage.getItem("splashShown") === "1") {
      setVisible(false);
      return;
    }
    if (typeof window !== "undefined") {
      sessionStorage.setItem("splashShown", "1");
    }

    const reveal = () => setMounted(true);
    if (document.readyState === "complete") reveal();
    else window.addEventListener("load", reveal);

    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 500);
    }, 4500);

    const dismiss = () => {
      setFadeOut(true);
      setTimeout(() => setVisible(false), 500);
    };

    window.addEventListener("wheel", dismiss, { passive: true, once: true });
    window.addEventListener("touchmove", dismiss, { passive: true, once: true });
    window.addEventListener("click", dismiss, { once: true });

    return () => {
      window.removeEventListener("load", reveal);
      clearTimeout(timer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`splash-ad-overlay ${mounted ? "is-ready" : ""} ${fadeOut ? "is-hidden" : ""}`}
      aria-label="Best online courses in Himachal Pradesh"
      role="dialog"
      aria-modal="true"
    >
      <div className="splash-skeleton" aria-hidden="true">
        <div className="sk-container">
          <div className="sk-line sk-line--lg" />
          <div className="sk-line sk-line--md" />
          <div className="sk-line sk-line--sm" />
          <div className="sk-grid">
            <div className="sk-card" />
            <div className="sk-card" />
            <div className="sk-card" />
          </div>
        </div>
      </div>

      <div className="splash-ad-content">
        <span className="splash-ad-badge">Himachal&apos;s #1 Online Learning</span>
        <h2 className="splash-ad-title">
          Best Online Courses in <span>Himachal Pradesh</span>
        </h2>
        <p className="splash-ad-sub">
          Learn Data Science, AI, Full Stack, Cyber Security, Digital Marketing &amp; more — live
          mentorship, real projects, and placement support from Dharamshala.
        </p>
        <div className="splash-ad-actions">
          <a href="/contact" className="splash-ad-btn splash-ad-btn--primary">
            Enroll Now
          </a>
          <a href="/services" className="splash-ad-btn splash-ad-btn--ghost">
            Explore Courses
          </a>
        </div>
        <button
          type="button"
          className="splash-ad-skip"
          onClick={() => {
            setFadeOut(true);
            setTimeout(() => setVisible(false), 500);
          }}
        >
          Skip &amp; continue →
        </button>
      </div>
    </div>
  );
}