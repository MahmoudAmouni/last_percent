import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, SharedValue } from 'react-native-reanimated';
import { styles } from './BatteryVisual.styles';
import { formatTime } from './utils';

interface BatteryVisualProps {
  isBanned: boolean;
  isLocked: boolean;
  mockBatteryLevel: number;
  timeLeft: number;
  pulseValue: SharedValue<number>;
  glowOpacityValue: SharedValue<number>;
}

export const BatteryVisual: React.FC<BatteryVisualProps> = ({ 
  isBanned, 
  isLocked, 
  mockBatteryLevel, 
  timeLeft,
  pulseValue,
  glowOpacityValue
}) => {
  const animatedBatteryStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseValue.value }],
  }));

  const animatedGlowStyle = useAnimatedStyle(() => ({
    opacity: glowOpacityValue.value,
  }));

  return (
    <View style={styles.mainVisual}>
      <Animated.View style={[styles.batteryWrapper, animatedBatteryStyle]}>
        <Animated.View style={[styles.glowCircle, animatedGlowStyle]} />
        <Ionicons 
          name={isBanned ? "timer-outline" : isLocked ? "battery-full" : "battery-dead"} 
          size={220} 
          color={isLocked ? "rgba(255, 255, 255, 0.1)" : "#FF4D4D"} 
        />
        {isBanned ? (
          <Text style={styles.countdownText}>
            {formatTime(timeLeft)}
          </Text>
        ) : (
          <Text style={styles.percentageText}>
            {Math.round(mockBatteryLevel * 100)}%
          </Text>
        )}
      </Animated.View>
    </View>
  );
};
