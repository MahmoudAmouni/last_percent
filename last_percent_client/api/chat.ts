import { apiClient } from './client';

export interface MessageDto {
  id: number;
  matchId: number;
  senderId: number;
  content: string;
  sentAt: string;
}

export interface SendMessageDto {
  content: string;
}

export const getMessages = async (matchId: number) => {
  const response = await apiClient.get<MessageDto[]>(`/chat/${matchId}/messages`);
  return response.data;
};

export const sendMessage = async (matchId: number, data: SendMessageDto) => {
  const response = await apiClient.post(`/chat/${matchId}/send`, data);
  return response.data;
};

export const markAsRead = async (matchId: number) => {
  const response = await apiClient.post(`/chat/${matchId}/read`);
  return response.data;
};
