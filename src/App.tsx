import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import ReportBuilder from "./pages/ReportBuilder";
import Approvals from "./pages/Approvals";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="reports" element={<Reports />} />
            <Route path="reports/:type" element={<Reports />} />
            <Route path="builder" element={<ReportBuilder />} />
            <Route path="approvals" element={<Approvals />} />
            <Route path="compliance" element={<Dashboard />} />
            <Route path="compliance/:section" element={<Dashboard />} />
            <Route path="data-sources" element={<Dashboard />} />
            <Route path="audit" element={<Dashboard />} />
            <Route path="exports" element={<Dashboard />} />
            <Route path="schedule" element={<Dashboard />} />
            <Route path="users" element={<Dashboard />} />
          </Route>
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
