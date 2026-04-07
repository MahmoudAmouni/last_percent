import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
  content: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    paddingTop: height * 0.05,
    paddingBottom: height * 0.05,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 42,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: -1,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    lineHeight: 24,
    maxWidth: width * 0.7,
  },
  footer: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    marginBottom: 12,
  },
  terms: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 20,
    textAlign: 'center',
  },
});
