import { COURSES } from "@/data/courses";
import type { Course, SyllabusModule } from "@/types";

export type { SyllabusModule };

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
}

export interface Enrollment {
  id: string;
  userId: string;
  courseSlug: string;
  course: Course | null;
  enrollmentDate: string;
  progress: number;
  completedLessons: string[];
  currentLessonId: string | null;
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: string;
  completed: boolean;
  reward?: string;
  courses?: string[];
}

export interface UserProgress {
  userId: string;
  enrolledCourses: string[];
  milestones: Milestone[];
  totalHours: number;
}

export const DEFAULT_LESSONS: Record<string, Lesson[]> = {
  "fullstack-web-development": [
    { id: "fs-1", title: "1. Introduction to Full Stack Web Architecture", duration: "10 mins", completed: true },
    { id: "fs-2", title: "2. HTML5 Semantic Elements & Page Layouts", duration: "15 mins", completed: true },
    { id: "fs-3", title: "3. CSS3 Flexbox & Grid Masterclass", duration: "20 mins", completed: false },
    { id: "fs-4", title: "4. JavaScript ES6+ Features & Async/Await", duration: "25 mins", completed: false },
    { id: "fs-5", title: "5. React Components, Props & Hooks", duration: "30 mins", completed: false },
    { id: "fs-6", title: "6. Building REST APIs with Node.js & Express", duration: "35 mins", completed: false },
    { id: "fs-7", title: "7. MongoDB & Database Design", duration: "30 mins", completed: false },
    { id: "fs-8", title: "8. Authentication & Authorization (JWT)", duration: "25 mins", completed: false },
    { id: "fs-9", title: "9. Deployment on Vercel & AWS", duration: "20 mins", completed: false },
    { id: "fs-10", title: "10. Capstone Project Build", duration: "60 mins", completed: false },
  ],
  "data-science-machine-learning": [
    { id: "ds-1", title: "1. Python for Data Science Setup", duration: "15 mins", completed: true },
    { id: "ds-2", title: "2. NumPy Arrays & Operations", duration: "25 mins", completed: true },
    { id: "ds-3", title: "3. Pandas DataFrames & Cleaning", duration: "30 mins", completed: true },
    { id: "ds-4", title: "4. Data Visualization with Matplotlib", duration: "20 mins", completed: false },
    { id: "ds-5", title: "5. Machine Learning Fundamentals", duration: "35 mins", completed: false },
    { id: "ds-6", title: "6. Scikit-Learn Models & Training", duration: "40 mins", completed: false },
    { id: "ds-7", title: "7. Deep Learning with TensorFlow", duration: "45 mins", completed: false },
    { id: "ds-8", title: "8. Model Deployment with FastAPI", duration: "25 mins", completed: false },
  ],
  "cyber-security": [
    { id: "cs-1", title: "1. Networking Fundamentals & OSI Model", duration: "25 mins", completed: true },
    { id: "cs-2", title: "2. Linux Command Line & Scripting", duration: "35 mins", completed: false },
    { id: "cs-3", title: "3. Threat Landscape & Attack Vectors", duration: "30 mins", completed: false },
    { id: "cs-4", title: "4. Network Scanning & Enumeration", duration: "40 mins", completed: false },
    { id: "cs-5", title: "5. Web App Security & OWASP Top 10", duration: "45 mins", completed: false },
    { id: "cs-6", title: "6. Penetration Testing Process", duration: "50 mins", completed: false },
  ],
  "production-kubernetes": [
    { id: "k8s-1", title: "1. Cluster Architecture, etcd Quorum & Control Plane", duration: "30 mins", completed: true },
    { id: "k8s-2", title: "2. Pod Lifecycle, Deployments & Rolling Updates", duration: "45 mins", completed: false },
    { id: "k8s-3", title: "3. Services, Ingress NGINX & CoreDNS Internals", duration: "40 mins", completed: false },
    { id: "k8s-4", title: "4. Persistent Volumes & CSI Cloud Storage Drivers", duration: "50 mins", completed: false },
    { id: "k8s-5", title: "5. Istio Service Mesh & Zero-Trust mTLS", duration: "55 mins", completed: false },
    { id: "k8s-6", title: "6. GitOps Continuous Delivery with ArgoCD", duration: "45 mins", completed: false },
    { id: "k8s-7", title: "7. Prometheus, Grafana & KEDA Horizontal Autoscaling", duration: "40 mins", completed: false },
    { id: "k8s-8", title: "8. Production Capstone: Zero-Downtime Multi-Region Failover", duration: "60 mins", completed: false },
  ],
  "nextjs-fullstack": [
    { id: "nx-1", title: "1. React 19 Compiler & Next.js 15 App Architecture", duration: "30 mins", completed: true },
    { id: "nx-2", title: "2. Server Components vs Client Boundaries", duration: "35 mins", completed: false },
    { id: "nx-3", title: "3. Streaming, Suspense & Progressive Hydration", duration: "40 mins", completed: false },
    { id: "nx-4", title: "4. Server Actions, Optimistic UI & Zod Validations", duration: "45 mins", completed: false },
    { id: "nx-5", title: "5. Prisma ORM, PostgreSQL & PgBouncer Pooling", duration: "50 mins", completed: false },
    { id: "nx-6", title: "6. Distributed Redis Caching & Rate Limiting", duration: "40 mins", completed: false },
    { id: "nx-7", title: "7. Stripe Subscription Billing & Webhook Verifications", duration: "45 mins", completed: false },
    { id: "nx-8", title: "8. Multi-Tenant SaaS Capstone Deployment", duration: "60 mins", completed: false },
  ],
  "genai-llm-systems": [
    { id: "ai-1", title: "1. Vector Embeddings, Cosine Geometry & Chunking", duration: "35 mins", completed: true },
    { id: "ai-2", title: "2. Vector Databases: Qdrant, Pinecone & Hybrid Retrieval", duration: "40 mins", completed: false },
    { id: "ai-3", title: "3. Enterprise RAG Architectures & Cohere Re-Ranking", duration: "50 mins", completed: false },
    { id: "ai-4", title: "4. Fine-Tuning Llama 3 with QLoRA & HuggingFace PEFT", duration: "55 mins", completed: false },
    { id: "ai-5", title: "5. Autonomous Multi-Agent Swarms with LangGraph", duration: "45 mins", completed: false },
    { id: "ai-6", title: "6. Function Tool Calling & Structured JSON Schemas", duration: "40 mins", completed: false },
    { id: "ai-7", title: "7. Production Capstone: Enterprise RAG AI Assistant", duration: "60 mins", completed: false },
  ],
  "cloud-security-devsecops": [
    { id: "sec-1", title: "1. AWS IAM Zero-Trust, SCPs & Permission Boundaries", duration: "35 mins", completed: true },
    { id: "sec-2", title: "2. Container Vulnerability Audits with Trivy & Snyk", duration: "40 mins", completed: false },
    { id: "sec-3", title: "3. Secret Scanning & GitOps Security with Gitleaks", duration: "30 mins", completed: false },
    { id: "sec-4", title: "4. Infrastructure as Code Auditing with Checkov & tfsec", duration: "45 mins", completed: false },
    { id: "sec-5", title: "5. CloudTrail Forensics, GuardDuty & Incident Automation", duration: "50 mins", completed: false },
    { id: "sec-6", title: "6. Production Capstone: Zero-Trust CI/CD Guardrail Pipeline", duration: "60 mins", completed: false },
  ],
  "golang-microservices": [
    { id: "go-1", title: "1. Goroutines, Channels, Scheduler & Memory Model", duration: "35 mins", completed: true },
    { id: "go-2", title: "2. Protocol Buffers & High-Performance gRPC Services", duration: "45 mins", completed: false },
    { id: "go-3", title: "3. Database Sharding & PostgreSQL Connection Pooling", duration: "40 mins", completed: false },
    { id: "go-4", title: "4. Distributed Locking & Rate Limiting with Redis", duration: "40 mins", completed: false },
    { id: "go-5", title: "5. Event-Driven Sagas & Transactional Outbox Pattern", duration: "50 mins", completed: false },
    { id: "go-6", title: "6. Production Capstone: Sub-Millisecond Trading Engine", duration: "60 mins", completed: false },
  ],
  "data-engineering-kafka": [
    { id: "de-1", title: "1. Apache Kafka Architecture, Partitions & Consumer Groups", duration: "40 mins", completed: true },
    { id: "de-2", title: "2. Exactly-Once Semantics (EOS) & Schema Registry", duration: "45 mins", completed: false },
    { id: "de-3", title: "3. PySpark Structured Streaming on Real-Time Feeds", duration: "50 mins", completed: false },
    { id: "de-4", title: "4. Delta Lake & Parquet Storage Optimizations", duration: "40 mins", completed: false },
    { id: "de-5", title: "5. Snowflake Dimensional Modeling with dbt Core", duration: "45 mins", completed: false },
    { id: "de-6", title: "6. Production Capstone: Real-Time Billion-Event Telemetry", duration: "60 mins", completed: false },
  ],
  "devops-cloud-architect": [
    { id: "dca-1", title: "1. Linux Kernel Namespaces, cgroups & Storage Drivers", duration: "40 mins", completed: true },
    { id: "dca-2", title: "2. Multi-Master High Availability Kubernetes Clusters", duration: "50 mins", completed: false },
    { id: "dca-3", title: "3. Modular Enterprise Terraform on AWS Infrastructure", duration: "55 mins", completed: false },
    { id: "dca-4", title: "4. GitOps CI/CD Pipelines with ArgoCD & GitHub Actions", duration: "45 mins", completed: false },
    { id: "dca-5", title: "5. Prometheus, Grafana Alerting & SLO/SLA Architecture", duration: "45 mins", completed: false },
    { id: "dca-6", title: "6. Capstone: Resilient Multi-Region Cloud Infrastructure", duration: "70 mins", completed: false },
  ],
};

export const DEFAULT_ENROLLMENTS: Enrollment[] = [
  {
    id: "enroll-001",
    userId: "demo-001",
    courseSlug: "fullstack-web-development",
    course: COURSES.find((c) => c.slug === "fullstack-web-development")!,
    enrollmentDate: "2026-09-20",
    progress: 35,
    completedLessons: ["fs-1", "fs-2"],
    currentLessonId: "fs-3",
  },
  {
    id: "enroll-002",
    userId: "demo-001",
    courseSlug: "data-science-machine-learning",
    course: COURSES.find((c) => c.slug === "data-science-machine-learning")!,
    enrollmentDate: "2026-09-22",
    progress: 60,
    completedLessons: ["ds-1", "ds-2", "ds-3"],
    currentLessonId: "ds-4",
  },
];

export const DEFAULT_MILESTONES: Milestone[] = [
  {
    id: "ms-1",
    title: "Account Created",
    description: "Welcome to the Netcoder LMS! You're now part of the learning community.",
    icon: "🎉",
    completed: true,
  },
  {
    id: "ms-2",
    title: "First Lesson Completed",
    description: "Completed your first lesson and earned your first progress point.",
    icon: "✅",
    completed: true,
    reward: "50 XP",
    courses: ["fullstack-web-development"],
  },
  {
    id: "ms-3",
    title: "First Course Enrolled",
    description: "Enrolled in your first professional course.",
    icon: "📚",
    completed: true,
    reward: "Badge: Learner",
    courses: ["fullstack-web-development"],
  },
  {
    id: "ms-4",
    title: "Two Courses Enrolled",
    description: "Enrolled in a second course — building breadth across tech domains.",
    icon: "🔥",
    completed: true,
    reward: "100 XP",
  },
  {
    id: "ms-5",
    title: "50% Progress on a Course",
    description: "Reached the halfway mark on a course. Halfway to mastery!",
    icon: "🚀",
    completed: false,
    reward: "Badge: Halfway There",
  },
  {
    id: "ms-6",
    title: "First Certificate Earned",
    description: "Complete your first course to earn a certificate.",
    icon: "🏆",
    completed: false,
    reward: "Certificate",
  },
  {
    id: "ms-7",
    title: "All Courses Completed",
    description: "Complete every enrolled course to become a Netcoder Master.",
    icon: "👑",
    completed: false,
    reward: "Badge: Netcoder Master",
  },
];

export function getUserProgress(userId: string): UserProgress {
  const userEnrollments = DEFAULT_ENROLLMENTS.filter((e) => e.userId === userId);

  const milestones = DEFAULT_MILESTONES.map((m) => {
    if (m.id === "ms-5") {
      return {
        ...m,
        completed: userEnrollments.some((e) => e.progress >= 50),
      };
    }
    if (m.id === "ms-6") {
      return {
        ...m,
        completed: userEnrollments.some(
          (e) => e.course && e.course.slug === "fullstack-web-development" && e.progress >= 100
        ),
      };
    }
    return m;
  });

  const totalHours = userEnrollments.reduce((sum, e) => {
    if (!e.course) return sum;
    return sum + (e.completedLessons.length / Math.max(e.course.syllabus.length, 1)) * 20;
  }, 0);

  return {
    userId,
    enrolledCourses: userEnrollments.map((e) => e.courseSlug),
    milestones,
    totalHours: Math.round(totalHours),
  };
}
