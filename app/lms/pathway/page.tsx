"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/lib/auth/context";
import { getUserProgress } from "@/data/lms-data";
import { Trophy, Calendar, Award } from "lucide-react";

export default function PathwayPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated || !user) return null;

  const progress = getUserProgress(user.id);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Learning Pathway</h1>
          <p className="text-xs text-slate-500 mt-1">Track career milestones and unlock specialized courses</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/lms/select-course"
            className="text-xs font-bold text-white bg-[#ff5532] hover:bg-[#e04422] px-4 py-2 rounded-xl transition shadow-md shadow-[#ff5532]/20"
          >
            🎯 Choose Course Track →
          </Link>
          <Link
            href="/lms/courses"
            className="text-xs text-slate-500 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 px-3 py-2 rounded-xl transition"
          >
            ← Back to My Courses
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Career Roadmap</h2>
        <p className="text-slate-500 text-sm mb-4">
          Follow your personalized learning path and earn rewards as you progress
          through Netcoder's programs.
        </p>
        <div className="flex justify-between text-sm text-slate-600 mb-6">
          <span>{progress.milestones.filter((m) => m.completed).length} of {progress.milestones.length} milestones earned</span>
          <span>~{progress.totalHours} learning hours accumulated</span>
        </div>
      </div>

      <div className="space-y-4">
        {progress.milestones.map((milestone, idx) => {
          const isLast = idx === progress.milestones.length - 1;
          const Icon = milestone.completed ? Trophy : Award;

          return (
            <div key={milestone.id} className={`relative pb-6 ${isLast ? "" : "border-l-2 border-slate-200 ml-5"}`}>
              <div className="absolute -left-1/2 w-10 h-10 rounded-full border-2 flex items-center justify-center bg-white -translate-x-1/2 mt-0.5 z-10">
                {milestone.completed ? (
                  <span className="text-xl">✓</span>
                ) : (
                  <span className="text-slate-400 font-semibold">{idx + 1}</span>
                )}
              </div>

              <div
                className={`ml-8 p-5 rounded-xl border transition-all ${
                  milestone.completed
                    ? "bg-indigo-50 border-indigo-200"
                    : "bg-slate-50 border-slate-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${
                    milestone.completed ? "bg-indigo-100 text-indigo-600" : "bg-slate-100 text-slate-400"
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-slate-900">{milestone.title}</h3>
                      {milestone.completed && milestone.reward && (
                        <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                          {milestone.reward}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-500">{milestone.description}</p>

                    {milestone.courses && milestone.courses.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {milestone.courses.map((courseSlug) => (
                          <span
                            key={courseSlug}
                            className="text-xs px-2 py-1 bg-white rounded-full"
                          >
                            {courseSlug}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
