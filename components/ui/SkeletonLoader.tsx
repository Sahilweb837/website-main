"use client";

import React from "react";

/**
 * Base shimmering pulse block
 */
export function Skeleton({
  className = "",
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`animate-pulse rounded-md bg-slate-200/80 ${className}`}
      style={{
        background: "linear-gradient(90deg, #f1f5f9 25%, #e2e8f0 50%, #f1f5f9 75%)",
        backgroundSize: "200% 100%",
        animation: "shimmerWave 1.6s infinite linear",
        ...style,
      }}
    />
  );
}

/**
 * Skeleton for Course Cards (Used in LMS & Courses Catalog)
 */
export function CourseCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col p-0">
      {/* Thumbnail shimmer */}
      <Skeleton className="w-full aspect-video rounded-none" />
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-24 rounded-full" />
            <Skeleton className="h-4 w-16 rounded-full" />
          </div>
          <Skeleton className="h-6 w-4/5 rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-2/3 rounded" />
        </div>
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex justify-between">
            <Skeleton className="h-3 w-20 rounded" />
            <Skeleton className="h-3 w-12 rounded" />
          </div>
          <Skeleton className="h-2.5 w-full rounded-full" />
          <Skeleton className="h-10 w-full rounded-xl mt-3" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for Blog Article Cards
 */
export function BlogCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col">
      <Skeleton className="w-full h-48 rounded-none" />
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div className="space-y-2">
          <Skeleton className="h-4 w-20 rounded-full" />
          <Skeleton className="h-5 w-11/12 rounded" />
          <Skeleton className="h-3.5 w-full rounded" />
          <Skeleton className="h-3.5 w-3/4 rounded" />
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <Skeleton className="w-7 h-7 rounded-full" />
            <Skeleton className="h-3 w-20 rounded" />
          </div>
          <Skeleton className="h-3 w-16 rounded" />
        </div>
      </div>
    </div>
  );
}

/**
 * Skeleton for Dashboard 4-Column Metrics
 */
export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm flex items-center gap-4">
          <Skeleton className="w-12 h-12 rounded-xl" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-24 rounded" />
            <Skeleton className="h-3 w-32 rounded" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Skeleton for DRM Classroom Video & Lesson Sidebar
 */
export function ClassroomPlayerSkeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        {/* Big Video Canvas */}
        <Skeleton className="w-full aspect-video rounded-2xl" />
        <div className="bg-white p-5 rounded-2xl border border-slate-200 space-y-3">
          <Skeleton className="h-7 w-3/4 rounded" />
          <div className="flex gap-3">
            <Skeleton className="h-4 w-28 rounded-full" />
            <Skeleton className="h-4 w-28 rounded-full" />
          </div>
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-4/5 rounded" />
        </div>
      </div>

      {/* Lesson Drawer Sidebar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 space-y-3 h-[500px]">
        <Skeleton className="h-6 w-1/2 rounded mb-4" />
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="p-3 rounded-xl border border-slate-100 flex items-center gap-3">
            <Skeleton className="w-6 h-6 rounded-full" />
            <div className="space-y-1 flex-1">
              <Skeleton className="h-4 w-4/5 rounded" />
              <Skeleton className="h-3 w-1/3 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Table Rows Skeleton (Admin Dashboard)
 */
export function TableRowsSkeleton({ columns = 5, rows = 4 }: { columns?: number; rows?: number }) {
  return (
    <div className="divide-y divide-slate-100">
      {Array.from({ length: rows }).map((_, r) => (
        <div key={r} className="p-4 flex items-center justify-between gap-4">
          {Array.from({ length: columns }).map((_, c) => (
            <Skeleton
              key={c}
              className={`h-4 rounded ${c === 0 ? "w-1/4" : c === columns - 1 ? "w-16" : "w-1/6"}`}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

/**
 * Full Page Skeleton with Brand Orange Accent
 */
export function PageSkeleton() {
  return (
    <div className="min-h-[70vh] p-6 max-w-7xl mx-auto space-y-6 animate-fadeIn">
      {/* Top Banner Skeleton */}
      <Skeleton className="w-full h-44 rounded-3xl" />
      {/* 4 Stats */}
      <DashboardStatsSkeleton />
      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
        <CourseCardSkeleton />
        <CourseCardSkeleton />
        <CourseCardSkeleton />
      </div>
    </div>
  );
}

export default Skeleton;
