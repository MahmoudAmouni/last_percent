import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from './ChatHeader.styles';
import { useStyles } from '@/hooks/useStyles';
import { useTheme } from '@/hooks/useTheme';

interface ChatHeaderProps {
  onBack: () => void;
  isPartnerPresent: boolean;
}

export const ChatHeader = ({ onBack, isPartnerPresent }: ChatHeaderProps) => {
  const styles = useStyles(createStyles);
  const { colors } = useTheme();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </TouchableOpacity>
      <View style={styles.headerInfo}>
        <Text style={styles.headerTitle}>Last Percent Match</Text>
        <View style={styles.statusRow}>
          <View style={[styles.statusDot, !isPartnerPresent && styles.statusDotOffline]} />
          <Text style={styles.statusText}>{isPartnerPresent ? 'Connected' : 'Disconnected'}</Text>
        </View>
      </View>
    </View>
  );
};
