import React, { Component } from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import LoginScreen from './Auth/LoginScreen';
import SecondScreen from './component/SecondScreen';
import RegisterForm from './Auth/RegisterForm';
import FirstPage from './component/FirstPage';
import { strings } from './localization';
import Downloaded from './component/Downloaded';
import Icon from 'react-native-vector-icons/FontAwesome';
import ContentStory from './component/ContentStory'
import TryContent from './component/TryContent'
//drawer
import menu from './drawer/menu';
import Drawer1 from './drawer/drawer1';
import Drawer2 from './drawer/drawer2';
import Profile from './UserProfile/Profile';

import Introduce from './StoryBook/Introduce';
import StoryBook from './StoryBook/StoryBook';

const MenuIcon = () => {
	return (
		<Icon name="navicon" size={30} />
	)
}


const RouterComponent = ({ initial, props }) => {
	return (
		<Router>
			<Scene key="root">
				<Scene
					
					key="firstPage"
					component={FirstPage}
					title="MMSR Reader"
					hideNavBar={true}
					navigationBarStyle={{ backgroundColor: '#add8e6', height: 70 }}
				/>

				<Scene key="loginScreen"
					component={LoginScreen}
					title={strings.loginPage}
				/>

				<Scene key="register"
					component={RegisterForm}
					
				/>
				<Scene key="secondScreen"
					component={SecondScreen}
					hideNavBar={true}
				/>

				<Scene
					initial={initial}
					key="menu"
					onChange
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
						key="introduce"
						component={Introduce}
						//getTitle={ props.title }
					/>
					<Scene
						key="storybook"
						component={StoryBook}
						//getTitle={ props.title }
					/>
					<Scene 
						key="profile"
						title="Profile"
						component={Profile}
					/>
				</Scene>



			</Scene>

		</Router>
	);
};

export default RouterComponent;
