import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, SafeAreaView, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text>Welcome to the best weather app ever!</Text>
        <Text>Insert ZIP Code</Text>
        <TextInput style={styles.zipTextInput} keyboardAppearance='default' keyboardType='number-pad' maxLength={5} />
        <StatusBar style="auto" />
        <Button style={styles.submitButton} title="Submit" onPress={() => Alert.alert("Resetting phone to factory settings...")} />
      </View>
    </TouchableWithoutFeedback>
  );
}

function getWeatherFromAPI() {
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 30,
  },
  zipTextInput: {
    borderStyle: 'solid',
    borderWidth: 1,
    width: 100,
  },
  submitButton: {
    marginTop: 300,
    paddingTop: 300,
  },
});
