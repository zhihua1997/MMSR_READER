import React, { Component } from "react";
import { Text, View, ScrollView, AsyncStorage } from "react-native";
import { connect } from 'react-redux';
import { Button } from "../tools";
import { logoutUser } from '../actions/AuthAction';

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
      <View style={styles.parentStyle}>
        <ScrollView>
          <Text>Profile</Text>
          <Text>{this.state.name}</Text>
          <Text>{this.props.user.userId}</Text>
          <Button onPress={this.signoutUser.bind(this)}>SignOut</Button>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  parentStyle: {
    flex: 1
  },
};

const mapStateToProps = state => {
  const { user } = state.auth;

  return { user };
};

export default connect(
  mapStateToProps, 
  { logoutUser })(Profile);
