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

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Keep the spirit alive..."
        placeholderTextColor={colors.textSecondary}
        value={inputText}
        onChangeText={setInputText}
        multiline
      />
      <TouchableOpacity 
        onPress={onSend} 
        style={[
          styles.sendButton, 
          (!inputText.trim() || !isPartnerPresent) && styles.sendButtonDisabled
        ]}
        disabled={!inputText.trim() || isSending || !isPartnerPresent}
      >
        <Ionicons name="send" size={20} color={colors.background} />
      </TouchableOpacity>
    </View>
  );
};
