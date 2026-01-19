import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface UserResultsListRequest {
  user_id: number;
}

export interface UserResultMarketItem {
  market_id: number;
  market_name: string;
}

interface UserResultsListResponse {
  status_code: number;
  message: string;
  data: { items: UserResultMarketItem[] };
}

async function postUserResultsList(body: UserResultsListRequest): Promise<UserResultsListResponse> {
  try {
    const { data } = await api.post('/user/results/list', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch user results markets';
      throw new Error(message);
    }
    return data as UserResultsListResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to fetch user results markets';
    throw new Error(message);
  }
}

export function useUserResultMarkets(userId?: number) {
  let id = userId;
  if (!id) {
    try {
      const saved = localStorage.getItem('user');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.id) id = parsed.id as number;
      }
    } catch {
      id = undefined;
    }
  }
  const body: UserResultsListRequest = { user_id: id ?? 0 };
  return useQuery<UserResultsListResponse, Error>({
    queryKey: ['user', 'results', 'markets', body.user_id],
    queryFn: () => postUserResultsList(body),
    enabled: !!body.user_id,
  });
}