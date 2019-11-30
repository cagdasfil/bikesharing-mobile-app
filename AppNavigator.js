import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import {createDrawerNavigator} from 'react-navigation-drawer';
import Home from './screens/Home';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import RecoveryPassword from './screens/RecoveryPassword';
import ResetPassword from './screens/ResetPassword';
import QRScanner from './QRScanner';

const AppNavigator = createDrawerNavigator(
    {
        Home: { screen: Home }, 
        Login: { screen: Login },
        SignUp: { screen: SignUp },
        Recovery: { screen: RecoveryPassword},
        Reset: { screen: ResetPassword},
        Dockers: {screen: Home, navigationOptions:{title:"Dockers", drawerIcon: ({ focused }) => (
            <Ionicons name="md-pin" size={24} color={focused ? 'blue' : 'black'} />
          )} },
        Balance: {screen: Home, navigationOptions:{title:"Balance", drawerIcon: ({ focused }) => (
            <Ionicons name="md-wallet" size={24} color={focused ? 'blue' : 'black'} />
          )} },
        UsageHistory: {screen: Home, navigationOptions:{title:"Usage History", drawerIcon: ({ focused }) => (
            <Ionicons name="md-bicycle" size={24} color={focused ? 'blue' : 'black'} />
          )} },
        Notifications: {screen: Home, navigationOptions:{title:"Notifications", drawerIcon: ({ focused }) => (
            <Ionicons name="md-notifications" size={24} color={focused ? 'blue' : 'black'} />
          )} },
        Report: {screen: Home, navigationOptions:{title:"Report", drawerIcon: ({ focused }) => (
            <Ionicons name="md-alert" size={24} color={focused ? 'blue' : 'black'} />
          )} },
        Settings: {screen: Home, navigationOptions:{title:"Settings", drawerIcon: ({ focused }) => (
            <Ionicons name="md-settings" size={24} color={focused ? 'blue' : 'black'} />
          )} },
          QRScanner: {screen: QRScanner},

    },
    {
        initialRouteName: "Login",
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;