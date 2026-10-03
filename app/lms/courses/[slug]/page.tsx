import { use } from "react";
import CourseDetailPage from "@/components/lms/CourseDetailPage";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function CourseLearningPageRoute({ params }: PageProps) {
  const { slug } = use(params);
  return <CourseDetailPage slug={slug} />;
}
