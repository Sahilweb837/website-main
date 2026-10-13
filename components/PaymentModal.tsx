"use client";

import { useState } from "react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (paymentDetails: { method: string; transactionId: string }) => void;
  courseTitle: string;
  coursePrice: number;
  courseSlug?: string;
  courseOriginalPrice?: number;
  courseImage?: string;
  courseInstructor?: string;
}

export default function PaymentModal({
  isOpen,
  onClose,
  onSuccess,
  courseTitle,
  coursePrice,
  courseSlug,
  courseOriginalPrice,
  courseImage,
  courseInstructor,
}: PaymentModalProps) {
  const [method, setMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [upiId, setUpiId] = useState("student@oksbi");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [cardExpiry, setCardExpiry] = useState("12/28");
  const [cardCVV, setCardCVV] = useState("888");
  const [cardName, setCardName] = useState("SAHIL SANDHU");
  const [selectedBank, setSelectedBank] = useState("HDFC Bank");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const isFree = Number(coursePrice) === 0;
  const gst = isFree ? 0 : Math.round(coursePrice * 0.18);
  const total = isFree ? 0 : coursePrice + gst;
  const discount = courseOriginalPrice && courseOriginalPrice > coursePrice ? courseOriginalPrice - coursePrice : 0;

  const generateTxnId = () => {
    return `NTC${Date.now().toString(36).toUpperCase()}${Math.random().toString(36).slice(2, 6).toUpperCase()}`;
  };

  const handlePay = () => {
    setError(null);

    if (!isFree) {
      if (method === "upi" && !upiId.includes("@")) {
        setError("Please enter a valid UPI ID (e.g., name@upi)");
        return;
      }
      if (method === "card") {
        if (cardNumber.replace(/\s/g, "").length < 13) {
          setError("Please enter a valid card number");
          return;
        }
        if (!cardExpiry.match(/^\d{2}\s*\/\s*\d{2}$/)) {
          setError("Please enter expiry in MM/YY format");
          return;
        }
        if (cardCVV.length < 3) {
          setError("Please enter a valid CVV");
          return;
        }
      }
      if (method === "netbanking" && !selectedBank) {
        setError("Please select a bank");
        return;
      }
    }

    setIsProcessing(true);
    const txnId = generateTxnId();

    // Persist payment record to localStorage for student & Admin panel
    try {
      if (typeof window !== "undefined") {
        const storedTransactions = JSON.parse(localStorage.getItem("lms_transactions") || "[]");
        const studentUser = JSON.parse(localStorage.getItem("lms_auth_user") || "{}");
        const newTxn = {
          id: txnId,
          orderId: `ORD-${Date.now()}`,
          courseTitle,
          courseSlug: courseSlug || courseTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          amount: total,
          method: isFree ? "free" : method,
          status: "success",
          userName: studentUser.name || "Student",
          userEmail: studentUser.email || "student@netcoder.io",
          timestamp: new Date().toISOString(),
        };
        localStorage.setItem("lms_transactions", JSON.stringify([newTxn, ...storedTransactions]));

        if (courseSlug) {
          const enrolled = JSON.parse(localStorage.getItem("lms_enrolled_courses") || "[]");
          if (!enrolled.includes(courseSlug)) {
            localStorage.setItem("lms_enrolled_courses", JSON.stringify([...enrolled, courseSlug]));
          }
        }
      }
    } catch (e) {
      console.warn("Storage sync:", e);
    }

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);

      // Auto-close after success
      setTimeout(() => {
        onSuccess({ method: isFree ? "free" : method, transactionId: txnId });
        setIsSuccess(false);
      }, 1600);
    }, 1400);
  };

  const formatCardNumber = (val: string) => {
    const digits = val.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
  };

  const methodButtonStyle = (m: string) => ({
    flex: 1,
    padding: "10px 12px",
    borderRadius: "10px",
    border: method === m ? "2px solid #ff5532" : "1.5px solid #e2e8f0",
    background: method === m ? "#fff7f5" : "#fff",
    color: method === m ? "#ff5532" : "#475569",
    fontSize: "12px",
    fontWeight: 700 as const,
    cursor: "pointer" as const,
    fontFamily: "'Space Grotesk', sans-serif",
    display: "flex" as const,
    alignItems: "center" as const,
    justifyContent: "center" as const,
    gap: "6px",
    transition: "all 0.15s",
    boxShadow: method === m ? "0 2px 8px rgba(255,85,50,0.12)" : "none",
  });

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
        if (e.target === e.currentTarget && !isProcessing) onClose();
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "520px",
          background: "#ffffff",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
          border: "1px solid #e5e7eb",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(135deg, #ff5532 0%, #ea4321 100%)",
            padding: "18px 22px",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "10px",
                background: "rgba(255,255,255,0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: "20px" }}>
                payment
              </span>
            </div>
            <div>
              <div style={{ fontSize: "15px", fontWeight: 800 }}>Secure Checkout</div>
              <div style={{ fontSize: "11px", opacity: 0.85, fontFamily: "'Sora', sans-serif" }}>
                256-bit SSL Encrypted Payment
              </div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={isProcessing}
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "none",
              color: "#fff",
              width: "30px",
              height: "30px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: "20px 22px", maxHeight: "70vh", overflowY: "auto" }}>
          {/* Success State */}
          {isSuccess ? (
            <div style={{ textAlign: "center", padding: "30px 0" }}>
              <div
                style={{
                  width: "72px",
                  height: "72px",
                  borderRadius: "50%",
                  background: "#10b981",
                  margin: "0 auto 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 30px rgba(16,185,129,0.4)",
                  animation: "pulse 1s ease-in-out infinite",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "40px", color: "#fff" }}>
                  check_circle
                </span>
              </div>
              <h3 style={{ margin: "0 0 6px", fontSize: "20px", fontWeight: 800, color: "#0f172a" }}>
                Payment Successful! 🎉
              </h3>
              <p style={{ margin: 0, fontSize: "13px", color: "#64748b", fontFamily: "'Sora', sans-serif" }}>
                You are now enrolled in <strong>{courseTitle}</strong>
              </p>
              <div
                style={{
                  marginTop: "14px",
                  padding: "10px 16px",
                  background: "#f0fdf4",
                  border: "1px solid #a7f3d0",
                  borderRadius: "10px",
                  fontSize: "12px",
                  color: "#166534",
                  display: "inline-block",
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: "14px", verticalAlign: "middle", marginRight: "4px" }}>
                  receipt_long
                </span>
                Redirecting to your course…
              </div>
            </div>
          ) : (
            <>
              {/* Course Summary */}
              <div
                style={{
                  display: "flex",
                  gap: "12px",
                  padding: "12px",
                  background: "#f8fafc",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  marginBottom: "18px",
                }}
              >
                {courseImage && (
                  <img
                    src={courseImage}
                    alt={courseTitle}
                    style={{ width: "56px", height: "56px", borderRadius: "10px", objectFit: "cover" }}
                  />
                )}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: 750,
                      color: "#0f172a",
                      lineHeight: 1.3,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {courseTitle}
                  </div>
                  {courseInstructor && (
                    <div style={{ fontSize: "11px", color: "#64748b", marginTop: "3px", fontFamily: "'Sora', sans-serif" }}>
                      By {courseInstructor}
                    </div>
                  )}
                </div>
              </div>

              {/* Price Breakdown */}
              <div
                style={{
                  padding: "14px",
                  background: "#fffbeb",
                  borderRadius: "12px",
                  border: "1px solid #fde68a",
                  marginBottom: "18px",
                  fontSize: "12.5px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", color: "#78716c" }}>
                  <span>Course Price</span>
                  <span>₹{coursePrice.toLocaleString("en-IN")}</span>
                </div>
                {discount > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", color: "#16a34a" }}>
                    <span>Discount</span>
                    <span>-₹{discount.toLocaleString("en-IN")}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px", color: "#78716c" }}>
                  <span>GST (18%)</span>
                  <span>₹{gst.toLocaleString("en-IN")}</span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: "8px",
                    borderTop: "1px dashed #fde68a",
                    fontWeight: 800,
                    fontSize: "15px",
                    color: "#0f172a",
                  }}
                >
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div style={{ marginBottom: "16px" }}>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#0f172a", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                  Payment Method
                </div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button type="button" onClick={() => setMethod("upi")} style={methodButtonStyle("upi")}>
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>account_balance</span>
                    UPI
                  </button>
                  <button type="button" onClick={() => setMethod("card")} style={methodButtonStyle("card")}>
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>credit_card</span>
                    Card
                  </button>
                  <button type="button" onClick={() => setMethod("netbanking")} style={methodButtonStyle("netbanking")}>
                    <span className="material-symbols-outlined" style={{ fontSize: "16px" }}>account_balance_wallet</span>
                    Net Banking
                  </button>
                </div>
              </div>

              {/* UPI Form */}
              {method === "upi" && (
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#111", marginBottom: "6px" }}>
                    UPI ID
                  </label>
                  <input
                    type="text"
                    placeholder="yourname@upi"
                    value={upiId}
                    onChange={(e) => { setUpiId(e.target.value); setError(null); }}
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
                  <div style={{ display: "flex", gap: "6px", marginTop: "8px", flexWrap: "wrap" }}>
                    {["@ybl", "@paytm", "@oksbi", "@okicici", "@axl"].map((suffix) => (
                      <button
                        key={suffix}
                        type="button"
                        onClick={() => { setUpiId((prev) => prev.split("@")[0] + suffix); setError(null); }}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "6px",
                          border: "1px solid #e2e8f0",
                          background: "#f8fafc",
                          color: "#475569",
                          fontSize: "11px",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        {suffix}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Card Form */}
              {method === "card" && (
                <div style={{ marginBottom: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#111", marginBottom: "6px" }}>
                      Card Number
                    </label>
                    <input
                      type="text"
                      placeholder="4242 4242 4242 4242"
                      value={cardNumber}
                      onChange={(e) => { setCardNumber(formatCardNumber(e.target.value)); setError(null); }}
                      maxLength={19}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "10px",
                        border: "1px solid #d1d5db",
                        fontSize: "14px",
                        outline: "none",
                        boxSizing: "border-box",
                        fontFamily: "'Space Grotesk', monospace",
                        letterSpacing: "0.05em",
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#111", marginBottom: "6px" }}>
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      placeholder="SAHIL SANDHU"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value.toUpperCase())}
                      style={{
                        width: "100%",
                        padding: "11px 14px",
                        borderRadius: "10px",
                        border: "1px solid #d1d5db",
                        fontSize: "13px",
                        outline: "none",
                        boxSizing: "border-box",
                        fontFamily: "'Sora', sans-serif",
                        textTransform: "uppercase",
                      }}
                    />
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#111", marginBottom: "6px" }}>
                        Expiry (MM/YY)
                      </label>
                      <input
                        type="text"
                        placeholder="12/28"
                        value={cardExpiry}
                        onChange={(e) => { setCardExpiry(e.target.value); setError(null); }}
                        maxLength={5}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "10px",
                          border: "1px solid #d1d5db",
                          fontSize: "13px",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#111", marginBottom: "6px" }}>
                        CVV
                      </label>
                      <input
                        type="password"
                        placeholder="•••"
                        value={cardCVV}
                        onChange={(e) => { setCardCVV(e.target.value.replace(/\D/g, "").slice(0, 4)); setError(null); }}
                        maxLength={4}
                        style={{
                          width: "100%",
                          padding: "11px 14px",
                          borderRadius: "10px",
                          border: "1px solid #d1d5db",
                          fontSize: "13px",
                          outline: "none",
                          boxSizing: "border-box",
                        }}
                      />
                    </div>
                  </div>
                  {/* Quick fill demo card */}
                  <button
                    type="button"
                    onClick={() => {
                      setCardNumber("4242 4242 4242 4242");
                      setCardName("SAHIL SANDHU");
                      setCardExpiry("12/28");
                      setCardCVV("123");
                      setError(null);
                    }}
                    style={{
                      padding: "6px 12px",
                      borderRadius: "8px",
                      border: "1px solid #fed7aa",
                      background: "#fffaf0",
                      color: "#c2410c",
                      fontSize: "11px",
                      fontWeight: 700,
                      cursor: "pointer",
                      alignSelf: "flex-start",
                    }}
                  >
                    ⚡ Fill Demo Card
                  </button>
                </div>
              )}

              {/* Net Banking */}
              {method === "netbanking" && (
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", fontSize: "12px", fontWeight: 700, color: "#111", marginBottom: "8px" }}>
                    Select Bank
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                    {["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Bank", "Punjab National Bank"].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => { setSelectedBank(bank); setError(null); }}
                        style={{
                          padding: "10px 12px",
                          borderRadius: "10px",
                          border: selectedBank === bank ? "2px solid #ff5532" : "1.5px solid #e2e8f0",
                          background: selectedBank === bank ? "#fff7f5" : "#fff",
                          color: selectedBank === bank ? "#ff5532" : "#334155",
                          fontSize: "12px",
                          fontWeight: 650,
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "all 0.15s",
                        }}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Error */}
              {error && (
                <div
                  style={{
                    padding: "9px 14px",
                    borderRadius: "10px",
                    background: "#fef2f2",
                    border: "1px solid #fecaca",
                    color: "#b91c1c",
                    fontSize: "12px",
                    marginBottom: "14px",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: "15px" }}>error</span>
                  {error}
                </div>
              )}

              {/* Pay Button */}
              <button
                type="button"
                onClick={handlePay}
                disabled={isProcessing}
                style={{
                  width: "100%",
                  padding: "14px 24px",
                  borderRadius: "12px",
                  border: "none",
                  background: isProcessing ? "#ea4321" : "linear-gradient(135deg, #ff5532 0%, #ea4321 100%)",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: 800,
                  cursor: isProcessing ? "not-allowed" : "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 8px 24px rgba(255,85,50,0.35)",
                  transition: "all 0.2s",
                  opacity: isProcessing ? 0.85 : 1,
                }}
              >
                {isProcessing ? (
                  <>
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: "18px", animation: "spin 1s linear infinite" }}
                    >
                      progress_activity
                    </span>
                    Processing Payment…
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined" style={{ fontSize: "18px" }}>lock</span>
                    Pay ₹{total.toLocaleString("en-IN")} Securely
                  </>
                )}
              </button>

              {/* Security Badges */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                  marginTop: "14px",
                  fontSize: "10px",
                  color: "#9ca3af",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "13px", color: "#10b981" }}>verified_user</span>
                  PCI DSS Compliant
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "13px", color: "#ff5532" }}>lock</span>
                  256-bit SSL
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                  <span className="material-symbols-outlined" style={{ fontSize: "13px", color: "#6366f1" }}>shield</span>
                  Razorpay Secure
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.7} }
      `}</style>
    </div>
  );
}
