import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import {createDrawerNavigator} from 'react-navigation-drawer';
import HomeScreen from './screens/HomeScreen';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';



const AppNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeScreen }, 
        Login: { screen: LoginScreen },
        SignUp: { screen: SignUpScreen },
        Dockers: {screen: HomeScreen, navigationOptions:{title:"Dockers", drawerIcon: ({ focused }) => (
            <Ionicons name="md-pin" size={24} color={focused ? 'blue' : 'black'} />
          )} },
        Balance: {screen: HomeScreen, navigationOptions:{title:"Balance", drawerIcon: ({ focused }) => (
            <Ionicons name="md-wallet" size={24} color={focused ? 'blue' : 'black'} />
          )} },
        UsageHistory: {screen: HomeScreen, navigationOptions:{title:"Usage History", drawerIcon: ({ focused }) => (
            <Ionicons name="md-bicycle" size={24} color={focused ? 'blue' : 'black'} />
          )} },
        Notifications: {screen: HomeScreen, navigationOptions:{title:"Notifications", drawerIcon: ({ focused }) => (
            <Ionicons name="md-notifications" size={24} color={focused ? 'blue' : 'black'} />
          )} },
        Report: {screen: HomeScreen, navigationOptions:{title:"Report", drawerIcon: ({ focused }) => (
            <Ionicons name="md-alert" size={24} color={focused ? 'blue' : 'black'} />
          )} },
        Settings: {screen: HomeScreen, navigationOptions:{title:"Settings", drawerIcon: ({ focused }) => (
            <Ionicons name="md-settings" size={24} color={focused ? 'blue' : 'black'} />
          )} },

    },
    {
        initialRouteName: "Login",
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;