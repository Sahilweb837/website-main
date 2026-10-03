"use client";

import type { CheckoutCourse } from "./PaymentCheckoutModal";
import { COURSES } from "@/data/courses";
import { LMS_COURSES } from "@/data/lms-courses";

interface CoursePreviewModalProps {
  course: CheckoutCourse | null;
  isOpen: boolean;
  onClose: () => void;
  onEnroll: (course: CheckoutCourse) => void;
}

export default function CoursePreviewModal({
  course,
  isOpen,
  onClose,
  onEnroll,
}: CoursePreviewModalProps) {
  if (!isOpen || !course) return null;

  const lmsMatch = LMS_COURSES.find((c) => c.slug === course.slug);
  const fullCourse = COURSES.find((c) => c.slug === course.slug);

  const syllabus = lmsMatch?.syllabus
    ? lmsMatch.syllabus.map((s) => ({
        module: s.module,
        title: s.module,
        desc: s.lessons.join(" • "),
      }))
    : fullCourse?.syllabus || [
        { module: "Module 1", title: "Architecture & Foundations", desc: "Core patterns, theory, and developer environment setup." },
        { module: "Module 2", title: "Hands-on Production Implementation", desc: "Building real microservices and distributed data pipelines." },
        { module: "Module 3", title: "Deployment, CI/CD & Observability", desc: "Automating rolling updates, zero-downtime releases, and monitoring." },
        { module: "Module 4", title: "Capstone Project & Capstone Review", desc: "End-to-end pull request audit by senior engineering mentors." },
      ];

  const tools = fullCourse?.tools || ["Docker", "Kubernetes", "Linux", "Git", "VS Code"];
  const highlights = fullCourse?.highlights || [
    "Production-grade architectures",
    "Interactive cloud sandboxes",
    "1-on-1 code reviews from senior engineers",
    "Verified certificate of completion",
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200 text-slate-900 font-sans max-h-[90vh] flex flex-col">
        {/* Top Header */}
        <div className="relative h-48 bg-slate-900 overflow-hidden shrink-0">
          {course.image && (
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-full object-cover opacity-60"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
          <div className="absolute bottom-4 left-6 right-6 text-white">
            <span className="px-2.5 py-0.5 rounded-full bg-orange-600 text-white text-[10px] font-bold uppercase tracking-wider">
              {course.level || "Production Course"}
            </span>
            <h3 className="text-xl md:text-2xl font-black mt-1 leading-snug line-clamp-2">{course.title}</h3>
            <p className="text-xs text-slate-300 mt-0.5">{course.instructor || "Netcoder Senior Faculty"}</p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1 text-xs sm:text-sm">
          {/* Highlights Grid */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-orange-600 text-base">verified</span>
              Curriculum Highlights
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                  <span className="text-emerald-600 font-bold text-sm">✓</span>
                  <span className="text-slate-700 text-xs">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Syllabus Modules */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-3 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-orange-600 text-base">menu_book</span>
              Syllabus &amp; Learning Modules
            </h4>
            <div className="space-y-2.5">
              {syllabus.map((s, idx) => (
                <div key={idx} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-orange-600 uppercase">{s.module}</span>
                    <span className="text-[11px] text-slate-400 font-mono">Module {idx + 1}</span>
                  </div>
                  <h5 className="font-bold text-slate-900 text-xs sm:text-sm mt-0.5">{s.title}</h5>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tools Practiced */}
          <div>
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xs mb-2">
              Tools &amp; Infrastructure Practiced
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {tools.map((t, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 bg-orange-50 text-orange-800 border border-orange-200 rounded-lg text-xs font-semibold"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-lg font-black text-slate-900">${course.price}</div>
            <div className="text-[11px] text-slate-500">Includes lifetime access &amp; verified certificate</div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onEnroll(course);
              }}
              className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
            >
              <span>Enroll Now • ${course.price}</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
