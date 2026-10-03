/**
 * Unified Netcoder API Client
 * Supports dual-mode:
 * 1. Laravel REST Backend (via NEXT_PUBLIC_API_URL, default: http://localhost:8000/api)
 * 2. Next.js Internal App Router API (/api/...) as automatic fallback
 */

const LARAVEL_API_BASE = process.env.NEXT_PUBLIC_API_URL || "";
const NEXT_API_BASE = "";

async function request(endpoint, options = {}) {
  const isServer = typeof window === "undefined";
  const baseUrl = LARAVEL_API_BASE || NEXT_API_BASE;
  const url = `${baseUrl}${endpoint}`;

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...(options.headers || {}),
  };

  // Attach auth token if present
  if (!isServer) {
    const token = localStorage.getItem("auth_token") || localStorage.getItem("admin_auth");
    if (token && typeof token === "string" && !token.startsWith("{")) {
      headers.Authorization = `Bearer ${token}`;
    }
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers,
    });

    if (!res.ok) {
      // If Laravel backend fails or is not running, and we tried an external URL, fallback to local Next.js API
      if (LARAVEL_API_BASE && url.startsWith(LARAVEL_API_BASE)) {
        console.warn(`[API] Laravel backend at ${url} failed with ${res.status}. Falling back to internal Next.js API.`);
        const fallbackUrl = `${NEXT_API_BASE}${endpoint}`;
        const fallbackRes = await fetch(fallbackUrl, { ...options, headers });
        return await fallbackRes.json();
      }
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.message || `Request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    // Network failure (e.g. Laravel not running on port 8000) -> auto fallback to Next.js API
    if (LARAVEL_API_BASE && url.startsWith(LARAVEL_API_BASE)) {
      try {
        console.warn(`[API] Network error connecting to Laravel (${error.message}). Falling back to local Next.js API.`);
        const fallbackUrl = `${NEXT_API_BASE}${endpoint}`;
        const fallbackRes = await fetch(fallbackUrl, { ...options, headers });
        return await fallbackRes.json();
      } catch (fallbackError) {
        throw new Error(fallbackError.message || error.message);
      }
    }
    throw error;
  }
}

export const api = {
  // COURSES
  async getCourses(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = `/api/courses${query ? `?${query}` : ""}`;
    return request(endpoint);
  },

  async getCourseBySlug(slug) {
    return request(`/api/courses?slug=${encodeURIComponent(slug)}`);
  },

  async createCourse(courseData) {
    return request("/api/courses", {
      method: "POST",
      body: JSON.stringify(courseData),
    });
  },

  async updateCourse(id, courseData) {
    return request(`/api/courses/${encodeURIComponent(id)}`, {
      method: "PUT",
      body: JSON.stringify(courseData),
    });
  },

  async deleteCourse(idOrSlug) {
    return request(`/api/courses?id=${encodeURIComponent(idOrSlug)}&slug=${encodeURIComponent(idOrSlug)}`, {
      method: "DELETE",
    });
  },

  // BLOGS
  async getBlogs(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = `/api/blogs${query ? `?${query}` : ""}`;
    return request(endpoint);
  },

  async getBlogBySlug(slug) {
    const res = await request(`/api/blogs`);
    if (res.data) {
      const blog = res.data.find((b) => b.slug === slug);
      return { success: !!blog, data: blog };
    }
    return res;
  },

  async createBlog(blogData) {
    return request("/api/blogs", {
      method: "POST",
      body: JSON.stringify(blogData),
    });
  },

  // SEMINAR FEEDBACK
  async getFeedback() {
    return request("/api/feedback");
  },

  async submitFeedback(feedbackData) {
    return request("/api/feedback", {
      method: "POST",
      body: JSON.stringify(feedbackData),
    });
  },

  // LMS STUDENTS & ENROLLMENTS
  async getStudents(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = `/api/lms/students${query ? `?${query}` : ""}`;
    return request(endpoint);
  },

  async getStudentById(id) {
    return request(`/api/lms/students?id=${encodeURIComponent(id)}`);
  },

  async enrollStudent(studentData) {
    return request("/api/lms/students", {
      method: "POST",
      body: JSON.stringify(studentData),
    });
  },

  async updateStudent(id, studentData) {
    return request(`/api/lms/students/update`, {
      method: "POST",
      body: JSON.stringify({ id, ...studentData }),
    });
  },

  async deleteStudent(id) {
    return request(`/api/lms/students?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  },

  async studentLogin(credentials) {
    return request("/api/auth/student-login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  async getEnrollments(userId) {
    const endpoint = userId ? `/api/enrollments?userId=${encodeURIComponent(userId)}` : "/api/enrollments";
    return request(endpoint);
  },

  async enrollCourse(userId, courseSlug) {
    return request("/api/enrollments", {
      method: "POST",
      body: JSON.stringify({ userId, courseSlug }),
    });
  },

  // ADMIN STATS & AUDIT
  async getAdminStats() {
    return request("/api/admin/stats");
  },

  // LMS TESTS & DPA (LARAVEL COMPATIBLE)
  async getTests(courseSlug) {
    const endpoint = courseSlug ? `/api/lms/tests?courseSlug=${encodeURIComponent(courseSlug)}` : "/api/lms/tests";
    return request(endpoint);
  },

  async submitTest(testId, data) {
    return request("/api/lms/tests", {
      method: "POST",
      body: JSON.stringify({ testId, ...data }),
    });
  },

  async getDpaAssignments(courseSlug) {
    const endpoint = courseSlug ? `/api/lms/dpa?courseSlug=${encodeURIComponent(courseSlug)}` : "/api/lms/dpa";
    return request(endpoint);
  },

  async submitDpaAssignment(dpaId, data) {
    return request("/api/lms/dpa", {
      method: "POST",
      body: JSON.stringify({ dpaId, ...data }),
    });
  },

  // INQUIRIES & DEMO SESSIONS
  async submitInquiry(inquiryData) {
    return request("/api/demo-inquiry", {
      method: "POST",
      body: JSON.stringify(inquiryData),
    });
  },

  // LIVE CLASSES & SESSIONS (DIRECT FOR ENROLLED STUDENTS & ADMIN)
  async getLiveClasses(params = {}) {
    const query = new URLSearchParams(params).toString();
    const endpoint = `/api/lms/classes${query ? `?${query}` : ""}`;
    return request(endpoint);
  },

  async createLiveClass(classData) {
    return request("/api/lms/classes", {
      method: "POST",
      body: JSON.stringify(classData),
    });
  },

  async updateLiveClass(id, updates) {
    return request("/api/lms/classes", {
      method: "PUT",
      body: JSON.stringify({ id, ...updates }),
    });
  },

  async deleteLiveClass(id) {
    return request(`/api/lms/classes?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  },

  // MENTOR STUDY NOTES
  async getNotes(courseSlug) {
    const endpoint = courseSlug ? `/api/lms/notes?courseSlug=${encodeURIComponent(courseSlug)}` : "/api/lms/notes";
    return request(endpoint);
  },

  async createNote(noteData) {
    return request("/api/lms/notes", {
      method: "POST",
      body: JSON.stringify(noteData),
    });
  },

  async deleteNote(id) {
    return request(`/api/lms/notes?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  },

  // MENTOR TASKS & ASSIGNMENTS
  async getTasks(courseSlug) {
    const endpoint = courseSlug ? `/api/lms/tasks?courseSlug=${encodeURIComponent(courseSlug)}` : "/api/lms/tasks";
    return request(endpoint);
  },

  async createTask(taskData) {
    return request("/api/lms/tasks", {
      method: "POST",
      body: JSON.stringify(taskData),
    });
  },

  async deleteTask(id) {
    return request(`/api/lms/tasks?id=${encodeURIComponent(id)}`, {
      method: "DELETE",
    });
  },

  // MENTOR AUTHENTICATION
  async mentorLogin(credentials) {
    return request("/api/mentor/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },
};

export default api;