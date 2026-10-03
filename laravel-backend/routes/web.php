<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CourseController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Web routes for Laravel LMS Admin Dashboard and health checks.
|
*/

Route::get('/', function () {
    return redirect('/admin');
});

Route::get('/admin', [AdminController::class, 'dashboard']);

Route::get('/health', function () {
    return response()->json([
        'status' => 'active',
        'platform' => 'Laravel 11 LMS Backend',
        'nextjs_connected' => true,
        'timestamp' => now()->toIso8601String()
    ]);
});
