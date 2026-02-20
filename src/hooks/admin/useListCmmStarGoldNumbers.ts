import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface ListRequest {
  admin_id: number;
}

interface RawItem {
  cmmstargold_number_id?: number;
  cmmstargold_id?: number;
  number: number;
  result_time: string;
}

interface ListResponse {
  status_code: number;
  message: string;
  data: { items: RawItem[] };
}

async function postList(body: ListRequest): Promise<ListResponse> {
  const { data } = await api.post('/admin/list/cmmstargold_numberlist', body);
  if (data?.status_code !== 200) {
    const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch CMM Star Gold numbers';
    throw new Error(message);
  }
  return data as ListResponse;
}

export function useListCmmStarGoldNumbers(req: ListRequest) {
  return useQuery<ListResponse, Error>({
    queryKey: ['admin', 'cmmstargold', 'list', req.admin_id],
    queryFn: () => postList(req),
    enabled: !!req.admin_id,
  });
}
