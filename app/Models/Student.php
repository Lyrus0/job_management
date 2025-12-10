<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'filiere',
        'niveau',
        'cv_path',
        'competencies',
        'bio',
        'phone',
        'linkedin_url',
        'github_url',
        'portfolio_url',
    ];

    protected function casts(): array
    {
        return [
            'competencies' => 'array',
        ];
    }

    /**
     * Get the user that owns the student profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all applications submitted by this student.
     */
    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }

    /**
     * Check if student has applied to a specific offer.
     */
    public function hasAppliedTo(Offer $offer): bool
    {
        return $this->applications()->where('offer_id', $offer->id)->exists();
    }

    /**
     * Get the application for a specific offer.
     */
    public function getApplicationFor(Offer $offer): ?Application
    {
        return $this->applications()->where('offer_id', $offer->id)->first();
    }

    /**
     * Scope to filter by filiere.
     */
    public function scopeFiliere($query, string $filiere)
    {
        return $query->where('filiere', $filiere);
    }

    /**
     * Scope to filter by niveau.
     */
    public function scopeNiveau($query, string $niveau)
    {
        return $query->where('niveau', $niveau);
    }
}
