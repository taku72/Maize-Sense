'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ProtectedRoute } from '@/components/auth/protected-route';
import { 
  Search, 
  UserPlus, 
  MoreHorizontal, 
  Pencil, 
  Trash2, 
  Check, 
  X,
  Users,
  Shield,
  Eye,
  Filter
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useState } from "react";

// Mock data - replace with actual data from your API
const users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "admin",
    status: "Active",
    lastLogin: "2 hours ago",
    joinDate: "2024-01-01",
    scansCount: 45,
    approvedBy: "System",
    approvedAt: "2024-01-01 00:00:00",
    department: "IT",
    permissions: ["user_management", "system_settings", "reports"]
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "admin",
    status: "Pending Approval",
    lastLogin: "1 day ago",
    joinDate: "2024-01-05",
    scansCount: 23,
    approvedBy: null,
    approvedAt: null,
    department: "Operations",
    permissions: ["user_management"]
  },
  {
    id: 3,
    name: "Robert Johnson",
    email: "robert@example.com",
    role: "user",
    status: "Active",
    lastLogin: "1 week ago",
    joinDate: "2023-12-15",
    scansCount: 12,
    approvedBy: "John Doe",
    approvedAt: "2023-12-15 10:30:00",
    department: "Research",
    permissions: ["scan", "view_history"]
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily@example.com",
    role: "user",
    status: "Active",
    lastLogin: "3 hours ago",
    joinDate: "2024-01-10",
    scansCount: 67,
    approvedBy: "John Doe",
    approvedAt: "2024-01-10 14:15:00",
    department: "Field Operations",
    permissions: ["scan", "view_history"]
  },
  {
    id: 5,
    name: "Michael Wilson",
    email: "michael@example.com",
    role: "admin",
    status: "Active",
    lastLogin: "5 hours ago",
    joinDate: "2024-01-12",
    scansCount: 8,
    approvedBy: "System",
    approvedAt: "2024-01-12 09:00:00",
    department: "IT",
    permissions: ["user_management", "system_settings", "reports", "security"]
  },
  {
    id: 6,
    name: "Sarah Brown",
    email: "sarah@example.com",
    role: "admin",
    status: "Rejected",
    lastLogin: null,
    joinDate: "2024-01-15",
    scansCount: 0,
    approvedBy: "John Doe",
    approvedAt: "2024-01-15 16:45:00",
    department: "Marketing",
    permissions: [],
    rejectionReason: "Insufficient experience level"
  }
];

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const getRoleBadge = (role: string) => {
    switch(role) {
      case 'admin': return <Badge className="bg-red-100 text-red-800">Admin</Badge>;
      case 'user': return <Badge className="bg-blue-100 text-blue-800">User</Badge>;
      default: return <Badge>{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Active': return <Badge className="bg-green-100 text-green-800">Active</Badge>;
      case 'Inactive': return <Badge className="bg-gray-100 text-gray-800">Inactive</Badge>;
      case 'Suspended': return <Badge className="bg-red-100 text-red-800">Suspended</Badge>;
      case 'Pending Approval': return <Badge className="bg-yellow-100 text-yellow-800">Pending Approval</Badge>;
      case 'Rejected': return <Badge className="bg-red-100 text-red-800">Rejected</Badge>;
      default: return <Badge>{status}</Badge>;
    }
  };

  return (
    <ProtectedRoute requiredRole="admin">
      <div className="container">
        {/* Sticky Header */}
        <div className="sticky top-16 md:top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b py-4 space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
              <p className="text-muted-foreground">
                Manage user accounts, roles, and permissions
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" asChild>
                <Link href="/admin">
                  <Shield className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Link>
              </Button>
              <Button>
                <UserPlus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="py-8 space-y-6">

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Check className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.filter(u => u.status === 'Active').length}</div>
              <p className="text-xs text-muted-foreground">+5% from last week</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Admins</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.filter(u => u.role === 'admin').length}</div>
              <p className="text-xs text-muted-foreground">System administrators</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.reduce((sum, u) => sum + u.scansCount, 0)}</div>
              <p className="text-xs text-muted-foreground">All time scans</p>
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
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="px-3 py-2 border rounded-md"
              >
                <option value="all">All Roles</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>Users ({filteredUsers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Approval</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Scans</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getRoleBadge(user.role)}</TableCell>
                    <TableCell>{getStatusBadge(user.status)}</TableCell>
                    <TableCell className="text-sm">{user.department}</TableCell>
                    <TableCell className="text-sm">
                      {user.status === 'Pending Approval' ? (
                        <div className="flex space-x-1">
                          <Button size="sm" variant="outline" className="h-7 px-2 text-green-600 hover:text-green-700">
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button size="sm" variant="outline" className="h-7 px-2 text-red-600 hover:text-red-700">
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <div className="text-xs">
                          {user.approvedBy && (
                            <div>{user.approvedBy}</div>
                          )}
                          {user.rejectionReason && (
                            <div className="text-red-600">{user.rejectionReason}</div>
                          )}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-sm">{user.lastLogin}</TableCell>
                    <TableCell className="text-sm">{user.scansCount}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit User
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Shield className="mr-2 h-4 w-4" />
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            Manage Permissions
                          </DropdownMenuItem>
                          {user.status === 'Active' ? (
                            <DropdownMenuItem>
                              <X className="mr-2 h-4 w-4" />
                              Suspend User
                            </DropdownMenuItem>
                          ) : (
                            <DropdownMenuItem>
                              <Check className="mr-2 h-4 w-4" />
                              Activate User
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
