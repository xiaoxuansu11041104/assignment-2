import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '../Components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataContext } from '../Context/DataContext';

export default function Diet({ navigation }) {

  // Access diet data from the DataContext
  const { dietData } = useContext(DataContext);

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
