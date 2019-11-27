import React from 'react';
import {Text, View} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
                    centerComponent={{ text: 'HOME', style: { color: '#fff' } }}
                    rightComponent={{ icon: 'home', color: '#fff' }}
                />
            </View>
        );
    }
};