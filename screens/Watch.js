import React, { Component } from 'react';
import { AppRegistry, StyleSheet,Text,View, TouchableHighlight } from 'react-native';
import { Stopwatch, Timer } from 'react-native-stopwatch-timer';
import { TouchableOpacity } from 'react-native-gesture-handler';
 
export default class Watch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStart: false,
      stopwatchStart: false,
      totalDuration: 90000,
      timerReset: false,
      stopwatchReset: false,
      time: new Date(),
      showTime: false,
      amount: "",
      showAmount: false
    };

    
    this.toggleTimer = this.toggleTimer.bind(this);
    this.resetTimer = this.resetTimer.bind(this);
    this.toggleStopwatch = this.toggleStopwatch.bind(this);
    this.resetStopwatch = this.resetStopwatch.bind(this);
    this.getAmount = this.getAmount.bind(this);
  }
 
  toggleTimer() {
    this.setState({timerStart: !this.state.timerStart, timerReset: false});
  }
 
  resetTimer() {
    this.setState({timerStart: false, timerReset: true});
  }
 
  toggleStopwatch() {
    this.setState({stopwatchStart: !this.state.stopwatchStart, stopwatchReset: false});
    this.setState({ showTime: true });
  }
 
  resetStopwatch() {
    this.setState({stopwatchStart: false, stopwatchReset: true});
  }
  
  getFormattedTime(time) {
      this.currentTime = time;
  };

  getAmount() {
    this.setState({
      amount: (Number(currentTime[0])*600
      +Number(currentTime[1])*60
      +Number(currentTime[3])*10
      +Number(currentTime[4])) >= 5 ? (5.00+((Number(currentTime[0])*600
      +Number(currentTime[1])*60
      +Number(currentTime[3])*10
      +Number(currentTime[4])-5)*0.10)).toLocaleString() : '0.00'
    });
    this.setState({ showAmount: true });

    //((this.state.time.getHours()-new Date().getHours())*60+(this.state.time.getMinutes()-new Date().getMinutes()))*3}
    //
    
  }
 
  render() {
    return (
      
      <View style={styles.container}>
        {this.state.showTime ? 
        <Text style={{marginBottom:110, fontSize: 20}} className="App-clock">
            Start Time: {this.state.time.toLocaleString()}.
        </Text>
        : null}
        <Stopwatch laps secs start={this.state.stopwatchStart}
          reset={this.state.stopwatchReset}
          options={options}
          getTime={this.getFormattedTime} />
        <TouchableHighlight onPress={this.toggleStopwatch}>
          <Text style={{fontSize: 30,marginTop:10, marginBottom: 10}}>{!this.state.stopwatchStart ? "Start" : "Stop"}</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.resetStopwatch}>
          <Text style={{fontSize: 30, marginBottom: 10 }}>Reset</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.getAmount}>
          <Text style={{fontSize: 30, marginBottom:10}}>Amount</Text>
        </TouchableHighlight>
        {this.state.showAmount ? 
        <Text className="App-clock">
            Total: {this.state.amount} ₺
        </Text>
        : null}

        
      </View>
    );
  }
}
 
//const handleTimerComplete = () => alert("custom completion function");
 
const options = {
  container: {
    backgroundColor: '#000',
    padding: 5,
    borderRadius: 5,
    width: 220,
  },
  text: {
    fontSize: 30,
    color: '#FFF',
    marginLeft: 40,
  }
};
 

const styles = StyleSheet.create({
  container: {
    flex:1,
    flexDirection:'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    flex: 2,
    justifyContent: 'flex-end',
    marginBottom: 40
  },
  boxes: {
    flex: 1,
    justifyContent: 'center',
    marginBottom: 20
  },
  buttons:{
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button:{
    height:40,
    width:70,
    margin: 10
  },
  forget:{
    flex:1
  }
});
