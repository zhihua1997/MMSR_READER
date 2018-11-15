import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TextInput, AsyncStorage, AppRegistry, Image } from 'react-native';
import { Content, List, ListItem, Thumbnail } from 'native-base';
import { Button } from '../tools';

class StoryBook extends Component {
    
    render(){

        return(
            <View style={styles.container}>
                <View style={{width: 100, height: 100, backgroundColor:'red', borderRadius: 50}}>
                <Image style={{width: 100, height: 100, backgroundColor:'red', borderRadius: 50}}
                source={require('../Images/flower.png')}></Image>
                    <View style = {{position: 'absolute', width: 40, height: 40, backgroundColor:'violet', borderRadius: 25,
                    justifyContent: 'center', alignItems: 'center',
                    borderColor: 'green',borderWidth: 1,
                    left: 0, top: 0}}>
                      <Text style={{backgroundColor:"transparent",color:'white',}}>1</Text>
                    </View>
                </View>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
})

export default StoryBook;