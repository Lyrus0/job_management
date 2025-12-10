import { PageProps, Offer } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Briefcase,
    GraduationCap,
    Building2,
    Search,
    MapPin,
    Clock,
    Users,
    CheckCircle,
    ArrowRight,
    Sparkles,
    Shield,
    Zap
} from 'lucide-react';
import BlurText from '@/components/animations/BlurText';
import GradientText from '@/components/animations/GradientText';
import FadeContent from '@/components/animations/FadeContent';
import CountUp from '@/components/animations/CountUp';
import SpotlightCard from '@/components/animations/SpotlightCard';
import Aurora from '@/components/animations/Aurora';

interface Props extends PageProps {
    canLogin: boolean;
    canRegister: boolean;
    laravelVersion: string;
    phpVersion: string;
    featuredOffers?: Offer[];
    stats?: {
        offers: number;
        companies: number;
        students: number;
    };
}

const offerTypeBadge = (type: string) => {
    switch (type) {
        case 'stage':
            return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">Internship</Badge>;
        case 'emploi':
            return <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Job</Badge>;
        case 'alternance':
            return <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Apprenticeship</Badge>;
        default:
            return <Badge>{type}</Badge>;
    }
};

export default function Welcome({ auth, canLogin, canRegister, featuredOffers = [], stats }: Props) {
    return (
        <>
            <Head title="Find Your Next Opportunity" />

            <div className="min-h-screen bg-black text-white overflow-hidden">
                {/* Floating Navigation - Glassmorphism */}
                <nav className="fixed top-0 left-0 right-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 py-3">
                            <div className="flex justify-between items-center">
                                <Link href="/" className="flex items-center group">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                                        <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-xl">
                                            <Briefcase className="h-6 w-6 text-white" />
                                        </div>
                                    </div>
                                    <span className="ml-3 text-xl font-semibold tracking-tight">JobConnect</span>
                                </Link>
                                <div className="flex items-center gap-3">
                                    {auth.user ? (
                                        <Link href={route('dashboard')}>
                                            <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6">
                                                Dashboard
                                            </Button>
                                        </Link>
                                    ) : (
                                        <>
                                            {canLogin && (
                                                <Link href={route('login')}>
                                                    <Button variant="ghost" className="text-white/70 hover:text-white hover:bg-white/10 rounded-full">
                                                        Sign in
                                                    </Button>
                                                </Link>
                                            )}
                                            {canRegister && (
                                                <Link href={route('register')}>
                                                    <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6">
                                                        Get Started
                                                    </Button>
                                                </Link>
                                            )}
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center pt-20">
                    {/* Aurora Background */}
                    <Aurora
                        colorStops={['#3b82f6', '#8b5cf6', '#ec4899']}
                        className="opacity-40"
                    />

                    {/* Gradient Orbs */}
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse-glow" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }} />

                    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        {/* Badge */}
                        <FadeContent delay={0} blur>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8">
                                <Sparkles className="w-4 h-4 text-yellow-400" />
                                <span className="text-sm text-white/70">Your career journey starts here</span>
                            </div>
                        </FadeContent>

                        {/* Main Headline with BlurText */}
                        <div className="mb-6">
                            <BlurText
                                text="Find Your Dream"
                                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight justify-center"
                                delay={100}
                                direction="bottom"
                            />
                        </div>
                        <div className="mb-8">
                            <GradientText
                                colors={['#60a5fa', '#a78bfa', '#f472b6', '#60a5fa']}
                                animationSpeed={6}
                                className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
                            >
                                Career Opportunity
                            </GradientText>
                        </div>

                        {/* Subtitle */}
                        <FadeContent delay={0.3} blur>
                            <p className="text-xl sm:text-2xl text-white/60 max-w-3xl mx-auto mb-12 leading-relaxed">
                                Connect with top companies offering internships, jobs, and apprenticeships.
                                Build your future with opportunities that match your ambitions.
                            </p>
                        </FadeContent>

                        {/* CTA Buttons */}
                        <FadeContent delay={0.5} blur>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                {auth.user ? (
                                    <Link href={route('offers.index')}>
                                        <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-8 h-14 text-lg group">
                                            <Search className="w-5 h-5 mr-2" />
                                            Browse Offers
                                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                ) : (
                                    <>
                                        <Link href={route('register')}>
                                            <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-8 h-14 text-lg group">
                                                <GraduationCap className="w-5 h-5 mr-2" />
                                                I'm a Student
                                                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                            </Button>
                                        </Link>
                                        <Link href={route('register')}>
                                            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8 h-14 text-lg">
                                                <Building2 className="w-5 h-5 mr-2" />
                                                I'm a Company
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </FadeContent>

                        {/* Scroll indicator */}
                        <FadeContent delay={0.8}>
                            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float">
                                <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
                                    <div className="w-1 h-2 bg-white/50 rounded-full animate-bounce" />
                                </div>
                            </div>
                        </FadeContent>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="relative py-32 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-transparent" />

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <FadeContent blur>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Stat 1 */}
                                <div className="text-center group">
                                    <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                                        <Briefcase className="w-10 h-10 text-blue-400" />
                                    </div>
                                    <div className="text-5xl sm:text-6xl font-bold mb-2">
                                        <CountUp to={stats?.offers || 100} duration={2.5} className="text-white" />
                                        <span className="text-blue-400">+</span>
                                    </div>
                                    <div className="text-white/50 text-lg">Active Offers</div>
                                </div>

                                {/* Stat 2 */}
                                <div className="text-center group">
                                    <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 group-hover:scale-110 transition-transform duration-300">
                                        <Building2 className="w-10 h-10 text-purple-400" />
                                    </div>
                                    <div className="text-5xl sm:text-6xl font-bold mb-2">
                                        <CountUp to={stats?.companies || 50} duration={2.5} className="text-white" />
                                        <span className="text-purple-400">+</span>
                                    </div>
                                    <div className="text-white/50 text-lg">Partner Companies</div>
                                </div>

                                {/* Stat 3 */}
                                <div className="text-center group">
                                    <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-2xl bg-gradient-to-br from-pink-500/20 to-pink-500/5 border border-pink-500/20 group-hover:scale-110 transition-transform duration-300">
                                        <Users className="w-10 h-10 text-pink-400" />
                                    </div>
                                    <div className="text-5xl sm:text-6xl font-bold mb-2">
                                        <CountUp to={stats?.students || 500} duration={2.5} className="text-white" />
                                        <span className="text-pink-400">+</span>
                                    </div>
                                    <div className="text-white/50 text-lg">Registered Students</div>
                                </div>
                            </div>
                        </FadeContent>
                    </div>
                </section>

                {/* Featured Offers */}
                {featuredOffers.length > 0 && (
                    <section className="relative py-32">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <FadeContent blur className="text-center mb-16">
                                <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                                    Featured <GradientText colors={['#60a5fa', '#a78bfa', '#60a5fa']} className="inline">Opportunities</GradientText>
                                </h2>
                                <p className="text-white/50 text-lg max-w-2xl mx-auto">
                                    Explore hand-picked opportunities from our partner companies
                                </p>
                            </FadeContent>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featuredOffers.slice(0, 6).map((offer, index) => (
                                    <FadeContent key={offer.id} delay={index * 0.1} blur>
                                        <SpotlightCard
                                            className="h-full bg-white/5 border-white/10 hover:border-white/20 transition-colors"
                                            spotlightColor="rgba(99, 102, 241, 0.15)"
                                        >
                                            <div className="flex items-start justify-between mb-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-white mb-1">{offer.title}</h3>
                                                    <div className="flex items-center text-white/50 text-sm">
                                                        <Building2 className="w-4 h-4 mr-1" />
                                                        {offer.company?.company_name}
                                                    </div>
                                                </div>
                                                {offerTypeBadge(offer.type)}
                                            </div>
                                            <p className="text-white/40 text-sm line-clamp-2 mb-4">
                                                {offer.description}
                                            </p>
                                            <div className="flex flex-wrap gap-3 text-sm text-white/40">
                                                {offer.city && (
                                                    <span className="flex items-center">
                                                        <MapPin className="w-4 h-4 mr-1" />
                                                        {offer.city}
                                                    </span>
                                                )}
                                                {offer.duration && (
                                                    <span className="flex items-center">
                                                        <Clock className="w-4 h-4 mr-1" />
                                                        {offer.duration}
                                                    </span>
                                                )}
                                            </div>
                                        </SpotlightCard>
                                    </FadeContent>
                                ))}
                            </div>

                            <FadeContent delay={0.4} className="text-center mt-12">
                                {auth.user ? (
                                    <Link href={route('offers.index')}>
                                        <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-8 group">
                                            View All Offers
                                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                ) : (
                                    <Link href={route('register')}>
                                        <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-8 group">
                                            Sign Up to See More
                                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                )}
                            </FadeContent>
                        </div>
                    </section>
                )}

                {/* Features Section */}
                <section className="relative py-32 overflow-hidden">
                    {/* Background elements */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />

                    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <FadeContent blur className="text-center mb-16">
                            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
                                Why Choose <GradientText colors={['#a78bfa', '#f472b6', '#a78bfa']} className="inline">JobConnect</GradientText>?
                            </h2>
                            <p className="text-white/50 text-lg max-w-2xl mx-auto">
                                Everything you need to launch your career, all in one platform
                            </p>
                        </FadeContent>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {/* Feature 1 */}
                            <FadeContent delay={0} blur>
                                <SpotlightCard
                                    className="text-center bg-white/5 border-white/10"
                                    spotlightColor="rgba(34, 197, 94, 0.15)"
                                >
                                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-green-500/20 to-green-500/5 border border-green-500/20">
                                        <Shield className="w-8 h-8 text-green-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">Verified Companies</h3>
                                    <p className="text-white/50">
                                        All companies on our platform are verified to ensure safe and legitimate opportunities for your career.
                                    </p>
                                </SpotlightCard>
                            </FadeContent>

                            {/* Feature 2 */}
                            <FadeContent delay={0.15} blur>
                                <SpotlightCard
                                    className="text-center bg-white/5 border-white/10"
                                    spotlightColor="rgba(59, 130, 246, 0.15)"
                                >
                                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/20">
                                        <Search className="w-8 h-8 text-blue-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">Smart Search</h3>
                                    <p className="text-white/50">
                                        Find the perfect opportunity with our powerful search and intelligent matching algorithms.
                                    </p>
                                </SpotlightCard>
                            </FadeContent>

                            {/* Feature 3 */}
                            <FadeContent delay={0.3} blur>
                                <SpotlightCard
                                    className="text-center bg-white/5 border-white/10"
                                    spotlightColor="rgba(168, 85, 247, 0.15)"
                                >
                                    <div className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20">
                                        <Zap className="w-8 h-8 text-purple-400" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">Track Progress</h3>
                                    <p className="text-white/50">
                                        Keep track of all your applications and their status in real-time from one dashboard.
                                    </p>
                                </SpotlightCard>
                            </FadeContent>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                {!auth.user && (
                    <section className="relative py-32 overflow-hidden">
                        {/* Aurora effect for CTA */}
                        <Aurora
                            colorStops={['#8b5cf6', '#3b82f6', '#06b6d4']}
                            className="opacity-30"
                        />

                        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                            <FadeContent blur>
                                <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-12 sm:p-16">
                                    <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                                        Ready to Start Your
                                        <br />
                                        <GradientText
                                            colors={['#60a5fa', '#a78bfa', '#f472b6', '#60a5fa']}
                                            animationSpeed={5}
                                            className="inline"
                                        >
                                            Career Journey?
                                        </GradientText>
                                    </h2>
                                    <p className="text-xl text-white/50 mb-10 max-w-2xl mx-auto">
                                        Join thousands of students who have found their dream internships and jobs through our platform.
                                    </p>
                                    <Link href={route('register')}>
                                        <Button size="lg" className="bg-white text-black hover:bg-white/90 rounded-full px-10 h-14 text-lg group">
                                            Create Your Free Account
                                            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            </FadeContent>
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className="relative border-t border-white/10 py-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                            {/* Brand */}
                            <div>
                                <div className="flex items-center mb-6">
                                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-xl">
                                        <Briefcase className="h-5 w-5 text-white" />
                                    </div>
                                    <span className="ml-2 text-lg font-semibold">JobConnect</span>
                                </div>
                                <p className="text-white/40 text-sm">
                                    Connecting ambitious students with their dream careers since 2024.
                                </p>
                            </div>

                            {/* For Students */}
                            <div>
                                <h4 className="text-white font-semibold mb-4">For Students</h4>
                                <ul className="space-y-3 text-sm">
                                    <li><a href="#" className="text-white/40 hover:text-white transition-colors">Browse Offers</a></li>
                                    <li><a href="#" className="text-white/40 hover:text-white transition-colors">Career Resources</a></li>
                                    <li><a href="#" className="text-white/40 hover:text-white transition-colors">Resume Tips</a></li>
                                </ul>
                            </div>

                            {/* For Companies */}
                            <div>
                                <h4 className="text-white font-semibold mb-4">For Companies</h4>
                                <ul className="space-y-3 text-sm">
                                    <li><a href="#" className="text-white/40 hover:text-white transition-colors">Post a Job</a></li>
                                    <li><a href="#" className="text-white/40 hover:text-white transition-colors">Find Talent</a></li>
                                    <li><a href="#" className="text-white/40 hover:text-white transition-colors">Pricing</a></li>
                                </ul>
                            </div>

                            {/* Support */}
                            <div>
                                <h4 className="text-white font-semibold mb-4">Support</h4>
                                <ul className="space-y-3 text-sm">
                                    <li><a href="#" className="text-white/40 hover:text-white transition-colors">Help Center</a></li>
                                    <li><a href="#" className="text-white/40 hover:text-white transition-colors">Contact Us</a></li>
                                    <li><a href="#" className="text-white/40 hover:text-white transition-colors">Privacy Policy</a></li>
                                </ul>
                            </div>
                        </div>

                        <div className="border-t border-white/10 mt-12 pt-8 text-center">
                            <p className="text-white/30 text-sm">
                                &copy; 2024 JobConnect. All rights reserved.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
