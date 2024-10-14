import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useContext } from 'react';
import Header from '../Components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../Context/ThemeContext';

export default function Settings({ navigation }) {
  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.backgroundColor }]}>
      <View style={styles.container}>
        <Header title='Settings' />

        {/* Toggle Theme Button */}
        <Pressable style={styles.button} onPress={toggleTheme}>
          <Text style={[styles.buttonText, { color: theme.textColor }]}>
            Toggle Theme
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#D8BFD8', // Same background as other screens
  },
  container: {
    flex: 1,
  },
});
