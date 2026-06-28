import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

export interface JodiChartWeek {
  start_date: string;
  end_date: string;
  jodi: string[];
}

export interface JodiChartData {
  market_id: number;
  market_name: string;
  result: string;
  days: number;
  weeks: JodiChartWeek[];
}

interface JodiChartResponse {
  status_code: number;
  message: string;
  data: JodiChartData;
}

async function fetchJodiChart(marketId: number): Promise<JodiChartResponse> {
  try {
    const { data } = await api.get(`/jodi-chart/${marketId}`);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch jodi chart';
      throw new Error(message);
    }
    return data as JodiChartResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to fetch jodi chart';
    throw new Error(message);
  }
}

export function useJodiChart(marketId?: number) {
  return useQuery<JodiChartResponse, Error>({
    queryKey: ['jodiChart', marketId],
    queryFn: () => fetchJodiChart(marketId!),
    enabled: !!marketId,
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    gcTime: 0,
  });
}
