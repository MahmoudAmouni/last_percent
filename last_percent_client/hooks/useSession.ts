import { useMutation, useQuery } from '@tanstack/react-query';
import { startSession, getActiveSession, endSession, StartSessionDto } from '@/api/session';
import { useSessionContext } from '@/store/sessionStore';
import { useRouter } from 'expo-router';

export function useStartSession() {
  const { setSession } = useSessionContext();
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
  const { setSession } = useSessionContext();
  const { clearSession } = useSessionContext();

  return useQuery({
    queryKey: ['activeSession'],
    queryFn: getActiveSession,
    retry: false,
    staleTime: Infinity,
  });
}

export function useEndSession() {
  const { clearSession } = useSessionContext();

  return useMutation({
    mutationFn: (batteryLevel: number) => endSession(batteryLevel),
    onSuccess: () => {
      clearSession();
    }
  });
}
