import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useJoinQueue, useLeaveQueue } from '@/hooks/useQueue';
import { useSessionContext } from '@/store/sessionStore';
import { useChatContext, MatchStatus } from '@/store/chatStore';

import WaitingHeader from '@/components/Waiting/WaitingHeader';
import WaitingStatus from '@/components/Waiting/WaitingStatus';
import WaitingFooter from '@/components/Waiting/WaitingFooter';
import { styles } from './WaitingScreen.styles';

export default function WaitingScreen() {
  const router = useRouter();
  const joinQueueMutation = useJoinQueue();
  const leaveQueueMutation = useLeaveQueue();
  const { batteryLevel } = useSessionContext();
  const { matchStatus } = useChatContext();

  useEffect(() => {
    if (batteryLevel !== null) {
      joinQueueMutation.mutate({ batteryLevel });
    }
  }, [batteryLevel]);

  useEffect(() => {
    if (matchStatus === MatchStatus.Matched) {
      setTimeout(() => {
        router.replace('/(app)/chat');
      }, 500);
    }
  }, [matchStatus, router]);

  const handleBack = () => {
    leaveQueueMutation.mutate(undefined, {
      onSuccess: () => router.back(),
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#100F0F', '#1A0B0B', '#2D0A0A']}
        style={styles.gradient}
      />
      <SafeAreaView style={styles.safeArea}>
        <WaitingHeader onBack={handleBack} />
        <WaitingStatus />
        <WaitingFooter batteryLevel={batteryLevel} />
      </SafeAreaView>
    </View>
  );
}

