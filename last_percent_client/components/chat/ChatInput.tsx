import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from './ChatInput.styles';
import { useStyles } from '@/hooks/useStyles';
import { useTheme } from '@/hooks/useTheme';

interface ChatInputProps {
  inputText: string;
  setInputText: (text: string) => void;
  onSend: () => void;
  isSending: boolean;
  isPartnerPresent: boolean;
}

export const ChatInput = ({ 
  inputText, 
  setInputText, 
  onSend, 
  isSending, 
  isPartnerPresent 
}: ChatInputProps) => {
  const styles = useStyles(createStyles);
  const { colors } = useTheme();

  const isDisabled = !inputText.trim() || isSending || !isPartnerPresent;

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Say something before it's over..."
        placeholderTextColor="rgba(255, 255, 255, 0.3)"
        value={inputText}
        onChangeText={setInputText}
        multiline
        blurOnSubmit={false}
      />
      <TouchableOpacity 
        onPress={onSend} 
        style={[
          styles.sendButton, 
          isDisabled && styles.sendButtonDisabled
        ]}
        disabled={isDisabled}
        activeOpacity={0.8}
      >
        <Ionicons 
          name="send" 
          size={20} 
          color={isDisabled ? 'rgba(255, 255, 255, 0.2)' : colors.background} 
        />
      </TouchableOpacity>
    </View>
  );
};
