import React, { Component } from 'react';
import {
  Alert,
  Keyboard,
  Image,
  Text,
  View, TextInput,
  TouchableWithoutFeedback,
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
import { emailChanged, passwordChanged, loginUser, getStoryBook, getStarRating, setForgetPasswordLoadToTrue, forgetPassword } from '../actions';
import { connect } from 'react-redux';
import { strings } from '../localization';
import ProgressBar from "../method/ProgressBar";
import ForgetPasswordModal from "./ForgetPasswordModal";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    console.log(this.props.user);
    this.state = {
      lan: "",
      isLoad: false,
      showModal: false
    };
  }
  componentWillUnmount() {
    // console.log("close db");
    // closedb();
  }
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  onAccept() {
    // console.log(this.props.email);
    const email = this.props.email;
    this.props.forgetPassword({ email });
    this.setState({ showModal: false });
    //Alert.alert("Email Sent");
    this.props.setForgetPasswordLoadToTrue();
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  loginFunction() {
    const { email, password } = this.props;

    console.log(this.props.password);

    this.props.loginUser({ email, password });
    this.props.getStoryBook();
    this.props.getStarRating();

  }

  forgetPasswordOnPress() {
    this.setState({ showModal: true });
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

            <TouchableWithoutFeedback
                onPress={this.forgetPasswordOnPress.bind(this)}
                style={{ margin: 10 }}
              >
                <Text
                  style={{
                    alignSelf: "flex-end",
                    margin: 10,
                    color: "blue",
                    textDecorationLine: "underline"
                  }}
                >
                  Forget Password
                </Text>
              </TouchableWithoutFeedback>
          </Content>
        </Container>
        <ForgetPasswordModal
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          <TextInput
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
            keyboardType={"email-address"}
            placeholder="Enter you Email Address"
          />
        </ForgetPasswordModal>

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
    emailChanged, passwordChanged, loginUser, getStoryBook, getStarRating, setForgetPasswordLoadToTrue,
    forgetPassword
  }
)(LoginForm);
