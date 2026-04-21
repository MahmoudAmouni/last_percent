import React from 'react';
import { View, Text } from 'react-native';
import Animated, { useAnimatedStyle, SharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from './BatteryVisual.styles';
import { useStyles } from '@/hooks/useStyles';
import { useTheme } from '@/hooks/useTheme';
import { formatTime } from './utils';

const AnimatedView = Animated.createAnimatedComponent(View);

interface BatteryVisualProps {
  isBanned: boolean;
  isLocked: boolean;
  mockBatteryLevel: number;
  timeLeft: number;
  pulseValue: SharedValue<number>;
}

export const BatteryVisual: React.FC<BatteryVisualProps> = ({ 
  isBanned, 
  isLocked, 
  mockBatteryLevel, 
  timeLeft,
  pulseValue,
}) => {
  const styles = useStyles(createStyles);
  const { colors } = useTheme();

  const mainColor = isBanned ? colors.error : isLocked ? colors.textSecondary : colors.primary;
  const gradientColors = isBanned 
    ? ['#EF4444', '#991B1B'] 
    : isLocked 
      ? ['#4B5563', '#1F2937'] 
      : [colors.primary, colors.secondary];

  const animatedLevelStyle = useAnimatedStyle(() => ({
    height: withSpring(`${mockBatteryLevel * 100}%`, { damping: 15 }),
    opacity: 0.8 + (pulseValue.value - 1) * 0.2,
  }));

  const animatedBatteryStyle = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(pulseValue.value, { duration: 1000 }) }],
  }));

  return (
    <View style={styles.mainVisual}>
      <AnimatedView style={[styles.batteryWrapper, animatedBatteryStyle]}>
        <View style={[styles.batteryCap, { backgroundColor: mainColor }]} />
        <View style={[styles.batteryBody, { borderColor: mainColor }]}>
          {/* Vertical Fill */}
          <AnimatedView style={[styles.batteryLevel, animatedLevelStyle]}>
            <LinearGradient
              colors={gradientColors as any}
              style={{ flex: 1 }}
            />
          </AnimatedView>
          


          <View style={styles.contentContainer}>
             {isBanned ? (
               <Ionicons name="time-outline" size={32} color={colors.text} />
             ) : isLocked ? (
               <Ionicons name="lock-closed" size={32} color={colors.text} />
             ) : (
               <Ionicons name="flash" size={32} color={colors.text} />
             )}
            <Text style={styles.percentageText}>
              {isBanned && timeLeft > 0 ? formatTime(timeLeft) : `${Math.round(mockBatteryLevel * 100)}%`}
            </Text>
          </View>
        </View>
      </AnimatedView>

      <Text style={styles.statusText}>
        {isBanned 
          ? "System cooldown active" 
          : isLocked 
            ? "Waiting for the drop..." 
            : "Connection established"}
      </Text>
    </View>
  );
};
