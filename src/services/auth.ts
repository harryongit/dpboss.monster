export interface AdminLoginRequest {
  username: string;
  password: string;
}

export interface AdminLoginResponse {
  status_code: number;
  message: string;
  data: {
    user: {
      id: number;
    };
  };
}

export interface UserLoginRequest {
  username: string;
  password: string;
}

export interface UserLoginResponse {
  status_code: number;
  message: string;
  data: {
    user: {
      id: number;
      username: string;
      mobile: string;
      email: string;
      status: number;
    };
  };
}

const jsonHeaders = { 'Content-Type': 'application/json' };

export async function adminLogin(req: AdminLoginRequest): Promise<AdminLoginResponse> {
  try {
    const { data } = await api.post('/admin/auth/login', { username: req.username, password: req.password }, { headers: jsonHeaders });
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Login failed';
      throw new Error(message);
    }
    return data as AdminLoginResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Login failed';
    throw new Error(message);
  }
}

export async function userLogin(req: UserLoginRequest): Promise<UserLoginResponse> {
  try {
    const { data } = await api.post('/user/auth/login', { username: req.username, password: req.password }, { headers: jsonHeaders });
    if (data?.status_code !== 200) {
      const message = typeof data?.message === 'string' ? data.message : 'Login failed';
      throw new Error(message);
    }
    return data as UserLoginResponse;
  } catch (error: any) {
    const message = typeof error?.response?.data?.message === 'string' ? error.response.data.message : 'Login failed';
    throw new Error(message);
  }
}
import { api } from '@/lib/http';
