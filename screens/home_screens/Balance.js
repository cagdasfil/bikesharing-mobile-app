import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

export default class Balance extends React.Component{

    constructor () {
        super();
        this.state={
            balance: 0,
        };
    }

    componentWillMount () {
        this.state.balance = 27.50;
    }

    render () {
        return(
            <View style={styles.container}>
                <Text style={styles.balance}>
                    Balance:
                </Text>
                <Text style={styles.amount}>
                    {this.state.balance.toFixed(2)} ₺
                </Text>
                <TouchableOpacity style={styles.buttons}>
                    <Text style={{fontSize:20}}>Add money</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}>
                    <Text style={{fontSize:20}}>Withdraw money</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
    
const styles = StyleSheet.create({
    container:{
        flex:1, 
        alignItems:'center', 
        justifyContent:'center'
    },
    balance:{
        fontSize:32,
    },
    amount:{
        fontSize:66,
        marginBottom:50,
    },
    buttons:{
        alignItems:'center', 
        justifyContent:'center',
        width:240, 
        height:40, 
        marginTop:30, 
        borderWidth:1,
        borderRadius:3,
        backgroundColor:'lightgrey', 
    }
});