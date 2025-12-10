<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Student;
use App\Models\Company;
use App\Models\Offer;
use App\Models\Application;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create Admin User
        $admin = User::create([
            'name' => 'Admin',
            'surname' => 'User',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role' => 'admin',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        // Create Company Users with Profiles
        $companyUsers = [
            [
                'user' => [
                    'name' => 'Tech',
                    'surname' => 'Corp',
                    'email' => 'company@techcorp.com',
                    'password' => Hash::make('password'),
                    'role' => 'company',
                    'is_active' => true,
                    'email_verified_at' => now(),
                ],
                'company' => [
                    'company_name' => 'TechCorp Solutions',
                    'domain' => 'Technology',
                    'description' => 'Leading technology company specializing in software development and digital transformation.',
                    'city' => 'Paris',
                    'country' => 'France',
                    'website' => 'https://techcorp.example.com',
                    'company_size' => 250,
                    'founded_year' => 2010,
                ],
            ],
            [
                'user' => [
                    'name' => 'Digital',
                    'surname' => 'Agency',
                    'email' => 'contact@digitalagency.com',
                    'password' => Hash::make('password'),
                    'role' => 'company',
                    'is_active' => true,
                    'email_verified_at' => now(),
                ],
                'company' => [
                    'company_name' => 'Digital Agency Pro',
                    'domain' => 'Marketing & Design',
                    'description' => 'Creative digital agency offering web design, branding, and digital marketing services.',
                    'city' => 'Lyon',
                    'country' => 'France',
                    'website' => 'https://digitalagency.example.com',
                    'company_size' => 50,
                    'founded_year' => 2015,
                ],
            ],
        ];

        $companies = [];
        foreach ($companyUsers as $data) {
            $user = User::create($data['user']);
            $companies[] = $user->company()->create($data['company']);
        }

        // Create Student Users with Profiles
        $studentUsers = [
            [
                'user' => [
                    'name' => 'Jean',
                    'surname' => 'Dupont',
                    'email' => 'jean.dupont@student.com',
                    'password' => Hash::make('password'),
                    'role' => 'student',
                    'is_active' => true,
                    'email_verified_at' => now(),
                ],
                'student' => [
                    'filiere' => 'Computer Science',
                    'niveau' => 'Master 2',
                    'competencies' => ['PHP', 'Laravel', 'React', 'JavaScript', 'MySQL'],
                    'bio' => 'Passionate about web development and eager to learn new technologies.',
                    'linkedin_url' => 'https://linkedin.com/in/jeandupont',
                    'github_url' => 'https://github.com/jeandupont',
                ],
            ],
            [
                'user' => [
                    'name' => 'Marie',
                    'surname' => 'Martin',
                    'email' => 'marie.martin@student.com',
                    'password' => Hash::make('password'),
                    'role' => 'student',
                    'is_active' => true,
                    'email_verified_at' => now(),
                ],
                'student' => [
                    'filiere' => 'Data Science',
                    'niveau' => 'Master 1',
                    'competencies' => ['Python', 'Machine Learning', 'TensorFlow', 'SQL', 'Data Visualization'],
                    'bio' => 'Aspiring data scientist with a passion for AI and machine learning.',
                    'linkedin_url' => 'https://linkedin.com/in/mariemartin',
                ],
            ],
            [
                'user' => [
                    'name' => 'Pierre',
                    'surname' => 'Bernard',
                    'email' => 'pierre.bernard@student.com',
                    'password' => Hash::make('password'),
                    'role' => 'student',
                    'is_active' => true,
                    'email_verified_at' => now(),
                ],
                'student' => [
                    'filiere' => 'Business Administration',
                    'niveau' => 'Bachelor 3',
                    'competencies' => ['Marketing', 'Project Management', 'Excel', 'Communication'],
                    'bio' => 'Looking for opportunities in marketing and business development.',
                ],
            ],
        ];

        $students = [];
        foreach ($studentUsers as $data) {
            $user = User::create($data['user']);
            $students[] = $user->student()->create($data['student']);
        }

        // Create Offers
        $offers = [
            [
                'company_id' => $companies[0]->id,
                'title' => 'Full Stack Developer Intern',
                'description' => "We are looking for a motivated Full Stack Developer Intern to join our development team.\n\nResponsibilities:\n- Develop and maintain web applications\n- Collaborate with senior developers\n- Participate in code reviews\n- Learn and apply best practices\n\nRequirements:\n- Knowledge of PHP, Laravel, and JavaScript\n- Familiarity with React or Vue.js\n- Good problem-solving skills\n- Ability to work in a team",
                'type' => 'stage',
                'status' => 'active',
                'duration' => '6 months',
                'city' => 'Paris',
                'country' => 'France',
                'is_remote' => true,
                'salary_min' => 800,
                'salary_max' => 1200,
                'salary_currency' => 'EUR',
                'salary_period' => 'month',
                'required_skills' => ['PHP', 'Laravel', 'React', 'JavaScript', 'MySQL'],
                'education_level' => 'Master',
                'experience_years' => 0,
                'start_date' => now()->addMonths(1)->format('Y-m-d'),
                'application_deadline' => now()->addWeeks(3)->format('Y-m-d'),
                'positions_available' => 2,
                'published_at' => now(),
            ],
            [
                'company_id' => $companies[0]->id,
                'title' => 'Junior Software Engineer',
                'description' => "Join our engineering team as a Junior Software Engineer.\n\nWhat you'll do:\n- Write clean, maintainable code\n- Work on exciting projects\n- Grow your technical skills\n\nWhat we're looking for:\n- Strong foundation in programming\n- Eagerness to learn\n- Team player",
                'type' => 'emploi',
                'status' => 'active',
                'duration' => 'Full-time',
                'city' => 'Paris',
                'country' => 'France',
                'is_remote' => false,
                'salary_min' => 35000,
                'salary_max' => 45000,
                'salary_currency' => 'EUR',
                'salary_period' => 'year',
                'required_skills' => ['Java', 'Spring Boot', 'SQL', 'Git'],
                'education_level' => 'Bachelor or Master',
                'experience_years' => 1,
                'start_date' => now()->addMonths(2)->format('Y-m-d'),
                'application_deadline' => now()->addMonth()->format('Y-m-d'),
                'positions_available' => 1,
                'published_at' => now(),
            ],
            [
                'company_id' => $companies[1]->id,
                'title' => 'UX/UI Design Apprentice',
                'description' => "Looking for a creative UX/UI Design Apprentice to join our design team.\n\nYou will:\n- Create user interfaces for web and mobile\n- Conduct user research\n- Work with developers to implement designs\n\nRequirements:\n- Proficiency in Figma or Sketch\n- Understanding of UX principles\n- Creative mindset",
                'type' => 'alternance',
                'status' => 'active',
                'duration' => '1 year',
                'city' => 'Lyon',
                'country' => 'France',
                'is_remote' => true,
                'salary_min' => 1000,
                'salary_max' => 1500,
                'salary_currency' => 'EUR',
                'salary_period' => 'month',
                'required_skills' => ['Figma', 'UI Design', 'UX Research', 'Prototyping'],
                'education_level' => 'Bachelor',
                'experience_years' => 0,
                'start_date' => now()->addMonths(1)->format('Y-m-d'),
                'application_deadline' => now()->addWeeks(2)->format('Y-m-d'),
                'positions_available' => 1,
                'published_at' => now(),
            ],
            [
                'company_id' => $companies[1]->id,
                'title' => 'Marketing Intern',
                'description' => "Join our marketing team as an intern!\n\nResponsibilities:\n- Assist with social media management\n- Help create marketing content\n- Support campaign analytics\n\nIdeal candidate:\n- Marketing or Communication student\n- Creative and proactive\n- Good writing skills",
                'type' => 'stage',
                'status' => 'active',
                'duration' => '3 months',
                'city' => 'Lyon',
                'country' => 'France',
                'is_remote' => true,
                'salary_min' => 600,
                'salary_max' => 800,
                'salary_currency' => 'EUR',
                'salary_period' => 'month',
                'required_skills' => ['Social Media', 'Content Creation', 'Analytics', 'Communication'],
                'education_level' => 'Bachelor',
                'experience_years' => 0,
                'start_date' => now()->addWeeks(2)->format('Y-m-d'),
                'application_deadline' => now()->addWeeks(1)->format('Y-m-d'),
                'positions_available' => 2,
                'published_at' => now(),
            ],
        ];

        $createdOffers = [];
        foreach ($offers as $offerData) {
            $createdOffers[] = Offer::create($offerData);
        }

        // Create some Applications
        Application::create([
            'student_id' => $students[0]->id,
            'offer_id' => $createdOffers[0]->id,
            'status' => 'pending',
            'cover_letter' => 'I am very interested in this Full Stack Developer position. With my experience in PHP, Laravel, and React, I believe I would be a great fit for your team.',
        ]);

        Application::create([
            'student_id' => $students[0]->id,
            'offer_id' => $createdOffers[1]->id,
            'status' => 'accepted',
            'cover_letter' => 'I am excited about the opportunity to join TechCorp as a Junior Software Engineer.',
            'reviewed_at' => now(),
        ]);

        Application::create([
            'student_id' => $students[1]->id,
            'offer_id' => $createdOffers[0]->id,
            'status' => 'pending',
            'cover_letter' => 'Although my main focus is Data Science, I have strong programming skills and would love to expand my full-stack development experience.',
        ]);

        Application::create([
            'student_id' => $students[2]->id,
            'offer_id' => $createdOffers[3]->id,
            'status' => 'pending',
            'cover_letter' => 'I am looking for an internship in marketing to apply my business administration knowledge.',
        ]);

        $this->command->info('Database seeded successfully!');
        $this->command->info('');
        $this->command->info('Test Accounts:');
        $this->command->info('Admin: admin@example.com / password');
        $this->command->info('Company: company@techcorp.com / password');
        $this->command->info('Company: contact@digitalagency.com / password');
        $this->command->info('Student: jean.dupont@student.com / password');
        $this->command->info('Student: marie.martin@student.com / password');
        $this->command->info('Student: pierre.bernard@student.com / password');
    }
}
