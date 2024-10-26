import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useContext } from "react";
import { ThemeContext } from "../Context/ThemeContext";
import { themes } from '../StyleHelper';
import Background from '../Components/Background';
import CustomButton from '../Components/CustomButton';

export default function Settings() {
  const { theme, setTheme } = useContext(ThemeContext);  // Access the current theme

  // Function to toggle the theme
  function toggleTheme() {
    setTheme((previousTheme) => (previousTheme === themes.light ? themes.dark : themes.light));
  }

  return (
    <Background>
      <View style={styles.container}>
        <CustomButton 
          title="Toggle Theme" 
          onPress={toggleTheme}
          style={{ backgroundColor: '#31367c', paddingHorizontal: 20 }} // Customize button appearance
        />
      </View>
    </Background>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})
