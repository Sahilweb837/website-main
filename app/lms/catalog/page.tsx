import { redirect } from "next/navigation";

export default function CourseCatalogPage() {
  redirect("/lms/select-course#course-catalog");
}