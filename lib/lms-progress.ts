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
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(activityKey(userId));
    const saved: unknown = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(saved) || !saved.every((day) => typeof day === "string" && /^\d{4}-\d{2}-\d{2}$/.test(day))) {
      throw new Error("Saved learning activity has an invalid format.");
    }
    const today = new Date().toISOString().slice(0, 10);
    const days = Array.from(new Set([...saved, today])).sort().slice(-365);
    localStorage.setItem(activityKey(userId), JSON.stringify(days));
  } catch (error) {
    console.error("Unable to save the learning activity streak.", error);
    throw error;
  }
}

export function getLearningStreak(userId: string) {
  if (typeof window === "undefined") return 0;
  try {
    const raw = localStorage.getItem(activityKey(userId));
    if (!raw) return 0;
    const saved: unknown = JSON.parse(raw);
    if (!Array.isArray(saved) || !saved.every((day) => typeof day === "string" && /^\d{4}-\d{2}-\d{2}$/.test(day))) {
      throw new Error("Saved learning activity has an invalid format.");
    }
    const days = new Set(saved);
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
