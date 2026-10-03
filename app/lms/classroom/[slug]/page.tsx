import { use } from "react";
import CourseClassroom from "@/components/lms/CourseClassroom";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function LMSClassroomRoute({ params }: PageProps) {
  const { slug } = use(params);
  return <CourseClassroom slug={slug} />;
}
