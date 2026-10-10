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
  profileComplete?: boolean;
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
const PROFILE_COMPLETION_KEY = "lms_profile_completion";

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
      if (parsed && parsed.id) {
        return {
          ...parsed,
          profileComplete: parsed.profileComplete ?? false,
        } as AuthUser;
      }
    }
    return null;
  } catch (error) {
    console.error("Unable to load the saved student account.", error);
    return null;
  }
}

function getStoredProfileComplete(userId: string | undefined): boolean {
  if (typeof window === "undefined" || !userId) return false;
  try {
    const key = `${PROFILE_COMPLETION_KEY}_${userId}`;
    const raw = localStorage.getItem(key);
    if (raw === null) {
      const legacy = localStorage.getItem(PROFILE_COMPLETION_KEY);
      if (legacy !== null) {
        const parsed = JSON.parse(legacy);
        const completed = Boolean(parsed && parsed[userId]);
        if (completed) localStorage.setItem(key, "true");
        return completed;
      }
      return false;
    }
    return raw === "true";
  } catch (error) {
    console.error("Unable to load profile completion state.", error);
    return false;
  }
}

function setStoredProfileComplete(userId: string | undefined, value: boolean) {
  if (typeof window === "undefined" || !userId) return;
  const key = `${PROFILE_COMPLETION_KEY}_${userId}`;
  localStorage.setItem(key, String(Boolean(value)));
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
    const defaultStarter = ["fullstack-web-development", "data-science-machine-learning"];
    localStorage.setItem(scopedKey, JSON.stringify(defaultStarter));
    return defaultStarter;
  } catch (error) {
    console.error(`Unable to load course enrollments for ${userId}.`, error);
    return ["fullstack-web-development", "data-science-machine-learning"];
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Start with null on both server and initial client render to prevent hydration mismatch
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enrolledCourses, setEnrolledCourses] = useState<string[]>([]);
  const router = useRouter();

  const navigateTarget = (redirectTo: string) => {
    if (typeof window !== "undefined" && (redirectTo.startsWith("http://") || redirectTo.startsWith("https://"))) {
      window.location.href = redirectTo;
    } else {
      router.push(redirectTo);
    }
  };

  useEffect(() => {
    const stored = getStoredUser();
    if (stored) {
      const profileComplete = getStoredProfileComplete(stored.id);
      const userWithProfile = { ...stored, profileComplete };
      setUser(userWithProfile);
      if (typeof window !== "undefined") {
        try {
          const cookieVal = encodeURIComponent(JSON.stringify(userWithProfile));
          document.cookie = `lms_user=${cookieVal}; path=/; max-age=2592000; SameSite=Lax`;
          document.cookie = `lms_auth_user=${cookieVal}; path=/; max-age=2592000; SameSite=Lax`;
        } catch (e) {
          console.error("Cookie sync error:", e);
        }
      }
    }

    const enrolled = getStoredEnrolled(stored?.id);
    setEnrolledCourses(enrolled);

    setIsAuthLoaded(true);
  }, []);

  const persistUser = (u: AuthUser | null) => {
    if (typeof window !== "undefined") {
      if (u) {
        const normalized = {
          ...u,
          profileComplete: Boolean(u.profileComplete || getStoredProfileComplete(u.id)),
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
        setStoredProfileComplete(u.id, normalized.profileComplete ?? false);
        try {
          const cookieVal = encodeURIComponent(JSON.stringify(normalized));
          document.cookie = `lms_user=${cookieVal}; path=/; max-age=2592000; SameSite=Lax`;
          document.cookie = `lms_auth_user=${cookieVal}; path=/; max-age=2592000; SameSite=Lax`;
        } catch (e) {
          console.error("Cookie write error:", e);
        }
      } else {
        localStorage.removeItem(STORAGE_KEY);
        try {
          document.cookie = "lms_user=; path=/; max-age=0; SameSite=Lax";
          document.cookie = "lms_auth_user=; path=/; max-age=0; SameSite=Lax";
        } catch (e) {
          console.error("Cookie clear error:", e);
        }
      }
    }
    setUser(u ? { ...u, profileComplete: Boolean(u.profileComplete || getStoredProfileComplete(u.id)) } : null);
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

  const loginWithPhone = async (phone: string, redirectTo = "/lms/courses") => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      const userRecord: AuthUser = {
        id: studentIdFor(`phone:${phone.replace(/\D/g, "")}`),
        name: `Student ${phone.slice(-4)}`,
        email: null,
        phone,
        role: "student",
        avatar: null,
        profileComplete: false,
      };
      persistUser(userRecord);
      navigateTarget(redirectTo);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (redirectTo = "/lms/courses") => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      const userRecord: AuthUser = {
        id: studentIdFor("google:student@gmail.com"),
        name: "Google Student",
        email: "student@gmail.com",
        phone: null,
        role: "student",
        avatar: "https://api.dicebear.com/7.x/thumbs/svg?seed=google",
        profileComplete: false,
      };
      persistUser(userRecord);
      navigateTarget(redirectTo);
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithCredentials = async (
    userData: { name?: string; email?: string; phone?: string },
    redirectTo = "/lms/courses"
  ) => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      const displayName = userData.name?.trim() || (userData.email ? userData.email.split("@")[0] : "Student");
      const identity = userData.email?.trim().toLowerCase()
        || userData.phone?.replace(/\D/g, "")
        || `anonymous:${Date.now()}`;
      const userRecord: AuthUser = {
        id: studentIdFor(identity),
        name: displayName,
        email: userData.email?.trim() || null,
        phone: userData.phone?.trim() || null,
        role: "student",
        avatar: null,
        profileComplete: Boolean(userData.name && userData.email),
      };
      persistUser(userRecord);
      navigateTarget(redirectTo);
    } finally {
      setIsLoading(false);
    }
  };

  const loginAsDemo = async (redirectTo = "/lms/courses") => {
    setIsLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 500));
      persistUser({ ...DEMO_USER, profileComplete: true });
      navigateTarget(redirectTo);
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
        setStoredProfileComplete(updated.id, Boolean(updated.profileComplete));
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
