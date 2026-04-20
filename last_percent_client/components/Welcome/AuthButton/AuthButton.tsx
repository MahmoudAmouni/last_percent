import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  Platform,
  ViewStyle,
  TextStyle
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { createStyles } from './AuthButton.styles';
import { useStyles } from '@/hooks/useStyles';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

function AuthButton(props: AuthButtonProps) {
  const { 
    title, 
    onPress, 
    variant = 'primary', 
    style, 
    textStyle 
  } = props;
  
  const styles = useStyles(createStyles);
  
  const handlePress = () => {
    if (Platform.OS !== 'web') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    onPress();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.button,
        variant === 'primary' ? styles.primaryButton : styles.secondaryButton,
        style,
      ]}
      onPress={handlePress}
    >
      <Text
        style={[
          styles.buttonText,
          variant === 'primary' ? styles.primaryButtonText : styles.secondaryButtonText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default AuthButton;
