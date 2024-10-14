// Components/ItemsList.js
import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { DataContext } from '../Context/DataContext';  // Import from Context/DataContext

// Define the ItemsList component which will display either activities or diet data
export default function ItemsList({type}) {
    // Access the activities and diet data from the DataContext
    const { activitiesData, dietData } = useContext(DataContext);
    // Choose data based on the type prop
    // If type is 'activities', display activitiesData
    // If type is 'diet', display dietData
    const data = type === 'activities' ? activitiesData : dietData;

    // Function to render each item in the FlatList
    // This function handles how each individual item (activity or meal) is displayed
    const renderItem = ({ item }) => (
      <View style={styles.itemContainer}>
        <View style={styles.leftSection}>
          <Text style={styles.itemTitle}>
            {type === 'activities' ? item.name : item.meal}
          </Text>
          {/* Render warning icon if it's a special activity */}
          {item.special && <Text style={styles.specialWarning}>⚠️</Text>}
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.dateText}>{item.date}</Text>
          <Text style={styles.durationText}>
            {type === 'activities' ? `${item.duration} min` : `${item.calories} cal`}
          </Text>
        </View>
      </View>
    );

    // Return a FlatList component to display the data
    return (
        <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        />
    );
    }

const styles = StyleSheet.create({
    itemContainer: {
      flexDirection: 'row',  // Arrange items in a row
      justifyContent: 'space-between',  // Space between the left and right section
      padding: 15,  // Padding inside each card
      backgroundColor: '#4C3F92',  // Background color for the card (dark purple)
      borderRadius: 10,  // Rounded corners for the card
      marginVertical: 10,  // Space between the cards
      marginHorizontal: 20,  // Space on the sides of the cards
      alignItems: 'center',  // Vertically center the content
      
    },

    leftSection: {
      flexDirection: 'row',  // Arrange title and warning icon horizontally
      alignItems: 'center',  // Vertically align the text and icon
    },
    itemTitle: {
      fontSize: 18,  // Larger font for the activity name or meal
      fontWeight: 'bold',  // Bold font for emphasis
      color: '#FFFFFF',  // White text
      marginRight: 10,  // Space between title and warning icon
    },
    specialWarning: {
      color: 'yellow',  // Yellow color for the warning icon
      fontSize: 18,  // Size of the warning icon
    },
    rightSection: {
      flexDirection: 'row',  // Arrange date and duration horizontally
      alignItems: 'center', 
      spaceBetween: 30,  // Space between the date and duration 
    },

    dateText: {
      backgroundColor: '#FFFFFF',  // White background for the duration
      color: '#4C3F92',  // Dark purple text color for the duration
      paddingVertical: 5,  // Padding above and below the text
      paddingHorizontal: 10,  // Padding left and right
      borderRadius: 5,  // Rounded corners for the duration box
      marginRight: 10,  // Space between the date and duration
    },
    durationText: {
      backgroundColor: '#FFFFFF',  // White background for the duration
      color: '#4C3F92',  // Dark purple text color for the duration
      paddingVertical: 5,  // Padding above and below the text
      paddingHorizontal: 10,  // Padding left and right
      borderRadius: 5,  // Rounded corners for the duration box
    },
})