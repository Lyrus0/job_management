import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';

export default function CreateOffer({ auth }: PageProps) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        type: 'stage',
        duration: '',
        location: '',
        city: '',
        country: '',
        is_remote: false,
        salary_min: '',
        salary_max: '',
        salary_currency: 'EUR',
        salary_period: 'month',
        required_skills: '',
        education_level: '',
        experience_years: '',
        start_date: '',
        application_deadline: '',
        positions_available: '1',
    });

    const handleSubmit = (e: React.FormEvent, saveAsDraft = false) => {
        e.preventDefault();
        const formData = {
            ...data,
            status: saveAsDraft ? 'draft' : 'active',
            required_skills: data.required_skills ? data.required_skills.split(',').map(s => s.trim()) : [],
            salary_min: data.salary_min || null,
            salary_max: data.salary_max || null,
            experience_years: data.experience_years || null,
        };
        post(route('offers.store'), { data: formData });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center gap-4">
                    <Link href={route('offers.index')}>
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="w-4 h-4" />
                        </Button>
                    </Link>
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        Create New Offer
                    </h2>
                </div>
            }
        >
            <Head title="Create Offer" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Offer Details</CardTitle>
                            <CardDescription>
                                Fill in the details for your job offer
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
                                {/* Basic Info */}
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Job Title *</Label>
                                        <Input
                                            id="title"
                                            value={data.title}
                                            onChange={(e) => setData('title', e.target.value)}
                                            placeholder="e.g., Software Engineer Intern"
                                            className="mt-1"
                                        />
                                        {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="description">Description *</Label>
                                        <Textarea
                                            id="description"
                                            value={data.description}
                                            onChange={(e) => setData('description', e.target.value)}
                                            placeholder="Describe the role, responsibilities, and requirements..."
                                            className="mt-1"
                                            rows={6}
                                        />
                                        {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description}</p>}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="type">Type *</Label>
                                            <select
                                                id="type"
                                                value={data.type}
                                                onChange={(e) => setData('type', e.target.value)}
                                                className="w-full mt-1 px-3 py-2 border rounded-md"
                                            >
                                                <option value="stage">Internship</option>
                                                <option value="emploi">Job</option>
                                                <option value="alternance">Apprenticeship</option>
                                            </select>
                                        </div>
                                        <div>
                                            <Label htmlFor="duration">Duration</Label>
                                            <Input
                                                id="duration"
                                                value={data.duration}
                                                onChange={(e) => setData('duration', e.target.value)}
                                                placeholder="e.g., 6 months"
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Location */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold">Location</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="city">City</Label>
                                            <Input
                                                id="city"
                                                value={data.city}
                                                onChange={(e) => setData('city', e.target.value)}
                                                placeholder="e.g., Paris"
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="country">Country</Label>
                                            <Input
                                                id="country"
                                                value={data.country}
                                                onChange={(e) => setData('country', e.target.value)}
                                                placeholder="e.g., France"
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="is_remote"
                                            checked={data.is_remote}
                                            onChange={(e) => setData('is_remote', e.target.checked)}
                                            className="rounded"
                                        />
                                        <Label htmlFor="is_remote">Remote work available</Label>
                                    </div>
                                </div>

                                {/* Salary */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold">Compensation (Optional)</h3>
                                    <div className="grid grid-cols-4 gap-4">
                                        <div>
                                            <Label htmlFor="salary_min">Min Salary</Label>
                                            <Input
                                                id="salary_min"
                                                type="number"
                                                value={data.salary_min}
                                                onChange={(e) => setData('salary_min', e.target.value)}
                                                placeholder="0"
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="salary_max">Max Salary</Label>
                                            <Input
                                                id="salary_max"
                                                type="number"
                                                value={data.salary_max}
                                                onChange={(e) => setData('salary_max', e.target.value)}
                                                placeholder="0"
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="salary_currency">Currency</Label>
                                            <select
                                                id="salary_currency"
                                                value={data.salary_currency}
                                                onChange={(e) => setData('salary_currency', e.target.value)}
                                                className="w-full mt-1 px-3 py-2 border rounded-md"
                                            >
                                                <option value="EUR">EUR</option>
                                                <option value="USD">USD</option>
                                                <option value="GBP">GBP</option>
                                            </select>
                                        </div>
                                        <div>
                                            <Label htmlFor="salary_period">Period</Label>
                                            <select
                                                id="salary_period"
                                                value={data.salary_period}
                                                onChange={(e) => setData('salary_period', e.target.value)}
                                                className="w-full mt-1 px-3 py-2 border rounded-md"
                                            >
                                                <option value="hour">Per Hour</option>
                                                <option value="month">Per Month</option>
                                                <option value="year">Per Year</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                {/* Requirements */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold">Requirements</h3>
                                    <div>
                                        <Label htmlFor="required_skills">Required Skills (comma-separated)</Label>
                                        <Input
                                            id="required_skills"
                                            value={data.required_skills}
                                            onChange={(e) => setData('required_skills', e.target.value)}
                                            placeholder="e.g., JavaScript, React, Node.js"
                                            className="mt-1"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="education_level">Education Level</Label>
                                            <Input
                                                id="education_level"
                                                value={data.education_level}
                                                onChange={(e) => setData('education_level', e.target.value)}
                                                placeholder="e.g., Bachelor's Degree"
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="experience_years">Experience (years)</Label>
                                            <Input
                                                id="experience_years"
                                                type="number"
                                                value={data.experience_years}
                                                onChange={(e) => setData('experience_years', e.target.value)}
                                                placeholder="0"
                                                min="0"
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Dates */}
                                <div className="space-y-4">
                                    <h3 className="font-semibold">Timeline</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <div>
                                            <Label htmlFor="start_date">Start Date</Label>
                                            <Input
                                                id="start_date"
                                                type="date"
                                                value={data.start_date}
                                                onChange={(e) => setData('start_date', e.target.value)}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="application_deadline">Application Deadline</Label>
                                            <Input
                                                id="application_deadline"
                                                type="date"
                                                value={data.application_deadline}
                                                onChange={(e) => setData('application_deadline', e.target.value)}
                                                className="mt-1"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="positions_available">Positions Available</Label>
                                            <Input
                                                id="positions_available"
                                                type="number"
                                                value={data.positions_available}
                                                onChange={(e) => setData('positions_available', e.target.value)}
                                                min="1"
                                                className="mt-1"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4 pt-4">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={(e) => handleSubmit(e, true)}
                                        disabled={processing}
                                    >
                                        Save as Draft
                                    </Button>
                                    <Button type="submit" disabled={processing}>
                                        {processing ? 'Creating...' : 'Publish Offer'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
