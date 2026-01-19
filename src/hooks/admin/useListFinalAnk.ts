import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface ListFinalAnkRequest {
  admin_id: number;
}

interface FinalAnkItem {
  sr_no: number;
  market_id: number;
  ank_number: string;
  result_date: string; // dd/mm/yyyy
}

interface ListFinalAnkResponse {
  status_code: number;
  message: string;
  data: { items: FinalAnkItem[] };
}

async function postListFinalAnk(body: ListFinalAnkRequest): Promise<ListFinalAnkResponse> {
  try {
    const { data } = await api.post('/admin/list/final-ank', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch final ank';
      throw new Error(message);
    }
    return data as ListFinalAnkResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to fetch final ank';
    throw new Error(message);
  }
}

export function useListFinalAnk(req: ListFinalAnkRequest) {
  return useQuery<ListFinalAnkResponse, Error>({
    queryKey: ['admin', 'finalAnk', req.admin_id],
    queryFn: () => postListFinalAnk(req),
    enabled: !!req.admin_id,
  });
}