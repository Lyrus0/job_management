import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, Company, Application, Offer } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, FileText, Clock, Plus, ArrowRight } from 'lucide-react';

interface Props extends PageProps {
    company: Company;
    stats: {
        total_offers: number;
        active_offers: number;
        total_applications: number;
        pending_applications: number;
    };
    recentApplications: Application[];
    offers: Offer[];
}

const statusBadge = (status: string) => {
    switch (status) {
        case 'pending':
            return <Badge variant="warning"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>;
        case 'accepted':
            return <Badge variant="success">Accepted</Badge>;
        case 'rejected':
            return <Badge variant="destructive">Rejected</Badge>;
        default:
            return <Badge>{status}</Badge>;
    }
};

const offerStatusBadge = (status: string) => {
    switch (status) {
        case 'draft':
            return <Badge variant="secondary">Draft</Badge>;
        case 'active':
            return <Badge variant="success">Active</Badge>;
        case 'expired':
            return <Badge variant="warning">Expired</Badge>;
        case 'closed':
            return <Badge variant="destructive">Closed</Badge>;
        default:
            return <Badge>{status}</Badge>;
    }
};

export default function CompanyDashboard({ auth, company, stats, recentApplications, offers }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {company.company_name} Dashboard
                    </h2>
                    <Link href={route('offers.create')}>
                        <Button>
                            <Plus className="w-4 h-4 mr-2" /> Post New Offer
                        </Button>
                    </Link>
                </div>
            }
        >
            <Head title="Company Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">Total Offers</CardTitle>
                                <Briefcase className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.total_offers}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">Active Offers</CardTitle>
                                <Briefcase className="w-4 h-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.active_offers}</div>
                            </CardContent>
                        </Card>
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
                                <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
                                <Clock className="w-4 h-4 text-yellow-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.pending_applications}</div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Recent Applications */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Applications</CardTitle>
                                <CardDescription>Latest candidates for your offers</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {recentApplications.length > 0 ? (
                                    <div className="space-y-4">
                                        {recentApplications.map((application) => (
                                            <div key={application.id} className="flex items-center justify-between p-4 border rounded-lg">
                                                <div>
                                                    <h4 className="font-medium">
                                                        {application.student?.user?.name} {application.student?.user?.surname}
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground">
                                                        Applied for: {application.offer?.title}
                                                    </p>
                                                </div>
                                                {statusBadge(application.status)}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                        <p className="text-muted-foreground">No applications yet</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Your Offers */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Your Offers</CardTitle>
                                <CardDescription>Manage your job postings</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {offers.length > 0 ? (
                                    <div className="space-y-4">
                                        {offers.map((offer) => (
                                            <Link key={offer.id} href={route('offers.show', offer.id)}>
                                                <div className="p-4 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                                                    <div className="flex items-start justify-between">
                                                        <div>
                                                            <h4 className="font-medium">{offer.title}</h4>
                                                            <p className="text-sm text-muted-foreground">
                                                                {offer.applications?.length || 0} applications
                                                            </p>
                                                        </div>
                                                        {offerStatusBadge(offer.status)}
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                        <Link href={route('offers.index')}>
                                            <Button variant="outline" className="w-full">
                                                View All Offers <ArrowRight className="w-4 h-4 ml-2" />
                                            </Button>
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <Briefcase className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                        <p className="text-muted-foreground">No offers created yet</p>
                                        <Link href={route('offers.create')}>
                                            <Button className="mt-4">
                                                <Plus className="w-4 h-4 mr-2" /> Create Your First Offer
                                            </Button>
                                        </Link>
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
