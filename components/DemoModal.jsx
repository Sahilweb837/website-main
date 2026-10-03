"use client";

import { useState, useEffect, useRef } from "react";

const ALL_COURSES = [
  "Graphic Designing",
  "Web Designing",
  "UI & UX Design",
  "2D/3D Animation",
  "Motion Graphics",
  "Graphics & Web Designing",
  "Digital Content Creator",
  "Auto CAD",
  "Web Development",
  "Full Stack Development",
  "MERN Stack",
  "MEAN Stack",
  "PHP Training",
  "WordPress",
  "Digital Marketing",
  "Social Media Marketing",
  "SEO Course",
  "Data Science & Business Analytics",
  "Data Science & Machine Learning",
  "Data Analytics",
  "Complete Cyber Security Course",
  "Ethical Hacking",
  "Software Engineering With Python",
  "System Design & Operating Systems",
  "Algorithm & Data Structures In Python",
  "DevOps Course",
  "Full Stack & Apps (Online)",
  "Digital Marketing (Online)",
  "Data Science (Online)",
  "Data Analytics (Online)",
  "Ethical Hacking (Online)"
];

function formatDateLocal(date) {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

function getNextMondayLocal(date) {
  const result = new Date(date);
  result.setDate(result.getDate() + 1);
  return result;
}

export default function DemoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [course, setCourse] = useState("Full Stack Development");
  const [date, setDate] = useState("");
  const [minDate, setMinDate] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [slot, setSlot] = useState("Morning");
  const [isMorningDisabled, setIsMorningDisabled] = useState(false);
  const [warningMsg, setWarningMsg] = useState("");

  // OTP State
  const [otpDigits, setOtpDigits] = useState(["", "", "", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [otpParaText, setOtpParaText] = useState("Verify Captcha To Get OTP");
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const otpInputRefs = useRef([]);

  // Success State
  const [confirmedName, setConfirmedName] = useState("");
  const [confirmedDateFormatted, setConfirmedDateFormatted] = useState("");

  // Date and Slot initialization
  useEffect(() => {
    const today = new Date();
    let initialDate = today;
    if (today.getDay() === 0) {
      initialDate = new Date(today);
      initialDate.setDate(today.getDate() + 1);
    }
    const dateStr = formatDateLocal(initialDate);
    setDate(dateStr);
    setMinDate(dateStr);

    const currentHour = today.getHours();
    if (currentHour >= 12 && initialDate.toDateString() === today.toDateString()) {
      setIsMorningDisabled(true);
      setSlot("Evening");
    }
  }, []);

  // Expose global helper functions & event listeners to match Laravel DemoClass.js
  useEffect(() => {
    window.openBox = (prefCourse) => {
      if (prefCourse && typeof prefCourse === "string") {
        setCourse(prefCourse);
      }
      setWarningMsg("");
      setIsOpen(true);
      return false;
    };

    window.closeForm = () => {
      setIsOpen(false);
      return false;
    };

    window.shiftSlot = (s) => {
      if (s === "Morning" && isMorningDisabled) return;
      setSlot(s);
    };

    window.verify = () => {
      submitInitialForm();
    };

    const handleCustomOpen = (e) => {
      if (e.detail && e.detail.course) {
        setCourse(e.detail.course);
      }
      setIsOpen(true);
    };
    window.addEventListener("open-demo-modal", handleCustomOpen);

    // Global click listener to intercept buttons like onclick="openBox()"
    const handleGlobalClick = (e) => {
      const target = e.target.closest("button, a, div");
      if (!target) return;

      const onclickAttr = target.getAttribute("onclick") || "";
      if (onclickAttr.includes("openBox")) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
        return;
      }

      if (target.dataset && target.dataset.openDemo !== undefined) {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(true);
        return;
      }

      // Check button text
      const text = target.innerText?.trim().toLowerCase() || "";
      if (
        (target.tagName === "BUTTON" || target.classList.contains("color-btn")) &&
        (text === "book demo" ||
          text === "book free demo class" ||
          text === "book your demo class" ||
          text === "register for demo")
      ) {
        if (!target.closest("form") && !target.closest(".book-demo")) {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(true);
        }
      }
    };

    document.addEventListener("click", handleGlobalClick, true);

    return () => {
      window.removeEventListener("open-demo-modal", handleCustomOpen);
      document.removeEventListener("click", handleGlobalClick, true);
    };
  }, [isMorningDisabled]);

  // Date selection change with Sunday blocking
  const handleDateChange = (e) => {
    const val = e.target.value;
    if (!val) return;

    const parts = val.split("-");
    const selected = new Date(parts[0], parts[1] - 1, parts[2]);

    if (selected.getDay() === 0) {
      alert("Sundays are closed. Please select another date.");
      const nextMon = getNextMondayLocal(selected);
      const monStr = formatDateLocal(nextMon);
      setDate(monStr);
      validateSlotForDate(monStr);
    } else {
      setDate(val);
      validateSlotForDate(val);
    }
  };

  const validateSlotForDate = (dateVal) => {
    const today = new Date();
    const todayStr = formatDateLocal(today);
    const currentHour = today.getHours();

    if (dateVal === todayStr && currentHour >= 12) {
      setIsMorningDisabled(true);
      setSlot("Evening");
    } else {
      setIsMorningDisabled(false);
    }
  };

  const shiftSlot = (selectedSlot) => {
    if (selectedSlot === "Morning" && isMorningDisabled) {
      return;
    }
    setSlot(selectedSlot);
  };

  // Form validation matching Laravel
  const validateForm = () => {
    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!nameRegex.test(name.trim())) {
      setWarningMsg("Enter valid name");
      return false;
    }
    if (!emailRegex.test(email.trim())) {
      setWarningMsg("Enter valid email");
      return false;
    }
    if (!phoneRegex.test(number.trim())) {
      setWarningMsg("Enter valid mobile number");
      return false;
    }
    return true;
  };

  const submitInitialForm = () => {
    if (!validateForm()) return;
    setWarningMsg("");

    // Hide book demo & show OTP modal
    setIsOpen(false);
    setIsOtpOpen(true);
    setOtpDigits(["", "", "", "", "", ""]);
    setOtpError("");
    setOtpParaText(`Enter 6-digit code sent to +91 ${number.trim()}`);

    // Try sending SMS via Firebase Phone Auth if configured
    sendOtpViaFirebase(number.trim());

    setTimeout(() => {
      if (otpInputRefs.current[0]) {
        otpInputRefs.current[0].focus();
      }
    }, 150);
  };

  const sendOtpViaFirebase = async (rawPhone) => {
    const phone = rawPhone.replace(/\D/g, "");
    if (typeof window !== "undefined" && window.firebase && window.firebase.auth) {
      try {
        if (!window.recaptchaVerifier) {
          window.recaptchaVerifier = new window.firebase.auth.RecaptchaVerifier(
            "recaptcha-container",
            { size: "invisible" }
          );
        }
        const appVerifier = window.recaptchaVerifier;
        const res = await window.firebase.auth().signInWithPhoneNumber("+91" + phone, appVerifier);
        setConfirmationResult(res);
        setOtpParaText(`✓ OTP Sent to +91 ${phone}`);
      } catch (err) {
        console.warn("Firebase Phone Auth fallback triggered:", err.message);
        // Fallback for local demo simulation
        setOtpParaText(`Code sent to +91 ${phone} (Enter any 6 digits to verify)`);
      }
    } else {
      setOtpParaText(`Code sent to +91 ${phone} (Enter any 6 digits to verify)`);
    }
  };

  const handleOtpDigitChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const nextDigits = [...otpDigits];
    nextDigits[index] = digit;
    setOtpDigits(nextDigits);

    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }

    if (digit && index === 5) {
      const fullCode = nextDigits.join("");
      if (fullCode.length === 6) {
        verifyOtpCode(fullCode);
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (!otpDigits[index] && index > 0) {
        otpInputRefs.current[index - 1]?.focus();
      }
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").trim().replace(/\D/g, "");
    if (pasted.length === 6) {
      const digits = pasted.split("");
      setOtpDigits(digits);
      otpInputRefs.current[5]?.focus();
      verifyOtpCode(pasted);
    }
  };

  const verifyOtpCode = async (codeToVerify) => {
    if (codeToVerify.length !== 6) {
      setOtpError("Enter 6-digit OTP");
      return;
    }

    setIsVerifyingOtp(true);
    setOtpError("");

    if (confirmationResult && confirmationResult.confirm) {
      try {
        await confirmationResult.confirm(codeToVerify);
        onOtpSuccess();
      } catch (err) {
        setIsVerifyingOtp(false);
        setOtpError("Invalid OTP. Please try again.");
      }
    } else {
      // Fallback verification animation
      setTimeout(() => {
        onOtpSuccess();
      }, 1000);
    }
  };

  const onOtpSuccess = () => {
    setIsVerifyingOtp(false);
    setIsOtpOpen(false);

    // Send email via EmailJS (matching Laravel template)
    if (typeof window !== "undefined" && window.emailjs) {
      window.emailjs.send("service_fall03r", "template_lvuwe08", {
        name: name,
        email: email,
        phone: number,
        address: address,
        course: course,
        date: date,
        slot: slot
      }).catch((e) => console.log("EmailJS status:", e));
    }

    // Set success display variables
    setConfirmedName(name || "Student");
    const d = date ? new Date(date) : new Date();
    const formatted = d.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    setConfirmedDateFormatted(formatted);

    setIsSuccessOpen(true);
  };

  const closeForm = () => {
    setIsOpen(false);
  };

  const closeOtp = () => {
    setIsOtpOpen(false);
    setIsVerifyingOtp(false);
  };

  const closeSuccess = () => {
    setIsSuccessOpen(false);
  };

  // Generate 30 colorful confetti pieces
  const confettiPieces = Array.from({ length: 30 }).map((_, i) => {
    const colors = ["#FF5532", "#4CAF50", "#FFD700", "#2196F3", "#FF9800", "#9C27B0", "#00BCD4"];
    const color = colors[i % colors.length];
    const left = `${Math.floor((i * 3.3) % 100)}%`;
    const delay = `${(i * 0.05).toFixed(2)}s`;
    const duration = `${(2 + (i % 3) * 0.5).toFixed(2)}s`;
    return (
      <div
        key={i}
        className="confetti"
        style={{
          left: left,
          background: color,
          animationDelay: delay,
          animationDuration: duration,
          width: `${6 + (i % 5)}px`,
          height: `${6 + (i % 5)}px`
        }}
      />
    );
  });

  return (
    <>
      {/* 1. BOOK DEMO BACKDROP OVERLAY */}
      <div
        className={`book-demo-backdrop ${isOpen ? "active" : ""}`}
        id="bookDemoBackdrop"
        onClick={closeForm}
        aria-hidden="true"
      ></div>

      {/* 2. MAIN BOOK DEMO POPUP */}
      <div
        className={`book-demo ${isOpen ? "active" : ""}`}
        style={{ display: isOpen ? "block" : "none" }}
        role="dialog"
        aria-modal="true"
      >
        <span className="close-btn" onClick={closeForm}>
          &times;
        </span>
        <h2>
          <span>Book Your Demo class</span>
        </h2>
        <form
          action="#"
          onSubmit={(e) => {
            e.preventDefault();
            submitInitialForm();
          }}
        >
          <div className="main-inputs">
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="course">Select Course</label>
              <select
                name="course"
                id="course"
                className="demo-courses"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                {ALL_COURSES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="date">Select Date</label>
              <input
                type="date"
                name="date"
                id="date"
                value={date}
                onChange={handleDateChange}
                min={minDate}
                required
              />
            </div>
            <div>
              <label htmlFor="number">Phone Number</label>
              <input
                type="text"
                name="number"
                id="number"
                placeholder="77788-89999"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="your@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                placeholder="Your full address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </div>

          <div className="book-demo-slot">
            <label>Select Slot</label>
            <div className="book-demo-slot-btn">
              <button
                type="button"
                className={`btn1 ${slot === "Morning" ? "active-btn" : ""}`}
                id="morningBtn"
                disabled={isMorningDisabled}
                onClick={() => shiftSlot("Morning")}
                style={
                  isMorningDisabled
                    ? {
                        opacity: "0.4",
                        cursor: "not-allowed",
                        background: "#ccc",
                        color: "#999",
                        border: "1px solid #ccc"
                      }
                    : {}
                }
              >
                <svg
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.66047 13.5123C11.7878 13.5123 13.5123 11.7878 13.5123 9.66047C13.5123 7.53316 11.7878 5.80863 9.66047 5.80863C7.53315 5.80863 5.80862 7.53316 5.80862 9.66047C5.80862 11.7878 7.53315 13.5123 9.66047 13.5123Z"
                    strokeWidth="1.2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M9.66043 1.3208V3.80876"
                    strokeWidth="1.2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M9.66043 15.5122V18.0002"
                    strokeWidth="1.2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M1.32108 9.66036H3.80885"
                    strokeWidth="1.2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15.512 9.66036H17.9998"
                    strokeWidth="1.2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M3.76312 15.5573L5.52235 13.7983"
                    strokeWidth="1.2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M13.7982 5.52266L15.5574 3.76346"
                    strokeWidth="1.2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M15.5574 15.5573L13.7982 13.7983"
                    strokeWidth="1.2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M5.52235 5.52266L3.76312 3.76346"
                    strokeWidth="1.2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                </svg>
                <span> Morning</span>
              </button>
              <button
                type="button"
                className={`btn2 ${slot === "Evening" ? "active-btn" : ""}`}
                id="eveningBtn"
                onClick={() => shiftSlot("Evening")}
              >
                <svg
                  width="22"
                  height="14"
                  viewBox="0 0 22 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 8C18 4.13487 14.8661 1 11 1C7.13387 1 4 4.13343 4 7.99855"
                    strokeWidth="1.2"
                    strokeMiterlimit="10"
                  />
                  <path
                    d="M1 8H21"
                    strokeWidth="1.2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M4 10.5H18"
                    strokeWidth="1.2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                  <path
                    d="M7.5 13H14.5"
                    strokeWidth="1.2"
                    strokeMiterlimit="10"
                    strokeLinecap="round"
                  />
                </svg>
                <span> Evening</span>
              </button>
            </div>
            <p
              id="slotWarning"
              style={{
                color: "#ff5532",
                fontSize: "13px",
                marginTop: "8px",
                display: isMorningDisabled ? "block" : "none",
                textAlign: "center",
                fontWeight: 600
              }}
            >
              Morning slot is not available after 12 PM for today.
            </p>
          </div>

          {warningMsg && (
            <p
              className="verify_war"
              id="verify_war"
              style={{
                color: "#ff3333",
                textAlign: "center",
                marginTop: "12px",
                fontWeight: 600
              }}
            >
              {warningMsg}
            </p>
          )}

          <div className="book-demo-submit">
            <button type="submit" className="color-btn">
              Submit Your Details
            </button>
          </div>
        </form>
      </div>

      {/* 3. SPLIT-LAYOUT OTP VERIFICATION MODAL */}
      <div
        className="background"
        id="otpModal"
        style={{ display: isOtpOpen ? "block" : "none" }}
      >
        <div className={`otp split-layout ${isVerifyingOtp ? "verifying-state" : ""}`}>
          <button
            type="button"
            className="close-btn"
            id="closeOtpBtn"
            onClick={closeOtp}
          >
            &times;
          </button>
          <div className="otp-left">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/otp-illustration.png"
              alt="OTP Security Illustration"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="otp-right" style={{ position: "relative" }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                verifyOtpCode(otpDigits.join(""));
              }}
            >
              <h3>Verify Mobile Number</h3>
              <div className="otpNumber">
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpInputRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpDigitChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={handleOtpPaste}
                    className={digit ? "filled" : ""}
                  />
                ))}
              </div>
              <div className="error-msg">
                <span className="error-msg-span">{otpError}</span>
              </div>
              <p className="otpPara">{otpParaText}</p>
              <div id="recaptcha-container"></div>
              <button
                type="submit"
                className={`otp-btn-verify ${otpDigits.join("").length === 6 ? "active" : ""}`}
                style={{ display: "block" }}
              >
                Verify OTP &amp; Book Demo
              </button>
            </form>

            {/* In-Panel Verification Loader Overlay */}
            {isVerifyingOtp && (
              <div
                className="otp-verify-overlay"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center"
                }}
              >
                <div className="loader-spinner"></div>
                <p>Verifying Code...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 4. SUCCESS CONFIRMATION MODAL WITH CONFETTI */}
      <div
        className="success-overlay"
        id="successModal"
        style={{ display: isSuccessOpen ? "flex" : "none" }}
      >
        <div className="success-card">
          <div className="accent-bar"></div>
          <span
            className="close-x"
            id="closeSuccessBtn"
            onClick={closeSuccess}
          >
            &times;
          </span>
          <div id="confettiContainer">{confettiPieces}</div>
          <div className="check-circle">
            <span>&#10004;</span>
          </div>
          <h3>Booking Confirmed!</h3>
          <p className="user-greeting">
            Thank you <strong id="successUserName">{confirmedName}</strong>!<br />
            Your information was successfully received by{" "}
            <strong>Netcoder Technology</strong>.
          </p>
          <div className="info-card">
            <div className="info-row">
              <div className="info-icon" style={{ background: "#fff3e0" }}>
                <i className="fa-regular fa-clock" style={{ color: "#ff9800" }}></i>
              </div>
              <div>
                <div className="info-label">Slot</div>
                <div className="info-value" id="successSlotText">
                  {slot === "Morning" ? "Morning Slot (Before 12 PM)" : "Evening Slot"}
                </div>
              </div>
            </div>
            <div className="info-row">
              <div className="info-icon" style={{ background: "#e8f5e9" }}>
                <i
                  className="fa-regular fa-calendar-check"
                  style={{ color: "#4CAF50" }}
                ></i>
              </div>
              <div>
                <div className="info-label">Date</div>
                <div className="info-value" id="successDateText">
                  {confirmedDateFormatted}
                </div>
              </div>
            </div>
            <div className="info-row">
              <div className="info-icon" style={{ background: "#e3f2fd" }}>
                <i
                  className="fa-solid fa-phone-volume"
                  style={{ color: "#2196F3" }}
                ></i>
              </div>
              <div>
                <div className="info-label">What's Next</div>
                <div className="info-value" style={{ fontWeight: 500, color: "#666" }}>
                  Our team will call you shortly
                </div>
              </div>
            </div>
          </div>
          <p className="team-note">You will receive a confirmation on your email &amp; phone.</p>
          <button
            type="button"
            className="ok-btn"
            id="successOkBtn"
            onClick={closeSuccess}
          >
            Got It!
          </button>
        </div>
      </div>

      {/* Global CSS for Animations and Modals */}
      <style jsx global>{`
        /* Book Demo Backdrop */
        .book-demo-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(15, 23, 42, 0.55);
          backdrop-filter: blur(4px);
          z-index: 998;
          display: none;
        }
        .book-demo-backdrop.active {
          display: block;
        }

        /* Success Card & Confetti Animations */
        @keyframes successFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes successCardPop {
          0% { opacity: 0; transform: scale(0.7) translateY(40px); }
          60% { transform: scale(1.03) translateY(-5px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes checkBounce {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.3); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes checkRing {
          0% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0.5); }
          70% { box-shadow: 0 0 0 20px rgba(76, 175, 80, 0); }
          100% { box-shadow: 0 0 0 0 rgba(76, 175, 80, 0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes confettiFall {
          0% { transform: translateY(-10px) rotate(0); opacity: 1; }
          100% { transform: translateY(350px) rotate(720deg); opacity: 0; }
        }

        .success-overlay {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(6px);
          z-index: 99999;
          align-items: center;
          justify-content: center;
          animation: successFadeIn 0.3s ease;
        }
        .success-card {
          background: #ffffff;
          border-radius: 20px;
          padding: 40px 35px 35px;
          max-width: 440px;
          width: 90%;
          text-align: center;
          position: relative;
          overflow: hidden;
          animation: successCardPop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          box-shadow: 0 25px 80px rgba(0, 0, 0, 0.25);
        }
        .success-card .accent-bar {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 5px;
          background: linear-gradient(90deg, #ff5532, #ff7a5c, #4caf50, #66bb6a);
          background-size: 200% 100%;
          animation: shimmer 3s linear infinite;
        }
        .success-card .check-circle {
          width: 90px;
          height: 90px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4caf50, #66bb6a);
          margin: 0 auto 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: checkBounce 0.7s 0.3s cubic-bezier(0.34, 1.56, 0.64, 1) both, checkRing 1.5s 0.8s ease both;
        }
        .success-card .check-circle span {
          font-size: 44px;
          color: #ffffff;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }
        .success-card h3 {
          font-size: 24px;
          font-weight: 700;
          color: #1a1a1a;
          margin: 0 0 6px;
          animation: slideUp 0.5s 0.5s ease both;
        }
        .success-card .user-greeting {
          font-size: 15px;
          color: #666666;
          line-height: 1.7;
          margin: 8px 0 0;
          animation: slideUp 0.5s 0.6s ease both;
        }
        .success-card .user-greeting strong {
          color: #ff5532;
          font-size: 17px;
        }
        .success-card .info-card {
          background: linear-gradient(135deg, #f8f9fa, #ffffff);
          border-radius: 14px;
          padding: 18px 20px;
          margin: 22px 0;
          border: 1px solid #eeeeee;
          text-align: left;
          animation: slideUp 0.5s 0.7s ease both;
        }
        .success-card .info-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 6px 0;
        }
        .success-card .info-row:not(:last-child) {
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 10px;
          margin-bottom: 4px;
        }
        .success-card .info-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          flex-shrink: 0;
        }
        .success-card .info-label {
          font-size: 11px;
          color: #999999;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .success-card .info-value {
          font-size: 14px;
          font-weight: 600;
          color: #333333;
        }
        .success-card .team-note {
          font-size: 12px;
          color: #bbbbbb;
          margin-bottom: 20px;
          animation: slideUp 0.5s 0.8s ease both;
        }
        .success-card .ok-btn {
          display: inline-block;
          padding: 13px 55px;
          border-radius: 10px;
          font-size: 15px;
          font-weight: 700;
          background: linear-gradient(135deg, #ff5532, #ff7a5c);
          border: none;
          color: #ffffff;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(255, 85, 50, 0.35);
          transition: transform 0.2s, box-shadow 0.2s;
          animation: slideUp 0.5s 0.9s ease both;
          letter-spacing: 0.5px;
        }
        .success-card .ok-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 28px rgba(255, 85, 50, 0.45);
        }
        .success-card .close-x {
          position: absolute;
          top: 14px;
          right: 18px;
          font-size: 22px;
          font-weight: bold;
          cursor: pointer;
          color: #cccccc;
          transition: color 0.2s;
          z-index: 2;
        }
        .success-card .close-x:hover {
          color: #ff5532;
        }
        .confetti {
          position: absolute;
          width: 8px;
          height: 8px;
          top: -10px;
          border-radius: 2px;
          animation: confettiFall 2.5s ease-in forwards;
        }
      `}</style>
    </>
  );
}
