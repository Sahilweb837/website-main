import { use } from "react";
import CourseClassroom from "@/components/lms/CourseClassroom";

interface PageProps {
  params: Promise<{ slug: string; lessonId: string }>;
}

export default function CourseLessonPageRoute({ params }: PageProps) {
  const { slug, lessonId } = use(params);
  return <CourseClassroom slug={slug} initialLessonId={lessonId} />;
}
