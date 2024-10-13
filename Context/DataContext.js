import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useState } from 'react';

// Create the context
export const DataContext = createContext();

// Create a provider component
export function DataProvider({ children }) {
    // Shared state for activities and diet data
    const [activitiesData, setActivitiesData] = useState([
      { id: '1', name: 'Running', date: '2024-10-10', duration: 60, special: false },
    ]);
  
    const [dietData, setDietData] = useState([
      { id: '1', meal: 'Breakfast', calories: 500 },
      { id: '2', meal: 'Lunch', calories: 900 },
    ]);
  
    // Function to add a new activity
    const addActivity = (newActivity) => {
      setActivitiesData([...activitiesData, newActivity]);
    };
  
    const contextValue = {
      activitiesData,
      dietData,
      addActivity, // Provide the function to add new activities
    };
  
    return (
      <DataContext.Provider value={contextValue}>
        {children}
      </DataContext.Provider>
    );
  }