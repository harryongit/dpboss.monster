import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "@/lib/router-compat";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import Dashboard from "./views/Admin/Dashboard";
import Login from "./views/Admin/Login";
import AddMarket from "./views/Admin/AddMarket";
import UserRegister from "./views/Admin/UserRegister";
import AddUserMarket from "./views/Admin/AddUserMarket";
import MarketHoliday from "./views/Admin/MarketHoliday";
import Settings from "./views/Admin/Settings";
import AddTime from "./views/Admin/AddTime";
import AddTimeMainStarLine from "./views/Admin/AddTimeMainStarLine";
import UploadResult from "./views/Admin/UploadResult";
import NotFound from "./views/NotFound";
import MainHome from "@/views/Main/MainHome";
import UserLogin from "@/views/User/UserLogin";
import UserDashboard from "@/views/User/UserDashboard";
import { UserDashboardLayout } from "@/components/layout/UserDashboardLayout";
import ToastProvider from "@/components/ui/ToastProvider"; // ✅ import ToastProvider
import AddFinalAnk from "./views/Admin/AddFinalAnk";
import UserUploadResult from "./views/User/UserUploadResult";
import About from "@/views/Main/About";
import Contact from "@/views/Main/Contact";
import PrivacyPolicy from "@/views/Main/PrivacyPolicy";
import TermsAndConditions from "@/views/Main/TermsAndConditions";
import JodiRecordChart from "./views/Main/HomeSections/allmarkets/JodiRecordChart";
import PanelRecordChart from "./views/Main/HomeSections/allmarkets/PanelRecordChart";
import AdminFreeFix from "@/views/Admin/AdminFreeFix";
import MainStarLineUploadResult from "./views/Admin/MainStarLineUploadResult";
import DatabaseManagement from "./views/Admin/DatabaseManagement";
import MainStarLinePanelChart from "./views/Main/HomeSections/MainStarLinePanelChart";
import MainStarLinePublicUpload from "./views/Main/MainStarLinePublicUpload";
import UserFreeFix from "./views/User/UserFreeFix";
import MatkaFreeOpen from "./views/Main/HomeSections/specialgamezone/MatkaFreeOpen";
import KhatrisFavouritePannaChart from "./views/Main/HomeSections/specialgamezone/KhatrisFavouritePannaChart";
import MatkaFinalNumberChart from "./views/Main/HomeSections/specialgamezone/MatkaFinalNumberChart";
import All22CardPannaPanelPattiChart from "./views/Main/HomeSections/matkajodilist/All22CardPannaPanelPattiChart";
import MatkaJodiCountChart from "./views/Main/HomeSections/matkajodilist/MatkaJodiCountChart";
import PanelCountChart from "./views/Main/HomeSections/matkajodilist/PanelCountChart";
import PanelTotalChart from "./views/Main/HomeSections/matkajodilist/PanelTotalChart";
import JodiChartFamilyMatka from "./views/Main/HomeSections/matkajodilist/JodiChartFamilyMatka";
import FixOpenToCloseByDate from "./views/Main/HomeSections/matkajodilist/FixOpenToCloseByDate";
import AddTimeKalyan36Bazar from "./views/Admin/AddTimeKalyan36Bazar";
import UploadKalyan36BazarResult from "./views/Admin/UploadKalyan36BazarResult";
import Kalyan36BazarPublicUpload from "./views/Main/Kalyan36BazarPublicUpload";
import Kalyan36BazarPanelChart from "./views/Main/HomeSections/Kalyan36BazarPanelChart";



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
              <Route path="/main-star-line-panel-chart" element={<MainStarLinePanelChart />} />
              <Route path="/kalyan-36-bazar-panel-chart" element={<Kalyan36BazarPanelChart />} />
              <Route path="/main-star-line-upload-public-link" element={<MainStarLinePublicUpload />} />
              <Route path="/kalyan-36-bazar-upload-public-link" element={<Kalyan36BazarPublicUpload />} />
              <Route path="/admin/dashboard_dpboss_login" element={<Login />} />

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
                path="/admin/add-time-mainstarline"
                element={
                  <ProtectedRoute role="admin">
                    <DashboardLayout>
                      <AddTimeMainStarLine />
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
                path="/admin/upload-mainstarline-result"
                element={
                  <ProtectedRoute role="admin">
                    <DashboardLayout>
                      <MainStarLineUploadResult />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/add-time-kalyan36bazar"
                element={
                  <ProtectedRoute role="admin">
                    <DashboardLayout>
                      <AddTimeKalyan36Bazar />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/upload-kalyan36bazar-result"
                element={
                  <ProtectedRoute role="admin">
                    <DashboardLayout>
                      <UploadKalyan36BazarResult />
                    </DashboardLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/database"
                element={
                  <ProtectedRoute role="admin">
                    <DashboardLayout>
                      <DatabaseManagement />
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
