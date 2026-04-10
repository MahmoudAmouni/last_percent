import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  SafeAreaView, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useChat } from '@/hooks/useChat';
import { useChatStore } from '@/store/chatStore';
import { useAuthStore } from '@/store/authStore';
import { useSessionStore } from '@/store/sessionStore';
import { useStartSession } from '@/hooks/useSession';
import { useSuspensionStore } from '@/store/suspensionStore';
import { styles } from './ChatScreen.styles';

import { ChatHeader } from '@/components/chat/ChatHeader';
import { MessageItem } from '@/components/chat/MessageItem';
import { ChatInput } from '@/components/chat/ChatInput';
import { ReconnectCard } from '@/components/chat/ReconnectCard';

export const ChatScreen = () => {
  const router = useRouter();
  const matchId = useChatStore((state) => state.matchId);
  const isPartnerPresent = useChatStore((state) => state.isPartnerPresent);
  const clearMatch = useChatStore((state) => state.clearMatch);
  
  const { user } = useAuthStore();
  const { batteryLevel } = useSessionStore();
  const { sendMessage, isSending, leaveChat } = useChat(matchId);
  const startSessionMutation = useStartSession();
  const messages = useChatStore((state) => state.messages);
  
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

  const { suspend } = useSuspensionStore();

  const handleSend = () => {
    if (inputText.trim() && !isSending && isPartnerPresent) {
      sendMessage(inputText.trim());
      setInputText('');
    }
  };

  const handleFindNew = () => {
    if (batteryLevel !== null) {
      startSessionMutation.mutate({ startingBatteryLevel: batteryLevel });
    } else {
      router.replace('/(app)/battery-gate');
    }
  };

  const handleBack = async () => {
    if (matchId) {
      if (isPartnerPresent) {
        suspend(30);
      }
      
      try {
        await leaveChat();
      } catch (err) {
        console.error('Error leaving chat:', err);
      }
    }
    clearMatch();
    router.back();
  };

  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [messages]);

  useEffect(() => {
    console.log('[ChatScreen] isPartnerPresent:', isPartnerPresent);
  }, [isPartnerPresent, matchId]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#100F0F', '#1A0B0B', '#2D0A0A']}
        style={styles.gradient}
      />
      <SafeAreaView style={styles.safeArea}>
        <ChatHeader 
          onBack={handleBack} 
          isPartnerPresent={isPartnerPresent} 
        />

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => (
            <MessageItem 
              item={item} 
              currentUserId={user?.id ? Number(user.id) : undefined} 
            />
          )}
          keyExtractor={(item, index) => item.id?.toString() || index.toString()}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          {isPartnerPresent ? (
            <ChatInput 
              inputText={inputText}
              setInputText={setInputText}
              onSend={handleSend}
              isSending={isSending}
              isPartnerPresent={isPartnerPresent}
            />
          ) : (
            <ReconnectCard 
              onLeave={handleBack}
              onConnect={handleFindNew}
            />
          )}
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};
