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
import FormInput from '../../../components/Login/FormInput/FormInput';
import { styles } from './RegisterScreen.styles';
import { useRegister } from '@/hooks/useAuth';

function RegisterScreen() {
  const router = useRouter();
  const registerMutation = useRegister();
  
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = () => {
    if (!email || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setError('');

    registerMutation.mutate(
      { email, password, phoneNumber: phone },
      {
        onSuccess: () => {
          router.replace('/(app)/battery-gate');
        },
        onError: (err: any) => {
          console.error('Registration Mutation Error:', err);
          setError(err?.response?.data?.message || 'Registration failed');
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
              </Animated.View>

              <Animated.View 
                entering={FadeInDown.delay(400).duration(800)}
                style={styles.formContainer}
              >
                <Text style={styles.title}>Create Account</Text>
                <Text style={styles.subtitle}>Join Last Percent today</Text>

                <FormInput
                  label="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="name@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <FormInput
                  label="Phone Number"
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="+1 (555) 000-0000"
                  keyboardType="phone-pad"
                />

                <FormInput
                  label="Password"
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  secureTextEntry
                />

                <FormInput
                  label="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder="••••••••"
                  secureTextEntry
                />

                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <AuthButton
                  title={registerMutation.isPending ? "CREATING..." : "CREATE ACCOUNT"}
                  onPress={handleRegister}
                  style={styles.registerButton}
                />
              </Animated.View>

              <Animated.View 
                entering={FadeInDown.delay(600).duration(800)}
                style={styles.footer}
              >
                <Text style={styles.footerText}>Already have an account?</Text>
                <TouchableOpacity onPress={() => router.replace('/(auth)/login')}>
                  <Text style={styles.loginText}> Login</Text>
                </TouchableOpacity>
              </Animated.View>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default RegisterScreen;
