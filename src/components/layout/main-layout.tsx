// src/components/layout/main-layout.tsx
'use client';

import { SupabaseProvider } from '@/contexts/SupabaseContext';

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <SupabaseProvider>
      {children}
    </SupabaseProvider>
  );
}