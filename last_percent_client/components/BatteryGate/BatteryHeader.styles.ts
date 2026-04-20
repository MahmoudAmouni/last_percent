import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textSecondary,
    letterSpacing: 1.5,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -1,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  accentLine: {
    width: 40,
    height: 4,
    backgroundColor: colors.primary,
    borderRadius: 2,
    marginTop: 20,
  },
  accentLineBanned: {
    backgroundColor: colors.error,
  },
});
