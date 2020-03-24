import {TextInput, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import React, { useCallback } from 'react';
import theme from '../../constants/Theme';
import { Ionicons } from '@expo/vector-icons';
import {AsyncStorage} from 'react-native';
import RBSheet from "react-native-raw-bottom-sheet";
import Dialog from 'react-native-dialog';
import Modal from "react-native-modal";
var defaultRegion = {
  latitude: 0,
  longitude: 0,
  latitudeDelta: 0,
  longitudeDelta: 0
};

export default class Balance extends React.Component{

    constructor (props) {
        super(props);
        this.state={
            balance: 0,
            addMoney:0,
            withdrawnMoney:0,
            addMoneyResponse:null,
            withdrawResponseMessage:null,
            visible:false,
            visible2: false,
            check:false,
            Successful:false,
            userjson: null,
            userId: "",
            loading: false,
            disabled: false ,
            numberValid: false,
            inDebt: false,
            currentDept: 5,
            region:defaultRegion
        };
    }

    // It takes debt amount from database
    getDebt = async () => {
      this.setState({ loading: true, disabled: true }, async () => {
        fetch('http://35.234.156.204/payments/getDebt/'+ this.state.userId, {
          method: 'GET',
          headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
          }
        }).then((response) => response.json()).then(async (responseJson) => {
              this.setState({ loading: false, disabled: false });
              this.setState({ inDebt: false})
              if ( responseJson.status === 200 ){ // Status code 200 means there is debt
                this.setState({ inDebt: true, currentDept: responseJson.data.totalDebt}) // inDebt=true makes warning visible
              }
              else{
                this.setState({ inDebt: false})
              }
          }).catch((error) => {
              console.error(error);
              this.setState({ loading: false, disabled: false });
            });
      });
    }


    addMoney = async () => {
        this.setState({ loading: true, disabled: true }, () => {
          fetch('http://35.234.156.204/transactions/addMoney', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId : this.state.userjson.user._id,
                amount : Number(this.state.addMoney),
            })
          }).then((response) => response.json()).then((responseJson) => {
                this.setState({ loading: false, disabled: false });
                if(responseJson.status===200){
                  this.setState({
                    balance : responseJson.data.newBalance,
                    visible:true, numberValid: false},
                    
                    );
                    if(responseJson.data.withdrawedForDebt>0){
                      this.setState({addMoneyResponse: "Successfully Added, " + String(responseJson.data.withdrawedForDebt.toFixed(2))+ "₺ Stoppaged!"})
                    }
                    else{
                      this.setState({addMoneyResponse: "Successfully Added."})
                    }
                  this.state.userjson.user.balance = responseJson.data.newBalance;
                  this._storeData("user",JSON.stringify(this.state.userjson));
                  this.props.navigation.navigate('Home');
                  this.getDebt(); // Check debt whenever adding money
                  
                }
                else{
                  alert(responseJson.message);
                  
                }
            }).catch((error) => {
                console.error(error);
                this.setState({ loading: false, disabled: false });
              });
        });
      }
    
    withDrawMoney = async () => {
        this.setState({ loading: true, disabled: true }, () => {
          fetch('http://35.234.156.204/transactions/withdrawMoney', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId : this.state.userjson.user._id,
                amount : Number(this.state.withdrawnMoney),
            })
          }).then((response) => response.json()).then((responseJson) => {
                this.setState({ loading: false, disabled: false });
                if(responseJson.status===200){
                  this.setState({withdrawResponseMessage: "Successfully withdrawn. ", numberValid: false})
                  this.setState({
                    balance : responseJson.data.newBalance, Successful : true, visible2:true});
                  this.state.userjson.user.balance = responseJson.data.newBalance;
                  this._storeData("user",JSON.stringify(this.state.userjson));
                  this.props.navigation.navigate('Home');
                }
                else{
                  this.setState({withdrawResponseMessage:responseJson.message})
                  this.setState({
                    Successful : false, visible2:true});
                }
            }).catch((error) => {
                console.error(error);
                this.setState({ loading: false, disabled: false });
              });
        });
      }

      _storeData = async (dataContainer, data) => { //both parameters are string.
        try {
          await AsyncStorage.setItem(dataContainer, data);
        } catch (error) {
          // Error saving data
          console.log(error);
        }
      };
    
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

    componentDidMount (){
      navigator.geolocation.getCurrentPosition(
        (position)=>{
          this.setState({
            region: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: 0.003,
              longitudeDelta: 0.003,
            },
          });
        },
        {enableHighAccuracy:false,timeout:20000,maximumAge:1000}
      )
      this._storeData("position", JSON.stringify(this.state.region));
      
      const {navigation} = this.props;
      this.focusListener = navigation.addListener('didFocus', async () => { 
        user = await this._retrieveData('user');
        userjsoned = JSON.parse(user);
        this.setState({balance : userjsoned.user.balance})
        this.getDebt(); // When back to balance page, check debt again
      });
      
     
      
    }
    
    componentWillUnmount(){
      this.focusListener.remove();
    }

    async componentWillMount () {
        user = await this._retrieveData('user');
        if(user != null){
            userjsoned = JSON.parse(user);
            this.setState({userjson:userjsoned})
            this.setState({balance:userjsoned.user.balance});
            this.setState({userId:userjsoned.user._id}); // attach userId to variable
            this.getDebt(); // check debt
        }
        else{
            alert("User authentication failed.");
            this.state.balance = -0.01;
        }
        
    }

    validate(text, type){

      number=/^\d+(,\d{2})?$/

      var values = text.split(",")
      var v1 = parseFloat(values[0])
      var v2 = parseFloat(values[1])

      if(!v1 && !v2){
        this.setState({
          numberValid:false,
        })
      }

  
      else if(type==='addedNumber'){
        if(number.test(text))
        {
          this.setState({
            numberValid:true,
            addMoney: text.replace(",", "."),
          })

          
          
        }
        else
        {
          this.setState({
            numberValid:false,
          })
        }
  
      }
      else if(type==='withDrawnNumber' ){
        if(number.test(text))
        {
          this.setState({
            numberValid:true,
            withdrawnMoney: text.replace(",", "."),
          })
        }
        else
        {
          this.setState({
            numberValid:false,
          })
        }
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
                        {this.state.inDebt ? // If inDebt = true make visible 
                        <Text style={{fontSize:20, color: 'red'}}>
                          You owe {this.state.currentDept.toFixed(2)} ₺
                        </Text>
                        : null}
                    </View>
                    
                    <TouchableOpacity style={{flexDirection:'row'}} onPress = {() => {
                      this.RBSheet.open(), this.setState({ check: true });
                    }} >
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
                    <TouchableOpacity 
                      style={{flexDirection:'row'}} 
                      onPress={() => {
                        this.RBSheet.open(), this.setState({ check: false });
                      }}>
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
                    <RBSheet onClose = {() => this.setState({ visible: false, visible2: false })}
                    ref={ref => {
                        this.RBSheet = ref;
                    }}
                    height={200}
                    duration={250}
                    customStyles={{
                        container: {
                            justifyContent: "center",
                            alignItems: "center"
                        }
                    }}>
                    {this.state.check ?
                        <View>
                            <View style={{justifyContent:'center', flexDirection:'row', alignItems:'center', marginTop:10,marginBottom:10}}>
                                <TextInput
        
                                keyboardType='numeric'
                                style={{borderWidth:1,borderRadius:5,borderColor:theme.COLORS.JAPANESE_INDIGO, fontSize:30, textAlign:'center', height:40, width:200, backgroundColor:"#fff", color:theme.COLORS.JAPANESE_INDIGO}}
                                onChangeText = {(text) => this.validate(text, 'addedNumber')}
                                placeholder = "0,00₺"
                                />
                            </View>
                            <View style={{marginBottom:30, flexDirection:'row'}}>
                                <TouchableOpacity
                                    style={{backgroundColor:theme.COLORS.DIAMOND, justifyContent:'center', width:110, height:40, padding:5, margin:10, }}
                                    onPress={() => {this.state.numberValid ? this.addMoney() : alert("Invalid Value")}}>
                                    <Text style={{textAlign:"center", fontWeight:"700", color:theme.COLORS.JAPANESE_INDIGO}}>OK</Text>
                                    
                                </TouchableOpacity>
                                {this.state.visible ? 
                                    <View style={{ alignItems:'center',justifyContent:'center'}} >
                                        <Dialog.Container
                                        onBackdropPress={() => {this.setState({ visible: false }),this.RBSheet.close()}} 
                                        visible={this.state.visible}>
                                                                                        
                                                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center',marginBottom:30}} >    
                                                    <Ionicons name='md-checkmark-circle-outline' size={40} color='#24ab09'/>
                                                    
                                                    <Text style={{fontSize:20}}>{this.state.addMoneyResponse}</Text>
                                                </View>
                                            
                                        </Dialog.Container>
                                    </View>
                                : null}
                                <TouchableOpacity
                                    style={{backgroundColor:theme.COLORS.DIAMOND, justifyContent:'center', width:110, height:40, padding:5, margin:10, }}
                                    onPress={() => {
                                        this.RBSheet.close();
                                    }}>
                                    <Text style={{textAlign:"center", fontWeight:"700", color:theme.COLORS.JAPANESE_INDIGO}}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    :
                        <View>
                            <View style={{justifyContent:'center', flexDirection:'row', alignItems:'center', marginTop:10,marginBottom:10}}>
                                <TextInput
                                keyboardType='numeric'
                                style={{borderWidth:1,borderRadius:5,borderColor:theme.COLORS.JAPANESE_INDIGO, fontSize:30, textAlign:'center', height:40, width:200, backgroundColor:"#fff", color:theme.COLORS.JAPANESE_INDIGO}}
                                onChangeText = {(text) => this.validate(text, 'withDrawnNumber')}
                                placeholder = "0,00₺"
                                />
                            </View>
                            <View style={{marginBottom:30, flexDirection:'row'}}>
                                <TouchableOpacity
                                    style={{backgroundColor:theme.COLORS.DIAMOND, justifyContent:'center', width:110, height:40, padding:5, margin:10, }}
                                    onPress={() => {this.state.numberValid ? this.withDrawMoney() : alert("Invalid Value")}}>
                                    <Text style={{textAlign:"center", fontWeight:"700", color:theme.COLORS.JAPANESE_INDIGO}}>OK</Text>
                                    
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{backgroundColor:theme.COLORS.DIAMOND, justifyContent:'center', width:110, height:40, padding:5, margin:10, }}
                                    onPress={() => {
                                        this.RBSheet.close();
                                    }}>
                                    <Text style={{textAlign:"center", fontWeight:"700", color:theme.COLORS.JAPANESE_INDIGO}}>Cancel</Text>
                                </TouchableOpacity>
                                {this.state.visible2 ?
                                    <View>              
                                    {this.state.Successful ? 
                                        <View style={{ alignItems:'center',justifyContent:'center'}}>
                                            <Dialog.Container
                                            onBackdropPress={() => {this.setState({ visible2: false }),this.RBSheet.close()}} 
                                            visible={this.state.visible2}>
                                                    <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center',marginBottom:30}}>
                                                        <Ionicons name='md-checkmark-circle-outline' size={40} color='#24ab09'/>
                                                        <Text style={{fontSize:20}}>{this.state.withdrawResponseMessage}</Text>   
                                                    </View>
                                            </Dialog.Container>
                                        </View>
                                    :
                                        <View style={{ alignItems:'center',justifyContent:'center'}}>
                                            <Dialog.Container
                                            onBackdropPress={() => {this.setState({ visible2: false }), this.RBSheet.close()}} 
                                            visible={this.state.visible2}>
                                                
                                                    <View style={{flexDirection:'row', alignItems:'center',justifyContent:'center',marginBottom:30}} >
                                                        <Ionicons name='md-close-circle-outline' size={40} color='#9e0303' />
                                                        <Text style={{fontSize:20}}>{this.state.withdrawResponseMessage}</Text>   
                                                    </View>
                                            </Dialog.Container>   
                                        </View>
                                    }
                                    </View> 
                                : null}
                            </View>
                        </View>
                    }
                </RBSheet>

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
    amount:{
      fontSize:56,
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