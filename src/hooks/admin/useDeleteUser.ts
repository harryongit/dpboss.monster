import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface DeleteUserRequest {
  user_id: number;
  admin_id: number;
}

interface DeleteUserResponse {
  status_code: number;
  message: string;
  data: Record<string, never>;
}

async function deleteUser(body: DeleteUserRequest): Promise<DeleteUserResponse> {
  try {
    const { data } = await api.delete('/admin/delete/user', { data: body });
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to delete user';
      throw new Error(message);
    }
    return data as DeleteUserResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to delete user';
    throw new Error(message);
  }
}

export function useDeleteUser() {
  return useMutation<DeleteUserResponse, Error, DeleteUserRequest>({
    mutationFn: (body) => deleteUser(body),
  });
}