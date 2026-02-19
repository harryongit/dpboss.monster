import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface CreateMarketRequest {
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
  free_fix_flag?: number;
}

interface CreateMarketResponse {
  status_code: number;
  message: string;
  data: { market_id: number };
}

async function postCreateMarket(body: CreateMarketRequest): Promise<CreateMarketResponse> {
  try {
    const { data } = await api.post('/admin/create/market', body);
    if (data?.status_code !== 200 && data?.status_code !== 201) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to create market';
      throw new Error(message);
    }
    return data as CreateMarketResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to create market';
    throw new Error(message);
  }
}

export function useCreateMarket() {
  return useMutation<CreateMarketResponse, Error, CreateMarketRequest>({
    mutationFn: (body) => postCreateMarket(body),
  });
}
