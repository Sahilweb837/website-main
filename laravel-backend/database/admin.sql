-- ============================================================================
-- Netcoder Technology - Complete Relational Database Schema
-- File: admin.sql
-- Compatible with: MySQL 5.7+ / MySQL 8.0+ / MariaDB 10.3+
-- Includes: Admins, Blogs, Courses, Students, LMS Enrollments, Feedbacks, DRM Logs
-- ============================================================================

CREATE DATABASE IF NOT EXISTS `netcoder_lms` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `netcoder_lms`;

SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------------------------------------------------------
-- 1. Table: admins
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `admins`;
CREATE TABLE `admins` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role` ENUM('super_admin', 'instructor', 'editor') NOT NULL DEFAULT 'super_admin',
  `remember_token` VARCHAR(100) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 2. Table: categories
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `slug` VARCHAR(100) NOT NULL UNIQUE,
  `description` TEXT NULL,
  `icon` VARCHAR(60) NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 3. Table: courses
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `category_id` BIGINT UNSIGNED NULL,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `duration` VARCHAR(80) NOT NULL DEFAULT '6 Months',
  `level` VARCHAR(80) NOT NULL DEFAULT 'Beginner to Advanced',
  `overview` TEXT NOT NULL,
  `fee` DECIMAL(10,2) NULL DEFAULT 0.00,
  `price` DECIMAL(10,2) NULL DEFAULT 79.00,
  `original_price` DECIMAL(10,2) NULL DEFAULT 199.00,
  `instructor` VARCHAR(150) NULL DEFAULT 'Netcoder Senior Faculty',
  `instructor_avatar` VARCHAR(255) NULL,
  `hours` VARCHAR(80) NULL DEFAULT '40 hrs',
  `icon` VARCHAR(60) NULL DEFAULT 'code',
  `tagline` VARCHAR(150) NULL,
  `image` VARCHAR(255) NOT NULL DEFAULT '/images/full-stact-development.png',
  `rating` DECIMAL(3,2) NOT NULL DEFAULT 4.90,
  `reviews_count` INT UNSIGNED NOT NULL DEFAULT 120,
  `badge` VARCHAR(50) NULL DEFAULT 'Bestseller',
  `syllabus` JSON NULL COMMENT 'Array of module objects with lessons and topics',
  `highlights` JSON NULL COMMENT 'Array of string key features',
  `tags` JSON NULL COMMENT 'Search tags',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_courses_category` (`category_id`),
  CONSTRAINT `fk_courses_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 4. Table: students
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `student_code` VARCHAR(50) NOT NULL UNIQUE,
  `name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(150) NOT NULL UNIQUE,
  `phone` VARCHAR(30) NULL,
  `password` VARCHAR(255) NULL,
  `avatar` VARCHAR(255) NULL,
  `drm_status` ENUM('Protected', 'Restricted', 'Revoked') NOT NULL DEFAULT 'Protected',
  `drm_watermark_id` VARCHAR(100) NOT NULL,
  `last_login_at` TIMESTAMP NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_student_code` (`student_code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 5. Table: enrollments
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `enrollments`;
CREATE TABLE `enrollments` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `student_id` BIGINT UNSIGNED NOT NULL,
  `course_id` BIGINT UNSIGNED NOT NULL,
  `progress_percentage` TINYINT UNSIGNED NOT NULL DEFAULT 0,
  `completed_lessons` JSON NULL COMMENT 'Array of lesson IDs marked finished',
  `current_lesson_id` VARCHAR(80) NULL,
  `drm_session_token` VARCHAR(150) NULL,
  `enrolled_at` DATE NOT NULL,
  `last_accessed_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` ENUM('active', 'completed', 'paused') NOT NULL DEFAULT 'active',
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_student_course` (`student_id`, `course_id`),
  CONSTRAINT `fk_enroll_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_enroll_course` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 6. Table: blogs
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `blogs`;
CREATE TABLE `blogs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `slug` VARCHAR(255) NOT NULL UNIQUE,
  `category` VARCHAR(100) NOT NULL DEFAULT 'Web Development',
  `excerpt` TEXT NOT NULL,
  `content` LONGTEXT NOT NULL,
  `author` VARCHAR(100) NOT NULL DEFAULT 'Netcoder Editorial',
  `read_time` VARCHAR(30) NOT NULL DEFAULT '4 min read',
  `image` VARCHAR(255) NOT NULL DEFAULT '/images/full-stact-development.png',
  `tags` JSON NULL,
  `views_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `status` ENUM('published', 'draft', 'archived') NOT NULL DEFAULT 'published',
  `published_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 7. Table: seminar_feedbacks
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `seminar_feedbacks`;
CREATE TABLE `seminar_feedbacks` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `student_name` VARCHAR(120) NOT NULL,
  `contact_number` VARCHAR(30) NOT NULL,
  `email` VARCHAR(150) NULL,
  `course` VARCHAR(100) NOT NULL,
  `semester` VARCHAR(40) NOT NULL DEFAULT '1st',
  `heard_about` VARCHAR(100) NULL,
  `overall_assessment` VARCHAR(60) NOT NULL DEFAULT 'Very Satisfied',
  `seminar_length` VARCHAR(60) NOT NULL DEFAULT 'Satisfied',
  `recommend` VARCHAR(60) NOT NULL DEFAULT 'Very Likely',
  `team_experience` VARCHAR(60) NOT NULL DEFAULT 'Excellent',
  `session_interest` VARCHAR(60) NOT NULL DEFAULT 'Excellent',
  `suggestions` TEXT NULL,
  `interested_courses` JSON NULL,
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 8. Table: drm_security_logs
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `drm_security_logs`;
CREATE TABLE `drm_security_logs` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `student_id` BIGINT UNSIGNED NULL,
  `event_type` ENUM('screenshot_blocked', 'devtools_blocked', 'download_attempt', 'focus_lost', 'watermark_tamper') NOT NULL,
  `ip_address` VARCHAR(45) NULL,
  `user_agent` TEXT NULL,
  `event_payload` JSON NULL,
  `triggered_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `idx_drm_student` (`student_id`),
  CONSTRAINT `fk_drm_student` FOREIGN KEY (`student_id`) REFERENCES `students` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------------------------
-- 9. Table: demo_inquiries
-- ----------------------------------------------------------------------------
DROP TABLE IF EXISTS `demo_inquiries`;
CREATE TABLE `demo_inquiries` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(120) NOT NULL,
  `email` VARCHAR(150) NOT NULL,
  `phone` VARCHAR(30) NOT NULL,
  `course_interested` VARCHAR(150) NOT NULL,
  `preferred_mode` ENUM('Classroom (Dharamshala)', 'Online Live', 'Hybrid') NOT NULL DEFAULT 'Classroom (Dharamshala)',
  `message` TEXT NULL,
  `status` ENUM('pending', 'contacted', 'enrolled', 'closed') NOT NULL DEFAULT 'pending',
  `created_at` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================================
-- SEED DATA
-- ============================================================================

-- Default Admin: admin@netcoder.in / admin123 (bcrypt hash)
INSERT INTO `admins` (`name`, `email`, `password`, `role`) VALUES
('Administrator', 'admin@netcoder.in', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'super_admin');

-- Categories
INSERT INTO `categories` (`id`, `name`, `slug`, `icon`) VALUES
(1, 'Full Stack Web Development', 'web-development', 'laptop-code'),
(2, 'Data Science & Machine Learning', 'data-science', 'brain'),
(3, 'Cyber Security & Ethical Hacking', 'cyber-security', 'shield-alt'),
(4, 'UI/UX & Product Design', 'ui-ux', 'pencil-ruler');

-- Categories
INSERT INTO `categories` (`id`, `name`, `slug`, `icon`) VALUES
(1, 'Full Stack Web Development', 'web-development', 'laptop-code'),
(2, 'Data Science & Machine Learning', 'data-science', 'brain'),
(3, 'Cyber Security & Ethical Hacking', 'cyber-security', 'shield-alt'),
(4, 'UI/UX & Product Design', 'ui-ux', 'pencil-ruler'),
(5, 'Cloud & DevOps Engineering', 'cloud-devops', 'cloud'),
(6, 'Systems & High-Performance Go', 'systems-go', 'server');

-- Flagship LMS Courses (Synced with Next.js LMS & Course Explore)
INSERT INTO `courses` (`id`, `category_id`, `title`, `slug`, `duration`, `level`, `overview`, `fee`, `price`, `original_price`, `instructor`, `instructor_avatar`, `hours`, `icon`, `tagline`, `image`, `rating`, `reviews_count`, `badge`, `syllabus`) VALUES
(1, 5, 'Production Kubernetes & Multi-Cloud Infrastructure', 'production-kubernetes', '42 hrs • 18 Cloud Labs', 'Advanced', 'Deploy fault-tolerant clusters, implement service meshes using Istio, configure GitOps with ArgoCD, and manage zero-trust network policies in live cloud sandboxes.', 89.00, 89.00, 199.00, 'Sarah Vance, Principal SRE @ CloudScale', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150', '42 hrs • 18 Cloud Labs', 'terminal', 'Updated Jan 2025', 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800', 4.90, 3420, 'Advanced', '[{"module":"Module 1: Production Kubernetes & Helm","lessons":["1. Cluster Architecture & High Availability Control Plane","2. Container Storage Interface (CSI) & Persistent Volumes","3. Helm 3 Production Chart Templating"]},{"module":"Module 2: Service Mesh & Ingress Routing","lessons":["4. Istio Envoy Proxy & Traffic Shifting","5. Mutual TLS (mTLS) & Zero-Trust Policies"]},{"module":"Module 3: GitOps with ArgoCD","lessons":["6. Declarative Continuous Delivery","7. Automated Canary Deployments with Flagger"]}]'),

(2, 1, 'Full-Stack Next.js 15, TypeScript & Distributed Microservices', 'nextjs-fullstack', '38 hrs • 8 Full Projects', 'Intermediate to Advanced', 'Architect high-scale web apps with Server Components, Turborepo, Prisma ORM, Redis caching, and Stripe billing pipelines.', 79.00, 79.00, 180.00, 'Alex Chen, Ex-Staff Engineer @ Google', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150', '38 hrs • 8 Full Projects', 'code', 'Next.js 15 App Router', 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800', 4.95, 4190, 'Popular', '[{"module":"Module 1: Next.js 15 Foundations & SSR","lessons":["1. Turbopack Architecture & Edge Runtime","2. Streaming SSR & React 19 Server Components","3. Server Actions & Form Mutations"]},{"module":"Module 2: Scalable Database & Caching","lessons":["4. Prisma ORM & PostgreSQL Optimization","5. Distributed Cache with Upstash Redis"]},{"module":"Module 3: Realtime Engine & Billing","lessons":["6. Webhooks & Stripe Subscriptions","7. Live Collaboration with WebSockets"]}]'),

(3, 2, 'Generative AI & LLM Systems Engineering with LangChain & PyTorch', 'genai-llm-systems', '46 hrs • 10 LLM Apps', 'Advanced', 'Construct production RAG architectures, fine-tune open-weights models (Llama 3), build autonomous agents, and evaluate hallucination metrics.', 99.00, 99.00, 249.00, 'Dr. Dev Patel, Lead AI Architect', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150', '46 hrs • 10 LLM Apps', 'psychology', 'LangChain & PyTorch', 'https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800', 4.92, 2110, 'Trending', '[{"module":"Module 1: LLM Foundations & Vector DBs","lessons":["1. Embeddings, Dimensionality & Vector Search","2. Milvus & Pinecone Indexing Masterclass","3. Chunking Strategies & Hybrid Search"]},{"module":"Module 2: Advanced RAG Architecture","lessons":["4. Self-Querying Retrievers & Multi-Query Expansions","5. Re-ranking Pipelines with Cohere"]},{"module":"Module 3: Fine-Tuning & Quantization","lessons":["6. LoRA & QLoRA Fine-Tuning Llama 3","7. Production Deployment via vLLM"]}]'),

(4, 3, 'Enterprise Cloud Security & AWS DevSecOps Mastery', 'cloud-security-devsecops', '35 hrs • 14 Attack Labs', 'Advanced', 'Implement automated SAST/DAST pipelines, cloud penetration audits, IAM least-privilege guardrails, and compliance-as-code automation.', 89.00, 89.00, 210.00, 'Elena Rostova, CISO Advisor & SANS Author', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150', '35 hrs • 14 Attack Labs', 'shield', 'Zero-Trust', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800', 4.88, 1840, 'Security', '[{"module":"Module 1: Cloud Attack Vectors","lessons":["1. AWS IAM Privilege Escalation Scenarios","2. S3 Bucket Misconfigurations & SSRF Attacks","3. KMS Key Policies & Cryptographic Flaws"]},{"module":"Module 2: DevSecOps CI/CD Pipelines","lessons":["4. Automated SAST with Semgrep & SonarQube","5. Container Image Vulnerability Scanning with Trivy"]},{"module":"Module 3: Incident Response & Forensics","lessons":["6. AWS CloudTrail Log Analysis with Athena","7. Automated Remediation with Lambda"]}]'),

(5, 6, 'Modern Backend with Go, gRPC, Redis & Distributed Systems', 'golang-microservices', '36 hrs • 6 System Builds', 'Advanced', 'Engineer concurrent microservices with Go routines, gRPC protobufs, distributed locking via Redis, and high-throughput Kafka event streaming.', 85.00, 85.00, 195.00, 'Marcus Vance, Principal Backend Architect', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150', '36 hrs • 6 System Builds', 'dns', 'Go & Distributed Systems', 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800', 4.93, 2750, 'Hot', '[{"module":"Module 1: High-Performance Go Concurrency","lessons":["1. Goroutines, Channels & Worker Pools","2. Memory Profiling with pprof & Benchmarks","3. Zero-Allocation Buffer Patterns"]},{"module":"Module 2: gRPC & Protobuf RPC Services","lessons":["4. Protocol Buffers v3 & Schema Evolution","5. Bidirectional Streaming & Interceptors"]},{"module":"Module 3: Distributed State & Event Streaming","lessons":["6. Redis Distributed Locks (Redlock)","7. Apache Kafka Event-Driven Architecture"]}]'),

(6, 1, 'Full Stack Web Development (MERN / Next.js Diploma)', 'fullstack-web-development', '6 Months • 20 Real Projects', 'Beginner to Advanced', 'Master modern web applications with React, Next.js, Node.js, Express, MongoDB, and Tailwind CSS with real client capstone projects.', 120.00, 120.00, 250.00, 'Netcoder Industry Mentors', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150', '6 Months • 20 Real Projects', 'laptop_mac', 'Placement Assured', '/images/full-stact-development.png', 4.95, 3120, 'Bestseller', '[{"module":"Module 1: Web Foundations","lessons":["1. Introduction to Web Architecture","2. HTML5 Semantic Layouts","3. CSS3 Flexbox & Grid Masterclass"]},{"module":"Module 2: JavaScript Mastery","lessons":["4. ES6+ Modern JavaScript","5. Async/Await & Fetch API"]},{"module":"Module 3: React & Next.js","lessons":["6. Components & Hooks","7. Next.js App Router & SSR"]},{"module":"Module 4: Backend & Database","lessons":["8. Node.js & Express REST APIs","9. MongoDB Aggregations","10. JWT Authentication & Security"]}]'),

(7, 2, 'Data Science & Machine Learning with Python Diploma', 'data-science-machine-learning', '6 Months • 15 AI Models', 'Beginner to Advanced', 'Deep dive into Python data analysis, NumPy, Pandas, Scikit-Learn, Deep Learning models, and production AI application deployment.', 110.00, 110.00, 240.00, 'AI Research Group', 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150', '6 Months • 15 AI Models', 'insights', 'Industry Project', '/images/data-science-machine-learning.png', 4.90, 2180, 'Trending', '[{"module":"Module 1: Python for Data Science","lessons":["1. Python Environment Setup","2. NumPy Numerical Arrays","3. Pandas DataFrames & Cleaning"]},{"module":"Module 2: Machine Learning Models","lessons":["4. Scikit-Learn Supervised Models","5. Neural Networks with TensorFlow"]}]');

-- Demo Student: Sahil Sandhu
INSERT INTO `students` (`id`, `student_code`, `name`, `email`, `phone`, `password`, `drm_status`, `drm_watermark_id`) VALUES
(1, 'NC-STU-2026-001', 'Sahil Sandhu', 'sahil@netcoder.in', '9876543210', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Protected', 'WM-SAHIL-001-NC'),
(2, 'NC-STU-2026-002', 'Priya Sharma', 'priya.sharma@gmail.com', '9812345678', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Protected', 'WM-PRIYA-002-NC'),
(3, 'NC-STU-2026-003', 'Amit Patel', 'amit.dev@outlook.com', '9845612378', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Protected', 'WM-AMIT-003-NC'),
(4, 'NC-STU-2026-004', 'Neha Thakur', 'neha.uiux@gmail.com', '9871234560', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'Protected', 'WM-NEHA-004-NC');

-- Enrollments for Sahil Sandhu
INSERT INTO `enrollments` (`student_id`, `course_id`, `progress_percentage`, `completed_lessons`, `current_lesson_id`, `enrolled_at`, `status`) VALUES
(1, 1, 35, '["fs-1", "fs-2"]', 'fs-3', '2026-09-20', 'active'),
(1, 2, 60, '["ds-1", "ds-2", "ds-3"]', 'ds-4', '2026-09-22', 'active');

-- Blogs Seed
INSERT INTO `blogs` (`title`, `slug`, `category`, `excerpt`, `content`, `author`, `tags`) VALUES
('The Future of Full-Stack Web Development in 2026', 'future-of-full-stack-web-development-2026', 'Web Development', 'Explore the newest landscape of Server Actions, React 19, Turbopack, and edge database architectures.', '<p>Full-stack web development has transitioned toward unified frameworks, edge rendering, and AI-assisted workflows. Developers must build resilient, low-latency applications.</p>', 'Netcoder Editorial', '["Next.js", "React 19", "Web Development"]'),
('Understanding DRM Video Protection in Modern EdTech LMS', 'understanding-drm-video-protection-lms', 'Cyber Security', 'How streaming platforms protect course intellectual property from screen capture tools and download dumpers.', '<p>Digital Rights Management (DRM) enforces content confidentiality using cryptographic media streams, runtime canvas watermarking, and keyboard shortcut interception.</p>', 'Security Lab', '["DRM", "Security", "Streaming"]');

-- Seminar Feedbacks Seed
INSERT INTO `seminar_feedbacks` (`student_name`, `contact_number`, `email`, `course`, `semester`, `overall_assessment`, `interested_courses`) VALUES
('Rohit Verma', '9816012345', 'rohit.v@gmail.com', 'B.Tech CSE', '5th', 'Very Satisfied', '["Full Stack Web Development", "Cyber Security"]'),
('Anjali Kumari', '9805567890', 'anjali.k@yahoo.com', 'BCA', '3rd', 'Excellent', '["Data Science & Machine Learning"]');

-- DRM Audit Initial Logs
INSERT INTO `drm_security_logs` (`student_id`, `event_type`, `ip_address`, `event_payload`) VALUES
(1, 'screenshot_blocked', '127.0.0.1', '{"key": "PrintScreen", "action": "clipboard_cleared"}'),
(1, 'download_attempt', '127.0.0.1', '{"target": "video_element", "action": "nodownload_enforced"}'),
(2, 'focus_lost', '127.0.0.1', '{"action": "frosted_blur_shield_activated"}');
