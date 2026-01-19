import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface DeleteMarketRequest {
  market_id: number;
  admin_id: number;
}

interface DeleteMarketResponse {
  status_code: number;
  message: string;
  data: Record<string, never>;
}

async function deleteMarket(body: DeleteMarketRequest): Promise<DeleteMarketResponse> {
  try {
    const { data } = await api.delete('/admin/delete/market', { data: body });
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to delete market';
      throw new Error(message);
    }
    return data as DeleteMarketResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to delete market';
    throw new Error(message);
  }
}

export function useDeleteMarket() {
  return useMutation<DeleteMarketResponse, Error, DeleteMarketRequest>({
    mutationFn: (body) => deleteMarket(body),
  });
}