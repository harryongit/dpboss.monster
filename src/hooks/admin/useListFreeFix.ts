import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface ListFreeFixRequest {
  admin_id: number;
}

interface FreeFixItem {
  freefix_id: number;
  market_id: number;
  single: string;
  jodi: string;
  panna: string;
  added_date: string;
}

interface ListFreeFixResponse {
  status_code: number;
  message: string;
  data: { items: FreeFixItem[] };
}

async function postListFreeFix(body: ListFreeFixRequest): Promise<ListFreeFixResponse> {
  try {
    const { data } = await api.post('/admin/list/free-fix', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch free fix';
      throw new Error(message);
    }
    return data as ListFreeFixResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to fetch free fix';
    throw new Error(message);
  }
}

export function useListFreeFix(req: ListFreeFixRequest) {
  return useQuery<ListFreeFixResponse, Error>({
    queryKey: ['admin', 'freefix', req.admin_id],
    queryFn: () => postListFreeFix(req),
    enabled: !!req.admin_id,
  });
}