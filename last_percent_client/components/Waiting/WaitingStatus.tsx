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
import { createStyles } from './WaitingStatus.styles';
import { useStyles } from '@/hooks/useStyles';

const AnimatedView = Animated.createAnimatedComponent(View);

export default function WaitingStatus() {
  const styles = useStyles(createStyles);
  const rotation = useSharedValue(0);
  const pulse = useSharedValue(1);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, { duration: 4000, easing: Easing.linear }),
      -1,
      false
    );
    pulse.value = withRepeat(
      withTiming(1.2, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const scannerStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: 0.2 / pulse.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View entering={FadeIn.duration(1000)} style={styles.pulseContainer}>
        {/* Animated Sonar Rings */}
        <AnimatedView style={[styles.radarCircle, pulseStyle]} />
        <AnimatedView style={[styles.radarCircle, { width: 180, height: 180, borderRadius: 90 }, pulseStyle]} />
        
        {/* Rotating Scanner Line */}
        <AnimatedView style={[styles.scannerLine, scannerStyle]} />

        {/* HUD Brackets */}
        <View style={[styles.cornerBracket, { top: 0, left: 0, borderTopWidth: 2, borderLeftWidth: 2 }]} />
        <View style={[styles.cornerBracket, { top: 0, right: 0, borderTopWidth: 2, borderRightWidth: 2 }]} />
        <View style={[styles.cornerBracket, { bottom: 0, left: 0, borderBottomWidth: 2, borderLeftWidth: 2 }]} />
        <View style={[styles.cornerBracket, { bottom: 0, right: 0, borderBottomWidth: 2, borderRightWidth: 2 }]} />

        <View style={styles.statusContent}>
          <Text style={styles.searchingText}>SCANNING FREQUENCIES</Text>
          <Text style={styles.mainStatus}>Finding a companion...</Text>
          <Text style={styles.subStatus}>Waiting for a matching signal</Text>
        </View>
      </Animated.View>
    </View>
  );
}
