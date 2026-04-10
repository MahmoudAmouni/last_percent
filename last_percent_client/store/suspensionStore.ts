import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import * as SecureStore from 'expo-secure-store';


const secureStorage = {
  getItem: async (name: string): Promise<string | null> => {
    return await SecureStore.getItemAsync(name);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    await SecureStore.setItemAsync(name, value);
  },
  removeItem: async (name: string): Promise<void> => {
    await SecureStore.deleteItemAsync(name);
  },
};

interface SuspensionState {
  suspendedUntil: string | null;
  suspend: (minutes: number) => void;
  clearSuspension: () => void;
  getRemainingSeconds: () => number;
  isSuspended: () => boolean;
}

export const useSuspensionStore = create<SuspensionState>()(
  persist(
    (set, get) => ({
      suspendedUntil: null,

      suspend: (minutes: number) => {
        const until = new Date(Date.now() + minutes * 60 * 1000).toISOString();
        set({ suspendedUntil: until });
      },

      clearSuspension: () => set({ suspendedUntil: null }),

      getRemainingSeconds: () => {
        const { suspendedUntil } = get();
        if (!suspendedUntil) return 0;
        
        const now = Date.now();
        const until = new Date(suspendedUntil).getTime();
        const diff = Math.max(0, Math.floor((until - now) / 1000));
        
        if (diff === 0 && suspendedUntil !== null) {
          set({ suspendedUntil: null });
        }
        
        return diff;
      },

      isSuspended: () => {
        return get().getRemainingSeconds() > 0;
      },
    }),
    {
      name: 'suspension-storage',
      storage: createJSONStorage(() => secureStorage),
    }
  )
);
