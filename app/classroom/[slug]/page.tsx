import { use } from "react";
import CourseClassroom from "@/components/lms/CourseClassroom";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default function ClassroomSlugRoute({ params }: PageProps) {
  const { slug } = use(params);
  return (
    <div className="min-h-screen bg-slate-50 pt-20">
      <CourseClassroom slug={slug} />
    </div>
  );
}
