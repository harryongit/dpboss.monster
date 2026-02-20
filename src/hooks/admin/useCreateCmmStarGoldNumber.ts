import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface CreateRequest {
  admin_id: number;
  number: number;
  result_time: string;
}

interface CreateResponse {
  status_code: number;
  message: string;
  cmmstargold_number_id: number;
}

async function postCreate(body: CreateRequest): Promise<CreateResponse> {
  const { data } = await api.post('/admin/create/cmmstargold_numberlist', body);
  if (data?.status_code !== 201 && data?.status_code !== 200) {
    const message = typeof data?.message === 'string' ? data.message : 'Failed to create CMM Star Gold number';
    throw new Error(message);
  }
  return data as CreateResponse;
}

export function useCreateCmmStarGoldNumber() {
  return useMutation<CreateResponse, Error, CreateRequest>({
    mutationFn: (body) => postCreate(body),
  });
}
