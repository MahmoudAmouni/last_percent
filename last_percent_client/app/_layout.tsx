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
import { signalRService } from '@/services/signalR';
import { useRouter, useSegments } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

function AppNavigator() {
  const colorScheme = useColorScheme();
  const { isAuthenticated, initializeAuth } = useAuthContext();
  const { matchStatus } = useChatContext();
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const init = async () => {
      await initializeAuth();
      setIsLoaded(true);
    };
    init();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      signalRService.startConnection();
    } else {
      signalRService.stopConnection();
    }
  }, [isAuthenticated]);

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
      <View style={styles.webContainer}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(app)" />
        </Stack>
        <StatusBar style="auto" />
      </View>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChatProvider>
          <SessionProvider>
            <SuspensionProvider>
              <AppNavigator />
            </SuspensionProvider>
          </SessionProvider>
        </ChatProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  webContainer: {
    flex: 1,
    backgroundColor: '#000',
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 440 : undefined,
    alignSelf: 'center',
    ...(Platform.OS === 'web' && {
      boxShadow: '0 0 20px rgba(0,0,0,0.5)',
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderColor: '#333',
    }),
  },
});
