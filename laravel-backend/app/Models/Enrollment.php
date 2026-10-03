<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    protected $fillable = [
        'student_id',
        'course_id',
        'progress_percentage',
        'completed_lessons',
        'current_lesson_id',
        'drm_session_token',
        'enrolled_at',
        'last_accessed_at',
        'status',
    ];

    protected $casts = [
        'completed_lessons' => 'array',
        'progress_percentage' => 'integer',
        'enrolled_at' => 'date',
        'last_accessed_at' => 'datetime',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }

    public function course()
    {
        return $this->belongsTo(Course::class);
    }
}
