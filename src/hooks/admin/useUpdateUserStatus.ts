import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface UpdateUserStatusRequest {
  user_id: number;
  status: number;
  admin_id: number;
}

interface UpdateUserStatusResponse {
  status_code: number;
  message: string;
  data: { status: number };
}

async function putUpdateUserStatus(body: UpdateUserStatusRequest): Promise<UpdateUserStatusResponse> {
  try {
    const { data } = await api.put('/admin/update/user-status', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to update user status';
      throw new Error(message);
    }
    return data as UpdateUserStatusResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to update user status';
    throw new Error(message);
  }
}

export function useUpdateUserStatus() {
  return useMutation<UpdateUserStatusResponse, Error, UpdateUserStatusRequest>({
    mutationFn: (body) => putUpdateUserStatus(body),
  });
}