import { apiClient } from './client';

export interface SuspensionStatusResponse {
  suspendedUntil: string | null;
}

export const getSuspensionStatus = async (): Promise<SuspensionStatusResponse> => {
  const response = await apiClient.get<SuspensionStatusResponse>('/suspension/status');
  return response.data;
};
