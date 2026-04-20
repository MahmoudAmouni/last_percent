import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderBottomLeftRadius: 4,
  },
  myMessageText: {
    color: colors.background,
    fontSize: 16,
    lineHeight: 22,
  },
  theirMessageText: {
    color: colors.text,
    fontSize: 16,
    lineHeight: 22,
  },
  timeText: {
    color: colors.textSecondary,
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});
