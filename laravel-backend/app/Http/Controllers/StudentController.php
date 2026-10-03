<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Student;
use App\Models\DrmSecurityLog;

class StudentController extends Controller
{
    /**
     * Display a listing of students with enrollment details.
     */
    public function index(Request $request)
    {
        $query = Student::with('enrollments.course');

        if ($request->has('q')) {
            $term = '%' . $request->q . '%';
            $query->where(function ($q) use ($term) {
                $q->where('name', 'like', $term)
                  ->orWhere('email', 'like', $term)
                  ->orWhere('student_code', 'like', $term);
            });
        }

        $students = $query->orderBy('created_at', 'desc')->get();

        return response()->json([
            'success' => true,
            'count' => $students->count(),
            'data' => $students,
        ]);
    }

    /**
     * Display single student profile.
     */
    public function show($id)
    {
        $student = Student::with('enrollments.course')->find($id);

        if (!$student) {
            return response()->json([
                'success' => false,
                'message' => 'Student not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $student,
        ]);
    }

    /**
     * Enroll new student.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:120',
            'email' => 'required|email|unique:students,email',
            'phone' => 'nullable|string|max:30',
        ]);

        $code = 'NC-STU-2026-' . rand(100, 999);
        $student = Student::create([
            'student_code' => $code,
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? null,
            'drm_status' => 'Protected',
            'drm_watermark_id' => 'WM-' . strtoupper(substr($validated['name'], 0, 4)) . '-' . rand(100, 999),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Student registered successfully',
            'data' => $student,
        ], 201);
    }

    /**
     * Instant 1-Click Demo Login for Sahil Sandhu.
     */
    public function demoLogin()
    {
        $student = Student::where('email', 'sahil@netcoder.in')->first();

        if (!$student) {
            $student = Student::create([
                'student_code' => 'NC-STU-2026-001',
                'name' => 'Sahil Sandhu',
                'email' => 'sahil@netcoder.in',
                'phone' => '9876543210',
                'drm_status' => 'Protected',
                'drm_watermark_id' => 'WM-SAHIL-001-NC',
            ]);
        }

        $student->update(['last_login_at' => now()]);

        return response()->json([
            'success' => true,
            'message' => 'Demo authentication successful',
            'token' => 'netcoder_demo_session_token_' . time(),
            'user' => [
                'id' => $student->student_code,
                'name' => $student->name,
                'email' => $student->email,
                'phone' => $student->phone,
                'role' => 'student',
                'drmStatus' => $student->drm_status,
                'watermarkId' => $student->drm_watermark_id,
            ],
        ]);
    }

    /**
     * Log DRM Security Incident (Screen Capture, DevTools, Download).
     */
    public function logDrmEvent(Request $request)
    {
        $log = DrmSecurityLog::create([
            'student_id' => $request->student_id ?? 1,
            'event_type' => $request->event_type ?? 'screenshot_blocked',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'event_payload' => $request->all(),
        ]);

        return response()->json([
            'success' => true,
            'logged' => true,
            'id' => $log->id,
        ]);
    }
}
