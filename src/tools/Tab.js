import React, { Component } from "react";
import { Image, TouchableOpacity } from 'react-native';

const Tab = ({ source, onPress }) => {
    const { tabStyle, imageStyle } = styles;
    return (
        <TouchableOpacity onPress={onPress} style={tabStyle}>
            <Image style={imageStyle} source={source} />
        </TouchableOpacity>
    );
};

const styles = {
    tabStyle: {
        width: 50,
        height: 50,
        flex: 1,
        alignSelf: "stretch",
        backgroundColor: "#fff"
    },
    imageStyle: {
        width: 40,
        height: 40,
        alignSelf: "center"
    }
};

export { Tab };
