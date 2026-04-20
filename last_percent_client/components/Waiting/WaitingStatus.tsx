import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './WaitingStatus.styles';

export default function WaitingStatus() {
  return (
    <Animated.View entering={FadeIn.delay(300)} style={styles.content}>
      <View style={styles.iconContainer}>
        <Animated.View 
          entering={FadeInDown.duration(1000).springify()}
          style={styles.pulseIndicator} 
        />
        <Ionicons name="radio-outline" size={80} color="#FF4D4D" />
      </View>
      <Text style={styles.title}>Finding someone...</Text>
      <Text style={styles.subtitle}>
        Searching for a companion who is also at their last percent.
      </Text>
    </Animated.View>
  );
}
