import { StyleSheet, Platform } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1.5,
    height: 56,
    paddingHorizontal: 16,
    borderColor: colors.border,
  },
  input: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: '500',
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
  iconContainer: {
    marginLeft: 12,
    padding: 4,
  },
  errorText: {
    color: colors.error,
    fontSize: 12,
    marginTop: 6,
    marginLeft: 4,
    fontWeight: '500',
  },
});
