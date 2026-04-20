import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  Platform, 
  StatusBar 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withDelay, 
  withSpring, 
  withTiming,
  FadeInDown,
  FadeIn
} from 'react-native-reanimated';
import * as NavigationBar from 'expo-navigation-bar';
import { useRouter } from 'expo-router';

import BatteryIcon from '../../../components/Welcome/BatteryIcon/BatteryIcon';
import AuthButton from '../../../components/Welcome/AuthButton/AuthButton';
import { createStyles } from './WelcomeScreen.styles';
import { useStyles } from '@/hooks/useStyles';
import { useTheme } from '@/hooks/useTheme';

const WelcomeScreen = () => {
  const styles = useStyles(createStyles);
  const { colors } = useTheme();
  const router = useRouter();
  const titleOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);

  useEffect(() => {
    if (Platform.OS === 'android') {
      NavigationBar.setVisibilityAsync('hidden');
      NavigationBar.setBehaviorAsync('inset-touch');
    }
    
    titleOpacity.value = withDelay(500, withTiming(1, { duration: 1000 }));
    subtitleOpacity.value = withDelay(800, withTiming(1, { duration: 1000 }));
  }, []);

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: withSpring(titleOpacity.value === 1 ? 0 : 20) }],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: withSpring(subtitleOpacity.value === 1 ? 0 : 20) }],
  }));

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={[colors.background, colors.surface, colors.background]}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.content}>
          <Animated.View 
            entering={FadeIn.delay(300).duration(1000)}
            style={styles.brandContainer}
          >
            <BatteryIcon />
            <View style={{ marginTop: 20 }}>
              <Animated.Text style={[styles.title, titleStyle]}>
                Last Percent
              </Animated.Text>
              <Animated.Text style={[styles.subtitle, subtitleStyle]}>
                Connect with strangers while your battery is dying.
              </Animated.Text>
            </View>
          </Animated.View>

          <Animated.View 
            entering={FadeInDown.delay(1000).springify()}
            style={styles.buttonContainer}
          >
            <AuthButton 
              title="LOGIN" 
              variant="primary"
              onPress={() => router.push('/(auth)/login')} 
            />
            <AuthButton 
              title="CREATE ACCOUNT" 
              variant="secondary"
              onPress={() => router.push('/(auth)/register')} 
            />
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default WelcomeScreen;
