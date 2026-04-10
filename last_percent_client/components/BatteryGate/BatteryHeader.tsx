import React from 'react';
import { Text } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { styles } from './BatteryHeader.styles';

interface BatteryHeaderProps {
  isBanned: boolean;
  isLocked: boolean;
}

export const BatteryHeader: React.FC<BatteryHeaderProps> = ({ isBanned, isLocked }) => {
  return (
    <Animated.View 
      entering={FadeInDown.duration(800)}
      style={styles.header}
    >
      <Text style={styles.title}>
        {isBanned ? "SYSTEM SUSPENDED" : isLocked ? "ACCESS DENIED" : "SYSTEM READY"}
      </Text>
      <Text style={styles.subtitle}>
        {isBanned 
          ? "Match abandonment protocol active" 
          : isLocked 
            ? "Your battery is too healthy" 
            : "Welcome to the terminal stage"}
      </Text>
    </Animated.View>
  );
};
