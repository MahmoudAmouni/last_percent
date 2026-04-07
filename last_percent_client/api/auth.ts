import { apiClient } from './client';
import { LoginDto } from '../types';

export const login = async (data: LoginDto): Promise<{ token: string }> => {
  const response = await apiClient.post<{ token: string }>('/auth/login', data);
  return response.data;
};
