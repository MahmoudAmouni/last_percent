import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
  footer: {
    paddingVertical: 30,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
  },
  batteryText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '800',
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  batteryLevel: {
    color: colors.primary,
    fontWeight: '900',
  },
  metaContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  metaText: {
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.2)',
    fontWeight: '700',
    marginHorizontal: 10,
    letterSpacing: 1,
  },
});
