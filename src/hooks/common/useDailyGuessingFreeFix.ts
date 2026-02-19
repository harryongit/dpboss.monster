import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface GuessItem {
  market_id: number;
  market_name: string;
  single: string;
  jodi: string;
  panna: string;
  date: string;
}

interface DailyGuessingResponse {
  status_code: number;
  message: string;
  data: { items: GuessItem[] };
}

async function fetchDailyGuessing(): Promise<DailyGuessingResponse> {
  try {
    const { data } = await api.get('/common/daily_guessing_free_fix');
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch daily guessing';
      throw new Error(message);
    }
    return data as DailyGuessingResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to fetch daily guessing';
    throw new Error(message);
  }
}

export function useDailyGuessingFreeFix() {
  return useQuery<DailyGuessingResponse, Error>({
    queryKey: ['common', 'dailyGuessingFreeFix'],
    queryFn: () => fetchDailyGuessing(),
  });
}
