import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Login from "./pages/Admin/Login";
import AddMarket from "./pages/Admin/AddMarket";
import UserRegister from "./pages/Admin/UserRegister";
import AddUserMarket from "./pages/Admin/AddUserMarket";
import MarketHoliday from "./pages/Admin/MarketHoliday";
import Settings from "./pages/Admin/Settings";
import AddTime from "./pages/Admin/AddTime";
import UploadResult from "./pages/Admin/UploadResult";
import NotFound from "./pages/NotFound";
import MainHome from "@/pages/Main/MainHome";
import UserLogin from "@/pages/User/UserLogin";
import UserDashboard from "@/pages/User/UserDashboard";
import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";
import FreeFix from "@/pages/FreeFix";
import ToastProvider from "@/components/ui/ToastProvider"; // ✅ import ToastProvider
import AddFinalAnk from "./pages/Admin/AddFinalAnk";
import UserUploadResult from "./pages/User/UserUploadResult";
import About from "@/pages/Main/About";
import Contact from "@/pages/Main/Contact";
import PrivacyPolicy from "@/pages/Main/PrivacyPolicy";
import TermsAndConditions from "@/pages/Main/TermsAndConditions";
import JodiRecordChart from "./pages/Main/HomeSections/allmarkets/JodiRecordChart";
import PanelRecordChart from "./pages/Main/HomeSections/allmarkets/PanelRecordChart";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <ToastProvider />  

          <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainHome />} />
                 <Route path="/jodi-records-chart/:marketName" element={<JodiRecordChart />} />
                 <Route path="/panel-records-chart/:marketName" element={<PanelRecordChart />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsAndConditions />} />

                <Route path="/admin/dashboard_smboss_login" element={<Login />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute role="admin">
                      <DashboardLayout>
                        <Dashboard />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/add-market"
                  element={
                    <ProtectedRoute role="admin">
                      <DashboardLayout>
                        <AddMarket />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                 <Route
                  path="/admin/add-final-ank"
                  element={
                    <ProtectedRoute role="admin">
                      <DashboardLayout>
                        <AddFinalAnk />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                
                <Route
                  path="/admin/user-register"
                  element={
                    <ProtectedRoute role="admin">
                      <DashboardLayout>
                        <UserRegister />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/add-user-market"
                  element={
                    <ProtectedRoute role="admin">
                      <DashboardLayout>
                        <AddUserMarket />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/market-holiday"
                  element={
                    <ProtectedRoute role="admin">
                      <DashboardLayout>
                        <MarketHoliday />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/add-time"
                  element={
                    <ProtectedRoute role="admin">
                      <DashboardLayout>
                        <AddTime />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/upload-result"
                  element={
                    <ProtectedRoute role="admin">
                      <DashboardLayout>
                        <UploadResult />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/admin/settings"
                  element={
                    <ProtectedRoute role="admin">
                      <DashboardLayout>
                        <Settings />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />
                 <Route
                  path="/admin/free-fix"
                  element={
                    <ProtectedRoute role="admin">
                      <DashboardLayout>
                        <FreeFix />
                      </DashboardLayout>
                    </ProtectedRoute>
                  }
                />

                <Route path="/user/login" element={<UserLogin />} />
                <Route
                  path="/user"
                  element={
                    <ProtectedRoute role="user">
                      <UserDashboardLayout>
                        <UserDashboard />
                      </UserDashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/user/upload-result"
                  element={
                    <ProtectedRoute role="user">
                      <UserDashboardLayout>
                        <UserUploadResult />
                      </UserDashboardLayout>
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/user/free-fix"
                  element={
                    <ProtectedRoute role="user">
                      <UserDashboardLayout>
                        <FreeFix />
                      </UserDashboardLayout>
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
