import { StyleSheet, Text, View, Pressable, Alert, TextInput, FlatList } from 'react-native'
import Header from '../Components/Header';
import React, { useState, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataContext } from '../Context/DataContext';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';



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
    <SafeAreaView style={styles.safeArea}>
      {/* Header with Back Button */}
      <Header 
        title="Add A Diet Entry" 
        showBackButton={true}
        onBackPress={() => navigation.goBack()}
      />

      <View style={styles.container}>
        <View style={styles.formContainer}>
          {/* Description Input */}
          <Text style={styles.label}>Description *</Text>
          <TextInput
            style={styles.inputLarge}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter meal description"
            multiline={true}  // Allow multiple lines for description
          />

          {/* Calories Input */}
          <Text style={styles.label}>Calories *</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={calories}
            onChangeText={setCalories}
            placeholder="Enter calories"
          />

          {/* Date Picker */}
          <Text style={styles.label}>Date *</Text>
          <Pressable onPress={toggleDatePicker}>
            <TextInput
              style={styles.input}
              value={date.toDateString()}  // Show the selected date
              editable={false}  // Prevent editing the date directly
            />
          </Pressable>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === 'ios' ? 'inline' : 'default'}
              onChange={onChangeDate}
            />
          )}
        </View>
      
        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={saveDietEntry}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#D8BFD8',
  },
  container: {
    flex: 1,
    padding: 20,
    
  },
  formContainer: {
    flex: 1,
    marginBottom: 20,
    margin: 10,
    
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#4C3F92',  // Dark text color
  },
  inputLarge: {
    borderWidth: 1,
    borderColor: '#A1A1A1',  // Light gray border
    borderRadius: 5,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
    height: 100,  // Larger height for multiline input
    textAlignVertical: 'top',  // Align text to the top in multiline
  },
  input: {
    borderWidth: 1,
    borderColor: '#A1A1A1',  // Light gray border
    borderRadius: 5,
    padding: 12,
    marginBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonText: {
    color: '#3C6FD7',  // Blue text color for buttons
    fontSize: 16,
    fontWeight: 'bold',
  },
})