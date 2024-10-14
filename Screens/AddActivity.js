import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, Alert, Platform, StyleSheet } from 'react-native';
import Header from '../Components/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataContext } from '../Context/DataContext';  // Import DataContext
import { Ionicons } from '@expo/vector-icons';

export default function AddActivity({ navigation }) {
  // State management
  const [activityType, setActivityType] = useState(null);
  const [date, setDate] = useState(new Date());
  const [duration, setDuration] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  // Dropdown state
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Walking', value: 'Walking' },
    { label: 'Running', value: 'Running' },
    { label: 'Swimming', value: 'Swimming' },
    { label: 'Weights', value: 'Weights' },
    { label: 'Yoga', value: 'Yoga' },
    { label: 'Cycling', value: 'Cycling' },
    { label: 'Hiking', value: 'Hiking' }
  ]);

  // Access context to save the new activity
  const { addActivity } = useContext(DataContext);

  // Handle date change
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date; // If selectedDate is undefined, keep the current date
    setDate(currentDate);
    if (selectedDate) { // Only close the DatePicker if a date has been selected
        setShowDatePicker(false);
    }
  };
  

  // Toggle DatePicker visibility
  const toggleDatePicker = () => {
    setShowDatePicker(current => {
        console.log("Toggling DatePicker from", current, "to", !current);  // This will log the current state and the new state
        return !current;
    });
};


  // Validate form and save activity
  const saveActivity = () => {
    // Basic validation
    if (!activityType) {
      Alert.alert('Validation Error', 'Please select an activity.');
      return;
    }
    if (!duration || isNaN(duration) || duration <= 0) {
      Alert.alert('Validation Error', 'Please enter a valid duration.');
      return;
    }

    // Check if the activity is special
    const isSpecial = (activityType === 'Running' || activityType === 'Weights') && duration > 60;

    // Create new activity entry
    const newActivity = {
      id: Math.random().toString(),  // Use a random ID for now
      name: activityType,
      date: date.toDateString(),
      duration: parseInt(duration),
      special: isSpecial,
    };

    // Add the activity to the context
    addActivity(newActivity);

    // Navigate back to the previous screen
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header 
          title="Add An Activity" 
          showBackButton={true}
        />
        <View style={styles.formContainer}>
            {/* Activity Dropdown */}
            <Text style={styles.label}>Activity *</Text>
            <View style={styles.dropdownContainer}>  
            <DropDownPicker
                open={open}
                value={activityType}
                items={items}
                setOpen={setOpen}
                setValue={setActivityType}
                setItems={setItems}
                placeholder="Select An Activity"
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownBox}
            />
            </View>

            {/* Duration Input */}
            <Text style={styles.label}>Duration (min) *</Text>
            <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={duration}
            onChangeText={setDuration}
            placeholder="Enter duration in minutes"
            />

            {/* Date Picker */}
            <Text style={styles.label}>Date *</Text>
            <Pressable onPress={toggleDatePicker}>
              <TextInput
                  style={styles.input}
                  value={date.toDateString()}  // Show the date in the input
                  editable={false}  // Make the TextInput non-editable, trigger date picker on press
              />
            </Pressable>

            {showDatePicker && (
            console.log("Rendering DateTimePicker with date:", date),
            <DateTimePicker
                value={date}
                mode="date"
                display={Platform.OS === 'ios' ? 'inline' : 'default'}  // Use inline for iOS, default for Android
                onChange={onChangeDate}
                style={styles.datePicker}
            />
            )}
        </View>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <Pressable style={styles.button} onPress={() => navigation.goBack()}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
          <Pressable style={styles.button} onPress={saveActivity}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#C4B0E2',  // Light purple background
  },
  container: {
    flex: 1,
    paddingTop: 10,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'flex-start',  // Align items from the top
    marginBottom: 20,  // Add some margin below the container
    marginTop: 20,
    marginHorizontal: 20,  // Add margin on the sides
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: 'purple',  // Purple label text
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,  // Space between the icon and title
  },
  dropdownContainer: {
    width: '100%',  // Control the dropdown width
    marginBottom: 20,
    zIndex: 10,  // Ensure dropdown appears above other fields
  },
  dropdown: {
    backgroundColor: '#fff',  // White background
    borderColor: '#A1A1A1',  // Light gray border
  },
  dropdownBox: {
    backgroundColor: '#fff',
    zIndex: 10,  // Ensure the dropdown box appears on top
  },
  input: {
    borderWidth: 1,
    borderColor: '#A1A1A1',  // Light gray border color for inputs
    borderRadius: 5,
    padding: 12,  // Adjust padding for inputs
    marginBottom: 20,
    backgroundColor: '#fff',
    color: '#4C3F92',  // Dark text color
  },
  datePicker: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginHorizontal: 20,
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
});
