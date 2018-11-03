import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TextInput } from 'react-native';
import { Content, List, ListItem, Thumbnail } from 'native-base';
import { Button } from '../tools';

class Introduce extends Component {
    render() {
        return (
            <View style={styles.viewStyle}>
                <View style={styles.viewImage}>
                    <Thumbnail large source={require('../Images/profile1.jpg')} />
                </View>
                <View>
                    <Text>Author Name</Text>
                </View>
                <View style={styles.viewBox}>
                <Text>Hello</Text>
                </View>
                <View style={styles.viewBox}>
                <Text>Language</Text>
                </View>
                <View style={styles.viewBox}>
                <Text>Age</Text>
                </View>
                <Button>
                    Read
                </Button>
            </View>
        );
    }
}

const styles = {
    viewStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 20,
    },
    viewImage: {
       // backgroundColor: '#F8F8F8',
    },
    viewBox: {
        borderColor: '#000',
        borderStyle: 'solid',
        backgroundColor: '#F8F8F8',
        width: 80, 
        height: 60,
        alignItems: 'center',
        marginTop: 15,
    }
}

export default Introduce;