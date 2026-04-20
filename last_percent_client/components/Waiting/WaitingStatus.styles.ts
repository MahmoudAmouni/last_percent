import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pulseContainer: {
    width: 280,
    height: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Radar/Sonar effect
  radarCircle: {
    position: 'absolute',
    width: 240,
    height: 240,
    borderRadius: 120,
    borderWidth: 1,
    borderColor: colors.primary,
    opacity: 0.1,
  },
  // Scanner line
  scannerLine: {
    position: 'absolute',
    width: 2,
    height: 120,
    backgroundColor: colors.primary,
    bottom: '50%',
    transformOrigin: 'bottom center',
  },
  statusContent: {
    alignItems: 'center',
    zIndex: 10,
  },
  searchingText: {
    fontSize: 10,
    fontWeight: '900',
    color: colors.primary,
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  mainStatus: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    textAlign: 'center',
    letterSpacing: -0.5,
  },
  subStatus: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 8,
    fontWeight: '500',
  },
  // HUD Accents
  cornerBracket: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: colors.primary,
    opacity: 0.5,
  },
});
