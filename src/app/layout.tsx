// src/app/layout.tsx
import type { Metadata } from 'next';
import { MainLayout } from '@/components/layout/main-layout';
import './globals.css';

export const metadata: Metadata = {
  title: "Maize Leaf Disease Detection",
  description: "A system for detecting diseases in maize leaves using AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <MainLayout>
          {children}
        </MainLayout>
      </body>
    </html>
  );
}