export type CourseProgressRecord = {
  completedLessons: string[];
  currentLessonId: string | null;
};

function activityKey(userId: string) {
  return `lms_activity_${userId}`;
}

function progressKey(userId: string, courseSlug: string) {
  return `lms_progress_${userId}_${courseSlug}`;
}

export function recordLearningActivity(userId: string) {
  if (typeof window === "undefined" || !userId) return;
  try {
    const raw = localStorage.getItem(activityKey(userId));
    let saved: string[] = [];
    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          saved = parsed.filter((d): d is string => typeof d === "string" && /^\d{4}-\d{2}-\d{2}$/.test(d));
        }
      } catch {
        saved = [];
      }
    }
    const today = new Date().toISOString().slice(0, 10);
    const days = Array.from(new Set([...saved, today])).sort().slice(-365);
    localStorage.setItem(activityKey(userId), JSON.stringify(days));
  } catch (error) {
    console.error("Unable to save the learning activity streak.", error);
  }
}

export function isTodayAttended(userId: string): boolean {
  if (typeof window === "undefined" || !userId) return false;
  try {
    const raw = localStorage.getItem(activityKey(userId));
    if (!raw) return false;
    const saved: string[] = JSON.parse(raw);
    const today = new Date().toISOString().slice(0, 10);
    return Array.isArray(saved) && saved.includes(today);
  } catch {
    return false;
  }
}

export function markTodayAttendance(userId: string): { success: boolean; streak: number } {
  if (typeof window === "undefined" || !userId) return { success: false, streak: 0 };
  recordLearningActivity(userId);
  const streak = getLearningStreak(userId);
  window.dispatchEvent(new CustomEvent("lms_attendance_marked", { detail: { userId, streak } }));
  return { success: true, streak };
}

export function getWeeklyAttendance(userId: string) {
  if (typeof window === "undefined" || !userId) return [];
  try {
    const raw = localStorage.getItem(activityKey(userId));
    const savedDays = new Set<string>(raw ? JSON.parse(raw) : []);
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const now = new Date();
    const todayStr = now.toISOString().slice(0, 10);

    const result = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(now.getDate() - i);
      const dateStr = d.toISOString().slice(0, 10);
      result.push({
        day: daysOfWeek[d.getDay()],
        date: dateStr,
        attended: savedDays.has(dateStr),
        isToday: dateStr === todayStr,
      });
    }
    return result;
  } catch {
    return [];
  }
}

export function getActiveCourseSlug(): string {
  if (typeof window === "undefined") return "fullstack-web-development";
  return localStorage.getItem("lms_active_course_slug") || "fullstack-web-development";
}

export function setActiveCourseSlug(slug: string) {
  if (typeof window === "undefined" || !slug) return;
  localStorage.setItem("lms_active_course_slug", slug);
  window.dispatchEvent(new CustomEvent("lms_course_change", { detail: slug }));
}

export function getLearningStreak(userId: string) {
  if (typeof window === "undefined" || !userId) return 0;
  try {
    const raw = localStorage.getItem(activityKey(userId));
    if (!raw) return 0;
    const saved: unknown = JSON.parse(raw);
    if (!Array.isArray(saved)) return 0;
    const days = new Set(saved.filter((d): d is string => typeof d === "string"));
    const cursor = new Date();
    cursor.setUTCHours(0, 0, 0, 0);
    const today = cursor.toISOString().slice(0, 10);
    if (!days.has(today)) cursor.setUTCDate(cursor.getUTCDate() - 1);
    let streak = 0;
    while (days.has(cursor.toISOString().slice(0, 10))) {
      streak += 1;
      cursor.setUTCDate(cursor.getUTCDate() - 1);
    }
    return streak;
  } catch (error) {
    console.error(`Unable to read the learning activity streak for ${userId}.`, error);
    return 0;
  }
}

export function readCourseProgress(
  userId: string,
  courseSlug: string,
): CourseProgressRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(progressKey(userId, courseSlug));
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (
      !parsed ||
      typeof parsed !== "object" ||
      !("completedLessons" in parsed) ||
      !Array.isArray(parsed.completedLessons) ||
      !parsed.completedLessons.every((lesson) => typeof lesson === "string")
    ) {
      throw new Error("Saved course progress has an invalid format.");
    }
    return {
      completedLessons: parsed.completedLessons,
      currentLessonId:
        "currentLessonId" in parsed && typeof parsed.currentLessonId === "string"
          ? parsed.currentLessonId
          : null,
    };
  } catch (error) {
    console.error(`Unable to read progress for ${courseSlug}.`, error);
    return null;
  }
}

export function writeCourseProgress(
  userId: string,
  courseSlug: string,
  progress: CourseProgressRecord,
) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(progressKey(userId, courseSlug), JSON.stringify(progress));
    recordLearningActivity(userId);
  } catch (error) {
    console.error(`Unable to save progress for ${courseSlug}.`, error);
    throw error;
  }
}

export function getProgressPercent(completedLessons: string[], totalLessons: number) {
  if (totalLessons <= 0) return 0;
  return Math.min(100, Math.round((completedLessons.length / totalLessons) * 100));
}
