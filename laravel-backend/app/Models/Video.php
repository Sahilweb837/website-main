<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Video extends Model
{
    protected $fillable = [
        'course_id',
        'title',
        'slug',
        'description',
        'file_path',
        'thumbnail_path',
        'duration',
        'order',
        'is_free',
        'status',
        'video_type',
        'external_url',
    ];

    protected $casts = [
        'duration' => 'integer',
        'order' => 'integer',
        'is_free' => 'boolean',
    ];

    public function course(): BelongsTo
    {
        return $this->belongsTo(Course::class);
    }

    public function progress(): HasMany
    {
        return $this->hasMany(VideoProgress::class);
    }

    public function getVideoUrlAttribute(): string
    {
        if ($this->video_type === 'external' && $this->external_url) {
            return $this->external_url;
        }
        
        if ($this->file_path) {
            return asset('storage/' . $this->file_path);
        }
        
        return '';
    }

    public function getThumbnailUrlAttribute(): string
    {
        if ($this->thumbnail_path) {
            return asset('storage/' . $this->thumbnail_path);
        }
        
        return asset('images/video-placeholder.jpg');
    }

    public function getFormattedDurationAttribute(): string
    {
        $minutes = floor($this->duration / 60);
        $seconds = $this->duration % 60;
        
        if ($minutes > 0) {
            return sprintf('%d:%02d', $minutes, $seconds);
        }
        
        return sprintf('%d sec', $seconds);
    }

    public function scopePublished($query)
    {
        return $query->where('status', 'published');
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('created_at');
    }
}