<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Inertia\Inertia;
use WorkOS\WorkOS;

class WorkOSController extends Controller
{
    protected WorkOS $workos;

    public function __construct()
    {
        $this->workos = new WorkOS(config('workos.api_key'));
    }

    /**
     * Redirect to WorkOS AuthKit for authentication
     */
    public function redirect(Request $request)
    {
        $provider = $request->query('provider', config('workos.provider', 'authkit'));

        // Generate state for CSRF protection
        $state = Str::random(40);
        session(['workos_state' => $state]);

        // Store intended role if registering
        if ($request->has('role')) {
            session(['workos_intended_role' => $request->query('role')]);
        }

        // Build authorization URL
        $authorizationUrl = $this->workos->userManagement->getAuthorizationUrl(
            redirectUri: config('workos.redirect_uri'),
            clientId: config('workos.client_id'),
            provider: $provider,
            state: $state,
        );

        return redirect($authorizationUrl);
    }

    /**
     * Handle the callback from WorkOS
     */
    public function callback(Request $request)
    {
        // Verify state
        $state = $request->query('state');
        $savedState = session('workos_state');

        if (!$state || $state !== $savedState) {
            return redirect()->route('login')->with('error', 'Invalid state parameter. Please try again.');
        }

        session()->forget('workos_state');

        // Check for errors
        if ($request->has('error')) {
            $error = $request->query('error_description', 'Authentication failed');
            return redirect()->route('login')->with('error', $error);
        }

        // Get the authorization code
        $code = $request->query('code');

        if (!$code) {
            return redirect()->route('login')->with('error', 'No authorization code received.');
        }

        try {
            // Exchange code for user info
            $authResponse = $this->workos->userManagement->authenticateWithCode(
                clientId: config('workos.client_id'),
                code: $code,
            );

            $workosUser = $authResponse->user;

            // Find or create user
            $user = $this->findOrCreateUser($workosUser);

            // Log the user in
            Auth::login($user, true);

            // Regenerate session
            $request->session()->regenerate();

            // Check if user needs to complete profile setup
            if ($user->role === 'student' && !$user->student) {
                return redirect()->route('student.setup');
            }

            if ($user->role === 'company' && !$user->company) {
                return redirect()->route('company.setup');
            }

            return redirect()->intended(route('dashboard'));

        } catch (\Exception $e) {
            report($e);
            return redirect()->route('login')->with('error', 'Authentication failed: ' . $e->getMessage());
        }
    }

    /**
     * Find existing user or create a new one from WorkOS data
     */
    protected function findOrCreateUser($workosUser): User
    {
        // Try to find user by WorkOS ID first
        $user = User::where('workos_id', $workosUser->id)->first();

        if ($user) {
            // Update user info from WorkOS
            $user->update([
                'name' => $workosUser->firstName ?? $user->name,
                'surname' => $workosUser->lastName ?? $user->surname,
                'email' => $workosUser->email,
            ]);
            return $user;
        }

        // Try to find by email
        $user = User::where('email', $workosUser->email)->first();

        if ($user) {
            // Link existing account with WorkOS
            $user->update([
                'workos_id' => $workosUser->id,
                'name' => $workosUser->firstName ?? $user->name,
                'surname' => $workosUser->lastName ?? $user->surname,
            ]);
            return $user;
        }

        // Create new user
        $intendedRole = session('workos_intended_role', 'student');
        session()->forget('workos_intended_role');

        // Validate role
        if (!in_array($intendedRole, ['student', 'company'])) {
            $intendedRole = 'student';
        }

        return User::create([
            'workos_id' => $workosUser->id,
            'name' => $workosUser->firstName ?? explode('@', $workosUser->email)[0],
            'surname' => $workosUser->lastName ?? '',
            'email' => $workosUser->email,
            'email_verified_at' => $workosUser->emailVerified ? now() : null,
            'password' => Hash::make(Str::random(32)), // Random password since they use SSO
            'role' => $intendedRole,
            'is_active' => true,
        ]);
    }

    /**
     * Handle SSO login with specific provider
     */
    public function sso(Request $request, string $provider)
    {
        $validProviders = ['GoogleOAuth', 'MicrosoftOAuth', 'GitHubOAuth'];

        if (!in_array($provider, $validProviders)) {
            return redirect()->route('login')->with('error', 'Invalid SSO provider.');
        }

        $state = Str::random(40);
        session(['workos_state' => $state]);

        if ($request->has('role')) {
            session(['workos_intended_role' => $request->query('role')]);
        }

        $authorizationUrl = $this->workos->userManagement->getAuthorizationUrl(
            redirectUri: config('workos.redirect_uri'),
            clientId: config('workos.client_id'),
            provider: $provider,
            state: $state,
        );

        return redirect($authorizationUrl);
    }

    /**
     * Logout and optionally logout from WorkOS
     */
    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }
}
