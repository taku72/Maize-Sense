'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProtectedRoute } from '@/components/auth/protected-route';
import { 
  Search,
  Shield,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  Mail,
  AlertTriangle,
  Check,
  X,
  FileText
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock data for admin approval requests
const approvalRequests = [
  {
    id: 1,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "admin",
    department: "Operations",
    requestDate: "2024-01-05",
    requestedBy: "Robert Johnson",
    experience: "5 years in system administration",
    reason: "Need to manage team members and system settings",
    status: "pending",
    requestedPermissions: ["user_management", "system_settings"],
    currentRole: "user"
  },
  {
    id: 2,
    name: "Tom Anderson",
    email: "tom@example.com",
    role: "admin",
    department: "IT",
    requestDate: "2024-01-08",
    requestedBy: "Michael Wilson",
    experience: "3 years in IT support",
    reason: "Assist with user management and security monitoring",
    status: "pending",
    requestedPermissions: ["user_management", "security"],
    currentRole: "user"
  },
  {
    id: 3,
    name: "Lisa Chen",
    email: "lisa@example.com",
    role: "admin",
    department: "Research",
    requestDate: "2024-01-10",
    requestedBy: "Self",
    experience: "2 years in data analysis",
    reason: "Need access to reports and analytics for research purposes",
    status: "pending",
    requestedPermissions: ["reports", "view_analytics"],
    currentRole: "user"
  },
  {
    id: 4,
    name: "David Brown",
    email: "david@example.com",
    role: "admin",
    department: "Marketing",
    requestDate: "2024-01-12",
    requestedBy: "Sarah Brown",
    experience: "1 year in marketing",
    reason: "Help with user communications and content management",
    status: "rejected",
    requestedPermissions: ["user_management", "content"],
    currentRole: "user",
    reviewedBy: "John Doe",
    reviewedAt: "2024-01-13 14:30:00",
    rejectionReason: "Insufficient experience for admin role"
  },
  {
    id: 5,
    name: "Mark Wilson",
    email: "mark@example.com",
    role: "admin",
    department: "IT",
    requestDate: "2024-01-01",
    requestedBy: "System",
    experience: "10 years in system administration",
    reason: "Senior system administrator role",
    status: "approved",
    requestedPermissions: ["user_management", "system_settings", "reports", "security"],
    currentRole: "admin",
    reviewedBy: "System",
    reviewedAt: "2024-01-01 09:00:00"
  }
];

export default function AdminApprovalsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredRequests = approvalRequests.filter(request => {
    const matchesSearch = request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || request.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending': return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'approved': return <Badge className="bg-green-100 text-green-800">Approved</Badge>;
      case 'rejected': return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  const handleApprove = (requestId: number) => {
    // Handle approval logic
    console.log(`Approving request ${requestId}`);
  };

  const handleReject = (requestId: number) => {
    // Handle rejection logic
    console.log(`Rejecting request ${requestId}`);
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="container py-8 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Admin Approvals</h1>
            <p className="text-muted-foreground">
              Review and approve admin role requests
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" asChild>
              <Link href="/admin/users">
                <Users className="mr-2 h-4 w-4" />
                Manage Users
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin">
                <Shield className="mr-2 h-4 w-4" />
                Back to Dashboard
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {approvalRequests.filter(r => r.status === 'pending').length}
              </div>
              <p className="text-xs text-muted-foreground">Awaiting review</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Approved Today</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2</div>
              <p className="text-xs text-muted-foreground">+1 from yesterday</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Admins</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Active administrators</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rejection Rate</CardTitle>
              <XCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15%</div>
              <p className="text-xs text-muted-foreground">Last 30 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-center">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search requests..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Approval Requests */}
        <div className="space-y-4">
          {filteredRequests.map((request) => (
            <Card key={request.id} className={request.status === 'pending' ? 'border-yellow-200' : ''}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{request.name}</CardTitle>
                    <p className="text-sm text-muted-foreground">{request.email}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusBadge(request.status)}
                    {request.status === 'pending' && (
                      <Badge className="bg-orange-100 text-orange-800">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm">Request Details</h4>
                      <div className="mt-2 space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Current Role:</span>
                          <span className="font-medium">{request.currentRole}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Requested Role:</span>
                          <span className="font-medium">{request.role}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Department:</span>
                          <span className="font-medium">{request.department}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Requested By:</span>
                          <span className="font-medium">{request.requestedBy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Request Date:</span>
                          <span className="font-medium">{request.requestDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium text-sm">Experience & Reason</h4>
                      <div className="mt-2 space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">Experience:</span>
                          <p className="mt-1">{request.experience}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Reason:</span>
                          <p className="mt-1">{request.reason}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <h4 className="font-medium text-sm mb-2">Requested Permissions</h4>
                  <div className="flex flex-wrap gap-2">
                    {request.requestedPermissions.map((permission) => (
                      <Badge key={permission} variant="outline" className="text-xs">
                        {permission.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>

                {request.status === 'rejected' && request.rejectionReason && (
                  <div className="mt-4 p-3 bg-red-50 rounded-md">
                    <div className="flex items-center space-x-2 text-red-800">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="font-medium text-sm">Rejection Reason:</span>
                    </div>
                    <p className="mt-1 text-sm text-red-700">{request.rejectionReason}</p>
                  </div>
                )}

                {request.status === 'approved' && request.reviewedBy && (
                  <div className="mt-4 p-3 bg-green-50 rounded-md">
                    <div className="flex items-center space-x-2 text-green-800">
                      <CheckCircle className="h-4 w-4" />
                      <span className="font-medium text-sm">Approved by:</span>
                    </div>
                    <p className="mt-1 text-sm text-green-700">
                      {request.reviewedBy} on {request.reviewedAt}
                    </p>
                  </div>
                )}

                <div className="mt-4 flex justify-end space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    View Full Profile
                  </Button>
                  <Button variant="outline" size="sm">
                    <Mail className="mr-2 h-4 w-4" />
                    Contact User
                  </Button>
                  {request.status === 'pending' && (
                    <>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-red-600 hover:text-red-700"
                        onClick={() => handleReject(request.id)}
                      >
                        <X className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleApprove(request.id)}
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Approve
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
