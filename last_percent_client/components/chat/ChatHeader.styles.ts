import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  headerTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.online,
    marginRight: 6,
  },
  statusDotOffline: {
    backgroundColor: colors.error,
  },
  statusText: {
    color: colors.textSecondary,
    fontSize: 12,
  },
});
