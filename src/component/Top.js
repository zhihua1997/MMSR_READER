import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Header } from '../tools';
import { Button } from '../tools';
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
import ContentStory from './ContentStory';
import { SearchBar } from 'react-native-elements'

const heart = (<Icon name="heart" size={30} color="red" style={{ textAlign: 'center' }} />)




class Top extends Component {


      //Content
    render() {
        return (
            <View style={styles.viewStyle}>
                <View style={styles.heartStyle}>{heart}</View>
                <View style={styles.searchStyle}>
                    <SearchBar
                        round
                        lightTheme
                        containerStyle={styles.search}
                        //ref="search"
                        //textInputRef="searchText"
                        //onChangeText={this.searchText.bind(this)}
                        placeholder='Search by Truck Name...'
                    />
                </View>
            </View>
        );
    }
}



const styles = {
    viewStyle: {
        //backgroundColor: '#F8F8F8',
        //justifyContent: 'center',
        //alignItem: 'center',
        height: 60,
        marginTop: 15,
        flexDirection: 'row',
        //backgroundColor: '#FFFF00'
    },
    heartStyle: {
        justifyContent: 'center',
        alignItem: 'center',
        width: 60,
        height: 50,
        //backgroundColor: '#bac',
        marginLeft: 15,
    },
    search: {
        width: 250,
        backgroundColor: '#FFF',
    },
    searchStyle:{
        backgroundColor: '#FFF'
    }
}
export default Top;