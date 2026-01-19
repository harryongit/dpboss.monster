import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface DeleteUserMarketRequest {
  id: number;
  admin_id: number;
}

interface DeleteUserMarketResponse {
  status_code: number;
  message: string;
  data: Record<string, never>;
}

async function deleteUserMarket(body: DeleteUserMarketRequest): Promise<DeleteUserMarketResponse> {
  try {
    const { data } = await api.delete('/admin/delete/user-market', { data: body });
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to delete assignment';
      throw new Error(message);
    }
    return data as DeleteUserMarketResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to delete assignment';
    throw new Error(message);
  }
}

export function useDeleteUserMarket() {
  return useMutation<DeleteUserMarketResponse, Error, DeleteUserMarketRequest>({
    mutationFn: (body) => deleteUserMarket(body),
  });
}