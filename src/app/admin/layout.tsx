import { Sidebar } from '@/components/layout/sidebar';
import { MobileNav } from '@/components/layout/mobile-nav';
import { ProtectedRoute } from '@/components/auth/protected-route';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          {/* Mobile Header with Hamburger Menu */}
          <div className="md:hidden flex items-center justify-between p-4 bg-background sticky top-0 z-50">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">MaizeAI</span>
            </div>
            <MobileNav />
          </div>
          
          {/* Main Content */}
          <div className="h-full pt-16 md:pt-0">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
