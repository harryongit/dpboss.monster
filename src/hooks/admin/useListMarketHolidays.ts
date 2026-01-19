import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface ListMarketHolidaysRequest {
  admin_id: number;
}

interface HolidayItem {
  sr_no: number;
  market_id: number;
  game?: string;
  game_name?: string;
  is_holiday: boolean;
}

interface ListMarketHolidaysResponse {
  status_code: number;
  message: string;
  data: { items: HolidayItem[] };
}

async function postListMarketHolidays(body: ListMarketHolidaysRequest): Promise<ListMarketHolidaysResponse> {
  try {
    const { data } = await api.post('/admin/list/market-holidays', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch holiday markets';
      throw new Error(message);
    }
    return data as ListMarketHolidaysResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to fetch holiday markets';
    throw new Error(message);
  }
}

export function useAdminListMarketHolidays(req: ListMarketHolidaysRequest) {
  return useQuery<ListMarketHolidaysResponse, Error>({
    queryKey: ['admin', 'marketHolidays', req.admin_id],
    queryFn: () => postListMarketHolidays({ admin_id: req.admin_id }),
    enabled: !!req.admin_id,
  });
}