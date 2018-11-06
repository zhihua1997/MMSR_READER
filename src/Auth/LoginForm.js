import React, {Component} from 'react';
import {
  Alert,
  Keyboard,
  Image,
  Text,
  View
} from 'react-native';
import { Button } from "../tools/button";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
} from "native-base";
import { Actions } from "react-native-router-flux";
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { connect } from 'react-redux';
import { strings } from '../localization'

class LoginForm extends Component {
  

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  loginFunction() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  
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
              <Item floatingLabel>
                <Label>{strings.email}</Label>
                <Input
                  onChangeText={this.onEmailChange.bind(this)}
                  value={this.props.email}
                  keyboardType={"email-address"}
                />
              </Item>
              <Item floatingLabel last>
                <Label>{strings.password}</Label>
                <Input
                  secureTextEntry
                  onChangeText={this.onPasswordChange.bind(this)}
                  value={this.props.password}
                />
              </Item>
            </Form>
            <Button onPress={this.loginFunction.bind(this)}>{strings.signIn}</Button>
            <Button onPress={() => Actions.register()}>{strings.signUp}</Button>
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
    emailChanged, passwordChanged, loginUser
  }
)(LoginForm);
