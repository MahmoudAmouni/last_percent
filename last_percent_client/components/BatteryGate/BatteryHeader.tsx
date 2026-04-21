import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { createStyles } from './BatteryHeader.styles';
import { useStyles } from '@/hooks/useStyles';

interface BatteryHeaderProps {
  isBanned: boolean;
  isLocked: boolean;
}

export const BatteryHeader: React.FC<BatteryHeaderProps> = ({ isBanned, isLocked }) => {
  const styles = useStyles(createStyles);
  
  return (
    <Animated.View 
      entering={FadeInDown.duration(800)}
      style={styles.header}
    >
      <Text style={styles.title}>
        {isBanned ? "Just a moment" : isLocked ? "Not quite yet" : "Welcome back"}
      </Text>
      <Text style={styles.subtitle}>
        {isBanned 
          ? "You left the conversation a bit early. Take a breath while we reconnect you." 
          : isLocked 
            ? "Your journey starts when the power runs low. We'll be here when you're ready." 
            : "The battery is low, but the night is young. Ready to find someone?"}
      </Text>

      <View style={[styles.accentLine, isBanned && styles.accentLineBanned]} />
    </Animated.View>
  );
};
