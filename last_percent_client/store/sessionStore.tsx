import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Session } from './types';
export { Session };

interface SessionState {
  sessionId: number | null;
  currentSession: Session | null;
  batteryLevel: number | null;
}

interface SessionContextValue extends SessionState {
  setSession: (session: Session) => void;
  clearSession: () => void;
  updateBattery: (level: number) => void;
}

type SessionAction =
  | { type: 'SET_SESSION'; session: Session }
  | { type: 'CLEAR_SESSION' }
  | { type: 'UPDATE_BATTERY'; level: number };

const initialState: SessionState = {
  sessionId: null,
  currentSession: null,
  batteryLevel: null,
};

function sessionReducer(state: SessionState, action: SessionAction): SessionState {
  switch (action.type) {
    case 'SET_SESSION':
      return {
        sessionId: action.session.id,
        currentSession: action.session,
        batteryLevel: action.session.startingBatteryLevel,
      };
    case 'CLEAR_SESSION':
      return { sessionId: null, currentSession: null, batteryLevel: null };
    case 'UPDATE_BATTERY':
      return { ...state, batteryLevel: action.level };
    default:
      return state;
  }
}

const SessionContext = createContext<SessionContextValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(sessionReducer, initialState);

  const value: SessionContextValue = {
    ...state,
    setSession: (session) => dispatch({ type: 'SET_SESSION', session }),
    clearSession: () => dispatch({ type: 'CLEAR_SESSION' }),
    updateBattery: (level) => dispatch({ type: 'UPDATE_BATTERY', level }),
  };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSessionContext(): SessionContextValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error('useSessionContext must be used inside <SessionProvider>');
  return ctx;
}
