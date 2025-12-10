import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, User, Offer } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Briefcase, Building2, GraduationCap, FileText, Clock, ArrowRight } from 'lucide-react';

interface Props extends PageProps {
    stats: {
        total_users: number;
        active_users: number;
        students: number;
        companies: number;
        total_offers: number;
        active_offers: number;
        total_applications: number;
        pending_applications: number;
    };
    recentUsers: User[];
    recentOffers: Offer[];
}

const roleBadge = (role: string) => {
    switch (role) {
        case 'admin':
            return <Badge variant="destructive">Admin</Badge>;
        case 'student':
            return <Badge variant="default">Student</Badge>;
        case 'company':
            return <Badge variant="secondary">Company</Badge>;
        default:
            return <Badge>{role}</Badge>;
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

export default function AdminDashboard({ auth, stats, recentUsers, recentOffers }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Admin Dashboard
                </h2>
            }
        >
            <Head title="Admin Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-4 mb-8">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                                <Users className="w-4 h-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.total_users}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stats.active_users} active
                                </p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">Students</CardTitle>
                                <GraduationCap className="w-4 h-4 text-blue-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.students}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">Companies</CardTitle>
                                <Building2 className="w-4 h-4 text-purple-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.companies}</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                                <CardTitle className="text-sm font-medium">Total Offers</CardTitle>
                                <Briefcase className="w-4 h-4 text-green-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.total_offers}</div>
                                <p className="text-xs text-muted-foreground">
                                    {stats.active_offers} active
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Second row of stats */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 mb-8">
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
                                <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
                                <Clock className="w-4 h-4 text-yellow-500" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{stats.pending_applications}</div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Recent Users */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Users</CardTitle>
                                <CardDescription>Newly registered users</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Role</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recentUsers.map((user) => (
                                            <TableRow key={user.id}>
                                                <TableCell className="font-medium">{user.name}</TableCell>
                                                <TableCell>{user.email}</TableCell>
                                                <TableCell>{roleBadge(user.role)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Link href={route('admin.users.index')}>
                                    <Button variant="outline" className="w-full mt-4">
                                        View All Users <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        {/* Recent Offers */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Recent Offers</CardTitle>
                                <CardDescription>Latest job postings</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Title</TableHead>
                                            <TableHead>Company</TableHead>
                                            <TableHead>Status</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {recentOffers.map((offer) => (
                                            <TableRow key={offer.id}>
                                                <TableCell className="font-medium">{offer.title}</TableCell>
                                                <TableCell>{offer.company?.company_name}</TableCell>
                                                <TableCell>{offerStatusBadge(offer.status)}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <Link href={route('admin.offers.index')}>
                                    <Button variant="outline" className="w-full mt-4">
                                        View All Offers <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
