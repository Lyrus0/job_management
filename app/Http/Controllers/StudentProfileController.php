<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentProfileRequest;
use App\Http\Requests\UpdateStudentProfileRequest;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class StudentProfileController extends Controller
{
    /**
     * Show the form for creating the student profile.
     */
    public function create(): Response
    {
        return Inertia::render('Profile/StudentSetup');
    }

    /**
     * Store a newly created student profile.
     */
    public function store(StoreStudentProfileRequest $request)
    {
        $user = $request->user();

        if ($user->student) {
            return redirect()->route('dashboard')
                ->with('error', 'Student profile already exists.');
        }

        $data = $request->validated();

        // Handle CV upload
        if ($request->hasFile('cv')) {
            $data['cv_path'] = $request->file('cv')->store('cvs', 'public');
        }

        $user->student()->create($data);

        return redirect()->route('dashboard')
            ->with('success', 'Student profile created successfully.');
    }

    /**
     * Display the student profile.
     */
    public function show(Request $request): Response
    {
        $student = $request->user()->student;

        if (!$student) {
            return redirect()->route('student.profile.create');
        }

        return Inertia::render('Profile/StudentProfile', [
            'student' => $student,
        ]);
    }

    /**
     * Show the form for editing the student profile.
     */
    public function edit(Request $request): Response
    {
        $student = $request->user()->student;

        if (!$student) {
            return redirect()->route('student.profile.create');
        }

        return Inertia::render('Profile/StudentEdit', [
            'student' => $student,
        ]);
    }

    /**
     * Update the student profile.
     */
    public function update(UpdateStudentProfileRequest $request)
    {
        $student = $request->user()->student;

        if (!$student) {
            return redirect()->route('student.profile.create');
        }

        $data = $request->validated();

        // Handle CV upload
        if ($request->hasFile('cv')) {
            // Delete old CV if exists
            if ($student->cv_path) {
                Storage::disk('public')->delete($student->cv_path);
            }
            $data['cv_path'] = $request->file('cv')->store('cvs', 'public');
        }

        $student->update($data);

        return redirect()->route('student.profile.show')
            ->with('success', 'Profile updated successfully.');
    }
}
