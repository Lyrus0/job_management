import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, Company, Application, Offer } from '@/types';
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
    Briefcase,
    Users,
    FileText,
    Clock,
    Plus,
    ArrowRight,
    Building2,
    CheckCircle,
    Eye
} from 'lucide-react';
import GradientText from '@/components/animations/GradientText';
import CountUp from '@/components/animations/CountUp';
import FadeContent from '@/components/animations/FadeContent';

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
            return (
                <Badge className="bg-yellow-500/10 text-yellow-400 border-yellow-500/20">
                    <Clock className="w-3 h-3 mr-1" /> Pending
                </Badge>
            );
        case 'accepted':
            return (
                <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                    <CheckCircle className="w-3 h-3 mr-1" /> Accepted
                </Badge>
            );
        case 'rejected':
            return (
                <Badge className="bg-red-500/10 text-red-400 border-red-500/20">
                    Rejected
                </Badge>
            );
        default:
            return <Badge>{status}</Badge>;
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

export default function CompanyDashboard({ auth, company, stats, recentApplications, offers }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                            <Building2 className="w-4 h-4 text-purple-400" />
                            <span className="text-sm text-white/70">Company</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold">
                            <GradientText colors={['#a78bfa', '#f472b6', '#a78bfa']} className="inline">
                                {company.company_name}
                            </GradientText>
                        </h2>
                    </div>
                    <Link href={route('company.offers.create')}>
                        <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6 group">
                            <Plus className="w-4 h-4 mr-2" />
                            Post New Offer
                        </Button>
                    </Link>
                </div>
            }
        >
            <Head title="Company Dashboard" />

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <FadeContent delay={0} blur>
                    <GlassCard hover className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20">
                                <Briefcase className="w-5 h-5 text-purple-400" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            <CountUp to={stats.total_offers} duration={2} />
                        </div>
                        <p className="text-sm text-white/50">Total Offers</p>
                    </GlassCard>
                </FadeContent>

                <FadeContent delay={0.1} blur>
                    <GlassCard hover className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-xl bg-green-500/10 border border-green-500/20">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            <CountUp to={stats.active_offers} duration={2} />
                        </div>
                        <p className="text-sm text-white/50">Active Offers</p>
                    </GlassCard>
                </FadeContent>

                <FadeContent delay={0.2} blur>
                    <GlassCard hover className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                                <FileText className="w-5 h-5 text-blue-400" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            <CountUp to={stats.total_applications} duration={2} />
                        </div>
                        <p className="text-sm text-white/50">Total Applications</p>
                    </GlassCard>
                </FadeContent>

                <FadeContent delay={0.3} blur>
                    <GlassCard hover className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                                <Clock className="w-5 h-5 text-yellow-400" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            <CountUp to={stats.pending_applications} duration={2} />
                        </div>
                        <p className="text-sm text-white/50">Pending Review</p>
                    </GlassCard>
                </FadeContent>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Applications */}
                <FadeContent delay={0.4} blur>
                    <GlassCard>
                        <GlassCardHeader>
                            <GlassCardTitle>Recent Applications</GlassCardTitle>
                            <GlassCardDescription>Latest candidates for your offers</GlassCardDescription>
                        </GlassCardHeader>
                        <GlassCardContent>
                            {recentApplications.length > 0 ? (
                                <div className="space-y-3">
                                    {recentApplications.map((application) => (
                                        <div
                                            key={application.id}
                                            className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors"
                                        >
                                            <div>
                                                <h4 className="font-medium text-white">
                                                    {application.student?.user?.name} {application.student?.user?.surname}
                                                </h4>
                                                <p className="text-sm text-white/50 mt-1">
                                                    Applied for: {application.offer?.title}
                                                </p>
                                            </div>
                                            {statusBadge(application.status)}
                                        </div>
                                    ))}
                                    <Link href={route('company.applications')}>
                                        <Button className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white border-0 rounded-xl group">
                                            View All Applications
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-4">
                                        <Users className="w-8 h-8 text-white/30" />
                                    </div>
                                    <p className="text-white/50">No applications yet</p>
                                </div>
                            )}
                        </GlassCardContent>
                    </GlassCard>
                </FadeContent>

                {/* Your Offers */}
                <FadeContent delay={0.5} blur>
                    <GlassCard>
                        <GlassCardHeader>
                            <GlassCardTitle>Your Offers</GlassCardTitle>
                            <GlassCardDescription>Manage your job postings</GlassCardDescription>
                        </GlassCardHeader>
                        <GlassCardContent>
                            {offers.length > 0 ? (
                                <div className="space-y-3">
                                    {offers.map((offer) => (
                                        <Link key={offer.id} href={route('offers.show', offer.id)}>
                                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all cursor-pointer group">
                                                <div className="flex items-start justify-between">
                                                    <div>
                                                        <h4 className="font-medium text-white group-hover:text-purple-400 transition-colors">
                                                            {offer.title}
                                                        </h4>
                                                        <p className="text-sm text-white/50 flex items-center gap-1 mt-1">
                                                            <Eye className="w-3 h-3" />
                                                            {offer.applications?.length || 0} applications
                                                        </p>
                                                    </div>
                                                    {offerStatusBadge(offer.status)}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                    <Link href={route('company.offers.index')}>
                                        <Button className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white border-0 rounded-xl group">
                                            View All Offers
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-4">
                                        <Briefcase className="w-8 h-8 text-white/30" />
                                    </div>
                                    <p className="text-white/50 mb-4">No offers created yet</p>
                                    <Link href={route('company.offers.create')}>
                                        <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6">
                                            <Plus className="w-4 h-4 mr-2" />
                                            Create Your First Offer
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </GlassCardContent>
                    </GlassCard>
                </FadeContent>
            </div>
        </AuthenticatedLayout>
    );
}
