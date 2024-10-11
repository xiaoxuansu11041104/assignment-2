import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Activities from './Screens/ActivitiesScreen';
import AddActivity from './Screens/AddActivityScreen';
import Diet from './Screens/DietScreen';
import Settings from './Screens/SettingsScreen';
import AddDiet from './Screens/AddDietScreen';

// Importing Ionicons for using icons in the bottom tab navigator
import { Ionicons } from '@expo/vector-icons'; 

// Creating instances of Bottom Tab Navigator and Native Stack Navigator
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Defining the stack for Activities, including the screen to add an activity
function ActivitiesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Activities" component={Activities} />
      <Stack.Screen name="AddActivity" component={AddActivity} />
    </Stack.Navigator>
  );
}

// Defining the stack for Diet, including the screen to add a diet entry
function DietStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Diet" component={Diet} />
      <Stack.Screen name="AddDiet" component={AddDiet} />
    </Stack.Navigator>
  );
}


export default function Navigation() {
  return (
    <View>
      <Text>Navigation</Text>
    </View>
  )
}

const styles = StyleSheet.create({})