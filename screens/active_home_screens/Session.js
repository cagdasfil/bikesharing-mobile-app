import {Text, View, TouchableOpacity, TouchableHighlight} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';


export default class Session extends React.Component{

    constructor(props) {
        
        super(props);
        
        this.state = {
          amount: "",
          userId:"",
          dockerId:"",
          sessionStartTime: new Date("2019/12/09"),
          stopwatchStartTime: 0,

        };
        
        this.getAmount = this.getAmount.bind(this);
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
                userId : "5de53b46913bba38ecc6bc5a",//this.state.userId,
                dockerId : "5defe5061f11c212b835d023" //this.state.lastDockerId
            })
          }).then((response) => response.json()).then((responseJson) => {
                this.setState({ loading: false, disabled: false });
                if ( "error" in responseJson ){
                  alert("There is an error with endSession");
                  console.log(responseJson);
                }
                else{
                  console.log(responseJson.message);
                  this.props.navigation.navigate('Session');
                }
            }).catch((error) => {
                console.error(error);
                this.setState({ loading: false, disabled: false });
              });
        });
      }
    
    getAmount() {
    
    }

    componentWillMount() {

        let diff = new Date() - this.state.sessionStartTime;

        this.setState({stopwatchStartTime:diff});

        this.getAmount();
    }

    render () {

        return(
            <View style={{flex:1, alignItems:'center', justifyContent:'space-around'}}>
                <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
                    <Text>
                        Start Time: {this.state.sessionStartTime.toLocaleString()}.
                    </Text>
                    <Stopwatch laps secs start
                        startTime = {this.state.stopwatchStartTime}
                    />
                    <Text>
                        Total: {this.state.amount} ₺
                    </Text>

                </View>

                <View style={{flex:2, alignItems:'center', justifyContent:'center'}}>
                    <View style={{flexDirection:'row'}}>
                        <TouchableOpacity
                            style={{
                                alignItems:'center',
                                justifyContent:'center',
                                backgroundColor:'tomato',
                                width: 70,
                                height: 70,
                                margin: 25,
                                borderRadius: 35,
                                borderWidth: 2
                            }}
                        >
                            <Ionicons name="md-lock" size={20} color='black' />
                            <Text>LOCK</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{
                                alignItems:'center',
                                justifyContent:'center',
                                backgroundColor:'palegreen',
                                width: 70,
                                height: 70,
                                margin: 25,
                                borderRadius: 35,
                                borderWidth: 2
                            }}
                        >
                            <Ionicons name="md-unlock" size={20} color='black' />
                            <Text>UNLOCK</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={{
                                alignItems:'center',
                                justifyContent:'center',
                                backgroundColor:'lightgrey',
                                width: 200,
                                height: 50,
                                margin: 10,
                                borderRadius: 5,
                                borderWidth: 2
                            }} onPress = {()=> this.endSession()}
                        >
                            <Text>END SESSION</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}