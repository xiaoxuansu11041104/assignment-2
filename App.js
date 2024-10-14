import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './Navigation';
import { createContext, useState } from 'react';
import { DataProvider } from './Context/DataContext';
import { ThemeProvider } from './Context/ThemeContext';  

// Create the context
export const AppContext = createContext();


export default function App() {
  const [someState, setSomeState] = useState([]);

  return (
    // Wrap the entire app with DataProvider to provide the activities and diet data
    <ThemeProvider>
      <DataProvider>
        <NavigationContainer>
          <AppNavigation />
        </NavigationContainer>
      </DataProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
