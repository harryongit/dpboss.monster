import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface CreateFreeFixRequest {
  date: string;
  market_id: number;
  single: string;
  jodi: string;
  panna: string;
  admin_id: number;
}

interface CreateFreeFixResponse {
  status_code: number;
  message: string;
  data: { id: number };
}

async function postCreateFreeFix(body: CreateFreeFixRequest): Promise<CreateFreeFixResponse> {
  try {
    const { data } = await api.post('/admin/create/free-fix', body);
    if (data?.status_code !== 201) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to create free fix';
      throw new Error(message);
    }
    return data as CreateFreeFixResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to create free fix';
    throw new Error(message);
  }
}

export function useCreateFreeFix() {
  return useMutation<CreateFreeFixResponse, Error, CreateFreeFixRequest>({
    mutationFn: (body) => postCreateFreeFix(body),
  });
}