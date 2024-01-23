import React from 'react';
import ThemeToggle from '@/components/ThemeToggle';
import { SiOpenaigym } from 'react-icons/si';

const SidebarHeader = () => {
  return (
    <div className="flex items-center mb-4 gap-4 px-4">
      <SiOpenaigym className="size-10 text-blue-500" />
      <h2 className="text-xl font-bold text-primary">GPT - Genius</h2>
      <ThemeToggle />
    </div>
  );
};

export default SidebarHeader;
