import { apiClient } from './client';
import { LoginDto, RegisterDto } from '../types';

export const login = async (data: LoginDto): Promise<{ token: string }> => {
  const response = await apiClient.post<{ token: string }>('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterDto): Promise<{ token: string }> => {
  const response = await apiClient.post<{ token: string }>('/auth/register', data);
  return response.data;
};
