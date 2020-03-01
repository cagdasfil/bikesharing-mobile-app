import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import React, { useCallback } from 'react';
import theme from '../constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import {AsyncStorage} from 'react-native';
import TransactionCard from '../components/TransactionCard';

export default class Transactions extends React.Component {

    constructor (props) {
        super(props);
        this.state={
            userId: "",
            transactions: [],
            visible: false
        }
    };

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
                        duration: null, //(new Date(result.updatedAt) - new Date(result.createdAt))/60000,
                        totalFee: null, //result.details.usage.totalFee,
                        balanceBefore: null, //result.details.balanceBefore,
                        debt: null,
                        usageDate: null,
                    }))
                    this.setState({transactions});
                    var i;
                    for (let i = 0; i < this.state.transactions.length; i++) {
                        
                        if(this.state.transactions[i].type === "usage" || this.state.transactions[i].type === "stoppage"){
                            transactions[i].duration = (new Date(responseJson.data[i].details.usage.updatedAt) - new Date(responseJson.data[i].details.usage.createdAt))/60000,
                            transactions[i].totalFee = responseJson.data[i].details.usage.totalFee,
                            transactions[i].debt = (responseJson.data[i].details.usage.totalFee - responseJson.data[i].details.transactionAmount),
                            transactions[i].balanceBefore = responseJson.data[i].details.balanceBefore,
                            transactions[i].usageDate = responseJson.data[i].details.usage.createdAt
                        }
                    }
                   
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

    async componentWillMount () {
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
                        borderRadius:25, marginTop:30, backgroundColor:theme.COLORS.JAPANESE_INDIGO}} 
                        onPress= {() => this.props.navigation.toggleDrawer()}>
                        <Ionicons name="md-menu" color={theme.COLORS.SEASHELL} size={35}/>
                    </TouchableOpacity>
                </View>
                <TransactionCard transactions={this.state.transactions}/>
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