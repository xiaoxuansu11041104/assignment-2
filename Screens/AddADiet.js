import { StyleSheet, View, Button, Alert, ScrollView } from "react-native";
import React, { useContext, useState } from "react";
import Background from "../Components/Background";
import PrimaryText from "../Components/PrimaryText";
import ButtonArea from "../Components/ButtonArea";
import Input from "../Components/Input";
import DatePicker from "../Components/DatePicker";
import { DataContext } from "../Context/DataContext";
import CustomButton from '../Components/CustomButton';

export default function AddADiet({ navigation }) {
  // Access the addDiet function from the DataContext to add new diet entries
  const { addDiet } = useContext(DataContext);

  // State variables for storing input values
  const [description, setDescription] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState(null);

  // Function to validate input and add a new diet entry
  function handleSave() {
    if (!description || isNaN(calories) || calories <= 0 || !date) {
      Alert.alert("Invalid Input", "Please check your input values", [{ text: "OK" }]);
      return;
    } else {
      // Add the diet entry to context, marking it as special if calories > 800
      addDiet({
        description: description,
        calories: calories,
        date: date,
        isSpecial: calories > 800,
      });
      navigation.goBack(); // Navigate back to the previous screen after saving
    }
  }

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
            onPress={handleSave}
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
