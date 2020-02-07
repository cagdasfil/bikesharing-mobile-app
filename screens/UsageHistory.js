import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import theme from '../constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import { SceneMap, TabView, TabBar } from 'react-native-tab-view';
import ResetPassword from './ResetPassword';

export default class UsageHistory extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <View style={{alignSelf:'stretch', marginTop:10}}>
                    <TouchableOpacity style={{alignItems:'center', justifyContent:'center', marginLeft:10, width:50, height:50,
                        borderRadius:25, backgroundColor:theme.COLORS.JAPANESE_INDIGO}} 
                        onPress= {() => this.props.navigation.toggleDrawer()}>
                        <Ionicons name="md-menu" color={theme.COLORS.SEASHELL} size={35}/>
                    </TouchableOpacity>
                </View>
                <Text>view</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        alignItems:'center',
        backgroundColor: theme.COLORS.SEASHELL,
    }
});