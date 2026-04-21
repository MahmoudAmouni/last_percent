import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
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
      entering={FadeInDown.duration(600).springify()}
      style={styles.reconnectCard}
    >
      <View style={styles.reconnectHeader}>
        <Ionicons name="moon-outline" size={24} color={colors.textSecondary} style={styles.reconnectIcon} />
        <Text style={styles.reconnectTitle}>They've gone ahead...</Text>
      </View>
      <Text style={styles.reconnectSubtitle}>
        The connection has faded. Would you like to find someone else to share these last moments with?
      </Text>
      <View style={styles.reconnectActions}>
        <TouchableOpacity 
          style={styles.secondaryCardButton} 
          onPress={onLeave}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryCardButtonText}>Goodbye</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.primaryCardButton} 
          onPress={onConnect}
          activeOpacity={0.8}
        >
          <Text style={styles.primaryCardButtonText}>Find another</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};
