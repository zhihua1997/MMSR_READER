import React, {Component} from 'react';
import {
  Alert,
  Keyboard,
  Image,
  Text,
  View
} from 'react-native';
import { Button } from "./tools/button";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
} from "native-base";
import { Actions } from "react-native-router-flux";
import { emailChanged, passwordChange, loginUser} from '../actions';
import { connect } from 'react-redux';
import { strings } from '../localization'

class LoginForm extends Component {
  constructor(props){
   super(props);
   
  }

  

  loginFunction = () => {
    const { email } = this.state;
    const { password } = this.state;

    fetch("http://tarucmmsr.pe.hu/readerLogin.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        password: password
      })
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        if (responseJson === "Invalid Username or Password Please Try Again") {
          Alert.alert("Invalid Password or Email");
        } else {
          Alert.alert("Welcome");
        }
      })
      .catch(error => {
        console.error(error);
      });

      Keyboard.dismiss();
     };

  render() {
    return (
      <Container
        contentContainerStyle={{
          flexGrow: 1,
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
      <Container style={styles.formStyle}>
          <Content>
            <Form>

              <Text>{strings.how}</Text>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input onChangeText={email => this.setState({ email })} />
              </Item>
              <Item floatingLabel last>
                <Label>Password</Label>
                <Input
                  secureTextEntry
                  onChangeText={password => this.setState({ password })}
                />
              </Item>
            </Form>
            <Button onPress={this.loginFunction}> Sign In </Button>
            <Button onPress={() => Actions.register()}> Sign Up </Button>
          </Content>
        </Container>
      </Container>
    );
  }
}

const styles = {
  imgContainerStyle: {
    alignItems: "center",
    justifyContent: "center",
    height: 1500
  },

  imgStyle: {
    justifyContent: "center",
    alignItems: "center"
  },

  formStyle: {
    //flex: 1
    height: 30
  }
};

const mapStateToProps = state => {
  const { email, password, loading } = state.auth;

  return { email, password, loading };
};

export default connect(
  mapStateToProps,
  {
    emailChanged, passwordChange, loginUser
  }
)(LoginForm);
