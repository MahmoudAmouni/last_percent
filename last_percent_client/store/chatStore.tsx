import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { MatchStatus, Message } from './types';
export { MatchStatus, Message };

interface ChatState {
  matchId: number | null;
  partnerId: number | null;
  matchStatus: MatchStatus;
  messages: Message[];
  isPartnerPresent: boolean;
}

interface ChatContextValue extends ChatState {
  setMatch: (matchId: number, partnerId: number) => void;
  setMatchStatus: (status: MatchStatus) => void;
  addMessage: (message: Message) => void;
  setMessages: (messages: Message[]) => void;
  setPartnerPresent: (present: boolean) => void;
  clearMatch: () => void;
}

type ChatAction =
  | { type: 'SET_MATCH'; matchId: number; partnerId: number }
  | { type: 'SET_MATCH_STATUS'; status: MatchStatus }
  | { type: 'ADD_MESSAGE'; message: Message }
  | { type: 'SET_MESSAGES'; messages: Message[] }
  | { type: 'SET_PARTNER_PRESENT'; present: boolean }
  | { type: 'CLEAR_MATCH' };

const initialState: ChatState = {
  matchId: null,
  partnerId: null,
  matchStatus: MatchStatus.Ended,
  messages: [],
  isPartnerPresent: true,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'SET_MATCH':
      return { ...state, matchId: action.matchId, partnerId: action.partnerId, matchStatus: MatchStatus.Matched };
    case 'SET_MATCH_STATUS':
      return { ...state, matchStatus: action.status };
    case 'ADD_MESSAGE':
      return { ...state, messages: [...state.messages, action.message] };
    case 'SET_MESSAGES':
      return { ...state, messages: action.messages };
    case 'SET_PARTNER_PRESENT':
      return { ...state, isPartnerPresent: action.present };
    case 'CLEAR_MATCH':
      return { ...initialState };
    default:
      return state;
  }
}

const ChatContext = createContext<ChatContextValue | null>(null);

export function ChatProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  const value: ChatContextValue = {
    ...state,
    setMatch: (matchId, partnerId) => dispatch({ type: 'SET_MATCH', matchId, partnerId }),
    setMatchStatus: (status) => dispatch({ type: 'SET_MATCH_STATUS', status }),
    addMessage: (message) => dispatch({ type: 'ADD_MESSAGE', message }),
    setMessages: (messages) => dispatch({ type: 'SET_MESSAGES', messages }),
    setPartnerPresent: (present) => dispatch({ type: 'SET_PARTNER_PRESENT', present }),
    clearMatch: () => dispatch({ type: 'CLEAR_MATCH' }),
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
}

export function useChatContext(): ChatContextValue {
  const ctx = useContext(ChatContext);
  if (!ctx) throw new Error('useChatContext must be used inside <ChatProvider>');
  return ctx;
}
