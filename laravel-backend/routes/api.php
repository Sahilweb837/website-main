<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseVideoController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\VideoProgressController;

/*
|--------------------------------------------------------------------------
| Netcoder Technology API Routes
|--------------------------------------------------------------------------
| Standard RESTful API endpoints for the Netcoder Next.js LMS platform.
| Ready for Laravel 10 / 11 with Sanctum token authentication.
*/

// Public Endpoints
Route::prefix('v1')->group(function () {
    // Health Check
    Route::get('/health', function () {
        return response()->json([
            'status' => 'ok',
            'timestamp' => now()->toIso8601String(),
            'platform' => 'Netcoder Technology LMS API',
            'version' => '1.0.0'
        ]);
    });

    // Courses (Public Read)
    Route::get('/courses', [CourseController::class, 'index']);
    Route::get('/courses/{slug}', [CourseController::class, 'show']);

    // Course Videos (Public Read for enrolled students)
    Route::get('/courses/{course}/videos', [CourseVideoController::class, 'index']);
    Route::get('/courses/{course}/videos/{video}', [CourseVideoController::class, 'show']);

    // Blogs (Public Read)
    Route::get('/blogs', [BlogController::class, 'index']);
    Route::get('/blogs/{slug}', [BlogController::class, 'show']);

    // Seminar Feedback (Public Submit)
    Route::post('/feedback', [FeedbackController::class, 'store']);

    // Demo Inquiries (Public Submit)
    Route::post('/demo-inquiry', [AdminController::class, 'submitInquiry']);

    // Student Authentication
    Route::post('/students/login', [StudentController::class, 'login']);
    Route::post('/students/demo-login', [StudentController::class, 'demoLogin']);

    // Admin Authentication
    Route::post('/admin/login', [AdminController::class, 'login']);
});

// Protected Student LMS Routes
Route::prefix('v1/lms')->group(function () {
    Route::get('/students', [StudentController::class, 'index']);
    Route::get('/students/{id}', [StudentController::class, 'show']);
    Route::post('/students', [StudentController::class, 'store']);
    Route::put('/students/{id}', [StudentController::class, 'update']);
    Route::delete('/students/{id}', [StudentController::class, 'destroy']);
    Route::delete('/students', [StudentController::class, 'destroy']);

    Route::get('/enrollments', [EnrollmentController::class, 'index']);
    Route::post('/enrollments', [EnrollmentController::class, 'store']);
    Route::put('/enrollments/{id}/progress', [EnrollmentController::class, 'updateProgress']);

    // Video Progress
    Route::get('/courses/{course}/progress', [VideoProgressController::class, 'getCourseProgress']);
    Route::get('/videos/{video}/progress', [VideoProgressController::class, 'getProgress']);
    Route::post('/videos/{video}/progress', [VideoProgressController::class, 'updateProgress']);
    Route::post('/videos/{video}/complete', [VideoProgressController::class, 'markCompleted']);

    // DRM Security Incident Logging
    Route::post('/drm/log', [StudentController::class, 'logDrmEvent']);
});

// Protected Admin Portal Management Routes
Route::prefix('v1/admin')->group(function () {
    Route::get('/stats', [AdminController::class, 'getStats']);

    // Courses Management
    Route::post('/courses', [CourseController::class, 'store']);
    Route::put('/courses/{id}', [CourseController::class, 'update']);
    Route::delete('/courses/{id}', [CourseController::class, 'destroy']);

    // Video Management
    Route::get('/videos', [CourseVideoController::class, 'adminIndex']);
    Route::post('/courses/{course}/videos', [CourseVideoController::class, 'store']);
    Route::post('/courses/{course}/videos/upload', [CourseVideoController::class, 'upload']);
    Route::put('/courses/{course}/videos/{video}', [CourseVideoController::class, 'update']);
    Route::delete('/courses/{course}/videos/{video}', [CourseVideoController::class, 'destroy']);
    Route::put('/courses/{course}/videos/reorder', [CourseVideoController::class, 'reorder']);

    // Blogs Management
    Route::post('/blogs', [BlogController::class, 'store']);
    Route::put('/blogs/{id}', [BlogController::class, 'update']);
    Route::delete('/blogs/{id}', [BlogController::class, 'destroy']);

    // Feedback Records
    Route::get('/feedback', [FeedbackController::class, 'index']);
    Route::delete('/feedback/{id}', [FeedbackController::class, 'destroy']);

    // DRM Security Audit
    Route::get('/drm-logs', [AdminController::class, 'getDrmLogs']);
});

// Root fallback compatibility for Next.js lib/api.js
Route::get('/courses', [CourseController::class, 'index']);
Route::post('/courses', [CourseController::class, 'store']);
Route::put('/courses/{id}', [CourseController::class, 'update']);
Route::delete('/courses/{id}', [CourseController::class, 'destroy']);
Route::get('/blogs', [BlogController::class, 'index']);
Route::post('/blogs', [BlogController::class, 'store']);
Route::get('/feedback', [FeedbackController::class, 'index']);
Route::post('/feedback', [FeedbackController::class, 'store']);
Route::get('/admin/stats', [AdminController::class, 'getStats']);
Route::get('/lms/students', [StudentController::class, 'index']);
Route::post('/lms/students', [StudentController::class, 'store']);
Route::put('/lms/students/{id}', [StudentController::class, 'update']);
Route::post('/lms/students/update', [StudentController::class, 'update']);
Route::delete('/lms/students/{id}', [StudentController::class, 'destroy']);
Route::delete('/lms/students', [StudentController::class, 'destroy']);
Route::get('/enrollments', [EnrollmentController::class, 'index']);
Route::post('/enrollments', [EnrollmentController::class, 'store']);

// Live classes & mentor materials compatibility routes
Route::get('/classes', function() {
    $file = database_path('storage.json');
    $db = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    return response()->json(['success' => true, 'data' => $db['classes'] ?? []]);
});
Route::get('/notes', function() {
    $file = database_path('storage.json');
    $db = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    return response()->json(['success' => true, 'data' => $db['notes'] ?? []]);
});
Route::get('/tasks', function() {
    $file = database_path('storage.json');
    $db = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    return response()->json(['success' => true, 'data' => $db['tasks'] ?? []]);
});

// Video compatibility routes
Route::get('/videos', function() {
    $file = database_path('storage.json');
    $db = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
    return response()->json(['success' => true, 'data' => $db['videos'] ?? []]);
});
Route::get('/courses/{course}/videos', [CourseVideoController::class, 'index']);
Route::post('/courses/{course}/videos', [CourseVideoController::class, 'store']);
Route::post('/courses/{course}/videos/upload', [CourseVideoController::class, 'upload']);
Route::get('/admin/videos', [CourseVideoController::class, 'adminIndex']);

