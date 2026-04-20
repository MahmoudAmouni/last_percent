import { StyleSheet, Platform } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    justifyContent: 'space-between',
    paddingBottom: Platform.OS === 'ios' ? 40 : 20,
    paddingTop: 80,
  },
  brandContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 48,
    fontWeight: '900',
    color: colors.text,
    textAlign: 'center',
    letterSpacing: -2,
    lineHeight: 48,
    marginTop: 20,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
  highlight: {
    color: colors.primary,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 15,
    lineHeight: 24,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  loginButton: {
    marginTop: 10,
  },
});
