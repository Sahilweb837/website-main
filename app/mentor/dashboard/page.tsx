"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Video, FileText, CheckSquare, GraduationCap, Plus,
  Trash2, ExternalLink, Play, Clock, Sparkles, LogOut,
  Calendar, Layers, CheckCircle2, AlertCircle, Copy, Check,
  BookOpen, Users, Award, Radio, RefreshCw
} from "lucide-react";
import {
  INITIAL_MENTORS, INITIAL_CLASSES, INITIAL_NOTES,
  INITIAL_TASKS, INITIAL_TESTS, calculateAutomatedClassStatus,
  type LiveClass, type MentorNote, type MentorTask, type MentorTest, type MentorProfile
} from "@/data/lms-mentor-data";
import { LMS_COURSES } from "@/data/lms-courses";
import { api } from "@/lib/api";

export default function MentorDashboardPage() {
  const router = useRouter();

  // Active mentor
  const [mentor, setMentor] = useState<MentorProfile>(INITIAL_MENTORS[0]);
  const [activeTab, setActiveTab] = useState<"classes" | "notes" | "tasks" | "tests" | "students">("classes");

  // Data states
  const [classesList, setClassesList] = useState<LiveClass[]>(INITIAL_CLASSES);
  const [notesList, setNotesList] = useState<MentorNote[]>(INITIAL_NOTES);
  const [tasksList, setTasksList] = useState<MentorTask[]>(INITIAL_TASKS);
  const [testsList, setTestsList] = useState<MentorTest[]>(INITIAL_TESTS);

  // Modals
  const [showClassModal, setShowClassModal] = useState(false);
  const [showNoteModal, setShowNoteModal] = useState(false);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);

  // Form states
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [newClass, setNewClass] = useState({
    courseSlug: "fullstack-web-development",
    title: "",
    date: new Date().toISOString().split("T")[0],
    startTime: "18:30",
    endTime: "20:00",
    time: "06:30 PM - 08:00 PM IST",
    platform: "Google Meet" as "Google Meet" | "Zoom" | "Microsoft Teams" | "YouTube Live",
    meetingLink: "https://meet.google.com/net-fsdev-live",
    meetingId: "net-fsdev-live",
    passcode: "NET2026",
    batch: "Cohort 14 (Batch 2026-A)",
    agenda: "Hands-on coding, live architecture breakdown & doubt solving",
    isAutomatedDaily: true,
  });

  const [newNote, setNewNote] = useState({
    courseSlug: "fullstack-web-development",
    title: "",
    topic: "",
    module: "Module 4: React & Architecture",
    fileUrl: "https://netcoder.in/downloads/handbook.pdf",
    fileType: "pdf" as "pdf" | "doc" | "code" | "slides",
    fileSize: "4.5 MB",
    contentSnippet: "",
  });

  const [newTask, setNewTask] = useState({
    courseSlug: "fullstack-web-development",
    title: "",
    description: "",
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
    points: 100,
    starterRepo: "https://github.com/netcoder-tech/starter-repo",
    submissionType: "github" as "github" | "zip" | "url",
  });

  const [newTest, setNewTest] = useState({
    courseSlug: "fullstack-web-development",
    title: "",
    duration: "45 mins",
    totalQuestions: 25,
    totalMarks: 50,
    passingScore: 35,
    scheduledDate: new Date(Date.now() + 3 * 86400000).toISOString().split("T")[0],
  });

  // Verify mentor auth
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("mentor_auth");
      if (!isAuth) {
        router.push("/mentor/login");
        return;
      }
      const rawUser = localStorage.getItem("mentor_user");
      if (rawUser) {
        try {
          const parsed = JSON.parse(rawUser);
          if (parsed && parsed.name) setMentor(parsed);
        } catch (e) {
          console.warn("Parse user error", e);
        }
      }
    }

    // Load data from live API or fallback
    let isMounted = true;
    async function loadMentorData() {
      try {
        const [clsRes, notesRes, tasksRes] = await Promise.allSettled([
          api.getLiveClasses(),
          api.getNotes(),
          api.getTasks(),
        ]);

        if (isMounted) {
          if (clsRes.status === "fulfilled" && clsRes.value?.data && clsRes.value.data.length > 0) {
            setClassesList(clsRes.value.data);
          }
          if (notesRes.status === "fulfilled" && notesRes.value?.data && notesRes.value.data.length > 0) {
            setNotesList(notesRes.value.data);
          }
          if (tasksRes.status === "fulfilled" && tasksRes.value?.data && tasksRes.value.data.length > 0) {
            setTasksList(tasksRes.value.data);
          }
        }
      } catch (err) {
        console.warn("Live API fallback:", err);
      }
    }
    loadMentorData();
    return () => {
      isMounted = false;
    };
  }, [router]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("mentor_auth");
      localStorage.removeItem("mentor_user");
    }
    router.push("/mentor/login");
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  // Add Live Class handler
  const handleCreateClass = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClass.title.trim() || !newClass.meetingLink.trim()) {
      alert("Please fill in the class topic and live meeting link.");
      return;
    }

    const courseMatch = LMS_COURSES.find((c) => c.slug === newClass.courseSlug);
    const createdClass: LiveClass = {
      id: `cls-${Date.now()}`,
      courseSlug: newClass.courseSlug,
      courseTitle: courseMatch?.title || newClass.courseSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      title: newClass.title,
      mentorName: mentor.name,
      mentorEmail: mentor.email,
      mentorAvatar: mentor.avatar,
      date: newClass.date,
      startTime: newClass.startTime,
      endTime: newClass.endTime,
      time: newClass.time || `${newClass.startTime} - ${newClass.endTime} IST`,
      platform: newClass.platform,
      meetingLink: newClass.meetingLink,
      meetingId: newClass.meetingId || "net-room",
      passcode: newClass.passcode || "NET2026",
      status: "upcoming",
      agenda: newClass.agenda.split(",").map((s) => s.trim()),
      isAutomatedDaily: newClass.isAutomatedDaily,
      batch: newClass.batch,
      createdAt: new Date().toISOString(),
    };

    createdClass.status = calculateAutomatedClassStatus(createdClass);

    try {
      await api.createLiveClass(createdClass);
    } catch (err) {
      console.warn("API save fallback:", err);
    }

    setClassesList([createdClass, ...classesList]);
    setShowClassModal(false);
    setNewClass({
      courseSlug: "fullstack-web-development",
      title: "",
      date: new Date().toISOString().split("T")[0],
      startTime: "18:30",
      endTime: "20:00",
      time: "06:30 PM - 08:00 PM IST",
      platform: "Google Meet",
      meetingLink: "https://meet.google.com/net-fsdev-live",
      meetingId: "net-fsdev-live",
      passcode: "NET2026",
      batch: "Cohort 14 (Batch 2026-A)",
      agenda: "Hands-on coding, live architecture breakdown & doubt solving",
      isAutomatedDaily: true,
    });
    alert("🎉 Live Class scheduled successfully! Students enrolled in this course will see it directly in their LMS Dashboard.");
  };

  const handleToggleClassStatus = async (id: string, newStatus: "live" | "upcoming" | "completed") => {
    try {
      await api.updateLiveClass(id, { status: newStatus });
    } catch (err) {
      console.warn("API toggle fallback", err);
    }
    setClassesList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const handleDeleteClass = async (id: string) => {
    if (!confirm("Remove this scheduled class link?")) return;
    try {
      await api.deleteLiveClass(id);
    } catch (err) {
      console.warn("API delete fallback", err);
    }
    setClassesList((prev) => prev.filter((c) => c.id !== id));
  };

  // Add Note handler
  const handleCreateNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.title.trim()) return;

    const courseMatch = LMS_COURSES.find((c) => c.slug === newNote.courseSlug);
    const createdNote: MentorNote = {
      id: `note-${Date.now()}`,
      courseSlug: newNote.courseSlug,
      courseTitle: courseMatch?.title || newNote.courseSlug,
      title: newNote.title,
      topic: newNote.topic || "Core Topic",
      module: newNote.module,
      mentorName: mentor.name,
      fileUrl: newNote.fileUrl,
      fileType: newNote.fileType,
      fileSize: newNote.fileSize,
      contentSnippet: newNote.contentSnippet || "Detailed study notes and architectural takeaways uploaded by faculty mentor.",
      publishedAt: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      downloadsCount: 1,
    };

    try {
      await api.createNote(createdNote);
    } catch (err) {
      console.warn("API save note fallback", err);
    }

    setNotesList([createdNote, ...notesList]);
    setShowNoteModal(false);
    setNewNote({
      courseSlug: "fullstack-web-development",
      title: "",
      topic: "",
      module: "Module 4: React & Architecture",
      fileUrl: "https://netcoder.in/downloads/handbook.pdf",
      fileType: "pdf",
      fileSize: "4.5 MB",
      contentSnippet: "",
    });
    alert("📘 Study Note published! Enrolled students can now view and download it.");
  };

  const handleDeleteNote = async (id: string) => {
    if (!confirm("Delete this study note?")) return;
    try {
      await api.deleteNote(id);
    } catch (err) {
      console.warn("API delete fallback", err);
    }
    setNotesList((prev) => prev.filter((n) => n.id !== id));
  };

  // Add Task handler
  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTask.title.trim()) return;

    const courseMatch = LMS_COURSES.find((c) => c.slug === newTask.courseSlug);
    const createdTask: MentorTask = {
      id: `task-${Date.now()}`,
      courseSlug: newTask.courseSlug,
      courseTitle: courseMatch?.title || newTask.courseSlug,
      title: newTask.title,
      description: newTask.description || "Complete the task requirements and submit your code repository.",
      dueDate: newTask.dueDate,
      points: Number(newTask.points) || 100,
      status: "open",
      starterRepo: newTask.starterRepo,
      submissionType: newTask.submissionType,
      mentorName: mentor.name,
      submissionsCount: 0,
    };

    try {
      await api.createTask(createdTask);
    } catch (err) {
      console.warn("API task fallback", err);
    }

    setTasksList([createdTask, ...tasksList]);
    setShowTaskModal(false);
    setNewTask({
      courseSlug: "fullstack-web-development",
      title: "",
      description: "",
      dueDate: new Date(Date.now() + 7 * 86400000).toISOString().split("T")[0],
      points: 100,
      starterRepo: "https://github.com/netcoder-tech/starter-repo",
      submissionType: "github",
    });
    alert("📋 Task / Assignment assigned to students!");
  };

  // Add Test handler
  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTest.title.trim()) return;

    const courseMatch = LMS_COURSES.find((c) => c.slug === newTest.courseSlug);
    const createdTest: MentorTest = {
      id: `test-${Date.now()}`,
      courseSlug: newTest.courseSlug,
      courseTitle: courseMatch?.title || newTest.courseSlug,
      title: newTest.title,
      duration: newTest.duration,
      totalQuestions: Number(newTest.totalQuestions) || 20,
      totalMarks: Number(newTest.totalMarks) || 40,
      passingScore: Number(newTest.passingScore) || 28,
      scheduledDate: newTest.scheduledDate,
      mentorName: mentor.name,
      questionsCount: Number(newTest.totalQuestions) || 20,
    };

    setTestsList([createdTest, ...testsList]);
    setShowTestModal(false);
    alert("🧪 Assessment scheduled successfully for enrolled cohort!");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        color: "#0f172a",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      {/* ─────────────────────────────────────────────────────────────
          TOP NAVBAR: PURE ORANGE & WHITE BRANDING
      ───────────────────────────────────────────────────────────── */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "2px solid #fed7aa",
          position: "sticky",
          top: 0,
          zIndex: 100,
          boxShadow: "0 4px 20px rgba(255, 85, 50, 0.06)",
        }}
      >
        <div
          style={{
            maxWidth: "1320px",
            margin: "0 auto",
            padding: "14px 20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
          }}
        >
          {/* Brand Left */}
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src="/images/logo.png"
                alt="Netcoder Technology"
                style={{ height: "36px", objectFit: "contain" }}
              />
            </Link>
            <div style={{ borderLeft: "2px solid #fed7aa", paddingLeft: "14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ fontSize: "1rem", fontWeight: 800, color: "#0f172a" }}>
                  Mentor Portal
                </span>
                <span
                  style={{
                    background: "#fff5f2",
                    color: "#ff5532",
                    border: "1px solid #fed7aa",
                    fontSize: "0.68rem",
                    fontWeight: 800,
                    padding: "2px 8px",
                    borderRadius: "999px",
                    textTransform: "uppercase",
                  }}
                >
                  Faculty Hub
                </span>
              </div>
              <p style={{ margin: 0, fontSize: "0.75rem", color: "#64748b" }}>
                Active: <strong>{mentor.name}</strong> &bull; {mentor.specialization}
              </p>
            </div>
          </div>

          {/* Actions Right */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
            <Link
              href="/lms/dashboard"
              target="_blank"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 14px",
                borderRadius: "10px",
                border: "1px solid #fed7aa",
                background: "#fff5f2",
                color: "#ff5532",
                fontWeight: 700,
                fontSize: "0.82rem",
                textDecoration: "none",
              }}
            >
              <GraduationCap size={15} /> Student LMS View
            </Link>

            <Link
              href="/admin/dashboard"
              target="_blank"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 14px",
                borderRadius: "10px",
                border: "1px solid #fed7aa",
                background: "#ffffff",
                color: "#475569",
                fontWeight: 700,
                fontSize: "0.82rem",
                textDecoration: "none",
              }}
            >
              Admin Portal
            </Link>

            <button
              onClick={() => setShowClassModal(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 16px",
                borderRadius: "10px",
                background: "#ff5532",
                color: "#ffffff",
                fontWeight: 800,
                fontSize: "0.82rem",
                border: "none",
                cursor: "pointer",
                boxShadow: "0 4px 14px rgba(255, 85, 50, 0.35)",
              }}
            >
              <Plus size={16} /> + Schedule Class Link
            </button>

            <button
              onClick={handleLogout}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "8px 12px",
                borderRadius: "10px",
                border: "1px solid #fee2e2",
                background: "#fef2f2",
                color: "#ef4444",
                fontWeight: 700,
                fontSize: "0.82rem",
                cursor: "pointer",
              }}
            >
              <LogOut size={14} /> Exit
            </button>
          </div>
        </div>
      </header>

      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT CONTAINER
      ───────────────────────────────────────────────────────────── */}
      <main style={{ maxWidth: "1320px", margin: "0 auto", padding: "24px 20px 60px" }}>

        {/* MENTOR WELCOME BANNER (ORANGE & WHITE) */}
        <section
          style={{
            background: "#fffaf7",
            border: "2px solid #fed7aa",
            borderRadius: "20px",
            padding: "24px 28px",
            marginBottom: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            boxShadow: "0 6px 24px rgba(255, 85, 50, 0.05)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
            <img
              src={mentor.avatar}
              alt={mentor.name}
              style={{
                width: "70px",
                height: "70px",
                borderRadius: "20px",
                objectFit: "cover",
                border: "3px solid #ff5532",
                boxShadow: "0 6px 16px rgba(255, 85, 50, 0.25)",
              }}
            />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    background: "#ff5532",
                    color: "#ffffff",
                    fontSize: "0.72rem",
                    fontWeight: 800,
                    padding: "2px 8px",
                    borderRadius: "6px",
                    textTransform: "uppercase",
                  }}
                >
                  Verified Lead Mentor
                </span>
                <span style={{ fontSize: "0.8rem", color: "#64748b" }}>
                  Rating: <strong style={{ color: "#f59e0b" }}>★ {mentor.rating}</strong>
                </span>
              </div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", margin: "4px 0" }}>
                Welcome back, {mentor.name}!
              </h2>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>
                Assigned Tracks:{" "}
                <strong style={{ color: "#ff5532" }}>
                  {mentor.courses.map((c) => c.replace(/-/g, " ").toUpperCase()).join(" &bull; ")}
                </strong>{" "}
                &bull; {mentor.totalBatches} Active Batches &bull; {mentor.totalStudents} Students
              </p>
            </div>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              onClick={() => setShowNoteModal(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 16px",
                borderRadius: "12px",
                border: "1px solid #fed7aa",
                background: "#ffffff",
                color: "#0f172a",
                fontWeight: 700,
                fontSize: "0.84rem",
                cursor: "pointer",
              }}
            >
              <FileText size={16} color="#ff5532" /> + Upload Notes
            </button>
            <button
              onClick={() => setShowTaskModal(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 16px",
                borderRadius: "12px",
                border: "1px solid #fed7aa",
                background: "#ffffff",
                color: "#0f172a",
                fontWeight: 700,
                fontSize: "0.84rem",
                cursor: "pointer",
              }}
            >
              <CheckSquare size={16} color="#ff5532" /> + Assign Task
            </button>
            <button
              onClick={() => setShowTestModal(true)}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "10px 16px",
                borderRadius: "12px",
                border: "1px solid #fed7aa",
                background: "#ffffff",
                color: "#0f172a",
                fontWeight: 700,
                fontSize: "0.84rem",
                cursor: "pointer",
              }}
            >
              <Award size={16} color="#ff5532" /> + Create Test
            </button>
          </div>
        </section>

        {/* 4 SUMMARY STAT CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "16px",
            marginBottom: "28px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              border: "1px solid #fed7aa",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 4px 16px rgba(255, 85, 50, 0.04)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                Scheduled Live Classes
              </span>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#fff5f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Video size={18} color="#ff5532" />
              </div>
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#ff5532", marginTop: "8px" }}>
              {classesList.length}
            </div>
            <div style={{ fontSize: "0.78rem", color: "#10b981", fontWeight: 600, display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
              <Radio size={12} /> Auto-Live Broadcast Engine Active
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #fed7aa",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 4px 16px rgba(255, 85, 50, 0.04)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                Published Notes &amp; Handbooks
              </span>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#fff5f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <FileText size={18} color="#ff5532" />
              </div>
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", marginTop: "8px" }}>
              {notesList.length}
            </div>
            <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "4px" }}>
              {notesList.reduce((sum, n) => sum + (n.downloadsCount || 0), 0)} Total Downloads
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #fed7aa",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 4px 16px rgba(255, 85, 50, 0.04)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                Assignments &amp; Tasks
              </span>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#fff5f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckSquare size={18} color="#ff5532" />
              </div>
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", marginTop: "8px" }}>
              {tasksList.length}
            </div>
            <div style={{ fontSize: "0.78rem", color: "#10b981", fontWeight: 600, marginTop: "4px" }}>
              {tasksList.reduce((sum, t) => sum + (t.submissionsCount || 0), 0)} Submissions Reviewed
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1px solid #fed7aa",
              borderRadius: "16px",
              padding: "20px",
              boxShadow: "0 4px 16px rgba(255, 85, 50, 0.04)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "0.78rem", fontWeight: 700, color: "#64748b", textTransform: "uppercase" }}>
                Cohort Assessments
              </span>
              <div style={{ width: "36px", height: "36px", borderRadius: "10px", background: "#fff5f2", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Award size={18} color="#ff5532" />
              </div>
            </div>
            <div style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", marginTop: "8px" }}>
              {testsList.length}
            </div>
            <div style={{ fontSize: "0.78rem", color: "#64748b", marginTop: "4px" }}>
              Average Passing: 88%
            </div>
          </div>
        </div>

        {/* NAVIGATION TABS (ORANGE & WHITE) */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            borderBottom: "2px solid #fed7aa",
            paddingBottom: "12px",
            marginBottom: "24px",
            overflowX: "auto",
          }}
        >
          <button
            onClick={() => setActiveTab("classes")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              borderRadius: "12px",
              border: "none",
              background: activeTab === "classes" ? "#ff5532" : "transparent",
              color: activeTab === "classes" ? "#ffffff" : "#475569",
              fontWeight: 800,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            <Video size={16} /> 🔴 Live Classes &amp; Links ({classesList.length})
          </button>

          <button
            onClick={() => setActiveTab("notes")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              borderRadius: "12px",
              border: "none",
              background: activeTab === "notes" ? "#ff5532" : "transparent",
              color: activeTab === "notes" ? "#ffffff" : "#475569",
              fontWeight: 800,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            <FileText size={16} /> 📝 Uploaded Notes ({notesList.length})
          </button>

          <button
            onClick={() => setActiveTab("tasks")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              borderRadius: "12px",
              border: "none",
              background: activeTab === "tasks" ? "#ff5532" : "transparent",
              color: activeTab === "tasks" ? "#ffffff" : "#475569",
              fontWeight: 800,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            <CheckSquare size={16} /> 📋 Assigned Tasks ({tasksList.length})
          </button>

          <button
            onClick={() => setActiveTab("tests")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              borderRadius: "12px",
              border: "none",
              background: activeTab === "tests" ? "#ff5532" : "transparent",
              color: activeTab === "tests" ? "#ffffff" : "#475569",
              fontWeight: 800,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            <Award size={16} /> 🧪 Tests &amp; Quizzes ({testsList.length})
          </button>

          <button
            onClick={() => setActiveTab("students")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              padding: "10px 18px",
              borderRadius: "12px",
              border: "none",
              background: activeTab === "students" ? "#ff5532" : "transparent",
              color: activeTab === "students" ? "#ffffff" : "#475569",
              fontWeight: 800,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            <Users size={16} /> 👥 Enrolled Cohort (Students)
          </button>
        </div>

        {/* ════════════════════════════════════════════════════════════
            TAB 1: LIVE CLASSES & DIRECT MEETING LINKS
        ════════════════════════════════════════════════════════════ */}
        {activeTab === "classes" && (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0 0 4px", color: "#0f172a" }}>
                  Scheduled Live Interactive Classes
                </h3>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>
                  Live classes configured here are directly exposed to students who enrolled in that specific course.
                </p>
              </div>
              <button
                onClick={() => setShowClassModal(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "9px 16px",
                  borderRadius: "10px",
                  background: "#ff5532",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 14px rgba(255, 85, 50, 0.3)",
                }}
              >
                <Plus size={15} /> Add New Class Link
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {classesList.map((cls) => {
                const isLive = cls.status === "live";
                return (
                  <div
                    key={cls.id}
                    style={{
                      background: "#ffffff",
                      border: isLive ? "2px solid #ff5532" : "1px solid #fed7aa",
                      borderRadius: "18px",
                      padding: "20px 24px",
                      boxShadow: isLive
                        ? "0 10px 30px rgba(255, 85, 50, 0.15)"
                        : "0 4px 16px rgba(0, 0, 0, 0.03)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "16px",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {isLive && (
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: 0,
                          bottom: 0,
                          width: "6px",
                          background: "#ff5532",
                        }}
                      />
                    )}

                    {/* Class Info */}
                    <div style={{ flex: "1 1 360px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "8px", flexWrap: "wrap" }}>
                        {isLive ? (
                          <span
                            style={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: "6px",
                              padding: "4px 10px",
                              borderRadius: "999px",
                              background: "#fee2e2",
                              color: "#dc2626",
                              fontSize: "0.72rem",
                              fontWeight: 800,
                              textTransform: "uppercase",
                            }}
                          >
                            <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#dc2626", display: "inline-block" }} />
                            Live Now &bull; BroadCast Active
                          </span>
                        ) : cls.status === "completed" ? (
                          <span
                            style={{
                              padding: "3px 8px",
                              borderRadius: "999px",
                              background: "#f1f5f9",
                              color: "#64748b",
                              fontSize: "0.72rem",
                              fontWeight: 700,
                            }}
                          >
                            Completed
                          </span>
                        ) : (
                          <span
                            style={{
                              padding: "3px 8px",
                              borderRadius: "999px",
                              background: "#ecfdf5",
                              color: "#059669",
                              fontSize: "0.72rem",
                              fontWeight: 800,
                            }}
                          >
                            Upcoming
                          </span>
                        )}

                        <span
                          style={{
                            background: "#fff5f2",
                            border: "1px solid #ffd8cf",
                            color: "#ff5532",
                            padding: "2px 8px",
                            borderRadius: "6px",
                            fontSize: "0.72rem",
                            fontWeight: 700,
                          }}
                        >
                          Target: {cls.courseTitle}
                        </span>

                        <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                          {cls.batch || "Cohort 2026"}
                        </span>
                      </div>

                      <h4 style={{ fontSize: "1.15rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
                        {cls.title}
                      </h4>

                      <div style={{ display: "flex", alignItems: "center", gap: "14px", fontSize: "0.82rem", color: "#475569", flexWrap: "wrap" }}>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          <Calendar size={14} color="#ff5532" /> {cls.date}
                        </span>
                        <span style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                          <Clock size={14} color="#ff5532" /> {cls.time}
                        </span>
                        <span>
                          Platform: <strong style={{ color: "#0f172a" }}>{cls.platform}</strong>
                        </span>
                        <span>
                          Mentor: <strong>{cls.mentorName}</strong>
                        </span>
                      </div>

                      {/* Direct Meeting link pill */}
                      <div
                        style={{
                          marginTop: "12px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          background: "#fffaf7",
                          border: "1px solid #fed7aa",
                          padding: "6px 12px",
                          borderRadius: "10px",
                          fontSize: "0.8rem",
                        }}
                      >
                        <span style={{ color: "#64748b" }}>Direct Join URL:</span>
                        <a
                          href={cls.meetingLink}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: "#ff5532", fontWeight: 700, textDecoration: "underline", maxWidth: "260px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                        >
                          {cls.meetingLink}
                        </a>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(cls.meetingLink, cls.id)}
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                            color: copiedLink === cls.id ? "#10b981" : "#64748b",
                            display: "flex",
                            alignItems: "center",
                            gap: "3px",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                          }}
                        >
                          {copiedLink === cls.id ? <Check size={14} /> : <Copy size={14} />}
                          {copiedLink === cls.id ? "Copied!" : "Copy"}
                        </button>
                        {cls.passcode && (
                          <span style={{ color: "#64748b", marginLeft: "6px" }}>
                            Passcode: <strong style={{ color: "#0f172a" }}>{cls.passcode}</strong>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", minWidth: "160px" }}>
                      <a
                        href={cls.meetingLink}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          padding: "10px 16px",
                          borderRadius: "12px",
                          background: "#ff5532",
                          color: "#ffffff",
                          fontWeight: 800,
                          fontSize: "0.85rem",
                          textDecoration: "none",
                          boxShadow: "0 4px 12px rgba(255, 85, 50, 0.3)",
                        }}
                      >
                        <Play size={14} /> Launch Meeting Room
                      </a>

                      <button
                        onClick={() => handleToggleClassStatus(cls.id, isLive ? "completed" : "live")}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          padding: "8px 14px",
                          borderRadius: "12px",
                          border: "1px solid #fed7aa",
                          background: isLive ? "#fee2e2" : "#fff5f2",
                          color: isLive ? "#dc2626" : "#ff5532",
                          fontWeight: 700,
                          fontSize: "0.8rem",
                          cursor: "pointer",
                        }}
                      >
                        {isLive ? "End Live Session" : "🔴 Force Go Live Now"}
                      </button>

                      <button
                        onClick={() => handleDeleteClass(cls.id)}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "6px",
                          padding: "6px 12px",
                          borderRadius: "10px",
                          border: "none",
                          background: "transparent",
                          color: "#ef4444",
                          fontSize: "0.78rem",
                          fontWeight: 600,
                          cursor: "pointer",
                        }}
                      >
                        <Trash2 size={13} /> Delete Class Link
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════
            TAB 2: UPLOADED NOTES & STUDY MATERIALS
        ════════════════════════════════════════════════════════════ */}
        {activeTab === "notes" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0 0 4px", color: "#0f172a" }}>
                  Mentor Study Notes &amp; Handbooks
                </h3>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>
                  Upload architectural PDFs, cheatsheets, and resource guides directly accessible by your students.
                </p>
              </div>
              <button
                onClick={() => setShowNoteModal(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "9px 16px",
                  borderRadius: "10px",
                  background: "#ff5532",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Plus size={15} /> + Upload Note
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "16px" }}>
              {notesList.map((n) => (
                <div
                  key={n.id}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #fed7aa",
                    borderRadius: "18px",
                    padding: "20px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <span
                        style={{
                          background: "#fff5f2",
                          border: "1px solid #fed7aa",
                          color: "#ff5532",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "6px",
                        }}
                      >
                        {n.courseTitle}
                      </span>
                      <span style={{ fontSize: "0.72rem", color: "#64748b" }}>
                        {n.fileSize} &bull; {n.fileType.toUpperCase()}
                      </span>
                    </div>

                    <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
                      {n.title}
                    </h4>
                    <p style={{ fontSize: "0.82rem", color: "#64748b", margin: "0 0 12px", lineHeight: 1.5 }}>
                      {n.contentSnippet}
                    </p>
                    <div style={{ fontSize: "0.75rem", color: "#475569" }}>
                      Module: <strong>{n.module}</strong> &bull; Mentor: <strong>{n.mentorName}</strong>
                    </div>
                  </div>

                  <div
                    style={{
                      marginTop: "16px",
                      paddingTop: "12px",
                      borderTop: "1px solid #fed7aa",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                      Published {n.publishedAt}
                    </span>
                    <div style={{ display: "flex", gap: "6px" }}>
                      <a
                        href={n.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          background: "#fff5f2",
                          border: "1px solid #fed7aa",
                          color: "#ff5532",
                          fontSize: "0.78rem",
                          fontWeight: 700,
                          textDecoration: "none",
                        }}
                      >
                        <ExternalLink size={13} /> View File
                      </a>
                      <button
                        onClick={() => handleDeleteNote(n.id)}
                        style={{
                          padding: "6px 10px",
                          borderRadius: "8px",
                          border: "none",
                          background: "transparent",
                          color: "#ef4444",
                          cursor: "pointer",
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════
            TAB 3: ASSIGNED TASKS & PROJECTS
        ════════════════════════════════════════════════════════════ */}
        {activeTab === "tasks" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0 0 4px", color: "#0f172a" }}>
                  Cohort Practical Tasks &amp; Project Assignments
                </h3>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>
                  Create programming assignments, project deadlines, and submission requirements.
                </p>
              </div>
              <button
                onClick={() => setShowTaskModal(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "9px 16px",
                  borderRadius: "10px",
                  background: "#ff5532",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Plus size={15} /> + Assign New Task
              </button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              {tasksList.map((t) => (
                <div
                  key={t.id}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #fed7aa",
                    borderRadius: "16px",
                    padding: "20px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "14px",
                  }}
                >
                  <div style={{ flex: "1 1 360px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <span
                        style={{
                          background: "#fff5f2",
                          border: "1px solid #fed7aa",
                          color: "#ff5532",
                          fontSize: "0.72rem",
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: "6px",
                        }}
                      >
                        {t.courseTitle}
                      </span>
                      <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                        Due: <strong style={{ color: "#0f172a" }}>{t.dueDate}</strong> &bull; {t.points} Points
                      </span>
                    </div>

                    <h4 style={{ fontSize: "1.1rem", fontWeight: 800, color: "#0f172a", margin: "0 0 6px" }}>
                      {t.title}
                    </h4>
                    <p style={{ fontSize: "0.84rem", color: "#64748b", margin: "0 0 10px", lineHeight: 1.5 }}>
                      {t.description}
                    </p>

                    {t.starterRepo && (
                      <div style={{ fontSize: "0.78rem", color: "#475569" }}>
                        Starter Code:{" "}
                        <a href={t.starterRepo} target="_blank" rel="noreferrer" style={{ color: "#ff5532", fontWeight: 600 }}>
                          {t.starterRepo}
                        </a>
                      </div>
                    )}
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: "1.2rem", fontWeight: 800, color: "#ff5532" }}>
                        {t.submissionsCount}
                      </div>
                      <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Submissions</span>
                    </div>
                    <button
                      onClick={() => setTasksList(tasksList.filter((x) => x.id !== t.id))}
                      style={{
                        padding: "8px 12px",
                        borderRadius: "10px",
                        border: "1px solid #fed7aa",
                        background: "#ffffff",
                        color: "#ef4444",
                        cursor: "pointer",
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════
            TAB 4: TESTS & ASSESSMENTS
        ════════════════════════════════════════════════════════════ */}
        {activeTab === "tests" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0 0 4px", color: "#0f172a" }}>
                  Assessments &amp; Certification Quizzes
                </h3>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>
                  Publish midterm and milestone tests with automated passing score criteria.
                </p>
              </div>
              <button
                onClick={() => setShowTestModal(true)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "9px 16px",
                  borderRadius: "10px",
                  background: "#ff5532",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <Plus size={15} /> + Schedule Assessment
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
              {testsList.map((test) => (
                <div
                  key={test.id}
                  style={{
                    background: "#ffffff",
                    border: "1px solid #fed7aa",
                    borderRadius: "18px",
                    padding: "20px",
                    boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
                  }}
                >
                  <span
                    style={{
                      background: "#fff5f2",
                      border: "1px solid #fed7aa",
                      color: "#ff5532",
                      fontSize: "0.72rem",
                      fontWeight: 700,
                      padding: "2px 8px",
                      borderRadius: "6px",
                      display: "inline-block",
                      marginBottom: "8px",
                    }}
                  >
                    {test.courseTitle}
                  </span>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: 800, color: "#0f172a", margin: "0 0 10px" }}>
                    {test.title}
                  </h4>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", fontSize: "0.8rem", color: "#475569", marginBottom: "14px" }}>
                    <div>Duration: <strong>{test.duration}</strong></div>
                    <div>Questions: <strong>{test.totalQuestions}</strong></div>
                    <div>Total Marks: <strong>{test.totalMarks}</strong></div>
                    <div>Passing: <strong>{test.passingScore}</strong></div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: "12px", borderTop: "1px solid #fed7aa" }}>
                    <span style={{ fontSize: "0.75rem", color: "#64748b" }}>
                      Date: {test.scheduledDate}
                    </span>
                    <button
                      onClick={() => setTestsList(testsList.filter((x) => x.id !== test.id))}
                      style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer" }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════
            TAB 5: ENROLLED STUDENTS IN MENTOR'S COURSES
        ════════════════════════════════════════════════════════════ */}
        {activeTab === "students" && (
          <div>
            <div style={{ marginBottom: "16px" }}>
              <h3 style={{ fontSize: "1.25rem", fontWeight: 800, margin: "0 0 4px", color: "#0f172a" }}>
                Active Enrolled Students in Your Tracks
              </h3>
              <p style={{ margin: 0, fontSize: "0.85rem", color: "#64748b" }}>
                Students who have enrolled in {mentor.courses.join(", ")} with direct access to your class links.
              </p>
            </div>

            <div
              style={{
                background: "#ffffff",
                border: "1px solid #fed7aa",
                borderRadius: "18px",
                overflow: "hidden",
                boxShadow: "0 4px 16px rgba(0,0,0,0.03)",
              }}
            >
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                <thead>
                  <tr style={{ background: "#fffaf7", textAlign: "left", color: "#64748b", borderBottom: "1px solid #fed7aa" }}>
                    <th style={{ padding: "14px 20px" }}>Student</th>
                    <th style={{ padding: "14px 20px" }}>Track Course</th>
                    <th style={{ padding: "14px 20px" }}>Progress</th>
                    <th style={{ padding: "14px 20px" }}>Live Attendance</th>
                    <th style={{ padding: "14px 20px", textAlign: "right" }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: "Sahil Sandhu", email: "sahil@netcoder.in", course: "Full Stack Web Development", progress: 65, attendance: "8/8 Sessions", status: "Active" },
                    { name: "Priya Sharma", email: "priya@gmail.com", course: "Data Science & Machine Learning", progress: 80, attendance: "7/8 Sessions", status: "Active" },
                    { name: "Amit Patel", email: "amit.dev@outlook.com", course: "Cyber Security & Ethical Hacking", progress: 40, attendance: "6/8 Sessions", status: "Active" },
                    { name: "Neha Thakur", email: "neha.uiux@gmail.com", course: "Full Stack Web Development", progress: 55, attendance: "8/8 Sessions", status: "Active" },
                  ].map((s, idx) => (
                    <tr key={idx} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "16px 20px" }}>
                        <strong style={{ color: "#0f172a" }}>{s.name}</strong>
                        <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{s.email}</div>
                      </td>
                      <td style={{ padding: "16px 20px", color: "#ff5532", fontWeight: 700 }}>
                        {s.course}
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                          <div style={{ width: "80px", height: "6px", background: "#fed7aa", borderRadius: "3px", overflow: "hidden" }}>
                            <div style={{ width: `${s.progress}%`, height: "100%", background: "#ff5532" }} />
                          </div>
                          <span style={{ fontSize: "0.78rem", fontWeight: 700 }}>{s.progress}%</span>
                        </div>
                      </td>
                      <td style={{ padding: "16px 20px", color: "#475569" }}>
                        {s.attendance}
                      </td>
                      <td style={{ padding: "16px 20px", textAlign: "right" }}>
                        <span style={{ background: "#ecfdf5", color: "#059669", padding: "3px 8px", borderRadius: "10px", fontSize: "0.75rem", fontWeight: 700 }}>
                          {s.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* ─────────────────────────────────────────────────────────────
          MODAL: SCHEDULE LIVE CLASS LINK
      ───────────────────────────────────────────────────────────── */}
      {showClassModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              padding: "28px 30px",
              maxWidth: "580px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px rgba(255, 85, 50, 0.15)",
              border: "2px solid #fed7aa",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#ff5532", margin: 0 }}>
                🔴 Schedule Live Class Link
              </h3>
              <button
                type="button"
                onClick={() => setShowClassModal(false)}
                style={{ background: "transparent", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#64748b" }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateClass}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Class Topic / Title *
                </label>
                <input
                  type="text"
                  required
                  value={newClass.title}
                  onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
                  placeholder="e.g. Masterclass: Next.js 15 Server Actions & Prisma"
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Target Enrolled Course *
                </label>
                <select
                  value={newClass.courseSlug}
                  onChange={(e) => setNewClass({ ...newClass, courseSlug: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                >
                  {LMS_COURSES.map((c) => (
                    <option key={c.slug} value={c.slug}>
                      {c.title}
                    </option>
                  ))}
                </select>
                <span style={{ fontSize: "0.72rem", color: "#ff5532", marginTop: "3px", display: "block" }}>
                  ✓ This link will instantly be shown to students enrolled in this course!
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Platform *
                  </label>
                  <select
                    value={newClass.platform}
                    onChange={(e) => setNewClass({ ...newClass, platform: e.target.value as any })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                  >
                    <option value="Google Meet">Google Meet</option>
                    <option value="Zoom">Zoom</option>
                    <option value="Microsoft Teams">Microsoft Teams</option>
                    <option value="YouTube Live">YouTube Live</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Batch / Cohort
                  </label>
                  <input
                    type="text"
                    value={newClass.batch}
                    onChange={(e) => setNewClass({ ...newClass, batch: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Live Meeting Link / URL *
                </label>
                <input
                  type="url"
                  required
                  value={newClass.meetingLink}
                  onChange={(e) => setNewClass({ ...newClass, meetingLink: e.target.value })}
                  placeholder="https://meet.google.com/xyz-live or Zoom URL"
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Room ID / Meeting ID
                  </label>
                  <input
                    type="text"
                    value={newClass.meetingId}
                    onChange={(e) => setNewClass({ ...newClass, meetingId: e.target.value })}
                    placeholder="net-room-1"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Meeting Passcode
                  </label>
                  <input
                    type="text"
                    value={newClass.passcode}
                    onChange={(e) => setNewClass({ ...newClass, passcode: e.target.value })}
                    placeholder="NET2026"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Class Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newClass.date}
                    onChange={(e) => setNewClass({ ...newClass, date: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Display Time Slot
                  </label>
                  <input
                    type="text"
                    required
                    value={newClass.time}
                    onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
                    placeholder="06:30 PM - 08:00 PM IST"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Key Class Agenda / Topics
                </label>
                <textarea
                  rows={2}
                  value={newClass.agenda}
                  onChange={(e) => setNewClass({ ...newClass, agenda: e.target.value })}
                  placeholder="Comma separated topics to be covered"
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setShowClassModal(false)}
                  style={{ padding: "10px 16px", borderRadius: "10px", border: "1px solid #fed7aa", background: "#ffffff", color: "#475569", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "10px 20px", borderRadius: "10px", background: "#ff5532", color: "#ffffff", border: "none", fontWeight: 800, cursor: "pointer", boxShadow: "0 4px 14px rgba(255, 85, 50, 0.35)" }}
                >
                  Publish Class Link to Cohort
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: UPLOAD NOTES
      ───────────────────────────────────────────────────────────── */}
      {showNoteModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              padding: "28px 30px",
              maxWidth: "520px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px rgba(255, 85, 50, 0.15)",
              border: "2px solid #fed7aa",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#ff5532", margin: 0 }}>
                📘 Upload Study Note / Resource
              </h3>
              <button
                type="button"
                onClick={() => setShowNoteModal(false)}
                style={{ background: "transparent", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#64748b" }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateNote}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Note Title *
                </label>
                <input
                  type="text"
                  required
                  value={newNote.title}
                  onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  placeholder="e.g. Next.js 15 App Router Deep Dive Cheatsheet"
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Target Course *
                </label>
                <select
                  value={newNote.courseSlug}
                  onChange={(e) => setNewNote({ ...newNote, courseSlug: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                >
                  {LMS_COURSES.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Module / Unit
                  </label>
                  <input
                    type="text"
                    value={newNote.module}
                    onChange={(e) => setNewNote({ ...newNote, module: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    File Size (approx)
                  </label>
                  <input
                    type="text"
                    value={newNote.fileSize}
                    onChange={(e) => setNewNote({ ...newNote, fileSize: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  PDF / Download Resource URL *
                </label>
                <input
                  type="url"
                  required
                  value={newNote.fileUrl}
                  onChange={(e) => setNewNote({ ...newNote, fileUrl: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Summary / Key Takeaways
                </label>
                <textarea
                  rows={3}
                  value={newNote.contentSnippet}
                  onChange={(e) => setNewNote({ ...newNote, contentSnippet: e.target.value })}
                  placeholder="Key concepts, architecture diagrams, interview tips included..."
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setShowNoteModal(false)}
                  style={{ padding: "10px 16px", borderRadius: "10px", border: "1px solid #fed7aa", background: "#ffffff", color: "#475569", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "10px 20px", borderRadius: "10px", background: "#ff5532", color: "#ffffff", border: "none", fontWeight: 800, cursor: "pointer" }}
                >
                  Publish Note to Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: ASSIGN TASK
      ───────────────────────────────────────────────────────────── */}
      {showTaskModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              padding: "28px 30px",
              maxWidth: "520px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px rgba(255, 85, 50, 0.15)",
              border: "2px solid #fed7aa",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#ff5532", margin: 0 }}>
                📋 Assign New Task / Project
              </h3>
              <button
                type="button"
                onClick={() => setShowTaskModal(false)}
                style={{ background: "transparent", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#64748b" }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateTask}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Task Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="e.g. Build Realtime Chat App with WebSockets"
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Target Course *
                </label>
                <select
                  value={newTask.courseSlug}
                  onChange={(e) => setNewTask({ ...newTask, courseSlug: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                >
                  {LMS_COURSES.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Due Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Max Points
                  </label>
                  <input
                    type="number"
                    value={newTask.points}
                    onChange={(e) => setNewTask({ ...newTask, points: Number(e.target.value) })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  GitHub Starter Repository URL
                </label>
                <input
                  type="url"
                  value={newTask.starterRepo}
                  onChange={(e) => setNewTask({ ...newTask, starterRepo: e.target.value })}
                  placeholder="https://github.com/netcoder-tech/starter"
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ marginBottom: "18px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Task Description &amp; Evaluation Rubric
                </label>
                <textarea
                  rows={3}
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Deliverables, acceptance criteria, and submission guidelines..."
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setShowTaskModal(false)}
                  style={{ padding: "10px 16px", borderRadius: "10px", border: "1px solid #fed7aa", background: "#ffffff", color: "#475569", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "10px 20px", borderRadius: "10px", background: "#ff5532", color: "#ffffff", border: "none", fontWeight: 800, cursor: "pointer" }}
                >
                  Assign Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          MODAL: SCHEDULE TEST
      ───────────────────────────────────────────────────────────── */}
      {showTestModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(15, 23, 42, 0.6)",
            backdropFilter: "blur(4px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <div
            style={{
              background: "#ffffff",
              borderRadius: "24px",
              padding: "28px 30px",
              maxWidth: "520px",
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 25px 50px rgba(255, 85, 50, 0.15)",
              border: "2px solid #fed7aa",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
              <h3 style={{ fontSize: "1.3rem", fontWeight: 800, color: "#ff5532", margin: 0 }}>
                🧪 Schedule Assessment / Quiz
              </h3>
              <button
                type="button"
                onClick={() => setShowTestModal(false)}
                style={{ background: "transparent", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#64748b" }}
              >
                &times;
              </button>
            </div>

            <form onSubmit={handleCreateTest}>
              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Assessment Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTest.title}
                  onChange={(e) => setNewTest({ ...newTest, title: e.target.value })}
                  placeholder="e.g. React 19 & State Architecture Assessment"
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                />
              </div>

              <div style={{ marginBottom: "14px" }}>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                  Target Course *
                </label>
                <select
                  value={newTest.courseSlug}
                  onChange={(e) => setNewTest({ ...newTest, courseSlug: e.target.value })}
                  style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                >
                  {LMS_COURSES.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.title}</option>
                  ))}
                </select>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Duration
                  </label>
                  <input
                    type="text"
                    value={newTest.duration}
                    onChange={(e) => setNewTest({ ...newTest, duration: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Total Questions
                  </label>
                  <input
                    type="number"
                    value={newTest.totalQuestions}
                    onChange={(e) => setNewTest({ ...newTest, totalQuestions: Number(e.target.value) })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "18px" }}>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Total Marks
                  </label>
                  <input
                    type="number"
                    value={newTest.totalMarks}
                    onChange={(e) => setNewTest({ ...newTest, totalMarks: Number(e.target.value) })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>
                    Passing Score
                  </label>
                  <input
                    type="number"
                    value={newTest.passingScore}
                    onChange={(e) => setNewTest({ ...newTest, passingScore: Number(e.target.value) })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #fed7aa", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setShowTestModal(false)}
                  style={{ padding: "10px 16px", borderRadius: "10px", border: "1px solid #fed7aa", background: "#ffffff", color: "#475569", fontWeight: 600, cursor: "pointer" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: "10px 20px", borderRadius: "10px", background: "#ff5532", color: "#ffffff", border: "none", fontWeight: 800, cursor: "pointer" }}
                >
                  Publish Test
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
