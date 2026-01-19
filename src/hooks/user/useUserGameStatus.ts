import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface UserGameStatusRequest {
  user_id: number;
}

export interface UserGameStatusItem {
  market_id: number;
  market_name: string;
  type: 'INFO' | 'WARNING' | 'ERROR' | 'SUCCESS' | 'EXPIRED' | 'LOCKED' | 'NOTICE' | string;
  days_left: number;
  message: string;
  status?: number;
  expiry_date?: string;
}

interface UserGameStatusResponse {
  status_code: number;
  message: string;
  data: UserGameStatusItem[];
}

async function postUserGameStatus(body: UserGameStatusRequest): Promise<UserGameStatusResponse> {
  try {
    const { data } = await api.post('/user/game/status', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch user game status';
      throw new Error(message);
    }
    return data as UserGameStatusResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to fetch user game status';
    throw new Error(message);
  }
}

export function useUserGameStatus(userId?: number) {
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
  const body: UserGameStatusRequest = { user_id: id ?? 0 };
  return useQuery<UserGameStatusResponse, Error>({
    queryKey: ['user', 'gameStatus', body.user_id],
    queryFn: () => postUserGameStatus(body),
    enabled: !!body.user_id,
  });
}