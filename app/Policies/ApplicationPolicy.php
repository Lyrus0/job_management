<?php

namespace App\Policies;

use App\Models\Application;
use App\Models\User;

class ApplicationPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return true; // Permission checking happens at the controller level
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Application $application): bool
    {
        // Students can only view their own applications
        if ($user->isStudent()) {
            return $user->student?->id === $application->student_id;
        }

        // Companies can view applications for their offers
        if ($user->isCompany()) {
            return $user->company?->id === $application->offer->company_id;
        }

        // Admins can view all applications
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can create models (apply to offers).
     */
    public function create(User $user): bool
    {
        return $user->isStudent();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Application $application): bool
    {
        // Students can only update their own pending applications
        if ($user->isStudent()) {
            return $user->student?->id === $application->student_id && $application->isPending();
        }

        // Companies can update applications for their offers (to add notes)
        if ($user->isCompany()) {
            return $user->company?->id === $application->offer->company_id;
        }

        // Admins can update any application
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Application $application): bool
    {
        // Only admins can delete applications
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can withdraw the application.
     */
    public function withdraw(User $user, Application $application): bool
    {
        // Only the student who applied can withdraw, and only if pending
        return $user->isStudent()
            && $user->student?->id === $application->student_id
            && $application->canBeWithdrawn();
    }

    /**
     * Determine whether the user can change the application status.
     */
    public function updateStatus(User $user, Application $application): bool
    {
        // Companies can update status for applications on their offers
        if ($user->isCompany()) {
            return $user->company?->id === $application->offer->company_id;
        }

        // Admins can update any application status
        return $user->isAdmin();
    }
}
