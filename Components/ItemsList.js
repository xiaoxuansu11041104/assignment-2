import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, { useContext } from "react";
import { DataContext } from "../Context/DataContext";
import Item from "./Item";


export default function ItemList({type, data, navigation}) {
  //const { activities, diet } = useContext(DataContext);
  //const data = type === "activity" ? activities : diet;   // if type is activity, then data is activities, else diet

  return (
    <FlatList
      data={data} // Use the `data` prop passed down from the parent component
      renderItem={({ item }) => (
        <Pressable onPress={() => navigation.navigate('EditScreen', { item, type })}>
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