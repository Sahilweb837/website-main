import type { CheckoutCourse } from "@/lib/payments";

export const LMS_CART_STORAGE_KEY = "netcoder_lms_course_cart";

function isCheckoutCourse(value: unknown): value is CheckoutCourse {
  if (!value || typeof value !== "object") return false;
  const course = value as Partial<CheckoutCourse>;
  return typeof course.slug === "string"
    && typeof course.title === "string"
    && typeof course.price === "number"
    && Number.isFinite(course.price);
}

export function readLmsCart(): CheckoutCourse[] {
  try {
    const stored = localStorage.getItem(LMS_CART_STORAGE_KEY);
    if (!stored) return [];

    const parsed: unknown = JSON.parse(stored);
    if (!Array.isArray(parsed) || !parsed.every(isCheckoutCourse)) {
      throw new Error("Saved course cart contains invalid data.");
    }

    return parsed;
  } catch (error) {
    console.error("Unable to load the saved course cart.", error);
    return [];
  }
}

export function writeLmsCart(courses: CheckoutCourse[]) {
  localStorage.setItem(LMS_CART_STORAGE_KEY, JSON.stringify(courses));
  window.dispatchEvent(new CustomEvent("lms:course-cart-count", { detail: courses.length }));
}
