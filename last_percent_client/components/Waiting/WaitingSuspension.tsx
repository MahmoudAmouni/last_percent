import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { createStyles } from './WaitingSuspension.styles';
import { useStyles } from '@/hooks/useStyles';
import { useTheme } from '@/hooks/useTheme';

interface WaitingSuspensionProps {
  timeLeft: number;
}

export default function WaitingSuspension({ timeLeft }: WaitingSuspensionProps) {
  const styles = useStyles(createStyles);
  const { colors } = useTheme();

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Animated.View entering={FadeInDown.duration(600)} style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="moon-outline" size={80} color={colors.textSecondary} />
      </View>
      
      <Text style={styles.title}>Take a breather</Text>
      <Text style={styles.description}>
        Your last match ended a bit quickly. Take a few minutes to relax while we prepare your next connection.
      </Text>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        <Text style={styles.timerLabel}>Ready in</Text>
      </View>
    </Animated.View>
  );
}
