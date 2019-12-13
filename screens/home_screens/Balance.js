import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import theme from '../../constants/Theme';

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
                <View style={styles.balanceContainer}>
                    <Text style={styles.balanceText}>
                        Balance:
                    </Text>
                    <Text style={styles.amount}>
                        {this.state.balance.toFixed(2)} ₺
                    </Text>
                </View>
                <TouchableOpacity style={styles.buttons}>
                    <Text style={styles.buttonText}>ADD MONEY</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttons}>
                    <Text style={styles.buttonText}>WITHDRAW MONEY</Text>
                </TouchableOpacity>
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
    },
    balanceContainer:{
        alignItems:'center',
        justifyContent:'center',
        width:250,
        height:250,
        borderRadius:125,
        marginBottom:30,
        backgroundColor: theme.COLORS.DIAMOND,
    },
    balanceText:{
        fontSize:28,
        color: theme.COLORS.JAPANESE_INDIGO,
    },
    amount:{
        fontSize:56,
        color: theme.COLORS.JAPANESE_INDIGO,
    },
    buttons:{
        alignItems:'center', 
        justifyContent:'center',
        width:240, 
        height:40, 
        marginTop:30, 
        //borderWidth:1,
        //borderRadius:3,
        borderColor: theme.COLORS.JAPANESE_INDIGO,
        backgroundColor: theme.COLORS.JAPANESE_INDIGO, 
    },
    buttonText:{
        fontSize: 16,
        fontWeight: '400',
        color: theme.COLORS.SEASHELL,
    }
});