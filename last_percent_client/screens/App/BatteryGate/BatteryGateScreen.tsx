import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSharedValue, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { useStartSession } from '@/hooks/useSession';
import { useSuspensionContext } from '@/store/suspensionStore';
import { BatteryHeader } from '@/components/BatteryGate/BatteryHeader';
import { BatteryVisual } from '@/components/BatteryGate/BatteryVisual';
import { StatusCard } from '@/components/BatteryGate/StatusCard';
import { ActionButton } from '@/components/BatteryGate/ActionButton';
import { styles } from './BatteryGateScreen.styles';


function BatteryGateScreen() {
  const { isSuspended, getRemainingSeconds, clearSuspension, suspend, hydrated } = useSuspensionContext();
  
  const [mockBatteryLevel, setMockBatteryLevel] = useState(0.25); 
  const [timeLeft, setTimeLeft] = useState(getRemainingSeconds());

  if (!hydrated) return null;
  
  const isBanned = isSuspended() || timeLeft > 0;
  const isLocked = mockBatteryLevel > 0.20 && !isBanned;

  const pulse = useSharedValue(1);
  const glowOpacity = useSharedValue(0.15);

  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1500 }),
        withTiming(1, { duration: 1500 })
      ),
      -1,
      true
    );

    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.4, { duration: 1500 }),
        withTiming(0.15, { duration: 1500 })
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


  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isBanned ? ['#1A0B0B', '#2D0A0A'] : isLocked ? ['#100F0F', '#1A0B0B'] : ['#100F0F', '#2D0A0A']}
        style={styles.gradient}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <BatteryHeader 
            isBanned={isBanned} 
            isLocked={isLocked} 
          />

          <BatteryVisual 
            isBanned={isBanned}
            isLocked={isLocked}
            mockBatteryLevel={mockBatteryLevel}
            timeLeft={timeLeft}
            pulseValue={pulse}
            glowOpacityValue={glowOpacity}
          />

          <View style={styles.footer}>
            <StatusCard 
              isBanned={isBanned} 
              isLocked={isLocked} 
            />

            <ActionButton 
              isLocked={isLocked}
              isBanned={isBanned}
              isPending={startSessionMutation.isPending}
              onPress={handleStartSession}
            />
          </View>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
          <TouchableOpacity style={styles.debugToggle} onPress={toggleMock}>
            <Text style={styles.debugToggleText}>DEBUG: Lvl</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

export default BatteryGateScreen;
