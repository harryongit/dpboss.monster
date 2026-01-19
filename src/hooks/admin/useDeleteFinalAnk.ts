import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface DeleteFinalAnkRequest {
  id: number;
  admin_id: number;
}

interface DeleteFinalAnkResponse {
  status_code: number;
  message: string;
  data: Record<string, never>;
}

async function deleteFinalAnk(body: DeleteFinalAnkRequest): Promise<DeleteFinalAnkResponse> {
  try {
    const { data } = await api.delete('/admin/delete/final-ank', { data: body });
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to delete final ank';
      throw new Error(message);
    }
    return data as DeleteFinalAnkResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to delete final ank';
    throw new Error(message);
  }
}

export function useDeleteFinalAnk() {
  return useMutation<DeleteFinalAnkResponse, Error, DeleteFinalAnkRequest>({
    mutationFn: (body) => deleteFinalAnk(body),
  });
}