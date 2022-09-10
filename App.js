import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import 'react-native-gesture-handler';

import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import CustomDrawer from './src/components/CustomNavigationDrawer';

import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfilePictureScreen from './src/screens/ProfilePictureScreen';
import EditProfileScreen from './src/screens/EditProfileScreen';
import WeatherScreen from './src/screens/WeatherScreen';
import LiveStreamScreen from './src/screens/LiveStreamScreen';
import LiveContentScreen from './src/screens/LiveContentScreen';


function SideNavigation() {

	const Drawer = createDrawerNavigator();

	return (
		<Drawer.Navigator initialRouteName="Dashboard"
			drawerContent={props => <CustomDrawer {...props}/>}
			screenOptions={
				{
					// headerShown: false,
					// drawerActiveBackgroundColor: '#aa18ea',
					// drawerActiveTintColor: '#fff',
					// drawerInactiveTintColor: '#333',

					drawerStyle:{
						width: 240
					},
					drawerLabelStyle: {
						marginLeft: 5,
						//fontFamily: 'Roboto-Medium',
						fontSize: 15,
					}
			  	}
			}
		>	
			<Drawer.Screen name="Dashboard" component={DashboardScreen} />
			<Drawer.Screen name="Profile" component={ProfileScreen} /*options={ { drawerIcon: ({color}) => (<Ionicons name="person-outline" size={22} color={color} />) } }*/ />
			<Drawer.Screen name="Profile Picture" component={ProfilePictureScreen} options={{drawerItemStyle:{display: "none"}}} />
			<Drawer.Screen name="Edit Profile" component={EditProfileScreen} options={{drawerItemStyle: {display: "none"}}} />
			<Drawer.Screen name="Weather" component={WeatherScreen} />
			<Drawer.Screen name="Live Stream" component={LiveStreamScreen} />
			<Drawer.Screen name="Live Content" component={LiveContentScreen} options={{drawerItemStyle: {display: "none"}}}/>
		</Drawer.Navigator>
	);
}

const Stack = createNativeStackNavigator();

function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen name="Login" component={LoginScreen} />
				<Stack.Screen name="Registration" component={RegistrationScreen} />
				<Stack.Screen options={{ headerShown: false }} name="Side Navigation" component={SideNavigation} />
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;