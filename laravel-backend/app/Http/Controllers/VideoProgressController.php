<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\File;

class VideoProgressController extends Controller
{
    private string $storagePath;
    private array $data;

    public function __construct()
    {
        $this->storagePath = database_path('storage.json');
        $this->loadData();
    }

    private function loadData(): void
    {
        if (File::exists($this->storagePath)) {
            $this->data = json_decode(File::get($this->storagePath), true) ?? [];
        } else {
            $this->data = [
                'courses' => [],
                'students' => [],
                'blogs' => [],
                'feedbacks' => [],
                'classes' => [],
                'notes' => [],
                'tasks' => [],
                'tests' => [],
                'mentors' => [],
                'videos' => [],
                'video_progress' => [],
            ];
        }
        
        if (!isset($this->data['video_progress'])) {
            $this->data['video_progress'] = [];
        }
    }

    private function saveData(): void
    {
        File::put($this->storagePath, json_encode($this->data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    }

    /**
     * Update watch progress for a video
     */
    public function updateProgress(Request $request, string $videoId): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|integer',
            'watched_seconds' => 'required|integer|min:0',
            'last_position' => 'required|integer|min:0',
            'duration' => 'required|integer|min:1',
        ]);

        $userId = $request->user_id;
        $videoIdInt = (int) $videoId;

        // Find existing progress
        $progressIndex = collect($this->data['video_progress'])
            ->search(fn($p) => $p['user_id'] == $userId && $p['video_id'] == $videoIdInt);

        $completionPercentage = min(100, ($request->watched_seconds / $request->duration) * 100);
        $completedAt = ($completionPercentage >= 90) ? now()->toDateTimeString() : null;

        $progressData = [
            'user_id' => $userId,
            'video_id' => $videoIdInt,
            'watched_seconds' => $request->watched_seconds,
            'last_position' => $request->last_position,
            'completion_percentage' => round($completionPercentage, 2),
            'completed_at' => $completedAt,
            'updated_at' => now()->toDateTimeString(),
        ];

        if ($progressIndex !== false) {
            // Update existing
            $this->data['video_progress'][$progressIndex] = array_merge(
                $this->data['video_progress'][$progressIndex],
                $progressData
            );
        } else {
            // Create new
            $progressData['created_at'] = now()->toDateTimeString();
            $this->data['video_progress'][] = $progressData;
        }

        $this->saveData();

        return response()->json([
            'success' => true,
            'message' => 'Progress updated',
            'data' => $progressData
        ]);
    }

    /**
     * Get student's progress for a video
     */
    public function getProgress(string $videoId, Request $request): JsonResponse
    {
        $userId = $request->get('user_id');
        
        if (!$userId) {
            return response()->json([
                'success' => false,
                'message' => 'user_id is required'
            ], 400);
        }

        $progress = collect($this->data['video_progress'])
            ->firstWhere(fn($p) => $p['user_id'] == $userId && $p['video_id'] == (int)$videoId);

        if (!$progress) {
            return response()->json([
                'success' => true,
                'data' => [
                    'user_id' => (int)$userId,
                    'video_id' => (int)$videoId,
                    'watched_seconds' => 0,
                    'last_position' => 0,
                    'completion_percentage' => 0,
                    'completed_at' => null,
                ]
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $progress
        ]);
    }

    /**
     * Get all video progress for a student in a course
     */
    public function getCourseProgress(Request $request, string $courseSlug): JsonResponse
    {
        $userId = $request->get('user_id');
        
        if (!$userId) {
            return response()->json([
                'success' => false,
                'message' => 'user_id is required'
            ], 400);
        }

        // Find course
        $course = collect($this->data['courses'])->firstWhere('slug', $courseSlug);
        
        if (!$course) {
            return response()->json([
                'success' => false,
                'message' => 'Course not found'
            ], 404);
        }

        // Get all videos for this course
        $courseVideos = collect($this->data['videos'])
            ->where('course_id', $course['id'])
            ->sortBy('order')
            ->values();

        // Get progress for each video
        $progressMap = collect($this->data['video_progress'])
            ->where('user_id', (int)$userId)
            ->keyBy('video_id');

        $videosWithProgress = $courseVideos->map(function ($video) use ($progressMap) {
            $progress = $progressMap->get($video['id']);
            return array_merge($video, [
                'progress' => $progress ?? [
                    'watched_seconds' => 0,
                    'last_position' => 0,
                    'completion_percentage' => 0,
                    'completed_at' => null,
                ]
            ]);
        });

        // Calculate overall course progress
        $totalVideos = $videosWithProgress->count();
        $completedVideos = $videosWithProgress->filter(fn($v) => ($v['progress']['completion_percentage'] ?? 0) >= 90)->count();
        $totalWatchTime = $videosWithProgress->sum(fn($v) => $v['progress']['watched_seconds'] ?? 0);
        $totalDuration = $videosWithProgress->sum('duration');

        return response()->json([
            'success' => true,
            'data' => [
                'course_id' => $course['id'],
                'course_slug' => $course['slug'],
                'videos' => $videosWithProgress->values()->all(),
                'summary' => [
                    'total_videos' => $totalVideos,
                    'completed_videos' => $completedVideos,
                    'completion_percentage' => $totalVideos > 0 ? round(($completedVideos / $totalVideos) * 100, 1) : 0,
                    'total_watch_time_seconds' => $totalWatchTime,
                    'total_duration_seconds' => $totalDuration,
                ]
            ]
        ]);
    }

    /**
     * Mark video as completed
     */
    public function markCompleted(Request $request, string $videoId): JsonResponse
    {
        $request->validate([
            'user_id' => 'required|integer',
        ]);

        $userId = $request->user_id;
        $videoIdInt = (int) $videoId;

        $progressIndex = collect($this->data['video_progress'])
            ->search(fn($p) => $p['user_id'] == $userId && $p['video_id'] == $videoIdInt);

        if ($progressIndex !== false) {
            $this->data['video_progress'][$progressIndex]['completion_percentage'] = 100;
            $this->data['video_progress'][$progressIndex]['completed_at'] = now()->toDateTimeString();
            $this->data['video_progress'][$progressIndex]['updated_at'] = now()->toDateTimeString();
        } else {
            // Find video to get duration
            $video = collect($this->data['videos'])->firstWhere('id', $videoIdInt);
            $duration = $video['duration'] ?? 0;
            
            $this->data['video_progress'][] = [
                'user_id' => $userId,
                'video_id' => $videoIdInt,
                'watched_seconds' => $duration,
                'last_position' => $duration,
                'completion_percentage' => 100,
                'completed_at' => now()->toDateTimeString(),
                'created_at' => now()->toDateTimeString(),
                'updated_at' => now()->toDateTimeString(),
            ];
        }

        $this->saveData();

        return response()->json([
            'success' => true,
            'message' => 'Video marked as completed'
        ]);
    }
}