import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, Platform, TouchableWithoutFeedback, Keyboard, NativeModules, ScrollView, ActivityIndicator } from 'react-native';

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.state.weather = [];
    this.state.zip = '';
    this.state.isLoading = false;
  }

  getWeatherFromAPI(zip) {
    if (!App.validateZipCode(zip)) {
      console.error("Invalid Zip Code");
      return;
    }

    let zipURL = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=' + zip + '&facet=state&facet=timezone&facet=dst'
    let coordURL = 'https://api.weather.gov/points/'
    this.setState({isLoading: true})
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
      .then((json) => this.setState({ weather: json.properties.periods }))
      .catch((error) => console.error(error))
      .finally(() => this.setState({isLoading: false}));
  }

  static validateZipCode(zip) {
    if (zip.length != 5) {
      return false;
    }

    if (!/^\d+$/.test(zip)) {
      return false;
    }

    return true;
  }

  styles = StyleSheet.create({
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

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => { if (Platform.OS == 'ios') Keyboard.dismiss() }}>
        <View style={this.styles.container}>
          <Text>Welcome to the best weather app ever!</Text>
          <Text>Insert ZIP Code</Text>
          <TextInput style={this.styles.zipTextInput} keyboardAppearance='default' keyboardType='number-pad' maxLength={5} onChangeText={(text) => this.setState({ zip: text })} />
          <Button style={this.styles.submitButton} title="Submit" onPress={() => this.getWeatherFromAPI(this.state.zip)} />
          <ActivityIndicator animating={this.state.isLoading} size='large'/>
          <ScrollView>
            {
              this.state.weather.map((period) => {
                return (
                  <Text style={{ marginTop: 5, color: 'white', backgroundColor: 'blue' }}>{period.name}: {period.detailedForecast}</Text>
                )
              })
            }
          </ScrollView>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export { App as default };