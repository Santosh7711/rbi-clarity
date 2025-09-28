import { 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp,
  Users,
  Shield,
  Download
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const Dashboard = () => {
  const stats = [
    {
      title: "Total Reports",
      value: "247",
      change: "+12%",
      trend: "up",
      icon: FileText,
      description: "Generated this month"
    },
    {
      title: "Pending Approvals",
      value: "7",
      change: "-3",
      trend: "down",
      icon: Clock,
      description: "Awaiting review"
    },
    {
      title: "Compliance Score",
      value: "98.5%",
      change: "+2.1%",
      trend: "up",
      icon: Shield,
      description: "RBI compliance rate"
    },
    {
      title: "Active Users",
      value: "24",
      change: "+4",
      trend: "up",
      icon: Users,
      description: "Bank personnel"
    }
  ];

  const recentReports = [
    {
      id: "OSS-2024-Q1",
      name: "Off-Site Surveillance Return Q1 2024",
      type: "OSS Return",
      status: "Approved",
      submittedBy: "Priya Sharma",
      date: "2024-03-15",
      amount: "₹45,67,89,000"
    },
    {
      id: "FIN-2024-02",
      name: "Financial Disclosure February 2024",
      type: "Financial Report",
      status: "Under Review", 
      submittedBy: "Rahul Kumar",
      date: "2024-03-14",
      amount: "₹78,90,12,000"
    },
    {
      id: "STAT-2024-03",
      name: "Statutory Liquidity Ratio Report",
      type: "Statutory Report",
      status: "Draft",
      submittedBy: "Anjali Gupta",
      date: "2024-03-13",
      amount: "₹1,23,45,67,000"
    },
    {
      id: "CRR-2024-03",
      name: "Cash Reserve Ratio Compliance",
      type: "Regulatory Report",
      status: "Pending",
      submittedBy: "Vikram Singh",
      date: "2024-03-12",
      amount: "₹2,34,56,78,000"
    }
  ];

  const upcomingDeadlines = [
    {
      report: "Priority Sector Lending Return",
      deadline: "March 31, 2024",
      daysLeft: 5,
      priority: "High"
    },
    {
      report: "Credit Information Report",
      deadline: "April 15, 2024",
      daysLeft: 20,
      priority: "Medium"
    },
    {
      report: "Asset Quality Review",
      deadline: "April 30, 2024",
      daysLeft: 35,
      priority: "Medium"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved": return "success";
      case "Under Review": return "warning";
      case "Draft": return "secondary";
      case "Pending": return "destructive";
      default: return "secondary";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "destructive";
      case "Medium": return "warning";
      case "Low": return "success";
      default: return "secondary";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">RBI Compliance Dashboard</h1>
          <p className="text-muted-foreground">
            State Bank of India - Central Office Mumbai
          </p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Dashboard
          </Button>
          <Button>Generate New Report</Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                <TrendingUp className={`h-3 w-3 ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`} />
                <span className={stat.trend === 'up' ? 'text-success' : 'text-destructive'}>
                  {stat.change}
                </span>
                <span>{stat.description}</span>
              </div>
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
              Latest RBI reports submitted by your team
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentReports.map((report) => (
                <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-medium">{report.name}</h4>
                      <Badge variant={getStatusColor(report.status) as any}>
                        {report.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {report.type} • {report.submittedBy} • {report.date}
                    </p>
                    <p className="text-sm font-medium text-primary mt-1">
                      Amount: {report.amount}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">
                    View
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
              RBI submission deadlines
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-sm">{item.report}</h4>
                    <Badge variant={getPriorityColor(item.priority) as any} className="text-xs">
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
                    <span className="text-xs font-medium">
                      {item.daysLeft} days
                    </span>
                  </div>
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
            Frequently used RBI compliance tasks
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="h-6 w-6 mb-2" />
              New OSS Return
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <CheckCircle className="h-6 w-6 mb-2" />
              Review Pending
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Shield className="h-6 w-6 mb-2" />
              Run Compliance Check
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Download className="h-6 w-6 mb-2" />
              Export Reports
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;