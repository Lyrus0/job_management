import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, ArrowRight } from 'lucide-react';

export default function StudentSetup({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Complete Your Profile
                </h2>
            }
        >
            <Head title="Complete Your Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-2xl sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader className="text-center">
                            <GraduationCap className="w-16 h-16 mx-auto text-primary mb-4" />
                            <CardTitle className="text-2xl">Welcome, {auth.user.name}!</CardTitle>
                            <CardDescription className="text-lg">
                                Let's set up your student profile to start applying for opportunities.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-muted-foreground mb-6">
                                Complete your profile with your academic information, skills, and upload your CV
                                to make the most of the platform.
                            </p>
                            <Link href={route('student.profile.create')}>
                                <Button size="lg">
                                    Set Up Profile <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
