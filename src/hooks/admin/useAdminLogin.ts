import { useMutation } from '@tanstack/react-query';
import { adminLogin } from '@/services/auth';

export function useAdminLogin() {
  return useMutation({ mutationFn: adminLogin });
}

