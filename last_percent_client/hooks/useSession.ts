import { useMutation, useQuery } from '@tanstack/react-query';
import { startSession, getActiveSession, endSession, StartSessionDto } from '@/api/session';
import { useSessionStore } from '@/store/sessionStore';
import { useRouter } from 'expo-router';

export function useStartSession() {
  const setSession = useSessionStore((state) => state.setSession);
  const router = useRouter();

  return useMutation({
    mutationFn: (data: StartSessionDto) => startSession(data),
    onSuccess: (data) => {
      setSession(data);
      router.push('/(app)/waiting');
    },
    onError: (error: any) => {
      console.error('Failed to start session:', error);
    }
  });
}

export function useActiveSession() {
  const setSession = useSessionStore((state) => state.setSession);
  const clearSession = useSessionStore((state) => state.clearSession);

  return useQuery({
    queryKey: ['activeSession'],
    queryFn: getActiveSession,
    retry: false,
    staleTime: Infinity,
  });
}

export function useEndSession() {
  const clearSession = useSessionStore((state) => state.clearSession);

  return useMutation({
    mutationFn: (batteryLevel: number) => endSession(batteryLevel),
    onSuccess: () => {
      clearSession();
    }
  });
}
