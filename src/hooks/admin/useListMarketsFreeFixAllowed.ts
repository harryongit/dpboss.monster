import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface MarketsFreeFixAllowedRequest {
  admin_id: number;
}

interface MarketsFreeFixAllowedItem {
  market_id: number;
  game_name: string;
  free_fix_flag: number;
}

interface MarketsFreeFixAllowedResponse {
  status_code: number;
  message: string;
  data: { items: MarketsFreeFixAllowedItem[] };
}

async function postMarketsFreeFixAllowed(body: MarketsFreeFixAllowedRequest): Promise<MarketsFreeFixAllowedResponse> {
  try {
    const { data } = await api.post('/admin/list/markets-freefix-allowed', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch allowed markets';
      throw new Error(message);
    }
    return data as MarketsFreeFixAllowedResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to fetch allowed markets';
    throw new Error(message);
  }
}

export function useListMarketsFreeFixAllowed(req: MarketsFreeFixAllowedRequest) {
  return useQuery<MarketsFreeFixAllowedResponse, Error>({
    queryKey: ['admin', 'marketsFreeFixAllowed', req.admin_id],
    queryFn: () => postMarketsFreeFixAllowed(req),
    enabled: !!req.admin_id,
  });
}
