import { StyleSheet, View, Button, Alert } from 'react-native';
import React, { useContext, useState } from 'react';
import Background from '../Components/Background';
import PrimaryText from '../Components/PrimaryText';
import ButtonArea from '../Components/ButtonArea';
import Input from '../Components/Input';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from '../Components/DatePicker';
import { DataContext } from '../Context/DataContext';
import CustomButton from '../Components/CustomButton';

export default function AddAnActivity({ navigation }) {
  // Accessing the addActivity function from DataContext to add a new activity entry
  const { addActivity } = useContext(DataContext);

  // State variables to store user inputs for activity details
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(null);
  
  // Dropdown picker state for selecting activity type
  const [open, setOpen] = useState(false);
  const [activity, setActivity] = useState(null);
  const [items, setItems] = useState([
    { label: "Walking", value: "Walking" },
    { label: "Running", value: "Running" },
    { label: "Swimming", value: "Swimming" },
    { label: "Weights", value: "Weights" },
    { label: "Yoga", value: "Yoga" },
    { label: "Cycling", value: "Cycling" },
    { label: "Hiking", value: "Hiking" },
  ]);

  // Save function to validate input and add a new activity entry
  function saveActivity() {
    if (!activity || isNaN(duration) || duration <= 0 || !date) {
      // Alert the user if input values are invalid
      Alert.alert("Invalid Input", "Please check your input values", [{ text: "OK" }]);
      return;
    } else {
      // Add the new activity with isSpecial property based on criteria
      addActivity({
        activity: activity,
        duration: duration,
        date: date,
        isSpecial: (activity === 'Running' || activity === 'Weights') && duration > 60,
      });
      navigation.goBack(); // Navigate back to the previous screen after saving
    }
  }

  return (
    <Background>
      <PrimaryText>Activity *</PrimaryText>
      <DropDownPicker
        open={open}
        value={activity}
        items={items}
        setOpen={setOpen}
        setValue={setActivity}
        setItems={setItems}
        placeholder="Select An Activity"
        style={styles.dropDownContainer}
        textStyle={styles.dropDownText}
        placeholderStyle={styles.dropDownText}
      />

      <PrimaryText>Duration (min) *</PrimaryText>
      <Input
        onChangeText={(duration) => setDuration(duration)}
        value={duration}
      />

      <PrimaryText>Date *</PrimaryText>
      <DatePicker
        value={date}
        onChange={(newDate) => setDate(newDate)}
        display="default"
      />

      {/* Button area to either save the activity or cancel and go back */}
      <ButtonArea>
      <CustomButton
          title="Cancel"
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: '#007bff', paddingHorizontal: 20 }} // Customize button appearance
        />
        <CustomButton
          title="Save"
          onPress={saveActivity}
          style={{ backgroundColor: '#007bff', paddingHorizontal: 20 }} // Customize button appearance
        />  
      </ButtonArea>
    </Background>
  );
}

const styles = StyleSheet.create({
  dropDownContainer: {
    borderColor: '#31367c',
    borderWidth: 2,
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: 'lightgrey',
  },
  dropDownText: {
    fontSize: 18,
    color: '#31367c',
  },
});
