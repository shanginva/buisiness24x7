import axios from "axios";
import { Buffer } from 'buffer';

const speechToTextUrl = 'https://westeurope.stt.speech.microsoft.com/speech/recognition/conversation/cognitiveservices/v1?language=ru-RU';
const textToSpeechUrl = 'https://westeurope.tts.speech.microsoft.com/cognitiveservices/v1';
const subscriptionKey = '41ea2917700241c98385acad1f25ef47';

export const useSpeech = (): {
  speechToText: (data: string) => Promise<string>,
  textToSpeech: (text: string) => Promise<string>
} => {
  const speechToText = async (data: string): Promise<string> => {
    const result = (await axios({
      method: "post",
      url: speechToTextUrl,
      data: data,
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'audio/wav'
      }
    })).data;
    return result;
  };

  const textToSpeech = async (
    text: string,
    language: string = 'ru-RU',
    speaker: string = 'ru-RU-DmitryNeural'): Promise<string> => {
    const result = (await axios({
      method: "post",
      url: textToSpeechUrl,
      data: `<speak version='1.0' xml:lang='${language}'>
                <voice xml:lang='${language}' xml:gender='Male' name='${speaker}'>
                    ${text}
                </voice>
            </speak>`,
      headers: {
        'Ocp-Apim-Subscription-Key': subscriptionKey,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-16khz-128kbitrate-mono-mp3'
      },
      responseType: 'arraybuffer'
    })).data;
    const buff = Buffer.from(result, 'base64')
    return buff.toString('base64')
  };

  return { textToSpeech, speechToText };
}