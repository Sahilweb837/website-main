"use client";

import { useState } from "react";

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string;
}

export default function ForgotPasswordModal({
  isOpen,
  onClose,
  defaultEmail = "",
}: ForgotPasswordModalProps) {
  const [email, setEmail] = useState(defaultEmail);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2500);
    }, 700);
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
        background: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(8px)",
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
          maxWidth: "420px",
          background: "#ffffff",
          borderRadius: "20px",
          padding: "24px",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
          border: "1px solid #e5e7eb",
          position: "relative",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(255, 85, 50, 0.1)",
                color: "#ff5532",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                lock_reset
              </span>
            </div>
            <div>
              <h3 style={{ margin: 0, fontSize: "16px", fontWeight: 800, color: "#111111" }}>
                Reset Password
              </h3>
              <p style={{ margin: 0, fontSize: "11px", color: "#6b7280", fontFamily: "'Sora', sans-serif" }}>
                Recover your Netcoder account access
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: "#f3f4f6",
              border: "none",
              color: "#6b7280",
              width: "28px",
              height: "28px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {isSuccess ? (
          <div
            style={{
              padding: "18px",
              borderRadius: "12px",
              background: "#f0fdf4",
              border: "1px solid #86efac",
              textAlign: "center",
              color: "#166534",
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: "36px", color: "#16a34a" }}>
              check_circle
            </span>
            <div style={{ fontWeight: 700, fontSize: "14px", marginTop: "6px" }}>Reset Link Sent!</div>
            <div style={{ fontSize: "12px", color: "#15803d", marginTop: "4px", fontFamily: "'Sora', sans-serif" }}>
              Check <strong>{email}</strong> for instructions to reset your password.
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <p style={{ margin: 0, fontSize: "13px", color: "#4b5563", lineHeight: 1.5, fontFamily: "'Sora', sans-serif" }}>
              Enter the email address associated with your student or workspace account. We'll send you a secure verification link.
            </p>

            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "12px",
                  fontWeight: 700,
                  color: "#111",
                  marginBottom: "6px",
                }}
              >
                Registered Email
              </label>
              <input
                type="email"
                required
                placeholder="student@netcoder.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 14px",
                  borderRadius: "10px",
                  border: "1px solid #d1d5db",
                  fontSize: "13px",
                  outline: "none",
                  boxSizing: "border-box",
                  fontFamily: "'Sora', sans-serif",
                }}
              />
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  flex: 1,
                  padding: "11px",
                  borderRadius: "10px",
                  border: "none",
                  background: "#ff5532",
                  color: "#fff",
                  fontSize: "13px",
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                {isSubmitting ? "Sending Link…" : "Send Reset Link"}
              </button>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: "11px 16px",
                  borderRadius: "10px",
                  border: "1px solid #e5e7eb",
                  background: "#f9fafb",
                  color: "#4b5563",
                  fontSize: "13px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
