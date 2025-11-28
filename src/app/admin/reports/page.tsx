'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProtectedRoute } from '@/components/auth/protected-route';
import { 
  FileText, 
  Download, 
  Calendar, 
  TrendingUp, 
  TrendingDown,
  Users,
  Scan,
  AlertTriangle,
  BarChart3,
  PieChart,
  Activity,
  Shield
} from "lucide-react";
import Link from "next/link";

// Mock data for reports
const reportStats = [
  {
    title: "Total Users",
    value: "1,234",
    change: "+12%",
    trend: "up",
    icon: Users,
    description: "Last 30 days"
  },
  {
    title: "API Requests",
    value: "45.2K",
    change: "+18%",
    trend: "up",
    icon: Activity,
    description: "Daily average"
  },
  {
    title: "System Uptime",
    value: "99.9%",
    change: "0%",
    trend: "stable",
    icon: Activity,
    description: "Last 90 days"
  },
  {
    title: "Storage Used",
    value: "2.3GB",
    change: "+5%",
    trend: "up",
    icon: FileText,
    description: "Total usage"
  }
];

const recentReports = [
  {
    id: 1,
    name: "Monthly Usage Report",
    type: "Usage Analytics",
    date: "2024-01-15",
    status: "completed",
    size: "2.4 MB"
  },
  {
    id: 2,
    name: "System Performance Report",
    type: "System Analytics",
    date: "2024-01-14",
    status: "completed",
    size: "1.8 MB"
  },
  {
    id: 3,
    name: "User Activity Report",
    type: "User Analytics",
    date: "2024-01-13",
    status: "processing",
    size: "-"
  },
  {
    id: 4,
    name: "Security Audit Report",
    type: "Security Analytics",
    date: "2024-01-12",
    status: "completed",
    size: "3.1 MB"
  }
];

const systemMetrics = [
  { name: "CPU Usage", value: 23, percentage: 23, status: "optimal" },
  { name: "Memory Usage", value: 67, percentage: 67, status: "warning" },
  { name: "Disk Usage", value: 45, percentage: 45, status: "optimal" },
  { name: "Network Traffic", value: 78, percentage: 78, status: "warning" }
];

export default function AdminReportsPage() {
  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'completed': return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
      case 'processing': return <Badge className="bg-yellow-100 text-yellow-800">Processing</Badge>;
      case 'failed': return <Badge className="bg-red-100 text-red-800">Failed</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="container py-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
            <p className="text-muted-foreground">
              Generate and view system reports and analytics
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link href="/admin">
                <FileText className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Report Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {reportStats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    {getTrendIcon(stat.trend)}
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
          {/* Recent Reports */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Reports</CardTitle>
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{report.name}</p>
                      <p className="text-sm text-muted-foreground">{report.type}</p>
                      <p className="text-xs text-muted-foreground">{report.date} • {report.size}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(report.status)}
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Metrics */}
          <Card>
            <CardHeader>
              <CardTitle>System Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemMetrics.map((metric) => (
                  <div key={metric.name} className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{metric.name}</span>
                      <span className="text-muted-foreground">{metric.value}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          metric.status === 'optimal' ? 'bg-green-600' : 'bg-yellow-600'
                        }`}
                        style={{ width: `${metric.percentage}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Status: {metric.status}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Types */}
        <Card>
          <CardHeader>
            <CardTitle>Generate New Report</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <BarChart3 className="mx-auto h-8 w-8 text-blue-600 mb-4" />
                  <h3 className="font-semibold mb-2">Usage Analytics</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    User activity, API requests, and engagement metrics
                  </p>
                  <Button variant="outline" className="w-full">
                    Generate
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Users className="mx-auto h-8 w-8 text-green-600 mb-4" />
                  <h3 className="font-semibold mb-2">User Analytics</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    User demographics, registration trends, and retention rates
                  </p>
                  <Button variant="outline" className="w-full">
                    Generate
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Activity className="mx-auto h-8 w-8 text-red-600 mb-4" />
                  <h3 className="font-semibold mb-2">System Performance</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    System uptime, response times, and error rates
                  </p>
                  <Button variant="outline" className="w-full">
                    Generate
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Shield className="mx-auto h-8 w-8 text-purple-600 mb-4" />
                  <h3 className="font-semibold mb-2">Security Analytics</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Security incidents, authentication attempts, and access patterns
                  </p>
                  <Button variant="outline" className="w-full">
                    Generate
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <Calendar className="mx-auto h-8 w-8 text-orange-600 mb-4" />
                  <h3 className="font-semibold mb-2">Time-based Reports</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Daily, weekly, monthly, and yearly summaries
                  </p>
                  <Button variant="outline" className="w-full">
                    Generate
                  </Button>
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <AlertTriangle className="mx-auto h-8 w-8 text-indigo-600 mb-4" />
                  <h3 className="font-semibold mb-2">Custom Report</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create custom reports with specific parameters
                  </p>
                  <Button variant="outline" className="w-full">
                    Create Custom
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </ProtectedRoute>
  );
}
