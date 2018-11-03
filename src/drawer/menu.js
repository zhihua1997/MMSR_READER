import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Content, List, ListItem, Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/AuthAction';


class menu extends Component {

    constructor(props){
        super(props);
        this.state = {
            name:"",
            loading: false,
        }
    }

    componentDidMount() {
        AsyncStorage.getItem("id_token").then(token =>{
            const data = JSON.parse(token);
            this.setState({
                loading: token !== null,
                name: data.userName,
            });
        });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: '#2c3e50', justifyContent: 'center', alignItems: 'center' }}>
                <Thumbnail large source={require('../Images/profile1.jpg')} />
                <Text style={{color: '#fff', fontSize: 15}}>{this.state.name}</Text>
                </View>
                <View style={{ flex: 2 }}>
                    <Content>
                        <List>
                            <ListItem onPress={()=> Actions.downloaded()}>
                                <Text>Library</Text>
                            </ListItem>
                        </List>
                        <List>
                            <ListItem onPress={()=> Actions.drawer2()}>
                                <Text>Menu 2</Text>
                            </ListItem>
                        </List>
                        <List>
                            <ListItem onPress={()=> Actions.profile()}>
                                <Text>Profile</Text>
                            </ListItem>
                        </List>
                    </Content>
                </View>
            </View>
        );
    }
}

export default menu;