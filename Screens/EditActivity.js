import { StyleSheet, View, Alert, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import Background from '../Components/Background';
import PrimaryText from '../Components/MainText';
import ButtonArea from '../Components/ButtonArea';
import Input from '../Components/Input';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from '../Components/DateStyle';
import CustomButton from '../Components/CustomButton';
import { updateDB, deleteFromDB } from '../Components/Firebase/firestoreHelper';
import { useRoute, useNavigation } from '@react-navigation/native';
import Checkbox from 'expo-checkbox';

// Define collection name in Firestore
const collectionName = "activities";

export default function EditActivity() {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params; // Get the existing item passed via props

  // State variables to store user inputs for activity details
  const [duration, setDuration] = useState("");
  const [date, setDate] = useState(null);
  const [isChecked, setIsChecked] = useState(false); // Checkbox state
  
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

  // Populate initial state with the existing data
  useEffect(() => {
    if (item) {
      // console.log("Original date from item:", item.date);
      setActivity(item.activity);
      setDuration(item.duration.toString()); // Convert duration to string for Input
      setDate(item.date ? new Date(item.date) : null); // Ensure date is a JavaScript Date object
      setIsChecked(!item.isSpecial); // Set checkbox state based on `isSpecial` value
    }
  }, [item]);

  // Add useEffect to pass delete function to the header
  useEffect(() => {
    if (item) {
      // Pass delete function to header
      navigation.setParams({ deleteActivity });
    }
  }, [item]);

  async function saveActivity() {
    if (!activity || isNaN(duration) || duration <= 0 || !date) {
      Alert.alert("Invalid Input", "Please check your input values", [{ text: "OK" }]);
      return;
    }

    const updatedActivity = {
      activity: activity,
      duration: parseInt(duration, 10),
      date: date,
      isSpecial: (activity === 'Running' || activity === 'Weights') && parseInt(duration, 10) > 60,
    };

    // Confirm before saving changes
    Alert.alert(
      "Important",
      "Are you sure you want to save these changes?",
      [
        {
          text: "No",
          onPress: () => console.log("User canceled save"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            await updateDB(item.id, updatedActivity, collectionName);
            Alert.alert("Success", "Activity updated successfully", [{ text: "OK", onPress: () => navigation.goBack() }]);
          },
        },
      ]
    );
  }

  async function deleteActivity() {
    // Confirm before deleting
    Alert.alert("Confirm Delete", "Are you sure you want to delete this activity?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          await deleteFromDB(item.id, collectionName);
          navigation.goBack(); // Navigate back after deleting
        }
      }
    ]);
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
        initialValue={item.date ? new Date(item.date) : null}
        onChange={(newDate) => setDate(newDate)}
        display="default"
      />

      {/* Show checkbox only if the activity is special */}
      {item.isSpecial && (
        <View style={styles.checkboxContainer}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setIsChecked}
            color={isChecked ? '#31367c' : undefined} // Custom color for checked state
          />
          <Text style={styles.checkboxText}>
            This item is marked as special. Select the checkbox if you would like to approve it.
          </Text>
        </View>
      )}

      {/* Button area to either save the activity or cancel and go back */}
      <ButtonArea>
        <CustomButton
          title="Cancel"
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: '#31367c', paddingHorizontal: 20 }} // Customize button appearance
        />
        <CustomButton
          title="Save"
          onPress={saveActivity}
          style={{ backgroundColor: '#31367c', paddingHorizontal: 20 }} // Customize button appearance
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkbox: {
    margin: 8,
  },
  checkboxText: {
    fontSize: 15,
    color: '#31367c',
  
  },
});
