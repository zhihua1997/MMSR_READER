import React, { Component } from "react";
import { Text, View, ScrollView, AsyncStorage } from "react-native";
import { connect } from 'react-redux';
import { Button } from "../tools";
import { logoutUser } from '../actions/AuthAction';
import { Content, List, ListItem, Thumbnail } from 'native-base';
import { strings } from '../localization'

class Profile extends Component {
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

  signoutUser() {
    this.props.logoutUser();
  }

  render() {
    return (
      <View style={styles.viewStyle}>
      <View style={styles.viewImage}>
          <Thumbnail large source={require('../Images/profile1.jpg')} />
      </View>
      <View style={{marginBottom:5}}>
          <Text>{this.props.user.userName}</Text>
      </View>
      <View style={{marginBottom:5}}>
          <Text>User ID: {this.props.user.userId}</Text>
          </View>
      <View style={styles.viewBox}>
      <Text>{this.props.user.userDOB}</Text>
      </View>
      <View style={styles.viewBox}>
      <Text>{this.props.user.email}</Text>
      </View>
      <View style={styles.buttonSize}>
      <Button onPress={this.signoutUser.bind(this)}>
           {strings.signout}
      </Button>
      </View>
  </View>
    );
  }
}

const styles = {
  parentStyle: {
    flex: 1
  },
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
    //borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    //backgroundColor: '#F8F8F8',
    width: 200, 
    height: 60,
    alignItems: "center",
    marginTop: 5,
},
viewDescription: {
    borderWidth: 1,
    borderColor: '#000',
    borderStyle: 'solid',
    backgroundColor: '#F8F8F8',
    width: 200, 
    height: 80,
    alignItems: "center",
    marginTop: 5,
},
buttonSize: {
    marginTop: 10,
    width: 220,
    height: 70,
}
};

const mapStateToProps = state => {
  const { user } = state.auth;

  return { user };
};

export default connect(
  mapStateToProps, 
  { logoutUser })(Profile);
