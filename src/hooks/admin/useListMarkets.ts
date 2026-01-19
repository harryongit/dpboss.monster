import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface ListMarketsRequest {
  admin_id: number;
}
interface ListMarketsItem {
  id: number;
  name: string;
  open_time: string;
  close_time: string;
  days: number;
  chart_type: string;
  sequence: number;
  color: string;
  domain: string;
  status: number;
  is_holiday: boolean;
}
interface ListMarketsResponse {
  status_code: number;
  message: string;
  data: {
    items: ListMarketsItem[];
  };
}

async function fetchListMarkets(body: ListMarketsRequest): Promise<ListMarketsResponse> {
  try {
    const { data } = await api.post('/admin/list/markets', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch markets';
      throw new Error(message);
    }
    return data as ListMarketsResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to fetch markets';
    throw new Error(message);
  }
}

export function useAdminListMarkets(adminId?: number) {
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
  const body: ListMarketsRequest = { admin_id: id ?? 1 };
  return useQuery<ListMarketsResponse, Error>({
    queryKey: ['admin', 'listMarkets', body.admin_id],
    queryFn: () => fetchListMarkets(body),
  });
}
