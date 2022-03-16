import { Audio } from 'expo-av';
import React from 'react';

export const useSound = (): [(uri: string) => Promise<void>] => {
  const [sound, setSound] = React.useState<Audio.Sound>();

  React.useEffect(() => {
    return sound
      ? () => { sound.unloadAsync(); }
      : undefined;
  }, [sound]);

  const play = async (uri: string): Promise<void> => {
    const { sound, status } = await Audio.Sound.createAsync({ uri });
    setSound(sound);
    await sound.playAsync();
  };

  return [play]
}