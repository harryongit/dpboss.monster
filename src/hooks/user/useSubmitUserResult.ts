import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/lib/http';

export interface SubmitUserResultBody {
  user_id: number;
  market_id: number;
  result_number: string;
}

interface SubmitUserResultResponse {
  status_code: number;
  message: string;
  data: { result_id: number };
}

async function postUserResult(body: SubmitUserResultBody): Promise<SubmitUserResultResponse> {
  try {
    const { data } = await api.post('https://matkabooking.pro/user/results', body);
    if (data?.status_code !== 200 && data?.status_code !== 201) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to submit result';
      throw new Error(message);
    }
    return data as SubmitUserResultResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to submit result';
    throw new Error(message);
  }
}

export function useSubmitUserResult() {
  const qc = useQueryClient();
  return useMutation<SubmitUserResultResponse, Error, SubmitUserResultBody>({
    mutationFn: (body) => postUserResult(body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['user', 'results', 'markets'] });
    },
  });
}