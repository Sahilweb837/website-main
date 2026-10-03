# Video Course Management + Admin Dashboard Redesign Plan

## Overview
Add video lesson management to Laravel backend and redesign the Next.js Admin Dashboard with a collapsible left sidebar and deferred data fetching.

---

## Phase 1: Laravel Backend - Video Course Management

### 1.1 Database Models & Migrations
- **Video.php** - Video model (title, description, file_path, duration, thumbnail, course_id, order, is_free, status)
- **VideoProgress.php** - Student video progress (user_id, video_id, watched_seconds, completed_at, last_position)
- Add `videos` relationship to Course model

### 1.2 API Endpoints (routes/api.php)
```
GET    /v1/courses/{course}/videos           # List videos for course
POST   /v1/courses/{course}/videos           # Upload new video
GET    /v1/videos/{video}                    # Get video details + signed URL
PUT    /v1/videos/{video}                    # Update video metadata
DELETE /v1/videos/{video}                    # Delete video
POST   /v1/videos/{video}/progress           # Update watch progress
GET    /v1/videos/{video}/progress           # Get student progress
GET    /v1/admin/videos                      # Admin: all videos with pagination
```

### 1.3 Video Controller
- `CourseVideoController` - CRUD for course videos
- `VideoProgressController` - Track student watch progress
- File upload to `storage/app/public/videos/` with validation (mp4, webm, max 2GB)
- Generate thumbnail using FFmpeg (if available) or use placeholder

### 1.4 Storage Setup
- Run `php artisan storage:link`
- Configure `filesystems.php` for local video disk
- Add video mime types validation

---

## Phase 2: Next.js Admin Dashboard - Sidebar + Lazy Loading

### 2.1 New Sidebar Component Structure
```
components/admin/
├── Sidebar.tsx              # Collapsible left sidebar
├── SidebarNav.tsx           # Navigation items with icons
├── SidebarCollapseBtn.tsx   # Toggle button
├── AdminLayout.tsx          # Wrapper with sidebar + main content
└── tabs/                    # Lazy-loaded tab components
    ├── OverviewTab.tsx
    ├── LiveClassesTab.tsx
    ├── MentorHubTab.tsx
    ├── CoursesTab.tsx
    ├── LMSSecurityTab.tsx
    ├── ArticlesTab.tsx
    ├── FeedbackTab.tsx
    └── VideoManagerTab.tsx  # NEW: Video course management
```

### 2.2 Sidebar Features
- **Collapsible**: Icon-only (64px) ↔ Full (260px) width
- **Responsive**: Mobile drawer (slide-in from left)
- **Active state**: Highlight current route
- **Nested routes**: Support for sub-items (e.g., Courses → Video Manager)
- **Persistent**: State saved in localStorage

### 2.3 Deferred Data Fetching Pattern
```typescript
// Each tab component manages its own data fetching
// Data loads ONLY when tab becomes active
const useTabData = (tabKey: string, fetcher: () => Promise<Data>) => {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const load = useCallback(async () => {
    if (loaded || loading) return;
    setLoading(true);
    try {
      const result = await fetcher();
      setData(result);
      setLoaded(true);
    } finally {
      setLoading(false);
    }
  }, [loaded, loading, fetcher]);

  return { data, loading, load, loaded };
};
```

### 2.4 Skeleton Loaders per Tab
- Reuse existing `TableRowsSkeleton`, `DashboardStatsSkeleton`
- Add `VideoManagerSkeleton` for video grid/table
- Show skeletons while deferred fetch in progress

---

## Phase 3: Video Management UI (Admin)

### 3.1 VideoManagerTab Component
- **Video Grid View**: Thumbnail, title, duration, status, course
- **Upload Modal**: Drag-drop zone, progress bar, metadata form
- **Video Player Preview**: Video.js player in modal
- **Bulk Actions**: Publish/unpublish, delete, reorder
- **Inline Editing**: Title, description, free/paid toggle

### 3.2 Video Upload Flow
1. Admin clicks "Upload Video" in Video Manager tab
2. Modal opens with drag-drop + course select dropdown
3. File uploads to `/api/admin/videos/upload` (Next.js API route)
4. Next.js API proxies to Laravel `/api/v1/courses/{course}/videos`
5. On success: refresh video list, show toast

---

## Phase 4: Student Video Player (Future - Not in Scope)
> **Note**: Student-facing video player in LMS dashboard is out of scope for this plan but the API/data models support it.

---

## Implementation Order

### Step 1: Laravel Backend (Video Models + API)
1. Create Video & VideoProgress models + migrations
2. Add CourseVideoController with full CRUD
3. Add routes to api.php
4. Configure storage + validation
5. Test API endpoints

### Step 2: Next.js Admin Sidebar Infrastructure
1. Create `components/admin/Sidebar.tsx` + types
2. Create `AdminLayout.tsx` wrapper
3. Refactor `app/admin/dashboard/page.js` to use new layout
4. Add sidebar state persistence

### Step 3: Lazy-Load Tab Components
1. Extract each tab into `components/admin/tabs/*.tsx`
2. Wrap with `React.lazy` + `Suspense` + Skeleton
3. Implement `useTabData` hook for deferred fetching
4. Update main dashboard to use lazy tabs

### Step 4: Video Manager Tab
1. Create `VideoManagerTab.tsx` with grid + modal
2. Add Video.js player for preview
3. Create Next.js API route for video upload proxy
4. Connect to Laravel API

### Step 5: Polish & Testing
- Responsive sidebar (mobile drawer)
- Keyboard navigation (Tab, Arrow keys)
- ARIA attributes for accessibility
- Test lazy loading behavior
- Verify video upload → Laravel storage

---

## File Changes Summary

### New Files (Laravel)
- `laravel-backend/app/Models/Video.php`
- `laravel-backend/app/Models/VideoProgress.php`
- `laravel-backend/app/Http/Controllers/CourseVideoController.php`
- `laravel-backend/app/Http/Controllers/VideoProgressController.php`
- `laravel-backend/database/migrations/xxx_create_videos_table.php`
- `laravel-backend/database/migrations/xxx_create_video_progress_table.php`

### New Files (Next.js)
- `components/admin/Sidebar.tsx`
- `components/admin/SidebarNav.tsx`
- `components/admin/SidebarCollapseBtn.tsx`
- `components/admin/AdminLayout.tsx`
- `components/admin/tabs/OverviewTab.tsx`
- `components/admin/tabs/LiveClassesTab.tsx`
- `components/admin/tabs/MentorHubTab.tsx`
- `components/admin/tabs/CoursesTab.tsx`
- `components/admin/tabs/LMSSecurityTab.tsx`
- `components/admin/tabs/ArticlesTab.tsx`
- `components/admin/tabs/FeedbackTab.tsx`
- `components/admin/tabs/VideoManagerTab.tsx`
- `components/admin/VideoUploadModal.tsx`
- `components/admin/VideoPlayerPreview.tsx`
- `app/api/admin/videos/upload/route.ts`
- `hooks/useTabData.ts`

### Modified Files
- `laravel-backend/routes/api.php` - Add video routes
- `laravel-backend/app/Models/Course.php` - Add videos relationship
- `app/admin/dashboard/page.js` - Convert to use AdminLayout + lazy tabs
- `components/ui/SkeletonLoader.tsx` - Add VideoManagerSkeleton

---

## Validation Checklist

- [ ] Laravel API returns video list with signed URLs
- [ ] Video upload stores file in `storage/app/public/videos/`
- [ ] Sidebar collapses/expands smoothly
- [ ] Sidebar state persists on page refresh
- [ ] Mobile drawer opens/closes correctly
- [ ] Tab data loads only when tab activated
- [ ] Skeletons show during deferred fetch
- [ ] Video.js player plays uploaded videos
- [ ] Admin can CRUD videos per course
- [ ] TypeScript compiles without errors
- [ ] ESLint passes