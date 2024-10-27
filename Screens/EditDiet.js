import { StyleSheet, View, Button, Alert, ScrollView } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import Background from "../Components/Background";
import PrimaryText from "../Components/MainText";
import ButtonArea from "../Components/ButtonArea";
import Input from "../Components/Input";
import DatePicker from "../Components/DateStyle";
import { DataContext } from "../Context/DataContext";
import CustomButton from '../Components/CustomButton';
import { writeToDB } from '../Components/Firebase/firestoreHelper';
import { updateDB, deleteFromDB } from '../Components/Firebase/firestoreHelper';
import { useRoute, useNavigation } from '@react-navigation/native';



// Define collection name in Firestore
const collectionName = "diets";

export default function EditDiet() {
  const route = useRoute();
  const navigation = useNavigation();
  const { item } = route.params; // Get the existing item passed via props

  // State variables for storing input values
  const [description, setDescription] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState(null);

  // Populate initial state with the existing data
  useEffect(() => {
    if (item) {
      setDescription(item.description);
      setCalories(item.calories.toString()); // Convert calories to string for Input
      setDate(item.date ? new Date(item.date) : null); // Ensure date is a JavaScript Date object
    }
  }, [item]);

  // Add useEffect to pass delete function to the header
  useEffect(() => {
    if (item) {
      // Pass delete function to header
      navigation.setParams({ deleteDiet });
    }
  }, [item]);


  
  async function saveDiet() {
    if (!description || isNaN(calories) || calories <= 0 || !date) {
      Alert.alert("Invalid Input", "Please check your input values", [{ text: "OK" }]);
      return;
    }

    const updatedDiet = {
      description: description,
      calories: parseInt(calories, 10),
      date: date,
      isSpecial: parseInt(calories, 10) > 800,
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
            await updateDB(item.id, updatedDiet, collectionName);
            Alert.alert("Success", "Diet updated successfully", [{ text: "OK", onPress: () => navigation.goBack() }]);
          },
        },
      ]
    );
  }

  async function deleteDiet() {
    // Confirm before deleting
    Alert.alert("Confirm Delete", "Are you sure you want to delete this diet entry?", [
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

  // // Function to validate input and add a new diet entry
  // function handleSave() {
  //   if (!description || isNaN(calories) || calories <= 0 || !date) {
  //     Alert.alert("Invalid Input", "Please check your input values", [{ text: "OK" }]);
  //     return;
  //   } else {
  //     // Add the diet entry to context, marking it as special if calories > 800
  //     addDiet({
  //       description: description,
  //       calories: calories,
  //       date: date,
  //       isSpecial: calories > 800,
  //     });
  //     navigation.goBack(); // Navigate back to the previous screen after saving
  //   }
  // }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Background>
        <PrimaryText>Description *</PrimaryText>
        <Input
          onChangeText={(description) => setDescription(description)}
          value={description}
          style={{ height: 100 }}
          multiline={true}
        />

        <PrimaryText>Calories *</PrimaryText>
        <Input
          onChangeText={(calories) => setCalories(calories)}
          value={calories}
        />

        <PrimaryText>Date *</PrimaryText>
        <DatePicker
          value={date}
          initialValue={item.date ? new Date(item.date) : null}
          onChange={(newDate) => setDate(newDate)}
        />

        {/* Button Area to either cancel or save the diet entry */}
        <ButtonArea>
          <CustomButton
            title="Cancel"
            onPress={() => navigation.goBack()}
            style={{ backgroundColor: '#31367c', paddingHorizontal: 20 }} // Customize button appearance
          />
          <CustomButton
            title="Save"
            onPress={saveDiet}
            style={{ backgroundColor: '#31367c', paddingHorizontal: 20 }} // Customize button appearance
          />  
        </ButtonArea>
      </Background>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
});
