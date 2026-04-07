import { useColorScheme as useNativeColorScheme } from 'react-native';

/**
 * Custom hook to get the current color scheme.
 * On web, this can be extended to handle custom theme state if needed.
 */
export function useColorScheme() {
  return useNativeColorScheme();
}
