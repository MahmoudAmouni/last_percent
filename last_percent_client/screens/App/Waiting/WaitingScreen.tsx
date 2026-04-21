import React, { useEffect, useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useJoinQueue, useLeaveQueue } from '@/hooks/useQueue';
import { useSessionContext } from '@/store/sessionStore';
import { useChatContext, MatchStatus } from '@/store/chatStore';
import { useSuspensionContext } from '@/store/suspensionStore';
import { createStyles } from './WaitingScreen.styles';
import { useStyles } from '@/hooks/useStyles';
import { useTheme } from '@/hooks/useTheme';

import WaitingHeader from '@/components/Waiting/WaitingHeader';
import WaitingStatus from '@/components/Waiting/WaitingStatus';
import WaitingFooter from '@/components/Waiting/WaitingFooter';
import WaitingSuspension from '@/components/Waiting/WaitingSuspension';

export default function WaitingScreen() {
  const styles = useStyles(createStyles);
  const { colors } = useTheme();
  const router = useRouter();
  const joinQueueMutation = useJoinQueue();
  const leaveQueueMutation = useLeaveQueue();
  const { batteryLevel } = useSessionContext();
  const { matchStatus } = useChatContext();
  const { isSuspended, getRemainingSeconds, hydrated } = useSuspensionContext();

  const [timeLeft, setTimeLeft] = useState(getRemainingSeconds());
  const suspended = isSuspended();

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (suspended) {
      interval = setInterval(() => {
        const remaining = getRemainingSeconds();
        setTimeLeft(remaining);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [suspended, getRemainingSeconds]);

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
    if (suspended || matchStatus === MatchStatus.Matched) {
       router.back();
    } else {
      leaveQueueMutation.mutate(undefined, {
        onSuccess: () => router.back(),
        onError: () => router.back(), 
      });
    }
  };

  if (!hydrated) return null;

  const gradientColors = suspended 
    ? ['#0D0D0D', '#1A0505'] 
    : [colors.background, colors.surface];

  return (
    <View style={styles.container}>
      <LinearGradient colors={gradientColors} style={styles.gradient} />
      
      <View style={{ 
        position: 'absolute', 
        top: '22%', 
        left: '10%', 
        right: '10%', 
        height: 300, 
        backgroundColor: suspended ? colors.error : colors.primary,
        opacity: 0.05,
        borderRadius: 150,
      } as any} />

      <SafeAreaView style={styles.safeArea}>
        <WaitingHeader onBack={handleBack} />
        
        <View style={{ flex: 1, justifyContent: 'center' }}>
          {suspended ? (
            <WaitingSuspension timeLeft={timeLeft} />
          ) : (
            <WaitingStatus />
          )}
        </View>

        {!suspended && <WaitingFooter batteryLevel={batteryLevel} />}
      </SafeAreaView>
    </View>
  );
}
