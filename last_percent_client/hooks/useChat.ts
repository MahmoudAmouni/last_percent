import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMessages, sendMessage, markAsRead } from '@/api/chat';
import { useChatStore } from '@/store/chatStore';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';

export const useChat = (matchId: number | null) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const { setMessages, addMessage } = useChatStore();

  const { data: messages, isLoading, error } = useQuery({
    queryKey: ['messages', matchId],
    queryFn: () => getMessages(matchId!),
    enabled: !!matchId,
    refetchOnWindowFocus: false,
  });

  // Sync messages from Query to Zustand Store when they load
  useEffect(() => {
    if (messages) {
      setMessages(messages.map(m => ({
        id: m.id,
        matchId: m.matchId,
        senderId: m.senderId,
        content: m.content,
        sentAt: m.sentAt
      })));
    }
  }, [messages, setMessages]);

  const sendMutation = useMutation({
    mutationFn: (content: string) => sendMessage(matchId!, { content }),
    onSuccess: (data: any, content: string) => {
      // Add the message to the store immediately after successful send
      // since the server only broadcasts to the recipient
      addMessage({
        id: data.messageId,
        matchId: matchId!,
        senderId: Number(user?.id) || 0,
        content: content,
        sentAt: data.sentAt
      });
    },
  });

  return {
    messages,
    isLoading,
    error,
    sendMessage: sendMutation.mutate,
    isSending: sendMutation.isPending,
  };
};
