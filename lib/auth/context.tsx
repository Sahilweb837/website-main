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
  enrollCourse: (courseSlug: string, paymentDetails?: Record<string, unknown>) => boolean;
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
const LEGACY_ENROLLED_KEY = "lms_enrolled_courses";

function enrolledStorageKey(userId: string) {
  return `lms_enrolled_courses_${userId}`;
}

function studentIdFor(identity: string) {
  let hash = 2166136261;
  for (let index = 0; index < identity.length; index += 1) {
    hash = Math.imul(hash ^ identity.charCodeAt(index), 16777619);
  }
  return `student-${(hash >>> 0).toString(36)}`;
}

function getStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && parsed.id) return parsed as AuthUser;
    }
    return null;
  } catch (error) {
    console.error("Unable to load the saved student account.", error);
    return null;
  }
}

function getStoredEnrolled(userId: string | undefined): string[] {
  if (typeof window === "undefined" || !userId) return [];
  try {
    const scopedKey = enrolledStorageKey(userId);
    const scoped = localStorage.getItem(scopedKey);
    const raw = scoped ?? (userId === DEMO_USER.id ? localStorage.getItem(LEGACY_ENROLLED_KEY) : null);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.every((slug) => typeof slug === "string")) {
        if (!scoped) {
          localStorage.setItem(scopedKey, JSON.stringify(parsed));
          localStorage.removeItem(LEGACY_ENROLLED_KEY);
        }
        return parsed;
      }
    }
    return [];
  } catch (error) {
    console.error(`Unable to load course enrollments for ${userId}.`, error);
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

    const enrolled = getStoredEnrolled(stored?.id);
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
    setEnrolledCourses(u ? getStoredEnrolled(u.id) : []);
  };

  const enrollCourse = (courseSlug: string, paymentDetails?: Record<string, unknown>) => {
    if (!user) {
      console.error("A signed-in student is required to save a course enrollment.");
      return false;
    }
    if (enrolledCourses.includes(courseSlug)) return true;
    const updated = [...enrolledCourses, courseSlug];
    try {
      if (paymentDetails) {
        localStorage.setItem(
          `lms_payment_${user.id}_${courseSlug}`,
          JSON.stringify({
            ...paymentDetails,
            enrolledAt: new Date().toISOString(),
          })
        );
      }
      localStorage.setItem(enrolledStorageKey(user.id), JSON.stringify(updated));
      setEnrolledCourses(updated);
      return true;
    } catch (error) {
      console.error(`Unable to save enrollment for ${courseSlug}.`, error);
      return false;
    }
  };

  const isEnrolled = (courseSlug: string) => {
    return enrolledCourses.includes(courseSlug);
  };

  const loginWithPhone = async (phone: string, redirectTo = "/lms/select-course") => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      persistUser({
        id: studentIdFor(`phone:${phone.replace(/\D/g, "")}`),
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
        id: studentIdFor("google:student@gmail.com"),
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
      const identity = userData.email?.trim().toLowerCase()
        || userData.phone?.replace(/\D/g, "")
        || `anonymous:${Date.now()}`;
      persistUser({
        id: studentIdFor(identity),
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
