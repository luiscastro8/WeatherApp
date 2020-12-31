import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';

export default function App() {
  const [weather, setWeather] = useState([]);
  const [zip, setZip] = useState('');

  return (
    <TouchableWithoutFeedback onPress={() => { if (Platform.OS == 'ios') Keyboard.dismiss() }}>
      <View style={styles.container}>
        <Text>Welcome to the best weather app ever!</Text>
        <Text>Insert ZIP Code</Text>
        <TextInput style={styles.zipTextInput} keyboardAppearance='default' keyboardType='number-pad' maxLength={5} onChangeText={(text) => setZip(text)} />
        <Button style={styles.submitButton} title="Submit" onPress={() => getWeatherFromAPI(setWeather, zip)} />
        {
          weather.map((period) => {
            return (
              <Text style={{ marginTop: 5, color: 'white', backgroundColor: 'blue' }}>{period.name}: {period.detailedForecast}</Text>
            )
          })
        }
      </View>
    </TouchableWithoutFeedback>
  );
}

function getWeatherFromAPI(setWeather, zip) {
  if (!validateZipCode(zip)) {
    console.error("Invalid Zip Code");
    return;
  }

  let zipURL = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=' + zip + '&facet=state&facet=timezone&facet=dst'
  let coordURL = 'https://api.weather.gov/points/'
  fetch(zipURL, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (json.records.length == 0) {
        throw new Error("Could not verify zip code");
      }
      return fetch(coordURL + json.records[0].fields.latitude + "," + json.records[0].fields.longitude);
    })
    .then((response) => response.json())
    .then((json) => fetch(json.properties.forecast))
    .then((response) => response.json())
    .then((json) => setWeather(json.properties.periods))
    .catch((error) => console.error(error));
}

function validateZipCode(zip) {
  if (zip.length != 5) {
    return false;
  }

  if (!/^\d+$/.test(zip)) {
    return false;
  }

  return true;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
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

module.exports = { validateZipCode };