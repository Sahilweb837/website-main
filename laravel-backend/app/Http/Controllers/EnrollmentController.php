<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Enrollment;
use App\Models\Course;
use App\Models\Student;

class EnrollmentController extends Controller
{
    /**
     * Display a listing of enrollments.
     */
    public function index(Request $request)
    {
        $query = Enrollment::with(['student', 'course']);

        if ($request->has('userId') || $request->has('student_id')) {
            $studentId = $request->userId ?? $request->student_id;
            $query->whereHas('student', function ($q) use ($studentId) {
                $q->where('student_code', $studentId)
                  ->orWhere('id', $studentId);
            });
        }

        $enrollments = $query->get();

        return response()->json([
            'success' => true,
            'count' => $enrollments->count(),
            'data' => $enrollments,
        ]);
    }

    /**
     * Enroll in a new course.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'userId' => 'required',
            'courseSlug' => 'required|string',
        ]);

        $student = Student::where('student_code', $validated['userId'])
            ->orWhere('id', $validated['userId'])
            ->first();

        $course = Course::where('slug', $validated['courseSlug'])->first();

        if (!$student || !$course) {
            return response()->json([
                'success' => false,
                'message' => 'Student or Course not found',
            ], 404);
        }

        $existing = Enrollment::where('student_id', $student->id)
            ->where('course_id', $course->id)
            ->first();

        if ($existing) {
            return response()->json([
                'success' => true,
                'message' => 'Already enrolled',
                'data' => $existing,
            ]);
        }

        $enrollment = Enrollment::create([
            'student_id' => $student->id,
            'course_id' => $course->id,
            'progress_percentage' => 0,
            'completed_lessons' => [],
            'current_lesson_id' => 'fs-1',
            'enrolled_at' => now()->toDateString(),
            'status' => 'active',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Enrolled successfully',
            'data' => $enrollment,
        ], 201);
    }

    /**
     * Update lesson progress.
     */
    public function updateProgress(Request $request, $id)
    {
        $enrollment = Enrollment::findOrFail($id);
        $enrollment->update([
            'progress_percentage' => $request->progress_percentage ?? $enrollment->progress_percentage,
            'completed_lessons' => $request->completed_lessons ?? $enrollment->completed_lessons,
            'current_lesson_id' => $request->current_lesson_id ?? $enrollment->current_lesson_id,
            'last_accessed_at' => now(),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Progress saved successfully',
            'data' => $enrollment,
        ]);
    }
}
