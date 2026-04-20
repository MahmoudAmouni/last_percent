import React, { useState } from 'react';
import { 
  View, 
  TextInput, 
  Animated, 
  Text,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createStyles } from './FormInput.styles';
import { useStyles } from '@/hooks/useStyles';
import { useTheme } from '@/hooks/useTheme';

interface FormInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  error?: string;
}

function FormInput(props: FormInputProps) {
  const {
    label,
    value,
    onChangeText,
    placeholder,
    secureTextEntry,
    keyboardType = 'default',
    autoCapitalize = 'none',
    error
  } = props;
  
  const styles = useStyles(createStyles);
  const { colors } = useTheme();
  
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const focusAnim = useState(new Animated.Value(0))[0];

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.border, colors.primary],
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Animated.View style={[styles.inputContainer, { borderColor }]}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          placeholderTextColor={colors.textSecondary}
          secureTextEntry={secureTextEntry && !showPassword}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
        {secureTextEntry && (
          <TouchableOpacity 
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconContainer}
          >
            <Ionicons 
              name={showPassword ? "eye-off-outline" : "eye-outline"} 
              size={20} 
              color={colors.textSecondary} 
            />
          </TouchableOpacity>
        )}
      </Animated.View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default FormInput;
