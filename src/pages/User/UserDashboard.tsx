

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, CheckCircle, XCircle, Info } from "lucide-react";
import { motion } from "framer-motion";
import { useUserAssignedMarkets } from "@/hooks/user/useUserAssignedMarkets";
import { useUserGameStatus } from "@/hooks/user/useUserGameStatus";
import { useAuth } from "@/contexts/AuthContext";
import { RefreshButton } from "@/components/ui/refresh-admin";
import { Toast } from "@/components/ui/ToastProvider";
import UserUploadResult from "./UserUploadResult";
const UserDashboard = () => {
  const { userUsername } = useAuth();
  const assignedQuery = useUserAssignedMarkets();
  const statusQuery = useUserGameStatus();

  const userName = userUsername ?? "User";

  const getCardBgClass = (status: string) =>
    status === "Active"
      ? "bg-green-50 dark:bg-green-900"
      : "bg-gray-100 dark:bg-gray-800";

      
        const getStatusStyles = (status: string) =>
          status === "Active"
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400";

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
      
  return (
    <div className="space-y-6">
 {/* Welcome Message */}
      <Card className="relative bg-gradient-to-r from-purple-600 to-purple-400 dark:from-purple-800 dark:to-purple-600 text-white rounded-xl p-6 lg:p-8 shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="absolute top-0 -left-10 w-40 h-40 bg-purple-500 dark:bg-purple-700 rounded-full opacity-30 pointer-events-none" />
        <div className="absolute bottom-0 -right-10 w-40 h-40 bg-purple-500 dark:bg-purple-700 rounded-full opacity-30 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Welcome, {userName} 👋</h2>
            <p className="text-white/90 dark:text-white/80 max-w-xl">
            Upload market results quickly and manage them efficiently through this panel.
            </p>

          </div>
        </div>
      </Card>
      <Card className="border border-gray-200 dark:border-gray-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold">Notifications</CardTitle>
          <RefreshButton onClick={async () => { await statusQuery.refetch(); Toast.success('Notifications refreshed'); }} loading={statusQuery.isFetching} />
        </CardHeader>
        <CardContent>
          {statusQuery.data?.data && statusQuery.data.data.length > 0 && (
            <div className="grid gap-4 md:grid-cols-3">
              {statusQuery.data.data.map((n, idx) => (
                <Card key={idx} className={`border shadow-sm ${getNotifyBgClass(n.type)}`}>
                  <CardContent className="px-4 py-3 space-y-1">
                    <p className="text-sm font-medium">{n.message}</p>
                    {n.expiry_date && (
                                                  <p className="text-xs text-muted-foreground">Expiry: <span className="text-red-500 font-medium">{formatDate(n.expiry_date)}</span></p>

                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
          {(!statusQuery.data?.data || statusQuery.data.data.length === 0) && (
            <div className="p-4 text-sm text-gray-600 dark:text-gray-300">No notifications</div>
          )}
        </CardContent>
      </Card>

     

      <UserUploadResult></UserUploadResult>
    </div>
  );
};

export default UserDashboard;
