'use client';

import React from 'react';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';

const themes = {
  wireframe: 'wireframe',
  night: 'night',
};

const ThemeToggle = () => {
  const [theme, setTheme] = React.useState(themes.wireframe);

  const toggleTheme = () => {
    const newTheme =
      theme === themes.wireframe ? themes.night : themes.wireframe;
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };
  return (
    <button className="btn btn-sm btn-outline" onClick={toggleTheme}>
      {theme === themes.wireframe ? (
        <BsMoonFill className="size-4" />
      ) : (
        <BsSunFill className="size-4" />
      )}
    </button>
  );
};

export default ThemeToggle;
