import React, { useEffect } from 'react';
import { View } from 'react-native';
import Svg, { Rect, Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming, 
  withSequence 
} from 'react-native-reanimated';
import { styles } from './BatteryIcon.styles';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

function BatteryIcon() {
  const opacity = useSharedValue(0.4);

  useEffect(() => {
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500 }),
        withTiming(0.4, { duration: 1500 })
      ),
      -1,
      true
    );
  }, []);

  const glowStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    shadowColor: '#FF4D4D',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: opacity.value,
    shadowRadius: 20 * opacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.glowContainer, glowStyle]}>
        <Svg width="120" height="200" viewBox="0 0 120 200">
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
              <Stop offset="0%" stopColor="#FF4D4D" stopOpacity="1" />
              <Stop offset="100%" stopColor="#FF1A1A" stopOpacity="1" />
            </LinearGradient>
          </Defs>
          
          <Path
            d="M20 10C14.4772 10 10 14.4772 10 20V180C10 185.523 14.4772 190 20 190H100C105.523 190 110 185.523 110 180V20C110 14.4772 105.523 10 100 10H20Z"
            fill="none"
            stroke="#444"
            strokeWidth="4"
          />
          
          <Path
            d="M45 0H75V10H45V0Z"
            fill="#444"
          />

          <AnimatedRect
            x="20"
            y="170"
            width="80"
            height="12"
            rx="4"
            fill="url(#grad)"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

export default BatteryIcon;
