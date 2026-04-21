import React from 'react';
import { View, Text } from 'react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { createStyles } from './MessageItem.styles';
import { useStyles } from '@/hooks/useStyles';

interface Message {
  id: number;
  matchId: number;
  senderId: number;
  content: string;
  sentAt: string;
}

interface MessageItemProps {
  item: Message;
  currentUserId: string | number | undefined;
}

export const MessageItem = ({ item, currentUserId }: MessageItemProps) => {
  const styles = useStyles(createStyles);
  const isMe = currentUserId !== undefined && String(item.senderId) === String(currentUserId);

  return (
    <Animated.View 
      entering={FadeInUp.duration(400)}
      style={styles.messageContainer}
    >
      <View 
        style={[
          styles.messageBubble,
          isMe ? styles.myMessage : styles.theirMessage
        ]}
      >
        <Text style={isMe ? styles.myMessageText : styles.theirMessageText}>{item.content}</Text>
      </View>
      <Text style={[
        styles.timeText,
        isMe ? styles.myTimeText : styles.theirTimeText
      ]}>
        {new Date(item.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </Animated.View>
  );
};
