<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Builder;

class Offer extends Model
{
    use HasFactory;

    const TYPE_STAGE = 'stage';
    const TYPE_EMPLOI = 'emploi';
    const TYPE_ALTERNANCE = 'alternance';

    const STATUS_DRAFT = 'draft';
    const STATUS_ACTIVE = 'active';
    const STATUS_EXPIRED = 'expired';
    const STATUS_CLOSED = 'closed';

    protected $fillable = [
        'company_id',
        'title',
        'description',
        'type',
        'status',
        'duration',
        'location',
        'city',
        'country',
        'is_remote',
        'salary_min',
        'salary_max',
        'salary_currency',
        'salary_period',
        'required_skills',
        'education_level',
        'experience_years',
        'start_date',
        'application_deadline',
        'positions_available',
        'published_at',
        'expired_at',
    ];

    protected function casts(): array
    {
        return [
            'is_remote' => 'boolean',
            'salary_min' => 'decimal:2',
            'salary_max' => 'decimal:2',
            'required_skills' => 'array',
            'experience_years' => 'integer',
            'positions_available' => 'integer',
            'start_date' => 'date',
            'application_deadline' => 'date',
            'published_at' => 'datetime',
            'expired_at' => 'datetime',
        ];
    }

    /**
     * Get the company that owns the offer.
     */
    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }

    /**
     * Get all applications for this offer.
     */
    public function applications(): HasMany
    {
        return $this->hasMany(Application::class);
    }

    /**
     * Publish the offer.
     */
    public function publish(): void
    {
        $this->update([
            'status' => self::STATUS_ACTIVE,
            'published_at' => now(),
        ]);
    }

    /**
     * Close the offer.
     */
    public function close(): void
    {
        $this->update(['status' => self::STATUS_CLOSED]);
    }

    /**
     * Expire the offer.
     */
    public function expire(): void
    {
        $this->update([
            'status' => self::STATUS_EXPIRED,
            'expired_at' => now(),
        ]);
    }

    /**
     * Check if offer is active.
     */
    public function isActive(): bool
    {
        return $this->status === self::STATUS_ACTIVE;
    }

    /**
     * Check if offer is accepting applications.
     */
    public function isAcceptingApplications(): bool
    {
        if (!$this->isActive()) {
            return false;
        }

        if ($this->application_deadline && $this->application_deadline->isPast()) {
            return false;
        }

        return true;
    }

    /**
     * Scope to filter active offers only.
     */
    public function scopeActive(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_ACTIVE);
    }

    /**
     * Scope to filter by type.
     */
    public function scopeOfType(Builder $query, string $type): Builder
    {
        return $query->where('type', $type);
    }

    /**
     * Scope to filter by city.
     */
    public function scopeInCity(Builder $query, string $city): Builder
    {
        return $query->where('city', $city);
    }

    /**
     * Scope to filter remote offers.
     */
    public function scopeRemote(Builder $query): Builder
    {
        return $query->where('is_remote', true);
    }

    /**
     * Scope to search offers by keyword.
     */
    public function scopeSearch(Builder $query, string $keyword): Builder
    {
        return $query->where(function ($q) use ($keyword) {
            $q->where('title', 'like', "%{$keyword}%")
              ->orWhere('description', 'like', "%{$keyword}%");
        });
    }

    /**
     * Scope to filter by company.
     */
    public function scopeByCompany(Builder $query, int $companyId): Builder
    {
        return $query->where('company_id', $companyId);
    }

    /**
     * Get formatted salary range.
     */
    public function getSalaryRangeAttribute(): ?string
    {
        if (!$this->salary_min && !$this->salary_max) {
            return null;
        }

        $currency = $this->salary_currency ?? 'EUR';
        $period = $this->salary_period ? "/{$this->salary_period}" : '';

        if ($this->salary_min && $this->salary_max) {
            return "{$this->salary_min} - {$this->salary_max} {$currency}{$period}";
        }

        if ($this->salary_min) {
            return "From {$this->salary_min} {$currency}{$period}";
        }

        return "Up to {$this->salary_max} {$currency}{$period}";
    }
}
