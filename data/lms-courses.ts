// Master LMS & Cloud Courses for Netcoder Technology

export interface LMSCourse {
  slug: string;
  title: string;
  subtitle?: string;
  category: "cloud" | "fullstack" | "ai" | "cyber" | "systems";
  price: number;
  originalPrice: number;
  fee?: number;
  rating: number;
  ratingCount: number;
  learnersCount?: number;
  duration: string;
  level: string;
  badge: string;
  tagline: string;
  icon: string;
  hours: string;
  instructor: string;
  instructorAvatar: string;
  image: string;
  overview: string;
  breadcrumbs?: string[];
  lastUpdated?: string;
  language?: string;
  subtitles?: string;
  couponCode?: string;
  whatYouWillLearn?: string[];
  requirements?: string[];
  description?: string;
  tools?: string[];
  syllabus?: Array<{
    module: string;
    lessons: string[];
  }>;
}

export const LMS_COURSES: LMSCourse[] = [
  {
    slug: "the-complete-agentic-ai-engineering-course",
    title: "AI Engineer Agentic Track: The Complete Agent & MCP Course",
    subtitle: "Master AI Agents in 30 days: build 8 real-world projects with OpenAI Agents SDK, CrewAI, LangGraph, AutoGen and MCP.",
    category: "ai",
    price: 459,
    originalPrice: 799,
    fee: 459,
    rating: 4.7,
    ratingCount: 49182,
    learnersCount: 403098,
    duration: "34.5 hrs • 248 lectures",
    level: "All Levels",
    badge: "Bestseller",
    tagline: "OpenAI Agents SDK, CrewAI, LangGraph & MCP",
    icon: "psychology",
    hours: "34.5 hrs • 248 lectures",
    instructor: "Ed Donner, Ligency",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
    overview: "Master AI Agents in 30 days: build 8 real-world projects with OpenAI Agents SDK, CrewAI, LangGraph, AutoGen and Model Context Protocol (MCP).",
    breadcrumbs: ["Development", "Data Science", "AI Agents & Agentic AI"],
    lastUpdated: "9/2026",
    language: "English",
    subtitles: "Arabic [Auto], Bulgarian [Auto], 32 more",
    couponCode: "MT261005G1",
    whatYouWillLearn: [
      "Build real-world multi-agent architectures using OpenAI Agents SDK, CrewAI, LangGraph & AutoGen",
      "Connect LLMs with real tools, APIs, and databases via the Model Context Protocol (MCP)",
      "Design autonomous agent workflows with memory, reflection, planning, and tool orchestration",
      "Deploy production-ready agents with tracing, observability, latency evaluation, and security guardrails",
      "Create deterministic state machines with LangGraph for human-in-the-loop validation",
      "Implement multi-turn autonomous coding agents and conversational customer support systems",
    ],
    requirements: [
      "Basic understanding of Python programming (functions, loops, classes)",
      "Curiosity about artificial intelligence, prompt engineering, and LLMs",
      "No prior agentic AI or machine learning math background needed — we start from first principles",
    ],
    description: "The Complete Agentic AI Engineering Course is designed from the ground up to take you from foundational generative AI concepts to building robust, autonomous multi-agent production systems. Learn how OpenAI Agents SDK, CrewAI, LangGraph, and Model Context Protocol (MCP) work together to power next-generation software architectures.",
    syllabus: [
      {
        module: "Section 1: Foundations of Agentic AI & The MCP Architecture",
        lessons: [
          "1. Welcome & Complete Agentic AI Roadmap",
          "2. From Simple Prompts to Autonomous Reasoning Loops",
          "3. The Model Context Protocol (MCP) Specification Deep Dive",
          "4. Setting up Environment: Python 3.12, UV, and API Keys",
        ],
      },
      {
        module: "Section 2: OpenAI Agents SDK & Tool Calling in Practice",
        lessons: [
          "5. OpenAI Agents SDK Architecture & Core Primitives",
          "6. Function Calling vs Tool Orchestration",
          "7. Building our First Agent with Custom File I/O Tools",
          "8. Error Recovery & Fallback Strategies",
        ],
      },
      {
        module: "Section 3: CrewAI Multi-Agent Collaborative Systems",
        lessons: [
          "9. Designing Specialized Agent Personas & Goals",
          "10. Sequential vs Hierarchical Delegation Processes",
          "11. Project: Autonomous Market Research & Lead Generation Crew",
          "12. Connecting External MCP Server to CrewAI Workers",
        ],
      },
      {
        module: "Section 4: LangGraph State Graphs & Human-in-the-Loop",
        lessons: [
          "13. Nodes, Edges, State Reducers, and Conditional Routing",
          "14. Persisting Agent State with Memory & Checkpointers",
          "15. Implementing Human-in-the-Loop Approval Checkpoints",
          "16. Project: Code Review & Automated GitHub PR Agent",
        ],
      },
      {
        module: "Section 5: Production Deployment, Tracing & Guardrails",
        lessons: [
          "17. Tracing with Langfuse & Arize Phoenix",
          "18. Preventing Infinite Loops and Hallucination Guardrails",
          "19. Dockerizing and Deploying Agents to Cloud Run / Kubernetes",
          "20. Capstone Presentation & Certificate Verification",
        ],
      },
    ],
  },
  {
    slug: "production-kubernetes",
    title: "Production Kubernetes & Multi-Cloud Infrastructure",
    category: "cloud",
    price: 89,
    originalPrice: 199,
    fee: 89,
    rating: 4.9,
    ratingCount: 3420,
    duration: "42 hrs • 18 Cloud Labs",
    level: "Advanced",
    badge: "Advanced",
    tagline: "Updated Jan 2025",
    icon: "terminal",
    hours: "42 hrs • 18 Cloud Labs",
    instructor: "Sarah Vance, Principal SRE @ CloudScale",
    instructorAvatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800",
    overview: "Deploy fault-tolerant clusters, implement service meshes using Istio, configure GitOps with ArgoCD, and manage zero-trust network policies in live cloud sandboxes.",
    syllabus: [
      {
        module: "Module 1: Production Kubernetes & Helm",
        lessons: [
          "1. Cluster Architecture & High Availability Control Plane",
          "2. Container Storage Interface (CSI) & Persistent Volumes",
          "3. Helm 3 Production Chart Templating",
        ],
      },
      {
        module: "Module 2: Service Mesh & Ingress Routing",
        lessons: [
          "4. Istio Envoy Proxy & Traffic Shifting",
          "5. Mutual TLS (mTLS) & Zero-Trust Policies",
        ],
      },
      {
        module: "Module 3: GitOps with ArgoCD",
        lessons: [
          "6. Declarative Continuous Delivery",
          "7. Automated Canary Deployments with Flagger",
        ],
      },
    ],
  },
  {
    slug: "nextjs-fullstack",
    title: "Full-Stack Next.js 15, TypeScript & Distributed Microservices",
    category: "fullstack",
    price: 79,
    originalPrice: 180,
    fee: 79,
    rating: 4.95,
    ratingCount: 4190,
    duration: "38 hrs • 8 Full Projects",
    level: "Intermediate to Advanced",
    badge: "Popular",
    tagline: "Next.js 15 App Router",
    icon: "code",
    hours: "38 hrs • 8 Full Projects",
    instructor: "Alex Chen, Ex-Staff Engineer @ Google",
    instructorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800",
    overview: "Architect high-scale web apps with Server Components, Turborepo, Prisma ORM, Redis caching, and Stripe billing pipelines.",
    syllabus: [
      {
        module: "Module 1: Next.js 15 Foundations & SSR",
        lessons: [
          "1. Turbopack Architecture & Edge Runtime",
          "2. Streaming SSR & React 19 Server Components",
          "3. Server Actions & Form Mutations",
        ],
      },
      {
        module: "Module 2: Scalable Database & Caching",
        lessons: [
          "4. Prisma ORM & PostgreSQL Optimization",
          "5. Distributed Cache with Upstash Redis",
        ],
      },
      {
        module: "Module 3: Realtime Engine & Billing",
        lessons: [
          "6. Webhooks & Stripe Subscriptions",
          "7. Live Collaboration with WebSockets",
        ],
      },
    ],
  },
  {
    slug: "genai-llm-systems",
    title: "Generative AI & LLM Systems Engineering with LangChain & PyTorch",
    category: "ai",
    price: 99,
    originalPrice: 249,
    fee: 99,
    rating: 4.92,
    ratingCount: 2110,
    duration: "46 hrs • 10 LLM Apps",
    level: "Advanced",
    badge: "Trending",
    tagline: "LangChain & PyTorch",
    icon: "psychology",
    hours: "46 hrs • 10 LLM Apps",
    instructor: "Dr. Dev Patel, Lead AI Architect",
    instructorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800",
    overview: "Construct production RAG architectures, fine-tune open-weights models (Llama 3), build autonomous agents, and evaluate hallucination metrics.",
    syllabus: [
      {
        module: "Module 1: LLM Foundations & Vector DBs",
        lessons: [
          "1. Embeddings, High-Dimensional Geometry & Vector Search",
          "2. Pinecone & Milvus Vector Indexing",
          "3. Advanced Semantic Chunking",
        ],
      },
      {
        module: "Module 2: Advanced RAG Architecture",
        lessons: [
          "4. Multi-Query & Hypothetical Document Embeddings (HyDE)",
          "5. Cohere Cross-Encoder Reranking",
        ],
      },
      {
        module: "Module 3: Fine-Tuning & Quantization",
        lessons: [
          "6. LoRA & QLoRA Fine-Tuning Llama 3",
          "7. vLLM & TensorRT High-Throughput Serving",
        ],
      },
    ],
  },
  {
    slug: "cloud-security-devsecops",
    title: "Enterprise Cloud Security & AWS DevSecOps Mastery",
    category: "cyber",
    price: 89,
    originalPrice: 210,
    fee: 89,
    rating: 4.88,
    ratingCount: 1840,
    duration: "35 hrs • 14 Attack Labs",
    level: "Advanced",
    badge: "Security",
    tagline: "Zero-Trust",
    icon: "shield",
    hours: "35 hrs • 14 Attack Labs",
    instructor: "Elena Rostova, CISO Advisor & SANS Author",
    instructorAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800",
    overview: "Implement automated SAST/DAST pipelines, cloud penetration audits, IAM least-privilege guardrails, and compliance-as-code automation.",
    syllabus: [
      {
        module: "Module 1: Cloud Attack Vectors",
        lessons: [
          "1. AWS IAM Privilege Escalation Scenarios",
          "2. S3 Bucket Misconfigurations & SSRF Attacks",
          "3. KMS Key Policies & Cryptographic Flaws",
        ],
      },
      {
        module: "Module 2: DevSecOps CI/CD Pipelines",
        lessons: [
          "4. Automated SAST with Semgrep & SonarQube",
          "5. Container Image Vulnerability Scanning with Trivy",
        ],
      },
      {
        module: "Module 3: Incident Response & Forensics",
        lessons: [
          "6. AWS CloudTrail Log Analysis with Athena",
          "7. Automated Remediation with Lambda",
        ],
      },
    ],
  },
  {
    slug: "golang-microservices",
    title: "Modern Backend with Go, gRPC, Redis & Distributed Systems",
    category: "systems",
    price: 79,
    originalPrice: 190,
    fee: 79,
    rating: 4.94,
    ratingCount: 2830,
    duration: "40 hrs • 6 Microservices",
    level: "Advanced",
    badge: "High Throughput",
    tagline: "gRPC & Redis",
    icon: "memory",
    hours: "40 hrs • 6 Microservices",
    instructor: "Marcus Brody, Principal Architect @ Uber",
    instructorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    overview: "Write concurrent, sub-millisecond backend microservices in Go. Master raft consensus, distributed locks, database sharding, and fault injection.",
    syllabus: [
      {
        module: "Module 1: High-Performance Go Concurrency",
        lessons: [
          "1. Goroutines, Channels & Worker Pools",
          "2. Memory Profiling with pprof & Benchmarks",
          "3. Zero-Allocation Buffer Patterns",
        ],
      },
      {
        module: "Module 2: gRPC & Protobuf RPC Services",
        lessons: [
          "4. Protocol Buffers v3 & Schema Evolution",
          "5. Bidirectional Streaming & Interceptors",
        ],
      },
      {
        module: "Module 3: Distributed State & Event Streaming",
        lessons: [
          "6. Redis Distributed Locks (Redlock)",
          "7. Apache Kafka Event-Driven Architecture",
        ],
      },
    ],
  },
  {
    slug: "data-engineering-kafka",
    title: "Data Engineering Pipeline Mastery with Kafka, Spark & Snowflake",
    category: "systems",
    price: 89,
    originalPrice: 220,
    fee: 89,
    rating: 4.91,
    ratingCount: 1670,
    duration: "44 hrs • 9 ETL Pipelines",
    level: "Advanced",
    badge: "Big Data",
    tagline: "Kafka + Spark",
    icon: "schema",
    hours: "44 hrs • 9 ETL Pipelines",
    instructor: "Priya Nair, Staff Data Engineer @ Stripe",
    instructorAvatar: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
    overview: "Ingest billions of real-time events. Construct idempotent streaming pipelines using Apache Kafka, PySpark Structured Streaming, and modern dbt models.",
    syllabus: [
      {
        module: "Module 1: Distributed Streaming with Kafka",
        lessons: [
          "1. Kafka Partitions, Consumer Groups & Offsets",
          "2. Schema Registry with Avro",
          "3. Exactly-Once Semantics (EOS)",
        ],
      },
      {
        module: "Module 2: PySpark Distributed Transformations",
        lessons: [
          "4. Spark SQL & DataFrames Internal Optimization",
          "5. Catalyst Optimizer & Tungsten Engine",
        ],
      },
      {
        module: "Module 3: Data Warehousing with Snowflake",
        lessons: [
          "6. Snowflake Zero-Copy Cloning & Time Travel",
          "7. dbt Modular Transformation Pipelines",
        ],
      },
    ],
  },
  {
    slug: "fullstack-web-development",
    title: "Full Stack Web Development (MERN / Next.js Diploma)",
    category: "fullstack",
    price: 120,
    originalPrice: 250,
    fee: 120,
    rating: 4.95,
    ratingCount: 3120,
    duration: "6 Months • 20 Real Projects",
    level: "Beginner to Advanced",
    badge: "Bestseller",
    tagline: "Placement Assured",
    icon: "laptop_mac",
    hours: "6 Months • 20 Real Projects",
    instructor: "Netcoder Industry Mentors",
    instructorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    image: "/images/full-stact-development.png",
    overview: "Master modern web applications with React, Next.js, Node.js, Express, MongoDB, and Tailwind CSS with real client capstone projects.",
    syllabus: [
      {
        module: "Module 1: Web Foundations",
        lessons: [
          "1. Introduction to Web Architecture",
          "2. HTML5 Semantic Layouts",
          "3. CSS3 Flexbox & Grid Masterclass",
        ],
      },
      {
        module: "Module 2: JavaScript Mastery",
        lessons: [
          "4. ES6+ Modern JavaScript",
          "5. Async/Await & Fetch API",
        ],
      },
      {
        module: "Module 3: React & Next.js",
        lessons: [
          "6. Components & Hooks",
          "7. Next.js App Router & SSR",
        ],
      },
      {
        module: "Module 4: Backend & Database",
        lessons: [
          "8. Node.js & Express REST APIs",
          "9. MongoDB Aggregations",
          "10. JWT Authentication & Security",
        ],
      },
    ],
  },
];
