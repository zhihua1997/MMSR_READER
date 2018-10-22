import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Logo from './Logo';
import LoginForm from './LoginForm';
import Wallpaper from './WallPaper';
import { Container, Content } from 'native-base';

export default class LoginScreen extends Component {
  render() {
    return (
      <Container>
        <Content>
          <Logo />
        </Content>
        <Content>
          <LoginForm />
        </Content>
        
      </Container>
    );
  }
}