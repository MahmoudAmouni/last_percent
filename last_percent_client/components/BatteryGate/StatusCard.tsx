import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from './StatusCard.styles';
import { useStyles } from '@/hooks/useStyles';
import { useTheme } from '@/hooks/useTheme';

interface StatusCardProps {
  isBanned: boolean;
  isLocked: boolean;
}

export const StatusCard: React.FC<StatusCardProps> = ({ isBanned, isLocked }) => {
  const styles = useStyles(createStyles);
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.statusLine} />

      <View style={styles.contentWrapper}>
        <View style={styles.headerRow}>
          <Ionicons 
            name={isBanned ? "shield-outline" : isLocked ? "radio-outline" : "pulse-outline"} 
            size={16} 
            color={isBanned ? colors.error : isLocked ? colors.textSecondary : colors.primary} 
          />
          <Text style={[
            styles.statusTitle, 
            { color: isBanned ? colors.error : isLocked ? colors.textSecondary : colors.text }
          ]}>
            {isBanned ? "PROTOCOL: RESTRICTED" : isLocked ? "STATUS: STANDBY" : "STATUS: ACTIVE"}
          </Text>
        </View>

        <Text style={styles.statusDescription}>
          {isBanned 
            ? "Connection signal terminated by safety protocol. Recovery in progress."
            : isLocked 
              ? "Scanning for critical battery signature. Signal locked until voltage drops below threshold." 
              : "Signature verified. Life support synchronized. Terminal session ready for initialization."}
        </Text>

      </View>
    </View>
  );
};
