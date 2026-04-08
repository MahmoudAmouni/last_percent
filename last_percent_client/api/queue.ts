import { apiClient } from './client';

export interface JoinQueueDto {
  batteryLevel: number;
}

export const joinQueue = async (data: JoinQueueDto) => {
  const response = await apiClient.post('/queue/join', data);
  return response.data;
};

export const leaveQueue = async () => {
  const response = await apiClient.post('/queue/leave');
  return response.data;
};

export const getQueueStatus = async () => {
  const response = await apiClient.get('/queue/status');
  return response.data;
};
