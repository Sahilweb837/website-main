<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $fillable = [
        'category_id',
        'title',
        'slug',
        'duration',
        'level',
        'overview',
        'fee',
        'price',
        'original_price',
        'image',
        'instructor',
        'instructor_avatar',
        'tagline',
        'hours',
        'icon',
        'rating',
        'reviews_count',
        'badge',
        'syllabus',
        'highlights',
        'tags',
        'is_active',
    ];

    protected $casts = [
        'price' => 'float',
        'original_price' => 'float',
        'fee' => 'float',
        'syllabus' => 'array',
        'highlights' => 'array',
        'tags' => 'array',
        'rating' => 'float',
        'reviews_count' => 'integer',
        'is_active' => 'boolean',
    ];

    /**
     * Synchronize price and fee
     */
    public function getEffectivePriceAttribute()
    {
        return $this->price ?? $this->fee ?? 0;
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class);
    }

    public function videos()
    {
        return $this->hasMany(Video::class)->ordered();
    }

    public function publishedVideos()
    {
        return $this->hasMany(Video::class)->published()->ordered();
    }
}
