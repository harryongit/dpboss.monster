import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface UploadSlot {
  kalyan36bazar_number_id: number;
  number: number;
  result_time: string;
  display_label: string;
  today_result: string;
}

interface SlotsResponse {
  status_code: number;
  message: string;
  data: { items: UploadSlot[] } | UploadSlot[];
}

async function getSlots(): Promise<SlotsResponse> {
  const { data } = await api.get('/common/kalyan36bazar_resultupload_publiclink');
  return data as SlotsResponse;
}

export function useKalyan36BazarPublicUploadSlots() {
  return useQuery<SlotsResponse, Error>({
    queryKey: ['common', 'kalyan36bazar', 'public-upload-slots'],
    queryFn: () => getSlots(),
  });
}
