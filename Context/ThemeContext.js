import React, { createContext, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Define the light and dark theme styles
const lightTheme = {
  backgroundColor: '#D8BFD8',
  textColor: '#000000',
};

const darkTheme = {
  backgroundColor: '#4C3F92',
  textColor: '#FFFFFF',
};

// Create the ThemeContext
export const ThemeContext = createContext();

// ThemeProvider component to manage the theme state
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(lightTheme);

  // Function to toggle the theme between light and dark
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === lightTheme ? darkTheme : lightTheme));
  };

  // Provide the theme and the toggle function to the rest of the app
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
