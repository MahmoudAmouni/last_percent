import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
  mainVisual: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    width: '100%',
  },
  pulseWrapper: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 240,
  },
  // The "Pulse Core"
  core: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  coreInner: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Waveform container
  waveformContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 120,
    justifyContent: 'center',
  },
  // Data readouts
  dataRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 20,
    marginTop: 40,
  },
  dataBox: {
    alignItems: 'flex-start',
  },
  dataLabel: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 4,
  },
  dataValue: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -1,
  },
  dataUnit: {
    fontSize: 10,
    color: colors.primary,
    fontWeight: '700',
  },
  // HUD Elements
  hudLine: {
    position: 'absolute',
    width: 2,
    backgroundColor: colors.primary,
    opacity: 0.3,
  },
  percentageText: {
    fontSize: 16,
    fontWeight: '900',
    color: colors.text,
  },
  countdownText: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.error,
    textAlign: 'center',
  },
});
