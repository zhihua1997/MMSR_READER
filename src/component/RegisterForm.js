import React, { Component } from "react";
import { Text,  
  StyleSheet, 
  Alert,
  TouchableOpacity,
 } from "react-native";
import { 
  Container, 
  Content, 
  Form, 
  Item, 
  Input,  
  Button as ButtonBase
} from "native-base";
import { Button, CardSection } from "./tools";
import { Actions } from "react-native-router-flux";
//import DialogAndroid from "react-native-dialogs"; // need to uninstall
//import CheckBox from 'react-native-check-box'; // need to uninstall
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { strings } from '../localization';

const items = [
  {  
    name: "English",
    id: 'EN',
  },
  {
    name: "Malay",
    id: 'BM',
  },
  {
    name: "Chinese",
    id: 'ZH',
  },
  {
    name: "Tamil",
    id: 'TM',
  },
  {
    name: "Jawa",
    id: 'jawa',
  },
  {
    name: "Spanish",
    id: 'es',
  },
  {
    name: "Portuguese",
    id: 'pt',
  },
  {
    name: "Bengali",
    id: 'bn',
  },
  {
    name: "Russian",
    id: 'ru',
  },
  {
    name: "Arabic",
    id: 'ar',
  },
  {
    name: "Japanese",
    id: 'ja',
  },
  {
    name: "German",
    id: 'de',
  },
  {
    name: "Italian",
    id: 'it',
  },
  {
    name: "Korean",
    id: 'ko',
  },
  {
    name: "French",
    id: 'fr',
  },
];


class RegisterForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      languages: "",
      selectedDate: "",
      selectedItems: [],
      isDateTimePickerVisible: false,
    };
  }

  //For multiple select picker
  onSelectedItemsChange = (selectedItems) => {
    this.setState({ selectedItems });
  }

  onRegister() {
    const { name } = this.state;
    const { email } = this.state;
    const { password } = this.state;
    const { selectedItems } = this.state;
    const { selectedDate } = this.state;

    fetch('http://tarucmmsr.pe.hu/registerReader.php',{
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        name: name,
        email: email,
        password: password,
        languages: selectedItems.join(" "),
        dob: selectedDate
      })

    }).then((response) => response.json())
    .then((responseJson) => {
      Alert.alert(responseJson);
    }).catch((error) => {
      console.error(error);
    });
  }

  //for date select picker
  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    this.setState({ selectedDate: date });
    this._hideDateTimePicker();
  };


  render() {
    return (
      <Container>
        <Content>
          <Form>
            <Item fixedLabel>
              <Input placeholder={strings.name} onChangeText={name => this.setState({ name })} />
            </Item>
            <Item>
              <Input placeholder={strings.email} onChangeText={email => this.setState({ email })} />
            </Item>
            <Item>
              <Input secureTextEntry placeholder={strings.password} />
            </Item>
            <Item>
              <Input secureTextEntry placeholder={strings.rePassword} onChangeText={password => this.setState({ password })} />
            </Item>
            <Item />
            <CardSection>
            <TouchableOpacity onPress={this._showDateTimePicker}>
                <Text style={styles.dobButton}>{strings.showDatePicker}</Text>
              </TouchableOpacity>
              <DateTimePicker
                isVisible={this.state.isDateTimePickerVisible}
                onConfirm={this._handleDatePicked}
                onCancel={this._hideDateTimePicker}
              />
            </CardSection>
            </Form>
            <CardSection>
              <Text style={styles.textStyle}>{strings.languageProficient}</Text>
            </CardSection>
                <SectionedMultiSelect
                  styles={{ width: 200, marginLeft: 15 }}
                  items={items} 
                  uniqueKey='id'
                  selectText= {strings.chooseLanguage}
                  hideSearch= {true}
                  onSelectedItemsChange={this.onSelectedItemsChange}
                  selectedItems={this.state.selectedItems}
                />
            <CardSection>
              {this.state.iOSselectedItems}
              <Button onPress={this.onRegister.bind(this)}>{strings.register}</Button>
            </CardSection>
          
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 16,
    fontWeight: "500",
    paddingTop: 10,
    paddingBottom: 10,
    marginLeft: 15,
  },

  multipleChoiceListStyle: {
    marginTop: -10,
    marginLeft: 15,
    
  },

  dobButton: {
    textDecorationLine: 'underline', 
    marginLeft: 15, 
    fontSize: 15,
    fontWeight: "300"
  }
});

export default RegisterForm;
