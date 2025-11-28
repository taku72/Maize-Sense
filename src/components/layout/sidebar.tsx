// src/components/layout/sidebar.tsx
'use client';

import { useSupabase } from '@/contexts/SupabaseContext';
import { Home, Scan, History, BarChart2, User, LogOut, Users, Settings, FileText, Shield, ChevronDown, ChevronRight, Activity, Leaf, Calendar } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export function Sidebar() {
  const { user, logout } = useSupabase();
  const pathname = usePathname();
  const router = useRouter();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [adminDropdownOpen, setAdminDropdownOpen] = useState(false);
  
  const isAdmin = user?.role === 'admin';
  const isFarmer = user?.role === 'farmer' || user?.role === 'user';

  const userNavItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Activity },
    { name: 'Scan', href: '/scan', icon: Scan },
    { name: 'History', href: '/history', icon: Calendar },
    { name: 'Diseases', href: '/diseases', icon: Leaf },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const adminNavItems = [
    { name: 'Manage Users', href: '/admin/users', icon: Users },
    { name: 'Admin Approvals', href: '/admin/approvals', icon: Shield },
    { name: 'Settings', href: '/admin/settings', icon: Settings },
    { name: 'Reports', href: '/admin/reports', icon: FileText },
  ];

  return (
    <div className="hidden bg-background md:flex md:w-64 md:flex-col">
      <div className="flex h-full min-h-0 flex-col">
        <div className="flex h-16 items-center px-4 sticky top-0 z-50 bg-background">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">MaizeAI</span>
          </Link>
        </div>
        <div className="flex-1 overflow-y-auto">
          <nav className="space-y-1 p-2">
            {/* User Dashboard Dropdown */}
            <div>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={cn(
                  "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  pathname.startsWith('/dashboard') || pathname.startsWith('/scan') || pathname.startsWith('/history') || pathname.startsWith('/diseases') || pathname === '/profile'
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-accent hover:text-accent-foreground"
                )}
              >
                <Activity className="mr-3 h-5 w-5" />
                <span className="flex-1 text-left">User Dashboard</span>
                {userDropdownOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              
              {userDropdownOpen && (
                <div className="ml-4 mt-1 space-y-1">
                  {userNavItems.map((item) => (
                    <button
                      key={item.href}
                      onClick={() => router.push(item.href)}
                      className={cn(
                        "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors text-left",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <item.icon className="mr-3 h-4 w-4" />
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Admin Dashboard Dropdown - Only show for admins */}
            {isAdmin && (
              <div>
                <button
                  onClick={() => setAdminDropdownOpen(!adminDropdownOpen)}
                  className={cn(
                    "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    pathname.startsWith('/admin')
                      ? "bg-accent text-accent-foreground"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Shield className="mr-3 h-5 w-5" />
                  <span className="flex-1 text-left">Admin Dashboard</span>
                  {adminDropdownOpen ? (
                    <ChevronDown className="h-4 w-4" />
                  ) : (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </button>
                
                {adminDropdownOpen && (
                  <div className="ml-4 mt-1 space-y-1">
                    {adminNavItems.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => router.push(item.href)}
                        className={cn(
                          "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors text-left",
                          pathname === item.href
                            ? "bg-accent text-accent-foreground"
                            : "hover:bg-accent hover:text-accent-foreground"
                        )}
                      >
                        <item.icon className="mr-3 h-4 w-4" />
                        <span>{item.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </nav>
        </div>
        <div className="p-4">
          <button
            onClick={logout}
            className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-accent"
          >
            <LogOut className="mr-3 h-5 w-5" />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
}