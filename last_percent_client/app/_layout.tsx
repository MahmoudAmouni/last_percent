import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useEffect, useState } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuthStore } from '@/store/authStore';
import { signalRService } from '@/services/signalR';
import { useChatStore, MatchStatus } from '@/store/chatStore';
import { useRouter } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const { isAuthenticated, initializeAuth } = useAuthStore();
  const { matchStatus } = useChatStore();
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

  useEffect(() => {
    if (matchStatus === MatchStatus.Matched) {
      // router.push('/(app)/chat'); 
    }
  }, [matchStatus]);

  if (!isLoaded) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <View style={styles.webContainer}>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(auth)" />
          </Stack>
          <StatusBar style="auto" />
        </View>
      </ThemeProvider>
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
