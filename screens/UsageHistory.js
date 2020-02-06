import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import theme from '../constants/Theme';


export default class UsageHistory extends React.Component {

    render() {
      return (
        <View style={styles.container}>

        </View>
      );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: theme.COLORS.SEASHELL,
    }
});