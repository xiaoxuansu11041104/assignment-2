import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Header from '../Components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import { DataContext } from '../Context/DataContext';
import ItemsList from '../Components/ItemsList'

export default function Diet({ navigation }) {

  // Access diet data from the DataContext
  const { dietData } = useContext(DataContext);

  // Function to render each item in the FlatList
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemTitle}>{item.meal}</Text>
      <Text>{item.calories} cal</Text>
      <Text>{item.date}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header
          title='Diet'
          rightButtonText='Add'
          onRightButtonPress={() => navigation.navigate('AddDiet')}
        />
        
        <ItemsList type="diet" />
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
