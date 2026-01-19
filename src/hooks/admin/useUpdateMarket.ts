import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface UpdateMarketRequest {
  market_id: number;
  admin_id: number;
  name: string;
  days: number;
  open_time: string;
  close_time: string;
  open_start_time?: string;
  open_stop_time?: string;
  close_start_time?: string;
  close_stop_time?: string;
  chart_type: string;
  sequence: number;
  live_result_sequence?: number;
  color: string;
  domain: string;
}

interface UpdateMarketResponse {
  status_code: number;
  message: string;
  data: Record<string, never>;
}

async function putUpdateMarket(body: UpdateMarketRequest): Promise<UpdateMarketResponse> {
  try {
    const { data } = await api.put('/admin/update/market', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to update market';
      throw new Error(message);
    }
    return data as UpdateMarketResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to update market';
    throw new Error(message);
  }
}

export function useUpdateMarket() {
  return useMutation<UpdateMarketResponse, Error, UpdateMarketRequest>({
    mutationFn: (body) => putUpdateMarket(body),
  });
}