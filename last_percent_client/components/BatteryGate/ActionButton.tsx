import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { styles } from './ActionButton.styles';

interface ActionButtonProps {
  isLocked: boolean;
  isBanned: boolean;
  isPending: boolean;
  onPress: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({ 
  isLocked, 
  isBanned, 
  isPending, 
  onPress 
}) => {
  return (
    <Animated.View 
      entering={FadeInUp.delay(400).duration(800)}
      style={{ width: '100%' }}
    >
      <TouchableOpacity 
        disabled={isLocked || isBanned || isPending}
        onPress={onPress}
        style={[
          styles.button, 
          (isLocked || isBanned || isPending) && styles.buttonDisabled
        ]}
        activeOpacity={0.8}
      >
        <Text style={[
          styles.buttonText, 
          (isLocked || isBanned || isPending) && styles.buttonTextDisabled
        ]}>
          {isPending 
            ? "INITIATING..." 
            : isBanned ? "RESTRICTED" : isLocked ? "CHECKING SENSORS..." : "START SESSION"}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};
