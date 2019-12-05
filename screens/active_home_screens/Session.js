import {Text, View, TouchableOpacity, TouchableHighlight} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';


export default class Session extends React.Component{

    static navigationOptions = {
        drawerLabel: () => null,
    };

    constructor(props) {
        
        super(props);
        
        this.state = {
          amount: "",
          sessionStartTime: new Date("2019/12/05"),
          stopwatchStartTime: 0,
        };
        
        this.getAmount = this.getAmount.bind(this);
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
                            }}
                        >
                            <Text>END SESSION</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}