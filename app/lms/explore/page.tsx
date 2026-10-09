import { redirect } from "next/navigation";

export default function ExplorePage() {
  redirect("/lms/select-course#course-catalog");
}
