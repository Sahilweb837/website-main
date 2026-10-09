export const APPROVED_COURSE_SLUGS = [
  "the-complete-agentic-ai-engineering-course",
  "production-kubernetes",
  "nextjs-fullstack",
  "genai-llm-systems",
  "cloud-security-devsecops",
] as const;

export function isApprovedCourseSlug(slug?: string | null) {
  return typeof slug === "string" && APPROVED_COURSE_SLUGS.includes(slug as (typeof APPROVED_COURSE_SLUGS)[number]);
}

export function filterApprovedCourses<T extends { slug?: string | null }>(courses: T[]) {
  return courses.filter((course) => isApprovedCourseSlug(course.slug));
}
