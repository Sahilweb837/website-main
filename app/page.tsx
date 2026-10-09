import { redirect } from "next/navigation";

export const metadata = {
  title: "Netcoder Technology | Student & LMS Portal",
  description: "Access your Netcoder LMS courses, live classroom, and student dashboard.",
};

export default function RootPage() {
  redirect("/login");
}