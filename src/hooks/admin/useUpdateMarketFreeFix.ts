import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface UpdateMarketFreeFixRequest {
  market_id: number;
  free_fix_flag: number;
  admin_id: number;
}

interface UpdateMarketFreeFixResponse {
  status_code: number;
  message: string;
  data: { free_fix_flag: number };
}

async function putUpdateMarketFreeFix(body: UpdateMarketFreeFixRequest): Promise<UpdateMarketFreeFixResponse> {
  try {
    const { data } = await api.put('/admin/update/market-freefix', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to update free fix flag';
      throw new Error(message);
    }
    return data as UpdateMarketFreeFixResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to update free fix flag';
    throw new Error(message);
  }
}

export function useUpdateMarketFreeFix() {
  return useMutation<UpdateMarketFreeFixResponse, Error, UpdateMarketFreeFixRequest>({
    mutationFn: (body) => putUpdateMarketFreeFix(body),
  });
}
