"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowRight,
  Award,
  BookOpen,
  BrainCircuit,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  Code2,
  FileCode2,
  FileText,
  Flame,
  LockKeyhole,
  MessageCircle,
  Play,
  Radio,
  Sparkles,
  Star,
  Trophy,
  Video,
  Zap,
} from "lucide-react";
import { LMS_COURSES } from "@/data/lms-courses";
import {
  calculateAutomatedClassStatus,
  INITIAL_CLASSES,
  INITIAL_NOTES,
  INITIAL_TASKS,
  type LiveClass,
  type MentorNote,
  type MentorTask,
} from "@/data/lms-mentor-data";
import { DEFAULT_ENROLLMENTS } from "@/data/lms-data";
import { api } from "@/lib/api";
import { useAuth } from "@/lib/auth/context";
import { getLearningStreak, getProgressPercent, readCourseProgress } from "@/lib/lms-progress";
import styles from "./dashboard.module.css";

const fallbackCourse =
  LMS_COURSES.find((course) => course.slug === "fullstack-web-development") ??
  LMS_COURSES[0];
const practiceChallengeXp: Record<string, number> = {
  "unique-values": 30,
  "frequency-map": 60,
  "task-scheduler": 100,
};

const placementTools = [
  { title: "Resume builder", detail: "Create a developer-first resume", icon: FileText },
  { title: "ATS checker", detail: "See how your resume scores", icon: CheckCircle2 },
  { title: "Interview questions", detail: "Practice role-ready questions", icon: CircleHelp },
  { title: "Mock interviews", detail: "Get comfortable out loud", icon: MessageCircle },
  { title: "Internship opportunities", detail: "Find your first experience", icon: Sparkles },
  { title: "Job portal", detail: "Explore developer roles", icon: ArrowRight },
];

const practiceLevels = [
  { level: "Easy", title: "Array warm-up", topic: "Arrays · 15 min", xp: 30 },
  { level: "Medium", title: "Build a frequency map", topic: "Hash maps · 25 min", xp: 60 },
  { level: "Hard", title: "Design a task scheduler", topic: "System design · 40 min", xp: 100 },
];

function formatDate(date: string, options?: Intl.DateTimeFormatOptions) {
  const parsed = new Date(`${date}T12:00:00`);
  if (Number.isNaN(parsed.getTime())) return date;
  return new Intl.DateTimeFormat("en-IN", options ?? { day: "numeric", month: "short" }).format(parsed);
}

function getCountdown(date: string, time: string, now: number) {
  const startsAt = new Date(`${date}T${time}:00`).getTime();
  if (Number.isNaN(startsAt)) return "Time to be announced";
  const seconds = Math.max(0, Math.floor((startsAt - now) / 1000));
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (days > 0) return `Starts in ${days}d ${hours}h`;
  if (hours > 0) return `Starts in ${hours}h ${minutes}m`;
  if (minutes > 0) return `Starts in ${minutes}m`;
  return "Starting now";
}

function SectionTitle({
  eyebrow,
  title,
  detail,
  action,
}: {
  eyebrow?: string;
  title: string;
  detail?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className={styles.sectionTitle}>
      <div>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h2>{title}</h2>
        {detail && <p className={styles.sectionDetail}>{detail}</p>}
      </div>
      {action}
    </div>
  );
}

function DashboardExperience() {
  const { user, isAuthLoaded, enrolledCourses, loginAsDemo } = useAuth();
  const [liveClasses, setLiveClasses] = useState<LiveClass[]>(INITIAL_CLASSES);
  const [mentorNotes, setMentorNotes] = useState<MentorNote[]>(INITIAL_NOTES);
  const [mentorTasks, setMentorTasks] = useState<MentorTask[]>(INITIAL_TASKS);
  const [now, setNow] = useState(() => Date.now());
  const [activeCourseSlug, setActiveCourseSlug] = useState("");
  const [savedCourseProgress, setSavedCourseProgress] = useState<{
    slug: string;
    completedLessons: string[];
    currentLessonId: string | null;
  } | null>(null);
  const [practiceSolved, setPracticeSolved] = useState<string[]>([]);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => setNow(Date.now()), 30_000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!user) {
      setPracticeSolved([]);
      setStreak(0);
      return;
    }
    setStreak(getLearningStreak(user.id));
    try {
      const raw = localStorage.getItem(`lms_practice_${user.id}`);
      const parsed: unknown = raw ? JSON.parse(raw) : null;
      const solved = parsed && typeof parsed === "object" && !Array.isArray(parsed)
        && "solved" in parsed && Array.isArray(parsed.solved)
        ? parsed.solved.filter((id): id is string => typeof id === "string" && id in practiceChallengeXp)
        : [];
      setPracticeSolved(Array.from(new Set(solved)));
    } catch (error) {
      console.error("Unable to load dashboard practice progress.", error);
      setPracticeSolved([]);
    }
  }, [user?.id]);

  useEffect(() => {
    let active = true;

    async function loadLearningData() {
      const [classesResult, notesResult, tasksResult] = await Promise.allSettled([
        api.getLiveClasses(),
        api.getNotes(),
        api.getTasks(),
      ]);

      if (!active) return;
      if (classesResult.status === "fulfilled" && Array.isArray(classesResult.value?.data)) {
        setLiveClasses(classesResult.value.data);
      } else if (classesResult.status === "rejected") {
        console.error("Unable to load live classes; showing saved schedule.", classesResult.reason);
      }
      if (notesResult.status === "fulfilled" && Array.isArray(notesResult.value?.data)) {
        setMentorNotes(notesResult.value.data);
      } else if (notesResult.status === "rejected") {
        console.error("Unable to load mentor notes; showing saved resources.", notesResult.reason);
      }
      if (tasksResult.status === "fulfilled" && Array.isArray(tasksResult.value?.data)) {
        setMentorTasks(tasksResult.value.data);
      } else if (tasksResult.status === "rejected") {
        console.error("Unable to load assignments; showing saved tasks.", tasksResult.reason);
      }
    }

    void loadLearningData();
    return () => {
      active = false;
    };
  }, []);

  const seededEnrollments = useMemo(
    () => DEFAULT_ENROLLMENTS.filter((enrollment) => enrollment.userId === user?.id),
    [user?.id],
  );
  const learningCourseSlugs = useMemo(
    () => Array.from(new Set([...enrolledCourses, ...seededEnrollments.map((enrollment) => enrollment.courseSlug)])),
    [enrolledCourses, seededEnrollments],
  );
  useEffect(() => {
    if (!learningCourseSlugs.length) {
      setActiveCourseSlug("");
      return;
    }
    if (!learningCourseSlugs.includes(activeCourseSlug)) {
      setActiveCourseSlug(learningCourseSlugs[0]);
    }
  }, [activeCourseSlug, learningCourseSlugs]);
  const currentCourse = useMemo(
    () => LMS_COURSES.find((course) => course.slug === activeCourseSlug) ??
      LMS_COURSES.find((course) => learningCourseSlugs.includes(course.slug)) ??
      fallbackCourse,
    [activeCourseSlug, learningCourseSlugs],
  );
  const isEnrolled = learningCourseSlugs.includes(currentCourse.slug);
  const seededEnrollment = seededEnrollments.find(
    (enrollment) => enrollment.courseSlug === currentCourse.slug,
  );
  useEffect(() => {
    if (!user || !isEnrolled) {
      setSavedCourseProgress(null);
      return;
    }
    const saved = readCourseProgress(user.id, currentCourse.slug);
    setSavedCourseProgress(
      saved ? {
        slug: currentCourse.slug,
        completedLessons: saved.completedLessons,
        currentLessonId: saved.currentLessonId,
      } : null,
    );
  }, [currentCourse.slug, isEnrolled, user]);
  const courseLessonsCount = currentCourse.syllabus?.reduce(
    (total, module) => total + module.lessons.length,
    0,
  ) ?? 0;
  const hasSavedCourseProgress = savedCourseProgress?.slug === currentCourse.slug;
  const progress = isEnrolled
    ? hasSavedCourseProgress
      ? getProgressPercent(savedCourseProgress.completedLessons, courseLessonsCount)
      : seededEnrollment?.progress ?? 0
    : 0;
  const xp = practiceSolved.reduce((total, id) => total + (practiceChallengeXp[id] ?? 0), 0);
  const level = Math.floor(xp / 100) + 1;
  const certificatesEarned = seededEnrollments.filter((enrollment) => enrollment.progress >= 100).length;
  const courseModules = currentCourse.syllabus ?? [];
  let lessonNumber = 0;
  const courseLessons = courseModules.flatMap((module) => module.lessons.map((title) => {
    lessonNumber += 1;
    return { id: `les-${lessonNumber}`, title };
  }));
  const activeModuleIndex = courseModules.length
    ? Math.min(Math.floor((progress / 100) * courseModules.length), courseModules.length - 1)
    : 0;
  const nextModule = courseModules[activeModuleIndex];
  const fallbackLessonIndex = Math.min(
    Math.ceil((progress / 100) * courseLessons.length),
    Math.max(0, courseLessons.length - 1),
  );
  const currentLesson = courseLessons.find((lesson) => lesson.id === savedCourseProgress?.currentLessonId)
    ?? courseLessons[fallbackLessonIndex];
  const firstLesson = currentLesson?.title ?? "Start your first lesson";
  const classroomHref = `/lms/classroom/${currentCourse.slug}`;
  const continueHref = isEnrolled
    ? savedCourseProgress?.currentLessonId
      ? `/lms/courses/${currentCourse.slug}/${savedCourseProgress.currentLessonId}`
      : classroomHref
    : `/lms/courses/${currentCourse.slug}`;

  const courseClasses = useMemo(() => {
    const matching = liveClasses.filter((session) => session.courseSlug === currentCourse.slug);
    const available = matching.length ? matching : isEnrolled ? [] : liveClasses;
    return available
      .map((session) => ({ ...session, status: calculateAutomatedClassStatus(session) }))
      .filter((session) => session.status !== "completed")
      .sort((a, b) => {
        if (a.status === "live") return -1;
        if (b.status === "live") return 1;
        return new Date(`${a.date}T${a.startTime}:00`).getTime() -
          new Date(`${b.date}T${b.startTime}:00`).getTime();
      })
      .slice(0, 2);
  }, [currentCourse.slug, isEnrolled, liveClasses]);

  const featuredClass = courseClasses[0];
  const tasks = useMemo(() => {
    const matching = mentorTasks.filter(
      (task) => task.status === "open" && (task.courseSlug === currentCourse.slug || !isEnrolled),
    );
    const assignment = matching[0];
    return [
      {
        title: assignment?.title ?? "Complete your first course assignment",
        category: "Assignment",
        dueDate: assignment?.dueDate ?? "Choose a date",
        priority: "Due soon",
        xp: assignment?.points ?? 100,
        href: assignment?.starterRepo ?? "#resources",
        icon: FileCode2,
      },
      {
        title: "Quick knowledge check",
        category: "Quiz",
        dueDate: "Today",
        priority: "10 questions",
        xp: 40,
        href: "/lms/challenges",
        icon: CheckCircle2,
      },
      {
        title: "Solve a daily coding challenge",
        category: "Practice",
        dueDate: "Today",
        priority: "15 min",
        xp: 60,
        href: "#arena",
        icon: Code2,
      },
      {
        title: "Add a feature to your capstone",
        category: "Project",
        dueDate: "This week",
        priority: "Keep building",
        xp: 120,
        href: classroomHref,
        icon: Sparkles,
      },
    ];
  }, [classroomHref, currentCourse.slug, isEnrolled, mentorTasks]);

  const courseNotes = mentorNotes.filter(
    (note) => note.courseSlug === currentCourse.slug,
  );
  const displayedNotes = courseNotes.length ? courseNotes : mentorNotes.slice(0, 3);
  const achievements = [
    { title: "14 day streak", icon: Flame, unlocked: streak >= 14 },
    { title: "JavaScript explorer", icon: Code2, unlocked: practiceSolved.length >= 1 },
    { title: "Fast learner", icon: Zap, unlocked: practiceSolved.length >= 3 },
    { title: "Top performer", icon: Trophy, unlocked: false },
    { title: "Assignment master", icon: Award, unlocked: false },
  ];
  const nextLiveLink = featuredClass?.meetingLink || classroomHref;
  const mentorName = featuredClass?.mentorName ?? currentCourse.instructor;
  const mentorEmail = featuredClass?.mentorEmail ?? "hello@netcoder.in";

  if (!isAuthLoaded || !user) {
    return (
      <div className={styles.authState}>
        {isAuthLoaded ? (
          <div className={styles.authCard}>
            <span className={styles.authIcon}><BookOpen size={24} /></span>
            <p className={styles.eyebrow}>NETCODER LEARNING HUB</p>
            <h1>Your next chapter starts here.</h1>
            <p>Sign in to pick up your course, meet your mentor, and keep your progress moving.</p>
            <Link className={styles.primaryButton} href="/login?redirect=/lms/dashboard">
              Sign in to continue <ArrowRight size={16} />
            </Link>
            <button className={styles.demoButton} onClick={() => void loginAsDemo("/lms/dashboard")}>
              Preview the learning hub
            </button>
          </div>
        ) : (
          <div className={styles.loadingCard} aria-label="Loading your learning hub">
            <span />
            <p>Getting your learning space ready…</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.container}>
        <header className={styles.pageHeader}>
          <div>
            <p className={styles.eyebrow}>YOUR LEARNING SPACE <span aria-hidden="true">✦</span></p>
            <h1>Welcome back, {user.name.split(" ")[0]} <span aria-hidden="true">👋</span></h1>
            <p>Good things happen one lesson at a time. Let’s make today count.</p>
            <span className={styles.studentId}>Student ID <strong>{user.id}</strong></span>
          </div>
          <div className={styles.headerDate}><CalendarDays size={16} /> Your next step is ready</div>
        </header>

        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroContent}>
            <span className={styles.heroBadge}><Sparkles size={14} /> {isEnrolled ? "YOUR LEARNING JOURNEY" : "YOUR NEXT LEARNING JOURNEY"}</span>
            <h2 id="hero-title">{isEnrolled ? "You’re closer than you think." : "A new skill is one lesson away."}</h2>
            <p className={styles.heroDescription}>
              {isEnrolled
                ? "Continue your journey to becoming a professional developer."
                : "Choose a course and start building skills you can take into your career."}
            </p>
            <div className={styles.heroCourse}>
              <span className={styles.courseArtwork}><Code2 size={22} /></span>
              <div>
                <span>{isEnrolled ? "CURRENT COURSE" : "A GREAT PLACE TO START"}</span>
                <strong>{currentCourse.title}</strong>
              </div>
            </div>
            <div className={styles.heroModule}>
              <span>UP NEXT</span>
              <strong>{nextModule?.module ?? "Your learning path"}</strong>
              <small>{firstLesson}</small>
            </div>
            <div className={styles.heroActions}>
              <Link href={continueHref} className={styles.heroPrimary}>
                <Play size={17} fill="currentColor" /> {isEnrolled ? "Continue learning" : "Explore this course"}
              </Link>
              <a href={nextLiveLink} target="_blank" rel="noreferrer" className={styles.heroSecondary}>
                <Video size={17} /> Join live class
              </a>
            </div>
          </div>
          <div className={styles.heroVisual} aria-label={`${progress}% course progress`}>
            <div className={styles.visualGlow} />
            <div className={styles.visualOrbit}><span /><span /><span /></div>
            <div className={styles.progressRing} style={{ "--progress": `${progress * 3.6}deg` } as React.CSSProperties}>
              <div><strong>{progress}<small>%</small></strong><span>COURSE<br />COMPLETE</span></div>
            </div>
            <div className={`${styles.floatingChip} ${styles.xpChip}`}><Zap size={16} /> {xp.toLocaleString()} XP</div>
            <div className={`${styles.floatingChip} ${styles.levelChip}`}><Star size={15} /> Level {level}</div>
            <div className={`${styles.floatingChip} ${styles.streakChip}`}><Flame size={16} /> {streak} day streak</div>
            <div className={styles.visualCaption}>
              <span className={styles.livePulse} /> NEXT LIVE CLASS
              <strong>{featuredClass ? getCountdown(featuredClass.date, featuredClass.startTime, now) : "Check back for your next class"}</strong>
            </div>
          </div>
          <div className={styles.heroShine} />
        </section>

        {learningCourseSlugs.length > 1 && (
          <section className={styles.section} aria-label="Choose a course">
            <div className={styles.courseSwitcher}>
              <span>YOUR COURSES</span>
              <div>
                {learningCourseSlugs.map((slug) => {
                  const course = LMS_COURSES.find((item) => item.slug === slug);
                  if (!course) return null;
                  return (
                    <button
                      type="button"
                      key={slug}
                      className={slug === currentCourse.slug ? styles.courseSwitchActive : ""}
                      aria-pressed={slug === currentCourse.slug}
                      onClick={() => setActiveCourseSlug(slug)}
                    >
                      {course.title}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        <section className={styles.section} aria-labelledby="path-title">
          <SectionTitle
            eyebrow="ONE STEP AT A TIME"
            title="Your learning path"
            detail="A clear path from where you are to where you want to be."
            action={<Link href={`/lms/courses/${currentCourse.slug}`} className={styles.textLink}>View course <ArrowRight size={15} /></Link>}
          />
          {courseModules.length ? (
            <div className={styles.pathCard} id="path-title">
              <div className={styles.pathProgress}><span style={{ width: `${progress}%` }} /></div>
              <div className={styles.pathSteps}>
                {courseModules.slice(0, 6).map((module, index) => {
                  const complete = index < activeModuleIndex || progress === 100;
                  const active = index === activeModuleIndex && progress < 100;
                  return (
                    <Link
                      href={continueHref}
                      className={`${styles.pathStep} ${complete ? styles.pathComplete : ""} ${active ? styles.pathActive : ""}`}
                      key={`${module.module}-${index}`}
                    >
                      <span className={styles.pathNode}>{complete ? <Check size={14} /> : index + 1}</span>
                      <strong>{module.module.replace(/^Module \d+:\s*/i, "")}</strong>
                      <small>{complete ? "Completed" : active ? "You are here" : `${module.lessons.length} lessons`}</small>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className={styles.emptyState}>Your course roadmap will appear here once you choose a learning track.</div>
          )}
        </section>

        <section className={styles.section} aria-labelledby="watch-title">
          <SectionTitle
            eyebrow="PICK UP RIGHT WHERE YOU LEFT OFF"
            title="Continue watching"
            detail="Your next lesson is ready when you are."
            action={<Link href={`/lms/courses/${currentCourse.slug}`} className={styles.textLink}>All lessons <ArrowRight size={15} /></Link>}
          />
          <div className={styles.watchGrid} id="watch-title">
            <Link href={continueHref} className={styles.watchCard}>
              <div
                className={styles.watchImage}
                style={{ backgroundImage: `linear-gradient(0deg, rgba(10,16,35,.72), rgba(10,16,35,.06)), url("${currentCourse.image}")` }}
              >
                <span className={styles.playButton}><Play size={19} fill="currentColor" /></span>
                <span className={styles.videoLength}>{savedCourseProgress?.currentLessonId ? "RESUME LESSON" : "START LEARNING"}</span>
              </div>
              <div className={styles.watchDetails}>
                <span className={styles.contentLabel}>{savedCourseProgress?.currentLessonId ? "LAST OPENED" : "UP NEXT"} · {currentCourse.category.toUpperCase()}</span>
                <h3>{currentLesson?.title ?? (isEnrolled ? "Start your learning journey" : "Explore your next course")}</h3>
                <p>{currentCourse.title}</p>
                <div className={styles.watchProgress}>
                  <span><i style={{ width: `${progress}%` }} /></span>
                  <small>{progress}% watched</small>
                </div>
                <span className={styles.resumeLabel}>Resume lesson <ChevronRight size={16} /></span>
              </div>
            </Link>
            <div className={styles.watchSide}>
              <div className={styles.nextUpCard}>
                <span className={styles.smallIcon}><BookOpen size={18} /></span>
                <div><span>UP NEXT IN YOUR COURSE</span><strong>{firstLesson}</strong><small>{nextModule?.module ?? currentCourse.title}</small></div>
                <Link href={continueHref} aria-label="Open your next lesson"><ArrowRight size={17} /></Link>
              </div>
              <div className={styles.nudgeCard}>
                <span className={styles.nudgeIcon}><Flame size={19} /></span>
                <div><strong>{streak} day streak</strong><p>{streak ? "A little progress today keeps your momentum going." : "Complete a lesson or save a practice draft to start your streak."}</p></div>
              </div>
              <div className={styles.nudgeCard}>
                <span className={`${styles.nudgeIcon} ${styles.nudgePurple}`}><Zap size={18} /></span>
                <div><strong>{xp.toLocaleString()} XP collected</strong><p>{xp > 0 ? `${100 - (xp % 100)} XP to your next level.` : "Mark a practice challenge solved to earn XP."}</p></div>
              </div>
            </div>
          </div>
        </section>

        <div className={styles.columns}>
          <section className={styles.section} id="upcoming-classes" aria-labelledby="classes-title">
            <SectionTitle eyebrow="LEARN TOGETHER" title="Upcoming live classes" detail="Save a seat and bring your questions." />
            <div className={styles.classList} id="classes-title">
              {courseClasses.length ? courseClasses.map((session) => {
                const isLive = session.status === "live";
                return (
                  <article className={`${styles.classCard} ${isLive ? styles.classLive : ""}`} key={session.id}>
                    <div className={styles.classDate}>
                      <strong>{formatDate(session.date, { day: "2-digit" })}</strong>
                      <span>{formatDate(session.date, { month: "short" }).toUpperCase()}</span>
                    </div>
                    <div className={styles.classInfo}>
                      <div className={styles.classTopline}>
                        <span className={isLive ? styles.liveTag : styles.upcomingTag}>
                          {isLive ? <><span className={styles.livePulse} /> LIVE NOW</> : "UP NEXT"}
                        </span>
                        <span className={styles.classCountdown}>
                          {isLive ? "Happening now" : getCountdown(session.date, session.startTime, now)}
                        </span>
                      </div>
                      <h3>{session.title}</h3>
                      <p>{session.courseTitle}</p>
                      <div className={styles.classMeta}><span><Clock3 size={14} />{session.time}</span><span><Video size={14} />{session.platform}</span><span>with {session.mentorName}</span></div>
                      <a href={session.meetingLink} target="_blank" rel="noreferrer" className={isLive ? styles.classJoinLive : styles.classJoin}>
                        {isLive ? "Join live class" : "Save my seat"} <ArrowRight size={15} />
                      </a>
                    </div>
                  </article>
                );
              }) : (
                <div className={styles.emptyState}>
                  <CalendarDays size={22} />
                  <strong>No live classes on your schedule just yet.</strong>
                  <span>Your mentor’s next session will show up here.</span>
                </div>
              )}
            </div>
          </section>

          <section className={styles.section} aria-labelledby="tasks-title">
            <SectionTitle eyebrow="SMALL WINS ADD UP" title="Today's tasks" detail="A few focused steps to move forward." action={<span className={styles.taskCount}>4 to explore</span>} />
            <div className={styles.taskList} id="tasks-title">
              {tasks.map((task) => {
                const Icon = task.icon;
                return (
                  <article className={styles.taskCard} key={task.category}>
                    <span className={styles.taskIcon}><Icon size={17} /></span>
                    <div className={styles.taskDetails}>
                      <span>{task.category.toUpperCase()} <i>·</i> {task.priority}</span>
                      <strong>{task.title}</strong>
                      <small><CalendarDays size={12} /> Due {formatDate(task.dueDate)} <b>·</b> <Zap size={12} /> +{task.xp} XP</small>
                    </div>
                    <Link href={task.href} aria-label={`Open ${task.category.toLowerCase()}`}><ArrowRight size={17} /></Link>
                  </article>
                );
              })}
            </div>
          </section>
        </div>

        <section className={styles.section} aria-labelledby="actions-title">
          <SectionTitle eyebrow="YOUR LEARNING TOOLKIT" title="Quick actions" detail="Everything you need, right where you need it." />
          <div className={styles.actionGrid} id="actions-title">
            {[
              { title: "Join live class", sub: "Learn with your mentor", icon: Video, href: nextLiveLink, external: true, tone: "orange" },
              { title: "Practice coding", sub: "Sharpen your problem solving", icon: Code2, href: "/lms/practice", tone: "blue" },
              { title: "Download notes", sub: "Keep the useful bits close", icon: ArrowDownToLine, href: "#resources", tone: "green" },
              { title: "Code challenges", sub: "Try a focused coding problem", icon: FileCode2, href: "/lms/challenges", tone: "purple" },
              { title: "View certificates", sub: "Celebrate how far you’ve come", icon: Award, href: "/lms/profile", tone: "amber" },
              { title: "Contact mentor", sub: "A question is a great start", icon: MessageCircle, href: `mailto:${mentorEmail}`, external: true, tone: "rose" },
            ].map((action) => {
              const Icon = action.icon;
              const content = <><span className={`${styles.actionIcon} ${styles[action.tone]}`}><Icon size={19} /></span><span><strong>{action.title}</strong><small>{action.sub}</small></span><ArrowRight className={styles.actionArrow} size={16} /></>;
              return action.external ? (
                <a className={styles.actionCard} href={action.href} target={action.href.startsWith("http") ? "_blank" : undefined} rel={action.href.startsWith("http") ? "noreferrer" : undefined} key={action.title}>{content}</a>
              ) : (
                <Link className={styles.actionCard} href={action.href} key={action.title}>{content}</Link>
              );
            })}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="stats-title">
          <SectionTitle eyebrow="YOUR MOMENTUM, MADE VISIBLE" title="Your progress at a glance" detail="Every hour and every attempt is taking you somewhere." />
          <div className={styles.statsGrid} id="stats-title">
            {[
              { label: "Course progress", value: `${progress}%`, note: `${hasSavedCourseProgress ? savedCourseProgress.completedLessons.length : Math.round((progress / 100) * courseLessonsCount)} of ${courseLessonsCount} lessons complete`, icon: BookOpen, tone: "orange" },
              { label: "Study hours", value: "—", note: "time tracking isn’t available yet", icon: Clock3, tone: "blue" },
              { label: "Current rank", value: "Unranked", note: "rankings will appear as your cohort grows", icon: Trophy, tone: "amber" },
              { label: "XP earned", value: xp.toLocaleString(), note: `Level ${level} explorer`, icon: Zap, tone: "purple" },
              { label: "Certificates", value: String(certificatesEarned + (progress >= 100 && !seededEnrollment ? 1 : 0)), note: "proof of your progress", icon: Award, tone: "green" },
              { label: "Learning streak", value: `${streak} days`, note: "show up for your goals", icon: Flame, tone: "rose" },
            ].map((stat) => {
              const Icon = stat.icon;
              return <article className={styles.statCard} key={stat.label}><span className={`${styles.statIcon} ${styles[stat.tone]}`}><Icon size={19} /></span><strong>{stat.value}</strong><span>{stat.label}</span><small>{stat.note}</small></article>;
            })}
          </div>
        </section>

        <div className={styles.columns}>
          <section className={styles.section} aria-labelledby="mentor-title">
            <SectionTitle eyebrow="A NOTE FROM YOUR MENTOR" title="You’ve got this." />
            <article className={styles.mentorCard} id="mentor-title">
              <div className={styles.mentorQuote}><Sparkles size={20} /><span>“The best developers aren’t the ones who never get stuck. They’re the ones who stay curious long enough to find a way through.”</span></div>
              <div className={styles.mentorProfile}>
                <span className={styles.mentorAvatar}>{mentorName.split(" ").map((part) => part[0]).slice(0, 2).join("")}</span>
                <div><strong>{mentorName}</strong><small>Your course mentor · Netcoder Technology</small></div>
                <a href={`mailto:${mentorEmail}`} aria-label="Message your mentor"><MessageCircle size={17} /></a>
              </div>
              <div className={styles.goalCard}><span>TODAY’S LEARNING GOAL</span><strong>Spend 25 minutes with your next lesson. Small steps build real momentum.</strong><Link href={continueHref}>Start your goal <ArrowRight size={14} /></Link></div>
              <div className={styles.announcement}><span><Radio size={16} /></span><div><strong>A little reminder</strong><p>Bring one question to your next live class. Your mentor is here to help.</p></div></div>
            </article>
          </section>

          <section className={styles.section} aria-labelledby="resources-title">
            <SectionTitle eyebrow="MADE FOR YOUR NEXT STEP" title="Learning resources" detail="Helpful things from your course, all in one place." action={<Link href={classroomHref} className={styles.textLink}>Course room <ArrowRight size={15} /></Link>} />
            <div className={styles.resourceGrid} id="resources">
              {[
                ...displayedNotes.slice(0, 2).map((note) => ({ title: note.title, type: note.fileType.toUpperCase(), meta: `${note.fileSize} · ${note.module}`, href: note.fileUrl, icon: FileText })),
                { title: "Source code & starter repos", type: "CODE", meta: "Build along with each module", href: mentorTasks.find((task) => task.courseSlug === currentCourse.slug)?.starterRepo ?? "#tasks-title", icon: FileCode2 },
                { title: "Course cheat sheets", type: "GUIDE", meta: "Quick references for the essentials", href: displayedNotes[0]?.fileUrl ?? classroomHref, icon: BookOpen },
                { title: "Assignments & briefs", type: "PRACTICE", meta: `${mentorTasks.filter((task) => task.courseSlug === currentCourse.slug).length} mentor-set tasks`, href: "#tasks-title", icon: CheckCircle2 },
                { title: "Recorded sessions", type: "REPLAY", meta: "Revisit a lesson whenever you need", href: classroomHref, icon: Video },
              ].map((resource) => {
                const Icon = resource.icon;
                const external = resource.href.startsWith("http");
                const body = <><span className={styles.resourceIcon}><Icon size={18} /></span><span className={styles.resourceText}><strong>{resource.title}</strong><small>{resource.type} · {resource.meta}</small></span><ArrowDownToLine size={16} className={styles.downloadIcon} /></>;
                return external
                  ? <a className={styles.resourceCard} href={resource.href} target="_blank" rel="noreferrer" key={resource.title}>{body}</a>
                  : <Link className={styles.resourceCard} href={resource.href} key={resource.title}>{body}</Link>;
              })}
            </div>
          </section>
        </div>

        <section className={styles.section} id="arena" aria-labelledby="arena-title">
          <SectionTitle eyebrow="GET YOUR HANDS DIRTY" title="Coding practice arena" detail="Make problem-solving a habit, one challenge at a time." action={<Link href="#arena" className={styles.textLink}>Open practice arena <ArrowRight size={15} /></Link>} />
          <div className={styles.arenaCard}>
            <div className={styles.arenaSummary}>
              <div><strong>{practiceSolved.length}</strong><span>challenges marked solved</span></div>
              <div><strong>—</strong><span>accuracy isn’t auto-graded</span></div>
              <div><strong>Unranked</strong><span>community rank</span></div>
              <div className={styles.weeklyProgress}><span>CHALLENGES <strong>{practiceSolved.length} / {Object.keys(practiceChallengeXp).length} solved</strong></span><i><b style={{ width: `${Math.min(100, (practiceSolved.length / Object.keys(practiceChallengeXp).length) * 100)}%` }} /></i></div>
            </div>
            <div className={styles.challengeGrid} id="challenges">
              {practiceLevels.map((challenge) => <article className={styles.challengeCard} key={challenge.level}><span className={`${styles.difficulty} ${styles[challenge.level.toLowerCase()]}`}>{challenge.level}</span><h3>{challenge.title}</h3><p>{challenge.topic}</p><div><span><Zap size={14} /> +{challenge.xp} XP</span><Link href={classroomHref}>Open lesson <ArrowRight size={14} /></Link></div></article>)}
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="achievements-title">
          <SectionTitle eyebrow="LOOK HOW FAR YOU’VE COME" title="Achievements" detail="The little wins deserve a little celebration." />
          <div className={styles.badgeGrid} id="achievements-title">
            {achievements.map((achievement) => {
              const Icon = achievement.icon;
              return <article className={`${styles.achievement} ${!achievement.unlocked ? styles.achievementLocked : ""}`} key={achievement.title}><span><Icon size={22} /></span><strong>{achievement.title}</strong><small>{achievement.unlocked ? "Earned · keep it going" : "Your next milestone"}</small>{achievement.unlocked && <i><Check size={11} /></i>}</article>;
            })}
          </div>
        </section>

        <section className={styles.section} aria-labelledby="placement-title">
          <SectionTitle eyebrow="YOUR NEXT CHAPTER" title="Placement zone" detail="Career-ready tools unlock as you make progress." />
          <div className={styles.placementCard} id="placement-title">
            <div className={styles.placementHeader}>
              <span className={styles.placementLock}><LockKeyhole size={19} /></span>
              <div><strong>{progress >= 70 ? "Your career toolkit is unlocked" : "A head start on your career, coming soon"}</strong><p>{progress >= 70 ? "You’ve passed the 70% mark. Explore your career tools." : `Reach 70% in your course to unlock all six career tools. You’re ${Math.max(0, 70 - progress)}% away.`}</p></div>
              <span className={styles.unlockPill}>{progress}% / 70%</span>
            </div>
            <div className={styles.unlockProgress}><span style={{ width: `${Math.min(100, (progress / 70) * 100)}%` }} /></div>
            <div className={styles.placementGrid}>
              {placementTools.map((tool) => {
                const Icon = tool.icon;
                return <article className={`${styles.placementTool} ${progress >= 70 ? styles.placementReady : ""}`} key={tool.title}><span><Icon size={17} /></span><div><strong>{tool.title}</strong><small>{tool.detail}</small></div>{progress >= 70 ? <ArrowRight size={15} /> : <LockKeyhole size={14} />}</article>;
              })}
            </div>
            {progress < 70 && <p className={styles.unlockHint}><Sparkles size={14} /> Finish a few more modules and we’ll open the door to your career toolkit.</p>}
          </div>
        </section>

        <section className={styles.section} id="community" aria-labelledby="community-title">
          <SectionTitle eyebrow="BETTER, TOGETHER" title="Your learning community" detail="Share what you’re building. Someone is learning from you, too." action={<Link href="/lms/community" className={styles.textLink}>Visit community <ArrowRight size={15} /></Link>} />
          <div className={styles.communityGrid}>
            {[
              { label: "DISCUSSION", title: "What finally made React hooks click for you?", by: "Priya Sharma", meta: "12 replies · mentor joined", tone: "communityOrange", icon: MessageCircle },
              { label: "STUDY GROUP", title: "Saturday system design practice — join us", by: "Arjun & 6 learners", meta: "Starts this weekend", tone: "communityBlue", icon: BrainCircuit },
              { label: "MENTOR POST", title: "A useful way to think about clean API boundaries", by: mentorName, meta: "Shared with your cohort", tone: "communityPurple", icon: Sparkles },
              { label: "STUDENT WIN", title: "Shipped my first full-stack project!", by: "Rohan Mehta", meta: "Celebrate this win · 28 likes", tone: "communityGreen", icon: Trophy },
            ].map((post) => {
              const Icon = post.icon;
              return <article className={styles.communityCard} key={post.title}><span className={`${styles.communityIcon} ${styles[post.tone]}`}><Icon size={18} /></span><span className={styles.communityLabel}>{post.label}</span><h3>{post.title}</h3><p>{post.by}</p><small>{post.meta}</small><Link href="/lms/community" aria-label={`Open ${post.label.toLowerCase()}`}><ArrowRight size={14} /></Link></article>;
            })}
          </div>
        </section>

        <footer className={styles.footerNote}><Sparkles size={15} /> You don’t have to do it all today. Just take the next step.</footer>
      </div>

    </div>
  );
}

export default DashboardExperience;
