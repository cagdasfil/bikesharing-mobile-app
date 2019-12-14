import {Text, View, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { Stopwatch } from 'react-native-stopwatch-timer';
import theme from '../../constants/Theme';
import ToggleSwitch from 'rn-toggle-switch'

export default class Session extends React.Component{

    constructor(props) {
        
        super(props);
        
        this.state = {
          amount: " 12.60",
          sessionStartTime: new Date("2019-12-13T00:08:00Z"),
          stopwatchStartTime: 0,
          value: true,
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
    
    getAmount() {
    
    }

    toggleSwitch(isOn){
        return !isOn;
    }

    componentWillMount() {

        let diff = new Date() - this.state.sessionStartTime;

        this.setState({stopwatchStartTime:diff});

        this.getAmount();
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
                            {this.state.amount} ₺
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