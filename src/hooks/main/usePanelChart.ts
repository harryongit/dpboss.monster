import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

export interface PanelChartDayData {
  open: string;
  jodi: string;
  close: string;
}

export interface PanelChartWeek {
  start_date: string;
  end_date: string;
  data: PanelChartDayData[];
}

export interface PanelChartData {
  market_id: number;
  market_name: string;
  result: string;
  days: number;
  weeks: PanelChartWeek[];
}

interface PanelChartResponse {
  status_code: number;
  message: string;
  data: PanelChartData;
}

async function fetchPanelChart(marketId: number): Promise<PanelChartResponse> {
  try {
    const { data } = await api.get(`/panel-chart/${marketId}`);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch panel chart';
      throw new Error(message);
    }
    return data as PanelChartResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to fetch panel chart';
    throw new Error(message);
  }
}

export function usePanelChart(marketId?: number) {
  return useQuery<PanelChartResponse, Error>({
    queryKey: ['panelChart', marketId],
    queryFn: () => fetchPanelChart(marketId!),
    enabled: !!marketId,
    refetchInterval: 30000,
    refetchOnWindowFocus: true,
    gcTime: 0,
  });
}
