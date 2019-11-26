import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import {createDrawerNavigator} from 'react-navigation-drawer';
import HomeScreen from './screens/HomeScreen';

const AppNavigator = createDrawerNavigator(
    {
        Home: { screen: HomeScreen}, 
        Login: { screen: LoginScreen },
        SignUp: { screen: SignUpScreen },
    },
    {
        initialRouteName: "Login",
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;