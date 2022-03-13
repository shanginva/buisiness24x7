import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import React, { useState } from 'react';
import { Pressable, StyleSheet, TextInput, Text, View } from 'react-native';

export type UserInputProps = {
  onSubmit: (message: string) => void;
};

const UserInput = ({ onSubmit }: UserInputProps) => {
  const [input, setInput] = React.useState('');
  return (
    <View style={styles.view}>
      <TextInput
        style={styles.input}
        value={input}
        onChangeText={setInput}
        placeholder="Type something"
      />
      <Pressable onPress={() => { onSubmit(input) }}>
        <FontAwesomeIcon style={{ margin: 3 }} icon={faArrowRight} />
      </Pressable>
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