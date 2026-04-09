import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './ChatHeader.styles';

interface ChatHeaderProps {
  onBack: () => void;
  isPartnerPresent: boolean;
}

export const ChatHeader = ({ onBack, isPartnerPresent }: ChatHeaderProps) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={onBack} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#FFF" />
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
