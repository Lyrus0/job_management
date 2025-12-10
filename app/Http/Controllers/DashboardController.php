<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Offer;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard based on user role.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        return match ($user->role) {
            'admin' => $this->adminDashboard(),
            'company' => $this->companyDashboard($user),
            'student' => $this->studentDashboard($user),
            default => $this->studentDashboard($user),
        };
    }

    /**
     * Admin dashboard with system statistics.
     */
    private function adminDashboard(): Response
    {
        $stats = [
            'total_users' => User::count(),
            'active_users' => User::active()->count(),
            'students' => User::role('student')->count(),
            'companies' => User::role('company')->count(),
            'total_offers' => Offer::count(),
            'active_offers' => Offer::active()->count(),
            'total_applications' => Application::count(),
            'pending_applications' => Application::pending()->count(),
        ];

        $recentUsers = User::latest()->take(5)->get();
        $recentOffers = Offer::with('company')->latest()->take(5)->get();

        return Inertia::render('Dashboard/Admin', [
            'stats' => $stats,
            'recentUsers' => $recentUsers,
            'recentOffers' => $recentOffers,
        ]);
    }

    /**
     * Company dashboard with their offers and applications.
     */
    private function companyDashboard(User $user): Response
    {
        $company = $user->company;

        if (!$company) {
            return Inertia::render('Dashboard/CompanySetup');
        }

        $stats = [
            'total_offers' => $company->offers()->count(),
            'active_offers' => $company->activeOffers()->count(),
            'total_applications' => Application::whereHas('offer', function ($q) use ($company) {
                $q->where('company_id', $company->id);
            })->count(),
            'pending_applications' => Application::whereHas('offer', function ($q) use ($company) {
                $q->where('company_id', $company->id);
            })->pending()->count(),
        ];

        $recentApplications = Application::whereHas('offer', function ($q) use ($company) {
            $q->where('company_id', $company->id);
        })->with(['student.user', 'offer'])->latest()->take(5)->get();

        $offers = $company->offers()->latest()->take(5)->get();

        return Inertia::render('Dashboard/Company', [
            'company' => $company,
            'stats' => $stats,
            'recentApplications' => $recentApplications,
            'offers' => $offers,
        ]);
    }

    /**
     * Student dashboard with their applications.
     */
    private function studentDashboard(User $user): Response
    {
        $student = $user->student;

        if (!$student) {
            return Inertia::render('Dashboard/StudentSetup');
        }

        $stats = [
            'total_applications' => $student->applications()->count(),
            'pending_applications' => $student->applications()->pending()->count(),
            'accepted_applications' => $student->applications()->where('status', 'accepted')->count(),
            'rejected_applications' => $student->applications()->where('status', 'rejected')->count(),
        ];

        $recentApplications = $student->applications()
            ->with('offer.company')
            ->latest()
            ->take(5)
            ->get();

        $recommendedOffers = Offer::active()
            ->with('company')
            ->whereNotIn('id', $student->applications()->pluck('offer_id'))
            ->latest('published_at')
            ->take(5)
            ->get();

        return Inertia::render('Dashboard/Student', [
            'student' => $student,
            'stats' => $stats,
            'recentApplications' => $recentApplications,
            'recommendedOffers' => $recommendedOffers,
        ]);
    }
}
