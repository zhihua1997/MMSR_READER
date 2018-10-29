import React from 'react';
import { Text, View } from 'react-native';
import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/FontAwesome'
import { Actions } from "react-native-router-flux";




const Header = (props) => {
    const { textStyle, viewStyle } = styles;
    return ( 
    <View style={viewStyle}>

    <NavigationBar
    title={props.HeaderText}
    /*rightButton={
        <Icon name='ellipsis-v' onPress={() => Actions.firstPage()} size={30} color="#000"/>
    }
    leftButton={
      <Icon name='angle-left' onPress={() =>{ Actions.firstPage()}} />
    }*/
    style={styles.navbarStyle}
  />     
    </View>
    );
};  

const styles = {
    viewStyle: {
        backgroundColor: '#F8F8F8',
        justifyContent: 'center',
        alignItems: 'center',
        height: 60,
        paddingTop: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.2,
        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        fontSize: 20
    }
};

export default Header;