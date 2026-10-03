"use client";

import { useState } from "react";

export default function FeedbackForm() {
  const [formData, setFormData] = useState({
    student_name: "",
    contact_number: "",
    email: "",
    course: "B.Tech Computer Science",
    semester: "4th Semester",
    heard_about: "College Seminar",
    overall_assessment: "Very Satisfied",
    seminar_length: "Satisfied",
    recommend: "Very Likely",
    team_experience: "Excellent",
    session_interest: "Excellent",
    suggestions: "",
    interested_courses: []
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const courseOptions = [
    "Full-Stack Web Development",
    "Data Science AI & ML",
    "Cyber Security & Ethical Hacking",
    "UI/UX Designing",
    "Digital Marketing & SEO",
    "Python Software Engineering",
    "Cloud & DevOps"
  ];

  const handleCheckboxChange = (courseName) => {
    setFormData(prev => {
      const exists = prev.interested_courses.includes(courseName);
      return {
        ...prev,
        interested_courses: exists
          ? prev.interested_courses.filter(c => c !== courseName)
          : [...prev.interested_courses, courseName]
      };
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.error("Feedback submit error:", err);
    }

    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ background: "#ecfdf5", border: "1px solid #a7f3d0", padding: "40px", borderRadius: "20px", textAlign: "center", maxWidth: "600px", margin: "40px auto" }}>
        <div style={{ fontSize: "50px", marginBottom: "15px" }}>🎉</div>
        <h2 style={{ color: "#065f46", fontSize: "1.8rem", marginBottom: "10px" }}>Feedback Received!</h2>
        <p style={{ color: "#047857", fontSize: "1rem", lineHeight: 1.6, marginBottom: "25px" }}>
          Thank you, <strong>{formData.student_name}</strong>! Your valuable assessment has been saved. We look forward to seeing you at Netcoder Technology.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="color-btn"
          style={{ padding: "10px 26px", borderRadius: "20px", border: "none", cursor: "pointer" }}
        >
          Submit Another Response
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ background: "#ffffff", padding: "35px", borderRadius: "20px", border: "1px solid #e2e8f0", boxShadow: "0 10px 40px rgba(0,0,0,0.05)" }}>
      <h3 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", marginBottom: "20px" }}>
        Seminar / Workshop Evaluation
      </h3>

      {/* BASIC DETAILS */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "20px" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Full Name *</label>
          <input
            type="text"
            name="student_name"
            value={formData.student_name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1" }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Contact Number *</label>
          <input
            type="tel"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            placeholder="10-digit Phone Number"
            required
            style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1" }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@gmail.com"
            style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1" }}
          />
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "25px" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>College Course / Degree *</label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={handleChange}
            placeholder="e.g. BCA, B.Tech, MCA"
            required
            style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1" }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Current Semester *</label>
          <input
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            placeholder="e.g. 2nd, 4th, 6th"
            required
            style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1" }}
          />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>How Did You Hear About Us?</label>
          <select
            name="heard_about"
            value={formData.heard_about}
            onChange={handleChange}
            style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1" }}
          >
            <option value="College Seminar">College Seminar</option>
            <option value="Social Media">Social Media</option>
            <option value="Friends / Senior">Friends / Senior</option>
            <option value="Website">Website</option>
            <option value="Poster / Banner">Poster / Banner</option>
          </select>
        </div>
      </div>

      {/* RATINGS GRID */}
      <div style={{ background: "#f8fafc", padding: "20px", borderRadius: "14px", border: "1px solid #e2e8f0", marginBottom: "25px" }}>
        <h4 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", marginBottom: "15px" }}>Ratings &amp; Experience</h4>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "15px" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#475569", marginBottom: "4px" }}>Overall Experience</label>
            <select name="overall_assessment" value={formData.overall_assessment} onChange={handleChange} style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
              <option value="Very Satisfied">Very Satisfied ⭐⭐⭐⭐⭐</option>
              <option value="Satisfied">Satisfied ⭐⭐⭐⭐</option>
              <option value="Neutral">Neutral ⭐⭐⭐</option>
              <option value="Dissatisfied">Dissatisfied ⭐</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#475569", marginBottom: "4px" }}>Speaker &amp; Team Experience</label>
            <select name="team_experience" value={formData.team_experience} onChange={handleChange} style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Average">Average</option>
              <option value="Poor">Poor</option>
            </select>
          </div>

          <div>
            <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 600, color: "#475569", marginBottom: "4px" }}>Would You Recommend?</label>
            <select name="recommend" value={formData.recommend} onChange={handleChange} style={{ width: "100%", padding: "8px 10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}>
              <option value="Very Likely">Very Likely</option>
              <option value="Likely">Likely</option>
              <option value="Neutral">Neutral</option>
              <option value="Unlikely">Unlikely</option>
            </select>
          </div>
        </div>
      </div>

      {/* INTERESTED COURSES CHECKBOXES */}
      <div style={{ marginBottom: "25px" }}>
        <label style={{ display: "block", fontSize: "0.95rem", fontWeight: 700, color: "#0f172a", marginBottom: "10px" }}>
          Which courses are you interested in pursuing?
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "10px" }}>
          {courseOptions.map((cName) => (
            <label key={cName} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "0.9rem", color: "#334155", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={formData.interested_courses.includes(cName)}
                onChange={() => handleCheckboxChange(cName)}
                style={{ accentColor: "#ff5532", width: "16px", height: "16px" }}
              />
              {cName}
            </label>
          ))}
        </div>
      </div>

      {/* SUGGESTIONS */}
      <div style={{ marginBottom: "25px" }}>
        <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, color: "#334155", marginBottom: "6px" }}>Any Suggestions or Topics You Want Next?</label>
        <textarea
          name="suggestions"
          rows={3}
          value={formData.suggestions}
          onChange={handleChange}
          placeholder="Share your thoughts..."
          style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1" }}
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="color-btn"
        style={{
          width: "100%",
          padding: "14px",
          borderRadius: "12px",
          border: "none",
          fontWeight: 700,
          fontSize: "1rem",
          cursor: submitting ? "not-allowed" : "pointer",
          boxShadow: "0 6px 20px rgba(255, 85, 50, 0.3)"
        }}
      >
        {submitting ? "Submitting Assessment..." : "Submit Seminar Feedback"}
      </button>
    </form>
  );
}
