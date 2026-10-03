"use client";

import { Suspense } from "react";
import AuthView from "@/components/AuthView";

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full min-h-screen bg-white flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-slate-500 font-headline">
            <span className="w-3 h-3 rounded-full bg-[#ff5532] animate-ping" />
            <span>Loading Netcoder Workspace...</span>
          </div>
        </div>
      }
    >
      <AuthView initialMode="login" />
    </Suspense>
  );
}
