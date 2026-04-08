import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  Platform 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence,
  FadeInDown,
  FadeInUp
} from 'react-native-reanimated';

import { styles } from './BatteryGateScreen.styles';


function BatteryGateScreen() {
  const router = useRouter();
  
  const [mockBatteryLevel, setMockBatteryLevel] = useState(0.25); 
  const isLocked = mockBatteryLevel > 0.20;

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

  const animatedBatteryStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
  }));

  const animatedGlowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const handleStartSession = () => {
    if (!isLocked) {
      // router.push('/(app)/waiting');
    }
  };

  const toggleMock = () => {
    setMockBatteryLevel(prev => prev === 0.25 ? 0.15 : 0.25);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={isLocked ? ['#100F0F', '#1A0B0B'] : ['#100F0F', '#2D0A0A']}
        style={styles.gradient}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Animated.View 
            entering={FadeInDown.duration(800)}
            style={styles.header}
          >
            <Text style={styles.title}>
              {isLocked ? "ACCESS DENIED" : "SYSTEM READY"}
            </Text>
            <Text style={styles.subtitle}>
              {isLocked ? "Your battery is too healthy" : "Welcome to the terminal stage"}
            </Text>
          </Animated.View>

          <View style={styles.mainVisual}>
            <Animated.View style={[styles.batteryWrapper, animatedBatteryStyle]}>
              <Animated.View style={[styles.glowCircle, animatedGlowStyle]} />
              <Ionicons 
                name={isLocked ? "battery-full" : "battery-dead"} 
                size={220} 
                color={isLocked ? "rgba(255, 255, 255, 0.1)" : "#FF4D4D"} 
              />
              <Text style={styles.percentageText}>
                {Math.round(mockBatteryLevel * 100)}%
              </Text>
            </Animated.View>
          </View>

          <Animated.View 
            entering={FadeInUp.delay(400).duration(800)}
            style={styles.footer}
          >
            <View style={styles.statusCard}>
              <Text style={styles.statusTitle}>
                {isLocked ? "Wait for it..." : "Status: Optimal Failure"}
              </Text>
              <Text style={styles.statusDescription}>
                {isLocked 
                  ? "We only connect users in their last percent. Come back when you are below 20%." 
                  : "Device state validated. You are now eligible to find a companion for the end."}
              </Text>
              
              {isLocked && (
                <View style={styles.progressContainer}>
                  <View 
                    style={[
                      styles.progressBar, 
                      { width: `${(1 - (mockBatteryLevel - 0.20) / 0.80) * 100}%` }
                    ]} 
                  />
                </View>
              )}
            </View>

            <TouchableOpacity 
              disabled={isLocked}
              onPress={handleStartSession}
              style={[styles.button, isLocked && styles.buttonDisabled]}
              activeOpacity={0.8}
            >
              <Text style={[styles.buttonText, isLocked && styles.buttonTextDisabled]}>
                {isLocked ? "CHECKING SENSORS..." : "START SESSION"}
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <TouchableOpacity style={styles.debugToggle} onPress={toggleMock}>
          <Text style={styles.debugToggleText}>DEBUG: TOGGLE STATE</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
}

export default BatteryGateScreen;
