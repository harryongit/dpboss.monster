import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface CreateFinalAnkRequest {
  date: string; // dd/mm/yyyy
  market_id: number;
  ank_number: string;
  admin_id: number;
}

interface CreateFinalAnkResponse {
  status_code: number;
  message: string;
  data: { id: number };
}

async function postCreateFinalAnk(body: CreateFinalAnkRequest): Promise<CreateFinalAnkResponse> {
  try {
    const { data } = await api.post('/admin/create/final-ank', body);
    if (data?.status_code !== 201) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to create final ank';
      throw new Error(message);
    }
    return data as CreateFinalAnkResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to create final ank';
    throw new Error(message);
  }
}

export function useCreateFinalAnk() {
  return useMutation<CreateFinalAnkResponse, Error, CreateFinalAnkRequest>({
    mutationFn: (body) => postCreateFinalAnk(body),
  });
}