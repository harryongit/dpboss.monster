import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface UpdateRequest {
  admin_id: number;
  cmmstargold_number_id: number;
  number: number;
  result_time: string;
}

interface UpdateResponse {
  status_code: number;
  message: string;
}

async function putUpdate(body: UpdateRequest): Promise<UpdateResponse> {
  const { data } = await api.put('/admin/update/cmmstargold_numberlist', body);
  if (data?.status_code !== 200) {
    const message = typeof data?.message === 'string' ? data.message : 'Failed to update CMM Star Gold number';
    throw new Error(message);
  }
  return data as UpdateResponse;
}

export function useUpdateCmmStarGoldNumber() {
  return useMutation<UpdateResponse, Error, UpdateRequest>({
    mutationFn: (body) => putUpdate(body),
  });
}
