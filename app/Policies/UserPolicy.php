<?php

namespace App\Policies;

use App\Models\User;

class UserPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, User $model): bool
    {
        // Users can view their own profile
        if ($user->id === $model->id) {
            return true;
        }

        // Admins can view all users
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $model): bool
    {
        // Users can update their own profile
        if ($user->id === $model->id) {
            return true;
        }

        // Admins can update any user
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, User $model): bool
    {
        // Users cannot delete themselves
        if ($user->id === $model->id) {
            return false;
        }

        // Only admins can delete users
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can deactivate the model.
     */
    public function deactivate(User $user, User $model): bool
    {
        // Users cannot deactivate themselves
        if ($user->id === $model->id) {
            return false;
        }

        // Only admins can deactivate users
        return $user->isAdmin();
    }

    /**
     * Determine whether the user can change the role of the model.
     */
    public function changeRole(User $user, User $model): bool
    {
        // Users cannot change their own role
        if ($user->id === $model->id) {
            return false;
        }

        // Only admins can change roles
        return $user->isAdmin();
    }
}
