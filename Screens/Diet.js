import { FlatList, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Background from '../Components/Background';
import { collection, onSnapshot } from 'firebase/firestore';
import { database } from '../Components/Firebase/firebaseSetup';
import ItemsList from '../Components/ItemsList';

export default function Diet() {
  // State to store the fetched diets from Firestore
  const [diets, setDiets] = useState([]);

  // Use `onSnapshot` to listen for real-time updates
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, 'diets'), // Connect to the 'activities' collection
      (snapshot) => {
        // Map the Firestore snapshot data to your state
        const dietData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          // Ensure `date` is converted to a JavaScript Date object
          date: doc.data().date?.toDate() || new Date(),
        }));
        setDiets(dietData); // Update the state with fetched data
      },
      (error) => {
        console.error("Error fetching diets: ", error);
      }
    );

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <Background>
      <ItemsList type="diet" data={diets} />
    </Background>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    backgroundColor: 'white',
    marginVertical: 5,
    borderRadius: 5,
  },
});
