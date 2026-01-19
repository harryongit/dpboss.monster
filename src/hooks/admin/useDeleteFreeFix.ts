import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface DeleteFreeFixRequest {
  freefix_id: number;
  market_id: number;
  admin_id: number;
}

interface DeleteFreeFixResponse {
  status_code: number;
  message: string;
  data: Record<string, never>;
}

async function deleteFreeFix(body: DeleteFreeFixRequest): Promise<DeleteFreeFixResponse> {
  try {
    const { data } = await api.delete('/admin/delete/free-fix', { data: body });
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to delete free fix';
      throw new Error(message);
    }
    return data as DeleteFreeFixResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to delete free fix';
    throw new Error(message);
  }
}

export function useDeleteFreeFix() {
  return useMutation<DeleteFreeFixResponse, Error, DeleteFreeFixRequest>({
    mutationFn: (body) => deleteFreeFix(body),
  });
}