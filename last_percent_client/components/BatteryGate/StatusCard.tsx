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

  const getStatusContent = () => {
    if (isBanned) {
      return {
        icon: "heart-half-outline",
        title: "RESTING",
        description: "Your previous connection ended abruptly. We're letting things cool down before your next match.",
        color: colors.error
      };
    }
    if (isLocked) {
      return {
        icon: "moon-outline",
        title: "STAY TUNED",
        description: "The best stories happen in the final moments. Use your phone naturally until the battery drops.",
        color: colors.textSecondary
      };
    }
    return {
      icon: "sparkles-outline",
      title: "ALL SET",
      description: "You're in the magic zone. Start your session to find someone dying with you.",
      color: colors.primary
    };
  };

  const content = getStatusContent();

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        <View style={styles.headerRow}>
          <Ionicons 
            name={content.icon as any} 
            size={20} 
            color={content.color} 
          />
          <Text style={[styles.statusTitle, { color: content.color }]}>
            {content.title}
          </Text>
        </View>

        <Text style={styles.statusDescription}>
          {content.description}
        </Text>
      </View>
    </View>
  );
};
