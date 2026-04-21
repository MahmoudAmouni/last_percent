import { StyleSheet } from 'react-native';
import { Fonts } from '@/constants/theme';

export const createStyles = (colors: any) => StyleSheet.create({
  mainVisual: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingVertical: 40,
  },
  batteryWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 140,
    height: 240,
  },
  // The Vertical Battery Body
  batteryBody: {
    width: 120,
    height: 200,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: colors.text,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
  },
  batteryCap: {
    width: 50,
    height: 12,
    backgroundColor: colors.text,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    marginBottom: -2,
    zIndex: 2,
  },
  batteryLevel: {
    width: '100%',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  contentContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  percentageText: {
    fontFamily: Fonts.title,
    fontSize: 36,
    fontWeight: '900',
    color: colors.text,
    marginTop: 8,
  },
  statusText: {
    fontFamily: Fonts.body,
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 24,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
