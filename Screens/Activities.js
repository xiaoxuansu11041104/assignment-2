import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import Header from '../Components/Header'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Activities({ navigation }) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Header
            title='Activities'
            rightButtonText='Add'
            onRightButtonPress={() => navigation.navigate('AddActivity')}
          />
        </View>
      </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#D8BFD8',
    },
    container: {
        flex: 1,
        
    },
})