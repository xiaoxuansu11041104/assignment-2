import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ItemsList from "../Components/ItemsList";
import Background from '../Components/Background';
import { collection, onSnapshot } from 'firebase/firestore';
import { database } from '../Components/Firebase/firebaseSetup';

export default function Activities() {
  
  return (
    <Background>
      <ItemsList type="activity" />
    </Background>
  );
}

const styles = StyleSheet.create({})