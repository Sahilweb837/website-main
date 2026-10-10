"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth/context";
import { recordLearningActivity } from "@/lib/lms-progress";
import { LMS_COURSES } from "@/data/lms-courses";
import { DEFAULT_ENROLLMENTS } from "@/data/lms-data";
import { ArrowLeft, ArrowRight, Check, Code2, Flame, Play, RotateCcw, Save, Sparkles, Trophy, Zap } from "lucide-react";
import styles from "./practice.module.css";

type Challenge = {
  id: string;
  title: string;
  level: "Easy" | "Medium" | "Hard";
  topic: string;
  prompt: string;
  starter: string;
  hint: string;
  xp: number;
};

const challenges: Challenge[] = [
  {
    id: "unique-values",
    title: "Keep only unique values",
    level: "Easy",
    topic: "Arrays · 15 min",
    prompt: "Write a function that returns an array containing each value only once. Preserve the original order. Example: [2, 1, 2, 3] becomes [2, 1, 3].",
    starter: "function uniqueValues(values) {\n  // Return the values without duplicates\n  \n}\n",
    hint: "A Set remembers which values you have already seen.",
    xp: 30,
  },
  {
    id: "frequency-map",
    title: "Build a frequency map",
    level: "Medium",
    topic: "Objects · 25 min",
    prompt: "Create a function that counts how often each word appears in a sentence. Ignore letter case. Example: \"Code code, learn\" returns { code: 2, learn: 1 }.",
    starter: "function countWords(sentence) {\n  // Return an object with each word's count\n  \n}\n",
    hint: "Normalize the sentence before splitting it into words.",
    xp: 60,
  },
  {
    id: "task-scheduler",
    title: "Plan tasks by priority",
    level: "Hard",
    topic: "Algorithms · 40 min",
    prompt: "Given an array of tasks shaped like { name, priority }, return the tasks in descending priority order. Keep tasks with equal priority in their original order.",
    starter: "function planTasks(tasks) {\n  // Return a stable priority order\n  \n}\n",
    hint: "Sort a copy of the array and use the original index to break ties.",
    xp: 100,
  },
];

type SavedPractice = {
  solved: string[];
  drafts: Record<string, string>;
};

function readSavedPractice(userId: string): SavedPractice {
  try {
    const raw = localStorage.getItem(`lms_practice_${userId}`);
    if (!raw) return { solved: [], drafts: {} };
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("Invalid practice data.");
    const saved = parsed as Partial<SavedPractice>;
    if (!Array.isArray(saved.solved) || !saved.drafts || typeof saved.drafts !== "object" || Array.isArray(saved.drafts)) {
      throw new Error("Invalid saved practice details.");
    }
    return {
      solved: Array.from(new Set(saved.solved.filter((id): id is string => typeof id === "string" && challenges.some((challenge) => challenge.id === id)))),
      drafts: Object.fromEntries(Object.entries(saved.drafts).filter((entry): entry is [string, string] => typeof entry[1] === "string" && challenges.some((challenge) => challenge.id === entry[0]))),
    };
  } catch (error) {
    console.error("Unable to load saved coding practice.", error);
    return { solved: [], drafts: {} };
  }
}

export default function PracticeExperience({ initialView }: { initialView: "arena" | "challenges" }) {
  const { user, isAuthLoaded, enrolledCourses } = useAuth();
  const [activeCourseSlug, setActiveCourseSlug] = useState("");
  const enrolledSlugs = useMemo(() => {
    const seeded = DEFAULT_ENROLLMENTS.filter((enrollment) => enrollment.userId === user?.id).map((enrollment) => enrollment.courseSlug);
    return Array.from(new Set([...enrolledCourses, ...seeded]));
  }, [enrolledCourses, user?.id]);
  useEffect(() => {
    if (!enrolledSlugs.length) {
      setActiveCourseSlug("");
      return;
    }
    if (!enrolledSlugs.includes(activeCourseSlug)) setActiveCourseSlug(enrolledSlugs[0]);
  }, [activeCourseSlug, enrolledSlugs]);
  const selectedCourseSlug = enrolledSlugs.includes(activeCourseSlug) ? activeCourseSlug : enrolledSlugs[0];
  const availableCourses = enrolledSlugs.map((slug) => ({
    slug,
    title: LMS_COURSES.find((item) => item.slug === slug)?.title
      ?? DEFAULT_ENROLLMENTS.find((enrollment) => enrollment.userId === user?.id && enrollment.courseSlug === slug)?.course?.title
      ?? slug.replace(/-/g, " "),
  }));
  const courseName = availableCourses.find((item) => item.slug === selectedCourseSlug)?.title ?? "Your first course";
  const [activeId, setActiveId] = useState(challenges[0].id);
  const [saved, setSaved] = useState<SavedPractice>({ solved: [], drafts: {} });
  const [notice, setNotice] = useState("");
  const activeChallenge = challenges.find((item) => item.id === activeId) ?? challenges[0];
  const draft = saved.drafts[activeId] ?? activeChallenge.starter;
  const solvedCount = saved.solved.length;
  const earnedXp = challenges.reduce((total, challenge) => total + (saved.solved.includes(challenge.id) ? challenge.xp : 0), 0);

  useEffect(() => {
    if (user) setSaved(readSavedPractice(user.id));
  }, [user]);

  function updateSaved(next: SavedPractice) {
    if (!user) return;
    try {
      localStorage.setItem(`lms_practice_${user.id}`, JSON.stringify(next));
      setSaved(next);
      try {
        recordLearningActivity(user.id);
        setNotice("Your practice progress is saved.");
      } catch {
        setNotice("Your practice progress is saved, but the learning streak could not be updated.");
      }
      window.setTimeout(() => setNotice(""), 2400);
    } catch (error) {
      console.error("Unable to save coding practice.", error);
      setNotice("We couldn’t save your practice. Check your browser storage and try again.");
    }
  }

  if (!isAuthLoaded) return <main className={styles.loading}>Getting your practice space ready…</main>;
  if (!user) {
    return <main className={styles.gate}><Code2 size={30} /><h1>Practice starts with a plan.</h1><p>Sign in to save challenges and track your progress.</p><Link href="/login?redirect=/lms/practice">Sign in to practice <ArrowRight size={16} /></Link></main>;
  }
  if (!enrolledSlugs.length) {
    return <main className={styles.gate}><Code2 size={30} /><h1>Choose a course to get started.</h1><p>Your practice space will be ready after you enroll in a course.</p><Link href="/lms/catalog">Explore courses <ArrowRight size={16} /></Link></main>;
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <Link href="/lms/courses" className={styles.back}><ArrowLeft size={15} /> My Courses</Link>
        <header className={styles.header}>
          <div><span className={styles.eyebrow}>YOUR PRACTICE SPACE</span><h1>{initialView === "arena" ? "Build a daily coding habit." : "Choose your next challenge."}</h1><p>Practice at your pace. Your drafts and solved challenges stay saved to your account.</p></div>
          {availableCourses.length > 1 ? (
            <label className={styles.courseTag}><Code2 size={15} /><select aria-label="Choose a course" value={selectedCourseSlug ?? ""} onChange={(event) => setActiveCourseSlug(event.target.value)}>{availableCourses.map((item) => <option key={item.slug} value={item.slug}>{item.title}</option>)}</select></label>
          ) : <span className={styles.courseTag}><Code2 size={15} /> {courseName}</span>}
        </header>
        <nav className={styles.tabs} aria-label="Practice pages">
          <Link className={initialView === "arena" ? styles.tabActive : ""} href="/lms/practice">Practice arena</Link>
          <Link className={initialView === "challenges" ? styles.tabActive : ""} href="/lms/challenges">Code challenges</Link>
        </nav>
        <section className={styles.stats}>
          <article><span className={styles.statIcon}><Trophy size={17} /></span><strong>{solvedCount} / {challenges.length}</strong><small>challenges solved</small></article>
          <article><span className={styles.statIcon}><Zap size={17} /></span><strong>{earnedXp} XP</strong><small>earned from practice</small></article>
          <article><span className={styles.statIcon}><Flame size={17} /></span><strong>{solvedCount ? "In motion" : "Ready when you are"}</strong><small>your practice streak</small></article>
        </section>
        <div className={styles.workspace}>
          <aside className={styles.challengeList}>
            <div className={styles.listHeader}><strong>Challenges</strong><span>{challenges.length}</span></div>
            {challenges.map((challenge) => (
              <button className={`${styles.challengeItem} ${activeId === challenge.id ? styles.challengeSelected : ""}`} key={challenge.id} onClick={() => setActiveId(challenge.id)}>
                <span className={`${styles.level} ${styles[challenge.level.toLowerCase()]}`}>{challenge.level}</span><strong>{challenge.title}</strong><small>{challenge.topic} · {challenge.xp} XP</small>{saved.solved.includes(challenge.id) && <Check size={15} className={styles.solvedMark} />}
              </button>
            ))}
          </aside>
          <section className={styles.problem}>
            <div className={styles.problemTop}><div><span className={`${styles.level} ${styles[activeChallenge.level.toLowerCase()]}`}>{activeChallenge.level}</span><span className={styles.topic}>{activeChallenge.topic}</span></div><span className={styles.reward}><Zap size={14} /> +{activeChallenge.xp} XP</span></div>
            <h2>{activeChallenge.title}</h2><p className={styles.prompt}>{activeChallenge.prompt}</p>
            <details className={styles.hint}><summary><Sparkles size={14} /> Need a hint?</summary><p>{activeChallenge.hint}</p></details>
            <label className={styles.editorLabel} htmlFor="solution-editor">Your solution <span>JavaScript</span></label>
            <textarea id="solution-editor" spellCheck={false} value={draft} onChange={(event) => setSaved((current) => ({ ...current, drafts: { ...current.drafts, [activeId]: event.target.value } }))} />
            <div className={styles.editorFooter}><span>Your draft is private to your account.</span><button type="button" onClick={() => updateSaved({ ...saved, drafts: { ...saved.drafts, [activeId]: draft } })}><Save size={15} /> Save draft</button></div>
            <div className={styles.problemActions}>
              <button type="button" className={styles.resetButton} onClick={() => setSaved((current) => ({ ...current, drafts: { ...current.drafts, [activeId]: activeChallenge.starter } }))}><RotateCcw size={15} /> Reset</button>
              <button type="button" className={styles.solveButton} onClick={() => updateSaved({ ...saved, drafts: { ...saved.drafts, [activeId]: draft }, solved: saved.solved.includes(activeId) ? saved.solved : [...saved.solved, activeId] })}><Check size={15} /> {saved.solved.includes(activeId) ? "Solved" : "Mark as solved"} <Play size={13} fill="currentColor" /></button>
            </div>
            {notice && <p className={notice.includes("couldn’t") ? styles.error : styles.notice} role="status">{notice}</p>}
            <p className={styles.disclaimer}>Practice workspace saves your solution; it doesn’t execute or automatically grade your code.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
