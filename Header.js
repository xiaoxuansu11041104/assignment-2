import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const navigation = useNavigation();

export default function Header({title, onRightButtonPress, rightButtonText}) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>
        <Button style={styles.addButton}
            title={rightButtonText} 
            onPress={onRightButtonPress} 
            color="#1E90FF"
        />
    </View>
  )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 100,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    addButton: {
        position: 'absolute',
        right: 20
    },
})