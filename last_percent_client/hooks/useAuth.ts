import { useMutation } from '@tanstack/react-query';
import { login } from '@/api/auth';
import { useAuthStore } from '@/store/authStore';
import { jwtDecode } from 'jwt-decode';
import { LoginDto } from '@/types';

interface DecodedToken {
  nameid: string; 
  email: string;  
  exp: number;
}

export function useLogin() {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (data: LoginDto) => login(data),
    onSuccess: async (data, variables) => {
      try {
        const decoded = jwtDecode<DecodedToken>(data.token);
        
        await setAuth(
          {
            id: decoded.nameid,
            email: decoded.email || variables.email,
            isEmailVerified: true, 
          },
          data.token
        );
      } catch (e) {
        console.error('Failed to decode token after login:', e);
        throw new Error('Invalid authentication token received.');
      }
    },
  });
}
