import { useMutation, useQuery } from '@tanstack/react-query';
import { joinQueue, leaveQueue, getQueueStatus, JoinQueueDto } from '@/api/queue';
import { useChatContext, MatchStatus } from '@/store/chatStore';

export function useJoinQueue() {
  const { setMatchStatus } = useChatContext();

  return useMutation({
    mutationFn: (data: JoinQueueDto) => joinQueue(data),
    onSuccess: () => {
      setMatchStatus(MatchStatus.Waiting);
    },
    onError: (error: any) => {
      console.error('Failed to join queue:', error);
    }
  });
}

export function useLeaveQueue() {
  const { clearMatch } = useChatContext();

  return useMutation({
    mutationFn: () => leaveQueue(),
    onSuccess: () => {
      clearMatch();
    },
    onError: (error: any) => {
      console.error('Failed to leave queue:', error);
    }
  });
}

export function useQueueStatus() {
  return useQuery({
    queryKey: ['queueStatus'],
    queryFn: getQueueStatus,
    retry: 3,
    refetchInterval: (query) => {
       return query.state.data?.status === 'waiting' ? 5000 : false;
    }
  });
}
