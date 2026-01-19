import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface GetMarketDetailsRequest {
  market_id: number;
  admin_id: number;
}

interface MarketItem {
  market_id: number;
  game_name?: string;
  game?: string;
  name?: string;
  open_time: string;
  close_time: string;
  open_start_time?: string;
  open_stop_time?: string;
  close_start_time?: string;
  close_stop_time?: string;
  days: number;
  chart_type: string;
  sequence: number;
  live_result_sequence?: number;
  color: string;
  domain: string;
  status: number;
  is_holiday: boolean;
}

interface GetMarketDetailsResponse {
  status_code: number;
  message: string;
  data: { item: MarketItem };
}

async function fetchDetails(body: GetMarketDetailsRequest): Promise<GetMarketDetailsResponse> {
  try {
    const { data } = await api.post('/admin/get/market', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch market';
      throw new Error(message);
    }
    return data as GetMarketDetailsResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to fetch market';
    throw new Error(message);
  }
}

export function useGetMarketDetails(marketId?: number, adminId?: number, enabled: boolean = true) {
  const id = marketId ?? 0;
  const aid = adminId ?? 1;
  const body: GetMarketDetailsRequest = { market_id: id, admin_id: aid };
  return useQuery<GetMarketDetailsResponse, Error>({
    queryKey: ['admin', 'marketDetails', id, aid],
    queryFn: () => fetchDetails(body),
    enabled: enabled && !!marketId,
  });
}