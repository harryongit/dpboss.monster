import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface PanelResultItem {
  result_time: string;
  result: string;
}

interface PanelDay {
  date: string;
  results: PanelResultItem[];
}

interface PanelResponse {
  status_code: number;
  message: string;
  data: PanelDay[] | { items: PanelDay[] };
}

async function getPanel(): Promise<PanelResponse> {
  const { data } = await api.get('/common/cmmstargoldresult/panel');
  if (data?.status_code !== 200) {
    const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch panel results';
    throw new Error(message);
  }
  return data as PanelResponse;
}

export function useCmmStarGoldPanelResults() {
  return useQuery<PanelResponse, Error>({
    queryKey: ['common', 'cmmstargold', 'panel'],
    queryFn: () => getPanel(),
  });
}
