import React from 'react';
import { View, Text } from 'react-native';
import { styles } from './WaitingFooter.styles';

interface WaitingFooterProps {
  batteryLevel: number | null;
}

export default function WaitingFooter({ batteryLevel }: WaitingFooterProps) {
  return (
    <View style={styles.footer}>
      <Text style={styles.batteryText}>
        Battery level reported: {batteryLevel}%
      </Text>
    </View>
  );
}
