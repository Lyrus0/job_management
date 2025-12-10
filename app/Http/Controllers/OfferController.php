<?php

namespace App\Http\Controllers;

use App\Models\Offer;
use App\Models\Company;
use App\Http\Requests\StoreOfferRequest;
use App\Http\Requests\UpdateOfferRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class OfferController extends Controller
{
    /**
     * Display a listing of the offers.
     */
    public function index(Request $request): Response
    {
        $query = Offer::with('company.user')
            ->when($request->user()->isStudent(), function ($q) {
                $q->active();
            })
            ->when($request->user()->isCompany(), function ($q) use ($request) {
                $q->where('company_id', $request->user()->company?->id);
            })
            ->when($request->filled('search'), function ($q) use ($request) {
                $q->search($request->search);
            })
            ->when($request->filled('type'), function ($q) use ($request) {
                $q->ofType($request->type);
            })
            ->when($request->filled('city'), function ($q) use ($request) {
                $q->inCity($request->city);
            })
            ->when($request->filled('remote'), function ($q) {
                $q->remote();
            })
            ->latest('published_at')
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Offers/Index', [
            'offers' => $query,
            'filters' => $request->only(['search', 'type', 'city', 'remote']),
        ]);
    }

    /**
     * Show the form for creating a new offer.
     */
    public function create(): Response
    {
        Gate::authorize('create', Offer::class);

        return Inertia::render('Offers/Create');
    }

    /**
     * Store a newly created offer in storage.
     */
    public function store(StoreOfferRequest $request)
    {
        Gate::authorize('create', Offer::class);

        $company = $request->user()->company;

        if (!$company) {
            return back()->withErrors(['company' => 'You must complete your company profile first.']);
        }

        $offer = $company->offers()->create($request->validated());

        return redirect()->route('offers.show', $offer)
            ->with('success', 'Offer created successfully.');
    }

    /**
     * Display the specified offer.
     */
    public function show(Offer $offer): Response
    {
        Gate::authorize('view', $offer);

        $offer->load('company.user');

        // Check if current user (student) has already applied
        $hasApplied = false;
        $application = null;

        if (auth()->user()->isStudent() && auth()->user()->student) {
            $application = auth()->user()->student->getApplicationFor($offer);
            $hasApplied = $application !== null;
        }

        return Inertia::render('Offers/Show', [
            'offer' => $offer,
            'hasApplied' => $hasApplied,
            'application' => $application,
        ]);
    }

    /**
     * Show the form for editing the specified offer.
     */
    public function edit(Offer $offer): Response
    {
        Gate::authorize('update', $offer);

        return Inertia::render('Offers/Edit', [
            'offer' => $offer,
        ]);
    }

    /**
     * Update the specified offer in storage.
     */
    public function update(UpdateOfferRequest $request, Offer $offer)
    {
        Gate::authorize('update', $offer);

        $offer->update($request->validated());

        return redirect()->route('offers.show', $offer)
            ->with('success', 'Offer updated successfully.');
    }

    /**
     * Remove the specified offer from storage.
     */
    public function destroy(Offer $offer)
    {
        Gate::authorize('delete', $offer);

        $offer->delete();

        return redirect()->route('offers.index')
            ->with('success', 'Offer deleted successfully.');
    }

    /**
     * Publish the offer (change status from draft to active).
     */
    public function publish(Offer $offer)
    {
        Gate::authorize('publish', $offer);

        $offer->publish();

        return redirect()->route('offers.show', $offer)
            ->with('success', 'Offer published successfully.');
    }

    /**
     * Close the offer.
     */
    public function close(Offer $offer)
    {
        Gate::authorize('close', $offer);

        $offer->close();

        return redirect()->route('offers.show', $offer)
            ->with('success', 'Offer closed successfully.');
    }

    /**
     * View applications for an offer.
     */
    public function applications(Offer $offer): Response
    {
        Gate::authorize('viewApplications', $offer);

        $applications = $offer->applications()
            ->with('student.user')
            ->latest()
            ->paginate(15);

        return Inertia::render('Offers/Applications', [
            'offer' => $offer,
            'applications' => $applications,
        ]);
    }
}
