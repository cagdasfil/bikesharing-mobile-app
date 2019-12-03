import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';


export default class Session extends React.Component{

    static navigationOptions = {
        drawerLabel: () => null,
        //drawerLockMode: 'locked-closed',
    };

    render () {
        return(
            <View style={{flex:1, alignItems:'center', justifyContent:'space-around'}}>
                <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
                    <Text>USAGE</Text>    
                </View>
                <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity
                            style={{
                                alignItems:'center',
                                justifyContent:'center',
                                backgroundColor:'tomato',
                                width: 70,
                                height: 70,
                                margin: 25,
                                borderRadius: 35,
                                borderWidth: 2
                            }}
                        >
                            <Ionicons name="md-lock" size={20} color='black' />
                            <Text>LOCK</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                alignItems:'center',
                                justifyContent:'center',
                                backgroundColor:'palegreen',
                                width: 70,
                                height: 70,
                                margin: 25,
                                borderRadius: 35,
                                borderWidth: 2
                            }}
                        >
                            <Ionicons name="md-unlock" size={20} color='black' />
                            <Text>UNLOCK</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{
                                alignItems:'center',
                                justifyContent:'center',
                                backgroundColor:'lightgrey',
                                width: 200,
                                height: 50,
                                margin: 10,
                                borderRadius: 5,
                                borderWidth: 2
                            }}
                        >
                            <Text>END SESSION</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}