'use server';
import OpenAI from 'openai';

const openai = new OpenAI();

export const generateChatResponse = async (chatMessages: any) => {
  try {
    // console.log(chatMessage);
    const response = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: 'you are a helpful assistant' },
        ...chatMessages,
      ],
      model: 'gpt-3.5-turbo',
      temperature: 0.1,
    });
    // console.log(response.choices[0].message);
    // console.log(response);
    return response.choices[0].message;
  } catch (error) {
    return null;
  }
};
