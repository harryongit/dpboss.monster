import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface ListUserFreeFixRequest {
  user_id: number;
}

export interface UserFreeFixItem {
  id: number;
  market_id: number;
  market_name: string;
  single: string;
  jodi: string;
  panna: string;
  date: string;
}

interface ListUserFreeFixResponse {
  status_code: number;
  message: string;
  data: { items: UserFreeFixItem[] };
}

async function postListUserFreeFix(body: ListUserFreeFixRequest): Promise<ListUserFreeFixResponse> {
  try {
    const { data } = await api.post('/user/free-fix/list', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch free fix';
      throw new Error(message);
    }
    return data as ListUserFreeFixResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to fetch free fix';
    throw new Error(message);
  }
}

export function useListUserFreeFix(userId?: number) {
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
  const body: ListUserFreeFixRequest = { user_id: id ?? 0 };
  return useQuery<ListUserFreeFixResponse, Error>({
    queryKey: ['user', 'freeFix', 'list', body.user_id],
    queryFn: () => postListUserFreeFix(body),
    enabled: !!body.user_id,
  });
}
