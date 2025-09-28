import { Clock, CheckCircle, XCircle, AlertTriangle, User, Calendar, FileText, Filter, Search } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

const Approvals = () => {
  const [selectedApproval, setSelectedApproval] = useState<any>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const pendingApprovals = [
    {
      id: "APP-2024-001",
      reportName: "Monthly Financial Statement March 2024",
      reportType: "Financial Report",
      submittedBy: "Rahul Patil",
      submittedDate: "2024-03-20",
      priority: "High",
      status: "Pending Review",
      amount: "₹2,45,67,000",
      branch: "Sangli Main",
      reviewDeadline: "2024-03-25",
      description: "Comprehensive financial statement for Q1 2024 including P&L, Balance Sheet, and Cash Flow statements.",
      documents: ["financial_statement.pdf", "supporting_docs.xlsx", "audit_trail.pdf"]
    },
    {
      id: "APP-2024-002", 
      reportName: "Asset Quality Review Q1 2024",
      reportType: "Regulatory Report",
      submittedBy: "Priya Sharma",
      submittedDate: "2024-03-19",
      priority: "Critical",
      status: "Under Review",
      amount: "₹1,89,45,000",
      branch: "Sangli Corporate",
      reviewDeadline: "2024-03-24",
      description: "Quarterly asset quality assessment with NPA classification and provisioning details.",
      documents: ["aqr_report.pdf", "npa_analysis.xlsx"]
    },
    {
      id: "APP-2024-003",
      reportName: "Liquidity Coverage Ratio Report",
      reportType: "Basel III Report",
      submittedBy: "Anjali Kulkarni",
      submittedDate: "2024-03-18",
      priority: "Medium",
      status: "Pending Review",
      amount: "₹3,67,89,000",
      branch: "Sangli Rural",
      reviewDeadline: "2024-03-26",
      description: "LCR calculation and high-quality liquid assets assessment for regulatory compliance.",
      documents: ["lcr_calculation.pdf", "hqla_breakdown.xlsx", "stress_test.pdf"]
    },
    {
      id: "APP-2024-004",
      reportName: "Credit Risk Assessment Report",
      reportType: "Risk Management",
      submittedBy: "Vikram Jadhav",
      submittedDate: "2024-03-17",
      priority: "High",
      status: "Requires Clarification",
      amount: "₹4,23,56,000",
      branch: "Sangli Digital",
      reviewDeadline: "2024-03-27",
      description: "Comprehensive credit risk analysis including portfolio quality and concentration risk.",
      documents: ["credit_risk.pdf", "portfolio_analysis.xlsx"]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending Review": return "warning";
      case "Under Review": return "default";
      case "Requires Clarification": return "destructive";
      case "Approved": return "success";
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending Review": return Clock;
      case "Under Review": return AlertTriangle;
      case "Requires Clarification": return XCircle;
      case "Approved": return CheckCircle;
      default: return Clock;
    }
  };

  const handleApprove = (approvalId: string) => {
    toast({
      title: "Report Approved",
      description: `Report ${approvalId} has been approved successfully.`,
    });
  };

  const handleReject = (approvalId: string) => {
    toast({
      title: "Report Rejected",
      description: `Report ${approvalId} has been rejected. Comments have been sent to the submitter.`,
    });
  };

  const handleRequestClarification = (approvalId: string) => {
    toast({
      title: "Clarification Requested",
      description: `Clarification request sent for report ${approvalId}.`,
    });
  };

  const filteredApprovals = pendingApprovals.filter(approval => {
    const statusMatch = filterStatus === "all" || approval.status === filterStatus;
    const searchMatch = approval.reportName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       approval.submittedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
                       approval.id.toLowerCase().includes(searchTerm.toLowerCase());
    return statusMatch && searchMatch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Pending Approvals</h1>
          <p className="text-muted-foreground">
            Review and approve submitted compliance reports
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Advanced Filters
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search & Filter</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search by report name, submitter, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                  data-testid="input-search"
                />
              </div>
            </div>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full sm:w-48" data-testid="select-status">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Pending Review">Pending Review</SelectItem>
                <SelectItem value="Under Review">Under Review</SelectItem>
                <SelectItem value="Requires Clarification">Requires Clarification</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Approvals List */}
      <div className="space-y-4">
        {filteredApprovals.map((approval) => {
          const StatusIcon = getStatusIcon(approval.status);
          return (
            <Card key={approval.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-3">
                      <StatusIcon className="h-5 w-5 text-muted-foreground mt-1" />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                          <h3 className="font-semibold text-lg truncate">{approval.reportName}</h3>
                          <div className="flex gap-2">
                            <Badge variant={getStatusColor(approval.status) as any}>
                              {approval.status}
                            </Badge>
                            <Badge variant={getPriorityColor(approval.priority) as any}>
                              {approval.priority}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4" />
                            <span data-testid={`text-submitter-${approval.id}`}>{approval.submittedBy}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>Submitted: {approval.submittedDate}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            <span>{approval.reportType}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="h-4 w-4" />
                            <span>Due: {approval.reviewDeadline}</span>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                          <span className="font-medium text-primary" data-testid={`text-amount-${approval.id}`}>
                            Amount: {approval.amount}
                          </span>
                          <span className="text-muted-foreground">• {approval.branch}</span>
                          <span className="text-muted-foreground">• ID: {approval.id}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 lg:w-auto w-full">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedApproval(approval)}
                      className="w-full sm:w-auto"
                      data-testid={`button-view-${approval.id}`}
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="default" 
                      size="sm"
                      onClick={() => handleApprove(approval.id)}
                      className="w-full sm:w-auto"
                      data-testid={`button-approve-${approval.id}`}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Approve
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleReject(approval.id)}
                      className="w-full sm:w-auto"
                      data-testid={`button-reject-${approval.id}`}
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredApprovals.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No approvals found</h3>
            <p className="text-muted-foreground">
              {searchTerm || filterStatus !== "all" 
                ? "Try adjusting your search or filter criteria"
                : "All reports have been reviewed"
              }
            </p>
          </CardContent>
        </Card>
      )}

      {/* Approval Details Dialog */}
      <Dialog open={!!selectedApproval} onOpenChange={() => setSelectedApproval(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{selectedApproval?.reportName}</DialogTitle>
            <DialogDescription>
              Detailed review of {selectedApproval?.reportType} • ID: {selectedApproval?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedApproval && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-sm">Report Type:</span>
                    <p className="text-sm">{selectedApproval.reportType}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Submitted By:</span>
                    <p className="text-sm">{selectedApproval.submittedBy}</p>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Branch:</span>
                    <p className="text-sm">{selectedApproval.branch}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <span className="font-medium text-sm">Status:</span>
                    <Badge variant={getStatusColor(selectedApproval.status) as any} className="ml-2">
                      {selectedApproval.status}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Priority:</span>
                    <Badge variant={getPriorityColor(selectedApproval.priority) as any} className="ml-2">
                      {selectedApproval.priority}
                    </Badge>
                  </div>
                  <div>
                    <span className="font-medium text-sm">Amount:</span>
                    <p className="text-sm font-medium text-primary">{selectedApproval.amount}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <span className="font-medium text-sm">Description:</span>
                <p className="text-sm mt-1 p-3 bg-muted rounded-md">{selectedApproval.description}</p>
              </div>

              {/* Documents */}
              <div>
                <span className="font-medium text-sm">Attached Documents:</span>
                <div className="mt-2 space-y-2">
                  {selectedApproval.documents.map((doc: string, index: number) => (
                    <div key={index} className="flex items-center justify-between p-2 border rounded">
                      <span className="text-sm">{doc}</span>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button 
                  onClick={() => handleApprove(selectedApproval.id)}
                  className="flex-1"
                  data-testid={`button-approve-dialog-${selectedApproval.id}`}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve Report
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => handleRequestClarification(selectedApproval.id)}
                  className="flex-1"
                  data-testid={`button-clarify-${selectedApproval.id}`}
                >
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Request Clarification
                </Button>
                <Button 
                  variant="destructive"
                  onClick={() => handleReject(selectedApproval.id)}
                  className="flex-1"
                  data-testid={`button-reject-dialog-${selectedApproval.id}`}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject Report
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Approvals;