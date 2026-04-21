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
import { useChatContext } from '@/store/chatStore';
import { useAuthContext } from '@/store/authStore';
import { useSessionContext } from '@/store/sessionStore';
import { useStartSession } from '@/hooks/useSession';
import { createStyles } from './ChatScreen.styles';
import { useStyles } from '@/hooks/useStyles';
import { useTheme } from '@/hooks/useTheme';

import { ChatHeader } from '@/components/chat/ChatHeader';
import { MessageItem } from '@/components/chat/MessageItem';
import { ChatInput } from '@/components/chat/ChatInput';
import { ReconnectCard } from '@/components/chat/ReconnectCard';

export const ChatScreen = () => {
  const styles = useStyles(createStyles);
  const { colors } = useTheme();
  const router = useRouter();
  const { matchId, isPartnerPresent, clearMatch, messages } = useChatContext();
  
  const { user } = useAuthContext();
  const { batteryLevel } = useSessionContext();
  const { sendMessage, isSending, leaveChat } = useChat(matchId);
  const startSessionMutation = useStartSession();
  
  const [inputText, setInputText] = useState('');
  const flatListRef = useRef<FlatList>(null);

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

  const gradientColors = [colors.background, colors.surface];

  return (
    <View style={styles.container}>
      <LinearGradient colors={gradientColors} style={styles.gradient} />
      
      {/* Soft Ambient Glow */}
      <View style={{ 
        position: 'absolute', 
        top: '20%', 
        right: '-10%', 
        width: 300, 
        height: 300, 
        backgroundColor: colors.primary, 
        opacity: 0.03, 
        borderRadius: 150 
      } as any} />

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
          showsVerticalScrollIndicator={false}
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
