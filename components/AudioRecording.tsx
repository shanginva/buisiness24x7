import { faMicrophone } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome"
import React from "react"
import { Pressable } from "react-native"
import { useRecording } from "../hooks/useRecording";
import { useSound } from "../hooks/useSound";

const AudioRecording = () => {
  const [startRecording, stopRecording] = useRecording();
  const [play] = useSound();

  const start = async () => {
    await startRecording();
  };

  const stop = async () => {
    const uri = await stopRecording();
    await play(uri);
  }

  return <Pressable onPressIn={start} onPressOut={stop} >
    <FontAwesomeIcon style={{ marginRight: 15 }} icon={faMicrophone} />
  </Pressable>
};

export default AudioRecording;