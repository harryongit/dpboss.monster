

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/common/DataTable";
import { Toast } from "@/components/ui/ToastProvider";

import { useAdminListMarketHolidays } from "@/hooks/admin/useListMarketHolidays";
import { useUpdateMarketHoliday } from "@/hooks/admin/useUpdateMarketHoliday";
import { RefreshButton } from "@/components/ui/refresh-admin";

const MarketHoliday = () => {
  const [holidays, setHolidays] = useState([] as { id: number; gameName: string; status: "On" | "Off" }[]);
  let adminId = 1;
  try {
    const saved = localStorage.getItem('admin');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed?.id) adminId = parsed.id as number;
    }
  } catch {
    adminId = 1;
  }

  const { data, isFetching, refetch } = useAdminListMarketHolidays({ admin_id: adminId });
  const updateMutation = useUpdateMarketHoliday();

  useEffect(() => {
    const items = data?.data?.items ?? [];
    setHolidays(items.map((m) => ({ id: m.market_id, gameName: m.game_name ?? m.game ?? '', status: m.is_holiday ? 'On' : 'Off' })));
  }, [data]);

  const [pendingId, setPendingId] = useState<number | null>(null);
  const toggleStatus = async (row: any, value: "On" | "Off") => {
    const isHoliday = value === 'On';
    setPendingId(row.id);
    try {
      const resp = await updateMutation.mutateAsync({ market_id: row.id, is_holiday: isHoliday, admin_id: adminId });
      Toast.success(resp.message || `${row.gameName} holiday ${isHoliday ? 'enabled' : 'disabled'}`);
      await refetch();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to update holiday';
      Toast.error(message);
    } finally {
      setPendingId(null);
    }
  };

  const columns = [
   
    { header: "Game Name", accessor: "gameName" },
    {
      header: "Holiday Status",
      accessor: "status",
      cell: (value: string, row: any) => (
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name={`holiday-${row.id}`}
              value="On"
              checked={value === "On"}
              onChange={() => toggleStatus(row, "On")}
              disabled={pendingId === row.id || updateMutation.isPending}
              className="accent-green-500"
            />
            On
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name={`holiday-${row.id}`}
              value="Off"
              checked={value === "Off"}
              onChange={() => toggleStatus(row, "Off")}
              disabled={pendingId === row.id || updateMutation.isPending}
              className="accent-red-500"
            />
            Off
          </label>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      
        <DataTable
          title="Market Holidays"
          columns={columns}
          data={holidays}
          actions={false}
          headerRight={<RefreshButton onClick={() => { void refetch(); }} loading={isFetching} />}
        />
      {/* )} */}
    </div>
  );
};

export default MarketHoliday;
