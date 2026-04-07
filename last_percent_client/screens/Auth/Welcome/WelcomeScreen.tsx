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

import BatteryIcon from '../../../components/BatteryIcon/BatteryIcon';
import AuthButton from '../../../components/AuthButton/AuthButton';
import { styles } from './WelcomeScreen.styles';

const WelcomeScreen = () => {
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
        colors={['#100F0F', '#1A0B0B', '#2D0A0A']}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Animated.View 
            entering={FadeIn.delay(300).duration(1000)}
            style={styles.logoContainer}
          >
            <BatteryIcon />
          </Animated.View>

          <View style={styles.textContainer}>
            <Animated.Text style={[styles.title, titleStyle]}>
              Last Percent
            </Animated.Text>
            <Animated.Text style={[styles.subtitle, subtitleStyle]}>
              Connect with strangers while your battery is dying.
            </Animated.Text>
          </View>

          <Animated.View 
            entering={FadeInDown.delay(1000).springify()}
            style={styles.footer}
          >
            <AuthButton 
              title="LOGIN" 
              variant="primary"
              onPress={() => console.log('Login pressed')} 
              style={styles.button}
            />
            <AuthButton 
              title="CREATE ACCOUNT" 
              variant="secondary"
              onPress={() => console.log('Signup pressed')} 
              style={styles.button}
            />
            
            <Text style={styles.terms}>
              By continuing, you agree to our Terms of Service.
            </Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default WelcomeScreen;
