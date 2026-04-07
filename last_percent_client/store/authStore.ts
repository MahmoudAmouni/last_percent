import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

interface User {
  id: string;
  email: string;
  isEmailVerified: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => Promise<void>;
  clearAuth: () => Promise<void>;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,

  setAuth: async (user, token) => {
    if (Platform.OS === 'web') {
      if (typeof localStorage !== 'undefined') localStorage.setItem('jwt_token', token);
    } else {
      await SecureStore.setItemAsync('jwt_token', token);
    }
    set({ user, token, isAuthenticated: true });
  },

  clearAuth: async () => {
    if (Platform.OS === 'web') {
      if (typeof localStorage !== 'undefined') localStorage.removeItem('jwt_token');
    } else {
      await SecureStore.deleteItemAsync('jwt_token');
    }
    set({ user: null, token: null, isAuthenticated: false });
  },

  initializeAuth: async () => {
    let token = null;
    if (Platform.OS === 'web') {
      if (typeof localStorage !== 'undefined') token = localStorage.getItem('jwt_token');
    } else {
      token = await SecureStore.getItemAsync('jwt_token');
    }

    if (token) {
      set({ token, isAuthenticated: true });
    }
  },
}));
