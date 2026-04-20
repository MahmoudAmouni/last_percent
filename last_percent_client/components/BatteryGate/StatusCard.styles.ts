import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 10,
  },
  statusLine: {
    height: 1,
    backgroundColor: colors.border,
    width: '100%',
    marginBottom: 20,
  },
  contentWrapper: {
    paddingHorizontal: 10,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusTitle: {
    fontSize: 12,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginLeft: 10,
  },
  statusDescription: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
    fontWeight: '500',
  },
  footerMeta: {
    flexDirection: 'row',
    marginTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.05)',
    paddingTop: 10,
  },
  metaItem: {
    fontSize: 9,
    color: 'rgba(255, 255, 255, 0.3)',
    fontWeight: '700',
    marginRight: 20,
  },
});
