import React, { useEffect, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useJoinQueue, useLeaveQueue } from '@/hooks/useQueue';
import { useSessionContext } from '@/store/sessionStore';
import { useChatContext, MatchStatus } from '@/store/chatStore';
import { useSuspensionContext } from '@/store/suspensionStore';

import WaitingHeader from '@/components/Waiting/WaitingHeader';
import WaitingStatus from '@/components/Waiting/WaitingStatus';
import WaitingFooter from '@/components/Waiting/WaitingFooter';
import WaitingSuspension from '@/components/Waiting/WaitingSuspension';
import { styles } from './WaitingScreen.styles';

export default function WaitingScreen() {
  const router = useRouter();
  const joinQueueMutation = useJoinQueue();
  const leaveQueueMutation = useLeaveQueue();
  const { batteryLevel } = useSessionContext();
  const { matchStatus } = useChatContext();
  const { isSuspended, getRemainingSeconds, hydrated } = useSuspensionContext();

  const [timeLeft, setTimeLeft] = useState(getRemainingSeconds());
  const suspended = isSuspended();

  // Handle timer for suspended state
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (suspended) {
      interval = setInterval(() => {
        const remaining = getRemainingSeconds();
        setTimeLeft(remaining);
        if (remaining <= 0) {
          // If suspension expires while on screen, we could potentially join queue or just let user go back
        }
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [suspended, getRemainingSeconds]);

  // Only join queue if NOT suspended
  useEffect(() => {
    if (batteryLevel !== null && !suspended && hydrated) {
      joinQueueMutation.mutate({ batteryLevel });
    }
  }, [batteryLevel, suspended, hydrated]);

  useEffect(() => {
    if (matchStatus === MatchStatus.Matched) {
      setTimeout(() => {
        router.replace('/(app)/chat');
      }, 500);
    }
  }, [matchStatus, router]);

  const handleBack = () => {
    if (suspended) {
       router.back();
    } else {
      leaveQueueMutation.mutate(undefined, {
        onSuccess: () => router.back(),
        onError: () => router.back(), // Fallback
      });
    }
  };

  if (!hydrated) return null;

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={suspended ? ['#1A0B0B', '#2D0A0A'] : ['#100F0F', '#1A0B0B', '#2D0A0A']}
        style={styles.gradient}
      />
      <SafeAreaView style={styles.safeArea}>
        <WaitingHeader onBack={handleBack} />
        
        {suspended ? (
          <WaitingSuspension timeLeft={timeLeft} />
        ) : (
          <WaitingStatus />
        )}

        {!suspended && <WaitingFooter batteryLevel={batteryLevel} />}
      </SafeAreaView>
    </View>
  );
}
