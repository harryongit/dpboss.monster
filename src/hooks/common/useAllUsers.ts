import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface AllUsersRequest {
  admin_id: number;
}

interface UserItem {
  user_id: number;
  user_name: string;
}

interface AllUsersResponse {
  status_code: number;
  message: string;
  data: { items: UserItem[] };
}

async function postAllUsers(body: AllUsersRequest): Promise<AllUsersResponse> {
  try {
    const { data } = await api.post('/common/all_user_list', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch users';
      throw new Error(message);
    }
    return data as AllUsersResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to fetch users';
    throw new Error(message);
  }
}

export function useAllUsers(req: AllUsersRequest) {
  return useQuery<AllUsersResponse, Error>({
    queryKey: ['common', 'allUsers', req.admin_id],
    queryFn: () => postAllUsers(req),
    enabled: !!req.admin_id,
  });
}