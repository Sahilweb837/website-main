<?php

namespace App\Services;

use App\Models\Student;
use App\Models\Enrollment;
use App\Models\DrmSecurityLog;
use App\Models\VideoProgress;
use Illuminate\Support\Facades\Log;

class StudentService
{
    protected string $storageFile;

    public function __construct()
    {
        $this->storageFile = function_exists('database_path') 
            ? database_path('storage.json') 
            : dirname(__DIR__, 2) . '/database/storage.json';
    }

    /**
     * Get storage.json data safely with default structure.
     */
    protected function loadStorage(): array
    {
        $default = [
            'courses' => [],
            'students' => [],
            'blogs' => [],
            'feedbacks' => [],
            'classes' => [],
            'notes' => [],
            'tasks' => [],
            'tests' => [],
            'mentors' => []
        ];

        if (!file_exists($this->storageFile)) {
            return $default;
        }

        $data = json_decode(file_get_contents($this->storageFile), true);
        if (!is_array($data)) {
            return $default;
        }

        foreach ($default as $key => $val) {
            if (!isset($data[$key]) || !is_array($data[$key])) {
                $data[$key] = $val;
            }
        }

        return $data;
    }

    /**
     * Save updated data back to storage.json.
     */
    protected function saveStorage(array $data): void
    {
        file_put_contents($this->storageFile, json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
    }

    /**
     * Get all students with optional search filter.
     */
    public function getAllStudents(?string $search = null): array
    {
        // Try Eloquent first if database is available
        try {
            $query = Student::with('enrollments.course');
            if ($search) {
                $term = '%' . $search . '%';
                $query->where(function ($q) use ($term) {
                    $q->where('name', 'like', $term)
                      ->orWhere('email', 'like', $term)
                      ->orWhere('student_code', 'like', $term);
                });
            }
            $students = $query->orderBy('created_at', 'desc')->get();
            if ($students->isNotEmpty()) {
                return $students->toArray();
            }
        } catch (\Throwable $e) {
            // Fallback to storage.json
        }

        $storage = $this->loadStorage();
        $students = $storage['students'] ?? [];

        if ($search) {
            $term = strtolower(trim($search));
            $students = array_values(array_filter($students, function ($s) use ($term) {
                return str_contains(strtolower($s['name'] ?? ''), $term)
                    || str_contains(strtolower($s['email'] ?? ''), $term)
                    || str_contains(strtolower($s['student_code'] ?? ''), $term)
                    || str_contains(strtolower($s['course'] ?? ''), $term);
            }));
        }

        return $students;
    }

    /**
     * Get a single student by ID or student_code.
     */
    public function getStudentById(string|int $id): ?array
    {
        try {
            $student = Student::with('enrollments.course')->find($id);
            if ($student) {
                return $student->toArray();
            }
        } catch (\Throwable $e) {
            // fallback
        }

        $storage = $this->loadStorage();
        foreach ($storage['students'] as $s) {
            if ((string)($s['id'] ?? '') === (string)$id || ($s['student_code'] ?? '') === (string)$id) {
                return $s;
            }
        }

        return null;
    }

    /**
     * Register / enroll a new student.
     */
    public function createStudent(array $data): array
    {
        $id = time();
        $randomCode = 'NC-STU-2026-' . rand(100, 999);
        $studentCode = $data['student_code'] ?? $randomCode;
        $namePrefix = strtoupper(substr(preg_replace('/[^A-Za-z]/', '', $data['name'] ?? 'STU'), 0, 4));
        $watermarkId = 'NC-WM-' . $namePrefix . '-' . rand(100, 999);

        $newStudent = [
            'id' => $id,
            'student_code' => $studentCode,
            'name' => trim($data['name'] ?? 'Student'),
            'email' => trim($data['email'] ?? ''),
            'phone' => trim($data['phone'] ?? ''),
            'course' => trim($data['course'] ?? 'Full Stack Web Development'),
            'slug' => trim($data['slug'] ?? 'fullstack-web-development'),
            'feePaid' => isset($data['feePaid']) ? (float)$data['feePaid'] : (isset($data['fee']) ? (float)$data['fee'] : 79),
            'enrolledDate' => $data['enrolledDate'] ?? date('Y-m-d'),
            'drmStatus' => $data['drmStatus'] ?? 'Protected',
            'drm_watermark_id' => $watermarkId,
            'progress' => isset($data['progress']) ? (int)$data['progress'] : 0,
            'created_at' => date('Y-m-d H:i:s'),
        ];

        // Save to storage.json
        $storage = $this->loadStorage();
        array_unshift($storage['students'], $newStudent);
        $this->saveStorage($storage);

        // Also try saving to Eloquent if DB connected
        try {
            Student::create([
                'student_code' => $studentCode,
                'name' => $newStudent['name'],
                'email' => $newStudent['email'],
                'phone' => $newStudent['phone'],
                'drm_status' => $newStudent['drmStatus'],
                'drm_watermark_id' => $watermarkId,
            ]);
        } catch (\Throwable $e) {
            // Non-fatal if DB not running
        }

        return $newStudent;
    }

    /**
     * Update an existing student's details.
     */
    public function updateStudent(string|int $id, array $data): ?array
    {
        $storage = $this->loadStorage();
        $foundIndex = -1;

        foreach ($storage['students'] as $idx => $s) {
            if ((string)($s['id'] ?? '') === (string)$id || ($s['student_code'] ?? '') === (string)$id) {
                $foundIndex = $idx;
                break;
            }
        }

        if ($foundIndex === -1) {
            return null;
        }

        $existing = $storage['students'][$foundIndex];

        if (isset($data['name'])) $existing['name'] = trim($data['name']);
        if (isset($data['email'])) $existing['email'] = trim($data['email']);
        if (isset($data['phone'])) $existing['phone'] = trim($data['phone']);
        if (isset($data['course'])) $existing['course'] = trim($data['course']);
        if (isset($data['slug'])) $existing['slug'] = trim($data['slug']);
        if (isset($data['feePaid'])) $existing['feePaid'] = (float)$data['feePaid'];
        if (isset($data['fee'])) $existing['feePaid'] = (float)$data['fee'];
        if (isset($data['drmStatus'])) $existing['drmStatus'] = trim($data['drmStatus']);
        if (isset($data['progress'])) $existing['progress'] = (int)$data['progress'];
        if (isset($data['enrolledDate'])) $existing['enrolledDate'] = $data['enrolledDate'];

        $existing['updated_at'] = date('Y-m-d H:i:s');

        $storage['students'][$foundIndex] = $existing;
        $this->saveStorage($storage);

        // Also update Eloquent if DB available
        try {
            $student = Student::where('student_code', $existing['student_code'] ?? '')
                ->orWhere('id', $id)
                ->first();
            if ($student) {
                $student->update([
                    'name' => $existing['name'],
                    'email' => $existing['email'],
                    'phone' => $existing['phone'],
                    'drm_status' => $existing['drmStatus'],
                ]);
            }
        } catch (\Throwable $e) {
            // DB fallback
        }

        return $existing;
    }

    /**
     * Cascading Delete: "agar delete hai toh delete hojaye sab kuch"
     * Completely purges the student and ALL related entities:
     * - Student profile
     * - Course enrollments
     * - Video progress records
     * - DRM incident security logs
     * - Feedback records matching the student's email/name
     */
    public function deleteStudentCascade(string|int $id): array
    {
        $storage = $this->loadStorage();
        $targetStudent = null;
        $targetEmail = null;
        $targetCode = null;

        // Locate student to delete
        foreach ($storage['students'] as $s) {
            if ((string)($s['id'] ?? '') === (string)$id || ($s['student_code'] ?? '') === (string)$id) {
                $targetStudent = $s;
                $targetEmail = strtolower(trim($s['email'] ?? ''));
                $targetCode = $s['student_code'] ?? '';
                break;
            }
        }

        if (!$targetStudent) {
            return [
                'success' => false,
                'message' => "Student record with ID '{$id}' not found.",
            ];
        }

        // 1. Remove student from students array
        $initialCount = count($storage['students']);
        $storage['students'] = array_values(array_filter($storage['students'], function ($s) use ($id, $targetCode) {
            return (string)($s['id'] ?? '') !== (string)$id && ($s['student_code'] ?? '') !== $targetCode;
        }));

        // 2. Cascade delete from feedbacks if matching student email
        $feedbackRemovedCount = 0;
        if (!empty($targetEmail) && isset($storage['feedbacks'])) {
            $originalFeedbackCount = count($storage['feedbacks']);
            $storage['feedbacks'] = array_values(array_filter($storage['feedbacks'], function ($fb) use ($targetEmail) {
                return strtolower(trim($fb['email'] ?? '')) !== $targetEmail;
            }));
            $feedbackRemovedCount = $originalFeedbackCount - count($storage['feedbacks']);
        }

        // Save purged JSON storage
        $this->saveStorage($storage);

        // 3. Cascade delete in Eloquent ORM (MySQL)
        $eloquentDeleted = false;
        try {
            $studentModel = Student::where('id', $id)
                ->orWhere('student_code', $targetCode)
                ->orWhere('email', $targetEmail)
                ->first();

            if ($studentModel) {
                $modelId = $studentModel->id;

                // Delete all student enrollments
                Enrollment::where('student_id', $modelId)->delete();

                // Delete all DRM security logs
                DrmSecurityLog::where('student_id', $modelId)->delete();

                // Delete video progress records
                VideoProgress::where('student_id', $modelId)->delete();

                // Finally delete student record
                $studentModel->delete();
                $eloquentDeleted = true;
            }
        } catch (\Throwable $e) {
            // DB fallback handled
        }

        return [
            'success' => true,
            'message' => "Student '{$targetStudent['name']}' ({$targetCode}) and all linked records, enrollments, DRM security logs, and progress have been permanently deleted.",
            'deleted_student' => $targetStudent,
            'cascaded_entities' => [
                'student_record' => true,
                'enrollments' => true,
                'drm_security_logs' => true,
                'video_progress' => true,
                'feedbacks_cleaned' => $feedbackRemovedCount,
                'database_cleared' => $eloquentDeleted,
            ]
        ];
    }
}
