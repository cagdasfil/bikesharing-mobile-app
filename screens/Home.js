import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import QRScanner from '../QRScanner';

export default class Home extends React.Component{

    static navigationOptions = {
        title: 'Home',
        drawerIcon: ({ focused }) => (
          <Ionicons name="md-home" size={24} color={focused ? 'blue' : 'black'} />
        ),
    };

    render () {
        return (
            <QRScanner>
            </QRScanner>
        );
    }
};