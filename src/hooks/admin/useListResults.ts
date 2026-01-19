import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface ListResultsRequest {
  admin_id: number;
}

interface ResultItem {
  sr_no: number;
  market_id: number;
  result: string;
  result_date: string;
  status: number;
  result_id?: number;
}

interface ListResultsResponse {
  status_code: number;
  message: string;
  data: { items: ResultItem[] };
}

async function postListResults(body: ListResultsRequest): Promise<ListResultsResponse> {
  try {
    const { data } = await api.post('/admin/list/results', { admin_id: body.admin_id });
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch results';
      throw new Error(message);
    }
    return data as ListResultsResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to fetch results';
    throw new Error(message);
  }
}

export function useListResults(req: ListResultsRequest, enabled: boolean = true) {
  return useQuery<ListResultsResponse, Error>({
    queryKey: ['admin', 'results', req.admin_id],
    queryFn: () => postListResults(req),
    enabled: enabled && !!req.admin_id,
  });
}