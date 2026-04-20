import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.05)',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  titleContainer: {
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 14,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  statusText: {
    fontSize: 9,
    color: colors.primary,
    fontWeight: '800',
    marginTop: 2,
  },
});
