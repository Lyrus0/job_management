<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Company extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'company_name',
        'domain',
        'description',
        'address',
        'city',
        'country',
        'postal_code',
        'website',
        'phone',
        'logo_path',
        'representative_name',
        'representative_position',
        'company_size',
        'founded_year',
    ];

    protected function casts(): array
    {
        return [
            'company_size' => 'integer',
            'founded_year' => 'integer',
        ];
    }

    /**
     * Get the user that owns the company profile.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get all offers published by this company.
     */
    public function offers(): HasMany
    {
        return $this->hasMany(Offer::class);
    }

    /**
     * Get active offers for this company.
     */
    public function activeOffers(): HasMany
    {
        return $this->offers()->where('status', 'active');
    }

    /**
     * Scope to filter by domain.
     */
    public function scopeDomain($query, string $domain)
    {
        return $query->where('domain', $domain);
    }

    /**
     * Scope to filter by city.
     */
    public function scopeCity($query, string $city)
    {
        return $query->where('city', $city);
    }
}
