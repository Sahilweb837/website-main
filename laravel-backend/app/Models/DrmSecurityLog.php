<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DrmSecurityLog extends Model
{
    public $timestamps = false;
    protected $table = 'drm_security_logs';

    protected $fillable = [
        'student_id',
        'event_type',
        'ip_address',
        'user_agent',
        'event_payload',
    ];

    protected $casts = [
        'event_payload' => 'array',
        'triggered_at' => 'datetime',
    ];

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}
