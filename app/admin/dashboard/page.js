"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BLOGS } from "@/data/blogs";
import { INITIAL_FEEDBACK } from "@/data/feedback";
import { LMS_COURSES } from "@/data/lms-courses";
import { INITIAL_CLASSES, INITIAL_NOTES, INITIAL_TASKS, calculateAutomatedClassStatus } from "@/data/lms-mentor-data";
import { api } from "@/lib/api";
import { TableRowsSkeleton } from "@/components/ui/SkeletonLoader";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [blogsList, setBlogsList] = useState(BLOGS);
  const [feedbackList, setFeedbackList] = useState(INITIAL_FEEDBACK);
  const [coursesList, setCoursesList] = useState(LMS_COURSES);
  const [classesList, setClassesList] = useState(INITIAL_CLASSES);
  const [notesList, setNotesList] = useState(INITIAL_NOTES);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [adminUser, setAdminUser] = useState("Administrator");
  const [loadingApi, setLoadingApi] = useState(false);
  const [loadingCourseAction, setLoadingCourseAction] = useState(false);

  // New Live Class Modal State
  const [showAddClass, setShowAddClass] = useState(false);
  const [newClass, setNewClass] = useState({
    courseSlug: "fullstack-web-development",
    title: "",
    platform: "Google Meet",
    meetingLink: "https://meet.google.com/net-fsdev-live",
    meetingId: "net-fsdev-live",
    passcode: "NET2026",
    date: new Date().toISOString().split("T")[0],
    time: "06:30 PM - 08:00 PM IST",
    mentorName: "Nitin Kapoor",
    batch: "Cohort 14 (Batch 2026-A)",
    status: "upcoming"
  });

  // New Course Modal State (Manual upload: Text, Image, Price)
  const [showAddCourse, setShowAddCourse] = useState(false);
  const [newCourse, setNewCourse] = useState({
    title: "",
    category: "fullstack",
    price: 79,
    originalPrice: 180,
    image: "/images/full-stact-development.png",
    duration: "40 hrs • 8 Production Projects",
    level: "Intermediate",
    instructor: "Netcoder Senior Faculty & FAANG Mentors",
    badge: "Featured",
    overview: "",
  });

  const [lmsStudents, setLmsStudents] = useState([
    {
      id: "demo-001",
      name: "Sahil Sandhu",
      email: "sahil@netcoder.in",
      course: "Full Stack Web Development",
      slug: "fullstack-web-development",
      enrolledDate: "2026-09-20",
      progress: 35,
      completedLessons: 2,
      totalLessons: 10,
      drmStatus: "Protected",
      lastActive: "Today, 18:40"
    },
    {
      id: "stu-002",
      name: "Priya Sharma",
      email: "priya.sharma@gmail.com",
      course: "Data Science & Machine Learning",
      slug: "data-science-machine-learning",
      enrolledDate: "2026-09-18",
      progress: 60,
      completedLessons: 6,
      totalLessons: 8,
      drmStatus: "Protected",
      lastActive: "Yesterday"
    },
    {
      id: "stu-003",
      name: "Amit Patel",
      email: "amit.dev@outlook.com",
      course: "Cyber Security & Ethical Hacking",
      slug: "cyber-security",
      enrolledDate: "2026-09-22",
      progress: 20,
      completedLessons: 1,
      totalLessons: 6,
      drmStatus: "Protected",
      lastActive: "3 days ago"
    },
    {
      id: "stu-004",
      name: "Neha Thakur",
      email: "neha.uiux@gmail.com",
      course: "UI/UX & Product Design",
      slug: "ui-ux-design",
      enrolledDate: "2026-09-25",
      progress: 45,
      completedLessons: 4,
      totalLessons: 8,
      drmStatus: "Protected",
      lastActive: "Today, 14:15"
    }
  ]);
  const [drmStrictness, setDrmStrictness] = useState(true);

  // New Blog Modal State
  const [showAddBlog, setShowAddBlog] = useState(false);
  const [newBlog, setNewBlog] = useState({
    title: "",
    category: "Web Development",
    excerpt: "",
    author: "Admin Team",
    tags: "Next.js, React"
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAuth = localStorage.getItem("admin_auth");
      if (!isAuth) {
        router.push("/admin/login");
      }
      const user = localStorage.getItem("admin_user");
      if (user) setAdminUser(user);
    }

    let isMounted = true;
    async function loadData() {
      try {
        setLoadingApi(true);
        setLoadingCourses(true);
        const [studentsRes, blogsRes, feedbackRes, coursesRes, classesRes, notesRes] = await Promise.allSettled([
          api.getStudents(),
          api.getBlogs(),
          api.getFeedback(),
          api.getCourses(),
          api.getLiveClasses(),
          api.getNotes(),
        ]);

        if (isMounted) {
          if (studentsRes.status === "fulfilled" && studentsRes.value?.data) {
            setLmsStudents(studentsRes.value.data);
          }
          if (blogsRes.status === "fulfilled" && blogsRes.value?.data) {
            setBlogsList(blogsRes.value.data);
          }
          if (feedbackRes.status === "fulfilled" && feedbackRes.value?.data) {
            setFeedbackList(feedbackRes.value.data);
          }
          if (coursesRes.status === "fulfilled" && coursesRes.value?.data && Array.isArray(coursesRes.value.data) && coursesRes.value.data.length > 0) {
            setCoursesList(coursesRes.value.data);
          }
          if (classesRes.status === "fulfilled" && classesRes.value?.data && Array.isArray(classesRes.value.data) && classesRes.value.data.length > 0) {
            setClassesList(classesRes.value.data);
          }
          if (notesRes.status === "fulfilled" && notesRes.value?.data && Array.isArray(notesRes.value.data) && notesRes.value.data.length > 0) {
            setNotesList(notesRes.value.data);
          }
        }
      } catch (e) {
        console.warn("Live API fetch fallback", e);
      } finally {
        if (isMounted) {
          setLoadingApi(false);
          setLoadingCourses(false);
        }
      }
    }
    loadData();
    return () => { isMounted = false; };
  }, [router]);

  const handleCreateClassSubmit = async (e) => {
    e.preventDefault();
    if (!newClass.title.trim() || !newClass.meetingLink.trim()) {
      alert("Please provide class title and meeting link.");
      return;
    }
    const courseMatch = coursesList.find((c) => c.slug === newClass.courseSlug);
    const createdClass = {
      id: `cls-${Date.now()}`,
      courseSlug: newClass.courseSlug,
      courseTitle: courseMatch?.title || newClass.courseSlug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
      title: newClass.title,
      mentorName: newClass.mentorName || "Netcoder Faculty",
      mentorEmail: "mentor@netcoder.in",
      mentorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
      date: newClass.date,
      startTime: "18:30",
      endTime: "20:00",
      time: newClass.time,
      platform: newClass.platform,
      meetingLink: newClass.meetingLink,
      meetingId: newClass.meetingId || "net-room",
      passcode: newClass.passcode || "NET2026",
      status: newClass.status || "upcoming",
      agenda: ["Live technical lecture", "Code walkthrough & Q&A"],
      isAutomatedDaily: true,
      batch: newClass.batch,
      createdAt: new Date().toISOString(),
    };

    createdClass.status = calculateAutomatedClassStatus(createdClass);

    try {
      await api.createLiveClass(createdClass);
    } catch (err) {
      console.warn("Create class fallback", err);
    }

    setClassesList([createdClass, ...classesList]);
    setShowAddClass(false);
    setNewClass({
      courseSlug: "fullstack-web-development",
      title: "",
      platform: "Google Meet",
      meetingLink: "https://meet.google.com/net-fsdev-live",
      meetingId: "net-fsdev-live",
      passcode: "NET2026",
      date: new Date().toISOString().split("T")[0],
      time: "06:30 PM - 08:00 PM IST",
      mentorName: "Nitin Kapoor",
      batch: "Cohort 14 (Batch 2026-A)",
      status: "upcoming"
    });
    alert("🎉 Live Class link published! Enrolled students will see it directly in their dashboard.");
  };

  const handleToggleClassStatus = async (id, newStatus) => {
    try {
      await api.updateLiveClass(id, { status: newStatus });
    } catch (err) {
      console.warn("Update class status fallback", err);
    }
    setClassesList((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const handleDeleteClass = async (id) => {
    if (!confirm("Are you sure you want to remove this scheduled class?")) return;
    try {
      await api.deleteLiveClass(id);
    } catch (err) {
      console.warn("Delete class fallback", err);
    }
    setClassesList((prev) => prev.filter((c) => c.id !== id));
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("admin_auth");
      localStorage.removeItem("admin_user");
    }
    router.push("/admin/login");
  };

  const handleAddBlogSubmit = async (e) => {
    e.preventDefault();
    const created = {
      id: Date.now(),
      slug: newBlog.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      title: newBlog.title,
      category: newBlog.category,
      excerpt: newBlog.excerpt,
      author: newBlog.author,
      date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      readTime: "4 min read",
      image: "/images/full-stact-development.png",
      tags: newBlog.tags.split(",").map(t => t.trim()),
      content: `<p>${newBlog.excerpt}</p>`
    };

    try {
      await api.createBlog(created);
    } catch (err) {
      console.warn("Blog create fallback", err);
    }

    setBlogsList([created, ...blogsList]);
    setShowAddBlog(false);
    setNewBlog({ title: "", category: "Web Development", excerpt: "", author: "Admin Team", tags: "Next.js, React" });
    alert("New blog article published successfully!");
  };

  const handleAddCourseSubmit = async (e) => {
    e.preventDefault();
    if (!newCourse.title.trim() || !newCourse.overview.trim()) {
      alert("Please provide both a course title and overview description.");
      return;
    }
    setLoadingCourseAction(true);
    const slug = newCourse.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const payload = {
      id: Date.now(),
      slug,
      title: newCourse.title,
      category: newCourse.category,
      price: Number(newCourse.price),
      originalPrice: Number(newCourse.originalPrice),
      image: newCourse.image || "/images/full-stact-development.png",
      duration: newCourse.duration,
      level: newCourse.level,
      instructor: newCourse.instructor,
      badge: newCourse.badge,
      overview: newCourse.overview,
      rating: 4.95,
      ratingCount: 140,
      hours: newCourse.duration,
      icon: "code",
      tagline: "Industry Certified",
    };

    try {
      const res = await api.createCourse(payload);
      if (res && res.data) {
        setCoursesList([res.data, ...coursesList]);
      } else {
        setCoursesList([payload, ...coursesList]);
      }
      setShowAddCourse(false);
      setNewCourse({
        title: "",
        category: "fullstack",
        price: 79,
        originalPrice: 180,
        image: "/images/full-stact-development.png",
        duration: "40 hrs • 8 Production Projects",
        level: "Intermediate",
        instructor: "Netcoder Senior Faculty & FAANG Mentors",
        badge: "Featured",
        overview: "",
      });
      alert("🎉 Course created successfully! Live in Laravel REST API and LMS Explore.");
    } catch (err) {
      console.warn("Course create error, falling back locally:", err);
      setCoursesList([payload, ...coursesList]);
      setShowAddCourse(false);
      alert("Course created successfully in catalog.");
    } finally {
      setLoadingCourseAction(false);
    }
  };

  const handleDeleteCourse = async (idOrSlug, title) => {
    if (!confirm(`Are you sure you want to delete course "${title}"?`)) return;
    try {
      await api.deleteCourse(idOrSlug);
    } catch (err) {
      console.warn("Course delete fallback:", err);
    }
    setCoursesList((prev) => prev.filter((c) => c.id !== idOrSlug && c.slug !== idOrSlug));
  };

  return (
    <div style={{ minHeight: "100vh", background: "#f8fafc", padding: "40px 20px" }}>
      <div className="container" style={{ maxWidth: "1150px" }}>
        {/* TOP BAR */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: "#ffffff", padding: "20px 30px", borderRadius: "18px", border: "1px solid #e2e8f0", marginBottom: "30px", boxShadow: "0 4px 20px rgba(0,0,0,0.03)" }}>
          <div>
            <h1 style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", margin: 0 }}>
              Netcoder Portal Dashboard
            </h1>
            <p style={{ margin: "4px 0 0", color: "#64748b", fontSize: "0.88rem" }}>
              Welcome back, <strong>{adminUser}</strong> • System Online
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            <a
              href="/mentor"
              target="_blank"
              style={{ textDecoration: "none", padding: "8px 16px", borderRadius: "20px", border: "1px solid #ff5532", background: "#fff5f3", color: "#ff5532", fontWeight: 700, fontSize: "0.82rem" }}
            >
              🧑‍🏫 Mentor Portal ↗
            </a>
            <a
              href="/lms"
              target="_blank"
              style={{ textDecoration: "none", padding: "8px 16px", borderRadius: "20px", border: "1px solid #e2e8f0", background: "#ffffff", color: "#334155", fontWeight: 700, fontSize: "0.82rem" }}
            >
              🎓 Student LMS
            </a>
            <button
              onClick={() => setShowAddClass(true)}
              style={{ padding: "8px 18px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 700, background: "#ff5532", color: "#fff", boxShadow: "0 4px 12px rgba(255,85,50,0.3)" }}
            >
              🔴 + Schedule Live Class
            </button>
            <button
              onClick={() => setShowAddCourse(true)}
              className="color-btn"
              style={{ padding: "8px 18px", borderRadius: "20px", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 700, background: "#0f172a", color: "#fff" }}
            >
              + Upload Course
            </button>
            <button
              onClick={() => setShowAddBlog(true)}
              style={{ padding: "8px 18px", borderRadius: "20px", border: "1px solid #e2e8f0", background: "#ffffff", cursor: "pointer", fontSize: "0.85rem", fontWeight: 600, color: "#334155" }}
            >
              + Create Article
            </button>
            <button
              onClick={handleLogout}
              style={{ padding: "8px 16px", borderRadius: "20px", border: "1px solid #e2e8f0", background: "#ffffff", color: "#ef4444", fontWeight: 600, cursor: "pointer", fontSize: "0.85rem" }}
            >
              Log Out ⏻
            </button>
          </div>
        </div>

        {/* METRICS ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "30px" }}>
          <div style={{ background: "#ffffff", padding: "20px", borderRadius: "16px", border: "2px solid #fed7aa" }}>
            <span style={{ color: "#ff5532", fontSize: "0.82rem", fontWeight: 800, textTransform: "uppercase" }}>🔴 Live Classes</span>
            <div style={{ fontSize: "1.9rem", fontWeight: 800, color: "#ff5532", marginTop: "4px" }}>{classesList.length}</div>
            <span style={{ color: "#10b981", fontSize: "0.76rem", fontWeight: 600 }}>✓ Auto-Live Broadcaster</span>
          </div>

          <div style={{ background: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
            <span style={{ color: "#64748b", fontSize: "0.82rem", fontWeight: 600, textTransform: "uppercase" }}>Mentor Notes</span>
            <div style={{ fontSize: "1.9rem", fontWeight: 800, color: "#0f172a", marginTop: "4px" }}>{notesList.length}</div>
            <span style={{ color: "#3b82f6", fontSize: "0.76rem", fontWeight: 600 }}>Study Materials</span>
          </div>

          <div style={{ background: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
            <span style={{ color: "#64748b", fontSize: "0.82rem", fontWeight: 600, textTransform: "uppercase" }}>LMS Courses</span>
            <div style={{ fontSize: "1.9rem", fontWeight: 800, color: "#0f172a", marginTop: "4px" }}>{coursesList.length}</div>
            <span style={{ color: "#10b981", fontSize: "0.76rem", fontWeight: 600 }}>✓ Laravel REST API Sync</span>
          </div>

          <div style={{ background: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
            <span style={{ color: "#64748b", fontSize: "0.82rem", fontWeight: 600, textTransform: "uppercase" }}>LMS Students</span>
            <div style={{ fontSize: "1.9rem", fontWeight: 800, color: "#3b82f6", marginTop: "4px" }}>{lmsStudents.length}</div>
            <span style={{ color: "#10b981", fontSize: "0.76rem", fontWeight: 600 }}>🛡️ 100% DRM Protected</span>
          </div>

          <div style={{ background: "#ffffff", padding: "20px", borderRadius: "16px", border: "1px solid #e2e8f0" }}>
            <span style={{ color: "#64748b", fontSize: "0.82rem", fontWeight: 600, textTransform: "uppercase" }}>Published Blogs</span>
            <div style={{ fontSize: "1.9rem", fontWeight: 800, color: "#0f172a", marginTop: "4px" }}>{blogsList.length}</div>
            <span style={{ color: "#64748b", fontSize: "0.76rem" }}>✓ Active in CMS</span>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div style={{ display: "flex", gap: "10px", marginBottom: "25px", borderBottom: "2px solid #e2e8f0", paddingBottom: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() => setActiveTab("classes")}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              background: activeTab === "classes" ? "#ff5532" : "transparent",
              color: activeTab === "classes" ? "#fff" : "#64748b",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <span>🔴 Live Classes &amp; Links</span>
            <span style={{ background: activeTab === "classes" ? "rgba(255,255,255,0.25)" : "#ff5532", color: "#fff", fontSize: "0.72rem", padding: "2px 7px", borderRadius: "10px" }}>
              {classesList.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("mentorHub")}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              background: activeTab === "mentorHub" ? "#ff5532" : "transparent",
              color: activeTab === "mentorHub" ? "#fff" : "#64748b",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <span>📝 Mentor Notes &amp; Hub</span>
            <span style={{ background: activeTab === "mentorHub" ? "rgba(255,255,255,0.25)" : "#ff5532", color: "#fff", fontSize: "0.72rem", padding: "2px 7px", borderRadius: "10px" }}>
              {notesList.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("courses")}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              background: activeTab === "courses" ? "#ff5532" : "transparent",
              color: activeTab === "courses" ? "#fff" : "#64748b",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <span>🎓 LMS Courses</span>
            <span style={{ background: activeTab === "courses" ? "rgba(255,255,255,0.25)" : "#ff5532", color: "#fff", fontSize: "0.72rem", padding: "2px 7px", borderRadius: "10px" }}>
              {coursesList.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab("lms")}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              background: activeTab === "lms" ? "#ff5532" : "transparent",
              color: activeTab === "lms" ? "#fff" : "#64748b",
              fontWeight: 700,
              cursor: "pointer",
              display: "inline-flex",
              alignItems: "center",
              gap: "6px"
            }}
          >
            <span>🛡️ LMS &amp; DRM Security ({lmsStudents.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("overview")}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              background: activeTab === "overview" ? "#ff5532" : "transparent",
              color: activeTab === "overview" ? "#fff" : "#64748b",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Articles ({blogsList.length})
          </button>
          <button
            onClick={() => setActiveTab("feedback")}
            style={{
              padding: "10px 20px",
              borderRadius: "10px",
              border: "none",
              background: activeTab === "feedback" ? "#ff5532" : "transparent",
              color: activeTab === "feedback" ? "#fff" : "#64748b",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Feedback ({feedbackList.length})
          </button>
        </div>

        {/* TAB 0: LIVE CLASSES & DIRECT MEETING LINKS */}
        {activeTab === "classes" && (
          <div style={{ background: "#ffffff", borderRadius: "16px", border: "2px solid #fed7aa", overflow: "hidden", marginBottom: "30px" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #ffd8cf", background: "#fffaf7", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span style={{ background: "#ff5532", color: "#fff", padding: "2px 8px", borderRadius: "6px", fontSize: "0.72rem", fontWeight: 800 }}>LIVE BROADCAST ENGINE</span>
                  <span style={{ color: "#ff5532", fontSize: "0.78rem", fontWeight: 700 }}>Direct Enrolled Student Access</span>
                </div>
                <strong style={{ fontSize: "1.2rem", color: "#0f172a", display: "block", marginTop: "4px" }}>
                  Interactive Live Classes &amp; Meeting Links
                </strong>
                <p style={{ margin: "2px 0 0", color: "#64748b", fontSize: "0.82rem" }}>
                  Class links published here are automatically displayed on enrolled students' dashboards with 1-click launch.
                </p>
              </div>
              <button
                onClick={() => setShowAddClass(true)}
                style={{ padding: "8px 16px", borderRadius: "10px", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 700, background: "#ff5532", color: "#fff" }}
              >
                + Schedule Live Class
              </button>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ background: "#f8fafc", textAlign: "left", color: "#64748b", borderBottom: "1px solid #e2e8f0" }}>
                  <th style={{ padding: "14px 20px" }}>Class Topic &amp; Cohort</th>
                  <th style={{ padding: "14px 20px" }}>Course Target</th>
                  <th style={{ padding: "14px 20px" }}>Direct Meeting Link</th>
                  <th style={{ padding: "14px 20px" }}>Schedule Time</th>
                  <th style={{ padding: "14px 20px" }}>Mentor</th>
                  <th style={{ padding: "14px 20px" }}>Status</th>
                  <th style={{ padding: "14px 20px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {classesList.map((cls) => {
                  const isLive = cls.status === "live";
                  return (
                    <tr key={cls.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "16px 20px" }}>
                        <strong style={{ color: "#0f172a", fontSize: "0.92rem", display: "block" }}>{cls.title}</strong>
                        <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{cls.batch || "Cohort 2026"}</span>
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <span style={{ background: "#fff5f2", color: "#ff5532", padding: "3px 8px", borderRadius: "6px", fontSize: "0.74rem", fontWeight: 700 }}>
                          {cls.courseTitle || cls.courseSlug}
                        </span>
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ background: "#eff6ff", color: "#2563eb", padding: "2px 6px", borderRadius: "4px", fontSize: "0.72rem", fontWeight: 700 }}>
                            {cls.platform}
                          </span>
                          <a
                            href={cls.meetingLink}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "#ff5532", textDecoration: "underline", fontSize: "0.8rem", fontWeight: 600 }}
                          >
                            Launch ↗
                          </a>
                        </div>
                        {cls.passcode && (
                          <div style={{ fontSize: "0.72rem", color: "#64748b", marginTop: "2px" }}>
                            Passcode: <strong>{cls.passcode}</strong>
                          </div>
                        )}
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <div style={{ fontWeight: 600, fontSize: "0.82rem", color: "#0f172a" }}>{cls.time}</div>
                        <div style={{ fontSize: "0.74rem", color: "#64748b" }}>{cls.date}</div>
                      </td>
                      <td style={{ padding: "16px 20px", fontWeight: 600, color: "#475569" }}>
                        {cls.mentorName}
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        {isLive ? (
                          <span style={{ background: "#fee2e2", color: "#dc2626", padding: "3px 8px", borderRadius: "10px", fontSize: "0.72rem", fontWeight: 800 }}>
                            ● LIVE NOW
                          </span>
                        ) : cls.status === "completed" ? (
                          <span style={{ background: "#f1f5f9", color: "#64748b", padding: "3px 8px", borderRadius: "10px", fontSize: "0.72rem", fontWeight: 600 }}>
                            Completed
                          </span>
                        ) : (
                          <span style={{ background: "#ecfdf5", color: "#059669", padding: "3px 8px", borderRadius: "10px", fontSize: "0.72rem", fontWeight: 700 }}>
                            Upcoming
                          </span>
                        )}
                      </td>
                      <td style={{ padding: "16px 20px", textAlign: "right", whiteSpace: "nowrap" }}>
                        <button
                          onClick={() => handleToggleClassStatus(cls.id, isLive ? "completed" : "live")}
                          style={{ padding: "5px 10px", borderRadius: "6px", border: "1px solid #fed7aa", background: isLive ? "#fee2e2" : "#fff5f2", color: isLive ? "#dc2626" : "#ff5532", fontSize: "0.75rem", fontWeight: 700, cursor: "pointer", marginRight: "6px" }}
                        >
                          {isLive ? "End Live" : "🔴 Go Live"}
                        </button>
                        <button
                          onClick={() => handleDeleteClass(cls.id)}
                          style={{ padding: "5px 10px", borderRadius: "6px", border: "none", background: "transparent", color: "#ef4444", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer" }}
                        >
                          Delete ✕
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB: MENTOR NOTES & HUB */}
        {activeTab === "mentorHub" && (
          <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", marginBottom: "30px" }}>
            <div style={{ padding: "20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <strong style={{ fontSize: "1.1rem", color: "#0f172a" }}>Mentor Handbooks &amp; Notes Repository</strong>
                <p style={{ margin: "2px 0 0", color: "#64748b", fontSize: "0.82rem" }}>
                  Course study materials uploaded by faculty mentors and available to enrolled students.
                </p>
              </div>
              <a
                href="/mentor"
                target="_blank"
                style={{ textDecoration: "none", background: "#ff5532", color: "#fff", padding: "7px 14px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 700 }}
              >
                Launch Mentor Portal ↗
              </a>
            </div>

            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ background: "#f8fafc", textAlign: "left", color: "#64748b" }}>
                  <th style={{ padding: "14px 20px" }}>Note Title</th>
                  <th style={{ padding: "14px 20px" }}>Course Target</th>
                  <th style={{ padding: "14px 20px" }}>Module</th>
                  <th style={{ padding: "14px 20px" }}>Mentor</th>
                  <th style={{ padding: "14px 20px" }}>File Size</th>
                  <th style={{ padding: "14px 20px", textAlign: "right" }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {notesList.map((n) => (
                  <tr key={n.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                    <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>
                      {n.title}
                    </td>
                    <td style={{ padding: "16px 20px", color: "#ff5532", fontWeight: 600 }}>
                      {n.courseTitle}
                    </td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>
                      {n.module}
                    </td>
                    <td style={{ padding: "16px 20px", color: "#475569", fontWeight: 600 }}>
                      {n.mentorName}
                    </td>
                    <td style={{ padding: "16px 20px", color: "#64748b" }}>
                      {n.fileSize}
                    </td>
                    <td style={{ padding: "16px 20px", textAlign: "right" }}>
                      <a
                        href={n.fileUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{ color: "#ff5532", fontWeight: 700, fontSize: "0.78rem", textDecoration: "none", padding: "4px 8px", borderRadius: "6px", background: "#fff5f2" }}
                      >
                        Download ↗
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 1: ARTICLES */}
        {activeTab === "overview" && (
          <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <div style={{ padding: "20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <strong style={{ fontSize: "1.1rem", color: "#0f172a" }}>Live Tech Articles</strong>
              <button
                onClick={() => setShowAddBlog(true)}
                className="color-btn"
                style={{ padding: "6px 14px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "0.8rem" }}
              >
                + New Post
              </button>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ background: "#f8fafc", textAlign: "left", color: "#64748b" }}>
                  <th style={{ padding: "14px 20px" }}>Title</th>
                  <th style={{ padding: "14px 20px" }}>Category</th>
                  <th style={{ padding: "14px 20px" }}>Author</th>
                  <th style={{ padding: "14px 20px" }}>Date</th>
                  <th style={{ padding: "14px 20px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loadingApi ? (
                  <tr>
                    <td colSpan={5} style={{ padding: "20px" }}>
                      <TableRowsSkeleton columns={5} rows={3} />
                    </td>
                  </tr>
                ) : (
                  blogsList.map((b) => (
                    <tr key={b.id || b.slug} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>
                        {b.title}
                      </td>
                      <td style={{ padding: "16px 20px", color: "#ff5532", fontWeight: 600 }}>
                        {b.category}
                      </td>
                      <td style={{ padding: "16px 20px", color: "#64748b" }}>
                        {b.author}
                      </td>
                      <td style={{ padding: "16px 20px", color: "#64748b" }}>
                        {b.date}
                      </td>
                      <td style={{ padding: "16px 20px", textAlign: "right" }}>
                        <a href={`/blog/${b.slug}`} target="_blank" rel="noopener noreferrer" style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 600, marginRight: "12px" }}>
                          View ↗
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB: COURSES & LMS MANAGEMENT */}
        {activeTab === "courses" && (
          <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden", marginBottom: "25px" }}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", background: "#fcfdfe" }}>
              <div>
                <strong style={{ fontSize: "1.1rem", color: "#0f172a" }}>LMS Production Courses (Laravel Backend Live Sync)</strong>
                <p style={{ margin: "2px 0 0", color: "#64748b", fontSize: "0.82rem" }}>
                  Admin manual upload for <strong>Text, Image &amp; Price</strong>. Instantly connected to Laravel REST API and frontend LMS explore &amp; checkout.
                </p>
              </div>
              <button
                onClick={() => setShowAddCourse(true)}
                className="color-btn"
                style={{ padding: "9px 20px", borderRadius: "10px", border: "none", cursor: "pointer", fontSize: "0.85rem", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "6px", background: "#ff5532", color: "#fff" }}
              >
                <span>+ Upload New Course</span>
              </button>
            </div>

            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.88rem" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left", color: "#64748b" }}>
                    <th style={{ padding: "14px 20px" }}>Course &amp; Image</th>
                    <th style={{ padding: "14px 20px" }}>Category &amp; Level</th>
                    <th style={{ padding: "14px 20px" }}>Live Price</th>
                    <th style={{ padding: "14px 20px" }}>Instructor</th>
                    <th style={{ padding: "14px 20px" }}>Rating</th>
                    <th style={{ padding: "14px 20px", textAlign: "right" }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingCourses ? (
                    <tr>
                      <td colSpan={6} style={{ padding: "20px" }}>
                        <TableRowsSkeleton columns={6} rows={5} />
                      </td>
                    </tr>
                  ) : coursesList.length === 0 ? (
                    <tr>
                      <td colSpan={6} style={{ padding: "50px 20px", textAlign: "center", color: "#64748b" }}>
                        No courses found. Click "+ Upload New Course" above to add your first course with Text, Image and Price!
                      </td>
                    </tr>
                  ) : (
                    coursesList.map((course) => {
                      const priceVal = Number(course.price ?? course.fee ?? 79);
                      const origVal = Number(course.originalPrice ?? course.original_price ?? Math.round(priceVal * 2));
                      const imageVal = course.image || "/images/full-stact-development.png";

                      return (
                        <tr key={course.id || course.slug} style={{ borderBottom: "1px solid #f1f5f9" }}>
                          <td style={{ padding: "14px 20px" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                              <img
                                src={imageVal}
                                alt={course.title}
                                style={{ width: "54px", height: "38px", objectFit: "cover", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                                onError={(e) => { e.currentTarget.src = "/images/full-stact-development.png"; }}
                              />
                              <div>
                                <strong style={{ color: "#0f172a", display: "block", fontSize: "0.9rem" }}>
                                  {course.title}
                                </strong>
                                <span style={{ color: "#94a3b8", fontSize: "0.75rem", fontFamily: "monospace" }}>
                                  /{course.slug}
                                </span>
                              </div>
                            </div>
                          </td>
                          <td style={{ padding: "14px 20px" }}>
                            <span style={{ background: "#fff5f3", color: "#ff5532", padding: "3px 8px", borderRadius: "8px", fontSize: "0.74rem", fontWeight: 700, textTransform: "uppercase", display: "inline-block", marginBottom: "4px" }}>
                              {course.category || "fullstack"}
                            </span>
                            <div style={{ color: "#64748b", fontSize: "0.75rem" }}>
                              {course.level || "Intermediate"}
                            </div>
                          </td>
                          <td style={{ padding: "14px 20px" }}>
                            <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
                              <strong style={{ fontSize: "1.05rem", color: "#0f172a" }}>${priceVal}</strong>
                              <span style={{ fontSize: "0.78rem", color: "#94a3b8", textDecoration: "line-through" }}>${origVal}</span>
                            </div>
                            <span style={{ color: "#10b981", fontSize: "0.72rem", fontWeight: 600 }}>Active in API</span>
                          </td>
                          <td style={{ padding: "14px 20px", color: "#475569", fontSize: "0.82rem" }}>
                            {course.instructor || "Netcoder Faculty"}
                          </td>
                          <td style={{ padding: "14px 20px" }}>
                            <span style={{ color: "#f59e0b", fontWeight: 700, fontSize: "0.85rem" }}>★ {course.rating || 4.9}</span>
                          </td>
                          <td style={{ padding: "14px 20px", textAlign: "right" }}>
                            <div style={{ display: "inline-flex", gap: "8px", alignItems: "center" }}>
                              <a
                                href={`/lms/explore`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#3b82f6", textDecoration: "none", fontWeight: 600, fontSize: "0.78rem", padding: "5px 10px", borderRadius: "6px", background: "#eff6ff" }}
                              >
                                View LMS ↗
                              </a>
                              <a
                                href={`/lms/checkout?course=${course.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#ff5532", textDecoration: "none", fontWeight: 600, fontSize: "0.78rem", padding: "5px 10px", borderRadius: "6px", background: "#fff5f3" }}
                              >
                                Checkout ↗
                              </a>
                              <button
                                onClick={() => handleDeleteCourse(course.id || course.slug, course.title)}
                                style={{ color: "#ef4444", background: "transparent", border: "1px solid #fee2e2", padding: "5px 10px", borderRadius: "6px", cursor: "pointer", fontSize: "0.78rem", fontWeight: 600 }}
                              >
                                Delete ✕
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: FEEDBACK */}
        {activeTab === "feedback" && (
          <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
            <div style={{ padding: "20px", borderBottom: "1px solid #e2e8f0" }}>
              <strong style={{ fontSize: "1.1rem", color: "#0f172a" }}>Seminar &amp; Workshop Feedback Records</strong>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
              <thead>
                <tr style={{ background: "#f8fafc", textAlign: "left", color: "#64748b" }}>
                  <th style={{ padding: "14px 20px" }}>Student</th>
                  <th style={{ padding: "14px 20px" }}>Phone / Contact</th>
                  <th style={{ padding: "14px 20px" }}>Course &amp; Semester</th>
                  <th style={{ padding: "14px 20px" }}>Assessment</th>
                  <th style={{ padding: "14px 20px" }}>Interested Courses</th>
                  <th style={{ padding: "14px 20px" }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {loadingApi ? (
                  <tr>
                    <td colSpan={6} style={{ padding: "20px" }}>
                      <TableRowsSkeleton columns={6} rows={3} />
                    </td>
                  </tr>
                ) : (
                  feedbackList.map((f) => (
                    <tr key={f.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                      <td style={{ padding: "16px 20px", fontWeight: 600, color: "#0f172a" }}>
                        {f.student_name}
                        {f.email && <div style={{ fontSize: "0.78rem", color: "#94a3b8" }}>{f.email}</div>}
                      </td>
                      <td style={{ padding: "16px 20px", color: "#334155" }}>
                        {f.contact_number}
                      </td>
                      <td style={{ padding: "16px 20px", color: "#64748b" }}>
                        {f.course} ({f.semester})
                      </td>
                      <td style={{ padding: "16px 20px" }}>
                        <span style={{ background: "#ecfdf5", color: "#059669", padding: "4px 10px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: 600 }}>
                          ★ {f.overall_assessment}
                        </span>
                      </td>
                      <td style={{ padding: "16px 20px", fontSize: "0.8rem", color: "#475569" }}>
                        {Array.isArray(f.interested_courses) ? f.interested_courses.join(", ") : f.interested_courses}
                      </td>
                      <td style={{ padding: "16px 20px", color: "#94a3b8", fontSize: "0.8rem" }}>
                        {f.created_at}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: LMS & DRM SECURITY */}
        {activeTab === "lms" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* DRM ENGINE STATUS BANNER */}
            <div
              style={{
                background: "linear-gradient(135deg, #111827 0%, #1f2937 100%)",
                borderRadius: "18px",
                padding: "26px 30px",
                color: "#ffffff",
                boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
                border: "1px solid rgba(255,255,255,0.08)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "15px" }}>
                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)", padding: "4px 12px", borderRadius: "20px", fontSize: "0.78rem", color: "#34d399", fontWeight: 700, marginBottom: "10px" }}>
                    <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#10b981", boxShadow: "0 0 10px #10b981", display: "inline-block" }}></span>
                    DRM HARDENED &bull; ZERO-LEAK ACTIVE
                  </div>
                  <h2 style={{ margin: "0 0 6px 0", fontSize: "1.45rem", fontWeight: 800 }}>
                    Netcoder LMS Digital Rights Management (DRM) Shield
                  </h2>
                  <p style={{ margin: 0, color: "#9ca3af", fontSize: "0.9rem", maxWidth: "680px" }}>
                    Course streams, lectures, and code assets are protected against unauthorized screen captures, downloads, right-click dumping, and DevTools scraping.
                  </p>
                </div>
                <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                  <button
                    onClick={() => setDrmStrictness(!drmStrictness)}
                    style={{
                      background: drmStrictness ? "#ff5532" : "#374151",
                      color: "#ffffff",
                      border: "none",
                      padding: "9px 18px",
                      borderRadius: "10px",
                      fontWeight: 700,
                      cursor: "pointer",
                      fontSize: "0.85rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    🛡️ Strict Shield: {drmStrictness ? "MAXIMUM (ON)" : "STANDARD"}
                  </button>
                </div>
              </div>

              {/* 4 CORE DRM PILLARS */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "16px", marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ background: "rgba(255,255,255,0.04)", padding: "14px 18px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: "0.78rem", color: "#9ca3af", textTransform: "uppercase", fontWeight: 700 }}>Anti-Screenshot</div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#34d399", marginTop: "4px" }}>Active &amp; Hooked</div>
                  <div style={{ fontSize: "0.76rem", color: "#6b7280", marginTop: "4px" }}>Blocks PrintScreen, Win+Shift+S, Cmd+Shift+3/4</div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.04)", padding: "14px 18px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: "0.78rem", color: "#9ca3af", textTransform: "uppercase", fontWeight: 700 }}>Anti-Download</div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#34d399", marginTop: "4px" }}>nodownload Enforced</div>
                  <div style={{ fontSize: "0.76rem", color: "#6b7280", marginTop: "4px" }}>Disabled contextmenu, media dumping &amp; inspect</div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.04)", padding: "14px 18px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: "0.78rem", color: "#9ca3af", textTransform: "uppercase", fontWeight: 700 }}>Dynamic Watermark</div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#34d399", marginTop: "4px" }}>Drifting Live Stamp</div>
                  <div style={{ fontSize: "0.76rem", color: "#6b7280", marginTop: "4px" }}>User Name, Netcoder ID, &amp; dynamic positioning</div>
                </div>

                <div style={{ background: "rgba(255,255,255,0.04)", padding: "14px 18px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.06)" }}>
                  <div style={{ fontSize: "0.78rem", color: "#9ca3af", textTransform: "uppercase", fontWeight: 700 }}>Focus Loss Obfuscation</div>
                  <div style={{ fontSize: "1.05rem", fontWeight: 700, color: "#34d399", marginTop: "4px" }}>Instant Frosted Blur</div>
                  <div style={{ fontSize: "0.76rem", color: "#6b7280", marginTop: "4px" }}>Blurs stream upon screen recording / alt-tab</div>
                </div>
              </div>

              {/* QUICK VERIFICATION ACTIONS */}
              <div style={{ marginTop: "20px", display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
                <span style={{ fontSize: "0.82rem", color: "#9ca3af", marginRight: "4px" }}>Test Live DRM Player:</span>
                <a
                  href="/lms/courses/fullstack-web-development"
                  target="_blank"
                  style={{ textDecoration: "none", background: "#ff5532", color: "#fff", padding: "7px 14px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 700 }}
                >
                  ▶ Open Full Stack Classroom
                </a>
                <a
                  href="/lms/courses/data-science-machine-learning"
                  target="_blank"
                  style={{ textDecoration: "none", background: "rgba(255,255,255,0.1)", color: "#fff", padding: "7px 14px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600 }}
                >
                  ▶ Open Data Science Classroom
                </a>
                <a
                  href="/lms/dashboard"
                  target="_blank"
                  style={{ textDecoration: "none", background: "rgba(255,255,255,0.1)", color: "#fff", padding: "7px 14px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600 }}
                >
                  🎓 Student Dashboard
                </a>
                <a
                  href="/lms"
                  target="_blank"
                  style={{ textDecoration: "none", background: "rgba(255,255,255,0.1)", color: "#fff", padding: "7px 14px", borderRadius: "8px", fontSize: "0.8rem", fontWeight: 600 }}
                >
                  🌐 LMS Public Gateway
                </a>
              </div>
            </div>

            {/* ENROLLED STUDENTS TABLE */}
            <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", overflow: "hidden" }}>
              <div style={{ padding: "20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <strong style={{ fontSize: "1.1rem", color: "#0f172a" }}>Enrolled Students &amp; DRM Sessions</strong>
                  <p style={{ margin: "3px 0 0", color: "#64748b", fontSize: "0.82rem" }}>
                    Track student progress, authenticated sessions, and DRM security compliance in real time.
                  </p>
                </div>
                <span style={{ background: "#f1f5f9", padding: "6px 12px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 700, color: "#334155" }}>
                  {lmsStudents.length} Active Students
                </span>
              </div>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.9rem" }}>
                <thead>
                  <tr style={{ background: "#f8fafc", textAlign: "left", color: "#64748b" }}>
                    <th style={{ padding: "14px 20px" }}>Student &amp; ID</th>
                    <th style={{ padding: "14px 20px" }}>Enrolled Course</th>
                    <th style={{ padding: "14px 20px" }}>Progress</th>
                    <th style={{ padding: "14px 20px" }}>DRM Shield</th>
                    <th style={{ padding: "14px 20px" }}>Last Active</th>
                    <th style={{ padding: "14px 20px", textAlign: "right" }}>Classroom Action</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingApi ? (
                    <tr>
                      <td colSpan={6} style={{ padding: "20px" }}>
                        <TableRowsSkeleton columns={6} rows={4} />
                      </td>
                    </tr>
                  ) : (
                    lmsStudents.map((s) => (
                      <tr key={s.id} style={{ borderBottom: "1px solid #f1f5f9" }}>
                        <td style={{ padding: "16px 20px" }}>
                          <div style={{ fontWeight: 700, color: "#0f172a" }}>{s.name}</div>
                          <div style={{ fontSize: "0.78rem", color: "#64748b" }}>{s.email} &bull; <code style={{ background: "#f1f5f9", padding: "1px 5px", borderRadius: "4px" }}>{s.id}</code></div>
                        </td>
                        <td style={{ padding: "16px 20px", color: "#334155", fontWeight: 600 }}>
                          {s.course}
                        </td>
                        <td style={{ padding: "16px 20px", minWidth: "150px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.78rem", marginBottom: "4px", color: "#64748b" }}>
                            <span>{s.completedLessons}/{s.totalLessons} Lessons</span>
                            <strong style={{ color: "#ff5532" }}>{s.progress}%</strong>
                          </div>
                          <div style={{ height: "6px", background: "#f1f5f9", borderRadius: "10px", overflow: "hidden" }}>
                            <div style={{ width: `${s.progress}%`, height: "100%", background: "linear-gradient(90deg, #ff5532, #ff7354)", borderRadius: "10px" }}></div>
                          </div>
                        </td>
                        <td style={{ padding: "16px 20px" }}>
                          <span style={{ background: "#ecfdf5", color: "#059669", padding: "4px 10px", borderRadius: "12px", fontSize: "0.8rem", fontWeight: 700, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                            ✓ {s.drmStatus}
                          </span>
                        </td>
                        <td style={{ padding: "16px 20px", color: "#64748b", fontSize: "0.82rem" }}>
                          {s.lastActive}
                        </td>
                        <td style={{ padding: "16px 20px", textAlign: "right" }}>
                          <a
                            href={`/lms/courses/${s.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-block",
                              background: "#ff5532",
                              color: "#ffffff",
                              textDecoration: "none",
                              padding: "6px 12px",
                              borderRadius: "6px",
                              fontSize: "0.8rem",
                              fontWeight: 700
                            }}
                          >
                            View Classroom ↗
                          </a>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* RECENT DRM AUDIT LOG */}
            <div style={{ background: "#ffffff", borderRadius: "16px", border: "1px solid #e2e8f0", padding: "20px" }}>
              <strong style={{ fontSize: "1rem", color: "#0f172a", display: "block", marginBottom: "12px" }}>
                🛡️ Recent DRM Security &amp; Protection Audit Log
              </strong>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "0.85rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", background: "#f8fafc", borderRadius: "8px" }}>
                  <span style={{ color: "#10b981", fontWeight: 700 }}>[SUCCESS]</span>
                  <span style={{ color: "#334155" }}>Anti-Screenshot: PrintScreen &amp; Win+Shift+S blocked on course video canvas.</span>
                  <span style={{ marginLeft: "auto", color: "#94a3b8", fontSize: "0.78rem" }}>Just now</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", background: "#f8fafc", borderRadius: "8px" }}>
                  <span style={{ color: "#10b981", fontWeight: 700 }}>[ENFORCED]</span>
                  <span style={{ color: "#334155" }}>Anti-Download: Video element rendered with <code>controlsList="nodownload"</code> &amp; right click disabled.</span>
                  <span style={{ marginLeft: "auto", color: "#94a3b8", fontSize: "0.78rem" }}>2 mins ago</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", background: "#f8fafc", borderRadius: "8px" }}>
                  <span style={{ color: "#10b981", fontWeight: 700 }}>[STAMPED]</span>
                  <span style={{ color: "#334155" }}>Watermark Engine: Generated active drifting stamp for <code>Sahil Sandhu (demo-001)</code>.</span>
                  <span style={{ marginLeft: "auto", color: "#94a3b8", fontSize: "0.78rem" }}>5 mins ago</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", background: "#f8fafc", borderRadius: "8px" }}>
                  <span style={{ color: "#10b981", fontWeight: 700 }}>[OBSCURED]</span>
                  <span style={{ color: "#334155" }}>Focus Shield: Screen recording / window blur triggered frosted protective defense.</span>
                  <span style={{ marginLeft: "auto", color: "#94a3b8", fontSize: "0.78rem" }}>12 mins ago</span>
                </div>
              </div>
            </div>
          </div>
        )}
        {showAddBlog && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              zIndex: 99999
            }}
          >
            <div style={{ background: "#ffffff", borderRadius: "20px", padding: "35px", maxWidth: "540px", width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ margin: 0, fontSize: "1.3rem" }}>Create New Tech Article</h3>
                <span onClick={() => setShowAddBlog(false)} style={{ cursor: "pointer", fontSize: "22px", color: "#999" }}>✕</span>
              </div>
              <form onSubmit={handleAddBlogSubmit}>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px" }}>Article Title</label>
                  <input
                    type="text"
                    required
                    value={newBlog.title}
                    onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
                    placeholder="e.g. Mastering React 19 and Next.js"
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                  />
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px" }}>Category</label>
                  <select
                    value={newBlog.category}
                    onChange={(e) => setNewBlog({ ...newBlog, category: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                  >
                    <option value="Web Development">Web Development</option>
                    <option value="Cyber Security">Cyber Security</option>
                    <option value="Data Science & AI">Data Science & AI</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                  </select>
                </div>
                <div style={{ marginBottom: "15px" }}>
                  <label style={{ display: "block", fontSize: "0.85rem", fontWeight: 600, marginBottom: "4px" }}>Short Excerpt / Summary</label>
                  <textarea
                    rows={3}
                    required
                    value={newBlog.excerpt}
                    onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
                    placeholder="Brief description of the article..."
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", border: "1px solid #cbd5e1" }}
                  />
                </div>
                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                  <button type="button" onClick={() => setShowAddBlog(false)} style={{ padding: "10px 18px", borderRadius: "8px", border: "1px solid #e2e8f0", background: "#f8fafc", cursor: "pointer" }}>
                    Cancel
                  </button>
                  <button type="submit" className="color-btn" style={{ padding: "10px 22px", borderRadius: "8px", border: "none", cursor: "pointer" }}>
                    Publish Post
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* MODAL: ADD NEW COURSE */}
        {showAddCourse && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.65)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              zIndex: 99999
            }}
          >
            <div style={{ background: "#ffffff", borderRadius: "24px", padding: "30px", maxWidth: "680px", width: "100%", maxHeight: "90vh", overflowY: "auto", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 800, color: "#0f172a" }}>Upload New LMS Course</h3>
                  <p style={{ margin: "2px 0 0", color: "#64748b", fontSize: "0.8rem" }}>
                    Manual Data Upload: Text, Image &amp; Price synced to Laravel Backend &amp; Frontend
                  </p>
                </div>
                <span onClick={() => setShowAddCourse(false)} style={{ cursor: "pointer", fontSize: "24px", color: "#94a3b8", lineHeight: 1 }}>✕</span>
              </div>

              <form onSubmit={handleAddCourseSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {/* Title */}
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "5px", color: "#334155" }}>Course Title (Text) *</label>
                  <input
                    type="text"
                    required
                    value={newCourse.title}
                    onChange={(e) => setNewCourse({ ...newCourse, title: e.target.value })}
                    placeholder="e.g. Cloud DevOps &amp; Kubernetes Production Masterclass"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>

                {/* Category & Level */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "5px", color: "#334155" }}>Category</label>
                    <select
                      value={newCourse.category}
                      onChange={(e) => setNewCourse({ ...newCourse, category: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                    >
                      <option value="fullstack">Full-Stack Development</option>
                      <option value="cloud">Cloud &amp; DevOps</option>
                      <option value="ai">AI &amp; Machine Learning</option>
                      <option value="cyber">Cybersecurity</option>
                      <option value="systems">System Architecture</option>
                      <option value="mobile">Mobile App Development</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "5px", color: "#334155" }}>Level</label>
                    <select
                      value={newCourse.level}
                      onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                    >
                      <option value="Flagship Bootcamp">Flagship Bootcamp</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Beginner to Advanced">Beginner to Advanced</option>
                      <option value="Advanced Production">Advanced Production</option>
                    </select>
                  </div>
                </div>

                {/* Price and Original Price */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "5px", color: "#334155" }}>Selling Price ($ / ₹) *</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={newCourse.price}
                      onChange={(e) => setNewCourse({ ...newCourse, price: Number(e.target.value) })}
                      placeholder="79"
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "5px", color: "#334155" }}>Original Price (Strikethrough)</label>
                    <input
                      type="number"
                      required
                      min={0}
                      value={newCourse.originalPrice}
                      onChange={(e) => setNewCourse({ ...newCourse, originalPrice: Number(e.target.value) })}
                      placeholder="180"
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                    />
                  </div>
                </div>

                {/* Course Image URL & Presets */}
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "5px", color: "#334155" }}>Course Thumbnail Image URL *</label>
                  <input
                    type="text"
                    required
                    value={newCourse.image}
                    onChange={(e) => setNewCourse({ ...newCourse, image: e.target.value })}
                    placeholder="https://... or /images/..."
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem", marginBottom: "8px" }}
                  />
                  {/* Preset quick buttons */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center" }}>
                    <span style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600 }}>Quick Presets:</span>
                    {[
                      { label: "💻 Full-Stack", url: "/images/full-stact-development.png" },
                      { label: "☁️ DevOps & Cloud", url: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800" },
                      { label: "🤖 AI & ML", url: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800" },
                      { label: "🛡️ Cyber Security", url: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800" },
                      { label: "📱 Mobile App", url: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800" },
                    ].map((p) => (
                      <button
                        key={p.label}
                        type="button"
                        onClick={() => setNewCourse({ ...newCourse, image: p.url })}
                        style={{
                          fontSize: "0.72rem",
                          padding: "4px 8px",
                          borderRadius: "6px",
                          border: newCourse.image === p.url ? "1px solid #ff5532" : "1px solid #e2e8f0",
                          background: newCourse.image === p.url ? "#fff5f3" : "#ffffff",
                          color: newCourse.image === p.url ? "#ff5532" : "#475569",
                          cursor: "pointer",
                          fontWeight: 600
                        }}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>

                  {/* Thumbnail preview */}
                  {newCourse.image && (
                    <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "10px", padding: "8px 12px", background: "#f8fafc", borderRadius: "10px", border: "1px solid #e2e8f0" }}>
                      <img
                        src={newCourse.image}
                        alt="Preview"
                        style={{ width: "64px", height: "42px", objectFit: "cover", borderRadius: "6px" }}
                        onError={(e) => { e.currentTarget.src = "/images/full-stact-development.png"; }}
                      />
                      <span style={{ fontSize: "0.75rem", color: "#64748b" }}>Live Image Preview</span>
                    </div>
                  )}
                </div>

                {/* Duration & Instructor & Badge */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "5px", color: "#334155" }}>Duration</label>
                    <input
                      type="text"
                      value={newCourse.duration}
                      onChange={(e) => setNewCourse({ ...newCourse, duration: e.target.value })}
                      placeholder="40 hrs • 8 Projects"
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.85rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "5px", color: "#334155" }}>Instructor</label>
                    <input
                      type="text"
                      value={newCourse.instructor}
                      onChange={(e) => setNewCourse({ ...newCourse, instructor: e.target.value })}
                      placeholder="Faculty Name"
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.85rem" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "5px", color: "#334155" }}>Badge</label>
                    <input
                      type="text"
                      value={newCourse.badge}
                      onChange={(e) => setNewCourse({ ...newCourse, badge: e.target.value })}
                      placeholder="Featured"
                      style={{ width: "100%", padding: "10px 12px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.85rem" }}
                    />
                  </div>
                </div>

                {/* Overview Text */}
                <div>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, marginBottom: "5px", color: "#334155" }}>Course Overview / Description (Text) *</label>
                  <textarea
                    rows={3}
                    required
                    value={newCourse.overview}
                    onChange={(e) => setNewCourse({ ...newCourse, overview: e.target.value })}
                    placeholder="Comprehensive production curriculum covering real architectural patterns..."
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", fontSize: "0.88rem" }}
                  />
                </div>

                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "8px" }}>
                  <button
                    type="button"
                    onClick={() => setShowAddCourse(false)}
                    style={{ padding: "10px 20px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", fontWeight: 600 }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loadingCourseAction}
                    className="color-btn"
                    style={{ padding: "10px 24px", borderRadius: "10px", border: "none", cursor: "pointer", fontWeight: 700, opacity: loadingCourseAction ? 0.7 : 1, background: "#ff5532", color: "#fff" }}
                  >
                    {loadingCourseAction ? "Uploading to Laravel API..." : "Publish Course to Catalog"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* LIVE CLASS MODAL */}
        {showAddClass && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(15, 23, 42, 0.6)",
              backdropFilter: "blur(4px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px",
              zIndex: 99999,
            }}
          >
            <div style={{ background: "#ffffff", borderRadius: "24px", padding: "32px", maxWidth: "560px", width: "100%", maxHeight: "90vh", overflowY: "auto", border: "2px solid #fed7aa", boxShadow: "0 25px 60px rgba(255, 85, 50, 0.15)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "18px" }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: "1.3rem", fontWeight: 800, color: "#ff5532" }}>🔴 Schedule Live Class Link</h3>
                  <span style={{ fontSize: "0.8rem", color: "#64748b" }}>Broadcasts directly to students enrolled in this course</span>
                </div>
                <span onClick={() => setShowAddClass(false)} style={{ cursor: "pointer", fontSize: "24px", color: "#94a3b8" }}>✕</span>
              </div>

              <form onSubmit={handleCreateClassSubmit}>
                <div style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>Class Topic / Title *</label>
                  <input
                    type="text"
                    required
                    value={newClass.title}
                    onChange={(e) => setNewClass({ ...newClass, title: e.target.value })}
                    placeholder="e.g. Live System Design & Microservices"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                  />
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>Target Enrolled Course Track *</label>
                  <select
                    value={newClass.courseSlug}
                    onChange={(e) => setNewClass({ ...newClass, courseSlug: e.target.value })}
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                  >
                    {coursesList.map((c) => (
                      <option key={c.slug || c.id} value={c.slug}>
                        {c.title} ({c.slug})
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>Meeting Platform</label>
                    <select
                      value={newClass.platform}
                      onChange={(e) => setNewClass({ ...newClass, platform: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                    >
                      <option value="Google Meet">Google Meet</option>
                      <option value="Zoom">Zoom</option>
                      <option value="Microsoft Teams">Microsoft Teams</option>
                      <option value="YouTube Live">YouTube Live</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>Cohort / Batch Name</label>
                    <input
                      type="text"
                      value={newClass.batch}
                      onChange={(e) => setNewClass({ ...newClass, batch: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: "14px" }}>
                  <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>Live Meeting URL / Link *</label>
                  <input
                    type="url"
                    required
                    value={newClass.meetingLink}
                    onChange={(e) => setNewClass({ ...newClass, meetingLink: e.target.value })}
                    placeholder="https://meet.google.com/xyz or Zoom URL"
                    style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "14px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>Date *</label>
                    <input
                      type="date"
                      required
                      value={newClass.date}
                      onChange={(e) => setNewClass({ ...newClass, date: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>Time Slot Display</label>
                    <input
                      type="text"
                      required
                      value={newClass.time}
                      onChange={(e) => setNewClass({ ...newClass, time: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "18px" }}>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>Passcode / Room PIN</label>
                    <input
                      type="text"
                      value={newClass.passcode}
                      onChange={(e) => setNewClass({ ...newClass, passcode: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: "0.82rem", fontWeight: 700, color: "#334155", marginBottom: "4px" }}>Faculty Mentor</label>
                    <input
                      type="text"
                      value={newClass.mentorName}
                      onChange={(e) => setNewClass({ ...newClass, mentorName: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", borderRadius: "10px", border: "1px solid #cbd5e1", boxSizing: "border-box" }}
                    />
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                  <button
                    type="button"
                    onClick={() => setShowAddClass(false)}
                    style={{ padding: "10px 18px", borderRadius: "10px", border: "1px solid #e2e8f0", background: "#f8fafc", cursor: "pointer", fontWeight: 600 }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{ padding: "10px 22px", borderRadius: "10px", border: "none", cursor: "pointer", fontWeight: 700, background: "#ff5532", color: "#fff", boxShadow: "0 4px 14px rgba(255,85,50,0.35)" }}
                  >
                    Publish Class Link to Students
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
