import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './ChatInput.styles';

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
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Keep the spirit alive..."
        placeholderTextColor="rgba(255, 255, 255, 0.3)"
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
        <Ionicons name="send" size={20} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};
