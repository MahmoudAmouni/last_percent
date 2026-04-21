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
        Still breathing at <Text style={styles.batteryLevel}>{batteryLevel ?? '--'}%</Text>
      </Text>
      
      <View style={styles.metaContainer}>
        <Text style={styles.metaText}>
          You will be connected to someone also dying with you.
        </Text>
      </View>
    </View>
  );
}
