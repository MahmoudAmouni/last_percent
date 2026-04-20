import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from './WaitingHeader.styles';
import { useStyles } from '@/hooks/useStyles';
import { useTheme } from '@/hooks/useTheme';

interface WaitingHeaderProps {
  onBack: () => void;
}

export default function WaitingHeader({ onBack }: WaitingHeaderProps) {
  const styles = useStyles(createStyles);
  const { colors } = useTheme();

  return (
    <View style={styles.header}>
      <TouchableOpacity 
        onPress={onBack}
        style={styles.backButton}
        activeOpacity={0.7}
      >
        <Ionicons name="close" size={20} color={colors.text} />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>QUEUE STATUS</Text>
        <Text style={styles.statusText}>ENCRYPTED CHANNEL</Text>
      </View>
    </View>
  );
}
