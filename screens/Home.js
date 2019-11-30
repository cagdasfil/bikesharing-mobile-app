import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import QRScanner from '../QRScanner';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { View, Text } from 'react-native';
import {Icon} from 'react-native-elements';
import { Header } from 'react-native-elements';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Login} from './Login';
import {SignUp} from './SignUp';

export default class Home extends React.Component{

    static navigationOptions = {
        title: 'Home',
        drawerIcon: ({ focused }) => (
          <Ionicons name="md-home" size={24} color={focused ? 'blue' : 'black'} />
        ),
    };

    render () {
        return (
            <View>
                <Header
                    placement="left"
                    leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.props.navigation.openDrawer() }}
                    centerComponent={{ text: 'HOME', style: { color: '#fff', alignItems: 'center' } }}
                />    
                <View style={{marginTop:400, alignItems:'center'}} >
                    <TouchableOpacity>
                        <Ionicons 
                            onPress={()=>{this.props.navigation.navigate('QRScanner')}} 
                            name="md-qr-scanner"
                            size={60} 
                            color={'black'}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};
