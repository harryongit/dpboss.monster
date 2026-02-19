import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface ListUsersRequest {
  admin_id: number;
}

interface ListUsersItem {
  id: number;
  username: string;
  mobile: string;
  password: string;
  status: number;
  created_date?: string;
  free_fix_flag?: number;
}

interface ListUsersResponse {
  status_code: number;
  message: string;
  data: { items: ListUsersItem[] };
}

async function fetchListUsers(body: ListUsersRequest): Promise<ListUsersResponse> {
  try {
    const { data } = await api.post('/admin/list/users', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch users';
      throw new Error(message);
    }
    return data as ListUsersResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to fetch users';
    throw new Error(message);
  }
}

export function useAdminListUsers(adminId?: number) {
  let id = adminId;
  if (!id) {
    try {
      const saved = localStorage.getItem('admin');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed?.id) id = parsed.id as number;
      }
    } catch {
      id = undefined;
    }
  }
  const body: ListUsersRequest = { admin_id: id ?? 1 };
  return useQuery<ListUsersResponse, Error>({
    queryKey: ['admin', 'listUsers', body.admin_id],
    queryFn: () => fetchListUsers(body),
  });
}
