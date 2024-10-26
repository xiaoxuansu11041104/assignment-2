import React from 'react';
import { Button, View, Pressable } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';

// Importing screens for each tab and stack screen
import Activities from './Screens/Activities';
import Diet from './Screens/Diet';
import Settings from './Screens/Settings';
import AddAnActivity from './Screens/AddAnActivity';
import AddADiet from './Screens/AddADiet';
import { themes } from './StyleHelper'; // Importing theme colors and styles
import HeaderIcons from './Components/HeaderIcons'; // Importing custom header icons

// Creating instances of Stack and Tab navigators
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Function defining the main bottom tab navigation
function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Activities" // Sets Activities as the default tab
      screenOptions={({ route }) => ({
        // Define appearance and behavior for the tab bar
        tabBarActiveTintColor: themes.light.active, // Color for active tab
        tabBarInactiveTintColor: themes.light.inputbackground, // Color for inactive tab
        tabBarStyle: {
          backgroundColor: themes.light.primary, // Tab bar background color
          borderTopWidth: 0, // Remove the top border for a clean look
        },
        // Define appearance for the header in each tab screen
        headerStyle: {
          backgroundColor: themes.light.primary, // Header background color
          elevation: 0, // Removes shadow on Android
          shadowOpacity: 0, // Removes shadow on iOS
        },
        headerTintColor: themes.light.text, // Header text color
        headerTitleStyle: { fontWeight: "bold" }, // Make header text bold

        // Set up the icon for each tab based on route name
        tabBarIcon: ({ color, size }) => {
          if (route.name === "Activities") {
            return <FontAwesome5 name="walking" size={size} color={color} />;
          } else if (route.name === "Diet") {
            return <MaterialIcons name="fastfood" size={size} color={color} />;
          } else if (route.name === "Settings") {
            return <Ionicons name="settings-sharp" size={size} color={color} />;
          }
        },
      })}
    >
      {/* Activities tab with a header button to navigate to AddAnActivity screen */}
      <Tab.Screen
        name="Activities"
        component={Activities}
        options={({ navigation }) => ({
          headerRight: () => (
            <HeaderIcons
              icon1Type="Ionicons"
              icon1Name="add-circle"
              onPress1={() => navigation.navigate("AddAnActivity")}
              icon2Type="FontAwesome5"
              icon2Name="walking" 
              onPress2={() => {}}
            />
          ),
        })}
      />
      
      {/* Diet tab with a header button to navigate to AddADiet screen */}
      <Tab.Screen
        name="Diet"
        component={Diet}
        options={({ navigation }) => ({
          headerRight: () => (
            <HeaderIcons
              icon1Type="Ionicons"
              icon1Name="add-circle"
              onPress1={() => navigation.navigate("AddADiet")}
              icon2Type="MaterialIcons"
              icon2Name="fastfood" 
              onPress2={() => {}}
            />
          ),
        })}
      />

      {/* Settings tab without a header button */}
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

// Main Stack Navigator component that wraps around the bottom tab navigator
export default function AppNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: themes.light.text, // Text color for stack headers
        headerStyle: { backgroundColor: themes.light.primary }, // Background color for stack headers
      }}
    >
      {/* The main entry point - Tab navigator is embedded here */}
      <Stack.Screen
        name="HomeTabs" // A placeholder name for the Tab Navigator
        component={MainTabNavigator} // Embeds the tab navigator as the main screen
        options={{ headerShown: false }} // Hides the stack header for the main tab navigator
      />

      {/* Screen for adding a new activity */}
      <Stack.Screen
        name="AddAnActivity"
        component={AddAnActivity}
        options={{ title: "Add An Activity" }} // Sets a custom title in the header
      />

      {/* Screen for adding a new diet entry */}
      <Stack.Screen
        name="AddADiet"
        component={AddADiet}
        options={{ title: "Add A Diet" }} // Sets a custom title in the header
      />
    </Stack.Navigator>
  );
}
