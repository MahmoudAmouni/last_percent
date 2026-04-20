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
      <View style={styles.badge}>
        <Text style={styles.badgeText}>TERMINAL v1.0.4</Text>
      </View>
      
      <Text style={styles.title}>
        {isBanned ? "RESTRICTED" : isLocked ? "UNAVAILABLE" : "OPERATIONAL"}
      </Text>
      <Text style={styles.subtitle}>
        {isBanned 
          ? "MATCH ABANDONMENT DETECTED" 
          : isLocked 
            ? "VOLTAGE THRESHOLD TOO HIGH" 
            : "INITIALIZING TERMINAL STAGE"}
      </Text>

      <View style={[styles.accentLine, isBanned && styles.accentLineBanned]} />
    </Animated.View>
  );
};
