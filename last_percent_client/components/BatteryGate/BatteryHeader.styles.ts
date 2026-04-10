import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    marginTop: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: '900',
    color: '#FFF',
    letterSpacing: -1,
    textAlign: 'center',
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.5)',
    textAlign: 'center',
    marginTop: 8,
    fontFamily: Platform.select({ ios: 'System', android: 'Roboto' }),
  },
});
