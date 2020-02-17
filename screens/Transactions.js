import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import React from 'react';
import theme from '../constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import {AsyncStorage} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';


export default class Transactions extends React.Component {

    constructor (props) {
        super(props);
        this.state={
            userId: "",
            transactions: [],
        }
    };

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

    formatTransactionAmount (amount) {
        if(amount>0){
            return <Text style={{fontSize:28, color:'green'}}>+{amount.toFixed(2)}</Text>;
        }
        else{
            return <Text style={{fontSize:28, color:'crimson'}}>-{amount.toFixed(2)}</Text>;
        }
    }

    getTransactions = async () => {
        this.setState({ loading: true, disabled: true ,responseJS: ""}, () => {
          fetch('http://35.234.156.204/transactions/withDetails/' + this.state.userId, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
          }).then((response) => response.json()).then( async (responseJson) => {
                this.setState({ loading: false, disabled: false });
                    const transactions = responseJson.data.map((result) => ({
                        key : result.id,
                        createdAt: result.createdAt,
                        transactionAmount: result.details.transactionAmount,
                        balanceAfter: result.details.balanceAfter,
                        type: result.operationType,
                    }))
                    this.setState({transactions});
            }).catch((error) => {
                console.error(error);
                this.setState({ loading: false, disabled: false });
              });
        });
    }

    _retrieveData = async (dataContainer) => { // takes string input
        try {
          const value = await AsyncStorage.getItem(dataContainer);
          if (value != null){
            return value;
          }
        } catch (error) {
          // Error retrieving data
          console.log(error);
        }
    };

    async componentDidMount () {
        user = await this._retrieveData('user');
        userjsoned = JSON.parse(user);
        this.setState({userId : userjsoned.user._id});
        this.getTransactions();
    }

    render() {
        return (
            <View style={styles.container}>
                <View>
                    <TouchableOpacity style={{alignItems:'center', justifyContent:'center', margin:10, width:50, height:50,
                        borderRadius:25, backgroundColor:theme.COLORS.JAPANESE_INDIGO}} 
                        onPress= {() => this.props.navigation.toggleDrawer()}>
                        <Ionicons name="md-menu" color={theme.COLORS.SEASHELL} size={35}/>
                    </TouchableOpacity>
                </View>
                <ScrollView>
                    {this.state.transactions.map(transaction  =>  (
                        <View key={transaction.key} style={{marginHorizontal:10, marginTop:5, borderBottomWidth:1, borderColor:theme.COLORS.JAPANESE_INDIGO}}>
                            <View style={{flexDirection:'row', marginHorizontal:5}}>
                                <View style={{flex:1}}>
                                    <Text style={{fontWeight:'bold', color:theme.COLORS.JAPANESE_INDIGO}}>{this.formatDate(new Date(transaction.createdAt))}</Text>
                                    <View style={{flexDirection:'row', marginVertical:5, marginLeft:15}}>
                                        <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Type: </Text><Text style={{fontStyle:'italic', color:theme.COLORS.JAPANESE_INDIGO}}>{transaction.type}</Text>
                                    </View>
                                </View>
                                <View style={{flex:1, alignItems:'flex-end', justifyContent:'center'}}>
                                    {this.formatTransactionAmount(transaction.transactionAmount)}
                                </View>
                            </View>
                            <View style={{flexDirection:'row', marginHorizontal:5, marginBottom:5}}>
                                <View style={{flex:1, flexDirection:'row', marginLeft:15}}>
                                    <Text style={{fontWeight:'normal', color:theme.COLORS.JAPANESE_INDIGO}}>Usage ID: </Text><Text style={{color:theme.COLORS.JAPANESE_INDIGO}}>-</Text>
                                </View>
                                <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                                    <Text style={{color:'gray'}}>Balance: </Text><Text style={{color:'gray'}}>{transaction.balanceAfter}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor: theme.COLORS.SEASHELL,
    }
});