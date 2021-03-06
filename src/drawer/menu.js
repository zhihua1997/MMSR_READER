import React, { Component } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { Content, List, ListItem, Thumbnail } from 'native-base';
import { connect } from 'react-redux';
import { logoutUser, getStoryBook, getStarRating  } from '../actions/AuthAction';
import { downloadedList  } from '../actions/DownloadAction';
import { strings } from '../localization'


class menu extends Component {

  
    constructor(props){
        super(props);
        this.state = {
            name:"",
            loading: false,
        }
    }

    showStorybookFunction() {
        //this.props.getStoryBook();
        this.props.getStarRating();
    }

    downloadListFunction() {
        this.props.downloadedList();
    }

    signoutUser() {
        this.props.logoutUser();
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
                            <ListItem onPress={this.showStorybookFunction.bind(this)}>
                                <Text>{strings.library}</Text>
                            </ListItem>
                        </List>
                        <List>
                            <ListItem onPress={this.downloadListFunction.bind(this)}>
                                <Text>{strings.downloaded}</Text>
                            </ListItem>
                        </List>
                        <List>
                            <ListItem onPress={()=> Actions.profile()}>
                                <Text>{strings.profile}</Text>
                            </ListItem>
                        </List>
                        <List>
                            <ListItem onPress={this.signoutUser.bind(this)}>
                                <Text>{strings.signout}</Text>
                            </ListItem>
                        </List>
                    </Content>
                </View>
            </View>
        );
    }
}

export default connect(null, { getStoryBook, downloadedList, getStarRating, logoutUser  })(menu);