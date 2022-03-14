import { Text, StyleSheet, View } from 'react-native';

export type MessageViewProps = {
  message: string;
  type: 'incoming' | 'outgoing';
}

const MessageView = ({ message, type }: MessageViewProps) => {
  const textAlign = type === 'incoming' ? 'left' : 'right';
  return (<View>
    <Text style={{ ...styles.text, textAlign }}>{message}</Text>
  </View>);
};

const styles = StyleSheet.create({
  text: {
    borderColor: 'grey',
    borderWidth: 1,
    backgroundColor: 'deepskyblue',
    textAlign: 'right',
    margin: 2,
    padding: 2,
    borderRadius: 4,
    opacity: 0.7
  }
});

export default MessageView;