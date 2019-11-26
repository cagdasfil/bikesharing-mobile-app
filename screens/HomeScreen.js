import React from 'react';
import {Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class HomeScreen extends React.Component{

    static navigationOptions = {
        title: 'Home',
        drawerIcon: ({ focused }) => (
          <Ionicons name="md-home" size={24} color={focused ? 'blue' : 'black'} />
        ),
    };

    render () {
        return (
            <Text>Home</Text>
        );
    }
};