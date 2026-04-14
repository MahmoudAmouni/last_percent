import { useEffect } from 'react';
import { websocketService } from '@/services/websocketService';
import { useChatContext } from '@/store/chatStore';
import { Message } from '@/store/types';

export function useWebSocketEvents() {
  const { setMatch, addMessage, setPartnerPresent, clearMatch } = useChatContext();

  useEffect(() => {
    const handleMatchFound = (payload: Record<string, unknown>) => {
      const matchId = payload.matchId as number;
      const partnerId = payload.partnerId as number;
      setMatch(matchId, partnerId);
    };

    const handleMessageReceived = (payload: Record<string, unknown>) => {
      const message: Message = {
        id: payload.messageId as number,
        matchId: payload.matchId as number,
        senderId: payload.senderId as number,
        content: payload.content as string,
        sentAt: payload.sentAt as string,
      };
      addMessage(message);
    };

    const handlePartnerLeft = (_payload: Record<string, unknown>) => {
      setPartnerPresent(false);
    };

    websocketService.on('MatchFound', handleMatchFound);
    websocketService.on('MessageReceived', handleMessageReceived);
    websocketService.on('PartnerLeft', handlePartnerLeft);

    return () => {
      websocketService.off('MatchFound', handleMatchFound);
      websocketService.off('MessageReceived', handleMessageReceived);
      websocketService.off('PartnerLeft', handlePartnerLeft);
    };
  }, [setMatch, addMessage, setPartnerPresent]);
}
