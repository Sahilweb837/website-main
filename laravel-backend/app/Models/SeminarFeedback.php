<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SeminarFeedback extends Model
{
    public $timestamps = false;
    protected $table = 'seminar_feedbacks';

    protected $fillable = [
        'student_name',
        'contact_number',
        'email',
        'course',
        'semester',
        'heard_about',
        'overall_assessment',
        'seminar_length',
        'recommend',
        'team_experience',
        'session_interest',
        'suggestions',
        'interested_courses',
    ];

    protected $casts = [
        'interested_courses' => 'array',
        'created_at' => 'datetime',
    ];
}
