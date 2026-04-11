import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PublicLayout from "@/components/public/PublicLayout";
import AdminLayout from "@/components/admin/AdminLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminSiteSettings from "./pages/admin/AdminSiteSettings";
import AdminHomepage from "./pages/admin/AdminHomepage";
import AdminSermons from "./pages/admin/AdminSermons";
import AdminEvents from "./pages/admin/AdminEvents";
import AdminMinistries from "./pages/admin/AdminMinistries";
import AdminPrayerRequests from "./pages/admin/AdminPrayerRequests";
import AdminPlaceholder from "./pages/admin/AdminPlaceholder";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Index />} />
          </Route>

          {/* Admin routes */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="settings" element={<AdminSiteSettings />} />
            <Route path="homepage" element={<AdminHomepage />} />
            <Route path="sermons" element={<AdminSermons />} />
            <Route path="events" element={<AdminEvents />} />
            <Route path="ministries" element={<AdminMinistries />} />
            <Route path="prayer-requests" element={<AdminPrayerRequests />} />
            <Route path="services" element={<AdminPlaceholder title="Services" />} />
            <Route path="announcements" element={<AdminPlaceholder title="Announcements" />} />
            <Route path="testimonies" element={<AdminPlaceholder title="Testimonies" />} />
            <Route path="giving" element={<AdminPlaceholder title="Giving Settings" />} />
            <Route path="leadership" element={<AdminPlaceholder title="Leadership" />} />
            <Route path="branches" element={<AdminPlaceholder title="Branches" />} />
            <Route path="media" element={<AdminPlaceholder title="Media Gallery" />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
