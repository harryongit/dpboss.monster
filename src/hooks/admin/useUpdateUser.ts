import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface UpdateUserRequest {
  user_id: number;
  username: string;
  mobile: string;
  password?: string;
  admin_id: number;
}

interface UpdateUserResponse {
  status_code: number;
  message: string;
  data: Record<string, never>;
}

async function putUpdateUser(body: UpdateUserRequest): Promise<UpdateUserResponse> {
  try {
    const { data } = await api.put('/admin/update/user', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to update user';
      throw new Error(message);
    }
    return data as UpdateUserResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to update user';
    throw new Error(message);
  }
}

export function useUpdateUser() {
  return useMutation<UpdateUserResponse, Error, UpdateUserRequest>({
    mutationFn: (body) => putUpdateUser(body),
  });
}