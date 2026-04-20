import { StyleSheet } from 'react-native';

export const createStyles = (colors: any) => StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    marginTop: -40,
  },
  iconContainer: {
    marginBottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.error,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  timerContainer: {
    backgroundColor: `${colors.error}14`, // 0.08 opacity in hex is approx 14
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: `${colors.error}26`, // 0.15 opacity in hex is approx 26
  },
  timerText: {
    fontSize: 32,
    fontWeight: '700',
    color: colors.error,
    fontVariant: ['tabular-nums'],
  },
  timerLabel: {
    fontSize: 12,
    color: `${colors.error}66`, // 0.4 opacity in hex is approx 66
    textAlign: 'center',
    marginTop: 4,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
