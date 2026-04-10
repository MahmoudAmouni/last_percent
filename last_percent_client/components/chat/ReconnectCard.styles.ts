import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  reconnectCard: {
    backgroundColor: '#1A0B0B',
    margin: 20,
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderBottomWidth: 3,
    borderColor: 'rgba(255, 77, 77, 0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 10,
  },
  reconnectHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reconnectIcon: {
    marginRight: 8,
  },
  reconnectTitle: {
    color: '#FF4D4D',
    fontSize: 18,
    fontWeight: '800',
    letterSpacing: -0.5,
  },
  reconnectSubtitle: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 24,
  },
  reconnectActions: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryCardButton: {
    flex: 1,
    backgroundColor: '#FF4D4D',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  primaryCardButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '700',
  },
  secondaryCardButton: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
  },
  secondaryCardButtonText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    fontWeight: '600',
  },
});
