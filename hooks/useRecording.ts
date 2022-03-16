import { Audio } from "expo-av";
import React from "react";

export const useRecording = (): [() => Promise<void>, () => Promise<string>] => {
  const [recording, setRecording] = React.useState<Audio.Recording>();

  const startRecording = async (): Promise<void> => {
    if (recording) { return; }
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true
      });
      const { recording } = await Audio.Recording.createAsync(
        Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
      );
      setRecording(recording);
    }
    catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async (): Promise<string> => {
    if (!recording) { throw new Error('Recording is not started') }
    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    if (!uri) { throw new Error('Cannot get recording url') }
    setRecording(undefined);
    return uri;
  };

  return [startRecording, stopRecording];
};