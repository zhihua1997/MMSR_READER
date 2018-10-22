import React, { Component } from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';

import LoginScreen from './component/LoginScreen';
import SecondScreen from './component/SecondScreen';
import RegisterForm from './component/RegisterForm';

const RouterComponent = () => {
	  return (
	    <Router>
	      <Scene key="root">
	        <Scene key="loginScreen"
	          component={LoginScreen}
	          hideNavBar={true}
              initial
	        />

					<Scene key="register"
						component={RegisterForm}
						hideNavBar={true}
					/>
	        <Scene key="secondScreen"
	          component={SecondScreen}
	          hideNavBar={true}
	        />
	      </Scene>
	    </Router>
	  );
};

export default RouterComponent;
