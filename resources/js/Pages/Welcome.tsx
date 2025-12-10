import { PageProps, Offer } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, GraduationCap, Building2, Search, MapPin, Clock, Users, CheckCircle } from 'lucide-react';

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
            return <Badge variant="outline">Internship</Badge>;
        case 'emploi':
            return <Badge variant="default">Job</Badge>;
        case 'alternance':
            return <Badge variant="secondary">Apprenticeship</Badge>;
        default:
            return <Badge>{type}</Badge>;
    }
};

export default function Welcome({ auth, canLogin, canRegister, featuredOffers = [], stats }: Props) {
    return (
        <>
            <Head title="Find Your Next Opportunity" />

            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
                {/* Navigation */}
                <nav className="bg-white shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <div className="flex items-center">
                                <Briefcase className="h-8 w-8 text-primary" />
                                <span className="ml-2 text-xl font-bold text-gray-900">JobConnect</span>
                            </div>
                            <div className="flex items-center gap-4">
                                {auth.user ? (
                                    <Link href={route('dashboard')}>
                                        <Button>Dashboard</Button>
                                    </Link>
                                ) : (
                                    <>
                                        {canLogin && (
                                            <Link href={route('login')}>
                                                <Button variant="ghost">Log in</Button>
                                            </Link>
                                        )}
                                        {canRegister && (
                                            <Link href={route('register')}>
                                                <Button>Get Started</Button>
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                {/* Hero Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                            Find Your Perfect
                            <span className="text-primary block">Internship or Job</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
                            Connect with top companies offering internships, jobs, and apprenticeships.
                            Start your career journey today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {auth.user ? (
                                <Link href={route('offers.index')}>
                                    <Button size="lg" className="w-full sm:w-auto">
                                        <Search className="w-5 h-5 mr-2" />
                                        Browse Offers
                                    </Button>
                                </Link>
                            ) : (
                                <>
                                    <Link href={route('register')}>
                                        <Button size="lg" className="w-full sm:w-auto">
                                            <GraduationCap className="w-5 h-5 mr-2" />
                                            I'm a Student
                                        </Button>
                                    </Link>
                                    <Link href={route('register')}>
                                        <Button size="lg" variant="outline" className="w-full sm:w-auto">
                                            <Building2 className="w-5 h-5 mr-2" />
                                            I'm a Company
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-12 bg-gray-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                                    <Briefcase className="w-8 h-8 text-primary" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900">{stats?.offers || '100'}+</div>
                                <div className="text-gray-600">Active Offers</div>
                            </div>
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                                    <Building2 className="w-8 h-8 text-primary" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900">{stats?.companies || '50'}+</div>
                                <div className="text-gray-600">Partner Companies</div>
                            </div>
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                                    <Users className="w-8 h-8 text-primary" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900">{stats?.students || '500'}+</div>
                                <div className="text-gray-600">Registered Students</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Offers */}
                {featuredOffers.length > 0 && (
                    <section className="py-16 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                                Featured Opportunities
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {featuredOffers.slice(0, 6).map((offer) => (
                                    <Card key={offer.id} className="hover:shadow-lg transition-shadow">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <CardTitle className="text-lg">{offer.title}</CardTitle>
                                                    <CardDescription className="flex items-center mt-1">
                                                        <Building2 className="w-4 h-4 mr-1" />
                                                        {offer.company?.company_name}
                                                    </CardDescription>
                                                </div>
                                                {offerTypeBadge(offer.type)}
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                                                {offer.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 text-sm text-gray-500">
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
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                            <div className="text-center mt-10">
                                {auth.user ? (
                                    <Link href={route('offers.index')}>
                                        <Button size="lg">View All Offers</Button>
                                    </Link>
                                ) : (
                                    <Link href={route('register')}>
                                        <Button size="lg">Sign Up to See More</Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </section>
                )}

                {/* Features Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                            Why Choose JobConnect?
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                                    <CheckCircle className="w-6 h-6 text-green-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Verified Companies</h3>
                                <p className="text-gray-600">
                                    All companies on our platform are verified to ensure safe and legitimate opportunities.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                                    <Search className="w-6 h-6 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Easy Search</h3>
                                <p className="text-gray-600">
                                    Find the perfect opportunity with our powerful search and filter tools.
                                </p>
                            </div>
                            <div className="bg-white p-6 rounded-lg shadow-sm">
                                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                                    <Briefcase className="w-6 h-6 text-purple-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Track Applications</h3>
                                <p className="text-gray-600">
                                    Keep track of all your applications and their status in one place.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                {!auth.user && (
                    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
                        <div className="max-w-4xl mx-auto text-center">
                            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                                Ready to Start Your Career Journey?
                            </h2>
                            <p className="text-xl text-primary-foreground/80 mb-8">
                                Join thousands of students who have found their dream internships and jobs through our platform.
                            </p>
                            <Link href={route('register')}>
                                <Button size="lg" variant="secondary">
                                    Create Your Free Account
                                </Button>
                            </Link>
                        </div>
                    </section>
                )}

                {/* Footer */}
                <footer className="bg-gray-900 text-gray-400 py-12">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center mb-4">
                                    <Briefcase className="h-6 w-6 text-white" />
                                    <span className="ml-2 text-lg font-bold text-white">JobConnect</span>
                                </div>
                                <p className="text-sm">
                                    Connecting students with their dream careers since 2024.
                                </p>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold mb-4">For Students</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="hover:text-white">Browse Offers</a></li>
                                    <li><a href="#" className="hover:text-white">Career Resources</a></li>
                                    <li><a href="#" className="hover:text-white">Resume Tips</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold mb-4">For Companies</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="hover:text-white">Post a Job</a></li>
                                    <li><a href="#" className="hover:text-white">Find Talent</a></li>
                                    <li><a href="#" className="hover:text-white">Pricing</a></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-white font-semibold mb-4">Support</h4>
                                <ul className="space-y-2 text-sm">
                                    <li><a href="#" className="hover:text-white">Help Center</a></li>
                                    <li><a href="#" className="hover:text-white">Contact Us</a></li>
                                    <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
                            <p>&copy; 2024 JobConnect. All rights reserved.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
