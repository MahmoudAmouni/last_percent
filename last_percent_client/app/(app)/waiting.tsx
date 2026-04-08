import { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useJoinQueue, useLeaveQueue } from '@/hooks/useQueue';
import { useSessionStore } from '@/store/sessionStore';
import { useChatStore, MatchStatus } from '@/store/chatStore';

export default function WaitingScreen() {
  const router = useRouter();
  const joinQueueMutation = useJoinQueue();
  const leaveQueueMutation = useLeaveQueue();
  const batteryLevel = useSessionStore((state) => state.batteryLevel);
  const { matchStatus } = useChatStore();

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
  }, [matchStatus]);

  const handleBack = () => {
    leaveQueueMutation.mutate(undefined, {
       onSuccess: () => router.back()
    });
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#100F0F', '#1A0B0B', '#2D0A0A']}
        style={styles.gradient}
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
           <TouchableOpacity onPress={handleBack} style={styles.backButton}>
             <Ionicons name="arrow-back" size={24} color="#FFF" />
           </TouchableOpacity>
        </View>

        <Animated.View entering={FadeIn.delay(300)} style={styles.content}>
          <View style={styles.iconContainer}>
            <Animated.View 
              entering={FadeInDown.duration(1000).springify()}
              style={styles.pulseIndicator} 
            />
            <Ionicons name="radio-outline" size={80} color="#FF4D4D" />
          </View>
          <Text style={styles.title}>Finding someone...</Text>
          <Text style={styles.subtitle}>Searching for a companion who is also at their last percent.</Text>
        </Animated.View>

        <View style={styles.footer}>
           <Text style={styles.batteryText}>Battery level reported: {batteryLevel}%</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: -80,
  },
  iconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulseIndicator: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#FF4D4D',
    opacity: 0.1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFF',
    marginTop: 24,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 24,
  },
  footer: {
    padding: 30,
    alignItems: 'center',
  },
  batteryText: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 12,
  },
});
