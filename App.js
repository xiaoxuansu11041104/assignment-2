import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigation from './Navigation';
import { createContext, useState } from 'react';

// Create the context
export const AppContext = createContext();


export default function App() {
  const [someState, setSomeState] = useState([]);

  return (
    // Wrap the app with the Provider to share the state
    <AppContext.Provider value={{ someState, setSomeState }}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </AppContext.Provider>
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
