import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface UpdateUserFreeFixRequest {
  user_id: number;
  free_fix_flag: number;
  admin_id: number;
}

interface UpdateUserFreeFixResponse {
  status_code: number;
  message: string;
  data: { free_fix_flag: number };
}

async function putUpdateUserFreeFix(body: UpdateUserFreeFixRequest): Promise<UpdateUserFreeFixResponse> {
  try {
    const { data } = await api.put('/admin/update/user-freefix', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to update free fix flag';
      throw new Error(message);
    }
    return data as UpdateUserFreeFixResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to update free fix flag';
    throw new Error(message);
  }
}

export function useUpdateUserFreeFix() {
  return useMutation<UpdateUserFreeFixResponse, Error, UpdateUserFreeFixRequest>({
    mutationFn: (body) => putUpdateUserFreeFix(body),
  });
}
