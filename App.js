import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import { ThemeContext } from './Context/ThemeContext';
import { DataProvider } from './Context/DataContext';
import { themes } from './StyleHelper';
import AppNavigation from './Navigation';

export default function App() {
  const [theme, setTheme] = useState(themes.light); // Default to light theme

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>  
      <DataProvider>
        <NavigationContainer>
          <AppNavigation />
          <StatusBar style="auto" />
        </NavigationContainer>
      </DataProvider>
    </ThemeContext.Provider>
  );
}
