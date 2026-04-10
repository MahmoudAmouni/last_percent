import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainVisual: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  batteryWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  glowCircle: {
    position: 'absolute',
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: '#FF4D4D',
    opacity: 0.15,
  },
  percentageText: {
    fontSize: 72,
    fontWeight: '900',
    color: '#FFF',
    position: 'absolute',
    zIndex: 10,
  },
  countdownText: {
    fontSize: 48,
    fontWeight: '900',
    color: '#FF4D4D',
    textAlign: 'center',
    marginVertical: 10,
    fontVariant: ['tabular-nums'],
  },
});
