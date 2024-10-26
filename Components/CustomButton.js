import React from 'react';
import { Pressable, Text, StyleSheet, View, Platform } from 'react-native';

export default function CustomButton({ title, onPress, style, textStyle }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed ? styles.pressed : null, // Apply pressed state style for iOS
        style, // Allow custom styles to be passed
      ]}
      android_ripple={{ color: '#ccc' }} // Android-specific ripple effect
    >
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff', // Default button color
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  pressed: {
    opacity: Platform.OS === 'ios' ? 0.75 : 1, // Dimmer effect for iOS when pressed
    backgroundColor: Platform.OS === 'ios' ? '#0056b3' : null, // Darker shade on iOS when pressed
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
