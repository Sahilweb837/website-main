import type { Blog, Course, Feedback, Inquiry, ApiResponse } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

async function fetchAPI<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);
    throw error;
  }
}

export const apiClient = {
  getCourses: (): Promise<ApiResponse<Course[]>> => fetchAPI<Course[]>("/courses"),

  getCourseBySlug: (slug: string): Promise<ApiResponse<Course>> =>
    fetchAPI<Course>(`/courses/${slug}`),

  getBlogs: (params?: { category?: string; q?: string }): Promise<ApiResponse<Blog[]>> => {
    const query = new URLSearchParams();
    if (params?.category) query.set("category", params.category);
    if (params?.q) query.set("q", params.q);
    const qs = query.toString();
    return fetchAPI<Blog[]>(`/blogs${qs ? `?${qs}` : ""}`);
  },

  getBlogBySlug: (slug: string): Promise<ApiResponse<Blog>> =>
    fetchAPI<Blog>(`/blogs/${slug}`),

  getFeedback: (): Promise<ApiResponse<Feedback[]>> => fetchAPI<Feedback[]>("/feedback"),

  submitFeedback: (data: Partial<Feedback>): Promise<ApiResponse<Feedback>> =>
    fetchAPI<Feedback>("/feedback", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  submitInquiry: (data: Partial<Inquiry>): Promise<ApiResponse<Inquiry>> =>
    fetchAPI<Inquiry>("/demo-inquiry", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getInquiries: (): Promise<ApiResponse<Inquiry[]>> =>
    fetchAPI<Inquiry[]>("/demo-inquiry"),

  sendContactEmail: (data: {
    name: string;
    email: string;
    phone?: string;
    course?: string;
    address?: string;
    message?: string;
  }): Promise<ApiResponse<unknown>> =>
    fetchAPI<unknown>("/contact", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};

export default apiClient;
