<?php

return [
    /*
    |--------------------------------------------------------------------------
    | WorkOS API Key
    |--------------------------------------------------------------------------
    |
    | Your WorkOS API key from the WorkOS Dashboard.
    | Get it from: https://dashboard.workos.com/api-keys
    |
    */
    'api_key' => env('WORKOS_API_KEY'),

    /*
    |--------------------------------------------------------------------------
    | WorkOS Client ID
    |--------------------------------------------------------------------------
    |
    | Your WorkOS Client ID from the WorkOS Dashboard.
    | Get it from: https://dashboard.workos.com/configuration
    |
    */
    'client_id' => env('WORKOS_CLIENT_ID'),

    /*
    |--------------------------------------------------------------------------
    | Redirect URI
    |--------------------------------------------------------------------------
    |
    | The URI where WorkOS will redirect after authentication.
    | This must match exactly what you configure in the WorkOS Dashboard.
    |
    */
    'redirect_uri' => env('WORKOS_REDIRECT_URI', 'http://localhost:8000/auth/callback'),

    /*
    |--------------------------------------------------------------------------
    | Default Connection (Optional)
    |--------------------------------------------------------------------------
    |
    | If you have a specific SSO connection you want to use by default.
    | Leave empty to show the WorkOS hosted login page.
    |
    */
    'default_connection' => env('WORKOS_DEFAULT_CONNECTION'),

    /*
    |--------------------------------------------------------------------------
    | Default Organization (Optional)
    |--------------------------------------------------------------------------
    |
    | If you want to authenticate users from a specific organization.
    |
    */
    'default_organization' => env('WORKOS_DEFAULT_ORGANIZATION'),

    /*
    |--------------------------------------------------------------------------
    | Auth Provider
    |--------------------------------------------------------------------------
    |
    | The OAuth provider to use. Options: 'authkit', 'GoogleOAuth', 'MicrosoftOAuth', 'GitHubOAuth'
    | 'authkit' uses WorkOS AuthKit (recommended for full SSO support)
    |
    */
    'provider' => env('WORKOS_PROVIDER', 'authkit'),
];
