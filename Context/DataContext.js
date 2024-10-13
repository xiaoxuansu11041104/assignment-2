import React, { createContext, useState } from 'react';

// Create the context
export const DataContext = createContext();

// Create a provider component
export function DataProvider({ children }) {
    // Shared state for activities and diet data
    const [activitiesData, setActivitiesData] = useState([]);

    // Function to add a new activity
    const addActivity = (newActivity) => {
        setActivitiesData([...activitiesData, newActivity]);
    };

    const contextValue = {
        activitiesData,
        addActivity,  // Provide the function to add new activities
    };

    return (
        <DataContext.Provider value={contextValue}>
            {children}
        </DataContext.Provider>
    );
}
