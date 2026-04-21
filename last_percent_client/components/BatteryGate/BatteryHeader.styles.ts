import { StyleSheet } from 'react-native';
import { Fonts } from '@/constants/theme';

export const createStyles = (colors: any) => StyleSheet.create({
  header: {
    alignItems: 'center',
    paddingTop: 10,
    marginBottom: 10,
  },
  title: {
    fontFamily: Fonts.title,
    fontSize: 34,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontFamily: Fonts.body,
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 6,
    fontWeight: '500',
    paddingHorizontal: 40,
    lineHeight: 20,
  },
  accentLine: {
    width: 40,
    height: 4,
    backgroundColor: colors.primary,
    marginTop: 20,
    borderRadius: 2,
    opacity: 0.6,
  },
  accentLineBanned: {
    backgroundColor: colors.error,
  },
});
