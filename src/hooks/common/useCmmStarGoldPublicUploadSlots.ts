import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface SlotItem {
  cmmstargold_number_id: number;
  number: number;
  result_time: string;
  display_label: string;
  today_result: string;
}

interface SlotsResponse {
  status_code: number;
  message: string;
  data: { items: SlotItem[] } | SlotItem[];
}

async function getSlots(): Promise<SlotsResponse> {
  const { data } = await api.get('/common/cmmstargold_resultupload_publiclink');
  if (data?.status_code !== 200) {
    const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch upload slots';
    throw new Error(message);
  }
  return data as SlotsResponse;
}

export function useCmmStarGoldPublicUploadSlots() {
  return useQuery<SlotsResponse, Error>({
    queryKey: ['common', 'cmmstargold', 'public_upload_slots'],
    queryFn: () => getSlots(),
  });
}
