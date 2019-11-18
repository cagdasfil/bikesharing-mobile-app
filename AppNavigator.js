import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';

const AppNavigator = createStackNavigator({
    Home: { screen: HomeScreen },
    SignUp: { screen: SignUpScreen},
});

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;