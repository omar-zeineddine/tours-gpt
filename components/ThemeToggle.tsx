'use client';

import React from 'react';
import { BsMoonFill, BsSunFill } from 'react-icons/bs';

const themes = {
  cupcake: 'cupcake',
  night: 'night',
};

const ThemeToggle = () => {
  const [theme, setTheme] = React.useState(themes.cupcake);

  const toggleTheme = () => {
    const newTheme = theme === themes.cupcake ? themes.night : themes.cupcake;
    document.documentElement.setAttribute('data-theme', newTheme);
    setTheme(newTheme);
  };
  return (
    <button className="btn btn-sm btn-outline" onClick={toggleTheme}>
      {theme === themes.cupcake ? (
        <BsMoonFill className="size-4" />
      ) : (
        <BsSunFill className="size-4" />
      )}
    </button>
  );
};

export default ThemeToggle;
