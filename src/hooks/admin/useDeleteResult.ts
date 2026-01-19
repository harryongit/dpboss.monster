import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface DeleteResultRequest {
  result_id: number;
  admin_id: number;
}

interface DeleteResultResponse {
  status_code: number;
  message: string;
  data: Record<string, never>;
}

async function deleteResult(body: DeleteResultRequest): Promise<DeleteResultResponse> {
  try {
    const { data } = await api.delete('/admin/delete/result', { data: body });
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to delete result';
      throw new Error(message);
    }
    return data as DeleteResultResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to delete result';
    throw new Error(message);
  }
}

export function useDeleteResult() {
  return useMutation<DeleteResultResponse, Error, DeleteResultRequest>({
    mutationFn: (body) => deleteResult(body),
  });
}