import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Header } from './tools';
import { Button } from './tools';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
} from "native-base";
import { Actions } from "react-native-router-flux";
import Icon from 'react-native-vector-icons/FontAwesome';

const heart = (<Icon name="heart" size={30} color="red" style={{ textAlign: 'center' }} />)


class Top extends Component {
    render() {
        return ( 
            <View style={styles.viewStyle}>
                <View style={styles.heartStyle}>{heart}</View>
              
            </View>
        );
    }
}

const styles = {
    viewStyle: {
        //backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItem: 'center',
        height: 60,
        marginTop: 15,
    },
    heartStyle: {
        justifyContent: 'center',
        alignItem: 'center',
        width: 60,
         height: 50,
         //backgroundColor: '#FFF',
         marginLeft: 15,
    },
}
 export default Top;