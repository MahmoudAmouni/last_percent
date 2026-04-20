import React from 'react';
import { View, Text } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, Circle } from 'react-native-svg';
import Animated, { useAnimatedStyle, SharedValue, FadeIn, withRepeat, withTiming, withSequence } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from './BatteryVisual.styles';
import { useStyles } from '@/hooks/useStyles';
import { useTheme } from '@/hooks/useTheme';
import { formatTime } from './utils';

const AnimatedView = Animated.createAnimatedComponent(View);
const AnimatedPath = Animated.createAnimatedComponent(Path);

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
  const styles = useStyles(createStyles);
  const { colors } = useTheme();

  const mainColor = isBanned ? colors.error : isLocked ? colors.textSecondary : colors.primary;

  const animatedCoreStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseValue.value }],
    shadowOpacity: glowOpacityValue.value,
    shadowRadius: 20 * pulseValue.value,
    shadowColor: mainColor,
  }));

  const waveOpacity = useAnimatedStyle(() => ({
    opacity: glowOpacityValue.value,
  }));

  // Create a heartbeat-like SVG path
  const heartbeatPath = "M0 60 L40 60 L50 40 L60 80 L70 20 L80 100 L90 60 L130 60 L140 60 L150 40 L160 80 L170 20 L180 100 L190 60 L230 60 L240 60 L250 40 L260 80 L270 20 L280 100 L290 60 L330 60 L340 60 L350 40 L360 80 L370 20 L380 100 L390 60 L400 60";

  return (
    <View style={styles.mainVisual}>
      <View style={styles.pulseWrapper}>
        {/* Waveform Background */}
        <AnimatedView style={[styles.waveformContainer, waveOpacity]}>
          <Svg width="100%" height="120" viewBox="0 0 400 120" preserveAspectRatio="none">
            <Path 
              d={isBanned ? "M0 60 L400 60" : heartbeatPath} 
              stroke={mainColor} 
              strokeWidth="2" 
              fill="none" 
            />
          </Svg>
        </AnimatedView>

        {/* The Central Core */}
        <AnimatedView style={[styles.core, animatedCoreStyle, { backgroundColor: mainColor }]}>
           <View style={styles.coreInner}>
              {isBanned ? (
                <Ionicons name="warning" size={24} color={colors.error} />
              ) : isLocked ? (
                <Ionicons name="lock-closed" size={24} color={colors.textSecondary} />
              ) : (
                <Ionicons name="pulse" size={32} color={colors.primary} />
              )}
           </View>
        </AnimatedView>
      </View>

      {/* Modern Data Readouts */}
      <AnimatedView entering={FadeIn.delay(400)} style={styles.dataRow}>
        <View style={styles.dataBox}>
          <Text style={styles.dataLabel}>ENERGY LEVEL</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Text style={styles.dataValue}>{Math.round(mockBatteryLevel * 100)}</Text>
            <Text style={[styles.dataUnit, { color: mainColor }]}>%</Text>
          </View>
        </View>

        <View style={[styles.dataBox, { alignItems: 'flex-end' }]}>
          <Text style={styles.dataLabel}>
            {isBanned ? "RESTRICTION TIME" : "SIGNAL STATUS"}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            {isBanned ? (
               <Text style={styles.countdownText}>{formatTime(timeLeft)}</Text>
            ) : (
               <>
                 <Text style={styles.dataValue}>{isLocked ? "OFFLINE" : "READY"}</Text>
                 <View style={{ 
                    width: 8, 
                    height: 8, 
                    borderRadius: 4, 
                    backgroundColor: isLocked ? colors.textSecondary : colors.online,
                    marginLeft: 8,
                    marginBottom: 4
                 }} />
               </>
            )}
          </View>
        </View>
      </AnimatedView>
    </View>
  );
};
