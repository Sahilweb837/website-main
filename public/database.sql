-- ==============================================================================
-- NETCODER TECHNOLOGIES - PRODUCTION LMS & ADMIN DATABASE SCHEMA
-- Version: 3.5.0 (2026 Release)
-- Dialect: MySQL 8.0+ / PostgreSQL / MariaDB Compatible
-- Purpose: Complete Relational Schema for LMS Courses, Auth, Enrollments & Payments
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `payments`;
DROP TABLE IF EXISTS `enrollments`;
DROP TABLE IF EXISTS `courses`;
DROP TABLE IF EXISTS `admins`;
DROP TABLE IF EXISTS `users`;
DROP TABLE IF EXISTS `course_categories`;
SET FOREIGN_KEY_CHECKS = 1;

-- ------------------------------------------------------------------------------
-- 1. USERS TABLE (Students & General Learners)
-- ------------------------------------------------------------------------------
CREATE TABLE `users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `phone` VARCHAR(25) DEFAULT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('student', 'instructor', 'admin') NOT NULL DEFAULT 'student',
  `avatar` VARCHAR(500) DEFAULT NULL,
  `qualification` VARCHAR(150) DEFAULT 'Graduate (B.Tech / BCA)',
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `last_login_at` DATETIME DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_users_email` (`email`),
  INDEX `idx_users_role` (`role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 2. ADMINS TABLE (Administrative Roles, Super Admins & Faculty)
-- ------------------------------------------------------------------------------
CREATE TABLE `admins` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) NOT NULL DEFAULT 'superadmin',
  `permissions` JSON DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 3. COURSE CATEGORIES
-- ------------------------------------------------------------------------------
CREATE TABLE `course_categories` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(80) NOT NULL UNIQUE,
  `name` VARCHAR(120) NOT NULL,
  `badge` VARCHAR(80) DEFAULT NULL,
  `icon` VARCHAR(60) DEFAULT 'school',
  `color` VARCHAR(20) DEFAULT '#ff5532',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 4. COURSES TABLE (Catalog, Video Tracks & Live Cohorts)
-- ------------------------------------------------------------------------------
CREATE TABLE `courses` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `subtitle` TEXT DEFAULT NULL,
  `category` VARCHAR(50) NOT NULL DEFAULT 'fullstack',
  `price` DECIMAL(10, 2) NOT NULL DEFAULT 459.00,
  `original_price` DECIMAL(10, 2) NOT NULL DEFAULT 799.00,
  `currency` VARCHAR(10) NOT NULL DEFAULT 'INR',
  `rating` DECIMAL(3, 2) NOT NULL DEFAULT 4.80,
  `rating_count` INT UNSIGNED NOT NULL DEFAULT 1200,
  `learners_count` INT UNSIGNED NOT NULL DEFAULT 45000,
  `duration` VARCHAR(80) NOT NULL DEFAULT '34 hrs • 200 lectures',
  `level` ENUM('Beginner', 'Intermediate', 'Advanced', 'All Levels') NOT NULL DEFAULT 'All Levels',
  `badge` VARCHAR(60) DEFAULT 'Bestseller',
  `tagline` VARCHAR(255) DEFAULT NULL,
  `instructor` VARCHAR(150) NOT NULL DEFAULT 'Netcoder Senior Faculty',
  `instructor_avatar` VARCHAR(500) DEFAULT NULL,
  `image` VARCHAR(500) NOT NULL DEFAULT '/images/full-stact-development.png',
  `overview` LONGTEXT DEFAULT NULL,
  `syllabus` JSON DEFAULT NULL,
  `what_you_will_learn` JSON DEFAULT NULL,
  `requirements` JSON DEFAULT NULL,
  `is_published` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_courses_category` (`category`),
  INDEX `idx_courses_slug` (`slug`),
  INDEX `idx_courses_published` (`is_published`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 5. ENROLLMENTS TABLE (Student Course Access & Progression)
-- ------------------------------------------------------------------------------
CREATE TABLE `enrollments` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `user_email` VARCHAR(191) NOT NULL,
  `course_id` BIGINT UNSIGNED DEFAULT NULL,
  `course_slug` VARCHAR(191) NOT NULL,
  `course_title` VARCHAR(255) NOT NULL,
  `order_id` VARCHAR(100) DEFAULT NULL,
  `status` ENUM('active', 'completed', 'cancelled', 'expired') NOT NULL DEFAULT 'active',
  `progress_percentage` INT UNSIGNED NOT NULL DEFAULT 0,
  `completed_lessons_count` INT UNSIGNED NOT NULL DEFAULT 0,
  `enrolled_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_enrollments_user_id` (`user_id`),
  INDEX `idx_enrollments_course_slug` (`course_slug`),
  INDEX `idx_enrollments_user_email` (`user_email`),
  CONSTRAINT `fk_enrollments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ------------------------------------------------------------------------------
-- 6. PAYMENTS / TRANSACTIONS TABLE (Dummy Gateway & Production Records)
-- ------------------------------------------------------------------------------
CREATE TABLE `payments` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `transaction_id` VARCHAR(100) NOT NULL UNIQUE,
  `order_id` VARCHAR(100) NOT NULL,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `user_name` VARCHAR(150) NOT NULL,
  `user_email` VARCHAR(191) NOT NULL,
  `course_slug` VARCHAR(191) NOT NULL,
  `course_title` VARCHAR(255) NOT NULL,
  `amount` DECIMAL(10, 2) NOT NULL,
  `currency` VARCHAR(10) NOT NULL DEFAULT 'INR',
  `method` ENUM('upi', 'card', 'netbanking', 'wallet', 'free') NOT NULL DEFAULT 'upi',
  `status` ENUM('success', 'pending', 'failed', 'refunded') NOT NULL DEFAULT 'success',
  `payment_gateway` VARCHAR(50) NOT NULL DEFAULT 'Razorpay-Simulated',
  `gateway_response` JSON DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_payments_txn` (`transaction_id`),
  INDEX `idx_payments_order` (`order_id`),
  INDEX `idx_payments_user_email` (`user_email`),
  INDEX `idx_payments_status` (`status`),
  CONSTRAINT `fk_payments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- INITIAL SEED DATA
-- ==============================================================================

-- 1. Seed Categories
INSERT INTO `course_categories` (`slug`, `name`, `badge`, `icon`, `color`) VALUES
('ai', 'AI & Machine Learning (GenAI)', 'Trending 2026', 'psychology', '#8b5cf6'),
('fullstack', 'Full-Stack Web Development', 'Highest Demand', 'code', '#ff5532'),
('cloud', 'Cloud Computing & DevOps', 'Enterprise Scale', 'cloud', '#0284c7'),
('cyber', 'Cyber Security & Ethical Hacking', 'SecOps', 'security', '#10b981'),
('systems', 'Data Engineering & Systems', 'High Throughput', 'hub', '#f59e0b');

-- 2. Seed Default Admins
INSERT INTO `admins` (`name`, `email`, `password_hash`, `role`, `permissions`) VALUES
('Super Admin', 'admin@netcoder.io', '$2y$10$Wq3q0k1234567890abcdefghijklmnopqrstuvwxz', 'superadmin', '{"all": true, "manage_courses": true, "manage_users": true, "manage_payments": true}'),
('Lead Instructor', 'instructor@netcoder.io', '$2y$10$Wq3q0k1234567890abcdefghijklmnopqrstuvwxz', 'faculty', '{"manage_courses": true, "view_students": true}');

-- 3. Seed Students
INSERT INTO `users` (`name`, `email`, `phone`, `password_hash`, `role`, `qualification`) VALUES
('Sahil Sandhu', 'sahil@netcoder.io', '+91 9876543210', '$2y$10$Wq3q0k1234567890abcdefghijklmnopqrstuvwxz', 'student', 'B.Tech Computer Science'),
('Priya Sharma', 'priya@gmail.com', '+91 9812345678', '$2y$10$Wq3q0k1234567890abcdefghijklmnopqrstuvwxz', 'student', 'MCA'),
('Amit Patel', 'amit.patel@outlook.com', '+91 9823456789', '$2y$10$Wq3q0k1234567890abcdefghijklmnopqrstuvwxz', 'student', 'Working Professional'),
('Neha Thakur', 'neha.thakur@gmail.com', '+91 9834567890', '$2y$10$Wq3q0k1234567890abcdefghijklmnopqrstuvwxz', 'student', 'Final Year B.Sc IT');

-- 4. Seed LMS Courses
INSERT INTO `courses` 
(`slug`, `title`, `subtitle`, `category`, `price`, `original_price`, `currency`, `rating`, `rating_count`, `learners_count`, `duration`, `level`, `badge`, `instructor`, `image`, `overview`) 
VALUES
(
  'the-complete-agentic-ai-engineering-course',
  'AI Engineer Agentic Track: The Complete Agent & MCP Course',
  'Master AI Agents in 30 days: build 8 real-world projects with OpenAI Agents SDK, CrewAI, LangGraph, AutoGen and MCP.',
  'ai',
  459.00,
  799.00,
  'INR',
  4.85,
  49182,
  403098,
  '34.5 hrs • 248 lectures',
  'All Levels',
  'Bestseller',
  'Ed Donner, Ligency',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800',
  'Master AI Agents in 30 days: build 8 real-world projects with OpenAI Agents SDK, CrewAI, LangGraph, AutoGen and Model Context Protocol (MCP).'
),
(
  'fullstack-web-development',
  'Full-Stack Web Development Bootcamp (Next.js 15, React 19 & Node.js)',
  'Build enterprise SaaS platforms with modern React Server Components, TypeScript, Tailwind, PostgreSQL & Docker.',
  'fullstack',
  459.00,
  799.00,
  'INR',
  4.92,
  38200,
  310500,
  '42.0 hrs • 310 lectures',
  'All Levels',
  'Highest Demand',
  'Sahil Sandhu & Netcoder Faculty',
  '/images/full-stact-development.png',
  'Become a complete Full-Stack Web Developer. Learn frontend, backend, RESTful APIs, relational databases, authentication and cloud deployment.'
),
(
  'data-science-machine-learning-ai',
  'Data Science, Machine Learning & Predictive Analytics Masterclass',
  'Hands-on Machine Learning, Deep Learning, Pandas, Scikit-Learn, PyTorch and automated feature engineering.',
  'ai',
  499.00,
  899.00,
  'INR',
  4.88,
  29400,
  225000,
  '38.0 hrs • 280 lectures',
  'Intermediate',
  'Top Rated',
  'Dr. Angela Yu, Netcoder AI Lab',
  '/images/DataScience-BusinessAnalytics.png',
  'End-to-end data science specialization from mathematical foundations to deep learning model deployment in production.'
),
(
  'cloud-devops-kubernetes-aws',
  'Cloud DevOps Architect: AWS, Docker, Kubernetes & Terraform',
  'Production-grade CI/CD pipelines, GitOps with ArgoCD, Infrastructure as Code and multi-cloud resilience.',
  'cloud',
  549.00,
  999.00,
  'INR',
  4.90,
  18700,
  142000,
  '36.5 hrs • 220 lectures',
  'Advanced',
  'Enterprise Scale',
  'Vikram Verma, Cloud Principal',
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
  'Design high-availability cloud infrastructures with container orchestration, monitoring, and automated deployment.'
),
(
  'cyber-security-ethical-hacking',
  'Ethical Hacking & Cyber Defense: Offensive Security & SOC Ops',
  'Master penetration testing, network reconnaissance, Metasploit, web exploitation and SOC incident response.',
  'cyber',
  459.00,
  799.00,
  'INR',
  4.87,
  22100,
  165000,
  '31.0 hrs • 195 lectures',
  'All Levels',
  'Hot & New',
  'Alex Rivera, OSCP Certified',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800',
  'Learn real-world ethical hacking and security operations with safe virtual lab sandboxes and vulnerability assessments.'
);

-- 5. Seed Initial Enrollments
INSERT INTO `enrollments` 
(`user_id`, `user_email`, `course_slug`, `course_title`, `order_id`, `status`, `progress_percentage`, `completed_lessons_count`) 
VALUES
(1, 'sahil@netcoder.io', 'the-complete-agentic-ai-engineering-course', 'AI Engineer Agentic Track: The Complete Agent & MCP Course', 'ORD-2026-101', 'active', 45, 112),
(1, 'sahil@netcoder.io', 'fullstack-web-development', 'Full-Stack Web Development Bootcamp (Next.js 15, React 19 & Node.js)', 'ORD-2026-102', 'active', 72, 224),
(2, 'priya@gmail.com', 'data-science-machine-learning-ai', 'Data Science, Machine Learning & Predictive Analytics Masterclass', 'ORD-2026-103', 'active', 20, 56),
(3, 'amit.patel@outlook.com', 'cloud-devops-kubernetes-aws', 'Cloud DevOps Architect: AWS, Docker, Kubernetes & Terraform', 'ORD-2026-104', 'active', 60, 132);

-- 6. Seed Initial Payments
INSERT INTO `payments` 
(`transaction_id`, `order_id`, `user_id`, `user_name`, `user_email`, `course_slug`, `course_title`, `amount`, `currency`, `method`, `status`) 
VALUES
('NTC7A9K1L92', 'ORD-2026-101', 1, 'Sahil Sandhu', 'sahil@netcoder.io', 'the-complete-agentic-ai-engineering-course', 'AI Engineer Agentic Track: The Complete Agent & MCP Course', 542.00, 'INR', 'upi', 'success'),
('NTC8B2M4X71', 'ORD-2026-102', 1, 'Sahil Sandhu', 'sahil@netcoder.io', 'fullstack-web-development', 'Full-Stack Web Development Bootcamp (Next.js 15, React 19 & Node.js)', 542.00, 'INR', 'card', 'success'),
('NTC9C3P5Q48', 'ORD-2026-103', 2, 'Priya Sharma', 'priya@gmail.com', 'data-science-machine-learning-ai', 'Data Science, Machine Learning & Predictive Analytics Masterclass', 589.00, 'INR', 'upi', 'success'),
('NTC4D8R9T23', 'ORD-2026-104', 3, 'Amit Patel', 'amit.patel@outlook.com', 'cloud-devops-kubernetes-aws', 'Cloud DevOps Architect: AWS, Docker, Kubernetes & Terraform', 648.00, 'INR', 'netbanking', 'success');

-- ==============================================================================
-- USEFUL ADMIN SQL QUERIES:
-- ==============================================================================

-- 1. View all student enrollments with payment status
-- SELECT e.id, u.name, u.email, e.course_title, e.progress_percentage, p.amount, p.method, p.status, p.transaction_id
-- FROM enrollments e
-- JOIN users u ON e.user_id = u.id
-- LEFT JOIN payments p ON p.order_id = e.order_id
-- ORDER BY e.enrolled_at DESC;

-- 2. Total revenue and transactions summary by payment method
-- SELECT method, COUNT(*) AS total_transactions, SUM(amount) AS total_revenue_inr
-- FROM payments
-- WHERE status = 'success'
-- GROUP BY method;

-- 3. Top courses by learner enrollment
-- SELECT course_title, COUNT(*) AS active_students, AVG(progress_percentage) AS avg_progress
-- FROM enrollments
-- GROUP BY course_title
-- ORDER BY active_students DESC;
