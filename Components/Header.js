import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';




export default function Header({ title, onRightButtonPress, rightButtonText, showBackButton, onBackPress }) {
    
  const navigation = useNavigation();
  return (
      <View style={styles.headerContainer}>

        {/* Conditionally render the back button */}
        {showBackButton && (
          <Pressable onPress={onBackPress} style={styles.backButton}>
            <Ionicons 
              name="arrow-back" 
              size={24} color="white" 
              style={styles.backIcon} 
            />
          </Pressable>
        )}

        <Text style={styles.headerText}>{title}</Text>
        {rightButtonText && (
          <Pressable onPress={onRightButtonPress} style={styles.buttonContainer}>
            <Text style={styles.buttonText}>{rightButtonText}</Text>
          </Pressable>
        )}
      </View>
    );
  }

const styles = StyleSheet.create({
    headerContainer: {
        height: 80,
        backgroundColor: '#4B0082',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,


    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
        flex: 1,

    },
    buttonContainer: {
        position: 'absolute',
        right: 15,
        top: 20,
    },
    buttonText: {
        color: 'lightblue',
        fontSize: 16,
      },
    backButton: {
      position: 'absolute',
      left: 15,
      top: 20,
    },
    

})