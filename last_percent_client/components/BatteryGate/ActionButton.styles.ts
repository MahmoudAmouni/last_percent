import { StyleSheet } from 'react-native';
import { Fonts } from '@/constants/theme';

export const createStyles = (colors: any) => StyleSheet.create({
  button: {
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    shadowOpacity: 0,
    elevation: 0,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonText: {
    fontFamily: Fonts.title,
    fontSize: 16,
    fontWeight: '800',
    color: colors.background,
    letterSpacing: 0.5,
  },
  buttonTextDisabled: {
    color: colors.textSecondary,
    fontWeight: '600',
  },
});
