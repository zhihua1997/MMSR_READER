import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import Router from './Router';
import reducers from './reducers';


export default class App extends Component {
    
    render() {
        const store = createStore(reducers, applyMiddleware(ReduxThunk));
        return (
            <Provider store={store}>
                <Router />
            </Provider>
        );
    }
}

