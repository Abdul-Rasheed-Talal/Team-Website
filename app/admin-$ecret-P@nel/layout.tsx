'use client'

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Users,
    Briefcase,
    MessageSquare,
    LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const isLoginPage = pathname.endsWith('admin-$ecret-P@nel');

    if (isLoginPage) {
        return <>{children}</>;
    }

    const navItems = [
        { href: "/admin-$ecret-P@nel/dashboard", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin-$ecret-P@nel/blog", label: "Blog", icon: FileText },
        { href: "/admin-$ecret-P@nel/team", label: "Team", icon: Users },
        { href: "/admin-$ecret-P@nel/jobs", label: "Jobs", icon: Briefcase },
        { href: "/admin-$ecret-P@nel/contact", label: "Contact", icon: MessageSquare },
    ];

    return (
        <div className="flex min-h-screen bg-gray-100 dark:bg-zinc-950">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-zinc-900 border-r border-gray-200 dark:border-zinc-800 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-200 dark:border-zinc-800">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                        Admin Panel
                    </h2>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = pathname.startsWith(item.href);

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                                        ? "bg-blue-50 text-blue-600 dark:bg-blue-950/30 dark:text-blue-400"
                                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-zinc-800"
                                    }`}
                            >
                                <Icon className="w-5 h-5" />
                                <span className="font-medium">{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-zinc-800">
                    <form action="/api/admin/auth/logout" method="POST">
                        <Button variant="outline" className="w-full gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 border-red-200 dark:border-red-900/50">
                            <LogOut className="w-4 h-4" />
                            Sign Out
                        </Button>
                    </form>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}
