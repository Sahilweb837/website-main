<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SeminarFeedback;

class FeedbackController extends Controller
{
    /**
     * Display seminar feedback records.
     */
    public function index()
    {
        $feedbacks = SeminarFeedback::orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'count' => $feedbacks->count(),
            'data' => $feedbacks,
        ]);
    }

    /**
     * Store new seminar/workshop feedback.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'student_name' => 'required|string|max:120',
            'contact_number' => 'required|string|max:30',
            'email' => 'nullable|email|max:150',
            'course' => 'nullable|string|max:100',
            'semester' => 'nullable|string|max:40',
            'overall_assessment' => 'nullable|string',
            'interested_courses' => 'nullable|array',
            'suggestions' => 'nullable|string',
        ]);

        $feedback = SeminarFeedback::create([
            'student_name' => $validated['student_name'],
            'contact_number' => $validated['contact_number'],
            'email' => $validated['email'] ?? null,
            'course' => $validated['course'] ?? 'General Engineering',
            'semester' => $validated['semester'] ?? '1st',
            'overall_assessment' => $validated['overall_assessment'] ?? 'Very Satisfied',
            'interested_courses' => $validated['interested_courses'] ?? [],
            'suggestions' => $validated['suggestions'] ?? '',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Seminar feedback submitted successfully!',
            'data' => $feedback,
        ], 201);
    }

    /**
     * Delete a feedback record.
     */
    public function destroy($id)
    {
        $feedback = SeminarFeedback::findOrFail($id);
        $feedback->delete();

        return response()->json([
            'success' => true,
            'message' => 'Feedback record removed',
        ]);
    }
}
