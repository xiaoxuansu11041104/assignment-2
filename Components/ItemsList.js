import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, { useContext } from "react";
import { DataContext } from "../Context/DataContext";
import Item from "./Item";
import { useNavigation } from '@react-navigation/native';



export default function ItemList({type, data}) {
  //const { activities, diet } = useContext(DataContext);
  //const data = type === "activity" ? activities : diet;   // if type is activity, then data is activities, else diet

  
  const navigation = useNavigation(); // Use navigation hook

  // Function to navigate to the appropriate edit screen
  const handleItemPress = (item) => {
    if (type === "activity") {
      navigation.navigate("EditActivity", { item });
    } else if (type === "diet") {
      navigation.navigate("EditDiet", { item });
    }
  };

  return (
    <FlatList
      data={data} // Use the `data` prop passed down from the parent component
      renderItem={({ item }) => (
        <Pressable onPress={() => handleItemPress(item)}>
          <Item item={item} type={type} />
        </Pressable>
      )}
      keyExtractor={(item) => item.id} // Make sure each item has a unique key
      contentContainerStyle={styles.scrollViewContainer}
    />
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    alignItems: "center",
  },

})