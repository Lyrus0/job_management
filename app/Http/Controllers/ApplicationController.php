<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Offer;
use App\Http\Requests\StoreApplicationRequest;
use App\Http\Requests\UpdateApplicationStatusRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ApplicationController extends Controller
{
    /**
     * Display a listing of the student's applications.
     */
    public function index(Request $request): Response
    {
        $user = $request->user();

        if ($user->isStudent()) {
            $applications = $user->student?->applications()
                ->with('offer.company')
                ->latest()
                ->paginate(15)
                ?? collect();
        } else {
            abort(403, 'Unauthorized');
        }

        return Inertia::render('Applications/Index', [
            'applications' => $applications,
        ]);
    }

    /**
     * Apply to an offer.
     */
    public function store(StoreApplicationRequest $request, Offer $offer)
    {
        Gate::authorize('create', Application::class);

        $student = $request->user()->student;

        if (!$student) {
            return back()->withErrors(['student' => 'You must complete your student profile first.']);
        }

        // Check if offer is accepting applications
        if (!$offer->isAcceptingApplications()) {
            return back()->withErrors(['offer' => 'This offer is no longer accepting applications.']);
        }

        // Check for duplicate application
        if ($student->hasAppliedTo($offer)) {
            return back()->withErrors(['offer' => 'You have already applied to this offer.']);
        }

        $application = Application::create([
            'student_id' => $student->id,
            'offer_id' => $offer->id,
            'cover_letter' => $request->cover_letter,
            'cv_path' => $request->cv_path,
            'status' => Application::STATUS_PENDING,
        ]);

        return redirect()->route('offers.show', $offer)
            ->with('success', 'Application submitted successfully.');
    }

    /**
     * Display the specified application.
     */
    public function show(Application $application): Response
    {
        Gate::authorize('view', $application);

        $application->load(['student.user', 'offer.company']);

        return Inertia::render('Applications/Show', [
            'application' => $application,
        ]);
    }

    /**
     * Withdraw an application.
     */
    public function withdraw(Application $application)
    {
        Gate::authorize('withdraw', $application);

        $application->withdraw();

        return redirect()->route('applications.index')
            ->with('success', 'Application withdrawn successfully.');
    }

    /**
     * Update the application status (accept/reject).
     */
    public function updateStatus(UpdateApplicationStatusRequest $request, Application $application)
    {
        Gate::authorize('updateStatus', $application);

        $status = $request->status;
        $reviewer = $request->user();

        if ($status === Application::STATUS_ACCEPTED) {
            $application->accept($reviewer);
            $message = 'Application accepted successfully.';
        } elseif ($status === Application::STATUS_REJECTED) {
            $application->reject($reviewer);
            $message = 'Application rejected successfully.';
        } else {
            return back()->withErrors(['status' => 'Invalid status.']);
        }

        // Update company notes if provided
        if ($request->filled('company_notes')) {
            $application->update(['company_notes' => $request->company_notes]);
        }

        return back()->with('success', $message);
    }
}
