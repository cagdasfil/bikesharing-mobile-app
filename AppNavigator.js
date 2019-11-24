import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

const AppNavigator = createStackNavigator({
    Login: { screen: LoginScreen },
    SignUp: { screen: SignUpScreen},
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;