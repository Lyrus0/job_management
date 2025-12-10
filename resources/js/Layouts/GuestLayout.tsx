import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import { Briefcase } from 'lucide-react';
import Aurora from '@/components/animations/Aurora';
import FadeContent from '@/components/animations/FadeContent';

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Aurora Background */}
            <div className="fixed inset-0 pointer-events-none">
                <Aurora
                    colorStops={['#3b82f6', '#8b5cf6', '#ec4899']}
                    className="opacity-30"
                />
            </div>

            {/* Gradient Orbs */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse-glow" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

            {/* Logo */}
            <FadeContent blur className="mb-8">
                <Link href="/" className="flex items-center group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                        <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-4 rounded-2xl">
                            <Briefcase className="h-10 w-10 text-white" />
                        </div>
                    </div>
                </Link>
            </FadeContent>

            {/* Card */}
            <FadeContent delay={0.1} blur className="w-full max-w-md">
                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl">
                    {children}
                </div>
            </FadeContent>

            {/* Footer */}
            <FadeContent delay={0.2} className="mt-8">
                <p className="text-white/30 text-sm">
                    &copy; 2024 JobConnect. All rights reserved.
                </p>
            </FadeContent>
        </div>
    );
}
