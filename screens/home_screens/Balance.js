import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import theme from '../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';


export default class Balance extends React.Component{

    constructor () {
        super();
        this.state={
            balance: 0,
            userId: "",
        };
    }
    addMoney = () => {
        this.setState({ loading: true, disabled: true }, () => {
          fetch('http://35.234.156.204/payments/addMoney', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId : "5de40e78d8b373149471f969",//this.state.userId,
                amount : 20,
            })
          }).then((response) => response.json()).then((responseJson) => {
                this.setState({ loading: false, disabled: false });
                if(responseJson.errorCode===-201){
                alert("There is no such a user!");
                }
                else if(responseJson.errorCode===-200){
                alert(responseJson.message);
                }
                else{
                  alert("Add Money Operation Successful");
                }
            }).catch((error) => {
                console.error(error);
                this.setState({ loading: false, disabled: false });
              });
        });
      }
    withDrawMoney = () => {
        this.setState({ loading: true, disabled: true }, () => {
          fetch('http://35.234.156.204/payments/withdrawMoney', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId : "5de40e78d8b373149471f969",//this.state.userId,
                amount : 20,
            })
          }).then((response) => response.json()).then((responseJson) => {
                this.setState({ loading: false, disabled: false });
                if(responseJson.errorCode===-211){
                alert("There is no such a user!");
                }
                else if(responseJson.errorCode===-212){
                alert(responseJson.message);
                }
                else if(responseJson.errorCode===-210){
                alert(responseJson.message);
                }
                else{
                  alert('Withdraw Money Operation Successful!');
                }
            }).catch((error) => {
                console.error(error);
                this.setState({ loading: false, disabled: false });
              });
        });
      }

    componentWillMount () {
        this.state.balance = 27.50;
    }

    render () {
        return(
            <View style={styles.container}>
                <View style={{alignSelf:'stretch', marginTop:50}}>
                    <TouchableOpacity style={{alignItems:'center', justifyContent:'center', marginLeft:10, width:50, height:50,
                        borderRadius:25, backgroundColor:theme.COLORS.JAPANESE_INDIGO}} 
                        onPress= {() => this.props.navigation.toggleDrawer()}>
                        <Ionicons name="md-menu" color={theme.COLORS.SEASHELL} size={35}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.balanceContainer}>
                        <Text style={styles.balanceText}>
                            Balance:
                        </Text>
                        <Text style={styles.amount}>
                            {this.state.balance.toFixed(2)} ₺
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.buttons} onPress={() => this.addMoney()}>
                        <Text style={styles.buttonText}>ADD MONEY</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttons} onPress={() => this.withDrawMoney()}>
                        <Text style={styles.buttonText}>WITHDRAW MONEY</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}
    
const styles = StyleSheet.create({
    container:{
        flex:1, 
        alignItems:'center', 
        backgroundColor: theme.COLORS.SEASHELL,
    },
    contentContainer:{
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