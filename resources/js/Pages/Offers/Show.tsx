import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, router } from '@inertiajs/react';
import { PageProps, Offer, Application } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    MapPin, Clock, Building2, Calendar, DollarSign,
    GraduationCap, Briefcase, Globe, Edit, Trash2,
    CheckCircle, XCircle, Users, Send
} from 'lucide-react';

interface Props extends PageProps {
    offer: Offer;
    hasApplied: boolean;
    application: Application | null;
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

const statusBadge = (status: string) => {
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

const applicationStatusBadge = (status: string) => {
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

export default function OfferShow({ auth, offer, hasApplied, application }: Props) {
    const isStudent = auth.user.role === 'student';
    const isCompany = auth.user.role === 'company';
    const isOwner = isCompany && auth.user.company?.id === offer.company_id;
    const isAdmin = auth.user.role === 'admin';

    const { data, setData, post, processing, errors } = useForm({
        cover_letter: '',
    });

    const handleApply = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('applications.store', offer.id));
    };

    const handlePublish = () => {
        router.post(route('offers.publish', offer.id));
    };

    const handleClose = () => {
        router.post(route('offers.close', offer.id));
    };

    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this offer?')) {
            router.delete(route('offers.destroy', offer.id));
        }
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Offer Details
                    </h2>
                    {(isOwner || isAdmin) && (
                        <div className="flex gap-2">
                            {offer.status === 'draft' && (
                                <Button onClick={handlePublish}>
                                    <Send className="w-4 h-4 mr-2" /> Publish
                                </Button>
                            )}
                            {offer.status === 'active' && (
                                <Button variant="outline" onClick={handleClose}>
                                    Close Offer
                                </Button>
                            )}
                            <Link href={route('offers.edit', offer.id)}>
                                <Button variant="outline">
                                    <Edit className="w-4 h-4 mr-2" /> Edit
                                </Button>
                            </Link>
                            {isOwner && (
                                <Link href={route('offers.applications', offer.id)}>
                                    <Button variant="outline">
                                        <Users className="w-4 h-4 mr-2" /> Applications
                                    </Button>
                                </Link>
                            )}
                            <Button variant="destructive" onClick={handleDelete}>
                                <Trash2 className="w-4 h-4 mr-2" /> Delete
                            </Button>
                        </div>
                    )}
                </div>
            }
        >
            <Head title={offer.title} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="text-2xl">{offer.title}</CardTitle>
                                            <CardDescription className="flex items-center mt-2 text-base">
                                                <Building2 className="w-4 h-4 mr-2" />
                                                {offer.company?.company_name}
                                            </CardDescription>
                                        </div>
                                        <div className="flex flex-col gap-2 items-end">
                                            {offerTypeBadge(offer.type)}
                                            {statusBadge(offer.status)}
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
                                        {offer.city && (
                                            <span className="flex items-center">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                {offer.city}{offer.country && `, ${offer.country}`}
                                            </span>
                                        )}
                                        {offer.is_remote && (
                                            <span className="flex items-center">
                                                <Globe className="w-4 h-4 mr-1" />
                                                Remote
                                            </span>
                                        )}
                                        {offer.duration && (
                                            <span className="flex items-center">
                                                <Clock className="w-4 h-4 mr-1" />
                                                {offer.duration}
                                            </span>
                                        )}
                                        {offer.salary_min && (
                                            <span className="flex items-center">
                                                <DollarSign className="w-4 h-4 mr-1" />
                                                {offer.salary_min} - {offer.salary_max} {offer.salary_currency}/{offer.salary_period}
                                            </span>
                                        )}
                                    </div>

                                    <div className="prose max-w-none">
                                        <h3 className="text-lg font-semibold mb-2">Description</h3>
                                        <p className="whitespace-pre-wrap">{offer.description}</p>
                                    </div>

                                    {offer.required_skills && offer.required_skills.length > 0 && (
                                        <div className="mt-6">
                                            <h3 className="text-lg font-semibold mb-2">Required Skills</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {offer.required_skills.map((skill, index) => (
                                                    <Badge key={index} variant="outline">{skill}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="grid grid-cols-2 gap-4 mt-6 text-sm">
                                        {offer.education_level && (
                                            <div className="flex items-center">
                                                <GraduationCap className="w-4 h-4 mr-2 text-muted-foreground" />
                                                <span>Education: {offer.education_level}</span>
                                            </div>
                                        )}
                                        {offer.experience_years !== null && (
                                            <div className="flex items-center">
                                                <Briefcase className="w-4 h-4 mr-2 text-muted-foreground" />
                                                <span>Experience: {offer.experience_years}+ years</span>
                                            </div>
                                        )}
                                        {offer.start_date && (
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                                                <span>Start: {new Date(offer.start_date).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                        {offer.application_deadline && (
                                            <div className="flex items-center">
                                                <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
                                                <span>Deadline: {new Date(offer.application_deadline).toLocaleDateString()}</span>
                                            </div>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Company Info */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-lg">About the Company</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <h4 className="font-semibold">{offer.company?.company_name}</h4>
                                    {offer.company?.domain && (
                                        <p className="text-sm text-muted-foreground mt-1">{offer.company.domain}</p>
                                    )}
                                    {offer.company?.description && (
                                        <p className="text-sm mt-2 line-clamp-4">{offer.company.description}</p>
                                    )}
                                    {offer.company?.website && (
                                        <a
                                            href={offer.company.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-primary hover:underline mt-2 inline-block"
                                        >
                                            Visit Website
                                        </a>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Application Section */}
                            {isStudent && (
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="text-lg">Apply for this position</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        {hasApplied ? (
                                            <div className="text-center">
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    You have already applied to this offer
                                                </p>
                                                {application && applicationStatusBadge(application.status)}
                                                {application?.status === 'pending' && (
                                                    <Button
                                                        variant="outline"
                                                        className="w-full mt-4"
                                                        onClick={() => router.post(route('applications.withdraw', application.id))}
                                                    >
                                                        Withdraw Application
                                                    </Button>
                                                )}
                                            </div>
                                        ) : offer.status === 'active' ? (
                                            <form onSubmit={handleApply}>
                                                <div className="space-y-4">
                                                    <div>
                                                        <Label htmlFor="cover_letter">Cover Letter (Optional)</Label>
                                                        <Textarea
                                                            id="cover_letter"
                                                            placeholder="Tell the company why you're a great fit..."
                                                            value={data.cover_letter}
                                                            onChange={(e) => setData('cover_letter', e.target.value)}
                                                            className="mt-1"
                                                            rows={5}
                                                        />
                                                        {errors.cover_letter && (
                                                            <p className="text-sm text-red-500 mt-1">{errors.cover_letter}</p>
                                                        )}
                                                    </div>
                                                    <Button type="submit" className="w-full" disabled={processing}>
                                                        {processing ? 'Submitting...' : 'Submit Application'}
                                                    </Button>
                                                </div>
                                            </form>
                                        ) : (
                                            <p className="text-sm text-muted-foreground text-center">
                                                This offer is no longer accepting applications
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
