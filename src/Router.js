import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import LoginScreen from './component/LoginScreen';
import SecondScreen from './component/SecondScreen';
import RegisterForm from './component/RegisterForm';
import FirstPage from './component/FirstPage';
import { strings } from './localization';
import Downloaded from './component/Downloaded';
import Icon from 'react-native-vector-icons/FontAwesome';

//drawer
import menu from './drawer/menu';
import Drawer1 from './drawer/drawer1';
import Drawer2 from './drawer/drawer2';


const MenuIcon = () => {
	return (
		<Icon name="navicon" size={30} />
	)
}

const RouterComponent = () => {
	return (
		<Router>
			<Scene key="root">
				<Scene 
				
				key="firstPage"
					component={FirstPage}
					title="MMSR Reader"
					//initial
					navigationBarStyle={{ backgroundColor: '#add8e6', height: 70 }}
				/>

				<Scene key="loginScreen"
					component={LoginScreen}
					title={strings.loginPage}
				/>

				<Scene key="register"
					component={RegisterForm}
					hideNavBar={true}
				/>
				<Scene key="secondScreen"
					component={SecondScreen}
					hideNavBar={true}
				/>

				

				<Scene
				initial
					key="menu"
					drawer
					contentComponent={menu}
					drawerIcon={MenuIcon}
					drawerWidth={300}
					hideNavBar
				>
				<Scene key="downloaded"
					component={Downloaded}
					title="Downloaded"
					renderRightButton={<Icon name="ellipsis-v" size={30} color="#000" style={{ marginRight: 10 }} onPress={() => Actions.firstPage()} />}
				/>

					<Scene
						key="drawer2"
						title="Page 2"
						component={Drawer2}
					/>
				</Scene>

			

			</Scene>

		</Router>
	);
};

export default RouterComponent;
