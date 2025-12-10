<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\CompanyProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\OfferController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StudentProfileController;
use App\Http\Controllers\Admin\OfferController as AdminOfferController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

/*
|--------------------------------------------------------------------------
| Authenticated Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // User Profile (Breeze default)
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // Offers (all authenticated users can view)
    Route::get('/offers', [OfferController::class, 'index'])->name('offers.index');
    Route::get('/offers/{offer}', [OfferController::class, 'show'])->name('offers.show');
});

/*
|--------------------------------------------------------------------------
| Student Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified', 'role:student'])->group(function () {
    // Student Profile
    Route::get('/student/profile/create', [StudentProfileController::class, 'create'])->name('student.profile.create');
    Route::post('/student/profile', [StudentProfileController::class, 'store'])->name('student.profile.store');
    Route::get('/student/profile', [StudentProfileController::class, 'show'])->name('student.profile.show');
    Route::get('/student/profile/edit', [StudentProfileController::class, 'edit'])->name('student.profile.edit');
    Route::put('/student/profile', [StudentProfileController::class, 'update'])->name('student.profile.update');

    // Applications
    Route::get('/applications', [ApplicationController::class, 'index'])->name('applications.index');
    Route::post('/offers/{offer}/apply', [ApplicationController::class, 'store'])->name('applications.store');
    Route::get('/applications/{application}', [ApplicationController::class, 'show'])->name('applications.show');
    Route::post('/applications/{application}/withdraw', [ApplicationController::class, 'withdraw'])->name('applications.withdraw');
});

/*
|--------------------------------------------------------------------------
| Company Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified', 'role:company'])->group(function () {
    // Company Profile
    Route::get('/company/profile/create', [CompanyProfileController::class, 'create'])->name('company.profile.create');
    Route::post('/company/profile', [CompanyProfileController::class, 'store'])->name('company.profile.store');
    Route::get('/company/profile', [CompanyProfileController::class, 'show'])->name('company.profile.show');
    Route::get('/company/profile/edit', [CompanyProfileController::class, 'edit'])->name('company.profile.edit');
    Route::put('/company/profile', [CompanyProfileController::class, 'update'])->name('company.profile.update');

    // Offer Management
    Route::get('/offers/create', [OfferController::class, 'create'])->name('offers.create');
    Route::post('/offers', [OfferController::class, 'store'])->name('offers.store');
    Route::get('/offers/{offer}/edit', [OfferController::class, 'edit'])->name('offers.edit');
    Route::put('/offers/{offer}', [OfferController::class, 'update'])->name('offers.update');
    Route::delete('/offers/{offer}', [OfferController::class, 'destroy'])->name('offers.destroy');
    Route::post('/offers/{offer}/publish', [OfferController::class, 'publish'])->name('offers.publish');
    Route::post('/offers/{offer}/close', [OfferController::class, 'close'])->name('offers.close');

    // View Applications for Offers
    Route::get('/offers/{offer}/applications', [OfferController::class, 'applications'])->name('offers.applications');
    Route::patch('/applications/{application}/status', [ApplicationController::class, 'updateStatus'])->name('applications.updateStatus');
});

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->name('admin.')->group(function () {
    // User Management
    Route::get('/users', [AdminUserController::class, 'index'])->name('users.index');
    Route::get('/users/{user}', [AdminUserController::class, 'show'])->name('users.show');
    Route::get('/users/{user}/edit', [AdminUserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{user}', [AdminUserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [AdminUserController::class, 'destroy'])->name('users.destroy');
    Route::post('/users/{user}/toggle-active', [AdminUserController::class, 'toggleActive'])->name('users.toggleActive');
    Route::patch('/users/{user}/role', [AdminUserController::class, 'updateRole'])->name('users.updateRole');

    // Offer Management
    Route::get('/offers', [AdminOfferController::class, 'index'])->name('offers.index');
    Route::get('/offers/{offer}', [AdminOfferController::class, 'show'])->name('offers.show');
    Route::patch('/offers/{offer}/status', [AdminOfferController::class, 'updateStatus'])->name('offers.updateStatus');
    Route::delete('/offers/{offer}', [AdminOfferController::class, 'destroy'])->name('offers.destroy');
});

require __DIR__.'/auth.php';
