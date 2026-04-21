import { StyleSheet } from 'react-native';
import { Fonts } from '@/constants/theme';

export const createStyles = (colors: any) => StyleSheet.create({
  messageContainer: {
    marginBottom: 16,
    width: '100%',
  },
  messageBubble: {
    maxWidth: '85%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 24,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  myMessageText: {
    fontFamily: Fonts.body,
    color: colors.background,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
  },
  theirMessageText: {
    fontFamily: Fonts.body,
    color: colors.text,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
  },
  timeText: {
    fontFamily: Fonts.body,
    color: colors.textSecondary,
    fontSize: 10,
    marginTop: 6,
    fontWeight: '500',
    opacity: 0.6,
  },
  myTimeText: {
    alignSelf: 'flex-end',
    marginRight: 4,
  },
  theirTimeText: {
    alignSelf: 'flex-start',
    marginLeft: 4,
  },
});
