import { StyleSheet, Platform } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    paddingBottom: Platform.OS === 'ios' ? 16 : 24,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 12,
    color: colors.text,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  sendButtonDisabled: {
    backgroundColor: `${colors.primary}4D`, // 0.3 opacity approx 4D
  },
});
