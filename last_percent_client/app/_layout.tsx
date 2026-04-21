import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider, useAuthContext } from '@/store/authStore';
import { ChatProvider, useChatContext } from '@/store/chatStore';
import { SessionProvider } from '@/store/sessionStore';
import { SuspensionProvider } from '@/store/suspensionStore';
import { ThemeProvider as AppThemeProvider } from '@/store/themeStore';
import { useTheme } from '@/hooks/useTheme';
import { websocketService } from '@/services/websocketService';
import { useWebSocketEvents } from '@/hooks/useWebSocket';
import { useRouter, useSegments } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

function AppNavigator() {
  const colorScheme = useColorScheme();
  const { colors } = useTheme();
  const { isAuthenticated, initializeAuth, token } = useAuthContext();
  const { matchStatus } = useChatContext();
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useWebSocketEvents();

  useEffect(() => {
    const init = async () => {
      await initializeAuth();
      setIsLoaded(true);
    };
    init();
  }, []);

  useEffect(() => {
    if (isAuthenticated && token) {
      websocketService.connect(token);
    } else {
      websocketService.disconnect();
    }
  }, [isAuthenticated, token]);

  const segments = useSegments();

  useEffect(() => {
    if (!isLoaded) return;

    const inAppGroup = segments[0] === '(app)';

    if (isAuthenticated && !inAppGroup) {
      router.replace('/(app)/battery-gate');
    } else if (!isAuthenticated && inAppGroup) {
      router.replace('/(auth)');
    }
  }, [isLoaded, isAuthenticated, segments]);

  if (!isLoaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <View style={[
        styles.webContainer, 
        { 
          backgroundColor: colors.background,
          borderColor: colors.border
        }
      ]}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(app)" />
        </Stack>
        <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      </View>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppThemeProvider>
        <AuthProvider>
          <ChatProvider>
            <SessionProvider>
              <SuspensionProvider>
                <AppNavigator />
              </SuspensionProvider>
            </SessionProvider>
          </ChatProvider>
        </AuthProvider>
      </AppThemeProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 440 : undefined,
    alignSelf: 'center',
    ...(Platform.OS === 'web' && {
      boxShadow: '0 0 20px rgba(0,0,0,0.5)',
      borderLeftWidth: 1,
      borderRightWidth: 1,
    }),
  },
});
