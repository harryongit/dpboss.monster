import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface UpdateMarketCaptionRequest {
  market_id: number;
  market_caption_flag: number;
  admin_id: number;
}

interface UpdateMarketCaptionResponse {
  status_code: number;
  message: string;
  data: { market_caption_flag: number };
}

async function putUpdateMarketCaption(body: UpdateMarketCaptionRequest): Promise<UpdateMarketCaptionResponse> {
  try {
    const { data } = await api.put('/admin/update/market-caption', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to update market caption flag';
      throw new Error(message);
    }
    return data as UpdateMarketCaptionResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to update market caption flag';
    throw new Error(message);
  }
}

export function useUpdateMarketCaption() {
  return useMutation<UpdateMarketCaptionResponse, Error, UpdateMarketCaptionRequest>({
    mutationFn: (body) => putUpdateMarketCaption(body),
  });
}
