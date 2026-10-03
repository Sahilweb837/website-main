<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use App\Models\DrmSecurityLog;
use App\Services\StudentService;

class StudentController extends Controller
{
    protected StudentService $studentService;

    public function __construct()
    {
        $this->studentService = new StudentService();
    }

    /**
     * Display a listing of students with enrollment details.
     */
    public function index(Request $request)
    {
        $search = $request->query('q') ?? $request->query('search');
        $students = $this->studentService->getAllStudents($search);

        return response()->json([
            'success' => true,
            'count' => count($students),
            'data' => $students,
        ]);
    }

    /**
     * Display single student profile.
     */
    public function show($id)
    {
        $student = $this->studentService->getStudentById($id);

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
            'email' => 'required|email',
            'phone' => 'nullable|string|max:30',
            'course' => 'nullable|string|max:150',
            'slug' => 'nullable|string|max:150',
            'feePaid' => 'nullable|numeric',
            'drmStatus' => 'nullable|string',
            'progress' => 'nullable|integer',
        ]);

        $student = $this->studentService->createStudent($validated);

        return response()->json([
            'success' => true,
            'message' => 'Student registered successfully & DRM credentials generated',
            'data' => $student,
        ], 201);
    }

    /**
     * Update existing student profile and enrollment info.
     */
    public function update(Request $request, $id = null)
    {
        $targetId = $id ?? $request->id ?? $request->student_code;

        if (!$targetId) {
            return response()->json([
                'success' => false,
                'message' => 'Student ID or code is required',
            ], 400);
        }

        $validated = $request->validate([
            'name' => 'nullable|string|max:120',
            'email' => 'nullable|email',
            'phone' => 'nullable|string|max:30',
            'course' => 'nullable|string|max:150',
            'slug' => 'nullable|string|max:150',
            'feePaid' => 'nullable|numeric',
            'drmStatus' => 'nullable|string',
            'progress' => 'nullable|integer',
        ]);

        $updated = $this->studentService->updateStudent($targetId, $validated);

        if (!$updated) {
            return response()->json([
                'success' => false,
                'message' => "Student '{$targetId}' not found for update",
            ], 404);
        }

        return response()->json([
            'success' => true,
            'message' => 'Student information updated successfully',
            'data' => $updated,
        ]);
    }

    /**
     * Cascading Delete: "agar delete hai toh delete hojaye sab kuch"
     * Permanently deletes student and all linked enrollments, DRM logs, and video progress.
     */
    public function destroy(Request $request, $id = null)
    {
        $targetId = $id ?? $request->query('id') ?? $request->id;

        if (!$targetId) {
            return response()->json([
                'success' => false,
                'message' => 'Student ID is required for deletion',
            ], 400);
        }

        $result = $this->studentService->deleteStudentCascade($targetId);

        $status = $result['success'] ? 200 : 404;
        return response()->json($result, $status);
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
