'use client';

import { useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Home, Scan, History, BarChart2, User, LogOut, Users, Settings, FileText, Shield, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export function MobileNav() {
  const { user, logout } = useApp();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  
  const isAdmin = user?.role === 'admin';
  const isFarmer = user?.role === 'farmer' || user?.role === 'user';

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Scan', href: '/scan', icon: Scan },
    { name: 'History', href: '/history', icon: History },
    { name: 'Diseases', href: '/diseases', icon: BarChart2 },
    ...(isAdmin ? [
      { name: 'Admin Panel', href: '/admin', icon: Users },
      { name: 'User Management', href: '/admin/users', icon: Users },
      { name: 'Admin Approvals', href: '/admin/approvals', icon: Shield },
      { name: 'Settings', href: '/admin/settings', icon: Settings },
      { name: 'Reports', href: '/admin/reports', icon: FileText },
    ] : []),
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Hamburger Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="h-5 w-5" />
        ) : (
          <Menu className="h-5 w-5" />
        )}
      </Button>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Mobile Menu */}
          <div className="fixed left-0 top-0 h-full w-64 bg-background shadow-lg z-50">
            <div className="flex h-full min-h-0 flex-col">
              {/* Header */}
              <div className="flex h-16 items-center justify-between px-4 sticky top-0 z-50 bg-background">
                <Link href="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
                  <span className="text-xl font-bold">MaizeAI</span>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              {/* Navigation */}
              <div className="flex-1 overflow-y-auto">
                <nav className="space-y-1 p-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={handleLinkClick}
                      className={cn(
                        "flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-accent hover:text-accent-foreground"
                      )}
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>
              
              {/* Logout Button */}
              <div className="p-4">
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-accent"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
