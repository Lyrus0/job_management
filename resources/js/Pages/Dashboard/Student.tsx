import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps, Student, Application, Offer } from '@/types';
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
    FileText,
    CheckCircle,
    XCircle,
    Clock,
    ArrowRight,
    MapPin,
    Building2,
    Sparkles
} from 'lucide-react';
import GradientText from '@/components/animations/GradientText';
import CountUp from '@/components/animations/CountUp';
import FadeContent from '@/components/animations/FadeContent';

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
                    <XCircle className="w-3 h-3 mr-1" /> Rejected
                </Badge>
            );
        case 'withdrawn':
            return (
                <Badge className="bg-white/10 text-white/60 border-white/20">
                    Withdrawn
                </Badge>
            );
        default:
            return <Badge>{status}</Badge>;
    }
};

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

export default function StudentDashboard({ auth, student, stats, recentApplications, recommendedOffers }: Props) {
    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
                        <Sparkles className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-white/70">Student</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-bold">
                        Welcome back, <GradientText colors={['#60a5fa', '#a78bfa', '#60a5fa']} className="inline">{auth.user.name}</GradientText>
                    </h2>
                </div>
            }
        >
            <Head title="Student Dashboard" />

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <FadeContent delay={0} blur>
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

                <FadeContent delay={0.1} blur>
                    <GlassCard hover className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
                                <Clock className="w-5 h-5 text-yellow-400" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            <CountUp to={stats.pending_applications} duration={2} />
                        </div>
                        <p className="text-sm text-white/50">Pending</p>
                    </GlassCard>
                </FadeContent>

                <FadeContent delay={0.2} blur>
                    <GlassCard hover className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-xl bg-green-500/10 border border-green-500/20">
                                <CheckCircle className="w-5 h-5 text-green-400" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            <CountUp to={stats.accepted_applications} duration={2} />
                        </div>
                        <p className="text-sm text-white/50">Accepted</p>
                    </GlassCard>
                </FadeContent>

                <FadeContent delay={0.3} blur>
                    <GlassCard hover className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/20">
                                <XCircle className="w-5 h-5 text-red-400" />
                            </div>
                        </div>
                        <div className="text-3xl font-bold text-white mb-1">
                            <CountUp to={stats.rejected_applications} duration={2} />
                        </div>
                        <p className="text-sm text-white/50">Rejected</p>
                    </GlassCard>
                </FadeContent>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Applications */}
                <FadeContent delay={0.4} blur>
                    <GlassCard>
                        <GlassCardHeader>
                            <GlassCardTitle>Recent Applications</GlassCardTitle>
                            <GlassCardDescription>Your latest job applications</GlassCardDescription>
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
                                                <h4 className="font-medium text-white">{application.offer?.title}</h4>
                                                <p className="text-sm text-white/50 flex items-center gap-1 mt-1">
                                                    <Building2 className="w-3 h-3" />
                                                    {application.offer?.company?.company_name}
                                                </p>
                                            </div>
                                            {statusBadge(application.status)}
                                        </div>
                                    ))}
                                    <Link href={route('student.applications')}>
                                        <Button className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white border-0 rounded-xl group">
                                            View All Applications
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-4">
                                        <FileText className="w-8 h-8 text-white/30" />
                                    </div>
                                    <p className="text-white/50 mb-4">No applications yet</p>
                                    <Link href={route('offers.index')}>
                                        <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6">
                                            Browse Offers
                                        </Button>
                                    </Link>
                                </div>
                            )}
                        </GlassCardContent>
                    </GlassCard>
                </FadeContent>

                {/* Recommended Offers */}
                <FadeContent delay={0.5} blur>
                    <GlassCard>
                        <GlassCardHeader>
                            <GlassCardTitle>Recommended Offers</GlassCardTitle>
                            <GlassCardDescription>New opportunities for you</GlassCardDescription>
                        </GlassCardHeader>
                        <GlassCardContent>
                            {recommendedOffers.length > 0 ? (
                                <div className="space-y-3">
                                    {recommendedOffers.map((offer) => (
                                        <Link key={offer.id} href={route('offers.show', offer.id)}>
                                            <div className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/[0.07] hover:border-white/20 transition-all cursor-pointer group">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h4 className="font-medium text-white group-hover:text-blue-400 transition-colors">
                                                            {offer.title}
                                                        </h4>
                                                        <p className="text-sm text-white/50 flex items-center gap-1 mt-1">
                                                            <Building2 className="w-3 h-3" />
                                                            {offer.company?.company_name}
                                                        </p>
                                                        <p className="text-sm text-white/40 flex items-center gap-1 mt-1">
                                                            <MapPin className="w-3 h-3" />
                                                            {offer.city}{offer.is_remote && ' (Remote)'}
                                                        </p>
                                                    </div>
                                                    {offerTypeBadge(offer.type)}
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                    <Link href={route('offers.index')}>
                                        <Button className="w-full mt-4 bg-white/10 hover:bg-white/20 text-white border-0 rounded-xl group">
                                            Browse All Offers
                                            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 mb-4">
                                        <Briefcase className="w-8 h-8 text-white/30" />
                                    </div>
                                    <p className="text-white/50">No offers available at the moment</p>
                                </div>
                            )}
                        </GlassCardContent>
                    </GlassCard>
                </FadeContent>
            </div>
        </AuthenticatedLayout>
    );
}
