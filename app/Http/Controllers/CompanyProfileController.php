<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCompanyProfileRequest;
use App\Http\Requests\UpdateCompanyProfileRequest;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class CompanyProfileController extends Controller
{
    /**
     * Show the form for creating the company profile.
     */
    public function create(): Response
    {
        return Inertia::render('Profile/CompanySetup');
    }

    /**
     * Store a newly created company profile.
     */
    public function store(StoreCompanyProfileRequest $request)
    {
        $user = $request->user();

        if ($user->company) {
            return redirect()->route('dashboard')
                ->with('error', 'Company profile already exists.');
        }

        $data = $request->validated();

        // Handle logo upload
        if ($request->hasFile('logo')) {
            $data['logo_path'] = $request->file('logo')->store('logos', 'public');
        }

        $user->company()->create($data);

        return redirect()->route('dashboard')
            ->with('success', 'Company profile created successfully.');
    }

    /**
     * Display the company profile.
     */
    public function show(Request $request): Response
    {
        $company = $request->user()->company;

        if (!$company) {
            return redirect()->route('company.profile.create');
        }

        return Inertia::render('Profile/CompanyProfile', [
            'company' => $company,
        ]);
    }

    /**
     * Show the form for editing the company profile.
     */
    public function edit(Request $request): Response
    {
        $company = $request->user()->company;

        if (!$company) {
            return redirect()->route('company.profile.create');
        }

        return Inertia::render('Profile/CompanyEdit', [
            'company' => $company,
        ]);
    }

    /**
     * Update the company profile.
     */
    public function update(UpdateCompanyProfileRequest $request)
    {
        $company = $request->user()->company;

        if (!$company) {
            return redirect()->route('company.profile.create');
        }

        $data = $request->validated();

        // Handle logo upload
        if ($request->hasFile('logo')) {
            // Delete old logo if exists
            if ($company->logo_path) {
                Storage::disk('public')->delete($company->logo_path);
            }
            $data['logo_path'] = $request->file('logo')->store('logos', 'public');
        }

        $company->update($data);

        return redirect()->route('company.profile.show')
            ->with('success', 'Profile updated successfully.');
    }
}
