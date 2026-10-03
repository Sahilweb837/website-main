<?php

namespace App\Services;

use App\Models\Course;
use App\Models\Video;
use App\Models\Enrollment;
use Illuminate\Support\Str;

class CourseService
{
    protected string $storageFile;

    public function __construct()
    {
        $this->storageFile = function_exists('database_path') 
            ? database_path('storage.json') 
            : dirname(__DIR__, 2) . '/database/storage.json';
    }

    protected function loadStorage(): array
    {
        $default = ['courses' => [], 'students' => [], 'blogs' => [], 'feedbacks' => [], 'classes' => [], 'notes' => [], 'tasks' => []];
        if (!file_exists($this->storageFile)) return $default;
        $data = json_decode(file_get_contents($this->storageFile), true);
        return is_array($data) ? array_merge($default, $data) : $default;
    }

    protected function saveStorage(array $data): void
    {
        file_put_contents($this->storageFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    }

    /**
     * Get all courses with optional filters.
     */
    public function getAllCourses(?string $category = null, ?string $search = null): array
    {
        try {
            $query = Course::where('is_active', 1);
            if ($category && strtolower($category) !== 'all') {
                $query->where('category', $category);
            }
            if ($search) {
                $term = '%' . $search . '%';
                $query->where(function ($q) use ($term) {
                    $q->where('title', 'like', $term)->orWhere('overview', 'like', $term);
                });
            }
            $courses = $query->orderBy('rating', 'desc')->get();
            if ($courses->isNotEmpty()) {
                return $courses->toArray();
            }
        } catch (\Throwable $e) {
            // fallback
        }

        $storage = $this->loadStorage();
        $courses = $storage['courses'] ?? [];

        if ($category && strtolower($category) !== 'all') {
            $cat = strtolower($category);
            $courses = array_values(array_filter($courses, function ($c) use ($cat) {
                return strtolower($c['category'] ?? '') === $cat;
            }));
        }

        if ($search) {
            $q = strtolower(trim($search));
            $courses = array_values(array_filter($courses, function ($c) use ($q) {
                return str_contains(strtolower($c['title'] ?? ''), $q) || str_contains(strtolower($c['overview'] ?? ''), $q);
            }));
        }

        return $courses;
    }

    /**
     * Get course by ID or Slug.
     */
    public function getCourseBySlugOrId(string|int $idOrSlug): ?array
    {
        try {
            $course = Course::where('slug', $idOrSlug)->orWhere('id', $idOrSlug)->first();
            if ($course) return $course->toArray();
        } catch (\Throwable $e) {}

        $storage = $this->loadStorage();
        foreach ($storage['courses'] as $c) {
            if (strtolower($c['slug'] ?? '') === strtolower((string)$idOrSlug) || (string)($c['id'] ?? '') === (string)$idOrSlug) {
                return $c;
            }
        }

        return null;
    }

    /**
     * Create a new course track.
     */
    public function createCourse(array $data): array
    {
        $storage = $this->loadStorage();
        $title = trim($data['title'] ?? 'New Course');
        $slug = !empty($data['slug']) ? Str::slug($data['slug']) : Str::slug($title);
        $price = isset($data['price']) ? (float)$data['price'] : (isset($data['fee']) ? (float)$data['fee'] : 79);
        $originalPrice = isset($data['originalPrice']) ? (float)$data['originalPrice'] : (isset($data['original_price']) ? (float)$data['original_price'] : ($price * 2));

        $newCourse = [
            'id' => time(),
            'title' => $title,
            'slug' => $slug,
            'category' => $data['category'] ?? 'fullstack',
            'duration' => $data['duration'] ?? '40 hrs • 8 Production Projects',
            'level' => $data['level'] ?? 'Intermediate',
            'overview' => $data['overview'] ?? 'Production-grade course track.',
            'price' => $price,
            'fee' => $price,
            'original_price' => $originalPrice,
            'originalPrice' => $originalPrice,
            'instructor' => $data['instructor'] ?? 'Netcoder Senior Faculty',
            'instructor_avatar' => $data['instructor_avatar'] ?? '/images/instructor-default.png',
            'image' => $data['image'] ?? '/images/full-stact-development.png',
            'hours' => $data['hours'] ?? ($data['duration'] ?? '40 hrs'),
            'badge' => $data['badge'] ?? 'Featured',
            'tagline' => $data['tagline'] ?? 'Industry Certified',
            'icon' => $data['icon'] ?? 'code',
            'rating' => isset($data['rating']) ? (float)$data['rating'] : 4.95,
            'reviews_count' => isset($data['reviews_count']) ? (int)$data['reviews_count'] : 120,
            'ratingCount' => isset($data['ratingCount']) ? (int)$data['ratingCount'] : 120,
            'is_active' => true,
            'created_at' => date('Y-m-d H:i:s'),
        ];

        array_unshift($storage['courses'], $newCourse);
        $this->saveStorage($storage);

        try {
            Course::create($newCourse);
        } catch (\Throwable $e) {}

        return $newCourse;
    }

    /**
     * Update an existing course.
     */
    public function updateCourse(string|int $idOrSlug, array $data): ?array
    {
        $storage = $this->loadStorage();
        $foundIndex = -1;

        foreach ($storage['courses'] as $idx => $c) {
            if ((string)($c['id'] ?? '') === (string)$idOrSlug || ($c['slug'] ?? '') === (string)$idOrSlug) {
                $foundIndex = $idx;
                break;
            }
        }

        if ($foundIndex === -1) return null;

        $existing = $storage['courses'][$foundIndex];

        if (isset($data['title'])) $existing['title'] = trim($data['title']);
        if (isset($data['category'])) $existing['category'] = $data['category'];
        if (isset($data['level'])) $existing['level'] = $data['level'];
        if (isset($data['duration'])) $existing['duration'] = $data['duration'];
        if (isset($data['instructor'])) $existing['instructor'] = $data['instructor'];
        if (isset($data['overview'])) $existing['overview'] = $data['overview'];
        if (isset($data['image'])) $existing['image'] = $data['image'];
        if (isset($data['badge'])) $existing['badge'] = $data['badge'];
        if (isset($data['price'])) {
            $existing['price'] = (float)$data['price'];
            $existing['fee'] = (float)$data['price'];
        }
        if (isset($data['originalPrice']) || isset($data['original_price'])) {
            $orig = (float)($data['originalPrice'] ?? $data['original_price']);
            $existing['originalPrice'] = $orig;
            $existing['original_price'] = $orig;
        }

        $existing['updated_at'] = date('Y-m-d H:i:s');
        $storage['courses'][$foundIndex] = $existing;
        $this->saveStorage($storage);

        try {
            $courseModel = Course::where('id', $idOrSlug)->orWhere('slug', $idOrSlug)->first();
            if ($courseModel) {
                $courseModel->update($existing);
            }
        } catch (\Throwable $e) {}

        return $existing;
    }

    /**
     * Cascading delete for course: purges course and associated live class schedules.
     */
    public function deleteCourseCascade(string|int $idOrSlug): bool
    {
        $storage = $this->loadStorage();
        $targetSlug = null;

        foreach ($storage['courses'] as $c) {
            if ((string)($c['id'] ?? '') === (string)$idOrSlug || ($c['slug'] ?? '') === (string)$idOrSlug) {
                $targetSlug = $c['slug'] ?? null;
                break;
            }
        }

        $storage['courses'] = array_values(array_filter($storage['courses'], function ($c) use ($idOrSlug) {
            return (string)($c['id'] ?? '') !== (string)$idOrSlug && ($c['slug'] ?? '') !== (string)$idOrSlug;
        }));

        // Clean up linked classes if any
        if ($targetSlug && isset($storage['classes'])) {
            $storage['classes'] = array_values(array_filter($storage['classes'], function ($cls) use ($targetSlug) {
                return ($cls['courseSlug'] ?? '') !== $targetSlug;
            }));
        }

        $this->saveStorage($storage);

        try {
            $course = Course::where('id', $idOrSlug)->orWhere('slug', $idOrSlug)->first();
            if ($course) {
                Video::where('course_id', $course->id)->delete();
                Enrollment::where('course_id', $course->id)->delete();
                $course->delete();
            }
        } catch (\Throwable $e) {}

        return true;
    }
}
