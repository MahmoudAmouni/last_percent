import { useThemeContext } from '@/store/themeStore';

export function useTheme() {
  const { colors, theme, isDark, toggleTheme, setTheme } = useThemeContext();
  return { colors, theme, isDark, toggleTheme, setTheme };
}
