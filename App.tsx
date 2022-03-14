
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import MessageView from './components/MessageView';
import UserInput from './components/UserInput';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';

type Message = {
  text: string;
  type: 'incoming' | 'outgoing';
}

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Hello', type: 'incoming' },
    { text: 'How are you?', type: 'outgoing' },
    { text: 'What\'s up?', type: 'incoming' },
    { text: 'Let\'s meet?', type: 'outgoing' }]);

  return (
    <View style={styles.center}>
      <ScrollView style={styles.scrollView}>
        {messages
          .map((message, index) => <MessageView key={index} message={message.text} type={message.type}></MessageView>)}
      </ScrollView>
      <UserInput onSubmit={message => setMessages([...messages, { text: message, type: 'outgoing' }])}></UserInput>
    </View>
  );
};

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "stretch"
  },
  scrollView: {
    marginTop: 30,
    flex: 1,
    marginHorizontal: 20,
  }
});

export default App;
