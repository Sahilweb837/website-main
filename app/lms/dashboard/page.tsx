import type { Metadata } from "next";
import DashboardExperience from "./DashboardExperience";

export const metadata: Metadata = {
  title: "My Learning Dashboard | Netcoder Technology",
  description: "Pick up where you left off and keep building your developer skills.",
};

export default function LMSDashboardPage() {
  return <DashboardExperience />;
}
