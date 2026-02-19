import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

export interface CreateUserFreeFixBody {
  user_id: number;
  market_id: number;
  single: string;
  jodi: string;
  panna: string;
}

interface CreateUserFreeFixResponse {
  status_code: number;
  message: string;
  data: { id: number };
}

async function postCreateUserFreeFix(body: CreateUserFreeFixBody): Promise<CreateUserFreeFixResponse> {
  try {
    const { data } = await api.post('/user/free-fix', body);
    if (data?.status_code !== 201 && data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to create free fix';
      throw new Error(message);
    }
    return data as CreateUserFreeFixResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to create free fix';
    throw new Error(message);
  }
}

export function useCreateUserFreeFix() {
  return useMutation<CreateUserFreeFixResponse, Error, CreateUserFreeFixBody>({
    mutationFn: (body) => postCreateUserFreeFix(body),
  });
}
