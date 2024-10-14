import React, { createContext, useState } from 'react';

// Create the context
export const DataContext = createContext();


// Create a provider component
export function DataProvider({ children }) {
    // Shared state for activities and diet data
    const [activitiesData, setActivitiesData] = useState([]);
    const [dietData, setDietData] = useState([]);

    // Function to add a new activity
    const addActivity = (newActivity) => {
        setActivitiesData([...activitiesData, newActivity]);
    };

    const contextValue = {
        activitiesData,
        dietData, // Provide the diet data as part of the context
        addActivity,  // Provide the function to add new activities
        addDietEntry,  // Provide the function to add new diet entries
    };

    // Function to add a new diet entry
    const addDietEntry = (newDietEntry) => {
        setDietData([...dietData, newDietEntry]);
    };

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
}
