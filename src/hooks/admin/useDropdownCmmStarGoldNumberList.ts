import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface DropdownRequest {
  admin_id: number;
}

interface DropdownItem {
  cmmstargold_number_id: number;
  number: number;
  result_time: string;
  display_label?: string;
}

interface DropdownResponse {
  status_code: number;
  message: string;
  data: { items: DropdownItem[] };
}

async function postDropdown(body: DropdownRequest): Promise<DropdownResponse> {
  const { data } = await api.post('/admin/dropdown/cmmstargold_numberlist', body);
  if (data?.status_code !== 200) {
    const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch time slots';
    throw new Error(message);
  }
  return data as DropdownResponse;
}

export function useDropdownCmmStarGoldNumberList(req: DropdownRequest) {
  return useQuery<DropdownResponse, Error>({
    queryKey: ['admin', 'cmmstargold', 'dropdown', req.admin_id],
    queryFn: () => postDropdown(req),
    enabled: !!req.admin_id,
  });
}
