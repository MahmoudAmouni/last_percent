import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { createStyles } from './ReconnectCard.styles';
import { useStyles } from '@/hooks/useStyles';
import { useTheme } from '@/hooks/useTheme';

interface ReconnectCardProps {
  onLeave: () => void;
  onConnect: () => void;
}

export const ReconnectCard = ({ onLeave, onConnect }: ReconnectCardProps) => {
  const styles = useStyles(createStyles);
  const { colors } = useTheme();

  return (
    <Animated.View 
      entering={SlideInDown.springify()}
      style={styles.reconnectCard}
    >
      <View style={styles.reconnectHeader}>
        <Ionicons name="flash-off" size={20} color={colors.primary} style={styles.reconnectIcon} />
        <Text style={styles.reconnectTitle}>your partner left ;(</Text>
      </View>
      <Text style={styles.reconnectSubtitle}>wanna connect with someone else ?</Text>
      <View style={styles.reconnectActions}>
        <TouchableOpacity 
          style={styles.secondaryCardButton} 
          onPress={onLeave}
        >
          <Text style={styles.secondaryCardButtonText}>No, leave</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.primaryCardButton} 
          onPress={onConnect}
        >
          <Text style={styles.primaryCardButtonText}>Yes, connect</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
