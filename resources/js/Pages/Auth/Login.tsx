import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GradientText from '@/components/animations/GradientText';
import FadeContent from '@/components/animations/FadeContent';
import { Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';

// Microsoft icon component
const MicrosoftIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 21 21" fill="none">
        <rect x="1" y="1" width="9" height="9" fill="#F25022"/>
        <rect x="11" y="1" width="9" height="9" fill="#7FBA00"/>
        <rect x="1" y="11" width="9" height="9" fill="#00A4EF"/>
        <rect x="11" y="11" width="9" height="9" fill="#FFB900"/>
    </svg>
);

// Google icon component
const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
    </svg>
);

export default function Login({
    status,
    canResetPassword,
}: {
    status?: string;
    canResetPassword: boolean;
}) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false as boolean,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <FadeContent blur>
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-white mb-2">
                        Welcome back
                    </h1>
                    <p className="text-white/50">
                        Sign in to your account to continue
                    </p>
                </div>

                {status && (
                    <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                        {status}
                    </div>
                )}

                {/* SSO Buttons */}
                <div className="space-y-3 mb-6">
                    <a href={route('workos.sso', { provider: 'GoogleOAuth' })} className="block">
                        <Button
                            type="button"
                            className="w-full h-12 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl flex items-center justify-center gap-3"
                        >
                            <GoogleIcon />
                            Continue with Google
                        </Button>
                    </a>

                    <a href={route('workos.sso', { provider: 'MicrosoftOAuth' })} className="block">
                        <Button
                            type="button"
                            className="w-full h-12 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl flex items-center justify-center gap-3"
                        >
                            <MicrosoftIcon />
                            Continue with Microsoft
                        </Button>
                    </a>

                    <a href={route('workos.sso', { provider: 'GitHubOAuth' })} className="block">
                        <Button
                            type="button"
                            className="w-full h-12 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl flex items-center justify-center gap-3"
                        >
                            <Github className="w-5 h-5" />
                            Continue with GitHub
                        </Button>
                    </a>
                </div>

                {/* Divider */}
                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/10"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-black text-white/40">or continue with email</span>
                    </div>
                </div>

                {/* Email/Password Form */}
                <form onSubmit={submit} className="space-y-4">
                    <div>
                        <Label htmlFor="email" className="text-white/70 text-sm">
                            Email
                        </Label>
                        <div className="relative mt-1">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                value={data.email}
                                className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-blue-500/50 focus:ring-blue-500/20"
                                placeholder="you@example.com"
                                autoComplete="username"
                                autoFocus
                                onChange={(e) => setData('email', e.target.value)}
                            />
                        </div>
                        {errors.email && (
                            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                        )}
                    </div>

                    <div>
                        <Label htmlFor="password" className="text-white/70 text-sm">
                            Password
                        </Label>
                        <div className="relative mt-1">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <Input
                                id="password"
                                type="password"
                                name="password"
                                value={data.password}
                                className="pl-10 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/30 rounded-xl focus:border-blue-500/50 focus:ring-blue-500/20"
                                placeholder="••••••••"
                                autoComplete="current-password"
                                onChange={(e) => setData('password', e.target.value)}
                            />
                        </div>
                        {errors.password && (
                            <p className="mt-1 text-sm text-red-400">{errors.password}</p>
                        )}
                    </div>

                    <div className="flex items-center justify-between">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) => setData('remember', e.target.checked)}
                                className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-blue-500/20"
                            />
                            <span className="ml-2 text-sm text-white/50">Remember me</span>
                        </label>

                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                            >
                                Forgot password?
                            </Link>
                        )}
                    </div>

                    <Button
                        type="submit"
                        disabled={processing}
                        className="w-full h-12 bg-white text-black hover:bg-white/90 rounded-xl font-medium group"
                    >
                        {processing ? 'Signing in...' : 'Sign in'}
                        {!processing && (
                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        )}
                    </Button>
                </form>

                {/* Register Link */}
                <p className="mt-6 text-center text-sm text-white/50">
                    Don't have an account?{' '}
                    <Link
                        href={route('register')}
                        className="text-blue-400 hover:text-blue-300 font-medium transition-colors"
                    >
                        Create one
                    </Link>
                </p>
            </FadeContent>
        </GuestLayout>
    );
}
