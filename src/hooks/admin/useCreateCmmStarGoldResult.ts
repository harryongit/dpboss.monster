import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface CreateRequest {
  admin_id: number;
  cmmstargold_number_id: number;
  result_value: string;
  result_datetime?: string;
}

interface CreateResponse {
  status_code: number;
  message: string;
  result_id: number;
}

async function postCreate(body: CreateRequest): Promise<CreateResponse> {
  const { data } = await api.post('/admin/create/cmmstargold_result', body);
  if (data?.status_code !== 201 && data?.status_code !== 200) {
    const message = typeof data?.message === 'string' ? data.message : 'Failed to upload result';
    throw new Error(message);
  }
  return data as CreateResponse;
}

export function useCreateCmmStarGoldResult() {
  return useMutation<CreateResponse, Error, CreateRequest>({
    mutationFn: (body) => postCreate(body),
  });
}
