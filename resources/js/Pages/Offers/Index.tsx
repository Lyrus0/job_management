import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, Offer, PaginatedData } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    GlassCard,
    GlassCardContent,
    GlassCardHeader,
    GlassCardTitle,
    GlassCardDescription
} from '@/components/ui/glass-card';
import { MapPin, Clock, Building2, Plus, Search, Filter, Briefcase, Wifi } from 'lucide-react';
import { useState } from 'react';
import GradientText from '@/components/animations/GradientText';
import FadeContent from '@/components/animations/FadeContent';
import SpotlightCard from '@/components/animations/SpotlightCard';

interface Props extends PageProps {
    offers: PaginatedData<Offer>;
    filters: {
        search?: string;
        type?: string;
        city?: string;
        remote?: boolean;
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

export default function OffersIndex({ auth, offers, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [selectedType, setSelectedType] = useState(filters.type || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(route('offers.index'), { search, type: selectedType }, { preserveState: true });
    };

    const isCompany = auth.user.role === 'company';

    return (
        <AuthenticatedLayout
            header={
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20">
                            <Briefcase className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-white/70">Opportunities</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-bold">
                            <GradientText colors={['#60a5fa', '#a78bfa', '#60a5fa']} className="inline">
                                {isCompany ? 'My Offers' : 'Browse Offers'}
                            </GradientText>
                        </h2>
                    </div>
                    {isCompany && (
                        <Link href={route('company.offers.create')}>
                            <Button className="bg-white text-black hover:bg-white/90 rounded-full px-6">
                                <Plus className="w-4 h-4 mr-2" /> Post New Offer
                            </Button>
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Offers" />

            {/* Search and Filters */}
            <FadeContent blur className="mb-8">
                <GlassCard className="p-6">
                    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                            <Input
                                placeholder="Search offers..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-12 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 rounded-xl focus:border-blue-500/50 focus:ring-blue-500/20"
                            />
                        </div>
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="h-12 px-4 bg-white/5 border border-white/10 text-white rounded-xl focus:border-blue-500/50 focus:ring-blue-500/20 focus:outline-none"
                        >
                            <option value="" className="bg-black">All Types</option>
                            <option value="stage" className="bg-black">Internship</option>
                            <option value="emploi" className="bg-black">Job</option>
                            <option value="alternance" className="bg-black">Apprenticeship</option>
                        </select>
                        <Button
                            type="submit"
                            className="h-12 bg-white text-black hover:bg-white/90 rounded-xl px-6"
                        >
                            <Filter className="w-4 h-4 mr-2" /> Filter
                        </Button>
                    </form>
                </GlassCard>
            </FadeContent>

            {/* Offers Grid */}
            {offers.data.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {offers.data.map((offer, index) => (
                        <FadeContent key={offer.id} delay={index * 0.05} blur>
                            <Link href={route('offers.show', offer.id)}>
                                <SpotlightCard
                                    className="h-full bg-white/5 border-white/10 hover:border-white/20 transition-all cursor-pointer group"
                                    spotlightColor="rgba(99, 102, 241, 0.15)"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            <h3 className="text-lg font-semibold text-white line-clamp-1 group-hover:text-blue-400 transition-colors">
                                                {offer.title}
                                            </h3>
                                            <div className="flex items-center text-white/50 text-sm mt-1">
                                                <Building2 className="w-4 h-4 mr-1" />
                                                {offer.company?.company_name}
                                            </div>
                                        </div>
                                        {offerTypeBadge(offer.type)}
                                    </div>
                                    <p className="text-sm text-white/40 line-clamp-2 mb-4">
                                        {offer.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 text-sm">
                                        {offer.city && (
                                            <span className="flex items-center text-white/40">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                {offer.city}
                                            </span>
                                        )}
                                        {offer.is_remote && (
                                            <Badge className="bg-cyan-500/10 text-cyan-400 border-cyan-500/20">
                                                <Wifi className="w-3 h-3 mr-1" /> Remote
                                            </Badge>
                                        )}
                                        {offer.duration && (
                                            <span className="flex items-center text-white/40">
                                                <Clock className="w-4 h-4 mr-1" />
                                                {offer.duration}
                                            </span>
                                        )}
                                    </div>
                                </SpotlightCard>
                            </Link>
                        </FadeContent>
                    ))}
                </div>
            ) : (
                <FadeContent blur>
                    <GlassCard className="text-center py-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-white/5 border border-white/10 mb-6">
                            <Briefcase className="w-10 h-10 text-white/30" />
                        </div>
                        <p className="text-white/50 text-lg mb-6">No offers found</p>
                        {isCompany && (
                            <Link href={route('company.offers.create')}>
                                <Button className="bg-white text-black hover:bg-white/90 rounded-full px-8">
                                    <Plus className="w-4 h-4 mr-2" /> Create Your First Offer
                                </Button>
                            </Link>
                        )}
                    </GlassCard>
                </FadeContent>
            )}

            {/* Pagination */}
            {offers.meta.last_page > 1 && (
                <FadeContent delay={0.3} className="flex justify-center mt-8 gap-2">
                    {offers.meta.links.map((link, index) => (
                        <Button
                            key={index}
                            className={`rounded-xl ${
                                link.active
                                    ? 'bg-white text-black'
                                    : 'bg-white/10 text-white hover:bg-white/20 border-0'
                            }`}
                            size="sm"
                            disabled={!link.url}
                            onClick={() => link.url && router.get(link.url)}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </FadeContent>
            )}
        </AuthenticatedLayout>
    );
}
