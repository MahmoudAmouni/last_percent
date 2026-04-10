import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './StatusCard.styles';

interface StatusCardProps {
  isBanned: boolean;
  isLocked: boolean;
}

export const StatusCard: React.FC<StatusCardProps> = ({ isBanned, isLocked }) => {
  return (
    <View style={[styles.statusCard, isBanned && styles.suspendedCard]}>
      <View style={styles.warningIconWrapper}>
        <Ionicons 
          name={isBanned ? "warning" : isLocked ? "shield-checkmark" : "flash"} 
          size={24} 
          color="#FF4D4D" 
        />
      </View>
      <Text style={styles.statusTitle}>
        {isBanned ? "PENALTY ACTIVE" : isLocked ? "Wait for it..." : "Status: Optimal Failure"}
      </Text>
      <Text style={styles.statusDescription}>
        {isBanned 
          ? "You left an active match early. To maintain network integrity, a 30-minute lockout has been applied to your device."
          : isLocked 
            ? "We only connect users in their last percent. Come back when you are below 20%." 
            : "Device state validated. You are now eligible to find a companion for the end."}
      </Text>
    </View>
  );
};
