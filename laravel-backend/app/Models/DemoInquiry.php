<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DemoInquiry extends Model
{
    public $timestamps = false;
    protected $table = 'demo_inquiries';

    protected $fillable = [
        'name',
        'email',
        'phone',
        'course_interested',
        'preferred_mode',
        'message',
        'status',
    ];

    protected $casts = [
        'created_at' => 'datetime',
    ];
}
