import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import Header from '../Components/Header';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { DataContext } from '../Context/DataContext';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddActivity({navigation}) {

    const [activityType, setActivityType] = useState(null);
    const [date, setDate] = useState(new Date());
    const [duration, setDuration] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    return (
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.container}>
            <Header
              title='Add An Activities'           
            />
            
          </View>
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({})