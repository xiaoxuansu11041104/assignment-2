// Components/HeaderIcons.js
import React from 'react';
import { View, Pressable } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StyleSheet, Platform } from 'react-native';

const iconLibraries = {
  Ionicons,
  FontAwesome5,
  MaterialIcons,
};

const HeaderIcons = ({ 
  icon1Type, icon1Name, onPress1,
  icon2Type, icon2Name, onPress2,
  color = "white"
}) => {
  const Icon1 = icon1Type ? iconLibraries[icon1Type] : null;
  const Icon2 = icon2Type ? iconLibraries[icon2Type] : null;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: 15 }}>
      {Icon1 && icon1Name && onPress1 && (
        <Pressable
          onPress={onPress1}
          style={({ pressed }) => [
            styles.iconContainer,
            pressed ? styles.pressed : null, // Apply feedback style for iOS
          ]}
          android_ripple={{ color: '#ccc' }} // Android ripple effect
        >
          <Icon1 name={icon1Name} size={24} color={color} />
        </Pressable>
      )}
      {Icon2 && icon2Name && onPress2 && (
        <Pressable
          onPress={onPress2}
          style={({ pressed }) => [
            styles.iconContainer,
            pressed ? styles.pressed : null, // Apply feedback style for iOS
          ]}
          android_ripple={{ color: '#ccc' }} // Android ripple effect
        >
          <Icon2 name={icon2Name} size={24} color={color} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    paddingHorizontal: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: Platform.OS === 'ios' ? 0.75 : 1, // Dimmer effect on iOS when pressed
  },
});

export default HeaderIcons;
