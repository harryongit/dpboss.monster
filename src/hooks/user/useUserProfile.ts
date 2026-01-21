import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/http';

interface UserProfileRequest {
  user_id: number;
}

interface UserProfileUser {
  id: number;
  username: string;
  mobile: string;
  email: string | null;
  status: number;
  is_active: number;
  exists: boolean;
  created_date?: string;
  message?: string;
}

interface UserProfileResponse {
  status_code: number;
  message: string;
  data: { user: UserProfileUser };
}

async function fetchUserProfile(body: UserProfileRequest): Promise<UserProfileResponse> {
  try {
    const { data } = await api.post('https://www.matkabooking.pro/user/profile', body);
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Failed to fetch user profile';
      throw new Error(message);
    }
    return data as UserProfileResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Failed to fetch user profile';
    throw new Error(message);
  }
}

export function useUserProfile(userId?: number) {
  const id = userId ?? 0;
  return useQuery<UserProfileResponse, Error>({
    queryKey: ['user', 'profile', id],
    queryFn: () => fetchUserProfile({ user_id: id }),
    enabled: !!id,
  });
}