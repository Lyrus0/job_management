<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Builder;

class Application extends Model
{
    use HasFactory;

    const STATUS_PENDING = 'pending';
    const STATUS_ACCEPTED = 'accepted';
    const STATUS_REJECTED = 'rejected';
    const STATUS_WITHDRAWN = 'withdrawn';

    protected $fillable = [
        'student_id',
        'offer_id',
        'status',
        'cover_letter',
        'cv_path',
        'company_notes',
        'reviewed_at',
        'reviewed_by',
    ];

    protected function casts(): array
    {
        return [
            'reviewed_at' => 'datetime',
        ];
    }

    /**
     * Get the student who submitted the application.
     */
    public function student(): BelongsTo
    {
        return $this->belongsTo(Student::class);
    }

    /**
     * Get the offer this application is for.
     */
    public function offer(): BelongsTo
    {
        return $this->belongsTo(Offer::class);
    }

    /**
     * Get the user who reviewed this application.
     */
    public function reviewer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'reviewed_by');
    }

    /**
     * Accept the application.
     */
    public function accept(User $reviewer): void
    {
        $this->update([
            'status' => self::STATUS_ACCEPTED,
            'reviewed_at' => now(),
            'reviewed_by' => $reviewer->id,
        ]);
    }

    /**
     * Reject the application.
     */
    public function reject(User $reviewer): void
    {
        $this->update([
            'status' => self::STATUS_REJECTED,
            'reviewed_at' => now(),
            'reviewed_by' => $reviewer->id,
        ]);
    }

    /**
     * Withdraw the application.
     */
    public function withdraw(): void
    {
        $this->update(['status' => self::STATUS_WITHDRAWN]);
    }

    /**
     * Check if application is pending.
     */
    public function isPending(): bool
    {
        return $this->status === self::STATUS_PENDING;
    }

    /**
     * Check if application is accepted.
     */
    public function isAccepted(): bool
    {
        return $this->status === self::STATUS_ACCEPTED;
    }

    /**
     * Check if application is rejected.
     */
    public function isRejected(): bool
    {
        return $this->status === self::STATUS_REJECTED;
    }

    /**
     * Check if application is withdrawn.
     */
    public function isWithdrawn(): bool
    {
        return $this->status === self::STATUS_WITHDRAWN;
    }

    /**
     * Check if application can be withdrawn.
     */
    public function canBeWithdrawn(): bool
    {
        return $this->isPending();
    }

    /**
     * Scope to filter pending applications.
     */
    public function scopePending(Builder $query): Builder
    {
        return $query->where('status', self::STATUS_PENDING);
    }

    /**
     * Scope to filter by status.
     */
    public function scopeStatus(Builder $query, string $status): Builder
    {
        return $query->where('status', $status);
    }

    /**
     * Scope to filter by offer.
     */
    public function scopeForOffer(Builder $query, int $offerId): Builder
    {
        return $query->where('offer_id', $offerId);
    }

    /**
     * Scope to filter by student.
     */
    public function scopeByStudent(Builder $query, int $studentId): Builder
    {
        return $query->where('student_id', $studentId);
    }
}
