import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { styles } from './WaitingSuspension.styles';

interface WaitingSuspensionProps {
  timeLeft: number;
}

export default function WaitingSuspension({ timeLeft }: WaitingSuspensionProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Animated.View entering={FadeInDown.duration(600)} style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="time-outline" size={80} color="#FF4D4D" />
      </View>
      
      <Text style={styles.title}>Access Restricted</Text>
      <Text style={styles.description}>
        You left an active match early. To maintain network integrity, you must wait until the timer expires.
      </Text>

      <View style={styles.timerContainer}>
        <Text style={styles.timerText}>{formatTime(timeLeft)}</Text>
        <Text style={styles.timerLabel}>Time remaining</Text>
      </View>
    </Animated.View>
  );
}
