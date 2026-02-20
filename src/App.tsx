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
import AddTimeCmmStarGold from "./pages/Admin/AddTimeCmmStarGold";
import UploadResult from "./pages/Admin/UploadResult";
import NotFound from "./pages/NotFound";
import MainHome from "@/pages/Main/MainHome";
import UserLogin from "@/pages/User/UserLogin";
import UserDashboard from "@/pages/User/UserDashboard";
import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";
import ToastProvider from "@/components/ui/ToastProvider"; // ✅ import ToastProvider
import AddFinalAnk from "./pages/Admin/AddFinalAnk";
import UserUploadResult from "./pages/User/UserUploadResult";
import About from "@/pages/Main/About";
import Contact from "@/pages/Main/Contact";
import PrivacyPolicy from "@/pages/Main/PrivacyPolicy";
import TermsAndConditions from "@/pages/Main/TermsAndConditions";
import JodiRecordChart from "./pages/Main/HomeSections/allmarkets/JodiRecordChart";
import PanelRecordChart from "./pages/Main/HomeSections/allmarkets/PanelRecordChart";
import AdminFreeFix from "@/pages/Admin/AdminFreeFix";
import CmmStarGoldUploadResult from "./pages/Admin/CmmStarGoldUploadResult";
import CmmStarGoldPanelChart from "./pages/Main/HomeSections/CmmStarGoldPanelChart";
import UserFreeFix from "./pages/User/UserFreeFix";
import MatkaFreeOpen from "./pages/Main/HomeSections/specialgamezone/MatkaFreeOpen";
import KhatrisFavouritePannaChart from "./pages/Main/HomeSections/specialgamezone/KhatrisFavouritePannaChart";
import MatkaFinalNumberChart from "./pages/Main/HomeSections/specialgamezone/MatkaFinalNumberChart";
import All22CardPannaPanelPattiChart from "./pages/Main/HomeSections/matkajodilist/All22CardPannaPanelPattiChart";
import MatkaJodiCountChart from "./pages/Main/HomeSections/matkajodilist/MatkaJodiCountChart";
import PanelCountChart from "./pages/Main/HomeSections/matkajodilist/PanelCountChart";
import PanelTotalChart from "./pages/Main/HomeSections/matkajodilist/PanelTotalChart";
import JodiChartFamilyMatka from "./pages/Main/HomeSections/matkajodilist/JodiChartFamilyMatka";
import FixOpenToCloseByDate from "./pages/Main/HomeSections/matkajodilist/FixOpenToCloseByDate";



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
                 <Route path="/jodi-page/:marketName" element={<JodiRecordChart />} />
                 <Route path="/panel-page/:marketName" element={<PanelRecordChart />} />
                 <Route path="/jodi-records-chart/:marketName" element={<JodiRecordChart />} />
                 <Route path="/panel-records-chart/:marketName" element={<PanelRecordChart />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsAndConditions />} />
                <Route path="/matka-free-open" element={<MatkaFreeOpen />} />
                <Route path="/khatris-favourite-panna-chart" element={<KhatrisFavouritePannaChart />} />
                <Route path="/matka-final-number-chart" element={<MatkaFinalNumberChart />} />
                <Route path="/all-22-card-panna-panel-patti-chart" element={<All22CardPannaPanelPattiChart />} />
                <Route path="/matka-jodi-count-chart" element={<MatkaJodiCountChart />} />
                <Route path="/panel-count-chart" element={<PanelCountChart />} />
                <Route path="/panel-total-chart" element={<PanelTotalChart />} />
                <Route path="/jodi-chart-family-matka" element={<JodiChartFamilyMatka />} />
                <Route path="/fix-open-to-close-by-date" element={<FixOpenToCloseByDate />} />
                <Route path="/cmm-star-gold-panel-chart" element={<CmmStarGoldPanelChart />} />
                <Route path="/admin/dashboard_spdpboss_login" element={<Login />} />
                
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
                  path="/admin/add-time-cmmstargold"
                  element={
                    <ProtectedRoute role="admin">
                      <DashboardLayout>
                        <AddTimeCmmStarGold />
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
                  path="/admin/upload-cmmstargold-result"
                  element={
                    <ProtectedRoute role="admin">
                      <DashboardLayout>
                        <CmmStarGoldUploadResult />
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
                        <AdminFreeFix />
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
                        <UserFreeFix />
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
