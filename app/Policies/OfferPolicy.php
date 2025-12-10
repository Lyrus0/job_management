<?php

namespace App\Policies;

use App\Models\Offer;
use App\Models\User;

class OfferPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // All authenticated users can view offers
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Offer $offer): bool
    {
        // Students can only view active offers
        if ($user->isStudent()) {
            return $offer->isActive();
        }

        // Companies can view their own offers
        if ($user->isCompany()) {
            return $user->company?->id === $offer->company_id;
        }

        // Admins can view all offers
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->isCompany() || $user->isAdmin();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Offer $offer): bool
    {
        // Companies can only update their own offers
        if ($user->isCompany()) {
            return $user->company?->id === $offer->company_id;
        }

        // Admins can update any offer
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Offer $offer): bool
    {
        // Companies can only delete their own offers
        if ($user->isCompany()) {
            return $user->company?->id === $offer->company_id;
        }

        // Admins can delete any offer
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can publish the offer.
     */
    public function publish(User $user, Offer $offer): bool
    {
        // Only the owning company can publish their draft offers
        if ($user->isCompany()) {
            return $user->company?->id === $offer->company_id && $offer->status === 'draft';
        }

        // Admins can publish any draft offer
        return $user->isAdmin() && $offer->status === 'draft';
    }

    /**
     * Determine whether the user can close the offer.
     */
    public function close(User $user, Offer $offer): bool
    {
        // Only the owning company can close their active offers
        if ($user->isCompany()) {
            return $user->company?->id === $offer->company_id && $offer->isActive();
        }

        // Admins can close any active offer
        return $user->isAdmin() && $offer->isActive();
    }

    /**
     * Determine whether the user can view applications for this offer.
     */
    public function viewApplications(User $user, Offer $offer): bool
    {
        // Companies can view applications for their own offers
        if ($user->isCompany()) {
            return $user->company?->id === $offer->company_id;
        }

        // Admins can view all applications
        return $user->isAdmin();
    }
}
