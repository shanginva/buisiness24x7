import { Text, StyleSheet, View } from 'react-native';

export type MessageViewProps = {
  message: string;
  type: 'incoming' | 'outgoing';
}

const MessageView = ({ message, type }: MessageViewProps) => {
  return (<View style={styles.view}>
    <Text style={styles.text}>{message}</Text>
  </View >);
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'column',
    alignContent: 'flex-start'
  },
  text: {
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'deepskyblue',
    textAlign: 'right',
    fontSize: 10,
    margin: 2,
    padding: 10,
    borderRadius: 4,
    opacity: 0.7
  }
});

export default MessageView;