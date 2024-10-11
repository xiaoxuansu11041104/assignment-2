import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../Components/Header'

export default function Activities() {
  return (
    <View style={styles.container}>
      <Header
        title='Activities'
        rightButtonText='Add'
        onRightButtonPress={() => navigation.navigate('AddActivity')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D8BFD8',
    },
})