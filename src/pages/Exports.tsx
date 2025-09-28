import { Download, Calendar, FileText, Filter, Search, Clock, CheckCircle, AlertCircle, Settings, Plus, X } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Exports = () => {
  const [selectedExport, setSelectedExport] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [exportDialog, setExportDialog] = useState(false);
  const [selectedReports, setSelectedReports] = useState<string[]>([]);

  const exportHistory = [
    {
      id: "EXP-2024-001",
      reportName: "OSS Return Q1 2024 - Complete Dataset",
      reportType: "OSS Return",
      format: "Excel",
      status: "Completed",
      requestedBy: "Priya Sharma",
      requestedAt: "2024-03-20 15:30:22",
      completedAt: "2024-03-20 15:32:15",
      fileSize: "2.4 MB",
      downloadCount: 3,
      expiryDate: "2024-04-20",
      description: "Complete OSS return data with all branches for Q1 2024 regulatory submission",
      includesData: ["Deposit amounts", "Advance amounts", "NPA details", "CRAR calculations", "Branch-wise breakdown"]
    },
    {
      id: "EXP-2024-002",
      reportName: "Financial Statements - February 2024",
      reportType: "Financial Report",
      format: "PDF",
      status: "Completed",
      requestedBy: "Rahul Patil",
      requestedAt: "2024-03-20 14:22:33",
      completedAt: "2024-03-20 14:28:41",
      fileSize: "1.8 MB",
      downloadCount: 5,
      expiryDate: "2024-04-20",
      description: "Monthly financial statements including P&L, Balance Sheet, and Cash Flow",
      includesData: ["Profit & Loss Statement", "Balance Sheet", "Cash Flow Statement", "Notes to accounts", "Auditor remarks"]
    },
    {
      id: "EXP-2024-003",
      reportName: "Asset Quality Review - March 2024",
      reportType: "Risk Report",
      format: "Excel",
      status: "Processing",
      requestedBy: "Meera Desai",
      requestedAt: "2024-03-20 13:45:12",
      completedAt: null,
      fileSize: null,
      downloadCount: 0,
      expiryDate: "2024-04-20",
      description: "Comprehensive asset quality analysis with NPA classification and provisioning",
      includesData: ["NPA classification", "Provisioning details", "Recovery statistics", "Industry-wise analysis", "Vintage analysis"]
    },
    {
      id: "EXP-2024-004",
      reportName: "Liquidity Coverage Ratio - Q1 2024",
      reportType: "Basel III Report",
      format: "CSV",
      status: "Failed",
      requestedBy: "Anjali Kulkarni",
      requestedAt: "2024-03-20 12:15:45",
      completedAt: null,
      fileSize: null,
      downloadCount: 0,
      expiryDate: "2024-04-20",
      description: "LCR calculations and HQLA breakdown for regulatory reporting",
      includesData: ["HQLA breakdown", "Net cash outflow", "LCR ratios", "Stress test results", "Scenario analysis"]
    },
    {
      id: "EXP-2024-005",
      reportName: "Credit Risk Portfolio Analysis",
      reportType: "Risk Report",
      format: "PDF",
      status: "Completed",
      requestedBy: "Vikram Jadhav",
      requestedAt: "2024-03-19 16:30:20",
      completedAt: "2024-03-19 16:45:33",
      fileSize: "3.2 MB",
      downloadCount: 2,
      expiryDate: "2024-04-19",
      description: "Portfolio-level credit risk analysis with exposure limits and concentration metrics",
      includesData: ["Exposure by industry", "Credit ratings distribution", "Concentration limits", "PD/LGD analysis", "Economic capital"]
    },
    {
      id: "EXP-2024-006",
      reportName: "Compliance Scorecard - March 2024",
      reportType: "Compliance Report",
      format: "Excel",
      status: "Completed",
      requestedBy: "Suresh Kale",
      requestedAt: "2024-03-19 15:20:15",
      completedAt: "2024-03-19 15:22:08",
      fileSize: "1.1 MB",
      downloadCount: 8,
      expiryDate: "2024-04-19",
      description: "Monthly compliance performance across all regulatory requirements",
      includesData: ["RBI compliance metrics", "KYC statistics", "AML reporting", "Internal audit findings", "Remediation status"]
    }
  ];

  const availableReports = [
    {
      id: "rpt-oss",
      name: "OSS Return",
      description: "Off-Site Surveillance Return with deposit and advance details",
      lastGenerated: "2024-03-20",
      estimatedSize: "2-3 MB"
    },
    {
      id: "rpt-financial",
      name: "Financial Statements",
      description: "Monthly P&L, Balance Sheet, and Cash Flow statements",
      lastGenerated: "2024-03-20",
      estimatedSize: "1-2 MB"
    },
    {
      id: "rpt-aqr",
      name: "Asset Quality Review",
      description: "NPA analysis, provisioning, and asset classification",
      lastGenerated: "2024-03-19",
      estimatedSize: "3-4 MB"
    },
    {
      id: "rpt-lcr",
      name: "Liquidity Coverage Ratio",
      description: "LCR calculations and high-quality liquid assets breakdown",
      lastGenerated: "2024-03-18",
      estimatedSize: "1-2 MB"
    },
    {
      id: "rpt-credit",
      name: "Credit Risk Analysis",
      description: "Portfolio credit risk with exposure and concentration metrics",
      lastGenerated: "2024-03-19",
      estimatedSize: "2-3 MB"
    },
    {
      id: "rpt-compliance",
      name: "Compliance Scorecard",
      description: "Regulatory compliance performance and audit findings",
      lastGenerated: "2024-03-20",
      estimatedSize: "1 MB"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "success";
      case "Processing": return "warning";
      case "Failed": return "destructive";
      case "Scheduled": return "default";
      default: return "secondary";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed": return CheckCircle;
      case "Processing": return Clock;
      case "Failed": return AlertCircle;
      default: return Clock;
    }
  };

  const handleDownload = (exportId: string) => {
    toast({
      title: "Download Started",
      description: `Export ${exportId} download has been initiated.`,
    });
  };

  const handleRetryExport = (exportId: string) => {
    toast({
      title: "Export Retried",
      description: `Export ${exportId} has been queued for retry.`,
    });
  };

  const handleNewExport = () => {
    if (selectedReports.length === 0) {
      toast({
        title: "No Reports Selected",
        description: "Please select at least one report to export.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Export Initiated",
      description: `${selectedReports.length} reports have been queued for export.`,
    });
    setExportDialog(false);
    setSelectedReports([]);
  };

  const filteredExports = exportHistory.filter(exp => {
    const statusMatch = filterStatus === "all" || exp.status === filterStatus;
    const typeMatch = filterType === "all" || exp.reportType === filterType;
    const searchMatch = exp.reportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       exp.requestedBy.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && typeMatch && searchMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Report Exports</h1>
          <p className="text-muted-foreground">
            Export and download banking compliance reports in various formats
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Settings className="mr-2 h-4 w-4" />
            Export Settings
          </Button>
          <Button 
            onClick={() => setExportDialog(true)} 
            className="w-full sm:w-auto"
            data-testid="button-new-export"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Download className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Total Exports</p>
                <p className="text-2xl font-bold">156</p>
                <p className="text-xs text-muted-foreground">This month</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Completed</p>
                <p className="text-2xl font-bold">142</p>
                <p className="text-xs text-muted-foreground">Success rate: 91%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-orange-500" />
              <div>
                <p className="text-sm font-medium">Processing</p>
                <p className="text-2xl font-bold">3</p>
                <p className="text-xs text-muted-foreground">In progress</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-purple-500" />
              <div>
                <p className="text-sm font-medium">Data Volume</p>
                <p className="text-2xl font-bold">24.7 GB</p>
                <p className="text-xs text-muted-foreground">Exported this month</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter Exports</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search exports or users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-exports"
              />
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger data-testid="select-status">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Processing">Processing</SelectItem>
                <SelectItem value="Failed">Failed</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger data-testid="select-type">
                <SelectValue placeholder="Filter by report type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Report Types</SelectItem>
                <SelectItem value="OSS Return">OSS Return</SelectItem>
                <SelectItem value="Financial Report">Financial Report</SelectItem>
                <SelectItem value="Risk Report">Risk Report</SelectItem>
                <SelectItem value="Basel III Report">Basel III Report</SelectItem>
                <SelectItem value="Compliance Report">Compliance Report</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Export History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Export History</CardTitle>
          <CardDescription>
            Showing {filteredExports.length} of {exportHistory.length} exports
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Requested By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredExports.map((exp) => {
                  const StatusIcon = getStatusIcon(exp.status);
                  return (
                    <TableRow key={exp.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div>
                          <p className="font-medium" data-testid={`text-report-${exp.id}`}>{exp.reportName}</p>
                          <p className="text-sm text-muted-foreground">{exp.format} format</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{exp.reportType}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <StatusIcon className="h-4 w-4" />
                          <Badge variant={getStatusColor(exp.status) as any}>
                            {exp.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{exp.requestedBy}</p>
                          <p className="text-sm text-muted-foreground">
                            Downloads: {exp.downloadCount}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="text-sm">{exp.requestedAt.split(' ')[0]}</p>
                          <p className="text-xs text-muted-foreground">{exp.requestedAt.split(' ')[1]}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <p className="text-sm">{exp.fileSize || 'N/A'}</p>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          {exp.status === "Completed" && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDownload(exp.id)}
                              data-testid={`button-download-${exp.id}`}
                            >
                              <Download className="h-3 w-3 mr-1" />
                              Download
                            </Button>
                          )}
                          {exp.status === "Failed" && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleRetryExport(exp.id)}
                              data-testid={`button-retry-${exp.id}`}
                            >
                              Retry
                            </Button>
                          )}
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedExport(exp)}
                            data-testid={`button-view-${exp.id}`}
                          >
                            View Details
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

      {/* New Export Dialog */}
      <Dialog open={exportDialog} onOpenChange={setExportDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>New Report Export</DialogTitle>
            <DialogDescription>
              Select reports and configure export settings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            {/* Report Selection */}
            <div>
              <Label className="text-base font-medium">Select Reports to Export</Label>
              <div className="mt-3 space-y-3 max-h-60 overflow-y-auto">
                {availableReports.map((report) => (
                  <div key={report.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                    <Checkbox
                      id={report.id}
                      checked={selectedReports.includes(report.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedReports([...selectedReports, report.id]);
                        } else {
                          setSelectedReports(selectedReports.filter(id => id !== report.id));
                        }
                      }}
                    />
                    <div className="flex-1">
                      <Label htmlFor={report.id} className="font-medium cursor-pointer">
                        {report.name}
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">{report.description}</p>
                      <div className="flex justify-between text-xs text-muted-foreground mt-2">
                        <span>Last generated: {report.lastGenerated}</span>
                        <span>Est. size: {report.estimatedSize}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Export Configuration */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="format">Export Format</Label>
                <Select defaultValue="excel">
                  <SelectTrigger id="format">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excel">Excel (.xlsx)</SelectItem>
                    <SelectItem value="csv">CSV (.csv)</SelectItem>
                    <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                    <SelectItem value="json">JSON (.json)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="schedule">Schedule Export</Label>
                <Select defaultValue="now">
                  <SelectTrigger id="schedule">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">Export Now</SelectItem>
                    <SelectItem value="1hour">In 1 Hour</SelectItem>
                    <SelectItem value="eod">End of Day</SelectItem>
                    <SelectItem value="tomorrow">Tomorrow 9 AM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Additional Notes */}
            <div>
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea 
                id="notes"
                placeholder="Add any special requirements or notes for this export..."
                className="mt-1"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setExportDialog(false)}>
                Cancel
              </Button>
              <Button onClick={handleNewExport} data-testid="button-create-export">
                Create Export ({selectedReports.length} reports)
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Export Details Dialog */}
      <Dialog open={!!selectedExport} onOpenChange={() => setSelectedExport(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{selectedExport?.reportName}</DialogTitle>
            <DialogDescription>
              Export Details • ID: {selectedExport?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedExport && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-sm">Status:</span>
                    <Badge variant={getStatusColor(selectedExport.status) as any} className="ml-2">
                      {selectedExport.status}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Requested By:</span>
                    <p className="text-sm">{selectedExport.requestedBy}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm">File Format:</span>
                    <p className="text-sm">{selectedExport.format}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-sm">File Size:</span>
                    <p className="text-sm">{selectedExport.fileSize || 'N/A'}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Downloads:</span>
                    <p className="text-sm">{selectedExport.downloadCount}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Expires:</span>
                    <p className="text-sm">{selectedExport.expiryDate}</p>
                  </div>
                </div>
              </div>

              <div>
                <span className="font-medium text-sm">Description:</span>
                <p className="text-sm mt-1 p-3 bg-muted rounded-md">{selectedExport.description}</p>
              </div>

              <div>
                <span className="font-medium text-sm">Included Data:</span>
                <div className="mt-2 space-y-1">
                  {selectedExport.includesData.map((item: string, index: number) => (
                    <div key={index} className="text-sm p-2 bg-blue-50 dark:bg-blue-950 rounded border-l-4 border-blue-500">
                      • {item}
                    </div>
                  ))}
                </div>
              </div>

              {selectedExport.status === "Completed" && (
                <div className="flex justify-end pt-4 border-t">
                  <Button onClick={() => handleDownload(selectedExport.id)}>
                    <Download className="mr-2 h-4 w-4" />
                    Download Export
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Exports;