import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface CreateUserMarketRequest {
  user_id: number;
  market_id: number;
  days: number;
  admin_id: number;
}

interface CreateUserMarketResponse {
  status_code: number;
  message: string;
  data: { id: number };
}

async function postCreateUserMarket(body: CreateUserMarketRequest): Promise<CreateUserMarketResponse> {
  try {
    const { data } = await api.post('/admin/create/user-market', body);
    if (data?.status_code !== 201) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to create assignment';
      throw new Error(message);
    }
    return data as CreateUserMarketResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to create assignment';
    throw new Error(message);
  }
}

export function useCreateUserMarket() {
  return useMutation<CreateUserMarketResponse, Error, CreateUserMarketRequest>({
    mutationFn: (body) => postCreateUserMarket(body),
  });
}