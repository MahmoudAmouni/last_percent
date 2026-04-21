import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  Easing,
  FadeIn
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from './WaitingStatus.styles';
import { useStyles } from '@/hooks/useStyles';
import { useTheme } from '@/hooks/useTheme';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function WaitingStatus() {
  const styles = useStyles(createStyles);
  const { colors } = useTheme();
  const pulse = useSharedValue(1);
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1.3, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
    opacity.value = withRepeat(
      withTiming(0.1, { duration: 2500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: opacity.value,
  }));

  const innerPulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: 0.95 + (pulse.value - 1) * 0.2 }],
  }));

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(1000)} style={styles.pulseContainer}>
        {/* Soft Breathing Rings */}
        <AnimatedView style={[styles.pulseCircle, pulseStyle]} />
        <AnimatedView style={[styles.pulseCircle, { width: 180, height: 180, borderRadius: 90 }, pulseStyle]} />
        
        <AnimatedView style={[styles.innerCircle, innerPulseStyle]}>
          <Ionicons name="heart-half" size={40} color={colors.primary} />
        </AnimatedView>
      </Animated.View>

      <View style={styles.statusContent}>
        <Text style={styles.searchingText}>Looking for a soul</Text>
        <Text style={styles.mainStatus}>Finding your companion...</Text>
        <Text style={styles.subStatus}>
          The best conversations happen when the power is low. Stay with us.
        </Text>
      </View>
    </View>
  );
}
