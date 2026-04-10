import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF4D4D',
    shadowColor: '#FF4D4D',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    shadowOpacity: 0,
    elevation: 0,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFF',
    letterSpacing: 1,
  },
  buttonTextDisabled: {
    color: 'rgba(255, 255, 255, 0.3)',
  },
});
