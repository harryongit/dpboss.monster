import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface ListUserMarketsRequest {
  admin_id: number;
}

interface UserMarketItem {
  id: number;
  user_id: number;
  market_id: number;
  added_on: string;
  active_till: string | null;
  days: number;
}

interface ListUserMarketsResponse {
  status_code: number;
  message: string;
  data: { items: UserMarketItem[] };
}

async function postListUserMarkets(body: ListUserMarketsRequest): Promise<ListUserMarketsResponse> {
  try {
    const { data } = await api.post('/admin/list/user-markets', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch assignments';
      throw new Error(message);
    }
    return data as ListUserMarketsResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to fetch assignments';
    throw new Error(message);
  }
}

export function useListUserMarkets(req: ListUserMarketsRequest) {
  return useQuery<ListUserMarketsResponse, Error>({
    queryKey: ['admin', 'userMarkets', req.admin_id],
    queryFn: () => postListUserMarkets(req),
    enabled: !!req.admin_id,
  });
}