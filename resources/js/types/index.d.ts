import { Config } from 'ziggy-js';

export interface User {
    id: number;
    name: string;
    surname?: string;
    email: string;
    email_verified_at?: string;
    role: 'admin' | 'student' | 'company';
    is_active: boolean;
    workos_id?: string;
    created_at: string;
    updated_at: string;
    student?: Student;
    company?: Company;
}

export interface Student {
    id: number;
    user_id: number;
    filiere?: string;
    niveau?: string;
    cv_path?: string;
    competencies?: string[];
    bio?: string;
    phone?: string;
    linkedin_url?: string;
    github_url?: string;
    portfolio_url?: string;
    created_at: string;
    updated_at: string;
    user?: User;
}

export interface Company {
    id: number;
    user_id: number;
    company_name: string;
    domain?: string;
    description?: string;
    address?: string;
    city?: string;
    country?: string;
    postal_code?: string;
    website?: string;
    phone?: string;
    logo_path?: string;
    representative_name?: string;
    representative_position?: string;
    company_size?: number;
    founded_year?: number;
    created_at: string;
    updated_at: string;
    user?: User;
}

export interface Offer {
    id: number;
    company_id: number;
    title: string;
    description: string;
    type: 'stage' | 'emploi' | 'alternance';
    status: 'draft' | 'active' | 'expired' | 'closed';
    duration?: string;
    location?: string;
    city?: string;
    country?: string;
    is_remote: boolean;
    salary_min?: number;
    salary_max?: number;
    salary_currency: string;
    salary_period?: 'hour' | 'month' | 'year';
    required_skills?: string[];
    education_level?: string;
    experience_years?: number;
    start_date?: string;
    application_deadline?: string;
    positions_available: number;
    published_at?: string;
    expired_at?: string;
    created_at: string;
    updated_at: string;
    company?: Company;
    applications?: Application[];
}

export interface Application {
    id: number;
    student_id: number;
    offer_id: number;
    status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
    cover_letter?: string;
    cv_path?: string;
    company_notes?: string;
    reviewed_at?: string;
    reviewed_by?: number;
    created_at: string;
    updated_at: string;
    student?: Student;
    offer?: Offer;
    reviewer?: User;
}

export interface PaginatedData<T> {
    data: T[];
    links: {
        first: string;
        last: string;
        prev: string | null;
        next: string | null;
    };
    meta: {
        current_page: number;
        from: number;
        last_page: number;
        links: Array<{
            url: string | null;
            label: string;
            active: boolean;
        }>;
        path: string;
        per_page: number;
        to: number;
        total: number;
    };
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    flash?: {
        success?: string;
        error?: string;
    };
};
