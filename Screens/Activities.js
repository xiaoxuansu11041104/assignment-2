import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Background from '../Components/Background';
import ItemsList from '../Components/ItemsList';
import { collection, onSnapshot } from 'firebase/firestore';
import { database } from '../Components/Firebase/firebaseSetup';

export default function Activities() {
  // State to store the fetched activities from Firestore
  const [activities, setActivities] = useState([]);

  // Use `onSnapshot` to listen for real-time updates
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(database, 'activities'), // Connect to the 'activities' collection
      (snapshot) => {
        // Map the Firestore snapshot data to your state
        const activityData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          // Ensure `date` is converted to a JavaScript Date object
          date: doc.data().date?.toDate() || new Date(),
        }));
        setActivities(activityData); // Update the state with fetched data
      },
      (error) => {
        console.error("Error fetching activities: ", error);
      }
    );

    // Cleanup the listener on component unmount
    return () => unsubscribe();
  }, []);

  return (
    <Background>
      <ItemsList type="activity" data={activities} />
    </Background>
  );
}

const styles = StyleSheet.create({});
