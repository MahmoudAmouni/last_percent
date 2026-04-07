import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  Platform 
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { styles } from './AuthButton.styles';
import { ViewStyle, TextStyle } from 'react-native';

interface AuthButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const AuthButton: React.FC<AuthButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  style, 
  textStyle 
}) => {
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
          styles.text,
          variant === 'primary' ? styles.primaryText : styles.secondaryText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default AuthButton;
