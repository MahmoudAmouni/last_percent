import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#FF4D4D',
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    color: '#FFF',
    fontSize: 16,
    lineHeight: 22,
  },
  timeText: {
    color: 'rgba(255, 255, 255, 0.4)',
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});
