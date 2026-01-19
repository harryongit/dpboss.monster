import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface AllMarketsRequest {
  admin_id: number;
}

interface MarketItem {
  market_id: number;
  market_name: string;
}

interface AllMarketsResponse {
  status_code: number;
  message: string;
  data: { items: MarketItem[] };
}

async function postAllMarkets(body: AllMarketsRequest): Promise<AllMarketsResponse> {
  try {
    const { data } = await api.post('/common/all_market_list', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch markets';
      throw new Error(message);
    }
    return data as AllMarketsResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to fetch markets';
    throw new Error(message);
  }
}

export function useAllMarkets(req: AllMarketsRequest) {
  return useQuery<AllMarketsResponse, Error>({
    queryKey: ['common', 'allMarkets', req.admin_id],
    queryFn: () => postAllMarkets(req),
    enabled: !!req.admin_id,
  });
}