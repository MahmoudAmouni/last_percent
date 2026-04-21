import { StyleSheet } from 'react-native';
import { Fonts } from '@/constants/theme';

export const createStyles = (colors: any) => StyleSheet.create({
  footer: {
    paddingVertical: 30,
    alignItems: 'center',
  },
  batteryText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  batteryLevel: {
    fontFamily: Fonts.title,
    color: colors.primary,
    fontWeight: '800',
  },
  metaContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  metaText: {
    fontFamily: Fonts.body,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.3)',
    fontWeight: '500',
    textAlign: 'center',
  },
});
