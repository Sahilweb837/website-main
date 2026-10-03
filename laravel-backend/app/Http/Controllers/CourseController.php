<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\CourseService;

class CourseController extends Controller
{
    protected CourseService $courseService;

    public function __construct()
    {
        $this->courseService = new CourseService();
    }

    /**
     * Display a listing of courses with optional search, category and level filters.
     */
    public function index(Request $request)
    {
        $category = $request->query('category');
        $search = $request->query('q') ?? $request->query('search');

        $courses = $this->courseService->getAllCourses($category, $search);

        // Also check if slug query was requested directly
        if ($request->has('slug')) {
            $course = $this->courseService->getCourseBySlugOrId($request->slug);
            if ($course) {
                return response()->json([
                    'success' => true,
                    'data' => $course,
                ]);
            }
            return response()->json([
                'success' => false,
                'message' => "Course '{$request->slug}' not found",
            ], 404);
        }

        return response()->json([
            'success' => true,
            'count' => count($courses),
            'data' => $courses,
        ]);
    }

    /**
     * Display single course by slug or ID.
     */
    public function show($slug)
    {
        $course = $this->courseService->getCourseBySlugOrId($slug);

        if (!$course) {
            return response()->json([
                'success' => false,
                'message' => "Course '{$slug}' not found",
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $course,
        ]);
    }

    /**
     * Store a newly created course in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'overview' => 'required|string',
            'category' => 'nullable|string|max:100',
            'duration' => 'nullable|string|max:80',
            'level' => 'nullable|string|max:80',
            'price' => 'nullable|numeric',
            'original_price' => 'nullable|numeric',
            'originalPrice' => 'nullable|numeric',
            'fee' => 'nullable|numeric',
            'badge' => 'nullable|string|max:50',
            'instructor' => 'nullable|string|max:150',
            'instructor_avatar' => 'nullable|string',
            'image' => 'nullable|string',
            'tagline' => 'nullable|string|max:150',
            'hours' => 'nullable|string|max:100',
            'icon' => 'nullable|string|max:50',
            'rating' => 'nullable|numeric',
            'reviews_count' => 'nullable|integer',
        ]);

        $course = $this->courseService->createCourse($validated);

        return response()->json([
            'success' => true,
            'message' => 'Course published successfully to LMS catalog',
            'data' => $course,
        ], 201);
    }

    /**
     * Update an existing course.
     */
    public function update(Request $request, $id)
    {
        $course = $this->courseService->updateCourse($id, $request->all());

        if (!$course) {
            return response()->json([
                'success' => false,
                'message' => "Course '{$id}' not found for update",
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Course updated successfully',
            'data' => $course,
        ]);
    }

    /**
     * Remove the specified course (cascading cleanup).
     */
    public function destroy(Request $request, $id = null)
    {
        $targetId = $id ?? $request->query('id') ?? $request->query('slug');

        if (!$targetId) {
            return response()->json([
                'success' => false,
                'message' => 'Course ID or slug required',
            ], 400);
        }

        $this->courseService->deleteCourseCascade($targetId);

        return response()->json([
            'success' => true,
            'message' => 'Course deleted successfully from catalog',
        ]);
    }
}
