import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import AudioRecording from './AudioRecording';
import * as FileSystem from 'expo-file-system';
import { useSound } from '../hooks/useSound';
import { useSpeech } from '../hooks/useSpeech';

export type UserInputProps = {
  onSubmit: (message: string) => void;
};

const UserInput = ({ onSubmit }: UserInputProps) => {
  const [input, setInput] = React.useState('');
  const [play] = useSound();
  const { textToSpeech } = useSpeech();

  const onSave = async () => {
    if (input === '') {
      return;
    }
    onSubmit(input);
    const soundData = await textToSpeech(input);
    const fileUri = `${FileSystem.documentDirectory}/tmp.mp3`;
    console.log(fileUri);
    await FileSystem.writeAsStringAsync(fileUri, soundData, { encoding: FileSystem.EncodingType.Base64 });
    await play(fileUri);
    setInput('');
  };


  return (
    <View style={{ ...styles.view }}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        onSubmitEditing={onSave}
        placeholder="Задайте вопрос"
      />
      {input
        ? <Pressable onPress={onSave}>
          <FontAwesomeIcon style={{ marginRight: 15 }} icon={faPaperPlane} />
        </Pressable>
        : <AudioRecording />}
    </View>);
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 0,
    padding: 10,
    flex: 1
  },
  view: {
    flexDirection: 'row',
    alignContent: 'stretch',
    alignItems: 'center'
  }
});

export default UserInput;