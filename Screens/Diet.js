import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Header from '../Components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Diet({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header
          title='Diet'
          rightButtonText='Add'
          onRightButtonPress={() => navigation.navigate('AddDiet')}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#D8BFD8', // Same background as the Activities screen
  },
  container: {
    flex: 1,
  },
});
