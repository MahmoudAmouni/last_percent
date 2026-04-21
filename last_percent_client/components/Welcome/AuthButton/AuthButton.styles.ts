import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
  button: {
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  primaryButton: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
  },
  secondaryButton: {
    backgroundColor: colors.surface,
    shadowColor: '#000',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  primaryButtonText: {
    color: '#FFFFFF',
  },
  secondaryButtonText: {
    color: colors.text,
  },
});
