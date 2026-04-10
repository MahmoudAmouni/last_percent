import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  statusCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 32,
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  statusDescription: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
    textAlign: 'center',
    lineHeight: 20,
  },
  suspendedCard: {
    borderColor: '#FF4D4D',
    borderWidth: 2,
    backgroundColor: 'rgba(255, 77, 77, 0.05)',
  },
  warningIconWrapper: {
    marginBottom: 10,
    alignItems: 'center',
  },
});
