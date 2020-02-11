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
          amount: 0,
          sessionStartTime: new Date(),
          stopwatchStartTime: 0,
          reset: false,
          session: null,
          user: null,
          isLocked: true,
<<<<<<< HEAD
          isOK: false
=======
          isOK: false,
          isWatchOK: false,
          stopwatchStart:false
>>>>>>> ed48bf2f909515fe6d13bbda82bbaf26766511e4
        };
        this.resetStopwatch = this.resetStopwatch.bind(this);
        this.toggleStopwatch = this.toggleStopwatch.bind(this);


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
            if(value !== null)
             {return value;}
            else
             {return null;}

        } catch (error) {
          // Error retrieving data
          console.log(error);
        }
      };

      getSessionStartTime = () => {
        try{
            this.setState({sessionStartTime: new Date(this.state.session.createdAt)});
            this.getAmount();
        }catch(err){
            console.error(err);
        }
      }

    endSession = () => {
        this.setState({ loading: true, disabled: true }, () => {
          fetch('http://35.234.156.204/usages/endSession', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId : this.state.user.user._id,
                dockerId : "5defe5061f11c212b835d023"
            })
          }).then((response) => response.json()).then((responseJson) => {
                this.setState({ loading: false, disabled: false });
                if(responseJson.status === 200){    
                    
                    alert('Total payment is : ' + responseJson.data.totalPayment.toFixed(2) + ' ₺.')
                    this._storeData("user", JSON.stringify(responseJson.data));
                    AsyncStorage.removeItem('session');
                    this.setState({reset:false});
                    this.props.navigation.navigate("Home");

                }
                else{
                    alert(responseJson.message)
                }
            }).catch((error) => {
                console.error(error);
                this.setState({ loading: false, disabled: false });
              });
        });
      }

      async getLockStatus(){
        
        this.setState({ loading: true, disabled: true }, () => {
            fetch('http://35.234.156.204/bikes/' + this.state.session.bikeId, {
              method: 'GET',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              }
            }).then((response) => response.json()).then( async (responseJson) => {
                  this.setState({ loading: false, disabled: false });
                  
                  if ("error" in responseJson){
                    alert(responseJson.message);
                  }
                  else{
                      this.setState({isLocked:responseJson.isLocked, isOK:true});
<<<<<<< HEAD
                      console.log("1-"+this.state.isLocked);
                      console.log("2-"+responseJson.isLocked);
                      
                      
=======
>>>>>>> ed48bf2f909515fe6d13bbda82bbaf26766511e4
                  }
              }).catch((error) => {
                  console.error(error);
                  this.setState({ loading: false, disabled: false });
                });
          });
          return true;
        
      }

      changeLockState(){
        this.setState({ loading: true, disabled: true }, () => {
            fetch('http://35.234.156.204/bikes/changeLockState', {
              method: 'POST',
              headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  bikeId : this.state.session.bikeId
              })
            }).then((response) => response.json()).then((responseJson) => {
                    
                this.setState({ loading: false, disabled: false });
                //alert(responseJson.message)
                  
              }).catch((error) => {
                  console.error(error);
                  this.setState({ loading: false, disabled: false });
                });
          });
      }

    
    getAmount() {
        diff = new Date() - this.state.sessionStartTime;
        this.setState({stopwatchStartTime:diff});
        this.setState({isWatchOK: true})
        diff = diff/60000.0;
        totalPayment = 10;
        /*if(diff>5){
            totalPayment += 5.0
        }
        if(diff>60){
            totalPayment += (diff-60)*0.1;
        }
        if(diff>1440){
            totalPayment += (diff-1440)*0.4;
        }*/
        totalPayment += (diff)*0.1;
        this.setState({amount:totalPayment});
    }

    async componentDidMount (){
        const {navigation} = this.props;
  
        this.focusListener = navigation.addListener('didFocus', async () => { 
          session = await this._retrieveData('session');
          if(session === "null" || session === null){
              alert("You do not have any open session");
              this.props.navigation.navigate("Home");
          }
          else{
            sessionJsoned = JSON.parse(session);
            this.setState({session : sessionJsoned});
            this.setState({sessionStartTime: new Date(this.state.session.createdAt)});

            this.getAmount();

          }
          
        })
      }
      
      componentWillUnmount(){
        this.focusListener.remove();
      }


    async componentWillMount() {

        var currentSession = null;
        var currentUser = null;
        currentUser = await this._retrieveData('user');
        currentSession = await this._retrieveData('session');
        this.resetStopwatch();
        this.toggleStopwatch();
        if(currentSession === "null" || currentSession === null){
         alert("You do not have any open session");
           this.props.navigation.navigate('Home');
        }

        else{
            currentUser = JSON.parse(user);
            this.setState({user:currentUser})
            currentSession = JSON.parse(currentSession);
            this.setState({session:currentSession})
            this.getSessionStartTime();
            this.getLockStatus();
            this.interval = setInterval(() => {this.getAmount() }, 10000); 
        }
<<<<<<< HEAD

        
        //console.log(this.state.isLocked);
        this.getSessionStartTime();
        
        this.getLockStatus();
            
        
        this.interval = setInterval(() => {this.getAmount() }, 10000); // amount reload every 10 secs.
=======
>>>>>>> ed48bf2f909515fe6d13bbda82bbaf26766511e4
    }

    resetStopwatch() {
        this.setState({stopwatchStart: false, stopwatchReset: true});
      }

      toggleStopwatch() {
        this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
      }

    componentWillUnmount() {
        clearInterval(this.interval);
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
                    {this.state.isWatchOK ?
                    <Stopwatch start secs laps
                        startTime = {this.state.stopwatchStartTime}
                        options = {stopwatchOptions}
                    />
                    :null}
                    <View style={{flexDirection:'row', marginBottom:10}}>
                        <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontSize:24, fontWeight:'bold'}}>
                            Total : 
                        </Text>
                        <Text style={{color:theme.COLORS.JAPANESE_INDIGO, fontSize:24}}>
                            {this.state.amount.toFixed(2)} ₺
                        </Text>
                    </View>
                    
                    
                </View>
                
<<<<<<< HEAD
=======
                
>>>>>>> ed48bf2f909515fe6d13bbda82bbaf26766511e4
                {this.state.isOK ?
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
                        active={!this.state.isLocked}
                        disabled={false}
                        width={150}
                        radius={35}
                        onValueChange={() => {
                            this.changeLockState();
                        }}
                    />
                </View>
                : null}

                <View style={{flex:1, flexDirection:'row', alignItems:'flex-end', justifyContent:'flex-end'}}>
                    <TouchableOpacity
                        style={{
                            alignItems:'center',
                            justifyContent:'center',
                            backgroundColor:theme.COLORS.JAPANESE_INDIGO,
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