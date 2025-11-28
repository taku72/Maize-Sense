'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/contexts/AppContext';

export function ProtectedRoute({ 
  children,
  requiredRole
}: { 
  children: React.ReactNode;
  requiredRole?: 'admin' | 'farmer' | 'user';
}) {
  const { user, isAuthenticated, isLoading } = useApp();
  const router = useRouter();

  const hasAccess = () => {
    if (!isAuthenticated || !user) return false;
    if (requiredRole) {
      if (requiredRole === 'admin') return user.role === 'admin';
      if (requiredRole === 'farmer') return user.role === 'farmer' || user.role === 'admin';
      if (requiredRole === 'user') return true; // All authenticated users have user access
    }
    return true;
  };

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (!hasAccess()) {
        router.push('/dashboard');
      }
    }
  }, [isAuthenticated, isLoading, hasAccess, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated || !hasAccess()) {
    return null; // Will redirect
  }

  return <>{children}</>;
}
