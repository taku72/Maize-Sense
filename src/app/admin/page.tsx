'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProtectedRoute } from '@/components/auth/protected-route';
import { 
  Users, 
  Activity, 
  FileText, 
  AlertTriangle, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Scan,
  Leaf,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Settings,
  Database,
  Shield
} from "lucide-react";
import Link from "next/link";

// Mock data - replace with actual data from your API
const stats = [
  { 
    name: 'Total Users', 
    value: '1,234', 
    icon: Users,
    change: '+12%',
    trend: 'up',
    description: 'from last month'
  },
  { 
    name: 'System Health', 
    value: '98%', 
    icon: CheckCircle,
    change: '0%',
    trend: 'stable',
    description: 'operational'
  },
  { 
    name: 'API Requests', 
    value: '45.2K', 
    icon: Activity,
    change: '+18%',
    trend: 'up',
    description: 'from yesterday'
  },
  { 
    name: 'Storage Used', 
    value: '2.3GB', 
    icon: FileText,
    change: '+5%',
    trend: 'up',
    description: 'from last week'
  },
];

const recentActivity = [
  { 
    id: 1, 
    user: 'Admin', 
    action: 'updated system configuration', 
    time: '5 minutes ago',
    type: 'admin',
    status: 'completed'
  },
  { 
    id: 2, 
    user: 'System', 
    action: 'performed automatic backup', 
    time: '1 hour ago',
    type: 'system',
    status: 'completed'
  },
  { 
    id: 3, 
    user: 'Admin', 
    action: 'created new user account', 
    time: '3 hours ago',
    type: 'admin',
    status: 'completed'
  },
  { 
    id: 4, 
    user: 'System', 
    action: 'security scan completed', 
    time: '5 hours ago',
    type: 'system',
    status: 'completed'
  },
  { 
    id: 5, 
    user: 'Admin', 
    action: 'updated disease database', 
    time: '6 hours ago',
    type: 'admin',
    status: 'completed'
  },
];

const systemLogs = [
  {
    id: 1,
    level: 'info',
    message: 'System startup completed successfully',
    timestamp: '2024-01-15 09:00:00',
    source: 'System'
  },
  {
    id: 2,
    level: 'warning',
    message: 'High CPU usage detected',
    timestamp: '2024-01-15 10:15:00',
    source: 'Monitor'
  },
  {
    id: 3,
    level: 'info',
    message: 'Database backup completed',
    timestamp: '2024-01-15 11:30:00',
    source: 'Backup'
  },
  {
    id: 4,
    level: 'error',
    message: 'API rate limit exceeded for user 123',
    timestamp: '2024-01-15 12:45:00',
    source: 'API'
  }
];

export default function AdminDashboard() {
  const getActivityIcon = (type: string) => {
    switch(type) {
      case 'admin': return <FileText className="h-4 w-4" />;
      case 'system': return <Activity className="h-4 w-4" />;
      case 'user': return <Users className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getLogLevelBadge = (level: string) => {
    switch(level) {
      case 'error': return <Badge className="bg-red-100 text-red-800">Error</Badge>;
      case 'warning': return <Badge className="bg-yellow-100 text-yellow-800">Warning</Badge>;
      case 'info': return <Badge className="bg-blue-100 text-blue-800">Info</Badge>;
      default: return <Badge>{level}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed': return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'failed': return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      case 'processing': return <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="container">
        {/* Sticky Header */}
        <div className="sticky top-16 md:top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b py-4 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor and manage your maize disease detection system
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link href="/dashboard">
                  <Activity className="mr-2 h-4 w-4" />
                  User Dashboard
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/admin/users">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Users
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-8 space-y-6">
        {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : stat.trend === 'down' ? TrendingDown : Activity;
          return (
            <Card key={stat.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.name}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <TrendIcon className={`h-3 w-3 ${
                    stat.trend === 'up' ? 'text-green-500' : 
                    stat.trend === 'down' ? 'text-red-500' : 
                    'text-gray-500'
                  }`} />
                  <span className={stat.trend === 'up' ? 'text-green-600' : stat.trend === 'down' ? 'text-red-600' : ''}>
                    {stat.change}
                  </span>
                  <span>{stat.description}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Activity</CardTitle>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      {getActivityIcon(activity.type)}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {activity.user} {activity.action}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    {getStatusBadge(activity.status)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Logs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>System Logs</CardTitle>
            <Button variant="ghost" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              View All Logs
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {systemLogs.map((log) => (
                <div key={log.id} className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {getLogLevelBadge(log.level)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{log.message}</p>
                    <p className="text-xs text-muted-foreground">
                      {log.source} • {log.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Overview */}
      <Card>
        <CardHeader>
          <CardTitle>System Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <h4 className="font-medium">Server Status</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>CPU Usage</span>
                  <span className="text-green-600">23%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Memory Usage</span>
                  <span className="text-yellow-600">67%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Disk Space</span>
                  <span className="text-green-600">45%</span>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Database Status</h4>
              <div className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>Connections</span>
                  <span className="text-green-600">12/100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Query Time</span>
                  <span className="text-green-600">23ms</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Last Backup</span>
                  <span className="text-green-600">2 hours ago</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Users className="mx-auto h-8 w-8 text-blue-600 mb-4" />
            <h3 className="font-semibold mb-2">User Management</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Manage user accounts, roles, and permissions
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/users">Manage Users</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow relative">
          <CardContent className="p-6 text-center">
            <div className="absolute top-2 right-2">
              <Badge className="bg-yellow-100 text-yellow-800 text-xs">3 Pending</Badge>
            </div>
            <Shield className="mx-auto h-8 w-8 text-orange-600 mb-4" />
            <h3 className="font-semibold mb-2">Admin Approvals</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Review and approve admin role requests
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/approvals">Review Requests</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Settings className="mx-auto h-8 w-8 text-purple-600 mb-4" />
            <h3 className="font-semibold mb-2">System Settings</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Configure system preferences and settings
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/settings">System Settings</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow">
          <CardContent className="p-6 text-center">
            <Activity className="mx-auto h-8 w-8 text-orange-600 mb-4" />
            <h3 className="font-semibold mb-2">Reports</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Generate and view system reports
            </p>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/admin/reports">View Reports</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
