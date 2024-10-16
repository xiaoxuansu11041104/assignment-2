import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Fontisto from '@expo/vector-icons/Fontisto';



import Activities from './Screens/Activities';
import AddActivity from './Screens/AddActivity';
import Diet from './Screens/Diet';
import Settings from './Screens/Settings';
import AddDiet from './Screens/AddDiet';

// Importing Ionicons for using icons in the bottom tab navigator
import { Ionicons } from '@expo/vector-icons'; 

// Creating instances of Bottom Tab Navigator and Native Stack Navigator
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Defining the stack for Activities, including the screen to add an activity
function ActivitiesStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen 
        name="ActivitiesMain" 
        component={Activities} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AddActivity" 
        component={AddActivity} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Defining the stack for Diet, including the screen to add a diet entry
function DietStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="DietMain" 
        component={Diet} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="AddDiet" 
        component={AddDiet} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}


export default function AppNavigation() {
  return (

    // Defining the bottom tab navigator
    <Tab.Navigator
        screenOptions={({ route }) => ({
        // Defining icons for each tab based on the route name
        tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            // Setting the icon based on the route name
            if (route.name === 'Activities') {
                return <FontAwesome5 name="running" size={24} color={focused ? 'tomato' : 'gray'} />
            } else if (route.name === 'Diet') {
            return <Ionicons name="fast-food" size={24} color={focused ? 'tomato' : 'gray'} />
            } else if (route.name === 'Settings') {
            return <Fontisto name="player-settings" size={24} color={focused ? 'tomato' : 'gray'} />
            }

            return <Ionicons name={iconName} size={size} color={color} />;
        },
        })}
        tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        }}
    >
        <Tab.Screen 
            name="Activities" 
            component={ActivitiesStack} 
            options={{ headerShown: false }}
            
        />
        <Tab.Screen 
            name="Diet" 
            component={DietStack}
            options={{ headerShown: false }} 
            
        />
        <Tab.Screen 
            name="Settings" 
            component={Settings} 
            options={{ headerShown: false }}
            
        />
    </Tab.Navigator>

  )
}

const styles = StyleSheet.create({})