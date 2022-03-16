
import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MessageView from './components/MessageView';
import UserInput from './components/UserInput';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import { useLanguage } from './hooks/useLanguage';

type Message = {
  text: string;
  type: 'incoming' | 'outgoing';
}

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [messages, setMessages] = useState<Message[]>([]);
  const { getAnswer } = useLanguage();

  const onSubmit = async (question: string) => {
    const result = await getAnswer(question);
    setMessages([...messages,
    { text: question, type: 'outgoing' },
    { text: result.answers[0].answer, type: 'incoming' }])
  };

  return (
    <View style={styles.center}>
      <ScrollView style={styles.scrollView}>
        {messages
          .map((message, index) => <MessageView key={index} message={message.text} type={message.type}></MessageView>)}
      </ScrollView>
      <UserInput onSubmit={onSubmit}></UserInput>
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
    marginHorizontal: 20
  }
});

export default App;
