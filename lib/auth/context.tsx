"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useRouter } from "next/navigation";

export type AuthUser = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  role: "student" | "admin";
  avatar: string | null;
};

export type AuthContextType = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthLoaded: boolean;
  enrolledCourses: string[];
  enrollCourse: (courseSlug: string, paymentDetails?: any) => void;
  isEnrolled: (courseSlug: string) => boolean;
  loginWithPhone: (phone: string, redirectTo?: string) => Promise<void>;
  loginWithGoogle: (redirectTo?: string) => Promise<void>;
  loginWithCredentials: (userData: { name?: string; email?: string; phone?: string }, redirectTo?: string) => Promise<void>;
  loginAsDemo: (redirectTo?: string) => Promise<void>;
  logout: () => void;
  updateUser: (fields: Partial<AuthUser>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: AuthUser = {
  id: "demo-001",
  name: "Sahil Sandhu",
  email: "sahil@netcoder.in",
  phone: "9876543210",
  role: "student",
  avatar: null,
};

const STORAGE_KEY = "lms_auth_user";
const ENROLLED_KEY = "lms_enrolled_courses";

function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.id) return parsed as AuthUser;
    }
    return null;
  } catch {
    return null;
  }
}

function getStoredEnrolled(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ENROLLED_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
    return [];
  } catch {
    return [];
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Start with null on both server and initial client render to prevent hydration mismatch
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) setUser(stored);

    const enrolled = getStoredEnrolled();
    setEnrolledCourses(enrolled);

    setIsAuthLoaded(true);
  }, []);

  const persistUser = (u: AuthUser | null) => {
    if (typeof window !== "undefined") {
      if (u) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setUser(u);
  };

  const enrollCourse = (courseSlug: string, paymentDetails?: any) => {
    setEnrolledCourses((prev) => {
      if (prev.includes(courseSlug)) return prev;
      const updated = [...prev, courseSlug];
      if (typeof window !== "undefined") {
        try {
          localStorage.setItem(ENROLLED_KEY, JSON.stringify(updated));
          if (paymentDetails) {
            localStorage.setItem(
              `lms_payment_${courseSlug}`,
              JSON.stringify({
                ...paymentDetails,
                enrolledAt: new Date().toISOString(),
              })
            );
          }
        } catch (e) {
          console.error("Error storing enrollment:", e);
        }
      }
      return updated;
    });
  };

  const isEnrolled = (courseSlug: string) => {
    return enrolledCourses.includes(courseSlug);
  };

  const loginWithPhone = async (phone: string, redirectTo = "/lms/select-course") => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      persistUser({
        id: `phone-${phone}`,
        name: `Student ${phone.slice(-4)}`,
        email: null,
        phone,
        role: "student",
        avatar: null,
      });
      router.push(redirectTo);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (redirectTo = "/lms/select-course") => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      persistUser({
        id: "google-001",
        name: "Google Student",
        email: "student@gmail.com",
        phone: null,
        role: "student",
        avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=google",
      });
      router.push(redirectTo);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithCredentials = async (
    userData: { name?: string; email?: string; phone?: string },
    redirectTo = "/lms/select-course"
  ) => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      const displayName = userData.name?.trim() || (userData.email ? userData.email.split("@")[0] : "Student");
      persistUser({
        id: `stu-${Date.now()}`,
        name: displayName,
        email: userData.email?.trim() || null,
        phone: userData.phone?.trim() || null,
        role: "student",
        avatar: null,
      });
      router.push(redirectTo);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsDemo = async (redirectTo = "/lms/select-course") => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      persistUser(DEMO_USER);
      router.push(redirectTo);
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = (fields: Partial<AuthUser>) => {
    setUser((prev) => {
      if (!prev) return null;
      const updated: AuthUser = { ...prev, ...fields };
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      }
      return updated;
    });
  };

  const logout = () => {
    persistUser(null);
    setEnrolledCourses([]);
    if (typeof window !== "undefined") {
      localStorage.removeItem(ENROLLED_KEY);
      localStorage.removeItem("auth_token");
    }
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        isAuthLoaded,
        enrolledCourses,
        enrollCourse,
        isEnrolled,
        loginWithPhone,
        loginWithGoogle,
        loginWithCredentials,
        loginAsDemo,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
