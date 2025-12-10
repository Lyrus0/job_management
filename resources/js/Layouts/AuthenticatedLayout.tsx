import { Link, usePage } from '@inertiajs/react';
import { PropsWithChildren, ReactNode, useState } from 'react';
import {
    Briefcase,
    LayoutDashboard,
    FileText,
    Users,
    Building2,
    Settings,
    LogOut,
    Menu,
    X,
    ChevronDown,
    User,
    Bell
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import FadeContent from '@/components/animations/FadeContent';
import Aurora from '@/components/animations/Aurora';

interface NavItem {
    name: string;
    href: string;
    icon: React.ElementType;
    current: boolean;
}

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    const { auth } = usePage().props as any;
    const user = auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

    // Navigation items based on user role
    const getNavItems = (): NavItem[] => {
        const baseItems: NavItem[] = [
            {
                name: 'Dashboard',
                href: route('dashboard'),
                icon: LayoutDashboard,
                current: route().current('dashboard')
            },
        ];

        if (user.role === 'student') {
            return [
                ...baseItems,
                {
                    name: 'Browse Offers',
                    href: route('offers.index'),
                    icon: Briefcase,
                    current: route().current('offers.*')
                },
                {
                    name: 'My Applications',
                    href: route('student.applications'),
                    icon: FileText,
                    current: route().current('student.applications')
                },
                {
                    name: 'My Profile',
                    href: route('student.profile'),
                    icon: User,
                    current: route().current('student.profile')
                },
            ];
        }

        if (user.role === 'company') {
            return [
                ...baseItems,
                {
                    name: 'My Offers',
                    href: route('company.offers.index'),
                    icon: Briefcase,
                    current: route().current('company.offers.*')
                },
                {
                    name: 'Applications',
                    href: route('company.applications'),
                    icon: FileText,
                    current: route().current('company.applications')
                },
                {
                    name: 'Company Profile',
                    href: route('company.profile'),
                    icon: Building2,
                    current: route().current('company.profile')
                },
            ];
        }

        if (user.role === 'admin') {
            return [
                ...baseItems,
                {
                    name: 'Users',
                    href: route('admin.users.index'),
                    icon: Users,
                    current: route().current('admin.users.*')
                },
                {
                    name: 'All Offers',
                    href: route('admin.offers.index'),
                    icon: Briefcase,
                    current: route().current('admin.offers.*')
                },
            ];
        }

        return baseItems;
    };

    const navItems = getNavItems();

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Background Aurora Effect */}
            <div className="fixed inset-0 pointer-events-none">
                <Aurora
                    colorStops={['#3b82f6', '#8b5cf6', '#ec4899']}
                    className="opacity-20"
                />
            </div>

            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl px-6 py-3">
                        <div className="flex justify-between items-center">
                            {/* Logo */}
                            <Link href="/" className="flex items-center group">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity" />
                                    <div className="relative bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-xl">
                                        <Briefcase className="h-5 w-5 text-white" />
                                    </div>
                                </div>
                                <span className="ml-3 text-lg font-semibold tracking-tight hidden sm:block">JobConnect</span>
                            </Link>

                            {/* Desktop Navigation */}
                            <div className="hidden md:flex items-center gap-1">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                            item.current
                                                ? 'bg-white/10 text-white'
                                                : 'text-white/60 hover:text-white hover:bg-white/5'
                                        }`}
                                    >
                                        <item.icon className="w-4 h-4" />
                                        {item.name}
                                    </Link>
                                ))}
                            </div>

                            {/* Right side */}
                            <div className="flex items-center gap-3">
                                {/* Notifications */}
                                <button className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                                    <Bell className="w-5 h-5" />
                                </button>

                                {/* User Menu */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">
                                            {user.name.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="hidden sm:block text-sm font-medium">{user.name}</span>
                                        <ChevronDown className="w-4 h-4" />
                                    </button>

                                    {/* Dropdown */}
                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-2 w-56 backdrop-blur-xl bg-black/80 border border-white/10 rounded-xl overflow-hidden shadow-2xl">
                                            <div className="px-4 py-3 border-b border-white/10">
                                                <p className="text-sm font-medium text-white">{user.name}</p>
                                                <p className="text-xs text-white/50">{user.email}</p>
                                            </div>
                                            <div className="py-1">
                                                <Link
                                                    href={route('profile.edit')}
                                                    className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                                                >
                                                    <Settings className="w-4 h-4" />
                                                    Settings
                                                </Link>
                                                <Link
                                                    href={route('logout')}
                                                    method="post"
                                                    as="button"
                                                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 transition-colors"
                                                >
                                                    <LogOut className="w-4 h-4" />
                                                    Log Out
                                                </Link>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Mobile menu button */}
                                <button
                                    onClick={() => setShowingNavigationDropdown(!showingNavigationDropdown)}
                                    className="md:hidden p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-colors"
                                >
                                    {showingNavigationDropdown ? (
                                        <X className="w-6 h-6" />
                                    ) : (
                                        <Menu className="w-6 h-6" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Mobile Navigation */}
                        {showingNavigationDropdown && (
                            <div className="md:hidden mt-4 pt-4 border-t border-white/10">
                                <div className="space-y-1">
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                                item.current
                                                    ? 'bg-white/10 text-white'
                                                    : 'text-white/60 hover:text-white hover:bg-white/5'
                                            }`}
                                        >
                                            <item.icon className="w-5 h-5" />
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="relative pt-24 pb-12 min-h-screen">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Page Header */}
                    {header && (
                        <FadeContent blur className="mb-8">
                            {header}
                        </FadeContent>
                    )}

                    {/* Page Content */}
                    <FadeContent delay={0.1} blur>
                        {children}
                    </FadeContent>
                </div>
            </main>

            {/* Click outside to close user menu */}
            {showUserMenu && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                />
            )}
        </div>
    );
}
