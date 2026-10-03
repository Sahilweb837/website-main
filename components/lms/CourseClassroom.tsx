"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { COURSES } from "@/data/courses";
import { LMS_COURSES } from "@/data/lms-courses";
import { DEFAULT_LESSONS, type Lesson } from "@/data/lms-data";
import SecureLMSGuard from "@/components/lms/SecureLMSGuard";
import { useAuth } from "@/lib/auth/context";
import PaymentCheckoutModal from "@/components/lms/PaymentCheckoutModal";
import { ClassroomSkeleton } from "@/components/lms/CourseSkeleton";
import { api } from "@/lib/api";
import {
  INITIAL_CLASSES, INITIAL_NOTES, INITIAL_TASKS, calculateAutomatedClassStatus,
  type LiveClass, type MentorNote, type MentorTask
} from "@/data/lms-mentor-data";

interface CourseClassroomProps {
  slug: string;
  initialLessonId?: string;
}

export default function CourseClassroom({ slug, initialLessonId }: CourseClassroomProps) {
  const { isEnrolled, isAuthLoaded, user, loginAsDemo } = useAuth();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [dynamicCourse, setDynamicCourse] = useState<any>(null);
  const [isCourseLoading, setIsCourseLoading] = useState(true);

  // Mentor & Live Class State for this course
  const [courseClasses, setCourseClasses] = useState<LiveClass[]>(() => {
    return INITIAL_CLASSES.filter(
      (c) => c.courseSlug === slug || slug.includes(c.courseSlug) || c.courseSlug.includes(slug)
    ).map((c) => ({ ...c, status: calculateAutomatedClassStatus(c) }));
  });
  const [courseNotes, setCourseNotes] = useState<MentorNote[]>(() => {
    return INITIAL_NOTES.filter(
      (n) => n.courseSlug === slug || slug.includes(n.courseSlug) || n.courseSlug.includes(slug)
    );
  });
  const [courseTasks, setCourseTasks] = useState<MentorTask[]>(() => {
    return INITIAL_TASKS.filter(
      (t) => t.courseSlug === slug || slug.includes(t.courseSlug) || t.courseSlug.includes(slug)
    );
  });
  const [copiedClassId, setCopiedClassId] = useState<string | null>(null);

  // Fetch updated classes, notes, and tasks
  useEffect(() => {
    let isMounted = true;
    async function loadMentorData() {
      try {
        const clsRes = await api.getLiveClasses({ courseSlug: slug });
        if (isMounted && clsRes?.data && Array.isArray(clsRes.data) && clsRes.data.length > 0) {
          setCourseClasses(clsRes.data.map((c: LiveClass) => ({ ...c, status: calculateAutomatedClassStatus(c) })));
        }
      } catch (e) {}

      try {
        const notesRes = await api.getNotes(slug);
        if (isMounted && notesRes?.data && Array.isArray(notesRes.data) && notesRes.data.length > 0) {
          setCourseNotes(notesRes.data);
        }
      } catch (e) {}

      try {
        const tasksRes = await api.getTasks(slug);
        if (isMounted && tasksRes?.data && Array.isArray(tasksRes.data) && tasksRes.data.length > 0) {
          setCourseTasks(tasksRes.data);
        }
      } catch (e) {}
    }
    loadMentorData();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const activeLiveClass = useMemo(() => {
    const live = courseClasses.find((c) => c.status === "live");
    if (live) return live;
    const upcoming = courseClasses.find((c) => c.status === "upcoming");
    return upcoming || courseClasses[0];
  }, [courseClasses]);

  const handleCopyLink = (link: string, id: string) => {
    navigator.clipboard.writeText(link);
    setCopiedClassId(id);
    setTimeout(() => setCopiedClassId(null), 2000);
  };

  // Dynamically fetch course from Laravel / Next.js REST API
  useEffect(() => {
    let isMounted = true;
    async function loadCourse() {
      setIsCourseLoading(true);
      try {
        const res = await api.getCourseBySlug(slug);
        if (isMounted && res && res.data) {
          setDynamicCourse(res.data);
        }
      } catch (err) {
        console.warn("[LMS Classroom] Dynamic fetch fallback:", err);
      } finally {
        if (isMounted) setIsCourseLoading(false);
      }
    }
    loadCourse();
    return () => {
      isMounted = false;
    };
  }, [slug]);

  const course = useMemo(() => {
    if (dynamicCourse) {
      return {
        slug: dynamicCourse.slug,
        title: dynamicCourse.title,
        overview: dynamicCourse.overview,
        image: dynamicCourse.image || "/images/full-stact-development.png",
        duration: dynamicCourse.duration || "40 hrs",
        level: dynamicCourse.level || "Intermediate",
        price: Number(dynamicCourse.price ?? dynamicCourse.fee ?? 79),
        originalPrice: Number(dynamicCourse.originalPrice ?? dynamicCourse.original_price ?? 180),
        instructor: dynamicCourse.instructor || "Netcoder Senior Faculty",
        syllabus: Array.isArray(dynamicCourse.syllabus)
          ? dynamicCourse.syllabus.map((s: any) => ({
            module: s.module || s.title || "Module",
            title: s.title || s.module || "Topic",
            desc: Array.isArray(s.lessons) ? s.lessons.join(", ") : (s.desc || ""),
          }))
          : [],
      };
    }

    const lmsMatch = LMS_COURSES.find((c) => c.slug === slug);
    if (lmsMatch) {
      return {
        slug: lmsMatch.slug,
        title: lmsMatch.title,
        overview: lmsMatch.overview,
        image: lmsMatch.image,
        duration: lmsMatch.duration,
        level: lmsMatch.level,
        price: lmsMatch.price,
        originalPrice: lmsMatch.originalPrice,
        instructor: lmsMatch.instructor,
        syllabus: lmsMatch.syllabus?.map((s) => ({
          module: s.module,
          title: s.module,
          desc: s.lessons.join(", "),
        })) || [],
      };
    }
    return (
      COURSES.find((c) => c.slug === slug) || {
        slug,
        title: slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        overview: "Professional technical training curriculum from Netcoder Technology.",
        image: "/images/full-stact-development.png",
        duration: "3 - 6 Months",
        level: "All Levels",
        syllabus: [],
      }
    );
  }, [slug, dynamicCourse]);

  // Check enrollment
  const enrolled = isEnrolled(slug);

  // Lessons list from LMS_COURSES syllabus, DEFAULT_LESSONS, or fallback
  const lessons: Lesson[] = useMemo(() => {
    const lmsMatch = LMS_COURSES.find((c) => c.slug === slug);
    if (lmsMatch && lmsMatch.syllabus && lmsMatch.syllabus.length > 0) {
      const extracted: Lesson[] = [];
      let counter = 1;
      lmsMatch.syllabus.forEach((mod) => {
        mod.lessons.forEach((lTitle) => {
          extracted.push({
            id: `les-${counter}`,
            title: lTitle,
            duration: "25 mins",
            completed: counter === 1,
          });
          counter++;
        });
      });
      return extracted;
    }
    if (DEFAULT_LESSONS[slug] && DEFAULT_LESSONS[slug].length > 0) {
      return DEFAULT_LESSONS[slug];
    }
    if (course.syllabus && course.syllabus.length > 0) {
      return (course.syllabus as any[]).map((s: any, idx: number) => ({
        id: `mod-${idx + 1}`,
        title: `${s.module || s.title || `Module ${idx + 1}`}: ${s.title || ""}`,
        duration: "25 mins",
        completed: idx === 0,
      }));
    }
    return [
      { id: "les-1", title: "1. Orientation & Course Roadmap", duration: "15 mins", completed: true },
      { id: "les-2", title: "2. Setting Up Your Development Environment", duration: "25 mins", completed: false },
      { id: "les-3", title: "3. Core Fundamentals & Practical Concepts", duration: "35 mins", completed: false },
      { id: "les-4", title: "4. Building Your First Hands-On Module", duration: "45 mins", completed: false },
      { id: "les-5", title: "5. Capstone Project Brief & Deployment", duration: "50 mins", completed: false },
    ];
  }, [slug, course]);

  // Active lesson state
  const [currentLessonId, setCurrentLessonId] = useState<string>(
    initialLessonId || lessons[0]?.id || "les-1"
  );

  // Completed lessons tracking
  const [completedLessons, setCompletedLessons] = useState<string[]>(() => {
    return lessons.filter((l) => l.completed).map((l) => l.id);
  });

  const [activeTab, setActiveTab] = useState<"notes" | "exercise" | "mentor" | "live">("notes");
  const [isPlaying, setIsPlaying] = useState(false);
  const [doubtText, setDoubtText] = useState("");
  const [doubts, setDoubts] = useState<Array<{ q: string; a: string; time: string }>>([
    {
      q: "How can I deploy this project to a live production server?",
      a: "Instructor: In Module 9, we walk through live deployment on AWS and Vercel with custom domain setup.",
      time: "2 hours ago",
    },
  ]);

  const activeLesson = lessons.find((l) => l.id === currentLessonId) || lessons[0];
  const activeIndex = lessons.findIndex((l) => l.id === currentLessonId);
  const isCompleted = completedLessons.includes(currentLessonId);

  const toggleComplete = (id: string) => {
    setCompletedLessons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNextLesson = () => {
    if (activeIndex < lessons.length - 1) {
      setCurrentLessonId(lessons[activeIndex + 1].id);
    }
  };

  const handlePrevLesson = () => {
    if (activeIndex > 0) {
      setCurrentLessonId(lessons[activeIndex - 1].id);
    }
  };

  const handleAskDoubt = (e: React.FormEvent) => {
    e.preventDefault();
    if (!doubtText.trim()) return;
    setDoubts([
      {
        q: doubtText,
        a: "Mentor Nitin Kapoor: Great question! Our faculty is reviewing and will post detailed guidance shortly.",
        time: "Just now",
      },
      ...doubts,
    ]);
    setDoubtText("");
  };

  const progressPercent = Math.round(
    (completedLessons.length / Math.max(lessons.length, 1)) * 100
  );

  // Display high-performance skeleton shimmer while authenticating or fetching course data from backend
  if (!isAuthLoaded || (isCourseLoading && !dynamicCourse && !LMS_COURSES.some((c) => c.slug === slug))) {
    return <ClassroomSkeleton />;
  }

  // If user is not logged in, require student authentication
  if (isAuthLoaded && !user) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto text-3xl font-bold">
            <span className="material-symbols-outlined text-3xl">lock</span>
          </div>
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200 inline-block">
              Netcoder LMS Portal
            </span>
            <h2 className="text-2xl font-black text-slate-900">Student Login Required</h2>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Please log in to your student account to access lectures, course materials, and coding sandboxes for <strong>{course.title}</strong>.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              href={`/login?redirect=/lms/classroom/${slug}`}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-sm shadow-md transition"
            >
              Log In as Student
            </Link>
            <button
              type="button"
              onClick={() => loginAsDemo(`/lms/classroom/${slug}`)}
              className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition"
            >
              Try Demo Student Account
            </button>
          </div>
        </div>
      </div>
    );
  }

  // If user is not enrolled, show Payment Paywall
  if (isAuthLoaded && !enrolled) {
    const coursePrice = (course as any).price || 89;
    const courseOriginalPrice = (course as any).originalPrice || coursePrice * 2.2;

    return (
      <SecureLMSGuard showWatermark={false} contentTitle={course.title}>
        <div className="max-w-4xl mx-auto py-10 px-4 space-y-6">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-200 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600" />

            <div className="w-20 h-20 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto text-4xl shadow-inner">
              <span className="material-symbols-outlined text-4xl">lock</span>
            </div>

            <div className="max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full border border-orange-200 inline-block">
                Course Enrollment Required
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Classroom Access Locked
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Complete your enrollment for <strong>{course.title}</strong> to unlock full video lectures, interactive cloud sandboxes, and instructor code audits.
              </p>
            </div>

            {/* Course Summary Card */}
            <div className="max-w-lg mx-auto bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src={course.image || "/images/full-stact-development.png"}
                  alt={course.title}
                  className="w-20 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm text-slate-900 truncate">{course.title}</h4>
                  <p className="text-xs text-slate-500">{course.duration || "3 - 6 Months"} • {lessons.length} Modules</p>
                  <div className="text-lg font-black text-slate-900 mt-1">
                    ${coursePrice} <span className="text-xs text-slate-400 font-normal line-through">${courseOriginalPrice}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-slate-600 space-y-2 pt-2 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Instant browser-based terminal sandbox &amp; live cluster access</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Full modular curriculum with video lessons &amp; practical assignments</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>1-on-1 pull request reviews from senior FAANG instructors</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>Verified tamper-proof certificate of completion</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link
                href="/lms/explore"
                className="w-full sm:w-auto px-6 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-bold transition-all text-center"
              >
                Back to Explore Catalog
              </Link>
              <button
                type="button"
                onClick={() => setShowCheckoutModal(true)}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Complete Payment &amp; Unlock (${coursePrice})</span>
                <span className="material-symbols-outlined text-[18px]">bolt</span>
              </button>
            </div>
          </div>

          <PaymentCheckoutModal
            course={{
              slug: course.slug,
              title: course.title,
              price: coursePrice,
              originalPrice: courseOriginalPrice,
              image: course.image,
              instructor: (course as any).instructor,
              duration: course.duration,
              level: course.level,
            }}
            isOpen={showCheckoutModal}
            onClose={() => setShowCheckoutModal(false)}
          />
        </div>
      </SecureLMSGuard>
    );
  }

  return (
    <SecureLMSGuard showWatermark={true} contentTitle={course.title}>
      <div className="space-y-6 max-w-7xl mx-auto pb-12">
        {/* Top Header & Security Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Link href="/lms/dashboard" className="hover:text-orange-600 transition">
                Dashboard
              </Link>
              <span>/</span>
              <Link href="/lms/courses" className="hover:text-orange-600 transition">
                My Courses
              </Link>
              <span>/</span>
              <span className="text-slate-900 font-semibold">{course.title}</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-slate-900">{course.title}</h1>
          </div>

          <div className="flex items-center gap-3">
            {/* DRM Shield Badge */}
            <div
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold border"
              style={{
                background: "rgba(255, 85, 50, 0.08)",
                borderColor: "rgba(255, 85, 50, 0.3)",
                color: "#ff5532",
              }}
            >
              <i className="fa-solid fa-shield-halved"></i>
              <span>DRM Protected (No Screenshot / Download)</span>
            </div>

            <span className="text-xs px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 font-semibold">
              {completedLessons.length}/{lessons.length} Completed ({progressPercent}%)
            </span>
          </div>
        </div>

        {/* Live Mentorship Notification Banner if active/scheduled */}
        {activeLiveClass && (
          <div
            className="rounded-2xl p-4 md:p-5 shadow-sm border flex flex-wrap items-center justify-between gap-4 transition-all"
            style={{
              background: activeLiveClass.status === "live" ? "linear-gradient(90deg, #fff7f5 0%, #ffffff 100%)" : "#ffffff",
              borderColor: activeLiveClass.status === "live" ? "#ff5532" : "#fed7aa",
            }}
          >
            <div className="flex items-center gap-3.5">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0"
                style={{
                  background: activeLiveClass.status === "live" ? "#ff5532" : "#fff5f2",
                  color: activeLiveClass.status === "live" ? "#ffffff" : "#ff5532",
                  boxShadow: activeLiveClass.status === "live" ? "0 4px 12px rgba(255,85,50,0.35)" : "none",
                }}
              >
                <i className={`fa-solid ${activeLiveClass.status === "live" ? "fa-broadcast-tower" : "fa-video"}`}></i>
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  {activeLiveClass.status === "live" ? (
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-red-600 text-white tracking-wide flex items-center gap-1.5 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                      ● Live Now with Mentor
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
                      Scheduled Live Class
                    </span>
                  )}
                  <span className="text-xs font-bold text-slate-900">{activeLiveClass.title}</span>
                  {activeLiveClass.isAutomatedDaily && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                      🔁 Daily Auto Sync
                    </span>
                  )}
                </div>
                <div className="text-xs text-slate-500 flex flex-wrap items-center gap-3">
                  <span>Mentor: <strong className="text-slate-800">{activeLiveClass.mentorName}</strong></span>
                  <span>&bull;</span>
                  <span>{activeLiveClass.date} ({activeLiveClass.startTime} - {activeLiveClass.endTime} IST)</span>
                  <span>&bull;</span>
                  <span className="font-semibold text-orange-600">Platform: {activeLiveClass.platform}</span>
                  {activeLiveClass.passcode && (
                    <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200 font-mono text-[11px]">
                      Pass: <strong>{activeLiveClass.passcode}</strong>
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleCopyLink(activeLiveClass.meetingLink, activeLiveClass.id)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition cursor-pointer"
              >
                <i className={`fa-solid ${copiedClassId === activeLiveClass.id ? "fa-check text-green-600" : "fa-copy"}`}></i>
                <span>{copiedClassId === activeLiveClass.id ? "Copied" : "Copy Link"}</span>
              </button>

              <a
                href={activeLiveClass.meetingLink}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-xl text-xs font-extrabold text-white flex items-center gap-2 transition shadow-md"
                style={{ background: "linear-gradient(135deg, #ff5532 0%, #ff7354 100%)" }}
              >
                <i className="fa-solid fa-video"></i>
                <span>Join Live Meeting ↗</span>
              </a>
            </div>
          </div>
        )}

        {/* Main Learning Classroom Grid (Video Player + Playlist Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT 2 COLUMNS: Video Player & Lesson Notes */}
          <div className="lg:col-span-2 space-y-6">
            {/* The Video Cinema Box */}
            <div
              className="bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative"
              onContextMenu={(e) => e.preventDefault()}
            >
              {/* Aspect Ratio Video Container */}
              <div className="relative aspect-video bg-slate-900 flex items-center justify-center overflow-hidden">
                {/* Simulated Protected Video Stream */}
                <video
                  controls
                  controlsList="nodownload nofullscreen"
                  disablePictureInPicture={true}
                  poster={course.image}
                  onContextMenu={(e) => e.preventDefault()}
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  className="w-full h-full object-cover"
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" type="video/mp4" />
                  Your browser does not support HTML5 video.
                </video>

                {/* Overlaid DRM Protection Watermark Badge inside Player */}
                <div
                  className="absolute bottom-4 right-4 pointer-events-none opacity-40 text-right text-[11px] font-bold text-white select-none"
                  style={{ textShadow: "0 1px 3px rgba(0,0,0,0.8)" }}
                >
                  🔒 Netcoder Protected Stream
                </div>
              </div>

              {/* Video Sub-bar & Controls */}
              <div className="p-4 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 border-t border-slate-800">
                <div>
                  <span className="text-xs text-orange-400 font-bold uppercase tracking-wider">
                    Current Lesson {activeIndex + 1} of {lessons.length}
                  </span>
                  <h3 className="text-base font-bold text-white mt-0.5">{activeLesson.title}</h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrevLesson}
                    disabled={activeIndex === 0}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    title="Previous Lesson"
                  >
                    <i className="fa-solid fa-backward-step"></i>
                    <span>Prev</span>
                  </button>

                  <button
                    onClick={() => toggleComplete(currentLessonId)}
                    className="px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition cursor-pointer"
                    style={{
                      background: isCompleted ? "#059669" : "linear-gradient(135deg, #ff5532 0%, #ff7354 100%)",
                      color: "#ffffff",
                      boxShadow: isCompleted
                        ? "0 4px 12px rgba(16, 185, 129, 0.3)"
                        : "0 4px 12px rgba(255, 85, 50, 0.35)",
                    }}
                  >
                    <i className={`fa-solid ${isCompleted ? "fa-circle-check" : "fa-check"}`}></i>
                    <span>{isCompleted ? "Completed ✓" : "Mark as Completed"}</span>
                  </button>

                  <button
                    onClick={handleNextLesson}
                    disabled={activeIndex === lessons.length - 1}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white text-xs font-semibold flex items-center gap-1.5 transition cursor-pointer"
                    title="Next Lesson"
                  >
                    <span>Next</span>
                    <i className="fa-solid fa-forward-step"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Lesson Tabs (Live Classes / Notes / Exercise / Mentor Q&A) */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex border-b border-slate-200 gap-4 mb-6 overflow-x-auto">
                <button
                  onClick={() => setActiveTab("live")}
                  className={`pb-3 text-sm font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${activeTab === "live"
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  style={{ color: activeTab === "live" ? "#ff5532" : undefined }}
                >
                  <i className="fa-solid fa-tower-broadcast"></i>
                  <span>Live Classes ({courseClasses.length})</span>
                  {courseClasses.some((c) => c.status === "live") && (
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("notes")}
                  className={`pb-3 text-sm font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${activeTab === "notes"
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  style={{ color: activeTab === "notes" ? "#ff5532" : undefined }}
                >
                  <i className="fa-solid fa-book-open"></i>
                  <span>Lesson Notes &amp; Guides ({courseNotes.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab("exercise")}
                  className={`pb-3 text-sm font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${activeTab === "exercise"
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  style={{ color: activeTab === "exercise" ? "#ff5532" : undefined }}
                >
                  <i className="fa-solid fa-code"></i>
                  <span>Assignments &amp; Tasks ({courseTasks.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab("mentor")}
                  className={`pb-3 text-sm font-bold border-b-2 transition flex items-center gap-2 shrink-0 ${activeTab === "mentor"
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-slate-500 hover:text-slate-800"
                    }`}
                  style={{ color: activeTab === "mentor" ? "#ff5532" : undefined }}
                >
                  <i className="fa-solid fa-comments"></i>
                  <span>Ask Mentor &amp; Discussion</span>
                </button>
              </div>

              {/* Tab 0: Live Classes & Direct Links */}
              {activeTab === "live" && (
                <div className="space-y-4 text-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-base font-bold text-slate-900">
                        Live Cohort Sessions &amp; Mentorship Schedule
                      </h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Interactive sessions directly connected to Zoom &amp; Google Meet rooms.
                      </p>
                    </div>
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 border border-orange-200">
                      {courseClasses.length} Scheduled
                    </span>
                  </div>

                  {courseClasses.length === 0 ? (
                    <div className="p-8 text-center bg-orange-50/40 rounded-2xl border border-dashed border-orange-200">
                      <i className="fa-solid fa-calendar-xmark text-3xl text-orange-400 mb-2"></i>
                      <div className="font-bold text-slate-800 text-sm">No Live Classes Scheduled Currently</div>
                      <div className="text-xs text-slate-500 mt-1">Check back soon or post a query to the faculty mentors.</div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {courseClasses.map((cls) => {
                        const isLive = cls.status === "live";
                        return (
                          <div
                            key={cls.id}
                            className="p-4 rounded-xl border flex flex-wrap items-center justify-between gap-4 transition-all"
                            style={{
                              background: isLive ? "#fff7f5" : "#ffffff",
                              borderColor: isLive ? "#ff5532" : "#e2e8f0",
                            }}
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                {isLive ? (
                                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-red-600 text-white animate-pulse">
                                    ● Live Now
                                  </span>
                                ) : cls.status === "upcoming" ? (
                                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                                    Upcoming
                                  </span>
                                ) : (
                                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                    Completed
                                  </span>
                                )}
                                <span className="font-bold text-slate-900 text-sm">{cls.title}</span>
                              </div>
                              <div className="text-xs text-slate-500 flex flex-wrap items-center gap-3">
                                <span>Mentor: <strong className="text-slate-700">{cls.mentorName}</strong></span>
                                <span>&bull;</span>
                                <span>{cls.date} ({cls.startTime} - {cls.endTime} IST)</span>
                                <span>&bull;</span>
                                <span className="font-semibold text-orange-600">Platform: {cls.platform}</span>
                                {cls.passcode && (
                                  <span className="bg-slate-100 px-2 py-0.5 rounded font-mono text-[11px] border border-slate-200">
                                    Pass: <strong>{cls.passcode}</strong>
                                  </span>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleCopyLink(cls.meetingLink, cls.id)}
                                className="px-3 py-1.5 rounded-lg text-xs font-semibold border border-slate-200 hover:bg-slate-50 text-slate-700 flex items-center gap-1.5 transition cursor-pointer"
                              >
                                <i className={`fa-solid ${copiedClassId === cls.id ? "fa-check text-green-600" : "fa-copy"}`}></i>
                                <span>{copiedClassId === cls.id ? "Copied" : "Copy"}</span>
                              </button>

                              <a
                                href={cls.meetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-1.5 rounded-lg text-xs font-bold text-white flex items-center gap-1.5 transition shadow-sm"
                                style={{ background: isLive ? "#ff5532" : "#ea580c" }}
                              >
                                <i className="fa-solid fa-video"></i>
                                <span>{isLive ? "Join Live Now" : "Launch Meeting"} ↗</span>
                              </a>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}

              {/* Tab 1: Lesson Notes */}
              {activeTab === "notes" && (
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed select-none">
                  <h4 className="text-base font-bold text-slate-900">
                    Key Concepts in {activeLesson.title}
                  </h4>
                  <p>
                    In this lesson, you will master the architectural fundamentals, live execution
                    patterns, and production-ready conventions required by modern software organizations.
                  </p>

                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-2">
                    <p className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                      Module Learning Outcomes:
                    </p>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-600">
                      <li>Understand modular structure, best practice separation, and component hierarchies.</li>
                      <li>Write clean, maintainable code avoiding anti-patterns and performance bottlenecks.</li>
                      <li>Deploy test runs locally with proper debugging and terminal workflows.</li>
                    </ul>
                  </div>

                  {/* Course Handbooks & Mentor Notes */}
                  {courseNotes.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          <i className="fa-solid fa-file-pdf text-orange-600"></i>
                          <span>Faculty Study Notes &amp; Handbooks</span>
                        </h5>
                        <span className="text-xs text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                          {courseNotes.length} Guides
                        </span>
                      </div>
                      <div className="space-y-2">
                        {courseNotes.map((note) => (
                          <div key={note.id} className="p-3 bg-orange-50/40 border border-orange-100 rounded-xl flex items-center justify-between gap-3">
                            <div>
                              <div className="font-bold text-slate-900 text-xs">{note.title}</div>
                              <div className="text-[11px] text-slate-500 mt-0.5">By {note.mentorName} &bull; {note.publishedAt} {note.fileSize ? `(${note.fileSize})` : ""}</div>
                            </div>
                            <a
                              href={note.fileUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                              className="px-3.5 py-1.5 rounded-lg text-xs font-bold text-white flex items-center gap-1.5 shadow-sm"
                              style={{ background: "#ff5532" }}
                            >
                              <i className="fa-solid fa-download"></i>
                              <span>Download PDF</span>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <p className="text-xs text-slate-500 italic pt-2">
                    🔒 Protected Netcoder Study Materials. Unauthorized reproduction or dissemination
                    is strictly prohibited under student enrollment policies.
                  </p>
                </div>
              )}

              {/* Tab 2: Practical Assignment */}
              {activeTab === "exercise" && (
                <div className="space-y-4 text-sm">
                  <h4 className="text-base font-bold text-slate-900">Hands-on Challenge</h4>
                  <p className="text-slate-600">
                    Implement the module exercise outlined in this session. Write your solution in
                    your local IDE, test it against test cases, and verify with your mentor.
                  </p>

                  <div className="bg-slate-900 text-slate-200 rounded-xl p-4 font-mono text-xs">
                    <div className="text-orange-400 mb-1">// Challenge: Implement lesson requirements</div>
                    <div>1. Create module entry point in your workspace</div>
                    <div>2. Implement error handling and async validation</div>
                    <div>3. Push to your GitHub repo and submit link below</div>
                  </div>

                  {/* Mentor Assigned Tasks for this Course */}
                  {courseTasks.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-slate-200">
                      <div className="flex items-center justify-between mb-3">
                        <h5 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                          <i className="fa-solid fa-list-check text-orange-600"></i>
                          <span>Mentor Assigned Practical Tasks</span>
                        </h5>
                        <span className="text-xs text-orange-600 font-bold bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                          {courseTasks.length} Active
                        </span>
                      </div>
                      <div className="space-y-3">
                        {courseTasks.map((t) => (
                          <div key={t.id} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900 text-sm">{t.title}</span>
                              <span className="font-bold text-orange-600 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">+{t.points} XP</span>
                            </div>
                            <p className="text-slate-600">{t.description}</p>
                            <div className="flex items-center justify-between text-slate-500 pt-1">
                              <span>Due Date: <strong>{t.dueDate}</strong> &bull; Mentor: {t.mentorName}</span>
                              <span
                                onClick={() => alert(`Task submission ready for: ${t.title}`)}
                                className="text-orange-600 font-bold hover:underline cursor-pointer"
                              >
                                Submit Solution →
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2">
                    <button
                      onClick={() => alert("Assignment submission received! Mentor will review.")}
                      className="px-5 py-2.5 rounded-xl font-bold text-white text-xs cursor-pointer shadow-md"
                      style={{ background: "linear-gradient(135deg, #ff5532 0%, #ff7354 100%)" }}
                    >
                      Submit Completed Project Link
                    </button>
                  </div>
                </div>
              )}

              {/* Tab 3: Mentor Help */}
              {activeTab === "mentor" && (
                <div className="space-y-4 text-sm">
                  <form onSubmit={handleAskDoubt} className="space-y-3">
                    <label className="block text-xs font-bold text-slate-700">
                      HAVE A QUESTION ABOUT THIS LESSON?
                    </label>
                    <textarea
                      rows={3}
                      value={doubtText}
                      onChange={(e) => setDoubtText(e.target.value)}
                      placeholder="Ask your query here — instructor Nitin Kapoor and mentors answer within a few hours..."
                      className="w-full p-3 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <button
                      type="submit"
                      className="px-5 py-2.5 rounded-xl font-bold text-white text-xs cursor-pointer shadow-sm"
                      style={{ background: "linear-gradient(135deg, #ff5532 0%, #ff7354 100%)" }}
                    >
                      Post Question to Mentors
                    </button>
                  </form>

                  <div className="space-y-3 pt-4 border-t border-slate-200">
                    <p className="font-bold text-xs text-slate-800 uppercase tracking-wider">
                      Recent Q&amp;A on this Course:
                    </p>
                    {doubts.map((d, i) => (
                      <div key={i} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
                        <div className="font-bold text-slate-900 flex justify-between">
                          <span>Q: {d.q}</span>
                          <span className="text-slate-400 font-normal">{d.time}</span>
                        </div>
                        <p className="text-slate-600">{d.a}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT 1 COLUMN: Curriculum Playlist Sidebar */}
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base text-slate-900">Course Syllabus</h3>
                <span className="text-xs font-semibold text-slate-500">{lessons.length} Lessons</span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-slate-600">
                  <span>Track Progress</span>
                  <span style={{ color: "#ff5532" }}>{progressPercent}%</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${progressPercent}%`,
                      background: "linear-gradient(90deg, #ff5532 0%, #ff8568 100%)",
                    }}
                  />
                </div>
              </div>

              {/* Playlist List */}
              <div className="space-y-2 max-h-[560px] overflow-y-auto pr-1">
                {lessons.map((lesson, idx) => {
                  const isCurrent = lesson.id === currentLessonId;
                  const isDone = completedLessons.includes(lesson.id);

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setCurrentLessonId(lesson.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between gap-3 cursor-pointer ${isCurrent
                          ? "border-orange-500 bg-orange-50/70 shadow-sm"
                          : "border-slate-200 hover:bg-slate-50"
                        }`}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div
                          className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${isDone
                              ? "bg-emerald-100 text-emerald-700"
                              : isCurrent
                                ? "bg-orange-500 text-white"
                                : "bg-slate-100 text-slate-600"
                            }`}
                        >
                          {isDone ? "✓" : idx + 1}
                        </div>
                        <div className="truncate">
                          <p
                            className={`text-xs font-semibold truncate ${isCurrent ? "text-orange-600 font-bold" : "text-slate-800"
                              }`}
                          >
                            {lesson.title}
                          </p>
                          <span className="text-[11px] text-slate-500">{lesson.duration}</span>
                        </div>
                      </div>

                      <div className="shrink-0 text-slate-400">
                        {isCurrent ? (
                          <i className="fa-solid fa-circle-play text-orange-500 text-sm"></i>
                        ) : isDone ? (
                          <i className="fa-solid fa-circle-check text-emerald-500 text-sm"></i>
                        ) : (
                          <i className="fa-solid fa-lock text-slate-300 text-xs"></i>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Student Course Support Box */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-5 shadow-lg space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center font-bold">
                  🎓
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Need Live Help?</h4>
                  <p className="text-xs text-slate-400">Connect with Netcoder Faculty</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Stuck on an assignment or bug? Our instructors hold daily 1-on-1 lab sessions at the
                Dharamshala campus and over Google Meet.
              </p>
              <a
                href="https://api.whatsapp.com/send?phone=919816732055&text=Hello%20Netcoder%20Technology,%20I%20am%20enrolled%20in%20LMS%20and%20need%20assistance."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2 px-4 rounded-xl text-center font-bold text-xs text-white block transition hover:opacity-90"
                style={{ background: "#25d366" }}
              >
                <i className="fa-brands fa-whatsapp mr-1.5"></i> WhatsApp Faculty Helpdesk
              </a>
            </div>
          </div>
        </div>
      </div>
    </SecureLMSGuard>
  );
}
