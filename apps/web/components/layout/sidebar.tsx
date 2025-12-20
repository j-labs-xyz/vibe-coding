'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth-context';
import {
    LayoutDashboard,
    Users,
    BookOpen,
    CreditCard,
    RefreshCcw,
    Wallet,
    ClipboardCheck,
    ShieldCheck,
    BarChart3,
    LogOut
} from 'lucide-react';

const routes = [
    {
        label: 'Dashboard',
        icon: LayoutDashboard,
        href: '/dashboard',
        color: 'text-sky-500',
    },
    {
        label: 'User Management',
        icon: Users,
        href: '/dashboard/users',
        color: 'text-violet-500',
    },
    {
        label: 'Ledger',
        icon: BookOpen,
        href: '/dashboard/ledger',
        color: 'text-pink-700',
    },
    {
        label: 'Payments',
        icon: CreditCard,
        href: '/dashboard/payments',
        color: 'text-orange-700',
    },
    {
        label: 'FX',
        icon: RefreshCcw,
        href: '/dashboard/fx',
        color: 'text-emerald-500',
    },
    {
        label: 'Virtual Accounts',
        icon: Wallet,
        href: '/dashboard/accounts',
        color: 'text-green-700',
    },
    {
        label: 'Team Workflow',
        icon: ClipboardCheck,
        href: '/dashboard/workflow',
        color: 'text-cyan-500',
    },
    {
        label: 'Compliance',
        icon: ShieldCheck,
        href: '/dashboard/compliance',
        color: 'text-red-500',
    },
    {
        label: 'Reporting',
        icon: BarChart3,
        href: '/dashboard/reporting',
        color: 'text-indigo-500',
    },
];

export function Sidebar() {
    const pathname = usePathname();
    const { user, logout } = useAuth();

    return (
        <div className="space-y-4 py-4 flex flex-col h-full bg-black text-white border-r border-zinc-800">
            <div className="px-3 py-2 flex-1">
                <Link href="/dashboard" className="flex items-center pl-3 mb-14">
                    <div className="relative w-8 h-8 mr-4 rounded-full overflow-hidden border border-gold-500/50">
                        <img src="/logo.jpeg" alt="Logo" className="object-cover w-full h-full" />
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gold-300 to-gold-500 bg-clip-text text-transparent">VastLink</h1>
                </Link>
                <div className="space-y-1">
                    {routes.map((route) => (
                        <Link
                            key={route.href}
                            href={route.href}
                            className={cn(
                                'text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition',
                                pathname === route.href ? 'text-gold-400 bg-white/10' : 'text-zinc-400'
                            )}
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn('h-5 w-5 mr-3', pathname === route.href ? 'text-gold-400' : route.color)} />
                                {route.label}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
            <div className="px-3 py-2 border-t border-zinc-800">
                {user && (
                    <div className="flex items-center gap-x-3 mb-4 px-3">
                        <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-white text-sm font-bold">
                            {user.email ? user.email[0].toUpperCase() : 'U'}
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-white max-w-[150px] truncate">{user.email}</span>
                        </div>
                    </div>
                )}
                <div
                    onClick={() => logout()}
                    className="text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition text-zinc-400"
                >
                    <div className="flex items-center flex-1">
                        <LogOut className="h-5 w-5 mr-3 text-white" />
                        Sign Out
                    </div>
                </div>
            </div>
        </div>
    );
}
