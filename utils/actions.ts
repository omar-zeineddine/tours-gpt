'use server';
import OpenAI from 'openai';

const openai = new OpenAI();

export const generateChatResponse = async (chatMessage: any) => {
  // console.log(chatMessage);
  const response = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: 'you are a helpful assistant' },
      { role: 'user', content: chatMessage },
    ],
    model: 'gpt-3.5-turbo',
    temperature: 0.1,
  });
  console.log(response.choices[0].message);
  console.log(response);
  return 'awesome';
};
