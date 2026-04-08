import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard,
  TouchableOpacity
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Animated, { 
  FadeInDown, 
  FadeIn
} from 'react-native-reanimated';

import AuthButton from '@/components/Welcome/AuthButton/AuthButton';
import BatteryIcon from '@/components/Welcome/BatteryIcon/BatteryIcon';
import FormInput from '../../../components/Login/FormInput/FormInput';
import { styles } from './LoginScreen.styles';
import { useAuthStore } from '@/store/authStore';
import { useLogin } from '@/hooks/useAuth';

function LoginScreen() {
  const router = useRouter();
  const loginMutation = useLogin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    setError('');

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          router.replace('/(app)/battery-gate');
        },
        onError: (err: any) => {
          console.error('Login Mutation Error:', err);
          setError(err?.response?.data?.message || 'Invalid email or password or backend unavailable');
        }
      }
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <LinearGradient
          colors={['#100F0F', '#1A0B0B', '#2D0A0A']}
          style={styles.gradient}
        />
        
        <SafeAreaView style={styles.safeArea}>
          <KeyboardAvoidingView 
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.keyboardView}
          >
            <View style={styles.content}>
              <Animated.View 
                entering={FadeIn.delay(200).duration(1000)}
                style={styles.header}
              >
                <TouchableOpacity 
                  onPress={() => router.back()}
                  style={styles.backButton}
                >
                  <Ionicons name="arrow-back" size={24} color="#FFF" />
                </TouchableOpacity>
                <BatteryIcon />
              </Animated.View>

              <Animated.View 
                entering={FadeInDown.delay(400).duration(800)}
                style={styles.formContainer}
              >
                <Text style={styles.title}>Welcome Back</Text>
                <Text style={styles.subtitle}>Log in to continue your session</Text>

                <FormInput
                  label="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="name@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <FormInput
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  secureTextEntry
                />

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity style={styles.forgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <AuthButton
                  title={loginMutation.isPending ? "LOGGING IN..." : "LOGIN"}
                  onPress={handleLogin}
                  style={styles.loginButton}
                />
              </Animated.View>

              <Animated.View 
                entering={FadeInDown.delay(600).duration(800)}
                style={styles.footer}
              >
                <Text style={styles.footerText}>Don't have an account?</Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
                  <Text style={styles.registerText}> Create Account</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
