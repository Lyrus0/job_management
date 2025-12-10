import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, router } from '@inertiajs/react';
import { PageProps, Offer, PaginatedData } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Clock, Building2, Plus, Search, Filter } from 'lucide-react';
import { useState } from 'react';

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
            return <Badge variant="outline">Internship</Badge>;
        case 'emploi':
            return <Badge variant="default">Job</Badge>;
        case 'alternance':
            return <Badge variant="secondary">Apprenticeship</Badge>;
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
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        {isCompany ? 'My Offers' : 'Browse Offers'}
                    </h2>
                    {isCompany && (
                        <Link href={route('offers.create')}>
                            <Button>
                                <Plus className="w-4 h-4 mr-2" /> Post New Offer
                            </Button>
                        </Link>
                    )}
                </div>
            }
        >
            <Head title="Offers" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    {/* Search and Filters */}
                    <Card className="mb-6">
                        <CardContent className="pt-6">
                            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                                <div className="relative flex-1">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input
                                        placeholder="Search offers..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                                <select
                                    value={selectedType}
                                    onChange={(e) => setSelectedType(e.target.value)}
                                    className="px-4 py-2 border rounded-md"
                                >
                                    <option value="">All Types</option>
                                    <option value="stage">Internship</option>
                                    <option value="emploi">Job</option>
                                    <option value="alternance">Apprenticeship</option>
                                </select>
                                <Button type="submit">
                                    <Filter className="w-4 h-4 mr-2" /> Filter
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Offers Grid */}
                    {offers.data.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {offers.data.map((offer) => (
                                <Link key={offer.id} href={route('offers.show', offer.id)}>
                                    <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                                        <CardHeader>
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <CardTitle className="text-lg line-clamp-1">{offer.title}</CardTitle>
                                                    <CardDescription className="flex items-center mt-1">
                                                        <Building2 className="w-4 h-4 mr-1" />
                                                        {offer.company?.company_name}
                                                    </CardDescription>
                                                </div>
                                                {offerTypeBadge(offer.type)}
                                            </div>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                                                {offer.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                                                {offer.city && (
                                                    <span className="flex items-center">
                                                        <MapPin className="w-4 h-4 mr-1" />
                                                        {offer.city}
                                                    </span>
                                                )}
                                                {offer.is_remote && (
                                                    <Badge variant="outline">Remote</Badge>
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
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <Card>
                            <CardContent className="text-center py-12">
                                <Building2 className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                                <p className="text-muted-foreground">No offers found</p>
                                {isCompany && (
                                    <Link href={route('offers.create')}>
                                        <Button className="mt-4">
                                            <Plus className="w-4 h-4 mr-2" /> Create Your First Offer
                                        </Button>
                                    </Link>
                                )}
                            </CardContent>
                        </Card>
                    )}

                    {/* Pagination */}
                    {offers.meta.last_page > 1 && (
                        <div className="flex justify-center mt-8 gap-2">
                            {offers.meta.links.map((link, index) => (
                                <Button
                                    key={index}
                                    variant={link.active ? 'default' : 'outline'}
                                    size="sm"
                                    disabled={!link.url}
                                    onClick={() => link.url && router.get(link.url)}
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
