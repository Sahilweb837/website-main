-- ==============================================================================
-- NETCODER TECHNOLOGIES - ADMIN DATABASE & DATA DEFINITION SCRIPT (admin.sql)
-- Complete schema for Courses, Admins, Users, Enrollments & Dummy Payments
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `payments`;
DROP TABLE IF EXISTS `enrollments`;
DROP TABLE IF EXISTS `courses`;
DROP TABLE IF EXISTS `admins`;
DROP TABLE IF EXISTS `users`;
SET FOREIGN_KEY_CHECKS = 1;

-- USERS TABLE
CREATE TABLE `users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `phone` VARCHAR(25) DEFAULT NULL,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` ENUM('student', 'instructor', 'admin') NOT NULL DEFAULT 'student',
  `avatar` VARCHAR(500) DEFAULT NULL,
  `is_active` TINYINT(1) NOT NULL DEFAULT 1,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ADMINS TABLE
CREATE TABLE `admins` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `role` VARCHAR(50) NOT NULL DEFAULT 'superadmin',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- COURSES TABLE
CREATE TABLE `courses` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `slug` VARCHAR(191) NOT NULL UNIQUE,
  `title` VARCHAR(255) NOT NULL,
  `subtitle` TEXT DEFAULT NULL,
  `category` VARCHAR(50) NOT NULL DEFAULT 'fullstack',
  `price` DECIMAL(10, 2) NOT NULL DEFAULT 459.00,
  `original_price` DECIMAL(10, 2) NOT NULL DEFAULT 799.00,
  `currency` VARCHAR(10) NOT NULL DEFAULT 'INR',
  `rating` DECIMAL(3, 2) NOT NULL DEFAULT 4.85,
  `instructor` VARCHAR(150) NOT NULL DEFAULT 'Netcoder Senior Faculty',
  `duration` VARCHAR(80) NOT NULL DEFAULT '34 hrs • 200 lectures',
  `level` VARCHAR(50) NOT NULL DEFAULT 'All Levels',
  `badge` VARCHAR(50) DEFAULT 'Bestseller',
  `image` VARCHAR(500) NOT NULL,
  `overview` LONGTEXT DEFAULT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ENROLLMENTS TABLE
CREATE TABLE `enrollments` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `user_email` VARCHAR(191) NOT NULL,
  `course_slug` VARCHAR(191) NOT NULL,
  `course_title` VARCHAR(255) NOT NULL,
  `status` ENUM('active', 'completed') NOT NULL DEFAULT 'active',
  `progress_percentage` INT UNSIGNED NOT NULL DEFAULT 0,
  `enrolled_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_enroll_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- PAYMENTS TABLE
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
  `method` ENUM('upi', 'card', 'netbanking', 'free') NOT NULL DEFAULT 'upi',
  `status` ENUM('success', 'failed', 'pending') NOT NULL DEFAULT 'success',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT `fk_pay_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- SAMPLE SEED DATA
INSERT INTO `admins` (`name`, `email`, `password_hash`, `role`) VALUES
('Admin', 'admin@netcoder.io', '$2y$10$hashed_admin_password', 'superadmin');

INSERT INTO `users` (`name`, `email`, `phone`, `password_hash`, `role`) VALUES
('Sahil Sandhu', 'sahil@netcoder.io', '+91 9876543210', '$2y$10$hashed_password', 'student'),
('Priya Sharma', 'priya@gmail.com', '+91 9812345678', '$2y$10$hashed_password', 'student');

INSERT INTO `courses` (`slug`, `title`, `subtitle`, `category`, `price`, `original_price`, `instructor`, `duration`, `image`) VALUES
('the-complete-agentic-ai-engineering-course', 'AI Engineer Agentic Track: The Complete Agent & MCP Course', 'Master AI Agents in 30 days with OpenAI Agents SDK & LangGraph.', 'ai', 459.00, 799.00, 'Ed Donner', '34.5 hrs', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800'),
('fullstack-web-development', 'Full-Stack Web Development Bootcamp (Next.js 15, React 19 & Node.js)', 'Build production SaaS apps with Next.js 15 & PostgreSQL.', 'fullstack', 459.00, 799.00, 'Sahil Sandhu', '42.0 hrs', '/images/full-stact-development.png'),
('data-science-machine-learning-ai', 'Data Science & Machine Learning Masterclass', 'Python, Pandas, Scikit-Learn, PyTorch and ML pipelines.', 'ai', 499.00, 899.00, 'Dr. Angela Yu', '38.0 hrs', '/images/DataScience-BusinessAnalytics.png');

INSERT INTO `enrollments` (`user_id`, `user_email`, `course_slug`, `course_title`, `progress_percentage`) VALUES
(1, 'sahil@netcoder.io', 'the-complete-agentic-ai-engineering-course', 'AI Engineer Agentic Track: The Complete Agent & MCP Course', 45),
(1, 'sahil@netcoder.io', 'fullstack-web-development', 'Full-Stack Web Development Bootcamp', 72);

INSERT INTO `payments` (`transaction_id`, `order_id`, `user_id`, `user_name`, `user_email`, `course_slug`, `course_title`, `amount`, `method`, `status`) VALUES
('NTC7A9K1L92', 'ORD-101', 1, 'Sahil Sandhu', 'sahil@netcoder.io', 'the-complete-agentic-ai-engineering-course', 'AI Engineer Agentic Track', 542.00, 'upi', 'success'),
('NTC8B2M4X71', 'ORD-102', 1, 'Sahil Sandhu', 'sahil@netcoder.io', 'fullstack-web-development', 'Full-Stack Web Development Bootcamp', 542.00, 'card', 'success');
