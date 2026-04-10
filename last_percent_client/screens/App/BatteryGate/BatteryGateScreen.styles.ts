import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    width: '100%',
    maxWidth: Platform.OS === 'web' ? 440 : '100%',
    alignSelf: 'center',
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
    paddingHorizontal: 24,
    justifyContent: 'space-between',
    paddingBottom: 40,
    paddingTop: Platform.OS === 'ios' ? 20 : 40,
  },
  footer: {
    width: '100%',
  },
  debugToggle: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
  },
  debugToggleText: {
    color: 'rgba(255, 255, 255, 0.3)',
    fontSize: 10,
  },
});
