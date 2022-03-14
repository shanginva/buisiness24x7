import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

export type UserInputProps = {
  onSubmit: (message: string) => void;
};

const UserInput = ({ onSubmit }: UserInputProps) => {
  const [input, setInput] = React.useState('');

  const onSave = () => {
    if (input === '') {
      return;
    }
    onSubmit(input);
    setInput('');
  };

  return (
    <View style={{ ...styles.view }}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        onSubmitEditing={onSave}
        placeholder="Type something"
      />
      {!!input &&
        <Pressable onPress={onSave}>
          <FontAwesomeIcon style={{ marginRight: 15 }} icon={faPaperPlane} />
        </Pressable>}
    </View>);
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
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