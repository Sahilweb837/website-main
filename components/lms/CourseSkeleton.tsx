"use client";

import React from "react";

export function SkeletonBox({
  className = "",
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`rounded-lg bg-slate-200/90 relative overflow-hidden ${className}`}
      style={{
        background: "linear-gradient(90deg, #f1f5f9 0%, #e2e8f0 50%, #f1f5f9 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmerWave 1.6s infinite linear",
        ...style,
      }}
    />
  );
}

export function CourseCardSkeleton() {
  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200/80 overflow-hidden">
      {/* Thumbnail Shimmer */}
      <div className="relative h-48 w-full bg-slate-200 overflow-hidden">
        <SkeletonBox className="w-full h-full rounded-none" />
        {/* Floating badge placeholders */}
        <div className="absolute top-3 left-3 flex gap-2">
          <SkeletonBox className="h-5 w-16 !rounded-full !bg-slate-300" />
          <SkeletonBox className="h-5 w-20 !rounded-full !bg-slate-300" />
        </div>
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
          <SkeletonBox className="h-5 w-24 !rounded-md !bg-slate-300/80" />
          <SkeletonBox className="h-6 w-6 !rounded-full !bg-slate-300/80" />
        </div>
      </div>

      {/* Card Content Skeleton */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Rating placeholder */}
          <div className="flex items-center gap-2 mb-3">
            <SkeletonBox className="h-4 w-4 !bg-amber-200/70" />
            <SkeletonBox className="h-4 w-10" />
            <SkeletonBox className="h-4 w-20" />
          </div>

          {/* Title placeholder (2 lines) */}
          <div className="space-y-2 mb-3">
            <SkeletonBox className="h-5 w-5/6" />
            <SkeletonBox className="h-5 w-2/3" />
          </div>

          {/* Overview snippet placeholder (2 lines) */}
          <div className="space-y-1.5 mb-4">
            <SkeletonBox className="h-3.5 w-full" />
            <SkeletonBox className="h-3.5 w-4/5" />
          </div>

          {/* Instructor placeholder */}
          <div className="flex items-center gap-2.5 pt-1">
            <SkeletonBox className="w-7 h-7 !rounded-full shrink-0" />
            <SkeletonBox className="h-3.5 w-36" />
          </div>
        </div>

        {/* Footer with Price and Buttons */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <SkeletonBox className="h-6 w-16" />
            <SkeletonBox className="h-4 w-12" />
          </div>
          <div className="flex items-center gap-2">
            <SkeletonBox className="h-8 w-16 !rounded-xl" />
            <SkeletonBox className="h-8 w-24 !rounded-xl !bg-orange-200" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CourseCatalogSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, idx) => (
        <CourseCardSkeleton key={idx} />
      ))}
    </div>
  );
}

/**
 * Skeleton Loader for LMS Checkout Page
 */
export function CheckoutPageSkeleton() {
  return (
    <div className="min-h-screen bg-[#faf8ff] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <SkeletonBox className="h-3.5 w-16" />
          <span className="text-slate-300">/</span>
          <SkeletonBox className="h-3.5 w-48" />
          <span className="text-slate-300">/</span>
          <SkeletonBox className="h-3.5 w-20" />
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10">
          <div className="mb-8 space-y-2">
            <SkeletonBox className="h-7 w-48" />
            <SkeletonBox className="h-4 w-80" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Course summary & Price Breakdown */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-200/80 space-y-4">
                <SkeletonBox className="w-full h-44 rounded-xl" />
                <SkeletonBox className="h-5 w-5/6" />
                <div className="flex items-center gap-2">
                  <SkeletonBox className="w-6 h-6 !rounded-full" />
                  <SkeletonBox className="h-3.5 w-32" />
                </div>
                <div className="pt-4 border-t border-slate-200/60 space-y-2.5">
                  <div className="flex justify-between">
                    <SkeletonBox className="h-4 w-24" />
                    <SkeletonBox className="h-4 w-16" />
                  </div>
                  <div className="flex justify-between">
                    <SkeletonBox className="h-4 w-20" />
                    <SkeletonBox className="h-4 w-14" />
                  </div>
                  <div className="flex justify-between pt-2 border-t border-slate-200/60">
                    <SkeletonBox className="h-6 w-28" />
                    <SkeletonBox className="h-6 w-20 !bg-orange-200" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Customer Info & Payment Method */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-4">
                <SkeletonBox className="h-5 w-40" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SkeletonBox className="h-11 rounded-xl" />
                  <SkeletonBox className="h-11 rounded-xl" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SkeletonBox className="h-11 rounded-xl" />
                  <SkeletonBox className="h-11 rounded-xl" />
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100">
                <SkeletonBox className="h-5 w-44" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <SkeletonBox className="h-14 rounded-xl" />
                  <SkeletonBox className="h-14 rounded-xl" />
                  <SkeletonBox className="h-14 rounded-xl" />
                  <SkeletonBox className="h-14 rounded-xl" />
                </div>
                <SkeletonBox className="h-28 rounded-2xl" />
                <SkeletonBox className="h-12 w-full rounded-xl !bg-orange-300" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Classroom Video Player Skeleton Loader
 */
export function ClassroomSkeleton() {
  return (
    <div className="min-h-screen bg-[#faf8ff] p-4 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Top Header */}
        <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-slate-200">
          <div className="space-y-2">
            <SkeletonBox className="h-6 w-64" />
            <SkeletonBox className="h-3.5 w-40" />
          </div>
          <SkeletonBox className="h-9 w-32 rounded-xl" />
        </div>

        {/* Video Canvas & Drawer */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <SkeletonBox className="w-full aspect-video rounded-3xl" />
            <div className="bg-white p-6 rounded-2xl border border-slate-200 space-y-3">
              <SkeletonBox className="h-6 w-3/4" />
              <div className="flex gap-3">
                <SkeletonBox className="h-4 w-28 !rounded-full" />
                <SkeletonBox className="h-4 w-24 !rounded-full" />
              </div>
              <SkeletonBox className="h-4 w-full" />
              <SkeletonBox className="h-4 w-4/5" />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3 h-[600px] overflow-hidden">
            <SkeletonBox className="h-6 w-44 mb-4" />
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-3 rounded-xl border border-slate-100 flex items-center gap-3">
                <SkeletonBox className="w-7 h-7 !rounded-full shrink-0" />
                <div className="space-y-1.5 flex-1">
                  <SkeletonBox className="h-4 w-4/5" />
                  <SkeletonBox className="h-3 w-1/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseCardSkeleton;
