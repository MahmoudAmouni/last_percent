import { apiClient } from './client';

export interface StartSessionDto {
  startingBatteryLevel: number;
}

export const startSession = async (data: StartSessionDto) => {
  const response = await apiClient.post('/session/start', data);
  return response.data;
};

export const endSession = async (endingBatteryLevel: number) => {
  const response = await apiClient.post('/session/end', endingBatteryLevel);
  return response.data;
};

export const getActiveSession = async () => {
  const response = await apiClient.get('/session/active');
  return response.data;
};
