import React from "react";
import { Easing, Animated, View, Text, StyleSheet } from "react-native";
import {createAppContainer} from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {Header} from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import theme from "../constants/Theme";
import { Ionicons } from '@expo/vector-icons';

// screens
import Login from "../screens/Login";
import Session from "../screens/active_home_screens/Session";
import Balance from "../screens/home_screens/Balance";
import Dockers from "../screens/home_screens/Dockers";
import QRScanner from "../screens/home_screens/QRScanner";
import SignUp from '../screens/SignUp';
import RecoveryPassword from '../screens/RecoveryPassword';
import ResetPassword from '../screens/ResetPassword';

// drawer
import Menu from "./Menu";
import DrawerItem from "../components/DrawerItem";

const transitionConfig = (transitionProps, prevTransitionProps) => ({
    transitionSpec: {
      duration: 400,
      easing: Easing.out(Easing.poly(4)),
      timing: Animated.timing
    },
    screenInterpolator: sceneProps => {
      const { layout, position, scene } = sceneProps;
      const thisSceneIndex = scene.index;
      const width = layout.initWidth;
  
      const scale = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [4, 1, 1]
      });
      const opacity = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
        outputRange: [0, 1, 1]
      });
      const translateX = position.interpolate({
        inputRange: [thisSceneIndex - 1, thisSceneIndex],
        outputRange: [width, 0]
      });
  
      const scaleWithOpacity = { opacity };
      const screenName = "Search";
  
      if (
        screenName === transitionProps.scene.route.routeName ||
        (prevTransitionProps &&
          screenName === prevTransitionProps.scene.route.routeName)
      ) {
        return scaleWithOpacity;
      }
      return { transform: [{ translateX }] };
    }
  });

  const HomeStack = createBottomTabNavigator(
    {
      Balance: {screen: Balance}, //navigationOptions:{tabBarLabel: ()=>{ return <View style={{backgroundColor:'red', flex:1}}><Text>asd</Text></View> }}},
      scan: {screen: QRScanner},
      Dockers: {screen: Dockers}
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          let size;
          if (routeName === 'Balance') {
            iconName = 'md-wallet';
            size = 40;
          }
          else if (routeName === 'scan') {
            iconName = 'md-qr-scanner';
            size = 40;
          }
          else if (routeName === 'Dockers') {
            iconName = 'md-pin';
            size = 40;
          }
          return <Ionicons name={iconName} size={size} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeBackgroundColor:theme.COLORS.JAPANESE_INDIGO,
        inactiveBackgroundColor: theme.COLORS.SEASHELL,
        tabStyle:{marginLeft:10, marginRight:10, marginBottom:5, marginTop:5, borderRadius:10},
        activeTintColor: theme.COLORS.SEASHELL,
        inactiveTintColor: theme.COLORS.JAPANESE_INDIGO,
        style: {height:80, borderTopColor:theme.COLORS.SEASHELL, backgroundColor:theme.COLORS.SEASHELL},
      },
    }
  );
  
  const SessionStack = createBottomTabNavigator(
    {
      Session: {screen: Session},
      Dockers: {screen: Dockers}
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          let size;
          if (routeName === 'Session') {
            iconName = 'md-time';
            size = 40;
          }
          else if (routeName === 'Dockers') {
            iconName = 'md-pin';
            size = 40;
          }
          return <Ionicons name={iconName} size={size} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeBackgroundColor:theme.COLORS.JAPANESE_INDIGO,
        inactiveBackgroundColor: theme.COLORS.SEASHELL,
        tabStyle:{marginLeft:10, marginRight:10, marginBottom:5, marginTop:5, borderRadius:10},
        activeTintColor: theme.COLORS.SEASHELL,
        inactiveTintColor: theme.COLORS.JAPANESE_INDIGO,
        style: {height:80, borderTopColor:theme.COLORS.SEASHELL, backgroundColor:theme.COLORS.SEASHELL},
      },
    }
  );

/*
const ArticlesStack = createStackNavigator({
    Articles: {
      screen: Articles,
      navigationOptions: ({ navigation }) => ({
        header: <Header title="Articles" navigation={navigation} />
      })
    }
  },{
    cardStyle: {
      backgroundColor: "#F8F9FE"
    },
    transitionConfig
  });

  const ProfileStack = createStackNavigator(
    {
      Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => ({
          header: (
            <Header white transparent title="Profile" iconColor={'#FFF'} navigation={navigation} />
          ),
          headerTransparent: true
        })
      }
    },
    {
      cardStyle: { backgroundColor: "#FFFFFF" },
      transitionConfig
    }
  );
  
  const HomeStack = createStackNavigator(
    {
      Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
          header: <Header search options title="Home" navigation={navigation} />
        })
      },
      Pro: {
        screen: Pro,
        navigationOptions: ({ navigation }) => ({
          header: (
            <Header left={<Block />} white transparent title="" navigation={navigation} />
          ),
          headerTransparent: true
        })
      }
    },
    {
      cardStyle: {
        backgroundColor: "#F8F9FE"
      },
      transitionConfig
    }
  );
*/


const AppStack = createDrawerNavigator(
    {
      Login: {
        screen: Login,
        navigationOptions: navOpt => ({
          drawerLabel: ({ focused }) => (
            <DrawerItem focused={focused} title="Login" />
          )
        })
      },
      Home: {
        screen: HomeStack,
        navigationOptions: navOpt => ({
          drawerLabel: ({ focused }) => (
            <DrawerItem focused={focused} title="Home" />
          )
        })
      },
      Session: {
        screen: SessionStack,
        navigationOptions: navOpt => ({
          drawerLabel: ({ focused }) => (
            <DrawerItem focused={focused} title="Session" />
          )
        })
      },
      SignUp: {
        screen: SignUp,
        navigationOptions: navOpt => ({
          drawerLabel: ({ focused }) => (
            <DrawerItem focused={focused} title="SignUp" />
          )
        })
      },
      Recovery: {
        screen: RecoveryPassword,
        navigationOptions: navOpt => ({
          drawerLabel: ({ focused }) => (
            <DrawerItem focused={focused} title="Recovery" />
          )
        })
      },
      Reset: {
        screen: ResetPassword,
        navigationOptions: navOpt => ({
          drawerLabel: ({ focused }) => (
            <DrawerItem focused={focused} title="Reset" />
          )
        })
      },
      UsageHistory: {
        screen: HomeStack,
        navigationOptions: navOpt => ({
          drawerLabel: ({ focused }) => (
            <DrawerItem focused={focused} title="UsageHistory" />
          )
        })
      },
      Notifications: {
        screen: HomeStack,
        navigationOptions: navOpt => ({
          drawerLabel: ({ focused }) => (
            <DrawerItem focused={focused} title="Notifications" />
          )
        })
      },
      Report: {
        screen: HomeStack,
        navigationOptions: navOpt => ({
          drawerLabel: ({ focused }) => (
            <DrawerItem focused={focused} title="Report" />
          )
        })
      },
      Settings: {
        screen: HomeStack,
        navigationOptions: navOpt => ({
          drawerLabel: ({ focused }) => (
            <DrawerItem focused={focused} title="Settings" />
          )
        })
      },
      QRScanner: {
        screen: QRScanner,
        navigationOptions: navOpt => ({
          drawerLabel: ({ focused }) => (
            <DrawerItem focused={focused} title="QRScanner" />
          )
        })
      },
    },
    Menu
  );
  
  const AppContainer = createAppContainer(AppStack);
  export default AppContainer;
  

  const styles = StyleSheet.create({
    tabContainer:{
      flexDirection:'row',
      height:80,
    }
  });
