import { StyleSheet, Text, View, Pressable, Alert } from 'react-native'
import React from 'react'
import Header from '../Components/Header';
import React, { useState, useContext } from 'react';


export default function AddDiet({ navigation }) {

  // State management
  const [description, setDescription] = useState('');
  const [calories, setCalories] = useState('');
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Access context to save the new diet entry
  const { addDietEntry } = useContext(DataContext);

  // Handle date change
  const onChangeDate = (event, selectedDate) => {
    if (selectedDate) {
      setDate(selectedDate);  // Update the date state only if a date is selected
    }
    setShowDatePicker(false);  // Close the DatePicker after selecting a date
  };

  // Toggle DatePicker visibility
  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  // Validate form and save the diet entry
  const saveDietEntry = () => {
    // Validation
    if (!description) {
      Alert.alert('Validation Error', 'Please enter a description.');
      return;
    }
    if (!calories || isNaN(calories) || parseInt(calories) <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid number of calories.');
      return;
    }

    // Check if the diet entry is special
    const isSpecial = parseInt(calories) > 800;

    // Create new diet entry
    const newDietEntry = {
      id: Math.random().toString(),
      meal: description,
      calories: parseInt(calories),
      date: date.toDateString(),
      special: isSpecial,
    };

    // Add the diet entry to the context
    addDietEntry(newDietEntry);

    // Navigate back to the previous screen
    navigation.goBack();
  };

  return (
    <View>
      <Text>AddDiet</Text>
    </View>
  )
}

const styles = StyleSheet.create({})