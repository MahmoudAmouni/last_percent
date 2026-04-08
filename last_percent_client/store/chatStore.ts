import { create } from 'zustand';

export enum MatchStatus {
  Waiting = 'waiting',
  Matched = 'matched',
  Ended = 'ended'
}

interface Message {
  id: number;
  matchId: number;
  senderId: number;
  content: string;
  sentAt: string;
}

interface ChatState {
  matchId: number | null;
  partnerId: number | null;
  matchStatus: MatchStatus;
  messages: Message[];
  setMatch: (matchId: number, partnerId: number) => void;
  setMatchStatus: (status: MatchStatus) => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  clearMatch: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  matchId: null,
  partnerId: null,
  matchStatus: MatchStatus.Ended,
  messages: [],

  setMatch: (matchId, partnerId) => set({ 
    matchId, 
    partnerId, 
    matchStatus: MatchStatus.Matched 
  }),

  setMatchStatus: (status) => set({ matchStatus: status }),

  addMessage: (message) => set((state) => ({ 
    messages: [...state.messages, message] 
  })),

  setMessages: (messages) => set({ messages }),

  clearMatch: () => set({ 
    matchId: null, 
    partnerId: null, 
    matchStatus: MatchStatus.Ended, 
    messages: [] 
  }),
}));
