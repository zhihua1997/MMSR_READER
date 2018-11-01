import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Content, List, ListItem, Thumbnail } from 'native-base';

class menu extends Component {

    render() {

        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: '#2c3e50', justifyContent: 'center', alignItems: 'center' }}>
                <Thumbnail large source={require('../Images/profile1.jpg')} />
                <Text style={{color: '#fff', fontSize: 15}}>Zhi Hua</Text>
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
                       
                    </Content>
                </View>
            </View>
        );
    }
}

export default menu;