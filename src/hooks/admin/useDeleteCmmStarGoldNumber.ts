import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface DeleteRequest {
  admin_id: number;
  cmmstargold_number_id: number;
}

interface DeleteResponse {
  status_code: number;
  message: string;
}

async function del(body: DeleteRequest): Promise<DeleteResponse> {
  const { data } = await api.delete('/admin/delete/cmmstargold_numberlist', { data: body });
  if (data?.status_code !== 200) {
    const message = typeof data?.message === 'string' ? data.message : 'Failed to delete CMM Star Gold number';
    throw new Error(message);
  }
  return data as DeleteResponse;
}

export function useDeleteCmmStarGoldNumber() {
  return useMutation<DeleteResponse, Error, DeleteRequest>({
    mutationFn: (body) => del(body),
  });
}
