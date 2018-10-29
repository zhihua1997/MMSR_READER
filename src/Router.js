import React, { Component } from 'react';
import { Router, Scene, Actions, ActionConst } from 'react-native-router-flux';
import LoginScreen from './component/LoginScreen';
import SecondScreen from './component/SecondScreen';
import RegisterForm from './component/RegisterForm';
import FirstPage from './component/FirstPage';
import { strings } from './localization';
import Downloaded from './component/Downloaded';
import Icon from 'react-native-vector-icons/FontAwesome'


const myIcon = (<Icon name="ellipsis-v" style={{ marginRight: 20 }} size={50} color="#000" />);

const RouterComponent = () => {
	  return (
	    <Router>
				
	      <Scene key="root">
				<Scene key="firstPage"
	          component={FirstPage}
						title = "MMSR Reader"
							initial
							navigationBarStyle={{ backgroundColor: '#add8e6', height: 70 }}
	        />

	        <Scene key="loginScreen"
						component={LoginScreen}
						title = { strings.loginPage }
	        />

					<Scene key="register"
						component={RegisterForm}
						hideNavBar={true}
					/>
	        <Scene key="secondScreen"
	          component={SecondScreen}
	          hideNavBar={true}
	        />
					<Scene key="downloaded"
						component={Downloaded}
					
						onRight = { () => { Actions.firstPage(); }}
						renderRightButton = {<Icon name="ellipsis-v" size={30} color="#000" style={ { marginRight: 10 } } />}
					/>
	      </Scene>
	    </Router>
	  );
};

export default RouterComponent;
