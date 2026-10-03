"use client";

import { type ReactNode } from "react";
import { AuthProvider as Provider } from "@/lib/auth/context";

export function AuthProvider({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>;
}
