import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Platform, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={() => { if (Platform.OS == 'ios') Keyboard.dismiss() }}>
      <View style={styles.container}>
        <Text>Welcome to the best weather app ever!</Text>
        <Text>Insert ZIP Code</Text>
        <TextInput style={styles.zipTextInput} keyboardAppearance='default' keyboardType='number-pad' maxLength={5} />
        <StatusBar style="auto" />
        <Button style={styles.submitButton} title="Submit" onPress={getWeatherFromAPI} />
      </View>
    </TouchableWithoutFeedback>
  );
}

function getWeatherFromAPI() {
  // TODO make it so the text input by the user is used in zipURL instead of '00000'
  let zipURL = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=' + '00000' + '&facet=state&facet=timezone&facet=dst'
  let coordURL = 'https://api.weather.gov/points/'
  fetch(zipURL, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((json) => fetch(coordURL + json.records[0].fields.latitude + "," + json.records[0].fields.longitude))
    .then((response) => response.json())
    .then((json) => fetch(json.properties.forecast))
    .then((response) => response.json())
    .then((json) => console.log(json))
    .catch((error) => console.error(error));
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
