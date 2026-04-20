import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
  button: {
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.background,
    letterSpacing: 1,
  },
  buttonTextDisabled: {
    color: colors.textSecondary,
  },
});
