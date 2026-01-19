import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface UpdateMarketHolidayRequest {
  market_id: number;
  is_holiday: boolean;
  admin_id: number;
}

interface UpdateMarketHolidayResponse {
  status_code: number;
  message: string;
  data: { is_holiday: boolean };
}

async function putUpdateMarketHoliday(body: UpdateMarketHolidayRequest): Promise<UpdateMarketHolidayResponse> {
  try {
    const { data } = await api.put('/admin/update/market-holiday', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to update holiday';
      throw new Error(message);
    }
    return data as UpdateMarketHolidayResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to update holiday';
    throw new Error(message);
  }
}

export function useUpdateMarketHoliday() {
  return useMutation<UpdateMarketHolidayResponse, Error, UpdateMarketHolidayRequest>({
    mutationFn: (body) => putUpdateMarketHoliday(body),
  });
}