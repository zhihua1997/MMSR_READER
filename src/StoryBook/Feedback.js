import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Slider,
  TextInput,
  Keyboard
} from "react-native";
import { Dropdown } from 'react-native-material-dropdown';
//import Tts from "react-native-tts";

//import Voice from 'react-native-voice';


class Feedback extends Component {

  getStoryFunction(languageCode) {
    //const { storybookID } = this.props;
    //console.log(this.props.storybookID);
    //storybookID, languageCode = this.props;
   
    console.log(languageCode);
}
  render() {
    let data = [{
      value: 'Banana',
    }, {
      value: 'Mango',
    }, {
      value: 'Pear',
    }];

    return (
      <Dropdown
        label='Favorite Fruit'
        data={data}
        onChangeText={(value) => this.getStoryFunction(value)}
      />
    );
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 26,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  title: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  label: {
    textAlign: "center"
  },
  sliderContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  sliderLabel: {
    textAlign: "center",
    marginRight: 20
  },
  slider: {
    width: 150
  },
  textInput: {
    borderColor: "gray",
    borderWidth: 1,
    flex: 1,
    width: "100%"
  }
});

export default Feedback;