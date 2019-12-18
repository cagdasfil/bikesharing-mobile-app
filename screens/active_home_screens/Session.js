import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Stopwatch } from 'react-native-stopwatch-timer';
import theme from '../../constants/Theme';
import ToggleSwitch from 'rn-toggle-switch'
import {AsyncStorage} from 'react-native';


export default class Session extends React.Component{

    constructor(props) {
        
        super(props);
        
        this.state = {
          amount: 12.60,
          sessionStartTime: new Date(),
          stopwatchStartTime: 100000,
          value: true,
          sessionjson: null,
        };
        
        this.getAmount = this.getAmount.bind(this);
        this.toggleSwitch = this.toggleSwitch.bind(this);
        this.formatDate = this.formatDate.bind(this);
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


    saveData = () => {
        this.setState({ loading: true, disabled: true }, () => {
          fetch('http://35.234.156.204/usages/openSession/5de53b46913bba38ecc6bc5a', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
          }).then((response) => response.json()).then( async (responseJson) => {
                this.setState({ loading: false, disabled: false });
                if ( "errorCode" in responseJson ){
                  this.setState({response:"error"});
                }
                else{
                    console.log(responseJson);
                    await this._storeData(JSON.stringify(responseJson));
                }
            }).catch((error) => {
                console.error(error);
                this.setState({ loading: false, disabled: false });
              });
        });
      }

    _storeData = async (session) => {
        try {
          await AsyncStorage.setItem('session', session);
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

    endSession = () => {
        this.setState({ loading: true, disabled: true }, () => {
          fetch('http://35.234.156.204/usages/endSession', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId : this.state.userjson.user._id,//this.state.userId,
                dockerId : "5defe5061f11c212b835d023" //this.state.lastDockerId
            })
          }).then((response) => response.json()).then((responseJson) => {
                this.setState({ loading: false, disabled: false });
                if(responseJson.errorCode == -111){
                    alert('You have no any open session!')
                }
                else if(responseJson.errorCode == -110){
                    alert(responseJson.message)
                }
                else{
                    alert(responseJson.message)
                    console.log(responseJson.message);
                    this.props.navigation.navigate("Home");
                }
            }).catch((error) => {
                console.error(error);
                this.setState({ loading: false, disabled: false });
              });
        });
      }

    
    getAmount() {
        diff = new Date() - this.state.sessionStartTime;
        diff = diff/60000.0;
        totalPayment = 0;
        if(diff>5){
            totalPayment += 5.0
        }
        if(diff>60){
            totalPayment += (diff-60)*0.1;
        }
        this.setState({amount:totalPayment});
    }

    toggleSwitch(isOn){
        return !isOn;
    }

    async componentWillMount() {

        await this.saveData();

        session = await this._retrieveData("session");

        sessionjson = JSON.parse(session);

        sessionStartTime = new Date(sessionjson.data.createdAt);

        diff = new Date() - sessionStartTime;

        console.log("diff", diff);
        
        this.setState({stopwatchStartTime:diff, sessionStartTime:sessionStartTime});

        this.getAmount();

        user = await this._retrieveData('user');
        if(user != null){
            userjsoned = JSON.parse(user);
            this.setState({userjson:userjsoned})
        }
        else{
            alert("User authentication failed.");
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
                <View style={{flex:3, alignItems:'center', justifyContent:'center', marginTop:10}}>
                    <View style={{flexDirection:'row', marginBottom:10}}>
                        <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontSize:16, fontWeight:'bold'}}>
                            Start Time : 
                        </Text>
                        <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontSize:16}}>
                            {this.formatDate(this.state.sessionStartTime)}
                        </Text>
                    </View>
                    <Stopwatch laps secs start
                        startTime = {this.state.stopwatchStartTime}
                        options = {stopwatchOptions}
                    />
                    <View style={{flexDirection:'row', marginBottom:10}}>
                        <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontSize:24, fontWeight:'bold'}}>
                            Total : 
                        </Text>
                        <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontSize:24}}>
                            {this.state.amount.toFixed(2)} ₺
                        </Text>
                    </View>
                </View>

                <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                    <ToggleSwitch
                        text={{on: 'UNLOCKED',
                              off: 'LOCKED', 
                              activeTextColor: theme.COLORS.JAPANESE_INDIGO, 
                              inactiveTextColor: theme.COLORS.JAPANESE_INDIGO}}
                        textStyle={{fontWeight: 'normal', fontSize:16, fontStyle:'italic'}}
                        color={{ indicator: theme.COLORS.JAPANESE_INDIGO, 
                                 active: 'lightgreen', 
                                 inactive:  'tomato', 
                                 activeBorder: theme.COLORS.SEASHELL, 
                                 inactiveBorder: theme.COLORS.SEASHELL}}
                        active={true}
                        disabled={false}
                        width={150}
                        radius={35}
                        onValueChange={(val) => {
                        /* your handler function... */
                        }}
                    />
                </View>

                <View style={{flex:1, flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}}>
                    <TouchableOpacity
                        style={{
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:theme.COLORS.JAPANESE_INDIGO,
                            /*
                            width: 240,
                            height: 80,
                            borderTopLeftRadius: 80,
                            borderTopRightRadius: 80,
                            paddingTop: 15
                            
                           flex:1,
                           flexDirection:'row',
                            */
                           flex:1,
                           height:60
                        }}
                        onPress = {this.endSession}
                    >
                        <Text style={{fontSize: 16, fontWeight: '400', color: theme.COLORS.SEASHELL,}}>END SESSION</Text>
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
    }
  });

  const stopwatchOptions = {
    container: {
        alignItems:'center',
        justifyContent:'center',
        width:180,
        height:180,
        borderRadius:90,
        marginBottom:40,
        backgroundColor: theme.COLORS.DIAMOND,
    },
    text: {
      fontSize: 35,
      fontWeight: 'bold',
      color: theme.COLORS.JAPANESE_INDIGO,
    }
  };