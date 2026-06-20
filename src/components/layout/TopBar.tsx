

import { Menu, LogOut, Sun, Moon, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { useLocation, useNavigate } from "@/lib/router-compat";
import Swal from "sweetalert2";
import toast, { Toaster } from "react-hot-toast";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Card, CardContent } from "@/components/ui/card";
import { useUserGameStatus } from "@/hooks/user/useUserGameStatus";
import { ScrollArea } from "@/components/ui/scroll-area";

interface TopBarProps {
  onMenuClick: () => void;
  pageTitles?: Record<string, string>;
}

const defaultPageTitles: Record<string, string> = {
  "/admin": "DP BOSS DASHBOARD",
  "/admin/add-market": "Add Market",
  "/admin/add-final-ank": "Add Final Ank",
  "/admin/user-register": "User Register",
  "/admin/add-user-market": "Add User Market",
  "/admin/market-holiday": "Market Holiday",
  "/admin/add-time": "Add Time",
  "/admin/add-time-mainstarline": "Add Time Main Star Line",
  "/admin/upload-result": "Upload Result",
  "/admin/upload-mainstarline-result": "Upload Result Main Star Line",
  "/admin/database": "Database Management",
  // "/admin/settings": "Settings",
};

export const TopBar = ({ onMenuClick, pageTitles }: TopBarProps) => {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const map = pageTitles ?? defaultPageTitles;
  const pageTitle = map[location.pathname] || "Dashboard";
  const isUser = location.pathname.startsWith("/user");
  const statusQuery = isUser ? useUserGameStatus() : undefined;

  const getNotifyBgClass = (type: string) => {
    if (type === "WARNING") return "bg-yellow-50 dark:bg-yellow-900 border-yellow-300 dark:border-yellow-700";
    if (type === "SUCCESS") return "bg-green-50 dark:bg-green-900 border-green-300 dark:border-green-700";
    if (type === "ERROR") return "bg-red-50 dark:bg-red-900 border-red-300 dark:border-red-700";
    if (type === "EXPIRED") return "bg-red-50 dark:bg-red-900 border-red-300 dark:border-red-700";
    if (type === "LOCKED") return "bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700";
    if (type === "NOTICE") return "bg-indigo-50 dark:bg-indigo-900 border-indigo-300 dark:border-indigo-700";
    return "bg-blue-50 dark:bg-blue-900 border-blue-300 dark:border-blue-700";
  };
  const formatDate = (s?: string) => {
    if (!s) return "";
    if (s.includes('/')) return s;
    const d = new Date(s);
    const dd = String(d.getDate()).padStart(2, '0');
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Logout Confirmation",
      text: "Are you sure you want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      logout();
      toast.success("Logged out successfully!", { duration: 3000 });
      navigate(
        location.pathname.startsWith("/user")
          ? "/user/login"
          : "/admin/dashboard_dpboss_login"
      );
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-card border-b border-border shadow-sm">
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="flex items-center justify-between px-4 py-3 lg:px-6">
        {/* Left Section - Menu + Title */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="lg:hidden text-foreground hover:text-white"
          >
            <Menu size={24} />
          </Button>
          <h1 className="text-xl lg:text-2xl font-bold text-foreground">
            {pageTitle}
          </h1>
        </div>

        {/* Right Section - Theme Toggle + Logout */}
        <div className="flex items-center space-x-2">
          {isUser && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell size={20} />
                  {statusQuery?.data?.data && statusQuery.data.data.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-5 h-5 rounded-full">
                      {statusQuery.data.data.length}
                    </span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-2">
                {statusQuery?.isFetching && (
                  <div className="text-sm text-muted-foreground p-2">Loading notifications...</div>
                )}
                {!statusQuery?.isFetching && statusQuery?.data?.data && statusQuery.data.data.length > 0 ? (
                  <ScrollArea className="h-64 pr-2">
                    <div className="space-y-2">
                      {statusQuery.data.data.map((n, idx) => (
                        <Card key={idx} className={`border shadow-sm ${getNotifyBgClass(n.type)}`}>
                          <CardContent className="p-2">
                            <p className="text-sm font-medium">{n.message}</p>
                            {n.expiry_date && (
                              <p className="text-xs text-muted-foreground">Expiry: <span className="text-red-500 font-medium">{formatDate(n.expiry_date)}</span></p>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                ) : (
                  <div className="text-sm text-muted-foreground p-2">No notifications</div>
                )}
              </PopoverContent>
            </Popover>
          )}
          <Button variant="secondary" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
          </Button>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};
