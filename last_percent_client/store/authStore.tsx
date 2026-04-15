import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { storage } from './utils/storage';
import { User } from './types';
export { User };

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

interface AuthContextValue extends AuthState {
  setAuth: (user: User, token: string) => Promise<void>;
  clearAuth: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

type AuthAction =
  | { type: 'SET_AUTH'; user: User; token: string }
  | { type: 'CLEAR_AUTH' }
  | { type: 'SET_TOKEN'; token: string };

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_AUTH':
      return { user: action.user, token: action.token, isAuthenticated: true };
    case 'CLEAR_AUTH':
      return { user: null, token: null, isAuthenticated: false };
    case 'SET_TOKEN':
      return { ...state, token: action.token, isAuthenticated: true };
    default:
      return state;
  }
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const setAuth = async (user: User, token: string): Promise<void> => {
    await storage.setItem('jwt_token', token);
    dispatch({ type: 'SET_AUTH', user, token });
  };

  const clearAuth = async (): Promise<void> => {
    await storage.removeItem('jwt_token');
    dispatch({ type: 'CLEAR_AUTH' });
  };

  const initializeAuth = async (): Promise<void> => {
    const token = await storage.getItem('jwt_token');
    if (token) {
      dispatch({ type: 'SET_TOKEN', token });
    }
  };

  const value: AuthContextValue = {
    ...state,
    setAuth,
    clearAuth,
    initializeAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used inside <AuthProvider>');
  return ctx;
}
