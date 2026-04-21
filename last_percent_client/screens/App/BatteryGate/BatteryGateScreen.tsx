import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, withRepeat, withTiming, withSequence, FadeIn } from 'react-native-reanimated';
import { useStartSession } from '@/hooks/useSession';
import { useSuspensionContext } from '@/store/suspensionStore';
import { BatteryHeader } from '@/components/BatteryGate/BatteryHeader';
import { BatteryVisual } from '@/components/BatteryGate/BatteryVisual';
import { StatusCard } from '@/components/BatteryGate/StatusCard';
import { ActionButton } from '@/components/BatteryGate/ActionButton';
import { createStyles } from './BatteryGateScreen.styles';
import { useStyles } from '@/hooks/useStyles';
import { useTheme } from '@/hooks/useTheme';

function BatteryGateScreen() {
  const styles = useStyles(createStyles);
  const { colors } = useTheme();
  
  const { isSuspended, getRemainingSeconds, hydrated } = useSuspensionContext();
  
  const [mockBatteryLevel, setMockBatteryLevel] = useState(0.25); 
  const [timeLeft, setTimeLeft] = useState(getRemainingSeconds());

  if (!hydrated) return null;
  
  const isBanned = isSuspended() || timeLeft > 0;
  const isLocked = mockBatteryLevel > 0.20 && !isBanned;

  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000 }),
        withTiming(1, { duration: 2000 })
      ),
      -1,
      true
    );
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isBanned) {
      interval = setInterval(() => {
        const remaining = getRemainingSeconds();
        setTimeLeft(remaining);
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isBanned]);

  const startSessionMutation = useStartSession();

  const handleStartSession = () => {
    if (!isLocked && !isBanned) {
      startSessionMutation.mutate({ 
        startingBatteryLevel: Math.round(mockBatteryLevel * 100) 
      });
    }
  };

  const toggleMock = () => {
    setMockBatteryLevel(prev => prev === 0.25 ? 0.15 : 0.25);
  };

  const gradientColors = isBanned 
    ? ['#120505', '#0F0F0F'] 
    : [colors.background, colors.surface];

  return (
    <View style={styles.container}>
      <LinearGradient colors={gradientColors} style={styles.gradient} />
      
      <View style={styles.decorationCircle} />
      
      <SafeAreaView style={styles.safeArea}>
        <Animated.View entering={FadeIn.delay(200)} style={styles.content}>
          <BatteryHeader isBanned={isBanned} isLocked={isLocked} />

          <View style={styles.mainContent}>
            <BatteryVisual 
              isBanned={isBanned}
              isLocked={isLocked}
              mockBatteryLevel={mockBatteryLevel}
              timeLeft={timeLeft}
              pulseValue={pulse}
            />
          </View>

          <View style={styles.footer}>
            <StatusCard isBanned={isBanned} isLocked={isLocked} />

            <ActionButton 
              isLocked={isLocked}
              isBanned={isBanned}
              isPending={startSessionMutation.isPending}
              onPress={handleStartSession}
            />
          </View>
        </Animated.View>

        <TouchableOpacity style={styles.debugToggle} onPress={toggleMock}>
          <Text style={styles.debugToggleText}>EMULATE: {Math.round(mockBatteryLevel * 100)}%</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

export default BatteryGateScreen;
