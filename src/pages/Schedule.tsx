import { Calendar, Clock, Plus, Settings, AlertTriangle, CheckCircle, Play, Pause, Edit, Trash2, Bell } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Schedule = () => {
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null);
  const [scheduleDialog, setScheduleDialog] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  const scheduledTasks = [
    {
      id: "SCH-2024-001",
      name: "OSS Return - Quarterly Submission",
      reportType: "OSS Return",
      frequency: "Quarterly",
      nextExecution: "2024-03-31 23:30:00",
      lastExecution: "2024-01-31 23:30:00",
      status: "Active",
      priority: "Critical",
      assignedTo: "Priya Sharma",
      description: "Automated generation and submission of quarterly OSS return to RBI",
      executionTime: "23:30",
      reminderDays: 7,
      autoSubmit: true,
      recipients: ["priya.sharma@sankbank.com", "compliance@sankbank.com"],
      branches: ["All Branches"],
      deadline: "2024-03-31",
      progress: 0
    },
    {
      id: "SCH-2024-002",
      name: "Monthly Financial Statements",
      reportType: "Financial Report",
      frequency: "Monthly",
      nextExecution: "2024-03-31 22:00:00",
      lastExecution: "2024-02-29 22:00:00",
      status: "Active",
      priority: "High",
      assignedTo: "Rahul Patil",
      description: "Monthly P&L, Balance Sheet, and Cash Flow statement generation",
      executionTime: "22:00",
      reminderDays: 3,
      autoSubmit: false,
      recipients: ["rahul.patil@sankbank.com", "accounts@sankbank.com"],
      branches: ["Sangli Main", "Sangli Corporate"],
      deadline: "2024-04-05",
      progress: 45
    },
    {
      id: "SCH-2024-003",
      name: "Daily CRR Compliance Check",
      reportType: "Regulatory Report",
      frequency: "Daily",
      nextExecution: "2024-03-21 09:00:00",
      lastExecution: "2024-03-20 09:00:00",
      status: "Active",
      priority: "Medium",
      assignedTo: "Vikram Jadhav",
      description: "Daily verification of Cash Reserve Ratio compliance across all branches",
      executionTime: "09:00",
      reminderDays: 1,
      autoSubmit: true,
      recipients: ["vikram.jadhav@sankbank.com"],
      branches: ["All Branches"],
      deadline: "2024-03-21",
      progress: 100
    },
    {
      id: "SCH-2024-004",
      name: "Asset Quality Review - Quarterly",
      reportType: "Risk Report",
      frequency: "Quarterly",
      nextExecution: "2024-04-15 18:00:00",
      lastExecution: "2024-01-15 18:00:00",
      status: "Paused",
      priority: "High",
      assignedTo: "Meera Desai",
      description: "Comprehensive asset quality analysis with NPA classification and provisioning",
      executionTime: "18:00",
      reminderDays: 14,
      autoSubmit: false,
      recipients: ["meera.desai@sankbank.com", "risk@sankbank.com"],
      branches: ["All Branches"],
      deadline: "2024-04-30",
      progress: 0
    },
    {
      id: "SCH-2024-005",
      name: "Weekly Liquidity Monitoring",
      reportType: "Basel III Report",
      frequency: "Weekly",
      nextExecution: "2024-03-25 16:30:00",
      lastExecution: "2024-03-18 16:30:00",
      status: "Active",
      priority: "Medium",
      assignedTo: "Anjali Kulkarni",
      description: "Weekly LCR monitoring and HQLA adequacy assessment",
      executionTime: "16:30",
      reminderDays: 2,
      autoSubmit: true,
      recipients: ["anjali.kulkarni@sankbank.com", "treasury@sankbank.com"],
      branches: ["Sangli Main"],
      deadline: "2024-03-26",
      progress: 75
    },
    {
      id: "SCH-2024-006",
      name: "Monthly Compliance Scorecard",
      reportType: "Compliance Report",
      frequency: "Monthly",
      nextExecution: "2024-04-01 10:00:00",
      lastExecution: "2024-03-01 10:00:00",
      status: "Active",
      priority: "Medium",
      assignedTo: "Suresh Kale",
      description: "Comprehensive compliance performance tracking and regulatory adherence metrics",
      executionTime: "10:00",
      reminderDays: 5,
      autoSubmit: false,
      recipients: ["suresh.kale@sankbank.com", "audit@sankbank.com"],
      branches: ["All Branches"],
      deadline: "2024-04-05",
      progress: 20
    }
  ];

  const upcomingDeadlines = [
    {
      id: "DL-2024-001",
      reportName: "Priority Sector Lending Return Q1",
      deadline: "2024-03-31",
      daysRemaining: 11,
      assignedTo: "Priya Sharma",
      status: "In Progress",
      priority: "Critical",
      completionPercentage: 75,
      lastUpdate: "2024-03-20"
    },
    {
      id: "DL-2024-002",
      reportName: "CRAR Calculation Q1 2024",
      deadline: "2024-04-15",
      daysRemaining: 26,
      assignedTo: "Vikram Jadhav",
      status: "Not Started",
      priority: "High",
      completionPercentage: 0,
      lastUpdate: "2024-03-18"
    },
    {
      id: "DL-2024-003",
      reportName: "Cyber Security Assessment",
      deadline: "2024-04-10",
      daysRemaining: 21,
      assignedTo: "Meera Desai",
      status: "In Progress",
      priority: "High",
      completionPercentage: 40,
      lastUpdate: "2024-03-19"
    },
    {
      id: "DL-2024-004",
      reportName: "Annual Credit Policy Review",
      deadline: "2024-04-30",
      daysRemaining: 41,
      assignedTo: "Rahul Patil",
      status: "In Progress",
      priority: "Medium",
      completionPercentage: 25,
      lastUpdate: "2024-03-15"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "success";
      case "Paused": return "warning";
      case "Completed": return "default";
      case "Failed": return "destructive";
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

  const getDeadlineColor = (daysRemaining: number) => {
    if (daysRemaining <= 7) return "destructive";
    if (daysRemaining <= 14) return "warning";
    return "success";
  };

  const handleToggleSchedule = (scheduleId: string, currentStatus: string) => {
    const newStatus = currentStatus === "Active" ? "Paused" : "Active";
    toast({
      title: `Schedule ${newStatus}`,
      description: `Schedule ${scheduleId} has been ${newStatus.toLowerCase()}.`,
    });
  };

  const handleDeleteSchedule = (scheduleId: string) => {
    toast({
      title: "Schedule Deleted",
      description: `Schedule ${scheduleId} has been permanently deleted.`,
    });
  };

  const handleCreateSchedule = () => {
    toast({
      title: "Schedule Created",
      description: "New automated schedule has been created successfully.",
    });
    setScheduleDialog(false);
  };

  const handleRunNow = (scheduleId: string) => {
    toast({
      title: "Manual Execution Started",
      description: `Schedule ${scheduleId} is now running manually.`,
    });
  };

  const filteredSchedules = scheduledTasks.filter(schedule => {
    const statusMatch = filterStatus === "all" || schedule.status === filterStatus;
    const typeMatch = filterType === "all" || schedule.reportType === filterType;
    return statusMatch && typeMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Schedule Management</h1>
          <p className="text-muted-foreground">
            Manage automated report generation and regulatory submission deadlines
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Settings className="mr-2 h-4 w-4" />
            Schedule Settings
          </Button>
          <Button 
            onClick={() => setScheduleDialog(true)} 
            className="w-full sm:w-auto"
            data-testid="button-new-schedule"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Schedule
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Active Schedules</p>
                <p className="text-2xl font-bold">5</p>
                <p className="text-xs text-muted-foreground">Running automatically</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Due This Week</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">Upcoming deadlines</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Overdue</p>
                <p className="text-2xl font-bold">0</p>
                <p className="text-xs text-muted-foreground">No missed deadlines</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scheduled Tasks */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Automated Schedules</CardTitle>
            <CardDescription>
              Recurring report generation and submission schedules
            </CardDescription>
            <div className="flex gap-2">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32" data-testid="select-status">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Paused">Paused</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-40" data-testid="select-type">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="OSS Return">OSS Return</SelectItem>
                  <SelectItem value="Financial Report">Financial</SelectItem>
                  <SelectItem value="Risk Report">Risk</SelectItem>
                  <SelectItem value="Regulatory Report">Regulatory</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {filteredSchedules.map((schedule) => (
                <div key={schedule.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm" data-testid={`text-schedule-${schedule.id}`}>
                        {schedule.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        {schedule.frequency} • {schedule.assignedTo}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      <Badge variant={getStatusColor(schedule.status) as any} className="text-xs">
                        {schedule.status}
                      </Badge>
                      <Badge variant={getPriorityColor(schedule.priority) as any} className="text-xs">
                        {schedule.priority}
                      </Badge>
                    </div>
                  </div>

                  <div className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Next run:</span>
                      <span>{schedule.nextExecution}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deadline:</span>
                      <span>{schedule.deadline}</span>
                    </div>
                    {schedule.progress > 0 && (
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Progress:</span>
                        <span>{schedule.progress}%</span>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleRunNow(schedule.id)}
                      data-testid={`button-run-${schedule.id}`}
                    >
                      <Play className="h-3 w-3 mr-1" />
                      Run Now
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleToggleSchedule(schedule.id, schedule.status)}
                      data-testid={`button-toggle-${schedule.id}`}
                    >
                      {schedule.status === "Active" ? 
                        <><Pause className="h-3 w-3 mr-1" />Pause</> : 
                        <><Play className="h-3 w-3 mr-1" />Resume</>
                      }
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedSchedule(schedule)}
                      data-testid={`button-view-${schedule.id}`}
                    >
                      <Edit className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>
              Regulatory submission deadlines and progress tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {upcomingDeadlines.map((deadline) => (
                <div key={deadline.id} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm" data-testid={`text-deadline-${deadline.id}`}>
                        {deadline.reportName}
                      </h4>
                      <p className="text-xs text-muted-foreground mt-1">
                        Assigned to: {deadline.assignedTo}
                      </p>
                    </div>
                    <Badge variant={getPriorityColor(deadline.priority) as any} className="text-xs">
                      {deadline.priority}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Due:</span>
                      <div className="text-right">
                        <Badge variant={getDeadlineColor(deadline.daysRemaining) as any} className="text-xs">
                          {deadline.daysRemaining} days
                        </Badge>
                        <p className="text-muted-foreground mt-1">{deadline.deadline}</p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-muted-foreground">Progress:</span>
                        <span>{deadline.completionPercentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${deadline.completionPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">Status:</span>
                      <Badge variant={deadline.status === "In Progress" ? "default" : "secondary"} className="text-xs">
                        {deadline.status}
                      </Badge>
                    </div>
                  </div>

                  <Button variant="outline" size="sm" className="w-full" data-testid={`button-update-${deadline.id}`}>
                    <Edit className="h-3 w-3 mr-1" />
                    Update Progress
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Schedule Dialog */}
      <Dialog open={scheduleDialog} onOpenChange={setScheduleDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Schedule</DialogTitle>
            <DialogDescription>
              Set up automated report generation and submission
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Basic Information */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="scheduleName">Schedule Name</Label>
                <Input id="scheduleName" placeholder="Enter schedule name" />
              </div>
              <div>
                <Label htmlFor="reportType">Report Type</Label>
                <Select>
                  <SelectTrigger id="reportType">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="oss">OSS Return</SelectItem>
                    <SelectItem value="financial">Financial Report</SelectItem>
                    <SelectItem value="risk">Risk Report</SelectItem>
                    <SelectItem value="regulatory">Regulatory Report</SelectItem>
                    <SelectItem value="compliance">Compliance Report</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Frequency and Timing */}
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="frequency">Frequency</Label>
                <Select>
                  <SelectTrigger id="frequency">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="executionTime">Execution Time</Label>
                <Input id="executionTime" type="time" defaultValue="09:00" />
              </div>
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Assignment and Notifications */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assignedTo">Assigned To</Label>
                <Select>
                  <SelectTrigger id="assignedTo">
                    <SelectValue placeholder="Select user" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="priya">Priya Sharma</SelectItem>
                    <SelectItem value="rahul">Rahul Patil</SelectItem>
                    <SelectItem value="meera">Meera Desai</SelectItem>
                    <SelectItem value="vikram">Vikram Jadhav</SelectItem>
                    <SelectItem value="anjali">Anjali Kulkarni</SelectItem>
                    <SelectItem value="suresh">Suresh Kale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="reminderDays">Reminder (Days Before)</Label>
                <Input id="reminderDays" type="number" defaultValue="7" min="1" max="30" />
              </div>
            </div>

            {/* Auto-submit Settings */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="autoSubmit" />
                <Label htmlFor="autoSubmit">Auto-submit to RBI after generation</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="emailNotifications" defaultChecked />
                <Label htmlFor="emailNotifications">Send email notifications</Label>
              </div>
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description"
                placeholder="Enter schedule description and any special instructions..."
                className="mt-1"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setScheduleDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateSchedule} data-testid="button-create-schedule">
                Create Schedule
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Schedule Details Dialog */}
      <Dialog open={!!selectedSchedule} onOpenChange={() => setSelectedSchedule(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedSchedule?.name}</DialogTitle>
            <DialogDescription>
              Schedule Details • ID: {selectedSchedule?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedSchedule && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-sm">Status:</span>
                    <Badge variant={getStatusColor(selectedSchedule.status) as any} className="ml-2">
                      {selectedSchedule.status}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Frequency:</span>
                    <p className="text-sm">{selectedSchedule.frequency}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Execution Time:</span>
                    <p className="text-sm">{selectedSchedule.executionTime}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Assigned To:</span>
                    <p className="text-sm">{selectedSchedule.assignedTo}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-sm">Priority:</span>
                    <Badge variant={getPriorityColor(selectedSchedule.priority) as any} className="ml-2">
                      {selectedSchedule.priority}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Next Execution:</span>
                    <p className="text-sm">{selectedSchedule.nextExecution}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Last Execution:</span>
                    <p className="text-sm">{selectedSchedule.lastExecution}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Auto Submit:</span>
                    <p className="text-sm">{selectedSchedule.autoSubmit ? "Yes" : "No"}</p>
                  </div>
                </div>
              </div>

              <div>
                <span className="font-medium text-sm">Description:</span>
                <p className="text-sm mt-1 p-3 bg-muted rounded-md">{selectedSchedule.description}</p>
              </div>

              <div>
                <span className="font-medium text-sm">Recipients:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedSchedule.recipients.map((email: string, index: number) => (
                    <Badge key={index} variant="outline">
                      {email}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <span className="font-medium text-sm">Branches:</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedSchedule.branches.map((branch: string, index: number) => (
                    <Badge key={index} variant="secondary">
                      {branch}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button 
                  variant="outline"
                  onClick={() => handleToggleSchedule(selectedSchedule.id, selectedSchedule.status)}
                >
                  {selectedSchedule.status === "Active" ? 
                    <><Pause className="mr-2 h-4 w-4" />Pause Schedule</> : 
                    <><Play className="mr-2 h-4 w-4" />Resume Schedule</>
                  }
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleRunNow(selectedSchedule.id)}
                >
                  <Play className="mr-2 h-4 w-4" />
                  Run Now
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => handleDeleteSchedule(selectedSchedule.id)}
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Schedule;