import { useState } from "react";
import { 
  FileText, 
  Plus, 
  Search, 
  Filter,
  Download,
  Eye,
  Edit,
  Calendar,
  Building,
  IndianRupee
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ReportCatalog } from "@/components/reports/ReportCatalog";

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const reportTemplates = [
    {
      id: "oss-return",
      name: "Off-Site Surveillance (OSS) Return",
      description: "Monthly/Quarterly financial data submission to RBI",
      category: "Regulatory",
      frequency: "Monthly",
      lastSubmitted: "Feb 2024",
      status: "Active"
    },
    {
      id: "fin-disclosure",
      name: "Financial Disclosure Statement",
      description: "Annual financial position and performance disclosure",
      category: "Financial",
      frequency: "Annual",
      lastSubmitted: "Mar 2024",
      status: "Active"
    },
    {
      id: "priority-sector",
      name: "Priority Sector Lending Report",
      description: "Quarterly priority sector lending compliance report",
      category: "Compliance",
      frequency: "Quarterly",
      lastSubmitted: "Jan 2024",
      status: "Due"
    },
    {
      id: "credit-info",
      name: "Credit Information Report",
      description: "Credit exposure and risk assessment report",
      category: "Risk",
      frequency: "Monthly",
      lastSubmitted: "Feb 2024",
      status: "Active"
    },
    {
      id: "asset-quality",
      name: "Asset Quality Review",
      description: "NPA classification and provisioning report",
      category: "Risk",
      frequency: "Quarterly",
      lastSubmitted: "Dec 2023",
      status: "Overdue"
    }
  ];

  const submittedReports = [
    {
      id: "OSS-2024-002",
      name: "OSS Return February 2024",
      type: "OSS Return",
      submittedBy: "Priya Sharma",
      submissionDate: "2024-03-15",
      status: "Approved",
      reviewer: "Amit Patel",
      amount: "₹45,67,89,000",
      branch: "Mumbai Central"
    },
    {
      id: "FIN-2024-001",
      name: "Financial Disclosure Q4 2023",
      type: "Financial Report",
      submittedBy: "Rahul Kumar",
      submissionDate: "2024-03-10",
      status: "Under Review",
      reviewer: "Sunita Verma",
      amount: "₹1,23,45,67,000",
      branch: "Delhi Main"
    },
    {
      id: "PSL-2024-001",
      name: "Priority Sector Lending Q1 2024",
      type: "Priority Sector",
      submittedBy: "Anjali Gupta",
      submissionDate: "2024-03-08",
      status: "Rejected",
      reviewer: "Vikram Singh",
      amount: "₹78,90,12,000",
      branch: "Bangalore Tech"
    },
    {
      id: "CIR-2024-002",
      name: "Credit Information Report Feb 2024",
      type: "Credit Report",
      submittedBy: "Suresh Reddy",
      submissionDate: "2024-03-05",
      status: "Draft",
      reviewer: "-",
      amount: "₹56,78,90,000",
      branch: "Hyderabad Main"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "success";
      case "Under Review": return "warning";
      case "Rejected": return "destructive";
      case "Draft": return "secondary";
      case "Active": return "success";
      case "Due": return "warning";
      case "Overdue": return "destructive";
      default: return "secondary";
    }
  };

  const filteredReports = submittedReports.filter(report => {
    const matchesSearch = report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || report.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">RBI Reports</h1>
          <p className="text-muted-foreground">
            Manage regulatory reports and compliance submissions
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Report
        </Button>
      </div>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="templates">Report Templates</TabsTrigger>
          <TabsTrigger value="oss">OSS Returns</TabsTrigger>
          <TabsTrigger value="financial">Financial Reports</TabsTrigger>
          <TabsTrigger value="statutory">Statutory Reports</TabsTrigger>
          <TabsTrigger value="compliance">Compliance Reports</TabsTrigger>
          <TabsTrigger value="all">All Reports</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <ReportCatalog />
        </TabsContent>

        <TabsContent value="oss" className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search OSS reports..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="under review">Under Review</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>OSS Returns</CardTitle>
              <CardDescription>
                Off-Site Surveillance returns submitted to RBI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submittedReports.filter(report => report.type === "OSS Return").map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Building className="mr-1 h-3 w-3" />
                            {report.branch}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>Q1 2024</TableCell>
                      <TableCell>{report.submittedBy}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                          {report.submissionDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(report.status) as any}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center font-medium">
                          <IndianRupee className="mr-1 h-3 w-3" />
                          {report.amount}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-3 w-3" />
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

        <TabsContent value="financial" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Financial Disclosure Reports</CardTitle>
              <CardDescription>
                Financial position and performance reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Net Profit</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submittedReports.filter(report => report.type === "Financial Report").map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>{report.name}</TableCell>
                      <TableCell>Feb 2024</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(report.status) as any}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-success">₹12,34,56,000</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-3 w-3" />
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

        <TabsContent value="statutory" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Statutory Reports</CardTitle>
              <CardDescription>
                Statutory compliance and regulatory reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Compliance %</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {submittedReports.filter(report => report.type === "Statutory Report").map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>{report.name}</TableCell>
                      <TableCell>SLR Report</TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(report.status) as any}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-success">107.6%</TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-3 w-3" />
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

        <TabsContent value="compliance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Reports</CardTitle>
              <CardDescription>
                AML, KYC, and regulatory compliance reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium">AML Compliance</h4>
                  <p className="text-sm text-muted-foreground">Anti-Money Laundering reports</p>
                  <Badge variant="success" className="mt-2">98.5% Compliant</Badge>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium">KYC Updates</h4>
                  <p className="text-sm text-muted-foreground">Know Your Customer documentation</p>
                  <Badge variant="warning" className="mt-2">89.2% Updated</Badge>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium">PMLA Reports</h4>
                  <p className="text-sm text-muted-foreground">Prevention of Money Laundering Act</p>
                  <Badge variant="success" className="mt-2">100% Compliant</Badge>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reports..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="under review">Under Review</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>All Submitted Reports</CardTitle>
              <CardDescription>
                Complete list of banking compliance reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Submitted By</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{report.name}</p>
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Building className="mr-1 h-3 w-3" />
                            {report.branch}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{report.type}</TableCell>
                      <TableCell>{report.submittedBy}</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                          {report.submissionDate}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(report.status) as any}>
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center font-medium">
                          <IndianRupee className="mr-1 h-3 w-3" />
                          {report.amount}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download className="h-3 w-3" />
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

export default Reports;