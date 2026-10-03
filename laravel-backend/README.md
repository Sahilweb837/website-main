# Netcoder Technology - Laravel LMS Backend & REST API (Port 8000)

Production-ready backend architecture & Main Admin Control Panel for the Netcoder Next.js LMS platform.

---

## 📁 Architecture Overview

```text
laravel-backend/
├── database/
│   ├── admin.sql          <-- Complete MySQL database schema & seed data
│   └── storage.json       <-- Live JSON database storage & persistence
├── app/
│   ├── Http/Controllers/
│   │   ├── AdminController.php      <-- Admin auth, stats, DRM audit, live revenue
│   │   ├── CourseController.php     <-- Courses & syllabus CRUD (Text, Image, Price)
│   │   ├── StudentController.php    <-- Student accounts, DRM tokens, registration
│   │   ├── EnrollmentController.php <-- Student course progress & fee records
│   │   ├── BlogController.php       <-- Blog articles publishing & CRUD
│   │   └── FeedbackController.php   <-- Seminar feedback records
│   └── Models/
│       ├── Admin.php
│       ├── Course.php
│       ├── Student.php
│       ├── Enrollment.php
│       ├── Blog.php
│       ├── SeminarFeedback.php
│       ├── DrmSecurityLog.php
│       └── DemoInquiry.php
├── routes/
│   ├── api.php            <-- REST API routes matching Next.js lib/api.js
│   └── web.php            <-- Web dashboard routes
├── server.php             <-- High-performance standalone backend server with live Admin UI
├── start.bat              <-- Windows 1-click server launcher
├── composer.json          <-- PHP & Laravel dependencies
└── .env.example           <-- DB & CORS configuration for Next.js (port 3000)
```

---

## 🚀 Quick Launch (Instant 1-Click Server)

### Option 1: Using the 1-Click Windows Launcher
Double-click `start.bat` in this folder, or run:

```bash
cd laravel-backend
php -S 127.0.0.1:8000 server.php
```

Once running:
- **Admin Control Panel**: Open [http://localhost:8000/admin](http://localhost:8000/admin) in your browser.
- **REST API Endpoint**: Available at [http://localhost:8000/api](http://localhost:8000/api).

### Option 2: Full Laravel with MySQL
1. Import MySQL Database:
   ```bash
   mysql -u root -p < database/admin.sql
   ```
2. Configure `.env` (`DB_DATABASE=netcoder_lms`).
3. Run:
   ```bash
   php artisan serve --port=8000
   ```

---

## ⚡ Main Admin Features

1. **Manual Course Upload (Text, Image & Price)**:
   - Upload course title, category, overview, duration, level, instructor, and badge.
   - Set **Selling Price ($ / ₹)** and **Original Price**.
   - Input custom thumbnail image URL or select from 1-click presets (Full-Stack, DevOps, AI, Cyber, Mobile).
   - Instantly persists and broadcasts to Next.js LMS Explore, Checkout, and Classroom!

2. **Total Fees & Student Registrations**:
   - Live revenue / fee collection calculation.
   - Student list with enrollment status, student code (`NC-STU-2026-xxx`), fee paid, and DRM protection stamp.

3. **Continuous Connection with Next.js**:
   - In Next.js `.env.local` or environment:
     ```env
     NEXT_PUBLIC_API_URL=http://localhost:8000
     ```
   - Automatically supports dual-mode: connects to Laravel backend on port 8000 with zero CORS friction, and falls back to Next.js internal App Router API if Laravel is offline.

4. **Skeleton Loading Support**:
   - Next.js LMS pages (`/lms/explore`, `/lms/checkout`, `/lms/courses/[slug]`, `/admin/dashboard`) include high-speed shimmering skeleton loaders while data is fetching from Laravel REST API.
