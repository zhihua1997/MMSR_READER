import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TextInput, AsyncStorage } from 'react-native';
import { Content, List, ListItem, Thumbnail } from 'native-base';
import { Button } from '../tools';

class Introduce extends Component {
    constructor(props){
        super(props);

        this.state = {
            loading: false,
            author: [],
            description: [],
            languageCode: [],
            age: [],
        }
    }

    componentDidMount() {
        AsyncStorage.getItem("storyContent_token").then(token => {
            const Alldata = JSON.parse(token);
            console.log(Alldata);
            const len = Alldata.length;
            var authorName = [];
            var description = [];
            var languageCode = [];
            var age = [];
            for (let i=0; i < len; i++) {
              languageCode = Alldata[i].languageCode;
              authorName = Alldata[i].adminId;
              description = Alldata[i].description;
              age = Alldata[i].ageGroupCode;
              this.state.author.push(authorName);
              this.state.description.push(description);
              this.state.languageCode.push(languageCode);
              this.state.age.push(age);
            }
            this.setState({
                data: Alldata,
                loading: token !== null,
            });
            //console.log(this.state.data);
        });

    }

    render() {
        return (
            <View style={styles.viewStyle}>
                <View style={styles.viewImage}>
                    <Thumbnail large source={require('../Images/profile1.jpg')} />
                </View>
                <View>
                    <Text>{this.state.author}</Text>
                </View>
                <View style={styles.viewBox}>
                <Text>{this.state.description}</Text>
                </View>
                <View style={styles.viewBox}>
                <Text>{this.state.languageCode}</Text>
                </View>
                <View style={styles.viewBox}>
                <Text>{this.state.age}</Text>
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