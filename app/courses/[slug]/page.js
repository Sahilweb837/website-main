import CoursePageContent from "@/components/CoursePageContent";
import { COURSES, getCourseBySlug } from "@/data/courses";

export async function generateStaticParams() {
  return COURSES.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "Course Not Found" };

  return {
    title: `${course.title} in Dharamshala | Netcoder Technology`,
    description: course.overview,
  };
}

export default async function DynamicCoursePage({ params }) {
  const { slug } = await params;
  return <CoursePageContent slug={slug} />;
}
