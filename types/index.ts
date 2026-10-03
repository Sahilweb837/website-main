export interface CourseCategory {
  id: string;
  name: string;
  icon: string;
}

export interface SyllabusModule {
  module: string;
  title: string;
  desc: string;
}

export interface Course {
  slug: string;
  title: string;
  category: string;
  categoryId: string;
  type: string;
  duration: string;
  level: string;
  image: string;
  overview: string;
  highlights: string[];
  syllabus: SyllabusModule[];
  tools: string[];
  careers: string[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface Blog {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  content: string;
}

export interface Feedback {
  id: number;
  student_name: string;
  contact_number: string;
  email: string | null;
  course: string;
  semester: string;
  heard_about: string;
  overall_assessment: string;
  seminar_length: string;
  recommend: string;
  team_experience: string;
  session_interest: string;
  suggestions: string;
  interested_courses: string[];
  created_at: string;
}

export interface Inquiry {
  id: number;
  name: string;
  phone: string;
  email: string;
  course: string;
  mode: string;
  created_at: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: string | null;
  role: "admin" | "student" | null;
}

export interface ApiResponse<T> {
  success: boolean;
  count?: number;
  data: T;
  message?: string;
  error?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: "admin" | "student";
}
