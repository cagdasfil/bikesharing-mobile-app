import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import {createDrawerNavigator} from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import RecoveryPassword from './screens/RecoveryPassword';
import ResetPassword from './screens/ResetPassword';
import QRScanner from './screens/home_screens/QRScanner';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Balance from './screens/home_screens/Balance';
import Dockers from './screens/home_screens/Dockers';

const HomeStack = createBottomTabNavigator(
  {
    Balance: {screen: Balance},
    scan: {screen: QRScanner},
    Dockers: {screen: Dockers}
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        let size;
        if (routeName === 'Balance') {
          iconName = 'md-wallet';
          size = 30;
        }
        else if (routeName === 'scan') {
          iconName = 'md-qr-scanner';
          size = 60;
        }
        else if (routeName === 'Dockers') {
          iconName = 'md-pin';
          size = 30;
        }
        return <IconComponent name={iconName} size={size} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
      style: {height:80},
    },
  }
);

const AppNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeStack, navigationOptions:{title:"Home", drawerIcon: ({ focused }) => (
          <Ionicons name="md-home" size={24} color={focused ? 'blue' : 'black'} />
          )} }, 
        Login: { screen: Login },
        SignUp: { screen: SignUp },
        Recovery: { screen: RecoveryPassword},
        Reset: { screen: ResetPassword},
        UsageHistory: {screen: HomeStack, navigationOptions:{title:"Usage History", drawerIcon: ({ focused }) => (
            <Ionicons name="md-bicycle" size={24} color={focused ? 'green' : 'black'} />
          )} },
        Notifications: {screen: HomeStack, navigationOptions:{title:"Notifications", drawerIcon: ({ focused }) => (
            <Ionicons name="md-notifications" size={24} color={focused ? 'yellow' : 'black'} />
          )} }, 
        Report: {screen: HomeStack, navigationOptions:{title:"Report", drawerIcon: ({ focused }) => (
            <Ionicons name="md-alert" size={24} color={focused ? 'red' : 'black'} />
          )} },
        Settings: {screen: HomeStack, navigationOptions:{title:"Settings", drawerIcon: ({ focused }) => (
            <Ionicons name="md-settings" size={24} color={focused ? 'grey' : 'black'} />
          )} },
          QRScanner: {screen: QRScanner},

    },
    {
        initialRouteName: "Login",
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;