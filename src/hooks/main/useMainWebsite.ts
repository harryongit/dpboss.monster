import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface LiveMarketItem {
  market_id: number;
  market_name: string;
  result: string;
  market_caption_flag?: number;
}

interface AllMarketItem {
  market_id: number;
  market_name: string;
  result: string;
  color?: string;
  open_time?: string;
  close_time?: string;
  market_caption_flag?: number;
}

interface FinalAnkItem {
  market_id: number;
  market_name: string;
  ank: string | null;
}

interface MainWebsiteResponse {
  status_code: number;
  message: string;
  data: {
    updated_time: string;
    live_markets: LiveMarketItem[];
    all_markets: AllMarketItem[];
    final_ank: FinalAnkItem[];
  };
}

async function fetchMainWebsite(): Promise<MainWebsiteResponse> {
  try {
    const { data } = await api.get('/website/live-results');
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch live results';
      throw new Error(message);
    }
    return data as MainWebsiteResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to fetch live results';
    throw new Error(message);
  }
}

export function useMainWebsite() {
  return useQuery<MainWebsiteResponse, Error>({
    queryKey: ['website', 'liveResults'],
    queryFn: () => fetchMainWebsite(),
  });
}
