'use client';

import React from 'react';
import { useMutation } from '@tanstack/react-query';
import { generateChatResponse } from '@/utils/actions';
import { toast } from 'sonner';

const Chat = () => {
  const [text, setText] = React.useState('');
  const [messages, setMessages] = React.useState<any[]>([]);

  const { mutate, isPending } = useMutation({
    mutationFn: (query) => generateChatResponse([...messages, query]),
    onSuccess: (data) => {
      if (!data) {
        toast.error('Something went wrong');
        return;
      }
      setMessages((prev) => [...prev, data]);
    },
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // console.log(text);
    const query = { role: 'user', content: text };
    mutate(query);
    setMessages((prev) => [...prev, query]);
    setText('');
  };

  // console.log(messages);

  return (
    <div className="min-h-[calc(100vh-6rem)] grid grid-rows-[1fr,auto]">
      <div>
        {messages.map(({ role, content }, index) => {
          const avatar = role == 'user' ? '👤' : '🤖';
          const bgColor = role == 'user' ? 'bg-base-200' : 'bg-base-100';
          return (
            <div
              key={index}
              className={`${bgColor} flex py-6 -mx-8 px-8 text-md leading-loose border-b border-base-300`}
            >
              <span className="mr-4">{avatar}</span>
              <p className="max-w-7xl">{content}</p>
            </div>
          );
        })}
        {isPending ? <span className="loading mt-2"></span> : null}
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
          <button
            className="btn btn-primary join-item"
            type="submit"
            disabled={isPending}
          >
            {isPending ? 'please wait...' : 'Send'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
