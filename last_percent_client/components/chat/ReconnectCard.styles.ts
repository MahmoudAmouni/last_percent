import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
  reconnectCard: {
    backgroundColor: colors.surface,
    margin: 20,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderColor: `${colors.primary}33`, // 0.2 opacity approx 33
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  reconnectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reconnectIcon: {
    marginRight: 8,
  },
  reconnectTitle: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  reconnectSubtitle: {
    color: colors.textSecondary,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 24,
  },
  reconnectActions: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryCardButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryCardButtonText: {
    color: colors.background,
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryCardButton: {
    flex: 1,
    backgroundColor: colors.border,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  secondaryCardButtonText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
});
