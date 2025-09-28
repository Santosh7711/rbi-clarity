import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  FileText,
  Settings,
  Users,
  CheckCircle,
  AlertTriangle,
  FileCheck,
  PlusCircle,
  Activity,
  Shield,
  Database,
  Download,
  Calendar,
  ChevronDown,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface SidebarProps {
  isOpen: boolean;
}

const navigationItems = [
  {
    label: "Dashboard",
    icon: BarChart3,
    href: "/",
    badge: null,
  },
  {
    label: "Reports",
    icon: FileText,
    href: "/reports",
    badge: { text: "15", variant: "secondary" as const },
    children: [
      { label: "OSS Returns", href: "/reports/oss" },
      { label: "Financial Disclosure", href: "/reports/financial" },
      { label: "Statutory Reports", href: "/reports/statutory" },
      { label: "Custom Reports", href: "/reports/custom" },
    ]
  },
  {
    label: "Report Builder",
    icon: PlusCircle,
    href: "/builder",
    badge: null,
  },
  {
    label: "Approvals",
    icon: CheckCircle,
    href: "/approvals",
    badge: { text: "7", variant: "destructive" as const },
  },
  {
    label: "Compliance",
    icon: Shield,
    href: "/compliance",
    badge: null,
    children: [
      { label: "Validation Rules", href: "/compliance/rules" },
      { label: "Check Reports", href: "/compliance/check" },
      { label: "Error Logs", href: "/compliance/errors" },
    ]
  },
  {
    label: "Data Sources",
    icon: Database,
    href: "/data-sources",
    badge: null,
  },
  {
    label: "Audit Trail",
    icon: Activity,
    href: "/audit",
    badge: null,
  },
  {
    label: "Exports",
    icon: Download,
    href: "/exports",
    badge: null,
  },
  {
    label: "Schedule",
    icon: Calendar,
    href: "/schedule",
    badge: null,
  },
  {
    label: "User Management",
    icon: Users,
    href: "/users",
    badge: null,
  },
];

export const Sidebar = ({ isOpen }: SidebarProps) => {
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return location.pathname === "/";
    }
    return location.pathname.startsWith(href);
  };

  const isChildActive = (children: any[]) => {
    return children?.some(child => location.pathname === child.href);
  };

  return (
    <aside className={cn(
      "fixed left-0 top-16 h-[calc(100vh-4rem)] bg-card border-r border-border transition-all duration-300 z-40",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="p-4 overflow-y-auto h-full">
        <nav className="space-y-2">
          {navigationItems.map((item) => {
            const hasChildren = item.children && item.children.length > 0;
            const isExpanded = expandedItems.includes(item.label);
            const hasActiveChild = hasChildren && isChildActive(item.children);
            
            return (
              <div key={item.label}>
                <div className="relative">
                  {hasChildren ? (
                    <button
                      onClick={() => toggleExpanded(item.label)}
                      className={cn(
                        "w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                        (isActive(item.href) || hasActiveChild)
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "text-foreground hover:bg-muted"
                      )}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {isOpen && (
                        <>
                          <span className="ml-3 flex-1 text-left">{item.label}</span>
                          {item.badge && (
                            <Badge variant={item.badge.variant} className="ml-2 h-5">
                              {item.badge.text}
                            </Badge>
                          )}
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4 ml-2" />
                          ) : (
                            <ChevronRight className="h-4 w-4 ml-2" />
                          )}
                        </>
                      )}
                    </button>
                  ) : (
                    <NavLink
                      to={item.href}
                      className={({ isActive: navIsActive }) =>
                        cn(
                          "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                          navIsActive
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "text-foreground hover:bg-muted"
                        )
                      }
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {isOpen && (
                        <>
                          <span className="ml-3">{item.label}</span>
                          {item.badge && (
                            <Badge variant={item.badge.variant} className="ml-auto h-5">
                              {item.badge.text}
                            </Badge>
                          )}
                        </>
                      )}
                    </NavLink>
                  )}
                </div>
                
                {hasChildren && isExpanded && isOpen && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.href}
                        to={child.href}
                        className={({ isActive: navIsActive }) =>
                          cn(
                            "block px-3 py-2 text-sm rounded-md transition-colors",
                            navIsActive
                              ? "bg-primary/20 text-primary font-medium"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};