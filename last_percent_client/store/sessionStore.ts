import { create } from 'zustand';

export enum SessionStatus {
  Active = 'active',
  Ended = 'ended'
}

interface Session {
  id: number;
  userId: number;
  status: SessionStatus;
  startingBatteryLevel: number;
  startedAt: string;
}

interface SessionState {
  sessionId: number | null;
  currentSession: Session | null;
  batteryLevel: number | null;
  setSession: (session: Session) => void;
  clearSession: () => void;
  updateBattery: (level: number) => void;
}

export const useSessionStore = create<SessionState>((set) => ({
  sessionId: null,
  currentSession: null,
  batteryLevel: null,

  setSession: (session) => set({ 
    sessionId: session.id, 
    currentSession: session,
    batteryLevel: session.startingBatteryLevel 
  }),

  clearSession: () => set({ 
    sessionId: null, 
    currentSession: null, 
    batteryLevel: null 
  }),

  updateBattery: (level) => set({ batteryLevel: level }),
}));
