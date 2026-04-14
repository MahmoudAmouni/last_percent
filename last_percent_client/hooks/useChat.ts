import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getMessages, sendMessage, markAsRead, leaveChat } from '@/api/chat';
import { useChatContext } from '@/store/chatStore';
import { useAuthContext } from '@/store/authStore';
import { useEffect } from 'react';

export const useChat = (matchId: number | null) => {
  const queryClient = useQueryClient();
  const { user } = useAuthContext();
  const { setMessages, addMessage } = useChatContext();

  const { data: messages, isLoading, error } = useQuery({
    queryKey: ['messages', matchId],
    queryFn: () => getMessages(matchId!),
    enabled: !!matchId,
    refetchOnWindowFocus: false,
  });

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
      addMessage({
        id: data.messageId,
        matchId: matchId!,
        senderId: Number(user?.id) || 0,
        content: content,
        sentAt: data.sentAt
      });
    },
  });

  const leaveMutation = useMutation({
    mutationFn: () => leaveChat(matchId!),
  });

  return {
    messages,
    isLoading,
    error,
    sendMessage: sendMutation.mutate,
    isSending: sendMutation.isPending,
    leaveChat: leaveMutation.mutateAsync,
  };
};
