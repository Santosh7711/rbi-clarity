import { Search, Filter, Download, Eye, Calendar, User, Shield, FileText, AlertTriangle, CheckCircle, Clock, Settings } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const AuditTrail = () => {
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterRisk, setFilterRisk] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("7days");

  const auditEvents = [
    {
      id: "AUD-2024-001",
      timestamp: "2024-03-20 14:32:15",
      category: "Report Submission",
      action: "OSS Return Q1 2024 Submitted",
      user: "Priya Sharma",
      userId: "PSH001",
      role: "Senior Bank Officer",
      riskLevel: "Medium",
      ipAddress: "192.168.1.45",
      description: "Off-Site Surveillance Return for Q1 2024 submitted for review. Report contains deposit amounts of ₹2,45,67,000 and advance amounts of ₹1,89,45,000.",
      affectedEntities: ["OSS-2024-Q1-001", "Sangli Main Branch"],
      systemChanges: ["Report status: Draft → Pending Review", "Notification sent to approvers"],
      complianceImpact: "High - Regulatory submission within deadline"
    },
    {
      id: "AUD-2024-002", 
      timestamp: "2024-03-20 13:45:23",
      category: "User Management",
      action: "User Role Modified",
      user: "Admin System",
      userId: "SYS001",
      role: "System Administrator",
      riskLevel: "High",
      ipAddress: "10.0.0.1",
      description: "User role changed for Rahul Patil from 'Bank Officer' to 'Senior Bank Officer' with additional approval permissions.",
      affectedEntities: ["User: Rahul Patil (RPT001)", "Permission Set: Approval_L2"],
      systemChanges: ["Role assignment updated", "Approval limits increased to ₹5,00,00,000", "Access granted to Regulatory Reports module"],
      complianceImpact: "Medium - Enhanced access controls implemented"
    },
    {
      id: "AUD-2024-003",
      timestamp: "2024-03-20 12:18:07",
      category: "Report Approval",
      action: "Financial Report Approved", 
      user: "Meera Desai",
      userId: "MDS001",
      role: "Branch Manager",
      riskLevel: "Low",
      ipAddress: "192.168.1.67",
      description: "Financial Disclosure February 2024 approved after thorough review. All compliance checks passed.",
      affectedEntities: ["FIN-2024-02-002", "Sangli Corporate Branch"],
      systemChanges: ["Report status: Under Review → Approved", "RBI submission queue updated", "Compliance score updated"],
      complianceImpact: "High - Timely approval ensuring regulatory compliance"
    },
    {
      id: "AUD-2024-004",
      timestamp: "2024-03-20 11:22:41",
      category: "System Configuration",
      action: "Compliance Threshold Updated",
      user: "Vikram Jadhav",
      userId: "VJV001", 
      role: "Compliance Officer",
      riskLevel: "High",
      ipAddress: "192.168.1.89",
      description: "Updated CRAR minimum threshold from 12% to 12.5% as per new RBI guidelines effective April 2024.",
      affectedEntities: ["CRAR Configuration", "Risk Management Module", "Alert System"],
      systemChanges: ["Threshold value: 12% → 12.5%", "Alert triggers reconfigured", "Historical compliance recalculated"],
      complianceImpact: "Critical - Alignment with new regulatory requirements"
    },
    {
      id: "AUD-2024-005",
      timestamp: "2024-03-20 10:45:12",
      category: "Data Access",
      action: "Sensitive Data Accessed",
      user: "Anjali Kulkarni",
      userId: "AKL001",
      role: "Audit Officer", 
      riskLevel: "Medium",
      ipAddress: "192.168.1.23",
      description: "Accessed customer loan portfolio data for Asset Quality Review Q1 2024. Data export performed for offline analysis.",
      affectedEntities: ["Customer Loan Database", "AQR-2024-Q1", "Export Log"],
      systemChanges: ["Data access logged", "Export file generated (encrypted)", "Access timestamp recorded"],
      complianceImpact: "Medium - Authorized access for regulatory compliance"
    },
    {
      id: "AUD-2024-006",
      timestamp: "2024-03-20 09:15:33",
      category: "Security Event",
      action: "Failed Login Attempts Detected",
      user: "Unknown User",
      userId: "N/A",
      role: "N/A",
      riskLevel: "Critical",
      ipAddress: "203.194.45.123",
      description: "Multiple failed login attempts detected from external IP address. Account lockout triggered for user 'rpatil001' after 5 consecutive failures.",
      affectedEntities: ["User Account: rpatil001", "Security Module", "IP Blacklist"],
      systemChanges: ["Account locked for 30 minutes", "IP address temporarily blocked", "Security alert sent to admin"],
      complianceImpact: "High - Potential security threat mitigated"
    },
    {
      id: "AUD-2024-007",
      timestamp: "2024-03-19 16:30:45",
      category: "Report Generation",
      action: "Automated Report Generated",
      user: "System Scheduler",
      userId: "SCHED001",
      role: "System Process",
      riskLevel: "Low",
      ipAddress: "Internal",
      description: "Daily Cash Reserve Ratio report generated automatically. All branches' CRR compliance verified and documented.",
      affectedEntities: ["CRR Daily Report", "All Branches", "Compliance Dashboard"],
      systemChanges: ["Report generated and stored", "Compliance metrics updated", "Dashboard refreshed"],
      complianceImpact: "Medium - Regular compliance monitoring maintained"
    },
    {
      id: "AUD-2024-008",
      timestamp: "2024-03-19 15:22:18",
      category: "Data Modification",
      action: "Customer Risk Rating Updated",
      user: "Suresh Kale",
      userId: "SKL001",
      role: "Risk Manager",
      riskLevel: "Medium",
      ipAddress: "192.168.1.34",
      description: "Updated risk rating for corporate customer 'Maharashtra Steel Ltd' from Medium to High due to delayed EMI payments and industry downturn.",
      affectedEntities: ["Customer: Maharashtra Steel Ltd", "Risk Assessment Module", "Loan Portfolio"],
      systemChanges: ["Risk rating: Medium → High", "Credit limit review triggered", "Portfolio risk recalculated"],
      complianceImpact: "High - Proactive risk management for portfolio quality"
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Report Submission": return FileText;
      case "Report Approval": return CheckCircle;
      case "User Management": return User;
      case "System Configuration": return Settings;
      case "Data Access": return Eye;
      case "Security Event": return Shield;
      case "Report Generation": return FileText;
      case "Data Modification": return AlertTriangle;
      default: return Clock;
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "Critical": return "destructive";
      case "High": return "destructive";
      case "Medium": return "warning";
      case "Low": return "secondary";
      default: return "secondary";
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Security Event": return "destructive";
      case "System Configuration": return "warning";
      case "Report Approval": return "success";
      case "User Management": return "default";
      default: return "secondary";
    }
  };

  const handleExportAuditLog = () => {
    toast({
      title: "Audit Log Exported",
      description: "Complete audit trail has been exported to CSV format.",
    });
  };

  const filteredEvents = auditEvents.filter(event => {
    const categoryMatch = filterCategory === "all" || event.category === filterCategory;
    const riskMatch = filterRisk === "all" || event.riskLevel === filterRisk;
    const searchMatch = event.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       event.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       event.description.toLowerCase().includes(searchTerm.toLowerCase());
    return categoryMatch && riskMatch && searchMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Audit Trail</h1>
          <p className="text-muted-foreground">
            Comprehensive log of all system activities and user actions
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
          <Button onClick={handleExportAuditLog} className="w-full sm:w-auto" data-testid="button-export-audit">
            <Download className="mr-2 h-4 w-4" />
            Export Audit Log
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Security Events</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Last 7 days</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">User Actions</p>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-muted-foreground">Today</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Report Events</p>
                <p className="text-2xl font-bold">23</p>
                <p className="text-xs text-muted-foreground">This week</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <div>
                <p className="text-sm font-medium">High Risk Events</p>
                <p className="text-2xl font-bold">4</p>
                <p className="text-xs text-muted-foreground">Requires attention</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Audit Events</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search events, users, or actions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-audit"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger data-testid="select-category">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Report Submission">Report Submission</SelectItem>
                <SelectItem value="Report Approval">Report Approval</SelectItem>
                <SelectItem value="User Management">User Management</SelectItem>
                <SelectItem value="System Configuration">System Configuration</SelectItem>
                <SelectItem value="Data Access">Data Access</SelectItem>
                <SelectItem value="Security Event">Security Event</SelectItem>
                <SelectItem value="Data Modification">Data Modification</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterRisk} onValueChange={setFilterRisk}>
              <SelectTrigger data-testid="select-risk">
                <SelectValue placeholder="Filter by risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Risk Levels</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger data-testid="select-date">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Events Table */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Events</CardTitle>
          <CardDescription>
            Showing {filteredEvents.length} of {auditEvents.length} audit events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEvents.map((event) => {
                  const CategoryIcon = getCategoryIcon(event.category);
                  return (
                    <TableRow key={event.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <div>
                            <p className="text-sm font-medium">{event.timestamp.split(' ')[0]}</p>
                            <p className="text-xs text-muted-foreground">{event.timestamp.split(' ')[1]}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <CategoryIcon className="h-4 w-4" />
                          <Badge variant={getCategoryColor(event.category) as any}>
                            {event.category}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium" data-testid={`text-action-${event.id}`}>{event.action}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-xs">
                            {event.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{event.user}</p>
                          <p className="text-sm text-muted-foreground">{event.role}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRiskColor(event.riskLevel) as any}>
                          {event.riskLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedEvent(event)}
                          data-testid={`button-view-${event.id}`}
                        >
                          <Eye className="mr-1 h-3 w-3" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Event Details Dialog */}
      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedEvent?.action}</DialogTitle>
            <DialogDescription>
              Audit Event Details • ID: {selectedEvent?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedEvent && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-sm">Timestamp:</span>
                    <p className="text-sm">{selectedEvent.timestamp}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Category:</span>
                    <Badge variant={getCategoryColor(selectedEvent.category) as any} className="ml-2">
                      {selectedEvent.category}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Risk Level:</span>
                    <Badge variant={getRiskColor(selectedEvent.riskLevel) as any} className="ml-2">
                      {selectedEvent.riskLevel}
                    </Badge>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-sm">User:</span>
                    <p className="text-sm">{selectedEvent.user} ({selectedEvent.userId})</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Role:</span>
                    <p className="text-sm">{selectedEvent.role}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm">IP Address:</span>
                    <p className="text-sm">{selectedEvent.ipAddress}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <span className="font-medium text-sm">Description:</span>
                <p className="text-sm mt-1 p-3 bg-muted rounded-md">{selectedEvent.description}</p>
              </div>

              {/* Affected Entities */}
              <div>
                <span className="font-medium text-sm">Affected Entities:</span>
                <div className="mt-2 space-y-1">
                  {selectedEvent.affectedEntities.map((entity: string, index: number) => (
                    <div key={index} className="text-sm p-2 bg-blue-50 dark:bg-blue-950 rounded border-l-4 border-blue-500">
                      {entity}
                    </div>
                  ))}
                </div>
              </div>

              {/* System Changes */}
              <div>
                <span className="font-medium text-sm">System Changes:</span>
                <div className="mt-2 space-y-1">
                  {selectedEvent.systemChanges.map((change: string, index: number) => (
                    <div key={index} className="text-sm p-2 bg-green-50 dark:bg-green-950 rounded border-l-4 border-green-500">
                      {change}
                    </div>
                  ))}
                </div>
              </div>

              {/* Compliance Impact */}
              <div>
                <span className="font-medium text-sm">Compliance Impact:</span>
                <p className="text-sm mt-1 p-3 bg-orange-50 dark:bg-orange-950 rounded-md border-l-4 border-orange-500">
                  {selectedEvent.complianceImpact}
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuditTrail;