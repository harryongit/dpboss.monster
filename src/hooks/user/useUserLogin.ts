import { useMutation } from '@tanstack/react-query';
import { userLogin } from '@/services/auth';

export function useUserLogin() {
  return useMutation({ mutationFn: userLogin });
}

