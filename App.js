import React from 'react';
import { StyleSheet, Text, TextInput, View, Image, Button } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require("./images/bikelogo.png")} />
      </View>
      <View style={styles.login}>
        <View>
          <Text>Username:</Text>
          <TextInput 
            style={{height:30, width:200, backgroundColor:"#fff"}}
          />
          <Text>Password:</Text>
          <TextInput
            style={{height:30, width:200, backgroundColor:"#fff"}}
          />
        </View>
        <View style={styles.button}>
          <Button title="Login"/>
          <Button title="Sign Up"/>
        </View>
        <View>
          <Text style={{color:"#222288"}}>Did you forget your password?</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#60ec80',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    flex: 3,
    justifyContent: 'flex-end',
  },
  login: {
    flex: 2,
    backgroundColor: '#60ec80',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button:{
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
  },
});
