import React from 'react';
import { Text } from 'react-native';
import Animated, { SlideInRight, SlideInLeft } from 'react-native-reanimated';
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
  currentUserId: number | undefined;
}

export const MessageItem = ({ item, currentUserId }: MessageItemProps) => {
  const styles = useStyles(createStyles);
  const isMe = item.senderId === currentUserId || item.senderId === 0;

  return (
    <Animated.View 
      entering={isMe ? SlideInRight : SlideInLeft}
      style={[
        styles.messageBubble,
        isMe ? styles.myMessage : styles.theirMessage
      ]}
    >
      <Text style={isMe ? styles.myMessageText : styles.theirMessageText}>{item.content}</Text>
      <Text style={styles.timeText}>
        {new Date(item.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </Animated.View>
  );
};
