import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface DashboardStatsRequest {
  admin_id: number;
}

interface DashboardStatsData {
  total_markets: number;
  final_ank_entries: number;
  registered_users: number;
  user_market_assignments: number;
  upcoming_holidays: number;
  active_markets_today: number;
  completed_games: number;
  recent_activities: number;
  system_status: string;
}

interface DashboardStatsResponse {
  status_code: number;
  message: string;
  data: DashboardStatsData;
}

async function fetchDashboardStats(body: DashboardStatsRequest): Promise<DashboardStatsResponse> {
  try {
    const { data } = await api.post('/admin/get/dashboard-stats', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch dashboard stats';
      throw new Error(message);
    }
    return data as DashboardStatsResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to fetch dashboard stats';
    throw new Error(message);
  }
}

export function useDashboardStats(adminId?: number) {
  let id = adminId;
  if (!id) {
    try {
      const saved = localStorage.getItem('admin');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.id) {
          id = parsed.id as number;
        }
      }
    } catch {
      id = undefined;
    }
  }
  const body: DashboardStatsRequest = { admin_id: id ?? 1 };
  return useQuery<DashboardStatsResponse, Error>({
    queryKey: ['admin', 'dashboardStats', body.admin_id],
    queryFn: () => fetchDashboardStats(body),
  });
}