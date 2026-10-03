<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

class CourseVideoController extends Controller
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
        
        if (!isset($this->data['videos'])) {
            $this->data['videos'] = [];
        }
        if (!isset($this->data['video_progress'])) {
            $this->data['video_progress'] = [];
        }
    }

    private function saveData(): void
    {
        File::put($this->storagePath, json_encode($this->data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    }

    private function generateVideoId(): int
    {
        $maxId = 0;
        foreach ($this->data['videos'] as $video) {
            if (isset($video['id']) && $video['id'] > $maxId) {
                $maxId = $video['id'];
            }
        }
        return $maxId + 1;
    }

    /**
     * List videos for a course
     */
    public function index(Request $request, string $courseSlug): JsonResponse
    {
        $course = collect($this->data['courses'])->firstWhere('slug', $courseSlug);
        
        if (!$course) {
            return response()->json([
                'success' => false,
                'message' => 'Course not found'
            ], 404);
        }

        $videos = collect($this->data['videos'])
            ->where('course_id', $course['id'])
            ->sortBy('order')
            ->values()
            ->all();

        return response()->json([
            'success' => true,
            'data' => $videos
        ]);
    }

    /**
     * Store a new video
     */
    public function store(Request $request, string $courseSlug): JsonResponse
    {
        $course = collect($this->data['courses'])->firstWhere('slug', $courseSlug);
        
        if (!$course) {
            return response()->json([
                'success' => false,
                'message' => 'Course not found'
            ], 404);
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration' => 'nullable|integer|min:0',
            'order' => 'nullable|integer|min:0',
            'is_free' => 'boolean',
            'video_type' => 'in:local,external',
            'external_url' => 'nullable|url',
        ]);

        $videoData = $request->all();
        $videoData['course_id'] = $course['id'];
        $videoData['id'] = $this->generateVideoId();
        $videoData['slug'] = Str::slug($videoData['title']) . '-' . $videoData['id'];
        $videoData['status'] = 'published';
        $videoData['video_type'] = $videoData['video_type'] ?? 'local';
        $videoData['file_path'] = $videoData['file_path'] ?? null;
        $videoData['thumbnail_path'] = $videoData['thumbnail_path'] ?? null;
        $videoData['created_at'] = now()->toDateTimeString();
        $videoData['updated_at'] = now()->toDateTimeString();

        $this->data['videos'][] = $videoData;
        $this->saveData();

        return response()->json([
            'success' => true,
            'message' => 'Video created successfully',
            'data' => $videoData
        ], 201);
    }

    /**
     * Upload video file
     */
    public function upload(Request $request, string $courseSlug): JsonResponse
    {
        $course = collect($this->data['courses'])->firstWhere('slug', $courseSlug);
        
        if (!$course) {
            return response()->json([
                'success' => false,
                'message' => 'Course not found'
            ], 404);
        }

        $request->validate([
            'video' => 'required|file|mimes:mp4,webm,mov,avi|max:2048000', // 2GB max
            'thumbnail' => 'nullable|image|mimes:jpg,jpeg,png|max:5120', // 5MB max
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'duration' => 'nullable|integer|min:0',
            'order' => 'nullable|integer|min:0',
            'is_free' => 'boolean',
        ]);

        // Store video file
        $videoFile = $request->file('video');
        $videoFileName = Str::uuid() . '.' . $videoFile->getClientOriginalExtension();
        $videoPath = $videoFile->storeAs('videos', $videoFileName, 'public');

        // Store thumbnail if provided
        $thumbnailPath = null;
        if ($request->hasFile('thumbnail')) {
            $thumbFile = $request->file('thumbnail');
            $thumbFileName = Str::uuid() . '.' . $thumbFile->getClientOriginalExtension();
            $thumbnailPath = $thumbFile->storeAs('videos/thumbnails', $thumbFileName, 'public');
        }

        $videoData = [
            'course_id' => $course['id'],
            'title' => $request->title,
            'slug' => Str::slug($request->title) . '-' . $this->generateVideoId(),
            'description' => $request->description,
            'file_path' => $videoPath,
            'thumbnail_path' => $thumbnailPath,
            'duration' => $request->duration ?? 0,
            'order' => $request->order ?? (count(array_filter($this->data['videos'], fn($v) => $v['course_id'] == $course['id'])) + 1),
            'is_free' => $request->boolean('is_free', false),
            'video_type' => 'local',
            'status' => 'published',
            'external_url' => null,
            'created_at' => now()->toDateTimeString(),
            'updated_at' => now()->toDateTimeString(),
        ];

        $videoData['id'] = $this->generateVideoId();
        $this->data['videos'][] = $videoData;
        $this->saveData();

        return response()->json([
            'success' => true,
            'message' => 'Video uploaded successfully',
            'data' => $videoData
        ], 201);
    }

    /**
     * Show a specific video
     */
    public function show(string $courseSlug, string $videoId): JsonResponse
    {
        $course = collect($this->data['courses'])->firstWhere('slug', $courseSlug);
        
        if (!$course) {
            return response()->json([
                'success' => false,
                'message' => 'Course not found'
            ], 404);
        }

        $video = collect($this->data['videos'])
            ->where('course_id', $course['id'])
            ->firstWhere('id', (int)$videoId);

        if (!$video) {
            return response()->json([
                'success' => false,
                'message' => 'Video not found'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $video
        ]);
    }

    /**
     * Update video metadata
     */
    public function update(Request $request, string $courseSlug, string $videoId): JsonResponse
    {
        $course = collect($this->data['courses'])->firstWhere('slug', $courseSlug);
        
        if (!$course) {
            return response()->json([
                'success' => false,
                'message' => 'Course not found'
            ], 404);
        }

        $videoIndex = collect($this->data['videos'])
            ->where('course_id', $course['id'])
            ->search(fn($v) => $v['id'] == $videoId);

        if ($videoIndex === false) {
            return response()->json([
                'success' => false,
                'message' => 'Video not found'
            ], 404);
        }

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'duration' => 'sometimes|integer|min:0',
            'order' => 'sometimes|integer|min:0',
            'is_free' => 'boolean',
            'status' => 'sometimes|in:draft,published,archived',
        ]);

        $this->data['videos'][$videoIndex] = array_merge(
            $this->data['videos'][$videoIndex],
            $request->only(['title', 'description', 'duration', 'order', 'is_free', 'status']),
            ['updated_at' => now()->toDateTimeString()]
        );

        if ($request->has('title')) {
            $this->data['videos'][$videoIndex]['slug'] = Str::slug($request->title) . '-' . $videoId;
        }

        $this->saveData();

        return response()->json([
            'success' => true,
            'message' => 'Video updated successfully',
            'data' => $this->data['videos'][$videoIndex]
        ]);
    }

    /**
     * Delete a video
     */
    public function destroy(string $courseSlug, string $videoId): JsonResponse
    {
        $course = collect($this->data['courses'])->firstWhere('slug', $courseSlug);
        
        if (!$course) {
            return response()->json([
                'success' => false,
                'message' => 'Course not found'
            ], 404);
        }

        $videoIndex = collect($this->data['videos'])
            ->where('course_id', $course['id'])
            ->search(fn($v) => $v['id'] == $videoId);

        if ($videoIndex === false) {
            return response()->json([
                'success' => false,
                'message' => 'Video not found'
            ], 404);
        }

        $video = $this->data['videos'][$videoIndex];

        // Delete physical files
        if ($video['file_path'] && Storage::disk('public')->exists($video['file_path'])) {
            Storage::disk('public')->delete($video['file_path']);
        }
        if ($video['thumbnail_path'] && Storage::disk('public')->exists($video['thumbnail_path'])) {
            Storage::disk('public')->delete($video['thumbnail_path']);
        }

        // Remove video and related progress
        unset($this->data['videos'][$videoIndex]);
        $this->data['videos'] = array_values($this->data['videos']);
        
        // Remove progress records for this video
        $this->data['video_progress'] = array_filter(
            $this->data['video_progress'],
            fn($p) => $p['video_id'] != $videoId
        );
        $this->data['video_progress'] = array_values($this->data['video_progress']);

        $this->saveData();

        return response()->json([
            'success' => true,
            'message' => 'Video deleted successfully'
        ]);
    }

    /**
     * Reorder videos
     */
    public function reorder(Request $request, string $courseSlug): JsonResponse
    {
        $course = collect($this->data['courses'])->firstWhere('slug', $courseSlug);
        
        if (!$course) {
            return response()->json([
                'success' => false,
                'message' => 'Course not found'
            ], 404);
        }

        $request->validate([
            'video_ids' => 'required|array',
            'video_ids.*' => 'integer',
        ]);

        $videoIds = $request->video_ids;
        
        foreach ($videoIds as $index => $videoId) {
            $videoIndex = collect($this->data['videos'])
                ->where('course_id', $course['id'])
                ->search(fn($v) => $v['id'] == $videoId);
            
            if ($videoIndex !== false) {
                $this->data['videos'][$videoIndex]['order'] = $index + 1;
                $this->data['videos'][$videoIndex]['updated_at'] = now()->toDateTimeString();
            }
        }

        $this->saveData();

        return response()->json([
            'success' => true,
            'message' => 'Videos reordered successfully'
        ]);
    }

    /**
     * Admin: List all videos with pagination
     */
    public function adminIndex(Request $request): JsonResponse
    {
        $perPage = $request->get('per_page', 20);
        $page = $request->get('page', 1);
        $courseSlug = $request->get('course_slug');
        $status = $request->get('status');

        $videos = collect($this->data['videos']);

        if ($courseSlug) {
            $course = collect($this->data['courses'])->firstWhere('slug', $courseSlug);
            if ($course) {
                $videos = $videos->where('course_id', $course['id']);
            }
        }

        if ($status) {
            $videos = $videos->where('status', $status);
        }

        $videos = $videos->sortByDesc('created_at')->values();
        
        $total = $videos->count();
        $paginated = $videos->forPage($page, $perPage)->values();

        return response()->json([
            'success' => true,
            'data' => $paginated->all(),
            'pagination' => [
                'current_page' => $page,
                'per_page' => $perPage,
                'total' => $total,
                'last_page' => ceil($total / $perPage),
            ]
        ]);
    }
}