import { Users, Plus, Settings, Search, Filter, Eye, Edit, Trash2, Shield, Key, Clock, CheckCircle, AlertCircle, Crown, User } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const UserManagement = () => {
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [userDialog, setUserDialog] = useState(false);
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterBranch, setFilterBranch] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const users = [
    {
      id: "USR-001",
      employeeId: "PSH001",
      name: "Priya Sharma",
      email: "priya.sharma@sankbank.com",
      phone: "+91 98765 43210",
      role: "Senior Bank Officer",
      department: "Compliance",
      branch: "Sangli Main",
      status: "Active",
      lastLogin: "2024-03-20 14:32:15",
      loginCount: 245,
      accountCreated: "2023-01-15",
      reportingTo: "Meera Desai",
      permissions: ["Report Submission", "Data Export", "User View", "Compliance Management"],
      accessLevel: "L2",
      approvalLimit: "₹50,00,000",
      failedLoginAttempts: 0,
      avatar: null
    },
    {
      id: "USR-002",
      employeeId: "RPT001",
      name: "Rahul Patil",
      email: "rahul.patil@sankbank.com",
      phone: "+91 98765 43211",
      role: "Branch Manager",
      department: "Operations",
      branch: "Sangli Corporate",
      status: "Active",
      lastLogin: "2024-03-20 13:45:23",
      loginCount: 412,
      accountCreated: "2022-08-10",
      reportingTo: "Regional Manager",
      permissions: ["All Reports", "User Management", "Approval Authority", "System Configuration"],
      accessLevel: "L3",
      approvalLimit: "₹1,00,00,000",
      failedLoginAttempts: 0,
      avatar: null
    },
    {
      id: "USR-003",
      employeeId: "MDS001",
      name: "Meera Desai",
      email: "meera.desai@sankbank.com",
      phone: "+91 98765 43212",
      role: "Compliance Manager",
      department: "Compliance",
      branch: "All Branches",
      status: "Active",
      lastLogin: "2024-03-20 12:18:07",
      loginCount: 523,
      accountCreated: "2021-03-22",
      reportingTo: "Chief Compliance Officer",
      permissions: ["All Reports", "Audit Trail", "Risk Management", "Regulatory Oversight"],
      accessLevel: "L4",
      approvalLimit: "₹2,00,00,000",
      failedLoginAttempts: 0,
      avatar: null
    },
    {
      id: "USR-004",
      employeeId: "VJV001",
      name: "Vikram Jadhav",
      email: "vikram.jadhav@sankbank.com",
      phone: "+91 98765 43213",
      role: "Risk Manager",
      department: "Risk Management",
      branch: "Sangli Main",
      status: "Active",
      lastLogin: "2024-03-20 11:22:41",
      loginCount: 334,
      accountCreated: "2022-11-05",
      reportingTo: "Meera Desai",
      permissions: ["Risk Reports", "Credit Analysis", "Portfolio Management", "Basel III"],
      accessLevel: "L3",
      approvalLimit: "₹75,00,000",
      failedLoginAttempts: 0,
      avatar: null
    },
    {
      id: "USR-005",
      employeeId: "AKL001",
      name: "Anjali Kulkarni",
      email: "anjali.kulkarni@sankbank.com",
      phone: "+91 98765 43214",
      role: "Audit Officer",
      department: "Internal Audit",
      branch: "Sangli Rural",
      status: "Active",
      lastLogin: "2024-03-20 10:45:12",
      loginCount: 187,
      accountCreated: "2023-06-18",
      reportingTo: "Meera Desai",
      permissions: ["Audit Reports", "Data Access", "Compliance Monitoring"],
      accessLevel: "L2",
      approvalLimit: "₹25,00,000",
      failedLoginAttempts: 1,
      avatar: null
    },
    {
      id: "USR-006",
      employeeId: "SKL001",
      name: "Suresh Kale",
      email: "suresh.kale@sankbank.com",
      phone: "+91 98765 43215",
      role: "Treasury Officer",
      department: "Treasury",
      branch: "Sangli Main",
      status: "Inactive",
      lastLogin: "2024-03-15 16:20:30",
      loginCount: 156,
      accountCreated: "2023-09-12",
      reportingTo: "Vikram Jadhav",
      permissions: ["Treasury Reports", "Liquidity Management"],
      accessLevel: "L1",
      approvalLimit: "₹10,00,000",
      failedLoginAttempts: 0,
      avatar: null
    },
    {
      id: "USR-007",
      employeeId: "NPN001",
      name: "Neha Pawar",
      email: "neha.pawar@sankbank.com",
      phone: "+91 98765 43216",
      role: "Junior Officer",
      department: "Operations",
      branch: "Sangli Digital",
      status: "Locked",
      lastLogin: "2024-03-18 09:15:45",
      loginCount: 89,
      accountCreated: "2024-01-08",
      reportingTo: "Priya Sharma",
      permissions: ["Basic Reports", "Data Entry"],
      accessLevel: "L1",
      approvalLimit: "₹5,00,000",
      failedLoginAttempts: 5,
      avatar: null
    },
    {
      id: "USR-008",
      employeeId: "RKS001",
      name: "Ravi Kumar Sinha",
      email: "ravi.sinha@sankbank.com",
      phone: "+91 98765 43217",
      role: "IT Administrator",
      department: "Information Technology",
      branch: "All Branches",
      status: "Active",
      lastLogin: "2024-03-20 15:30:22",
      loginCount: 678,
      accountCreated: "2020-05-14",
      reportingTo: "IT Manager",
      permissions: ["System Administration", "User Management", "Security Settings", "Backup Management"],
      accessLevel: "L5",
      approvalLimit: "N/A",
      failedLoginAttempts: 0,
      avatar: null
    }
  ];

  const rolePermissions = {
    "Senior Bank Officer": ["Report Submission", "Data Export", "User View", "Compliance Management"],
    "Branch Manager": ["All Reports", "User Management", "Approval Authority", "System Configuration"],
    "Compliance Manager": ["All Reports", "Audit Trail", "Risk Management", "Regulatory Oversight"],
    "Risk Manager": ["Risk Reports", "Credit Analysis", "Portfolio Management", "Basel III"],
    "Audit Officer": ["Audit Reports", "Data Access", "Compliance Monitoring"],
    "Treasury Officer": ["Treasury Reports", "Liquidity Management"],
    "Junior Officer": ["Basic Reports", "Data Entry"],
    "IT Administrator": ["System Administration", "User Management", "Security Settings", "Backup Management"]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "success";
      case "Inactive": return "secondary";
      case "Locked": return "destructive";
      case "Pending": return "warning";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active": return CheckCircle;
      case "Inactive": return Clock;
      case "Locked": return AlertCircle;
      default: return Clock;
    }
  };

  const getRoleIcon = (role: string) => {
    if (role.includes("Manager") || role.includes("Officer")) return Crown;
    if (role.includes("Administrator")) return Shield;
    return User;
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case "L5": return "destructive";
      case "L4": return "warning";
      case "L3": return "default";
      case "L2": return "secondary";
      case "L1": return "outline";
      default: return "secondary";
    }
  };

  const handleCreateUser = () => {
    toast({
      title: "User Created",
      description: "New user has been created successfully.",
    });
    setUserDialog(false);
  };

  const handleToggleUserStatus = (userId: string, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
    toast({
      title: `User ${newStatus}`,
      description: `User ${userId} has been ${newStatus.toLowerCase()}.`,
    });
  };

  const handleResetPassword = (userId: string) => {
    toast({
      title: "Password Reset",
      description: `Password reset email sent for user ${userId}.`,
    });
  };

  const handleUnlockAccount = (userId: string) => {
    toast({
      title: "Account Unlocked",
      description: `User account ${userId} has been unlocked.`,
    });
  };

  const filteredUsers = users.filter(user => {
    const roleMatch = filterRole === "all" || user.role === filterRole;
    const statusMatch = filterStatus === "all" || user.status === filterStatus;
    const branchMatch = filterBranch === "all" || user.branch === filterBranch;
    const searchMatch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       user.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    return roleMatch && statusMatch && branchMatch && searchMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">User Management</h1>
          <p className="text-muted-foreground">
            Manage banking staff, roles, permissions, and access controls
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Settings className="mr-2 h-4 w-4" />
            Role Settings
          </Button>
          <Button 
            onClick={() => setUserDialog(true)} 
            className="w-full sm:w-auto"
            data-testid="button-new-user"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Total Users</p>
                <p className="text-2xl font-bold">8</p>
                <p className="text-xs text-muted-foreground">Across all branches</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Active Users</p>
                <p className="text-2xl font-bold">6</p>
                <p className="text-xs text-muted-foreground">Currently logged in</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm font-medium">Locked Accounts</p>
                <p className="text-2xl font-bold">1</p>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Admin Users</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">With elevated access</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-users"
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger data-testid="select-role">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Senior Bank Officer">Senior Bank Officer</SelectItem>
                <SelectItem value="Branch Manager">Branch Manager</SelectItem>
                <SelectItem value="Compliance Manager">Compliance Manager</SelectItem>
                <SelectItem value="Risk Manager">Risk Manager</SelectItem>
                <SelectItem value="Audit Officer">Audit Officer</SelectItem>
                <SelectItem value="Treasury Officer">Treasury Officer</SelectItem>
                <SelectItem value="Junior Officer">Junior Officer</SelectItem>
                <SelectItem value="IT Administrator">IT Administrator</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger data-testid="select-status">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Locked">Locked</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterBranch} onValueChange={setFilterBranch}>
              <SelectTrigger data-testid="select-branch">
                <SelectValue placeholder="Filter by branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Branches</SelectItem>
                <SelectItem value="Sangli Main">Sangli Main</SelectItem>
                <SelectItem value="Sangli Corporate">Sangli Corporate</SelectItem>
                <SelectItem value="Sangli Rural">Sangli Rural</SelectItem>
                <SelectItem value="Sangli Digital">Sangli Digital</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Banking Staff Directory</CardTitle>
          <CardDescription>
            Showing {filteredUsers.length} of {users.length} users
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role & Department</TableHead>
                  <TableHead>Branch</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Access Level</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => {
                  const StatusIcon = getStatusIcon(user.status);
                  const RoleIcon = getRoleIcon(user.role);
                  return (
                    <TableRow key={user.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback>
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium" data-testid={`text-name-${user.id}`}>{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <p className="text-xs text-muted-foreground">ID: {user.employeeId}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <RoleIcon className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="font-medium text-sm">{user.role}</p>
                            <p className="text-xs text-muted-foreground">{user.department}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{user.branch}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <StatusIcon className="h-4 w-4" />
                          <Badge variant={getStatusColor(user.status) as any}>
                            {user.status}
                          </Badge>
                          {user.failedLoginAttempts > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {user.failedLoginAttempts} failed attempts
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <Badge variant={getAccessLevelColor(user.accessLevel) as any}>
                            {user.accessLevel}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">
                            Limit: {user.approvalLimit}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{user.lastLogin.split(' ')[0]}</p>
                          <p className="text-xs text-muted-foreground">{user.lastLogin.split(' ')[1]}</p>
                          <p className="text-xs text-muted-foreground">{user.loginCount} logins</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedUser(user)}
                            data-testid={`button-view-${user.id}`}
                          >
                            <Eye className="h-3 w-3" />
                          </Button>
                          {user.status === "Locked" && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleUnlockAccount(user.id)}
                              data-testid={`button-unlock-${user.id}`}
                            >
                              <Key className="h-3 w-3" />
                            </Button>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleToggleUserStatus(user.id, user.status)}
                            data-testid={`button-toggle-${user.id}`}
                          >
                            {user.status === "Active" ? "Deactivate" : "Activate"}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* New User Dialog */}
      <Dialog open={userDialog} onOpenChange={setUserDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              Create a new banking staff user account
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Personal Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input id="fullName" placeholder="Enter full name" />
              </div>
              <div>
                <Label htmlFor="employeeId">Employee ID</Label>
                <Input id="employeeId" placeholder="Enter employee ID" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="Enter email address" />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" placeholder="Enter phone number" />
              </div>
            </div>

            {/* Role and Department */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="role">Role</Label>
                <Select>
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="senior-officer">Senior Bank Officer</SelectItem>
                    <SelectItem value="branch-manager">Branch Manager</SelectItem>
                    <SelectItem value="compliance-manager">Compliance Manager</SelectItem>
                    <SelectItem value="risk-manager">Risk Manager</SelectItem>
                    <SelectItem value="audit-officer">Audit Officer</SelectItem>
                    <SelectItem value="treasury-officer">Treasury Officer</SelectItem>
                    <SelectItem value="junior-officer">Junior Officer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger id="department">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="compliance">Compliance</SelectItem>
                    <SelectItem value="operations">Operations</SelectItem>
                    <SelectItem value="risk">Risk Management</SelectItem>
                    <SelectItem value="audit">Internal Audit</SelectItem>
                    <SelectItem value="treasury">Treasury</SelectItem>
                    <SelectItem value="it">Information Technology</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="branch">Branch</Label>
                <Select>
                  <SelectTrigger id="branch">
                    <SelectValue placeholder="Select branch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sangli-main">Sangli Main</SelectItem>
                    <SelectItem value="sangli-corporate">Sangli Corporate</SelectItem>
                    <SelectItem value="sangli-rural">Sangli Rural</SelectItem>
                    <SelectItem value="sangli-digital">Sangli Digital</SelectItem>
                    <SelectItem value="all">All Branches</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Access and Permissions */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="accessLevel">Access Level</Label>
                <Select>
                  <SelectTrigger id="accessLevel">
                    <SelectValue placeholder="Select access level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="L1">L1 - Basic Access</SelectItem>
                    <SelectItem value="L2">L2 - Standard Access</SelectItem>
                    <SelectItem value="L3">L3 - Enhanced Access</SelectItem>
                    <SelectItem value="L4">L4 - Manager Access</SelectItem>
                    <SelectItem value="L5">L5 - Administrator Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="approvalLimit">Approval Limit</Label>
                <Input id="approvalLimit" placeholder="₹0" />
              </div>
            </div>

            {/* Reporting Structure */}
            <div>
              <Label htmlFor="reportingTo">Reporting To</Label>
              <Select>
                <SelectTrigger id="reportingTo">
                  <SelectValue placeholder="Select reporting manager" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meera">Meera Desai (Compliance Manager)</SelectItem>
                  <SelectItem value="rahul">Rahul Patil (Branch Manager)</SelectItem>
                  <SelectItem value="vikram">Vikram Jadhav (Risk Manager)</SelectItem>
                  <SelectItem value="regional">Regional Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Account Settings */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="sendCredentials" defaultChecked />
                <Label htmlFor="sendCredentials">Send login credentials via email</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="requirePasswordReset" defaultChecked />
                <Label htmlFor="requirePasswordReset">Require password change on first login</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="emailNotifications" defaultChecked />
                <Label htmlFor="emailNotifications">Enable email notifications</Label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setUserDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateUser} data-testid="button-create-user">
                Create User
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* User Details Dialog */}
      <Dialog open={!!selectedUser} onOpenChange={() => setSelectedUser(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedUser?.name}</DialogTitle>
            <DialogDescription>
              User Details • ID: {selectedUser?.employeeId}
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6">
              {/* User Overview */}
              <div className="flex items-start space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedUser.avatar} />
                  <AvatarFallback className="text-lg">
                    {selectedUser.name.split(' ').map((n: string) => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{selectedUser.name}</h3>
                  <p className="text-muted-foreground">{selectedUser.role} • {selectedUser.department}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant={getStatusColor(selectedUser.status) as any}>
                      {selectedUser.status}
                    </Badge>
                    <Badge variant={getAccessLevelColor(selectedUser.accessLevel) as any}>
                      {selectedUser.accessLevel}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-medium">Contact Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Email:</span>
                      <p>{selectedUser.email}</p>
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span>
                      <p>{selectedUser.phone}</p>
                    </div>
                    <div>
                      <span className="font-medium">Branch:</span>
                      <p>{selectedUser.branch}</p>
                    </div>
                    <div>
                      <span className="font-medium">Reporting To:</span>
                      <p>{selectedUser.reportingTo}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-medium">Account Information</h4>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium">Account Created:</span>
                      <p>{selectedUser.accountCreated}</p>
                    </div>
                    <div>
                      <span className="font-medium">Last Login:</span>
                      <p>{selectedUser.lastLogin}</p>
                    </div>
                    <div>
                      <span className="font-medium">Login Count:</span>
                      <p>{selectedUser.loginCount}</p>
                    </div>
                    <div>
                      <span className="font-medium">Approval Limit:</span>
                      <p>{selectedUser.approvalLimit}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h4 className="font-medium mb-3">Permissions & Access</h4>
                <div className="grid grid-cols-2 gap-2">
                  {selectedUser.permissions.map((permission: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 p-2 bg-green-50 dark:bg-green-950 rounded border-l-4 border-green-500">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm">{permission}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between pt-4 border-t">
                <div className="flex space-x-2">
                  {selectedUser.status === "Locked" && (
                    <Button 
                      variant="outline"
                      onClick={() => handleUnlockAccount(selectedUser.id)}
                    >
                      <Key className="mr-2 h-4 w-4" />
                      Unlock Account
                    </Button>
                  )}
                  <Button 
                    variant="outline"
                    onClick={() => handleResetPassword(selectedUser.id)}
                  >
                    <Key className="mr-2 h-4 w-4" />
                    Reset Password
                  </Button>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit User
                  </Button>
                  <Button 
                    variant={selectedUser.status === "Active" ? "destructive" : "default"}
                    onClick={() => handleToggleUserStatus(selectedUser.id, selectedUser.status)}
                  >
                    {selectedUser.status === "Active" ? "Deactivate" : "Activate"} User
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserManagement;