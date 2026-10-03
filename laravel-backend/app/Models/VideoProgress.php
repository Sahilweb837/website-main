<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class VideoProgress extends Model
{
    protected $fillable = [
        'user_id',
        'video_id',
        'watched_seconds',
        'completed_at',
        'last_position',
        'completion_percentage',
    ];

    protected $casts = [
        'watched_seconds' => 'integer',
        'last_position' => 'integer',
        'completion_percentage' => 'float',
        'completed_at' => 'datetime',
    ];

    public function video(): BelongsTo
    {
        return $this->belongsTo(Video::class);
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(Student::class, 'user_id');
    }

    public function markProgress(int $position, int $duration): void
    {
        $this->last_position = $position;
        $this->watched_seconds = max($this->watched_seconds, $position);
        $this->completion_percentage = min(100, ($this->watched_seconds / max($duration, 1)) * 100);
        
        if ($this->completion_percentage >= 90 && !$this->completed_at) {
            $this->completed_at = now();
        }
        
        $this->save();
    }

    public function isCompleted(): bool
    {
        return $this->completion_percentage >= 90 || $this->completed_at !== null;
    }
}