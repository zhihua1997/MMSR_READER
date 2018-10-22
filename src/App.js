import React, { Component } from 'react';
import Router from './Router';

export default class App extends Component {
    
    render() {
        return (
            <Router />
        );
    }
}

const styles = {
    image: {
        flex: 1,
        alignItem: 'center',
        justifyContent: 'cenetr',
    },

    inner: {
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(52, 52, 52, 0.8)'
    }
}