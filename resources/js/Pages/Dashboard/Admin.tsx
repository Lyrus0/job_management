import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, User, Offer } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    GlassCard,
    GlassCardContent,
    GlassCardHeader,
    GlassCardTitle,
    GlassCardDescription
} from '@/components/ui/glass-card';
import {
    Users,
    Briefcase,
    Building2,
    GraduationCap,
    FileText,
    Clock,
    ArrowRight,
    Shield
} from 'lucide-react';
import GradientText from '@/components/animations/GradientText';
import CountUp from '@/components/animations/CountUp';
import FadeContent from '@/components/animations/FadeContent';

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
            return <Badge className="bg-red-500/10 text-red-400 border-red-500/20">Admin</Badge>;
        case 'student':
            return <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">Student</Badge>;
        case 'company':
            return <Badge className="bg-purple-500/10 text-purple-400 border-purple-500/20">Company</Badge>;
        default:
            return <Badge>{role}</Badge>;
    }
};

const offerStatusBadge = (status: string) => {
    switch (status) {
        case 'draft':
            return <Badge className="bg-white/10 text-white/60 border-white/20">Draft</Badge>;
        case 'active':
            return <Badge className="bg-green-500/10 text-green-400 border-green-500/20">Active</Badge>;
        case 'expired':
            return <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">Expired</Badge>;
        case 'closed':
            return <Badge className="bg-red-500/10 text-red-400 border-red-500/20">Closed</Badge>;
        default:
            return <Badge>{status}</Badge>;
    }
};

export default function AdminDashboard({ auth, stats, recentUsers, recentOffers }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20">
                        <Shield className="w-4 h-4 text-red-400" />
                        <span className="text-sm text-white/70">Administrator</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold">
                        <GradientText colors={['#f87171', '#fb923c', '#f87171']} className="inline">
                            Admin Dashboard
                        </GradientText>
                    </h2>
                </div>
            }
        >
            <Head title="Admin Dashboard" />

            {/* Stats Cards - Row 1 */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <FadeContent delay={0} blur>
                    <GlassCard hover className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                <Users className="w-5 h-5 text-blue-400" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            <CountUp to={stats.total_users} duration={2} />
                        </div>
                        <p className="text-sm text-white/50">Total Users</p>
                        <p className="text-xs text-white/30 mt-1">{stats.active_users} active</p>
                    </GlassCard>
                </FadeContent>

                <FadeContent delay={0.1} blur>
                    <GlassCard hover className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                                <GraduationCap className="w-5 h-5 text-cyan-400" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            <CountUp to={stats.students} duration={2} />
                        </div>
                        <p className="text-sm text-white/50">Students</p>
                    </GlassCard>
                </FadeContent>

                <FadeContent delay={0.2} blur>
                    <GlassCard hover className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                <Building2 className="w-5 h-5 text-purple-400" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            <CountUp to={stats.companies} duration={2} />
                        </div>
                        <p className="text-sm text-white/50">Companies</p>
                    </GlassCard>
                </FadeContent>

                <FadeContent delay={0.3} blur>
                    <GlassCard hover className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-xl bg-green-500/10 border border-green-500/20">
                                <Briefcase className="w-5 h-5 text-green-400" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            <CountUp to={stats.total_offers} duration={2} />
                        </div>
                        <p className="text-sm text-white/50">Total Offers</p>
                        <p className="text-xs text-white/30 mt-1">{stats.active_offers} active</p>
                    </GlassCard>
                </FadeContent>
            </div>

            {/* Stats Cards - Row 2 */}
            <div className="grid grid-cols-2 gap-4 mb-8">
                <FadeContent delay={0.35} blur>
                    <GlassCard hover className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-xl bg-pink-500/10 border border-pink-500/20">
                                <FileText className="w-5 h-5 text-pink-400" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            <CountUp to={stats.total_applications} duration={2} />
                        </div>
                        <p className="text-sm text-white/50">Total Applications</p>
                    </GlassCard>
                </FadeContent>

                <FadeContent delay={0.4} blur>
                    <GlassCard hover className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                                <Clock className="w-5 h-5 text-yellow-400" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            <CountUp to={stats.pending_applications} duration={2} />
                        </div>
                        <p className="text-sm text-white/50">Pending Applications</p>
                    </GlassCard>
                </FadeContent>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Users */}
                <FadeContent delay={0.45} blur>
                    <GlassCard>
                        <GlassCardHeader>
                            <GlassCardTitle>Recent Users</GlassCardTitle>
                            <GlassCardDescription>Newly registered users</GlassCardDescription>
                        </GlassCardHeader>
                        <GlassCardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="text-left py-3 px-2 text-sm font-medium text-white/50">Name</th>
                                            <th className="text-left py-3 px-2 text-sm font-medium text-white/50">Email</th>
                                            <th className="text-left py-3 px-2 text-sm font-medium text-white/50">Role</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentUsers.map((user) => (
                                            <tr key={user.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="py-3 px-2 text-sm text-white font-medium">{user.name}</td>
                                                <td className="py-3 px-2 text-sm text-white/60">{user.email}</td>
                                                <td className="py-3 px-2">{roleBadge(user.role)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Link href={route('admin.users.index')}>
                                <Button className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white border-0 rounded-xl group">
                                    View All Users
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </GlassCardContent>
                    </GlassCard>
                </FadeContent>

                {/* Recent Offers */}
                <FadeContent delay={0.5} blur>
                    <GlassCard>
                        <GlassCardHeader>
                            <GlassCardTitle>Recent Offers</GlassCardTitle>
                            <GlassCardDescription>Latest job postings</GlassCardDescription>
                        </GlassCardHeader>
                        <GlassCardContent>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="text-left py-3 px-2 text-sm font-medium text-white/50">Title</th>
                                            <th className="text-left py-3 px-2 text-sm font-medium text-white/50">Company</th>
                                            <th className="text-left py-3 px-2 text-sm font-medium text-white/50">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {recentOffers.map((offer) => (
                                            <tr key={offer.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                                <td className="py-3 px-2 text-sm text-white font-medium">{offer.title}</td>
                                                <td className="py-3 px-2 text-sm text-white/60">{offer.company?.company_name}</td>
                                                <td className="py-3 px-2">{offerStatusBadge(offer.status)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Link href={route('admin.offers.index')}>
                                <Button className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white border-0 rounded-xl group">
                                    View All Offers
                                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </GlassCardContent>
                    </GlassCard>
                </FadeContent>
            </div>
        </AuthenticatedLayout>
    );
}
