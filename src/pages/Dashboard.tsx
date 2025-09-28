import { FileText, TriangleAlert as AlertTriangle, CircleCheck as CheckCircle, Clock, TrendingUp, Users, Shield, Download, Eye, Calendar, IndianRupee, Building, User, Plus, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Dashboard = () => {
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [selectedDeadline, setSelectedDeadline] = useState<any>(null);
  const [quickActionDialog, setQuickActionDialog] = useState<string | null>(null);

  const stats = [
    {
      title: "Total Reports Generated",
      value: "1,247",
      change: "+18.2%",
      trend: "up",
      icon: FileText,
      description: "This quarter",
      details: "OSS: 45, Financial: 23, Statutory: 67, Compliance: 112"
    },
    {
      title: "Pending Approvals",
      value: "23",
      change: "-12",
      trend: "down",
      icon: Clock,
      description: "Awaiting review",
      details: "High Priority: 7, Medium: 11, Low: 5"
    },
    {
      title: "Compliance Score",
      value: "97.8%",
      change: "+1.3%",
      trend: "up",
      icon: Shield,
      description: "RBI compliance rate",
      details: "Target: 95%, Industry Avg: 89.2%"
    },
    {
      title: "Active Banking Staff",
      value: "156",
      change: "+8",
      trend: "up",
      icon: Users,
      description: "Authorized users",
      details: "Officers: 45, Clerks: 89, Managers: 22"
    }
  ];

  const recentReports = [
    {
      id: "OSS-2024-Q1-001",
      name: "Off-Site Surveillance Return Q1 2024",
      type: "OSS Return",
      status: "Approved",
      submittedBy: "Priya Sharma",
      date: "2024-03-15",
      amount: "₹2,45,67,89,000",
      branch: "Sangli Main",
      details: {
        deposits: "₹1,89,45,23,000",
        advances: "₹1,23,67,89,000",
        npa: "2.3%",
        crar: "14.5%"
      }
    },
    {
      id: "FIN-2024-02-002",
      name: "Financial Disclosure February 2024",
      type: "Financial Report",
      status: "Under Review", 
      submittedBy: "Rahul Patil",
      date: "2024-03-14",
      amount: "₹3,78,90,12,000",
      branch: "Sangli Corporate",
      details: {
        netProfit: "₹12,34,56,000",
        totalAssets: "₹3,78,90,12,000",
        roi: "1.8%",
        nim: "3.2%"
      }
    },
    {
      id: "STAT-2024-03-003",
      name: "Statutory Liquidity Ratio Report",
      type: "Statutory Report",
      status: "Draft",
      submittedBy: "Anjali Kulkarni",
      date: "2024-03-13",
      amount: "₹1,56,78,90,000",
      branch: "Sangli Rural",
      details: {
        slrMaintained: "₹1,56,78,90,000",
        slrRequired: "₹1,45,67,89,000",
        excess: "₹11,11,01,000",
        percentage: "23.5%"
      }
    },
    {
      id: "CRR-2024-03-004",
      name: "Cash Reserve Ratio Compliance",
      type: "Regulatory Report",
      status: "Pending Submission",
      submittedBy: "Vikram Jadhav",
      date: "2024-03-12",
      amount: "₹89,45,67,000",
      branch: "Sangli Digital",
      details: {
        crrMaintained: "₹89,45,67,000",
        crrRequired: "₹87,23,45,000",
        excess: "₹2,22,22,000",
        percentage: "4.2%"
      }
    }
  ];

  const upcomingDeadlines = [
    {
      id: "PSL-Q1-2024",
      report: "Priority Sector Lending Return Q1",
      deadline: "March 31, 2024",
      daysLeft: 5,
      priority: "Critical",
      assignedTo: "Suresh Kale",
      description: "Agriculture: 18%, MSME: 7.5%, Housing: 2.5%",
      actions: ["Review Data", "Validate Calculations", "Submit to RBI"],
      completedActions: 1
    },
    {
      id: "AQR-2024",
      report: "Asset Quality Review Report",
      deadline: "April 15, 2024",
      daysLeft: 20,
      priority: "High",
      assignedTo: "Meera Desai",
      description: "NPA Classification and Provisioning Review",
      actions: ["Data Collection", "NPA Analysis", "Provision Calculation", "Management Review"],
      completedActions: 2
    },
    {
      id: "CRAR-Q1-2024",
      report: "Capital Adequacy Ratio Report",
      deadline: "April 30, 2024",
      daysLeft: 35,
      priority: "Medium",
      assignedTo: "Amit Bhosale",
      description: "Tier 1 & Tier 2 Capital Assessment",
      actions: ["Capital Calculation", "Risk Weight Assessment", "Final Review"],
      completedActions: 0
    },
    {
      id: "LCR-MAR-2024",
      report: "Liquidity Coverage Ratio March",
      deadline: "April 10, 2024",
      daysLeft: 15,
      priority: "High",
      assignedTo: "Pooja Shinde",
      description: "High Quality Liquid Assets Assessment",
      actions: ["HQLA Calculation", "Net Cash Outflow", "Ratio Computation"],
      completedActions: 1
    },
    {
      id: "CYBER-SEC-Q1",
      report: "Cyber Security Incident Report",
      deadline: "April 5, 2024",
      daysLeft: 10,
      priority: "Critical",
      assignedTo: "Ravi Pawar",
      description: "Q1 Security Assessment and Incident Analysis",
      actions: ["Incident Review", "Vulnerability Assessment", "Mitigation Plan"],
      completedActions: 2
    }
  ];

  const quickActions = [
    {
      id: "oss-return",
      title: "New OSS Return",
      icon: FileText,
      description: "Generate Off-Site Surveillance Return",
      fields: ["Reporting Period", "Branch Code", "Deposit Amount", "Advance Amount"]
    },
    {
      id: "review-pending",
      title: "Review Pending",
      icon: CheckCircle,
      description: "Review pending compliance reports",
      fields: ["Report Type", "Priority Level", "Assigned Officer", "Review Comments"]
    },
    {
      id: "compliance-check",
      title: "Run Compliance Check",
      icon: Shield,
      description: "Execute automated compliance validation",
      fields: ["Check Type", "Date Range", "Branch Selection", "Validation Rules"]
    },
    {
      id: "export-reports",
      title: "Export Reports",
      icon: Download,
      description: "Export reports in various formats",
      fields: ["Report Selection", "Date Range", "Export Format", "Recipient Email"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "success";
      case "Under Review": return "warning";
      case "Draft": return "secondary";
      case "Pending Submission": return "destructive";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "destructive";
      case "High": return "warning";
      case "Medium": return "secondary";
      default: return "success";
    }
  };

  const handleQuickAction = (actionId: string) => {
    setQuickActionDialog(actionId);
  };

  const handleSaveQuickAction = () => {
    toast({
      title: "Action Completed",
      description: "Your request has been processed successfully.",
    });
    setQuickActionDialog(null);
  };

  const markActionComplete = (deadlineId: string, actionIndex: number) => {
    toast({
      title: "Action Completed",
      description: "Task marked as completed.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Banking Compliance & Audit Portal</h1>
          <p className="text-muted-foreground">
            List Bank - Sangli Office, Maharashtra
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Download className="mr-2 h-4 w-4" />
            Export Dashboard
          </Button>
          <Button className="w-full sm:w-auto">Generate New Report</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl sm:text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                <TrendingUp className={`h-3 w-3 ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`} />
                <span className={stat.trend === 'up' ? 'text-success' : 'text-destructive'}>
                  {stat.change}
                </span>
                <span>{stat.description}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-2">{stat.details}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reports */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Recent Reports
            </CardTitle>
            <CardDescription>
              Latest banking compliance reports submitted by your team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
                      <h4 className="font-medium truncate">{report.name}</h4>
                      <Badge variant={getStatusColor(report.status) as any} className="w-fit">
                        {report.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {report.type} • {report.submittedBy} • {report.date}
                    </p>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 mt-1">
                      <p className="text-sm font-medium text-primary">
                        Amount: {report.amount}
                      </p>
                      <span className="text-sm text-muted-foreground">• {report.branch}</span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedReport(report)}
                    className="w-full sm:w-auto"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-warning" />
              Upcoming Deadlines
            </CardTitle>
            <CardDescription>
              RBI submission deadlines and action items
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {upcomingDeadlines.map((item) => (
                <div key={item.id} className="space-y-3 p-3 border rounded-lg">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{item.report}</h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Assigned to: {item.assignedTo}
                      </p>
                    </div>
                    <Badge variant={getPriorityColor(item.priority) as any} className="text-xs ml-2">
                      {item.priority}
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground">
                    Due: {item.deadline}
                  </p>
                  
                  <div className="flex items-center space-x-2">
                    <Progress 
                      value={Math.max(0, 100 - (item.daysLeft * 2))} 
                      className="flex-1 h-2"
                    />
                    <span className="text-xs font-medium whitespace-nowrap">
                      {item.daysLeft} days
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                    <div className="text-xs">
                      <span className="font-medium">Progress: </span>
                      <span>{item.completedActions}/{item.actions.length} actions completed</span>
                    </div>
                  </div>

                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setSelectedDeadline(item)}
                  >
                    View Actions
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Frequently used banking compliance tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button 
                key={action.id}
                variant="outline" 
                className="h-20 flex-col p-4 hover:shadow-md transition-shadow"
                onClick={() => handleQuickAction(action.id)}
              >
                <action.icon className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium text-center">{action.title}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Details Dialog */}
      <Dialog open={!!selectedReport} onOpenChange={() => setSelectedReport(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedReport?.name}</DialogTitle>
            <DialogDescription>
              Detailed view of {selectedReport?.type}
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium">Report ID:</span>
                  <p>{selectedReport.id}</p>
                </div>
                <div>
                  <span className="font-medium">Status:</span>
                  <Badge variant={getStatusColor(selectedReport.status) as any} className="ml-2">
                    {selectedReport.status}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium">Submitted By:</span>
                  <p>{selectedReport.submittedBy}</p>
                </div>
                <div>
                  <span className="font-medium">Branch:</span>
                  <p>{selectedReport.branch}</p>
                </div>
                <div>
                  <span className="font-medium">Amount:</span>
                  <p className="text-primary font-medium">{selectedReport.amount}</p>
                </div>
                <div>
                  <span className="font-medium">Date:</span>
                  <p>{selectedReport.date}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Financial Details</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {Object.entries(selectedReport.details).map(([key, value]) => (
                    <div key={key}>
                      <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                      <p>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Deadline Actions Dialog */}
      <Dialog open={!!selectedDeadline} onOpenChange={() => setSelectedDeadline(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedDeadline?.report}</DialogTitle>
            <DialogDescription>
              Action items and progress tracking
            </DialogDescription>
          </DialogHeader>
          {selectedDeadline && (
            <div className="space-y-4">
              <div className="text-sm">
                <p><span className="font-medium">Assigned to:</span> {selectedDeadline.assignedTo}</p>
                <p><span className="font-medium">Deadline:</span> {selectedDeadline.deadline}</p>
                <p><span className="font-medium">Days Left:</span> {selectedDeadline.daysLeft}</p>
                <p className="mt-2">{selectedDeadline.description}</p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Action Items</h4>
                {selectedDeadline.actions.map((action: string, index: number) => (
                  <div key={index} className="flex items-center justify-between p-2 border rounded">
                    <span className="text-sm">{action}</span>
                    <Button
                      size="sm"
                      variant={index < selectedDeadline.completedActions ? "default" : "outline"}
                      onClick={() => markActionComplete(selectedDeadline.id, index)}
                      disabled={index < selectedDeadline.completedActions}
                    >
                      {index < selectedDeadline.completedActions ? "Completed" : "Mark Complete"}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Quick Action Dialog */}
      <Dialog open={!!quickActionDialog} onOpenChange={() => setQuickActionDialog(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {quickActions.find(a => a.id === quickActionDialog)?.title}
            </DialogTitle>
            <DialogDescription>
              {quickActions.find(a => a.id === quickActionDialog)?.description}
            </DialogDescription>
          </DialogHeader>
          {quickActionDialog && (
            <div className="space-y-4">
              {quickActions.find(a => a.id === quickActionDialog)?.fields.map((field, index) => (
                <div key={index}>
                  <label className="text-sm font-medium">{field}</label>
                  <input 
                    className="w-full mt-1 px-3 py-2 border rounded-md"
                    placeholder={`Enter ${field.toLowerCase()}`}
                  />
                </div>
              ))}
              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveQuickAction} className="flex-1">
                  Save & Process
                </Button>
                <Button variant="outline" onClick={() => setQuickActionDialog(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;