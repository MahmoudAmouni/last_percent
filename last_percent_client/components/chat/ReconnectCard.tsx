import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { styles } from './ReconnectCard.styles';

interface ReconnectCardProps {
  onLeave: () => void;
  onConnect: () => void;
}

export const ReconnectCard = ({ onLeave, onConnect }: ReconnectCardProps) => {
  return (
    <Animated.View 
      entering={SlideInDown.springify()}
      style={styles.reconnectCard}
    >
      <View style={styles.reconnectHeader}>
        <Ionicons name="flash-off" size={20} color="#FF4D4D" style={styles.reconnectIcon} />
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
