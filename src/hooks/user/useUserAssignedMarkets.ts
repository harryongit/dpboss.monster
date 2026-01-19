import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface UserAssignedMarketsRequest {
  user_id: number;
}

export interface UserAssignedMarketItem {
  market_id: number;
  market_name: string;
  start_date: string; // dd/mm/yyyy
  expiry_date: string; // dd/mm/yyyy
  remaining_days: number;
  active: boolean;
}

interface UserAssignedMarketsResponse {
  status_code: number;
  message: string;
  data: { items: UserAssignedMarketItem[] };
}

async function postUserAssignedMarkets(body: UserAssignedMarketsRequest): Promise<UserAssignedMarketsResponse> {
  try {
    const { data } = await api.post('/user/dashboard/markets', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch assigned markets';
      throw new Error(message);
    }
    return data as UserAssignedMarketsResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to fetch assigned markets';
    throw new Error(message);
  }
}

export function useUserAssignedMarkets(userId?: number) {
  let id = userId;
  if (!id) {
    try {
      const saved = localStorage.getItem('user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.id) id = parsed.id as number;
      }
    } catch {
      id = undefined;
    }
  }
  const body: UserAssignedMarketsRequest = { user_id: id ?? 0 };
  return useQuery<UserAssignedMarketsResponse, Error>({
    queryKey: ['user', 'assignedMarkets', body.user_id],
    queryFn: () => postUserAssignedMarkets(body),
    enabled: !!body.user_id,
  });
}