import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import theme from '../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import {AsyncStorage} from 'react-native';


export default class Balance extends React.Component{

    constructor () {
        super();
        this.state={
            balance: 0,
            userjson: null,
            loading: false,
            disabled: false 
        };
    }

    addMoney = async () => {
        this.setState({ loading: true, disabled: true }, () => {
          fetch('http://35.234.156.204/payments/addMoney', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId : this.state.userjson.user._id,
                amount : 10,
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

        await this.getUser();
      }
    
    withDrawMoney = async () => {
        this.setState({ loading: true, disabled: true }, () => {
          fetch('http://35.234.156.204/payments/withdrawMoney', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId : this.state.userjson.user._id,
                amount : 10,
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
        await this.getUser();
      }


    getUser = async () => {
        this.setState({ loading: true, disabled: true }, () => {
          fetch('http://35.234.156.204/auth/local', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                identifier : this.state.userjson.username,
                password : "Cgds1996"//this.state.password
            })
          }).then((response) => response.json()).then( async (responseJson) => {
                this.setState({ loading: false, disabled: false });
                if ( "error" in responseJson ){
                  this.setState({response:"Wrong username/email or password!"});
                }
                else{
                  //console.log(responseJson);
                  await this._storeData(JSON.stringify(responseJson));
                  await this.componentWillMount();
                  //this.props.navigation.navigate('Home');
                }
            }).catch((error) => {
                console.error(error);
                this.setState({ loading: false, disabled: false });
              });
        });
      }

    _storeData = async (user) => {
        try {
          await AsyncStorage.setItem('user', user);
        } catch (error) {
          // Error saving data
          console.log(error);
        }
      };
    
      _retrieveData = async (data) => { // takes string input
        try {
          const value = await AsyncStorage.getItem(data);
          return value;
        } catch (error) {
          // Error retrieving data
          console.log(error);
        }
      };

    async componentWillMount () {
        //this.saveData();
        user = await this._retrieveData('user');
        if(user != null){
            userjsoned = JSON.parse(user);
            this.setState({userjson:userjsoned})
            this.setState({balance:userjsoned.user.balance})
        }
        else{
            alert("User authentication failed.");
            this.state.balance = -0.01;
        }
    }

    render () {
        return(
            <View style={styles.container}>
                <View style={{alignSelf:'stretch', marginTop:30}}>
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
                        <Text style={{fontSize:56, color:this.state.balance>=0? theme.COLORS.JAPANESE_INDIGO : 'red'}}>
                            {this.state.balance.toFixed(2)} ₺
                        </Text>
                    </View>
                    <TouchableOpacity style={{flexDirection:'row'}} onPress={this.addMoney}>
                        <View style={{alignItems:'center',
                                        justifyContent:'center',
                                        width:40, 
                                        height:40, 
                                        marginBottom:20,
                                        backgroundColor:theme.COLORS.JAPANESE_INDIGO}}>
                            <Ionicons name="md-add-circle-outline" style={{color:theme.COLORS.SEASHELL}} size={28} />
                        </View>
                        <View style={styles.buttons}>
                            <Text style={styles.buttonText}>ADD MONEY</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flexDirection:'row'}} onPress={this.withDrawMoney}>
                        <View style={{alignItems:'center',
                                        justifyContent:'center',
                                        width:40, 
                                        height:40, 
                                        marginBottom:20,
                                        backgroundColor:theme.COLORS.JAPANESE_INDIGO}}>
                            <Ionicons name="md-remove-circle-outline" style={{color:theme.COLORS.SEASHELL}} size={28} />
                        </View>
                        <View style={styles.buttons}>
                            <Text style={styles.buttonText}>WITHDRAW MONEY</Text>
                        </View>
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
        marginBottom:80,
        backgroundColor: theme.COLORS.DIAMOND,
    },
    balanceText:{
        fontSize:28,
        color: theme.COLORS.JAPANESE_INDIGO,
    },
    buttons:{
        alignItems:'center', 
        justifyContent:'center',
        flexDirection: 'row',
        width:220, 
        height:40, 
        marginBottom:20,
        backgroundColor: theme.COLORS.JAPANESE_INDIGO, 
    },
    buttonText:{
        fontSize: 16,
        fontWeight: '400',
        marginRight: 20,
        color: theme.COLORS.SEASHELL,
    }
});