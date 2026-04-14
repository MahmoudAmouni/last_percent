import React, { createContext, useContext, useReducer, useEffect, ReactNode, useCallback } from 'react';
import { storage } from './utils/storage';

const STORAGE_KEY = 'suspension-storage';

async function readPersistedSuspension(): Promise<string | null> {
  try {
    const raw = await storage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const suspendedUntil = parsed?.state?.suspendedUntil ?? null;
    
    if (suspendedUntil) {
      const isExpired = new Date(suspendedUntil).getTime() <= Date.now();
      if (isExpired) return null;
    }
    return suspendedUntil;
  } catch {
    return null;
  }
}

async function writePersistedSuspension(suspendedUntil: string | null): Promise<void> {
  try {
    const payload = JSON.stringify({ state: { suspendedUntil }, version: 0 });
    await storage.setItem(STORAGE_KEY, payload);
  } catch {
  }
}

interface SuspensionState {
  suspendedUntil: string | null;
  hydrated: boolean;
}

interface SuspensionContextValue {
  suspendedUntil: string | null;
  hydrated: boolean;
  suspend: (minutes: number) => void;
  clearSuspension: () => void;
  getRemainingSeconds: () => number;
  isSuspended: () => boolean;
}

type SuspensionAction =
  | { type: 'SUSPEND'; until: string }
  | { type: 'CLEAR_SUSPENSION' }
  | { type: 'HYDRATE'; suspendedUntil: string | null };

const initialState: SuspensionState = {
  suspendedUntil: null,
  hydrated: false,
};

function suspensionReducer(state: SuspensionState, action: SuspensionAction): SuspensionState {
  switch (action.type) {
    case 'HYDRATE':
      return { suspendedUntil: action.suspendedUntil, hydrated: true };
    case 'SUSPEND':
      return { ...state, suspendedUntil: action.until };
    case 'CLEAR_SUSPENSION':
      return { ...state, suspendedUntil: null };
    default:
      return state;
  }
}

const SuspensionContext = createContext<SuspensionContextValue | null>(null);

export function SuspensionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(suspensionReducer, initialState);

  useEffect(() => {
    readPersistedSuspension().then((suspendedUntil) => {
      dispatch({ type: 'HYDRATE', suspendedUntil });
    });
  }, []);

  useEffect(() => {
    if (!state.hydrated) return;
    writePersistedSuspension(state.suspendedUntil);
  }, [state.suspendedUntil, state.hydrated]);

  // Clean up expired suspension automatically
  useEffect(() => {
    if (!state.suspendedUntil) return;

    const until = new Date(state.suspendedUntil).getTime();
    const now = Date.now();
    const diff = until - now;

    if (diff <= 0) {
      dispatch({ type: 'CLEAR_SUSPENSION' });
      return;
    }

    const timer = setTimeout(() => {
      dispatch({ type: 'CLEAR_SUSPENSION' });
    }, diff);

    return () => clearTimeout(timer);
  }, [state.suspendedUntil]);

  const getRemainingSeconds = useCallback((): number => {
    if (!state.suspendedUntil) return 0;
    const now = Date.now();
    const until = new Date(state.suspendedUntil).getTime();
    return Math.max(0, Math.floor((until - now) / 1000));
  }, [state.suspendedUntil]);

  const isSuspended = useCallback((): boolean => {
    if (!state.hydrated) return false;
    return getRemainingSeconds() > 0;
  }, [state.hydrated, getRemainingSeconds]);

  const suspend = (minutes: number): void => {
    const until = new Date(Date.now() + minutes * 60 * 1000).toISOString();
    dispatch({ type: 'SUSPEND', until });
  };

  const clearSuspension = (): void => {
    dispatch({ type: 'CLEAR_SUSPENSION' });
  };

  const value: SuspensionContextValue = {
    suspendedUntil: state.suspendedUntil,
    hydrated: state.hydrated,
    suspend,
    clearSuspension,
    getRemainingSeconds,
    isSuspended,
  };

  return <SuspensionContext.Provider value={value}>{children}</SuspensionContext.Provider>;
}

export function useSuspensionContext(): SuspensionContextValue {
  const ctx = useContext(SuspensionContext);
  if (!ctx) throw new Error('useSuspensionContext must be used inside <SuspensionProvider>');
  return ctx;
}
