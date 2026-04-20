import React from 'react';
import { View, Text } from 'react-native';
import { createStyles } from './WaitingFooter.styles';
import { useStyles } from '@/hooks/useStyles';

interface WaitingFooterProps {
  batteryLevel: number | null;
}

export default function WaitingFooter({ batteryLevel }: WaitingFooterProps) {
  const styles = useStyles(createStyles);

  return (
    <View style={styles.footer}>
      <Text style={styles.batteryText}>
        CURRENT POWER: <Text style={styles.batteryLevel}>{batteryLevel ?? '--'}%</Text>
      </Text>
      
      <View style={styles.metaContainer}>
        <Text style={styles.metaText}>SIGNAL: ACTIVE</Text>
        <Text style={styles.metaText}>BAND: 2.4GHZ</Text>
        <Text style={styles.metaText}>TYPE: TERMINAL</Text>
      </View>
    </View>
  );
}
