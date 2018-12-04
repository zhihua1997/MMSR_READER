import React, { Component } from 'react';
import { Text, View,FlatList } from 'react-native';
import { Header } from '../tools';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
} from "native-base";
import { Actions } from "react-native-router-flux";
import Top from '../component/Top'
import ContentStory from '../component/ContentStory';


class Downloaded extends Component {
    render() {
        return (
            <Container>
            <Top />
            <Header headerText="Your StoryBook" />
            <ContentStory />
            </Container>
        );
    }
}


 export default Downloaded;