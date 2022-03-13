
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import UserInput from './components/UserInput';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "stretch"
  },
  scrollView: {
    flex: 1,
    marginHorizontal: 20,
  },
  text: {
    borderColor: 'black',
    borderWidth: 1,
    textAlign: 'right'
  }
});

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [messages, setMessages] = useState(['Hello', 'How are you?', 'What\'s up?', 'Let\'s meet?']);

  return (
    <View style={styles.center}>
      <ScrollView style={styles.scrollView}>
        {messages
          .map((message, index) => <Text key={index}>{message}</Text>)}
      </ScrollView>
      <UserInput onSubmit={message => setMessages([...messages, message])}></UserInput>
    </View>
  );
};

export default App;

