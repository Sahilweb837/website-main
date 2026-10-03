"use client";

import { useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/context";

interface SecureLMSGuardProps {
  children: ReactNode;
  showWatermark?: boolean;
  contentTitle?: string;
}

export default function SecureLMSGuard({
  children,
  showWatermark = true,
  contentTitle = "Protected Course Content",
}: SecureLMSGuardProps) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();
  const [isWindowBlurred, setIsWindowBlurred] = useState(false);
  const [watermarkPos, setWatermarkPos] = useState({ top: 30, left: 40 });

  // Route protection - must be logged in to view LMS course content
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  // Gently drift the watermark across the screen (anti-screen recording / piracy stamp)
  useEffect(() => {
    if (!showWatermark) return;
    const interval = setInterval(() => {
      const top = Math.floor(Math.random() * 70) + 15;
      const left = Math.floor(Math.random() * 70) + 15;
      setWatermarkPos({ top, left });
    }, 8000);
    return () => clearInterval(interval);
  }, [showWatermark]);

  // Silent Anti-Screenshot & Anti-Download Event Listeners (No disruptive toast popups)
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      // Silently prevent right-click and context menu
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Detect PrintScreen: silently clear clipboard
      if (e.key === "PrintScreen" || e.code === "PrintScreen") {
        e.preventDefault();
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText("");
          }
        } catch {
          // ignore clipboard errors
        }
      }

      // 2. Detect Windows Snipping Tool / Mac Screenshot: Win+Shift+S / Cmd+Shift+4 / Ctrl+Shift+S
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        (e.key === "s" || e.key === "S" || e.key === "4" || e.key === "3")
      ) {
        e.preventDefault();
      }

      // 3. Detect DevTools: F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
      if (
        e.key === "F12" ||
        ((e.ctrlKey || e.metaKey) &&
          e.shiftKey &&
          (e.key === "i" || e.key === "I" || e.key === "j" || e.key === "J" || e.key === "c" || e.key === "C"))
      ) {
        e.preventDefault();
      }

      // 4. Detect Save Webpage: Ctrl+S
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
      }

      // 5. Detect Print / PDF Export: Ctrl+P
      if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
      }

      // 6. Detect View Source: Ctrl+U
      if ((e.ctrlKey || e.metaKey) && (e.key === "u" || e.key === "U")) {
        e.preventDefault();
      }
    };

    // Anti-screen recording focus detection (pause/hide when window loses focus to snipping tools)
    const handleWindowBlur = () => {
      setIsWindowBlurred(true);
    };

    const handleWindowFocus = () => {
      setIsWindowBlurred(false);
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("blur", handleWindowBlur);
    window.addEventListener("focus", handleWindowFocus);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("blur", handleWindowBlur);
      window.removeEventListener("focus", handleWindowFocus);
    };
  }, []);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl text-center max-w-md">
          <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-4 text-2xl">
            <i className="fa-solid fa-lock"></i>
          </div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Restricted Student Access</h2>
          <p className="text-sm text-slate-500 mb-6">
            Please log in with your student credentials or demo account to access this course.
          </p>
          <button
            onClick={() => router.push("/login")}
            className="w-full py-3 rounded-xl font-bold text-white shadow-md cursor-pointer"
            style={{ background: "linear-gradient(135deg, #ff5532 0%, #ff7354 100%)" }}
          >
            Go to Student Login
          </button>
        </div>
      </div>
    );
  }

  const currentDate = new Date().toISOString().split("T")[0];

  return (
    <div className="relative select-none" style={{ userSelect: "none", WebkitUserSelect: "none" }}>

      {/* Screen Capture / Blur Shield (when unfocused) */}
      {isWindowBlurred && (
        <div
          onClick={() => setIsWindowBlurred(false)}
          className="fixed inset-0 z-40 backdrop-blur-md bg-slate-950/70 flex flex-col items-center justify-center text-center p-6 cursor-pointer"
        >
          <div className="bg-slate-900 border border-slate-700 p-8 rounded-2xl max-w-md shadow-2xl text-white space-y-4">
            <div className="w-16 h-16 rounded-full bg-orange-500/20 border border-orange-500 text-orange-400 flex items-center justify-center mx-auto text-2xl">
              <i className="fa-solid fa-eye-slash"></i>
            </div>
            <h3 className="text-lg font-bold text-white">DRM Content Shield Active</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Window focus lost. For your security and copyright protection, course media is
              paused while another application or screen tool is active.
            </p>
            <p className="text-xs font-semibold text-orange-400">Click anywhere to resume learning</p>
          </div>
        </div>
      )}

      {/* Dynamic Drifting Watermark (Permanent anti-piracy deterrent) */}
      {showWatermark && (
        <div
          className="pointer-events-none fixed z-30 transition-all duration-1000 ease-in-out opacity-25 select-none"
          style={{
            top: `${watermarkPos.top}%`,
            left: `${watermarkPos.left}%`,
            transform: "translate(-50%, -50%) rotate(-12deg)",
            color: "#64748b",
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.08em",
            textShadow: "0 1px 2px rgba(0,0,0,0.2)",
          }}
        >
          <div>{user.name} ({user.id})</div>
          <div>Netcoder LMS • {currentDate}</div>
        </div>
      )}

      {/* The Protected Course Content */}
      <div onContextMenu={(e) => e.preventDefault()}>{children}</div>
    </div>
  );
}
