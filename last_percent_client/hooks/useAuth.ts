import { useMutation } from '@tanstack/react-query';
import { login, register } from '@/api/auth';
import { useAuthContext } from '@/store/authStore';
import { jwtDecode } from 'jwt-decode';
import { LoginDto, RegisterDto } from '@/types';

interface DecodedToken {
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string;
  'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': string;
  exp: number;
}

export function useLogin() {
  const { setAuth } = useAuthContext();

  return useMutation({
    mutationFn: (data: LoginDto) => login(data),
    onSuccess: async (data, variables) => {
      try {
        const decoded = jwtDecode<DecodedToken>(data.token);
        
        await setAuth(
          {
            id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
            email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || variables.email,
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

export function useRegister() {
  const { setAuth } = useAuthContext();

  return useMutation({
    mutationFn: (data: RegisterDto) => register(data),
    onSuccess: async (data, variables) => {
      try {
        const decoded = jwtDecode<DecodedToken>(data.token);
        
        await setAuth(
          {
            id: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'],
            email: decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] || variables.email,
            isEmailVerified: true, 
          },
          data.token
        );
      } catch (e) {
        console.error('Failed to decode token after register:', e);
        throw new Error('Invalid authentication token received.');
      }
    },
  });
}
