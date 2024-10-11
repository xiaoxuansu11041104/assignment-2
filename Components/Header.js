import { StyleSheet, Text, View, Button } from 'react-native'
import React from 'react'




export default function Header({title, onRightButtonPress, rightButtonText}) {
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{title}</Text>
      {rightButtonText && (
        <View style={styles.buttonContainer}>
          <Button
            title={rightButtonText}
            onPress={onRightButtonPress}
            color="#1E90FF"
          />
        </View>
      )}

    </View>
  )
}

const styles = StyleSheet.create({
    headerContainer: {
        height: 80,
        backgroundColor: '#4B0082',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,


    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',

    },
    buttonContainer: {
        position: 'absolute',
        right: 15,
        top: 20,
    },
    

})