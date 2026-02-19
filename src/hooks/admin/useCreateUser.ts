import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface CreateUserRequest {
  username: string;
  mobile: string;
  password: string;
  admin_id: number;
  free_fix_flag?: number;
}

interface CreateUserResponse {
  status_code: number;
  message: string;
  data: { id: number };
}

async function postCreateUser(body: CreateUserRequest): Promise<CreateUserResponse> {
  try {
    const { data } = await api.post('/admin/create/user', body);
    if (data?.status_code !== 201) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to create user';
      throw new Error(message);
    }
    return data as CreateUserResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to create user';
    throw new Error(message);
  }
}

export function useCreateUser() {
  return useMutation<CreateUserResponse, Error, CreateUserRequest>({
    mutationFn: (body) => postCreateUser(body),
  });
}
