// src/contexts/ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const getInitialTheme = () => {
        const storedTheme = localStorage.getItem('theme');
        console.log('Stored Theme:', storedTheme);
        if (storedTheme) {
          return storedTheme;
        }
      
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        console.log('Prefers Dark:', prefersDark);
        return prefersDark ? 'dark' : 'light';
      };
      

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    console.log('Current Theme:', theme);
    document.body.classList.toggle('dark-mode', theme === 'dark');
    localStorage.setItem('theme', theme);
  }, [theme]);
  

  const toggleTheme = () => {
    setTheme((curr) => (curr === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
