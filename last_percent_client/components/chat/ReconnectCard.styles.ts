import { StyleSheet } from 'react-native';
import { Fonts } from '@/constants/theme';

export const createStyles = (colors: any) => StyleSheet.create({
  reconnectCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    margin: 20,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.5,
    shadowRadius: 24,
    elevation: 12,
  },
  reconnectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  reconnectIcon: {
    marginRight: 10,
    opacity: 0.8,
  },
  reconnectTitle: {
    fontFamily: Fonts.title,
    color: colors.text,
    fontSize: 20,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  reconnectSubtitle: {
    fontFamily: Fonts.body,
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 24,
    lineHeight: 22,
  },
  reconnectActions: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryCardButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  primaryCardButtonText: {
    fontFamily: Fonts.title,
    color: colors.background,
    fontSize: 15,
    fontWeight: '800',
  },
  secondaryCardButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 15,
    borderRadius: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  secondaryCardButtonText: {
    fontFamily: Fonts.body,
    color: colors.textSecondary,
    fontSize: 15,
    fontWeight: '600',
  },
});
