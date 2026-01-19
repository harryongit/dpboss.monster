import { useMutation } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface GetUserDetailsRequest {
  user_id: number;
  admin_id: number;
}

interface UserDetailsItem {
  id: number;
  username: string;
  mobile: string;
  email: string | null;
  status: number;
  password: string;
}

interface GetUserDetailsResponse {
  status_code: number;
  message: string;
  data: { user: UserDetailsItem };
}

async function postGetUserDetails(body: GetUserDetailsRequest): Promise<GetUserDetailsResponse> {
  try {
    const { data } = await api.post('/admin/get/user', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch user';
      throw new Error(message);
    }
    return data as GetUserDetailsResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to fetch user';
    throw new Error(message);
  }
}

export function useGetUserDetails() {
  return useMutation<GetUserDetailsResponse, Error, GetUserDetailsRequest>({
    mutationFn: (body) => postGetUserDetails(body),
  });
}