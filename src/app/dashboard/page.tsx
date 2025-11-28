'use client';

import { useRouter } from 'next/navigation';
import { useSupabase } from '@/contexts/SupabaseContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, scanHistory } = useSupabase();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="container">
      {/* Sticky Header */}
      <div className="sticky top-16 md:top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b py-4">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name || 'User'}! Here's what's happening with your crops.
            </p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Sign Out
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8">
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
            <Button asChild className="w-full justify-start">
              <Link href="/scan">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-4 w-4"
                >
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                  <line x1="16" x2="22" y1="5" y2="5" />
                  <line x1="19" x2="19" y1="2" y2="8" />
                  <circle cx="9" cy="9" r="2" />
                  <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21.5" />
                </svg>
                Scan New Leaf
              </Link>
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Invite Team Member
            </Button>
          </div>
          </CardContent>
        </Card>

        {/* Recent Scans */}
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Scans</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/history">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
          
          {scanHistory.length > 0 ? (
            <div className="space-y-4">
              {scanHistory.slice(0, 3).map((scan) => (
                <div
                  key={scan.id}
                  className="flex items-center rounded-lg border p-4 hover:bg-muted/50"
                >
                  <div className="mr-4 h-16 w-16 overflow-hidden rounded-md">
                    <img
                      src={scan.image_url}
                      alt="Scanned leaf"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium">
                        {scan.disease ? scan.disease.name : 'No disease detected'}
                      </h3>
                      <span className="text-xs text-muted-foreground">
                        {new Date(scan.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {scan.location || 'Unknown location'} • {scan.confidence ? Math.round(scan.confidence * 100) : 0}% confidence
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-4 rounded-full bg-muted p-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-muted-foreground"
                >
                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7" />
                  <line x1="16" x2="22" y1="5" y2="5" />
                  <line x1="19" x2="19" y1="2" y2="8" />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium">No scans yet</h3>
              <p className="mb-4 max-w-xs text-sm text-muted-foreground">
                Start by scanning a leaf to detect potential diseases.
              </p>
              <Button asChild>
                <Link href="/scan">Scan a Leaf</Link>
              </Button>
            </div>
          )}
          </CardContent>
        </Card>

        {/* Disease Overview */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Common Maize Diseases</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
            {[
              {
                name: 'Northern Leaf Blight',
                description: 'Causes long, elliptical lesions on leaves',
                severity: 'High',
                color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
              },
              {
                name: 'Gray Leaf Spot',
                description: 'Causes rectangular, tan to gray spots on leaves',
                severity: 'Medium',
                color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
              },
              {
                name: 'Common Rust',
                description: 'Causes small, circular to elongate pustules',
                severity: 'Low',
                color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
              },
            ].map((disease, index) => (
              <div key={index} className="rounded-lg border p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="font-medium">{disease.name}</h3>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${disease.color}`}
                  >
                    {disease.severity} risk
                  </span>
                </div>
                <p className="mb-3 text-sm text-muted-foreground">
                  {disease.description}
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/diseases#${disease.name.toLowerCase().replace(/\s+/g, '-')}`}>
                    Learn more
                  </Link>
                </Button>
              </div>
            ))}
            </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
