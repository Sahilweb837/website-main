"use client";

import { useEffect, useRef, useState } from "react";

interface FaceScanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (studentName: string) => void;
}

export default function FaceScanModal({ isOpen, onClose, onSuccess }: FaceScanModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing optical neural sensor…");
  const [isVerified, setIsVerified] = useState(false);
  const [studentName, setStudentName] = useState("Sahil Sandhu");

  // Play a soft high-tech synth chime using Web Audio API when verified
  const playChime = () => {
    try {
      if (typeof window === "undefined") return;
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.35);
    } catch {
      // Audio context may be restricted by browser policy, ignore safely
    }
  };

  useEffect(() => {
    if (!isOpen) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      setProgress(0);
      setIsVerified(false);
      return;
    }

    // Try camera
    let isCancelled = false;
    async function startCamera() {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "user", width: { ideal: 640 }, height: { ideal: 480 } },
          });
          if (isCancelled) {
            stream.getTracks().forEach((t) => t.stop());
            return;
          }
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.play().catch(() => {});
          }
          setHasCamera(true);
        } else {
          setHasCamera(false);
        }
      } catch {
        setHasCamera(false);
      }
    }

    startCamera();

    // Biometric scanning sequence simulation
    let p = 0;
    const interval = setInterval(() => {
      p += 3;
      if (p > 100) p = 100;
      setProgress(p);

      if (p < 25) {
        setStatusText("Aligning face frame & optical landmark vectors…");
      } else if (p < 55) {
        setStatusText("Extracting 68-point 3D facial mesh geometry…");
      } else if (p < 85) {
        setStatusText("Matching 512-dim biometric embedding with student registry…");
      } else if (p >= 100) {
        clearInterval(interval);
        setStatusText("Biometric Verified: Student Identity Confirmed!");
        setIsVerified(true);
        playChime();
        setTimeout(() => {
          onSuccess(studentName);
        }, 800);
      }
    }, 55);

    return () => {
      isCancelled = true;
      clearInterval(interval);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
    };
  }, [isOpen, onSuccess, studentName]);

  if (!isOpen) return null;

  const handleInstantVerify = () => {
    setIsVerified(true);
    setStatusText("Instant Biometric Token Verified!");
    playChime();
    setTimeout(() => {
      onSuccess(studentName);
    }, 400);
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(10, 15, 29, 0.82)",
        backdropFilter: "blur(14px)",
        padding: "16px",
        fontFamily: "'Space Grotesk', sans-serif",
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "460px",
          background: "#111827",
          border: "1.5px solid rgba(255, 85, 50, 0.4)",
          borderRadius: "24px",
          padding: "24px",
          boxShadow: "0 25px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 85, 50, 0.25)",
          color: "#ffffff",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow ambient background elements */}
        <div
          style={{
            position: "absolute",
            top: "-40px",
            right: "-40px",
            width: "160px",
            height: "160px",
            background: "rgba(255, 85, 50, 0.25)",
            filter: "blur(50px)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-40px",
            left: "-40px",
            width: "160px",
            height: "160px",
            background: "rgba(16, 185, 129, 0.25)",
            filter: "blur(50px)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}
        />

        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "18px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "linear-gradient(135deg, #ff5532 0%, #ea4321 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(255,85,50,0.4)",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "20px", color: "#fff" }}>
                face
              </span>
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 800, color: "#fff", letterSpacing: "-0.01em" }}>
                AI Face ID Authentication
              </div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", fontFamily: "'Sora', sans-serif" }}>
                Neural Biometric Verification
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#9ca3af",
              width: "32px",
              height: "32px",
              borderRadius: "10px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
            }}
          >
            ✕
          </button>
        </div>

        {/* Center Scanner Window */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "260px",
            background: "#030712",
            borderRadius: "18px",
            overflow: "hidden",
            border: isVerified ? "2px solid #10b981" : "2px solid rgba(255, 85, 50, 0.45)",
            boxShadow: isVerified
              ? "0 0 30px rgba(16, 185, 129, 0.35)"
              : "0 0 30px rgba(255, 85, 50, 0.25)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "18px",
            transition: "border 0.3s, box-shadow 0.3s",
          }}
        >
          {/* Live Camera Video */}
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              transform: "scaleX(-1)",
              opacity: hasCamera ? 0.9 : 0,
              transition: "opacity 0.4s",
            }}
          />

          {/* Fallback Animated 3D Holographic Face Mesh if camera not allowed */}
          {hasCamera === false && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                color: "#ff5532",
                textAlign: "center",
                zIndex: 2,
              }}
            >
              <div
                style={{
                  width: "110px",
                  height: "110px",
                  borderRadius: "50%",
                  border: "2px dashed #ff5532",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "radial-gradient(circle, rgba(255,85,50,0.15) 0%, transparent 70%)",
                  animation: "spin 12s linear infinite",
                  position: "relative",
                }}
              >
                <span
                  className="material-symbols-outlined"
                  style={{
                    fontSize: "58px",
                    color: isVerified ? "#10b981" : "#ff5532",
                    animation: "pulse 1.8s ease-in-out infinite",
                  }}
                >
                  face
                </span>
              </div>
              <div
                style={{
                  fontSize: "11px",
                  color: "#9ca3af",
                  marginTop: "12px",
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Simulated AI Biometric Stream Active
              </div>
            </div>
          )}

          {/* Sci-Fi HUD Crosshairs & Brackets */}
          <div
            style={{
              position: "absolute",
              inset: "20px",
              pointerEvents: "none",
              zIndex: 10,
            }}
          >
            {/* Top Left Corner */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "22px",
                height: "22px",
                borderTop: "3px solid #ff5532",
                borderLeft: "3px solid #ff5532",
              }}
            />
            {/* Top Right Corner */}
            <div
              style={{
                position: "absolute",
                top: 0,
                right: 0,
                width: "22px",
                height: "22px",
                borderTop: "3px solid #ff5532",
                borderRight: "3px solid #ff5532",
              }}
            />
            {/* Bottom Left Corner */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                width: "22px",
                height: "22px",
                borderBottom: "3px solid #ff5532",
                borderLeft: "3px solid #ff5532",
              }}
            />
            {/* Bottom Right Corner */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "22px",
                height: "22px",
                borderBottom: "3px solid #ff5532",
                borderRight: "3px solid #ff5532",
              }}
            />

            {/* Telemetry badges */}
            <div
              style={{
                position: "absolute",
                top: "6px",
                left: "6px",
                fontSize: "10px",
                fontWeight: 700,
                color: "#10b981",
                background: "rgba(0,0,0,0.65)",
                padding: "2px 6px",
                borderRadius: "4px",
                letterSpacing: "0.06em",
              }}
            >
              FPS: 60 • LIVE
            </div>
            <div
              style={{
                position: "absolute",
                top: "6px",
                right: "6px",
                fontSize: "10px",
                fontWeight: 700,
                color: "#ff5532",
                background: "rgba(0,0,0,0.65)",
                padding: "2px 6px",
                borderRadius: "4px",
                letterSpacing: "0.06em",
              }}
            >
              MATCH: {Math.min(99.4, 60 + progress * 0.39).toFixed(1)}%
            </div>
            <div
              style={{
                position: "absolute",
                bottom: "6px",
                left: "6px",
                fontSize: "9px",
                color: "rgba(255,255,255,0.7)",
                background: "rgba(0,0,0,0.65)",
                padding: "2px 6px",
                borderRadius: "4px",
              }}
            >
              ENC: SHA-512-BIO
            </div>
          </div>

          {/* Sweeping Laser Scan Line */}
          {!isVerified && (
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: "3px",
                background: "linear-gradient(90deg, transparent, #ff5532, #ff8a5c, transparent)",
                boxShadow: "0 0 16px #ff5532, 0 0 8px #ff8a5c",
                zIndex: 12,
                animation: "laserScan 2.4s ease-in-out infinite",
              }}
            />
          )}

          {/* Verified Overlay */}
          {isVerified && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(16, 185, 129, 0.2)",
                zIndex: 20,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "8px",
                backdropFilter: "blur(2px)",
              }}
            >
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  borderRadius: "50%",
                  background: "#10b981",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 24px rgba(16,185,129,0.7)",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "36px", color: "#fff" }}>
                  check
                </span>
              </div>
              <div style={{ fontSize: "14px", fontWeight: 800, color: "#fff" }}>Verified: {studentName}</div>
              <div style={{ fontSize: "11px", color: "rgba(255,255,255,0.85)" }}>Redirecting to LMS workspace…</div>
            </div>
          )}
        </div>

        {/* Progress bar */}
        <div style={{ marginBottom: "12px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "11px",
              marginBottom: "6px",
              color: "#9ca3af",
            }}
          >
            <span>{statusText}</span>
            <span style={{ fontWeight: 800, color: isVerified ? "#10b981" : "#ff5532" }}>{progress}%</span>
          </div>
          <div
            style={{
              width: "100%",
              height: "6px",
              background: "rgba(255,255,255,0.1)",
              borderRadius: "999px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                width: `${progress}%`,
                height: "100%",
                background: isVerified
                  ? "linear-gradient(90deg, #10b981, #34d399)"
                  : "linear-gradient(90deg, #ff5532, #f59e0b)",
                transition: "width 0.1s linear",
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
          <button
            type="button"
            onClick={handleInstantVerify}
            style={{
              flex: 1,
              padding: "12px 16px",
              borderRadius: "12px",
              border: "none",
              background: "linear-gradient(135deg, #ff5532 0%, #ea4321 100%)",
              color: "#ffffff",
              fontSize: "13px",
              fontWeight: 700,
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(255,85,50,0.35)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "6px",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>
              bolt
            </span>
            Instant Verify & Enter
          </button>

          <button
            type="button"
            onClick={onClose}
            style={{
              padding: "12px 18px",
              borderRadius: "12px",
              border: "1px solid rgba(255,255,255,0.18)",
              background: "rgba(255,255,255,0.06)",
              color: "#d1d5db",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              fontFamily: "'Space Grotesk', sans-serif",
            }}
          >
            Cancel
          </button>
        </div>

        <style>{`
          @keyframes laserScan {
            0% { top: 10%; opacity: 0.8; }
            50% { top: 90%; opacity: 1; }
            100% { top: 10%; opacity: 0.8; }
          }
        `}</style>
      </div>
    </div>
  );
}
