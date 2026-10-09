// Netcoder Technology - LMS Live Classes, Notes, Tasks & Mentor Data

export interface LiveClass {
  id: string;
  courseSlug: string;
  courseTitle: string;
  title: string;
  mentorName: string;
  mentorEmail?: string;
  mentorAvatar?: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  time: string; // Display string, e.g. "06:30 PM - 08:00 PM IST"
  platform: "Google Meet" | "Zoom" | "Microsoft Teams" | "YouTube Live";
  meetingLink: string;
  meetingId?: string;
  passcode?: string;
  status: "live" | "upcoming" | "completed";
  agenda: string[];
  recordingUrl?: string;
  isAutomatedDaily?: boolean;
  batch?: string;
  createdAt?: string;
}

export interface MentorNote {
  id: string;
  courseSlug: string;
  courseTitle: string;
  title: string;
  topic: string;
  module: string;
  mentorName: string;
  fileUrl: string;
  fileType: "pdf" | "doc" | "code" | "slides";
  fileSize: string;
  contentSnippet: string;
  publishedAt: string;
  downloadsCount: number;
}

export interface MentorTask {
  id: string;
  courseSlug: string;
  courseTitle: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
  status: "open" | "submitted" | "graded";
  starterRepo?: string;
  submissionType: "github" | "zip" | "url";
  mentorName: string;
  submissionsCount: number;
}

export interface MentorTest {
  id: string;
  courseSlug: string;
  courseTitle: string;
  title: string;
  duration: string;
  totalQuestions: number;
  totalMarks: number;
  passingScore: number;
  scheduledDate: string;
  mentorName: string;
  questionsCount?: number;
  testUrl?: string;
}

export interface MentorProfile {
  id: string;
  name: string;
  email: string;
  password?: string;
  specialization: string;
  courses: string[];
  avatar: string;
  phone: string;
  rating: number;
  totalBatches: number;
  totalStudents: number;
}

export const INITIAL_MENTORS: MentorProfile[] = [
  {
    id: "mentor-001",
    name: "Nitin Kapoor",
    email: "mentor@netcoder.in",
    password: "mentor123",
    specialization: "Full Stack, React 19, Next.js & Distributed Systems",
    courses: ["fullstack-web-development", "nextjs-fullstack"],
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    phone: "+91 98765 43210",
    rating: 4.96,
    totalBatches: 18,
    totalStudents: 420,
  },
  {
    id: "mentor-002",
    name: "Dr. Dev Patel",
    email: "dev@netcoder.in",
    password: "mentor123",
    specialization: "GenAI, LLMs, PyTorch & Deep Learning",
    courses: ["data-science-machine-learning", "genai-llm-systems"],
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    phone: "+91 98765 12345",
    rating: 4.92,
    totalBatches: 12,
    totalStudents: 280,
  },
  {
    id: "mentor-003",
    name: "Sarah Vance",
    email: "sarah@netcoder.in",
    password: "mentor123",
    specialization: "Kubernetes, Istio, Multi-Cloud SRE & GitOps",
    courses: ["production-kubernetes", "devops-cloud-architect"],
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    phone: "+91 98765 67890",
    rating: 4.98,
    totalBatches: 15,
    totalStudents: 350,
  },
  {
    id: "mentor-004",
    name: "Elena Rostova",
    email: "elena@netcoder.in",
    password: "mentor123",
    specialization: "Offensive Security, DevSecOps & Zero-Trust Cloud",
    courses: ["cyber-security", "cloud-security-devsecops"],
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
    phone: "+91 98765 99887",
    rating: 4.89,
    totalBatches: 9,
    totalStudents: 190,
  },
];

export const INITIAL_CLASSES: LiveClass[] = [
  {
    id: "cls-101",
    courseSlug: "fullstack-web-development",
    courseTitle: "Full Stack Web Development (MERN / Next.js Diploma)",
    title: "Live Interactive Class: React 19 & Next.js 15 Server Actions Architecture",
    mentorName: "Nitin Kapoor",
    mentorEmail: "mentor@netcoder.in",
    mentorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    date: new Date().toISOString().split("T")[0],
    startTime: "18:30",
    endTime: "20:00",
    time: "06:30 PM - 08:00 PM IST",
    platform: "Google Meet",
    meetingLink: "https://meet.google.com/net-fsdev-live",
    meetingId: "net-fsdev-live",
    passcode: "NETCODER2026",
    status: "live",
    agenda: [
      "Deep dive into React 19 Server Components and Compiler optimizations",
      "Building idempotent Server Actions with Zod validations and Optimistic UI",
      "Hands-on interactive Q&A and code review",
    ],
    isAutomatedDaily: true,
    batch: "Cohort 14 (Batch 2026-A)",
    createdAt: "2026-10-02 10:00:00",
  },
  {
    id: "cls-102",
    courseSlug: "data-science-machine-learning",
    courseTitle: "Data Science & Machine Learning",
    title: "Live Math & Code: Deep Neural Networks & Custom PyTorch Layers",
    mentorName: "Dr. Dev Patel",
    mentorEmail: "dev@netcoder.in",
    mentorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    date: new Date().toISOString().split("T")[0],
    startTime: "20:15",
    endTime: "21:45",
    time: "08:15 PM - 09:45 PM IST",
    platform: "Zoom",
    meetingLink: "https://zoom.us/j/98765432101?pwd=NETML",
    meetingId: "987 6543 2101",
    passcode: "NETML26",
    status: "upcoming",
    agenda: [
      "Deriving backward pass gradients analytically",
      "Building a custom PyTorch autograd function",
      "Training transformer attention mechanisms on Colab GPUs",
    ],
    isAutomatedDaily: true,
    batch: "AI & ML Specialist Cohort",
    createdAt: "2026-10-02 09:30:00",
  },
  {
    id: "cls-103",
    courseSlug: "production-kubernetes",
    courseTitle: "Production Kubernetes & Multi-Cloud Infrastructure",
    title: "Live Cloud Lab: Zero-Trust Istio Service Mesh & mTLS Ingress",
    mentorName: "Sarah Vance",
    mentorEmail: "sarah@netcoder.in",
    mentorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    date: new Date(Date.now() + 86400000).toISOString().split("T")[0],
    startTime: "19:00",
    endTime: "20:30",
    time: "07:00 PM - 08:30 PM IST",
    platform: "Google Meet",
    meetingLink: "https://meet.google.com/k8s-cloud-live",
    meetingId: "k8s-cloud-live",
    passcode: "K8SCLOUD",
    status: "upcoming",
    agenda: [
      "Configuring PeerAuthentication for strict mTLS",
      "VirtualServices and traffic splitting for canary deployments",
      "Debugging Envoy proxy sidecar logs with istioctl",
    ],
    isAutomatedDaily: false,
    batch: "Cloud DevOps Track",
    createdAt: "2026-10-01 14:00:00",
  },
  {
    id: "cls-104",
    courseSlug: "cyber-security",
    courseTitle: "Cyber Security & Ethical Hacking",
    title: "Live Cyber Defense Lab: OWASP Top 10 Attack Simulation & Pen-Test",
    mentorName: "Elena Rostova",
    mentorEmail: "elena@netcoder.in",
    mentorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
    date: new Date().toISOString().split("T")[0],
    startTime: "16:00",
    endTime: "17:30",
    time: "04:00 PM - 05:30 PM IST",
    platform: "Microsoft Teams",
    meetingLink: "https://teams.microsoft.com/l/meetup-join/netcoder-sec",
    meetingId: "teams-netcoder-sec",
    passcode: "CYBER2026",
    status: "completed",
    agenda: [
      "Real-world SQL injection and blind time-based extraction",
      "JWT algorithm confusion and tampering exploit",
      "Automated remediation scripting",
    ],
    recordingUrl: "https://netcoder.in/recordings/cyber-sec-lab-04",
    isAutomatedDaily: false,
    batch: "Security Red Team Batch",
    createdAt: "2026-10-02 08:00:00",
  },
];

export const INITIAL_NOTES: MentorNote[] = [
  {
    id: "note-1",
    courseSlug: "fullstack-web-development",
    courseTitle: "Full Stack Web Development",
    title: "Module 4 Complete Handbook: React 19 Compiler & Next.js 15 Server Actions",
    topic: "Next.js App Router Architecture",
    module: "Module 4: Frontend Mastery",
    mentorName: "Nitin Kapoor",
    fileUrl: "https://netcoder.in/downloads/react19-next15-handbook.pdf",
    fileType: "pdf",
    fileSize: "4.8 MB",
    contentSnippet: "Complete reference covering useActionState, optimistic UI patterns, RSC streaming boundaries, and production Prisma connection pooling.",
    publishedAt: "Oct 2, 2026",
    downloadsCount: 184,
  },
  {
    id: "note-2",
    courseSlug: "data-science-machine-learning",
    courseTitle: "Data Science & Machine Learning",
    title: "Deep Learning Linear Algebra, Autograd Math & Optimization Algorithms",
    topic: "Neural Network Calculus",
    module: "Module 6: Deep Learning",
    mentorName: "Dr. Dev Patel",
    fileUrl: "https://netcoder.in/downloads/dl-math-handbook.pdf",
    fileType: "pdf",
    fileSize: "6.2 MB",
    contentSnippet: "Complete mathematical derivations for gradient descent, Adam optimizer momentum equations, backpropagation through time (BPTT), and attention matrix scaling.",
    publishedAt: "Oct 1, 2026",
    downloadsCount: 245,
  },
  {
    id: "note-3",
    courseSlug: "production-kubernetes",
    courseTitle: "Production Kubernetes & Multi-Cloud",
    title: "Enterprise Kubernetes Production Helm Charts & Manifests Suite",
    topic: "Production Ingress & Istio",
    module: "Module 5: Mesh & Security",
    mentorName: "Sarah Vance",
    fileUrl: "https://netcoder.in/downloads/k8s-prod-helm-suite.zip",
    fileType: "code",
    fileSize: "14.1 MB",
    contentSnippet: "Battle-tested Helm chart configurations for zero-downtime rolling updates, Horizontal Pod Autoscalers (HPA with Prometheus metrics), and Cert-Manager SSL certificates.",
    publishedAt: "Sep 30, 2026",
    downloadsCount: 312,
  },
];

export const INITIAL_TASKS: MentorTask[] = [
  {
    id: "task-1",
    courseSlug: "fullstack-web-development",
    courseTitle: "Full Stack Web Development",
    title: "Assignment 4: Build a Real-Time Collaborative Canvas with WebSockets & React 19",
    description: "Architect a multi-user drawing application with cursor broadcast, undo/redo state history, and persistent session storage in MongoDB with Next.js Server Actions.",
    dueDate: "2026-10-08",
    points: 100,
    status: "open",
    starterRepo: "https://github.com/netcoder-tech/collaborative-canvas-starter",
    submissionType: "github",
    mentorName: "Nitin Kapoor",
    submissionsCount: 18,
  },
  {
    id: "task-2",
    courseSlug: "data-science-machine-learning",
    courseTitle: "Data Science & Machine Learning",
    title: "Capstone Milestone: End-to-End Sentiment Classifier with PyTorch & FastAPI",
    description: "Fine-tune a lightweight transformer model for customer review sentiment, measure ROC-AUC and F1 scores, and package it inside a high-throughput FastAPI microservice.",
    dueDate: "2026-10-10",
    points: 100,
    status: "open",
    starterRepo: "https://github.com/netcoder-tech/sentiment-nlp-starter",
    submissionType: "github",
    mentorName: "Dr. Dev Patel",
    submissionsCount: 11,
  },
];

export const INITIAL_TESTS: MentorTest[] = [
  {
    id: "test-1",
    courseSlug: "fullstack-web-development",
    courseTitle: "Full Stack Web Development",
    title: "Full-Stack Architecture & React 19 Mastery Mid-Term Assessment",
    duration: "45 mins",
    totalQuestions: 25,
    totalMarks: 50,
    passingScore: 35,
    scheduledDate: "2026-10-05",
    mentorName: "Nitin Kapoor",
    questionsCount: 25,
  },
  {
    id: "test-2",
    courseSlug: "data-science-machine-learning",
    courseTitle: "Data Science & Machine Learning",
    title: "Machine Learning Algorithms & Hyperparameter Tuning Assessment",
    duration: "40 mins",
    totalQuestions: 20,
    totalMarks: 40,
    passingScore: 28,
    scheduledDate: "2026-10-07",
    mentorName: "Dr. Dev Patel",
    questionsCount: 20,
  },
];

// Helper to determine if a class is happening right now (automated status)
function getIndiaDateKey(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${values.year}-${values.month}-${values.day}`;
}

export function calculateAutomatedClassStatus(cls: LiveClass): "live" | "upcoming" | "completed" {
  if (cls.status === "completed") return "completed";
  const now = new Date();
  const classDate = cls.isAutomatedDaily
    ? getIndiaDateKey(now)
    : cls.date;
  const startAt = new Date(`${classDate}T${cls.startTime}:00+05:30`);
  const endAt = new Date(`${classDate}T${cls.endTime}:00+05:30`);

  if (!Number.isFinite(startAt.getTime()) || !Number.isFinite(endAt.getTime())) {
    return cls.status === "live" ? "live" : "upcoming";
  }

  const liveWindowStart = startAt.getTime() - 15 * 60_000;
  if (now.getTime() >= liveWindowStart && now.getTime() <= endAt.getTime()) return "live";
  if (now.getTime() > endAt.getTime()) return cls.isAutomatedDaily ? "upcoming" : "completed";
  return "upcoming";
}

export function getLiveClassStartAt(cls: LiveClass, now = new Date()) {
  const date = cls.isAutomatedDaily
    ? getIndiaDateKey(now)
    : cls.date;
  const startAt = new Date(`${date}T${cls.startTime}:00+05:30`);
  if (!Number.isFinite(startAt.getTime())) return null;

  if (cls.isAutomatedDaily && startAt.getTime() <= now.getTime()) {
    startAt.setTime(startAt.getTime() + 24 * 60 * 60_000);
  }
  return startAt;
}
