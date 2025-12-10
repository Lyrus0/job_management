import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, Student, Application, Offer } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, FileText, CheckCircle, XCircle, Clock, ArrowRight } from 'lucide-react';

interface Props extends PageProps {
    student: Student;
    stats: {
        total_applications: number;
        pending_applications: number;
        accepted_applications: number;
        rejected_applications: number;
    };
    recentApplications: Application[];
    recommendedOffers: Offer[];
}

const statusBadge = (status: string) => {
    switch (status) {
        case 'pending':
            return <Badge variant="warning"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
        case 'accepted':
            return <Badge variant="success"><CheckCircle className="w-3 h-3 mr-1" /> Accepted</Badge>;
        case 'rejected':
            return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Rejected</Badge>;
        case 'withdrawn':
            return <Badge variant="secondary">Withdrawn</Badge>;
        default:
            return <Badge>{status}</Badge>;
    }
};

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

export default function StudentDashboard({ auth, student, stats, recentApplications, recommendedOffers }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Welcome back, {auth.user.name}!
                </h2>
            }
        >
            <Head title="Student Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
                                <FileText className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.total_applications}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">Pending</CardTitle>
                                <Clock className="w-4 h-4 text-yellow-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.pending_applications}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">Accepted</CardTitle>
                                <CheckCircle className="w-4 h-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.accepted_applications}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                                <XCircle className="w-4 h-4 text-red-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.rejected_applications}</div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Recent Applications */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Applications</CardTitle>
                                <CardDescription>Your latest job applications</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {recentApplications.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentApplications.map((application) => (
                                            <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div>
                                                    <h4 className="font-medium">{application.offer?.title}</h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        {application.offer?.company?.company_name}
                                                    </p>
                                                </div>
                                                {statusBadge(application.status)}
                                            </div>
                                        ))}
                                        <Link href={route('applications.index')}>
                                            <Button variant="outline" className="w-full">
                                                View All Applications <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                        <p className="text-muted-foreground">No applications yet</p>
                                        <Link href={route('offers.index')}>
                                            <Button className="mt-4">Browse Offers</Button>
                                        </Link>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Recommended Offers */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recommended Offers</CardTitle>
                                <CardDescription>New opportunities for you</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {recommendedOffers.length > 0 ? (
                                    <div className="space-y-4">
                                        {recommendedOffers.map((offer) => (
                                            <Link key={offer.id} href={route('offers.show', offer.id)}>
                                                <div className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h4 className="font-medium">{offer.title}</h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                {offer.company?.company_name}
                                                            </p>
                                                            <p className="text-sm text-muted-foreground mt-1">
                                                                {offer.city}{offer.is_remote && ' (Remote)'}
                                                            </p>
                                                        </div>
                                                        {offerTypeBadge(offer.type)}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                        <Link href={route('offers.index')}>
                                            <Button variant="outline" className="w-full">
                                                Browse All Offers <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                        <p className="text-muted-foreground">No offers available at the moment</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
