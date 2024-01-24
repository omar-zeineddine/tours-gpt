'use client';
import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { generateChatResponse } from '@/utils/actions';

const Chat = () => {
  const [text, setText] = React.useState('');
  const [messages, setMessages] = React.useState([]);

  const { mutate } = useMutation({
    mutationFn: (message) => generateChatResponse(message),
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log(text);
    mutate(text);
  };

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        <h2 className="text-2xl">Messages</h2>
      </div>
      <form onSubmit={handleSubmit} className="max-w-4xl pt-12">
        <div className="join w-full">
          <input
            type="text"
            placeholder="Tours GPT"
            className="input input-bordered join-item w-full"
            value={text}
            required
            onChange={(e) => setText(e.target.value)}
          />
          <button className="btn btn-primary join-item" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
