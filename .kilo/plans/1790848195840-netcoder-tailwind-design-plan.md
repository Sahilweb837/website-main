# Netcoder Next.js + Tailwind CSS Design Plan

## Goal
Transform the existing Netcoder Technology Next.js project into a modern, production-grade EdTech platform using **Next.js 16 + TypeScript + Tailwind CSS 4 + shadcn/ui**, while preserving all existing content and routing. Laravel will serve as the backend API (external to this repo). This plan covers the **Next.js frontend design system and all UI pages**.

## Current State Analysis

### What Exists
- Next.js 16.3.8, React 19.2.8
- Tailwind CSS 4.3.3 in package.json but **NOT configured** (no config file, nopostcss.config.js, no `@tailwind` directives in CSS)
- Traditional CSS files in `styles/` (style.css, blog.css, form.css, bootcamp.css, spa-skeleton.css)
- Heavy use of **inline styles** throughout components
- Font Awesome icons via CDN (not Lucide)
- Existing pages: `/`, `/about`, `/contact`, `/blog`, `/blog/[slug]`, `/courses/[slug]`, `/feedback`, `/gallery`, `/services`, `/career`, many course sub-pages, `/admin/login`, `/admin/dashboard`, `/auth/login`, `/student/dashboard`
- Data in local JS files: `data/courses.js` (650 lines, 30+ courses), `data/blogs.js` (179 lines, 5+ blogs), `data/feedback.js` (38 lines)
- API routes (in-memory): `/api/blogs`, `/api/demo-inquiry`, `/api/feedback`
- Auth: localStorage-based (admin/admin123, student phone OTP via Firebase)
- lib utilities: `lib/emailjs.js`, `lib/firebase.js`

### What's Missing (vs. Target Architecture)
- No Tailwind config (`tailwind.config.js`, `postcss.config.js`)
- No shadcn/ui
- No TypeScript (project uses JSX)
- No Lucide icons
- No Framer Motion
- No Monaco Editor
- No design system components (`components/ui/`)
- No API client for Laravel
- No pages for: Practice, Jobs, AI Tutor, Contests, Community, Resume Builder, Checkout, Profile
- Admin UI is basic (single dashboard page, no sidebar navigation)

---

## Phase 0: Foundation Setup

### 0.1 Install & Configure Tailwind CSS v4
- Create `tailwind.config.js` with:
  - Custom color palette (Primary `#4F46E5`, Secondary `#FF5532`, Dark `#111827`, text `#374151`, muted `#6B7280`, border `#E5E7EB`, success `#16A34A`)
  - Custom font families (Outfit for headings, Poppins for body)
  - Dark mode: `class` strategy
  - Content paths: `./app/**/*.{js,ts,jsx,tsx}`, `./components/**/*.{js,ts,jsx,tsx}`
  - Extend with design tokens (borderRadius, boxShadow, animation)
- Create `postcss.config.js` with `tailwindcss` and `autoprefixer`
- Create `app/globals.css` with Tailwind directives: `@tailwind base; @tailwind components; @tailwind utilities;`
- **Migration strategy**: Keep existing CSS files but add Tailwind. New components use Tailwind; existing inline styles gradually migrated.

### 0.2 Install Dependencies
```bash
npm install lucide-react @radix-ui/react-icons clsx tailwind-merge
npm install -D @types/react @types/node typescript
npm install @monaco-editor/react framer-motion
npx shadcn-ui@latest init
```
- shadcn/ui components to install: Button, Card, Input, Badge, Modal (Dialog), Tabs, Dropdown Menu, Select, Checkbox, Switch, Progress, Table, Avatar, Skeleton, Toast, Tooltip, Separator

### 0.3 TypeScript Migration
- Rename `jsconfig.json` to `tsconfig.json` with strict mode
- Convert `app/layout.js` → `app/layout.tsx`
- Convert `app/page.jsx` → `app/page.tsx`
- All new files use `.tsx`/`.ts` extensions
- Define `types/` directory with domain types (User, Course, Blog, Problem, etc.)

### 0.4 API Client (Laravel Integration)
- Create `lib/api/client.ts` — base fetch wrapper with:
  - Base URL from `NEXT_PUBLIC_API_URL` env var
  - JWT token from localStorage or cookie
  - Interceptor for 401 → redirect to login
- Create `lib/api/auth.ts` — login, register, logout, getCurrentUser
- Create `lib/api/courses.ts` — fetch courses, course detail
- Create `lib/api/blog.ts` — fetch posts, categories, tags
- Create `lib/api/practice.ts` — fetch problems, submit code
- Create `lib/api/contests.ts` — fetch contests, leaderboard
- Create `lib/api/jobs.ts` — fetch jobs, apply
- Create `lib/api/ai.ts` — AI tutor chat, hints
- Create `lib/api/admin.ts` — admin CRUD operations
- Create `lib/api/community.ts` — Q&A, answers
- Create `lib/api/resume.ts` — resume data CRUD
- **Fallback**: If Laravel API is unavailable, fall back to static data files

---

## Phase 1: Design System & Component Library

### 1.1 Color Palette (`app/globals.css` or `styles/tailwind.css`)
```css
:root {
  --background: #ffffff;
  --foreground: #111827;
  --card: #ffffff;
  --card-foreground: #0f172a;
  --primary: #4F46E5;
  --primary-foreground: #ffffff;
  --secondary: #FF5532;
  --secondary-foreground: #ffffff;
  --muted: #f8fafc;
  --muted-foreground: #64748b;
  --accent: #4F46E5;
  --accent-foreground: #ffffff;
  --border: #e5e7eb;
  --input: #cbd5e1;
  --ring: #4F46E5;
  --success: #16a34a;
  --warning: #f59e0b;
  --destructive: #ef4444;
}

[data-theme="dark"] {
  --background: #0f172a;
  --foreground: #f1f5f9;
  --card: #1e293b;
  --card-foreground: #f8fafc;
  ...
}
```

### 1.2 Reusable UI Components (`components/ui/`)
Convert existing patterns into reusable, Tailwind-styled shadcn/ui components:

| Component | Pattern Source | Notes |
|-----------|---------------|-------|
| `Button` | `color-btn`, `btn btn-primary` | Variants: primary, secondary, outline, ghost, destructive. Sizes: sm, md, lg |
| `Card` | `course-card`, `blog-card`, `track-card` | Header, Content, Footer sub-components |
| `Input` | `form-input`, `hif-field input` | With label, error state, icon support |
| `Badge` | Category badges on cards | Variants: default, outline, secondary, success |
| `Modal/Dialog` | `book-demo`, `popup-box`, admin modals | Header, Content, Footer sub-components |
| `Tabs` | Admin tab navigation | |
| `Dropdown` | Header mega-menu | |
| `Progress` | Course progress bars | |
| `Skeleton` | Loading states | |
| `Toast` | Success/error notifications | Replace alert() calls |
| `Tooltip` | Icon tooltips | |
| `Avatar` | Student/instructor images | |
| `Separator` | Section dividers | |

### 1.3 Layout Components (`components/layout/`)
- `Header.tsx` — Sticky nav with logo, mega-menu (On-Campus, Online, Services), auth buttons (Login/Signup for guests, Dashboard link for logged-in students), dark mode toggle. Use Lucide icons. Responsive mobile drawer.
- `Footer.tsx` — Multi-column footer with Quick Links, Top Courses, Features, Professional Training, newsletter signup, social icons (Lucide). Dark variant.
- `Sidebar.tsx` — For admin and student dashboard. Collapsible. Lucide icon nav items.
- `MobileNav.tsx` — Bottom navigation for mobile: Home, Courses, Practice, Community, Profile.

### 1.4 Utility Types (`types/`)
```typescript
// types/index.ts
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'student' | 'instructor' | 'admin';
  avatar?: string;
  enrolledCourses: string[];
  streak: number;
  ...
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  category: string;
  type: 'on-campus' | 'online';
  duration: string;
  level: string;
  image: string;
  overview: string;
  highlights: string[];
  syllabus: SyllabusModule[];
  tools: string[];
  careers: string[];
  price?: number;
  rating?: number;
  students?: number;
}

export interface Blog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage?: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  tags: string[];
}

export interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  category: string;
  description: string;
  examples: Example[];
  constraints: string[];
  starterCode: Record<string, string>;
  ...
}
```

---

## Phase 2: Public Pages

### 2.1 Homepage (`app/page.tsx`)
**Redesign the existing page with modern EdTech design using Tailwind.**

Sections (mapped from the user's ASCII mockup):
1. **Hero Section** — "Learn. Code. Build. Get Hired." headline, subheading, CTA buttons. Trust stats (50K+ students, 120+ courses, 10K+ problems). Replace existing HeroSection.jsx.
2. **Popular Courses** — Category filter chips: [All] [Programming] [DSA] [Web Dev] [AI] [Data]. Responsive grid of CourseCard components.
3. **Why Learn With Us** — Feature cards: AI Tutor, Coding Practice, Contests, Projects, Jobs, Certificates
4. **Learning Paths** — Horizontal scroll carousels
5. **Latest Blog** — BlogCard components in grid
6. **Student Reviews** — Testimonial videos (YouTube embeds)
7. **Call-to-Action** — "Ready to Start Learning?" with email signup or demo booking

**Migration approach**: Rewrite `app/page.jsx` → `app/page.tsx` using the new component system. Preserve SEO metadata and schema.org JSON-LD.

### 2.2 Courses Listing (`app/courses/page.tsx`)
- New page: `/courses` (clean URL, replacing individual course slug pages)
- Search bar + category filter chips
- Sidebar filters: Level (Beginner/Intermediate/Advanced), Price (Free/Paid), Duration
- Main content: responsive grid of course cards
- Use `CourseCard` component

### 2.3 Course Detail (`app/courses/[slug]/page.tsx`)
- Existing `/app/courses/[slug]/page.js` maps to new Tailwind design
- Sections: Hero + enroll button, Stats (rating, students, level), What You'll Learn, Curriculum accordion, Instructor, Reviews, FAQ
- Use existing `getCourseBySlug` from `data/courses.js`

### 2.4 Blog (`app/blog/page.tsx` + `app/blog/[slug]/page.tsx`)
- Blog archive: search, category filter, featured posts, recent posts sidebar
- Blog detail: article content with syntax highlighting, social share, comments section
- Category pages: `/blog/category/[slug]`
- Tag pages: `/blog/tag/[slug]`
- Preserve existing SEO and structured data

### 2.5 404 & Error Pages
- Custom 404 page matching design system
- Error boundary components

---

## Phase 3: Auth

### 3.1 Login (`app/auth/login/page.tsx`)
- Rewrite existing login page with Tailwind + shadcn/ui
- Phone OTP flow (Firebase Phone Auth or Laravel Sanctum)
- Email/password fallback
- "Forgot password" link

### 3.2 Register (`app/auth/register/page.tsx`)
- Name, email, phone, password form
- Terms checkbox
- Redirect to email verification or OTP

### 3.3 Auth Guard
- Create `components/AuthGuard.tsx` (client component)
- Create `middleware.ts` for route protection
- Protected routes: `/dashboard`, `/practice`, `/jobs`, `/ai`, `/community`, `/resume`, `/admin`

---

## Phase 4: Student Dashboard & Learning Features

### 4.1 Learning Dashboard (`app/dashboard/page.tsx`)
Redesign existing `app/student/dashboard/page.js` → new `/app/dashboard/page.tsx`:
- **Layout**: Sidebar navigation (Dashboard, My Courses, Practice, Contests, Projects, Certificates, AI Tutor, Interviews, Resume, Jobs, Settings)
- **Content**: Welcome banner ("Good morning, Student 👋"), Continue Learning card, Daily Challenge, Streak counter, Recent activity
- Use existing lesson/quiz data, enhance with Tailwind styling

### 4.2 Coding Practice UI (`app/practice/page.tsx` + `app/practice/[problem]/page.tsx`)
**New feature area.**
- Problem listing: filter by difficulty, category, status (solved/unsolved)
- Split-pane layout: Problem description (left) | Monaco code editor (right)
- Language selector: Python, Java, C++, JavaScript
- Tabs below editor: Test Cases | Output | Console | AI Hint
- Run Code / Submit buttons
- Monaco Editor integration via `@monaco-editor/react`
- Test results visualization

### 4.3 AI Tutor (`app/ai/page.tsx`)
**New feature area.**
- Chat interface: message list, input bar with send button
- Predefined action buttons: Explain, Debug, Optimize, Give Hint, Generate Example, Create Quiz
- API integration with Laravel AI endpoints
- Framer Motion for message transitions

### 4.4 Contests (`app/contests/page.tsx` + `app/contests/[id]/page.tsx`)
**New feature area.**
- Upcoming/Active/Past contest cards with countdown timers
- Leaderboard table
- Contest detail: problem list, timer, submission status
- Real-time rank updates

### 4.5 Community (`app/community/page.tsx` + `app/community/[id]/page.tsx`)
**New feature area.**
- Question listing with filter/sort
- "Ask Question" button
- Discussion view: question, answers (with code blocks, upvotes), answer form
- Rich text editor for answers

### 4.6 Resume Builder (`app/resume/page.tsx` + `app/resume/preview/page.tsx`)
**New feature area.**
- Multi-step form: Personal Info, Experience, Education, Skills, Projects, Certificates
- Live preview panel (split-screen on desktop, toggle on mobile)
- AI Review button (calls Laravel API)
- Download PDF button

---

## Phase 5: Jobs

### 5.1 Jobs Listing (`app/jobs/page.tsx`)
- Search bar + filter chips: [Frontend] [Backend] [Python] [Remote]
- Job cards: title, company, location, salary, tags (tech stack)
- Pagination or infinite scroll

### 5.2 Job Detail (`app/jobs/[id]/page.tsx`)
- Company info, job description, requirements, responsibilities
- Apply button
- Related jobs sidebar

---

## Phase 6: Admin UI (Next.js + Tailwind)

### 6.1 Admin Dashboard (`app/admin/dashboard/page.tsx`)
- Rewrite existing admin dashboard with full sidebar layout
- Metrics cards: Users, Courses, Revenue, Active Students
- Recent Enrollments table

### 6.2 Admin Sidebar (`components/admin/AdminSidebar.tsx`)
```
Dashboard
Users
Courses
 ├── All Courses
 ├── Categories
 ├── Modules
 ├── Lessons
 └── Reviews
Coding
 ├── Problems
 ├── Test Cases
 ├── Submissions
 └── Languages
Blog
 ├── Posts
 ├── Categories
 ├── Tags
 └── Comments
Jobs
Companies
Contests
Projects
AI
Payments
Certificates
Reports
Settings
```

### 6.3 Admin API Routes (Next.js)
Proxy through to Laravel API:
- `/api/admin/courses` (GET, POST, PUT, DELETE)
- `/api/admin/problems` (GET, POST)
- `/api/admin/users` (GET, PUT)
- etc.

---

## Phase 7: Checkout & Profile

### 7.1 Checkout (`app/checkout/page.tsx`)
- Order summary, payment form
- Integration with payment gateway (via Laravel API)
- Success/cancel pages

### 7.2 Profile (`app/profile/page.tsx`)
- User avatar, personal info edit
- Password change
- Payment methods
- Order history

---

## Phase 8: UI Polish & UX

### 8.1 Animations
- Framer Motion for: page transitions, component entrance, card hover, modal open/close
- Staggered animations for lists

### 8.2 Dark Mode
- Theme provider using `next-themes`
- Toggle switch in Header
- All components support dark variant

### 8.3 Mobile Responsiveness
- Mobile bottom navigation (Home, Courses, Practice, Community, Profile)
- Responsive grids (Tailwind breakpoints)
- Touch-friendly targets

### 8.4 Loading States
- Skeleton components for: course cards, blog cards, problem list, dashboard metrics
- Progress bars for: page transitions, form submissions

### 8.5 Notifications
- Toast component for success/error/info messages
- Replace all `alert()` calls

---

## Implementation Order (Tasks)

The plan is organized into phases that can be executed sequentially, with each phase building on the previous:

1. **Phase 0** — Tailwind config, TypeScript, dependency installs, API client
2. **Phase 1** — Design system components, layout components, auth middleware
3. **Phase 2** — Public pages (Homepage, Courses list + detail, Blog)
4. **Phase 3** — Auth pages (Login, Register)
5. **Phase 4** — Student dashboard + new features (Practice, AI Tutor, Contests, Community, Resume Builder)
6. **Phase 5** — Jobs listing + detail
7. **Phase 6** — Admin UI with full sidebar navigation
8. **Phase 7** — Checkout + Profile pages
9. **Phase 8** — Polish (animations, dark mode, mobile, loading, notifications)
10. **Phase 9** — Testing & validation

Each phase should be validated with `npm run build` (lint + typecheck) before proceeding to the next.
