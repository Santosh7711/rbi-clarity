import { useState } from "react";
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye,
  MessageSquare,
  User,
  Calendar,
  AlertTriangle,
  Download,
  Building,
  IndianRupee
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Approvals = () => {
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [reviewComment, setReviewComment] = useState("");

  const pendingReports = [
    {
      id: "PSL-2024-003",
      name: "Priority Sector Lending Q1 2024",
      type: "Priority Sector Report",
      submittedBy: "Anjali Gupta",
      submissionDate: "2024-03-20",
      amount: "₹78,90,12,000",
      branch: "Bangalore Tech Park",
      priority: "High",
      daysWaiting: 3,
      description: "Quarterly priority sector lending compliance report including agriculture, MSME, and export credit data.",
      riskLevel: "Medium"
    },
    {
      id: "CRR-2024-004",
      name: "Cash Reserve Ratio Compliance March 2024",
      type: "Regulatory Report",
      submittedBy: "Vikram Singh",
      submissionDate: "2024-03-19",
      amount: "₹2,34,56,78,000",
      branch: "Delhi Corporate Office",
      priority: "Critical",
      daysWaiting: 4,
      description: "Monthly CRR maintenance and compliance verification report.",
      riskLevel: "High"
    },
    {
      id: "NPA-2024-001",
      name: "Non-Performing Assets Classification",
      type: "Asset Quality Report",
      submittedBy: "Priya Sharma",
      submissionDate: "2024-03-18",
      amount: "₹45,67,89,000",
      branch: "Mumbai Central",
      priority: "High",
      daysWaiting: 5,
      description: "Quarterly NPA classification and provisioning requirements report.",
      riskLevel: "High"
    },
    {
      id: "LCR-2024-002",
      name: "Liquidity Coverage Ratio Report",
      type: "Liquidity Report",
      submittedBy: "Suresh Reddy",
      submissionDate: "2024-03-17",
      amount: "₹1,67,89,23,000",
      branch: "Hyderabad Main",
      priority: "Medium",
      daysWaiting: 6,
      description: "Monthly liquidity coverage ratio calculation and compliance status.",
      riskLevel: "Low"
    }
  ];

  const recentlyReviewed = [
    {
      id: "OSS-2024-002",
      name: "OSS Return February 2024",
      type: "OSS Return",
      reviewedBy: "Amit Patel",
      reviewDate: "2024-03-15",
      status: "Approved",
      comments: "All data validated successfully. Report meets RBI compliance standards."
    },
    {
      id: "FIN-2024-001",
      name: "Financial Disclosure Q4 2023",
      type: "Financial Report", 
      reviewedBy: "Sunita Verma",
      reviewDate: "2024-03-14",
      status: "Rejected",
      comments: "Discrepancies found in asset classification. Please review Section 3.2 and resubmit."
    },
    {
      id: "CRAR-2024-001",
      name: "Capital Adequacy Ratio Report",
      type: "Capital Report",
      reviewedBy: "Rajesh Kumar",
      reviewDate: "2024-03-13",
      status: "Approved",
      comments: "Capital ratios within regulatory limits. Good compliance record."
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "destructive";
      case "High": return "warning";
      case "Medium": return "secondary";
      case "Low": return "success";
      default: return "secondary";
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "High": return "destructive";
      case "Medium": return "warning";
      case "Low": return "success";
      default: return "secondary";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "success";
      case "Rejected": return "destructive";
      case "Under Review": return "warning";
      default: return "secondary";
    }
  };

  const handleApprove = (reportId: string) => {
    console.log("Approving report:", reportId);
    // Here you would typically make an API call
  };

  const handleReject = (reportId: string) => {
    console.log("Rejecting report:", reportId);
    // Here you would typically make an API call
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Report Approvals</h1>
          <p className="text-muted-foreground">
            Review and approve RBI compliance reports
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="destructive" className="text-sm">
            {pendingReports.length} Pending
          </Badge>
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pending">
            Pending Approval ({pendingReports.length})
          </TabsTrigger>
          <TabsTrigger value="reviewed">
            Recently Reviewed
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {pendingReports.map((report) => (
              <Card key={report.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="text-lg">{report.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {report.type} • {report.id}
                      </CardDescription>
                    </div>
                    <div className="flex flex-col items-end space-y-1">
                      <Badge variant={getPriorityColor(report.priority) as any}>
                        {report.priority}
                      </Badge>
                      <Badge variant={getRiskColor(report.riskLevel) as any} className="text-xs">
                        {report.riskLevel} Risk
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Submitted by:</span>
                      <span className="font-medium">{report.submittedBy}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Branch:</span>
                      <span className="font-medium text-xs">{report.branch}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Amount:</span>
                      <span className="font-medium text-primary">{report.amount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Waiting:</span>
                      <span className="font-medium text-warning">{report.daysWaiting} days</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {report.description}
                  </p>

                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex-1">
                          <Eye className="mr-1 h-3 w-3" />
                          Review
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{report.name}</DialogTitle>
                          <DialogDescription>
                            Review and approve this {report.type.toLowerCase()}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <Label className="text-muted-foreground">Report ID</Label>
                              <p className="font-medium">{report.id}</p>
                            </div>
                            <div>
                              <Label className="text-muted-foreground">Type</Label>
                              <p className="font-medium">{report.type}</p>
                            </div>
                            <div>
                              <Label className="text-muted-foreground">Submitted By</Label>
                              <p className="font-medium">{report.submittedBy}</p>
                            </div>
                            <div>
                              <Label className="text-muted-foreground">Branch</Label>
                              <p className="font-medium">{report.branch}</p>
                            </div>
                            <div>
                              <Label className="text-muted-foreground">Amount</Label>
                              <p className="font-medium text-primary">{report.amount}</p>
                            </div>
                            <div>
                              <Label className="text-muted-foreground">Risk Level</Label>
                              <Badge variant={getRiskColor(report.riskLevel) as any}>
                                {report.riskLevel}
                              </Badge>
                            </div>
                          </div>

                          <div>
                            <Label className="text-muted-foreground">Description</Label>
                            <p className="mt-1">{report.description}</p>
                          </div>

                          <div>
                            <Label htmlFor="reviewComment">Review Comments</Label>
                            <Textarea
                              id="reviewComment"
                              value={reviewComment}
                              onChange={(e) => setReviewComment(e.target.value)}
                              placeholder="Enter your review comments..."
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <DialogFooter className="space-x-2">
                          <Button variant="outline">
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </Button>
                          <Button 
                            variant="destructive"
                            onClick={() => handleReject(report.id)}
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Reject
                          </Button>
                          <Button 
                            onClick={() => handleApprove(report.id)}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reviewed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recently Reviewed Reports</CardTitle>
              <CardDescription>
                Reports that have been reviewed in the last 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Reviewed By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentlyReviewed.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>{report.name}</TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <User className="mr-1 h-3 w-3 text-muted-foreground" />
                          {report.reviewedBy}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                          {report.reviewDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(report.status) as any}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MessageSquare className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Approvals;