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
  safeArea: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'ios' ? 0 : 20,
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
    position: 'relative',
    height: 180,
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 20,
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: -20,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
    marginBottom: 8,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 32,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 32,
  },
  forgotPasswordText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  loginButton: {
    marginTop: 10,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    paddingBottom: 10,
  },
  footerText: {
    color: colors.textSecondary,
    fontSize: 14,
  },
  registerText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '700',
  },
  errorText: {
    color: colors.error,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
  },
});
