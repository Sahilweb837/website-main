<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Blog extends Model
{
    protected $fillable = [
        'title',
        'slug',
        'category',
        'excerpt',
        'content',
        'author',
        'read_time',
        'image',
        'tags',
        'views_count',
        'status',
        'published_at',
    ];

    protected $casts = [
        'tags' => 'array',
        'views_count' => 'integer',
        'published_at' => 'datetime',
    ];
}
