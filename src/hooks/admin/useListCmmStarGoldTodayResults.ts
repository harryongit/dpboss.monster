import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface ListRequest {
  admin_id: number;
}

interface ResultItem {
  result_id: number;
  cmmstargold_number_id: number;
  result_value: string;
  result_datetime: string;
}

interface ListResponse {
  status_code: number;
  message?: string;
  data: ResultItem[];
}

async function postList(body: ListRequest): Promise<ListResponse> {
  const { data } = await api.post('/admin/list/cmmstargold_today_result', body);
  if (data?.status_code !== 200) {
    const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch CMM Star Gold results';
    throw new Error(message);
  }
  return data as ListResponse;
}

export function useListCmmStarGoldTodayResults(req: ListRequest) {
  return useQuery<ListResponse, Error>({
    queryKey: ['admin', 'cmmstargold', 'today_results', req.admin_id],
    queryFn: () => postList(req),
    enabled: !!req.admin_id,
  });
}
