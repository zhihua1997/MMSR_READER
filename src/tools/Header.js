import React from 'react';
import { Text, View } from 'react-native';

//if you have multiple jsx code, then return need to use ()
const Header = (props) => {
    const { textStyle, viewStyle } = styles;

    return (
        <View style={viewStyle}>
            <Text style={textStyle}>{props.headerText}</Text>
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
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,

        elevation: 2,
        position: 'relative'
    },
    textStyle: {
        fontSize: 20
    }
};

//component do not need register, 
//only the root(index/App) has to register it
//this line of code export the header function able use in anyway within the app

//export default Header;

//when using the export * from './component/common/Header' the * focus cannot use default keyword and must be destruture the it component
export { Header };