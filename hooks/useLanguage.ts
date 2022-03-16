import axios from "axios";

const baseUrl = 'https://buisiness24x7.cognitiveservices.azure.com/language/:query-knowledgebases?projectName=Buisiness24x7&api-version=2021-10-01&deploymentName=production';
const subscriptionKey = '470a875b63a542eaa5f0e69fb8d7b70c';
const config = {
  headers: {
    'Ocp-Apim-Subscription-Key': subscriptionKey,
    'Content-Type': 'application/json'
  }
}

export const useLanguage = (): { getAnswer: (question: string) => Promise<Answers> } => {

  const getAnswer = async (quesion: string): Promise<Answers> => {
    const body = {
      top: 3,
      question: quesion,
      includeUnstructuredSources: true,
      confidenceScoreThreshold: 0.7,
      answerSpanRequest: {
        enable: true,
        topAnswersWithSpan: 1,
        confidenceScoreThreshold: 0.7
      }
    };
    return (await axios.post<Answers>(baseUrl, body, config)).data;
  };

  return { getAnswer }
};

export type Prompt = {
  displayOrder: number,
  displayText: string,
  qnaId: number
};

export type Dialog = {
  isContextOnly: boolean,
  prompts: Prompt[]
}

export type Answer = {
  answer: string,
  confidenceScore: number,
  dialog: Dialog
};

export type Answers = {
  answers: Answer[]
}