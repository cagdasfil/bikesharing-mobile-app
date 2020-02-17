import { View, Text} from 'react-native';
import React from 'react';
import theme from '../constants/Theme';
import { ScrollView } from 'react-native-gesture-handler';

export default class Transaction extends React.Component {
    
    constructor(props){
        super(props);
    }

    formatDate (date) {
        var datestring = 
            " " 
            + ("0" + date.getDate()).slice(-2)  + "/" 
            + ("0" + (date.getMonth() + 1)).slice(-2)+ "/" 
            + date.getFullYear() + " " 
            + ("0" + date.getHours()).slice(-2) + ":" 
            + ("0" + date.getMinutes()).slice(-2);
            return datestring;
    }

    formatTransactionAmount (amount, type) {
        if(type === "add"){
            return <Text style={{fontSize:28, color:'green'}}>+{amount.toFixed(2)}</Text>;
        }
        else{
            return <Text style={{fontSize:28, color:'crimson'}}>-{amount.toFixed(2)}</Text>;
        }
    }

    render() {
        if(this.props.transactions.length){
            return (
                <ScrollView>
                    {this.props.transactions.map(transaction  =>  (
                        <View key={transaction.key} style={{marginHorizontal:10, marginTop:5, borderBottomWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                            <View style={{flexDirection:'row', marginHorizontal:5}}>
                                <View style={{flex:1}}>
                                    <Text style={{fontWeight:'bold', color:theme.COLORS.JAPANESE_INDIGO}}>{this.formatDate(new Date(transaction.createdAt))}</Text>
                                    <View style={{flexDirection:'row', marginVertical:5, marginLeft:15}}>
                                        <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Type: </Text><Text style={{fontStyle:'italic', color:theme.COLORS.JAPANESE_INDIGO}}>{transaction.type}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                    {this.formatTransactionAmount(transaction.transactionAmount, transaction.type)}
                                </View>
                            </View>
                            <View style={{flexDirection:'row', marginHorizontal:5, marginBottom:5}}>
                                <View style={{flex:1, flexDirection:'row', marginLeft:15}}>
                                    <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Usage ID: </Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>-</Text>
                                </View>
                                <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                                    <Text style={{color:'gray'}}>Balance: </Text><Text style={{color:'gray'}}>{transaction.balanceAfter.toFixed(2)}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            );
        }
        else{
            return (
                <View style={{margin:10, alignItems:'center'}}>
                    <Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>There is no transaction data!</Text>
                </View>
            );
        }
    }
};