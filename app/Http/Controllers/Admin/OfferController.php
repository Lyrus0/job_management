<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Offer;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OfferController extends Controller
{
    /**
     * Display a listing of all offers.
     */
    public function index(Request $request): Response
    {
        $offers = Offer::with('company.user')
            ->when($request->filled('search'), function ($q) use ($request) {
                $q->search($request->search);
            })
            ->when($request->filled('type'), function ($q) use ($request) {
                $q->ofType($request->type);
            })
            ->when($request->filled('status'), function ($q) use ($request) {
                $q->where('status', $request->status);
            })
            ->when($request->filled('company_id'), function ($q) use ($request) {
                $q->where('company_id', $request->company_id);
            })
            ->latest()
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('Admin/Offers/Index', [
            'offers' => $offers,
            'filters' => $request->only(['search', 'type', 'status', 'company_id']),
        ]);
    }

    /**
     * Display the specified offer.
     */
    public function show(Offer $offer): Response
    {
        $offer->load(['company.user', 'applications.student.user']);

        return Inertia::render('Admin/Offers/Show', [
            'offer' => $offer,
        ]);
    }

    /**
     * Update the offer status.
     */
    public function updateStatus(Request $request, Offer $offer)
    {
        $request->validate([
            'status' => ['required', 'in:draft,active,expired,closed'],
        ]);

        $offer->update(['status' => $request->status]);

        if ($request->status === 'active' && !$offer->published_at) {
            $offer->update(['published_at' => now()]);
        }

        if ($request->status === 'expired') {
            $offer->update(['expired_at' => now()]);
        }

        return back()->with('success', 'Offer status updated successfully.');
    }

    /**
     * Remove the specified offer from storage.
     */
    public function destroy(Offer $offer)
    {
        $offer->delete();

        return redirect()->route('admin.offers.index')
            ->with('success', 'Offer deleted successfully.');
    }
}
