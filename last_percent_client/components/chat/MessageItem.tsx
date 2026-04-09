import React from 'react';
import { Text } from 'react-native';
import Animated, { SlideInRight, SlideInLeft } from 'react-native-reanimated';
import { styles } from './MessageItem.styles';

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
  const isMe = item.senderId === currentUserId || item.senderId === 0;

  return (
    <Animated.View 
      entering={isMe ? SlideInRight : SlideInLeft}
      style={[
        styles.messageBubble,
        isMe ? styles.myMessage : styles.theirMessage
      ]}
    >
      <Text style={styles.messageText}>{item.content}</Text>
      <Text style={styles.timeText}>
        {new Date(item.sentAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </Text>
    </Animated.View>
  );
};
