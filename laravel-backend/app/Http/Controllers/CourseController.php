<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;
use App\Models\Course;

class CourseController extends Controller
{
    /**
     * Display a listing of courses with optional search, category and level filters.
     */
    public function index(Request $request)
    {
        $query = Course::where('is_active', 1);

        if ($request->has('category') && $request->category !== 'All') {
            $query->where('category', $request->category);
        }

        if ($request->has('level') && $request->level !== 'All') {
            $query->where('level', $request->level);
        }

        if ($request->has('q')) {
            $term = '%' . $request->q . '%';
            $query->where(function ($q) use ($term) {
                $q->where('title', 'like', $term)
                  ->orWhere('overview', 'like', $term);
            });
        }

        $courses = $query->orderBy('rating', 'desc')->get();

        return response()->json([
            'success' => true,
            'count' => $courses->count(),
            'data' => $courses,
        ]);
    }

    /**
     * Display single course by slug.
     */
    public function show($slug)
    {
        $course = Course::where('slug', $slug)->first();

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
            'syllabus' => 'nullable|array',
            'highlights' => 'nullable|array',
            'tags' => 'nullable|array',
        ]);

        $slug = Str::slug($validated['title']);
        $uniqueSlug = $slug;
        $counter = 1;
        while (Course::where('slug', $uniqueSlug)->exists()) {
            $uniqueSlug = "{$slug}-{$counter}";
            $counter++;
        }

        $price = $validated['price'] ?? $validated['fee'] ?? 79;
        $course = Course::create([
            'title' => $validated['title'],
            'slug' => $uniqueSlug,
            'category' => $validated['category'] ?? 'fullstack',
            'duration' => $validated['duration'] ?? '38 hrs • 8 Full Projects',
            'level' => $validated['level'] ?? 'Beginner to Advanced',
            'overview' => $validated['overview'],
            'price' => $price,
            'original_price' => $validated['original_price'] ?? ($price * 2),
            'fee' => $price,
            'badge' => $validated['badge'] ?? 'Featured',
            'instructor' => $validated['instructor'] ?? 'Netcoder Expert Faculty',
            'instructor_avatar' => $validated['instructor_avatar'] ?? '/images/instructor-default.png',
            'image' => $validated['image'] ?? '/images/full-stact-development.png',
            'tagline' => $validated['tagline'] ?? 'Industry Certified',
            'hours' => $validated['hours'] ?? ($validated['duration'] ?? '40 hrs'),
            'icon' => $validated['icon'] ?? 'code',
            'rating' => $validated['rating'] ?? 4.90,
            'reviews_count' => $validated['reviews_count'] ?? 100,
            'syllabus' => $validated['syllabus'] ?? [],
            'highlights' => $validated['highlights'] ?? [],
            'tags' => $validated['tags'] ?? [],
            'is_active' => true,
        ]);

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
        $course = Course::findOrFail($id);
        $data = $request->all();
        if (isset($data['price']) && !isset($data['fee'])) {
            $data['fee'] = $data['price'];
        }
        $course->update($data);

        return response()->json([
            'success' => true,
            'message' => 'Course updated successfully',
            'data' => $course,
        ]);
    }

    /**
     * Remove the specified course.
     */
    public function destroy($id)
    {
        $course = Course::findOrFail($id);
        $course->delete();

        return response()->json([
            'success' => true,
            'message' => 'Course deleted successfully',
        ]);
    }
}
