import { StyleSheet, Text, View, Pressable } from 'react-native';
import React, { useContext } from 'react';
import Header from '../Components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ThemeContext } from '../Context/ThemeContext';

export default function Settings({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title='Settings' />
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
