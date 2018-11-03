import React, { Component } from 'react';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import Router from './Router';
import reducers from './reducers';
import { ActivityIndicator, AsyncStorage } from "react-native";
import configStore from './ConfigStore';
import { PersistGate } from "redux-persist/integration/react";


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storeCreated: false,
            store: null,
          hasToken: false,
          isLoaded: false
        };
      }

      componentDidMount() {
        configStore().then(({ persistor, store }) =>
        this.setState({ persistor, store, storeCreated: true })
      );
          AsyncStorage.getItem("id_token").then(token => {
              this.setState({ hasToken: token !== null, isLoaded: true });
          });
      }

    render() {
        //const store = createStore(reducers, applyMiddleware(ReduxThunk));
        if (!this.state.storeCreated) return <ActivityIndicator />;
        return (
            <Provider store={this.state.store}>
            <PersistGate persistor={this.state.persistor}>
              <Router initial={this.state.hasToken} />
            </PersistGate>
          </Provider>
        );
    }
}

